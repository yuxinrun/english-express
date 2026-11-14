/* =============================================================
   技英快进 · 内容数据源
   新增句子 / 模板 / 自测题：只需在对应数组里追加一个对象即可。
   字段约定：
     id        唯一标识（收藏与自测依赖）
     category  分类名，需与 *Categories 数组里的值一致
     mode      仅进度句型使用：'口头会议' | '文字同步'
     en        英文原句（占位符用 [XXX] 表示）
     zh        中文翻译
     usage     使用说明：什么时候说、适合什么会议
     replace   替换提示：哪些词可以换成自己项目内容
     fit       场景标注，强调外企技术研讨会 / 项目进度跟踪会
   ============================================================= */
window.SITE_DATA = {

  /* ---------- 会议口语库 ---------- */
  meetingCategories: ['开场破冰', '汇报进展', '遇到阻塞', '提出疑问', '讨论方案', '表达不同意', '收尾总结'],

  meetingPhrases: [
    // 开场破冰
    { id: 'm-01', category: '开场破冰',
      en: "Let's get started. I'll walk through the current status of [PROJECT] first.",
      zh: '我们开始吧，我先过一遍 [项目] 的当前状态。',
      usage: '主持人开场第一句，先给出议题边界，适合技术研讨会、周度项目进度跟踪会。',
      replace: '[PROJECT] 换成项目名或模块名，例如 the payment service。',
      fit: '外企技术研讨会 · 项目进度跟踪会' },
    { id: 'm-02', category: '开场破冰',
      en: "Just to make sure we're aligned, the goal today is to agree on [DELIVERABLE].",
      zh: '先对齐一下，今天的目标是把 [交付物] 定下来。',
      usage: '需要产出决策的会议开场，避免讨论跑偏，适合技术方案评审。',
      replace: '[DELIVERABLE] → the API contract / the release scope / the test plan。',
      fit: '外企技术研讨会 · 技术方案评审会' },
    { id: 'm-03', category: '开场破冰',
      en: 'Before we dive in, any quick updates from the [TEAM] side?',
      zh: '在深入之前，[团队] 这边有没有要快速同步的？',
      usage: '跨团队技术同步会议开场，快速收集上下文，不占用正式议程时间。',
      replace: '[TEAM] → infra / backend / QA / data。',
      fit: '外企技术同步会议 · 项目进度跟踪会' },
    { id: 'm-04', category: '开场破冰',
      en: "I'll keep this short — we have [N] items on the agenda.",
      zh: '我尽量简短，今天议程有 [N] 项。',
      usage: '时间紧的站会或进度跟踪会用于控场，语气克制、不生硬。',
      replace: '[N] → three / four；items 也可换成 blockers。',
      fit: '外企项目进度跟踪会 · 每日站会' },
    { id: 'm-05', category: '开场破冰',
      en: "Thanks for joining. Let's start with a quick round of status updates, then a short demo.",
      zh: '感谢参加。我们先快速过一轮进度，然后做一个简短的 demo。',
      usage: '有演示环节的技术研讨会、迭代评审开场，先说清顺序。',
      replace: 'status updates → blockers / demo results；short demo → code walkthrough。',
      fit: '外企技术研讨会 · 迭代评审会' },

    // 汇报进展
    { id: 'm-06', category: '汇报进展',
      en: 'On my side, [MODULE] is done and has been merged into [BRANCH].',
      zh: '我这边 [模块] 已完成，并已合并到 [分支]。',
      usage: '站会或项目进度跟踪会汇报个人进度，给出可验证的结果而不是形容词。',
      replace: '[MODULE] → the auth middleware；[BRANCH] → main / release/2.4。',
      fit: '外企项目进度跟踪会 · 每日站会' },
    { id: 'm-07', category: '汇报进展',
      en: "We're on track for the [DATE] release — about [N]% of the scope is covered.",
      zh: '我们按计划推进 [日期] 的发布，范围已覆盖约 [N]%。',
      usage: '周度进度汇报，用百分比让风险可量化，适合技术同步会议。',
      replace: '[DATE] → Nov 28 / end of sprint；[N] → 80。',
      fit: '外企技术同步会议 · 项目进度跟踪会' },
    { id: 'm-08', category: '汇报进展',
      en: 'The build is green and the regression suite passed on [ENV].',
      zh: '构建正常，回归用例已在 [环境] 通过。',
      usage: '版本同步或发布前的技术同步会议，说明质量状态。',
      replace: '[ENV] → staging / CI / canary。',
      fit: '外企技术研讨会 · 版本同步会' },
    { id: 'm-09', category: '汇报进展',
      en: "I've finished [TASK]; it's in review now.",
      zh: '[任务] 已完成，正在 code review。',
      usage: '站会里说明「做完但未闭环」，避免被误判为可交付。',
      replace: '[TASK] → the schema migration / the retry logic。',
      fit: '外企项目进度跟踪会 · 每日站会' },
    { id: 'm-10', category: '汇报进展',
      en: "Quick update: [FEATURE] is deployed to [ENV] and we're monitoring metrics.",
      zh: '快速同步：[功能] 已部署到 [环境]，我们正在观察指标。',
      usage: '技术研讨会或发布同步会，一句话交代部署状态与后续动作。',
      replace: '[FEATURE] → the new cache layer；[ENV] → canary。',
      fit: '外企技术研讨会 · 发布同步会' },

    // 遇到阻塞
    { id: 'm-11', category: '遇到阻塞',
      en: "We're blocked on [DEPENDENCY] — [TEAM] hasn't provided [ARTIFACT] yet.",
      zh: '我们被 [依赖] 卡住了，[团队] 还没提供 [产物]。',
      usage: '项目进度跟踪会汇报阻塞：说清依赖、责任方、缺什么，方便当场派活。',
      replace: '[DEPENDENCY] → the upstream API；[ARTIFACT] → the sandbox credentials。',
      fit: '外企项目进度跟踪会 · 技术同步会议' },
    { id: 'm-12', category: '遇到阻塞',
      en: "There's a risk of a [N]-day delay if this isn't resolved by [DATE].",
      zh: '如果在 [日期] 前没解决，有延期 [N] 天的风险。',
      usage: '风险上报时给出幅度与时间节点，适合技术研讨会、进度跟踪会。',
      replace: '[N] → two；[DATE] → Friday / Nov 20。',
      fit: '外企技术研讨会 · 项目进度跟踪会' },
    { id: 'm-13', category: '遇到阻塞',
      en: "I'm stuck on [ISSUE] and could use a second pair of eyes.",
      zh: '我在 [问题] 上卡住了，想找人一起看一下。',
      usage: '站会或技术同步会上求助，语气自然，不显得推卸责任。',
      replace: '[ISSUE] → the flaky integration test / the race condition。',
      fit: '外企技术研讨会 · 每日站会' },
    { id: 'm-14', category: '遇到阻塞',
      en: 'This is outside my scope — we need [ROLE] to unblock it.',
      zh: '这超出我这边的范围，需要 [角色] 来推进。',
      usage: '跨团队同步会里明确边界与所需角色，避免无效等待。',
      replace: '[ROLE] → a DBA / the platform team / security review。',
      fit: '外企技术同步会议 · 项目进度跟踪会' },
    { id: 'm-15', category: '遇到阻塞',
      en: "[SERVICE] is timing out in [ENV], so I can't verify [TASK].",
      zh: '[服务] 在 [环境] 超时，导致 [任务] 无法验证。',
      usage: '技术同步会议说明环境类阻塞，因果清楚、便于定位。',
      replace: '[SERVICE] → the auth service；[ENV] → staging；[TASK] → the login flow。',
      fit: '外企技术研讨会 · 技术同步会议' },

    // 提出疑问
    { id: 'm-16', category: '提出疑问',
      en: 'Could you clarify what [TERM] means in this context?',
      zh: '能说明一下这里 [术语] 具体指什么吗？',
      usage: '技术研讨会上确认术语语义，比直接说「听不懂」更专业。',
      replace: '[TERM] → eventual consistency / idempotency / the critical path。',
      fit: '外企技术研讨会 · 技术方案评审会' },
    { id: 'm-17', category: '提出疑问',
      en: 'Just to confirm — are we targeting [VERSION_A] or [VERSION_B]?',
      zh: '确认一下，我们目标是 [版本 A] 还是 [版本 B]？',
      usage: '版本同步会、项目进度跟踪会上对齐目标，避免做完才发现方向错。',
      replace: '[VERSION_A] → v2.4；[VERSION_B] → v2.5。',
      fit: '外企项目进度跟踪会 · 版本同步会' },
    { id: 'm-18', category: '提出疑问',
      en: "What's the fallback if [COMPONENT] fails at runtime?",
      zh: '如果 [组件] 运行时失败，兜底方案是什么？',
      usage: '技术研讨会方案评审，追问健壮性，是高频工程问题。',
      replace: '[COMPONENT] → the queue consumer / the cache layer。',
      fit: '外企技术研讨会 · 技术方案评审会' },
    { id: 'm-19', category: '提出疑问',
      en: 'Do we have data on [METRIC] before we decide?',
      zh: '决策之前，我们有 [指标] 的数据吗？',
      usage: '技术研讨会把讨论拉回数据，避免纯主观争论。',
      replace: '[METRIC] → p99 latency / error rate / cache hit ratio。',
      fit: '外企技术研讨会 · 技术方案评审会' },
    { id: 'm-20', category: '提出疑问',
      en: 'Who owns [TASK] after this handoff?',
      zh: '交接之后 [任务] 由谁负责？',
      usage: '项目同步会收尾时确认 owner，防止行动项落空。',
      replace: '[TASK] → the on-call rotation / the data backfill。',
      fit: '外企项目进度跟踪会 · 技术同步会议' },

    // 讨论方案
    { id: 'm-21', category: '讨论方案',
      en: 'One option is to [ACTION]; the trade-off is [COST].',
      zh: '一个方案是 [做法]，代价是 [成本]。',
      usage: '技术研讨会提出方案并主动说明权衡，外企技术讨论高频句式。',
      replace: '[ACTION] → cache at the edge；[COST] → stale reads。',
      fit: '外企技术研讨会 · 技术方案评审会' },
    { id: 'm-22', category: '讨论方案',
      en: "I'd suggest we go with [OPTION] for now and revisit after [MILESTONE].",
      zh: '我建议先采用 [方案]，[里程碑] 之后再重新评估。',
      usage: '讨论僵持时给出可落地的临时决策，适合技术研讨会。',
      replace: '[OPTION] → the simpler polling approach；[MILESTONE] → the load test。',
      fit: '外企技术研讨会 · 项目进度跟踪会' },
    { id: 'm-23', category: '讨论方案',
      en: 'Can we split this into [N] smaller PRs to reduce review risk?',
      zh: '能拆成 [N] 个更小的 PR 来降低 review 风险吗？',
      usage: '技术同步会讨论提交策略，具体、可执行，不空谈流程。',
      replace: '[N] → two / three；review risk 也可换成 merge conflicts。',
      fit: '外企技术同步会议 · 技术研讨会' },
    { id: 'm-24', category: '讨论方案',
      en: "Let's compare [A] and [B] on latency and maintenance cost.",
      zh: '我们从延迟和维护成本两方面对比 [A] 和 [B]。',
      usage: '技术研讨会把方案对比落到具体维度，方便收敛结论。',
      replace: '[A]/[B] → Redis / local cache、polling / webhook。',
      fit: '外企技术研讨会 · 技术方案评审会' },
    { id: 'm-25', category: '讨论方案',
      en: "That works, but we should validate it with a quick [TEST] first.",
      zh: '这个可行，但最好先用一个简短的 [测试] 验证一下。',
      usage: '先认可再补充条件，适合技术方案讨论，语气不冒犯。',
      replace: '[TEST] → spike / benchmark / load test。',
      fit: '外企技术研讨会 · 技术方案评审会' },

    // 表达不同意
    { id: 'm-26', category: '表达不同意',
      en: "I see the point, but I'm a bit concerned about [RISK].",
      zh: '我理解这个思路，不过对 [风险] 有点担心。',
      usage: '技术研讨会上礼貌表达不同意见，先认可再提出具体顾虑。',
      replace: '[RISK] → the migration window / backward compatibility。',
      fit: '外企技术研讨会 · 技术方案评审会' },
    { id: 'm-27', category: '表达不同意',
      en: "I'm not fully convinced that [ASSUMPTION] holds in [ENV].",
      zh: '我不太确定 [前提] 在 [环境] 下是否成立。',
      usage: '方案评审时质疑技术假设，对事不对人。',
      replace: '[ASSUMPTION] → the ordering guarantee；[ENV] → prod。',
      fit: '外企技术研讨会 · 技术方案评审会' },
    { id: 'm-28', category: '表达不同意',
      en: 'Can we push back on this? The current [CONSTRAINT] makes it hard.',
      zh: '这一条能不能往后放？当前 [约束] 下比较难。',
      usage: '项目进度跟踪会里协商范围或排期，给出客观原因。',
      replace: '[CONSTRAINT] → headcount / the code freeze / the review bandwidth。',
      fit: '外企项目进度跟踪会 · 版本同步会' },
    { id: 'm-29', category: '表达不同意',
      en: "I'd lean against [OPTION] because it adds [COST] without clear gain.",
      zh: '我倾向于不做 [方案]，因为会增加 [成本] 但收益不明确。',
      usage: '技术研讨会上给出有理由的反对，比直接说 no 更容易被接受。',
      replace: '[OPTION] → a new service；[COST] → operational overhead。',
      fit: '外企技术研讨会 · 技术方案评审会' },
    { id: 'm-30', category: '表达不同意',
      en: "Let me play devil's advocate for a second — what if [SCENARIO]?",
      zh: '我临时唱个反调——如果 [场景] 发生了呢？',
      usage: '技术研讨会压力测试方案时的委婉开场，外企会议很常用。',
      replace: '[SCENARIO] → the upstream is down / traffic doubles。',
      fit: '外企技术研讨会 · 技术方案评审会' },

    // 收尾总结
    { id: 'm-31', category: '收尾总结',
      en: 'To recap: [ACTION_A] by [OWNER_A], and [ACTION_B] by [DATE].',
      zh: '总结一下：[负责人 A] 负责 [动作 A]，[动作 B] 在 [日期] 前完成。',
      usage: '项目进度跟踪会收尾，把行动项、负责人、时间一次说清。',
      replace: '[ACTION_A] → the schema migration；[DATE] → Friday。',
      fit: '外企项目进度跟踪会 · 技术同步会议' },
    { id: 'm-32', category: '收尾总结',
      en: "I'll drop the action items in [CHANNEL] after this call.",
      zh: '会后我把 action items 发到 [渠道]。',
      usage: '线上沟通场景，让口头结论落到可追溯的文字记录。',
      replace: '[CHANNEL] → the Slack channel / Teams / the ticket。',
      fit: '外企技术同步会议 · 线上沟通' },
    { id: 'm-33', category: '收尾总结',
      en: 'Are we aligned on [DECISION] before we close?',
      zh: '结束前确认一下，我们对 [决策] 达成一致了吗？',
      usage: '技术研讨会收尾做最后确认，避免会后各做各的。',
      replace: '[DECISION] → the interface contract / the rollout plan。',
      fit: '外企技术研讨会 · 项目进度跟踪会' },
    { id: 'm-34', category: '收尾总结',
      en: 'Nothing else from my side — thanks everyone.',
      zh: '我这边没有别的了，谢谢大家。',
      usage: '每日站会或同步会里结束自己发言，简短自然。',
      replace: '无需替换，可直接整句背诵使用。',
      fit: '外企项目进度跟踪会 · 每日站会' },
    { id: 'm-35', category: '收尾总结',
      en: "Let's park [TOPIC] and take it offline.",
      zh: '[话题] 先记下，会后单独聊。',
      usage: '技术会议控场，避免少数人话题占满全员时间。',
      replace: '[TOPIC] → the deployment detail / the naming discussion。',
      fit: '外企技术研讨会 · 项目进度跟踪会' }
  ],

  /* ---------- 项目进度句型 ---------- */
  progressCategories: ['进度正常', '延期风险', '依赖阻塞', '资源需求', '版本同步', '风险上报'],
  progressModes: ['全部', '口头会议', '文字同步'],

  progressPhrases: [
    // 进度正常
    { id: 'p-01', category: '进度正常', mode: '口头会议',
      en: "We're on track — [MODULE] landed yesterday.",
      zh: '我们按计划推进，[模块] 昨天已完成。',
      usage: '站会 / 项目进度跟踪会口头汇报，先给结论再给事实。',
      replace: '[MODULE] → the retry logic / the auth middleware。',
      fit: '外企项目进度跟踪会 · 每日站会' },
    { id: 'p-02', category: '进度正常', mode: '口头会议',
      en: 'No blockers on my side; [TASK] is about [N]% done.',
      zh: '我这边没有阻塞，[任务] 完成约 [N]%。',
      usage: '每日站会标准三件套：阻塞、任务、完成度，语速慢也能说清。',
      replace: '[TASK] → the data backfill；[N] → 70。',
      fit: '外企项目进度跟踪会 · 每日站会' },
    { id: 'p-03', category: '进度正常', mode: '文字同步',
      en: '[MODULE] is merged and available in [ENV]. No action needed.',
      zh: '[模块] 已合并，[环境] 可用，无需额外操作。',
      usage: 'Slack / Teams 文字同步，结尾 No action needed 明确不需要别人动手。',
      replace: '[MODULE] → the config change；[ENV] → staging。',
      fit: '外企项目进度跟踪会 · 会后 Slack/Teams 同步' },
    { id: 'p-04', category: '进度正常', mode: '文字同步',
      en: 'Status: on track. ETA for [TASK] remains [DATE].',
      zh: '状态：正常。[任务] 预计完成时间仍为 [日期]。',
      usage: '文字版进度周报或频道固定格式，方便一眼扫读。',
      replace: '[TASK] → the migration；[DATE] → Nov 28。',
      fit: '外企技术同步会议 · 会后文字同步' },

    // 延期风险
    { id: 'p-05', category: '延期风险', mode: '口头会议',
      en: "We're likely to slip by [N] days because of [REASON].",
      zh: '因为 [原因]，我们可能延期 [N] 天。',
      usage: '进度跟踪会上主动报延期，给幅度与原因，方便当场调范围。',
      replace: '[N] → two；[REASON] → the flaky integration test。',
      fit: '外企项目进度跟踪会 · 技术同步会议' },
    { id: 'p-06', category: '延期风险', mode: '口头会议',
      en: "I don't think we'll make [DATE] with the current scope.",
      zh: '按当前范围，我觉得赶不上 [日期]。',
      usage: '版本同步会里委婉但明确地提出排期不可达。',
      replace: '[DATE] → the Nov 28 release / Friday。',
      fit: '外企项目进度跟踪会 · 版本同步会' },
    { id: 'p-07', category: '延期风险', mode: '文字同步',
      en: 'Heads-up: [TASK] is at risk of missing [DATE]. New ETA: [DATE_B].',
      zh: '提醒：[任务] 有错过 [日期] 的风险，新的预计时间是 [日期 B]。',
      usage: 'Slack / Teams 文字同步的延期标准写法：提醒 + 风险 + 新 ETA。',
      replace: '[TASK] → the load test；[DATE] → Friday；[DATE_B] → next Monday。',
      fit: '外企项目进度跟踪会 · 会后 Slack/Teams 同步' },
    { id: 'p-08', category: '延期风险', mode: '文字同步',
      en: 'Flagging a possible [N]-day delay on [MILESTONE]; details in [LINK].',
      zh: '标记 [里程碑] 可能延期 [N] 天，详情见 [链接]。',
      usage: '文字同步里把细节放到链接，消息本身保持简短。',
      replace: '[N] → three；[MILESTONE] → the beta；[LINK] → the ticket。',
      fit: '外企技术同步会议 · 会后文字同步' },

    // 依赖阻塞
    { id: 'p-09', category: '依赖阻塞', mode: '口头会议',
      en: "We're blocked by [TEAM] on [ARTIFACT].",
      zh: '我们被 [团队] 的 [产物] 卡住了。',
      usage: '进度跟踪会说明跨团队依赖，短句直接、方便当场协调。',
      replace: '[TEAM] → the platform team；[ARTIFACT] → the API spec。',
      fit: '外企项目进度跟踪会 · 技术同步会议' },
    { id: 'p-10', category: '依赖阻塞', mode: '口头会议',
      en: "I can't proceed until [DEPENDENCY] is available.",
      zh: '[依赖] 就绪之前我无法继续。',
      usage: '站会上说明硬依赖，把「卡住」说成条件而不是抱怨。',
      replace: '[DEPENDENCY] → the sandbox credentials / the schema change。',
      fit: '外企项目进度跟踪会 · 每日站会' },
    { id: 'p-11', category: '依赖阻塞', mode: '文字同步',
      en: 'Blocked: waiting on [ARTIFACT] from [TEAM]. Requested on [DATE], no ETA yet.',
      zh: '阻塞：等待 [团队] 提供 [产物]。[日期] 已提出，目前还没有预计时间。',
      usage: 'Slack / Teams 文字同步，带上提出时间便于后续升级。',
      replace: '[ARTIFACT] → the credentials；[TEAM] → infra；[DATE] → Nov 10。',
      fit: '外企项目进度跟踪会 · 会后 Slack/Teams 同步' },
    { id: 'p-12', category: '依赖阻塞', mode: '文字同步',
      en: "@[OWNER] could we get an ETA for [DEPENDENCY]? It's on the critical path.",
      zh: '@[负责人] 能给出 [依赖] 的预计时间吗？它在关键路径上。',
      usage: '文字同步里点名跟进，说明优先级而不显得催促。',
      replace: '[OWNER] → 同事英文名；[DEPENDENCY] → the upstream API。',
      fit: '外企技术同步会议 · 即时消息沟通' },

    // 资源需求
    { id: 'p-13', category: '资源需求', mode: '口头会议',
      en: 'We need one more [ROLE] for [DURATION] to hit [DATE].',
      zh: '要在 [日期] 完成，需要再加一位 [角色]、为期 [时长]。',
      usage: '进度跟踪会提出资源需求，把请求和目标日期绑定。',
      replace: '[ROLE] → QA / backend engineer；[DURATION] → two weeks；[DATE] → Nov 28。',
      fit: '外企项目进度跟踪会 · 技术同步会议' },
    { id: 'p-14', category: '资源需求', mode: '口头会议',
      en: 'Can we get [ENV] access for [TEAM] by [DATE]?',
      zh: '能在 [日期] 前给 [团队] 开通 [环境] 权限吗？',
      usage: '技术同步会上申请环境权限，带截止时间，容易得到承诺。',
      replace: '[ENV] → staging；[TEAM] → the data team；[DATE] → Wednesday。',
      fit: '外企技术研讨会 · 项目进度跟踪会' },
    { id: 'p-15', category: '资源需求', mode: '文字同步',
      en: 'Request: [ROLE] support for [DURATION] to cover [TASK]. Please reply by [DATE].',
      zh: '申请：[时长] 的 [角色] 支持，用于 [任务]，请 [日期] 前回复。',
      usage: '邮件或频道文字申请，明确回复截止时间，便于追踪。',
      replace: '[ROLE] → a DBA；[DURATION] → three days；[TASK] → the migration。',
      fit: '外企技术同步会议 · 邮件 / 即时消息' },
    { id: 'p-16', category: '资源需求', mode: '文字同步',
      en: 'Access request: [ENV] read/write for [SERVICE]. Ticket: [LINK].',
      zh: '权限申请：[服务] 的 [环境] 读写权限，工单：[链接]。',
      usage: '即时消息里附工单链接，减少来回追问。',
      replace: '[ENV] → prod-readonly；[SERVICE] → the reporting job；[LINK] → 工单号。',
      fit: '外企技术同步会议 · 即时消息沟通' },

    // 版本同步
    { id: 'p-17', category: '版本同步', mode: '口头会议',
      en: '[VERSION] is frozen; only bug fixes go in from now on.',
      zh: '[版本] 已冻结，之后只合入 bugfix。',
      usage: '版本同步会 / 进度跟踪会宣布 code freeze，边界清楚。',
      replace: '[VERSION] → v2.4 / the November release。',
      fit: '外企项目进度跟踪会 · 版本同步会' },
    { id: 'p-18', category: '版本同步', mode: '口头会议',
      en: "We're cutting the [VERSION] branch on [DATE].",
      zh: '我们会在 [日期] 切出 [版本] 分支。',
      usage: '技术同步会上同步发布节奏，方便各团队对齐提交时间。',
      replace: '[VERSION] → release/2.4；[DATE] → Thursday。',
      fit: '外企技术同步会议 · 版本同步会' },
    { id: 'p-19', category: '版本同步', mode: '文字同步',
      en: 'Release update: [VERSION] deployed to [ENV] at [TIME]. Rollback plan: [LINK].',
      zh: '版本更新：[版本] 于 [时间] 部署到 [环境]，回滚方案见 [链接]。',
      usage: '发布频道的文字同步，四要素齐全：版本、环境、时间、回滚。',
      replace: '[VERSION] → v2.4.1；[ENV] → staging；[TIME] → 14:00 UTC。',
      fit: '外企技术同步会议 · 会后 Slack/Teams 同步' },
    { id: 'p-20', category: '版本同步', mode: '文字同步',
      en: 'Scope for [VERSION] is locked: [ITEM_A], [ITEM_B]. Changes require sign-off.',
      zh: '[版本] 范围已锁定：[条目 A]、[条目 B]。变更需要审批。',
      usage: '文字版范围声明，避免口头结论之后继续被塞需求。',
      replace: '[VERSION] → v2.4；[ITEM_A]/[ITEM_B] → 具体功能名。',
      fit: '外企项目进度跟踪会 · 邮件 / 即时消息' },

    // 风险上报
    { id: 'p-21', category: '风险上报', mode: '口头会议',
      en: 'I want to flag a risk: [RISK] could affect [MILESTONE].',
      zh: '想提一个风险：[风险] 可能影响 [里程碑]。',
      usage: '技术研讨会或进度跟踪会主动上报，语气平稳、不制造紧张。',
      replace: '[RISK] → the third-party rate limit；[MILESTONE] → the beta。',
      fit: '外企技术研讨会 · 项目进度跟踪会' },
    { id: 'p-22', category: '风险上报', mode: '口头会议',
      en: 'This needs escalation — [ISSUE] has been open for [N] days.',
      zh: '这个需要升级处理，[问题] 已经挂了 [N] 天。',
      usage: '进度跟踪会上说明为何要升级，用时长做客观依据。',
      replace: '[ISSUE] → the access ticket；[N] → five。',
      fit: '外企项目进度跟踪会 · 技术同步会议' },
    { id: 'p-23', category: '风险上报', mode: '文字同步',
      en: 'Escalation: [ISSUE] impacts [MILESTONE]. Impact: [IMPACT]. Mitigation: [ACTION]. Owner: [OWNER].',
      zh: '升级：[问题] 影响 [里程碑]。影响：[影响]。缓解措施：[动作]。负责人：[负责人]。',
      usage: '升级邮件的文字骨架，四项齐全，收件人不用再追问。',
      replace: '[ISSUE] → the failing pipeline；[OWNER] → 负责人英文名。',
      fit: '外企技术同步会议 · 升级邮件' },
    { id: 'p-24', category: '风险上报', mode: '文字同步',
      en: 'Risks for this week: [RISK_A] (High), [RISK_B] (Low). Full log: [LINK].',
      zh: '本周风险：[风险 A]（高）、[风险 B]（低）。完整记录见 [链接]。',
      usage: '周报式文字同步，分级 + 链接，适合群发。',
      replace: '[RISK_A]/[RISK_B] → 具体风险；[LINK] → 风险登记表链接。',
      fit: '外企项目进度跟踪会 · 周报 / 邮件' }
  ],

  /* ---------- 技术邮件模板 ---------- */
  /* 正文中的 [XXX] 均为占位符，app.js 会自动提取并生成替换说明 */
  emailTemplates: [
    {
      id: 'e-01', name: '技术同步邮件', icon: 'fa-solid fa-comments',
      scene: '技术研讨会 / 技术同步会议之后，把结论、决策和下一步同步给全员。',
      subject: '[PROJECT] Tech Sync – [DATE]: status, decisions, and next steps',
      body: `Hi [TEAM],

Here's a quick sync on [PROJECT] after today's technical review.

Status
- [MODULE_A]: [STATUS_A] (owner: [OWNER_A])
- [MODULE_B]: [STATUS_B] (owner: [OWNER_B])
- Build / test: [BUILD_STATUS] on [ENV]

Decisions
1. We agreed on [DECISION].
2. [TOPIC] is parked and will be discussed offline.

Next steps
- [ACTION_A] — [OWNER_A], by [DATE_A]
- [ACTION_B] — [OWNER_B], by [DATE_B]

Please reply in thread if anything looks off before the next sync.`,
      signature: `Best regards,
[NAME]
[ROLE] | [TEAM]`,
      note: '适合外企技术研讨会、技术同步会议之后的书面沉淀；口头结论落到邮件，避免会后各做各的。'
    },
    {
      id: 'e-02', name: '进度汇报邮件', icon: 'fa-solid fa-chart-simple',
      scene: '项目进度跟踪会前后的周度进度汇报，向leader和协作团队同步状态。',
      subject: '[PROJECT] Progress Update – [DATE]: [STATUS]',
      body: `Hi [TEAM],

Weekly progress update for [PROJECT] as of [DATE].

Overall: [STATUS] (on track / at risk / delayed)
- Completed: [ITEM_A], [ITEM_B]
- In progress: [TASK] ([N]% done, ETA [DATE_A])
- Blocked: [BLOCKER] — waiting on [TEAM_A], requested on [DATE_B]

Risks
- [RISK] could affect [MILESTONE]. Mitigation: [ACTION].

Next milestone: [MILESTONE] on [DATE_C]. A short demo is planned for [DATE_D].

Let me know if you need more detail before the [MEETING] sync.`,
      signature: `Thanks,
[NAME]
[ROLE] | [TEAM]`,
      note: '适合外企项目进度跟踪会、周度站会同步；状态、完成度、阻塞、新 ETA 四项缺一不可。'
    },
    {
      id: 'e-03', name: '问题升级邮件', icon: 'fa-solid fa-triangle-exclamation',
      scene: '阻塞超过预期、影响里程碑时，向相关团队和管理者正式升级。',
      subject: 'Escalation: [PROJECT] — [ISSUE] blocking [MILESTONE]',
      body: `Hi [TEAM],

I'm escalating [ISSUE] because it is now blocking [MILESTONE] on [DATE].

Impact
- [IMPACT]
- Current workaround: [WORKAROUND]

Timeline
- First reported: [DATE_A] in [LINK]
- Open for: [N] days
- Owner so far: [OWNER]

What we need
- [ACTION_A] from [TEAM_A] by [DATE_B]
- A decision on [DECISION] in the [MEETING] sync

If we don't get an update by [DATE_B], we'll need to adjust the release scope for [VERSION].

Please let me know if I should route this to someone else.`,
      signature: `Thanks,
[NAME]
[ROLE] | [TEAM]`,
      note: '适合外企项目进度跟踪会无法解决的阻塞升级；陈述影响与所需动作，不指责、不带情绪。'
    },
    {
      id: 'e-04', name: '会议纪要 / Action Items', icon: 'fa-solid fa-list-check',
      scene: '技术同步会议结束时发出，把决策与行动项变成可追踪的文字记录。',
      subject: '[PROJECT] Sync Notes – [DATE]: decisions and action items',
      body: `Hi [TEAM],

Thanks for joining the [MEETING] sync. Short recap below.

Decisions
1. [DECISION]
2. [DECISION_B]

Action items
- [ACTION_A] | Owner: [OWNER_A] | Due: [DATE_A]
- [ACTION_B] | Owner: [OWNER_B] | Due: [DATE_B]

Open questions
- [QUESTION] — to be clarified by [OWNER_C]

Next sync: [DATE_C] in [CHANNEL]. Please flag any corrections by replying in thread.`,
      signature: `Best regards,
[NAME]
[ROLE] | [TEAM]`,
      note: '适合外企技术研讨会、项目进度跟踪会的收尾；每条行动项必须有 owner 和 due date。'
    }
  ],

  /* ---------- 练习自测 ---------- */
  /* answer 为正确选项下标（0 起）；channel 说明该表达适合会议还是文字沟通 */
  quiz: [
    { id: 'q-01', scene: '每日站会上，你想说「我这边没有阻塞，进度正常」。',
      options: [
        'No blockers on my side; we\'re on track.',
        'I have finished all my examinations.',
        'Everything is fine, don\'t worry about anything.',
        'Could you please send me the word list?'
      ], answer: 0, channel: '口头会议',
      explanation: '正确答案同时给出 blockers 与 on track 两个站会关键信息，简短可复述，适合口头会议（每日站会、外企项目进度跟踪会）。C 虽然客气，但没有任何可追踪的进度信息，会上不推荐；B、D 属于应试场景表达。' },
    { id: 'q-02', scene: '项目进度跟踪会上，你们被上游 API 卡住了，需要说清楚缺什么。',
      options: [
        'The upstream API is not very good, I think.',
        'We\'re blocked on the upstream API — the platform team hasn\'t provided the sandbox credentials yet.',
        'I will study the API documentation tomorrow.',
        'Maybe someone can help me someday.'
      ], answer: 1, channel: '口头会议',
      explanation: '正确答案包含阻塞对象、责任方、缺失产物三要素，适合口头会议（外企项目进度跟踪会、技术同步会议）。把同一句改成 "Blocked: waiting on ..." 就是标准的文字沟通（Slack/Teams）格式。' },
    { id: 'q-03', scene: '在 Slack / Teams 文字同步里，提醒大家某任务可能延期，并给出新预计时间。',
      options: [
        'Maybe we will be a little late, sorry about that.',
        'The task is quite difficult for me.',
        'Heads-up: [TASK] is at risk of missing Friday. New ETA: next Monday.',
        'Let\'s talk about this when we have time.'
      ], answer: 2, channel: '文字沟通',
      explanation: '正确答案是文字同步的标准结构：Heads-up + 风险 + 新 ETA，适合文字沟通，别人不用追问就能更新排期。会上口头版会说 "We\'re likely to slip by two days"。' },
    { id: 'q-04', scene: '技术研讨会上，你想礼貌地表达对某个方案的不同意见。',
      options: [
        'You are totally wrong about this design.',
        'I have no opinion, you can decide.',
        'Sorry, my English is not good enough to explain.',
        'I see the point, but I\'m a bit concerned about the migration window.'
      ], answer: 3, channel: '口头会议',
      explanation: '正确答案先认可再提出具体顾虑，对事不对人，适合口头会议（外企技术研讨会、技术方案评审会）。A 过于直接，C 用英语水平代替了技术判断。' },
    { id: 'q-05', scene: '技术研讨会上，请对方澄清一个技术术语在方案里的具体含义。',
      options: [
        'Could you clarify what eventual consistency means in this context?',
        'I don\'t know this word, can you translate it?',
        'What does this mean in the dictionary?',
        'Let\'s skip this part.'
      ], answer: 0, channel: '口头会议',
      explanation: '正确答案确认的是「在当前上下文中的语义」，是工程师的追问方式，适合口头会议（外企技术研讨会）。写成邮件时可换成 "Could you share how we define eventual consistency for [SERVICE]?"，属于文字沟通。' },
    { id: 'q-06', scene: '项目进度跟踪会收尾，你要把行动项、负责人和时间说清楚。',
      options: [
        'OK, that\'s all, bye everyone.',
        'The meeting was long but useful.',
        'To recap: schema migration by Alex, and load test by Friday.',
        'We will continue next time.'
      ], answer: 2, channel: '口头会议',
      explanation: '正确答案含动作 + 负责人 + 时间，适合口头会议收尾。会后应把同样内容发到 Slack / Teams 形成文字沟通闭环，也就是模板页的 Action Items 邮件。' },
    { id: 'q-07', scene: '发布频道里做文字同步，说明版本、环境、时间和回滚方案。',
      options: [
        'We made a new version today, great job.',
        'Release update: v2.4 deployed to staging at 14:00 UTC. Rollback plan: [LINK].',
        'The version is much bigger than before.',
        'Please check it when you are free.'
      ], answer: 1, channel: '文字沟通',
      explanation: '正确答案四要素齐全（版本 / 环境 / 时间 / 回滚），适合文字沟通（发布频道、同步邮件）。会上的口头版只需说 "v2.4 is on staging"，细节放链接。' },
    { id: 'q-08', scene: '项目进度跟踪会上，主动说明可能延期两天，但不夸大。',
      options: [
        'The project is a total disaster.',
        'Everything is perfect, no problem at all.',
        'We\'re likely to slip by two days because of the flaky integration test.',
        'I have no idea, you decide.'
      ], answer: 2, channel: '口头会议',
      explanation: '正确答案给出延期幅度 + 具体原因，适合口头会议，方便当场决定是加人还是缩范围。A 情绪化、C 隐瞒风险，都会让进度跟踪会失去作用。' },
    { id: 'q-09', scene: '站会上你被一个并发问题卡住，想请同事一起看一眼。',
      options: [
        'Please do this part for me.',
        'I\'m stuck on the race condition and could use a second pair of eyes.',
        'This is too hard, I give up.',
        'Can someone lend me a grammar book?'
      ], answer: 1, channel: '口头会议',
      explanation: '「could use a second pair of eyes」是外企工程师常用的协作求助句式，适合口头会议（每日站会、技术同步会），也可原样发到频道作为文字沟通求助。' },
    { id: 'q-10', scene: '写邮件正式升级一个已影响里程碑的阻塞问题。',
      options: [
        'Help me!!! This is urgent!',
        'Why is nobody working on my ticket?',
        'Just checking in, no rush at all.',
        'Escalation: [ISSUE] impacts the Nov 28 milestone. Impact: ... Mitigation: ... Owner: ...'
      ], answer: 3, channel: '文字沟通',
      explanation: '正确答案给出影响面、缓解措施、负责人，适合文字沟通（升级邮件）。会上的口头版是 "This needs escalation"，细节必须落在邮件里才可被追踪。' },
    { id: 'q-11', scene: '版本同步会上宣布版本已冻结，之后只接受 bugfix。',
      options: [
        'v2.4 is frozen; only bug fixes go in from now on.',
        'We don\'t write code anymore.',
        'The version is cold.',
        'Everyone can still add features freely.'
      ], answer: 0, channel: '口头会议',
      explanation: '「is frozen」是 release freeze 的标准说法，适合口头会议（外企版本同步会、项目进度跟踪会）。文字沟通版写成 "Scope for v2.4 is locked"。C 是字面误译，D 意思完全相反。' },
    { id: 'q-12', scene: '外企技术研讨会上提出一个方案，同时说明它的代价。',
      options: [
        'I think this is a very good idea and I like it so much.',
        'One option is to cache at the edge; the trade-off is stale reads.',
        'Let\'s ask the manager to decide everything.',
        'Maybe, perhaps, I am not sure, sorry.'
      ], answer: 1, channel: '口头会议',
      explanation: '正确答案用「方案 + trade-off」结构，是外企技术研讨会里最实用的表达之一，适合口头会议；把权衡写进邮件则属于文字沟通。B 只表态不给信息，会议上无法推进决策。' }
  ]
};

/* =============================================================
   扩展内容区
   新增句子 / 模板 / 题目：直接在下面对应的 push() 里追加一个对象。
   app.js 初始化时会按分类顺序自动归组，不必在意插入位置。
   ============================================================= */
window.SITE_DATA.meetingPhrases.push(
  // 开场破冰
  { id: 'm-36', category: '开场破冰',
    en: "Let's do a quick round — one update per person, blockers only.",
    zh: '我们快速过一轮，每人一条，只讲阻塞。',
    usage: '每日站会开场，明确规则避免变成闲聊，适合外企项目进度跟踪会。',
    replace: 'blockers only → status only / risks only。',
    fit: '外企项目进度跟踪会 · 每日站会' },
  { id: 'm-37', category: '开场破冰',
    en: "I'll share the agenda in [CHANNEL] so everyone can follow along.",
    zh: '我把议程发到 [渠道]，大家可以对着看。',
    usage: '线上技术同步会议开场，方便远程同事跟上节奏。',
    replace: '[CHANNEL] → the Slack channel / the meeting chat。',
    fit: '外企技术同步会议 · 线上沟通' },
  { id: 'm-38', category: '开场破冰',
    en: "We have [N] minutes, so let's focus on [TOPIC] first.",
    zh: '我们有 [N] 分钟，先聚焦 [话题]。',
    usage: '时间有限的技术研讨会开场，主动设定优先级。',
    replace: '[N] → 20 / 30；[TOPIC] → the interface contract。',
    fit: '外企技术研讨会 · 项目进度跟踪会' },

  // 汇报进展
  { id: 'm-39', category: '汇报进展',
    en: '[TASK] is code-complete; QA starts on [DATE].',
    zh: '[任务] 代码已完成，QA 在 [日期] 开始。',
    usage: '进度跟踪会区分「写完」与「可交付」，避免被误判为已完成测试。',
    replace: '[TASK] → the export flow；[DATE] → Monday。',
    fit: '外企项目进度跟踪会 · 技术同步会议' },
  { id: 'm-40', category: '汇报进展',
    en: 'We shipped [FEATURE] behind a feature flag in [ENV].',
    zh: '[功能] 已在 [环境] 通过功能开关上线。',
    usage: '技术同步会说明灰度上线方式，隐含「可随时关闭」的信息。',
    replace: '[FEATURE] → the new search ranking；[ENV] → prod / canary。',
    fit: '外企技术研讨会 · 版本同步会' },
  { id: 'm-41', category: '汇报进展',
    en: 'The [METRIC] dropped by [N]% after [CHANGE].',
    zh: '[改动] 之后 [指标] 下降了 [N]%。',
    usage: '技术研讨会用数据汇报优化结果，比形容词更有说服力。',
    replace: '[METRIC] → p99 latency / error rate；[CHANGE] → the cache change。',
    fit: '外企技术研讨会 · 技术方案评审会' },

  // 遇到阻塞
  { id: 'm-42', category: '遇到阻塞',
    en: "The [PIPELINE] has been red since [DATE], so we can't cut a build.",
    zh: '[流水线] 从 [日期] 起一直是红的，我们没法出包。',
    usage: '技术同步会说明 CI 阻塞，因果关系清楚，便于安排修复优先级。',
    replace: '[PIPELINE] → CI / the main branch；[DATE] → Monday。',
    fit: '外企技术同步会议 · 项目进度跟踪会' },
  { id: 'm-43', category: '遇到阻塞',
    en: "We're waiting on sign-off from [TEAM] before merging [PR].",
    zh: '合并 [PR] 之前，还在等 [团队] 的审批。',
    usage: '进度跟踪会说明流程类阻塞，明确卡在哪个环节。',
    replace: '[TEAM] → security / the platform team；[PR] → PR #482。',
    fit: '外企项目进度跟踪会 · 技术同步会议' },
  { id: 'm-44', category: '遇到阻塞',
    en: 'This is a known issue in [VERSION]; the workaround is [ACTION].',
    zh: '这是 [版本] 的已知问题，临时方案是 [动作]。',
    usage: '技术研讨会上说明「不是新问题」，并给出可继续推进的绕行方案。',
    replace: '[VERSION] → v2.3；[ACTION] → disabling the batch job。',
    fit: '外企技术研讨会 · 版本同步会' },

  // 提出疑问
  { id: 'm-45', category: '提出疑问',
    en: 'Is [FEATURE] in scope for [VERSION] or the next one?',
    zh: '[功能] 属于 [版本] 的范围，还是放到下一版？',
    usage: '版本同步会 / 进度跟踪会确认范围，避免做完才发现排错版本。',
    replace: '[FEATURE] → the bulk export；[VERSION] → v2.4。',
    fit: '外企项目进度跟踪会 · 版本同步会' },
  { id: 'm-46', category: '提出疑问',
    en: 'How are we handling retries when [SERVICE] returns a timeout?',
    zh: '[服务] 返回超时时，重试是怎么处理的？',
    usage: '技术研讨会追问可靠性细节，比泛泛问「稳不稳」更有用。',
    replace: '[SERVICE] → the upstream API / the queue consumer。',
    fit: '外企技术研讨会 · 技术方案评审会' },
  { id: 'm-47', category: '提出疑问',
    en: 'Does [DECISION] change the [CONTRACT] for [TEAM]?',
    zh: '[决策] 会改变给 [团队] 的 [契约] 吗？',
    usage: '跨团队技术同步会确认影响面，防止下游按旧接口继续开发。',
    replace: '[DECISION] → the schema change；[CONTRACT] → API contract。',
    fit: '外企技术同步会议 · 项目进度跟踪会' },

  // 讨论方案
  { id: 'm-48', category: '讨论方案',
    en: 'A simpler approach would be to [ACTION] and skip [COMPONENT].',
    zh: '更简单的做法是 [动作]，先跳过 [组件]。',
    usage: '技术研讨会提出降复杂度方案，适合范围被撑大时。',
    replace: '[ACTION] → reuse the existing job；[COMPONENT] → the new queue。',
    fit: '外企技术研讨会 · 技术方案评审会' },
  { id: 'm-49', category: '讨论方案',
    en: "Let's timebox a spike to [N] days before committing to [OPTION].",
    zh: '在决定 [方案] 之前，先给技术预研 [N] 天的时间盒。',
    usage: '技术研讨会在信息不足时给出有边界的推进方式，避免无限调研。',
    replace: '[N] → two；[OPTION] → the new storage layer。',
    fit: '外企技术研讨会 · 技术方案评审会' },
  { id: 'm-50', category: '讨论方案',
    en: 'We can roll this out behind a flag and measure [METRIC].',
    zh: '可以用功能开关灰度上线，然后观察 [指标]。',
    usage: '技术研讨会讨论上线策略，把风险和验证方式一起说清。',
    replace: '[METRIC] → error rate / conversion / p99 latency。',
    fit: '外企技术研讨会 · 版本同步会' },

  // 表达不同意
  { id: 'm-51', category: '表达不同意',
    en: "I agree with the goal, but I'd question [ASSUMPTION].",
    zh: '目标我同意，但 [前提] 我想再确认一下。',
    usage: '技术研讨会把分歧收敛到一个具体假设，对事不对人。',
    replace: '[ASSUMPTION] → the ordering guarantee / the traffic estimate。',
    fit: '外企技术研讨会 · 技术方案评审会' },
  { id: 'm-52', category: '表达不同意',
    en: "From the [ENV] data, I'm seeing a different picture.",
    zh: '从 [环境] 的数据看，结论不太一样。',
    usage: '用数据表达不同意见，适合技术研讨会而非主观争论。',
    replace: '[ENV] → staging / prod / the load test。',
    fit: '外企技术研讨会 · 技术方案评审会' },
  { id: 'm-53', category: '表达不同意',
    en: 'That could work for [CASE_A], but not for [CASE_B].',
    zh: '这对 [场景 A] 可行，但 [场景 B] 不行。',
    usage: '技术研讨会给出有条件的反对，比全盘否定更容易推进讨论。',
    replace: '[CASE_A] → read-heavy traffic；[CASE_B] → write-heavy workloads。',
    fit: '外企技术研讨会 · 技术方案评审会' },

  // 收尾总结
  { id: 'm-54', category: '收尾总结',
    en: 'Let me summarize the three decisions before we wrap up.',
    zh: '结束前我总结一下三项决策。',
    usage: '技术研讨会收尾，把讨论结果固定下来。',
    replace: 'three → two / four；decisions → action items。',
    fit: '外企技术研讨会 · 项目进度跟踪会' },
  { id: 'm-55', category: '收尾总结',
    en: "I'll update [TICKET] and link it in [CHANNEL].",
    zh: '我会更新 [工单]，并把链接发到 [渠道]。',
    usage: '会后把口头结论落到可追踪的记录，适合线上沟通场景。',
    replace: '[TICKET] → the tracking ticket；[CHANNEL] → Teams / the Slack thread。',
    fit: '外企技术同步会议 · 线上沟通' },
  { id: 'm-56', category: '收尾总结',
    en: 'Next sync is [DATE]; please bring [ARTIFACT].',
    zh: '下次同步在 [日期]，请带上 [产物]。',
    usage: '项目进度跟踪会收尾，提前说明下次要准备什么。',
    replace: '[DATE] → Thursday；[ARTIFACT] → the benchmark results。',
    fit: '外企项目进度跟踪会 · 技术同步会议' }
);

window.SITE_DATA.progressPhrases.push(
  { id: 'p-25', category: '进度正常', mode: '口头会议',
    en: '[TASK] is code-complete and ready for QA on [DATE].',
    zh: '[任务] 代码完成，[日期] 可以交给 QA。',
    usage: '进度跟踪会口头汇报，明确下一步交接对象与时间。',
    replace: '[TASK] → the export flow；[DATE] → Wednesday。',
    fit: '外企项目进度跟踪会 · 版本同步会' },
  { id: 'p-26', category: '进度正常', mode: '文字同步',
    en: 'Update: [ITEM_A] and [ITEM_B] are done. No change to the [DATE] milestone.',
    zh: '同步：[条目 A]、[条目 B] 已完成。[日期] 里程碑不变。',
    usage: 'Slack / Teams 文字同步，主动说明排期未变，减少追问。',
    replace: '[ITEM_A]/[ITEM_B] → 具体任务；[DATE] → Nov 28。',
    fit: '外企技术同步会议 · 会后 Slack/Teams 同步' },

  { id: 'p-27', category: '延期风险', mode: '口头会议',
    en: 'The [DATE] milestone is at risk; we need a scope call today.',
    zh: '[日期] 里程碑有风险，今天需要定一下范围。',
    usage: '进度跟踪会上把风险转成待决事项，推动当场决策。',
    replace: '[DATE] → Nov 28；scope call → a priority call。',
    fit: '外企项目进度跟踪会 · 版本同步会' },
  { id: 'p-28', category: '延期风险', mode: '文字同步',
    en: 'Risk: [TASK] may miss [DATE] due to [REASON]. Proposed new ETA: [DATE_B]. Owner: [OWNER].',
    zh: '风险：[任务] 因 [原因] 可能错过 [日期]。建议新预计时间：[日期 B]。负责人：[负责人]。',
    usage: '文字同步里一次给全原因、新 ETA 和负责人，可直接转为决议。',
    replace: '[REASON] → the flaky test；[OWNER] → 负责人英文名。',
    fit: '外企项目进度跟踪会 · 会后文字同步' },

  { id: 'p-29', category: '依赖阻塞', mode: '口头会议',
    en: 'Nothing has moved on [DEPENDENCY] since [DATE].',
    zh: '[依赖] 从 [日期] 起一直没有进展。',
    usage: '进度跟踪会说明长期阻塞，用时间点做升级依据。',
    replace: '[DEPENDENCY] → the API spec；[DATE] → last Monday。',
    fit: '外企项目进度跟踪会 · 技术同步会议' },
  { id: 'p-30', category: '依赖阻塞', mode: '文字同步',
    en: 'Dependency status: [ARTIFACT] still pending from [TEAM]. Escalating if no ETA by [DATE].',
    zh: '依赖状态：仍在等 [团队] 提供 [产物]。[日期] 前没有预计时间就升级。',
    usage: '文字同步里给出升级条件，语气客观、留有余地。',
    replace: '[ARTIFACT] → the credentials；[DATE] → Friday。',
    fit: '外企技术同步会议 · 会后 Slack/Teams 同步' },

  { id: 'p-31', category: '资源需求', mode: '口头会议',
    en: "We're short on [ROLE] capacity for [TASK] this sprint.",
    zh: '这个迭代里 [任务] 的 [角色] 人力不够。',
    usage: '迭代规划或进度跟踪会提出资源缺口，指向具体任务。',
    replace: '[ROLE] → QA / backend；[TASK] → the regression run。',
    fit: '外企项目进度跟踪会 · 迭代规划会' },
  { id: 'p-32', category: '资源需求', mode: '文字同步',
    en: 'Capacity request: [N] [ROLE] days for [TASK]. Impact if unmet: [IMPACT]. Please confirm by [DATE].',
    zh: '资源申请：[任务] 需要 [N] 人日的 [角色]。不满足的影响：[影响]。请 [日期] 前确认。',
    usage: '邮件或频道文字申请，量化需求并写明不满足的后果。',
    replace: '[N] → 3；[ROLE] → DBA；[IMPACT] → a two-day slip。',
    fit: '外企项目进度跟踪会 · 邮件 / 即时消息' },

  { id: 'p-33', category: '版本同步', mode: '口头会议',
    en: 'The [VERSION] rollout is at [N]% and metrics look stable.',
    zh: '[版本] 灰度已到 [N]%，指标看起来稳定。',
    usage: '版本同步会 / 发布站会口头汇报灰度状态。',
    replace: '[VERSION] → v2.4；[N] → 20 / 50。',
    fit: '外企技术同步会议 · 版本同步会' },
  { id: 'p-34', category: '版本同步', mode: '文字同步',
    en: 'Rollout: [VERSION] at [N]% in [ENV]. Error rate: [METRIC]. Next gate: [DATE].',
    zh: '灰度进展：[版本] 在 [环境] 已到 [N]%。错误率：[指标]。下一个检查点：[日期]。',
    usage: '发布频道的文字同步，比例、指标、检查点齐全，便于异步跟踪。',
    replace: '[ENV] → canary；[METRIC] → 0.2%；[DATE] → Friday。',
    fit: '外企技术同步会议 · 会后 Slack/Teams 同步' },

  { id: 'p-35', category: '风险上报', mode: '口头会议',
    en: "I'd like to log [RISK] as High before we close.",
    zh: '结束前我想把 [风险] 记为高优先级。',
    usage: '进度跟踪会收尾时正式登记风险，确保进入风险清单。',
    replace: '[RISK] → the third-party rate limit。',
    fit: '外企项目进度跟踪会 · 技术同步会议' },
  { id: 'p-36', category: '风险上报', mode: '文字同步',
    en: 'Risk log update: [RISK] raised to High. Impact: [IMPACT]. Owner: [OWNER]. Review: [DATE].',
    zh: '风险表更新：[风险] 升级为高。影响：[影响]。负责人：[负责人]。复查：[日期]。',
    usage: '周报或风险登记表的文字同步，字段固定、便于汇总。',
    replace: '[RISK]/[IMPACT] → 具体风险与影响；[DATE] → next Monday。',
    fit: '外企项目进度跟踪会 · 周报 / 邮件' }
);

window.SITE_DATA.emailTemplates.push(
  {
    id: 'e-05', name: '会议邀约 / 议程邮件', icon: 'fa-solid fa-calendar-day',
    scene: '技术研讨会、项目进度跟踪会的会前邀约，写清目标、议程与预读材料。',
    subject: '[PROJECT] Tech Sync – [DATE] [TIME]: agenda and pre-read',
    body: `Hi [TEAM],

Inviting you to the [MEETING] sync on [DATE] at [TIME]. Goal: align on [DECISION] before [MILESTONE].

Agenda
1. Quick status round (5 min) — [OWNER_A]
2. [TOPIC] and open questions (15 min) — [OWNER_B]
3. Decisions and action items (10 min)

Pre-read
- [LINK] (current design / progress dashboard)
- Please add your questions to [TICKET] before [DATE_A].

If the time doesn't work, reply in thread and I'll adjust.`,
    signature: `Thanks,
[NAME]
[ROLE] | [TEAM]`,
    note: '适合外企技术研讨会、项目进度跟踪会的会前邀约；先写清目标和预读材料，会议才不会空转。'
  },
  {
    id: 'e-06', name: '依赖跟进 / 资源协调', icon: 'fa-solid fa-link',
    scene: '跨团队依赖迟迟不到位时，礼貌跟进并说明影响与截止时间。',
    subject: 'Follow-up: [ARTIFACT] from [TEAM_A] needed by [DATE] for [MILESTONE]',
    body: `Hi [TEAM_A],

Following up on [ARTIFACT], requested on [DATE_A]. We're still blocked on [DEPENDENCY].

Why it matters
- [TASK] is on the critical path for [MILESTONE] on [DATE_B].
- Without it, the new ETA moves to [DATE_C].

What we need
- [ARTIFACT], or a confirmed date from [OWNER].
- If that's not feasible, a workaround we can use in [ENV].

Happy to jump on a quick call in [CHANNEL] if that's easier.`,
    signature: `Best regards,
[NAME]
[ROLE] | [TEAM]`,
    note: '适合外企项目进度跟踪会里未解决的跨团队依赖跟进；陈述影响与所需动作，不催促、不指责。'
  }
);

window.SITE_DATA.quiz.push(
  { id: 'q-13', scene: '项目进度跟踪会上，说明任务代码已完成、QA 明天开始。',
    options: [
      'I finished my coding homework last night.',
      '[TASK] is code-complete; QA starts tomorrow.',
      'The quality is very good, I promise.',
      'We will test it sometime in the future.'
    ], answer: 1, channel: '口头会议',
    explanation: 'code-complete 明确区分「写完代码」与「可交付」，适合口头会议（外企项目进度跟踪会、技术同步会）。文字沟通版写 "[TASK] is code-complete; QA starts [DATE]."。' },
  { id: 'q-14', scene: 'Slack / Teams 里跟进上游依赖，请负责人给出预计时间。',
    options: [
      'Why are you so slow?',
      'Please hurry up, thanks.',
      'When you have time, no rush at all.',
      "@[OWNER] could we get an ETA for the upstream API? It's on the critical path."
    ], answer: 3, channel: '文字沟通',
    explanation: '正确答案有点名、ETA 和「在关键路径上」的优先级说明，适合文字沟通（Slack/Teams）。会上口头版是 "We\'re blocked by the platform team on the API spec."。' },
  { id: 'q-15', scene: '技术研讨会上，建议在决定方案之前先做有限时间的技术预研。',
    options: [
      "Let's timebox a spike to two days before committing to this option.",
      'We should research forever until we are sure.',
      'I think we can just guess.',
      "Let's skip the technical part."
    ], answer: 0, channel: '口头会议',
    explanation: 'timebox a spike 同时给出动作与时间边界，适合口头会议（外企技术研讨会、方案评审会），避免调研无限拖长。' },
  { id: 'q-16', scene: '技术同步会上说明 CI 一直红灯，导致无法出包。',
    options: [
      'The color of the system is not good.',
      'I don\'t like the build tool.',
      "The pipeline has been red since Monday, so we can't cut a build.",
      'Maybe the package is somewhere.'
    ], answer: 2, channel: '口头会议',
    explanation: 'red 和 cut a build 是工程团队的日常说法，适合口头会议（技术同步会、项目进度跟踪会）。文字沟通版写 "CI red since [DATE]; no build available."。' },
  { id: 'q-17', scene: '发布频道里同步灰度比例、稳定性与下一个检查点。',
    options: [
      'We released something good today.',
      'Rollout: v2.4 at 20% in canary. Error rate is stable. Next gate: Friday.',
      'Everything is fine, please ignore.',
      'The version is coming soon, maybe.'
    ], answer: 1, channel: '文字沟通',
    explanation: '正确答案包含比例、环境、指标与下一个检查点，适合文字沟通（发布频道 / 同步邮件）。会上口头版是 "The rollout is at 20% and metrics look stable."。' },
  { id: 'q-18', scene: '技术研讨会上同意目标，但想质疑一个技术前提。',
    options: [
      'You are wrong, the goal is bad.',
      'I agree with everything, no comments.',
      "I agree with the goal, but I'd question the ordering assumption.",
      "Sorry, I can't speak English well."
    ], answer: 2, channel: '口头会议',
    explanation: '先同意目标、再质疑具体假设，把分歧收敛到可验证的一点，适合口头会议（外企技术研讨会、方案评审会）。' }
);

/* 首页：一场技术会议的 5 个阶段（点击可跳到对应分类） */
window.SITE_DATA.flow = [
  { step: '01', category: '开场破冰', label: '开场对齐',
    en: "Just to make sure we're aligned, the goal today is to agree on [DELIVERABLE].",
    zh: '先说清今天要定下什么。' },
  { step: '02', category: '汇报进展', label: '汇报进展',
    en: 'On my side, [MODULE] is done and has been merged into [BRANCH].',
    zh: '说结果和可验证的事实，不说感受。' },
  { step: '03', category: '遇到阻塞', label: '暴露阻塞',
    en: "We're blocked on [DEPENDENCY] — [TEAM] hasn't provided [ARTIFACT] yet.",
    zh: '依赖、责任方、缺什么，一次说清。' },
  { step: '04', category: '讨论方案', label: '讨论方案',
    en: 'One option is to [ACTION]; the trade-off is [COST].',
    zh: '方案加代价，才是工程讨论。' },
  { step: '05', category: '收尾总结', label: '收尾确认',
    en: 'To recap: [ACTION_A] by [OWNER_A], and [ACTION_B] by [DATE].',
    zh: '行动项必须有 owner 和时间。' }
];

/* 首页：技术会议高频词速查 */
window.SITE_DATA.glossary = [
  { en: 'on track', zh: '按计划推进，进度正常', kind: '状态', fit: '项目进度跟踪会' },
  { en: 'at risk', zh: '有延期 / 失败风险', kind: '状态', fit: '项目进度跟踪会' },
  { en: 'be blocked on', zh: '被某个依赖卡住', kind: '状态', fit: '技术同步会议' },
  { en: 'ETA', zh: '预计完成时间', kind: '状态', fit: '进度同步消息' },
  { en: 'heads-up', zh: '提前提醒、先打个招呼', kind: '协作', fit: 'Slack / Teams 同步' },
  { en: 'trade-off', zh: '取舍、要付出的代价', kind: '协作', fit: '技术研讨会' },
  { en: 'second pair of eyes', zh: '请人帮忙一起看一眼', kind: '协作', fit: '每日站会' },
  { en: 'sign-off', zh: '审批、确认放行', kind: '协作', fit: '版本同步会' },
  { en: 'escalation', zh: '问题升级处理', kind: '风险', fit: '项目进度跟踪会' },
  { en: 'critical path', zh: '关键路径，卡住就影响整体', kind: '风险', fit: '项目进度跟踪会' },
  { en: 'mitigation', zh: '缓解措施', kind: '风险', fit: '风险上报邮件' },
  { en: 'workaround', zh: '临时绕行方案', kind: '风险', fit: '技术同步会议' },
  { en: 'code freeze', zh: '代码冻结，只合 bugfix', kind: '版本', fit: '版本同步会' },
  { en: 'feature flag', zh: '功能开关，用于灰度', kind: '版本', fit: '技术研讨会' },
  { en: 'roll out', zh: '灰度 / 全量发布', kind: '版本', fit: '发布同步' },
  { en: 'regression suite', zh: '回归用例集', kind: '版本', fit: '技术同步会议' }
];

/* ---------- 二次扩充：对话、避坑、缩写、IM 模板、更多模板与题目 ---------- */
window.SITE_DATA.glossary.push(
  { en: 'scope creep', zh: '范围悄悄扩大，需求不断被加进来', kind: '状态', fit: '项目进度跟踪会' },
  { en: 'bandwidth', zh: '人力 / 处理余量，不是网络带宽', kind: '协作', fit: '迭代规划会' },
  { en: 'parking lot', zh: '暂存议题，会后单独讨论', kind: '协作', fit: '技术研讨会' },
  { en: 'action item', zh: '行动项，需带 owner 和截止时间', kind: '协作', fit: '项目进度跟踪会' },
  { en: 'on-call', zh: '值班，负责线上问题响应', kind: '版本', fit: '技术同步会议' },
  { en: 'spike', zh: '有时间盒的技术预研', kind: '协作', fit: '技术研讨会' },
  { en: 'flaky test', zh: '时好时坏、不稳定的测试', kind: '风险', fit: '项目进度跟踪会' },
  { en: 'handoff', zh: '工作交接与责任转移', kind: '协作', fit: '技术同步会议' }
);

window.SITE_DATA.emailTemplates.push(
  {
    id: 'e-07', name: '技术方案决策记录', icon: 'fa-solid fa-diagram-project',
    scene: '技术研讨会 / 方案评审后，把结论、取舍与后续验证写成可追溯的书面记录。',
    subject: '[PROJECT] Decision Record – [TOPIC] ([DATE])',
    body: `Hi [TEAM],

Recording the decision from the [MEETING] sync so we have a single source of truth.

Context
- [CONTEXT]

Decision
- We agreed on [DECISION].
- Alternatives considered: [OPTION_A] (rejected: [REASON_A]), [OPTION_B] (rejected: [REASON_B]).

Trade-offs
- [COST]

Validation and follow-up
- [ACTION_A] — [OWNER_A], by [DATE_A]
- Revisit after [MILESTONE] with data on [METRIC].

If anything here is inaccurate, please reply in thread before [DATE_B].`,
    signature: `Best regards,
[NAME]
[ROLE] | [TEAM]`,
    note: '适合外企技术研讨会、方案评审会后的结论沉淀；写清被否掉的方案与原因，避免几周后重复讨论。'
  },
  {
    id: 'e-08', name: '休假与值班交接', icon: 'fa-solid fa-plane',
    scene: '请假或轮换 on-call 前的交接邮件，说明覆盖范围、当前状态与紧急联系人。',
    subject: 'OOO [DATE] – [DATE_B] | [PROJECT] handover to [OWNER]',
    body: `Hi [TEAM],

I'll be OOO from [DATE] to [DATE_B]. [OWNER] will cover [PROJECT] while I'm away.

Current status
- [TASK_A]: [STATUS_A] (ETA [DATE_C])
- [TASK_B]: [STATUS_B], waiting on [DEPENDENCY]
- Known risk: [RISK] — mitigation: [ACTION]

In progress / do not touch
- [ITEM_A] is mid-review; please don't merge before [DATE_D].

On-call
- Primary: [OWNER], backup: [OWNER_B]. Runbook: [LINK].
- Escalate P0 issues via [CHANNEL].

I'll have limited access to [CHANNEL]. Thanks for covering.`,
    signature: `Thanks,
[NAME]
[ROLE] | [TEAM]`,
    note: '适合外企技术同步会议之外的异步协作；交接邮件要写清状态、风险、值班人和升级渠道。'
  }
);

window.SITE_DATA.quiz.push(
  { id: 'q-19', scene: 'Slack 里同事说 "The test is flaky, WIP on a fix."，WIP 是什么意思？',
    options: [
      'Work In Progress，进行中',
      'Wrong Input Provided，输入有误',
      'Weekly Iteration Plan，周迭代计划',
      'Work Is Postponed，工作已推迟'
    ], answer: 0, channel: '文字沟通',
    explanation: 'WIP = Work In Progress，常见于看板、站会文字同步和 Slack 状态，适合文字沟通。会上口头版是 "I\'m still working on it."。flaky 指测试时好时坏，也是外企技术会议高频词。' },
  { id: 'q-20', scene: '邮件里想请对方「今天下班前回复」，最合适的表达是？',
    options: [
      'Please reply me as soon as possible.',
      'Could you get back to me by EOD?',
      'Answer me today please.',
      'I wait for your reply.'
    ], answer: 1, channel: '文字沟通',
    explanation: 'reply 是不及物动词，不能接 me；EOD（End of Day）给出明确截止时间，是外企邮件 / IM 的高频表达，适合文字沟通。会上口头版是 "Could we confirm this by end of day?"。' },
  { id: 'q-21', scene: 'PR 评审里同事回复 "LGTM, one minor comment."，意思是？',
    options: [
      'Looks Good To Me，基本通过，只有一条小建议',
      '请立刻合并，不要做任何修改',
      '代码有严重问题，需要重写',
      '这个 PR 已被关闭'
    ], answer: 0, channel: '文字沟通',
    explanation: 'LGTM 是 code review 的通过信号，minor comment 表示还有一处小建议，适合文字沟通（PR 评论、Slack）。会上口头版是 "Looks good to me, just one small thing."。' },
  { id: 'q-22', scene: '技术研讨会上主持人说 "Let\'s park this and take it offline."，最恰当的理解是？',
    options: [
      '这个话题先记下，会后小范围单独讨论',
      '会议取消，大家都下线',
      '把这段录屏保存到本地',
      '这个问题不需要再管了'
    ], answer: 0, channel: '口头会议',
    explanation: 'park + take it offline 是会议控场说法，避免少数人的细节占满全员时间，适合口头会议（外企技术研讨会、项目进度跟踪会）；会后结论仍要发到 Slack 形成文字沟通闭环。' },
  { id: 'q-23', scene: '技术同步会上同事说 "p99 latency is up 30% in staging."，这是在表达什么？',
    options: [
      'staging 环境的 99 分位延迟上升了 30%',
      '99% 的请求都失败了',
      '延迟下降了 30%',
      '测试覆盖率是 30%'
    ], answer: 0, channel: '口头会议',
    explanation: 'p99 是 99 分位延迟，用指标描述问题比 "the system is slow" 更专业，适合口头会议（技术研讨会、技术同步会）。文字版写 "p99 latency: +30% in staging. Details: [LINK]."。' },
  { id: 'q-24', scene: 'Slack 里发风险提醒，哪一条最完整可用？',
    options: [
      'Something may be wrong, please be careful.',
      'Heads-up: [RISK] may affect [MILESTONE]. Current ETA: [DATE]. Mitigation: [ACTION]. Full context: [LINK].',
      'I am worried about the project.',
      'Let\'s talk sometime.'
    ], answer: 1, channel: '文字沟通',
    explanation: '正确答案包含风险、影响的里程碑、当前 ETA、缓解措施和详情链接，别人不用追问就能行动，适合文字沟通。会上口头版是 "I want to flag a risk: [RISK] could affect [MILESTONE]."。' }
);

/* 真实会议对话：多轮、带角色，整段可直接跟读 */
window.SITE_DATA.dialogues = [
  {
    title: '每日站会', scene: 'Daily Standup · 每人一条进度与阻塞',
    turns: [
      { role: 'PM', en: "Let's do a quick round — one update per person, blockers only.", zh: '我们快速过一轮，每人一条，只讲阻塞。' },
      { role: 'DEV', en: 'On my side, the auth module is done and has been merged into main.', zh: '我这边 auth 模块已完成并合并到 main。' },
      { role: 'DEV', en: "No blockers; I'm picking up the retry logic next.", zh: '没有阻塞，接下来我做重试逻辑。' },
      { role: 'QA', en: 'The regression suite passed on staging, but two flaky tests are still under investigation.', zh: '回归用例在 staging 通过了，还有两个不稳定测试在排查。' },
      { role: 'PM', en: "Any risk to Friday's demo?", zh: '周五的 demo 有风险吗？' },
      { role: 'DEV', en: "Not from my side. I'll have a working demo by Thursday EOD.", zh: '我这边没有。周四下班前能有可演示的版本。' },
      { role: 'QA', en: "I'll need the final build by Wednesday to finish the pass.", zh: '我周三前需要最终构建包才能完成验证。' },
      { role: 'PM', en: "To recap: build by Wednesday, demo by Thursday. I'll drop the notes in Slack.", zh: '总结一下：周三出包，周四演示，我会把纪要发到 Slack。' }
    ]
  },
  {
    title: '进度跟踪会 · 延期风险', scene: 'Weekly Tracking · 发现排期不可达',
    turns: [
      { role: 'PM', en: "Let's start with the status of the v2.4 release.", zh: '我们先看 v2.4 发布的状态。' },
      { role: 'TL', en: "We're likely to slip by two days because of the flaky integration test.", zh: '因为集成测试不稳定，可能延期两天。' },
      { role: 'PM', en: "What's driving the delay exactly?", zh: '具体是什么原因导致的延期？' },
      { role: 'TL', en: "The upstream API keeps timing out in staging, so we can't verify the checkout flow.", zh: '上游 API 在 staging 一直超时，结算流程没法验证。' },
      { role: 'PM', en: 'Is that on the critical path?', zh: '这在关键路径上吗？' },
      { role: 'TL', en: 'Yes. Without the credentials from the platform team, the new ETA moves to Monday.', zh: '是的。拿不到平台团队的凭证，新预计时间就是下周一。' },
      { role: 'PM', en: 'Can we descope anything to protect Friday?', zh: '能砍点范围保住周五吗？' },
      { role: 'TL', en: 'One option is to ship behind a feature flag; the trade-off is a manual rollout.', zh: '一个方案是用功能开关上线，代价是要手动放量。' }
    ]
  },
  {
    title: '技术研讨会 · 方案讨论', scene: 'Design Review · 对比缓存策略',
    turns: [
      { role: 'TL', en: 'The goal today is to agree on the caching strategy.', zh: '今天的目标是把缓存策略定下来。' },
      { role: 'DEV', en: 'One option is to cache at the edge; the trade-off is stale reads.', zh: '一个方案是在边缘缓存，代价是可能读到旧数据。' },
      { role: 'SRE', en: "I see the point, but I'm a bit concerned about the invalidation path.", zh: '我理解，不过对缓存失效的路径有点担心。' },
      { role: 'DEV', en: 'From the staging data, p99 latency dropped by 30% with the cache.', zh: '从 staging 数据看，加缓存后 p99 延迟降了 30%。' },
      { role: 'SRE', en: 'Do we have data on the error rate before we decide?', zh: '决策前我们有错误率的数据吗？' },
      { role: 'TL', en: "Let's timebox a spike to two days before committing to this option.", zh: '在定方案之前，先给技术预研两天的时间盒。' },
      { role: 'DEV', en: 'That works, but we should validate it with a quick load test first.', zh: '可以，但最好先用一个简短的压测验证一下。' },
      { role: 'TL', en: "To recap: spike by Wednesday, decision in Friday's sync.", zh: '总结一下：周三前完成预研，周五同步会上决策。' }
    ]
  },
  {
    title: '阻塞升级 · 跨团队协调', scene: 'Blocker Escalation · 依赖迟迟不到位',
    turns: [
      { role: 'DEV', en: 'I want to flag a risk: the API spec is still pending from the platform team.', zh: '想提一个风险：平台团队的 API 文档还没给。' },
      { role: 'PM', en: 'How long has it been open?', zh: '这个挂了多久了？' },
      { role: 'DEV', en: 'Requested on Nov 10, so five days now. Nothing has moved since Monday.', zh: '11 月 10 号提的，已经五天了，周一起就没进展。' },
      { role: 'PM', en: "This needs escalation — it's on the critical path for the beta.", zh: '这个需要升级，它在 beta 的关键路径上。' },
      { role: 'DEV', en: 'We need an ETA or a workaround we can use in staging.', zh: '我们需要一个预计时间，或者能在 staging 用的临时方案。' },
      { role: 'PM', en: "I'll send an escalation email and copy the team lead.", zh: '我会发一封升级邮件，抄送团队负责人。' },
      { role: 'DEV', en: "Thanks. I'll update the ticket and link the thread.", zh: '谢谢，我会更新工单并附上讨论链接。' },
      { role: 'PM', en: "Let's revisit in tomorrow's sync if there's no reply by EOD.", zh: '如果今天下班前没回复，明天同步会上再过一次。' }
    ]
  }
];

/* 中式英语避坑：左边常见说法，右边外企真实说法 */
window.SITE_DATA.pitfalls = [
  { bad: 'Please reply me as soon as possible.', good: 'Could you get back to me by EOD?', why: 'reply 是不及物动词，不能接 me；EOD 给出明确截止时间，别人才能安排。', tag: '邮件 / IM' },
  { bad: 'I very like this solution.', good: "I'd lean toward this option.", why: 'very 不能修饰动词；会上表达倾向用 lean toward 更自然、更克制。', tag: '技术研讨会' },
  { bad: 'Our project has a big problem.', good: "We're at risk of missing the Friday milestone.", why: '说清影响哪个里程碑、什么时间，别人才好做范围或资源决策。', tag: '项目进度跟踪会' },
  { bad: 'Maybe we will delay, sorry.', good: "We're likely to slip by two days because of the flaky test.", why: '延期要给幅度和原因；道歉不提供任何可行动信息。', tag: '项目进度跟踪会' },
  { bad: "I don't know this word.", good: 'Could you clarify what idempotency means in this context?', why: '课本式提问换成对上下文语义的确认，是工程师的追问方式。', tag: '技术研讨会' },
  { bad: 'Please help me to check.', good: 'Could you take a look at PR #482?', why: '给出具体对象和编号，对方能立刻行动，不用再问「看什么」。', tag: '线上沟通' },
  { bad: 'We will discuss it later.', good: "Let's park this and take it offline.", why: 'park / take it offline 是技术会议控场的标准说法，明确不让话题占全员时间。', tag: '技术研讨会' },
  { bad: 'This is not my job.', good: 'This is outside my scope — we need a DBA to unblock it.', why: '说明边界并给出所需角色，是推进问题而不是划清责任。', tag: '技术同步会议' },
  { bad: 'The system is very slow, I think.', good: 'p99 latency is up 30% in staging.', why: '用指标代替主观感受，技术研讨会里才有说服力、才可复现。', tag: '技术研讨会' },
  { bad: 'Please do it quickly.', good: "Could we get this by Wednesday? It's on the critical path.", why: '给具体时间和优先级，语气不催促也足够清楚。', tag: '项目进度跟踪会' },
  { bad: 'I have no idea.', good: "I don't have the data yet; let me confirm and update the ticket.", why: '承认信息缺口的同时给出下一步动作，不会让讨论卡住。', tag: '站会 / 同步会' },
  { bad: 'I am sorry for my poor English.', good: 'Let me rephrase that in a simpler way.', why: '不要自我否定，用 rephrase 把对话拉回内容本身。', tag: '通用' },
  { bad: 'I think we can do it, maybe.', good: "We're on track for Friday, with one open dependency.", why: '先给结论再补条件，比模糊表态更可信、更可追踪。', tag: '项目进度跟踪会' },
  { bad: 'You are wrong.', good: "I agree with the goal, but I'd question the ordering assumption.", why: '先认可目标，再把分歧收敛到一个可验证的具体假设。', tag: '技术研讨会' }
];

/* 外企缩写与黑话速查 */
window.SITE_DATA.abbr = [
  { term: 'EOD', full: 'End of Day', zh: '今天下班前', kind: '时间', example: 'Could you confirm by EOD?' },
  { term: 'COB', full: 'Close of Business', zh: '营业结束前', kind: '时间', example: 'Please send it by COB Thursday.' },
  { term: 'ETA', full: 'Estimated Time of Arrival', zh: '预计完成时间', kind: '时间', example: 'Any ETA on the credentials?' },
  { term: 'TBD', full: 'To Be Determined', zh: '待定', kind: '时间', example: "Owner: TBD, we'll confirm in the sync." },
  { term: 'OOO', full: 'Out Of Office', zh: '休假 / 不在岗', kind: '时间', example: "I'll be OOO next week; Alex is covering." },
  { term: 'ASAP', full: 'As Soon As Possible', zh: '尽快（建议换成具体时间）', kind: '时间', example: 'Better: could we get this by Wednesday?' },
  { term: 'PR', full: 'Pull Request', zh: '合并请求', kind: '流程', example: 'PR #482 is in review.' },
  { term: 'LGTM', full: 'Looks Good To Me', zh: '我看没问题（review 通过）', kind: '流程', example: 'LGTM, one minor comment.' },
  { term: 'WIP', full: 'Work In Progress', zh: '进行中', kind: '流程', example: 'Status: WIP, ETA Thursday.' },
  { term: 'RFC', full: 'Request For Comments', zh: '方案征求意见稿', kind: '流程', example: "I'll put up an RFC before we commit." },
  { term: 'FYI', full: 'For Your Information', zh: '供你知悉，无需动作', kind: '流程', example: 'FYI: the build is green again.' },
  { term: 'PTAL', full: 'Please Take A Look', zh: '请看一下', kind: '流程', example: 'PTAL when you have a moment.' },
  { term: 'P0', full: 'Priority 0', zh: '最高优先级故障', kind: '质量', example: 'This is a P0; we need a hotfix.' },
  { term: 'p99', full: '99th percentile latency', zh: '99 分位延迟', kind: '质量', example: 'p99 latency is up 30% in staging.' },
  { term: 'CI', full: 'Continuous Integration', zh: '持续集成', kind: '质量', example: 'CI has been red since Monday.' },
  { term: 'SLO', full: 'Service Level Objective', zh: '服务等级目标', kind: '质量', example: "We're within the SLO for error rate." },
  { term: 'canary', full: 'canary release', zh: '灰度 / 金丝雀发布', kind: '质量', example: 'Roll out to canary first.' },
  { term: 'hotfix', full: 'hotfix', zh: '紧急修复', kind: '质量', example: 'We need a hotfix for v2.4.' },
  { term: 'rollback', full: 'rollback', zh: '回滚', kind: '质量', example: 'Rollback plan is in the ticket.' },
  { term: 'repro', full: 'reproduction steps', zh: '复现步骤', kind: '质量', example: 'Can you share a repro?' },
  { term: 'flaky', full: 'flaky test', zh: '时好时坏的测试', kind: '质量', example: 'The integration test is flaky.' },
  { term: 'bandwidth', full: 'capacity', zh: '人力 / 处理余量', kind: '协作', example: "We're short on bandwidth this sprint." },
  { term: 'parking lot', full: 'parked topics', zh: '暂存议题', kind: '协作', example: "Let's put that in the parking lot." },
  { term: 'action item', full: 'action item', zh: '行动项（需 owner 与截止时间）', kind: '协作', example: 'Every action item needs an owner and a due date.' }
];

/* Slack / Teams 成段消息模板（与邮件模板区分：更短、可扫读） */
window.SITE_DATA.imTemplates = [
  { id: 'im-01', name: '每日站会文字同步', scene: '远程站会或异步团队，用固定结构发进度。',
    body: `Standup update for [DATE]
- Yesterday: [TASK_A] merged, [TASK_B] in review
- Today: [TASK_C] + load test
- Blockers: none
ETA for [MILESTONE]: [DATE_B]` },
  { id: 'im-02', name: '阻塞求助', scene: '依赖不到位，点名跟进但保持客观语气。',
    body: `Quick ask: we're blocked on [DEPENDENCY] from [TEAM].
Requested on [DATE], no ETA yet.
Impact: [IMPACT] on [MILESTONE].
@[OWNER] could you take a look? Happy to jump on a quick call.` },
  { id: 'im-03', name: '发布通知', scene: '版本上线后同步范围、状态与回滚方案。',
    body: `Release update: [VERSION] deployed to [ENV] at [TIME].
Scope: [ITEM_A], [ITEM_B].
Metrics look stable. Rollback plan: [LINK].` },
  { id: 'im-04', name: '请求 Code Review', scene: '催 review 但不显得催促，给出背景与截止时间。',
    body: `PTAL: [PR] is ready for review.
Context: [CONTEXT]. ~200 lines, mostly [MODULE].
Would appreciate a look by [DATE] so we can make [MILESTONE].` },
  { id: 'im-05', name: '风险提醒', scene: '风险刚出现时提前打招呼，避免临近里程碑才暴露。',
    body: `Heads-up: [RISK] may affect [MILESTONE].
Current ETA: [DATE]. Proposed mitigation: [ACTION].
Full context: [LINK].` },
  { id: 'im-06', name: '会议改期', scene: '临时调整同步会时间，议程与预读材料保持不变。',
    body: `Hi [TEAM], moving the [MEETING] sync from [DATE] to [DATE_B] at [TIME].
Reason: [REASON]. Agenda and pre-read stay the same: [LINK].
Sorry for the short notice — please update your calendar.` }
];

