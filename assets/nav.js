(function(){
const P=[["index.html","首頁"],["notebooklm-basics.html","NotebookLM 入門"],["card.html","步驟卡"],["notebooklm-ai-training.html","NotebookLM 業務助理"],["practice.html","實作練習"],["quiz.html","小測驗"],["ai-presentation-workflow.html","簡報工作流"],["mobile-order-kb.html","知識庫分享"],["page-spec-reengineering.html","功能逆向"],["wrapup.html","課後總結"],["teacher.html","講師流程"]];
const T=[["coral","珊瑚紅","#fc6a65"],["ocean","海洋藍","#2563eb"],["forest","森林綠","#15803d"],["grape","葡萄紫","#7c3aed"],["dark","夜間","#1f232a"]];
const K='nextbss-theme',de=document.documentElement;
const get=()=>{try{return localStorage.getItem(K)}catch(e){return null}};
const set=t=>{de.dataset.theme=t;try{localStorage.setItem(K,t)}catch(e){}};
const saved=get();if(T.some(x=>x[0]===saved))de.dataset.theme=saved;
const cur=location.pathname.split('/').pop()||"index.html";
const n=document.createElement('nav');n.className='top';
n.innerHTML='<div class="pill"><b>AI 助理</b>'+P.map(([h,t])=>`<a href="${h}"${h===cur?' class="on"':''}>${t}</a>`).join('')+'</div>'
+'<div class="theme"><button type="button" class="tbtn" aria-haspopup="true" aria-expanded="false" aria-controls="tmenu" title="切換主題配色">🎨<span> 主題</span></button>'
+'<div class="tmenu" id="tmenu" hidden>'+T.map(([k,t,c])=>`<button type="button" data-t="${k}"><i style="background:${c}"></i>${t}</button>`).join('')+'</div></div>'
+'<a class="cta" href="qr.html">📱 QR Code</a>';
document.body.prepend(n);
const b=n.querySelector('.tbtn'),m=n.querySelector('.tmenu');
const mark=()=>{const a=de.dataset.theme||'coral';m.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.t===a))};
const open=v=>{m.hidden=!v;b.setAttribute('aria-expanded',v);if(v){mark();m.querySelector('[aria-pressed="true"]').focus()}};
b.onclick=e=>{e.stopPropagation();open(m.hidden)};
m.onclick=e=>{const x=e.target.closest('button');if(!x)return;set(x.dataset.t);mark();open(false);b.focus()};
document.addEventListener('click',e=>{if(!m.hidden&&!n.querySelector('.theme').contains(e.target))open(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!m.hidden){open(false);b.focus()}});
document.querySelectorAll('header a').forEach(a=>a.remove());
document.body.insertAdjacentHTML('beforeend','<footer>新竹／台北營運處 AI 分享 · NotebookLM 業務應用</footer>');
})();
