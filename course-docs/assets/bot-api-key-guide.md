# 🤖 Telegram BotFather 與 Discord Bot 金鑰申請手冊

本手冊為您詳細梳理 Telegram 機器人與 Discord 機器人的 API 金鑰申請步驟，協助您安全、快速地取得 Bot Token，以便在 Zeabur 部署您的隨身特助。

---

## 🎯 第一部分：Telegram 機器人 (BotFather) 申請步驟

Telegram 的機器人申請流程非常簡單，完全在 Telegram 通訊軟體內即可完成。

### 1. 喚醒機器人之父 (BotFather)
- 開啟 Telegram，在搜尋列輸入 `@BotFather`。
- ⚠️ **注意安全**：請認明有藍色打勾認證標章的 `@BotFather`，避免誤入釣魚機器人。
- 點擊「開始」或發送 `/start` 指令。

### 2. 建立新機器人
- 發送 `/newbot` 指令。
- **設定暱稱 (Nickname)**：BotFather 會請您輸入機器人顯示的名字（例如：`小李隨身特助`）。
- **設定唯一的 Username**：接下來必須設定一個英文的唯一識別碼，**必須以 `bot` 結尾**（例如：`jacob_helper_bot` 或 `my_personal_assistant_bot`）。

### 3. 取得 API Token
- 建立成功後，BotFather 會發送一封祝賀訊息。
- 訊息中會包含一串長字串，類似：`123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ-your-tg-token`。
- **這就是您的 TELEGRAM_BOT_TOKEN**，請妥善複製並保存。

---

## 🎯 第二部分：Discord 機器人 (Developer Portal) 申請步驟

Discord 機器人功能強大，但設定層級較多。請按照以下步驟完成設定：

### 1. 建立 Application
- 開啟瀏覽器，前往 [Discord Developer Portal](https://discord.com/developers/applications)。
- 使用您的 Discord 帳號登入。
- 點擊右上角的 **New Application** 按鈕。
- 輸入您的 Application 名稱（例如：`Abby Book Bot`），然後點擊 `Create`。

### 2. 生成並複製 Bot Token
- 在左側選單中，點選 **Bot** 分頁。
- 在「Username」欄位設定您的機器人頭像與名字。
- 點擊下方 **Reset Token** 按鈕。
- Discord 會要求輸入兩步驟驗證或確認，完成後會出現一串長 Token。
- **這就是您的 DISCORD_BOT_TOKEN**，點選 `Copy` 保存。⚠️ **注意：此 Token 只會顯示一次，重新整理網頁後就無法再看見。若遺失，須重新點選 Reset Token 生成。**

### 3. 開啟關鍵權限 (Intents)
- 在同一個 **Bot** 分頁往下滑，找到 **Privileged Gateway Intents** 區塊。
- 必須將以下三個開關**全部打開 (ON)**：
  - [x] **Presence Intent**
  - [x] **Server Members Intent**
  - [x] **Message Content Intent** (⚠️ **最關鍵！如果不開，機器人將無法讀取使用者在頻道發送的對話內容**)
- 點擊頁面底部的 **Save Changes** 保存設定。

### 4. 生成 Bot 邀請連結並加入伺服器
- 在左側選單中，點選 **OAuth2** > **URL Generator**。
- 在 **Scopes** 表格中，勾選 **`bot`** 複選框。
- 勾選後下方會出現 **Bot Permissions** 表格，請勾選 **`Administrator`** (系統管理員權限，可視開發需求調整為更限縮的權限如 Send Messages / Read Message History)。
- 複製頁面最下方生成的 URL 連結。
- 在瀏覽器中貼上該連結，選擇您要將機器人加入的 Discord 伺服器，點選授權即可！

---

## 🔒 金鑰安全鐵律 (Do Not Commit Secrets)

> [!CAUTION]
> - **Bot Token 就是您機器人的「通行鑰匙」**。任何人只要拿到這個 Token，就能完全控制您的機器人，並消耗您的 API 額度。
> - ⚠️ **絕不**將 Token 寫在程式碼中！
> - ⚠️ **絕不**將含有 Token 的 `.env` 檔案 commit 推送到 GitHub 公開或私有倉庫！
> - 如果發現 Token 洩漏，請立刻前往 BotFather (TG) 或 Developer Portal (Discord) 點選 **Revoke/Reset Token** 重建新金鑰。
