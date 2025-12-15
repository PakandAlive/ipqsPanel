# IP 风险扫描面板

一个基于 Next.js 开发的现代化 IP 风险检测面板，集成 IPQualityScore API，提供实时欺诈检测与风险分析。

![IP Risk Scanner](https://img.shields.io/badge/Next.js-16.0.10-black?style=flat-square&logo=next.js)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

## ✨ 功能特性

- 🔍 **IP 风险检测** - 实时查询 IP 地址的欺诈分数和风险等级
- 🌐 **地理位置信息** - 显示 IP 的国家、城市、坐标等详细位置信息
- 🛡️ **风险指标分析** - 检测代理、VPN、Tor、机器人、爬虫等风险因素
- 📱 **设备指纹识别** - 识别操作系统、浏览器、设备品牌等信息
- 🗺️ **Google Maps 集成** - 点击坐标直接在 Google Maps 中查看位置
- 🎨 **现代化 UI** - 采用 Bento Grid 布局，深色主题，流畅动画
- 📊 **数据可视化** - 清晰的风险分数展示和状态指示器

## 🚀 快速开始

### 前置要求

- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器
- IPQualityScore API Key（[免费注册](https://www.ipqualityscore.com/create-account)）

### 安装步骤

1. **克隆项目**

```bash
git clone https://github.com/PakandAlive/ipqsPanel.git
cd ipqsPanel
```

2. **安装依赖**

```bash
npm install
# 或
yarn install
```

3. **配置环境变量**

在项目根目录创建 `.env.local` 文件：

```env
IPQS_KEY=your_api_key_here
```

> 💡 获取 API Key：访问 [IPQualityScore](https://www.ipqualityscore.com/) 注册账号并获取免费 API Key

4. **启动开发服务器**

```bash
npm run dev
# 或
yarn dev
```

5. **访问应用**

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📦 部署到 Vercel

本项目已针对 Vercel 部署进行优化：

1. Fork 本项目到你的 GitHub 账号
2. 在 [Vercel](https://vercel.com) 导入项目
3. 添加环境变量 `IPQS_KEY`
4. 点击部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/PakandAlive/ipqsPanel)

## 🎯 使用说明

### 基础查询

1. 在搜索框输入 IP 地址（例如：`8.8.8.8`）
2. 点击"扫描 IP"按钮
3. 查看详细的风险分析报告

### 查询结果说明

#### 欺诈分数
- **0-29**：低风险（绿色）
- **30-74**：中等风险（橙色）
- **75-100**：高风险（红色）

#### 风险指标
- **代理/VPN/Tor**：是否使用匿名网络
- **活跃 VPN/Tor**：当前是否正在使用
- **机器人/爬虫**：是否为自动化流量
- **滥用记录**：是否有近期滥用行为

#### 位置信息
- 显示城市、地区、国家
- 经纬度坐标（可点击查看 Google Maps）
- 时区信息

#### 连接信息
- 移动网络检测
- 连接类型（需要 Premium 套餐）

#### 设备信息
- 操作系统
- 浏览器
- 设备品牌和型号

### 查看原始数据

点击"查看 原始 JSON"按钮可以查看 API 返回的完整 JSON 数据。

## 🛠️ 技术栈

- **框架**：Next.js 16.0.10 (App Router)
- **样式**：原生 CSS（CSS Variables + Modern Features）
- **API**：IPQualityScore Proxy Detection API
- **部署**：Vercel
- **字体**：Inter (Google Fonts)

## 📁 项目结构

```
ipqsPanel/
├── src/
│   └── app/
│       ├── api/
│       │   └── check/
│       │       └── route.js          # API 路由处理
│       ├── components/
│       │   ├── SearchInput.js        # 搜索输入组件
│       │   └── ResultCard.js         # 结果展示组件
│       ├── globals.css               # 全局样式
│       ├── layout.js                 # 根布局
│       └── page.js                   # 主页面
├── .env.local                        # 环境变量（不提交到 git）
├── .gitignore
├── next.config.mjs
├── package.json
└── README.md
```

## 🔧 API 配置

### 可用参数

在 `src/app/api/check/route.js` 中可以调整以下参数：

```javascript
const strictness = 1;              // 严格度 (0-3)
const allowPublicAccessPoints = 'true';
const fast = 'true';               // 快速模式
const mobile = 'true';             // 移动设备检测
```

### API 限制

免费套餐限制：
- 每月 5,000 次请求
- 部分高级功能需要 Premium 或 Enterprise 套餐

## 🎨 自定义样式

主要颜色变量在 `src/app/globals.css` 中定义：

```css
:root {
  --bg-primary: #181818;           /* 主背景色 */
  --text-primary: #fffce1;         /* 主文字颜色 */
  --accent-primary: #00d4ff;       /* 强调色 */
  /* ... 更多变量 */
}
```

## 📝 开发指南

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

### 代码规范

- 使用 ES6+ 语法
- 组件采用函数式组件
- 使用 CSS Variables 管理样式
- 遵循 Next.js App Router 最佳实践

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [IPQualityScore](https://www.ipqualityscore.com/) - 提供强大的 IP 风险检测 API
- [Next.js](https://nextjs.org/) - React 框架
- [Vercel](https://vercel.com/) - 部署平台

## 📮 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 [GitHub Issue](https://github.com/PakandAlive/ipqsPanel/issues)
- 项目主页：[https://github.com/PakandAlive/ipqsPanel](https://github.com/PakandAlive/ipqsPanel)

---

⭐ 如果这个项目对你有帮助，请给个 Star！
