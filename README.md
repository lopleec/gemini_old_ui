# Gemini Web UI Customizer

An unofficial Manifest V3 Chrome extension that replaces the redesigned Gemini UI introduced around Google I/O 2026 with a version that feels much closer to the older MD3-style interface.

It restyles [gemini.google.com](https://gemini.google.com/) with cleaner light and dark surfaces, tighter sidebar spacing, and targeted UI fixes.

## Why this exists

I personally prefer the older Gemini / MD3 visual language. The newer 2026 redesign felt less readable and less appealing to me, so I built this extension as a lightweight "restore" layer rather than a full rewrite.

## Highlights

- Removes Gemini's aurora-style glow and extra decorative background layers
- Applies consistent custom light and dark surfaces across chat, sidebar, dialogs, and utility pages
- Tightens sidebar spacing, icon sizing, and long-title truncation
- Refines prompt bubbles, input surfaces, gradients, and code blocks
- Adds page-specific fixes for areas such as usage cards, sharing, Gems, personalization, and import flows

## Scope

- Runs only on `https://gemini.google.com/*`
- Uses a single content stylesheet and a lightweight theme-sync script
- Requires no build step, package manager, or external runtime
- Makes no network requests and declares no extra extension permissions

## Project structure

```text
Gemini_UI/
├── .gitignore
├── README.md
├── content.css
├── content.js
├── manifest.json
└── icons/
```

## Installation

1. Open `chrome://extensions`
2. Enable `Developer mode`
3. Click `Load unpacked`
4. Select the project folder

## Local development

1. Edit `content.css` or `content.js`
2. Return to `chrome://extensions`
3. Click `Reload` on `Gemini Web UI Customizer`
4. Refresh the Gemini tab

## File overview

- `content.css`: all visual overrides and page-specific surface fixes
- `content.js`: lightweight theme detection and theme-class syncing for Gemini's SPA shell
- `manifest.json`: extension metadata and content script registration
- `icons/`: extension icons used by Chrome

## Notes

- The styling is selector-based, so Gemini DOM changes may require future selector updates
- The extension is intentionally simple and does not include a build pipeline
- Runtime code does not contain hardcoded local filesystem paths

## Troubleshooting

- If a style change does not appear, reload the extension and then refresh Gemini
- If only one page looks wrong, inspect that page's current DOM classes before broadening selectors
- If Gemini ships a UI update, page-specific rules may need to be adjusted

## Disclaimer

This project is unofficial and is not affiliated with Google or Gemini.

## License

This project uses the MIT License. The GitHub repository includes the license file.

---

# Gemini Web UI Customizer（中文）

这是一个非官方的 Manifest V3 Chrome 扩展，用来把 Google I/O 2026 前后推出的新版 Gemini UI，尽量恢复成更接近旧版 MD3 风格的界面。

它会重设 [gemini.google.com](https://gemini.google.com/) 的样式，提供更统一的浅色/深色表面、更紧凑的侧边栏间距，以及一系列定向 UI 修复。

## 为什么做这个

我个人更喜欢旧版 Gemini / MD3 的视觉语言。我觉得 2026 这版新 UI 没那么耐看、也没那么顺眼，所以做了这个扩展，想用一种轻量覆盖的方式把那种旧版观感带回来，而不是去重写整个页面。

## 功能亮点

- 移除 Gemini 原有的 aurora 发光背景和多余装饰层
- 为聊天区、侧边栏、弹窗和功能页统一应用自定义浅色/深色表面
- 收紧侧边栏间距，调整图标尺寸，并优化长标题截断
- 优化提问气泡、输入区表面、渐变和代码块样式
- 为用量页、分享页、Gems、个性化设置、导入流程等页面补充定向修复

## 适用范围

- 仅作用于 `https://gemini.google.com/*`
- 使用单个内容样式表和一个轻量级主题同步脚本
- 不需要构建步骤、包管理器或额外运行时
- 不发起网络请求，也不声明额外扩展权限

## 项目结构

```text
Gemini_UI/
├── .gitignore
├── README.md
├── content.css
├── content.js
├── manifest.json
└── icons/
```

## 安装方法

1. 打开 `chrome://extensions`
2. 开启 `Developer mode`
3. 点击 `Load unpacked`
4. 选择当前项目文件夹

## 本地开发

1. 修改 `content.css` 或 `content.js`
2. 回到 `chrome://extensions`
3. 对 `Gemini Web UI Customizer` 点击 `Reload`
4. 刷新 Gemini 标签页

## 文件说明

- `content.css`：所有视觉覆盖规则和页面级表面修复
- `content.js`：轻量主题检测，以及 Gemini 单页应用外壳的主题类同步
- `manifest.json`：扩展元信息和内容脚本注册
- `icons/`：Chrome 扩展图标资源

## 说明

- 样式是基于选择器覆盖的，所以 Gemini 的 DOM 结构变化可能需要后续更新选择器
- 这个扩展有意保持简单，不包含构建流水线
- 运行时代码里不包含本地文件系统硬编码路径

## 排障

- 如果样式修改没有生效，先重新加载扩展，再刷新 Gemini 页面
- 如果只有单个页面显示异常，先检查该页当前 DOM 类名，再决定是否扩大选择器范围
- 如果 Gemini 官方更新了 UI，页面级规则可能需要跟着调整

## 声明

本项目为非官方项目，与 Google 或 Gemini 没有关联。

## 许可证

本项目使用 MIT License，许可证文件保留在 GitHub 仓库中。
