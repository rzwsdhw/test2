# 某某科技企业官网 - AI复现构建文档

## 项目概述

这是一个基于Vite的现代化企业官网，采用原生HTML/CSS/JavaScript构建，包含智能助手对话功能。

## 技术栈

- **构建工具**: Vite 5.x
- **前端技术**: HTML5, CSS3, Vanilla JavaScript
- **样式方案**: CSS Variables + 模块化CSS
- **图标**: SVG内联图标
- **图片**: Unsplash远程图片

## 项目结构

```
company-website/
├── index.html          # 首页
├── products.html       # 产品服务页
├── solutions.html      # 解决方案页
├── cases.html          # 成功案例页
├── about.html          # 关于我们页
├── styles.css          # 主样式文件
├── page-styles.css     # 页面特定样式
├── script.js           # 交互逻辑
├── package.json        # 项目配置
└── vite.config.js      # Vite配置
```

## 设计系统

### 色彩规范

```css
:root {
  --primary-color: #1a5cff;      /* 主色调 - 科技蓝 */
  --primary-dark: #0044cc;       /* 主色深色 */
  --primary-light: #4d7fff;      /* 主色浅色 */
  --secondary-color: #00c6ff;    /* 辅色 - 青色 */
  --accent-color: #00e4ff;       /* 强调色 */
  --text-primary: #1a1a2e;       /* 主文字 */
  --text-secondary: #4a4a68;     /* 次要文字 */
  --text-light: #8a8aa0;         /* 浅色文字 */
  --bg-white: #ffffff;           /* 白色背景 */
  --bg-light: #f5f7fa;           /* 浅灰背景 */
  --border-color: #e8ecf1;       /* 边框色 */
  --radius-sm: 8px;              /* 小圆角 */
  --radius-md: 12px;             /* 中圆角 */
  --radius-lg: 20px;             /* 大圆角 */
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.1);
  --shadow-lg: 0 8px 30px rgba(0,0,0,0.12);
}
```

### 字体规范

- **中文**: 系统默认 (PingFang SC, Microsoft YaHei)
- **英文**: Inter, system-ui
- **标题**: 600-800 weight
- **正文**: 400-500 weight

### 间距系统

- 基础单位: 4px
- 小间距: 8px, 12px, 16px
- 中间距: 24px, 32px, 40px
- 大间距: 60px, 80px, 100px

## 页面规范

### 1. 顶部导航栏 (Header)

**结构**:
```html
<header class="header">
  <div class="container">
    <a href="index.html" class="logo">
      <span class="logo-icon">☁</span>
      <span class="logo-text">某某科技</span>
    </a>
    <nav class="nav">
      <a href="index.html" class="active">首页</a>
      <a href="products.html">产品服务</a>
      <a href="solutions.html">解决方案</a>
      <a href="cases.html">成功案例</a>
      <a href="about.html">关于我们</a>
    </nav>
    <div class="header-actions">
      <button class="btn btn-primary">免费试用</button>
    </div>
  </div>
</header>
```

**样式要点**:
- 固定定位，高度72px
- 背景: 白色 + backdrop-filter模糊
- 滚动时显示阴影
- Logo: 渐变图标 + 文字
- 导航链接: hover时蓝色下划线动画

### 2. 首页大屏 (Hero)

**结构**:
```html
<section class="hero">
  <div class="hero-slider">
    <!-- 轮播背景图 -->
  </div>
  <div class="container">
    <div class="hero-content">
      <div class="hero-slide-content active">
        <div class="hero-subtitle">Enterprise Digital Transformation</div>
        <h1>赋能企业<span class="highlight">数字化转型</span></h1>
        <p>提供全栈式云计算、大数据、人工智能解决方案...</p>
      </div>
      <!-- 大屏搜索框 -->
      <div class="hero-search">
        <div class="hero-search-box">
          <input type="text" id="heroSearchInput" placeholder="输入关键词搜索方案...">
          <button class="hero-search-btn">搜索</button>
        </div>
        <div class="hero-search-tags">
          <span>热门搜索：</span>
          <button class="search-tag" data-query="政府">政府案例</button>
          <!-- 更多标签 -->
        </div>
      </div>
    </div>
  </div>
</section>
```

**样式要点**:
- 全屏高度，深色渐变背景
- 标题: 64px, 白色, highlight使用渐变文字
- 副标题: 15px, 青色, 大写字母间距
- 搜索框: 540px宽, 圆角50px, 白色背景带阴影
- 热门标签: 半透明边框, hover上浮效果

### 3. 智能助手浮窗

**结构**:
```html
<div class="ai-chat-modal" id="aiChatModal">
  <div class="ai-chat-overlay"></div>
  <div class="ai-chat-container">
    <div class="ai-chat-header">
      <div class="ai-chat-avatar">...</div>
      <div class="ai-chat-title">
        <h4>智能助手</h4>
        <span class="ai-chat-status">在线</span>
      </div>
      <button class="ai-chat-close">...</button>
    </div>
    <div class="ai-chat-body" id="aiChatBody">
      <!-- 消息区域 -->
    </div>
    <div class="ai-chat-footer">
      <div class="ai-chat-input-wrapper">
        <input type="text" id="aiChatInput" placeholder="输入您的问题...">
        <button class="ai-chat-send">...</button>
      </div>
      <div class="ai-chat-quick-actions">
        <button class="quick-action-btn" data-query="产品咨询">产品咨询</button>
        <!-- 更多快捷按钮 -->
      </div>
    </div>
  </div>
</div>
```

**功能要点**:
- 点击搜索框打开浮窗
- 支持关键词搜索客户案例和解决方案
- 支持闲聊对话（问候、感谢、再见、笑话等）
- 快捷操作按钮（产品咨询、解决方案、价格、技术支持）
- 智能匹配算法（关键词+标题+描述+标签）

### 4. 卡片组件

**产品卡片**:
```html
<div class="product-card">
  <div class="product-badge">热门</div>
  <div class="product-icon">🖥</div>
  <h3>弹性云服务器 ECS</h3>
  <p>高性能、高可用的云计算服务</p>
  <ul class="product-features">
    <li>特性1</li>
    <li>特性2</li>
  </ul>
  <a href="#" class="product-link">了解详情 →</a>
</div>
```

**案例卡片**:
```html
<div class="case-card" data-category="government">
  <div class="case-card-image">
    <img src="https://images.unsplash.com/..." alt="案例">
  </div>
  <div class="case-card-content">
    <div class="case-card-tag">政务</div>
    <h4>某省级政务云平台</h4>
    <p>案例描述...</p>
    <div class="case-card-stats">
      <span>40+ 委办局</span>
      <span>60% 效率提升</span>
    </div>
  </div>
</div>
```

## 响应式断点

```css
/* 桌面端 */
@media (min-width: 1024px) { ... }

/* 平板端 */
@media (max-width: 1024px) { ... }

/* 移动端 */
@media (max-width: 768px) { ... }

/* 小屏移动端 */
@media (max-width: 480px) { ... }
```

## 智能助手数据结构

### 客户案例数据

```javascript
const caseData = [
  {
    id: 'gov-cloud',
    title: '某省级政务云平台',
    desc: '为某省打造统一的政务云平台...',
    category: 'government',
    tag: '政务',
    url: 'cases.html',
    keywords: ['政府', '政务', '省级', '委办局', '数据共享', '业务协同', '公务员', '机关', '部门']
  },
  // 更多案例...
];
```

### 解决方案数据

```javascript
const solutionData = [
  {
    id: 'gov-solution',
    title: '数字政务解决方案',
    desc: '基于云计算、大数据技术...',
    category: 'government',
    tag: '政务',
    url: 'solutions.html',
    keywords: ['政府', '政务', '数字政务', '云平台', '数据共享', '一网通办']
  },
  // 更多方案...
];
```

### 闲聊响应库

```javascript
const chatResponses = {
  greetings: {
    patterns: ['你好', '您好', 'hello', 'hi'],
    responses: ['你好！很高兴为您服务 😊', '您好！有什么可以帮您的吗？']
  },
  thanks: {
    patterns: ['谢谢', '感谢'],
    responses: ['不客气！很高兴能帮到您 😊', '不用谢！']
  },
  // 更多类别...
};
```

## 图片资源规范

使用Unsplash远程图片，格式如下：

```
https://images.unsplash.com/photo-{ID}?w={宽度}&h={高度}&fit=crop&q=80
```

**推荐图片主题**:
- 科技/数据中心: `photo-1451187580459-43490279c0fa`
- 服务器/机房: `photo-1558494949-ef010cbdcc31`
- 芯片/电路: `photo-1518770660439-4636190af475`
- 办公/商务: `photo-1497366216548-37526070297c`

## 构建步骤

### 1. 初始化项目

```bash
mkdir company-website && cd company-website
npm init -y
npm install vite --save-dev
```

### 2. 配置package.json

```json
{
  "name": "company-website",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

### 3. 创建vite.config.js

```javascript
export default {
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist'
  }
};
```

### 4. 开发顺序

1. 先搭建基础HTML结构和CSS变量
2. 实现导航栏组件（所有页面共用）
3. 逐个页面开发：首页 → 产品 → 方案 → 案例 → 关于
4. 最后实现智能助手功能
5. 添加响应式适配

## 关键交互说明

### 1. 智能助手触发方式

- 首页：点击大屏搜索框
- 其他页面：点击导航栏搜索框
- 浮窗内：支持输入搜索、快捷按钮、闲聊对话

### 2. 搜索匹配逻辑

```javascript
function smartMatch(query, item) {
  const lowerQuery = query.toLowerCase();

  // 1. 关键词匹配
  if (item.keywords.some(k => k.includes(lowerQuery))) return true;

  // 2. 标题匹配
  if (item.title.toLowerCase().includes(lowerQuery)) return true;

  // 3. 描述匹配
  if (item.desc.toLowerCase().includes(lowerQuery)) return true;

  // 4. 标签匹配
  if (item.tag.toLowerCase().includes(lowerQuery)) return true;

  // 5. 模糊匹配
  for (let keyword of item.keywords) {
    if (keyword.includes(lowerQuery) || lowerQuery.includes(keyword)) return true;
  }

  return false;
}
```

### 3. 轮播图实现

- 使用CSS opacity切换
- 5秒自动切换
- 鼠标悬停暂停
- 底部指示器点击切换

## 性能优化建议

1. 图片使用WebP格式（如可能）
2. 添加loading="lazy"懒加载
3. CSS使用will-change优化动画
4. JS使用事件委托减少监听器
5. 添加preconnect到Unsplash域名

## 部署说明

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

构建后的`dist`目录可直接部署到：
- Vercel
- Netlify
- GitHub Pages
- 自有服务器

## 文件依赖关系

```
index.html
├── styles.css (全局样式)
├── page-styles.css (首页特定样式)
└── script.js (全局交互)

products.html
├── styles.css
├── page-styles.css (产品页样式)
└── script.js

其他页面同理...
```

## 注意事项

1. 所有页面必须包含智能助手浮窗HTML
2. 导航栏当前页面需要添加`active`类
3. 图片必须使用HTTPS链接
4. 移动端需要测试触摸交互
5. 搜索框placeholder避免使用英文引号

---

**提示**: 使用此文档时，建议配合具体的HTML/CSS代码片段，AI可以据此生成完整的网站代码。