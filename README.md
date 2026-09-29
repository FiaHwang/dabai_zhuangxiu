# 小白装修指南 (Dabai Zhuangxiu)

一份详尽的新手家庭装修避坑全景指南，包含硬装与软装两大阶段的全套工序、避坑要点、选品推荐与预算参考。

## 本地运行

**前置环境：** Node.js 18+

1. 安装依赖：
   ```bash
   npm install
   ```
2. 启动开发服务器：
   ```bash
   npm run dev
   ```
3. 构建打包（输出至 `docs` 目录供 GitHub Pages 使用）：
   ```bash
   npm run build
   ```

## 部署到 GitHub Pages 预览

本项目支持 GitHub Pages 原生自带的 `/docs` 目录部署（无需任何 GitHub Actions 权限）。

### 开启步骤（仅需两步）：
1. 在 GitHub 仓库页面，点击顶部的 **Settings**（设置） -> 左侧边栏点击 **Pages**。
2. 在 **Branch** 区域：
   - 分支选择 `main`（或 `master`）；
   - 文件夹下拉框选择 `/docs`（不要选 `/ (root)`）；
   - 点击 **Save**（保存）。
3. 等待约 1 分钟刷新，即可在 `https://fiahwang.github.io/dabai_zhuangxiu/` 正常预览浏览。
