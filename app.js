"use strict";
// Révisions anat : application. Dessins : corps-art.js, accessoires-art.js, animals-*.js, cadeaux-art.js


// ======================== Données ========================
const D = window.QDATA || { questions: [], fiches: {}, sources: {}, regions: {} };
const QS = D.questions;
const QBY = {}; QS.forEach(q => (QBY[q.s] ||= []).push(q)); // questions par structure
const BY_ID = Object.fromEntries(QS.map(q => [q.id, q]));
const TABS = [
  { id: "g", label: "Général", cat: null },
  { id: "muscle", label: "Muscles", cat: "muscle" },
  { id: "nerf", label: "Nerfs", cat: "nerf" },
  { id: "ligament", label: "Ligaments", cat: "ligament" },
  { id: "artic", label: "Articulations", cat: "artic" },
  { id: "os", label: "Os", cat: "os" },
  { id: "autre", label: "Autres", cat: "autre" },
  { id: "palpa", label: "Palpation", cat: "palpa" }
];
const POOLS = {
  ko: { label: "Échecs", hint: "Les QCM où tu t'es trompée la dernière fois" },
  todo: { label: "Pas encore interrogées", hint: "Les QCM que tu n'as encore jamais faits" },
  ok: { label: "Déjà eu bon", hint: "Les QCM réussis la dernière fois" }
};
const REG_LABEL = { all: "Tout", ms: "Membre sup.", mi: "Membre inf.", ax: "Tête, cou, tronc" };
const CAT_LABEL = { muscle: "Muscle", nerf: "Nerf", ligament: "Ligament", artic: "Articulation", os: "Os", autre: "Autre", palpa: "Palpation" };
const CAT_PLURAL = { muscle: "Muscles", nerf: "Nerfs", ligament: "Ligaments", artic: "Articulations", os: "Os", autre: "Autres", palpa: "Palpation" };

const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// ======================== Images (chargées à la demande depuis images-XX.js) ========================
const PACKS = {};
function loadPack(p) {
  return PACKS[p] || (PACKS[p] = new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = p + ".js";
    s.onload = res; s.onerror = () => { delete PACKS[p]; rej(new Error("image indisponible")); };
    document.head.appendChild(s);
  }));
}
const isWeb = k => String(k).startsWith("web-");
const imgTags = keys => (keys || []).filter(k => D.imgs && D.imgs[k]).map(k => `<span class="picw ${isWeb(k) ? "out" : "in"}"><em>${isWeb(k) ? "🌐 Hors cours · Wikimedia Commons" : "📑 Ton cours"}</em><img class="pic" data-k="${esc(k)}" alt="${isWeb(k) ? "Image ajoutée, hors cours" : "Image du cours"}" loading="lazy"></span>`).join("");
// image ajoutée (Wikimedia Commons), hors cours
const webCredit = k => `<a href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent((D.imgCap[k] || "").split(" – ")[0])}" target="_blank" rel="noopener">${esc(D.imgCap[k] || "")}</a>`;
const webImg = f => { if (!f || !f.web || !D.imgs[f.web[0]]) return ""; const L = [f.web[0], ...(f.webx || [])].filter(k => D.imgs[k]);
  return `<figure class="web"><div class="pics">${imgTags(L)}</div><figcaption class="small"><b>⚠ Cette image ne vient pas de ton cours.</b> ${f.web[1] ? "Planche d'ensemble de la région : la structure n'y est pas toujours légendée. " : ""}Origine : Wikimedia Commons, ${L.map(webCredit).join(" ; ")}</figcaption></figure>`; };
// muscles cités par une fiche « Insertions » ou « Muscles : … », avec leur image
const galImg = f => !f || !f.gal ? "" : `<div class="mgal">${f.gal.filter(n => D.fiches[n]).map(n => `<a href="#/fiche/${encodeURIComponent(n)}">${D.fiches[n].web ? imgTags([D.fiches[n].web[0]]).replace('class="pic"', 'class="pic nozoom"') : ""}<span>${esc(cap(n))}</span></a>`).join("")}</div><p class="small">⚠ Images des muscles : hors cours (origine et auteur dans la fiche de chaque muscle).</p>`;
function hydrateImgs() {
  document.querySelectorAll("img.pic[data-k]:not([src])").forEach(el => {
    if (el.closest("details:not([open])")) return; // chargée seulement quand on ouvre le volet
    const k = el.dataset.k, p = D.imgs[k];
    if (!p) return;
    loadPack(p).then(() => { if (window.IMGP && IMGP[k]) el.src = IMGP[k]; }).catch(() => { el.alt = navigator.onLine ? "Image absente du site : fichier " + p + ".js introuvable sur GitHub" : "Image indisponible hors ligne (jamais affichée)"; });
  });
}

// ======================== Stockage (sur le téléphone) ========================
const K_PROG = "revanat-progress-v1", K_SET = "revanat-settings-v1", K_FLAG = "revanat-flags-v1";
const load = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };
let PROG = load(K_PROG, {});       // id -> { r: 1|0 (dernier résultat), n: essais, ok: réussites, t: date }
let SET = { reg: "all", len: 20, ...load(K_SET, {}) };
let FLAGS = load(K_FLAG, {});      // id -> date
// Module MSP (kiné) : progression à part (jamais mélangée aux QCM d'anatomie), mais l'XP, les animaux, les enfants et les croquettes sont communs
const K_MSP = "revanat-msp-v1"; let MSPP = load(K_MSP, {}); // id de question MSP -> { r, n, ok, f, t }
const mspOk = () => { let n = 0; for (const id in MSPP) n += MSPP[id].ok || 0; return n; };
function mspLoad() { if (mspLoad.p) return mspLoad.p; mspLoad.p = Promise.all(["msp-data", "msp-patients"].map(loadPack)).then(() => loadPack("msp-data-otr")).then(() => loadPack("msp-data-otr2")).then(() => loadPack("msp-data-otr3")).then(() => loadPack("msp-data-otr4")).then(() => loadPack("msp")).then(() => render()).catch(() => { mspLoad.p = null; MSG = "Le module MSP n'a pas pu se charger : vérifie ta connexion internet."; location.hash = "#/g"; }); return mspLoad.p; }
const K_OVR = "revanat-corrections-v1"; let OVR = load(K_OVR, {}); // corrections manuelles
const applyOvr = () => { for (const id in OVR) { const q = BY_ID[id]; if (q) { q.q = OVR[id].q; q.a = OVR[id].a; if (q.m) { q.m = q.a.split(" ; "); q.d = q.d.filter(x => !q.m.includes(x)); } else q.d = q.d.filter(x => x !== q.a); } } };
applyOvr();
// ======================== Widget Android (appli « Widget Révisions anat ») ========================
const K_WLAST = "revanat-widget-last-v1", K_WLAST2 = "revanat-widget-last-v2", WIDGET_PKG = "fr.jadanat.anatwidget"; // date de la dernière réponse du widget déjà importée
function qsHash() { // empreinte de la liste des questions, identique côté widget
  let h = 0x811c9dc5;
  for (let i = 0; i < QS.length; i++) { const s = (i ? "\n" : "") + QS[i].id; for (let j = 0; j < s.length; j++) { h ^= s.charCodeAt(j); h = Math.imul(h, 0x01000193) >>> 0; } }
  return h >>> 0;
}
function widgetLink() { // lien qui ouvre le widget et lui donne les QCM déjà faits ici
  const bytes = new Uint8Array(Math.ceil(QS.length / 8));
  QS.forEach((q, i) => { if (PROG[q.id]) bytes[i >> 3] |= 1 << (i & 7); });
  let bin = ""; bytes.forEach(b => { bin += String.fromCharCode(b); });
  const d = btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const back = location.href.split("#")[0] + "#/widget";
  return `intent://sync?h=${qsHash()}&w=${load(K_WLAST2, 0)}&u=${encodeURIComponent(location.href.split("#")[0])}&d=${d}#Intent;scheme=revanat;package=${WIDGET_PKG};S.browser_fallback_url=${encodeURIComponent(back)};end`;
}
// Réponses données hors de cette page (widget, autre version du site) : elles comptent aussi pour les animaux, croquettes, niveaux…
const K_SEEN = "revanat-vu-v1"; let SEEN = null, NO_RUN = false;
const totals = () => { let ok = 0, ko = 0; for (const id in PROG) { const p = PROG[id]; ok += p.ok || 0; ko += Math.max(0, (p.n || 0) - (p.ok || 0)); } return [ok, ko]; };
const markSeen = () => { SEEN = totals(); save(K_SEEN, SEEN); };
// p.e : nombre d'échecs avant d'avoir eu bon (0 = eu bon directement) ; réussir du premier coup une question déjà réussie le remet à 0
const fails = p => !p ? 0 : p.e !== undefined ? p.e : Math.max(0, (p.n || 0) - (p.ok || 0)), note = (p, good) => { const e = fails(p); p.e = good ? p.r ? 0 : e : e + 1; };
function catchUp() {
  const [o, k] = totals(), g = Math.min(400, Math.max(0, o - SEEN[0])), b = Math.min(400, Math.max(0, k - SEEN[1])); markSeen(); if (!g && !b) return { n: 0, won: "" };
  const run = PET.run, bad = PET.bad, got = { pet: 0, rate: 0, kid: 0, kib: 0, gift: 0 }; NO_RUN = true;
  for (let i = 0; i < b; i++) { const r = badAnswer(); if (r.rate) got.rate++; }
  for (let i = 0; i < g; i++) { const r = goodAnswer(); if (r.pet) got.pet++; if (r.kibble) got.kib++; if (r.kib50) got.kib += KIB50; if (r.kid) got.kid++; if (r.gift) got.gift++; }
  NO_RUN = false; PET.run = run; PET.bad = bad; save(K_PET, PET); const acc = syncUnlocks().length, gear = syncLevel().length, np = got.pet + got.rate;
  const L = [np && plural(np, "animal", "animaux"), got.kid && plural(got.kid, "enfant"), got.kib && plural(got.kib, "croquette"), got.gift && "1 cadeau", acc && plural(acc, "accessoire"), gear && plural(gear, "accessoire") + " de compagnon"].filter(Boolean);
  return { n: g + b, won: L.length ? `Tu as gagné : ${L.join(", ")} !` : "" };
}
function importWidget(payload) { // réponses envoyées par le widget (#/sync/<base64>)
  if (!payload) return "";
  let data;
  try { data = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(payload.replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0)))); }
  catch { return "Lien du widget illisible."; }
  const v2 = data.v === 2, KL = v2 ? K_WLAST2 : K_WLAST; // v2 : nouveau widget, qui envoie des numéros de question
  if (v2 && data.h !== String(qsHash())) return "Le widget n'a pas la même liste de questions que cette application : réinstalle le widget.";
  if (v2) data.r = (data.r || []).map(([i, r, t]) => [QS[i] && QS[i].id, r, t]);
  const last = load(KL, 0); let max = last, n = 0, ok = 0;
  for (const [id, r, t] of (data.r || [])) {
    if (!BY_ID[id] || !(t > last)) continue;
    const p = PROG[id] || { n: 0, ok: 0 };
    note(p, r); if (!p.n) p.f = r ? 1 : 0; p.n++; if (r) p.ok++;
    if (!(p.t > t)) { p.r = r ? 1 : 0; p.t = t; }
    PROG[id] = p; n++; if (r) ok++; if (t > max) max = t;
  }
  save(K_PROG, PROG); save(KL, max);
  const won = catchUp().won;
  return n ? `✔ ${plural(n, "réponse")} du widget ${n > 1 ? "enregistrées" : "enregistrée"} : ${ok} dans « Déjà eu bon », ${n - ok} dans « Échecs ». ${won}` : "Ces réponses du widget étaient déjà enregistrées.";
}
const widgetBtn = () => `<a class="btn primary" href="${esc(widgetLink())}">📲 Mettre à jour le widget</a>`;
function viewWidget() {
  const msg = MSG; MSG = "";
  return `<section class="card"><h2>📲 Widget Android</h2>
      ${msg ? `<p class="big">${esc(msg)}</p>` : ""}
      <p class="small">Touche « Mettre à jour le widget » : il saura quels QCM tu as déjà faits ici et ne te proposera que des structures pas encore interrogées.</p>
      <div class="actions">${widgetBtn()}<a class="btn" href="#/g">Accueil</a><a class="btn" href="#/menagerie">Ménagerie</a><a class="btn" href="#/corps">Corps</a></div></section>`;
}
const IOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1, STANDALONE = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true, CNAME = "jadjeudanat-v25";
let SESSION = null;
let MSG = "";

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const $ = s => document.querySelector(s);
const status = q => { const p = PROG[q.id]; return !p ? "todo" : p.r ? "ok" : "ko"; };
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const plural = (n, s, p) => `${n} ${n > 1 ? (p || s + "s") : s}`;
const cap = s => { s = String(s ?? ""); return s.charAt(0).toUpperCase() + s.slice(1); };
const srcText = src =>src ? `${D.sources[src[0]] || src[0]}, page ${src[1]} du PDF` : "";

function questionsOf(tab, reg = SET.reg) {
  const t = TABS.find(x => x.id === tab);
  return QS.filter(q => (!t || !t.cat || q.c === t.cat) && (reg === "all" || q.r === reg));
}
function stats(list) {
  let ok = 0, ko = 0;
  for (const q of list) { const s = status(q); if (s === "ok") ok++; else if (s === "ko") ko++; }
  return { total: list.length, ok, ko, done: ok + ko, todo: list.length - ok - ko };
}
const pct = (a, b) => b ? (a / b * 100) : 0;

function renderTabs(active, pre = "") {
  $("#tabs").innerHTML = TABS.map(t => {
    const s = stats(questionsOf(t.id));
    return `<a href="#/${pre}${t.id}" class="${t.id === active ? "on" : ""}">${t.label} <span class="small">${s.done}/${s.total}</span></a>`;
  }).join("");
  $("#tabs").classList.toggle("hidden", !active);
}

function progressBlock(s) {
  return `<div class="stack" role="img" aria-label="${s.ok} réussis, ${s.ko} échoués, ${s.todo} restants">
      <div class="g" style="width:${pct(s.ok, s.total)}%"></div><div class="r" style="width:${pct(s.ko, s.total)}%"></div></div>
    <div class="legend"><span><i style="background:var(--ok)"></i>${s.ok} réussis</span><span><i style="background:var(--ko)"></i>${s.ko} échoués</span><span><i style="background:var(--todo)"></i>${s.todo} restants</span></div>`;
}

// ======================== Fiches, révision, explorateur nerveux ========================

function ficheList(f) {
  return `<ul class="facts">${f.facts.map(([k, v]) => `<li><b>${esc(k)}</b>${esc(v)}</li>`).join("")}</ul>
    <div class="small" style="margin-top:6px">📄 ${f.src.map(s => esc(srcText(s))).join(" · ")}</div>`;
}

function viewFiches(query) {
  const qn = norm(query || "");
  const names = Object.keys(D.fiches).filter(n => (SET.reg === "all" || D.fiches[n].reg === SET.reg) && (!qn || norm(n).includes(qn)))
    .sort((a, b) => a.localeCompare(b, "fr"));
  const groups = {};
  for (const n of names) (groups[D.fiches[n].cat] ||= []).push(n);
  const dotFor = n => {
    const s = stats(QBY[n] || []);
    const c = s.ko ? "var(--ko)" : s.todo ? "var(--todo)" : "var(--ok)";
    return `<span class="small">${s.done}/${s.total}<span class="dot" style="background:${c}"></span></span>`;
  };
  return `<section class="card"><h2>Fiches des structures</h2>
      <p class="small">Toutes les informations de tes cours, structure par structure. Touche une fiche pour la lire ou t'interroger dessus.</p>
      <input type="search" id="search" placeholder="Rechercher (ex. médian, fémur, trapèze…)" value="${esc(query || "")}">
      <div class="chips">${Object.entries(REG_LABEL).map(([k, v]) => `<button data-act="reg" data-reg="${k}" class="${SET.reg === k ? "on" : ""}">${v}</button>`).join("")}</div>
    </section>
    ${["muscle", "nerf", "ligament", "artic", "os", "autre", "palpa"].filter(c => groups[c]).map(c => `<section class="card"><h2>${CAT_PLURAL[c]} (${groups[c].length})</h2>
      <div class="list">${groups[c].map(n => `<a href="#/fiche/${encodeURIComponent(n)}"><span>${esc(cap(n))}</span>${dotFor(n)}</a>`).join("")}</div></section>`).join("")
    || `<div class="card small">Aucune structure trouvée.</div>`}`;
}

function palpaBlocks(f) {
  return (f.palpa || []).map(b => `<div class="palpa"><b>🖐 Palpation${b.titre && norm(b.titre) !== norm(f._name || "") ? " – " + esc(b.titre) : ""}</b>
    <div>${esc(b.how)}</div><div class="small">📄 ${esc(srcText(b.src))}</div>
    ${b.imgs && b.imgs.length ? `<div class="pics">${imgTags(b.imgs)}</div>` : ""}</div>`).join("");
}
const PART_OF = D.partOf || {};
const bare = s => norm(s.replace(/\s*\(.*?\)/g, ""));
function trajets(name) { // muscle -> nerf -> ... -> vertèbres
  const want = [name, ...(PART_OF[name] || [])].map(bare), out = [];
  for (const n of Object.values(D.nerfs)) for (const m of n.muscles || []) if (want.includes(bare(m.n))) {
    let cur = n, src = n.rac ? n : null, txt = cap(n.nom);
    while (cur.parent) { txt += " → " + (cur.kind || "branche") + " de : "; cur = D.nerfs[cur.parent]; txt += cur.nom; if (!src && cur.rac) src = cur; }
    txt += src ? " → vient de " + src.rac + (src === n ? "" : " (racines de : " + src.nom + ")") : " → racines non précisées dans le cours";
    out.push([m.n, txt]);
  }
  return out.length ? `<ul class="facts">${out.map(([m, x]) => `<li><b>Trajet nerveux – ${esc(m)}</b>${esc(x)}</li>`).join("")}</ul>` : "";
}
function ficheBody(name) {
  const f = D.fiches[name];
  if (!f) return "";
  f._name = name;
  const qs = QBY[name] || [], s = stats(qs);
  return `${trajets(name)}${f.facts.length ? ficheList(f) : ""}
    ${palpaBlocks(f)}
    ${f.imgs && f.imgs.length ? `<details ${f.cat === "nerf" ? "" : "open"}><summary>📑 Pages de tes cours (${f.imgs.length})</summary><div class="pics big">${imgTags(f.imgs)}</div></details>` : ""}
    ${qs.length ? `<p class="small" style="margin-top:12px">${s.done} QCM sur ${s.total} réalisés, ${s.ok} réussis, ${s.ko} échoués</p>${progressBlock(s)}
    <div class="actions"><button class="primary" data-act="ficheQuiz" data-name="${esc(name)}">M'interroger sur cette structure (${qs.length})</button></div>` : ""}`;
}
function viewFiche(name) {
  const f = D.fiches[name];
  if (!f) return `<div class="card">Fiche introuvable. <a href="#/fiches">Retour</a></div>`;
  const back = TABS.some(t => t.cat === f.cat) ? `#/rev/${f.cat}` : "#/fiches";
  return `<p><a href="${back}">← Révision ${esc(CAT_PLURAL[f.cat] || "")}</a></p>
    <section class="card"><span class="tag">${CAT_LABEL[f.cat]} · ${REG_LABEL[f.reg] || ""}</span>
      <h2 style="margin-top:8px">${esc(cap(name))}</h2>${webImg(f)}${galImg(f)}${ficheBody(name)}</section>`;
}

// ======================== Révision ========================
function viewRev(tab, query) {
  const t = TABS.find(x => x.id === tab) || TABS[0];
  const qn = norm(query || "");
  let names;
  if (t.cat === "palpa") names = [...new Set((D.palpas || []).map(p => D.fiches[p.nom] ? p.nom : null).filter(Boolean)
    .concat(Object.keys(D.fiches).filter(n => D.fiches[n].cat === "palpa")))];
  else names = Object.keys(D.fiches).filter(n => !t.cat || D.fiches[n].cat === t.cat);
  names = names.filter(n => (SET.reg === "all" || D.fiches[n].reg === SET.reg || !D.fiches[n].reg) && (!qn || norm(n).includes(qn)))
    .sort((a, b) => a.localeCompare(b, "fr"));
  const dot = n => { const s = stats(QBY[n] || []); const c = !s.total ? "transparent" : s.ko ? "var(--ko)" : s.todo ? "var(--todo)" : "var(--ok)"; return `<span class="small">${s.total ? s.done + "/" + s.total : ""}<span class="dot" style="background:${c}"></span></span>`; };
  const nerf = t.cat === "nerf" ? `<section class="card"><h2>Explorateur : vertèbre → nerfs</h2>
      <p class="small">Choisis un niveau : tu verras tous les nerfs qui en naissent, avec leurs collatérales et leurs terminales.</p>
      <div class="levels">${D.levels.map(l => `<a href="#/vert/${l}">${l}</a>`).join("")}</div>
      <p class="small" style="margin-top:10px">Plexus : ${Object.entries(D.nerfs).filter(([id, n]) => !n.parent && (id.startsWith("plexus") || id.startsWith("branches"))).map(([id, n]) => `<a href="#/nx/${id}">${esc(n.nom)}</a>`).join(" · ")}</p>
      <p class="small">Nerfs crâniens : ${Object.entries(D.nerfs).filter(([id]) => /^[IVX]+$/.test(id)).map(([id, n]) => `<a href="#/nx/${id}">${esc(id)}</a>`).join(" · ")}</p></section>` : "";
  return `<p><a href="#/${t.id}">← ${esc(t.label)}</a></p>${nerf}
    <section class="card"><h2>Révision : ${esc(t.id === "g" ? "toutes les structures" : t.label)} (${names.length})</h2>
      <input type="search" id="search" data-tab="${t.id}" placeholder="Rechercher…" value="${esc(query || "")}">
      <div class="chips">${Object.entries(REG_LABEL).map(([k, v]) => `<button data-act="reg" data-reg="${k}" class="${SET.reg === k ? "on" : ""}">${v}</button>`).join("")}</div>
      <div class="list">${names.map(n => `<a href="#/fiche/${encodeURIComponent(n)}"><span>${esc(cap(n))}</span>${dot(n)}</a>`).join("") || `<p class="small">Aucune structure.</p>`}</div>
    </section>`;
}

function viewVert(lv) {
  const list = Object.entries(D.nerfs).filter(([, n]) => (n.lv || []).includes(lv))
    .sort((a, b) => (a[1].parent ? 1 : 0) - (b[1].parent ? 1 : 0) || a[1].nom.localeCompare(b[1].nom, "fr"));
  return `<p><a href="#/rev/nerf">← Révision Nerfs</a></p>
    <section class="card"><h2>Explorateur : vertèbre → nerfs</h2>
      <div class="levels">${D.levels.map(l => `<a href="#/vert/${l}" class="${l === lv ? "on" : ""}">${l}</a>`).join("")}</div></section>
    <section class="card"><h2>Nerfs issus de ${esc(lv)} (${list.length})</h2>
      <div class="list">${list.map(([id, n]) => `<a href="#/nx/${id}"><span>${esc(cap(n.nom))}${n.parent ? ` <span class="small">(${esc(n.kind || "branche")} de ${esc(D.nerfs[n.parent].nom)})</span>` : ""}</span>
        <span class="small">${esc(n.rac || (n.herite ? "via " + n.herite : ""))}</span></a>`).join("") || `<p class="small">Aucun nerf décrit dans tes cours pour ce niveau.</p>`}</div></section>`;
}

function nerveCard(id, withLink) {
  const n = D.nerfs[id];
  const mus = (n.muscles || []).map(m => `<li><b>${esc(m.n)}</b>${m.a ? esc(m.a) : `<span class="small">Action non décrite dans tes cours de myologie</span>`}</li>`).join("");
  return `<h2 style="margin-top:4px">${esc(cap(n.nom))}</h2>
    <ul class="facts">
      <li><b>Origine (racines)</b>${esc(n.rac || (n.herite ? "Comme le " + n.herite + " (non précisé)" : "Non précisé dans le cours"))}</li>
      ${n.parent ? `<li><b>Naît de</b>${esc(D.nerfs[n.parent].nom)} (${esc(n.kind || "branche")})</li>` : ""}
      ${n.sens ? `<li><b>Territoire sensitif</b>${esc(n.sens)}</li>` : ""}
      ${n.fct ? `<li><b>Fonction</b>${esc(n.fct)}</li>` : ""}
    </ul>
    ${mus ? `<h3 style="margin:12px 0 4px;font-size:.95rem">Muscles innervés et leurs actions</h3><ul class="facts">${mus}</ul>` : ""}
    ${withLink ? `<div class="actions"><a class="btn" href="#/nx/${id}">Explorer ce nerf →</a></div>` : ""}`;
}

function viewNx(id, kind, sub) {
  const n = D.nerfs[id];
  if (!n) return `<div class="card">Nerf introuvable. <a href="#/rev/nerf">Retour</a></div>`;
  const kids = (n.children || []).map(c => [c, D.nerfs[c]]);
  const col = kids.filter(([, c]) => c.kind === "collatérale"), ter = kids.filter(([, c]) => c.kind === "terminale");
  const k = kind || (col.length ? "c" : "t");
  const shown = k === "c" ? col : ter;
  const lvLinks = (n.lv || []).map(l => `<a href="#/vert/${l}">${l}</a>`).join(" ");
  const f = D.fiches[n.fiche];
  return `<p><a href="${n.parent ? "#/nx/" + n.parent : "#/rev/nerf"}">← ${n.parent ? esc(D.nerfs[n.parent].nom) : "Révision Nerfs"}</a> ${lvLinks ? `<span class="small"> · niveaux : ${lvLinks}</span>` : ""}</p>
    <section class="card"><span class="tag">Nerf</span>${nerveCard(id, false)}</section>
    ${kids.length ? `<section class="card">
      <div class="subtabs"><a href="#/nx/${id}/c" class="${k === "c" ? "on" : ""}">Collatérales (${col.length})</a><a href="#/nx/${id}/t" class="${k === "t" ? "on" : ""}">Terminales (${ter.length})</a></div>
      <div class="list">${shown.map(([cid, c]) => `<a href="#/nx/${id}/${k}/${cid}" style="${cid === sub ? "font-weight:700;color:var(--accent)" : ""}"><span>${esc(cap(c.nom))}</span><span class="small">${esc(c.rac || "")}</span></a>`).join("") || `<p class="small">Aucune dans le cours.</p>`}</div>
      ${sub && D.nerfs[sub] ? `<div class="palpa" style="margin-top:12px">${nerveCard(sub, true)}</div>` : ""}
    </section>` : ""}
    <section class="card"><h2>Description complète${f ? "" : " (cours)"}</h2>
      ${webImg(f)}${f ? ficheBody(n.fiche) : ""}
      ${n.imgs && n.imgs.length && !(f && f.imgs && f.imgs.length) ? `<div class="pics big">${imgTags(n.imgs)}</div>` : ""}
    </section>`;
}

let INSTALL = null; addEventListener("beforeinstallprompt", e => { e.preventDefault(); INSTALL = e; if (route()[0] === "reglages") render(); }); addEventListener("appinstalled", () => { INSTALL = null; if (route()[0] === "reglages") render(); });
function viewSettings() {
  const all = stats(QS), nf = Object.keys(FLAGS).length;
  const msg = MSG; MSG = "";
  const bySrc = {};
  for (const q of QS) if (q.src) bySrc[q.src[0]] = (bySrc[q.src[0]] || 0) + 1;
  return `<section class="card"><h2>Ma progression</h2>
      <p>${all.done} QCM sur ${all.total} réalisés, ${all.ok} réussis, ${all.ko} échoués.</p>${progressBlock(all)}
      <p class="small">Ta progression, tes accessoires et tes animaux sont enregistrés uniquement sur cet appareil. Exporte-les de temps en temps pour ne pas les perdre.</p>
      <div class="actions"><button class="primary" data-act="export">Exporter ma progression</button><button data-act="import">Importer</button>
      <input type="file" id="importFile" accept="application/json,.json" class="hidden"></div>
      <div class="msg">${esc(msg)}</div></section>
    <section class="card"><h2>🩺 Module MSP (kiné)</h2><p class="small">Révisions pour l'examen de MSP. Il ne change rien à l'anatomie : sans lui, tu peux tout gagner quand même. ${mspOk()} bonnes réponses MSP enregistrées.</p>
      <div class="actions"><button data-act="toggleMsp">${SET.noMsp ? "Afficher le module MSP" : "Masquer le module MSP"}</button></div></section>
    <section class="card"><h2>📱 Installer l'application</h2>
      <p class="small">${STANDALONE() ? "✔ L'application est installée sur cet appareil." : IOS ? "Sur iPhone et iPad : ouvre cette page dans Safari, touche le bouton Partager (le carré avec une flèche vers le haut), puis « Sur l'écran d'accueil » et « Ajouter ». Ouvre ensuite l'application avec sa nouvelle icône : elle marche sans internet. Installe-la avant de commencer à jouer, car sur iPhone l'application installée ne reprend pas la progression de Safari (sinon, exporte puis importe-la)." : INSTALL ? "Sur Android, elle s'installe en une touche et marche ensuite sans internet." : "Sur Android : ouvre cette page dans Chrome, touche ⋮ en haut à droite, puis « Installer l'application » (ou « Ajouter à l'écran d'accueil »). Elle marche ensuite sans internet."}</p>
      <p class="small">Chaque personne qui l'installe a sa propre progression, ses animaux et sa garderie.</p>
      <div class="actions">${INSTALL && !STANDALONE() ? `<button class="primary" data-act="install">Installer sur cet appareil</button>` : ""}<button data-act="share">Partager l'application</button></div></section>
    ${IOS ? "" : `<section class="card"><h2>📲 Widget Android</h2>
      <p class="small">Les réponses données sur le widget arrivent ici quand tu touches « ↻ Envoyer à l'appli » sur le widget. Dans l'autre sens, ce bouton envoie ta progression au widget.</p>
      <div class="actions">${widgetBtn()}</div></section>`}
    <section class="card"><h2>Questions signalées (${nf})</h2>
      <p class="small">Si une question te paraît fausse, touche « 🚩 Signaler » en haut de la question. Tu retrouves la liste ici pour la faire corriger.</p>
      ${nf ? `<div class="list">${Object.keys(FLAGS).map(id => BY_ID[id]).filter(Boolean).map(q => `<a href="#/fiche/${encodeURIComponent(q.s)}"><span>${esc(q.q)}</span><span class="small">${esc(q.s)}</span></a><button class="flag" data-act="fixQ" data-id="${q.id}">✏ Corriger la question ou la réponse</button>`).join("")}</div>
      <div class="actions"><button data-act="flagQuiz">Revoir ces questions</button><button data-act="copyFlags">Copier la liste</button></div>` : ""}
    </section>
    <section class="card"><h2>Sources utilisées</h2>
      <p class="small">Toutes les réponses viennent de ces cours (le numéro de page est donné après chaque question) :</p>
      <ul class="facts">${Object.entries(D.sources).map(([k, v]) => `<li>${esc(v)} <span class="small">— ${bySrc[k] || 0} questions</span></li>`).join("")}</ul>
      <p class="small">Banque générée le ${esc(D.version)} · ${QS.length} QCM · ${Object.keys(D.fiches).length} fiches.</p></section>
    <section class="card"><h2>Hors ligne</h2><p class="big" id="offst">Vérification…</p>
      <p class="small">Les questions, les fiches, le jeu et tous les dessins du jeu marchent sans internet dès la première ouverture. Les photos de cours, les images ajoutées et les tableaux se gardent quand tu les ouvres : touche ce bouton une fois, avec internet, pour tout avoir (environ 60 Mo).</p>
      <button data-act="dlImgs">Tout télécharger pour le hors ligne</button></section>
    <section class="card"><h2>Remarques sur tes cours</h2>
      <p class="small">Points relevés en préparant les questions. Quand deux cours se contredisent, la notion n'est pas interrogée.</p>
      <ul class="facts">
        <li><b>Grand dorsal – insertion iliaque</b>« 1/3 médial » de la lèvre externe de la crête iliaque (Membre supérieur – Myologie p. 4) contre « 1/3 postérieur » (Squelette axial – Myologie p. 11) : la crête iliaque est interrogée, mais pas la fraction.</li>
        <li><b>Plexus sacral</b>Le texte dit L4 à S3 (SNP p. 192 et 195), un schéma indique L5 et S4 : la question retient L4 à S3.</li>
        <li><b>3e fibulaire</b>SNP p. 215 et palpation p. 46 disent fibulaire superficiel, SNP p. 232 rattache les muscles antérieurs au fibulaire profond : selon ta consigne, la question retient le fibulaire profond et ne propose jamais le superficiel.</li>
        <li><b>Nerfs plantaires</b>Le cours SNP utilise les anciens noms : « adducteur du gros orteil » = abducteur de l'hallux, « abducteurs oblique et transverse du gros orteil » = adducteur de l'hallux. Les questions utilisent les noms actuels.</li>
        <li><b>Interosseux dorsaux de la main</b>L'action « extension de la P3 sur la P2 et de la P2 sur la P3 » contient une faute de frappe : seule l'action « écartement des P1 par rapport au majeur » est interrogée.</li>
        <li><b>Quadriceps</b>« Tendon quadricipital ou ligament patellaire » : formulation ambiguë, non interrogée.</li>
        <li><b>Muscles sans innervation dans tes cours</b>${(D.sansInnerv || []).map(esc).join(", ")} : aucune question d'innervation possible.</li>
        <li><b>Articulations costo-vertébrales</b>L'orientation des fossettes vertébrales diffère entre l'arthrologie (p. 11) et l'ostéologie axiale (p. 8) : non interrogée.</li>
        <li><b>Palpation du tronc</b>Le texte imprimé s'arrête au milieu des obliques de l'abdomen (p. 13) ; l'écriture manuscrite est ignorée.</li>
        <li><b>Innervation des muscles</b>Les cours de myologie ne la donnent pas : elle vient uniquement du cours SNP.</li>
        <li><b>Schémas</b>Les questions viennent du texte des cours ; les informations présentes uniquement dans les schémas (images) ne sont pas interrogées.</li>
      </ul></section>
    <section class="card"><h2>Recommencer à zéro</h2>
      <p class="small">Efface ta progression et tes accessoires (les questions et tes animaux restent).</p>
      <button class="danger" data-act="reset">Effacer ma progression</button></section>`;
}

// ======================== Zones du corps ========================

const ZONES = { tete: "Tête", cou: "Cou", epaule: "Épaule", thorax: "Thorax", bras: "Bras", coude: "Coude", abdomen: "Abdomen",
  avantbras: "Avant-bras", dos: "Dos et colonne", main: "Poignet et main", bassin: "Bassin et hanche", cuisse: "Cuisse",
  genou: "Genou", jambe: "Jambe", pied: "Cheville et pied" };
const ZRULES = [
  ["main", /\b(main|mains|poignet|carp|scaphoide|lunatum|semi-lunaire|triquetrum|pyramidal|pisiforme|trapeze \(os\)|trapezoide|capitatum|grand os|hamatum|crochu|metacarp|phalang|doigt|pouce|index|auriculaire|majeur|thenar|hypothenar|lombricaux|interosseux (palmaires|dorsaux de la main)|tabatiere|retinaculum des (flechisseurs|extenseurs) \(poignet\)|canal carpien|loge de guyon|radio-carp|styloide)/],
  ["pied", /\b(pied|cheville|talus|astragale|calcane|naviculaire|cuboide|cuneiforme|metatars|orteil|hallux|plantaire|tarse|tarsien|malleol|talo-crural|tibio-tarsien|achille|calcaneen|lisfranc|chopart|pedieux|sinus du tarse|retinaculum des (flechisseurs|extenseurs|fibulaires)|interosseux (plantaires|dorsaux du pied)|carre plantaire|sesamoide|retromalleol|subtalaire|sous-talaire|sustentacul|bifurque)/],
  ["genou", /\b(genou|patella|patellaire|rotule|menisque|croise|poplite|tibio-femoral|femoro-patellaire|femoro-tibial|plateau tibial|patte d'oie|hoffa|condyle|coques condyliennes|intercondylaire|infra-condylaire|tuberosite tibiale|fabella|bourse pre)/],
  ["jambe", /\b(tibia|tibial|fibula|fibulaire|perone|jambe|triceps sural|gastrocnemien|jumeaux de la jambe|soleaire|plantaire grele|long extenseur des orteils|long flechisseur des orteils|long extenseur de l'hallux|long flechisseur de l'hallux|crural|sural|mollet|tibio-fibulaire|membrane interosseuse de la jambe|saphene)/],
  ["cuisse", /\b(femur|femoral|cuisse|quadriceps|vaste|sartorius|couturier|adducteur|ischio-jambier|biceps femoral|semi-tendineux|semi-membraneux|gracile|droit interne|tenseur du fascia lata|fascia lata|tractus ilio-tibial|bandelette|sciatique|scarpa|pectine|ligne apre|hunter|obturateur? ?nerf)/],
  ["bassin", /\b(bassin|pelvi|hanche|coxo|coxal|fessier|glute|piriforme|pyramidal du bassin|obturat|jumeau|gemell|carre femoral|psoas|iliaque|ilio|acetabul|cotyle|trochanter|sacr|coccy|pubi|ischi|symphyse|plexus lombaire|plexus sacral|plexus pudendal|pudendal|ligament inguinal|inguinal|perinee|anal|anus|honteux|surface auriculaire|obture|epine iliaque|crete iliaque|ails)/],
  ["coude", /\b(coude|olecran|epicondyl|epitrochle|trochlee|capitulum|condyle humeral|huméro-ulnaire|humero-ulnaire|humero-radial|radio-ulnaire proximal|tete radiale|anconé|anconee|ancone|fossette (coronoide|olecranienne)|processus coronoide|tuberosite bicipitale|bourse olecranienne)/],
  ["avantbras", /\b(avant-bras|radius|radial|ulna|ulnaire|cubital|pronateur|supinateur|flechisseur|extenseur|brachio-radial|long supinateur|palmaire|supinat|long abducteur du pouce|court extenseur du pouce|membrane interosseuse|radio-ulnaire|union des os)/],
  ["bras", /\b(bras|humer|biceps|triceps|brachial|coraco-brachial|musculo-cutane|sillon du nerf radial|velpeau|quadrilatere|triangle (humero-tricipital|omo-tricipital))/],
  ["epaule", /\b(epaule|scapula|omoplate|clavicul|acromi|deltoid|coiffe|supra-epineux|sus-epineux|infra-epineux|sous-epineux|subscapulaire|sous-scapulaire|petit rond|grand rond|gleno|scapulo|axillaire|aisselle|creux axillaire|coraco|conoide|trapezoide \(ligament\)|subclavier|sous-clavier|elevateur de la scapula|rhomboide|dentele anterieur|grand dentele|petit pectoral|plexus brachial|thoracique long|suprascapulaire|sus-scapulaire|dorsal de la scapula|thoraco-dorsal|triangle des ronds|sterno-claviculaire|subclavi)/],
  ["tete", /\b(crane|cranien|tete|face\b|faciale?\b|mandibul|maxill|temporal|occipital|frontal|parietal|sphenoid|ethmoid|zygoma|orbit|oeil|œil|oculo|nasal|nez|bouche|langue|machoire|masseter|pterygoid|temporo-mandibulaire|atm|hypoglosse|trijumeau|olfactif|optique|trochleaire|abducens|vestibulo|glosso-pharyngien|vague|nerf accessoire|foramen jugulaire|suboccipital|sous-occipital|sous occipital|petit droit posterieur|grand droit posterieur|oblique (superieur|inferieur) de la tete|occiput|mastoid|front|cuir chevelu|ophtalmique|foramen magnum|basilaire|menton)/],
  ["cou", /\b(cou\b|cervica|atlanto|atloido|axoid|odonto|nucal|tectoria|grand auriculaire|supra-claviculaire|nuque|sterno-cleido|scm|scalene|hyoid|larynx|thyroid|trachee|atlas|axis|c[1-7]\b|plexus cervical|phrenique|jugulaire|carotid|splenius|elevateur|semi-epineux de la tete|longissimus de la tete|long du cou|long de la tete|platysma)/],
  ["thorax", /\b(thorax|thorac|cote|costal|costo|sternum|sternal|xiphoid|manubrium|intercost|pector|mammaire|diaphragm|sein|poumon|coeur|aorte thoracique|subcostal|transverse du thorax)/],
  ["abdomen", /\b(abdom|abdominal|oblique|droit de l'abdomen|grand droit|transverse de l'abdomen|pyramidal de l'abdomen|ligne blanche|ombilic|nombril|aorte abdominale|rectus|gaine des droits|arcade de senac|carre des lombes|ilio-hypogastrique|ilio-inguinal|genito-femoral)/],
  ["dos", /\b(dos\b|trapeze(?! \(os\))|intervertebr|paravertebr|masse commune|dentele postero|supraepineux|promontoire|mamillaire|dorsal|vertebr|rachis|colonne|spinal|spinaux|epineu|lombaire|lombal|lombes|disque|anneau fibreux|nucleus|noyau pulpeux|interepineux|intertransversaire|multifide|transversaire|longissimus|ilio-costal|iliocostal|erecteur|grand dorsal|latissimus|thoraco-lombaire|lombo-sacre|jaune|ligament longitudinal|ligaments? (jaunes|supra-epineux|interepineux)|zygapophys|articulaire|t1[0-2]?\b|t[2-9]\b|l[1-5]\b|th[0-9]+)/],
];
const Z_REG = { main: "ms", avantbras: "ms", coude: "ms", bras: "ms", epaule: "ms ax", abdomen: "ax", pied: "mi", jambe: "mi", genou: "mi", cuisse: "mi" };
const Z_FALLBACK = { ms: "bras", mi: "cuisse", ax: "dos" };
const ZONE_OF = {}, ZQ = {};
for (const q of QS) {
  let z = null;
  for (const t of [norm(q.s), norm(q.q)]) {
    for (const [k, re] of ZRULES) if ((!Z_REG[k] || Z_REG[k].includes(q.r)) && re.test(t)) { z = k; break; }
    if (z) break;
  }
  z = z || Z_FALLBACK[q.r] || "dos";
  ZONE_OF[q.id] = z; (ZQ[z] ||= []).push(q);
}


// ======================== Jeu : état sauvegardé ========================
const K_BODY = "revanat-corps-v3", K_DAILY = "revanat-daily-v3", K_PET = "revanat-pet-v3", K_SESS = "revanat-serie-v1", K_TAB = "revanat-tableaux-v1", K_WARD = "revanat-garderobe-v1";
const ART = window.ANIMALS_ART, ANIMALS = ART.animals.filter(a => !(a.o && a.o.human)), KIDS = ART.animals.filter(a => a.o && a.o.human), KID_IDS = new Set(KIDS.map(a => a.id)), RATES = window.ANIMALS_RATES || [], GIFT = window.CADEAUX, GEAR = window.PETGEAR;
const ANIMAL_BY_ID = { ...ART.byId, ...Object.fromEntries(RATES.map(a => [a.id, a])) };
document.getElementById("svgdefs").innerHTML = CORPS.DEFS + ART.DEFS + GIFT.DEFS + window.GARDEROBE.DEFS;
const todayKey = (off = 0) => { const d = new Date(); d.setDate(d.getDate() + off); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const pickOne = a => a[Math.floor(Math.random() * a.length)];

// ---------- Accessoires du corps : un au hasard tous les 5 % réussis dans une zone ----------
const STEPS = 20, ACC = CORPS.ACC, ACC_BY = CORPS.ACC_BY;
function zstat(z) { const s = stats(ZQ[z] || []); s.m = s.total ? s.ok / s.total : 0; s.p = Math.floor(s.m * 100 + 1e-9); return s; }
const zTarget = z => { const s = zstat(z); return s.total ? Math.floor(s.ok * STEPS / s.total + 1e-9) : 0; };
let BODY = load(K_BODY, null);
const bodyNew = !BODY; BODY ||= {};
BODY.got = (BODY.got || []).filter(id => ACC_BY[id]); BODY.eq ||= {}; BODY.look = { ...CORPS.LOOK0, ...(bodyNew ? { base: pickOne(CORPS.LOOKS.base) } : {}), ...(BODY.look || {}) }; // couleur de départ au hasard pour chaque nouveau joueur
delete BODY.tint;
const has = a => BODY.got.includes(a.id), isEq = a => has(a) && !!BODY.eq[a.id];
const gotIn = z => BODY.got.filter(id => ACC_BY[id].z === z).map(id => ACC_BY[id]);
// ---------- Garde-robe achetée avec l'XP ----------
const SHOP = window.GARDEROBE, START_XP = 1500; // au premier lancement, l'XP passé est crédité dans cette limite
let WARD = { got: [], eq: {}, fab: {}, spent: null, ...load(K_WARD, {}) }; WARD.got = WARD.got.filter(id => SHOP.byId[id]);
for (const s in WARD.eq) if (!WARD.got.includes(WARD.eq[s])) delete WARD.eq[s];
for (const s in WARD.fab) if (!WARD.got.includes(WARD.fab[s])) delete WARD.fab[s];
const FABCATS = ["top", "short", "dtop", "dshort"];
const wallet = () => Math.max(0, xp() - (WARD.spent || 0));
const clothes = () => Object.values(WARD.eq).map(id => SHOP.byId[id]).filter(Boolean);
const wornAcc = () => BODY.got.filter(id => BODY.eq[id]).map(id => ACC_BY[id]);
const worn = () => [...wornAcc(), ...clothes()];
// un haut, un bas et une robe ne se portent pas en même temps ; un accessoire et un vêtement du même emplacement non plus
const clash = s => s === "robe" ? ["robe", "haut", "bas"] : s === "haut" || s === "bas" ? [s, "robe"] : [s];
function wear(a, on) {
  const cs = clash(a.s); if (on) { for (const w of wornAcc()) if (cs.includes(w.s)) BODY.eq[w.id] = false; for (const s of cs) delete WARD.eq[s]; }
  if (a.cat) { if (on) WARD.eq[a.s] = a.id; else if (WARD.eq[a.s] === a.id) delete WARD.eq[a.s]; } else BODY.eq[a.id] = on;
  save(K_WARD, WARD); save(K_BODY, BODY);
}
const fabOpts = (f = WARD.fab) => ({ topFab: f.top && SHOP.byId[f.top].fab, shortFab: f.short && SHOP.byId[f.short].fab, topPrint: f.dtop && SHOP.byId[f.dtop].draw, shortPrint: f.dshort && SHOP.byId[f.dshort].draw });
function grant(z, quiet) {
  const pool = CORPS.accByZone(z).filter(a => !has(a)); if (!pool.length) return null;
  const a = pickOne(pool); BODY.got.push(a.id);
  if (!worn().some(w => (quiet && w.z === z) || clash(a.s).includes(w.s))) wear(a, true);
  return a;
}
function syncUnlocks(quiet) {
  const fresh = [];
  for (const z of Object.keys(ZONES)) { let n = zTarget(z) - gotIn(z).length; while (n-- > 0) { const a = grant(z, quiet); if (!a) break; fresh.push(a); } }
  if (fresh.length) save(K_BODY, BODY);
  return fresh;
}
if (bodyNew) { // reprise des anciennes versions : on ne perd aucun accessoire déjà gagné
  const v2 = (load("revanat-corps-v2", {}).got || []), v1 = (load("revanat-corps-v1", {}).got || []);
  for (const z of Object.keys(ZONES)) {
    const n1 = [2, 10, 20].reduce((m, n, i) => v1.includes(z + i) ? n : m, 0), n2 = v2.filter(id => String(id).startsWith(z + "_p")).length;
    for (let n = Math.max(n1, n2) - gotIn(z).length; n > 0; n--) grant(z, true);
  }
  syncUnlocks(true); save(K_BODY, BODY);
}
// ---------- XP et niveaux ----------
const xp = () => { let n = mspOk(); for (const id in PROG) n += PROG[id].ok || 0; return n * 10 + BODY.got.length * 25; };
const need = L => 50 * L * (L - 1);
const level = x => { let L = 1; while (need(L + 1) <= x) L++; return L; };
const TITLES = [[1, "Première année"], [3, "Palpeuse en herbe"], [5, "Chasseuse d'insertions"], [8, "Dompteuse de nerfs"], [11, "Reine des ligaments"], [14, "Maîtresse du plexus"], [18, "Légende de l'anat"], [22, "Kiné d'or 🏆"], [28, "Déesse de l'anatomie"], [35, "Immortelle du plexus"]];
const title = L => TITLES.filter(t => L >= t[0]).pop()[1];
function zcol(z) { const s = zstat(z); if (!s.ok) return null; if (s.m >= 1) return "url(#gGold)"; return `hsl(${Math.round(262 - 122 * s.m)} 78% ${Math.round(74 - 14 * s.m)}%)`; }

// ---------- Jour, série de jours, croquettes et cadeaux ----------
let DAILY = { streak: 0, lastActiveDay: null, todayKey: todayKey(), todayGood: 0, todayRewardClaimed: false, kibbleEarnedToday: false, kibbles: 0, got: [], ...load(K_DAILY, {}) };
DAILY.equipped = { coiffure: null, decor: null, ...(DAILY.equipped || {}) };
const OLD_GOT = DAILY.got || [], OLD_EQ = { ...DAILY.equipped };
// ---------- Tableaux : un par jour de connexion ----------
let TAB = { got: [], cur: null, day: null, ...load(K_TAB, {}) };
for (const id of OLD_GOT) if (GIFT.TAB[id] && !TAB.got.includes(id)) TAB.got.push(id);
TAB.got = TAB.got.filter(id => GIFT.TAB[id]); if (!TAB.got.includes(TAB.cur)) TAB.cur = TAB.got.includes(OLD_EQ.tableau) ? OLD_EQ.tableau : TAB.got[0] || null;
function dailyPainting() { // renvoie le tableau gagné aujourd'hui, s'il est nouveau
  const tk = todayKey(); if (TAB.day === tk) return null; TAB.day = tk;
  const pool = Object.keys(GIFT.TAB).filter(id => !TAB.got.includes(id)), id = pool.length ? pickOne(pool) : null;
  if (id) { TAB.got.push(id); TAB.cur ||= id; } save(K_TAB, TAB); return id;
}
DAILY.got = (DAILY.got || []).filter(id => GIFT.byId[id]);
for (const c in DAILY.equipped) if (DAILY.equipped[c] && !DAILY.got.includes(DAILY.equipped[c])) DAILY.equipped[c] = null;
function syncDaily() {
  const tk = todayKey();
  if (DAILY.todayKey !== tk) {
    if (DAILY.lastActiveDay !== todayKey(-1) && DAILY.lastActiveDay !== tk) DAILY.streak = 0;
    Object.assign(DAILY, { todayKey: tk, todayGood: 0, todayRewardClaimed: false, kibbleEarnedToday: false }); save(K_DAILY, DAILY);
  }
  if (PET.dayKey !== tk) { PET.dayKey = tk; PET.dayCount = 0; save(K_PET, PET); }
}
const eqv = c => DAILY.equipped[c] ? GIFT.byId[DAILY.equipped[c]].v : null;
// ---------- Animaux ----------
const MAX_DAY = 40; // animaux gagnés par jour au maximum
const PER_PET = 7, PET_RUN = 4, randomTarget = () => PER_PET; // un animal après 7 bonnes réponses en tout, ou 4 d'affilée (la première atteinte)
const petLeft = () => { const a = Math.max(1, PET.targetGood - PET.goodSincePet), b = Math.max(1, PET_RUN - PET.petRun); return b < a ? `${plural(b, "bonne réponse", "bonnes réponses")} d'affilée, ou ${a} en tout` : plural(a, "bonne réponse", "bonnes réponses"); };
const kidTarget = () => 10 + Math.floor(Math.random() * 11), KIB50 = 20, KIB50_EVERY = 50; // un enfant toutes les 10 à 20 bonnes réponses ; 20 croquettes toutes les 50
let PET = { got: [], companion: null, targetGood: randomTarget(), goodSincePet: 0, dayKey: todayKey(), dayCount: 0, care: {}, ...load(K_PET, {}) };
PET.petRun ||= 0; PET.kids = [...new Set([...(PET.kids || []), ...(PET.got || []).filter(id => KID_IDS.has(id))])].filter(id => KID_IDS.has(id)); // la garderie (les enfants gagnés avant y emménagent)
PET.got = [...new Set(PET.got || [])].filter(id => ART.byId[id] && !KID_IDS.has(id)); PET.rates = [...new Set(PET.rates || [])].filter(id => ANIMAL_BY_ID[id]); PET.care ||= {}; PET.fav ||= {}; PET.when ||= {};
PET.koCount ||= 0; PET.run ||= 0; PET.bad ||= 0; PET.targetGood = PER_PET; if (!PET.kidT || PET.kidT > 20) PET.kidT = kidTarget(); PET.goodSinceKid ||= 0; PET.good50 ||= 0;
if (KID_IDS.has(PET.companion)) { PET.kid ||= PET.companion; PET.companion = PET.got[PET.got.length - 1] || null; } if (!PET.kids.includes(PET.kid)) PET.kid = null;
if (PET.companion && !PET.got.includes(PET.companion) && !PET.rates.includes(PET.companion)) PET.companion = null;
if (PET.flyer && !PET.got.includes(PET.flyer)) PET.flyer = null;
// accessoires du compagnon : un par niveau, un toutes les 10 bonnes réponses d'affilée
PET.gear = { got: [], eq: {}, keq: {}, lv: 0, ...(PET.gear || {}) }; PET.gear.got = PET.gear.got.filter(id => GEAR.byId[id]);
for (const id of OLD_GOT) if (GEAR.byId[id] && !PET.gear.got.includes(id)) PET.gear.got.push(id);
if (OLD_EQ.animal_gear && GEAR.byId[OLD_EQ.animal_gear]) { PET.gear.eq[GEAR.byId[OLD_EQ.animal_gear].s] = OLD_EQ.animal_gear; DAILY.equipped.animal_gear = null; }
for (const q of [PET.gear.eq, PET.gear.keq]) for (const s in q) if (!PET.gear.got.includes(q[s])) delete q[s];
function grantGear() { const pool = GEAR.list.filter(g => !PET.gear.got.includes(g.id)); if (!pool.length) return null; const g = pickOne(pool); PET.gear.got.push(g.id); PET.gear.eq[g.s] ||= g.id; return g.id; }
const KIB_LEVEL = 20, FEED_MAX = 5, KIB_EVERY = 5, KIB_DAY = 10; // 20 croquettes par niveau, 1 toutes les 5 bonnes réponses (10 par jour) ; un même animal en mange 5 par jour au plus
function syncLevel() { const L = level(xp()), out = []; if (PET.gear.lv < 1) PET.gear.lv = 1;
  if (!PET.kibLv) PET.kibLv = L; if (PET.kibLv < L) { DAILY.kibbles = (DAILY.kibbles || 0) + KIB_LEVEL * (L - PET.kibLv); PET.kibLv = L; save(K_DAILY, DAILY); save(K_PET, PET); }
  while (PET.gear.lv < L) { PET.gear.lv++; const id = grantGear(); if (id) out.push(id); } if (out.length) save(K_PET, PET); return out; }
const gearOn = () => Object.values(PET.gear.eq), kidGear = () => Object.values(PET.gear.keq);
let GWHO = "pet"; const gearSet = () => GWHO === "kid" && PET.kid ? PET.gear.keq : PET.gear.eq; // accessoires du compagnon ou de l'enfant
for (const id in PET.care) { const c = PET.care[id]; if (c.babyId) { c.babies = Math.max(1, c.babies || 0); delete c.babyId; } } // les bébés sont désormais de la race du parent
const petCare = id => (PET.care[id] ||= { happiness: 0, fedDays: 0, lastFedDay: null, babies: 0 });
const MAX_BABIES = 3, FEED_FOR_BABY = 5;
syncDaily(); save(K_PET, PET);
// 1er enfant : une « L » ; 2e : « H » ; 5e : « W » ; puis au hasard, avec au moins deux enfants entre deux « L »
function nextKid(pool) {
  const has = g => PET.kids.some(id => ANIMAL_BY_ID[id].tag === g), L = pool.filter(a => a.tag === "L"), W = pool.filter(a => a.tag === "W"), H = pool.filter(a => a.tag === "H"), near = PET.kids.slice(-2).some(id => ANIMAL_BY_ID[id].tag === "L"), rest0 = pool.filter(a => a.tag !== "W" && a.tag !== "J" || has("W")), rest1 = near ? rest0.filter(a => a.tag !== "L") : rest0, rest2 = rest1.length ? rest1 : rest0, rest3 = PET.kids.length < 10 ? rest2.filter(a => !/^rigolo-courage-/.test(a.id)) : rest2, rest = rest3.length ? rest3 : rest2;
  if (!has("L") && L.length) return pickOne(L); if (PET.kids.length && !has("H") && H.length) return H[0]; if (PET.kids.length >= 4 && !has("W") && W.length) return W[0];
  // parmi les 10 premiers enfants, un seul (et toujours un) futur enfant courageux, à une place au hasard
  const isC = a => /^rigolo-courage-/.test(a.id), n = PET.kids.length, C = pool.filter(isC), hasC = PET.kids.some(id => isC(ANIMAL_BY_ID[id]));
  if (n < 10 && !hasC && C.length && n >= 2 && (n === 9 || Math.random() < 1 / (9 - n))) return pickOne(C);
  // parmi les 20 premiers, toujours au moins un enfant aveugle, en fauteuil, dans sa bulle, au bras bionique, triste sous son nuage, avec des boutons, un vitiligo, une prothèse, une trisomie 21 ou des appareils auditifs
  const isS = a => !!(a.aveugle || a.fauteuil || a.bras || a.smo || a.jambe || a.t21 || a.audio || /^rigolo-triste-|^rigolo-variante-1[2-5]$/.test(a.id)), S = pool.filter(a => isS(a) && !isC(a)), hasS = PET.kids.some(id => isS(ANIMAL_BY_ID[id]));
  if (n < 20 && !hasS && S.length && n >= 2 && n !== 4 && (n === 19 || Math.random() < 1 / (18 - n))) return pickOne(S);
  return pickOne(rest.length ? rest : pool);
}
function goodAnswer() { // une bonne réponse : série, croquette, cadeau, animal
  syncDaily(); const out = {}, tk = todayKey();
  if (DAILY.lastActiveDay !== tk) { DAILY.streak = DAILY.lastActiveDay === todayKey(-1) ? (DAILY.streak || 0) + 1 : 1; DAILY.lastActiveDay = tk; }
  DAILY.todayGood = (DAILY.todayGood || 0) + 1;
  if (DAILY.todayGood % KIB_EVERY === 0 && DAILY.todayGood <= KIB_EVERY * KIB_DAY) { DAILY.kibbles = (DAILY.kibbles || 0) + 1; out.kibble = true; }
  if (DAILY.todayGood >= 5 && !DAILY.todayRewardClaimed) {
    DAILY.todayRewardClaimed = true; const pool = GIFT.REWARDS.filter(r => !DAILY.got.includes(r.id));
    if (pool.length) { const r = pickOne(pool); DAILY.got.push(r.id); DAILY.equipped[r.cat] ||= r.id; out.gift = r.id; }
  }
  PET.goodSincePet = (PET.goodSincePet || 0) + 1; if (!NO_RUN) PET.petRun++;
  if ((PET.goodSincePet >= PET.targetGood || PET.petRun >= PET_RUN) && PET.dayCount < MAX_DAY) {
    const pool = ANIMALS.filter(a => !PET.got.includes(a.id));
    PET.goodSincePet = 0; PET.petRun = 0; PET.targetGood = randomTarget();
    const rigo = pool.filter(a => a.species === "Rigolos"); // un animal gagné sur quatre environ est un rigolo
    if (pool.length) { const a = pickOne(rigo.length && Math.random() < .25 ? rigo : pool); PET.got.push(a.id); PET.dayCount++; petCare(a.id); if (FLY(a)) PET.flyer ||= a.id; else PET.companion ||= a.id; PET.when[a.id] = Date.now(); out.pet = a.id; }
  }
  if (++PET.goodSinceKid >= PET.kidT) {
    const pool = KIDS.filter(a => !PET.kids.includes(a.id)); PET.goodSinceKid = 0; PET.kidT = kidTarget();
    if (pool.length) { const a = nextKid(pool); PET.kids.push(a.id); petCare(a.id); PET.kid ||= a.id; PET.when[a.id] = Date.now(); out.kid = a.id; }
  }
  if (++PET.good50 >= KIB50_EVERY) { PET.good50 = 0; DAILY.kibbles = (DAILY.kibbles || 0) + KIB50; out.kib50 = true; }
  PET.run++; PET.bad = 0; if (!NO_RUN && PET.run % 10 === 0) out.gear10 = grantGear();
  save(K_DAILY, DAILY); save(K_PET, PET); return out;
}
const PER_RATE = 15; // un animal « raté » toutes les 15 questions ratées
function badAnswer() {
  const out = {}; PET.koCount++; PET.run = 0; PET.bad++; if (!NO_RUN) PET.petRun = 0; // les ratés ont leur propre règle, à part
  if (PET.koCount % PER_RATE === 0) { const pool = RATES.filter(a => !PET.rates.includes(a.id)); if (pool.length) { const a = pickOne(pool); PET.rates.push(a.id); PET.when[a.id] = Date.now(); petCare(a.id); PET.companion ||= a.id; out.rate = a.id; } }
  save(K_PET, PET); return out;
}
const COURAGE = ["Je crois en toi !", "Courage !", "Ne baisse pas les bras, tu vas y arriver !"];
const kibToday = () => Math.min(KIB_DAY, Math.floor((DAILY.todayGood || 0) / KIB_EVERY));
function feed(id = PET.companion) {
  syncDaily(); if (!id) return { msg: "Choisis d'abord un compagnon dans la ménagerie." };
  if (!(DAILY.kibbles > 0)) return { msg: kibToday() >= KIB_DAY ? "Plus de croquette : encore demain, et 20 au prochain niveau !" : `Plus de croquette : encore ${plural(KIB_EVERY - (DAILY.todayGood || 0) % KIB_EVERY, "bonne réponse", "bonnes réponses")} pour la prochaine.` };
  const c = petCare(id), tk = todayKey(); if (c.lastFedDay !== tk) c.fedToday = 0; else if (c.fedToday === undefined) c.fedToday = 1;
  if (c.fedToday >= FEED_MAX) return { msg: isHuman(id) ? "Bien nourri pour aujourd'hui ! Tu peux nourrir un autre enfant." : "Il a assez mangé pour aujourd'hui ! Tu peux nourrir un autre animal." };
  DAILY.kibbles--; c.lastFedDay = tk; c.fedToday++; c.fedDays = (c.fedDays || 0) + 1; c.happiness = Math.min(100, (c.happiness || 0) + 10); const st0 = stepsOf(id), grew = st0.includes(c.fedDays) ? [c.fedDays, stageName(id, st0.indexOf(c.fedDays))] : null;
  const human = isHuman(id); let baby = false; if (!human && c.fedDays % FEED_FOR_BABY === 0 && (c.babies || 0) < MAX_BABIES) { c.babies = (c.babies || 0) + 1; baby = true; }
  save(K_DAILY, DAILY); save(K_PET, PET);
  return { ok: true, baby, grew: !!grew, msg: human && grew ? `🎉 ${ANIMAL_BY_ID[id].name} a grandi : ${stageName(id, kidStage(c.fedDays))} !` : baby ? `🍼 Un bébé ${ANIMAL_BY_ID[id].name.toLowerCase()} est né !${grew ? ` Et ton compagnon a grandi : ${grew[1]} !` : ""}` : grew ? `🎉 Il a grandi ! Le voilà ${grew[1]} !` : `Miam ! Bonheur : ${c.happiness} %` };
}
// taille : celle de l'espèce, puis 5 paliers de croissance selon les croquettes mangées ; les bébés grandissent avec celles de leur parent
const STAGES = [[0, "tout jeune"], [3, "petit"], [8, "adulte"], [15, "grand"], [25, "géant"]];
const isHuman = id => !!(ANIMAL_BY_ID[id] && ANIMAL_BY_ID[id].o && ANIMAL_BY_ID[id].o.human); // les bébés humains n'ont pas de petits : ils grandissent
const kidStage = n => { let k = 0; ART.HFED.forEach((f, i) => { if (n >= f) k = i; }); return k; };
const stgOf = id => { const n = (PET.care[id] || {}).fedDays || 0; return isHuman(id) ? kidStage(n) : stageOf(n); }, stepsOf = id => isHuman(id) ? ART.HFED : STAGES.map(s => s[0]);
const stageName = (id, k) => isHuman(id) ? (ANIMAL_BY_ID[id].ages || ART.HSTAGES)[k] : STAGES[k][1];
const stageOf = n => { let k = 0; STAGES.forEach((s, i) => { if (n >= s[0]) k = i; }); return k; };
// près du corps : écarts de taille doux entre espèces et entre paliers, jamais en dessous de 0,83
const sizeF = a => { const z = ART.size(a); return Math.min(1.25, Math.max(.9, Math.pow(z, z > 1 ? .8 : .5))); };
const PETF = [.92, .97, 1.02, 1.08, 1.14], BABYF = [[0, .88], [4, .95], [8, 1.04], [12, 1.12]];
const petZ = a => Math.round(sizeF(a) * PETF[stageOf((PET.care[a.id] || {}).fedDays || 0)] * 1000) / 1000;
const babyZ = (id, i) => { const since = Math.max(0, ((PET.care[id] || {}).fedDays || 0) - FEED_FOR_BABY * (i + 1)); return Math.round(sizeF(ANIMAL_BY_ID[id]) * BABYF.filter(s => since >= s[0]).pop()[1] * 1000) / 1000; };
const petSvg = (a, cls = "pet-svg", o = {}) => a ? ART.renderSvg(a, cls, { z: o.stage ? petZ(a) : 1, ...(isHuman(a.id) ? { stg: stgOf(a.id) } : {}), ...o }, o.bare ? null : a.id === PET.companion ? gearOn() : a.id === PET.kid ? kidGear() : null, esc) : "";
const gearThumb = id => ART.renderSvg((GWHO === "kid" && ANIMAL_BY_ID[PET.kid]) || ANIMAL_BY_ID[PET.companion] || ART.byId["chat-tigre-roux"], "thumb", GWHO === "kid" && PET.kid ? { stg: stgOf(PET.kid) } : {}, [id], esc);
const babiesSvg = (id, cls = "pet-svg baby", stage = false) => Array.from({ length: isHuman(id) ? 0 : (PET.care[id] || {}).babies || 0 }, (_, i) => petSvg(ANIMAL_BY_ID[id], cls, { isBaby: true, babyN: i, z: stage ? babyZ(id, i) : 1 })).join("");
function toast(html, kind = "") { document.querySelectorAll(".toast").forEach(x => x.remove()); const t = document.createElement("div"); t.className = "toast " + kind; t.setAttribute("role", "status"); t.innerHTML = html; document.body.appendChild(t); setTimeout(() => t.classList.add("out"), 2600); setTimeout(() => t.remove(), 3100); }

// le compagnon vient parler à l'écran
function petSays(text) {
  document.querySelectorAll(".petpop").forEach(x => x.remove()); const a = ANIMAL_BY_ID[PET.companion] || ANIMAL_BY_ID[PET.flyer]; if (!text) return; if (!a) return toast(esc(text), "ok");
  const d = document.createElement("div"); d.className = "petpop"; d.setAttribute("role", "status"); d.innerHTML = `<div class="bubble">${esc(text)}</div>${petSvg(a, "pet-svg")}`; document.body.appendChild(d);
  setTimeout(() => d.classList.add("out"), 4200); setTimeout(() => d.remove(), 4800);
}
// images des tableaux : chargées quand elles arrivent à l'écran
const artIO = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { artIO.unobserve(e.target); loadArt(e.target); } }), { rootMargin: "200px" }) : null;
function loadArt(el) {
  const a = GIFT.TAB[el.dataset.art]; if (!a) return;
  loadPack(a.pack).then(() => { if (window.TABX && TABX[a.id]) el.src = TABX[a.id]; }).catch(() => { const s = GIFT.svgArt[a.id]; if (s) { const [w, h] = /width="160"/.test(s) ? [160, 120] : [120, 150]; el.src = "data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${s}</svg>`); } });
}
function hydrateArts(root = document) { root.querySelectorAll("img.artimg:not([src])").forEach(el => artIO ? artIO.observe(el) : loadArt(el)); }
function modal(html) { document.querySelector(".modal")?.remove(); const m = document.createElement("div"); m.className = "modal"; m.innerHTML = `<div class="mbox" role="dialog" aria-modal="true">${html}</div>`; m.addEventListener("click", e => { if (e.target === m) m.remove(); }); document.body.appendChild(m); hydrateArts(m); m.querySelector("button")?.focus(); }
const artCap = a => `<b>${esc(a.name)}</b><span class="small">${esc(a.by)}, ${GIFT.annee(a.y)}</span>`;
const artCredit = a => `<a class="small" target="_blank" rel="noopener" href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(a.file)}">Wikimedia Commons · ${esc(a.lic)}${a.credit ? " · " + esc(a.credit) : ""}</a>`;
function showDaily() {
  const id = dailyPainting(); if (!id) return; const a = GIFT.TAB[id]; render();
  modal(`<h2>Ton tableau du jour</h2>${GIFT.painting(id, 220)}<p class="cap">${artCap(a)}</p><p class="small">${TAB.got.length}/${Object.keys(GIFT.TAB).length} œuvres dans ta collection</p><div class="actions center"><button class="primary" data-act="expose" data-id="${id}">L'exposer</button><button data-act="closeM">Plus tard</button></div>${artCredit(a)}`);
}

// ======================== Vues ========================
const persoSvg = (o = {}) => CORPS.svg({ worn: worn(), look: BODY.look, hair: eqv("coiffure") || "long", ...fabOpts(), ...o });
function lvBlock() {
  const X = xp(), L = level(X), lo = need(L), hi = need(L + 1);
  return `<span class="lvbadge">${L}</span><span class="t"><b>Niveau ${L} · ${esc(title(L))}</b>
    <span class="small">${X.toLocaleString("fr")} XP · encore ${(hi - X).toLocaleString("fr")} XP pour le niveau ${L + 1}</span>
    <span class="xpbar"><i style="width:${pct(X - lo, hi - lo)}%"></i></span></span>`;
}
const resumeBanner = () => SESSION && SESSION.pos < SESSION.ids.length ? `<a class="card resume" href="#/quiz"><span class="ri">▶</span><span class="t"><b>Reprendre ma série</b><span class="small">${esc(SESSION.label)} · question ${SESSION.pos + 1} / ${SESSION.ids.length}</span></span></a>` : "";
function dailyStrip() {
  syncDaily(); const left = Math.max(1, PET.targetGood - PET.goodSincePet), g = Math.min(5, DAILY.todayGood || 0);
  return `<div class="strip"><span class="chip fire">🔥 <b>${DAILY.streak || 0}</b> ${DAILY.streak > 1 ? "jours" : "jour"}</span>
    <span class="chip kib">${KIB} <b>${DAILY.kibbles || 0}</b> croquette${DAILY.kibbles > 1 ? "s" : ""}</span>
    <span class="chip paw">🐾 <b>${PET.got.length}</b>/${ANIMALS.length}</span><span class="chip">🧒 <b>${PET.kids.length}</b>/${KIDS.length}</span>${PET.candy ? `<span class="chip">🍬 <b>${PET.candy}</b></span>` : ""}<span class="chip xpc">💎 <b>${wallet().toLocaleString("fr")}</b> XP à dépenser</span></div>
    <div class="small daily">${DAILY.todayRewardClaimed ? "✔ Cadeau du jour gagné" : `Cadeau du jour : ${g}/5 bonnes réponses`} · ${PET.dayCount >= MAX_DAY ? `${MAX_DAY} animaux aujourd'hui, la suite demain !` : `prochain animal dans ${petLeft()} (${PET.dayCount}/${MAX_DAY} aujourd'hui)`}${PET.kids.length < KIDS.length ? ` · prochain enfant dans ${plural(Math.max(1, PET.kidT - PET.goodSinceKid), "bonne réponse", "bonnes réponses")}` : ""} · ${KIB50} croquettes dans ${plural(KIB50_EVERY - PET.good50, "bonne réponse", "bonnes réponses")} · petites croquettes : ${kibToday()}/${KIB_DAY} aujourd'hui</div>`;
}
const CANDY = `<svg viewBox="0 0 40 40" class="kib-ico" aria-hidden="true"><path d="M13 16 L3 10 Q6 20 3 30 L13 24Z M27 16 L37 10 Q34 20 37 30 L27 24Z" fill="#ff9fc8" stroke="#a83a6b" stroke-width="2.2" stroke-linejoin="round"/><circle cx="20" cy="20" r="10" fill="#ff6fa8" stroke="#a83a6b" stroke-width="2.4"/><path d="M14 14 Q20 20 14 26 M20 10.5 Q27 20 20 29.500" fill="none" stroke="#fff" stroke-width="2.600" stroke-linecap="round"/></svg>`;
const KIB = `<svg viewBox="0 0 40 40" class="kib-ico" aria-hidden="true"><path d="M11 16a6 6 0 1 1 4-6h10a6 6 0 1 1 4 6v8a6 6 0 1 1-4 6H15a6 6 0 1 1-4-6z" fill="#d79a5b" stroke="#80501f" stroke-width="2.4" stroke-linejoin="round"/><circle cx="17" cy="18" r="1.7" fill="#80501f"/><circle cx="23" cy="22" r="1.7" fill="#80501f"/></svg>`;
function viewTab(tab) {
  const t = TABS.find(x => x.id === tab) || TABS[0], list = questionsOf(t.id), s = stats(list), len = SET.len;
  const msg = MSG; MSG = "";
  const comp = PET.companion ? ANIMAL_BY_ID[PET.companion] : null;
  const pool = k => { const n = k === "ok" ? s.ok : k === "ko" ? s.ko : s.todo; return `<button class="pool ${k}" data-act="${k === "ok" ? "okPick" : "start"}" data-tab="${t.id}" data-pool="${k}" ${n ? "" : "disabled"}><span class="n">${n}</span><span class="t"><b>${POOLS[k].label}</b><span class="small">${POOLS[k].hint}</span></span><span class="go" aria-hidden="true">›</span></button>`; };
  return `${t.id === "g" ? `<section class="card hero"><a class="heroart" href="#/corps" aria-label="Mon corps d'anat">${persoSvg({ vb: "84 -60 232 290", cls: "bust" })}</a><div class="herot"><a class="lvrow" href="#/corps">${lvBlock()}</a>${dailyStrip()}</div>${comp ? `<a class="heropet" href="#/menagerie" aria-label="${esc(comp.name)}">${petSvg(comp)}</a>` : ""}</section>` : ""}
  ${resumeBanner()}${t.id === "g" ? `<div id="offcard"></div>` : ""}${msg ? `<div class="card small">${esc(msg)}</div>` : ""}
  <section class="card"><h2>${t.id === "g" ? "Toutes les structures" : t.label}</h2>
    <p class="big">${s.done} QCM sur ${s.total} réalisés, ${s.ok} réussis, ${s.ko} échoués</p>${progressBlock(s)}
    <div class="chips" role="group" aria-label="Région">${Object.entries(REG_LABEL).map(([k, v]) => `<button data-act="reg" data-reg="${k}" class="${SET.reg === k ? "on" : ""}">${v}</button>`).join("")}</div></section>
  <div class="pools">${pool("ko")}${pool("todo")}${pool("ok")}</div>
  <section class="card"><label for="len"><b>Nombre de QCM par série</b></label>
    <div class="range"><input id="len" type="range" min="5" max="100" step="5" value="${Math.min(len, 100)}" data-set="len"><output id="lenOut">${len >= 100 ? "Tous" : len}</output></div>
    <div class="small">Tout à droite = toutes les questions de la case choisie.</div></section>
  <a class="btn primary revbtn" href="#/rev/${t.id}">📖 Révision : cours${t.id === "nerf" ? " (et l'explorateur vertèbre → nerfs)" : t.id === "g" ? " de toutes les structures" : ""}</a>
  ${t.id === "g" && !SET.noMsp ? `<a class="card mspentry" href="#/msp"><span class="ri">🩺</span><span><b>Révisions MSP (kiné)</b><span class="small">Pathologies, QCM, cas cliniques et simulations d'examen. Progression séparée de l'anatomie ; animaux, enfants, croquettes et XP gagnés en commun.</span></span><span class="go" aria-hidden="true">›</span></a>` : ""}`;
}

// ---------- « Déjà eu bon » : 0 = toutes, 1 = eu bon directement, n ≥ 2 = ratées au moins n − 1 fois ----------
let OKN = 0; const okList = tab => questionsOf(tab).filter(q => status(q) === "ok"), okMax = L => Math.min(12, L.reduce((m, q) => Math.max(m, fails(PROG[q.id])), 0)), okIn = q => { const e = fails(PROG[q.id]); return OKN === 0 || (OKN === 1 ? e === 0 : e >= OKN - 1); };
const okTxt = n => n === 0 ? "Toutes" : n === 1 ? "Eu bon directement" : n === 2 ? "Ratées au moins 1 fois avant d'avoir bon" : `Ratées au moins ${n - 1} fois avant d'avoir bon`;
// ---------- Jouer avec le compagnon : questions réussies, mais pas du premier coup ----------
const replayable = () => QS.filter(q => { const p = PROG[q.id]; return p && p.r && (p.f !== undefined ? !p.f : (p.n || 0) > (p.ok || 0)); });
function startPlay(list, label) {
  const ids = compIds(), a = ANIMAL_BY_ID[ids[0]]; if (!a || !list.length) return; let l = shuffle(list.map(q => q.id)); if (SET.len < 100) l = l.slice(0, SET.len);
  MOOD = null; document.querySelector(".modal")?.remove(); startSession("menagerie", "ok", l, label || `Jeu avec ${ids.map(id => ANIMAL_BY_ID[id].name).join(" et ")}`); SESSION.play = a.id; SESSION.play2 = ids[1] || null; saveSession();
}
function endPlay(S) { // fin de partie : bonheur (pour les deux compagnons), et une croquette une fois par jour si on a répondu à 5 questions
  if (!S || !S.play || S.paid || !ANIMAL_BY_ID[S.play]) return; S.paid = true; const tk = todayKey(), n = S.ok + S.ko; if (!n) return;
  for (const id of [S.play, S.play2]) if (ANIMAL_BY_ID[id]) { const c = petCare(id); c.happiness = Math.min(100, (c.happiness || 0) + 5); } if (n >= 5 && DAILY.lastPlayDay !== tk) { DAILY.lastPlayDay = tk; DAILY.kibbles = (DAILY.kibbles || 0) + 1; S.playKib = true; } save(K_PET, PET); save(K_DAILY, DAILY);
}
// ---------- « C'est quoi X ? » : selon son âge, l'enfant pose 0, 1, 2 ou 3 questions par jour ----------
const KIDH = [.22, .27, .36, .46, .58, .8]; // taille de l'enfant par rapport au personnage, à chaque étape de sa vie
const ASKN = [0, 1, 1, 2, 3, 3], KIB_NERF = 25; // bébé : rien ; rampe : un nerf (25 croquettes) ; debout 1, joue 2, grand 3, encore plus grand 3 structures (un bonbon chacune)
const ASKABLE = Object.keys(QBY).filter(s => QBY[s].length >= 3 && !/^(Muscles? :|Insertions |Innervation|Mouvements|Muscles de |Muscles du )/i.test(s));
// un nerf et ce qui en découle : ses propres QCM (muscles, territoire, fonction…), puis ceux de ses branches, 20 au plus
const nerveKids = id => ((D.nerfs[id] || {}).children || []).flatMap(c => [c, ...nerveKids(c)]);
const nerveIds = id => { const own = (QBY[D.nerfs[id].nom] || []).map(q => q.id), br = nerveKids(id).flatMap(c => (QBY[D.nerfs[c].nom] || []).map(q => q.id)); return [...own, ...shuffle([...new Set(br)].filter(x => !own.includes(x)))].slice(0, Math.max(20, own.length)); };
const NERVES = Object.keys(D.nerfs || {}).filter(id => /^nerf /i.test(D.nerfs[id].nom) && nerveIds(id).length >= 3);
PET.candy = Math.max(0, PET.candy || 0);
function dailyAsk() { // la question en cours, ou null s'il n'y en a pas (ou plus) aujourd'hui
  const id = PET.kid; if (!id || !isHuman(id)) return null; const st = stgOf(id), lim = ASKN[st], tk = todayKey(); if (!lim) return null;
  let k = DAILY.ask; if (!k || k.day !== tk) k = DAILY.ask = { day: tk, n: 0, s: null, nerf: null, seen: k && k.s ? [k.s] : [] }; if (k.n === undefined) { k.n = k.done ? 1 : 0; k.seen = []; }
  if (k.n >= lim) return null;
  const f = st === 1 ? "nerf" : "s", pool = st === 1 ? NERVES : ASKABLE; if (!pool.length) return null;
  if (!pool.includes(k[f])) { const fresh = pool.filter(x => !k.seen.includes(x)); k[f] = pickOne(fresh.length ? fresh : pool); save(K_DAILY, DAILY); }
  return { nerf: st === 1, k: k[f], name: cap(st === 1 ? D.nerfs[k[f]].nom : k[f]), left: lim - k.n, st };
}
function startAsk() {
  const k = dailyAsk(); if (!k) return; const kid = PET.kid;
  startSession("corps", "todo", shuffle(k.nerf ? nerveIds(k.k) : QBY[k.k].map(q => q.id)), k.nerf ? `${k.name} : ce qui en découle` : `C'est quoi « ${k.name} » ?`);
  if (SESSION) { SESSION.ask = { k: k.k, day: todayKey(), kid, st: k.st, n: SESSION.ids.length }; saveSession(); render(); }
}
function askOver(S) { // cette question est jouée : on passe à la suivante (ou à demain)
  if (S.askCounted) return; S.askCounted = true; const k = DAILY.ask;
  if (k && k.day === S.ask.day) { k.n = (k.n || 0) + 1; k.seen = [...(k.seen || []), S.ask.k]; k.s = k.nerf = null; save(K_DAILY, DAILY); }
}
function endAsk(S) { // tout bon (sans effacer d'erreur ni s'arrêter avant la fin) : 25 croquettes pour le rampeur, un bonbon ensuite
  if (!S || !S.ask || S.askEnd || !(S.ok + S.ko)) return; S.askEnd = true;
  if (S.ok === S.ask.n && !S.ko && !S.erased && !S.askCounted) {
    if (S.ask.st === 1) { DAILY.kibbles = (DAILY.kibbles || 0) + KIB_NERF; S.kibWon = KIB_NERF; } else { PET.candy++; save(K_PET, PET); S.candyWon = true; }
    DAILY.joy = { day: todayKey(), kid: S.ask.kid }; askOver(S); save(K_DAILY, DAILY);
  }
}
// content de sa bonne réponse, le rampeur avance et l'enfant debout saute sur place (jusqu'au soir)
const joyCls = (id, big) => { if (!isHuman(id)) return ""; const j = DAILY.joy, st = stgOf(id); return j && j.day === todayKey() && j.kid === id && (st === 1 || st === 2) ? ` ${st === 1 ? "crawling" : ANIMAL_BY_ID[id].fauteuil ? "rolling" : "jumping"}${big ? " now" : ""}${PET.gear.keq.lieu ? "" : " free"}` : ""; };
const askNote = (id, ask) => { const st = stgOf(id), n = ask ? ask.left : 0; return st === 0 ? " · ses questions commenceront à 9 mois" : ask ? st === 1 ? ` · touche sa bulle : un nerf à connaître pour ${KIB_NERF} croquettes` : ` · ${plural(n, "question")} pour toi : touche sa bulle !` : " · ses prochaines questions : demain"; };
function eraseError() { // un bonbon efface la dernière erreur : la série de bonnes réponses continue
  const S = SESSION, u = S && S.undo; if (!u || S.answered == null || S.good || S.wiped || !(PET.candy > 0)) return;
  const id = S.ids[S.pos]; PET.candy--; if (u.p) PROG[id] = u.p; else delete PROG[id]; save(K_PROG, PROG); markSeen();
  PET.run = u.run; PET.petRun = u.petRun || 0; PET.bad = u.bad; if (!u.rate) PET.koCount = u.ko; save(K_PET, PET); syncUnlocks();
  S.ko--; S.erased = (S.erased || 0) + 1; S.wiped = true; S.wrong = (S.wrong || []).filter(x => x !== id); S.undo = null; S.say = "";
  document.querySelectorAll(".petpop").forEach(x => x.remove()); saveSession(); render(); toast(`🍬 Erreur effacée${PET.run ? ` : ta série continue (${PET.run} d'affilée) !` : " !"}`, "ok");
}
// ---------- Série de QCM ----------
const saveSession = () => save(K_SESS, SESSION && SESSION.pos < SESSION.ids.length ? { ...SESSION, ev: null } : null);
function startSession(tab, pool, ids, label) {
  let list;
  if (ids) list = ids.map(id => BY_ID[id]).filter(Boolean);
  else { list = shuffle(questionsOf(tab).filter(q => status(q) === pool)); if (pool === "ko") list.sort((a, b) => (PROG[a.id]?.t || 0) - (PROG[b.id]?.t || 0)); }
  if (SET.len < 100 && !ids) list = list.slice(0, SET.len);
  if (!list.length) return toast("Aucune question ici pour le moment.");
  SESSION = { tab, pool, label: label || POOLS[pool].label, ids: list.map(q => q.id), pos: 0, answered: null, opts: null, ok: 0, ko: 0, streak: 0, badRun: 0, res: [] };
  saveSession();
  if (location.hash === "#/quiz") { render(); window.scrollTo(0, 0); } else location.hash = "#/quiz";
}
function viewQuiz() {
  const S = SESSION;
  if (!S) return `<div class="card">Aucune série en cours. <a href="#/g">Retour</a></div>`;
  const back = "#/" + (S.tab || "g");
  if (S.pos >= S.ids.length) {
    const kid = S.ask && ANIMAL_BY_ID[S.ask.kid], tot = S.ok + S.ko, p = tot ? Math.round(S.ok / tot * 100) : 0, comp = ANIMAL_BY_ID[PET.companion] || ANIMAL_BY_ID[PET.flyer];
    return `<section class="card bilan"><h2>${S.play ? "Partie terminée" : "Série terminée"}</h2>${kid ? petSvg(kid, "pet-svg lg" + joyCls(kid.id, true), S.candyWon || S.kibWon ? { mood: "happy" } : {}) : comp ? petSvg(comp, "pet-svg lg") : ""}
      ${kid ? S.candyWon ? `<p class="big candyrow">${CANDY} ${esc(kid.name)} te donne un bonbon !</p><p class="small">« Maintenant je sais ce que c'est, merci ! » Le bonbon sert à effacer une erreur et à garder ta série. Tu en as ${PET.candy}.</p>` : S.kibWon ? `<p class="big candyrow">${KIB} ${esc(kid.name)} te donne ${S.kibWon} croquettes !</p>` : `<p>${S.askCounted ? `« Merci d'avoir essayé ! » Il faut tout réussir pour gagner ${S.ask.st === 1 ? "les croquettes" : "le bonbon"}.` : "« Tu m'expliques la suite plus tard ? » Reviens toucher la bulle quand tu veux aujourd'hui."}</p>` : ""}
      <p class="big">${S.ok} / ${tot} bonnes réponses${tot ? ` (${p} %)` : ""}</p>${tot ? progressBlock({ ok: S.ok, ko: S.ko, todo: 0, total: tot }) : ""}
      ${S.erased ? `<p class="small">🍬 ${plural(S.erased, "erreur effacée", "erreurs effacées")}</p>` : ""}${S.xp ? `<p class="big">✨ +${S.xp} XP gagnés</p>` : ""}${S.play && ANIMAL_BY_ID[S.play] && tot ? `<p>${esc(ANIMAL_BY_ID[S.play].name)} s'est bien amusé avec toi !${S.playKib ? ` ${KIB} +1 croquette` : ""}</p>` : ""}${S.won && S.won.length ? `<div class="wonrow">${S.won.map(w => w.t === "acc" ? `<span title="${esc(ACC_BY[w.id].name)}">${CORPS.thumb(ACC_BY[w.id])}</span>` : w.t === "gear" ? `<span title="${esc(GEAR.byId[w.id].name)}">${gearThumb(w.id)}</span>` : w.t === "pet" ? `<span>${petSvg(ANIMAL_BY_ID[w.id], "thumb", { bare: true })}</span>` : "").join("")}</div>` : ""}
      <div class="actions"><a class="btn primary" href="${back}">Retour</a>${S.ko ? `<button data-act="redoKo">Refaire mes erreurs (${S.ko})</button>` : ""}${/Android/i.test(navigator.userAgent) ? widgetBtn().replace("btn primary", "btn") : ""}</div></section>`;
  }
  const q = BY_ID[S.ids[S.pos]], f = D.fiches[q.s], ans = S.answered;
  if (!S.opts) {
    if (q.m) { const k = Math.min(q.m.length, 2 + Math.floor(Math.random() * 4)); S.opts = shuffle([...shuffle(q.m.slice()).slice(0, k), ...shuffle(q.d.slice()).slice(0, Math.max(2, 7 - k))]); S.sel = []; }
    else S.opts = shuffle([q.a, ...shuffle(q.d.slice()).slice(0, 3)]);
    saveSession();
  }
  const opts = S.opts.map((o, i) => {
    let cls = "";
    if (q.m) {
      const on = S.sel.includes(i), g = q.m.includes(o);
      if (ans != null) cls = g ? "good" : on ? "bad" : "dim"; else if (on) cls = "sel";
      const mark = ans != null ? (g && on ? "✔" : g ? "!" : on ? "✘" : "") : on ? "✔" : "";
      return `<button class="opt multi ${cls}" data-act="toggle" data-i="${i}" role="checkbox" aria-checked="${on}" ${ans != null ? "disabled" : ""}><span class="k">${mark}</span><span>${esc(cap(o))}${ans != null && g && !on ? " <i>(oubliée)</i>" : ""}</span></button>`;
    }
    if (ans != null) cls = o === q.a ? "good" : i === ans ? "bad" : "dim";
    return `<button class="opt ${cls}" data-act="answer" data-i="${i}" ${ans != null ? "disabled" : ""}><span class="k">${"ABCD"[i]}</span><span>${esc(cap(o))}</span></button>`;
  }).join("");
  let after = "";
  if (ans != null) {
    const good = S.good, ev = S.ev || {}, pet = ANIMAL_BY_ID[ev.pet], rate = ANIMAL_BY_ID[ev.rate], gift = GIFT.byId[ev.gift];
    const gar = gift ? gift.cat === "decor" ? GIFT.sceneThumb(gift.v) : `<span class="uth">${persoSvg({ hair: gift.v, worn: [], crop: "tete", cls: "thumb" })}</span>` : "";
    const gcard = (id, why) => `<a class="unlock" href="#/corps"><span class="uth">${gearThumb(id)}</span><span><b>Pour ton compagnon : ${esc(GEAR.byId[id].name)} !</b><span class="small">${why}</span></span></a>`;
    after = `<div class="verdict ${good ? "ok" : S.wiped ? "wiped" : "ko"}">${good ? "✔ Bonne réponse" : S.wiped ? "🍬 Erreur effacée" : "✘ Mauvaise réponse"}${S.gain ? `<span class="xp">+${S.gain} XP</span>` : ""}${PET.run >= 3 ? `<span class="streak">🔥 ${PET.run} d'affilée</span>` : ""}</div>
      ${!good && !S.wiped && S.undo && PET.candy > 0 ? `<button class="candybtn" data-act="erase">${CANDY}<span><b>Effacer cette erreur avec un bonbon</b><span class="small">${S.undo.run ? `Ta série de ${plural(S.undo.run, "bonne réponse", "bonnes réponses")} continue` : "Elle ne comptera pas"} · il t'en reste ${PET.candy}</span></span></button>` : ""}
      ${(ev.fresh || []).map(id => ACC_BY[id]).map(a => `<a class="unlock" href="#/zone/${a.z}"><span class="uth">${CORPS.thumb(a, { look: BODY.look })}</span><span><b>Accessoire : ${esc(a.name)} !</b><span class="small">${esc(ZONES[a.z])} · ${zstat(a.z).p} % réussis · Voir ›</span></span></a>`).join("")}
      ${pet ? `<a class="unlock" href="#/menagerie">${petSvg(pet, "pet-svg mini", { bare: true })}<span><b>Nouvel animal : ${esc(pet.name)} !</b><span class="small">${esc(pet.species)} · ${PET.got.length}/${ANIMALS.length}</span></span></a>` : ""}
      ${ANIMAL_BY_ID[ev.kid] ? `<a class="unlock" href="#/garderie">${petSvg(ANIMAL_BY_ID[ev.kid], "pet-svg mini", { bare: true })}<span><b>Nouvel enfant à la garderie : ${esc(ANIMAL_BY_ID[ev.kid].name)} !</b><span class="small">${PET.kids.length}/${KIDS.length} enfants</span></span></a>` : ""}
      ${ev.kib50 ? `<a class="unlock" href="#/corps">${KIB}<span><b>+${KIB50} croquettes !</b><span class="small">${KIB50_EVERY} bonnes réponses</span></span></a>` : ""}
      ${rate ? `<a class="unlock" href="#/menagerie">${petSvg(rate, "pet-svg mini", { bare: true })}<span><b>Surprise : ${esc(rate.name)} !</b><span class="small">Un animal un peu raté, mais plein de charme</span></span></a>` : ""}
      ${ev.gear10 ? gcard(ev.gear10, "10 bonnes réponses d'affilée") : ""}${(ev.gearLv || []).map(id => gcard(id, "Cadeau de niveau")).join("")}
      ${ev.kibble ? `<a class="unlock" href="#/corps">${KIB}<span><b>+1 croquette !</b><span class="small">À donner à ton compagnon</span></span></a>` : ""}
      ${gift ? `<a class="unlock" href="#/corps">${gar}<span><b>Cadeau surprise : ${esc(gift.name)} !</b><span class="small">${esc(GIFT.CATS[gift.cat])}</span></span></a>` : ""}
      ${S.lvUp ? `<a class="unlock" href="#/corps"><span class="lvbadge">${S.lvUp}</span><span><b>Niveau ${S.lvUp} !</b><span class="small">${esc(title(S.lvUp))} · +${KIB_LEVEL} croquettes</span></span></a>` : ""}
      ${good ? "" : `<div class="expl"><b>Réponse attendue :</b> ${esc(cap(q.m ? S.opts.filter(o => q.m.includes(o)).join(" ; ") : q.a))}</div>`}
      ${q.m && q.m.length > S.opts.filter(o => q.m.includes(o)).length ? `<div class="expl"><b>Liste complète du cours :</b> ${esc(q.a)}</div>` : ""}
      ${q.x ? `<div class="expl">${esc(q.x)}</div>` : ""}<div class="small src">📄 Source : ${esc(srcText(q.src))}</div>
      ${f ? `<details><summary>Fiche complète : ${esc(cap(q.s))}</summary>${webImg(f)}${galImg(f)}${trajets(q.s)}${ficheList(f)}${palpaBlocks(f)}${f.imgs && f.imgs.length ? `<details><summary>📑 Photos du cours (${f.imgs.length})</summary><div class="pics big">${imgTags(f.imgs)}</div></details>` : ""}</details>` : ""}
      <div class="actions sticky"><button class="primary grow" data-act="next" id="nextBtn">${S.pos + 1 < S.ids.length ? "Question suivante →" : "Voir le bilan"}</button></div>`;
  }
  const done = S.ok + S.ko, n = S.ids.length;
  return `<div class="qbar"><button class="quit" data-act="stop" aria-label="Quitter la série">✕ Quitter</button>
      <div class="qprog" role="img" aria-label="Question ${S.pos + 1} sur ${n}"><div class="g" style="width:${pct(S.ok, n)}%"></div><div class="r" style="width:${pct(S.ko, n)}%"></div></div><span class="small qn">${S.pos + 1} / ${n}</span></div>
    <div class="qmeta small"><span class="qlab">${S.play && ANIMAL_BY_ID[S.play] ? `<span class="playpet ${ans != null && S.good ? "happy" : ""}">${petSvg(ANIMAL_BY_ID[S.play], "pet-svg", ans != null && S.good ? { mood: "happy" } : {})}</span>` : S.ask && ANIMAL_BY_ID[S.ask.kid] ? `<span class="playpet">${petSvg(ANIMAL_BY_ID[S.ask.kid], "pet-svg", ans != null && S.good ? { mood: "happy" } : {})}</span>` : ""}${esc(S.label)}</span><span><b class="cok">✔ ${S.ok}</b> &nbsp;<b class="cko">✘ ${S.ko}</b></span></div>
    <section class="card qcard"><div class="qtop"><span class="tag">${CAT_LABEL[q.c]}${norm(q.a) === norm(q.s) && ans == null ? "" : " · " + esc(cap(q.s))}</span><button class="flag ${FLAGS[q.id] ? "on" : ""}" data-act="flag">🚩 ${FLAGS[q.id] ? "Signalée" : "Signaler"}</button></div>
      <div class="qtext">${esc(q.q)}</div>${q.img ? `<div class="pics">${imgTags(q.img)}</div>` : ""}
      ${q.m ? `<div class="small multi-hint">Plusieurs bonnes réponses : coche-les toutes, puis valide.</div>` : ""}
      <div class="opts">${opts}</div>
      ${q.m && ans == null ? `<div class="actions sticky"><button class="primary grow" data-act="valid" id="nextBtn" ${S.sel.length ? "" : "disabled"}>Valider (${S.sel.length})</button></div>` : ""}${after}</section>`;
}
function answer(i) {
  const S = SESSION; if (!S || S.answered != null) return;
  const q = BY_ID[S.ids[S.pos]]; S.answered = i;
  const good = S.good = q.m ? S.opts.every((o, j) => q.m.includes(o) === S.sel.includes(j)) : S.opts[i] === q.a;
  S.wiped = false; S.undo = good ? null : { p: PROG[q.id] ? { ...PROG[q.id] } : null, run: PET.run, petRun: PET.petRun, bad: PET.bad, ko: PET.koCount };
  const lv0 = level(xp()), again = !!PROG[q.id]?.r, p = PROG[q.id] || { n: 0, ok: 0 };
  note(p, good); if (!p.n) p.f = good ? 1 : 0; p.n = (p.n || 0) + 1; p.ok = (p.ok || 0) + (good ? 1 : 0); p.r = good ? 1 : 0; p.t = Date.now(); PROG[q.id] = p; save(K_PROG, PROG); markSeen();
  if (good && again) { WARD.spent = (WARD.spent || 0) + 5; save(K_WARD, WARD); } // question déjà maîtrisée : 5 XP à dépenser au lieu de 10
  S.ev = good ? goodAnswer() : badAnswer(); if (S.undo) S.undo.rate = !!S.ev.rate; if (!good && S.ask) askOver(S); S.ev.fresh = syncUnlocks().map(a => a.id);
  S.say = ""; if (good && PET.run % 10 === 0) S.say = S.ev.gear10 ? `Bravo ! ${PET.run} d'affilée, et regarde ce que j'ai gagné !` : `Bravo ! ${PET.run} d'affilée !`; else if (good && PET.run % 5 === 0) S.say = "Bravo !"; else if (!good && PET.bad > 7) S.say = COURAGE[PET.bad % COURAGE.length];
  S.gain = (good ? 10 : 0) + S.ev.fresh.length * 25; S.xp = (S.xp || 0) + S.gain;
  const lv1 = level(xp()); S.lvUp = lv1 > lv0 ? lv1 : 0; S.ev.gearLv = syncLevel();
  S.won ||= []; S.ev.fresh.forEach(id => S.won.push({ t: "acc", id })); for (const id of [S.ev.pet, S.ev.rate, S.ev.kid]) if (id) S.won.push({ t: "pet", id }); for (const id of [S.ev.gear10, ...S.ev.gearLv]) if (id) S.won.push({ t: "gear", id });
  if (good && S.play) { for (const id of [S.play, S.play2]) if (ANIMAL_BY_ID[id]) { const c = petCare(id); c.happiness = Math.min(100, (c.happiness || 0) + 2); } save(K_PET, PET); }
  if (good) S.ok++; else { S.ko++; (S.wrong ||= []).push(q.id); }
  saveSession(); render(); petSays(S.say);
}

// ---------- Mon corps d'anat ----------
let ZOPEN = null, TAB2 = "coiffure";
// place du compagnon : l'espace libre à droite du corps habillé (mesuré), sans jamais le recouvrir ; le décor et le cadrage ne bougent pas.
// Chaque dessin est mis à l'échelle d'après sa taille réelle : personne n'est minuscule, ratés compris.
const FLY = a => !a.rate && (/^(songbird|parrot|owl|raptor|bat|butterfly|libellule|pigeon)$/.test(a.kind) || a.kind === "insect" && (a.o.fly || a.o.bee) || a.o.ptero || a.o.phoenix);
{ const c0 = ANIMAL_BY_ID[PET.companion]; if (c0 && FLY(c0)) { if (!PET.flyer || PET.flyer === c0.id) PET.flyer = c0.id; PET.companion = null; save(K_PET, PET); } } // ancienne version : un animal volant occupait la place du compagnon terrestre
function fitStage() {
  const st = document.querySelector(".stage.duo2"), sv = st && st.querySelector("svg.perso"), kb = st && st.querySelector(".stagepet.kidbox"), pb = st && st.querySelector(".stagepet:not(.kidbox):not(.flyer)"), fb = st && st.querySelector(".stagepet.flyer"); if (!sv || !kb && !pb && !fb) return;
  const m = sv.getScreenCTM(); if (!m || !m.a) return;
  let right = 320, low = 140, air = 118; // bord droit du corps habillé ; bord gauche près du sol ; bord gauche à hauteur de tête
  sv.querySelectorAll(".breathe path,.breathe ellipse,.breathe circle,.breathe rect,.breathe text,.breathe line,.breathe polygon").forEach(e => {
    if (e.closest("defs,clipPath,pattern") || e.hasAttribute("clip-path") || e.closest("[clip-path]")) return;
    const r = e.getBoundingClientRect(); if (!r.width && !r.height) return; const x0 = (r.left - m.e) / m.a, x1 = (r.right - m.e) / m.a, y0 = (r.top - m.f) / m.d, y1 = (r.bottom - m.f) / m.d;
    if (y1 > 235) right = Math.max(right, x1); if (y1 > 462) low = Math.min(low, x0); if (y0 < 150) air = Math.min(air, x0);
  });
  right = Math.min(right + 8, 410);
  const b = st.getBoundingClientRect(), rx = m.a * right + m.e, rw = b.right - 4 - rx, floor = y => Math.max(0, b.bottom - (m.d * y + m.f)), put = (s, x, y) => { s.style.left = x + "px"; s.style.bottom = floor(y) + "px"; };
  const fit = (s, D, maxW, maxH, noSh) => {
    const art = s.querySelector(".petart"); if (!art) return; const hum = !s.classList.contains("baby") && art.querySelector(".hum"), k = (hum || art).getBBox(); if (!k.width || !k.height) return;
    const baby = s.classList.contains("baby"), sd = s.firstElementChild; // l'ombre se place juste sous le dessin
    if (sd && sd.tagName === "ellipse") { sd.setAttribute("cx", k.x + k.width / 2); sd.setAttribute("cy", k.y + k.height - 1); sd.setAttribute("rx", noSh ? 0 : k.width * .42); sd.setAttribute("ry", noSh ? 0 : Math.min(8, k.width * .05)); }
    // un grand accessoire (château, ailes…) se réduit derrière l'animal plutôt que de le rapetisser
    const gb = s.querySelector(".gearb"), gq = gb && gb.getBBox(), want = hum ? D / k.height : D / Math.sqrt(k.width * k.height), gz = gq && gq.width ? Math.min(1, Math.max(.76, maxW / want / gq.width)) : 1;
    if (gz < 1) gb.setAttribute("transform", `translate(100 190) scale(${gz.toFixed(3)}) translate(-100 -190)`);
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; [...s.children].forEach(c => { if (c.tagName === "title" || c.tagName === "defs" || baby && c !== art) return; const q = c.getBBox(); if (!q.width && !q.height) return; const z = c === gb ? gz : 1, X = v => 100 + (v - 100) * z, Y = v => 190 + (v - 190) * z; x0 = Math.min(x0, X(q.x)); y0 = Math.min(y0, Y(q.y)); x1 = Math.max(x1, X(q.x + q.width)); y1 = Math.max(y1, Y(q.y + q.height)); });
    x0 -= 3; y0 -= 3; x1 += 3; y1 += 3; const W = x1 - x0, H = y1 - y0, q = Math.min(want, maxW / W, maxH / H);
    s.setAttribute("viewBox", `${x0} ${y0} ${W} ${H}`); s.style.width = W * q + "px"; s.style.height = H * q + "px";
  };
  const place = (box, x, w) => { box.style.left = x - b.left + "px"; box.style.right = "auto"; box.style.width = w + "px"; };
  // une famille d'animaux posée sur le même sol (ou en vol) : le parent, et les bébés à côté, un peu devant
  const family = (box, a, x, w, P, maxH, dy, fly) => {
    place(box, x, w); const babies = [...box.querySelectorAll(".pet-svg.baby")], n = babies.length, main = box.querySelector(".pet-svg:not(.baby)");
    babies.forEach((s, i) => fit(s, P * .31 * babyZ(a.id, i), w * .36, P * .4, fly));
    if (main) { fit(main, P * .66 * petZ(a) * (n ? .97 : 1), w, maxH, fly); const mw = parseFloat(main.style.width); put(main, n === 1 || n === 3 ? w - mw : (w - mw) / 2, (n ? 632 : 640) - dy); }
    babies.forEach((s, i) => { const bw = parseFloat(s.style.width); put(s, i === 0 ? 0 : i === n - 1 ? w - bw : w * (n === 3 ? .25 : i / (n - 1)), (i === 1 && n === 3 ? 652 : 648) - dy); });
  };
  if (kb) { const kid = ANIMAL_BY_ID[PET.kid], main = kb.querySelector(".pet-svg"); place(kb, rx, rw); // l'enfant se mesure au personnage (618 de haut)
    if (main) { fit(main, 618 * m.d * KIDH[stgOf(kid.id)], rw, b.height * .86); put(main, (rw - parseFloat(main.style.width)) / 2, 640); }
    const bub = st.querySelector(".askbubble"), hum = main && main.querySelector(".hum"); // bulle au-dessus de la tête de l'enfant, à droite du visage du personnage
    if (bub && hum) { const r = hum.getBoundingClientRect(), x = m.a * ((r.top - m.f) / m.d < 175 ? 284 : right) + m.e; bub.style.maxWidth = b.right - x - 10 + "px"; bub.style.bottom = Math.min(b.bottom - r.top + 9, b.height - bub.offsetHeight - 4) + "px"; bub.style.right = Math.max(6, Math.min(b.right - (r.left + r.width / 2) - bub.offsetWidth / 2, b.right - x - bub.offsetWidth)) + "px"; } }
  if (pb) { const a = ANIMAL_BY_ID[PET.companion], x0 = b.left + 4;
    if (!kb) family(pb, a, rx, rw, Math.min(rw, b.height * .5), b.height * .66, 0, false);
    else { // avec un enfant : le compagnon, plus petit, passe à gauche du personnage (au sol, ou en l'air s'il vole)
      const la = m.a * (air - 8) + m.e - x0, lg = m.a * (low - 8) + m.e - x0;
      if (FLY(a) && la > 74 * m.a) family(pb, a, x0, la, Math.min(la, 130 * m.a), 150 * m.d, 520, true);
      else if (lg > 74 * m.a) family(pb, a, x0, lg, Math.min(lg * 1.15, 170 * m.a), 170 * m.d, 0, false);
      else { const w = Math.min(rw * .46, 130 * m.a); family(pb, a, rx, w, w, 130 * m.d, -6, false); pb.classList.add("front"); } // tenue très large : devant l'enfant, sans cacher le personnage
    } }
  if (fb) { const a = ANIMAL_BY_ID[PET.flyer], x0 = b.left + 4, la = Math.max(m.a * (air - 8) + m.e - x0, 74 * m.a); // l'animal volant, en l'air à gauche de la tête
    family(fb, a, x0, la, Math.min(la, 130 * m.a), 150 * m.d, 520, true); }
}
addEventListener("resize", fitStage);
function zonePanel(z) {
  const s = zstat(z), left = s.total - s.ok, got = gotIn(z), n = got.length;
  const nextMiss = Math.max(1, Math.ceil((n + 1) * s.total / STEPS - 1e-9) - s.ok);
  const cards = got.map(a => `<button class="acc ${isEq(a) ? "on" : ""}" data-act="equip" data-id="${a.id}" aria-pressed="${isEq(a)}"><span class="ath">${CORPS.thumb(a, { look: BODY.look, hair: eqv("coiffure") || "long" })}</span><b>${esc(a.name)}</b><span class="st">${isEq(a) ? "✔ Porté" : "Mettre"}</span></button>`).join("")
    + Array.from({ length: STEPS - n }, (_, i) => `<div class="acc lock ${i ? "" : "next"}"><span class="ath">${LOCK}</span><b>${(n + i + 1) * 5} %</b><span class="st">${i ? "Surprise" : `encore ${nextMiss}`}</span></div>`).join("");
  const pools = [["ko", s.ko], ["todo", s.todo], ["ok", s.ok]];
  return `<div class="zpanel"><div class="ztop"><div class="zprev">${persoSvg({ view: z === "dos" ? "b" : "f", crop: z, cls: "thumb" })}</div>
    <div class="zinfo"><p class="big">${s.ok} QCM réussis sur ${s.total} (${s.p} %)</p>${progressBlock(s)}
      <button class="primary" data-act="zoneQuiz" data-z="${z}" ${left ? "" : "disabled"}>${left ? `M'interroger sur cette zone (${left} à réussir)` : "Zone maîtrisée à 100 % 👑"}</button>
      <div class="chips">${pools.map(([k, c]) => `<button data-act="zonePool" data-z="${z}" data-pool="${k}" ${c ? "" : "disabled"}>${k === "ko" ? "Échecs" : k === "todo" ? "Pas encore" : "Déjà eu bon"} (${c})</button>`).join("")}</div></div></div>
    <div class="accttl"><b>Accessoires : ${n}/${STEPS}</b><span class="small">un au hasard tous les 5 %${n < STEPS ? ` · prochain dans ${plural(nextMiss, "bonne réponse", "bonnes réponses")}` : ""}</span></div>
    <div class="accgrid">${cards}</div></div>`;
}
const LOCK = `<svg viewBox="0 0 60 60" class="lockico" aria-hidden="true"><path d="M20 28v-8a10 10 0 0 1 20 0v8" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><rect x="13" y="27" width="34" height="26" rx="8" fill="currentColor"/><circle cx="30" cy="38" r="4" fill="var(--card)"/><path d="M30 40v6" stroke="var(--card)" stroke-width="4" stroke-linecap="round"/></svg>`;
// section repliée : seul le titre est construit, le contenu se dessine à l'ouverture
const foldShut = (id, head) => `<details class="card fold" id="${id}"><summary>${head}</summary></details>`;
function giftPanel() {
  if (!OPENS.gifts) return foldShut("gifts", `Coiffures et décors <span class="small">${DAILY.got.length}/${GIFT.REWARDS.length}</span>`);
  const cats = Object.entries(GIFT.CATS), list = GIFT.REWARDS.filter(r => r.cat === TAB2 && DAILY.got.includes(r.id)), cur = DAILY.equipped[TAB2];
  const prev = r => r.cat === "decor" ? GIFT.sceneThumb(r.v) : persoSvg({ hair: r.v, worn: [], crop: "tete", cls: "thumb" });
  return `<details class="card fold" id="gifts" ${OPENS.gifts ? "open" : ""}><summary>Coiffures et décors <span class="small">${DAILY.got.length}/${GIFT.REWARDS.length}</span></summary><p class="small">Un offert au hasard chaque jour dès 5 bonnes réponses, ou à acheter tout de suite. ${DAILY.got.length}/${GIFT.REWARDS.length} obtenus · 💎 ${wallet().toLocaleString("fr")} XP à dépenser</p>
    <div class="chips">${cats.map(([k, l]) => `<button data-act="gtab" data-k="${k}" class="${TAB2 === k ? "on" : ""}">${l}</button>`).join("")}</div>
    <div class="accgrid gifts"><button class="acc ${cur ? "" : "on"}" data-act="gift" data-id=""><span class="ath">${TAB2 === "coiffure" ? persoSvg({ hair: "long", worn: [], crop: "tete", cls: "thumb" }) : GIFT.sceneThumb("none")}</span><b>${TAB2 === "coiffure" ? "Cheveux longs" : "Décor simple"}</b><span class="st">${cur ? "Choisir" : "✔ Choisi"}</span></button>
    ${list.map(r => `<button class="acc ${cur === r.id ? "on" : ""}" data-act="gift" data-id="${r.id}"><span class="ath">${prev(r)}</span><b>${esc(r.name)}</b><span class="st">${cur === r.id ? "✔ Choisi" : "Choisir"}</span></button>`).join("")}
    ${GIFT.REWARDS.filter(r => r.cat === TAB2 && !DAILY.got.includes(r.id)).map(r => `<button class="acc" data-act="giftBuy" data-id="${r.id}"><span class="ath">${prev(r)}</span><b>${esc(r.name)}</b><span class="st ${wallet() < r.price ? "poor" : ""}">${r.price} XP</span></button>`).join("")}</div></details>`;
}
// ---------- Garde-robe : boutique et essayage ----------
let WTAB = "top", WUNI = "";
const OPENS = { shop: false, gifts: false, moi: false, gear: false, zprog: false, mfind: false, klist: false, pkshop: false }; // sections déroulées
const itemOn = i => FABCATS.includes(i.cat) ? WARD.fab[i.cat] === i.id : WARD.eq[i.s] === i.id;
function useItem(i, on = !itemOn(i)) { if (FABCATS.includes(i.cat)) { if (on) WARD.fab[i.cat] = i.id; else delete WARD.fab[i.cat]; save(K_WARD, WARD); } else wear(i, on); }
function tryOn(i, o = {}) { // le personnage portant cet article
  const fab = { ...WARD.fab }, base = { look: BODY.look, hair: eqv("coiffure") || "long", crop: "thorax", vb: SHOP.vb(i), cls: "thumb", label: i.name, worn: [], ...o };
  if (FABCATS.includes(i.cat)) fab[i.cat] = i.id; else base.worn = [i]; return CORPS.svg({ ...base, ...fabOpts(fab) });
}
function shopPanel() {
  if (!OPENS.shop) return foldShut("shop", `Ma garde-robe <span class="small">${WARD.got.length}/${SHOP.items.length} · 💎 ${wallet().toLocaleString("fr")} XP</span>`);
  const L = level(xp()), W = wallet(), list = SHOP.items.filter(i => i.cat === WTAB), own = list.filter(i => WARD.got.includes(i.id)).length, free = FABCATS.includes(WTAB);
  const card = i => { const got = WARD.got.includes(i.id), on = got && itemOn(i), lock = !got && L < i.lvl; return `<button class="acc ${on ? "on" : ""} ${lock ? "tooLow" : ""}" data-act="wItem" data-id="${i.id}" ${lock ? "disabled" : ""}><span class="ath">${tryOn(i)}</span><b>${esc(i.name)}</b><span class="st ${!got && !lock && W < i.price ? "poor" : ""}">${on ? "✔ Porté" : got ? "Mettre" : lock ? `Niveau ${i.lvl}` : `${i.price} XP`}</span></button>`; };
  const us = [...new Set(list.map(i => i.uni).filter(Boolean))], U = us.includes(WUNI) ? WUNI : "", shown = list.filter(i => U ? i.uni === U : !i.uni), colr = i => i.col || (i.fab && i.fab.fill);
  const groups = U ? "" : us.map(u => { const G = list.filter(i => i.uni === u), r = G.find(i => WARD.got.includes(i.id) && itemOn(i)) || G.find(i => WARD.got.includes(i.id)) || G[3] || G[0], on = WARD.got.includes(r.id) && itemOn(r); return `<button class="acc grp ${on ? "on" : ""}" data-act="wUni" data-k="${esc(u)}"><span class="ath">${tryOn(r)}</span><b>${esc(u)}</b><span class="udots">${G.slice(0, 9).map(i => `<i style="background:${colr(i)}"></i>`).join("")}</span><span class="st">${on ? "✔ Porté · " : ""}${G.length} couleurs ›</span></button>`; }).join("");
  const uh = U ? `<div class="unih"><button class="sm" data-act="wUni" data-k="">‹ Retour</button><b>${esc(U)}</b></div><div class="usws">${shown.map(i => { const got = WARD.got.includes(i.id); return `<button class="usw ${got ? "got" : ""} ${got && itemOn(i) ? "on" : ""}" style="background:${colr(i)}" data-act="wItem" data-id="${i.id}" aria-label="${esc(i.name)}" title="${esc(i.name)}">${got ? "✔" : ""}</button>`; }).join("")}</div>` : "";
  return `<details class="card fold" id="shop" ${OPENS.shop ? "open" : ""}><summary>Ma garde-robe <span class="small">${WARD.got.length}/${SHOP.items.length} · 💎 ${W.toLocaleString("fr")} XP</span></summary><p class="wal">💎 <b>${W.toLocaleString("fr")} XP</b> à dépenser</p><p class="small">Une bonne réponse rapporte 10 XP à dépenser (5 si la question était déjà réussie), un accessoire 25. Acheter ne fait jamais baisser ton niveau. ${WARD.got.length}/${SHOP.items.length} articles.</p>
    <div class="chips">${Object.entries(SHOP.CATS).map(([k, [l]]) => `<button data-act="wTab" data-k="${k}" class="${WTAB === k ? "on" : ""}">${l}</button>`).join("")}</div><p class="small">${own}/${list.length} dans cette catégorie</p>
    ${uh}<div class="accgrid" id="wgrid">${free && !U ? `<button class="acc ${WARD.fab[WTAB] ? "" : "on"}" data-act="wFree"><span class="ath">${CORPS.svg({ look: BODY.look, hair: eqv("coiffure") || "long", crop: "thorax", vb: SHOP.vb(list[0]), cls: "thumb", worn: [], ...fabOpts({ ...WARD.fab, [WTAB]: null }) })}</span><b>${WTAB[0] === "d" ? "Sans dessin" : "Toute simple"}</b><span class="st">${WARD.fab[WTAB] ? "Mettre" : "✔ Porté"}</span></button>` : ""}${groups}${shown.slice().sort((a, b) => WARD.got.includes(b.id) - WARD.got.includes(a.id) || a.lvl - b.lvl || a.price - b.price).map(card).join("")}</div></details>`;
}
function buyModal(i) {
  const W = wallet(), can = W >= i.price, miss = i.price - W;
  const wornTry = FABCATS.includes(i.cat) ? worn().filter(w => !(i.cat.endsWith("top") ? ["haut", "robe", "gilet", "broche"] : ["bas", "robe", "ceinture-b"]).includes(w.s)) : [...worn().filter(w => !clash(i.s).includes(w.s) && !(i.cat === "robe" && w.s === "gilet")), i];
  modal(`<h2>${esc(i.name)}</h2><div class="tryon">${CORPS.svg({ look: BODY.look, hair: eqv("coiffure") || "long", worn: wornTry, vb: "40 -62 320 700", cls: "thumb", ...fabOpts(FABCATS.includes(i.cat) ? { ...WARD.fab, [i.cat]: i.id } : WARD.fab) })}</div><p class="big">${i.price} XP</p><p class="small">${can ? `Il te restera ${(W - i.price).toLocaleString("fr")} XP à dépenser. Ton niveau ne change pas.` : `Il te manque ${miss.toLocaleString("fr")} XP, soit environ ${plural(Math.ceil(miss / 10), "bonne réponse", "bonnes réponses")}.`}</p><div class="actions center">${can ? `<button class="primary" data-act="wBuy" data-id="${i.id}">Acheter</button>` : ""}<button data-act="closeM">${can ? "Pas maintenant" : "Fermer"}</button></div>`);
}
// ---------- Accessoires du compagnon ----------
let GTAB = "tete";
function gearPanel() {
  if (!OPENS.gear) return foldShut("gear", `Accessoires du compagnon <span class="small">${PET.gear.got.length}/${GEAR.list.length}</span>`);
  const n = s => PET.gear.got.filter(id => GEAR.byId[id].s === s).length, t = s => GEAR.list.filter(g => g.s === s).length;
  const list = PET.gear.got.map(id => GEAR.byId[id]).filter(g => g.s === GTAB), cur = gearSet()[GTAB], L = level(xp());
  return `<details class="card fold" id="gear" ${OPENS.gear ? "open" : ""}><summary>Accessoires du compagnon <span class="small">${PET.gear.got.length}/${GEAR.list.length}</span></summary><p class="small">${PET.gear.got.length}/${GEAR.list.length} trouvés. Un à chaque niveau (prochain au niveau ${L + 1}) et un toutes les 10 bonnes réponses d'affilée (${PET.run % 10}/10).</p>
    ${PET.kid ? `<div class="chips who"><button data-act="gearWho" data-k="pet" class="${GWHO === "pet" ? "on" : ""}">🐾 Compagnon</button><button data-act="gearWho" data-k="kid" class="${GWHO === "kid" ? "on" : ""}">🧒 Enfant</button></div>` : ""}<div class="chips">${Object.entries(GEAR.SLOTS).map(([k, l]) => `<button data-act="gearTab" data-k="${k}" class="${GTAB === k ? "on" : ""}">${l} <span class="small">${n(k)}/${t(k)}</span></button>`).join("")}</div>
    <div class="accgrid">${list.map(g => `<button class="acc ${cur === g.id ? "on" : ""}" data-act="gearEq" data-id="${g.id}" aria-pressed="${cur === g.id}"><span class="ath">${gearThumb(g.id)}</span><b>${esc(g.name)}</b><span class="st">${cur === g.id ? "✔ Porté" : "Mettre"}</span></button>`).join("")}
    ${Array.from({ length: Math.min(6, t(GTAB) - list.length) }, () => `<div class="acc lock"><span class="ath">${LOCK}</span><b>Surprise</b></div>`).join("")}</div>
    ${Object.keys(gearSet()).length ? `<div class="actions"><button class="sm" data-act="gearOff">Tout retirer</button><button class="sm" data-act="gearRnd">Tenue au hasard</button></div>` : PET.gear.got.length ? `<div class="actions"><button class="sm" data-act="gearRnd">Tenue au hasard</button></div>` : ""}</details>`;
}
// ---------- Galerie de tableaux ----------
let GALOPEN = false;
function galleryPanel() {
  const all = Object.keys(GIFT.TAB).length;
  return `<details class="card gal" id="gal" ${GALOPEN ? "open" : ""}><summary>Mes tableaux (${TAB.got.length}/${all})</summary><p class="small">Un nouveau tableau chaque jour où tu ouvres l'application. Touche celui que tu veux exposer.</p>
    <div class="galgrid">${TAB.got.slice().reverse().map(id => GIFT.TAB[id]).map(a => `<button class="galitem ${TAB.cur === a.id ? "on" : ""}" data-act="expose" data-id="${a.id}">${GIFT.painting(a.id, 104)}${artCap(a)}${TAB.cur === a.id ? `<span class="st">✔ Exposé</span>` : ""}</button>`).join("")}</div>
    ${TAB.got.length ? `<details><summary class="small">Crédits des images</summary><ul class="facts">${TAB.got.map(id => GIFT.TAB[id]).map(a => `<li><b>${esc(a.name)}</b>${artCredit(a)}</li>`).join("")}</ul></details>` : ""}</details>`;
}
let MOOD = null;
function viewCorps() {
  syncUnlocks(); syncDaily();
  const v = BODY.view === "b" ? "b" : "f", comp = ANIMAL_BY_ID[PET.companion], flyer = PET.flyer && PET.flyer !== PET.companion ? ANIMAL_BY_ID[PET.flyer] : null, kid = ANIMAL_BY_ID[PET.kid], c = comp ? petCare(comp.id) : null, art = GIFT.TAB[TAB.cur];
  const fed = c ? (c.fedDays || 0) % FEED_FOR_BABY : 0, full = c && (c.babies || 0) >= MAX_BABIES, stg = c ? stgOf(comp.id) : 0, ask = dailyAsk();
  const look = (k, l) => `<div class="lookrow"><span>${l}</span>${CORPS.LOOKS[k].map(x => `<button class="sw ${BODY.look[k] === x ? "on" : ""}" style="background:${x}" data-act="look" data-k="${k}" data-v="${x}" aria-label="${l} ${x}"></button>`).join("")}</div>`;
  return `${resumeBanner()}<div class="duo"><section class="card serie"><span>Série quotidienne</span><b>🔥 ${DAILY.streak || 0} ${DAILY.streak > 1 ? "JOURS" : "JOUR"}</b></section>
    <section class="cadre">${art ? `<button class="nav" data-act="artNav" data-d="-1" aria-label="Tableau précédent" ${TAB.got.length > 1 ? "" : "disabled"}>‹</button><button class="cadrein" data-act="galOpen" aria-label="Changer de tableau"><img class="artimg" data-art="${art.id}" alt="${esc(art.name)}"><span><b>${esc(art.name)}</b><span class="small">${esc(art.by)}</span></span></button><button class="nav" data-act="artNav" data-d="1" aria-label="Tableau suivant" ${TAB.got.length > 1 ? "" : "disabled"}>›</button>` : `<span class="small">Ton premier tableau arrive demain</span>`}</section></div>
  <section class="card"><div class="lvrow">${lvBlock()}</div>${dailyStrip()}</section>
  <section class="card stagecard"><div class="subtabs">${[["f", "Face"], ["b", "Dos"]].map(([k, l]) => `<button data-act="bview" data-v="${k}" class="${v === k ? "on" : ""}">${l}</button>`).join("")}</div>
    <div class="stage ${comp || kid || flyer ? "duo2" : ""}">${persoSvg({ view: v, behind: GIFT.scene(eqv("decor") || "none"), click: true, names: ZONES, sel: ZOPEN, vb: comp || kid || flyer ? "-10 -62 640 716" : "-40 -62 480 716" })}
      ${art ? `<div class="hang">${GIFT.painting(art.id, 74)}</div>` : ""}
      ${kid ? `<div class="stagepet kidbox">${petSvg(kid, "pet-svg" + joyCls(kid.id), { stage: true })}</div>` : ""}${comp ? `<div class="stagepet${kid ? " side" : ""}">${petSvg(comp, "pet-svg", { stage: true, ...(MOOD ? { mood: MOOD } : {}) })}<span class="stagebabies">${babiesSvg(comp.id, "pet-svg baby", true)}</span></div>` : ""}${flyer ? `<div class="stagepet flyer">${petSvg(flyer, "pet-svg", { stage: true, ...(MOOD ? { mood: MOOD } : {}) })}<span class="stagebabies">${babiesSvg(flyer.id, "pet-svg baby", true)}</span></div>` : ""}${ask ? `<button class="askbubble" data-act="ask"><b>${ask.nerf ? esc(ask.name) : `C'est quoi « ${esc(ask.name)} » ?`}</b></button>` : ""}</div>
    <div class="actions center"><button class="sm" data-act="rnd" ${BODY.got.length + WARD.got.length ? "" : "disabled"}>Tenue au hasard</button><button class="sm" data-act="off" ${worn().length ? "" : "disabled"}>Tout retirer</button></div>
    <p class="small center">Touche une zone pour voir ta progression et l'habiller · ${BODY.got.length}/${ACC.length} accessoires</p></section>
  ${!OPENS.zprog ? foldShut("zprog", "Progression détaillée des zones") : `<details class="card fold" id="zprog" open><summary>Progression détaillée des zones</summary><div class="zones">${Object.keys(ZONES).map(z => { const s = zstat(z), open = ZOPEN === z; return `<div class="zitem ${open ? "open" : ""}" id="z-${z}"><button class="zhead" data-act="zone" data-z="${z}" data-from="list" aria-expanded="${open}"><span class="zn">${esc(ZONES[z])}</span><span class="zbar"><i style="width:${s.m * 100}%;background:${s.m >= 1 ? "var(--gold)" : zcol(z) || "transparent"}"></i></span><span class="zp">${s.p} %</span><span class="small zc">${gotIn(z).length}/20</span><span class="chev" aria-hidden="true">▾</span></button>${open ? zonePanel(z) : ""}</div>`; }).join("")}</div></details>`}
  ${shopPanel()}${gearPanel()}${galleryPanel()}${giftPanel()}
  ${!OPENS.moi ? foldShut("moi", "Mon personnage") : `<details class="card fold" id="moi" open><summary>Mon personnage</summary>${look("skin", "Peau")}${look("hair", "Cheveux")}${look("eyes", "Yeux")}</details>`}`;
}

const FACE = h => `<svg viewBox="0 0 40 40" class="face" aria-hidden="true"><path d="M6 18 4 4l12 6h8l12-6-2 14a15 15 0 1 1-28 0z" fill="#8fd6b0" stroke="#2f7a56" stroke-width="2.4" stroke-linejoin="round"/><circle cx="14" cy="22" r="2.200" fill="#1f4a38"/><circle cx="26" cy="22" r="2.200" fill="#1f4a38"/><path d="${h >= 40 ? "M15 28q5 5 10 0" : h >= 15 ? "M15 29h10" : "M15 31q5-4 10 0"}" fill="none" stroke="#1f4a38" stroke-width="2.400" stroke-linecap="round"/></svg>`;
const ICO = { bowl: `<svg viewBox="0 0 32 32"><path d="M9 7q-2-3 0-5M16 7q-2-3 0-5M23 7q-2-3 0-5" stroke="#c98a4c"/><ellipse cx="16" cy="15" rx="10" ry="4" fill="#b5743c" stroke="#6b3f1a"/><path d="M4 15h24l-3 11q-.5 2-3 2H10q-2.500 0-3-2z" fill="#ef7f6b" stroke="#8f3524"/></svg>`, play: `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#5fc4a0" stroke="#1f6b52"/><path d="M13 10.500v11l9-5.500z" fill="#fff" stroke="#fff"/></svg>`, bed: `<svg viewBox="0 0 32 32"><path d="M3 8v19M3 22h26v5M29 22v-3q0-4-5-4H11v7" fill="#9fc4f0" stroke="#2f5a94"/><circle cx="7.500" cy="17" r="2.600" fill="#ffd9a5" stroke="#2f5a94"/><path d="M19 4h5l-5 6h5" stroke="#6f7fd0"/></svg>`, swap: `<svg viewBox="0 0 32 32"><path d="M6 12h18l-5-6M26 20H8l5 6" stroke="#7a5cd6"/></svg>` };
// ---------- Ménagerie ----------
let MF = { sp: "", q: "", f: "all", sort: "recent", n: 60 };
const ownedIds = () => [...PET.got, ...PET.rates];
function menagerieList() {
  const qn = norm(MF.q), own = ownedIds(), idx = new Map(own.map((id, i) => [id, i])), nb = a => (PET.care[a.id] || {}).babies || 0, hap = a => (PET.care[a.id] || {}).happiness || 0;
  const L = own.map(id => ANIMAL_BY_ID[id]).filter(a => a && (!MF.sp || a.species === MF.sp) && (!qn || norm(a.name).includes(qn)) && (MF.f === "all" || MF.f === "ok" && !a.rate || MF.f === "rate" && a.rate || MF.f === "rigo" && a.species === "Rigolos" || MF.f === "fav" && PET.fav[a.id] || MF.f === "baby" && nb(a)));
  const S = { recent: (a, b) => (PET.when[b.id] || 0) - (PET.when[a.id] || 0) || idx.get(b.id) - idx.get(a.id), old: (a, b) => (PET.when[a.id] || 0) - (PET.when[b.id] || 0) || idx.get(a.id) - idx.get(b.id), name: (a, b) => a.name.localeCompare(b.name, "fr"), species: (a, b) => a.species.localeCompare(b.species, "fr") || a.name.localeCompare(b.name, "fr"), joy: (a, b) => hap(b) - hap(a) || nb(b) - nb(a), fam: (a, b) => nb(b) - nb(a) || a.name.localeCompare(b.name, "fr") };
  const on = a => a.id === PET.companion || a.id === PET.flyer; L.sort((a, b) => on(b) - on(a) || S[MF.sort](a, b)); return L;
}
function menagerieCards() {
  const L = menagerieList();
  return (L.slice(0, MF.n).map(a => { const on = PET.companion === a.id || PET.flyer === a.id, nb = (PET.care[a.id] || {}).babies || 0;
    return `<div class="mcard ${on ? "comp" : ""}"><button class="fav ${PET.fav[a.id] ? "on" : ""}" data-act="fav" data-id="${a.id}" aria-label="Favori" aria-pressed="${!!PET.fav[a.id]}">${PET.fav[a.id] ? "♥" : "♡"}</button>${a.rate ? `<span class="rtag">raté</span>` : ""}<div class="top">${petSvg(a)}${babiesSvg(a.id)}</div><b>${esc(a.name)}</b><span class="small">${esc(a.species)}${nb ? ` · ${plural(nb, "bébé", "bébés")}` : ""}</span><button class="sm ${on ? "primary" : ""}" data-act="setComp" data-id="${a.id}">${on ? (FLY(a) ? "⭐ Compagnon volant" : "⭐ Compagnon") : FLY(a) ? "🪽 Choisir" : "🐾 Choisir"}</button></div>`; }).join("") || `<p class="small">Aucun animal ici pour l'instant.</p>`) + (L.length > MF.n ? `<button class="more" data-act="mMore">Voir plus (${L.length - MF.n})</button>` : "");
}
// ---------- Mon compagnon d'étude : le terrestre et le volant côte à côte (page Ménagerie) ----------
const SLEEP_MAX = 3, SLEEP_GAP = 10 * 60000, SLEEP_JOY = 10; // 3 siestes récompensées par jour, à plus de 10 min d'écart : +10 % de bonheur pour toute la ménagerie
const sleepState = () => { const tk = todayKey(); if (!PET.sleep || PET.sleep.day !== tk) PET.sleep = { day: tk, n: 0, last: 0 }; return PET.sleep; };
const sleepInfo = () => { const z = sleepState(), w = z.last ? SLEEP_GAP - (Date.now() - z.last) : 0; return z.n >= SLEEP_MAX ? "3/3 siestes récompensées aujourd'hui" : w > 0 ? `prochaine sieste récompensée dans ${Math.ceil(w / 60000)} min` : `sieste : +${SLEEP_JOY} % de bonheur pour toute la ménagerie (${z.n}/${SLEEP_MAX} aujourd'hui)`; };
const compIds = () => [PET.companion, PET.flyer].filter((id, i, L) => id && ANIMAL_BY_ID[id] && L.indexOf(id) === i);
function compPanel() {
  const L = compIds().map(id => ANIMAL_BY_ID[id]), has = PET.got.length + PET.rates.length;
  if (!L.length) return `<section class="card"><h2>Mon compagnon d'étude</h2><p class="small">${has ? "Choisis ci-dessous un compagnon terrestre 🐾 et/ou un compagnon volant 🪽 : ils peuvent t'accompagner tous les deux." : "Tu gagneras ton premier animal en répondant aux QCM."}</p></section>`;
  const one = a => { const c = petCare(a.id), fed = (c.fedDays || 0) % FEED_FOR_BABY, full = (c.babies || 0) >= MAX_BABIES, stg = stgOf(a.id), S = stepsOf(a.id);
    return `<div class="compone" data-id="${a.id}"><div class="petbig">${petSvg(a, "pet-svg lg", MOOD ? { mood: MOOD } : {})}${babiesSvg(a.id, "pet-svg baby")}</div>
      <b>${esc(a.name)}</b><span class="small">${FLY(a) ? "🪽 Volant" : "🐾 Terrestre"} · ${esc(a.species)}${c.babies ? ` · ${plural(c.babies, "bébé", "bébés")}` : ""}</span>
      <span class="joyrow">${FACE(c.happiness || 0)}<span class="xpbar joy"><i style="width:${c.happiness || 0}%"></i></span></span><span class="small">Bonheur : ${c.happiness || 0} %</span>
      <span class="stages" aria-label="Taille : ${stageName(a.id, stg)}">${S.map((s, k) => `<i class="${k <= stg ? "on" : ""}"></i>`).join("")}</span><span class="small">${isHuman(a.id) ? "Âge" : "Taille"} : <b>${stageName(a.id, stg)}</b>${stg < S.length - 1 ? ` · encore ${plural(S[stg + 1] - (c.fedDays || 0), "croquette")}` : " · a fini de grandir"}</span>
      <div class="kibrow" aria-label="${fed} croquettes sur ${FEED_FOR_BABY}">${full ? `<span class="small">Famille au complet ! 💕</span>` : Array.from({ length: FEED_FOR_BABY }, (_, i) => `<span class="${i < fed ? "" : "off"}">${KIB}</span>`).join("") + `<span class="small">${FEED_FOR_BABY - fed} avant un bébé</span>`}</div>
      <button class="sm" data-act="feedPet" data-id="${a.id}" ${DAILY.kibbles > 0 ? "" : "disabled"}>${ICO.bowl}<span>Nourrir</span></button></div>`; };
  return `<section class="card" id="compcard"><h2>Mon compagnon d'étude</h2><div class="compduo ${L.length > 1 ? "two" : ""}">${L.map(one).join("")}</div>
    <p class="small center">${KIB} ${plural(DAILY.kibbles || 0, "croquette")} à donner · ${sleepInfo()}</p>
    <div class="petacts k2"><button data-act="playPet" title="Jouer">${ICO.play}<span>Jouer (${replayable().length})</span></button><button data-act="sleepPet" title="Dormir">${ICO.bed}<span>${MOOD === "sleep" ? "Réveiller" : L.length > 1 ? "Dormir (les 2)" : "Dormir"}</span></button></div>
    <p class="small center">Touche « Choisir » sur un animal ci-dessous : un terrestre 🐾 et un volant 🪽 peuvent t'accompagner en même temps.</p></section>`;
}
function viewMenagerie() {
  syncDaily(); const n = PET.got.length, by = {}; ANIMALS.forEach(a => { (by[a.species] ||= [0, 0])[1]++; if (PET.got.includes(a.id)) by[a.species][0]++; });
  const own = ownedIds(), spOwn = new Set(own.map(id => ANIMAL_BY_ID[id].species)), babies = Object.values(PET.care).reduce((t, c) => t + (c.babies || 0), 0), left = Math.max(1, PET.targetGood - PET.goodSincePet);
  if (!own.length) return `<section class="card empty"><h2>Ma ménagerie</h2><p>${ANIMALS.length} animaux t'attendent !</p><p class="small">Ton premier arrive dans ${petLeft()}. Tu peux en gagner jusqu'à ${MAX_DAY} par jour.</p><a class="btn primary" href="#/g">Commencer une série</a></section>`;
  const F = [["all", `Tous (${own.length})`], ...(PET.rates.length ? [["ok", "Classiques"], ["rate", "Ratés"]] : []), ...(own.some(id => ANIMAL_BY_ID[id].species === "Rigolos") ? [["rigo", "Rigolos"]] : []), ["fav", `Favoris (${Object.values(PET.fav).filter(Boolean).length})`], ["baby", "Avec bébés"]];
  const SO = [["recent", "Plus récents"], ["old", "Plus anciens"], ["name", "Nom (A à Z)"], ["species", "Espèce"], ["joy", "Bonheur"], ["fam", "Nombre de bébés"]];
  return `${compPanel()}<section class="card"><h2>Ma ménagerie</h2><p class="big">${n} / ${ANIMALS.length} animaux${babies ? ` · ${plural(babies, "bébé", "bébés")}` : ""}</p><div class="xpbar"><i style="width:${pct(n, ANIMALS.length)}%"></i></div>
    <p class="small">${PET.dayCount >= MAX_DAY ? `${MAX_DAY} animaux gagnés aujourd'hui : la suite demain !` : `Prochain animal dans ${petLeft()} (${PET.dayCount}/${MAX_DAY} aujourd'hui).`}</p>
    <details class="fold sub" id="mfind" ${OPENS.mfind ? "open" : ""}><summary>Rechercher et trier${MF.q || MF.sp || MF.f !== "all" ? ` <span class="small">filtre actif</span>` : ""}</summary><div class="chips">${F.map(([k, l]) => `<button data-act="mF" data-k="${k}" class="${MF.f === k ? "on" : ""}">${l}</button>`).join("")}</div>
    <div class="mfilter"><input type="search" id="msearch" placeholder="Rechercher un animal…" value="${esc(MF.q)}"><select id="msp" aria-label="Espèce"><option value="">Toutes les espèces</option>${Object.entries(by).map(([s, [g, t]]) => `<option value="${esc(s)}" ${MF.sp === s ? "selected" : ""} ${spOwn.has(s) ? "" : "disabled"}>${esc(s)} (${g}/${t})</option>`).join("")}</select><select id="msort" aria-label="Trier par">${SO.map(([k, l]) => `<option value="${k}" ${MF.sort === k ? "selected" : ""}>Tri : ${l}</option>`).join("")}</select></div></details></section>
  <div class="mgrid" id="mgrid">${menagerieCards()}</div>`;
}

// ======================== Garderie : tous les enfants, un seul à la fois vient dans « Corps » ========================
const KF = { f: "all", g: "", q: "", n: 60, move: false };
const isGirl = a => a.g === "f" || !!a.duo, isBoy = a => a.g === "m" || !!a.duo;
const kidLeft = () => Math.max(1, PET.kidT - PET.goodSinceKid);
function kidCard(kid, ask) { // la carte de l'enfant choisi (pages Corps et Garderie)
  if (!kid) return PET.kids.length ? `<p class="small">Choisis l'enfant que tu gardes.</p><a class="btn primary" href="#/garderie">Ouvrir la garderie</a>` : `<p class="small">Ton premier enfant arrive à la garderie dans ${plural(kidLeft(), "bonne réponse", "bonnes réponses")}.</p>`;
  const c = petCare(kid.id), st = stgOf(kid.id), F = stepsOf(kid.id);
  return `<div class="petcard kidcard"><div class="petbig">${petSvg(kid, "pet-svg lg" + joyCls(kid.id))}</div><div class="petinfo"><b>${esc(kid.name)}</b>
    <span class="joyrow">${FACE(c.happiness || 0)}<span class="xpbar joy"><i style="width:${c.happiness || 0}%"></i></span></span>
    <span class="stages" aria-label="Âge : ${stageName(kid.id, st)}">${F.map((x, k) => `<i class="${k <= st ? "on" : ""}"></i>`).join("")}</span><span class="ager kc">${parkBtn(kid.id)}<span class="small">${inPark(kid.id) ? "dans le parc" : "pas dans le parc"}</span></span><span class="small">Âge : <b>${stageName(kid.id, st)}</b>${st < F.length - 1 ? ` · ${plural(F[st + 1] - (c.fedDays || 0), "croquette")} avant ses ${stageName(kid.id, st + 1)}` : " · a fini de grandir !"}</span>
    <p class="small candyrow">${CANDY} <span><b>${plural(PET.candy, "bonbon")}</b>${askNote(kid.id, ask)}</span></p>
    <div class="petacts k3"><button data-act="feedPet" data-id="${kid.id}" title="Donner une croquette">${ICO.bowl}<span>Nourrir (${DAILY.kibbles || 0})</span></button>${ask && route()[0] !== "corps" ? `<button data-act="ask">${ICO.play}<span>Sa question</span></button>` : `<a href="#/garderie" title="Changer d'enfant">${ICO.swap}<span>Changer</span></a>`}<button data-act="setKid" data-id="${kid.id}" data-off="1" title="Ramener à la garderie">${ICO.bed}<span>Raccompagner</span></button></div></div></div>`;
}
const kidOrder = () => { const o = (PET.korder || []).filter(id => PET.kids.includes(id)); return [...o, ...PET.kids.filter(id => !o.includes(id))]; }; // l'ordre choisi par le joueur (au départ : l'ordre d'arrivée)
function kidList(all) {
  const q = norm(KF.q), base = (PET.ksort || "arr") === "mine" ? kidOrder() : PET.kids, L = base.map(id => ANIMAL_BY_ID[id]).filter(a => { if (all) return true; const s = stgOf(a.id); return (!q || norm(a.name).includes(q)) && (!KF.g || KF.g === "f" && isGirl(a) || KF.g === "m" && isBoy(a) || KF.g === "n" && a.g === "n" && !a.duo) && (KF.f === "all" || KF.f === "fav" && PET.fav[a.id] || KF.f === "in" && inPark(a.id) || KF.f === "out" && !inPark(a.id) || KF.f === "s" && s < 2 || KF.f === "m" && (s === 2 || s === 3) || KF.f === "l" && s > 3); });
  const S = { filles: (a, b) => isGirl(b) - isGirl(a), gars: (a, b) => isBoy(b) - isBoy(a), name: (a, b) => a.name.localeCompare(b.name, "fr"), age: (a, b) => ((PET.care[b.id] || {}).fedDays || 0) - ((PET.care[a.id] || {}).fedDays || 0) }[PET.ksort];
  return S ? L.slice().sort(S) : L;
}
function kidCards() {
  const L = kidList(), mv = KF.move;
  return (L.slice(0, KF.n).map((a, i) => { const on = PET.kid === a.id; return `<div class="mcard ${on ? "comp" : ""}"><button class="fav ${PET.fav[a.id] ? "on" : ""}" data-act="fav" data-id="${a.id}" aria-label="Favori" aria-pressed="${!!PET.fav[a.id]}">${PET.fav[a.id] ? "♥" : "♡"}</button><div class="top">${petSvg(a)}</div><b>${esc(a.name)}</b><span class="ager"><span class="small">${stageName(a.id, stgOf(a.id))}</span>${parkBtn(a.id)}</span>${mv ? `<div class="mvrow"><button data-act="kMv" data-id="${a.id}" data-d="-99" aria-label="Tout au début">⇤</button><button data-act="kMv" data-id="${a.id}" data-d="-1" aria-label="Avancer">◀</button><button data-act="kMv" data-id="${a.id}" data-d="1" aria-label="Reculer">▶</button></div>` : `<button class="sm ${on ? "primary" : ""}" data-act="setKid" data-id="${a.id}" ${on ? 'data-off="1"' : ""}>${on ? "⭐ Je garde cet enfant" : "Garder cet enfant"}</button>`}</div>`; }).join("") || `<p class="small">Aucun enfant ici pour l'instant.</p>`) + (L.length > KF.n ? `<button class="more" data-act="kMore">Voir plus (${L.length - KF.n})</button>` : "");
}
// ---------- Le parc : tous les enfants en même temps, on s'y promène et on zoome ----------
const PK = { W: 1800, H: 1150, z: 0, x: 900, y: 575, sel: null, kids: new Map(), spr: new Map(), bg: null, raf: 0, queue: [], isp: new Map(), edit: false, isel: -1, th: null };
const PKH = [58, 66, 86, 108, 134, 178]; // taille des enfants dans le parc, selon l'âge
function parkBg() { const Q = (PARC.themes.find(x => x.id === PET.park.theme) || PARC.themes[0]).c, night = PET.park.theme === "nuit"; // décor dessiné une seule fois : pelouse, chemins, mare, bac à sable, toboggan, cabane…
  const tree = (x, y, k, c) => `<g transform="translate(${x} ${y}) scale(${k})"><ellipse cx="0" cy="4" rx="46" ry="11" fill="#3f7a3c" opacity=".25"/><rect x="-9" y="-44" width="18" height="48" rx="7" fill="#9a6b45"/><path d="M0,-156 C44,-156 70,-120 56,-92 C78,-64 48,-34 0,-38 C-48,-34 -78,-64 -56,-92 C-70,-120 -44,-156 0,-156Z" fill="${c}"/><path d="M-26,-128 Q-8,-146 14,-140" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".35"/></g>`;
  const fl = (x, y, c) => `<g transform="translate(${x} ${y})">${[0, 72, 144, 216, 288].map(a => `<circle cx="${6 * Math.cos(a / 57.3)}" cy="${6 * Math.sin(a / 57.3)}" r="5" fill="${c}"/>`).join("")}<circle r="4" fill="#ffd84d"/></g>`;
  let rs = 7; const rnd = () => (rs = (rs * 16807) % 2147483647) / 2147483647;
  const tufts = Array.from({ length: 150 }, () => { const x = rnd() * 1800, y = 170 + rnd() * 960; return `<path d="M${x},${y} q-5,-12 -9,-13 M${x},${y} q0,-14 1,-16 M${x},${y} q5,-11 10,-12" stroke="${Q[2]}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"/>`; }).join("");
  const flow = Array.from({ length: 60 }, () => fl(rnd() * 1800, 190 + rnd() * 930, ["#ff9fc0", "#fff", "#c9a9f2", "#ffb45c", "#8fd0f5"][Math.floor(rnd() * 5)])).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1150" viewBox="0 0 1800 1150"><defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Q[0]}"/><stop offset="1" stop-color="${Q[1]}"/></linearGradient><linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Q[3]}"/><stop offset="1" stop-color="${Q[4]}"/></linearGradient></defs>
  <rect width="1800" height="190" fill="url(#g1)"/>${night ? Array.from({ length: 70 }, () => `<circle cx="${rnd() * 1800}" cy="${rnd() * 165}" r="${1 + rnd() * 2.4}" fill="#fff8d5"/>`).join("") : ""}<circle cx="1560" cy="70" r="44" fill="${night ? "#fdf6d5" : "#ffd84d"}"/>${night ? `<circle cx="1544" cy="60" r="40" fill="${Q[0]}"/>` : ""}<circle cx="1560" cy="70" r="66" fill="#ffd84d" opacity="${night ? .1 : .25}"/>${[[220, 60, 1], [720, 44, 1.2], [1180, 74, .9]].map(([x, y, k]) => `<path transform="translate(${x} ${y}) scale(${k})" d="M-60,20 a24,24 0 0 1 22,-34 a32,32 0 0 1 58,-4 a24,24 0 0 1 34,38Z" fill="#fff" opacity=".95"/>`).join("")}
  <path d="M0,190 Q250,110 520,165 T1060,150 T1800,170 V260 H0Z" fill="${Q[2]}"/><rect y="180" width="1800" height="970" fill="url(#g2)"/>${[420, 640, 860].map((y, i) => `<path d="M0,${y} Q450,${y - 60} 900,${y} T1800,${y} V${y + 110} Q1350,${y + 170} 900,${y + 110} T0,${y + 110}Z" fill="${Q[5]}" opacity=".5"/>`).join("")}
  <path d="M-20,1010 C260,900 380,760 640,740 C900,720 980,880 1240,850 C1480,820 1560,640 1830,610 L1830,700 C1600,730 1520,910 1260,940 C980,970 900,810 650,830 C430,850 300,990 -20,1110Z" fill="${Q[6]}"/><path d="M620,740 C640,600 720,480 690,330 L780,330 C820,480 740,620 720,745Z" fill="${Q[6]}"/>${tufts}${flow}
  <g><ellipse cx="1330" cy="430" rx="250" ry="104" fill="#e8d5a0"/><ellipse cx="1330" cy="426" rx="232" ry="92" fill="#7fcbee"/><ellipse cx="1290" cy="408" rx="150" ry="44" fill="#a9e0f7" opacity=".7"/><path d="M1200,440 q18,-10 36,0 t36,0 M1370,462 q18,-10 36,0 t36,0" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/><g transform="translate(1410 400)"><ellipse rx="34" ry="20" fill="#ffd84d"/><circle cx="26" cy="-18" r="17" fill="#ffd84d"/><path d="M40,-18 l16,5 l-14,7Z" fill="#f5873c"/><circle cx="30" cy="-22" r="3.500" fill="#2a1a14"/></g>${[[1180, 388], [1230, 470], [1470, 450]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="25" ry="10" fill="#5fae5a"/><circle cx="${x + 5}" cy="${y - 6}" r="7" fill="#ff9fc0"/>`).join("")}</g>
  <g><ellipse cx="350" cy="560" rx="205" ry="92" fill="#c98f52"/><ellipse cx="350" cy="552" rx="186" ry="78" fill="#f7e2ac"/><path d="M290,548 l22,-40 h44 l22,40Z" fill="#f0cf86"/><path d="M300,512 h8 v-12 h8 v12 h8 v-12 h8 v12 h8 v-12 h8 v12 h14 v16 h-62Z" fill="#e5bd6a"/><path d="M440,560 l10,-34 h38 l10,34Z" fill="#f06a6a"/><path d="M446,528 q24,-34 46,0" fill="none" stroke="#c94a4a" stroke-width="6"/><rect x="228" y="548" width="54" height="11" rx="5" fill="#5fa8f0" transform="rotate(-18 228 548)"/></g>
  <g transform="translate(960 560)"><ellipse cx="40" cy="8" rx="210" ry="24" fill="#3f7a3c" opacity=".2"/><path d="M-110,0 V-190 M-30,0 V-190" stroke="#8f7bea" stroke-width="15" stroke-linecap="round"/><path d="M-110,-40 H-30 M-110,-84 H-30 M-110,-128 H-30" stroke="#ffd15c" stroke-width="10"/><rect x="-124" y="-196" width="112" height="20" rx="8" fill="#ff9fc0"/><path d="M-20,-186 C60,-176 80,-50 236,-18 L236,4 C60,-14 20,-120 -20,-150Z" fill="#ff8f5c"/><path d="M-20,-186 C60,-176 80,-50 236,-18" fill="none" stroke="#fff" stroke-width="7" opacity=".6"/><path d="M-134,-196 L-68,-254 L-2,-196Z" fill="#5fa8f0"/></g>
  <g transform="translate(250 300)"><ellipse cx="0" cy="6" rx="150" ry="20" fill="#3f7a3c" opacity=".2"/><rect x="-110" y="-120" width="220" height="124" rx="10" fill="#ffe3bf" stroke="#c98f52" stroke-width="7"/><path d="M-140,-112 L0,-214 L140,-112Z" fill="#e5646f" stroke="#a83a48" stroke-width="7" stroke-linejoin="round"/><path d="M0,-176 C-9,-188 -27,-178 -18,-163 C-11,-151 0,-146 0,-146 C0,-146 11,-151 18,-163 C27,-178 9,-188 0,-176Z" fill="#fff"/><path d="M-30,4 V-48 a30,30 0 0 1 60,0 V4Z" fill="#8f7bea" stroke="#5f4ab5" stroke-width="5"/><circle cx="16" cy="-24" r="5" fill="#ffd84d"/><rect x="-92" y="-84" width="44" height="40" rx="6" fill="#bfe6fb" stroke="#fff" stroke-width="6"/><rect x="48" y="-84" width="44" height="40" rx="6" fill="#bfe6fb" stroke="#fff" stroke-width="6"/></g>
  <g transform="translate(1560 900)"><ellipse cx="0" cy="10" rx="190" ry="26" fill="#3f7a3c" opacity=".2"/><path d="M-150,4 L-96,-200 L-42,4 M150,4 L96,-200 L42,4 M-110,-196 H110" stroke="#c98f52" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
  <g transform="translate(640 1000)"><ellipse rx="150" ry="52" fill="#ff9fb8"/><ellipse rx="118" ry="40" fill="#ffd9a5"/><ellipse rx="84" ry="28" fill="#a5d8f0"/><ellipse rx="46" ry="15" fill="#c9a9f2"/></g>
  ${tree(90, 330, 1.1, "#7fc46c")}${tree(520, 300, .95, "#8fd07a")}${tree(880, 280, .85, "#7fc46c")}${tree(1700, 340, 1.25, "#7fc46c")}${tree(1110, 270, .8, "#8fd07a")}${tree(110, 900, 1.2, "#8fd07a")}${tree(1740, 1100, 1.1, "#7fc46c")}${tree(1180, 1120, 1, "#8fd07a")}</svg>`;
}
const svgImg = (s, w, h) => new Promise((ok, ko) => { const u = URL.createObjectURL(new Blob([s], { type: "image/svg+xml" })), im = new Image(); im.onload = () => { const c = document.createElement("canvas"); c.width = w; c.height = h; c.getContext("2d").drawImage(im, 0, 0, w, h); URL.revokeObjectURL(u); ok(c); }; im.onerror = () => { URL.revokeObjectURL(u); ko(new Error("dessin")); }; im.src = u; });
const SPR_H = 260; // hauteur en pixels des dessins gardés en mémoire
async function kidSprite(id, st) { // transforme le dessin d'un enfant en image (une fois par âge)
  const box = document.createElement("div"); box.style.cssText = "position:absolute;left:-9999px;top:0;width:200px;visibility:hidden"; box.innerHTML = ART.renderSvg(ANIMAL_BY_ID[id], "x", { stg: st }); document.body.appendChild(box);
  try {
    const s = box.firstElementChild, hum = (s.querySelector(".hum") || s).getBBox(), sh = s.firstElementChild; if (sh.tagName === "ellipse") sh.remove(); const all = s.getBBox(), pad = 5, vx = all.x - pad, vy = all.y - pad, vw = all.width + 2 * pad, vh = all.height + 2 * pad, k = SPR_H / Math.max(vh, 1);
    s.setAttribute("xmlns", "http://www.w3.org/2000/svg"); s.setAttribute("viewBox", `${vx} ${vy} ${vw} ${vh}`); s.setAttribute("width", vw * k); s.setAttribute("height", vh * k); s.removeAttribute("style");
    const d = document.createElementNS("http://www.w3.org/2000/svg", "defs"); d.innerHTML = CORPS.DEFS + ART.DEFS; s.prepend(d);
    const img = await svgImg(new XMLSerializer().serializeToString(s).replace(/^<svg([^>]*)>/, (m, q) => `<svg xmlns="http://www.w3.org/2000/svg"${q.replace(/\sxmlns="[^"]*"/g, "")}>`), Math.ceil(vw * k), Math.ceil(vh * k)), half = c => { const q = document.createElement("canvas"); q.width = Math.max(1, c.width >> 1); q.height = Math.max(1, c.height >> 1); const x = q.getContext("2d"); x.imageSmoothingQuality = "high"; x.drawImage(c, 0, 0, q.width, q.height); return q; }, m = half(img);
    return { img, mip: [img, m, half(m)], w: vw / hum.height, h: vh / hum.height, cx: (hum.x + hum.width / 2 - vx) / vw, by: (hum.y + hum.height - vy) / vh }; // proportions par rapport à la hauteur de l'enfant
  } finally { box.remove(); }
}
const inPond = (x, y) => ((x - 1330) / 262) ** 2 + ((y - 430) / 112) ** 2 < 1;
function parkSpot() { // une place libre, loin des autres et hors de la mare
  let best = [900, 600], bd = -1; for (let i = 0; i < 24; i++) { const x = 90 + Math.random() * 1620, y = 345 + Math.random() * 770; if (inPond(x, y)) continue; let d = 1e9; for (const k of PK.kids.values()) d = Math.min(d, Math.hypot(k.x - x, (k.y - y) * 1.5)); if (d > bd) { bd = d; best = [x, y]; } } return best;
}
function parkSync() { // un enfant par place, posé au hasard la première fois
  const L = PET.kids.filter(inPark), use = new Set(L.map(id => id + "|" + stgOf(id))); for (const id of [...PK.kids.keys()]) if (!L.includes(id)) PK.kids.delete(id); for (const k of [...PK.spr.keys()]) if (!use.has(k)) PK.spr.delete(k); // dessins inutiles effacés de la mémoire
  if (PK.sel && !inPark(PK.sel)) PK.sel = null;
  L.forEach(id => { if (!PK.kids.has(id)) { const [x, y] = parkSpot(); PK.kids.set(id, { id, x, y, tx: x, ty: y, wait: Math.random() * 6, ph: Math.random() * 6, dir: 1 }); } const st = stgOf(id), key = id + "|" + st; if (!PK.spr.has(key)) { PK.spr.set(key, null); PK.queue.push([id, st, key]); } });
  if (PK.queue.length && !PK.busy) (async () => { PK.busy = true; while (PK.queue.length) { const [id, st, key] = PK.queue.shift(); if (!PK.spr.has(key)) continue; try { PK.spr.set(key, await kidSprite(id, st)); } catch { PK.spr.delete(key); } await new Promise(q => setTimeout(q, 0)); } PK.busy = false; parkDraw(); })();
  parkItems();
  if (!PK.bg) { PK.bg = "attente"; const th0 = PET.park.theme; svgImg(parkBg(), 2160, 1380).then(c => { if (PET.park.theme === th0) { PK.bg = c; parkDraw(); } }).catch(() => { PK.bg = null; }); }
}
// ---------- Aménager le parc : jeux, arbres, activités et couleurs, payés avec les XP à dépenser ----------
PET.park = { items: [], bag: {}, themes: ["prairie"], theme: "prairie", ...(PET.park || {}) }; PET.park.items = PET.park.items.filter(i => PARC.byId[i.k]); if (!PARC.themes.some(x => x.id === PET.park.theme)) PET.park.theme = "prairie";
const PARK_MAX = 80; let PTAB = "jeux"; const bagN = k => PET.park.bag[k] || 0, parkSave = () => save(K_PET, PET);
function parkItems() { // images des éléments posés
  if (PK.th !== PET.park.theme) { PK.th = PET.park.theme; PK.bg = null; }
  for (const i of PET.park.items) if (!PK.isp.has(i.k)) { PK.isp.set(i.k, null); const x = PARC.byId[i.k], k = 1.5; svgImg(PARC.svg(x).replace("<svg ", `<svg width="${x.w * k}" height="${(x.h + 14) * k}" `), Math.ceil(x.w * k), Math.ceil((x.h + 14) * k)).then(c => { PK.isp.set(i.k, c); parkDraw(); }).catch(() => PK.isp.delete(i.k)); }
}
const itemK = y => .78 + .34 * (y / PK.H); // un peu de perspective
function drawItem(g, i, n) { const x = PARC.byId[i.k], im = PK.isp.get(i.k), k = itemK(i.y); if (PK.edit && PK.isel === n) { g.strokeStyle = "#7c5cf0"; g.lineWidth = 5; g.setLineDash([12, 8]); g.strokeRect(i.x - x.w * k / 2 - 6, i.y - x.h * k - 6, x.w * k + 12, x.h * k + 24); g.setLineDash([]); } if (im) { g.save(); g.translate(i.x, i.y); if (i.f) g.scale(-1, 1); g.drawImage(im, -x.w * k / 2, -x.h * k, x.w * k, (x.h + 14) * k); g.restore(); } }
function itemAt(px, py) { const cv = parkCv(), x = PK.x + (px - cv.clientWidth / 2) / PK.z, y = PK.y + (py - cv.clientHeight / 2) / PK.z; let best = -1, by = -1; PET.park.items.forEach((i, n) => { const q = PARC.byId[i.k], k = itemK(i.y), m = 10 / PK.z; if (Math.abs(x - i.x) < q.w * k / 2 + m && y > i.y - q.h * k - m && y < i.y + 14 * k + m && i.y >= by) { best = n; by = i.y; } }); return best; }
function placeItem(k) { // pose un élément au milieu de ce qu'on regarde, hors de la mare
  if (PET.park.items.length >= PARK_MAX) return toast(`Le parc est plein (${PARK_MAX} éléments) : range-en un d'abord.`); let x = Math.max(120, Math.min(1680, PK.x || 900)), y = Math.max(360, Math.min(1100, (PK.y || 575) + 60)); for (let n = 0; n < 12 && (inPond(x, y) || PET.park.items.some(i => Math.hypot(i.x - x, i.y - y) < 70)); n++) { x = 120 + Math.random() * 1560; y = 360 + Math.random() * 740; }
  PET.park.items.push({ k, x: Math.round(x), y: Math.round(y) }); PK.isel = PET.park.items.length - 1; PK.edit = true; PK.sel = null; parkSave(); render(); const cv = parkCv(); if (cv) { PK.x = x; PK.y = y - 40; parkClamp(cv); parkDraw(); cv.scrollIntoView({ block: "center", behavior: "smooth" }); }
}
function parkShop() {
  if (!OPENS.pkshop) return foldShut("pkshop", `Aménager le parc <span class="small">💎 ${wallet().toLocaleString("fr")} XP</span>`); const W = wallet(), th = PTAB === "themes";
  const cards = th ? PARC.themes.map(x => { const got = PET.park.themes.includes(x.id), on = PET.park.theme === x.id; return `<button class="acc ${on ? "on" : ""}" data-act="pkTheme" data-id="${x.id}" aria-pressed="${on}"><span class="ath"><svg viewBox="0 0 90 90"><rect width="90" height="90" fill="${x.c[0]}"/><rect y="22" width="90" height="14" fill="${x.c[1]}"/><path d="M0,40 Q30,24 60,36 T90,34 V90 H0Z" fill="${x.c[2]}"/><rect y="46" width="90" height="44" fill="${x.c[3]}"/><path d="M0,70 Q45,52 90,66 V90 H0Z" fill="${x.c[4]}"/><path d="M10,90 Q40,66 90,58 V68 Q50,74 34,90Z" fill="${x.c[6]}"/></svg></span><b>${esc(x.n)}</b><span class="st">${on ? "✔ En place" : got ? "Mettre" : `💎 ${x.p} XP`}</span></button>`; }).join("")
    : PARC.list.filter(x => x.c === PTAB).sort((a, b) => a.p - b.p).map(x => { const b = bagN(x.id), n = PET.park.items.filter(i => i.k === x.id).length; return `<button class="acc ${n ? "on" : ""}" data-act="pkBuy" data-id="${x.id}"><span class="ath">${PARC.svg(x, "pkth")}</span><b>${esc(x.n)}</b><span class="st">${b ? `Poser (${b} en réserve)` : `💎 ${x.p} XP`}${n ? ` · ${n} posé${n > 1 ? "s" : ""}` : ""}</span></button>`; }).join("");
  return `<details class="card fold" id="pkshop" open><summary>Aménager le parc <span class="small">💎 ${W.toLocaleString("fr")} XP</span></summary><p class="small">Payé avec les mêmes XP que ta garde-robe : ton niveau ne baisse jamais. Tu peux acheter plusieurs fois le même élément.</p><div class="chips">${Object.entries(PARC.CATS).map(([k, l]) => `<button data-act="pkTab" data-k="${k}" class="${PTAB === k ? "on" : ""}">${l}</button>`).join("")}</div><div class="accgrid">${cards}</div></details>`;
}
PET.hid ||= {}; // enfants gardés, mais absents du parc (tous y sont au départ)
const inPark = id => !PET.hid[id], parkN = () => PET.kids.filter(inPark).length;
const parkBtn = id => `<button class="pm ${inPark(id) ? "in" : ""}" data-act="kPark" data-id="${id}" aria-label="${inPark(id) ? "Retirer du parc" : "Remettre dans le parc"}" title="${inPark(id) ? "Retirer du parc" : "Remettre dans le parc"}">${inPark(id) ? "−" : "+"}</button>`;
const parkCv = () => document.getElementById("park");
function parkFit(cv) { return Math.max(cv.clientWidth / PK.W, cv.clientHeight / PK.H); } // zoom minimal : le parc remplit la fenêtre
function parkAll(cv) { return Math.min(cv.clientWidth / PK.W, cv.clientHeight / PK.H); } // zoom « tout voir »
function parkClamp(cv) { const z = PK.z, hw = cv.clientWidth / 2 / z, hh = cv.clientHeight / 2 / z; PK.x = hw * 2 >= PK.W ? PK.W / 2 : Math.min(PK.W - hw, Math.max(hw, PK.x)); PK.y = hh * 2 >= PK.H ? PK.H / 2 : Math.min(PK.H - hh, Math.max(hh, PK.y)); }
function parkZoom(f, px, py) { const cv = parkCv(); if (!cv) return; const x = px === undefined ? cv.clientWidth / 2 : px, y = py === undefined ? cv.clientHeight / 2 : py, wx = PK.x + (x - cv.clientWidth / 2) / PK.z, wy = PK.y + (y - cv.clientHeight / 2) / PK.z; PK.z = Math.max(parkAll(cv), Math.min(3.2, PK.z * f)); PK.x = wx - (x - cv.clientWidth / 2) / PK.z; PK.y = wy - (y - cv.clientHeight / 2) / PK.z; parkClamp(cv); parkDraw(); }
function parkDraw() {
  const cv = parkCv(); if (!cv || !cv.clientWidth) return; const dpr = Math.min(2, devicePixelRatio || 1), w = cv.clientWidth, h = cv.clientHeight; if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
  if (!PK.z) PK.z = parkFit(cv); parkClamp(cv); const g = cv.getContext("2d"), z = PK.z; g.setTransform(dpr, 0, 0, dpr, 0, 0); g.imageSmoothingQuality = "high"; const sky = h / 2 - PK.y * z; const Q = (PARC.themes.find(x => x.id === PET.park.theme) || PARC.themes[0]).c; g.fillStyle = Q[4]; g.fillRect(0, 0, w, h); if (sky > 0) { g.fillStyle = Q[0]; g.fillRect(0, 0, w, sky + 1); } g.translate(w / 2 - PK.x * z, h / 2 - PK.y * z); g.scale(z, z);
  if (PK.bg && PK.bg !== "attente") g.drawImage(PK.bg, 0, 0, PK.W, PK.H);
  for (const k of PK.kids.values()) { const a = k.act; k.s = a && a.on ? a.f(a.t, a.t / a.dur, PKH[stgOf(k.id)] * (.86 + .28 * (a.at[1] / PK.H))) : null; }
  const L = [...PK.kids.values(), { sw: 1, y: 898 }, ...PET.park.items.map((i, n) => ({ it: i, n, y: PARC.byId[i.k].flat ? -1 : i.y }))].sort((a, b) => (a.s ? a.s.z : a.y) - (b.s ? b.s.z : b.y)); PK.hits = [];
  for (const k of L) {
    if (k.it) { drawItem(g, k.it, k.n); continue; } if (k.sw) { drawSwings(g); continue; }
    if (k.s) { drawActing(g, k, z, dpr); continue; }
    const st = stgOf(k.id), sp = PK.spr.get(k.id + "|" + st), H = PKH[st] * (.86 + .28 * (k.y / PK.H)), mv = k.moving, bob = mv ? Math.abs(Math.sin(k.ph * 7)) * (st === 1 ? 2 : 5) : Math.sin(k.ph * 2) * .8;
    g.fillStyle = "rgba(40,60,30,.2)"; g.beginPath(); g.ellipse(k.x, k.y, H * .26, H * .06, 0, 0, 7); g.fill();
    if (k.id === PK.sel || k.id === PET.kid) { g.strokeStyle = k.id === PK.sel ? "#7c5cf0" : "#f5b22e"; g.lineWidth = 4; g.beginPath(); g.ellipse(k.x, k.y, H * .36, H * .1, 0, 0, 7); g.stroke(); }
    if (sp) { const sw = sp.w * H, sh = sp.h * H; g.save(); g.translate(k.x, k.y - bob); if (st === 1 && k.dir > 0) g.scale(-1, 1); else if (mv && st > 1) g.rotate(Math.sin(k.ph * 7) * .035); const px = sh * z * dpr, im = sp.mip[px < SPR_H * .3 ? 2 : px < SPR_H * .62 ? 1 : 0]; g.drawImage(im, -sw * sp.cx, -sh * sp.by, sw, sh); g.restore(); }
    PK.hits.push([k.id, k.x, k.y, H]);
    if (z > 1.15 || k.id === PK.sel) { const n = shortName(ANIMAL_BY_ID[k.id]), fs = Math.max(11, 13 / z * Math.min(z, 1.2)); g.font = `800 ${fs}px Nunito, sans-serif`; const tw = g.measureText(n).width + fs; g.fillStyle = k.id === PK.sel ? "#7c5cf0" : "rgba(255,255,255,.9)"; g.beginPath(); if (g.roundRect) g.roundRect(k.x - tw / 2, k.y + 6, tw, fs * 1.55, fs); else g.rect(k.x - tw / 2, k.y + 6, tw, fs * 1.55); g.fill(); g.fillStyle = k.id === PK.sel ? "#fff" : "#3a2a55"; g.textAlign = "center"; g.fillText(n, k.x, k.y + 6 + fs * 1.13); }
    if (k.id === PET.kid) { g.font = `${18 / Math.max(.7, z)}px sans-serif`; g.textAlign = "center"; g.fillText("⭐", k.x, k.y - H - 8 - bob); }
  }
}
// ---------- Jeux du parc : de temps en temps (2 ans et plus), un enfant utilise une installation ----------
const ACT_MAX = 9, bez = (p, a, b, c, d) => { const q = 1 - p; return q * q * q * a + 3 * q * q * p * b + 3 * q * p * p * c + p * p * p * d; }, mixN = (a, b, p) => a + (b - a) * Math.max(0, Math.min(1, p)), SWT = [0, 0];
const ballG = (g, x, y, r, c = "#fff") => { g.fillStyle = c; g.strokeStyle = "#4a4558"; g.lineWidth = 2; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke(); };
const swSeat = n => { const a = SWT[n], x0 = 1560 + [-26, 48][n]; return [x0 + Math.sin(a) * 130, 705 + Math.cos(a) * 130, a, x0]; };
function drawSwings(g) { // les deux balançoires, toujours dessinées à part du décor
  for (let n = 0; n < 2; n++) { const [x, y, a, x0] = swSeat(n), busy = [...PK.kids.values()].some(k => k.act && k.act.on && k.act.slot === "bal" + n); if (!busy) SWT[n] *= .97; g.strokeStyle = "#8a7a8a"; g.lineWidth = 4; g.beginPath(); for (const s of [-24, 24]) { g.moveTo(x0 + s, 705); g.lineTo(x + s * Math.cos(a), y - s * Math.sin(a)); } g.stroke(); g.save(); g.translate(x, y); g.rotate(-a); g.fillStyle = ["#f06a6a", "#5fa8f0"][n]; g.beginPath(); if (g.roundRect) g.roundRect(-34, -4, 68, 14, 7); else g.rect(-34, -4, 68, 14); g.fill(); g.restore(); }
}
// f(t, p, H) : place du dessin (x, y = pieds), r = inclinaison, sy = tassement, z = profondeur, cut = hauteur sous laquelle il est caché
const PARC_ACTS = [
  { slot: "tob", at: [890, 570], end: [1232, 576], dur: 7, f: (t, p, H) => p < .34 ? { x: 890, y: mixN(566, 386, p / .34), z: 566, r: Math.sin(t * 9) * .05 } : p < .46 ? { x: mixN(890, 946, (p - .34) / .12), y: 386, z: 566, sy: .86 } : p < .7 ? (q => ({ x: 960 + bez(q, -20, 60, 80, 236), y: 560 + bez(q, -186, -176, -50, -18) + 8, z: 575, r: .34 * Math.sin(q * 3.1) + .1, sy: .82 }))(((p - .46) / .24) ** 1.5) : { x: mixN(1196, 1232, (p - .7) / .1), y: 576, z: 576, sy: p < .78 ? .9 : 1, hop: p > .8 ? Math.abs(Math.sin(t * 6)) * 8 : 0 } },
  ...[0, 1].map(n => ({ slot: "bal" + n, at: [1534 + n * 74, 925], end: [1534 + n * 74, 940], dur: 12, f: (t, p, H) => { SWT[n] = Math.sin(t * 2.5) * .55 * Math.min(1, t / 2.5) * Math.min(1, (12 - t) / 2); const [x, y, a] = swSeat(n); return { x, y: y + H * .3, r: -a, z: 899, piv: H * .3, air: 1 }; } })),
  ...[[272, 590], [350, 604], [430, 588]].map(([x, y], n) => ({ slot: "sab" + n, at: [x, y], end: [x, y + 20], dur: 14, f: (t, p, H) => ({ x, y: y + 2, z: y, sy: .8 + Math.sin(t * 5) * .03, r: Math.sin(t * 2.5) * .06 }), post: (g, s, H, t, p) => { const k = Math.min(1, p * 1.5) * .8 + .12; g.save(); g.translate(x + 44, y + 6); g.scale(k, k); g.fillStyle = "#e5bd6a"; g.strokeStyle = "#b5873c"; g.lineWidth = 2; g.beginPath(); g.moveTo(-26, 0); g.lineTo(-22, -26); for (const a of [-22, -14, -14, -6, -6, 6, 6, 14, 14, 22]) g.lineTo(a, (a / 8 | 0) % 2 ? -26 : -32); g.lineTo(22, -26); g.lineTo(26, 0); g.closePath(); g.fill(); g.stroke(); if (p > .6) { g.strokeStyle = "#8a5a30"; g.beginPath(); g.moveTo(0, -30); g.lineTo(0, -50); g.stroke(); g.fillStyle = "#ff6f9c"; g.beginPath(); g.moveTo(0, -50); g.lineTo(16, -45); g.lineTo(0, -39); g.fill(); } g.restore(); } })),
  { slot: "bat", at: [1330, 562], end: [1330, 566], dur: 18, f: (t, p, H) => { const e = p < .06 ? p / .06 : p > .94 ? (1 - p) / .06 : 1, a = Math.PI / 2 + p * 6.283, x = 1330 + Math.cos(a) * 130, y = 432 + Math.sin(a) * 34; return { x, y: mixN(562, y, e) + Math.sin(t * 2) * 2, z: mixN(562, y, e) + 30, r: Math.sin(t * 2) * .04, cut: e >= 1 ? y - H * .16 : null, air: 1, boat: e >= 1 ? [x, y, Math.sin(t * 2) * .04] : null, sy: .94 }; }, post: (g, s) => { if (!s.boat) return; const [x, y, r] = s.boat; g.save(); g.translate(x, y); g.rotate(r); g.fillStyle = "#e5646f"; g.strokeStyle = "#8f2a34"; g.lineWidth = 3; g.beginPath(); g.moveTo(-46, -18); g.lineTo(46, -18); g.quadraticCurveTo(38, 14, 22, 14); g.lineTo(-22, 14); g.quadraticCurveTo(-38, 14, -46, -18); g.closePath(); g.fill(); g.stroke(); g.fillStyle = "#fff"; g.fillRect(-40, -12, 80, 5); g.restore(); } },
  ...[0, 1, 2].map(n => ({ slot: "ron" + n, at: [640 + (n - 1) * 70, 1016], end: [640 + (n - 1) * 110, 1060], dur: 9, f: (t, p, H) => { const a = t * 1.5 + n * 2.09; return { x: 640 + Math.cos(a) * 96, y: 1000 + Math.sin(a) * 32, z: 1000 + Math.sin(a) * 32, hop: Math.abs(Math.sin(t * 6)) * 12, r: Math.sin(t * 6) * .06 }; } }))
];
const ITEM_ACTS = { // installations achetées : i = l'élément posé, k = son échelle
  trampo: (i, k) => ({ at: [i.x, i.y + 22], dur: 9, f: t => { const h = Math.abs(Math.sin(t * 3.3)); return { x: i.x, y: i.y - 30 * k, z: i.y + 1, hop: h * 88 * k, r: Math.sin(t * 3.3) * .1, sy: h < .15 ? .86 : 1, air: 1 }; } }),
  gonflable: (i, k) => ({ at: [i.x, i.y + 24], dur: 10, f: t => { const h = Math.abs(Math.sin(t * 2.9)); return { x: i.x + Math.sin(t * .9) * 60 * k, y: i.y - 58 * k, z: i.y + 1, hop: h * 60 * k, r: Math.sin(t * 2) * .14, sy: h < .15 ? .85 : 1, air: 1 }; } }),
  foot: (i, k) => ({ at: [i.x - 10, i.y + 86 * k], dur: 11, f: t => ({ x: i.x - 10 + Math.sin(t * 1.4) * 46 * k, y: i.y + 86 * k, z: i.y + 86 * k, hop: Math.abs(Math.sin(t * 7)) * 5, r: Math.sin(t * 7) * .05 }), post: (g, s, H, t) => { const q = (t % 2.2) / 2.2, u = Math.min(1, q * 1.6), a = Math.floor(t / 2.2) % 2 ? 46 : -46; ballG(g, mixN(s.x + 18, i.x + a * k, u), mixN(s.y - 8, i.y - 26 * k, u) - Math.sin(u * 3.14) * 34 * k, mixN(11, 8, u) * k); } }),
  basket: (i, k) => ({ at: [i.x - 96 * k, i.y + 14], dur: 11, f: t => ({ x: i.x - 96 * k, y: i.y + 14, z: i.y + 14, hop: t % 2.4 < .5 ? Math.sin((t % 2.4) / .5 * 3.14) * 22 * k : 0 }), post: (g, s, H, t) => { const q = t % 2.4; if (q > .3 && q < 1.5) { const u = (q - .3) / 1.2; ballG(g, mixN(s.x + 14, i.x, u), mixN(s.y - H, i.y - 112 * k, u) - Math.sin(u * 3.14) * 60 * k, 11 * k, "#f5873c"); } else if (q >= 1.5) ballG(g, i.x, mixN(i.y - 112 * k, i.y, ((q - 1.5) / .6) ** 2), 11 * k, "#f5873c"); else ballG(g, s.x + 18, s.y - H * .55, 11 * k, "#f5873c"); } }),
  tourniquet: (i, k) => ({ at: [i.x, i.y + 24], dur: 10, f: t => { const a = t * Math.min(3.2, .8 + t * .5); return { x: i.x + Math.cos(a) * 56 * k, y: i.y - 12 * k + Math.sin(a) * 13 * k, z: i.y + Math.sin(a) * 13, r: Math.cos(a) * .12, air: 1 }; } }),
  ressort: (i, k) => ({ at: [i.x - 10, i.y + 22], dur: 9, f: (t, p, H) => ({ x: i.x - 12 * k + Math.sin(t * 4) * 9 * k, y: i.y - 34 * k + H * .12, z: i.y + 1, r: Math.sin(t * 4) * .2, piv: 0, cut: i.y - 40 * k, air: 1 }) }),
  manege: (i, k) => ({ at: [i.x, i.y + 26], dur: 14, f: t => { const a = t * 1.1; return { x: i.x + Math.cos(a) * 82 * k, y: i.y - 34 * k + Math.sin(a) * 12 * k, z: i.y + (Math.sin(a) > 0 ? 2 : -2), hop: (1 + Math.sin(t * 3)) * 9 * k, air: 1, sy: .94 }; } }),
  train: (i, k) => ({ at: [i.x, i.y + 24], dur: 11, f: (t, p, H) => ({ x: i.x + Math.sin(t * 5) * 1.5, y: i.y - 26 * k + H * .1, z: i.y + 1, cut: i.y - 50 * k, hop: Math.abs(Math.sin(t * 6)) * 3, air: 1 }) }),
  balles: (i, k) => ({ at: [i.x, i.y + 24], dur: 11, f: (t, p, H) => ({ x: i.x + Math.sin(t * 1.3) * 46 * k, y: i.y - 8 * k + H * .1, z: i.y + 1, cut: i.y - 36 * k, hop: Math.abs(Math.sin(t * 4)) * 9, air: 1 }), post: (g, s, H, t) => { ["#ff6f8f", "#ffd15c", "#8fe0f5"].forEach((c, n) => { const u = (t * .9 + n * .33) % 1; ballG(g, s.x + (n - 1) * 46 * k, i.y - 40 * k - Math.sin(u * 3.14) * 56 * k, 10 * k, c); }); } }),
  marelle: (i, k) => ({ at: [i.x, i.y + 10], dur: 9, f: t => { const L = [[0, -6], [0, -32], [-18, -58], [18, -58], [0, -84], [-18, -110], [18, -110], [0, -136]], q = t * 1.7, n = Math.floor(q), u = q - n, w = m => { const c = m % 14; return L[c < 8 ? c : 14 - c]; }, a = w(n), b = w(n + 1); return { x: i.x + mixN(a[0], b[0], u) * k, y: i.y + mixN(a[1], b[1], u) * k, z: i.y + mixN(a[1], b[1], u) * k + 200, hop: Math.sin(u * 3.14) * 16 * k }; } }),
  arceau: (i, k) => ({ at: [i.x, i.y + 22], dur: 9, f: (t, p, H) => ({ x: i.x + Math.sin(t * .8) * 40 * k, y: i.y - 96 * k + H * .95, z: i.y + 1, r: Math.sin(t * 3) * .16, piv: H * .95, air: 1 }) }),
  scene: (i, k) => ({ at: [i.x, i.y + 22], dur: 12, f: t => ({ x: i.x + Math.sin(t * 1.6) * 42 * k, y: i.y - 24 * k, z: i.y + 1, hop: Math.abs(Math.sin(t * 5)) * 12, r: Math.sin(t * 5) * .12, air: 1 }), post: (g, s, H, t) => { g.font = `${22 * k}px sans-serif`; g.textAlign = "center"; ["♪", "♫"].forEach((c, n) => { const u = (t * .5 + n * .5) % 1; g.globalAlpha = 1 - u; g.fillStyle = ["#8f5fd8", "#ff6f9c"][n]; g.fillText(c, s.x + (n ? 34 : -34) * k + Math.sin(u * 6) * 6, s.y - H * .8 - u * 50 * k); g.globalAlpha = 1; }); } }),
  bulles: (i, k) => ({ at: [i.x + 64 * k, i.y + 12], dur: 9, f: t => ({ x: i.x + 64 * k, y: i.y + 12, z: i.y + 12, hop: Math.abs(Math.sin(t * 4)) * 18 }), post: (g, s, H, t) => { for (let n = 0; n < 5; n++) { const u = (t * .35 + n * .2) % 1; g.strokeStyle = "#8fc9ec"; g.fillStyle = "rgba(229,248,255,.5)"; g.lineWidth = 2; g.globalAlpha = 1 - u * .8; g.beginPath(); g.arc(i.x + Math.sin(n * 2.1 + u * 5) * 50 * k, i.y - (60 + u * 110) * k, (6 + n * 2) * k, 0, 7); g.fill(); g.stroke(); g.globalAlpha = 1; } } }),
  picnic: (i, k) => ({ at: [i.x + 10, i.y - 2], dur: 12, f: t => ({ x: i.x + 10, y: i.y - 2, z: i.y + 1, sy: .8 + Math.sin(t * 3) * .02, r: Math.sin(t * 1.6) * .05 }) }),
  banc: (i, k) => ({ at: [i.x, i.y + 14], dur: 11, f: (t, p, H) => ({ x: i.x, y: i.y - 2, z: i.y + 1, sy: .86, r: Math.sin(t * 1.5) * .04 }) }),
  peinture: (i, k) => ({ at: [i.x - 52 * k, i.y + 12], dur: 10, f: t => ({ x: i.x - 52 * k + Math.sin(t * 3) * 5, y: i.y + 12, z: i.y + 12, r: Math.sin(t * 3) * .07 }) }),
  telescope: (i, k) => ({ at: [i.x - 44 * k, i.y + 8], dur: 8, f: t => ({ x: i.x - 44 * k, y: i.y + 8, z: i.y + 8, r: -.07 + Math.sin(t) * .02 }) })
};
function actFor(i) { const mk = ITEM_ACTS[i.k]; return mk ? { slot: i, item: i, ...mk(i, itemK(i.y)) } : null; }
function actList(k) { // ce qui est libre et pas trop loin
  const busy = new Set([...PK.kids.values()].filter(q => q !== k && q.act).map(q => q.act.slot)); if (busy.size >= ACT_MAX) return [];
  return [...(PK.edit ? [] : PET.park.items.map(actFor).filter(Boolean).flatMap(a => [a, a])), ...PARC_ACTS].filter(a => !busy.has(a.slot) && Math.hypot(a.at[0] - k.x, a.at[1] - k.y) < 760);
}
function actStart(k, only) {
  const L = only || actList(k); if (!L.length) return false; const a = pickOne(L), [x, y] = a.at; if (inPond(x, y)) return false;
  for (let i = 1; i <= 10; i++) if (inPond(k.x + (x - k.x) * i / 10, k.y + (y - k.y) * i / 10)) return false;
  k.act = { ...a, on: false, t: 0 }; k.tx = x; k.ty = y; return true;
}
function actStep(k, dt) { const a = k.act; a.t += dt; k.moving = false; if (a.t < a.dur && !(a.item && (PK.edit || !PET.park.items.includes(a.item)))) return; const [x, y] = a.end || a.at; k.x = k.tx = x; k.y = k.ty = y; k.act = null; k.wait = 2 + Math.random() * 5; }
function drawActing(g, k, z, dpr) {
  const st = stgOf(k.id), sp = PK.spr.get(k.id + "|" + st), a = k.act, s = k.s, H = PKH[st] * (.86 + .28 * (a.at[1] / PK.H)), hop = s.hop || 0;
  if (!s.air) { g.fillStyle = "rgba(40,60,30,.2)"; g.beginPath(); g.ellipse(s.x, s.y, H * .26, H * .06, 0, 0, 7); g.fill(); }
  if (k.id === PK.sel || k.id === PET.kid) { g.strokeStyle = k.id === PK.sel ? "#7c5cf0" : "#f5b22e"; g.lineWidth = 4; g.beginPath(); g.ellipse(s.x, s.y - hop, H * .36, H * .1, 0, 0, 7); g.stroke(); }
  if (sp) { g.save(); if (s.cut) { g.beginPath(); g.rect(s.x - 400, s.y - 900, 800, 900 - (s.y - s.cut)); g.clip(); } const pv = s.piv || 0, sw = sp.w * H, sh = sp.h * H, px = sh * z * dpr, im = sp.mip[px < SPR_H * .3 ? 2 : px < SPR_H * .62 ? 1 : 0]; g.translate(s.x, s.y - hop - pv); g.rotate(s.r || 0); g.translate(0, pv); g.scale(1, s.sy || 1); g.drawImage(im, -sw * sp.cx, -sh * sp.by, sw, sh); g.restore(); }
  if (a.post) a.post(g, s, H, a.t, a.t / a.dur);
  PK.hits.push([k.id, s.x, s.y - hop, H]);
  if (k.id === PK.sel || z > 1.15) { const n = shortName(ANIMAL_BY_ID[k.id]), fs = Math.max(11, 13 / z * Math.min(z, 1.2)); g.font = `800 ${fs}px Nunito, sans-serif`; const tw = g.measureText(n).width + fs; g.fillStyle = k.id === PK.sel ? "#7c5cf0" : "rgba(255,255,255,.9)"; g.beginPath(); if (g.roundRect) g.roundRect(s.x - tw / 2, s.y + 6, tw, fs * 1.55, fs); else g.rect(s.x - tw / 2, s.y + 6, tw, fs * 1.55); g.fill(); g.fillStyle = k.id === PK.sel ? "#fff" : "#3a2a55"; g.textAlign = "center"; g.fillText(n, s.x, s.y + 6 + fs * 1.13); }
  if (k.id === PET.kid) { g.font = `${18 / Math.max(.7, z)}px sans-serif`; g.textAlign = "center"; g.fillText("⭐", s.x, s.y - H - 8 - hop); }
}
const shortName = a => a.name;
let parkT = 0; const CALM = matchMedia("(prefers-reduced-motion: reduce)");
function parkLoop(ts) {
  const cv = parkCv(); if (!cv) { PK.raf = 0; return; } PK.raf = requestAnimationFrame(parkLoop); if (document.hidden || ts - parkT < 33) return; const dt = Math.min(.1, (ts - parkT) / 1000); parkT = ts; const bx = cv.getBoundingClientRect(); if (bx.bottom < 0 || bx.top > innerHeight) return;
  if (!CALM.matches) for (const k of PK.kids.values()) {
    const st = stgOf(k.id), v = [0, 20, 34, 52, 46, 48][st]; k.ph += dt; if (k.act && k.act.on) { actStep(k, dt); continue; } if (k.id === PK.sel || !v) { k.moving = false; continue; }
    const dx = k.tx - k.x, dy = k.ty - k.y, d = Math.hypot(dx, dy);
    if (d < 4) { k.moving = false; if (k.act) { k.act.on = true; k.act.t = 0; continue; } k.wait -= dt; if (k.wait <= 0 && st > 1 && Math.random() < .3 && actStart(k)) continue; if (k.wait <= 0) { k.wait = 1 + Math.random() * 6; const near = PET.park.items.length && Math.random() < .35 ? PET.park.items.filter(i => Math.hypot(i.x - k.x, i.y - k.y) < 520) : [], go = near.length ? pickOne(near) : null, a = Math.random() * 6.283, q = 50 + Math.random() * 190; if (go) { k.tx = Math.max(60, Math.min(1740, go.x + (Math.random() - .5) * 150)); k.ty = Math.max(330, Math.min(1120, go.y + 8 + Math.random() * 34)); k.wait = 5 + Math.random() * 7; } else k.tx = Math.max(60, Math.min(1740, k.x + Math.cos(a) * q)); if (!go) k.ty = Math.max(330, Math.min(1120, k.y + Math.sin(a) * q * .6)); for (let i = 1; i <= 8; i++) if (inPond(k.x + (k.tx - k.x) * i / 8, k.y + (k.ty - k.y) * i / 8)) { k.tx = k.x; k.ty = k.y; break; } } }
    else { k.moving = true; k.dir = dx > 0 ? 1 : -1; k.x += dx / d * v * dt; k.y += dy / d * v * dt; }
  }
  parkDraw();
}
function parkCard() { // la fiche de l'enfant touché dans le parc (ou de l'élément, en mode aménagement)
  if (PK.edit) { const i = PET.park.items[PK.isel], x = i && PARC.byId[i.k]; return x ? `<div class="pkc"><span class="pki">${PARC.svg(x)}</span><span class="pkt"><b>${esc(x.n)}</b><span class="small">Fais-le glisser pour le déplacer</span></span><button data-act="pkFlip">Retourner</button><button data-act="pkBag">Ranger</button></div>` : `<span class="small">${PET.park.items.length ? "Touche un élément que tu as posé pour le déplacer, le retourner ou le ranger." : "Achète un élément dans « Aménager le parc », juste en dessous."}</span>`; }
  const a = ANIMAL_BY_ID[PK.sel]; if (!a || !PET.kids.includes(a.id)) return `<span class="small">${PET.kids.length > 1 ? "Glisse pour te promener, pince ou utilise + et − pour zoomer." : ""}</span>`;
  const on = PET.kid === a.id; return `<div class="pkc"><span class="pki">${petSvg(a, "thumb")}</span><span class="pkt"><b>${esc(a.name)}</b><span class="ager"><span class="small">${stageName(a.id, stgOf(a.id))}</span>${parkBtn(a.id)}</span></span><button class="fav2 ${PET.fav[a.id] ? "on" : ""}" data-act="fav" data-id="${a.id}" aria-label="Favori">${PET.fav[a.id] ? "♥" : "♡"}</button><button class="${on ? "" : "primary"}" data-act="setKid" data-id="${a.id}" ${on ? 'data-off="1"' : ""}>${on ? "Raccompagner" : "Garder cet enfant"}</button></div>`;
}
function parkPick(px, py) { const cv = parkCv(), x = PK.x + (px - cv.clientWidth / 2) / PK.z, y = PK.y + (py - cv.clientHeight / 2) / PK.z; let best = null, bd = 1e9; for (const [id, kx, ky, H] of PK.hits || []) { const r0 = Math.max(H * .42, 22 / PK.z), dx = Math.abs(x - kx), dy = y - (ky - H / 2); if (dx < r0 && Math.abs(dy) < H / 2 + 14 / PK.z) { const d = dx + Math.abs(dy) * .4 - ky * .01; if (d < bd) { bd = d; best = id; } } } PK.sel = best; const c = document.getElementById("parkcard"); if (c) c.innerHTML = parkCard(); parkDraw(); }
function parkStart() { // branche les gestes (souris, doigt, pincement, molette, clavier)
  const cv = parkCv(); if (!cv) return; parkSync(); if (!PK.raf) PK.raf = requestAnimationFrame(parkLoop); if (PK.z && PK.z < parkAll(cv)) PK.z = parkAll(cv); parkDraw();
  const P = new Map(); let moved = 0, d0 = 0; const pos = e => { const b = cv.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; };
  cv.addEventListener("gesturestart", e => e.preventDefault());
  cv.onpointerdown = e => { try { cv.setPointerCapture(e.pointerId); } catch {} P.set(e.pointerId, pos(e)); if (P.size === 1) { moved = 0; PK.drag = -1; if (PK.edit) { const n = itemAt(...pos(e)); if (n >= 0) { PK.drag = n; PK.isel = n; parkDraw(); } } } if (P.size === 2) { const [a, b] = [...P.values()]; d0 = Math.hypot(a[0] - b[0], a[1] - b[1]); moved = 99; } };
  cv.onpointermove = e => { if (!P.has(e.pointerId)) return; const q = pos(e), o = P.get(e.pointerId); if (P.size === 1) { moved += Math.hypot(q[0] - o[0], q[1] - o[1]); if (moved > 6 && PK.drag >= 0) { const i = PET.park.items[PK.drag]; i.x = Math.max(60, Math.min(1740, i.x + (q[0] - o[0]) / PK.z)); i.y = Math.max(300, Math.min(1130, i.y + (q[1] - o[1]) / PK.z)); parkDraw(); } else if (moved > 6) { PK.x -= (q[0] - o[0]) / PK.z; PK.y -= (q[1] - o[1]) / PK.z; parkClamp(cv); parkDraw(); } P.set(e.pointerId, q); } else if (P.size === 2) { P.set(e.pointerId, q); const [a, b] = [...P.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (d0 > 0) parkZoom(d / d0, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2); d0 = d; } };
  const up = e => { if (!P.has(e.pointerId)) return; const q = P.get(e.pointerId); P.delete(e.pointerId); if (!P.size && PK.drag >= 0) { PK.drag = -1; const c = document.getElementById("parkcard"); if (c) c.innerHTML = parkCard(); if (moved > 6) { const i = PET.park.items[PK.isel]; i.x = Math.round(i.x); i.y = Math.round(i.y); parkSave(); } return; } if (!P.size && moved <= 8 && e.type === "pointerup") { if (PK.edit) { PK.isel = -1; const c = document.getElementById("parkcard"); if (c) c.innerHTML = parkCard(); parkDraw(); } else parkPick(q[0], q[1]); } }; cv.onpointerup = up; cv.onpointercancel = up;
  cv.onwheel = e => { e.preventDefault(); const q = pos(e); parkZoom(Math.exp(-e.deltaY * .0016), q[0], q[1]); };
  cv.onkeydown = e => { const s = 60 / PK.z, m = { ArrowLeft: [-s, 0], ArrowRight: [s, 0], ArrowUp: [0, -s], ArrowDown: [0, s] }[e.key]; if (m) { e.preventDefault(); PK.x += m[0]; PK.y += m[1]; parkClamp(cv); parkDraw(); } else if (e.key === "+" || e.key === "=") parkZoom(1.3); else if (e.key === "-") parkZoom(.77); };
}
addEventListener("resize", () => { const cv = parkCv(); if (cv) { PK.z = Math.max(PK.z, parkAll(cv)); parkDraw(); } });
const parkView = () => `<div class="park"><canvas id="park" tabindex="0" role="img" aria-label="Le parc de la garderie : ${plural(PET.kids.length, "enfant")}"></canvas><div class="pkbtn"><button data-act="pkZ" data-f="1.4" aria-label="Zoomer">+</button><button data-act="pkZ" data-f="0.71" aria-label="Dézoomer">−</button><button data-act="pkAll" aria-label="Voir tout le parc">⛶</button>${PET.kid && inPark(PET.kid) ? `<button data-act="pkMe" aria-label="Aller vers l'enfant que je garde">⭐</button>` : ""}<button data-act="pkEdit" class="${PK.edit ? "on" : ""}" aria-label="Aménager le parc" aria-pressed="${PK.edit}">🔨</button></div></div><div id="parkcard">${parkCard()}</div>`;
function viewGarderie() {
  syncDaily(); const n = PET.kids.length, ask = dailyAsk(), kid = ANIMAL_BY_ID[PET.kid], so = PET.ksort || "arr";
  if (!n) return `<section class="card empty"><h2>La garderie</h2>${parkView()}<p>${KIDS.length} enfants t'attendent !</p><p class="small">Le premier arrive dans ${plural(kidLeft(), "bonne réponse", "bonnes réponses")}, puis un toutes les 10 à 20 bonnes réponses.</p><a class="btn primary" href="#/g">Commencer une série</a></section>`;
  const F = [["all", `Tous (${n})`], ["s", "Petits"], ["m", "Moyens"], ["l", "Grands"], ["fav", `Favoris (${PET.kids.filter(id => PET.fav[id]).length})`], ["in", `Dans le parc (${parkN()})`], ["out", `Hors du parc (${n - parkN()})`]], SO = [["arr", "Ordre d'arrivée"], ["mine", "Mon ordre"], ["filles", "Filles d'abord"], ["gars", "Garçons d'abord"], ["age", "Âge"], ["name", "Nom (A à Z)"]], GE = [["f", "Filles"], ["m", "Garçons"], ["n", "Prénoms mixtes"]];
  return `<section class="card"><h2>La garderie</h2><p class="big">${n} / ${KIDS.length} enfants <span class="small" id="parkn">· ${parkN()} dans le parc</span></p><div class="xpbar"><i style="width:${pct(n, KIDS.length)}%"></i></div>${n < KIDS.length ? `<p class="small">Prochain enfant dans ${plural(kidLeft(), "bonne réponse", "bonnes réponses")}.</p>` : ""}${parkView()}</section>
  ${parkShop()}
  <section class="card"><h2>L'enfant que je garde</h2>${kidCard(kid, ask)}</section>
  <details class="card fold" id="klist" ${OPENS.klist ? "open" : ""}><summary>Tous les enfants <span class="small">${n}</span></summary>${OPENS.klist ? `<div class="chips">${F.map(([k, l]) => `<button data-act="kF" data-k="${k}" class="${KF.f === k ? "on" : ""}">${l}</button>`).join("")}</div><div class="chips">${GE.map(([k, l]) => `<button data-act="kG" data-k="${k}" class="${KF.g === k ? "on" : ""}">${l}</button>`).join("")}</div><div class="mfilter"><input type="search" id="ksearch" placeholder="Rechercher un enfant…" value="${esc(KF.q)}"><select id="ksort" aria-label="Trier par">${SO.map(([k, l]) => `<option value="${k}" ${so === k ? "selected" : ""}>${l}</option>`).join("")}</select><button class="sm ${KF.move ? "primary" : ""}" data-act="kMove">${KF.move ? "✔ Terminé" : "Réorganiser"}</button></div><div class="actions"><button class="sm" data-act="kAll" data-d="1">+ Tous dans le parc</button><button class="sm" data-act="kAll" data-d="0">− Vider le parc</button></div>
  <div class="mgrid" id="kgrid">${kidCards()}</div>` : ""}</details>`;
}

// ======================== Routeur ========================
function route() { return (location.hash || "#/g").replace(/^#\/?/, "").split("/").map(x => { try { return decodeURIComponent(x); } catch { return x; } }); }
let LAST = "";
function render() {
  let [p0, p1] = route(); let html, title = "Révisions anat", tab = null, scrollTo = null;
  if (p0 === "zone") { ZOPEN = ZONES[p1] ? p1 : null; if (ZOPEN) { OPENS.zprog = true; if (ZOPEN === "dos") BODY.view = "b"; scrollTo = "z-" + ZOPEN; } history.replaceState(null, "", "#/corps"); p0 = "corps"; }
  const y = window.scrollY, same = LAST === location.hash;
  try {
    if (!QS.length) html = `<div class="card">Les questions n'ont pas pu être chargées (fichier questions.js manquant).</div>`;
    else if (TABS.some(t => t.id === p0)) { tab = p0; html = viewTab(p0); }
    else if (p0 === "quiz") { title = "QCM"; html = viewQuiz(); }
    else if (p0 === "fiches") { title = "Fiches"; html = viewFiches(p1 || ""); }
    else if (p0 === "fiche") { title = "Fiche"; html = viewFiche(p1); }
    else if (p0 === "rev") { tab = p1 || "g"; title = "Révision"; html = viewRev(p1 || "g", route()[2] || ""); }
    else if (p0 === "vert") { title = "Vertèbre " + p1; html = viewVert(p1); }
    else if (p0 === "nx") { const r = route(); title = "Nerf"; html = viewNx(p1, r[2], r[3]); }
    else if (p0 === "corps") { title = "Mon corps d'anat"; html = viewCorps(); }
    else if (p0 === "menagerie") { title = "Ma ménagerie"; html = viewMenagerie(); }
    else if (p0 === "garderie") { title = "La garderie"; html = viewGarderie(); }
    else if (p0 === "sync") { MSG = importWidget(p1 || ""); history.replaceState(null, "", "#/widget"); title = "Widget"; html = viewWidget(); }
    else if (p0 === "widget") { title = "Widget"; html = viewWidget(); }
    else if (p0 === "reglages") { title = "Réglages"; html = viewSettings(); }
    else if (p0 === "msp") { title = "MSP"; if (window.MSPV) { const r = MSPV.view(route().slice(1)); title = r.title || "MSP"; html = r.html; } else { mspLoad(); html = `<div class="card">Chargement du module MSP… <span class="small">(il faut une connexion internet la première fois)</span></div>`; } }
    else { tab = p0 = "g"; html = viewTab("g"); }
  } catch (e) { console.error(e); html = `<div class="card">Erreur : ${esc(e.message)} <a href="#/g">Accueil</a></div>`; }
  renderTabs(tab, p0 === "rev" ? "rev/" : "");
  $("#app").innerHTML = html; $("#title").textContent = title; document.body.classList.toggle("inquiz", p0 === "quiz" && !!SESSION && SESSION.pos < SESSION.ids.length);
  const nav = TABS.some(t => t.id === p0) || p0 === "quiz" || p0 === "msp" ? "g" : ["rev", "fiche", "fiches", "vert", "nx"].includes(p0) ? "fiches" : p0 === "widget" ? "reglages" : p0;
  document.querySelectorAll(".bottom-nav a").forEach(a => a.classList.toggle("active", a.dataset.n === nav));
  if (p0 === "reglages") offlineInfo();
  fitStage(); parkStart(); offCard(); fitStage(); hydrateImgs(); hydrateArts(); LAST = location.hash;
  if (scrollTo) document.getElementById(scrollTo)?.scrollIntoView({ block: "start" }); else window.scrollTo(0, same ? y : 0);
  if (p0 === "quiz") { const n = document.getElementById("nextBtn"); if (n && SESSION && SESSION.answered != null) n.focus({ preventScroll: true }); }
}

const offPacks = () => [...new Set([...Object.values(D.imgs || {}), ...Object.values(GIFT.TAB).map(a => a.pack)])];
async function offCard() { // application installée : propose une fois de tout garder pour le hors ligne
  const d = document.getElementById("offcard"); if (!d || !STANDALONE() || SET.offLater || !navigator.onLine || !("caches" in window)) return;
  try { const c = await caches.open(CNAME), has = new Set((await c.keys()).map(r => new URL(r.url).pathname.split("/").pop())), miss = offPacks().filter(p => !has.has(p + ".js")).length; if (!miss || !document.body.contains(d)) return;
    d.innerHTML = `<section class="card"><b>Tout garder sans internet ?</b><p class="small">Le jeu, les questions et les fiches marchent déjà hors ligne. Il reste les photos de cours et les tableaux (environ 55 Mo, de préférence en Wi-Fi).</p><div class="actions"><button class="primary" data-act="dlImgs">Tout télécharger</button><button data-act="offLater">Plus tard</button></div></section>`; } catch {}
}
async function offlineInfo() { // état réel du stockage hors ligne
  const el = document.getElementById("offst"); if (!el) return;
  try {
    const packs = offPacks(), c = await caches.open(CNAME), has = new Set((await c.keys()).map(r => new URL(r.url).pathname.split("/").pop()));
    const core = ["app.js", "questions.js", "style.css"].every(f => has.has(f)), n = packs.filter(p => has.has(p + ".js")).length;
    el.textContent = !core ? "Application pas encore enregistrée : rouvre-la une fois avec internet." : n === packs.length ? "✔ Tout est disponible hors ligne." : `✔ Application disponible hors ligne · photos : ${n}/${packs.length} paquets téléchargés.`;
  } catch { el.textContent = "Hors ligne indisponible dans ce navigateur."; }
}
// ======================== Actions ========================
const zoneStart = (z, l) => { l = shuffle(l.map(q => q.id)); if (SET.len < 100) l = l.slice(0, SET.len); startSession("corps", "todo", l, "Zone : " + ZONES[z]); };
const ACT = {
  zone: el => { const z = el.dataset.z; ZOPEN = ZOPEN === z && el.dataset.from ? null : z; if (ZOPEN) OPENS.zprog = true; render(); if (ZOPEN) document.getElementById("z-" + z)?.scrollIntoView({ behavior: "smooth", block: "start" }); },
  bview: el => { BODY.view = el.dataset.v; save(K_BODY, BODY); render(); },
  equip: el => { const a = ACC_BY[el.dataset.id]; if (a && has(a)) { wear(a, !isEq(a)); save(K_BODY, BODY); render(); } },
  off: () => { BODY.eq = {}; WARD.eq = {}; save(K_WARD, WARD); save(K_BODY, BODY); render(); },
  rnd: () => { BODY.eq = {}; WARD.eq = {}; const seen = new Set(), pool = [...BODY.got.map(id => ACC_BY[id]), ...WARD.got.map(id => SHOP.byId[id]).filter(i => i.s)]; for (const a of shuffle(pool)) if (!clash(a.s).some(s => seen.has(s)) && Math.random() < .62) { seen.add(a.s); wear(a, true); } save(K_BODY, BODY); render(); },
  wTab: el => { WTAB = el.dataset.k; WUNI = ""; render(); },
  wUni: el => { WUNI = el.dataset.k; render(); document.getElementById("wgrid")?.scrollIntoView({ block: "center" }); },
  wItem: el => { const i = SHOP.byId[el.dataset.id]; if (!i) return; if (!WARD.got.includes(i.id)) return buyModal(i); useItem(i); render(); },
  wFree: () => { delete WARD.fab[WTAB]; save(K_WARD, WARD); render(); },
  wBuy: el => { const i = SHOP.byId[el.dataset.id]; if (!i || WARD.got.includes(i.id) || wallet() < i.price || level(xp()) < i.lvl) return; WARD.spent = (WARD.spent || 0) + i.price; WARD.got.push(i.id); useItem(i, true); document.querySelector(".modal")?.remove(); render(); toast(`${esc(i.name)} : c'est à toi !`, "ok"); },
  look: el => { BODY.look[el.dataset.k] = el.dataset.v; save(K_BODY, BODY); render(); },
  gtab: el => { TAB2 = el.dataset.k; render(); },
  gift: el => { DAILY.equipped[TAB2] = el.dataset.id || null; save(K_DAILY, DAILY); render(); },
  gearTab: el => { GTAB = el.dataset.k; render(); },
  gearWho: el => { GWHO = el.dataset.k; render(); },
  gearEq: el => { const g = GEAR.byId[el.dataset.id], q = gearSet(); if (!g || !PET.gear.got.includes(g.id)) return; if (q[g.s] === g.id) delete q[g.s]; else q[g.s] = g.id; save(K_PET, PET); render(); },
  gearOff: () => { const q = gearSet(); for (const s in q) delete q[s]; save(K_PET, PET); render(); },
  gearRnd: () => { const q = gearSet(); for (const s in q) delete q[s]; for (const g of shuffle(PET.gear.got.map(id => GEAR.byId[id]))) if (!q[g.s] && Math.random() < .75) q[g.s] = g.id; save(K_PET, PET); render(); },
  playPet: () => {
    const ids = compIds(); if (!ids.length) return; const list = replayable(); if (list.length) return startPlay(list);
    const ko = QS.filter(q => status(q) === "ko");
    modal(`<h2>Rien à rejouer pour l'instant</h2>${ids.map(id => petSvg(ANIMAL_BY_ID[id], "pet-svg lg")).join("")}<p>Ce jeu reprend les questions que tu as réussies, mais pas du premier coup.</p><p class="small">${ko.length ? "Tu peux jouer avec tes échecs : une fois réussis, ils arriveront ici." : "Réponds à quelques séries, puis reviens jouer !"}</p><div class="actions center">${ko.length ? `<button class="primary" data-act="playKo">Jouer avec mes échecs (${ko.length})</button>` : ""}<button data-act="closeM">Fermer</button></div>`);
  },
  playKo: () => startPlay(QS.filter(q => status(q) === "ko")),
  sleepPet: () => { // les compagnons dorment ensemble ; la sieste récompense toute la ménagerie, 3 fois par jour à plus de 10 min d'écart
    const n = compIds().length; if (!n) return; if (MOOD === "sleep") { MOOD = null; render(); return toast(n > 1 ? "Bien reposés !" : "Bien reposé !", "ok"); }
    MOOD = "sleep"; const z = sleepState(), now = Date.now(); let msg;
    if (z.n >= SLEEP_MAX) msg = `Chut, ${n > 1 ? "ils dorment" : "il dort"}… (déjà ${SLEEP_MAX} siestes récompensées aujourd'hui)`;
    else if (z.last && now - z.last < SLEEP_GAP) msg = `Chut, ${n > 1 ? "ils dorment" : "il dort"}… Prochaine sieste récompensée dans ${Math.ceil((SLEEP_GAP - (now - z.last)) / 60000)} min`;
    else { z.n++; z.last = now; ownedIds().forEach(id => { const c = petCare(id); c.happiness = Math.min(100, (c.happiness || 0) + SLEEP_JOY); }); save(K_PET, PET); msg = `Bonne sieste ! +${SLEEP_JOY} % de bonheur pour toute la ménagerie (${z.n}/${SLEEP_MAX} aujourd'hui)`; }
    render(); toast(msg, "ok"); },
  artNav: el => { const i = TAB.got.indexOf(TAB.cur), n = TAB.got.length; if (!n) return; TAB.cur = TAB.got[(i + Number(el.dataset.d) + n) % n]; save(K_TAB, TAB); render(); },
  galOpen: () => { GALOPEN = true; render(); document.getElementById("gal")?.scrollIntoView({ behavior: "smooth", block: "start" }); },
  expose: el => { if (TAB.got.includes(el.dataset.id)) { TAB.cur = el.dataset.id; save(K_TAB, TAB); } document.querySelector(".modal")?.remove(); render(); toast("Tableau exposé !", "ok"); },
  closeM: () => document.querySelector(".modal")?.remove(),
  fav: el => { const id = el.dataset.id; if (PET.fav[id]) delete PET.fav[id]; else PET.fav[id] = 1; save(K_PET, PET); const g = document.getElementById("mgrid"); if (g) g.innerHTML = menagerieCards(); else { const c = document.getElementById("parkcard"), k = document.getElementById("kgrid"); if (c) c.innerHTML = parkCard(); if (k) k.innerHTML = kidCards(); } },
  mF: el => { MF.f = el.dataset.k; MF.n = 60; render(); },
  mMore: () => { MF.n += 60; document.getElementById("mgrid").innerHTML = menagerieCards(); },
  giftBuy: el => { const r = GIFT.byId[el.dataset.id]; if (!r || DAILY.got.includes(r.id)) return; const W = wallet(), can = W >= r.price;
    modal(`<h2>${esc(r.name)}</h2><div class="tryon">${persoSvg({ vb: r.cat === "decor" ? "-40 -62 480 716" : "60 -70 280 330", cls: "thumb", ...(r.cat === "decor" ? { behind: GIFT.scene(r.v) } : { hair: r.v }) })}</div><p class="big">${r.price} XP</p><p class="small">${can ? `Il te restera ${(W - r.price).toLocaleString("fr")} XP à dépenser. Ton niveau ne change pas.` : `Il te manque ${(r.price - W).toLocaleString("fr")} XP, soit environ ${plural(Math.ceil((r.price - W) / 10), "bonne réponse", "bonnes réponses")}.`}</p><div class="actions center">${can ? `<button class="primary" data-act="giftPay" data-id="${r.id}">Acheter</button>` : ""}<button data-act="closeM">${can ? "Pas maintenant" : "Fermer"}</button></div>`); },
  giftPay: el => { const r = GIFT.byId[el.dataset.id]; if (!r || DAILY.got.includes(r.id) || wallet() < r.price) return; WARD.spent = (WARD.spent || 0) + r.price; save(K_WARD, WARD); DAILY.got.push(r.id); DAILY.equipped[r.cat] = r.id; save(K_DAILY, DAILY); document.querySelector(".modal")?.remove(); render(); toast(`${esc(r.name)} : c'est à toi !`, "ok"); },
  feedPet: el => { const id = (el && el.dataset && el.dataset.id) || PET.companion || PET.flyer, k = isHuman(id) ? ".kidcard" : `.compone[data-id="${id}"]`, s0 = isHuman(id) ? ".stagepet.kidbox" : id === PET.flyer ? ".stagepet.flyer" : ".stagepet:not(.kidbox):not(.flyer)", r = feed(id); render(); if (r.ok) { document.querySelectorAll(`${k} .petbig .pet-svg,${s0} .pet-svg`).forEach(s => s.classList.add("happy")); } if (r.grew) document.querySelectorAll(`${k} .petbig .pet-svg.lg,${s0} .pet-svg:not(.baby)`).forEach(s => s.classList.add("grow")); toast(esc(r.msg), r.baby ? "baby" : r.ok ? "ok" : ""); },
  setKid: el => { const id = el.dataset.id; if (!PET.kids.includes(id)) return; PET.kid = PET.kid === id && el.dataset.off ? null : id; save(K_PET, PET); render(); toast(PET.kid ? `Tu gardes ${esc(ANIMAL_BY_ID[id].name)} !` : "De retour à la garderie !", "ok"); },
  pkTab: el => { PTAB = el.dataset.k; render(); },
  pkEdit: () => { PK.edit = !PK.edit; PK.isel = -1; PK.sel = null; if (PK.edit) OPENS.pkshop = true; render(); },
  pkFlip: () => { const i = PET.park.items[PK.isel]; if (!i) return; i.f = i.f ? 0 : 1; parkSave(); parkDraw(); },
  pkBag: () => { const i = PET.park.items[PK.isel]; if (!i) return; PET.park.items.splice(PK.isel, 1); PET.park.bag[i.k] = bagN(i.k) + 1; PK.isel = -1; parkSave(); render(); toast("Rangé dans ta réserve : tu pourras le reposer gratuitement.", "ok"); },
  pkBuy: el => { const x = PARC.byId[el.dataset.id]; if (!x) return; if (bagN(x.id)) { if (PET.park.items.length >= PARK_MAX) return placeItem(x.id); PET.park.bag[x.id]--; return placeItem(x.id); } const W = wallet(), can = W >= x.p; modal(`<h2>${esc(x.n)}</h2><div class="pkbig">${PARC.svg(x)}</div><p>💎 <b>${x.p} XP</b> · il te reste ${W.toLocaleString("fr")} XP</p>${can ? "" : `<p class="small">Il te manque ${(x.p - W).toLocaleString("fr")} XP.</p>`}<div class="actions center"><button class="primary" data-act="pkPay" data-id="${x.id}" ${can ? "" : "disabled"}>Acheter et poser</button><button data-act="closeM">Fermer</button></div>`); },
  pkPay: el => { const x = PARC.byId[el.dataset.id]; if (!x || wallet() < x.p) return; if (PET.park.items.length >= PARK_MAX) return placeItem(x.id); WARD.spent = (WARD.spent || 0) + x.p; save(K_WARD, WARD); document.querySelector(".modal")?.remove(); placeItem(x.id); toast(`${esc(x.n)} : fais glisser pour choisir sa place !`, "ok"); },
  pkTheme: el => { const x = PARC.themes.find(q => q.id === el.dataset.id); if (!x) return; if (PET.park.themes.includes(x.id)) { PET.park.theme = x.id; parkSave(); return render(); } const W = wallet(), can = W >= x.p; modal(`<h2>${esc(x.n)}</h2><p>Change les couleurs du parc.</p><p>💎 <b>${x.p} XP</b> · il te reste ${W.toLocaleString("fr")} XP</p><div class="actions center"><button class="primary" data-act="pkPayT" data-id="${x.id}" ${can ? "" : "disabled"}>${can ? "Acheter" : `Il te manque ${x.p - W} XP`}</button><button data-act="closeM">Fermer</button></div>`); },
  pkPayT: el => { const x = PARC.themes.find(q => q.id === el.dataset.id); if (!x || PET.park.themes.includes(x.id) || wallet() < x.p) return; WARD.spent = (WARD.spent || 0) + x.p; save(K_WARD, WARD); PET.park.themes.push(x.id); PET.park.theme = x.id; parkSave(); document.querySelector(".modal")?.remove(); render(); toast(`${esc(x.n)} : le parc a changé de couleurs !`, "ok"); },
  pkZ: el => parkZoom(+el.dataset.f), pkAll: () => { const cv = parkCv(); PK.z = parkAll(cv); PK.x = PK.W / 2; PK.y = PK.H / 2; parkDraw(); },
  pkMe: () => { const k = PK.kids.get(PET.kid), cv = parkCv(); if (!k) return; PK.sel = PET.kid; PK.z = Math.max(PK.z, 1.5); PK.x = k.x; PK.y = k.y - 50; parkClamp(cv); document.getElementById("parkcard").innerHTML = parkCard(); parkDraw(); },
  kMove: () => { KF.move = !KF.move; if (KF.move) { PET.korder = kidOrder(); if ((PET.ksort || "arr") !== "mine") { PET.korder = kidList(true).map(a => a.id); PET.ksort = "mine"; } KF.f = "all"; KF.g = ""; KF.q = ""; save(K_PET, PET); } render(); },
  kMv: el => { const o = kidOrder(), i = o.indexOf(el.dataset.id), d = +el.dataset.d, j = d < -50 ? 0 : Math.max(0, Math.min(o.length - 1, i + d)); if (i < 0 || i === j) return; o.splice(j, 0, o.splice(i, 1)[0]); PET.korder = o; save(K_PET, PET); document.getElementById("kgrid").innerHTML = kidCards(); },
  kPark: el => { const id = el.dataset.id; if (!PET.kids.includes(id)) return; if (PET.hid[id]) delete PET.hid[id]; else PET.hid[id] = 1; save(K_PET, PET); render(); },
  kAll: el => { PET.hid = {}; if (el.dataset.d === "0") PET.kids.forEach(id => { PET.hid[id] = 1; }); save(K_PET, PET); render(); },
  kG: el => { KF.g = KF.g === el.dataset.k ? "" : el.dataset.k; KF.n = 60; render(); },
  kF: el => { KF.f = el.dataset.k; KF.n = 60; render(); }, kMore: () => { KF.n += 60; render(); },
  setComp: el => { const id = el.dataset.id, a = ANIMAL_BY_ID[id]; if (!a) return; // deux places indépendantes : un animal terrestre et un animal volant
    const k = FLY(a) ? "flyer" : "companion";
    if (PET[k] === id) { PET[k] = null; save(K_PET, PET); render(); toast(`${esc(a.name)} se repose dans la ménagerie.`); return; }
    PET[k] = id; save(K_PET, PET); render(); toast(k === "flyer" ? `${esc(a.name)} vole avec toi !` : `${esc(a.name)} t'accompagne !`, "ok"); },
  zoneQuiz: el => { const z = el.dataset.z; let l = (ZQ[z] || []).filter(q => status(q) !== "ok"); if (!l.length) l = ZQ[z] || []; zoneStart(z, l); },
  zonePool: el => zoneStart(el.dataset.z, (ZQ[el.dataset.z] || []).filter(q => status(q) === el.dataset.pool)),
  start: el => startSession(el.dataset.tab, el.dataset.pool),
  okPick: el => { const L = okList(el.dataset.tab); OKN = 0; if (!L.length) return toast("Aucune question ici pour le moment."); const m = okMax(L);
    modal(`<h2>Déjà eu bon</h2><p class="small">Choisis les questions selon le nombre d'essais ratés avant d'avoir eu bon.</p><div class="range"><input id="okn" type="range" min="0" max="${m + 1}" step="1" value="0" data-tab="${esc(el.dataset.tab)}" aria-label="Nombre d'essais ratés"></div><p class="big" id="okTxt">${okTxt(0)}</p><p class="small" id="okN">${plural(L.length, "question")}</p><div class="actions center"><button class="primary" data-act="okGo" data-tab="${esc(el.dataset.tab)}">Lancer</button><button data-act="closeM">Fermer</button></div><p class="small">Si tu réussis du premier coup cette fois, la question passe dans « Eu bon directement ».</p>`); },
  okGo: el => { const L = okList(el.dataset.tab).filter(okIn); if (!L.length) return; document.querySelector(".modal")?.remove(); let l = shuffle(L.map(q => q.id)); if (SET.len < 100) l = l.slice(0, SET.len); startSession(el.dataset.tab, "ok", l, OKN ? `Déjà eu bon : ${okTxt(OKN).toLowerCase()}` : "Déjà eu bon"); },
  reg: el => { SET.reg = el.dataset.reg; save(K_SET, SET); render(); },
  answer: el => answer(Number(el.dataset.i)),
  toggle: el => { const S = SESSION, i = Number(el.dataset.i); if (!S || S.answered != null) return; S.sel = S.sel.includes(i) ? S.sel.filter(x => x !== i) : [...S.sel, i]; saveSession(); render(); },
  valid: () => { if (SESSION && SESSION.sel && SESSION.sel.length) answer(0); },
  dlImgs: async el => {
    const packs = offPacks(); let ok = 0; el.disabled = true; const c = await caches.open(CNAME).catch(() => null);
    for (const p of packs) { try { const u = p + ".js", had = c && await c.match(u); if (had) ok++; else { const r = await fetch(u); if (r.ok) { if (c) await c.put(u, r); else await r.blob(); ok++; } } } catch {} el.textContent = `Téléchargement… ${ok} / ${packs.length}`; }
    el.textContent = ok === packs.length ? "✔ Tout est disponible hors ligne" : `${packs.length - ok} fichier(s) manquant(s) : réessaie avec une bonne connexion`; el.disabled = false; offlineInfo();
  },
  offLater: () => { SET.offLater = true; save(K_SET, SET); const d = document.getElementById("offcard"); if (d) d.innerHTML = ""; },
  next: () => { const S = SESSION; if (!S || S.answered == null) return; document.querySelectorAll(".petpop").forEach(x => x.remove()); Object.assign(S, { pos: S.pos + 1, answered: null, opts: null, sel: null, ev: null, say: "", lvUp: 0, gain: 0, undo: null, wiped: false }); if (S.pos >= S.ids.length) { endPlay(S); endAsk(S); } saveSession(); render(); window.scrollTo(0, 0); },
  stop: () => { // quitter en cours de route : ce qui est répondu est gardé
    const S = SESSION; if (!S) return; const n = S.pos + (S.answered != null ? 1 : 0), back = "#/" + (S.tab || "g");
    if (!n) { SESSION = null; saveSession(); location.hash = back; return; }
    S.ids = S.ids.slice(0, n); S.pos = n; endPlay(S); endAsk(S); saveSession(); render(); window.scrollTo(0, 0);
  },
  install: async () => { if (!INSTALL) return; const e = INSTALL; INSTALL = null; try { await e.prompt(); await e.userChoice; } catch {} render(); },
  share: async () => { const url = location.href.split("#")[0]; try { if (navigator.share) { await navigator.share({ title: "Révisions anat", url }); return; } await navigator.clipboard.writeText(url); toast("Lien copié !", "ok"); } catch (e) { if (e && e.name !== "AbortError") toast(esc(url)); } },
  ask: () => startAsk(), erase: () => eraseError(),
  redoKo: () => startSession(SESSION.tab, "ko", shuffle(SESSION.wrong.slice()), "Erreurs de la série"),
  flag: () => { const id = SESSION.ids[SESSION.pos]; if (FLAGS[id]) delete FLAGS[id]; else FLAGS[id] = Date.now(); save(K_FLAG, FLAGS); render(); toast(FLAGS[id] ? "Question signalée : retrouve-la dans Réglages." : "Signalement retiré."); },
  ficheQuiz: el => { const f = D.fiches[el.dataset.name]; startSession(f && TABS.some(t => t.cat === f.cat) ? f.cat : "g", "todo", shuffle((QBY[el.dataset.name] || []).map(q => q.id)), el.dataset.name); },
  fixQ: el => {
    const q = BY_ID[el.dataset.id]; const nq = prompt("Question :", q.q); if (nq === null || !nq.trim()) return;
    const na = prompt(q.m ? "Bonnes réponses (séparées par « ; » avec un espace de chaque côté) :" : "Bonne réponse :", q.a); if (na === null || !na.trim()) return;
    OVR[q.id] = { q: nq.trim(), a: na.trim() }; save(K_OVR, OVR); applyOvr();
    if (confirm("Correction enregistrée. Retirer le signalement ?")) { delete FLAGS[q.id]; save(K_FLAG, FLAGS); } render();
  },
  flagQuiz: () => startSession(null, "todo", Object.keys(FLAGS).filter(id => BY_ID[id]), "Questions signalées"),
  copyFlags: async () => { const txt = Object.keys(FLAGS).map(id => BY_ID[id]).filter(Boolean).map(q => `- [${q.id}] ${q.q} → ${q.a}`).join("\n"); try { await navigator.clipboard.writeText(txt); MSG = "Liste copiée : tu peux la coller dans un message."; } catch { MSG = "Copie impossible sur ce navigateur."; } render(); },
  export: () => {
    const data = { app: "revisions-anat", version: 2, exportedAt: new Date().toISOString(), progress: PROG, flags: FLAGS, corrections: OVR, body: BODY, pet: PET, daily: DAILY, tableaux: TAB, garderobe: WARD, settings: SET, msp: MSPP };
    const nm = `revisions-anat-progression-${todayKey()}.json`, txt = JSON.stringify(data);
    if (IOS) try { const f = new File([txt], nm, { type: "application/json" }); if (navigator.canShare && navigator.canShare({ files: [f] })) { navigator.share({ files: [f] }).then(() => { MSG = "Progression exportée."; render(); }).catch(() => {}); return; } } catch {}
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([txt], { type: "application/json" })); a.download = nm;
    document.body.appendChild(a); a.click(); a.remove(); MSG = "Fichier enregistré dans tes Téléchargements."; render();
  },
  import: () => document.getElementById("importFile").click(),
  toggleMsp: () => { SET.noMsp = !SET.noMsp; save(K_SET, SET); render(); },
  reset: () => { if (!confirm("Effacer toute ta progression de QCM et tes accessoires ? C'est définitif (sauf si tu as un export). Tes animaux sont gardés.")) return; PROG = {}; save(K_PROG, PROG); markSeen(); BODY.got = []; BODY.eq = {}; save(K_BODY, BODY); PET.gear.lv = 1; PET.kibLv = 1; PET.run = PET.bad = 0; WARD.spent = 0; save(K_WARD, WARD); save(K_PET, PET); SESSION = null; saveSession(); MSG = "Progression effacée."; render(); }
};
document.addEventListener("click", e => {
  if (e.target.matches("img.pic[src]:not(.nozoom)")) { const z = document.createElement("div"); z.id = "zoom"; const zk = e.target.dataset.k; z.innerHTML = `<img src="${e.target.src}" alt="">${zk ? `<p class="zsrc ${isWeb(zk) ? "out" : ""}">${isWeb(zk) ? "🌐 HORS COURS · Wikimedia Commons : " + esc((D.imgCap || {})[zk] || "") : "📑 Image de ton cours"}</p>` : ""}`; z.onclick = () => z.remove(); document.body.appendChild(z); return; }
  const el = e.target.closest("[data-act]"); if (!el || !ACT[el.dataset.act] || el.disabled) return;
  e.preventDefault(); ACT[el.dataset.act](el);
});
document.addEventListener("input", e => {
  if (e.target.dataset.set === "len") { SET.len = Number(e.target.value); save(K_SET, SET); const o = document.getElementById("lenOut"); if (o) o.textContent = SET.len >= 100 ? "Tous" : SET.len; }
  else if (e.target.id === "okn") { OKN = Number(e.target.value); const n = okList(e.target.dataset.tab).filter(okIn).length; document.getElementById("okTxt").textContent = okTxt(OKN); document.getElementById("okN").textContent = plural(n, "question"); const b = document.querySelector("[data-act=okGo]"); if (b) b.disabled = !n; }
  else if (e.target.id === "search") {
    const v = e.target.value, pos = e.target.selectionStart, tb = e.target.dataset.tab;
    history.replaceState(null, "", (tb ? "#/rev/" + tb + "/" : "#/fiches/") + encodeURIComponent(v)); LAST = location.hash;
    $("#app").innerHTML = tb ? viewRev(tb, v) : viewFiches(v); const s = document.getElementById("search"); s.focus(); try { s.setSelectionRange(pos, pos); } catch {}
  } else if (e.target.id === "ksearch") { KF.q = e.target.value; KF.n = 60; document.getElementById("kgrid").innerHTML = kidCards(); } else if (e.target.id === "msearch") { MF.q = e.target.value; MF.n = 60; document.getElementById("mgrid").innerHTML = menagerieCards(); }
});
document.addEventListener("change", async e => {
  if (e.target.id === "ksort") { PET.ksort = e.target.value; if (PET.ksort !== "mine") KF.move = false; KF.n = 60; save(K_PET, PET); render(); return; }
  if (e.target.id === "msp" || e.target.id === "msort") { MF[e.target.id === "msp" ? "sp" : "sort"] = e.target.value; MF.n = 60; document.getElementById("mgrid").innerHTML = menagerieCards(); return; }
  if (e.target.id !== "importFile") return;
  const f = e.target.files[0]; e.target.value = ""; if (!f) return;
  try {
    const data = JSON.parse(await f.text());
    if (!data || data.app !== "revisions-anat" || !data.progress || typeof data.progress !== "object") throw new Error("ce n'est pas un export de Révisions anat");
    if (!confirm("Remplacer ta progression actuelle par celle de ce fichier ?")) return;
    save(K_PROG, data.progress); save(K_FLAG, data.flags || {}); save(K_OVR, data.corrections || {});
    if (data.msp) save(K_MSP, data.msp); if (data.body) save(K_BODY, data.body); if (data.pet) save(K_PET, data.pet); if (data.daily) save(K_DAILY, data.daily); if (data.tableaux) save(K_TAB, data.tableaux); if (data.garderobe) save(K_WARD, data.garderobe); if (data.settings) save(K_SET, data.settings);
    save(K_SESS, null); save(K_SEEN, null); location.reload(); return;
  } catch (err) { MSG = "Import impossible : " + err.message; }
  render();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") document.getElementById("zoom")?.remove();
  if (route()[0] !== "quiz" || !SESSION || SESSION.pos >= SESSION.ids.length || /INPUT|SELECT|SUMMARY/.test(e.target.tagName) || e.ctrlKey || e.metaKey) return;
  const cur = BY_ID[SESSION.ids[SESSION.pos]];
  if (cur && cur.m && SESSION.answered == null && SESSION.opts) {
    const n = Number(e.key) - 1;
    if (n >= 0 && n < SESSION.opts.length) ACT.toggle({ dataset: { i: n } }); else if (e.key === "Enter") { e.preventDefault(); ACT.valid(); }
    return;
  }
  const k = e.key.toUpperCase(), i = k.length === 1 ? ("ABCD".indexOf(k) >= 0 ? "ABCD".indexOf(k) : "1234".indexOf(e.key)) : -1;
  if (i >= 0 && SESSION.answered == null && SESSION.opts && i < SESSION.opts.length) answer(i);
  else if ((e.key === "Enter" || e.key === " ") && SESSION.answered != null && e.target.tagName !== "BUTTON" && e.target.tagName !== "A") { e.preventDefault(); ACT.next(); }
});
// reprise de la série laissée en cours, même après fermeture de l'application
{ const s = load(K_SESS, null); if (s && Array.isArray(s.ids) && s.ids.every(id => BY_ID[id]) && s.pos < s.ids.length) SESSION = s; }
window.addEventListener("hashchange", render);
document.addEventListener("toggle", e => { if (e.target.id === "gal") GALOPEN = e.target.open; if (e.target.id in OPENS) { const was = OPENS[e.target.id]; OPENS[e.target.id] = e.target.open; if (e.target.open && !was && e.target.childElementCount < 2) { render(); return; } } if (e.target.open) { hydrateImgs(); hydrateArts(); } }, true);
if (WARD.spent === null) WARD.spent = Math.max(0, xp() - START_XP); save(K_WARD, WARD);
SEEN = load(K_SEEN, null); if (!Array.isArray(SEEN)) markSeen();
const retro = syncLevel(); save(K_DAILY, DAILY); save(K_TAB, TAB);
const away = /^#\/sync\//.test(location.hash) ? { n: 0 } : catchUp();
const awayMsg = r => `📲 ${plural(r.n, "réponse")} ${r.n > 1 ? "prises" : "prise"} en compte. ${esc(r.won)}`;
render();
if (away.n) toast(awayMsg(away), "ok");
window.addEventListener("storage", e => { if (e.key !== K_PROG || !e.newValue) return; PROG = load(K_PROG, {}); const w = catchUp(); if (route()[0] !== "quiz") render(); if (w.n) toast(awayMsg(w), "ok"); });
showDaily(); document.addEventListener("visibilitychange", () => { if (!document.hidden) showDaily(); });
if (retro.length) toast(`🎁 ${plural(retro.length, "accessoire")} pour ton compagnon, pour tes niveaux déjà atteints !`, "ok");
try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch {}
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
