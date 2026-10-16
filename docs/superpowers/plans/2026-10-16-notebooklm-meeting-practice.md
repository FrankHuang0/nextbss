# NotebookLM 會議案例練習實作計畫

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推薦）或 superpowers:executing-plans 逐任務實作此計畫。步驟使用復選框（`- [ ]`）語法來追蹤進度。

**目標：** 將新手教材中的獨立虛構範例替換為課程簡報情境 1 的去識別化會議紀錄練習。

**架構：** 只更新 `notebooklm-basics.html` 的練習區塊，其他入門流程、首頁、導覽與安全內容維持不變。使用繁體中文重新整理案例，並連結原課程簡報作為參考。

**技術棧：** 靜態 HTML；以 Python 標準函式庫驗證內容，使用本機 HTTP 伺服器及瀏覽器確認實際呈現。

---

## 檔案與責任

- 修改 `notebooklm-basics.html`：替換練習標題、來源內容、題目與完成標準；加入來源簡報連結。
- 建立 `docs/superpowers/specs/2026-10-16-notebooklm-meeting-practice-design.md`：保存已核准的內容設計。

## Task 1: 更新會議紀錄練習案例

**檔案：**
- 修改：`notebooklm-basics.html` 的練習 `<section class="card sample">`

- [ ] **步驟 1：確認原練習內容可被精確辨識**

使用 Python 標準函式庫讀取 HTML，確認目前唯一包含「貼上虛構服務資料作為來源」的練習區塊存在。

```python
from pathlib import Path

html = Path("notebooklm-basics.html").read_text(encoding="utf-8")
assert html.count("練習：貼上虛構服務資料作為來源") == 1
assert "雲杉備份試行方案" in html
```

- [ ] **步驟 2：執行預期失敗的案例內容檢查**

在修改前執行目標檢查：

```python
assert "練習：整理客戶會議紀錄" in html
```

預期：`AssertionError`，確認新案例需求目前尚未實作。

- [ ] **步驟 3：替換練習區塊**

把練習標題改為「練習：整理客戶會議紀錄」。來源用泛稱角色改寫課程情境 1，保留跨廠網路影響作業、競業替代方案、備援與資安關注、海外據點連線及我方評估事項；刪除原案例中的公司與人名、電信商與產品名稱、地點、日期、門號數、頻寬與價格等資訊。

提供來源簡報連結：

```html
<a href="https://frankhuang0.github.io/nextbss/notebooklm-ai-training.html">
  課程簡報：情境 1 客戶會議紀錄
</a>
```

練習要求學員產出會議摘要、客戶關注點及待辦表；來源未提及的負責人或期限須填「來源未提供」，不得推測。完成標準要求重要事實都能以引用回查。

- [ ] **步驟 4：執行案例與去識別化檢查**

使用 Python 驗證新內容及保留項目：

```python
from pathlib import Path

html = Path("notebooklm-basics.html").read_text(encoding="utf-8")
assert "練習：整理客戶會議紀錄" in html
assert "雲杉備份試行方案" not in html
assert "課程簡報：情境 1 客戶會議紀錄" in html
assert "跨廠" in html and "資安" in html and "海外據點" in html
assert "來源未提供" in html and "引用" in html
assert "宏達精密" not in html and "李昆霖" not in html
assert "王小明" not in html and "遠傳" not in html and "越南平陽" not in html
assert "快速入門步驟" in html and "資料安全與基本排除方式" in html
```

預期：所有 assertion 通過；`git diff --check` 無錯誤。

- [ ] **步驟 5：在桌機與窄螢幕檢查教材**

啟動 `python -m http.server 8765 --bind 127.0.0.1`，用瀏覽器開啟 `http://127.0.0.1:8765/notebooklm-basics.html`，檢查會議案例、來源連結與題目可閱讀；將 viewport 調為 `390 × 844`，確認文件寬度不超過 viewport。

- [ ] **步驟 6：提交變更**

```powershell
git add notebooklm-basics.html
git commit -m "content: use de-identified meeting practice"
```

## 計畫自檢

- 規格中的情境 1 案例主題、去識別化、來源簡報連結、摘要／關注點／待辦練習、未知期限不可臆測、引用查核，以及既有入門流程保留皆有明確步驟。
- 不增加依賴、圖片、截圖、測試框架或其他網站檔案。
- 本機驗證使用 UTF-8、`notebooklm-basics.html` 單一頁面路徑及已核准的繁體中文標籤。
