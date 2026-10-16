# Gitwork

一个轻量的**静态站点模板**，零构建、零依赖，推送到 `main` 分支即可通过 **GitHub Pages** 上线。

## 特性

- ⚡ 纯静态资源，无框架、无构建步骤
- 📱 CSS Grid / Flex 响应式布局，适配手机、平板、桌面
- 🌙 现代深色视觉，主题变量集中在 `:root`
- 🚀 推送到 `main` 即自动发布
- 🔒 由 GitHub Pages 提供默认 HTTPS

## 目录结构

```
.
├── index.html              # 站点首页
├── assets/
│   ├── css/style.css       # 全部样式
│   └── js/main.js          # 页脚年份 + 滚动渐显
├── .nojekyll               # 关闭 Jekyll 处理（保留以 _ 开头的文件）
├── .gitignore
├── LICENSE
└── README.md
```

## 本地预览

无需任何依赖，任选一种方式：

```bash
# 方式一：直接用浏览器打开
start index.html          # Windows

# 方式二：起一个本地静态服务器（任选其一）
python -m http.server 8080
npx serve .
```

然后访问 <http://localhost:8080>。

## 部署到 GitHub Pages

1. 将本目录提交并推送到 GitHub 仓库的 `main` 分支：

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<用户名>/<仓库名>.git
   git push -u origin main
   ```

2. 打开仓库 **Settings → Pages**。
3. 在 **Build and deployment** 中，将 **Source** 设为 `Deploy from a branch`，
   **Branch** 选择 `main`，目录选择 `/ (root)`，然后保存。
4. 等待 1–2 分钟，站点即可访问：
   - 项目站点：`https://<用户名>.github.io/<仓库名>/`
   - 用户站点（仓库名为 `<用户名>.github.io`）：`https://<用户名>.github.io/`

## 定制

| 想改什么 | 改哪里 |
| --- | --- |
| 主题色、圆角、字体 | `assets/css/style.css` 顶部 `:root` 变量 |
| 文案与结构 | `index.html` |
| 交互行为 | `assets/js/main.js` |

## License

[MIT](./LICENSE)
