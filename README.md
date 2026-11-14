# 技英快进 | 外企技术职场英语

给英语基础一般的大学生，快速学能用在外企的技术职场英语。只覆盖**技术研讨会、项目进度跟踪会、技术同步会、每日站会、线上沟通与邮件**的真实表达，不做四六级、雅思托福应试内容。

**在线站点**：<https://yuxinrun.github.io/english-express/> · <https://www.yuxin.run/english-express/>

纯前端静态站点，无后端、无 CDN、无外部请求。字体、图标与所有插画都是本地资源，双击 `index.html` 即可离线使用；句子发音调用浏览器内置语音，不需要下载音频文件。

---

## 快速开始

```powershell
# 方式一：直接双击 index.html（推荐，file:// 下所有交互均可用）

# 方式二：本地静态服务器
python -m http.server 8000
# 打开 http://localhost:8000
```

站点是单页 hash 路由：`#/home`、`#/phrases`、`#/progress`、`#/emails`、`#/quiz`，切换不新开标签。

---

## 内容与功能

| 模块 | 内容 |
| --- | --- |
| 首页 | Hero 线性插画、3 个核心优势、6 类适用场景、会议流程 5 步速查、30 个高频词、32 个外企缩写与黑话、4 步学习路径（配 SVG 路线图）、今日一句 |
| 会议口语库 | 56 条句型（7 个分类）+ 6 段真实会议对话（站会 / 进度延期 / 方案讨论 / 阻塞升级 / 代码评审 / 故障复盘）+ 12 条 Code Review 与方案评审表达（4 类可切换）+ 4 段会议主持脚本（可整段复制） |
| 项目进度句型 | 36 条句型（6 个分类，区分**口头会议版**与 **Slack / Teams 文字同步版**）+ 20 条中式英语避坑对照 + 9 个成段 IM 消息模板 |
| 技术邮件模板 | 10 个模板：技术同步、进度汇报、问题升级、会议纪要、会议邀约、依赖跟进、技术方案决策记录、休假与值班交接、线上事故复盘、代码冻结与发布窗口 |
| 练习自测 | 30 道中文场景选择题，覆盖句型、缩写黑话、避坑、Code Review、复盘与会议理解题，提交后给出答案、解析与「会议 / 文字沟通」适用说明 |

每条句型都包含：英文原句、中文翻译、使用说明、替换提示、`适合技术会议` 标注。`[XXX]` 为占位符，按自己项目替换即可。

其他交互：关键词搜索（`block` / `delay` / `risk` / `demo` 等）、分类与表达形式筛选、**收藏**、只看收藏、邮件 / IM / 主持脚本一键复制、模板 `[ ]` 占位符说明、自测成绩记录。收藏与自测记录保存在 `localStorage`，不上传服务器。

### 发音

点击英文句子右侧的小喇叭即可朗读，再点一次停止，切换页面或换一句会自动停止。

- **主路径：浏览器内置 Web Speech API**（`en-US`，语速 0.92），无需下载音频，任何新增句子立即可读
- 仅当 TTS 不可用或 1.6 秒内没出声时，才回退播放已有的离线 MP3（210 个历史音频，约 5.3 MB）
- 清单里没有对应音频的句子不会发起 404 请求，直接提示检查语音设置
- `[PROJECT]` 等占位符会读成 `project`，不会念出方括号
- 中文理解题不显示朗读按钮

> 朗读依赖系统已安装的英文语音包，Chrome / Edge 体验最好；若没有声音，检查系统语音设置即可。

### SVG 配图

全站 13 张统一暖色线性风格的内联 SVG：Hero 会议插画、3 张核心优势图、4 个内页标题图、各扩展区块标题图、首页 4 步学习路径路线图，共 14 处展示。它们定义在 `assets/js/data.js` 的 `window.SITE_ILLUS`，由 `app.js` 的 `renderIllustrations()` 填充 `[data-illus]` 占位。全部内联，无外部图片请求，离线可用。

---

## 目录结构

```
english-express/
├── index.html                       # 单页骨架、导航、5 个视图、Hero 插画与 SVG 占位
├── assets/
│   ├── css/
│   │   ├── tailwind.css             # Tailwind CSS v3 编译产物（本地，已压缩）
│   │   └── style.css                # 配色变量、字体、组件、插画尺寸、动效
│   ├── js/
│   │   ├── data.js                  # 全部内容数据 + 13 张内联 SVG 配图
│   │   ├── app.js                   # 路由、搜索、收藏、复制、发音、自测、区块与插画挂载
│   │   └── audio-manifest.js        # 已有离线音频的键集合（仅兜底用，自动生成）
│   ├── audio/*.mp3                  # 210 个历史兜底发音文件
│   └── vendor/                      # Font Awesome 6、Inter 字体（本地）
├── tools/generate_audio.py          # 可选：重新生成兜底 MP3（新增内容一般不需要）
├── src/input.css                    # Tailwind 入口
├── tailwind.config.js               # Tailwind v3 配置（warm 色板、字体）
├── package.json                     # 可选：重新编译 CSS
└── .github/workflows/deploy.yml     # GitHub Pages 自动部署
```

线上只发布 `index.html` 与 `assets/`；`node_modules`、`src`、`tools`、构建配置不会进入站点。

---

## 设计规范

| 项 | 值 |
| --- | --- |
| 主背景 | `#FFFDF8` 暖米白 |
| 卡片背景 | `#FFFFFF` |
| 文字主色 / 次要 | `#3A3A38` / `#70706C` |
| 强调色 | `#C88A65` 低饱和暖棕 |
| 辅助色 | `#648B94` 低饱和灰蓝 |
| 边框 / 分割线 | `#EAE7E2` |
| 字体 | 中文系统无衬线（思源黑体 / PingFang SC 优先），英文 Inter |
| 行高 | 正文 1.7，标题 1.3 |

只保留这一套暖白护眼主题，不做暗色模式。动效克制（`0.28s` 缓动、hover 上浮 2px），无弹窗、无广告、无付费引导。内联 SVG 沿用同一套配色与 `1.4~2` 的线宽，不用外部图片。

---

## 常见维护

`assets/js/data.js` 末尾「扩展内容区」是所有新增内容的推荐位置，追加后会自动按分类归组，不必在意插入位置。

| 想做的事 | 操作 |
| --- | --- |
| 新增句型 / 邮件模板 / 自测题 | 在「扩展内容区」对应 `push()` 里追加对象 |
| 新增会议对话 / 避坑 / 缩写 / IM 模板 / Code Review 表达 / 主持脚本 | 在「扩展内容区」扩展对应数组 |
| 新增 SVG 配图 | 在 `window.SITE_ILLUS` 里加一个键，再放一个 `<div data-illus="键名"></div>` 占位 |
| 改配色或字体 | 改 `assets/css/style.css` 顶部的 `:root` 变量 |
| 新增或改动 Tailwind 类名 | `npm install` 后运行 `npm run build:css`，再提交生成的 `assets/css/tailwind.css` |
| 新增英文句子 | **无需生成音频**，浏览器内置 TTS 会直接朗读，也不会出现 404 |
| 想让某句也有离线兜底音频 | 运行 `python tools/generate_audio.py`，自动更新 MP3 与 `audio-manifest.js` |

`tools/generate_audio.py` 依赖 Node.js、`edge-tts`（`pip install edge-tts`）和联网，**仅生成时需要**；站点运行时完全离线，脚本会自动跳过中文文本。当前版本的发音主路径已改为浏览器 TTS，该脚本只用于维护已有的兜底音频。

---

## 自动部署

`.github/workflows/deploy.yml` 在 `push` 到 `main` 或手动 `Run workflow` 时触发：

1. 检出代码
2. 组装静态目录 `_site`（`index.html` + `assets/` + `.nojekyll`）
3. 上传 Pages artifact
4. 调用 `actions/deploy-pages` 发布

仓库已启用 GitHub Pages，构建源为 **GitHub Actions**。因此日常只需：

```powershell
git add .
git commit -m "update content"
git push
```

推送完成后约 1 分钟即可在线上看到更新。若需手动重跑，在仓库 **Actions → Deploy to GitHub Pages → Run workflow** 即可。

> 注：`push` 事件前两条历史运行失败于 Pages 启用前的 `Setup Pages` 步骤，Pages 启用后的运行均为成功，可忽略历史失败记录。
