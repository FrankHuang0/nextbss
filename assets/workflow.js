(() => {
  "use strict";
  const lessons = [...document.querySelectorAll(".lesson")];
  const links = [...document.querySelectorAll(".contents > a")];
  const mode = document.getElementById("mode");
  const jump = document.getElementById("jump");
  const count = document.getElementById("count");
  const previous = document.getElementById("prev");
  const next = document.getElementById("next");
  let current = 0;
  let presenting = false;
  let statusTimer;
  const indexFromHash = () => lessons.findIndex(section => `#${section.id}` === location.hash);
  lessons.forEach(section => { section.tabIndex = -1; });

  jump.replaceChildren(...lessons.map((section, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `${String(index + 1).padStart(2, "0")} · ${section.dataset.title}`;
    return option;
  }));

  function update() {
    lessons.forEach((section, index) => { section.hidden = presenting && index !== current; });
    links.forEach((link, index) => {
      if (index === current) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
    jump.value = String(current);
    count.textContent = `${current + 1} / ${lessons.length}`;
    previous.disabled = current === 0;
    next.disabled = current === lessons.length - 1;
    mode.textContent = presenting ? "返回閱讀" : "開始投影";
    mode.setAttribute("aria-pressed", String(presenting));
  }

  function navigate(index, record = true) {
    current = Math.max(0, Math.min(lessons.length - 1, index));
    update();
    if (record) history.replaceState(null, "", `#${lessons[current].id}`);
    if (presenting) {
      window.scrollTo({ top: 0, behavior: "instant" });
      lessons[current].focus({ preventScroll: true });
    }
    else lessons[current].scrollIntoView({ block: "start", behavior: "instant" });
  }

  function setMode(value) {
    presenting = value;
    document.body.classList.toggle("presenting", presenting);
    update();
    if (presenting) {
      window.scrollTo({ top: 0, behavior: "instant" });
      lessons[current].focus({ preventScroll: true });
    }
    else lessons[current].scrollIntoView({ block: "start", behavior: "instant" });
  }

  mode.disabled = false;
  jump.disabled = false;
  document.getElementById("print").disabled = false;
  mode.addEventListener("click", () => setMode(!presenting));
  previous.addEventListener("click", () => navigate(current - 1));
  next.addEventListener("click", () => navigate(current + 1));
  jump.addEventListener("change", () => navigate(Number(jump.value)));
  document.getElementById("print").addEventListener("click", () => window.print());

  links.forEach((link, index) => link.addEventListener("click", event => {
    event.preventDefault();
    navigate(index);
  }));

  window.addEventListener("hashchange", () => {
    const index = indexFromHash();
    if (index >= 0) navigate(index, false);
  });

  document.addEventListener("keydown", event => {
    if (!presenting || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target.closest("input,select,textarea,button,a,summary,[contenteditable]")) return;
    if (event.key === "ArrowRight" || event.key === "PageDown") {
      event.preventDefault();
      navigate(current + 1);
    } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      navigate(current - 1);
    }
  });
  document.addEventListener("keydown", event => {
    if (presenting && event.key === "Escape") {
      setMode(false);
      mode.focus({ preventScroll: true });
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      if (presenting) return;
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length) {
        current = lessons.indexOf(visible[0].target);
        update();
      }
    }, { rootMargin: "-15% 0px -65% 0px" });
    lessons.forEach(section => observer.observe(section));
  }

  function announce(message) {
    clearTimeout(statusTimer);
    document.getElementById("copy-status").textContent = message;
    statusTimer = setTimeout(() => { document.getElementById("copy-status").textContent = ""; }, 5000);
  }

  document.querySelectorAll("[data-copy]").forEach(button => {
    button.addEventListener("click", async () => {
      const text = document.getElementById(button.dataset.copy).textContent;
      if (!navigator.clipboard || !window.isSecureContext) {
        announce("此環境不支援自動複製，請選取提示詞文字後手動複製。");
        return;
      }
      try {
        await navigator.clipboard.writeText(text);
        announce("已複製。請先替換專案代號，勿填入真實機敏資料。");
      } catch (error) {
        console.error("Workflow clipboard copy failed:", error);
        announce("複製失敗，請檢查瀏覽器權限或選取文字後手動複製。");
      }
    });
  });

  const initial = indexFromHash();
  if (initial >= 0) current = initial;
  update();
  if (initial >= 0) {
    const target = lessons[initial];
    requestAnimationFrame(() => target.scrollIntoView({ block: "start", behavior: "instant" }));
  }
  let printDetails = [];
  window.addEventListener("beforeprint", () => {
    printDetails = [...document.querySelectorAll("details:not([open])")];
    printDetails.forEach(detail => { detail.open = true; });
  });
  window.addEventListener("afterprint", () => {
    printDetails.forEach(detail => { detail.open = false; });
    printDetails = [];
  });
})();
