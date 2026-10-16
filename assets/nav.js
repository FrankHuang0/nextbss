(function(){
const NB=window.NB;if(!NB)return;
const cur=NB.cur(),esc=NB.esc,HOME='index.html',QR='qr.html';
const on=f=>f===cur?' class="on" aria-current="page"':'';
const groups=[1,2,3,4].map(s=>({s,t:NB.stages[s],items:NB.lessons.filter(x=>x.s===s)}));
const tail=NB.lessons.filter(x=>x.s===5).map(x=>({f:x.f,t:NB.stages[5]})).concat(NB.extra);
const item=x=>`<a href="${x.f}"${on(x.f)}>${esc(x.t)}<em>${esc(x.time)}</em></a>`;
const n=document.createElement('nav');n.className='top';n.setAttribute('aria-label','課程導覽');
n.innerHTML='<div class="pill"><b>AI 助理</b>'
+`<a href="${HOME}"${on(HOME)}>首頁</a>`
+groups.map(g=>`<div class="dd"><button type="button" class="dd-b${g.items.some(x=>x.f===cur)?' on':''}" aria-expanded="false" aria-controls="dd-${g.s}">${g.t}</button>`
  +`<div class="dd-m" id="dd-${g.s}" hidden><small>第 ${g.s} 級 · ${g.t}</small>${g.items.map(item).join('')}</div></div>`).join('')
+tail.map(x=>`<a href="${x.f}"${on(x.f)}>${esc(x.t)}</a>`).join('')
+'<button type="button" class="mb" aria-expanded="false" aria-controls="mpanel">☰ 課程</button></div>'
+`<a class="cta" href="${QR}">📱 QR Code</a>`
+'<div class="mpanel" id="mpanel" hidden>'
+`<div class="mg"><small>開始</small><a href="${HOME}"${on(HOME)}>首頁・學習地圖</a></div>`
+groups.map(g=>`<div class="mg"><small>第 ${g.s} 級 · ${g.t}</small>${g.items.map(item).join('')}</div>`).join('')
+`<div class="mg"><small>完成與資源</small>${tail.map(x=>`<a href="${x.f}"${on(x.f)}>${esc(x.t)}</a>`).join('')}<a href="${QR}"${on(QR)}>QR Code</a></div>`
+'</div>';
document.body.prepend(n);
NB.mount(n,{}).after(n.querySelector('.cta'));
const pops=[...n.querySelectorAll('.dd-b,.mb')].map(b=>[b,n.querySelector('#'+b.getAttribute('aria-controls'))]);
const close=(except)=>pops.forEach(([b,m])=>{if(b!==except){m.hidden=true;b.setAttribute('aria-expanded','false')}});
pops.forEach(([b,m])=>b.addEventListener('click',e=>{const v=m.hidden;close(b);m.hidden=!v;b.setAttribute('aria-expanded',v);
  if(v){const a=m.querySelector('a');if(a&&e.detail===0)a.focus()}}));
document.addEventListener('click',e=>{if(!e.target.closest('.dd,.mpanel,.mb'))close()});
n.addEventListener('keydown',e=>{if(e.key!=='Escape')return;const o=pops.find(([b,m])=>!m.hidden);if(o){close();o[0].focus()}});
document.body.insertAdjacentHTML('beforeend','<footer>AI 業務助理課程 · NotebookLM 業務應用</footer>');
})();