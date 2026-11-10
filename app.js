/* app.js — 走走 · 交互逻辑（纯前端 mock，状态存 localStorage） */
"use strict";

/* ---------- 内联图标（Lucide 风格） ---------- */
const I = {
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
  chevL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
  chevR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>',
  mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>',
  pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4"/><path d="m15.4 6.5-6.8 4"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>',
  pack: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="7 4 20 12 7 20 7 4"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>',
};
const ic = (n, size = 0) => {
  let s = I[n].replace("<svg", '<svg class="icon"');
  if (size) s = s.replace('class="icon"', `class="icon" style="width:${size}px;height:${size}px"`);
  return s;
};

/* ---------- 状态 ---------- */
const LS_KEY = "zouzou_v2";
const defaultState = () => ({ owned: false, introSeen: false, finished: false, pages: {}, gear: {}, orders: [] });
let S = load();
function load() {
  try { return Object.assign(defaultState(), JSON.parse(localStorage.getItem(LS_KEY) || "{}")); }
  catch (e) { return defaultState(); }
}
function save() { localStorage.setItem(LS_KEY, JSON.stringify(S)); }

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const TASK_IDS = Object.keys(DB.zineReveal); // 20 个可采集页（19 张 a 页 + 4c）
const totalTasks = TASK_IDS.length;
const pageDone = id => !!S.pages[id];
const collectedCount = () => TASK_IDS.filter(id => S.pages[id]).length;
const allDone = () => collectedCount() === totalTasks;
/* 可见页 = 未采集的 a 页；采集后原页被其显现页原位替换（4c 再采集则被 4d 替换；zineKeepAfter 中的页保留） */
const visiblePages = () => {
  const vis = new Set();
  const keep = DB.zineKeepAfter || [];
  DB.zineChains.forEach(ch => {
    const a = ch[0];
    if (!pageDone(a) || keep.includes(a)) vis.add(a);
    if (!pageDone(a)) return;
    (DB.zineReveal[a] || []).forEach(id => {
      if (DB.zineReveal[id] && pageDone(id)) DB.zineReveal[id].forEach(x => vis.add(x));
      else vis.add(id);
    });
  });
  return DB.zinePages.filter(p => vis.has(p.id));
};

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("on"), 2200);
}

/* ---------- 路由 ---------- */
let currentTab = "shop";
function showScreen(name) {
  $$(".screen").forEach(s => s.classList.remove("on"));
  $("#screen-" + name).classList.add("on");
}
function switchTab(tab) {
  currentTab = tab;
  $$("#tabbar .tab").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
  if (tab === "shop") renderShop();
  if (tab === "zine") renderShelf();
  if (tab === "me") renderMe();
  showScreen(tab);
  $("#tabbar").classList.remove("hidden");
}
function openOverlay(id) {
  $("#" + id).classList.add("on");
  $("#tabbar").classList.add("hidden");
}
function closeOverlay(id) {
  $("#" + id).classList.remove("on");
  if ($$(".overlay-screen.on").length === 0) $("#tabbar").classList.remove("hidden");
}

/* ---------- 商店 ---------- */
let shopFilter = "全部";
function renderShop() {
  const cats = ["全部", "人文地理", "自然地理", "艺术疗愈"];
  const hero = DB.products[0];
  const list = DB.products.filter(p => (shopFilter === "全部" ? p.id !== hero.id : p.cat === shopFilter));
  $("#screen-shop").innerHTML = `
    <div class="shop-head rise">
      <h1>走走商店</h1>
      <p>FIELDWALK STORE · 把走路变成阅读</p>
    </div>
    <div class="chips rise" style="animation-delay:.05s">
      ${cats.map(c => `<button class="chip ${c === shopFilter ? "active" : ""}" data-cat="${c}">${c}</button>`).join("")}
    </div>
    ${shopFilter === "全部" ? `
    <div class="hero-card rise" style="animation-delay:.1s" onclick="goProduct('${hero.id}')">
      <div class="cover">
        <img src="${hero.cover}" alt="${hero.title}">
        <span class="stamp">店长推荐</span>
      </div>
      <div class="body">
        <h3>${hero.title}</h3>
        <p class="tl">${hero.tagline}</p>
        <div class="row">
          <span class="tag">${hero.cat}</span>
          <span class="price"><small>¥</small>${hero.price}</span>
        </div>
      </div>
    </div>` : ""}
    <div class="plist">
      ${list.map((p, i) => `
        <div class="pcard rise ${p.status === "soon" ? "soon" : ""}" style="animation-delay:${.12 + i * .05}s" onclick="goProduct('${p.id}')">
          <img src="${p.cover}" alt="${p.title}">
          <div class="pi">
            <h4>${p.title}</h4>
            <p class="pt">${p.tagline}</p>
            <div class="prow">
              <span class="tag ${p.status === "soon" ? "" : "green"}">${p.status === "soon" ? "筹备中" : p.cat}</span>
              <span class="price" style="font-size:15px"><small>¥</small>${p.price}</span>
            </div>
          </div>
        </div>`).join("")}
      ${list.length === 0 && shopFilter !== "全部" ? "" : ""}
    </div>`;
  $$("#screen-shop .chip").forEach(ch => ch.onclick = e => {
    e.stopPropagation();
    shopFilter = ch.dataset.cat;
    renderShop();
  });
}

/* ---------- 产品详情 ---------- */
let curProduct = null;
function goProduct(id) {
  curProduct = DB.products.find(p => p.id === id);
  renderProduct();
  showScreen("product");
  $("#tabbar").classList.add("hidden");
}
function backFromProduct() {
  showScreen(currentTab);
  $("#tabbar").classList.remove("hidden");
}
function renderProduct() {
  const p = curProduct;
  const owned = S.owned && p.id === "tangjia";
  $("#screen-product").innerHTML = `
    <div class="pd-cover">
      <img src="${p.cover}" alt="${p.title}">
      <div class="fade"></div>
      <div class="topbar" style="position:absolute;top:0;left:0;right:0;background:none">
        <button class="back" onclick="backFromProduct()">${ic("back")}</button>
      </div>
    </div>
    <div class="pd-body">
      <h2 class="rise">${p.title}</h2>
      <div class="pd-meta rise" style="animation-delay:.05s">
        <span class="tag red">${p.cat}</span>
        ${p.duration ? `<span class="tag">${p.duration}</span>` : ""}
        ${p.distance ? `<span class="tag">${p.distance}</span>` : ""}
        ${p.spots ? `<span class="tag green">${p.spots} 个采集点</span>` : ""}
        <span class="tag">难度 ★<span style="color:var(--line)">☆☆☆☆</span></span>
      </div>
      <div class="pd-sec rise" style="animation-delay:.1s">
        <h5>${ic("compass")} 关于这条路线</h5>
        <p>${p.desc}</p>
      </div>
      <div class="pd-sec rise" style="animation-delay:.15s">
        <h5>${ic("pack")} 包裹里有</h5>
        <ul>${p.includes.map(x => `<li>${x}</li>`).join("")}</ul>
      </div>
      ${p.status === "on" ? `
      <div class="pd-sec rise" style="animation-delay:.2s">
        <h5>${ic("spark")} 使用指南</h5>
        <ul>
          <li>下单后，收到一张手绘实体地图，扫码解锁专属Zine</li>
          <li>带着地图去现场，根据线索和已知点位找到地图中所有奇怪的标记点</li>
          <li>完成拍照 / 录音 / 写字采集，Zine 对应内容为你解锁</li>
          <li>集齐后，生成一本专属「你的」唐家 Zine，可一键分享至其他平台</li>
        </ul>
      </div>` : ""}
    </div>
    <div class="pd-buy">
      <span class="price"><small>¥</small>${p.price}</span>
      ${p.status === "soon"
        ? `<button class="btn block" disabled>筹备中，敬请期待</button>`
        : owned
          ? `<button class="btn accent block" onclick="openReader(0)">已拥有 · 翻开 Zine</button>`
          : `<button class="btn accent block" id="buy-btn" onclick="buyProduct()">立即购买</button>`}
    </div>`;
}
function buyProduct() {
  const btn = $("#buy-btn");
  btn.disabled = true;
  btn.textContent = "支付中…";
  setTimeout(() => {
    S.owned = true;
    S.orders.push({ id: "TJ" + Date.now().toString().slice(-6), title: curProduct.title, price: curProduct.price });
    save();
    toast("支付成功（模拟）· 包裹已寄出");
    setTimeout(() => { renderProduct(); openIntro(); }, 700);
  }, 900);
}

/* ---------- 开场：快递开箱叙事 ---------- */
function openIntro() {
  renderIntro(0);
  openOverlay("intro");
}
function renderIntro(step) {
  const el = $("#intro");
  el.onclick = null;
  if (step === 0) {
    el.innerHTML = `
      <div class="parcel" id="parcel"></div>
      <p class="intro-cap rise" style="animation-delay:.1s">三天前，你在走走商店下了一单。<br>今天，一个<b>牛皮纸包裹</b>躺在你家门口。</p>
      <p class="intro-hint">— 轻点拆开 —</p>`;
    $("#parcel").onclick = () => renderIntro(1);
  } else if (step === 1) {
    /* 二维码印刷在实体地图上，这里只做扫码绑定动作 */
    el.innerHTML = `
      <p class="intro-cap rise"><b>地图</b>上印着一枚二维码。</p>
      <p class="intro-cap rise" style="animation-delay:.15s;font-size:13px;color:var(--ink-sub)">扫码后，这本 Zine 就与你的账号绑定</p>
      <button class="btn accent rise" id="intro-bind" style="animation-delay:.3s;margin-top:26px">${ic("camera")} 扫码绑定</button>`;
    $("#intro-bind").onclick = () => {
      toast("绑定成功 · 专属 Zine 已解锁");
      renderIntro(2);
    };
  } else {
    el.innerHTML = `
      <p class="intro-cap rise">地图是<span style="color:var(--accent)">谜语</span>，Zine是<span style="color:var(--accent)">解答</span>。</p>
      <p class="intro-cap rise" style="animation-delay:.15s;font-size:15px;color:var(--ink-sub)">到达地点，完成采集，地方的故事才会为你显现。</p>
      <button class="btn accent rise" id="intro-go" style="animation-delay:.3s;margin-top:26px">${ic("pin")} 收下地图，走去唐家</button>`;
    $("#intro-go").onclick = e => {
      e.stopPropagation();
      S.introSeen = true;
      save();
      closeOverlay("intro");
      openMap();
    };
  }
}

/* ---------- 地图 ---------- */
function openMap() {
  renderMap();
  openOverlay("map");
}
function renderMap() {
  const dc = collectedCount();
  $("#map").innerHTML = `
    <div class="topbar">
      <button class="back" onclick="closeOverlay('map')">${ic("back")}</button>
      <span class="t">唐家古镇 · 田野地图</span>
    </div>
    <div class="map-head">
      <h2>按图索骥</h2>
      <p>地图只是路标，故事都在 Zine 的纸页里。</p>
    </div>
    <div class="map-wrap">
      <img src="assets/zine/map.png" alt="唐家古镇手绘地图">
    </div>
    <div class="map-foot" style="margin-top:18px">
      <button class="btn accent block" onclick="closeOverlay('map');openReader(0)">${ic("book")} 翻开 Zine · 已采集 ${dc} / ${totalTasks}</button>
    </div>`;
}

/* ---------- 任务卡（通用采集） ---------- */
let curPage = null, capData = null;
function openCollect(id) {
  curPage = DB.zinePages.find(p => p.id === id);
  capData = null;
  renderSheet();
  $("#sheet-mask").classList.add("on");
  $("#task-sheet").classList.add("on");
}
function closeSheet() {
  $("#sheet-mask").classList.remove("on");
  $("#task-sheet").classList.remove("on");
}
function renderSheet() {
  const p = curPage;
  const taskType = (DB.zineTaskType && DB.zineTaskType[p.id]) || "photo";
  const unlocks = DB.zineReveal[p.id] || [];
  let body;
  if (taskType === "gps") {
    body = `
      <div class="ts-task">${ic("compass")}<div><b>允许走走记录你的行走轨迹</b><span>提示：允许后开始记录，走一段路再手动结束</span></div></div>
      <div class="capture" id="capture"></div>`;
  } else {
    body = `<div class="capture" id="capture"></div>`;
  }
  $("#task-sheet").innerHTML = `
    <div class="grab"></div>
    ${taskType === "gps" ? `
    <div class="ts-no">PAGE ${p.id.toUpperCase()} · 第 ${collectedCount()} / ${totalTasks} 处已采集</div>
    <div class="ts-name">轨迹采集</div>
    <div class="ts-place">${ic("pin", 12)} 封存后显现 · ${unlocks.map(u => u.toUpperCase()).join("、")}</div>` : ""}
    ${body}`;
  $("#sheet-mask").onclick = closeSheet;
  taskType === "gps" ? renderGps() : renderCapture("photo");
}

/* ---------- 采集交互 ---------- */
function samplePhoto() {
  return curPage ? curPage.src : "assets/zine2/1a.jpg";
}
/* 采集完成即封存，直接显现新页 */
function setCap(d) {
  capData = d;
  seal();
}
function renderCapture(type) {
  const box = $("#capture");
  if (type === "photo") {
    box.innerHTML = `
      <div class="cap-btns">
        <button class="btn block" id="shutter">${ic("camera")} 拍照</button>
        <button class="btn ghost" id="album">${ic("image")} 相册</button>
        <input type="file" id="file-inp" accept="image/*" hidden>
      </div>
      <div class="cap-preview" id="cap-prev"></div>`;
    $("#shutter").onclick = () => setCap({ type: "photo", data: samplePhoto(), caption: "现场照片", typeLabel: "拍照采集" });
    $("#album").onclick = () => $("#file-inp").click();
    $("#file-inp").onchange = e => {
      const f = e.target.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = ev => setCap({ type: "photo", data: ev.target.result, caption: "现场照片", typeLabel: "拍照采集" });
      r.readAsDataURL(f);
    };
  } else if (type === "audio") {
    box.innerHTML = `
      <div class="micbox" id="micbox">
        <button class="micbtn" id="mic">${ic("mic", 28)}</button>
        <div class="wave">${"<i></i>".repeat(14)}</div>
        <span class="mic-hint" id="mic-hint">按住说话 · 录一段现场的声音</span>
      </div>
      <div class="cap-preview" id="cap-prev"></div>`;
    const mic = $("#mic"), micbox = $("#micbox"), hint = $("#mic-hint");
    let recT = null, startT = 0;
    const start = e => {
      e.preventDefault();
      mic.classList.add("hold");
      micbox.classList.add("recording");
      hint.textContent = "录音中… 松开结束（最长 5 秒）";
      startT = Date.now();
      recT = setTimeout(end, 5000);
    };
    const end = () => {
      if (!mic.classList.contains("hold")) return;
      mic.classList.remove("hold");
      micbox.classList.remove("recording");
      clearTimeout(recT);
      const dur = Math.max(1, Math.round((Date.now() - startT) / 1000));
      hint.textContent = "按住说话 · 录一段现场的声音";
      setCap({ type: "audio", data: null, caption: `环境声 ${dur}s`, typeLabel: "录音采集", dur });
    };
    mic.onpointerdown = start;
    mic.onpointerup = end;
    mic.onpointerleave = end;
  } else {
    box.innerHTML = `<textarea class="cap-text" id="cap-text" placeholder="写在这里…… 比如：梁、卓、梁氏"></textarea>`;
    $("#cap-text").oninput = e => {
      const v = e.target.value.trim();
      capData = v ? { type: "text", data: v, caption: v, typeLabel: "文字采集" } : null;
      $("#seal-btn").disabled = !capData;
    };
  }
}
/* GPS 轨迹采集（模拟）：允许即完成，卡片自动关闭 */
function renderGps() {
  $("#capture").innerHTML = `
    <div class="gpsbox">
      <button class="btn block" id="gps-allow">${ic("pin")} 允许记录轨迹（模拟）</button>
    </div>`;
  $("#gps-allow").onclick = () => setCap({ type: "gps", data: null, caption: "行走轨迹", typeLabel: "轨迹采集" });
}

/* ---------- 封存 & 解锁 ---------- */
function seal() {
  if (!capData || !curPage) return;
  const p = curPage;
  if (capData.type === "photo") capData.caption = "采集 · " + p.id.toUpperCase();
  S.pages[p.id] = Object.assign({}, capData, {
    done: true,
    time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
  });
  save();
  closeSheet();
  if (allDone()) { openFinish(); return; }
  const ids = DB.zineReveal[p.id] || [];
  const firstIdx = Math.max(0, visiblePages().findIndex(q => q.id === ids[0]));
  openReader(firstIdx, true);
}

/* ---------- 阅读器 ---------- */
let rIdx = 0, revealIdx = -1;
function openReader(idx, reveal) {
  const pages = visiblePages();
  rIdx = Math.max(0, Math.min(idx, pages.length - 1));
  revealIdx = reveal ? rIdx : -1;
  renderReader();
  openOverlay("reader");
}
function renderReader() {
  const pages = visiblePages();
  if (rIdx > pages.length - 1) rIdx = pages.length - 1;
  const p = pages[rIdx];
  const collectable = DB.zineReveal[p.id] !== undefined && !pageDone(p.id);
  const pageNote = p.id === "1a" ? "自定义你的封面" : p.id === "19a" ? "自定义你的封底" : "";
  $("#reader").innerHTML = `
    <div class="topbar">
      <button class="back" onclick="closeOverlay('reader')">${ic("back")}</button>
      <span class="t">多重时间叠压下的唐家古镇</span>
      <span class="tag red" style="margin-left:auto">${collectedCount()} / ${totalTasks}</span>
    </div>
    <div class="reader-body" id="rbody">
      <div class="rpage" id="rpage">
        <img src="${p.src}" alt="zine ${p.id}" ${revealIdx === rIdx ? 'class="rise"' : ""}>
        ${pageNote ? `<div class="page-note">${pageNote}</div>` : ""}
        ${collectable ? `<button class="hotspot" id="hotspot" aria-label="采集这一页" onclick="event.stopPropagation();openCollect('${p.id}')"></button>` : ""}
      </div>
    </div>
    <div class="reader-foot">
      <button class="rnav" id="rprev" ${rIdx === 0 ? "disabled" : ""}>${ic("chevL")}</button>
      <div style="flex:1;min-width:0">
        <div class="dots">${pages.map((q, i) => `<span class="d ${i === rIdx ? "cur" : ""}"></span>`).join("")}</div>
        <p class="pg" style="text-align:center;margin-top:6px">${rIdx + 1} / ${pages.length} · ${p.id.toUpperCase()}</p>
      </div>
      <button class="rnav" id="rnext" ${rIdx === pages.length - 1 ? "disabled" : ""}>${ic("chevR")}</button>
    </div>`;
  revealIdx = -1;
  const hs = $("#hotspot");
  if (hs) {
    const im = $("#rpage img");
    const place = () => {
      const r = im.getBoundingClientRect(), pr = $("#rpage").getBoundingClientRect();
      const z = DB.zineHotspots[p.id] || [0, 0, 100, 100];
      hs.style.left = (r.left - pr.left + r.width * z[0] / 100) + "px";
      hs.style.top = (r.top - pr.top + r.height * z[1] / 100) + "px";
      hs.style.width = (r.width * z[2] / 100) + "px";
      hs.style.height = (r.height * z[3] / 100) + "px";
    };
    if (im.complete) place(); else im.onload = place;
  }
  $("#rprev").onclick = () => slideTo(-1);
  $("#rnext").onclick = () => slideTo(1);
  let sx = null;
  $("#rbody").ontouchstart = e => { sx = e.touches[0].clientX; };
  $("#rbody").ontouchend = e => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    sx = null;
    if (dx < -40) slideTo(1);
    else if (dx > 40) slideTo(-1);
  };
}
/* 拟真翻页：叶片含正面（页面内容）与纸背面，阴影随翻动变化 */
let flipping = false;
function slideTo(dir) {
  if (flipping) return;
  const pages = visiblePages();
  const to = rIdx + dir;
  if (to < 0 || to > pages.length - 1) return;
  flipping = true;
  const oldSrc = pages[rIdx].src, newSrc = pages[to].src;
  rIdx = to;
  const leaf = document.createElement("div");
  const face = src => `<div class="fl-face fl-front"><img src="${src}" alt=""></div><div class="fl-face fl-back"></div>`;
  if (dir > 0) {
    renderReader(); // 新页垫底，旧页作为叶片翻走
    const body = $("#reader .reader-body"); // 重渲后重新取节点
    leaf.className = "flip-leaf next";
    leaf.innerHTML = face(oldSrc);
    body.appendChild(leaf);
    body.classList.add("turning", "next-turn");
    leaf.addEventListener("animationend", () => {
      leaf.remove();
      body.classList.remove("turning", "next-turn");
      flipping = false;
    });
  } else {
    const body = $("#reader .reader-body"); // 旧页垫底，新页作为叶片翻回
    leaf.className = "flip-leaf prev";
    leaf.innerHTML = face(newSrc);
    body.appendChild(leaf);
    body.classList.add("turning", "prev-turn");
    leaf.addEventListener("animationend", () => {
      leaf.remove();
      renderReader();
      flipping = false;
    });
  }
}

/* ---------- 完成页：我的唐家 Zine ---------- */
function openFinish() {
  renderFinish();
  openOverlay("finish");
}
function renderFinish() {
  /* 成品页：封面 1b 单独一行，其余 26 页两两合成对页 */
  const mids = ["2a", "2b", "3b", "3c", "4b", "4d", "5b", "5c", "6b", "7b",
    "8b", "8c", "9b", "10b", "11b", "11c", "12b", "13b", "14b", "15b",
    "16b", "16c", "17b", "18b", "18c", "19b"];
  let spreads = "";
  for (let i = 0; i < mids.length; i += 2)
    spreads += `<div class="spread">${mids.slice(i, i + 2).map(id => `<img src="assets/zine2/${id}.jpg" alt="${id}">`).join("")}</div>`;
  $("#finish").innerHTML = `
    <div class="fin-wrap">
      <div class="fin-cover">
        <div class="fc-t">我的唐家 Zine</div>
        <div class="fc-s">TANGJIA FIELD NOTES · BY ${DB.user.name}</div>
        <img class="fc-single" src="assets/zine2/1b.png" alt="封面 1b">
        ${spreads}
        <span class="stamp">走走认证</span>
      </div>
      <p class="fin-cap rise" style="animation-delay:.2s">八百年被叠进两公里，<br>两公里现在叠进了你的本子。</p>
      <div class="fin-btns rise" style="animation-delay:.35s">
        <button class="btn block" onclick="playFlipAnim()">${ic("play")} 生成翻阅动画</button>
        <button class="btn accent block" onclick="shareMock()">${ic("share")} 分享给朋友（模拟）</button>
        <button class="btn ghost block" onclick="closeOverlay('finish');closeOverlay('map');openReader(0)">再翻一遍</button>
        <button class="btn ghost block" onclick="closeOverlay('finish')">回到地图</button>
      </div>
    </div>`;
  S.finished = true;
  save();
}
function shareMock() {
  toast("已生成分享卡片（演示环境，未真实调起微信）");
}
/* 生成翻阅动画：播放演示视频 */
function playFlipAnim() {
  let ov = $("#flipanim");
  if (!ov) {
    ov = document.createElement("div");
    ov.id = "flipanim";
    ov.className = "overlay-screen";
    $("#screens").appendChild(ov);
  }
  ov.innerHTML = `
    <div class="fa-wrap">
      <video src="assets/flip-anim.mp4" controls autoplay playsinline></video>
      <button class="btn ghost block" onclick="closeFlipAnim()">关闭</button>
    </div>`;
  openOverlay("flipanim");
}
function closeFlipAnim() {
  const v = $("#flipanim video");
  if (v) v.pause();
  closeOverlay("flipanim");
}

/* ---------- Zine 书架 ---------- */
function renderShelf() {
  const tj = DB.products[0];
  const dc = collectedCount();
  let card;
  if (!S.owned) {
    card = `
      <div class="zcard locked rise" style="padding:28px 20px;text-align:center">
        <p class="zs" style="font-family:var(--font-display);font-size:17px;color:var(--ink);margin-bottom:6px">还没有 Zine</p>
        <p class="zs">前往商店，收一张地图回来。</p>
        <button class="btn accent block" style="margin-top:16px" onclick="switchTab('shop')">去商店看看</button>
      </div>`;
  } else {
    card = `
      <div class="zcard rise" onclick="openReader(0)">
        <div class="zr">
          <img class="zc" src="${tj.cover}" alt="${tj.title}">
          <div style="flex:1">
            <h4>${tj.title}</h4>
            <p class="zs">${allDone() ? "已完成 · 可生成分享封面" : "进行中 · 点击继续采集"}</p>
            <div class="prog"><div class="bar"><i style="width:${(dc / totalTasks) * 100}%"></i></div>
              <div class="pt"><span>${dc} / ${totalTasks} 已采集</span><span>${visiblePages().length} / ${DB.zinePages.length} 页</span></div></div>
          </div>
        </div>
        <div style="display:flex;gap:8px;margin-top:12px">
          <button class="btn block" style="padding:10px" onclick="event.stopPropagation();openMap()">${ic("pin")} 地图</button>
          <button class="btn ghost block" style="padding:10px" onclick="event.stopPropagation();openReader(0)">${ic("book")} 翻阅</button>
          ${allDone() ? `<button class="btn accent block" style="padding:10px" onclick="event.stopPropagation();openFinish()">${ic("share")} 分享</button>` : ""}
        </div>
      </div>`;
  }
  $("#screen-zine").innerHTML = `
    <div class="shelf-head rise"><h1>我的 Zine 架</h1></div>
    <div class="shelf">${card}</div>`;
}

/* ---------- 我的 ---------- */
function renderMe() {
  const dc = collectedCount();
  const gearOn = id => (S.gear[id] !== undefined ? S.gear[id] : DB.gearList.find(g => g.id === id).done);
  const gearDone = DB.gearList.filter(g => gearOn(g.id)).length;
  $("#screen-me").innerHTML = `
    <div class="me-head rise">
      <div class="avatar">${DB.user.avatarText}</div>
      <div><h3>${DB.user.name}</h3><p>${DB.user.level} · ${DB.user.city}</p></div>
    </div>
    <div class="me-stats rise" style="animation-delay:.05s">
      <div><b>${DB.user.walkedKm}</b><span>行走 km</span></div>
      <div><b>${dc}</b><span>田野采集</span></div>
      <div><b>${S.finished ? 1 : 0}</b><span>完成 Zine</span></div>
    </div>
    <div class="mlist rise" style="animation-delay:.1s">
      <div class="mrow" onclick="toast('${S.orders.length ? "订单 " + S.orders.map(o => o.id).join("、") + "（演示）" : "暂无订单"}')">${ic("pack")} 我的订单 <span class="mr">${S.orders.length || ""} ${ic("chevR", 14)}</span></div>
    </div>
    <div class="mlist rise" style="animation-delay:.13s">
      <div class="mrow" id="cs-row" onclick="document.getElementById('cs-panel').classList.toggle('on')">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        客服与售后
        <span class="mr">${ic("chevR", 14)}</span>
      </div>
      <div class="cs-panel" id="cs-panel">
        <div class="cs-item"><b>服务时段</b><span>每日 10:00 – 20:00</span></div>
        <div class="cs-item"><b>客服电话</b><span>400-820-1688（演示）</span></div>
        <div class="cs-item"><b>微信客服</b><span>zouzou_kefu（演示）</span></div>
        <div class="cs-note">实物地图签收后 7 天内支持无理由退换；电子 Zine 解锁权一旦激活不支持退款，敬请谅解。</div>
      </div>
    </div>
    <div class="mlist rise" style="animation-delay:.15s">
      <div class="mrow" style="cursor:default">${ic("compass")} 出发前的装备 <span class="mr">${gearDone}/${DB.gearList.length}</span></div>
      <div class="gear">
        ${DB.gearList.map(g => {
          const on = gearOn(g.id);
          return `<div class="gitem ${on ? "done" : ""}" onclick="toggleGear('${g.id}')"><span class="box">${on ? ic("check", 12) : ""}</span><span>${g.name}</span></div>`;
        }).join("")}
      </div>
    </div>
    <div class="mlist rise" style="animation-delay:.2s">
      <div class="mrow" id="reset-row" onclick="resetProto()">${ic("refresh")} 重置原型 <span class="mr" id="reset-hint">回到未购买状态</span></div>
    </div>
    <p style="text-align:center;font-size:11px;color:var(--ink-sub);margin:18px 0 30px;font-family:var(--font-mono)">走走 ZOUZOU · 交互原型 v0.1<br>演示环境 · 无真实支付与上传</p>`;
}
function toggleGear(id) {
  const cur = S.gear[id] !== undefined ? S.gear[id] : DB.gearList.find(g => g.id === id).done;
  S.gear[id] = !cur;
  save();
  renderMe();
}
let resetArm = false;
function resetProto() {
  if (!resetArm) {
    resetArm = true;
    $("#reset-hint").textContent = "再点一次确认重置";
    setTimeout(() => {
      resetArm = false;
      const h = $("#reset-hint");
      if (h) h.textContent = "回到未购买状态";
    }, 2500);
    return;
  }
  localStorage.removeItem(LS_KEY);
  location.reload();
}

/* ---------- 启动 ---------- */
function renderTabbar() {
  const tabs = [["shop", "商店", "bag"], ["zine", "Zine", "book"], ["me", "我的", "user"]];
  $("#tabbar").innerHTML = tabs.map(([id, label, icn]) =>
    `<button class="tab" data-tab="${id}">${I[icn]}<span>${label}</span></button>`).join("");
  $$("#tabbar .tab").forEach(b => b.onclick = () => switchTab(b.dataset.tab));
}
function init() {
  renderTabbar();
  /* 扫码进入：?bind=tangjia 直接绑定专属 Zine */
  if (new URLSearchParams(location.search).get("bind") === "tangjia") {
    S.owned = true;
    S.introSeen = true;
    save();
    history.replaceState(null, "", location.pathname);
    setTimeout(() => toast("扫码成功 · 专属 Zine 已绑定"), 400);
  }
  switchTab("shop");
}
init();
