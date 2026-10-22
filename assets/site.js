/* AI 助理課程：全站共用（主題配色、課程資料、主題選單、複製按鈕）。請在 <head> 以同步方式載入。 */
(function(){
const de=document.documentElement,K='nextbss-theme';
// [代號, 名稱, 主色, 深主色, 主色上的字, 面板, 文字, 次要字, 分隔線, 淡底, 深底]
const THEMES=[
['coral','珊瑚紅','#fc6a65','#e0534e','#fff','#fff','#2b2f36','#6b6b6b','#e4e5e8','#fff1f0','#2b2f36'],
['ocean','海洋藍','#2563eb','#1d4ed8','#fff','#fff','#1e293b','#64748b','#e2e8f0','#eff6ff','#1e293b'],
['forest','森林綠','#15803d','#166534','#fff','#fff','#1c2a22','#5f6b63','#dfe7e2','#ecfdf3','#1c2a22'],
['grape','葡萄紫','#7c3aed','#6d28d9','#fff','#fff','#2e1f47','#6b6480','#e6e1f0','#f5f3ff','#2e1f47'],
['dark','夜間','#ff8a85','#ff6f69','#1a1a1a','#1f232a','#e8eaed','#a3abb5','#3a414b','#2c2326','#0d0f12']];
const V=['p','p2','on','sf','ink','mut','line','tint','dark'];
const vars=t=>V.map((v,i)=>`--nb-${v}:${t[i+2]}`).join(';');
const LESSONS=[
{f:'notebooklm-basics.html',t:'NotebookLM 入門',s:1,who:'全員',time:'約 15 分',pre:'可登入的 Google 帳號',out:'第一本筆記本，會看來源導覽與引用'},
{f:'card.html',t:'上手步驟卡',s:1,who:'全員',time:'約 5 分',pre:'NotebookLM 入門',out:'一頁式速查卡（可列印）'},
{f:'notebooklm-ai-training.html',t:'NotebookLM 業務助理',s:2,who:'業務同仁',time:'約 30 分',pre:'NotebookLM 入門',out:'5 大業務情境的做法與提示詞'},
{f:'practice.html',t:'實作練習包',s:2,who:'業務同仁',time:'每題 10 分',pre:'NotebookLM 業務助理',out:'待辦表、比較表等練習成果'},
{f:'quiz.html',t:'情境題暖身測驗',s:2,who:'全員',time:'約 10 分',pre:'實作練習包',out:'10 題得分與易錯觀念'},
{f:'ai-presentation-workflow.html',t:'AI 簡報工作流',s:3,who:'需要製作簡報者',time:'約 60 分',pre:'第 2 級：應用',out:'一份可核對來源的簡報大綱'},
{f:'copilot-desktop-basics.html',t:'Copilot 桌面版入門',s:3,who:'需要做規劃與文件者',time:'約 60 分',pre:'NotebookLM 入門（提示詞公式）',out:'一份經角色審查的規劃 HTML'},
{f:'mobile-order-kb.html',t:'知識庫分享',s:4,who:'開發／系統分析人員',time:'約 20 分',pre:'能閱讀基本程式碼',out:'自己專案的知識庫建置藍圖'},
{f:'kb-project-analysis.html',t:'知識庫應用：專案分析',s:4,who:'規劃／分析人員',time:'約 40 分',pre:'知識庫分享',out:'一份人機分工規劃書與報告範本'},
{f:'page-spec-reengineering.html',t:'網頁功能 Reengineering',s:4,who:'開發／系統分析人員',time:'約 60 分',pre:'知識庫分享',out:'一份頁面規格書草稿'},
  {f:'large-refactor.html',t:'大型專案重構',s:4,who:'開發／系統分析人員',time:'約 75 分',pre:'Copilot 桌面版入門',out:'會用 Doxygen 看懂舊程式、用 Superpowers 帶 AI 重構'},
{f:'wrapup.html',t:'課後總結',s:5,who:'全員',time:'約 10 分',pre:'完成任一級',out:'我的第一個情境與 8 週計畫'}];
// 貫穿案例（虛構）：業務小林經營製造業客戶「台鴻精工」的 5 個關卡，對應練習包情境 1–5
const STORY=[
{n:'首次拜訪',d:'會議紀錄＋待辦',a:'practice.html#s1'},
{n:'客戶提到競品',d:'競品比較＋話術',a:'practice.html#s2'},
{n:'配出方案',d:'產品知識庫',a:'practice.html#s3'},
{n:'寫提案',d:'提案簡報大綱',a:'practice.html#s4'},
{n:'高層會談',d:'財報解讀',a:'practice.html#s5'}];

const get=()=>{try{return localStorage.getItem(K)}catch(e){return null}};
const valid=t=>THEMES.some(x=>x[0]===t);
const saved=get();
if(valid(saved))de.dataset.theme=saved;

const css=`:root{${vars(THEMES[0])}}
${THEMES.slice(1).map(t=>`[data-theme="${t[0]}"]{${vars(t)}}`).join('\n')}
.nb-theme{position:relative;flex:none;font-family:inherit;line-height:1.2}
.nb-tbtn{display:inline-flex;align-items:center;gap:4px;margin:0;background:var(--nb-sf);color:var(--nb-ink);border:1px solid var(--nb-line);border-radius:999px;padding:8px 14px;font:inherit;font-size:.9rem;font-weight:700;cursor:pointer;transition:.15s}
.nb-tbtn:hover,.nb-tbtn[aria-expanded="true"]{background:var(--nb-sf);color:var(--nb-p);border-color:var(--nb-p)}
.nb-tmenu{position:absolute;right:0;top:calc(100% + 8px);z-index:1000;background:var(--nb-sf);border:1px solid var(--nb-line);border-radius:10px;box-shadow:0 10px 28px #0003;padding:6px;min-width:150px;display:grid;gap:2px}
.nb-tmenu[hidden]{display:none}
.nb-left .nb-tmenu{left:0;right:auto}
.nb-tmenu button{all:unset;box-sizing:border-box;display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:6px;color:var(--nb-ink);cursor:pointer;font-size:.92rem;white-space:nowrap}
.nb-tmenu button:hover,.nb-tmenu button:focus-visible{background:var(--nb-tint)}
.nb-tmenu button:focus-visible{outline:2px solid var(--nb-p);outline-offset:-2px}
.nb-tmenu button[aria-pressed="true"]{font-weight:700;color:var(--nb-p)}
.nb-tmenu button[aria-pressed="true"]::after{content:"✓";margin-left:auto}
.nb-tmenu i{width:18px;height:18px;border-radius:50%;border:1px solid #0003;flex:none}
.nb-compact .nb-tbtn{border:0;background:none;padding:6px 10px}
.nb-compact .nb-tbtn span{display:none}
@media(max-width:700px){.nb-tbtn span{display:none}}
@media print{.nb-theme{display:none}}`;
const st=document.createElement('style');st.id='nb-css';st.textContent=css;
(document.head||de).appendChild(st);

let seq=0;
const NB=window.NB={
  key:K,themes:THEMES,lessons:LESSONS,story:STORY,
  stages:{1:'入門',2:'應用',3:'進階',4:'專題',5:'結業'},
  extra:[{f:'teacher.html',t:'講師'}],
  cur:()=>location.pathname.split('/').pop()||'index.html',
  esc:s=>String(s).replace(/[&<>"]/g,c=>'&#'+c.charCodeAt(0)+';'),
  theme:()=>de.dataset.theme&&valid(de.dataset.theme)?de.dataset.theme:'coral',
  set(t){if(!valid(t))return;de.dataset.theme=t;try{localStorage.setItem(K,t)}catch(e){}
    document.querySelectorAll('.nb-tmenu button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.t===t));
    document.dispatchEvent(new CustomEvent('nb:theme',{detail:t}))},
  mount(host,o){
    o=o||{};const id='nbt'+(++seq),w=document.createElement('div');
    w.className='nb-theme'+(o.compact?' nb-compact':'')+(o.left?' nb-left':'');
    w.innerHTML=`<button type="button" class="nb-tbtn" aria-haspopup="true" aria-expanded="false" aria-controls="${id}" title="切換主題配色">🎨<span>主題</span></button>`
      +`<div class="nb-tmenu" id="${id}" role="group" aria-label="主題配色" hidden>`
      +THEMES.map(t=>`<button type="button" data-t="${t[0]}" aria-pressed="false"><i style="background:${t[2]}"></i>${t[1]}</button>`).join('')+'</div>';
    host.appendChild(w);
    const b=w.querySelector('.nb-tbtn'),m=w.querySelector('.nb-tmenu');
    const open=v=>{m.hidden=!v;b.setAttribute('aria-expanded',v);
      if(v){const a=NB.theme();m.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.t===a));m.querySelector('[aria-pressed="true"]').focus()}};
    b.addEventListener('click',()=>open(m.hidden));
    m.addEventListener('click',e=>{const x=e.target.closest('button');if(!x)return;NB.set(x.dataset.t);open(false);b.focus()});
    document.addEventListener('click',e=>{if(!m.hidden&&!w.contains(e.target))open(false)});
    w.addEventListener('keydown',e=>{if(e.key==='Escape'&&!m.hidden){open(false);b.focus()}});
    return w;
  },
  copy(text,btn){
    const done=ok=>{if(!btn)return;const o=btn.dataset.label||btn.textContent;btn.dataset.label=o;btn.textContent=ok?'已複製 ✓':'請手動選取';setTimeout(()=>btn.textContent=o,1400)};
    if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(text).then(()=>done(true),()=>done(false));
    else{const a=document.createElement('textarea');a.value=text;a.style.cssText='position:fixed;opacity:0';document.body.appendChild(a);a.select();
      let ok=false;try{ok=document.execCommand('copy')}catch(e){}a.remove();done(ok)}
  }
};

const enhance=()=>{
  document.querySelectorAll('.nb-slot').forEach(s=>{if(!s.querySelector('.nb-theme'))NB.mount(s,{compact:s.dataset.compact!=null})});
  // <div class="case" data-step="0~5" data-note="…">：0＝全覽，1–5＝標示目前關卡
  document.querySelectorAll('.case').forEach(c=>{
    if(c.dataset.done)return;c.dataset.done=1;const k=+c.dataset.step||0,here=NB.cur();
    c.setAttribute('role','note');
    c.innerHTML=`<div class="case-h"><b>📍 案例主線</b><span>台鴻精工（虛構）：業務小林從首次拜訪到高層會談</span></div>`
      +`<ol class="case-s">${STORY.map((s,i)=>{const n=i+1,href=s.a.startsWith(here+'#')?s.a.slice(here.length):s.a;
        return `<li${n===k?' class="cur" aria-current="step"':n<k?' class="past"':''}><a href="${href}"><i>${n}</i><b>${s.n}</b><small>${s.d}</small></a></li>`}).join('')}</ol>`
      +(c.dataset.note?`<p class="case-n">${NB.esc(c.dataset.note)}</p>`:'');
  });
  document.querySelectorAll('.prompt').forEach(p=>{
    if(p.querySelector('button'))return;
    const body=p.querySelector('pre,.sample');if(!body)return;
    let h=p.querySelector('.prompt-h');
    if(!h){h=document.createElement('div');h.className='prompt-h';h.innerHTML='<b>提示詞</b>';p.prepend(h)}
    const b=document.createElement('button');b.type='button';b.className='alt';b.textContent='複製';
    b.addEventListener('click',()=>NB.copy(body.textContent.trim(),b));h.appendChild(b);
  });
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhance);else enhance();
})();
