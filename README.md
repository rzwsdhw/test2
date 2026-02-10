# 某某科技 - 企业数字化转型官网

一个现代化的企业级云计算服务官网，采用纯 HTML/CSS/JavaScript 构建，基于 **Vite** 开发工具链，支持热更新、快速构建和现代化开发体验。

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

启动后访问：http://localhost:3000

Vite 会自动打开浏览器，并支持热更新（修改代码后页面自动刷新）。

### 构建生产版本

```bash
npm run build
```

构建后的文件在 `dist` 目录中。

### 预览生产版本

```bash
npm run preview
```

## 🌐 部署到 Gitee Pages

### 1. 创建 Gitee 仓库

1. 登录 [Gitee](https://gitee.com)
2. 点击右上角 **+** 号 → **新建仓库**
3. 仓库名称填写：`company-website`
4. 选择 **公开** 仓库
5. 点击 **创建**

### 2. 上传代码

#### 方式一：Git 命令行（推荐）

```bash
# 进入项目目录
cd company-website

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 关联远程仓库（将 你的用户名 替换为实际用户名）
git remote add origin https://gitee.com/你的用户名/company-website.git

# 推送
git push -u origin master
```

#### 方式二：网页直接上传

1. 进入刚创建的仓库页面
2. 点击 **上传文件**
3. 拖拽或选择所有文件上传（包括 package.json、vite.config.js 等）
4. 点击 **提交**

### 3. 开启 Gitee Pages

1. 进入仓库 → **服务** → **Gitee Pages**
2. 选择部署分支：`master`（或 `main`）
3. 选择部署目录：`dist`（⚠️ 注意：是 dist 目录，不是根目录）
4. 点击 **启动**
5. 等待几分钟，访问生成的链接即可

**重要提示**：由于使用 Vite 构建，Gitee Pages 需要配置为从 `dist` 目录部署，而不是根目录。

### 4. 自动部署（可选）

在 Gitee 仓库中配置 GitHub Actions 或 Gitee Go 流水线，实现 push 代码后自动构建部署。

## 📁 项目结构

```
company-website/
├── index.html          # 首页
├── products.html       # 产品服务页
├── solutions.html      # 解决方案页
├── cases.html          # 成功案例页
├── about.html          # 关于我们页
├── styles.css          # 主样式文件
├── page-styles.css     # 页面特定样式
├── script.js           # JavaScript 交互
├── package.json        # 项目依赖和脚本
├── vite.config.js      # Vite 配置文件
├── images/             # 图片资源
│   └── README.md       # 图片使用说明
└── README.md           # 项目说明
```

## ✨ 功能特性

- **⚡ 极速开发**：基于 Vite，毫秒级冷启动
- **🔥 热更新**：修改代码自动刷新，无需手动 F5
- **📱 响应式设计**：完美适配桌面端、平板和手机
- **🖼️ 图片轮播**：首页 Hero 区域支持多张背景图自动轮播
- **🤖 智能客服**：内置 AI 助手，支持自动回复和快捷咨询
- **🌐 多页面架构**：首页、产品、解决方案、案例、关于五大连贯页面
- **🎨 现代化 UI**：科技感设计风格，渐变色彩，流畅动画

## 📝 自定义修改

### 修改公司信息

编辑各 HTML 文件中的以下内容：
- 公司名称：搜索"某某科技"替换为你的公司名
- 联系电话：搜索"xxx"
- 邮箱地址：搜索"xxx"
- 公司地址：搜索"xxx"

### 替换图片

参考 `images/README.md` 中的说明替换为你自己的图片。

### 修改智能客服回复

编辑 `script.js` 文件中的 `getBotReply` 函数，修改自动回复的内容。

## 🛠️ 开发指南

### 添加新页面

1. 创建新的 HTML 文件，如 `contact.html`
2. 在 `vite.config.js` 的 `build.rollupOptions.input` 中添加：
   ```js
   contact: resolve(__dirname, 'contact.html')
   ```
3. 运行 `npm run dev` 即可访问新页面

### 使用 CSS 预处理器（可选）

Vite 原生支持 Sass、Less、Stylus。例如使用 Sass：

```bash
npm install -D sass
```

然后将 `styles.css` 改为 `styles.scss` 即可使用 Sass 语法。

### 引入第三方库（可选）

```bash
# 例如引入 Swiper 轮播组件
npm install swiper
```

然后在 script.js 中：
```js
import Swiper from 'swiper'
```

## 🎨 技术栈

- **HTML5**：语义化标签，SEO 友好
- **CSS3**：Flexbox/Grid 布局，CSS 变量，动画
- **JavaScript**：原生 ES6+，无需框架
- **Vite**：下一代前端构建工具
- **图片资源**：Unsplash 免费图库

## 📱 浏览器兼容

- Chrome / Edge（推荐）
- Firefox
- Safari
- 微信内置浏览器

## 📄 许可证

MIT License - 可自由使用和修改

## 🤝 联系支持

如有问题，欢迎提交 Issue 或联系：
- 邮箱：xxx
- 电话：xxx

---

**开发提示**：运行 `npm run dev` 后，修改任何文件（HTML、CSS、JS）都会自动刷新浏览器，无需手动重启服务器。
