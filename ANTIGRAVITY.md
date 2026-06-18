# 銷售專案 - ANTIGRAVITY.md

## 專案入口

專案名稱：AI 官方助理與教學簡報專案 (ai-assistant-reports)
專案用途：展示 AI 官方助理方案（功能模組與後續維護）及 AI 助理手把手實戰課程。
主要工作目錄：`/Users/jacob/Projects/2026 antig2/銷售專案`（舊 Google Drive 路徑已停用）
GitHub Repo：`https://github.com/jacob-cloud-n8n/ai-assistant-reports.git`
預設 Branch：`main`

## 專案筆記

筆記位置：`/Users/jacob/Projects/2026 antig2/銷售專案` 及父專案的 `團隊專區.md`。

## 工作規則

- **語言偏好**：回覆與說明一律使用 **繁體中文（Taiwan）**。
- **檔案路徑**：每次新建或修改檔案時，必須註明完整絕對路徑。
- **開工與收工**：
  - 開工時：無條件執行 `git fetch` 和 `git pull --rebase`，檢查 `git status` 與變更歷史。
  - 收工時：進行安全性與敏感資訊檢查，更新交接文件與筆記，分次 stage 並 commit 變更，最後 `git push`。
- **安全規範**：
  - 嚴格禁止 commit 任何 API keys、Google / Firebase tokens 與私鑰。
  - 不使用 `git add .` 無差別提交，精準控制每一次提交的檔案。
- **文件規範**：
  - 中英文版本必須保持同步修改（如 `report1.html` 與 `AI助理模組方案-步驟一.html`）。
  - 對外檔案的連結必須為 clickable markdown 格式。

## Firebase 部署邊界（強制）

- 正式站：`https://jacob-html-slides-2026.web.app`
- Firebase project：`jacob-html-slides-2026`
- 唯一允許的部署方式：在本目錄執行 `./deploy-firebase.sh`。
- 腳本只會把白名單內的 HTML、CSS、JS、JSON 與圖片複製到 `.firebase-deploy/` 後發布；禁止把 repo 根目錄直接設為 Hosting public。
- 禁止直接執行裸指令 `firebase deploy`；禁止使用父目錄的 `firebase.json` 或 `.firebaserc`。
- 父目錄 Firebase project 是 `codex-jacob`，且父目錄 `public/` 含其他應用，兩者不可混用。
- 部署後必須檢查正式網址，確認頁面內容與本地檔案一致。
