/* =============================================================
   技英快进 · 交互逻辑
   单页 hash 路由（#/home、#/phrases ...），不新开标签、无后端。
   收藏与自测记录保存在 localStorage；英文朗读使用浏览器内置
   Web Speech API，无需任何外部服务或音频文件。
   ============================================================= */
(function () {
  'use strict';

  const D = window.SITE_DATA;
  const ROUTES = ['home', 'phrases', 'progress', 'emails', 'quiz'];
  const KEY_FAV = 'jykj_favorites';
  const KEY_HISTORY = 'jykj_quiz_history';

  /* ---------- 工具 ---------- */
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);

  const store = {
    get(key, def) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch (e) { return def; } },
    set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* 隐私模式下静默降级 */ } }
  };

  let toastTimer;
  function toast(msg) {
    const el = $('toast');
    el.textContent = msg;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-visible'), 2200);
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (e) { /* 继续走兼容方案 */ }
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) { return false; }
  }

  const nowText = () => {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}/${p(d.getMonth() + 1)}/${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
  };

  /* ---------- 英文发音 ----------
     优先播放 assets/audio/ 下的离线 MP3（不依赖系统语音包，任何浏览器都有声音）；
     音频缺失时才回退到浏览器内置 Web Speech API。
     文件名 = 英文原文的 FNV-1a 哈希，由 tools/generate_audio.py 批量生成。
     再点同一个按钮 = 停止；切换页面 / 换一句时自动停止。 */
  const synth = window.speechSynthesis || null;
  let activeBtn = null;
  let currentAudio = null;
  let speakToken = 0;
  let utteranceRef = null;   // Chrome 需要保留引用，否则 utterance 被回收会静音

  function readable(en) {
    return String(en).replace(/\[([A-Z_0-9]+)\]/g, (_, key) => {
      if (key === 'N') return 'some number';
      return key.replace(/_/g, ' ').toLowerCase();
    });
  }

  function audioKey(text) {
    let h = 2166136261;
    for (let i = 0; i < text.length; i++) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0).toString(16).padStart(8, '0');
  }

  function markSpeakButton(btn, on) {
    if (!btn) return;
    btn.classList.toggle('is-playing', on);
    const icon = btn.querySelector('i');
    if (icon) icon.className = on ? 'fa-solid fa-circle-stop text-[12px]' : 'fa-solid fa-volume-high text-[12px]';
    btn.title = on ? '停止朗读' : (btn.getAttribute('aria-label') || '朗读这句英文');
  }

  function stopSpeak() {
    speakToken++;
    if (currentAudio) {
      currentAudio.pause();
      if (currentAudio._onEnded) currentAudio.removeEventListener('ended', currentAudio._onEnded);
      if (currentAudio._onError) currentAudio.removeEventListener('error', currentAudio._onError);
      currentAudio = null;
    }
    if (synth) synth.cancel();
    utteranceRef = null;
    if (activeBtn) { markSpeakButton(activeBtn, false); activeBtn = null; }
  }

  // 兜底：浏览器内置语音，仅在 MP3 不存在 / 播放失败时启用
  function speakWithBrowser(text, btn) {
    if (!synth || !window.SpeechSynthesisUtterance) {
      stopSpeak();
      toast('当前浏览器不支持语音朗读，建议使用 Chrome 或 Edge');
      return;
    }
    const token = ++speakToken;
    const utter = new SpeechSynthesisUtterance(readable(text));
    utter.lang = 'en-US';
    utter.rate = 0.92;
    utter.pitch = 1;
    utteranceRef = utter;

    const voices = synth.getVoices();
    const voice = voices.find((v) => /^en[-_]US/i.test(v.lang)) || voices.find((v) => /^en/i.test(v.lang));
    if (voice) utter.voice = voice;

    utter.onend = () => { if (token === speakToken) stopSpeak(); };
    utter.onerror = () => {
      if (token !== speakToken) return;
      stopSpeak();
      toast('朗读未能播放，请检查浏览器语音设置');
    };
    if (synth.paused) synth.resume();
    synth.speak(utter);   // 同步调用，保持在用户手势栈内
  }

  function speak(btn) {
    if (activeBtn === btn) { stopSpeak(); return; }
    stopSpeak();

    const text = btn.getAttribute('data-speak') || '';
    if (!text.trim()) return;
    activeBtn = btn;
    markSpeakButton(btn, true);

    const key = audioKey(text);
    const manifest = window.AUDIO_MANIFEST;
    // 新增句子还没生成音频时，直接走浏览器朗读，不发起 404 请求
    if (manifest && !manifest.has(key)) { speakWithBrowser(text, btn); return; }

    const audio = new Audio('assets/audio/' + key + '.mp3');
    currentAudio = audio;
    let done = false;

    const fallback = () => {
      if (done || activeBtn !== btn) return;
      done = true;
      audio.pause();
      if (currentAudio === audio) currentAudio = null;
      speakWithBrowser(text, btn);
    };

    audio._onEnded = () => {
      if (done) return;
      done = true;
      if (currentAudio === audio) currentAudio = null;
      if (activeBtn === btn) stopSpeak();
    };
    audio._onError = fallback;
    audio.addEventListener('ended', audio._onEnded);
    audio.addEventListener('error', fallback);

    const p = audio.play();
    if (p && typeof p.catch === 'function') p.catch(fallback);
  }

  /* ---------- 全局状态 ---------- */
  let favorites = store.get(KEY_FAV, []);
  let history = store.get(KEY_HISTORY, []);
  if (!Array.isArray(favorites)) favorites = [];
  if (!Array.isArray(history)) history = [];
  let dailyItem = null;

  const phraseState = { category: '全部', keyword: '', favOnly: false };
  const progressState = { category: '全部', mode: '全部', keyword: '', favOnly: false };
  const emailState = { activeId: D.emailTemplates[0].id };
  const quizState = { answers: {}, submitted: false };

  /* ---------- 路由与移动端菜单 ---------- */
  function currentRoute() {
    const m = location.hash.match(/^#\/([a-z]+)/);
    return m && ROUTES.includes(m[1]) ? m[1] : 'home';
  }

  let firstRoute = true;
  function applyRoute() {
    stopSpeak();
    const route = currentRoute();
    ROUTES.forEach((r) => {
      $('view-' + r).classList.toggle('hidden', r !== route);
    });
    document.querySelectorAll('[data-route]').forEach((a) => {
      a.classList.toggle('is-active', a.getAttribute('data-route') === route);
    });
    closeMenu();
    if (!firstRoute) window.scrollTo({ top: 0, behavior: 'smooth' });
    firstRoute = false;
  }

  function closeMenu() {
    $('mobileMenu').classList.remove('is-open');
    $('menuIcon').className = 'fa-solid fa-bars text-sm';
    $('menuToggle').setAttribute('aria-expanded', 'false');
  }

  /* ---------- 收藏 ---------- */
  function isFav(id) { return favorites.indexOf(id) !== -1; }

  function toggleFav(id) {
    const i = favorites.indexOf(id);
    if (i === -1) favorites.push(id); else favorites.splice(i, 1);
    store.set(KEY_FAV, favorites);
    refreshAfterFavChange();
    toast(i === -1 ? '已加入收藏' : '已取消收藏');
  }

  function refreshAfterFavChange() {
    updateFavCounts();
    renderPhrases();
    renderProgress();
    renderDaily();
  }

  function updateFavCounts() {
    $('favTotalCount').textContent = favorites.length;
    $('phraseFavCount').textContent = favorites.length;
    $('progressFavCount').textContent = favorites.length;
  }

  function syncFavButtons() {
    document.querySelectorAll('[data-fav]').forEach((btn) => {
      const on = isFav(btn.getAttribute('data-fav'));
      btn.classList.toggle('is-fav', on);
      btn.title = on ? '取消收藏' : '收藏这句';
      btn.innerHTML = `<i class="${on ? 'fa-solid' : 'fa-regular'} fa-bookmark text-[13px]"></i>`;
    });
  }

  /* ---------- 首页：会议流程速查 & 高频词速查 ---------- */
  function renderFlow() {
    $('flowStrip').innerHTML = D.flow.map((f) => `
      <button type="button" class="card card-hover flow-card p-4" data-flow="${esc(f.category)}">
        <div class="flex items-center justify-between">
          <span class="font-en text-[12px] font-bold text-warm-accent">${esc(f.step)}</span>
          <i class="fa-solid fa-arrow-up-right-from-square flow-arrow text-warm-muted text-[11px]"></i>
        </div>
        <p class="mt-2 text-[13.5px] font-semibold">${esc(f.label)}</p>
        <p class="phrase-en mt-2 text-[12.5px] font-medium leading-[1.6]">${esc(f.en)}</p>
        <p class="phrase-zh mt-1.5 text-[12px]">${esc(f.zh)}</p>
        <p class="mt-3 text-[11px] text-warm-blue">查看「${esc(f.category)}」全部句型 →</p>
      </button>`).join('');
  }

  function renderGlossary() {
    $('glossaryGrid').innerHTML = D.glossary.map((g) => `
      <div class="card card-hover p-4">
        <div class="flex items-start justify-between gap-2">
          <span class="text-[10.5px] font-semibold text-warm-blue bg-warm-blue/10 rounded px-2 py-0.5">${esc(g.kind)}</span>
          <button type="button" class="speak-btn !w-7 !h-7" data-speak="${esc(g.en)}" aria-label="朗读这个词" title="朗读这个词"><i class="fa-solid fa-volume-high text-[12px]"></i></button>
        </div>
        <p class="phrase-en mt-2 text-[14px]">${esc(g.en)}</p>
        <p class="phrase-zh mt-1">${esc(g.zh)}</p>
        <p class="mt-2 text-[11px] text-warm-accent"><i class="fa-solid fa-check mr-1"></i>适合技术会议 · ${esc(g.fit)}</p>
      </div>`).join('');
  }

  /* ---------- 句子卡片（会议口语库 / 项目进度句型共用） ---------- */
  function renderCard(item, showMode) {
    const modeBadge = showMode
      ? `<span class="mode-badge ${item.mode === '口头会议' ? 'mode-oral' : 'mode-text'}">
           <i class="fa-solid ${item.mode === '口头会议' ? 'fa-microphone-lines' : 'fa-message'}"></i>${esc(item.mode)}
         </span>`
      : '';
    return `
      <article class="card card-hover p-5 flex flex-col">
        <div class="flex items-start justify-between gap-3">
          <div class="flex flex-wrap items-center gap-1.5">
            <span class="fit-badge"><i class="fa-solid fa-check"></i>适合技术会议</span>
            <span class="text-[11px] font-semibold text-warm-accent bg-warm-accent/10 rounded-md px-2 py-1">${esc(item.category)}</span>
            ${modeBadge}
          </div>
          <button type="button" class="fav-btn" data-fav="${esc(item.id)}" title="收藏这句" aria-label="收藏这句"></button>
        </div>

        <div class="mt-4 flex items-start gap-2">
          <p class="phrase-en flex-1">${esc(item.en)}</p>
          <button type="button" class="speak-btn" data-speak="${esc(item.en)}" aria-label="朗读这句英文" title="朗读这句英文"><i class="fa-solid fa-volume-high text-[12px]"></i></button>
        </div>
        <p class="phrase-zh mt-2">${esc(item.zh)}</p>

        <div class="mt-4 pt-4 border-t border-warm-line space-y-2">
          <div class="flex gap-2 text-[12.5px] leading-[1.65]">
            <i class="fa-solid fa-circle-info text-warm-accent mt-1.5 text-[11px]"></i>
            <span class="text-warm-muted"><strong class="text-warm-ink font-semibold">使用说明：</strong>${esc(item.usage)}</span>
          </div>
          <div class="flex gap-2 text-[12.5px] leading-[1.65]">
            <i class="fa-solid fa-shuffle text-warm-blue mt-1.5 text-[11px]"></i>
            <span class="text-warm-muted"><strong class="text-warm-ink font-semibold">替换提示：</strong>${esc(item.replace)}</span>
          </div>
        </div>

        <div class="mt-auto pt-4 text-[11.5px] text-warm-blue flex items-start gap-1.5">
          <i class="fa-solid fa-location-dot mt-1"></i><span>${esc(item.fit)}</span>
        </div>
      </article>`;
  }

  function matches(item, kw) {
    if (!kw) return true;
    const hay = [item.en, item.zh, item.usage, item.replace, item.category, item.mode, item.fit]
      .join(' ').toLowerCase();
    return hay.indexOf(kw) !== -1;
  }

  function renderTabs(containerId, group, values, active) {
    $(containerId).innerHTML = values.map((v) => `
      <button type="button" class="tag ${v === active ? 'is-active' : ''}" data-tab="${group}" data-value="${esc(v)}">${esc(v)}</button>
    `).join('');
  }

  /* ---------- 会议口语库 ---------- */
  function renderPhrases() {
    renderTabs('phraseTabs', 'phrase', ['全部'].concat(D.meetingCategories), phraseState.category);
    const kw = phraseState.keyword.trim().toLowerCase();
    const list = D.meetingPhrases.filter((p) =>
      (phraseState.category === '全部' || p.category === phraseState.category) &&
      (!phraseState.favOnly || isFav(p.id)) && matches(p, kw)
    );
    $('phraseGrid').innerHTML = list.map((p) => renderCard(p, false)).join('');
    $('phraseCount').textContent = list.length;
    $('phraseEmpty').classList.toggle('hidden', list.length > 0);
    $('phraseFavoriteOnly').classList.toggle('is-on', phraseState.favOnly);
    syncFavButtons();
  }

  /* ---------- 项目进度句型 ---------- */
  function renderProgress() {
    renderTabs('progressTabs', 'progress', ['全部'].concat(D.progressCategories), progressState.category);
    renderTabs('progressModeTabs', 'progressMode', D.progressModes, progressState.mode);
    const kw = progressState.keyword.trim().toLowerCase();
    const list = D.progressPhrases.filter((p) =>
      (progressState.category === '全部' || p.category === progressState.category) &&
      (progressState.mode === '全部' || p.mode === progressState.mode) &&
      (!progressState.favOnly || isFav(p.id)) && matches(p, kw)
    );
    $('progressGrid').innerHTML = list.map((p) => renderCard(p, true)).join('');
    $('progressCount').textContent = list.length;
    $('progressEmpty').classList.toggle('hidden', list.length > 0);
    $('progressFavoriteOnly').classList.toggle('is-on', progressState.favOnly);
    syncFavButtons();
  }

  /* ---------- 技术邮件模板 ---------- */
  const HINT_RULES = [
    [/DATE|TIME|WEEK|DURATION|DAY|DUE/, '时间 / 日期，例如 Nov 28、Friday、14:00 UTC'],
    [/VERSION|BRANCH|ENV/, '版本号 / 分支 / 环境，例如 v2.4、staging'],
    [/OWNER|NAME|ROLE|TEAM/, '人名 / 负责人 / 团队，例如 Alex、the platform team'],
    [/LINK|TICKET|CHANNEL/, '链接 / 工单号 / 沟通渠道，例如 Slack 频道、工单链接'],
    [/^N$/, '数字或百分比，例如 2、80'],
    [/STATUS/, '当前状态，例如 on track、at risk、green'],
    [/PROJECT|MODULE|SERVICE|FEATURE|TASK|COMPONENT|MILESTONE|ITEM|SCOPE|TOPIC|QUESTION|MEETING|DECISION|ACTION|BLOCKER|ISSUE|RISK|IMPACT|WORKAROUND|STATUS|BUILD/, '项目名 / 模块名 / 任务名 / 具体内容，按自己项目替换']
  ];
  function hintFor(token) {
    const key = token.slice(1, -1);
    for (const [re, text] of HINT_RULES) if (re.test(key)) return text;
    return '按实际项目信息替换';
  }
  function placeholders(tpl) {
    const text = [tpl.subject, tpl.body, tpl.signature].join('\n');
    return Array.from(new Set(text.match(/\[[A-Z_]+\]/g) || [])).sort();
  }
  function fullEmailText(tpl) {
    return `Subject: ${tpl.subject}\n\n${tpl.body}\n\n${tpl.signature}`;
  }

  function renderEmails() {
    $('emailList').innerHTML = D.emailTemplates.map((t) => `
      <button type="button" class="email-tab shrink-0 lg:w-full lg:shrink ${t.id === emailState.activeId ? 'is-active' : ''}" data-email="${esc(t.id)}">
        <i class="${t.icon} text-[13px] w-4 text-center"></i>
        <span>${esc(t.name)}</span>
      </button>
    `).join('');

    const tpl = D.emailTemplates.find((t) => t.id === emailState.activeId) || D.emailTemplates[0];
    const tokens = placeholders(tpl);
    $('emailDetail').innerHTML = `
      <div class="card p-6 lg:p-7">
        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <span class="eyebrow"><i class="fa-solid fa-envelope"></i> TEMPLATE ${esc(tpl.id.toUpperCase())}</span>
            <h3 class="mt-2 text-[19px] lg:text-[21px] font-bold">${esc(tpl.name)}</h3>
            <p class="mt-2 text-[13px] text-warm-muted max-w-xl">${esc(tpl.scene)}</p>
          </div>
          <button type="button" class="btn btn-primary shrink-0" data-copy="${esc(tpl.id)}">
            <i class="fa-solid fa-copy text-[13px]"></i> 一键复制全部模板
          </button>
        </div>

        <div class="mt-7 space-y-5">
          <div>
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2 text-[12px] font-semibold text-warm-accent">
                <i class="fa-solid fa-heading text-[11px]"></i> 邮件主题 · Subject
              </div>
              <button type="button" class="speak-btn" data-speak="${esc(tpl.subject)}" aria-label="朗读邮件主题" title="朗读邮件主题"><i class="fa-solid fa-volume-high text-[12px]"></i></button>
            </div>
            <div class="copy-block mt-2 bg-warm-bg border border-warm-line rounded-xl p-4">${esc(tpl.subject)}</div>
          </div>
          <div>
            <div class="flex items-center gap-2 text-[12px] font-semibold text-warm-accent">
              <i class="fa-solid fa-align-left text-[11px]"></i> 正文 · Body
            </div>
            <div class="copy-block mt-2 bg-warm-bg border border-warm-line rounded-xl p-4">${esc(tpl.body)}</div>
          </div>
          <div>
            <div class="flex items-center gap-2 text-[12px] font-semibold text-warm-accent">
              <i class="fa-solid fa-signature text-[11px]"></i> 结尾落款 · Signature
            </div>
            <div class="copy-block signature-block mt-2 bg-warm-bg border border-warm-line rounded-xl p-4">${esc(tpl.signature)}</div>
          </div>
        </div>

        <div class="mt-6 note-box"><strong>适合技术会议：</strong>${esc(tpl.note)}</div>

        <div class="mt-7 border-t border-warm-line pt-6">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <h4 class="text-[14px] font-bold flex items-center gap-2">
              <i class="fa-solid fa-square-code text-warm-blue text-[13px]"></i> [ ] 占位符替换说明
            </h4>
            <span class="text-[12px] text-warm-muted">共 ${tokens.length} 处，复制后请逐项替换</span>
          </div>
          <div class="mt-4 grid sm:grid-cols-2 gap-2">
            ${tokens.map((t) => `
              <div class="flex items-start gap-2 bg-warm-bg border border-warm-line rounded-lg px-3 py-2">
                <code class="font-en text-[12px] font-semibold text-warm-accent shrink-0">${esc(t)}</code>
                <span class="text-[12px] text-warm-muted leading-[1.6]">${esc(hintFor(t))}</span>
              </div>`).join('')}
          </div>
        </div>
      </div>`;
  }

  /* ---------- 练习自测 ---------- */
  const scoreOf = () => D.quiz.reduce((n, q) => n + (quizState.answers[q.id] === q.answer ? 1 : 0), 0);

  function renderQuizStats() {
    const total = D.quiz.length;
    const best = history.length ? Math.max.apply(null, history.map((h) => h.score)) : null;
    const last = history.length ? history[0] : null;
    const cards = [
      { icon: 'fa-trophy', label: '最好成绩', value: best === null ? '—' : `${best} / ${total}`, sub: best === null ? '完成一次自测后显示' : `正确率 ${Math.round(best / total * 100)}%` },
      { icon: 'fa-clock', label: '最近一次', value: last ? `${last.score} / ${total}` : '—', sub: last ? last.time : '暂无记录' },
      { icon: 'fa-rotate-right', label: '已完成次数', value: String(history.length), sub: '记录仅保存在本地浏览器' }
    ];
    $('quizStats').innerHTML = cards.map((c) => `
      <div class="card p-5 flex items-center gap-4">
        <span class="w-10 h-10 rounded-xl bg-warm-accent/10 flex items-center justify-center shrink-0">
          <i class="fa-solid ${c.icon} text-warm-accent text-[14px]"></i>
        </span>
        <div>
          <p class="text-[12px] text-warm-muted">${c.label}</p>
          <p class="font-en text-[19px] font-bold leading-tight mt-0.5">${esc(c.value)}</p>
          <p class="text-[11.5px] text-warm-muted mt-0.5">${esc(c.sub)}</p>
        </div>
      </div>`).join('');
  }

  function renderQuizHistory() {
    if (!history.length) {
      $('quizHistory').innerHTML = '<div class="card p-6 text-[13px] text-warm-muted">还没有自测记录。完成一次提交后，成绩会自动保存在本地。</div>';
      return;
    }
    const total = D.quiz.length;
    $('quizHistory').innerHTML = `
      <div class="card divide-y divide-warm-line">
        ${history.map((h) => `
          <div class="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <span class="text-[12.5px] text-warm-muted font-en shrink-0 w-36">${esc(h.time)}</span>
            <div class="flex-1">
              <div class="flex items-center justify-between text-[12.5px] mb-1.5">
                <span class="text-warm-muted">正确率</span>
                <span class="font-en font-semibold text-warm-accent">${h.score} / ${h.total} · ${h.rate}%</span>
              </div>
              <div class="progress-track"><div class="progress-fill" style="width:${h.rate}%"></div></div>
            </div>
            <span class="hidden sm:inline text-[11.5px] text-warm-muted">共 ${total} 题</span>
          </div>`).join('')}
      </div>`;
  }

  function renderQuizResult(score) {
    const total = D.quiz.length;
    const rate = Math.round(score / total * 100);
    const comment = rate === 100 ? '全部正确，可以直接把句子带进下一场技术会议。'
      : rate >= 75 ? '基础不错，重点复习错题里「会议 / 文字沟通」的区别。'
      : '建议先回到会议口语库，把对应分类的句子整句背下来。';
    const box = $('quizResult');
    box.classList.remove('hidden');
    box.innerHTML = `
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 class="text-[17px] font-bold">本次成绩</h3>
          <p class="mt-1 text-[13px] text-warm-muted">答案与解析已展开在每道题下方，说明该表达适合会议还是文字沟通。</p>
        </div>
        <div class="font-en text-[26px] font-bold text-warm-accent leading-none">${score} <span class="text-[16px] text-warm-muted">/ ${total}</span></div>
      </div>
      <div class="progress-track mt-5"><div class="progress-fill" style="width:${rate}%"></div></div>
      <div class="mt-4 flex flex-wrap items-center justify-between gap-2 text-[12.5px]">
        <span class="text-warm-muted">正确率 <strong class="font-en text-warm-accent">${rate}%</strong></span>
        <span class="text-warm-blue">${esc(comment)}</span>
      </div>`;
  }

  function renderQuiz() {
    renderQuizStats();
    renderQuizHistory();
    const submitted = quizState.submitted;
    const letters = ['A', 'B', 'C', 'D'];

    $('quizList').innerHTML = D.quiz.map((q, i) => {
      const picked = quizState.answers[q.id];
      const right = picked === q.answer;
      const options = q.options.map((opt, j) => {
        let cls = 'quiz-option';
        if (submitted) {
          if (j === q.answer) cls += ' is-correct';
          else if (picked === j) cls += ' is-wrong';
          else cls += ' is-dim';
        } else if (picked === j) cls += ' is-selected';
        return `
          <button type="button" class="${cls}" data-quiz="${esc(q.id)}" data-index="${j}" ${submitted ? 'disabled' : ''}>
            <span class="opt-key">${letters[j]}</span>
            <span class="opt-text">${esc(opt)}</span>
          </button>`;
      }).join('');

      const analysis = submitted ? `
        <div class="mt-4 flex items-start gap-2 rounded-lg px-3 py-2.5 ${right ? 'bg-warm-blue/10' : 'bg-warm-accent/10'}">
          <i class="fa-solid ${right ? 'fa-circle-check text-warm-blue' : 'fa-circle-xmark text-warm-accent'} mt-1 text-[12px]"></i>
          <div class="text-[12.5px] leading-[1.7] flex-1">
            <span class="font-semibold ${right ? 'text-warm-blue' : 'text-warm-accent'}">${right ? '回答正确' : '正确答案：' + letters[q.answer]}</span>
            <span class="text-[11px] ml-2 px-2 py-0.5 rounded bg-white/70 text-warm-muted">${esc(q.channel)}</span>
            <p class="mt-1 text-warm-muted">${esc(q.explanation)}</p>
            <div class="mt-2 flex items-center gap-2">
              <button type="button" class="speak-btn !w-7 !h-7" data-speak="${esc(q.options[q.answer])}" aria-label="朗读正确表达" title="朗读正确表达"><i class="fa-solid fa-volume-high text-[12px]"></i></button>
              <span class="text-[11.5px] text-warm-muted">朗读正确表达</span>
            </div>
          </div>
        </div>` : '';

      return `
        <article class="card p-5">
          <div class="flex items-center justify-between gap-2">
            <span class="text-[11.5px] font-semibold text-warm-accent bg-warm-accent/10 rounded-md px-2 py-1">第 ${i + 1} 题 / ${D.quiz.length}</span>
            <span class="text-[11.5px] text-warm-muted"><i class="fa-solid fa-comments mr-1"></i>中文场景选表达</span>
          </div>
          <p class="mt-3 text-[14px] font-semibold leading-[1.7]">${esc(q.scene)}</p>
          <div class="mt-4 space-y-2">${options}</div>
          ${analysis}
        </article>`;
    }).join('');

    $('quizSubmit').disabled = submitted;
    $('quizSubmit').innerHTML = submitted
      ? '<i class="fa-solid fa-circle-check text-[13px]"></i> 已提交 · 解析已展开'
      : '<i class="fa-solid fa-circle-check text-[13px]"></i> 提交并查看解析';
    $('quizSubmit').classList.toggle('opacity-60', submitted);
  }

  function submitQuiz() {
    const missing = D.quiz.filter((q) => quizState.answers[q.id] === undefined).length;
    if (missing) { toast(`还有 ${missing} 题未作答，完成后即可查看解析`); return; }
    const score = scoreOf();
    const total = D.quiz.length;
    history.unshift({ time: nowText(), score, total, rate: Math.round(score / total * 100) });
    history = history.slice(0, 8);
    store.set(KEY_HISTORY, history);
    quizState.submitted = true;
    renderQuiz();
    renderQuizResult(score);
    toast(`已完成：${score} / ${total} 题正确`);
  }

  /* ---------- 首页「今日一句」 ---------- */
  function pickDaily() {
    stopSpeak();
    const pool = D.meetingPhrases.concat(D.progressPhrases);
    const candidates = dailyItem ? pool.filter((p) => p.id !== dailyItem.id) : pool;
    dailyItem = candidates[Math.floor(Math.random() * candidates.length)];
    renderDaily();
  }

  function renderDaily() {
    if (!dailyItem) return;
    $('heroDailyEn').textContent = dailyItem.en;
    $('heroDailyZh').textContent = dailyItem.zh;
    $('heroDailyFit').innerHTML = `<i class="fa-solid fa-location-dot mr-1.5"></i>适合技术会议 · ${esc(dailyItem.fit)}`;
    const speakBtn = $('dailySpeak');
    speakBtn.setAttribute('data-speak', dailyItem.en);
    const btn = $('dailyFav');
    const on = isFav(dailyItem.id);
    btn.className = 'btn ' + (on ? 'btn-primary' : 'btn-outline');
    btn.innerHTML = `<i class="${on ? 'fa-solid' : 'fa-regular'} fa-bookmark text-[12px]"></i> ${on ? '已收藏' : '收藏这句'}`;
  }

  /* ---------- 事件绑定 ---------- */
  document.addEventListener('click', (e) => {
    // 发音按钮（放在最前面，避免被卡片内其它处理器拦截）
    const speakBtn = e.target.closest('[data-speak]');
    if (speakBtn) { speak(speakBtn); return; }

    // 收藏按钮
    const fav = e.target.closest('[data-fav]');
    if (fav) { toggleFav(fav.getAttribute('data-fav')); return; }

    // 首页跳转按钮 / 会议流程卡片
    const goto = e.target.closest('[data-goto]');
    if (goto) { location.hash = '#/' + goto.getAttribute('data-goto'); return; }

    const flow = e.target.closest('[data-flow]');
    if (flow) {
      phraseState.category = flow.getAttribute('data-flow');
      phraseState.keyword = '';
      phraseState.favOnly = false;
      $('phraseSearch').value = '';
      renderPhrases();
      location.hash = '#/phrases';
      return;
    }

    // 分类 / 形式标签
    const tab = e.target.closest('[data-tab]');
    if (tab) {
      const group = tab.getAttribute('data-tab');
      const value = tab.getAttribute('data-value');
      if (group === 'phrase') phraseState.category = value;
      if (group === 'progress') progressState.category = value;
      if (group === 'progressMode') progressState.mode = value;
      if (group === 'phrase') renderPhrases(); else renderProgress();
      return;
    }

    // 邮件模板切换 / 复制
    const emailTab = e.target.closest('[data-email]');
    if (emailTab) { emailState.activeId = emailTab.getAttribute('data-email'); renderEmails(); return; }

    const copyBtn = e.target.closest('[data-copy]');
    if (copyBtn) {
      const tpl = D.emailTemplates.find((t) => t.id === copyBtn.getAttribute('data-copy'));
      if (tpl) copyText(fullEmailText(tpl)).then((ok) => toast(ok ? '复制成功，替换 [ ] 占位符后即可发送' : '复制失败，请手动选中文本复制'));
      return;
    }

    // 自测选项
    const opt = e.target.closest('[data-quiz]');
    if (opt && !quizState.submitted) {
      quizState.answers[opt.getAttribute('data-quiz')] = Number(opt.getAttribute('data-index'));
      renderQuiz();
    }
  });

  $('menuToggle').addEventListener('click', () => {
    const open = $('mobileMenu').classList.toggle('is-open');
    $('menuIcon').className = open ? 'fa-solid fa-xmark text-sm' : 'fa-solid fa-bars text-sm';
    $('menuToggle').setAttribute('aria-expanded', String(open));
  });

  $('favShortcut').addEventListener('click', () => {
    if (!favorites.length) { toast('还没有收藏，点击句子卡片右上角的书签即可收藏'); return; }
    phraseState.favOnly = true;
    phraseState.category = '全部';
    phraseState.keyword = '';
    $('phraseSearch').value = '';
    renderPhrases();
    location.hash = '#/phrases';
  });

  $('phraseSearch').addEventListener('input', (e) => { phraseState.keyword = e.target.value; renderPhrases(); });
  $('progressSearch').addEventListener('input', (e) => { progressState.keyword = e.target.value; renderProgress(); });
  $('phraseFavoriteOnly').addEventListener('click', () => { phraseState.favOnly = !phraseState.favOnly; renderPhrases(); });
  $('progressFavoriteOnly').addEventListener('click', () => { progressState.favOnly = !progressState.favOnly; renderProgress(); });
  $('phraseReset').addEventListener('click', () => {
    phraseState.category = '全部'; phraseState.keyword = ''; phraseState.favOnly = false;
    $('phraseSearch').value = ''; renderPhrases(); toast('已重置筛选条件');
  });
  $('progressReset').addEventListener('click', () => {
    progressState.category = '全部'; progressState.mode = '全部'; progressState.keyword = ''; progressState.favOnly = false;
    $('progressSearch').value = ''; renderProgress(); toast('已重置筛选条件');
  });

  $('dailyRefresh').addEventListener('click', pickDaily);
  $('dailyFav').addEventListener('click', () => { if (dailyItem) toggleFav(dailyItem.id); });

  $('quizForm').addEventListener('submit', (e) => { e.preventDefault(); submitQuiz(); });
  $('quizReset').addEventListener('click', () => {
    quizState.answers = {}; quizState.submitted = false;
    $('quizResult').classList.add('hidden');
    renderQuiz();
    toast('已清空本次作答');
  });

  window.addEventListener('hashchange', applyRoute);

  /* ---------- 初始化 ---------- */
  // 扩展内容区追加的句子统一按分类归组，保证「全部」视图顺序整洁
  const groupByCategory = (arr, cats) => arr.slice().sort((a, b) => cats.indexOf(a.category) - cats.indexOf(b.category));
  D.meetingPhrases = groupByCategory(D.meetingPhrases, D.meetingCategories);
  D.progressPhrases = groupByCategory(D.progressPhrases, D.progressCategories);

  renderFlow();
  renderGlossary();
  renderPhrases();
  renderProgress();
  renderEmails();
  renderQuiz();
  pickDaily();
  updateFavCounts();
  syncFavButtons();
  applyRoute();
})();
