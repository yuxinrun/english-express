"""可选维护脚本：为 data.js 中所有英文句子重新生成离线 MP3。

依赖：Node.js、pip install edge-tts、生成时需联网（站点运行时完全离线）。
用法：在项目根目录执行  python tools/generate_audio.py

文件名由 Node 端计算（与 app.js 的 audioKey 完全同一份逻辑），避免编码差异。
新增句子后重新运行本脚本即可；未生成音频的句子会自动回退到浏览器朗读。
"""
import asyncio
import json
import os
import re
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'assets', 'audio')
VOICE = 'en-US-AriaNeural'
RATE = '-5%'
CONCURRENCY = 8

EXTRACT_JS = r"""
global.window = {};
require('./assets/js/data.js');
const d = global.window.SITE_DATA;
function audioKey(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}
const items = [];
const push = t => items.push({ key: audioKey(t), text: t });
d.meetingPhrases.forEach(x => push(x.en));
d.progressPhrases.forEach(x => push(x.en));
d.glossary.forEach(x => push(x.en));
d.emailTemplates.forEach(x => push(x.subject));
d.quiz.forEach(x => { if (/[A-Za-z]/.test(x.options[x.answer])) push(x.options[x.answer]); });
d.abbr.forEach(x => push(x.example));
d.dialogues.forEach(x => x.turns.forEach(t => push(t.en)));
d.pitfalls.forEach(x => push(x.good));
process.stdout.write(JSON.stringify(items));
"""


def readable(text):
    """[PROJECT] 转成可朗读的 project，与 app.js 的 readable() 保持一致"""
    return re.sub(r'\[([A-Z_0-9]+)\]',
                  lambda m: 'some number' if m.group(1) == 'N' else m.group(1).replace('_', ' ').lower(),
                  text)


async def main():
    import edge_tts

    raw = subprocess.check_output(['node', '-e', EXTRACT_JS], cwd=ROOT, text=True, encoding='utf-8')
    items = json.loads(raw)
    # 按文件名去重，避免重复请求
    targets = {item['key']: readable(item['text']) for item in items}

    os.makedirs(OUT, exist_ok=True)
    sem = asyncio.Semaphore(CONCURRENCY)
    failed = []
    generated = 0

    async def gen(key, text):
        nonlocal generated
        path = os.path.join(OUT, key + '.mp3')
        if os.path.exists(path) and os.path.getsize(path) > 1000:
            return
        async with sem:
            for attempt in range(3):
                try:
                    await edge_tts.Communicate(text, VOICE, rate=RATE).save(path)
                    if os.path.exists(path) and os.path.getsize(path) > 1000:
                        generated += 1
                        return
                except Exception:
                    await asyncio.sleep(1 + attempt)
        failed.append(key)

    await asyncio.gather(*(gen(k, t) for k, t in targets.items()))

    # 输出清单：前端据此判断是否有离线音频，避免新增句子时产生 404
    available = sorted(k for k in targets
                       if os.path.exists(os.path.join(OUT, k + '.mp3'))
                       and os.path.getsize(os.path.join(OUT, k + '.mp3')) > 1000)
    manifest = os.path.join(ROOT, 'assets', 'js', 'audio-manifest.js')
    with open(manifest, 'w', encoding='utf-8') as f:
        f.write('/* 由 tools/generate_audio.py 自动生成：已有离线 MP3 的句子键 */\n')
        f.write('window.AUDIO_MANIFEST = new Set(' + json.dumps(available) + ');\n')

    total = sum(os.path.getsize(os.path.join(OUT, k + '.mp3')) for k in available)
    print(f'唯一音频 {len(targets)} 个，本次生成 {generated} 个，失败 {len(failed)} 个，'
          f'可用 {len(available)} 个 / {total / 1024 / 1024:.2f} MB')
    if failed:
        print('失败文件名：', ', '.join(failed))


if __name__ == '__main__':
    asyncio.run(main())
