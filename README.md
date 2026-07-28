# quickshare

A personal file/image upload tool. Drop a file, get a link, share it. Built with [Claude Code](https://claude.ai/code).

**Live:** https://share.1000600.xyz

[English](#english) | [中文](#中文)

---

## English

quickshare exists for one reason: sometimes you just need to upload a screenshot, PDF, or video and hand someone a link — no account, no folder structure, no fuss. It's a single Cloudflare Worker backed by R2 storage, with no database and no build step.

### Features

- **Drag-and-drop upload** — one file or many at once, from the browser
- **Instant shareable links** — each file gets a short, unguessable public URL (`/f/<id>/filename`) that needs no login to open
- **Batch links** — drop several files together and also get one link to a page listing just that batch, isolated from anything uploaded before or after
- **Password-gated uploads, public downloads** — uploading requires a password (saved once in the browser); viewing/downloading a shared link never does
- **Admin panel** (`/admin`) — see every upload grouped by batch, with size and upload date
  - Checkbox multi-select with bulk delete
  - Per-file delete and **regenerate link** (rotates a file to a fresh random link)
  - Regenerated links keep the old link alive for a **7-day grace period** before it expires, so a share you already sent doesn't break instantly
  - A floating "+" button stays on screen while scrolling through a long file list
- **Responsive layout** — usable on a phone, and widens up to 1000px on desktop/laptop screens
- **No database** — everything lives in R2; the admin list is built by enumerating bucket objects

### Stack

Cloudflare Workers (JavaScript, single file) + Cloudflare R2, deployed with Wrangler. No frameworks, no build step.

---

## 中文

quickshare 是一个个人文件/图片上传工具。目的很简单：有时候你只是想上传一张截图、一份 PDF 或一段视频，然后把链接发给别人——不需要账号，不需要整理文件夹，越简单越好。它是一个单文件的 Cloudflare Worker，后端存储用 R2，没有数据库，也不需要构建步骤。

### 功能特性

- **拖拽上传** — 支持单个或同时上传多个文件
- **即时生成分享链接** — 每个文件都会生成一个简短、不可猜测的公开链接（`/f/<id>/文件名`），打开时无需登录
- **批量链接** — 一次拖入多个文件时，除了各自的链接外，还会生成一个"合集"链接，展示这一批文件，与之前或之后上传的文件互不影响
- **上传需要密码，下载无需密码** — 上传文件需要输入密码（浏览器会记住），但打开分享链接查看/下载文件完全不需要密码
- **管理面板**（`/admin`）— 按批次查看所有已上传文件，显示大小和上传时间
  - 勾选多个文件批量删除
  - 单个文件删除，以及**重新生成链接**（把文件换到一个全新的随机链接上）
  - 重新生成链接后，旧链接会保留 **7 天的过渡期** 才失效，避免已经发出去的链接立刻失效
  - 悬浮的"+"按钮始终固定在屏幕上，方便在长长的文件列表中随时跳转到上传页面
- **响应式布局** — 手机上正常显示，桌面/笔记本电脑屏幕下最宽可达 1000px
- **无需数据库** — 所有数据都存在 R2 里，管理面板的列表是实时枚举存储桶中的对象生成的

### 技术栈

Cloudflare Workers（JavaScript，单文件）+ Cloudflare R2，用 Wrangler 部署。没有前端框架，不需要构建步骤。
