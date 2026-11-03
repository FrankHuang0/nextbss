# 教學網站規範（主 AI 管控）

本 repo 是「AI 業務助理課程」教學網站（GitHub Pages：https://frankhuang0.github.io/nextbss/）。
所有修改這個網站的 AI（主 AI 與各課程的子 AI）都必須遵守本規範。規範有疑問或需要例外時，先問主 AI，不要自行決定。

## 1. 角色與流程

| 角色 | 名稱 | 職責 |
|---|---|---|
| 使用者 | 教學組長 | 提需求、最終審核、決定能不能上版 |
| 主 AI | 教學組長助理 | 指派子 AI、review、管控本規範、通知使用者審核、合併上版 |
| 課程子 AI | 名稱＝課程名稱（`assets/site.js` LESSONS 的 `t`） | 規劃與修改**自己那一門課** |
| 歷程子 AI | 教材修改歷程 | 只管 `changelog.html` 與 `assets/changelog.js` |

標準流程：

1. 子 AI 收到任務後，**先提出修改規劃**（改哪些段落、為什麼、會不會動到共用檔），交給主 AI 審。
2. 主 AI 同意後才動手。一門課一個分支、一個 PR，PR 標題用中文寫「課程名稱：做了什麼」。
3. 完成後，子 AI 依 `docs/review-checklist.md` 自我檢查，並把檢查結果寫在 PR 說明裡。
4. 主 AI review。有建議就退回給子 AI 修改，直到通過。
5. 主 AI 通知使用者審核。**使用者說「通過」或「合併」之前，任何人都不可以 merge。**
6. 上版後，主 AI 通知「教材修改歷程」子 AI 新增一筆紀錄。

## 2. 修改範圍

- 課程子 AI 只改自己那一門課的 HTML，以及它專用的 `downloads/`、`assets/img/` 檔案。
- 以下**共用檔**要動時，要先在規劃裡說明，由主 AI 同意：
  - `index.html`
  - `assets/site.js`、`assets/nav.js`、`assets/lesson.js`
  - `assets/style.css`、`assets/workflow.css`、`assets/workflow.js`
- 共用檔只能「加」，不能改掉別門課在用的東西。新增的 CSS class 要用課程專屬或通用、不會撞名的名稱。

## 3. 新課程要登記的地方

1. `assets/site.js` 的 `LESSONS`，依級別放在正確位置。欄位如下：
   - `f`：檔名
   - `t`：課程名稱，也是子 AI 名稱
   - `s`：級別（1 入門、2 應用、3 進階、4 專題、5 結業）
   - `who`：對象
   - `time`：時間，寫成「約 N 分」
   - `pre`：先修
   - `out`：學完的產出

   上方選單、上一課／下一課、課程資訊列都由這份清單自動產生。
2. `index.html` 在對應級別加一張 `a.card` 卡片：
   - 寫法：`.th.cv.l{級別}` 加 `em`（第 N 級 · 名稱）和 `i`（一個 emoji），`.bd` 放 `h3`（標題 | 副標）和 `p`。
   - 有人偶導讀的課程，`.th` 內要加 `<span class="play">人偶導讀</span>`。
3. 更新 `index.html` 該級別 `stage-h` 的總時間，必要時也更新學習地圖的說明文字。
4. 講師用、非學員課程的頁面放在 `NB.extra`，不放進 `LESSONS`。

## 4. 頁面骨架（新課程照這個做）

```html
<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>課程名稱</title>
  <script src="assets/site.js"></script><link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <header><h1>課程名稱</h1><p>一兩句話：這門課解決什麼問題。</p>
    <div class="stats"><span>…</span></div></header>
  <main>
    <nav class="card"><ul class="toc"><li><a href="#goal">學完你會</a></li>…</ul></nav>
    <section class="card" id="goal">…</section>
    …
  </main>
  <script src="assets/nav.js"></script><script src="assets/lesson.js"></script>
</body>
</html>
```

- 每個 `section.card` 都要有英文小寫 `id`，目錄 `.toc` 的錨點必須全部有效。
- 建議段落順序：
  1. 學完你會
  2. 為什麼／概念
  3. 跟著做（一步一步）
  4. 提示詞總表
  5. 換成你的工作
  6. 常見問題（`#faq`）
  7. 自我檢核（`#check`）
  8. 重點回顧
- 簡報型、投影型課程（使用 `workflow.css`）或互動頁（測驗、練習包）可以例外，但仍要有 `nav.js` 與 `lesson.js`。

## 5. 共用元件（先用現成的，不要自創）

| 用途 | 寫法 |
|---|---|
| 畫面示意圖 | `figure.mock` > `.mock-bar`（3 個 `span` 加 `b` 標題）+ `.mock-body`（`.c1`／`.c2`）> `.mp`（`h4` 內放 `em` 編號）；`figcaption` 開頭寫「示意圖」，並說明不是實際畫面 |
| 可複製的提示詞 | `.prompt` > `.prompt-h`（`b` 標題 + `small` 說明）+ `pre`。`lesson.js` 會自動加複製鈕。提示詞要**完整、可以直接貼上使用**，要使用者自己填的部分用【】標示 |
| 表格 | `.x` 包住 `table.tbl`，手機上才可以橫向捲動 |
| 提醒、警告 | `.callout`（提醒）、`.callout.warn`（警告）、`.callout.ok`（成功、建議）；補充說明用 `.note` |
| 對與錯對照 | `.vs` 內放 `.bad`／`.good` |
| 步驟、時間軸 | `.timeline`、`.flow` |
| 練習檔 | 放在 `downloads/`，用 zip 包好，檔名用英文小寫加連字號 |

## 6. 視覺

- 顏色一律用主題變數（`var(--p)`、`var(--line)`、`var(--mut)`、`var(--surface)` 等），不要寫死品牌色。
- 網站有 5 種主題（珊瑚紅、海洋藍、森林綠、葡萄紫、夜間）。新增有顏色的樣式時，**一定要補 `[data-theme="dark"]` 版本**。
- 版面寬度要在手機 390px 以下不出現水平捲動。
- 每門課在首頁有一個代表 emoji，頁內不要大量使用 emoji 裝飾。

## 7. 文字

- 使用繁體中文、台灣用語。
- 中英文、中文與數字之間加半形空格，例如「用 Copilot 做 3 件事」。
- 全形標點，專有名詞保留原文（Copilot、NotebookLM、Skill）。
- 讀者大多不是 IT 人員：
  - 句子要短，先講結論。
  - 專有名詞第一次出現時要白話解釋。
  - 一段只講一件事。
- 不要誇大效果。引用真實案例的數字時，要註明「個人經驗，不保證」。

## 8. 人偶導讀（小貓問、機器人答）

- 依 `duo-narrated-deck` Skill 製作。
- 講解順序：
  1. 先講該頁的 LEVEL1 重點（標題）。
  2. 再依序講 3～4 個 LEVEL2 重點，每個都要和 LEVEL1 連起來。
  3. LEVEL3 只挑最關鍵的，用例子帶過，不要逐條唸。
- 寫稿前先擬教案；教案要給主 AI 審，必要時給使用者審。

## 9. 安全與隱私

- 只用**虛構資料**（公司、客戶、人名、單號都要虛構）。
- 不可以出現內網 IP、主機名稱、帳號密碼、Token、真實客戶資料、內部組織名稱。
- 截圖要先去識別化，或改成用 HTML 畫的示意圖。

## 10. 驗收標準（每次 PR 都要做到）

- 用本機伺服器預覽（例如 `python -m http.server --bind 127.0.0.1`），並用 Playwright 實際檢查：
  - 電腦 1280px、手機 390px：沒有水平捲動，文字沒有被切掉。
  - 夜間主題：文字看得清楚，沒有白底白字。
  - Console：除了 favicon 以外沒有錯誤。
  - 目錄錨點都有效；上一課、下一課正確；提示詞的複製鈕可以用。
- 截圖等暫存檔用完要刪除，不要 commit。
- commit 訊息用中文，結尾加 `Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>`。
