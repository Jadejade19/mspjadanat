"use strict";
// Module MSP : vues et actions. Chargé à la demande (#/msp), après app.js.
// Progression propre (MSPP, clé « revanat-msp-v1 ») ; récompenses communes (goodAnswer / badAnswer / XP).
(function () {
  const M = window.MSPDATA, DR = window.MSPDRAW;
  const P = id => M.PATHOS[id];
  const srcTxt = k => { const s = M.SRC[k]; return s ? `<li><b>${esc(s.k)}</b> · ${esc(s.t)}${s.f ? `<br><span class="small">📁 ${esc(s.f)}</span>` : ""}</li>` : ""; };
  const srcList = ks => `<details class="msrc"><summary>📚 Sources</summary><ul>${[...new Set(ks)].map(srcTxt).join("")}</ul></details>`;
  const qid = (p, q) => `msp:${p.id}:${q.id}`;
  const stOf = id => { const r = MSPP[id]; return !r ? "todo" : r.r ? "ok" : "ko"; };
  const pat = (p, id) => p.patients.find(x => x.id === id);
  const draw = (a, cls) => `<div class="mpat ${cls || ""}">${DR.svg(a)}</div>`;
  const statsP = p => { const s = { ok: 0, ko: 0, todo: 0 }; p.qcm.forEach(q => s[stOf(qid(p, q))]++); s.total = p.qcm.length; return s; };
  const bar = s => `<div class="mbar"><i class="ok" style="width:${s.ok / s.total * 100}%"></i><i class="ko" style="width:${s.ko / s.total * 100}%"></i></div><p class="small">${s.ok} réussis · ${s.ko} à revoir · ${s.todo} jamais faits (sur ${s.total})</p>`;
  const back = (h, l) => `<a class="mback" href="${h}">‹ ${esc(l)}</a>`;
  let Q = null, CAS = null, AT = { hemi: "D", aphasie: true, aide: "quadri", aideCote: "G", afo: "D", douleurs: [], cicatrices: [], oedeme: [], escarre: [] }, QOPT = { part: "", pool: "all", n: 20 };

  // ---------------- Accueil ----------------
  function home() {
    const all = Object.values(M.PATHOS).filter(p => p.cell), tot = all.reduce((t, p) => t + p.qcm.length, 0), ok = all.reduce((t, p) => t + statsP(p).ok, 0);
    return `<section class="card mhero"><h2>🩺 Révisions MSP</h2><p class="small">Progression MSP : ${ok}/${tot} QCM réussis. Elle est séparée de l'anatomie ; les animaux, enfants, croquettes et l'XP gagnés ici sont communs.</p>
      <div class="actions"><a class="btn" href="#/msp/patients">🧍 Catalogue des patients</a><a class="btn" href="#/msp/atelier">🎨 Atelier : dessiner un patient</a><a class="btn" href="#/msp/tests">🧪 Tests et échelles</a><a class="btn" href="#/msp/remarques">⚠️ Remarques MSP (${(M.REMARQUES || []).length})</a></div></section>
      ${M.CELLS.map(c => `<details class="card fold" ${c.pathos.length ? "open" : ""}><summary>${c.ico} ${esc(c.nom)} <span class="small">${c.pathos.length} disponible${c.pathos.length > 1 ? "s" : ""}</span></summary>
        ${c.pathos.map(id => { const p = P(id), s = statsP(p); return `<a class="mpcard" href="#/msp/p/${id}">${draw(p.patients[0].attrs, "sm")}<span><b>${esc(p.titre)}</b>${bar(s)}</span></a>`; }).join("")}
        ${c.bientot.length ? `<p class="small">Bientôt : ${c.bientot.map(esc).join(" · ")}</p>` : ""}</details>`).join("")}`;
  }
  // ---------------- Page d'une pathologie ----------------
  function pathoHome(p) {
    const s = statsP(p);
    return `${back("#/msp", "MSP")}<section class="card"><div class="mph">${draw(p.patients[0].attrs)}<div><h2>${esc(p.titre)}</h2>${bar(s)}${p.statut ? `<p class="small warn">${esc(p.statut)}</p>` : ""}</div></div></section>
      <div class="mgrid4">
        <a class="card mtile" href="#/msp/p/${p.id}/resume"><span>⚡</span><b>Résumé rapide</b><span class="small">L'essentiel en ${p.resume.length} points</span></a>
        <a class="card mtile" href="#/msp/p/${p.id}/pro"><span>🎓</span><b>Pro de la pathologie</b><span class="small">${p.pro.length} chapitres dépliables</span></a>
        <a class="card mtile" href="#/msp/p/${p.id}/qcm"><span>✅</span><b>QCM</b><span class="small">${p.qcm.length} questions · par chapitre ou échecs</span></a>
        <a class="card mtile" href="#/msp/p/${p.id}/cas"><span>🩺</span><b>Cas cliniques</b><span class="small">${p.cas.length} cas · simulation d'examen</span></a>
      </div>
      <section class="card"><h3>Patients illustrés</h3><div class="mpats">${p.patients.map(x => `<a href="#/msp/patient/${p.id}/${x.id}">${draw(x.attrs, "sm")}<span class="small">${esc(x.nom)}</span>${x.origine === "invente" ? `<span class="mtag inv">illustration</span>` : `<span class="mtag">cas de cours</span>`}</a>`).join("")}</div></section>`;
  }
  const resume = p => `${back("#/msp/p/" + p.id, p.court)}<section class="card"><h2>⚡ ${esc(p.court)} : résumé rapide</h2><ul class="mres">${p.resume.map(x => `<li>${x}</li>`).join("")}</ul>${srcList(p.pro.flatMap(s => s.src))}</section>`;
  const pro = p => `${back("#/msp/p/" + p.id, p.court)}<section class="card"><h2>🎓 ${esc(p.court)} : pro de la pathologie</h2><p class="small">Touche un chapitre pour le déplier. Chaque chapitre a ses QCM.</p></section>
    ${p.pro.map(s => `<details class="card fold mpro" id="pro-${s.id}"><summary>${esc(s.titre)}</summary><div class="mtxt">${s.html}</div>${srcList(s.src)}<div class="actions"><button class="sm" data-act="mspQ" data-p="${p.id}" data-part="${s.id}" data-pool="all">✅ QCM de ce chapitre (${p.qcm.filter(q => q.part === s.id).length})</button></div></details>`).join("")}`;
  // ---------------- QCM ----------------
  function qcmMenu(p) {
    const pool = k => p.qcm.filter(q => (!QOPT.part || q.part === QOPT.part) && (k === "all" || stOf(qid(p, q)) === k)).length;
    return `${back("#/msp/p/" + p.id, p.court)}<section class="card"><h2>✅ QCM : ${esc(p.court)}</h2>
      <p><b>Chapitre</b></p><div class="chips"><button data-act="mspOpt" data-k="part" data-v="" class="${!QOPT.part ? "on" : ""}">Tout</button>${p.pro.map(s => `<button data-act="mspOpt" data-k="part" data-v="${s.id}" class="${QOPT.part === s.id ? "on" : ""}">${esc(s.titre)}</button>`).join("")}</div>
      <div class="pools">${[["ko", "Échecs", "Les QCM ratés la dernière fois"], ["todo", "Pas encore interrogées", "Jamais faits"], ["ok", "Déjà eu bon", "Réussis la dernière fois"], ["all", "Tout le chapitre", "Dans un ordre aléatoire"]].map(([k, l, h]) => `<button class="pool ${k === "all" ? "todo" : k}" data-act="mspQ" data-p="${p.id}" data-part="${QOPT.part}" data-pool="${k}" ${pool(k) ? "" : "disabled"}><span class="n">${pool(k)}</span><span class="t"><b>${l}</b><span class="small">${h}</span></span><span class="go">›</span></button>`).join("")}</div></section>`;
  }
  const shuffle2 = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function startQ(p, part, pool, back2) {
    const L = p.qcm.filter(q => (!part || q.part === part) && (pool === "all" || stOf(qid(p, q)) === pool));
    if (!L.length) return toast("Aucune question ici pour le moment.");
    Q = { p: p.id, ids: shuffle2(L.map(q => q.id)).slice(0, SET.len < 100 ? SET.len : 999), pos: 0, ok: 0, ko: 0, xp: 0, won: [], back: back2 || `#/msp/p/${p.id}/qcm` };
    nextQ(); location.hash = "#/msp/quiz"; render();
  }
  function nextQ() { const p = P(Q.p), q = p.qcm.find(x => x.id === Q.ids[Q.pos]); if (!q) return; Q.opts = shuffle2([...q.a, ...q.d]); Q.sel = []; Q.done = false; }
  function quiz() {
    if (!Q) return `<div class="card">Aucune série en cours. <a href="#/msp">Retour</a></div>`;
    const p = P(Q.p);
    if (Q.pos >= Q.ids.length) { const t = Q.ok + Q.ko;
      return `<section class="card bilan"><h2>Série MSP terminée</h2><p class="big">${Q.ok} / ${t} bonnes réponses</p>${Q.xp ? `<p class="big">✨ +${Q.xp} XP</p>` : ""}${Q.won.length ? `<p>${Q.won.map(esc).join("<br>")}</p>` : ""}<div class="actions"><a class="btn primary" href="${Q.back}">Retour</a>${Q.ko ? `<button data-act="mspQ" data-p="${p.id}" data-part="" data-pool="ko">Refaire mes échecs</button>` : ""}</div></section>`; }
    const q = p.qcm.find(x => x.id === Q.ids[Q.pos]), multi = q.a.length > 1, sec = p.pro.find(s => s.id === q.part);
    const cls = (o, j) => !Q.done ? (Q.sel.includes(j) ? "sel" : "") : q.a.includes(o) ? "good" : Q.sel.includes(j) ? "bad" : "";
    return `<section class="card quiz"><div class="qtop"><span class="tag">${esc(p.court)} · ${esc(sec ? sec.titre : "")}</span><span class="small">${Q.pos + 1} / ${Q.ids.length}</span></div>
      <p class="qtext">${esc(q.q)}</p>${multi ? `<p class="multi-hint">Plusieurs réponses possibles</p>` : ""}
      <div class="opts ${Q.opts.some(o => o.startsWith("img:")) ? "imgopts" : ""}">${Q.opts.map((o, j) => `<button class="opt ${multi ? "multi" : ""} ${cls(o, j)}" data-act="mspAns" data-j="${j}" ${Q.done ? "disabled" : ""}><span class="k">${String.fromCharCode(65 + j)}</span>${o.startsWith("img:") ? `<img class="mimg" data-mi="${esc(o.slice(4))}" alt="Photo ${String.fromCharCode(65 + j)}">` : `<span>${esc(o)}</span>`}</button>`).join("")}</div>
      ${multi && !Q.done ? `<div class="actions sticky"><button class="primary grow" data-act="mspValid" ${Q.sel.length ? "" : "disabled"}>Valider (${Q.sel.length})</button></div>` : ""}
      ${Q.done ? `<div class="mfb ${Q.good ? "ok" : "ko"}"><b>${Q.good ? "Bonne réponse !" : "Pas tout à fait."}</b> Réponse : ${q.a.map(x => x.startsWith("img:") ? `la photo en vert (${esc(capOf(x.slice(4)))})` : esc(x)).join(" ; ")}${q.expl ? `<p>${esc(q.expl)}</p>` : ""}<p class="small">📚 ${esc((M.SRC[q.src] || {}).t || "")}${M.SRC[q.src] && M.SRC[q.src].f ? ` · ${esc(M.SRC[q.src].f)}` : ""}</p></div>
        <div class="actions sticky"><button class="primary grow" data-act="mspNext" id="nextBtn">${Q.pos + 1 < Q.ids.length ? "Suivante" : "Terminer"}</button></div>` : ""}</section>`;
  }
  function answerQ() {
    const p = P(Q.p), q = p.qcm.find(x => x.id === Q.ids[Q.pos]), sel = Q.sel.map(j => Q.opts[j]);
    const good = Q.good = q.a.length === sel.length && q.a.every(x => sel.includes(x)); Q.done = true;
    const id = qid(p, q), r = MSPP[id] || { n: 0, ok: 0 }; if (!r.n) r.f = good ? 1 : 0; r.n++; r.ok += good ? 1 : 0; r.r = good ? 1 : 0; r.t = Date.now(); MSPP[id] = r; save(K_MSP, MSPP);
    if (good) { Q.ok++; Q.xp += 10; } else Q.ko++;
    reward(good);
    render();
  }
  function reward(good) { // récompenses communes avec l'anatomie
    const lv0 = level(xp()); const ev = good ? goodAnswer() : badAnswer(); const L = [];
    if (ev.pet) L.push(`🐾 Nouvel animal : ${ANIMAL_BY_ID[ev.pet].name} !`); if (ev.rate) L.push(`🐾 Un animal « raté » arrive : ${ANIMAL_BY_ID[ev.rate].name}`);
    if (ev.kid) L.push(`👶 Un nouvel enfant à la garderie : ${ANIMAL_BY_ID[ev.kid].name} !`); if (ev.kibble) L.push("🥣 +1 croquette"); if (ev.kib50) L.push("🥣 Bonus de croquettes !");
    if (ev.gift) L.push("🎁 Cadeau du jour gagné !"); if (ev.gear10) L.push("🎀 Un accessoire pour ton compagnon !");
    const g = syncLevel(); if (g.length) L.push("🎀 Nouvel accessoire de compagnon !"); const lv1 = level(xp()); if (lv1 > lv0) L.push(`⭐ Niveau ${lv1} atteint !`);
    if (Q) Q.won.push(...L); L.forEach(t => toast(esc(t), "ok"));
  }
  // ---------------- Cas cliniques ----------------
  function casList(p) {
    const grp = (o, t, h) => { const L = p.cas.filter(c => c.origine === o); return L.length ? `<section class="card"><h3>${t}</h3><p class="small">${h}</p>${L.map(c => `<a class="mpcard" href="#/msp/cas/${p.id}/${c.id}">${draw(pat(p, c.patient).attrs, "sm")}<span><b>${esc(c.titre)}</b><span class="small">${c.etapes.length} étapes</span></span></a>`).join("")}</section>` : ""; };
    return `${back("#/msp/p/" + p.id, p.court)}${grp("cours", "📘 Cas de cours (tes comptes rendus MSP)", "Tirés directement de tes cours : les données sont celles du CR.")}${grp("invente", "🧪 Cas inventés (prudence)", "Construits uniquement à partir de tes supports, pour s'entraîner. Les propositions qui ne viennent pas de tes cours sont signalées.")}`;
  }
  function casView(p, c) {
    if (!CAS || CAS.id !== c.id) CAS = { id: c.id, step: 0, pick: [], done: false };
    const e = c.etapes[CAS.step], last = CAS.step >= c.etapes.length;
    const head = `${back("#/msp/p/" + p.id + "/cas", "Cas cliniques")}<section class="card"><div class="mph">${draw(pat(p, c.patient).attrs)}<div><h2>${esc(c.titre)}</h2><p>${esc(c.fiche)}</p><p class="small">${c.origine === "invente" ? "🧪 Cas inventé (prudence)" : "📘 Cas de cours"} · étape ${Math.min(CAS.step + 1, c.etapes.length)}/${c.etapes.length}</p></div></div></section>`;
    if (last) return head + `<section class="card"><h2>Cas terminé 🎉</h2>${srcList(c.src)}<div class="actions"><button data-act="mspCasReset">Recommencer</button><a class="btn primary" href="#/msp/p/${p.id}/cas">Autres cas</a></div></section>`;
    const nextBtn = `<div class="actions sticky"><button class="primary grow" data-act="mspCasNext">Étape suivante ›</button></div>`;
    if (e.type === "lecture") return head + `<section class="card"><h3>${esc(e.titre)}</h3><div class="mtxt">${e.html}</div>${nextBtn}</section>`;
    if (e.type === "anamnese") {
      const done = CAS.done, order = CAS.pick;
      const body = !done ? `<p class="small">${esc(e.consigne)}</p><div class="mlist">${e.items.map((it, i) => { const k = order.indexOf(i); return `<button class="opt ${k >= 0 ? "sel" : ""}" data-act="mspPick" data-i="${i}"><span class="k">${k >= 0 ? k + 1 : "·"}</span><span>${esc(it.q)}</span></button>`; }).join("")}</div>
        <div class="actions sticky"><button class="primary grow" data-act="mspCasCheck" ${order.length ? "" : "disabled"}>Poser ces ${order.length} questions</button></div>`
        : (() => { const must = e.items.map((it, i) => [it, i]).filter(([it]) => it.p === 1), missed = must.filter(([, i]) => !order.includes(i)), bad = order.filter(i => e.items[i].p === 3);
          return `<div class="mlist">${order.map((i, k) => { const it = e.items[i]; return `<div class="mans ${it.p === 3 ? "ko" : "ok"}"><b>${k + 1}. ${esc(it.q)}</b><br>${esc(it.r)}${it.p === 3 ? `<br><span class="small">⚠ Question inutile ici.</span>` : ""}</div>`; }).join("")}</div>
            <p class="${missed.length ? "warn" : ""}">${missed.length ? `Questions importantes oubliées : ${missed.map(([it]) => esc(it.q)).join(" · ")}` : "✔ Aucune question importante oubliée."}</p>${bad.length ? `<p class="warn">${bad.length} question(s) inutile(s).</p>` : ""}
            <details class="msrc"><summary>Réponses aux questions non posées</summary><ul>${e.items.map((it, i) => order.includes(i) ? "" : `<li><b>${esc(it.q)}</b> ${esc(it.r)}</li>`).join("")}</ul></details>${nextBtn}`; })();
      return head + `<section class="card"><h3>${esc(e.titre)}</h3>${body}</section>`;
    }
    if (e.type === "bilans") {
      const done = CAS.done, order = CAS.pick;
      if (!done) return head + `<section class="card"><h3>${esc(e.titre)}</h3><p class="small">${esc(e.consigne)}</p><div class="mlist">${e.items.map((it, i) => { const k = order.indexOf(i); return `<button class="opt ${k >= 0 ? "sel" : ""}" data-act="mspPick" data-i="${i}"><span class="k">${k >= 0 ? k + 1 : "·"}</span><span>${esc(it.b)}</span></button>`; }).join("")}</div><div class="actions sticky"><button class="primary grow" data-act="mspCasCheck" ${order.length ? "" : "disabled"}>Réaliser ces bilans</button></div></section>`;
      const ref = e.ordre, chosen = order.map(i => e.items[i]), okList = chosen.filter(x => x.ok).map(x => x.b), inv = okList.filter((b, k) => k && ref.indexOf(okList[k - 1]) > ref.indexOf(b)).length, missed = e.items.filter(x => x.ok && !okList.includes(x.b));
      return head + `<section class="card"><h3>${esc(e.titre)} : résultats</h3>${chosen.map(it => `<div class="mans ${it.ok ? "ok" : "ko"}"><b>${esc(it.b)}</b><br>${esc(it.r)}${it.tests ? `<div class="actions">${it.tests.map(t => `<a class="btn sm" href="#/msp/test/${t}">🧪 ${esc(M.TESTS[t].nom)}</a>`).join("")}</div>` : ""}</div>`).join("")}
        <p class="${inv ? "warn" : ""}">${inv ? `Ordre : ${inv} inversion(s) par rapport à l'ordre conseillé.` : "✔ Ordre logique."}</p><p class="small">Ordre conseillé : ${ref.map(esc).join(" → ")}</p>
        ${missed.length ? `<p class="warn">Bilans oubliés : ${missed.map(x => esc(x.b)).join(", ")}</p>` : ""}${nextBtn}</section>`;
    }
    if (e.type === "choix") {
      const done = CAS.done;
      return head + `<section class="card"><h3>${esc(e.titre)}</h3><p class="small">${esc(e.consigne)}</p><div class="mlist">${e.items.map((it, i) => { const on = CAS.pick.includes(i); const c2 = !done ? (on ? "sel" : "") : it.ok ? (on ? "good" : "miss") : on ? "bad" : ""; return `<button class="opt multi ${c2}" data-act="mspPick" data-i="${i}" ${done ? "disabled" : ""}><span class="k">${on ? "✔" : ""}</span><span>${esc(it.t)}${done && it.why ? `<br><span class="small">${esc(it.why)}</span>` : ""}</span></button>`; }).join("")}</div>
        ${!done ? `<div class="actions sticky"><button class="primary grow" data-act="mspCasCheck">Valider</button></div>` : `<p class="small">Vert = juste et choisi · bordure verte = juste mais oublié · rouge = à éviter. 📚 ${esc((M.SRC[e.src] || {}).t || "")}</p>${nextBtn}`}</section>`;
    }
    return head;
  }
  // ---------------- Tests ----------------
  function testsList() { const by = {}; for (const [k, t] of Object.entries(M.TESTS)) (by[t.cat] ||= []).push([k, t]);
    return `${back("#/msp", "MSP")}<section class="card"><h2>🧪 Tests et échelles</h2><p class="small">Pour chaque test : but, déroulement, cotation, quand il est positif, ce qu'il évalue, et un lien de recherche vidéo.</p></section>${Object.entries(by).map(([c, L]) => `<section class="card"><h3>${esc(c)}</h3>${L.map(([k, t]) => `<a class="mrow" href="#/msp/test/${k}">${esc(t.nom)} <span class="go">›</span></a>`).join("")}</section>`).join("")}`; }
  function testView(k) { const t = M.TESTS[k]; if (!t) return `<div class="card">Test inconnu.</div>`;
    const pics = [...(t.img || []).map(k => mimg(k, "📷 " + capOf(k))), ...(t.ctx || []).map(k => mimg(k, "📑 Contexte : " + capOf(k)))];
    return `${back("#/msp/tests", "Tests")}<section class="card"><h2>${esc(t.nom)}</h2>${pics.length ? `<div class="mslides">${pics.join("")}</div>` : ""}<p><b>But</b> : ${esc(t.but)}</p><p><b>Déroulement</b> : ${esc(t.deroul)}</p><p><b>Cotation</b> : ${esc(t.cot)}</p><p><b>Positif / interprétation</b> : ${esc(t.positif)}</p><p><b>Ce qu'il évalue</b> : ${esc(t.diag)}</p>${t.se || t.sp ? `<p class="tip"><b>Sensibilité</b> : ${esc(t.se || "n.c.")} · <b>Spécificité</b> : ${esc(t.sp || "n.c.")}</p>` : ""}<p><b>Inclure / exclure</b> : ${esc(t.incl)}</p>
      <p><a href="${t.video}" target="_blank" rel="noopener">▶ Rechercher la vidéo (YouTube, Physiotutors…)</a> <span class="small">· lien de recherche : choisis une vidéo d'une source fiable (Physiotutors, FullPhysio).</span></p>${srcList(t.src)}
      <div class="actions"><button class="primary" data-act="mspTestQ" data-t="${k}">✅ Me tester sur ce test</button></div></section>`; }
  // QCM automatique sur un test : déroulement, positivité, ce qu'il évalue
  function testQuiz(k) { const t = M.TESTS[k], others = Object.entries(M.TESTS).filter(([x]) => x !== k);
    const pick = f => shuffle2(others.map(([, o]) => o[f]).filter(v => v && v !== t[f] && v !== "—")).slice(0, 3);
    const qs = [{ id: "nom", part: "test", q: `Quel test répond à ce but : « ${t.but} » ?`, a: [t.nom], d: shuffle2(others.map(([, o]) => o.nom)).slice(0, 3), src: t.src[0] },
      { id: "deroul", part: "test", q: `${t.nom} : comment se déroule-t-il ?`, a: [t.deroul], d: t.faux, src: t.src[0] },
      ...(t.positif && t.positif !== "—" ? [{ id: "pos", part: "test", q: `${t.nom} : quand est-il positif / comment l'interpréter ?`, a: [t.positif], d: pick("positif"), src: t.src[0] }] : []),
      { id: "diag", part: "test", q: `${t.nom} : qu'évalue-t-il ?`, a: [t.diag], d: pick("diag"), src: t.src[0] }];
    const withImg = others.filter(([, o]) => o.img && o.img[0] && o.img[0] !== (t.img || [])[0]);
    if (t.img && t.img[0] && withImg.length >= 3) qs.splice(1, 0, { id: "img", part: "test", q: `Quelle photo montre le test « ${t.nom} » ?`, a: ["img:" + t.img[0]], d: shuffle2(withImg).slice(0, 3).map(([, o]) => "img:" + o.img[0]), src: t.src[0] });
    if (t.se || t.sp) qs.push({ id: "sesp", part: "test", q: `${t.nom} : sensibilité et spécificité rapportées ?`, a: [`Se ${t.se || "n.c."} · Sp ${t.sp || "n.c."}`], d: shuffle2(others.filter(([, o]) => (o.se || o.sp) && (o.se !== t.se || o.sp !== t.sp)).map(([, o]) => `Se ${o.se || "n.c."} · Sp ${o.sp || "n.c."}`)).filter((v, i, L) => L.indexOf(v) === i).slice(0, 3), src: t.src[0] });
    const p = { id: "test-" + k, court: t.nom, pro: [{ id: "test", titre: "Test" }], qcm: qs };
    M.PATHOS[p.id] = p; startQ(p, "", "all", "#/msp/test/" + k); }
  // ---------------- Patients ----------------
  function patients() { const L = Object.values(M.PATHOS).filter(p => p.patients).flatMap(p => p.patients.map(x => [p, x]));
    return `${back("#/msp", "MSP")}<section class="card"><h2>🧍 Catalogue des patients</h2><p class="small">${L.length} patient(s) dessiné(s). Chaque dessin reprend les signes du cas ; touche un patient pour voir sa légende et ses cas.</p><div class="mpats">${L.map(([p, x]) => `<a href="#/msp/patient/${p.id}/${x.id}">${draw(x.attrs, "sm")}<span class="small">${esc(x.nom)}</span></a>`).join("")}</div></section>
      <section class="card"><h3>Code couleur de la douleur</h3><ul class="mleg">${Object.values(DR.PAIN).map(d => `<li><span class="pdot" style="background:${d.c}"></span>${esc(d.label)}</li>`).join("")}</ul></section>`; }
  function patientView(p, x) { const cas = p.cas.filter(c => c.patient === x.id);
    return `${back("#/msp/patients", "Catalogue")}<section class="card"><div class="mph">${draw(x.attrs, "lg")}<div><h2>${esc(x.nom)}</h2><p>${esc(x.desc)}</p><p class="small">${x.origine === "invente" ? "🧪 Illustration (pas un cas réel)" : "📘 Cas de cours"} · ${esc((M.SRC[x.src] || {}).t || "")}</p></div></div>
      <h3>Ce que montre le dessin</h3><ul class="mleg">${DR.legend(x.attrs).map(l => `<li>${l}</li>`).join("")}</ul>
      ${cas.map(c => `<a class="btn primary" href="#/msp/cas/${p.id}/${c.id}">🩺 Simuler le cas : ${esc(c.titre)}</a>`).join(" ")}
      <div class="actions"><button data-act="mspAtCopy" data-p="${p.id}" data-x="${x.id}">🎨 Modifier dans l'atelier</button></div></section>`; }
  function atelier() {
    const grp = {}; DR.ATTRS.forEach(a => (grp[a.g] ||= []).push(a)); const Z = Object.keys(DR.Z), zl = z => DR.ZLABEL[z];
    const ctl = a => { const v = AT[a.k];
      if (a.t === "bool") return `<label class="mck"><input type="checkbox" data-mat="${a.k}" ${v ? "checked" : ""}> ${esc(a.label)}</label>`;
      if (a.t === "choix") return `<label class="msel">${esc(a.label)} <select data-mat="${a.k}"><option value="">—</option>${Object.entries(a.opts).map(([k, l]) => `<option value="${k}" ${v === k ? "selected" : ""}>${esc(l)}</option>`).join("")}</select></label>`;
      if (a.t === "zones") return `<label class="msel">${esc(a.label)} <select data-mat="${a.k}" data-add="1"><option value="">+ ajouter une zone</option>${Z.map(z => `<option value="${z}">${esc(zl(z))}</option>`).join("")}</select></label>${(v || []).map((z, i) => `<button class="sm" data-act="mspAtDel" data-k="${a.k}" data-i="${i}">✕ ${esc(zl(z))}</button>`).join(" ")}`;
      if (a.t === "cicatrices") return `<div class="msel">${esc(a.label)} <select id="mscZ">${Z.map(z => `<option value="${z}">${esc(zl(z))}</option>`).join("")}</select><label class="mck"><input type="checkbox" id="mscR"> récente (pansement)</label><label class="mck"><input type="checkbox" id="mscH"> horizontale</label><button class="sm" data-act="mspAtScar">+ Ajouter</button></div>${(v || []).map((c, i) => `<button class="sm" data-act="mspAtDel" data-k="cicatrices" data-i="${i}">✕ ${esc(zl(c.zone))}${c.recent ? " (récente)" : ""}</button>`).join(" ")}`;
      if (a.t === "douleurs") return `<div class="msel">${esc(a.label)} <select id="mpdZ">${Z.map(z => `<option value="${z}">${esc(zl(z))}</option>`).join("")}</select><select id="mpdT">${Object.entries(DR.PAIN).map(([k, d]) => `<option value="${k}">${esc(k)}</option>`).join("")}</select><button class="sm" data-act="mspAtPain">+ Ajouter</button></div>${(v || []).map((d, i) => `<button class="sm" data-act="mspAtDel" data-k="douleurs" data-i="${i}"><span class="pdot" style="background:${DR.PAIN[d.type].c}"></span>✕ ${esc(zl(d.zone))}</button>`).join(" ")}`;
      return ""; };
    return `${back("#/msp", "MSP")}<section class="card"><h2>🎨 Atelier : dessiner un patient</h2><p class="small">Coche les signes de ton patient : le dessin se met à jour. Le patient est vu de face : son côté droit est à gauche de l'écran.</p>
      <div class="matel"><div class="mstick">${draw(AT, "lg")}<ul class="mleg">${DR.legend(AT).map(l => `<li>${l}</li>`).join("")}</ul><button class="sm" data-act="mspAtReset">Tout effacer</button></div>
      <div>${Object.entries(grp).map(([g, L]) => `<details class="fold sub" open><summary>${esc(g)}</summary>${L.map(a => `<div class="mctl">${ctl(a)}${a.help ? `<span class="small">${esc(a.help)}</span>` : ""}</div>`).join("")}</details>`).join("")}</div></div></section>`;
  }
  // ---------------- Images des cours (chargées à la demande : msp-img-<deck>.js) ----------------
  const mimg = (k, cap) => `<figure class="mfig"><img class="mimg" data-mi="${esc(k)}" alt="${esc(cap || k)}"><figcaption>${esc(cap || "")}</figcaption></figure>`;
  const deckName = { cools: "Cours Papalia (épaule)", kobus: "Pack Kobus", kalt: "Cours Kaltenborn", genou: "Cas cliniques genou", tourne: "Tourné 2019", forestier: "Forestier 2015", hanmk: "Cours Papalia (hanche MK1)", sijmk: "Cours Papalia (SIJ MK1)" };
  const capOf = k => { const [d, p] = k.split("-"); return `${deckName[d] || d}, p. ${p}`; };
  function hydrate() {
    const els = [...document.querySelectorAll("img.mimg[data-mi]:not([src])")]; if (!els.length) return;
    const decks = [...new Set(els.map(e => e.dataset.mi.split("-")[0]))];
    decks.forEach(d => loadPack("msp-img-" + d).then(() => els.filter(e => e.dataset.mi.startsWith(d + "-")).forEach(e => { const s = (window.MSPIMG || {})[e.dataset.mi]; if (s) e.src = s; })).catch(() => {}));
  }
  document.addEventListener("click", e => { const i = e.target.closest("img.mimg"); if (!i || !i.src || e.target.closest("button")) return; modal(`<img src="${i.src}" style="width:100%;border-radius:12px"><div class="actions center"><button data-act="closeM">Fermer</button></div>`); });

  // ---------------- Routeur du module ----------------
  function view(r) { setTimeout(hydrate, 30); return view0(r); }
  function view0(r) {
    const [a, b, c] = r;
    if (!a) return { title: "MSP", html: home() };
    if (a === "quiz") return { title: "QCM MSP", html: quiz() };
    if (a === "tests") return { title: "Tests", html: testsList() };
    if (a === "test") return { title: "Test", html: testView(b) };
    if (a === "patients") return { title: "Patients", html: patients() };
    if (a === "atelier") return { title: "Atelier", html: atelier() };
    if (a === "remarques") { const by = {}; (M.REMARQUES || []).forEach(r => (by[r.g] ||= []).push(r));
      return { title: "Remarques MSP", html: `${back("#/msp", "MSP")}<section class="card"><h2>⚠️ Remarques MSP</h2><p class="small">Erreurs et contradictions repérées dans tes supports. Règle : en cas de doute, la version de tes profs 2026-27 l'emporte, et vérifie avec eux.</p></section>${Object.entries(by).map(([g, L]) => `<section class="card"><h3>${esc(g)}</h3>${L.map(r => `<details class="fold sub"><summary>${esc(r.t)}</summary><p>${esc(r.txt)}</p><p class="small">📚 ${esc((M.SRC[r.s] || {}).t || "")}</p></details>`).join("")}</section>`).join("")}` }; }
    if (a === "patient" && P(b)) { const x = pat(P(b), c); if (x) return { title: "Patient", html: patientView(P(b), x) }; }
    if (a === "cas" && P(b)) { const x = P(b).cas.find(k => k.id === c); if (x) return { title: "Cas clinique", html: casView(P(b), x) }; }
    if (a === "p" && P(b)) { const p = P(b); return { title: p.court, html: c === "resume" ? resume(p) : c === "pro" ? pro(p) : c === "qcm" ? qcmMenu(p) : c === "cas" ? casList(p) : pathoHome(p) }; }
    return { title: "MSP", html: home() };
  }
  // ---------------- Actions ----------------
  const curCas = () => { const r = route(); const p = P(r[2]); return p && p.cas.find(k => k.id === r[3]); };
  Object.assign(ACT, {
    mspOpt: el => { QOPT[el.dataset.k] = el.dataset.v; render(); },
    mspQ: el => startQ(P(el.dataset.p) || P(Q && Q.p), el.dataset.part || "", el.dataset.pool || "all"),
    mspAns: el => { if (!Q || Q.done) return; const j = +el.dataset.j, q = P(Q.p).qcm.find(x => x.id === Q.ids[Q.pos]);
      if (q.a.length > 1) { Q.sel = Q.sel.includes(j) ? Q.sel.filter(x => x !== j) : [...Q.sel, j]; render(); } else { Q.sel = [j]; answerQ(); } },
    mspValid: () => { if (Q && !Q.done && Q.sel.length) answerQ(); },
    mspNext: () => { if (!Q) return; Q.pos++; if (Q.pos < Q.ids.length) nextQ(); render(); window.scrollTo(0, 0); },
    mspPick: el => { const i = +el.dataset.i; if (!CAS || CAS.done) return; CAS.pick = CAS.pick.includes(i) ? CAS.pick.filter(x => x !== i) : [...CAS.pick, i]; render(); },
    mspCasCheck: () => { if (!CAS) return; CAS.done = true; render(); },
    mspCasNext: () => { if (!CAS) return; CAS.step++; CAS.pick = []; CAS.done = false; render(); window.scrollTo(0, 0); },
    mspCasReset: () => { if (CAS) { CAS.step = 0; CAS.pick = []; CAS.done = false; } render(); },
    mspTestQ: el => testQuiz(el.dataset.t),
    mspAtReset: () => { AT = { douleurs: [], cicatrices: [], oedeme: [], escarre: [] }; render(); },
    mspAtDel: el => { const L = AT[el.dataset.k] || []; L.splice(+el.dataset.i, 1); render(); },
    mspAtScar: () => { (AT.cicatrices ||= []).push({ zone: $("#mscZ").value, recent: $("#mscR").checked, horiz: $("#mscH").checked }); render(); },
    mspAtPain: () => { (AT.douleurs ||= []).push({ zone: $("#mpdZ").value, type: $("#mpdT").value }); render(); },
    mspAtCopy: el => { const x = pat(P(el.dataset.p), el.dataset.x); AT = JSON.parse(JSON.stringify({ douleurs: [], cicatrices: [], oedeme: [], escarre: [], ...x.attrs })); location.hash = "#/msp/atelier"; }
  });
  document.addEventListener("change", e => { const el = e.target.closest("[data-mat]"); if (!el) return; const k = el.dataset.mat;
    if (el.type === "checkbox") AT[k] = el.checked; else if (el.dataset.add) { if (el.value) (AT[k] ||= []).push(el.value); } else AT[k] = el.value || undefined; render(); });
  window.MSPV = { view };
})();
