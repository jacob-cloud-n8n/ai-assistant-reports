/**
 * OBS Studio WebSocket 遙控腳本 (obs-control.mjs)
 * ─────────────────────────────────────────────────────────
 * 用法：
 *   node scripts/obs-control.mjs <action> [password] [port]
 * 
 * 參數：
 *   <action>  : start | stop | pause | resume | status
 *   [password]: obs-websocket 的密碼 (預設為空)
 *   [port]    : obs-websocket 的連接埠 (預設為 4455)
 * 
 * 說明：
 *   本腳本使用 Node.js 內建的 WebSocket API (支援 Node 20+)，
 *   無需安裝額外的 npm 套件，方便 Agent 在終端機呼叫控制錄影。
 */

import { argv } from 'process';

const action = argv[2];
const password = argv[3] || '';
const port = argv[4] || '4455';

if (!action || !['start', 'stop', 'pause', 'resume', 'status'].includes(action)) {
  console.log(`
❌ 缺少或無效的指令！
用法：
  node scripts/obs-control.mjs <action> [password] [port]

指令說明：
  start  : 開始錄製
  stop   : 停止錄製
  pause  : 暫停錄製
  resume : 恢復錄製
  status : 查詢目前錄製狀態
`);
  process.exit(1);
}

const wsUrl = `ws://127.0.0.1:${port}`;
console.log(`🔌 正在連線至 OBS WebSocket: ${wsUrl}...`);

// 確保 Node.js 支援全域 WebSocket
if (typeof WebSocket === 'undefined') {
  console.error('❌ 您的 Node.js 版本過舊，不支援全域 WebSocket。請升級至 Node.js 20+ 以上版本。');
  process.exit(1);
}

const ws = new WebSocket(wsUrl);

let messageId = 1;
const callbacks = new Map();

function sendRequest(op, requestType, requestData = {}) {
  const id = String(messageId++);
  const payload = {
    op,
    d: {
      requestId: id,
      requestType,
      requestData
    }
  };
  ws.send(JSON.stringify(payload));
  return new Promise((resolve, reject) => {
    callbacks.set(id, { resolve, reject });
  });
}

ws.onopen = () => {
  console.log('✅ 已與 OBS Studio 建立 WebSocket 連線！');
};

ws.onmessage = async (event) => {
  const message = JSON.parse(event.data);
  const { op, d } = message;

  // op: 0 代表 Hello (OBS 伺服器發送的初始訊息)
  if (op === 0) {
    const { authentication, rpcVersion } = d;
    console.log('DEBUG: Hello message data:', JSON.stringify(d, null, 2));
    // 如果需要密碼驗證
    if (authentication) {
      console.log('🔒 OBS 要求連線驗證...');
      const crypto = await import('crypto');
      
      const connectionSecret = crypto
        .createHash('sha256')
        .update(password + authentication.salt)
        .digest('base64');
      console.log('DEBUG: Generated connectionSecret:', connectionSecret);
      
      const authResponse = crypto
        .createHash('sha256')
        .update(connectionSecret + authentication.challenge)
        .digest('base64');
      console.log('DEBUG: Generated authResponse:', authResponse);

      const identifyPayload = {
        op: 1, // Identify
        d: {
          rpcVersion,
          authentication: authResponse
        }
      };
      console.log('DEBUG: Sending Identify Payload:', JSON.stringify(identifyPayload, null, 2));
      ws.send(JSON.stringify(identifyPayload));
    } else {
      // 不需要密碼，直接 Identify
      ws.send(JSON.stringify({
        op: 1, // Identify
        d: { rpcVersion }
      }));
    }
  }

  // op: 2 代表 Identified (驗證通過)
  if (op === 2) {
    console.log('🔑 驗證通過，正在發送指令...');
    try {
      await executeAction();
    } catch (err) {
      console.error('❌ 執行指令失敗:', err.message || err);
    } finally {
      ws.close();
    }
  }

  // op: 7 代表 RequestResponse (請求的回覆)
  if (op === 7) {
    const { requestId, requestStatus } = d;
    const promise = callbacks.get(requestId);
    if (promise) {
      callbacks.delete(requestId);
      if (requestStatus.result) {
        promise.resolve(d.responseData);
      } else {
        promise.reject(new Error(requestStatus.comment || 'Request failed'));
      }
    }
  }
};

ws.onerror = (error) => {
  console.error('❌ 連線錯誤，請確認 OBS 軟體是否已啟動，且 WebSocket 伺服器已啟用。');
};

ws.onclose = (event) => {
  console.log(`🔌 連線已關閉。(代碼: ${event.code}, 理由: ${event.reason || '無'})`);
};

async function executeAction() {
  switch (action) {
    case 'start':
      console.log('🎥 正在啟動錄製...');
      await sendRequest(6, 'StartRecord');
      console.log('🚀 OBS 已開始錄製！');
      break;
    case 'stop':
      console.log('🛑 正在停止錄製...');
      const stopRes = await sendRequest(6, 'StopRecord');
      console.log(`✅ OBS 錄製已停止！影片已儲存至: ${stopRes.outputPath}`);
      break;
    case 'pause':
      console.log('⏸️ 正在暫停錄製...');
      await sendRequest(6, 'PauseRecord');
      console.log('⏸️ OBS 錄製已暫停。');
      break;
    case 'resume':
      console.log('▶️ 正在恢復錄製...');
      await sendRequest(6, 'ResumeRecord');
      console.log('▶️ OBS 錄製已恢復。');
      break;
    case 'status':
      console.log('🔍 正在查詢狀態...');
      const statusRes = await sendRequest(6, 'GetRecordStatus');
      console.log(`📊 目前錄製狀態:
  - 錄製中: ${statusRes.outputActive ? '🟢 是' : '🔴 否'}
  - 暫停中: ${statusRes.outputPaused ? '🟡 是' : '⚪ 否'}
  - 已錄製時間: ${(statusRes.outputDuration / 1000).toFixed(1)} 秒
  - 檔案大小: ${(statusRes.outputBytes / 1024 / 1024).toFixed(2)} MB
`);
      break;
  }
}
