# HTML 交付驗收清單（投影片 / 報表 / 落地頁）

> 蒸餾自 Vercel Web Interface Guidelines（`github.com/vercel-labs/web-interface-guidelines`，2026-07-07 版，約 95 條中取靜態 HTML 適用者）。
> **用法**：AG 反 slop 驗收時逐項掃；MUST 違反＝退件，SHOULD 違反＝註記。
> **位階**：本清單不取代 CLAUDE.md 第六節品牌規範；衝突時**品牌規範優先**（例：Vercel 建議 layered shadows，我們禁發光投影→維持細線邊框）。

## 一、字排與內容
- [ ] MUST：省略號用 `…` 字元（不是三個點 `...`）
- [ ] MUST：數字對比場景（表格/報表）用 `font-variant-numeric: tabular-nums`
- [ ] MUST：單位與品牌名用不斷行空格（`10&nbsp;MB`）
- [ ] MUST：長文字容器要能撐（`truncate`/`line-clamp`/`break-words`；flex 子元素補 `min-w-0`）
- [ ] MUST：空資料狀態不能爛版（空字串/空陣列都要設計）
- [ ] SHOULD：彎引號「curly quotes」；標題防孤字（`text-wrap: balance`）
- [ ] MUST：`<title>` 對應內容（不是「Untitled」或模板殘留）

## 二、對比與色彩
- [ ] MUST：對比達標（優先用 APCA 標準檢查，工具：apcacontrast.com）
- [ ] MUST：狀態提示不能只靠顏色（紅=錯 要加圖示或文字）
- [ ] MUST：圖表用色盲友善調色盤（Chart.js 報表必檢）
- [ ] MUST：hover/active/focus 時對比要「增加」不是減少
- [ ] SHOULD：深色漸層防色帶（banding）——我們深色底 `#070a0f` 場景常見
- [ ] SHOULD：邊框/陰影/文字色調向背景色相靠攏（hue consistency）

## 三、深色主題（我們預設深色，必檢）
- [ ] MUST：`<html>` 加 `color-scheme: dark`
- [ ] MUST：原生 `<select>` 明確設 `background-color`＋`color`（Windows 會出白底）
- [ ] SHOULD：`<meta name="theme-color">` 同背景色

## 四、版面
- [ ] MUST：三檔驗證——手機、筆電、超寬（超寬可用 50% 縮放模擬）
- [ ] MUST：無多餘捲軸、無 overflow 爆版
- [ ] MUST：對齊是刻意的（貼格線/基線/邊緣），不是碰巧
- [ ] MUST：手機安全區（`env(safe-area-inset-*)`）
- [ ] SHOULD：巢狀圓角子 ≤ 父（同心）；圖示＋文字組合配重平衡

## 五、動效（Reveal.js 投影片必檢）
- [ ] MUST：尊重 `prefers-reduced-motion`（給降級版或停用）
- [ ] MUST：只動 `transform`/`opacity`；NEVER 動 `top/left/width/height`
- [ ] NEVER：`transition: all`——逐屬性列出
- [ ] MUST：動畫可中斷、由操作觸發（不自動播）
- [ ] MUST：`transform-origin` 合物理直覺；SVG 變形包 `<g>` 加 `transform-box: fill-box`

## 六、可及性
- [ ] MUST：優先原生語意（`button`/`a`/`table`/`label`），不濫用 ARIA
- [ ] MUST：標題層級完整 `<h1>`–`<h6>` 不跳層
- [ ] MUST：純圖示按鈕給 `aria-label`；裝飾元素 `aria-hidden`
- [ ] MUST：日期/數字在地化格式（`Intl.DateTimeFormat`/`Intl.NumberFormat`）

## 七、效能
- [ ] MUST：圖片寫死尺寸防 CLS；首屏圖 preload、其餘 lazy-load
- [ ] SHOULD：關鍵字型 `<link rel="preload" as="font">`＋`font-display: swap`（Playfair/Noto Sans TC 必用）
- [ ] SHOULD：CDN 網域 `<link rel="preconnect">`

---
*2026-07-07 Claude 建立（Jacob 拍板「確認可用內容」後蒸餾）。來源約 95 條，互動式 app 專屬規則（hydration/虛擬列表/URL state 等）未收；官網（階段③）開工時回原文補收。*
