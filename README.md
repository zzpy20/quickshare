# quickshare

A personal file/image upload tool. Drop a file, get a link, share it. Built with [Claude Code](https://claude.ai/code).

**Live:** https://share.1000600.xyz

[English](#english) | [中文](#中文)

---

## English

quickshare exists for one reason: sometimes you just need to upload a screenshot, PDF, or video and hand someone a link — no account, no folder structure, no fuss. It's a single Cloudflare Worker backed by R2 storage, with no database and no build step.

### Screenshots

| Upload | Admin | Gallery |
|---|---|---|
| ![Upload page](docs/screenshots/upload.jpg) | ![Admin page](docs/screenshots/admin.jpg) | ![Gallery page](docs/screenshots/gallery.png) |

*(Sample data shown above — not real uploads.)*

### Features

- **Drag-and-drop upload** — one file or many at once, from the browser
- **Share a link instead of a file** — paste one or more URLs and get a short quickshare link for each; opening it 302-redirects straight to the target, no upload needed
- **Instant shareable links** — each file gets a short, unguessable public URL (`/f/<id>/filename`) that needs no login to open
- **Batch links** — drop several files (or links) together and also get one link to a page listing just that batch, isolated from anything uploaded before or after
- **Password-gated uploads, public downloads** — uploading requires a password (saved once in the browser); viewing/downloading a shared link never does
- **Admin panel** (`/admin`) — see every upload grouped by batch, with size and upload date
  - Checkbox multi-select with bulk delete
  - Per-file delete and **regenerate link** (rotates a file to a fresh random link)
  - Regenerated links keep the old link alive for a **7-day grace period** before it expires, so a share you already sent doesn't break instantly
  - Select a batch (or a single file) and click **"Email selected"** to send yourself that entry's link and file list, via Resend
  - **Highlight** entries with a per-file star toggle, and a "Highlighted only" filter chip to find them again
  - **Archive entries you're done with** — a per-file toggle, a per-batch "Archive batch" button, and a bulk "Archive selected" action (mirroring "Combine selected"), plus a dedicated "Archived" tab. Archiving always applies to a whole batch together, so one can never end up half-archived; it's admin-panel-only bookkeeping — shared links keep working. The search box still finds archived results even from the default view
  - The bulk-action toolbar stays pinned to the top of the screen while scrolling, so it's always reachable regardless of how far down the list you've selected from
  - A floating "+" button stays on screen while scrolling through a long file list
- **Email a file in** — attach a file to an email and send it to `share@1000600.xyz`; it's uploaded automatically (tagged `emailed in`) and you get a Resend reply with the share link. Restricted to a single allowed sender address
- **Thumbnails generated on demand** — image thumbnails are transformed straight from the original in R2 at request time (Cloudflare Images), not pre-generated at upload or stored as separate files
- **Responsive layout** — usable on a phone, and widens up to 1000px on desktop/laptop screens
- **No database** — everything lives in R2; the admin list is built by enumerating bucket objects

### Stack

Cloudflare Workers (JavaScript) + Cloudflare R2, deployed with Wrangler, plus Resend for outbound email, Cloudflare Images for on-the-fly thumbnails, and Cloudflare Email Routing + [postal-mime](https://www.npmjs.com/package/postal-mime) for inbound email uploads. No frameworks — `postal-mime` is the app's only dependency, so `npm install` is needed once before deploying, but there's still no separate build step.

### Changelog

**2026-08-23**
- Admin panel: **Archive / Unarchive** — a per-file toggle, a per-batch "Archive batch" button, and a bulk "Archive selected" toolbar action (same UI pattern as "Combine selected"). Archived entries are hidden from every normal view by default and only appear in a new "Archived" tab, where the same controls unarchive them. Archiving always acts on a whole batch at once (never leaves one half-archived), combining an archived entry always un-archives the result, and it's purely admin-panel bookkeeping — direct file/batch links and the gallery are unaffected
- The search box now finds matches inside archived entries too, even when browsing the default (non-archived) view, instead of only within whichever tab is currently active
- The bulk-action toolbar (Delete/Archive/Combine/Email selected) is now sticky, staying pinned to the top of the screen while scrolling through a long, filtered, or searched list
- Restyled the "Archived" tab and its per-item toggle buttons with a bold indigo active state, after the initial gray blended into the UI too much to notice at a glance

**2026-08-22**
- Fixed garbled (mojibake) text on iPhone for HTML pages saved via "Save as page" or uploaded directly: the server-side HTML sanitizer stripped every `<meta>` tag — including the charset declaration — and stored HTML uploads had no charset in their `Content-Type` either, so with zero encoding signal anywhere, iOS Safari/Chrome guessed the wrong encoding for non-Latin text while macOS happened to guess right. Both are now declared explicitly; existing previously-saved pages were repaired in place via a one-time migration

**2026-08-15**
- Admin panel: a per-file **highlight** star toggle, and a "★ Highlighted only" filter chip to narrow the list down to just the entries you've starred
- Fixed uploaded HTML files silently losing every `<img>` tag — the sanitizer was stripping images along with genuinely dangerous tags instead of just neutralizing unsafe attributes on them

**2026-08-09**
- Admin page: a "back to top" floating button appears once you've scrolled down, stacked above the existing "+" upload button, and smooth-scrolls back to the top of the list on click
- Upload page reorganized into tabs — "Upload files" (default), "Share links", "Save as page" — instead of three stacked sections that couldn't all fit on one screen at once. Switching tabs never loses in-progress state in another tab (staged files, a drafted link list, or pasted content all survive)
- File uploads now stage first instead of firing immediately on drop/select: drag or pick files from as many folders as you like, review them in a list (with size and a remove button per file), then click "Upload N files" to commit. Everything staged at that moment becomes one combined batch with one shared link, matching how Links and Save-as-page already worked. A failed upload leaves the staged files in place so it can be retried without re-selecting everything

**2026-08-08**
- Email a file to `share@1000600.xyz` and it uploads automatically — Cloudflare Email Routing hands the message to the Worker's new `email()` handler, which checks the sender against an allowlist, parses attachments with `postal-mime`, stores them exactly like a normal upload (same batch/manifest logic when there's more than one), tags them `emailed in`, and sends back the usual Resend "here's your link" notification
- Fixed a caching bug (again — see below): `/admin/list` and `/admin/tags` were missing explicit `no-store` headers, so Cloudflare's edge cache would occasionally serve a stale — or, worse, completely unauthenticated — copy of the file listing. This exact fix had been made once already but only existed in an uncommitted feature branch that later got discarded, silently reintroducing the bug; it's now its own dedicated commit so that can't happen again

**2026-08-07**
- Thumbnails switched from client-side generation (a canvas resize on upload, stored as a companion R2 object per file) to on-demand transforms via the Cloudflare Images binding — the original in R2 is resized/re-encoded to WebP at request time, cached at the edge. Removed the client-side thumbnail generator, the "Generate missing thumbnails" backfill button, and all the copy/delete bookkeeping that kept a separate thumbnail object in sync with every delete/regenerate/combine
- Admin bulk toolbar: "Email selected" sends the selected entry's link (batch or single file) and file list to yourself via Resend — the button appears exactly when the current selection touches one entry, mirroring how "Combine selected" appears once it touches two or more

**2026-08-04**
- Share a link (or a few) without uploading a file — a new "share a link instead" field on the upload page stores each URL as a redirect rather than file bytes, reusing the existing tags/captions/batch/admin/gallery machinery. Multiple links shared together land on the existing batch page as a simple link list. New "🔗 Links" type filter on admin and gallery.

**2026-08-01**
- Multi-line captions on both the upload page and the admin inline editor
- Type filter chips (Photos & images / PDFs / Videos / Audio / Documents / Archives / Other) on the admin page, matching the gallery
- Restyled the Upload/Admin/Gallery cross-links as colored pill buttons, and gave every page a link to both of the others
- Custom confirm modal (Cancel/Delete) for every delete action — single file, batch, and bulk-selected; single-file delete previously had no confirmation at all
- Site footer with the live URL and a short feature summary on all three pages
- Fixed a bug where editing a caption or tag reset a file's displayed date to "now" — the true upload date is now preserved in R2 customMetadata across edits and link regeneration
- Small/Large thumbnail size toggle on the gallery (pure CSS, no new thumbnail assets)
- Tag autocomplete on the upload page's tag field and the admin page's per-file tag-add input, suggesting existing tags as you type
  - Fixed a race where a delayed blur-close could wipe a freshly-reopened suggestion dropdown
  - Fixed the suggestion dropdown rendering behind the next file card (stacking-context issue); also added `Cache-Control: no-store` to the app pages after discovering a stale browser cache was masking the fix during testing

---

## 中文

quickshare 是一个个人文件/图片上传工具。目的很简单：有时候你只是想上传一张截图、一份 PDF 或一段视频，然后把链接发给别人——不需要账号，不需要整理文件夹，越简单越好。它是一个单文件的 Cloudflare Worker，后端存储用 R2，没有数据库，也不需要构建步骤。

### 截图

| 上传页 | 管理面板 | 相册 |
|---|---|---|
| ![上传页](docs/screenshots/upload.jpg) | ![管理面板](docs/screenshots/admin.jpg) | ![相册页](docs/screenshots/gallery.png) |

*（以上为示例数据，非真实上传内容。）*

### 功能特性

- **拖拽上传** — 支持单个或同时上传多个文件
- **只分享链接，不用上传文件** — 粘贴一个或多个网址即可生成对应的简短 quickshare 链接，打开后会直接 302 跳转到目标网址
- **即时生成分享链接** — 每个文件都会生成一个简短、不可猜测的公开链接（`/f/<id>/文件名`），打开时无需登录
- **批量链接** — 一次拖入多个文件（或链接）时，除了各自的链接外，还会生成一个"合集"链接，展示这一批内容，与之前或之后上传的文件互不影响
- **上传需要密码，下载无需密码** — 上传文件需要输入密码（浏览器会记住），但打开分享链接查看/下载文件完全不需要密码
- **管理面板**（`/admin`）— 按批次查看所有已上传文件，显示大小和上传时间
  - 勾选多个文件批量删除
  - 单个文件删除，以及**重新生成链接**（把文件换到一个全新的随机链接上）
  - 重新生成链接后，旧链接会保留 **7 天的过渡期** 才失效，避免已经发出去的链接立刻失效
  - 勾选一个批次（或单个文件）后点击**"Email selected"**，即可通过 Resend 把该条目的链接和文件列表发到自己邮箱
  - **高亮标记** — 每个文件都有一个星标开关，配合"仅显示高亮"筛选标签快速找回标记过的内容
  - **归档用不到的条目** — 单文件开关、批次级"归档批次"按钮，以及批量工具栏的"归档所选"（与"合并所选"的交互方式一致），再加一个专门的"已归档"标签页。归档始终作用于整个批次（不会出现半归档状态），只是管理面板内部的整理功能——分享链接照常可用。搜索框在默认视图下也能搜到已归档内容
  - 批量操作工具栏在滚动时会固定在屏幕顶部，无论列表选到多下面都能随时点到
  - 悬浮的"+"按钮始终固定在屏幕上，方便在长长的文件列表中随时跳转到上传页面
- **邮件上传** — 把文件当附件发到 `share@1000600.xyz` 即可自动上传（自动打上 `emailed in` 标签），随后会收到一封 Resend 回信附上分享链接。仅限一个指定的发件邮箱地址使用
- **缩略图按需生成** — 图片缩略图在请求时由 R2 中的原图实时转换生成（Cloudflare Images），不再在上传时预先生成、也不再单独存成一个文件
- **响应式布局** — 手机上正常显示，桌面/笔记本电脑屏幕下最宽可达 1000px
- **无需数据库** — 所有数据都存在 R2 里，管理面板的列表是实时枚举存储桶中的对象生成的

### 技术栈

Cloudflare Workers（JavaScript）+ Cloudflare R2，用 Wrangler 部署，另用 Resend 发送邮件、Cloudflare Images 实时生成缩略图、Cloudflare Email Routing + [postal-mime](https://www.npmjs.com/package/postal-mime) 处理邮件上传。没有前端框架——`postal-mime` 是本项目唯一的依赖，部署前需要执行一次 `npm install`，但仍然不需要单独的构建步骤。

### 更新日志

**2026-08-23**
- 管理面板新增**归档 / 取消归档**功能——单文件开关、批次级"归档批次"按钮，以及批量工具栏的"归档所选"（与"合并所选"是同一套交互模式）。已归档的条目默认从所有常规视图中隐藏，只出现在新增的"已归档"标签页里，同样的按钮在那里用来取消归档。归档操作始终作用于整个批次（不会出现半归档的情况），合并操作只要涉及已归档的条目就会把结果一并取消归档，而且归档只是管理面板内部的整理状态——直接的文件/批次链接和相册页都不受影响
- 搜索框现在即使在默认（非归档）视图下也能搜到已归档条目里的内容，而不再局限于当前所在的标签页
- 批量操作工具栏（删除/归档/合并/Email selected）改为吸顶固定，无论列表经过筛选或搜索后滚动多远都能随时点到
- 重新设计了"已归档"标签页及各归档按钮点亮后的样式，改用醒目的靛蓝色——此前的灰色和界面本身太接近，点击后不容易看出状态变化

**2026-08-22**
- 修复了通过"存为网页"粘贴保存或直接上传的 HTML 页面，在 iPhone 上中文等非拉丁文字显示乱码的问题：服务端的 HTML 净化逻辑会剥离所有 `<meta>` 标签（包括编码声明），存储时的 `Content-Type` 也没有带上编码信息，导致整个页面完全没有任何编码线索——iOS 上的 Safari/Chrome 会猜错编码，而 Mac 上恰好猜对了，才没被注意到。现在两处都会显式声明 UTF-8；此前已保存的旧页面也通过一次性迁移就地修复了

**2026-08-15**
- 管理面板新增单文件**高亮**星标开关，以及"★ 仅显示高亮"筛选标签，可以快速把列表收窄到只显示标记过的条目
- 修复了上传的 HTML 文件中所有 `<img>` 标签会被静默删除的问题——净化逻辑此前把图片标签和真正有风险的标签一起整个移除了，而不是只清理图片标签上不安全的属性

**2026-08-09**
- 管理面板新增"回到顶部"悬浮按钮，向下滚动后会出现在现有"+"上传按钮的上方，点击后平滑滚动回列表顶部
- 上传页改为标签页布局——"上传文件"（默认打开）、"分享链接"、"存为网页"——取代原来三段堆叠、一屏放不下的布局。切换标签页不会丢失其他标签页里正在进行的内容（暂存的文件、正在编辑的链接列表、粘贴的内容都会保留）
- 文件上传改为先暂存、再手动提交，不再是拖入/选中后立即上传：可以从任意多个文件夹里拖入或选择文件，在列表中查看（显示大小，每个文件都有移除按钮），确认无误后点击"上传 N 个文件"一次性提交。点击那一刻暂存的所有文件会合并成一个批次、共用一个链接，与"分享链接"和"存为网页"的行为保持一致。如果上传失败，暂存的文件不会丢失，可以直接重试而不用重新选择
- 把文件发到 `share@1000600.xyz` 即可自动上传——Cloudflare Email Routing 把邮件转发给 Worker 新增的 `email()` 处理函数，函数会先核对发件人是否在白名单内，再用 `postal-mime` 解析附件，按照和普通上传完全相同的方式存储（多个附件时同样走批量/manifest 逻辑），打上 `emailed in` 标签，最后通过 Resend 回一封"这是你的链接"通知邮件
- 修复了一个缓存问题（其实是"再次"修复）：`/admin/list` 和 `/admin/tags` 缺少明确的 `no-store` 响应头，导致 Cloudflare 边缘缓存偶尔会返回过期的、甚至是完全未经身份验证就能看到的文件列表副本。这个修复此前其实已经做过一次，但当时只存在于一个后来被丢弃的未提交功能分支里，导致问题在无声无息中又回来了；这次把它拆成单独一个提交，避免同样的事再发生一次

**2026-08-07**
- 缩略图生成方式从"客户端生成"（上传时用 canvas 缩放，再为每个文件单独存一份 R2 缩略图对象）改为"按需实时转换"：通过 Cloudflare Images 绑定，在请求时把 R2 里的原图实时转成 WebP 缩略图，并在边缘节点缓存。移除了客户端缩略图生成逻辑、"生成缺失的缩略图"按钮，以及此前为了让缩略图对象与原文件保持同步、在删除/重新生成链接/合并批次时都要额外维护的一整套复制/删除逻辑
- 管理面板批量工具栏新增"Email selected"：选中一个条目（批次或单个文件）后，通过 Resend 把它的链接和文件列表发送到自己邮箱——这个按钮只在当前勾选恰好命中一个条目时出现，与"Combine selected"在命中两个及以上条目时才出现的逻辑相呼应

**2026-08-04**
- 新增"只分享链接、不上传文件"的功能——上传页新增"改为分享链接"输入框，每个网址会作为跳转链接存储（而非文件内容），复用现有的标签/备注/批量/管理面板/相册等全部机制。一次分享多个链接时，会像批量文件一样生成一个列出所有链接的合集页面。管理面板和相册新增"🔗 链接"类型筛选。

**2026-08-01**
- 上传页和管理面板的行内编辑器，标题/备注（caption）字段支持多行输入
- 管理面板新增类型筛选标签（图片 / PDF / 视频 / 音频 / 文档 / 压缩包 / 其他），与相册页保持一致
- 将上传、管理、相册三个页面之间的跳转链接改为彩色胶囊按钮样式，并让每个页面都能直接跳转到另外两个页面
- 所有删除操作（单个文件、整批、批量勾选）新增自定义确认弹窗（取消/删除）；此前单文件删除完全没有二次确认
- 三个页面底部新增页脚，展示网站链接和功能简介
- 修复了编辑标题或标签会把文件显示的日期重置为"当前时间"的问题——真实上传时间现在会保存在 R2 的 customMetadata 中，编辑或重新生成链接都不会覆盖它
- 相册页新增缩略图"小/大"尺寸切换（纯 CSS 实现，不生成新的缩略图文件）
- 上传页的标签输入框和管理面板每个文件的"+标签"输入框新增自动补全，输入时会提示已有的相似标签
  - 修复了一处竞态问题：失焦后延迟关闭的建议下拉框，可能会在重新聚焦后误把刚打开的下拉框关掉
  - 修复了建议下拉框被下一个文件卡片遮挡的层级问题；排查过程中发现浏览器缓存了旧版本页面导致看不到修复效果，因此也给这几个页面加上了 `Cache-Control: no-store`
