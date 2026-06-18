# AI 官方助理方案與教學課程簡報 (ai-assistant-reports)

本專案用於展示與部署 **AI 官方助理方案** 及 **AI Agent 實戰教學課程** 的 HTML 簡報頁面。

## 📂 目錄結構

*   `index.html`：簡報入口首頁，引導至步驟一與步驟二。
*   `AI助理模組方案-步驟一.html` / `report1.html`：第一階段簡報（4 大功能模組介紹與建置流程）。
*   `AI助理模組方案-步驟二.html` / `report2.html`：第二階段簡報（後續維護服務承諾、SLA 與費用說明）。
*   `AI助理運用與教學課程.html` / `course.html`：AI Agent 課程教學簡報（手把手帶練個人秘書與工作流助理課程）。
*   `images/`：存放簡報中引用的介面示意圖。

## 🚀 部署資訊

*   正式站託管於 Firebase Hosting：`jacob-html-slides-2026`。
*   正式網址：[https://jacob-html-slides-2026.web.app](https://jacob-html-slides-2026.web.app)
*   GitHub repo 的 `main` 分支負責版本管理；push 不等同 Firebase 正式站部署。
*   正式部署只能在本目錄執行：

```bash
./deploy-firebase.sh
```

部署腳本會依靜態資產白名單重建 `.firebase-deploy/`，固定使用本目錄的 `firebase.json`，並強制指定 `--project jacob-html-slides-2026`。禁止直接執行裸指令 `firebase deploy`，避免誤用父目錄的 `codex-jacob` 設定或發布 repo 內部檔案。

## 🔒 工作規範
本專案遵循 `ANTIGRAVITY.md` 中定義的工作流程（包含開工與收工規範）。請在修改時確保中英文版本一致，並注意不要 commit 敏感金鑰。

## 📅 最新更新與線上部署日誌 (2026-06-07)

我們已成功優化簡報內容，並將全部網頁部署至 **Firebase Hosting**，便於客戶線上檢視（配色與佈局皆維持 Apple 風格淡色調設計）：

*   🌐 **首頁傳送門**：[https://jacob-html-slides-2026.web.app](https://jacob-html-slides-2026.web.app)
*   🌐 **步驟一：模組方案與建置**：[report1.html](https://jacob-html-slides-2026.web.app/report1.html)
*   🌐 **步驟二：營運管理與費用**：[report2.html](https://jacob-html-slides-2026.web.app/report2.html)
*   🌐 **步驟三：AI 助理運用與教學課程**：[course.html](https://jacob-html-slides-2026.web.app/course.html)

### 🛠️ 本次優化重點
1.  **AI 助理運用與教學課程 (步驟三)**：
    *   **核心業務定位**：調整為「以日常白話文自然語言與 AI 溝通」，移除 Prompt / 語法等字眼，強調免程式碼與複雜語法。
    *   **早期陪跑稀缺性**：明確標示「目前為推廣早期的一對一/小班制指導，未來將全面改為線上預錄課程（不再提供親自帶練）」，呼籲客戶把握當前黃金期。
2.  **傳送門更新**：
    *   更新 `index.html` 導航結構，將「步驟三：AI 助理運用與教學」卡片完美融入 Apple 淡色系排版中。
3.  **LINE 助理簡報 (步驟一與二)**：
    *   移除主動推播功能以防後續 Line API 改版收費問題。
    *   調整 SLA 排除故障的回應時間（乘以 3 倍表示較寬鬆時間）。

---
*記錄人：AntiGravity 助理*
