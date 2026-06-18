# AGENTS.md - AI assistant sales slides

## Project boundary

- Repository: `https://github.com/jacob-cloud-n8n/ai-assistant-reports.git`
- Local root: `/Users/jacob/Projects/2026 antig2/銷售專案`
- Production Hosting: `https://jacob-html-slides-2026.web.app`
- Firebase project: `jacob-html-slides-2026`

This directory is an independent Git repository. Read `ANTIGRAVITY.md` before editing.

## Firebase deployment (mandatory)

Deploy **only** through:

```bash
./deploy-firebase.sh
```

The script rebuilds `.firebase-deploy/` from an allowlist, **verifies all internal links in index.html exist**, then deploys to `jacob-html-slides-2026`. Agents must not run a bare `firebase deploy`.

**⚠️ 已知踩坑紀錄（所有 Agent 必讀）：**

1. **連結断掉上線**：改 index.html 卡片順序或檔名後，沒有驗證連結是否指向實際檔案 → 部署後 404。**現在 deploy-firebase.sh 會自動跑 verify-links.sh，有断link就阻止部署。**
2. **Firebase 部署到錯誤專案**：從父目錄 `2026 antig2/` 跑 deploy 會偵測到 root `.firebaserc`（指向 `codex-jacob`）。**必須從銷售專案目錄跑 deploy-firebase.sh。**
3. **中文檔名在 Firebase 404**：瀏覽器會自動 URL 編碼中文（`%E7%82%BA...`），但 Firebase Hosting 不支援這種請求。**所有 HTML 檔名必須用英文**（如 `for-kids-hermes-guide.html`），不要用中文檔名。
4. **覆蓋原始檔案**：`hermes-training.html` 原本是「為孩子建立隨身書僮」，被覆蓋成「數位秘書銷售頁」後，原始內容差点遺失。**改名或覆蓋前，先在 git 確認舊版有 commit 記錄。**

## Safety

- Never commit Firebase tokens, API keys, cookies, or service-account files.
- Never use `git add .`; stage only files related to the current task.
- Keep paired Chinese and English HTML files synchronized.
- **改 index.html 後，先跑 `bash verify-links.sh` 確認連結無誤再部署。**
- Verify the production URL after deployment.
