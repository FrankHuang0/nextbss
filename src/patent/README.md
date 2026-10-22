# 專利分析頁面原始碼

這裡放的是〈規劃書〉和〈示範報告〉兩頁的 Vue 原始碼，網站上的頁面由它們產生。

| 原始碼 | 產生的頁面 |
|---|---|
| `PatentPlan.vue` | `patent-plan.html` |
| `PatentReport.vue` | `patent-report.html` |
| `kb-base.css` | 原站全域樣式，只套用在頁面的 `.kbv` 區塊內 |

## 修改步驟

1. 修改 `.vue` 檔。
2. 在本資料夾執行：

   ```bash
   npm install
   npm run build
   ```

3. 提交 `.vue` 和重新產生的兩個 `.html`。

不要直接修改產生出來的 `.html`，下次建置時會被覆蓋。

和教學網站 `assets/style.css` 同名的 class（例如 `timeline`），建置時會自動改名為 `kbv-timeline`，避免兩邊樣式互相干擾。
