# NotebookLM 基礎操作教材實作計畫

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推薦）或 superpowers:executing-plans 逐任務實作此計畫。步驟使用復選框（`- [ ]`）語法來追蹤進度。

**目標：** 新增一頁繁體中文 NotebookLM 入門教材，讓初次使用者能建立筆記本、加入來源、提問並核對引用。

**架構：** 延續網站的純靜態 HTML 架構。新頁共用 `assets/style.css` 和 `assets/nav.js`，首頁以現有「工具」分類提供入口，不新增套件、API 或操作圖片。

**技術棧：** HTML、既有 CSS／JavaScript、Python 標準函式庫 HTTP 伺服器（僅供本機驗證）。

---

## 檔案與責任

- 建立 `notebooklm-basics.html`：操作步驟、資料安全提醒、虛構資料練習與基本排除方式。
- 修改 `index.html`：新增「工具」分類教材卡片，沿用 `assets/thumb-notebooklm-ai-training.png`。
- 修改 `assets/nav.js`：將新頁加入共用導覽。
- 建立 `docs/superpowers/plans/2026-10-16-notebooklm-basics.md`：本實作計畫。

## Task 1: 建立 NotebookLM 基礎操作頁

**檔案：**
- 建立：`notebooklm-basics.html`

- [ ] **步驟 1：建立沿用網站共用樣式的頁面骨架**

加入繁體中文文件標記、viewport、頁面標題、`assets/style.css` 和 `assets/nav.js`；主內容使用既有 `.card`、`.timeline`、`.sample`、`.done` 等樣式，不新增 CSS。

```html
<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>NotebookLM 基礎操作</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <header>
    <h1>NotebookLM 基礎操作</h1>
    <p>從建立筆記本到查證 AI 回答，完成第一次操作。</p>
  </header>
  <main></main>
  <script src="assets/nav.js"></script>
</body>
</html>
```

- [ ] **步驟 2：加入入門操作步驟與入口網址**

在主內容依序說明：確認公司允許使用的帳號與資料、開啟 NotebookLM、建立筆記本、加入公開或虛構來源、等待來源完成處理、選取來源後提問、點開引用核對、整理並人工審閱結果。NotebookLM 入口使用新分頁及 `rel="noopener"`：

```html
<a href="https://notebooklm.google.com/" target="_blank" rel="noopener">
  開啟 NotebookLM
</a>
```

操作按鈕以文字描述，避免依賴可能隨 Google 更新而改變的精確版面位置。

- [ ] **步驟 3：加入可獨立完成的虛構資料練習**

使用既有 `.sample` 區塊提供以下資料，並要求學員將其貼為新來源：

```text
【虛構服務資料：雲杉備份試行方案】
提供 500 GB 儲存空間，每月最多備份 30 次，試用期為 14 天。
這份資料沒有提到是否支援手機 App。
```

提供兩個練習問題：先詢問儲存空間、備份次數及試用期；再詢問是否支援手機 App。完成標準是第一題的答案都能由引用支持，第二題明確回答「來源未提供」，不可自行推測。

- [ ] **步驟 4：補上資料安全與基本排除方式**

說明不得將客戶資料、個資、內部文件或帳密放入未經核准的工具。列出來源仍在處理、回答沒有引用、引用不支持回答時的對應處理：確認處理狀態、確認相關來源已選取、重寫問題或補充合適來源，未查證前不可採用答案。

- [ ] **步驟 5：啟動本機網站並檢查新頁**

執行：`python -m http.server 8000`

預期：從 `http://localhost:8000/notebooklm-basics.html` 開啟頁面；頁面標題與繁體中文內容正確，外部入口連至 `https://notebooklm.google.com/`，畫面沒有操作截圖或圖片。

- [ ] **步驟 6：以窄螢幕檢查內容可讀性**

在瀏覽器將 viewport 設為約 `390 × 844`，重新載入新頁。

預期：主要文字、步驟卡與練習內容沒有水平溢出，入口連結可見且可操作。

## Task 2: 整合首頁卡片與共用導覽

**檔案：**
- 修改：`index.html`
- 修改：`assets/nav.js`

- [ ] **步驟 1：將新教材加入首頁「工具」分類**

在首頁 `.grid` 新增卡片，設定 `data-c="工具"`、連結 `notebooklm-basics.html`，沿用 `assets/thumb-notebooklm-ai-training.png`。卡片標題使用「NotebookLM 基礎操作」，簡介說明建立筆記本、加入來源、提問與引用查證。

- [ ] **步驟 2：將頁面加入共用導覽**

在 `assets/nav.js` 的 `P` 陣列新增項目：

```js
["notebooklm-basics.html", "NotebookLM 入門"]
```

放在「課程簡報」附近，維持現有導覽資料格式及頁面高亮機制。

- [ ] **步驟 3：執行差異與檔案連結檢查**

執行：

```powershell
git diff --check
Test-Path .\notebooklm-basics.html
Select-String -Path .\index.html -Pattern 'notebooklm-basics.html'
Select-String -Path .\assets\nav.js -Pattern 'notebooklm-basics.html'
```

預期：`git diff --check` 無輸出且成功；檔案存在；首頁卡片與導覽均引用新頁路徑。

- [ ] **步驟 4：在瀏覽器驗證入口與導覽**

保持本機 HTTP 伺服器執行，開啟 `http://localhost:8000/index.html`：

1. 點選「工具」篩選，確認新卡片仍顯示。
2. 開啟新卡片，確認進入新教材頁。
3. 從新頁的共用導覽點選新教材入口，確認路徑可正常載入且導覽項目有高亮。
4. 檢查瀏覽器主控台沒有由本次變更造成的錯誤。

- [ ] **步驟 5：提交實作**

```powershell
git add notebooklm-basics.html index.html assets/nav.js
git commit -m "feat: add NotebookLM basics tutorial"
```

## 計畫自檢

- 規格中的獨立操作頁、入口 URL、虛構練習、安全提醒、錯誤排除、首頁卡片、共用導覽及手機版檢查均有對應任務。
- 本網站沒有既有自動化測試執行器；驗證採用 `git diff --check`、檔案路徑檢查及本機瀏覽器操作，不引入新測試相依套件。
- 頁面與導覽使用同一個 `notebooklm-basics.html` 路徑；首頁分類沿用現有 `工具` 篩選值。
