# 图片资源使用说明

## 当前图片配置

网站已配置使用 Unsplash 免费图片作为演示，所有图片都带有 `loading="lazy"` 属性以优化性能。

## 如何替换为自己的图片

### 1. 首页 Hero 轮播大图

位置：`index.html` 中的 `.hero-slide`

当前使用的图片：
- Slide 1: 地球科技图 (https://images.unsplash.com/photo-1451187580459-43490279c0fa)
- Slide 2: 数据中心 (https://images.unsplash.com/photo-1558494949-ef010cbdcc31)
- Slide 3: 芯片技术 (https://images.unsplash.com/photo-1518770660439-4636190af475)

替换方法：
1. 将自己的图片放入 `images/` 文件夹
2. 修改 HTML 中的 `src` 属性：
```html
<div class="hero-slide active">
    <img src="images/your-image.jpg" alt="描述文字">
</div>
```

**推荐图片尺寸**: 1920x1080px 或更大
**推荐风格**: 科技感、蓝色调、云计算/数据中心相关

---

### 2. 产品服务卡片图片

位置：`index.html` 中的 `.category-icon`

当前使用的图片：
- 云计算: https://images.unsplash.com/photo-1544197150-b99a580bb7a8
- 数据存储: https://images.unsplash.com/photo-1563986768609-322da13575f3
- 人工智能: https://images.unsplash.com/photo-1677442136019-21780ecad995
- 安全服务: https://images.unsplash.com/photo-1563986768609-322da13575f3

**推荐图片尺寸**: 400x300px
**推荐风格**: 与产品类别相关的实景图

---

### 3. 解决方案图片

位置：`index.html` 中的 `.solution-image`

当前使用的图片：
- 政务: https://images.unsplash.com/photo-1558494949-ef010cbdcc31
- 金融: https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3
- 医疗: https://images.unsplash.com/photo-1576091160399-112ba8d25d1d
- 教育: https://images.unsplash.com/photo-1501504905252-473c47e087f8
- 制造: https://images.unsplash.com/photo-1565043666747-69f6646db940
- 零售: https://images.unsplash.com/photo-1556742049-0cfed4f6a45d

**推荐图片尺寸**: 800x600px
**推荐风格**: 各行业真实场景照片

---

## 免费图片资源网站

如需替换图片，可从以下网站获取免费高质量图片：

1. **Unsplash** (https://unsplash.com)
   - 免费商用，无需署名
   - 搜索关键词: cloud computing, data center, technology, server, AI

2. **Pexels** (https://pexels.com)
   - 免费商用
   - 科技感图片丰富

3. **Pixabay** (https://pixabay.com)
   - 免费商用
   - 包含矢量图和照片

---

## 图片优化建议

1. **格式选择**:
   - 照片类: JPG
   - 透明背景/图标: PNG
   - 动画: GIF
   - 现代浏览器优先: WebP

2. **压缩工具**:
   - TinyPNG (https://tinypng.com)
   - Squoosh (https://squoosh.app)

3. **尺寸规范**:
   - Hero大图: 1920x1080px, < 500KB
   - 卡片图片: 400x300px, < 100KB
   - 解决方案: 800x600px, < 200KB

---

## 注意事项

- 替换图片时请保持相同的 `alt` 描述文字，有利于 SEO
- 建议图片使用英文文件名，避免中文路径问题
- 所有图片均设置了懒加载 (`loading="lazy"`)，不会影响首屏加载速度
