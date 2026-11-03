(function(){
const NB=window.NB;if(!NB)return;
const S=NB.stages,L=NB.lessons,me=document.currentScript;
const run=()=>{
const cur=NB.cur();
const i=L.findIndex(x=>x.f===cur);if(i<0)return;
const x=L[i],pv=L[i-1],nx=L[i+1],ds=me.dataset,esc=NB.esc;
const lv=s=>s<5?`第 ${s} 級 · ${S[s]}`:S[s];
const st=document.createElement('style');
st.textContent=`.lx-meta{max-width:1120px;margin:24px auto 0;padding:0 16px;font-family:inherit}
.lx-meta dl{display:grid;grid-template-columns:auto repeat(4,minmax(0,1fr));gap:0;margin:0;background:var(--nb-sf);border:1px solid var(--nb-line);border-radius:10px;overflow:hidden}
.lx-meta .lx-lv{display:flex;flex-direction:column;justify-content:center;gap:2px;background:var(--nb-pt);color:var(--nb-on);padding:12px 20px;font-weight:700;white-space:nowrap}
.lx-meta .lx-lv small{font-weight:400}
.lx-meta div.lx-i{padding:10px 16px;border-left:1px solid var(--nb-line);min-width:0}
.lx-meta dt{font-size:.78rem;color:var(--nb-mut);letter-spacing:.08em}
.lx-meta dd{margin:2px 0 0;color:var(--nb-ink);font-weight:600;font-size:.95rem;line-height:1.5}
.lx-pager{max-width:1120px;margin:8px auto 40px;padding:0 16px;display:grid;grid-template-columns:1fr auto 1fr;gap:14px;align-items:stretch;font-family:inherit}
.lx-pager a{display:flex;flex-direction:column;gap:2px;padding:14px 18px;border:1px solid var(--nb-line);border-radius:10px;background:var(--nb-sf);color:var(--nb-ink);text-decoration:none;transition:.15s}
.lx-pager a:hover{border-color:var(--nb-p);box-shadow:0 6px 18px #0001}
.lx-pager a small{color:var(--nb-mut);font-size:.8rem}
.lx-pager a b{color:var(--nb-pt);font-weight:600}
.lx-pager .lx-next{text-align:right}.lx-pager .lx-home{justify-content:center;text-align:center}
.lx-float{position:fixed;left:12px;top:12px;z-index:99999;display:flex;align-items:center;gap:2px;max-width:calc(100vw - 24px);box-sizing:border-box;background:color-mix(in srgb,var(--nb-sf) 95%,transparent);border:1px solid var(--nb-line);border-radius:999px;box-shadow:0 4px 14px #0002;padding:3px;font:13px/1.2 "Noto Sans TC","Microsoft JhengHei",system-ui,sans-serif}
.lx-float a,.lx-float summary{display:inline-block;line-height:20px;min-height:32px;box-sizing:border-box;color:var(--nb-ink);text-decoration:none;padding:6px 10px;border-radius:999px;cursor:pointer;white-space:nowrap}
.lx-float a:hover,.lx-float summary:hover{background:var(--nb-tint);color:var(--nb-pt)}
.lx-float .lx-home{background:var(--nb-pt);color:var(--nb-on)}.lx-float .lx-home:hover{background:var(--nb-pt2);color:var(--nb-on)}
.lx-float .lx-n{display:none}
.lx-float dl a{display:inline;min-height:0;padding:0;border-radius:0;white-space:normal;color:var(--nb-pt);text-decoration:underline;text-underline-offset:3px}
.lx-float dl a:hover{background:none;color:var(--nb-pt2)}
.lx-float details{position:relative}.lx-float summary{list-style:none}.lx-float summary::-webkit-details-marker{display:none}
.lx-float dl{position:absolute;left:0;top:calc(100% + 8px);margin:0;background:var(--nb-sf);border:1px solid var(--nb-line);border-radius:10px;box-shadow:0 10px 28px #0003;padding:10px 14px;width:260px;display:grid;grid-template-columns:auto 1fr;gap:6px 12px}
.lx-float dt{color:var(--nb-mut)}.lx-float dd{margin:0;color:var(--nb-ink);font-weight:600;white-space:normal}
.lx-float .nb-tbtn{font-size:13px;color:var(--nb-ink);min-height:32px}
.presenting .lx-meta,.presenting .lx-pager{display:none}
@media(max-width:800px){.lx-meta dl{grid-template-columns:1fr 1fr}.lx-meta .lx-lv{grid-column:1/-1;flex-direction:row;justify-content:space-between}.lx-meta div.lx-i{border-left:0;border-top:1px solid var(--nb-line)}.lx-meta div.lx-i:nth-child(odd){border-left:1px solid var(--nb-line)}.lx-pager{grid-template-columns:1fr 1fr}.lx-pager .lx-home{grid-column:1/-1;grid-row:2}.lx-float .lx-w,.lx-float .lx-hm{display:none}.lx-float .lx-n{display:inline}}
@media(max-width:480px){.lx-float{left:8px;top:8px;max-width:calc(100vw - 16px);flex-wrap:wrap;border-radius:18px}.lx-float a,.lx-float summary{padding:6px 8px}.lx-float details,.lx-float .nb-theme{position:static}.lx-float dl{left:0;right:0;width:auto}.lx-float .nb-tmenu{left:auto;right:0}}
@media print{.lx-pager,.lx-float{display:none}}`;
document.head.appendChild(st);
const info=[['對象',x.who],['建議時間',x.time],['先備',x.pre],['產出',x.out]];
const pos=`第 ${i+1} / ${L.length} 課`;
if(ds.mode==='float'){
  const f=document.createElement('nav');f.className='lx-float';f.setAttribute('aria-label','課程導覽');
  f.innerHTML=`<a class="lx-home" href="index.html#map" title="回學習地圖">← <span class="lx-hm">學習</span>地圖</a>`
  +(pv?`<a class="lx-pv" href="${pv.f}" aria-label="上一課：${esc(pv.t)}" title="上一課：${esc(pv.t)}">‹ 上一課</a>`:'')
  +`<details><summary title="課程資訊"><span class="lx-w">${lv(x.s)} · ${pos}</span><span class="lx-n">${i+1}/${L.length} 課</span>&nbsp;ⓘ</summary><dl>${info.map(([k,v])=>`<dt>${k}</dt><dd>${esc(v)}</dd>`).join('')}<dt>歷程</dt><dd><a href="changelog.html#${encodeURIComponent(cur)}">📝 本課修改歷程</a></dd></dl></details>`
  +(nx?`<a class="lx-nx" href="${nx.f}" aria-label="下一課：${esc(nx.t)}" title="下一課：${esc(nx.t)}">下一課 ›</a>`:'');
  document.body.appendChild(f);
  NB.mount(f,{compact:true,left:true});
  document.addEventListener('click',e=>{const d=f.querySelector('details');if(d.open&&!d.contains(e.target))d.open=false});
  return;
}
const m=document.createElement('section');m.className='lx-meta';m.setAttribute('aria-label','課程資訊');
m.innerHTML=`<dl><div class="lx-lv">${lv(x.s)}<small>${pos}</small></div>${info.map(([k,v])=>`<div class="lx-i"><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`;
const after=document.querySelector(ds.after||'body>header');
if(after)after.after(m);else document.body.prepend(m);
const p=document.createElement('nav');p.className='lx-pager';p.setAttribute('aria-label','上一課／下一課');
p.innerHTML=(pv?`<a class="lx-prev" href="${pv.f}"><small>← 上一課</small><b>${esc(pv.t)}</b></a>`:`<a class="lx-prev" href="index.html"><small>← 回到</small><b>課程首頁</b></a>`)
+`<a class="lx-home" href="index.html#map"><small>總覽</small><b>學習地圖</b></a>`
+(nx?`<a class="lx-next" href="${nx.f}"><small>下一課 →</small><b>${esc(nx.t)}</b></a>`:`<a class="lx-next" href="index.html"><small>完成 →</small><b>回課程首頁</b></a>`);
const before=ds.pagerBefore&&document.querySelector(ds.pagerBefore);
if(before)before.before(p);else{const mn=document.querySelector('main');if(mn)mn.after(p);else document.body.appendChild(p)}
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();