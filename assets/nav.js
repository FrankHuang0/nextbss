(function(){
const P=[["index.html","首頁"],["notebooklm-ai-training.html","課程簡報"],["mobile-order-kb.html","知識庫分享"],["practice.html","實作練習"],["quiz.html","小測驗"],["card.html","步驟卡"],["teacher.html","講師流程"],["wrapup.html","課後總結"]];
const cur=location.pathname.split('/').pop()||"index.html";
const n=document.createElement('nav');n.className='top';
n.innerHTML='<div class="pill"><b>AI 助理</b>'+P.map(([h,t])=>`<a href="${h}"${h===cur?' class="on"':''}>${t}</a>`).join('')+'</div><a class="cta" href="qr.html">📱 QR Code</a>';
document.body.prepend(n);
document.querySelectorAll('header a').forEach(a=>a.remove());
document.body.insertAdjacentHTML('beforeend','<footer>新竹營運處 AI 分享 · NotebookLM 業務應用</footer>');
})();

