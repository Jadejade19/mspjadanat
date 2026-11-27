"use strict";
// ============================================================================
//  LES NOUVEAUX ENFANTS (520) : 32 « totems » (un animal qui les suit toute leur
//  vie) et 20 passions. 10 enfants par thème = 5 paires fille / garçon accordées.
//  Chacun a un prénom, une histoire, un caractère, un animal de compagnie, des
//  objets adaptés à son âge et une tenue qui évolue : costume entier, t-shirt,
//  jupe ou pantalon à motif, puis trench, cape, gilet ou tablier.
//  Ajoute : 30 motifs (léopard, zèbre, girafe…), capuches-costumes, chapeaux qui
//  couvrent toujours les cheveux, coiffures bouclées. À charger après
//  rigolos-enfants3.js (et avant app.js).
//  Champs en plus sur chaque enfant : histoire, caractere, theme, compagnon.
// ============================================================================
(function () {
  const A = window.ANIMALS_ART, { dk, lt, starD, heartD } = CORPS, { P, N, E, V, VE, G, spark, scal } = A.h, K = A.kh;
  const { SK, HC, EC, T, DESS, PR, CRN, W, KU, OB, sol, gau, main, mainG, ventre, bow, fl, gem, R, TX } = K;
  const two0 = s => s + `<g transform="scale(-1 1)">${s}</g>`, MI = s => `<g transform="matrix(-1 0 0 1 200 0)">${s}</g>`, two = s => s + MI(s);
  const O = "open", HA = "happy", WI = "wink";
  const slug = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/œ/g, "oe").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const C = (x, y, r, f, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${op < 1 ? ` opacity="${op}"` : ""}/>`;
  const fm = (d, mo) => mo ? `<path d="${d}" fill="url(#rg${mo})"/>` : "";
  const vol = (d, c, mo, w = 2.2) => P(d, c, dk(c, .42), w) + fm(d, mo) + `<path d="${d}" fill="url(#aSh)"/>`;

  // ======================== MOTIFS ========================
  const ros = (x, y) => `<path d="M${x - 3.4},${y + .6} q-.4,-3.6 3,-4 M${x + 1.8},${y - 3.2} q2.6,1.4 1.8,4.4 M${x + 2.2},${y + 3} q-2.4,2 -5,.4" fill="none" stroke="#4a2c16" stroke-width="2" stroke-linecap="round"/>` + C(x, y, 1.7, "#8a4f1f", .45);
  const drop = (x, y, f) => `<path d="M${x},${y - 3} q2.6,3.4 0,5 q-2.6,-1.6 0,-5Z" fill="${f}"/>`;
  const flk = (x, y, r) => `<path d="M${x - r},${y} H${x + r} M${x},${y - r} V${y + r} M${x - r * .7},${y - r * .7} L${x + r * .7},${y + r * .7} M${x + r * .7},${y - r * .7} L${x - r * .7},${y + r * .7}" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".9"/>`;
  A.DEFS += [
    T("nxleo", 22, ros(6, 6) + ros(17, 16) + C(16, 5, 1.2, "#4a2c16") + C(5, 17, 1.3, "#4a2c16")),
    T("nxzeb", 14, `<path d="M3,-1 q3.5,7.5 -1,16 M10,-1 q-3.5,7.5 1,16" stroke="#2e2b36" stroke-width="3" fill="none"/>`),
    T("nxtig", 16, `<path d="M-1,5 q5,1 8,-4 M8,13 q5,1 8,-4 M15,5 q3,1 2,-2" stroke="#3a2418" stroke-width="2.4" fill="none" stroke-linecap="round"/>`),
    T("nxgir", 22, `<path d="M1,1 h8 l1,7 l-8,2Z M13,2 h7 v8 h-8Z M3,13 h8 l-1,8 h-7Z M14,13 h7 l-1,7 h-7Z" fill="#a0642a" opacity=".85"/>`),
    T("nxbic", 16, `<ellipse cx="4" cy="4" rx="2.2" ry="1.6" fill="#fff" opacity=".9"/><ellipse cx="12" cy="10" rx="2.2" ry="1.6" fill="#fff" opacity=".9"/>` + C(5, 13, 1.2, "#fff", .8)),
    T("nxvac", 28, `<path d="M2,3 q6,-3 9,2 q2,6 -4,7 q-6,0 -5,-9Z M16,14 q7,-2 9,4 q0,6 -7,6 q-5,-2 -2,-10Z" fill="#2e2b36"/>`),
    T("nxdal", 16, C(4, 4, 2, "#2e2b36") + C(12, 9, 1.5, "#2e2b36") + C(6, 13, 1.2, "#2e2b36")),
    T("nxcoc", 14, C(4, 4, 2.6, "#231d26") + C(11, 11, 2.6, "#231d26")),
    T("nxabe", 12, `<rect width="12" height="4.4" fill="#2e2530"/>`),
    T("nxpan", 22, `<ellipse cx="6" cy="6" rx="4.5" ry="3.4" fill="#2e2b36"/><ellipse cx="17" cy="17" rx="4" ry="3" fill="#2e2b36"/>`),
    T("nxplu", 14, `<path d="M2,8 q5,-7 10,0 M-5,15 q5,-7 10,0 M9,15 q5,-7 10,0" stroke="#fff" stroke-width="1.3" fill="none" opacity=".75"/>`),
    T("nxgou", 14, drop(4, 4, "#fff") + drop(11, 11, "#fff")),
    T("nxnen", 22, `<path d="M6,7 L6,2 A5,4.4 0 1 0 10.5,5.5Z" fill="#5fb05a" stroke="#3f8a3c" stroke-width=".8"/>` + C(16, 16, 1.8, "#ff9fc0") + C(16, 16, .8, "#ffd15c")),
    T("nxcar", 16, `<rect y="5" width="16" height="3" fill="#2e2530" opacity=".22"/><rect x="5" width="3" height="16" fill="#2e2530" opacity=".22"/><rect y="12" width="16" height="1" fill="#fff" opacity=".55"/><rect x="12" width="1" height="16" fill="#fff" opacity=".55"/>`),
    T("nxfeu", 18, `<path d="M3,9 q3,-7 9,-6 q-1,7 -9,6Z" fill="#6fb05a"/><path d="M11,17 q3,-6 7,-5 q-1,6 -7,5Z" fill="#f5a04c"/>`),
    T("nxnot", 18, `<path d="M5,9 V2 L10,1 V7 M13,16 V10" stroke="#fff" stroke-width="1.2" fill="none"/>` + C(4, 9, 1.6, "#fff") + C(9, 7, 1.6, "#fff") + C(12, 16, 1.6, "#fff")),
    T("nxfra", 18, `<path d="M5,4 q-4,0 -3,4 q1,4 3,5 q2,-1 3,-5 q1,-4 -3,-4Z M14,12 q-3,0 -2.5,3 q1,3 2.5,4 q1.5,-1 2.5,-4 q.5,-3 -2.5,-3Z" fill="#e5485a"/><path d="M3,4 h4 l-2,-2Z M12,12 h4 l-2,-2Z" fill="#5fae5a"/>`),
    T("nxpla", 24, C(6, 6, 3.4, "#ffd15c") + `<ellipse cx="6" cy="6" rx="5.6" ry="1.4" fill="none" stroke="#fff" stroke-width=".9"/>` + C(17, 16, 2.4, "#ff8fb0") + P(starD(18, 5, 1.8), "#fff") + P(starD(4, 18, 1.4), "#fff")),
    T("nxcoq", 18, `<path d="M5,9 C1,9 1,3 5,2 C9,3 9,9 5,9Z" fill="#fff" opacity=".8"/>` + C(14, 15, 1.6, "#fff", .7)),
    T("nxcam", 24, `<path d="M1,2 q6,-2 8,3 q-2,5 -7,3Z" fill="#4f6b34" opacity=".7"/><path d="M12,10 q7,-3 10,3 q-3,6 -9,3Z" fill="#2f3f22" opacity=".6"/><path d="M3,15 q5,-2 6,3 q-2,4 -6,2Z" fill="#8a9a5a" opacity=".7"/>`),
    T("nxos", 20, `<path d="M4,6 H12" stroke="#fff" stroke-width="2.2"/>` + [[3.2, 5], [3.2, 7], [12.8, 5], [12.8, 7]].map(([x, y]) => C(x, y, 1.3, "#fff")).join("") + `<path d="M8,15 H16" stroke="#fff" stroke-width="2.2" opacity=".7"/>`),
    T("nxarc", 12, ["#ff7a95", "#ffb45c", "#ffe26b", "#74dd92", "#63b8f7", "#b491f5"].map((c, i) => `<rect y="${i * 2}" width="12" height="2" fill="${c}" opacity=".55"/>`).join("")),
    T("nxflo", 18, flk(5, 5, 2.6) + flk(13, 13, 2)),
    T("nxpat", 18, C(6, 7, 2.2, "#fff", .85) + [[3, 3.5], [5.5, 2.4], [8, 2.8], [9.5, 5]].map(([x, y]) => C(x, y, .9, "#fff", .85)).join("")),
    T("nxpap", 20, `<path d="M6,6 C3,2 0,4 2,7 C0,9 3,11 6,7 C9,11 12,9 10,7 C12,4 9,2 6,6Z" fill="#fff" opacity=".85"/>` + C(15, 15, 1.2, "#fff", .7)),
    T("nxdam", 12, `<rect width="6" height="6" fill="#2e2530" opacity=".2"/><rect x="6" y="6" width="6" height="6" fill="#2e2530" opacity=".2"/>`),
    T("nxlune", 20, `<path d="M6,2 a4,4 0 1 0 3,6 a3.2,3.2 0 1 1 -3,-6Z" fill="#fff3a5"/>` + P(starD(15, 15, 1.8), "#fff")),
    T("nxbon", 18, `<path d="M3,6 l-2.4,-2 v4Z M9,6 l2.4,-2 v4Z" fill="#fff"/>` + C(6, 6, 2.6, "#fff") + C(14, 14, 1.8, "#ffd15c")),
    T("nxher", 14, `<path d="M2,8 l3,-6 l3,6 M8,14 l3,-6 l3,6" fill="none" stroke="#5a3a24" stroke-width="1.3" opacity=".7"/>`),
    T("nxmou", 12, C(4, 4, 3, "#fff", .7) + C(10, 9, 3, "#fff", .7))
  ].join("");

  // ======================== DESSINS DE T-SHIRTS (environ 28 x 24) ========================
  const mf = (c, e, m = "", o = {}) => { const L = dk(c, .45), d = o.d || dk(c, .3), inn = o.i || "#f9b5c0";
    const ear = { chat: two0(P("M-10,-2 L-9,-13 L-2,-8Z", c, L, 1.2) + P("M-8.5,-4 L-8,-10 L-4,-7.5Z", inn)), rond: two0(E(-8, -7, 3.8, 3.8, o.ec || c, L, 1.2)), lapin: two0(E(-4.5, -13, 2.6, 7, c, L, 1.2) + E(-4.5, -13, 1.2, 5, inn)), biche: two0(E(-12, -6, 5, 2.4, c, L, 1.2)), cheval: two0(P("M-7,-6 L-7,-14 L-3,-8Z", c, L, 1.2)) + P("M-2,-9 Q0,-15 2,-9Z", d), girafe: two0(N("M-4,-8 V-14", L, 1.4) + E(-4, -14.5, 1.6, 1.6, d) + E(-11, -4, 3.4, 1.8, c, L, 1)), souris: two0(E(-9, -7, 5, 5, c, L, 1.2) + E(-9, -7, 3, 3, inn)), vache: two0(P("M-6,-7 Q-12,-10 -11,-15 Q-8,-11 -4,-9Z", "#f6ecd8", L, 1) + E(-11, -3, 3.4, 1.8, c, L, 1)), singe: two0(E(-11, 0, 3.4, 3.4, c, L, 1.2) + E(-11, 0, 1.8, 1.8, inn)), koala: two0(E(-9, -6, 5, 5, c, L, 1.2) + E(-9, -6, 2.8, 2.8, "#fff")) }[e] || "";
    return ear + E(0, 1, 10.5, 9.5, c, L, 1.3) + m + two0(E(-3.8, 0, 1.3, 1.7, "#2a1a2a")) + E(0, 4, 1.8, 1.3, o.n || d) + N("M-2.5,6.5 Q0,8.5 2.5,6.5", L, 1); };
  const dots = (L, c, r = 1.1) => L.map(([x, y]) => E(x, y, r, r, c)).join("");
  Object.assign(DESS, {
    nxm: "<!--nxm-->", // repère : la sur-tenue (trench, cape, gilet, tablier) se dessine ici
    nxleo: mf("#e8b56a", "chat", dots([[-5, -5], [5, -6], [0, -7], [-7, 4], [7, 4]], "#5a3a1c")),
    nxbic: mf("#c98d5e", "biche", dots([[-5, -5], [4, -6], [6, -2]], "#fff") + E(0, 4.5, 4.5, 3.4, "#f3dcc0"), { n: "#3a2418" }),
    nxzeb: mf("#fdfcfa", "cheval", N("M-4,-8 v5 M0,-9 v5 M4,-8 v5 M-8,-2 h3 M5,-2 h3", "#2e2b36", 1.6), { n: "#2e2b36" }),
    nxtig: DESS.tigre || mf("#f3973c", "chat", N("M0,-8 v4 M-4,-7 l1,3 M4,-7 l-1,3", "#33241e", 1.6)),
    nxgir: mf("#f9d98c", "girafe", P("M-6,-6 h4 l1,3 h-5Z M3,-7 h4 v3 h-4Z M-8,2 h3 v3 h-3Z", "#a8652a"), { d: "#a8652a" }),
    nxgre: E(0, 3, 11, 8, "#7fcf5c", "#357a2c", 1.3) + two0(E(-6, -5, 4.4, 4.4, "#7fcf5c", "#357a2c", 1.2) + E(-6, -5, 2.6, 2.6, "#fff") + E(-6, -5, 1.2, 1.5, "#2a1a2a")) + N("M-5,5 Q0,9 5,5", "#2f6b2a", 1.4) + E(-7, 4, 2, 1.2, "#ff8fa8", "", 0, 'opacity=".6"') + E(7, 4, 2, 1.2, "#ff8fa8", "", 0, 'opacity=".6"'),
    nxcan: E(0, 0, 10, 9, "#fde06b", "#c09a24", 1.3) + P("M-6,3 Q0,0 6,3 Q4,8 0,8 Q-4,8 -6,3Z", "#f5873c", "#a8501c", 1) + two0(E(-4, -3, 1.4, 1.8, "#2a1a2a")) + N("M0,-9 q-2,-4 2,-5", "#c09a24", 1.4),
    nxpan: DESS.panda2 || mf("#fdfcfa", "rond", "", { ec: "#2e2b36" }),
    nxren: mf("#f08a3e", "chat", two0(P("M-10,1 Q-5,0 -1,6 Q-7,8 -10,1Z", "#fff")), { i: "#fff", n: "#2e2b36" }),
    nxchat: mf("#a9afba", "chat", N("M0,-8 v4 M-4,-7 l1,3 M4,-7 l-1,3", "#4a4f5c", 1.4)),
    nxlap: mf("#fffdfb", "lapin", "", { n: "#f58aa0" }),
    nxours: mf("#9a6a44", "rond", E(0, 4, 4.6, 3.4, "#d9b08a")),
    nxhib: E(0, 1, 10, 10, "#b5844a", "#4a3019", 1.3) + two0(P("M-8,-6 L-10,-13 L-3,-8Z", "#4a3019") + E(-4.2, -1, 3.6, 3.6, "#fff3c4", "#4a3019", .9) + E(-4.2, -1, 1.5, 1.8, "#2a1a2a")) + P("M-1.6,3 H1.6 L0,6.5Z", "#f5a03c") + E(0, 8, 5, 2.4, "#f3dcc0"),
    nxpin: E(0, 1, 10, 10, "#343846", "#14161d", 1.3) + E(0, 3, 7, 7, "#fff") + two0(E(-3, 0, 1.2, 1.6, "#2a1a2a")) + P("M-2,3 H2 L0,6Z", "#f5a03c"),
    nxabe: two0(E(-8, -6, 5, 3.4, "#e5f6ff", "#8fc9ec", .9, 'transform="rotate(-24 -8 -6)"')) + E(0, 2, 10, 8, "#fbcf4a", "#3a2a1c", 1.3) + N("M-6,-3 v10 M0,-5 v14 M6,-3 v10", "#3a2a1c", 2) + two0(N("M-3,-6 q-2,-6 -5,-7", "#3a2a1c", 1.2)),
    nxcoc: P("M-10,4 C-10,-8 10,-8 10,4Z", "#ea4a3f", "#2b2226", 1.3) + N("M0,-6 V4", "#2b2226", 1.2) + dots([[-5, -1], [5, -1], [-3, 2.5], [3, 2.5]], "#231d26", 1.6) + E(0, -7, 4, 3, "#231d26") + two0(N("M-2,-9 q-1,-3 -4,-4", "#231d26", 1)),
    nxpap: two0(P("M0,0 C-4,-14 -14,-12 -12,-3 C-14,4 -6,8 0,2Z", "#b18cf2", "#4a2f8a", 1.2) + E(-6, -4, 2, 2, "#fff", "", 0, 'opacity=".7"')) + E(0, 0, 1.4, 6, "#4a2f8a"),
    nxdino: P("M-11,7 q0,-9 8,-9 q2,-6 7,-5 q4,1 3,5 q-2,2 -4,1 q0,8 -5,9Z", "#8fc46a", "#46792f", 1.3) + E(5, -4, 1, 1, "#1c3a2a") + P("M-6,-2 l2,-4 l2,3 M-2,-3 l2,-4 l2,3", "#ffd15c"),
    nxlic: E(0, 2, 9, 9, "#fff0f6", "#b59fd0", 1.3) + P("M-2,-6 L0,-15 L2,-6Z", "#ffe08a", "#c9963c", .9) + P("M3,-7 Q10,-4 9,4 Q6,-2 2,-3Z", "#ff9fc0") + two0(E(-3.4, 1, 1.2, 1.6, "#2a1a2a")) + E(0, 5, 3, 2, "#f9c5d8"),
    nxbal: P("M-12,2 C-12,-8 8,-9 11,0 C12,6 4,9 -4,8 C-10,8 -12,6 -12,2Z", "#6fa8d9", "#2f6298", 1.3) + P("M11,0 l4,-4 l0,7Z", "#6fa8d9", "#2f6298", 1) + E(-6, 0, 1.2, 1.4, "#2a1a2a") + N("M-2,-9 q0,-4 -3,-5 M-2,-9 q0,-4 3,-5", "#8fd0f5", 1.4),
    nxlion: V(scal(0, 1, 13, 12, 10), "#c97a2c", "#7a4a14", 1.2) + mf("#f0c06a", "rond", E(0, 4, 4, 3, "#fff3d9")),
    nxele: two0(E(-10, -1, 5, 6, "#a9b2c2", "#5c667a", 1.2)) + E(0, -1, 8, 8, "#a9b2c2", "#5c667a", 1.3) + N("M0,3 q0,6 3,7", "#5c667a", 4) + N("M0,3 q0,6 3,7", "#a9b2c2", 2.4) + two0(E(-3, -2, 1.1, 1.4, "#2a1a2a")),
    nxvac: mf("#fffdfa", "vache", P("M3,-8 q5,1 5,5 q-3,2 -6,-1Z", "#2e2b36") + E(0, 4.5, 5, 3.2, "#f9c5cf"), { n: "#c97f8f" }),
    nxmou: V(scal(0, 0, 11, 10, 9), "#fffaf2", "#c0b09c", 1.1) + E(0, 2, 6, 6.5, "#5a4a42") + two0(E(-7, 1, 2.6, 1.4, "#5a4a42") + E(-2.2, 1, .9, 1.1, "#fff")),
    nxsin: mf("#b59a7a", "singe", P("M-6,-2 C-6,-8 6,-8 6,-2 C7,6 3,8 0,8 C-3,8 -7,6 -6,-2Z", "#f7e3c9"), { n: "#5f4a35" }),
    nxkoa: mf("#a6afbb", "koala", "", { n: "#4a4350" }),
    nxloup: mf("#8e95a3", "chat", E(0, 4.5, 4.6, 3.4, "#f1f3f6"), { n: "#2e2b36" }),
    nxecu: P("M8,8 C18,6 18,-10 10,-12 C14,-4 12,2 8,4Z", "#d08b47", "#7d4818", 1) + mf("#d08b47", "chat", E(0, 4.5, 4, 3, "#fff1dd")),
    nxher: P("M-11,4 L-12,-4 L-8,-4 L-9,-10 L-4,-8 L-3,-13 L1,-9 L4,-13 L6,-8 L10,-10 L9,-4 L12,-2 L10,4Z", "#8a5a3a", "#54382a", 1) + E(2, 2, 7, 5.5, "#f3d3ae", "#8a5a3a", 1) + E(5, 1, 1.1, 1.3, "#2a1a2a") + E(9, 3, 1.4, 1.2, "#2a1a2a"),
    nxfla: N("M2,8 V-2", "#f98fae", 1.6) + P("M-8,0 C-8,-6 4,-7 6,-2 C7,2 2,4 -3,4 C-6,4 -8,3 -8,0Z", "#f98fae", "#c0527a", 1.2) + N("M4,-3 Q6,-10 2,-12 Q-1,-12 0,-9", "#f98fae", 2.4) + P("M0,-9 l-3,1 l2,2Z", "#2e2b36"),
    nxcrabe: E(0, 2, 9, 6, "#ec5a4a", "#9c2420", 1.3) + two0(N("M-8,0 q-5,-5 -3,-9", "#ec5a4a", 2.4) + E(-11, -9, 2.4, 2, "#ec5a4a") + N("M-7,5 l-4,3", "#9c2420", 1.2)) + two0(N("M-3,-3 V-7", "#9c2420", 1) + E(-3, -8, 1.4, 1.4, "#fff", "#2a1a2a", .6)) + N("M-2,4 Q0,6 2,4", "#7a1a14", 1),
    nxcupcake: P("M-8,0 L-6,10 H6 L8,0Z", "#8fc4f5", "#3f6fa8", 1.2) + V(scal(0, -3, 9, 6, 8), "#ffb3cf", "#b5507f", 1) + C(0, -9, 2, "#e5485a"),
    nxnum: TX(0, 7, "7", 20, "#fff", "#2e2530"),
    nxepee: N("M0,10 V-12", "#c9d3e2", 3) + N("M-6,4 H6", "#a8761c", 3) + C(0, 10, 2, "#ffd15c"),
    nxgateau: R(-10, -2, 20, 10, 2, "#ffb3cf", "#b5507f", 1.2) + R(-7, -8, 14, 6, 2, "#fff3d9", "#b58a5a", 1) + N("M-3,-8 v-4 M3,-8 v-4", "#5fa8f0", 1.6) + C(-3, -13, 1.2, "#ffd15c") + C(3, -13, 1.2, "#ffd15c"),
    nxlivre: P("M0,-6 C-5,-9 -11,-9 -12,-7 V7 C-8,5 -4,5 0,8 C4,5 8,5 12,7 V-7 C11,-9 5,-9 0,-6Z", "#fff", "#5f7fc9", 1.4) + N("M0,-6 V8", "#5f7fc9", 1)
  });

  // ======================== CHAPEAUX ET CAPUCHES (repère : centre du visage) ========================
  // Règle : un chapeau couvre tout le haut du crâne (de x -47 à 47, jusqu'à y -79) pour qu'aucun cheveu ne dépasse.
  const DOME = "M-47,-22 C-50,-58 -26,-73 0,-73 C26,-73 50,-58 47,-22 Q0,-36 -47,-22Z";
  const brim = (c, rx = 60, y = -24) => P(`M${-rx},${y} Q${-rx + 2},${y - 12} -46,${y - 8} Q0,${y - 20} 46,${y - 8} Q${rx - 2},${y - 12} ${rx},${y} Q46,${y + 12} 0,${y + 6} Q-46,${y + 12} ${-rx},${y}Z`, dk(c, .08), dk(c, .42), 2);
  const band = (c, y = -26) => N(`M-47,${y} Q0,${y - 14} 47,${y}`, dk(c, .42), 6.5) + N(`M-47,${y} Q0,${y - 14} 47,${y}`, c, 4);
  const frogEyes = two0(VE(-26, -68, 10, 9, "#7fcf5c", "#357a2c", 2) + E(-26, -69, 6, 6, "#fff") + E(-26, -68, 3.2, 3.8, "#2a2030") + E(-27.5, -70.5, 1.2, 1.2, "#fff"));
  const HATK = new Set(); // clés des vrais chapeaux (les cheveux passent dessous)
  const hat = (k, f) => { CRN[k] = f; HATK.add(k); };
  hat("nxbob", c => vol(DOME, c, "") + band(lt(c, .4)) + brim(c));
  hat("nxbobgre", () => vol(DOME, "#7fcf5c", "nxnen") + frogEyes + N("M-12,-52 Q0,-45 12,-52", "#2f6b2a", 2.6) + band("#ffd84d") + brim("#7fcf5c"));
  hat("nxbonnet", c => vol(DOME, c, "zig") + P("M-49,-18 Q0,-36 49,-18 L47,-32 Q0,-48 -47,-32Z", lt(c, .45), dk(c, .4), 2) + V(scal(0, -76, 10, 10, 9), "#fff", "#b5a8b5", 1.6));
  hat("nxbonnetnuit", c => vol("M-47,-22 C-50,-62 -26,-79 0,-79 C30,-80 52,-62 64,-30 C70,-16 66,-6 60,-4 C56,-20 50,-30 47,-22 Q0,-36 -47,-22Z", c, "etoile") + P("M-49,-18 Q0,-36 49,-18 L47,-30 Q0,-46 -47,-30Z", "#fff", "#b5a8b5", 2) + V(scal(62, -2, 9, 9, 9), "#ffd84d", "#a8761c", 1.6));
  hat("nxsour", c => P("M-62,-20 Q-60,-34 -46,-30 Q0,-42 46,-30 Q60,-34 62,-20 Q66,0 56,12 Q46,-8 0,-14 Q-46,-8 -56,12 Q-66,0 -62,-20Z", dk(c, .06), dk(c, .42), 2.2) + vol(DOME, c, "") + N("M-30,-70 Q0,-80 30,-70", "#fff", 3, 'opacity=".45"'));
  hat("nxsoleil", c => E(0, -24, 68, 15, "#f6dfa5", "#a8823c", 2.2) + vol(DOME, "#f6dfa5", "") + band(c, -28));
  hat("nxsorcier", c => E(0, -26, 66, 13, dk(c, .1), dk(c, .45), 2.2) + vol("M-48,-26 C-46,-56 -20,-92 16,-126 C12,-94 28,-62 48,-26 Q0,-40 -48,-26Z", c, "etoile") + band("#ffd84d", -30) + P(starD(30, -100, 7), "#ffd84d", "#a8761c", 1.4));
  hat("nxcasq", c => vol(DOME, c, "") + P("M-38,-24 Q0,-40 38,-24 Q60,-16 40,-12 Q0,-26 -34,-12 Q-48,-14 -38,-24Z", dk(c, .18), dk(c, .45), 2) + C(0, -73, 4, dk(c, .2)));
  hat("nxexplo", c => E(0, -24, 64, 13, "#c9b07a", "#7a6a3a", 2.2) + vol(DOME, "#d9c08a", "") + band(c, -30));
  hat("nxberet", c => vol("M-50,-24 C-58,-66 -10,-86 30,-76 C62,-66 62,-38 50,-24 Q0,-40 -50,-24Z", c, "") + N("M18,-78 v-9", dk(c, .42), 3.4));
  hat("nxheaume", c => vol(DOME, "#c9d3e2", "") + P("M-47,-24 Q0,-38 47,-24 L46,-34 Q0,-48 -46,-34Z", "#9aa8bf", "#56627a", 2) + N("M0,-73 V-34", "#9aa8bf", 4) + P("M0,-74 C10,-94 30,-94 36,-82 C24,-86 14,-80 6,-70Z", c, dk(c, .4), 1.6));
  hat("nxtricorne", c => vol(DOME, "#2f2b3a", "") + P("M-62,-30 Q-40,-50 0,-44 Q40,-50 62,-30 Q30,-36 0,-20 Q-30,-36 -62,-30Z", "#2f2b3a", "#15131b", 2.2) + N("M-56,-31 Q-30,-38 0,-24 Q30,-38 56,-31", c, 2.6) + E(0, -60, 7, 7, "#fff") + P("M-4,-62 L4,-58 M4,-62 L-4,-58", "none", "#2f2b3a", 1.6));
  hat("nxbandana", c => vol(DOME, c, "pois") + P("M40,-26 L62,-14 L54,-2 L44,-18Z", c, dk(c, .42), 1.8) + P("M42,-24 L60,-36 L64,-22Z", c, dk(c, .42), 1.8));
  hat("nxhdf", c => vol("M-44,-24 L-42,-86 Q0,-92 42,-86 L44,-24 Q0,-34 -44,-24Z", "#2f2b3a", "") + P("M-44,-34 Q0,-44 44,-34 L44,-46 Q0,-56 -44,-46Z", c) + E(0, -24, 60, 11, "#2f2b3a", "#15131b", 2));
  hat("nxbulle", () => E(0, -6, 66, 64, "#dff3ff", "#9fc9e8", 3.4, 'fill-opacity=".28"') + N("M-44,-40 Q-34,-56 -16,-62", "#fff", 5, 'opacity=".8"') + N("M-46,50 Q0,66 46,50", "#cfd6e2", 9) + N("M-46,50 Q0,66 46,50", "#eef2f8", 5));
  HATK.add("toque"); HATK.add("parka"); HATK.add("fete");
  // capuche-costume : un anneau autour du visage, avec les oreilles de l'animal
  const RO = "M-55,6 C-57,-46 -29,-68 0,-68 C29,-68 57,-46 55,6 C55,32 37,52 0,52 C-37,52 -55,32 -55,6Z", RI = " M0,-37 C21,-37 37,-21 37,5 C37,28 21,45 0,45 C-21,45 -37,28 -37,5 C-37,-21 -21,-37 0,-37Z";
  const ring = (c, mo) => `<path d="${RO}${RI}" fill="${c}" fill-rule="evenodd" stroke="${dk(c, .42)}" stroke-width="2.2" stroke-linejoin="round"/>` + (mo ? `<path d="${RO}${RI}" fill="url(#rg${mo})" fill-rule="evenodd"/>` : "") + `<path d="${RO}${RI}" fill="url(#aSh)" fill-rule="evenodd"/><path d="${RI.trim()}" fill="none" stroke="${lt(c, .5)}" stroke-width="3.4" opacity=".7"/>`;
  function ears(t, c, d, inn, y = 0) { const L = dk(c, .42), ant = col => two0(N(`M-14,${-62 + y} Q-20,${-86 + y} -32,${-92 + y}`, col, 3.2) + E(-33, -93 + y, 5, 5, col)), pt = (f = c, i = inn) => two0(V(`M-48,${-30 + y} L-46,${-80 + y} L-14,${-60 + y}Z`, f, L, 2.2) + P(`M-41,${-42 + y} L-40,${-68 + y} L-22,${-57 + y}Z`, i));
    return ({ chat: () => pt(), rond: () => two0(VE(-40, -54 + y, 15, 15, c, L, 2.2) + E(-40, -54 + y, 8, 8, inn)), panda: () => two0(VE(-40, -54 + y, 15, 15, d, dk(d, .4), 2.2)),
      lapin: () => two0(V(`M-30,${-56 + y} C-44,${-84 + y} -38,${-110 + y} -27,${-110 + y} C-14,${-106 + y} -12,${-80 + y} -14,${-58 + y}Z`, c, L, 2.2) + P(`M-27,${-62 + y} C-34,${-82 + y} -32,${-100 + y} -27,${-102 + y} C-20,${-98 + y} -19,${-80 + y} -20,${-64 + y}Z`, inn)),
      biche: () => two0(V(`M-40,${-46 + y} C-62,${-64 + y} -86,${-62 + y} -90,${-52 + y} C-82,${-36 + y} -60,${-32 + y} -44,${-36 + y}Z`, c, L, 2.2) + P(`M-46,${-43 + y} C-62,${-55 + y} -77,${-54 + y} -81,${-49 + y} C-75,${-40 + y} -60,${-38 + y} -48,${-40 + y}Z`, inn)),
      cheval: () => V(`M-10,${-62 + y} C-12,${-84 + y} 12,${-84 + y} 10,${-62 + y}Z`, d, dk(d, .4), 2) + two0(V(`M-26,${-58 + y} L-32,${-88 + y} L-12,${-66 + y}Z`, c, L, 2.2)),
      girafe: () => two0(N(`M-16,${-60 + y} V${-86 + y}`, L, 6) + N(`M-16,${-60 + y} V${-86 + y}`, c, 3.6) + VE(-16, -88 + y, 6, 6, d, dk(d, .4), 1.6) + V(`M-44,${-38 + y} C-62,${-48 + y} -72,${-42 + y} -72,${-36 + y} C-62,${-30 + y} -52,${-32 + y} -44,${-34 + y}Z`, c, L, 2)),
      grenouille: () => two0(VE(-24, -66 + y, 15, 14, c, L, 2.2) + E(-24, -68 + y, 9, 9, "#fff") + E(-24, -67 + y, 4.6, 5.4, "#2a2030") + E(-26, -70 + y, 1.6, 1.6, "#fff")),
      canard: () => P(`M-8,${-66 + y} Q-6,${-84 + y} 4,${-86 + y} Q0,${-76 + y} 8,${-68 + y}Z`, c, L, 2),
      dino: () => [[-30, -54, -30], [-11, -64, -10], [11, -64, 10], [30, -54, 30]].map(([px, py, r]) => `<path d="M-11,6 L0,-16 L11,6Z" transform="translate(${px} ${py + y}) rotate(${r})" fill="${d}" stroke="${dk(d, .4)}" stroke-width="2"/>`).join(""),
      hibou: () => two0(V(`M-42,${-44 + y} L-52,${-80 + y} L-20,${-60 + y}Z`, d, dk(d, .4), 2.2)),
      antenne: () => ant(d), papillon: () => two0(N(`M-12,${-62 + y} Q-16,${-88 + y} -30,${-92 + y} q-8,-2 -6,6`, d, 3)),
      lion: () => `<path d="${scal(0, -4 + y * .5, 72, 68, 16)}${RI}" fill="${d}" fill-rule="evenodd" stroke="${dk(d, .4)}" stroke-width="2.2"/>` + two0(VE(-36, -58 + y, 11, 11, c, L, 2)),
      licorne: () => two0(V(`M-42,${-40 + y} L-40,${-74 + y} L-18,${-58 + y}Z`, c, L, 2.2)) + V(`M-30,${-60 + y} C-20,${-82 + y} 14,${-84 + y} 24,${-62 + y}Z`, "#ff9fc0", "#c9567f", 2),
      dragon: () => two0(V(`M-26,${-58 + y} C-36,${-78 + y} -32,${-96 + y} -20,${-102 + y} C-22,${-86 + y} -16,${-74 + y} -12,${-64 + y}Z`, "#fff3d9", "#b5944a", 2)) + [[-30, -54, -30], [0, -66, 0], [30, -54, 30]].map(([px, py, r]) => `<path d="M-9,6 L0,-13 L9,6Z" transform="translate(${px} ${py + y}) rotate(${r})" fill="${d}" stroke="${dk(d, .4)}" stroke-width="1.8"/>`).join(""),
      aileron: () => V(`M-10,${-64 + y} C-6,${-88 + y} 10,${-102 + y} 24,${-100 + y} C16,${-88 + y} 16,${-74 + y} 22,${-62 + y}Z`, c, L, 2.2),
      souris: () => two0(VE(-44, -50 + y, 21, 21, c, L, 2.2) + E(-44, -50 + y, 12, 12, inn)),
      vache: () => two0(P(`M-30,${-58 + y} Q-52,${-70 + y} -46,${-90 + y} Q-38,${-74 + y} -22,${-66 + y}Z`, "#f6ecd8", "#a8946a", 2) + V(`M-46,${-36 + y} C-64,${-44 + y} -74,${-38 + y} -72,${-30 + y} C-62,${-26 + y} -52,${-28 + y} -46,${-30 + y}Z`, c, L, 2)),
      mouton: () => two0(V(`M-48,${-30 + y} C-66,${-36 + y} -74,${-26 + y} -70,${-20 + y} C-62,${-16 + y} -52,${-20 + y} -48,${-24 + y}Z`, d, dk(d, .4), 2)) + [-36, -18, 0, 18, 36].map(x => VE(x, -62 + y + Math.abs(x) * .28, 10, 9, c, L, 1.8)).join(""),
      singe: () => two0(VE(-58, -4 + y, 12, 12, c, L, 2.2) + E(-58, -4 + y, 6, 6, inn)),
      koala: () => two0(V(scal(-46, -48 + y, 21, 20, 10), c, L, 2.2) + E(-46, -48 + y, 11, 11, "#fff")),
      elephant: () => two0(V(`M-48,${-30 + y} C-82,${-44 + y} -96,${0 + y} -72,${22 + y} C-62,${28 + y} -52,${14 + y} -50,${4 + y}Z`, c, L, 2.2) + P(`M-52,${-22 + y} C-76,${-30 + y} -84,${-2 + y} -68,${12 + y} C-60,${16 + y} -55,${6 + y} -54,${0 + y}Z`, inn)),
      herisson: () => [-44, -30, -14, 0, 14, 30, 44].map(x => `<path d="M-8,4 L0,-14 L8,4Z" transform="translate(${x} ${-58 + y + Math.abs(x) * .3}) rotate(${x * 1.1})" fill="${d}" stroke="${dk(d, .4)}" stroke-width="1.8"/>`).join(""),
      flamant: () => P(`M0,${-66 + y} C-4,${-88 + y} 10,${-98 + y} 18,${-92 + y} C10,${-88 + y} 8,${-78 + y} 10,${-66 + y}Z`, d, dk(d, .4), 2),
      baleine: () => N(`M0,${-68 + y} V${-84 + y} M0,${-84 + y} q-10,-6 -16,2 M0,${-84 + y} q10,-6 16,2`, "#8fd0f5", 3.4) + C(-18, -80 + y, 3, "#bfe6fb") + C(18, -80 + y, 3, "#bfe6fb"),
      ecureuil: () => pt() + two0(N(`M-46,${-80 + y} l-4,-6 M-46,${-80 + y} l2,-8`, L, 2.4)),
      loup: () => pt(c, lt(c, .5)), renard: () => pt(c, "#fff"), aucun: () => "" }[t] || (() => ""))(); }
  const FRONT = { canard: (c) => P("M-24,-36 Q0,-26 24,-36 Q18,-20 0,-18 Q-18,-20 -24,-36Z", "#f5a03c", "#a8501c", 2), pingouin: () => P("M-6,-38 L6,-38 L0,-30Z", "#f5a03c", "#a8501c", 1.4), licorne: () => P("M-7,-60 L0,-98 L7,-60Z", "#ffe08a", "#c9963c", 2) + N("M-5,-68 L5,-72 M-3.5,-78 L3.5,-81 M-2,-87 L2,-89", "#c9963c", 1.6) };
  const HOOD = new Set();
  const hood = (k, t, c, d, mo, inn = "#ffc5d0") => { CRN[k] = () => ears(t, c, d, inn) + ring(c, mo) + (FRONT[t] ? FRONT[t](c) : ""); HOOD.add(k); return k; };
  const headband = (k, t, c, d, inn = "#ffc5d0") => { CRN[k] = () => ears(t, c, d, inn, 10) + N("M-41,-18 Q0,-50 41,-18", dk(c, .45), 8) + N("M-41,-18 Q0,-50 41,-18", c, 5) + (t === "licorne" ? G("translate(0 14)", FRONT.licorne()) : ""); return k; };
  const capEars = (k, t, c, d, inn = "#ffc5d0") => { hat(k, () => ears(t, c, d, inn, 2) + vol(DOME, c, "") + P("M-38,-24 Q0,-40 38,-24 Q60,-16 40,-12 Q0,-26 -34,-12 Q-48,-14 -38,-24Z", d, dk(d, .45), 2)); return k; };
  // sous un chapeau, les coiffures qui montent trop haut se tassent
  const SAFE = { macarons: "carre", pompons: "couettes", houppe: "court", vague: "court", brosse: "court", epis: "court", under: "court", duvet: "ras", meche: "court", raieonde: "ondule" };

  // ======================== OBJETS (origine : la main, ou le sol) ========================
  const OBX = {
    hochet: PR.hochet(0, -16, .9), nounours: PR.nounours(0, 0, .9), balle: PR.balle(0, -14, .9, "#f06a7f"), cubes: PR.cubes(0, 0, .8), canard: PR.canard(0, -8, .9), livre: PR.livre(0, -12, .8), fleurP: PR.fleur(0, -24, .9), poisson: PR.poisson(0, -10, .8), coquille: PR.coquille(0, -10, .9), ballonG: N("M0,4 Q-6,-20 2,-40", "#8a7a8a", 1.4) + PR.ballon(2, -58, .95, "#ff6f8f"), cerf: PR.cerf(0, -50, .7, "#5fa8f0"), tambour: PR.tambour(0, 0, .9), baguette: PR.baguette(0, -14, .9),
    seau: P("M-11,-18 H11 L8,0 H-8Z", "#ff8f5c", "#a8501c", 1.6) + N("M-11,-18 Q0,-30 11,-18", "#a8501c", 1.6) + P(starD(0, -9, 4), "#fff"),
    pelle: N("M0,8 V-16", "#ffd15c", 3.4) + P("M-6,8 H6 L4,20 H-4Z", "#5fa8f0", "#24508f", 1.2),
    chateau: P("M-22,0 V-16 H-16 V-20 H-12 V-16 H-4 V-26 H0 V-30 H4 V-26 H8 V-16 H14 V-20 H18 V-16 H22 V0Z", "#f0cf86", "#b5904a", 1.6) + P("M-3,0 V-8 a3,3 0 0 1 6,0 V0Z", "#c9a05a") + N("M2,-30 V-40 l7,3 l-7,3", "#e5485a", 1.6),
    carotte: P("M-18,-5 Q-16,-11 10,-8 L18,-6 L10,-3 Q-16,1 -18,-5Z", "#f5873c", "#a8501c", 1.4) + P("M-18,-6 q-6,-6 -4,-10 q4,2 4,8 q2,-6 6,-6 q0,4 -6,8Z", "#6fbf5a", "#3f7a34", 1),
    pomme: E(0, -9, 9, 9, "#e5485a", "#8f1f2c", 1.6) + N("M0,-18 q1,-4 3,-5", "#6b4a2a", 1.8) + P("M2,-20 q6,-4 8,0 q-4,3 -8,0Z", "#6fbf5a"),
    banane: P("M-14,-4 C-8,4 8,4 14,-6 C10,-2 -4,-1 -10,-8Z", "#ffd84d", "#a8801c", 1.4),
    bambou: N("M0,6 V-38", "#5f9a3f", 6) + N("M0,6 V-38", "#8fcf6a", 3.6) + N("M-3,-6 H3 M-3,-20 H3", "#3f7a2c", 1.6) + P("M0,-28 q10,-8 16,-4 q-8,6 -16,4Z M0,-14 q-10,-8 -15,-2 q8,5 15,2Z", "#6fbf5a", "#3f7a34", 1),
    miel: P("M-12,0 C-14,-12 -12,-20 -8,-22 H8 C12,-20 14,-12 12,0Z", "#f5b84c", "#a8701c", 1.6) + R(-10, -26, 20, 6, 2, "#d9a05a", "#8a5a1c", 1.2) + TX(0, -8, "MIEL", 6, "#7a4a14") + P("M-6,-20 q2,6 0,10 q-2,-4 0,-10Z", "#ffd84d"),
    os: N("M-12,-6 H12", "#f6efe4", 6) + [[-13, -9], [-13, -3], [13, -9], [13, -3]].map(([x, y]) => C(x, y, 3.6, "#f6efe4")).join("") + N("M-12,-6 H12", "#c9b9a0", 1, 'opacity=".5"'),
    filet: N("M0,10 L6,-30", "#a8763c", 3) + E(8, -40, 10, 8, "none", "#8a7a8a", 2) + P("M-2,-40 Q8,-24 18,-40", "#fff", "#b5a8b5", 1, 'opacity=".7"'),
    lanterne: N("M0,0 V8", "#5a566b", 2) + R(-8, 8, 16, 18, 4, "#ffe9a5", "#a8761c", 1.8) + E(0, 17, 4, 6, "#ffd84d") + R(-9, 6, 18, 4, 1.5, "#5a566b"),
    luge: P("M-24,-10 H22 V-4 H-24Z", "#e5485a", "#8f1f2c", 1.5) + N("M-26,0 H24 Q30,0 30,-6 M-18,-4 V0 M16,-4 V0", "#8a94a8", 2.4),
    bonhomme: VE(0, -12, 13, 12, "#fff", "#9fb3c9", 1.8) + VE(0, -32, 9, 9, "#fff", "#9fb3c9", 1.8) + P("M0,-32 l9,2 l-9,2Z", "#f5873c") + two0(C(-3, -35, 1.2, "#2e2b36")) + N("M-8,-24 Q0,-20 8,-24", "#e5485a", 3) + P("M-8,-41 H8 V-45 H5 V-52 H-5 V-45 H-8Z", "#2f2b3a"),
    boule: VE(-8, -6, 7, 6, "#fff", "#9fb3c9", 1.4) + VE(6, -6, 7, 6, "#fff", "#9fb3c9", 1.4) + VE(-1, -15, 7, 6, "#fff", "#9fb3c9", 1.4),
    cadeau: R(-14, -24, 28, 24, 3, "#8f7bea", "#4f3aa0", 1.6) + N("M0,-24 V0 M-14,-12 H14", "#ffd84d", 3.4) + bow(0, -26, .5, "#ffd84d"),
    gateau: R(-16, -14, 32, 14, 3, "#ffb3cf", "#b5507f", 1.6) + R(-11, -24, 22, 10, 3, "#fff3d9", "#b58a5a", 1.4) + N("M-5,-24 v-7 M5,-24 v-7", "#5fa8f0", 2) + E(-5, -33, 1.8, 2.6, "#ffd84d") + E(5, -33, 1.8, 2.6, "#ffd84d") + N("M-16,-12 q4,4 8,0 q4,4 8,0 q4,4 8,0 q4,4 8,0", "#fff", 2),
    fouet: N("M0,8 V-6", "#8a5a30", 4) + E(0, -16, 6, 11, "none", "#b9c6da", 1.6) + E(0, -16, 2.6, 11, "none", "#b9c6da", 1.4),
    bol: P("M-16,-6 Q0,14 16,-6Z", "#fff", "#8fa0b8", 1.6) + E(0, -6, 16, 4, "#f5d58a", "#8fa0b8", 1.4) + N("M6,-8 L16,-22", "#c98f52", 3),
    cuillere: N("M-14,-3 H8", "#c98f52", 3) + E(13, -3, 6, 3.6, "#c98f52"),
    etoileB: P(starD(0, -14, 14), "#ffe27a", "#b5903c", 1.8) + two0(C(-4, -15, 1.4, "#3a2a14")) + N("M-3,-10 Q0,-7 3,-10", "#3a2a14", 1.2),
    fuseeJ: P("M0,-40 C9,-30 9,-10 6,-4 H-6 C-9,-10 -9,-30 0,-40Z", "#fff", "#8a94a8", 1.6) + C(0, -24, 4, "#7fc4f0") + P("M-6,-10 l-6,8 h7Z M6,-10 l6,8 h-7Z", "#e5485a") + P("M-3,-4 L0,6 L3,-4Z", "#f5a03c"),
    stetho: N("M-6,-4 C-14,10 -6,26 4,24 C14,22 16,8 10,-4", "#3f4f70", 2.6) + C(4, 24, 4.6, "#c9d3e2") + C(-6, -4, 2.2, "#3f4f70") + C(10, -4, 2.2, "#3f4f70"),
    squel: N("M0,-44 V-14 M-10,-36 H10 M-12,-30 H12 M-10,-24 H10 M0,-14 L-8,0 M0,-14 L8,0 M-12,-36 L-16,-20 M12,-36 L16,-20", "#f6efe4", 3.2) + E(0, -50, 7, 7.6, "#f6efe4", "#a8a3b0", 1.4) + two0(E(-2.6, -50, 1.6, 2, "#4a4558")) + N("M-3,-46 H3", "#4a4558", 1),
    robotJ: R(-12, -30, 24, 22, 4, "#b9c6da", "#56627a", 1.6) + C(-5, -21, 3, "#5fffc0") + C(5, -21, 3, "#5fffc0") + R(-9, -8, 18, 8, 2, "#8a94a8", "#56627a", 1.2) + N("M0,-30 V-38", "#56627a", 2) + C(0, -40, 2.6, "#ff6f6f"),
    carte: R(-18, -12, 36, 24, 2, "#f5e3b5", "#a8803c", 1.6) + N("M-12,6 Q-4,-6 4,2 T12,-6", "#a8803c", 1.4, 'stroke-dasharray="3 2"') + N("M9,-9 l6,6 M15,-9 l-6,6", "#e5485a", 2),
    longuevue: G("rotate(-35)", R(-4, -34, 8, 36, 3, "#c9844c", "#5f3414", 1.5) + R(-5, -38, 10, 8, 2, "#ffd84d", "#a8761c", 1.2)),
    bouclier: P("M-14,-30 H14 V-16 C14,-6 6,0 0,2 C-6,0 -14,-6 -14,-16Z", "#5fa8f0", "#24508f", 1.8) + N("M0,-28 V0 M-12,-18 H12", "#ffd84d", 2.4),
    epeeB: N("M0,8 V-34", "#c98f52", 4.4) + N("M-8,0 H8", "#8a5a30", 4),
    pelote: E(0, -10, 10, 10, "#e5646f", "#8f2f3a", 1.6) + N("M-8,-14 Q0,-6 8,-14 M-9,-8 Q0,0 9,-8 M-4,-19 Q2,-10 -2,-1", "#b5404f", 1.2) + N("M8,-4 q10,4 14,4", "#e5646f", 1.6),
    tambourin: E(0, -8, 14, 14, "#fff3d9", "#a8763c", 3) + [0, 60, 120, 180, 240, 300].map(a => C(14 * Math.cos(a / 57.3), -8 + 14 * Math.sin(a / 57.3), 2.2, "#ffd84d")).join(""),
    maracas: N("M0,8 V-12", "#8a5a30", 3) + E(0, -20, 8, 10, "#f5a04c", "#a8501c", 1.6) + N("M-6,-22 Q0,-18 6,-22", "#fff", 2),
    nenuphar: E(0, -2, 22, 6, "#5fb05a", "#3f8a3c", 1.6) + fl(8, -6, 4, "#ff9fc0"),
    champi: P("M-14,-10 Q-14,-24 0,-24 Q14,-24 14,-10Z", "#e5485a", "#8f1f2c", 1.6) + R(-5, -10, 10, 10, 3, "#fff3d9", "#b5a080", 1.2) + C(-6, -17, 2.4, "#fff") + C(5, -19, 2, "#fff"),
    crayons: ["#e5485a", "#5fa8f0", "#ffd15c"].map((c, i) => `<g transform="translate(${-12 + i * 12} 0) rotate(${-74 + i * 4})">${R(-2.5, -18, 5, 18, 1.5, c, dk(c, .4), 1)}</g>`).join(""),
    ballons: [["#ff6f8f", -12], ["#5fa8f0", 2], ["#ffd15c", 14]].map(([c, x]) => N(`M0,4 Q${x * .4},-18 ${x},-40`, "#8a7a8a", 1.2) + E(x, -50, 9, 11, c, dk(c, .4), 1.4) + E(x - 3, -54, 2.4, 3.4, "#fff", "", 0, 'opacity=".5"')).join(""),
    ballonF: OB.ballon, basket: E(0, -14, 14, 14, "#f5873c", "#a8501c", 2) + N("M-14,-14 H14 M0,-28 V0 M-10,-24 Q-2,-14 -10,-4 M10,-24 Q2,-14 10,-4", "#a8501c", 1.4),
    coupe: P("M-12,-34 H12 Q12,-18 0,-14 Q-12,-18 -12,-34Z", "#ffd84d", "#a8761c", 1.8) + N("M0,-14 V-6", "#a8761c", 4) + R(-9, -6, 18, 6, 2, "#a8761c") + two0(N("M-12,-30 q-8,0 -6,8 q2,4 6,2", "#a8761c", 2)),
    doudou: E(0, -10, 10, 9, "#fff", "#a89aa5", 1.5) + two0(E(-4, -26, 3, 8, "#fff", "#a89aa5", 1.3)) + two0(C(-3.4, -11, 1.2, "#2a2030")) + E(0, -7, 1.6, 1.2, "#f58aa0"),
    livreO: P("M0,-8 C-8,-14 -20,-13 -24,-10 V12 C-18,9 -8,9 0,14 C8,9 18,9 24,12 V-10 C20,-13 8,-14 0,-8Z", "#fff", "#5f7fc9", 2.2) + N("M0,-8 V14", "#5f7fc9", 1.4) + N("M-18,-4 H-6 M-18,1 H-6 M6,-4 H18 M6,1 H18", "#b5bccb", 1.2),
    livreM: R(-14, -18, 28, 34, 3, "#5f4aa8", "#2f2470", 1.8) + P(starD(0, -2, 8), "#ffd84d", "#a8761c", 1.2) + N("M-10,-18 V16", "#ffd84d", 1.6),
    livreA: R(-14, -18, 28, 34, 3, "#2f8a7a", "#124a40", 1.8) + R(-10, -15, 20, 28, 2, "#3fa894") + N("M0,-12 V2 M-5,-9 H5 M-5,-5 H5 M0,2 L-4,9 M0,2 L4,9", "#fffaf0", 1.6) + C(0, -14, 2.6, "#fffaf0"),
    pile: ["#e5485a", "#5fa8f0", "#ffd15c", "#7fc98a"].map((c, i) => R(-16 + (i % 2) * 3, -9 - i * 8, 30, 8, 2, c, dk(c, .4), 1.2)).join(""),
    feuilleP: P("M-18,-2 C-16,-24 14,-28 20,-10 C10,-2 -6,2 -18,-2Z", "#7fc46c", "#3f7a3c", 1.6) + N("M-16,-3 Q2,-10 18,-11", "#3f7a3c", 1.2),
    nounoursP: PR.nounours(0, 14, .8) + R(-6, -6, 12, 4, 1.5, "#fff", "#c9b9b9", 1) + N("M-2,-6 v4 M2,-6 v4", "#e5485a", 1),
    toile: N("M-18,0 L-6,-60 M18,0 L6,-60 M0,-50 V0", "#9a6b45", 3.4) + R(-22, -58, 44, 34, 2, "#fff", "#9a6b45", 3) + E(-8, -46, 6, 6, "#ffd84d") + P("M-19,-28 Q-6,-44 6,-32 Q12,-40 19,-30 V-27 H-19Z", "#7fc46c") + P(heartD(10, -46, 5), "#ff6f8f"),
    skis: N("M-30,0 H30 Q34,0 34,-5 M-28,6 H32 Q36,6 36,1", "#5fa8f0", 3.4) + N("M-12,-34 L-16,4 M12,-34 L16,4", "#8a94a8", 2)
  };
  const GROUND = new Set("velo trottin skate nenuphar batterie chateau luge skis bonhomme boule coffre cadeau planche chevalet toile squel pile coupe champi miel os carotte pomme banane pelote ballonF crayons seau".split(" "));
  const ob = k => { const v = OBX[k] !== undefined ? OBX[k] : OB[k]; return typeof v === "function" ? v("#e8964c") : v || ""; };

  // ======================== EFFETS (devant f, derrière b) ========================
  let LC = {}; // dernier gabarit du corps (épaules, hanches, mains) vu par fx
  const sol0 = (d, k = 1) => (st, c) => st === 0 ? W(166, 189, .95 * k, d) : st === 1 ? W(26, 190, .85 * k, d) : sol(d, k * 1.4)(st, c);
  const PLACE = { S: sol0, G: (d, k) => gau(d, k), M: (d, k, dy) => main(d, k, dy), L: (d, k, dy) => mainG(d, k, dy), V: (d, k, dy) => ventre(d, k, dy) };
  const PETP = [[34, .27], [24, .24], [36, .36], [38, .34], [48, .31], [54, .28]];
  const petArt = (p, st) => { const [x, k] = PETP[st], z = { kind: p.kind, id: "nx-compagnon-" + p.kind, name: p.label || "compagnon", hex: p.hex, dark: p.dark, belly: p.belly, o: { ...(p.o || {}) } };
    let art = ""; try { art = (A.kinds[p.kind] || A.kinds.cat)(z, st < 4, {}); } catch (e) { art = ""; }
    return G(`translate(${x} 190) scale(${k}) translate(-100 -190)`, E(100, 190, 52, 6, "#3a1f4a", "", 0, 'opacity=".13"') + art); };
  const cloud = (x, y, k) => G(`translate(${x} ${y}) scale(${k})`, `<g class="float">${V("M-34,8 a12,12 0 0 1 4,-20 a16,16 0 0 1 28,-10 a14,14 0 0 1 24,4 a12,12 0 0 1 10,22Z", "#cfdcef", "#7f93b5", 2)}${two0(C(-8, -2, 1.6, "#4a5a78"))}${N("M-5,3 Q0,6 5,3", "#4a5a78", 1.4)}</g>`) + `<g class="twk">${[[-30, 22], [-14, 32], [6, 24], [24, 34], [-22, 44], [16, 46]].map(([px, py]) => drop(x + px * k, y + py * k, "#7fb8ec")).join("")}</g>`;
  const headAt = (st, c) => st === 0 ? [100, 72, 1.06] : st === 1 ? [78, 92, 1] : [100, c.hy, c.hs];
  function umbrella(c, col, gre) { const [hx, hy] = c.hR, s = c.hs, cx = hx - 6 * s, r = 50 * s, cy = hy - 26 * s, L = dk(col, .42);
    const can = `M${cx - r},${cy} Q${cx - r * .95},${cy - r * .9} ${cx},${cy - r * .92} Q${cx + r * .95},${cy - r * .9} ${cx + r},${cy} Q${cx + r * .75},${cy - r * .18} ${cx + r * .5},${cy} Q${cx + r * .25},${cy - r * .18} ${cx},${cy} Q${cx - r * .25},${cy - r * .18} ${cx - r * .5},${cy} Q${cx - r * .75},${cy - r * .18} ${cx - r},${cy}Z`;
    return N(`M${hx},${hy + 8 * s} L${cx},${cy - r * .92}`, "#5a566b", 3 * s + 1.2) + N(`M${hx},${hy + 8 * s} q0,${7 * s} ${-6 * s},${7 * s}`, "#5a566b", 3 * s + 1.2) + P(can, col, L, 2) + fm(can, gre ? "nxnen" : "") + `<path d="${can}" fill="url(#aSh)"/>` + N(`M${cx},${cy - r * .92} Q${cx - r * .4},${cy - r * .5} ${cx - r * .5},${cy} M${cx},${cy - r * .92} Q${cx + r * .4},${cy - r * .5} ${cx + r * .5},${cy} M${cx},${cy - r * .92} V${cy}`, L, 1.4, 'opacity=".55"') + (gre ? [-1, 1].map(q => VE(cx + q * r * .32, cy - r * .86, 7 * s + 2, 6 * s + 2, col, L, 1.6) + E(cx + q * r * .32, cy - r * .88, 4 * s + 1, 4 * s + 1, "#fff") + E(cx + q * r * .32, cy - r * .87, 2 * s + .6, 2.4 * s + .6, "#2a2030")).join("") : "") + C(cx, cy - r * .92 - 3, 2.4, L); }
  function capeBack(c, col, mo) { const { w, sy, fy, mid } = c, X = v => 100 + v, d = `M${X(-w * .7)},${sy - 2} C${X(-w * 2)},${mid} ${X(-w * 2.2)},${fy - 16} ${X(-w * 1.7)},${fy - 6} Q100,${fy + 2} ${X(w * 1.7)},${fy - 6} C${X(w * 2.2)},${fy - 16} ${X(w * 2)},${mid} ${X(w * .7)},${sy - 2}Z`; return vol(d, col, mo, 2); }
  function wings(c, col) { const { w, sy } = c, d = `M${100 - w * .4},${sy + 10} C${100 - w * 2.6},${sy - 30} ${100 - w * 3.2},${sy + 6} ${100 - w * 2.2},${sy + 22} C${100 - w * 3},${sy + 40} ${100 - w * 1.4},${sy + 52} ${100 - w * .4},${sy + 18}Z`; return two(P(d, lt(col, .45), col, 1.8, 'fill-opacity=".85"') + N(`M${100 - w * .5},${sy + 14} Q${100 - w * 1.8},${sy - 4} ${100 - w * 2.4},${sy + 8}`, col, 1.2, 'opacity=".6"')); }
  const confettis = st => [[30, 40], [170, 30], [24, 110], [178, 96], [60, 20], [140, 14]].map(([x, y], i) => `<g class="twk"><rect x="${x}" y="${y}" width="${6 * KU[st]}" height="${3 * KU[st]}" rx="1" fill="${["#ff6f8f", "#5fa8f0", "#ffd15c", "#7fc98a", "#8f7bea", "#f5a04c"][i]}" transform="rotate(${i * 37} ${x} ${y})"/></g>`).join("");
  const neige = st => `<g class="twk">${[[22, 30], [176, 22], [16, 100], [184, 90], [44, 150], [160, 140]].map(([x, y]) => G(`translate(${x} ${y}) scale(${KU[st]})`, N("M-5,0 H5 M0,-5 V5 M-3.5,-3.5 L3.5,3.5 M3.5,-3.5 L-3.5,3.5", "#8fc7f0", 1.8))).join("")}</g>`;
  const FXR = {}, COATX = {}; // extensions (enfants-histoires.js)
  function runFx(list, a, st, c) { let b = "", f = "";
    for (const t of list || []) { const [k, x, y, z, q] = t.split(":");
      if (FXR[k]) { const r = FXR[k](st, c, x, y, z, a) || {}; b += r.b || ""; f += r.f || ""; continue; }
      if (k === "pet") { if (a.compagnon && st > 1) f += petArt(a.compagnon, st); }
      else if (k === "o") { const pl = GROUND.has(x) ? PLACE.S : PLACE[y] || PLACE.S; f += pl(ob(x), +(z || 1), +(q || 0))(st, c); }
      else if (k === "nuage") { const [hx, hy, hs] = headAt(st, c); f += st < 2 ? cloud(hx + 58, 14, .8) : cloud(hx + 62 * hs, Math.max(12, hy - 60 * hs), hs); }
      else if (k === "gouttes") f += `<g class="twk">${[[24, 40], [176, 34], [18, 100], [182, 92], [34, 150], [168, 140]].map(([px, py]) => drop(px, py, "#7fb8ec")).join("")}</g>`;
      else if (k === "flaque") b += E(st < 2 ? 120 : 100, 191, st < 2 ? 70 : 44 + 10 * KU[st], 6, "#9fd0f5", "#5f9fd0", 1.6, 'opacity=".8"');
      else if (k === "neige") f += neige(st);
      else if (k === "etoiles") f += K.ets(st, c); else if (k === "coeurs") f += K.coeurs(st, c); else if (k === "notes") f += K.nx(st, c);
      else if (k === "confettis") f += confettis(st);
      else if (k === "jongle" && st > 1) f += [0, 1, 2].map(i => `<g class="float">${C(100 + (i - 1) * 26 * c.hs, c.hy - (60 + (i % 2) * 14) * c.hs, 6 * c.hs + 1.5, ["#e5485a", "#5fa8f0", "#ffd15c"][i])}</g>`).join("");
      else if (k === "taches" && st > 1) f += [c.hL, c.hR].map(([px, py], i) => C(px + 2, py + 3, 3 * KU[st], ["#e5485a", "#5fa8f0"][i], .85)).join("") + C(100 + 10 * c.hs, c.mid, 3.4 * KU[st], "#ffd84d", .85) + C(100 - 12 * c.hs, c.mid + 14 * c.hs, 2.6 * KU[st], "#7fc98a", .85);
      else if (k === "parapluie" && st > 1) b += umbrella(c, x, y === "gre");
      else if (k === "cape" && st > 1) b += capeBack(c, x, y || "");
      else if (k === "ailes" && st > 1) b += wings(c, x); }
    return { b, f }; }

  // ======================== SUR-TENUES (dessinées sur le buste, sous les avant-bras) ========================
  function coat(o, c) { if (COATX[o.t]) return COATX[o.t](o, c); const { w, sy, hip, fy, mid } = c, X = v => 100 + v, col = o.col, L = dk(col, .42), mo = o.mo || "", u = w / 24, side = s => s + MI(s);
    if (o.t === "trench" || o.t === "veste") { const hem = o.t === "veste" ? hip + 6 : hip + (fy - hip) * .55, f = o.t === "veste" ? 1.05 : 1.32, by = hip - (hip - sy) * .26;
      const d = `M${X(-6 * u)},${sy - 3} Q${X(-w * .55)},${sy - 3.5} ${X(-w * .96)},${sy + 5} C${X(-w * 1.1)},${mid} ${X(-w * 1.04)},${hip - 8} ${X(-w * 1.08)},${hip} L${X(-w * f)},${hem} Q100,${hem + 7 * u} ${X(w * f)},${hem} L${X(w * 1.08)},${hip} C${X(w * 1.04)},${hip - 8} ${X(w * 1.1)},${mid} ${X(w * .96)},${sy + 5} Q${X(w * .55)},${sy - 3.5} ${X(6 * u)},${sy - 3} L100,${sy + 9 * u}Z`;
      const lap = `M${X(-6 * u)},${sy - 3} L${X(-w * .52)},${sy + 1} L${X(-w * .26)},${sy + 15 * u} L100,${sy + 11 * u}Z`;
      const btn = [sy + 22 * u, sy + 32 * u, hip - 2].map(y => C(X(-w * .3), y, 1.8 * u + .5, dk(col, .3)) + C(X(w * .3), y, 1.8 * u + .5, dk(col, .3))).join("");
      const belt = o.belt ? N(`M${X(-w * 1.06)},${by} Q100,${by + 6 * u} ${X(w * 1.06)},${by}`, dk(o.belt, .4), 7 * u + 1) + N(`M${X(-w * 1.06)},${by} Q100,${by + 6 * u} ${X(w * 1.06)},${by}`, o.belt, 4.4 * u + .6) + R(X(-5 * u), by + 3 * u - 4.5 * u, 10 * u, 9 * u, 1.5, "none", "#ffd84d", 1.6) + N(`M${X(2 * u)},${by + 4 * u} q${2 * u},${12 * u} ${-2 * u},${20 * u}`, o.belt, 3.6 * u + .5) : "";
      return vol(d, col, mo, 1.9) + side(P(lap, lt(col, .12), L, 1.4)) + N(`M${X(w * .16)},${sy + 12 * u} V${hem + 4 * u}`, L, 1.3) + btn + belt + (o.t === "trench" ? side(N(`M${X(-w * .96)},${sy + 6} L${X(-w * .62)},${sy + 3}`, L, 1.6)) : ""); }
    if (o.t === "gilet") { const d = `M${X(-w * .3)},${sy - 1} Q${X(-w * .7)},${sy - 1} ${X(-w * .96)},${sy + 5} C${X(-w * 1.06)},${mid} ${X(-w)},${hip - 8} ${X(-w * 1.01)},${hip + 2} Q${X(-w * .6)},${hip + 6} ${X(-w * .16)},${hip + 3}Z`; return side(vol(d, col, mo, 1.8) + C(X(-w * .24), mid, 1.8 * u + .6, "#fff")) + side(R(X(-w * .78), mid + 6 * u, 8 * u, 6 * u, 1.5, lt(col, .15), L, 1.1)); }
    if (o.t === "tablier") { const ty = hip + (fy - hip) * .45, d = `M${X(-w * .46)},${sy + 10 * u} H${X(w * .46)} L${X(w * .54)},${mid} L${X(w * .92)},${hip - 4} L${X(w * .96)},${ty} Q100,${ty + 5 * u} ${X(-w * .96)},${ty} L${X(-w * .92)},${hip - 4} L${X(-w * .54)},${mid}Z`; return side(N(`M${X(-w * .44)},${sy + 10 * u} L${X(-7 * u)},${sy - 2}`, L, 2.4 * u + .4)) + vol(d, col, mo, 1.8) + R(X(-8 * u), mid + 6 * u, 16 * u, 10 * u, 2, lt(col, .15), L, 1.2) + side(N(`M${X(-w * .92)},${hip - 4} q${-6 * u},${2 * u} ${-8 * u},${10 * u}`, L, 2 * u + .4)); }
    if (o.t === "capeF") return side(N(`M${X(-w * .7)},${sy - 1} Q${X(-w * .4)},${sy + 6 * u} 100,${sy + 6 * u}`, dk(col, .4), 4 * u + 1) + N(`M${X(-w * .7)},${sy - 1} Q${X(-w * .4)},${sy + 6 * u} 100,${sy + 6 * u}`, col, 2.4 * u + .5)) + G(`translate(100 ${sy + 7 * u}) scale(${.42 * u + .1}) translate(-100 -${sy + 7 * u})`, bow(100, sy + 7 * u, 1, col));
    return ""; }
  const BASE = A.kinds.enfant, MK = DESS.nxm, KL = [1, 1, 1, .95, .8, .68];
  A.kinds.enfant = (a0, b, o = {}) => { const s = BASE(a0, b, o); if (!a0.nx || s.indexOf(MK) < 0) return s; const st = o.stg || 0, q = a0.ages6 && a0.ages6[st];
    const ov = st > 1 && q && q.coat && LC.w ? `<g transform="scale(${1 / KL[st]}) translate(-100 ${-(LC.mid - 2)})">${coat(q.coat, LC)}</g>` : ""; return s.split(MK).join(ov); };

  // ======================== LES THÈMES ========================
  // totems : clé | animal | couleurs du pelage | foncé | motif | oreilles | dessin | compagnon [espèce, options, pelage, foncé, ventre] | objets [3 ans, 6 ans, 9 ans] | histoire
  const TOT = [
    ["leopard", "le léopard", ["e8b56a", "e3e6ec", "f7b5c9"], "6b4320", "nxleo", "chat", "nxleo", ["bigcat", { p: "rosette" }, "f0bd68", "3f2b1a", "fff1d8"], ["ballonG", "jumelles", "velo"], "a pour totem le léopard : {il|elle} grimpe partout et court plus vite que son ombre."],
    ["biche", "la biche", ["c98d5e", "d9b48a", "b5734a"], "74492a", "nxbic", "biche", "nxbic", ["deer", { spots: true }, "d9a066", "80552c", "fffaf0"], ["fleurP", "panier", "champi"], "a pour totem la biche : {doux et discret|douce et discrète}, {il|elle} connaît tous les sentiers de la forêt."],
    ["zebre", "le zèbre", ["fdfcfa", "fde8f0"], "2d2a35", "nxzeb", "cheval", "nxzeb", ["horse", { p: "zebra", mane: "2d2a35" }, "fdfcfa", "2d2a35", "ffffff"], ["ballonG", "skate", "trottin"], "a pour totem le zèbre : {il|elle} adore les rayures, même sur ses chaussettes."],
    ["tigre", "le tigre", ["f3973c", "fdfcfa", "f0aa5c"], "33241e", "nxtig", "chat", "nxtig", ["bigcat", { p: "tabby" }, "f3973c", "33241e", "fff8ee"], ["tambour", "batterie", "coupe"], "a pour totem le tigre : {il|elle} rugit pour rire et ronronne pour les câlins."],
    ["girafe", "la girafe", ["f9d98c", "f3b55c"], "a8652a", "nxgir", "girafe", "nxgir", ["giraffe", {}, "f9d98c", "a8652a", "fff4d8"], ["cerf", "telesc", "longuevue"], "a pour totem la girafe : {il|elle} veut toujours voir plus haut que tout le monde."],
    ["grenouille", "la grenouille", ["7fcf5c", "a3e04f", "5fd0c9"], "357a2c", "nxnen", "grenouille", "nxgre", ["frog", {}, "7fcf5c", "357a2c", "eaf7c0"], ["bocal", "nenuphar", "filet"], "a pour totem la grenouille : {il|elle} saute dans toutes les flaques et chante sous la pluie."],
    ["canard", "le canard", ["fde06b", "fffdf8"], "c09a24", "nxplu", "canard", "nxcan", ["duck", {}, "fde06b", "c09a24", "fff3b0"], ["canard", "bateau", "bateau"], "a pour totem le canard : {il|elle} ne prend jamais son bain sans son bateau."],
    ["panda", "le panda", ["fdfcfa"], "2e2b36", "nxpan", "panda", "nxpan", ["bear", { p: "panda" }, "fffdfa", "2e2b36", "ffffff"], ["bambou", "bambou", "livreO"], "a pour totem le panda : {il|elle} est {le roi|la reine} de la sieste et du goûter."],
    ["renard", "le renard", ["f08a3e", "fafcfe", "4a4c5a"], "9c4a14", "nxfeu", "renard", "nxren", ["fox", {}, "f08a3e", "9c4a14", "fff6ec"], ["loupe", "carte", "loupe"], "a pour totem le renard : {malin|maligne} comme personne, {il|elle} trouve toujours une idée."],
    ["chat", "le chat", ["a9afba", "f6a052", "3f3b4a"], "4a4f5c", "nxpat", "chat", "nxchat", ["cat", { p: "tabby" }, "a9afba", "4a4f5c", "f3f5f8"], ["pelote", "pelote", "livreO"], "a pour totem le chat : {il|elle} fait la sieste au soleil et retombe toujours sur ses pieds."],
    ["lapin", "le lapin", ["fffdfb", "cdd3de", "f3b878"], "b5aebb", "nxcar", "lapin", "nxlap", ["rabbit", { ear: "tilt" }, "fffdfb", "b8b3c4", "fdfdfd"], ["carotte", "arrosoir", "carotte"], "a pour totem le lapin : {il|elle} bondit de joie dès qu'on parle de carottes."],
    ["ours", "l'ours", ["9a6a44", "fdfcf8"], "55351c", "nxcar", "rond", "nxours", ["bear", {}, "9a6a44", "55351c", "c99a70"], ["miel", "miel", "panier"], "a pour totem l'ours : {costaud et câlin|costaude et câline}, {il|elle} protège tous ses amis."],
    ["hibou", "le hibou", ["b5844a", "9aa0a8"], "4a3019", "nxplu", "hibou", "nxhib", ["owl", { horn: true }, "b5844a", "4a3019", "f6dfb8"], ["livre", "lanterne", "livreO"], "a pour totem le hibou : {il|elle} reste {éveillé|éveillée} pour compter les étoiles."],
    ["pingouin", "le manchot", ["343846", "5f85b5"], "14161d", "", "aucun", "nxpin", ["penguin", {}, "343846", "14161d", "ffffff"], ["poisson", "luge", "skis"], "a pour totem le manchot : {il|elle} glisse sur le ventre dès qu'il neige."],
    ["abeille", "l'abeille", ["fbcf4a"], "3a2a1c", "nxabe", "antenne", "nxabe", ["insect", { bee: true }, "fbcf4a", "3a2a1c", "fff3c4"], ["fleurP", "ruche", "miel"], "a pour totem l'abeille : {il|elle} butine les fleurs et partage toujours son miel."],
    ["coccinelle", "la coccinelle", ["ea4a3f", "f7a5c0"], "2b2226", "nxcoc", "antenne", "nxcoc", ["insect", { lady: true }, "ea4a3f", "2b2226", "ffc5b5"], ["fleurP", "loupe", "bouquet"], "a pour totem la coccinelle : {il|elle} porte bonheur à tous ceux qu'{il|elle} croise."],
    ["papillon", "le papillon", ["b18cf2", "f5a5c0", "5fd0c9"], "4a2f8a", "nxpap", "papillon", "nxpap", ["butterfly", {}, "b18cf2", "4a2f8a", "ffd98a"], ["filet", "bouquet", "filet"], "a pour totem le papillon : {il|elle} change de couleur selon son humeur."],
    ["dino", "le dinosaure", ["8fc46a", "7fb0f0", "f9a55c"], "46792f", "ecaille", "dino", "nxdino", ["dino", { rex: true }, "8fc46a", "46792f", "eaf3c4"], ["os", "os", "squel"], "a pour totem le dinosaure : {il|elle} connaît le nom de tous les dinosaures, même les plus longs."],
    ["licorne", "la licorne", ["fff0f6", "dccbf3"], "b59fd0", "nxarc", "licorne", "nxlic", ["horse", { horn: true, mane: "rainbow" }, "fffaff", "b59fd0", "ffffff"], ["baguette", "etoileB", "baguette"], "a pour totem la licorne : {il|elle} croit à la magie et en sème partout."],
    ["dragon", "le dragon", ["6fc97a", "e85a4a", "5f9ff0"], "28783f", "ecaille", "dragon", "dragon2", ["dragon", {}, "6fc97a", "28783f", "eef9c9"], ["epeeB", "bouclier", "carte"], "a pour totem le dragon : {il|elle} crache des blagues au lieu du feu."],
    ["requin", "le requin", ["8fa0b8", "5fa8f0"], "48586f", "vague", "aileron", "requin2", ["fish", { shark: true }, "8fa0b8", "48586f", "eef2f7"], ["bateau", "planche", "planche"], "a pour totem le requin : {il|elle} a l'air féroce, mais c'est un cœur tendre."],
    ["baleine", "la baleine", ["6fa8d9", "5f6f8a"], "2f6298", "vague", "baleine", "nxbal", ["sea", { whale: true }, "6fa8d9", "2f6298", "e0eff9"], ["coquille", "bateau", "longuevue"], "a pour totem la baleine : {il|elle} chante des chansons qu'on entend jusqu'au bout de la mer."],
    ["lion", "le lion", ["e8b565", "fbf6ea"], "9c5a24", "", "lion", "nxlion", ["bigcat", { mane: "9c5a24" }, "e8b565", "a5692a", "fff1d8"], ["tambour", "micro", "coupe"], "a pour totem le lion : {plein|pleine} de courage, {il|elle} rugit pour défendre les plus petits."],
    ["elephant", "l'éléphant", ["a9b2c2", "f6c3d1"], "5c667a", "", "elephant", "nxele", ["elephant", { small: true }, "a9b2c2", "5c667a", "cdd4de"], ["arrosoir", "tambour", "livreO"], "a pour totem l'éléphant : {il|elle} n'oublie jamais un anniversaire."],
    ["vache", "la vache", ["fffdfa"], "302d38", "nxvac", "vache", "nxvac", ["cow", { p: "cow" }, "fffdfa", "302d38", "ffc9cf"], ["bouquet", "panier", "fleurP"], "a pour totem la vache : {il|elle} adore les prairies et le lait chaud du soir."],
    ["mouton", "le mouton", ["fffaf2", "dcecfb"], "5a4a42", "nxmou", "mouton", "nxmou", ["sheep", {}, "fffaf2", "c0b09c", "f6d9c4"], ["pelote", "livreO", "pelote"], "a pour totem le mouton : {il|elle} s'endort en comptant… les enfants."],
    ["singe", "le singe", ["b59a7a", "f0b45c"], "5f4a35", "nxfeu", "singe", "nxsin", ["monkey", {}, "b59a7a", "5f4a35", "f7ead6"], ["banane", "banane", "ballonF"], "a pour totem le singe : {il|elle} fait des grimaces et des galipettes toute la journée."],
    ["koala", "le koala", ["a6afbb"], "5a6473", "nxfeu", "koala", "nxkoa", ["koala", {}, "a6afbb", "5a6473", "f3f5f7"], ["feuilleP", "livreO", "feuilleP"], "a pour totem le koala : {il|elle} fait des câlins à tous les arbres."],
    ["loup", "le loup", ["8e95a3", "fafbfd"], "474d5b", "nxlune", "loup", "nxloup", ["wolf", {}, "8e95a3", "474d5b", "f1f3f6"], ["lanterne", "lanterne", "ukulele"], "a pour totem le loup : {il|elle} hurle à la lune pour l'inviter à jouer."],
    ["ecureuil", "l'écureuil", ["d08b47", "c25b2c"], "7d4818", "nxfeu", "ecureuil", "nxecu", ["squirrel", {}, "d08b47", "7d4818", "fff1dd"], ["pomme", "panier", "champi"], "a pour totem l'écureuil : {il|elle} cache des noisettes dans toutes ses poches."],
    ["herisson", "le hérisson", ["e0b98f"], "54382a", "nxher", "herisson", "nxher", ["hedgehog", {}, "e0b98f", "54382a", "f9e6cf"], ["pomme", "loupe", "champi"], "a pour totem le hérisson : {il|elle} se roule en boule quand {il|elle} est {timide|timide}, puis {il|elle} rit."],
    ["flamant", "le flamant rose", ["f98fae", "f7755f"], "c0527a", "nxplu", "flamant", "nxfla", ["wader", { flam: true }, "f98fae", "c0527a", "fcc0d0"], ["coquille", "ballonG", "micro"], "a pour totem le flamant rose : {il|elle} tient sur un pied pendant des heures."]
  ];

  // passions : 6 âges (0 bébé assis … 5 grand), p = [couleur 1, 2, 3], f = fille
  const PAS = [
    ["pluie", "adore la pluie : {il|elle} saute dans les flaques et chante avec les gouttes.", [["frog", {}, "7fcf5c", "357a2c", "eaf7c0", "sa grenouille"], ["duck", {}, "fde06b", "c09a24", "fff3b0", "son caneton"]], (p, f) => [
      { out: "pj", c1: "#d5e8fa", c2: p[0], mo: "nxgou", pose0: "applaudit", fx: ["nuage"] },
      { out: "pluie", c1: p[0], c2: "#ffd84d", fx: ["flaque"] },
      { out: "pluie", c1: "#ffd84d", c2: p[1], cr: "nxbobgre", pose: "bras", fx: ["pet", "gouttes"] },
      { out: f ? "robe" : "short", c1: p[0], c2: "#ffd84d", c3: f ? "" : "#37405f", mo: "nxgou", cr: "nxbobgre", pose: "leve", fx: ["parapluie:" + p[1], "pet", "flaque"] },
      { out: "pluie", c1: p[1], c2: "#ffd84d", mo: "nxgou", pose: "coucou", fx: ["parapluie:#7fcf5c:gre", "pet", "flaque"] },
      { out: "patte", c1: "#ffd84d", c2: "#ffd84d", c3: "#37405f", dessin: "nxm", coat: { t: "trench", col: "#ffd84d", belt: p[0] }, cr: "nxsour", pose: "hanche", fx: ["pet", "gouttes"] }]],
    ["plage", "vit les pieds dans le sable : {il|elle} construit des châteaux plus grands que les vagues.", [["sea", { crab: true }, "ec5a4a", "9c2420", "f99a88", "son crabe"], ["turtle", { sea: true }, "5fbfc9", "1f6b7a", "bfe6d0", "sa tortue de mer"]], (p, f) => [
      { out: "short", c1: p[0], c2: "#fff", mo: "vague", cr: "nxsoleil", pose0: "pieds", fx: ["o:seau:S"] },
      { out: "short", c1: p[1], c2: "#fff", mo: "raye", fx: ["o:coquille:S"] },
      { out: "short", c1: "#fff", c2: p[0], mo: "raye", dessin: "nxcrabe", cr: "nxsoleil", pose: "bras", fx: ["pet", "o:seau:S"] },
      { out: f ? "robe" : "short", c1: p[1], c2: p[0], mo: "nxcoq", pose: "leve", fx: ["pet", "o:pelle:M", "o:chateau:S"] },
      { out: "marin", c1: p[0], c2: p[1], pose: "coucou", fx: ["pet", "o:bateau:S"] },
      { out: "combi", c1: "#2f4f8f", c2: p[0], shoe: "#2f4f8f", pose: "hanche", fx: ["pet", "o:planche:S"] }]],
    ["espace", "rêve d'aller dans l'espace : {il|elle} connaît le nom de toutes les planètes.", [["axolotl", { tick: true }, "5c4fb0", "b55fd0", "a593e8", "son axolotl des étoiles"], ["dragon", { spirit: true }, "a5d5f9", "4a86c0", "eef8ff", "son petit esprit cosmique"]], (p, f) => [
      { out: "pj", c1: "#2f3566", c2: p[0], mo: "etoile", pose0: "leve", fx: ["o:fuseeJ:M"] },
      { out: "pj", c1: "#2f3566", c2: p[0], mo: "nxpla", fx: ["o:etoileB:S"] },
      { out: "tee", c1: "#2f3566", c2: p[0], dessin: "alien", pose: "bras", fx: ["pet", "etoiles"] },
      { out: "combi", c1: "#eef2f8", c2: p[0], cr: "nxbulle", pose: "leve", fx: ["pet", "o:fuseeJ:M"] },
      { out: "combi", c1: "#eef2f8", c2: p[1], pose: "coucou", fx: ["pet", "o:telesc:S", "etoiles"] },
      { out: "tee", c1: "#2f3566", c2: p[0], c3: "#1d2040", mo: "nxpla", dessin: "nxm", coat: { t: "capeF", col: p[0] }, pose: "victoire", fx: ["cape:#2f3566:nxpla", "pet", "etoiles"] }]],
    ["cuisine", "veut devenir {grand chef|grande cheffe} : {il|elle} goûte tout, même les épinards.", [["mouse", { t: "cheese" }, "f3dca2", "b5904a", "fffaea", "sa souris gourmande"], ["hamster", { t: "doc" }, "e3c29c", "95683b", "fff7ec", "son hamster gourmand"]], (p, f) => [
      { out: "pj", c1: "#fff3d9", c2: p[0], mo: "nxfra", pose0: "biberon" },
      { out: "salopette", c1: p[0], c2: p[1], fx: ["o:cuillere:S"] },
      { out: "tee", c1: "#fff", c2: p[0], dessin: "nxcupcake", pose: "tient", fx: ["pet", "o:bol:V"] },
      { out: "tee", c1: p[1], c2: p[0], mo: "vichy", dessin: "nxm", coat: { t: "tablier", col: "#fff" }, cr: "toque", pose: "leve", fx: ["pet", "o:fouet:M"] },
      { out: "tee", c1: p[0], c2: p[1], dessin: "nxm", coat: { t: "tablier", col: p[1], mo: "vichy" }, cr: "toque", pose: "tient", fx: ["pet", "o:gateau:V"] },
      { out: "patte", c1: "#fffdf8", c2: "#2f2b3a", c3: "#2f2b3a", mo3: "nxcar", dessin: "nxm", coat: { t: "tablier", col: "#2f2b3a" }, cr: "toque", pose: "hanche", fx: ["pet", "o:gateau:S"] }]],
    ["jardin", "fait pousser des fleurs partout, même dans les bottes de papa.", [["insect", { snail: true }, "f99c4a", "4a2a10", "ffe5c5", "son escargot"], ["hedgehog", { flower: true }, "fde6d6", "b5789c", "fff7f0", "son hérisson fleuri"]], (p, f) => [
      { out: "salopette", c1: "#8fd08a", c2: p[0], pose0: "tete", fx: ["o:fleurP:S"] },
      { out: "salopette", c1: "#8fd08a", c2: p[0], fx: ["o:pomme:S"] },
      { out: "salopette", c1: p[0], c2: "#fff3d9", mo: "nxfeu", cr: "nxsoleil", pose: "bras", fx: ["pet", "o:carotte:S"] },
      { out: f ? "chasuble" : "salopette", c1: "#6fae6a", c2: p[0], mo: "fleur", pose: "leve", fx: ["pet", "o:arrosoir:M"] },
      { out: "tee", c1: "#fff3d9", c2: p[0], c3: "#6b8f4a", dessin: "nxm", coat: { t: "tablier", col: "#6fae6a", mo: "nxfeu" }, cr: "nxsoleil", pose: "tient", fx: ["pet", "o:panier:V"] },
      { out: "patte", c1: p[0], c2: "#6b4a2a", c3: "#6b8f4a", mo: "fleur", dessin: "nxm", coat: { t: "gilet", col: "#6fae6a" }, pose: "coucou", fx: ["pet", "o:bouquet:L"] }]],
    ["musique", "a toujours une chanson dans la tête et un rythme dans les pieds.", [["songbird", {}, "fde36b", "c09a1c", "fff5b0", "son canari chanteur"], ["parrot", { p: "budgie" }, "6fb8f0", "2f70a8", "a9d8f9", "sa perruche qui siffle"]], (p, f) => [
      { out: "pj", c1: p[0], c2: p[1], mo: "nxnot", pose0: "hochet" },
      { out: "pj", c1: p[0], c2: p[1], mo: "nxnot", fx: ["o:tambourin:S"] },
      { out: "tee", c1: "#fff", c2: p[0], dessin: "note", pose: "tient", fx: ["pet", "o:tambour:V", "notes"] },
      { out: f ? "robe" : "short", c1: p[1], c2: p[0], c3: f ? "" : "#37405f", mo: "nxnot", pose: "leve", fx: ["pet", "o:maracas:M", "notes"] },
      { out: "tee", c1: p[0], c2: p[1], mo: "raye", pose: "tient", fx: ["pet", "o:ukulele:V", "notes"] },
      { out: "patte", c1: "#2f2b3a", c2: p[0], c3: "#2f2b3a", mo: "nxnot", dessin: "nxm", coat: { t: "veste", col: p[0] }, pose: "coucou", fx: ["pet", "o:micro:M", "notes"] }]],
    ["cirque", "rêve de cirque : {il|elle} jongle avec tout ce qui roule.", [["dog", { ear: "flop", curly: true }, "fffdfa", "b8b0bd", "ffffff", "son caniche acrobate"], ["monkey", { tuft: true }, "f0b45c", "a56a1b", "fff0d5", "son petit singe farceur"]], (p, f) => [
      { out: "pj", c1: "#ff6f8f", c2: "#ffd84d", mo: "pois", pose0: "joues", fx: ["o:balle:S"] },
      { out: "pj", c1: "#5fa8f0", c2: "#ffd84d", mo: "etoile", fx: ["o:ballons:S", "confettis"] },
      { out: "salopette", c1: "#e5485a", c2: "#ffd84d", mo: "raye", pose: "leve", fx: ["pet", "o:ballons:M"] },
      { out: f ? "tutu" : "short", c1: p[0], c2: p[1], c3: f ? "" : "#e5485a", mo: "etoile", pose: "victoire", fx: ["pet", "jongle"] },
      { out: "tee", c1: "#e5485a", c2: "#ffd84d", mo: "raye", dessin: "nxm", coat: { t: "gilet", col: "#ffd84d" }, pose: "victoire", fx: ["pet", "jongle"] },
      { out: "patte", c1: "#fff", c2: "#2f2b3a", c3: "#2f2b3a", dessin: "nxm", coat: { t: "veste", col: "#e5485a", belt: "" }, cr: "nxhdf", pose: "coucou", fx: ["pet", "o:baguette:M", "confettis"] }]],
    ["pirate", "cherche des trésors sous chaque coussin et parle comme un vieux loup de mer.", [["parrot", { p: "ara" }, "ea4a3f", "981c22", "ffd23f", "son perroquet bavard"], ["parrot", { p: "rainbow" }, "3fc06a", "1a7a3f", "ffd84d", "son perroquet arc-en-ciel"]], (p, f) => [
      { out: "pj", c1: "#fff", c2: p[0], mo: "raye", pose0: "assis", fx: ["o:bateau:S"] },
      { out: "pj", c1: "#2f2b3a", c2: p[0], mo: "raye", fx: ["o:coffre:S"] },
      { out: "tee", c1: "#fff", c2: "#e5485a", mo: "raye", cr: "nxbandana", pose: "bras", fx: ["pet", "o:carte:S"] },
      { out: "short", c1: "#fff", c2: p[0], c3: "#37405f", mo: "raye", cr: "nxbandana", pose: "leve", fx: ["pet", "o:epeeB:M"] },
      { out: "tee", c1: "#fff", c2: p[0], c3: "#37405f", mo: "raye", dessin: "nxm", coat: { t: "gilet", col: "#e5485a" }, cr: "nxtricorne", pose: "coucou", fx: ["pet", "o:longuevue:L"] },
      { out: "patte", c1: "#fffaf0", c2: "#ffd15c", c3: "#2f2b3a", dessin: "nxm", coat: { t: "trench", col: "#7a2f3a", belt: "#ffd15c" }, cr: "nxtricorne", pose: "hanche", fx: ["pet", "o:coffre:S"] }]],
    ["chevalier", "protège les plus petits comme {un vrai chevalier|une vraie chevalière}.", [["horse", { small: true, mane: "fff7ea" }, "efc478", "a5752c", "fff3da", "son poney"], ["horse", { small: true, mane: "2e2320", p: "star" }, "a5653a", "54301a", "e8c6a0", "son poney bai"]], (p, f) => [
      { out: "pj", c1: p[0], c2: p[1], mo: "nxcar", pose0: "nounours" },
      { out: "pj", c1: p[1], c2: p[0], mo: "etoile", fx: ["o:bouclier:S"] },
      { out: "tee", c1: "#c9d3e2", c2: p[0], dessin: "nxepee", pose: "bras", fx: ["pet"] },
      { out: "tee", c1: "#c9d3e2", c2: p[0], cr: "nxheaume", pose: "leve", fx: ["pet", "o:epeeB:M", "o:bouclier:G"] },
      { out: "patte", c1: "#c9d3e2", c2: p[0], c3: "#5a4a3a", dessin: "nxm", coat: { t: "capeF", col: p[0] }, pose: "coucou", fx: ["cape:" + p[0], "pet", "o:bouclier:L"] },
      { out: "patte", c1: "#b5bfd0", c2: p[1], c3: "#4a4558", dessin: "nxm", coat: { t: "capeF", col: p[1] }, cr: "nxheaume", pose: "hanche", fx: ["cape:" + p[1], "pet", "o:epeeB:S"] }]],
    ["magie", "croit dur comme fer aux sortilèges, surtout ceux qui font rire.", [["cat", {}, "3f3b4a", "17141f", "5a5566", "son chat noir"], ["owl", { horn: true }, "4a4f8f", "20244f", "b9bdf0", "sa chouette de minuit"]], (p, f) => [
      { out: "pj", c1: "#5f4aa8", c2: p[0], mo: "etoile", pose0: "leve", fx: ["o:baguette:M", "etoiles"] },
      { out: "pj", c1: "#5f4aa8", c2: p[0], mo: "nxlune", fx: ["o:etoileB:S"] },
      { out: "tee", c1: "#5f4aa8", c2: p[0], mo: "etoile", cr: "nxsorcier", pose: "leve", fx: ["pet", "o:baguette:M", "etoiles"] },
      { out: f ? "robe" : "kimono", c1: "#5f4aa8", c2: p[0], mo: "etoile", cr: "nxsorcier", pose: "coucou", fx: ["pet", "o:baguette:M", "etoiles"] },
      { out: "tee", c1: "#2f2b4a", c2: p[0], dessin: "nxm", coat: { t: "capeF", col: p[0] }, pose: "tient", fx: ["cape:#5f4aa8:nxlune", "pet", "o:livreM:V"] },
      { out: "patte", c1: "#5f4aa8", c2: p[0], c3: "#2f2b4a", mo: "etoile", dessin: "nxm", coat: { t: "trench", col: "#5f4aa8", mo: "etoile", belt: p[0] }, cr: "nxsorcier", pose: "leve", fx: ["pet", "o:baguette:M", "etoiles"] }]],
    ["sport", "ne tient pas en place : {il|elle} veut gagner, mais surtout bien jouer.", [["dog", { ear: "flop", fluff: true }, "f4c26b", "b57a24", "fff2d8", "son chiot golden"], ["dog", { ear: "point", p: "husky" }, "7f8b9e", "3a4354", "ffffff", "son chiot husky"]], (p, f) => [
      { out: "short", c1: p[0], c2: "#fff", mo: "raye", pose0: "balle" },
      { out: "short", c1: p[0], c2: "#fff", mo: "raye", fx: ["o:ballonF:S"] },
      { out: "short", c1: p[0], c2: "#fff", dessin: "nxnum", pose: "bras", fx: ["pet", "o:ballonF:S"] },
      { out: "short", c1: p[1], c2: "#fff", mo: "raye", cr: "sport", pose: "victoire", fx: ["pet", "o:ballonF:S"] },
      { out: "hoodie", c1: p[0], c2: "#2f2b3a", cr: "nxcasq", pose: "coucou", fx: ["pet", "o:basket:L"] },
      { out: "short", c1: p[0], c2: p[1], c3: "#fff", dessin: "nxnum", pose: "hanche", fx: ["pet", "o:coupe:S"] }]],
    ["danse", "danse partout : dans la cuisine, dans le bain, et même en dormant.", [["cat", { p: "point", eye: "3f8fd8" }, "f7e8cf", "51392f", "fff7e8", "sa chatte siamoise"], ["rabbit", { ear: "lop" }, "fbcfd6", "cf7f92", "fff1f2", "son lapin bélier"]], (p, f) => [
      { out: "tutu", c1: "#ffd9ec", c2: p[0], pose0: "tete" },
      { out: "tutu", c1: "#ffd9ec", c2: p[0], fx: ["coeurs"] },
      { out: f ? "tutu" : "short", c1: f ? "#ffd9ec" : p[0], c2: p[0], c3: f ? "" : p[1], mo: f ? "" : "pois", pose: "victoire", fx: ["pet", "coeurs"] },
      { out: f ? "robe" : "tee", c1: p[0], c2: p[1], mo: "pois", pose: "ouvert", fx: ["pet", "o:ballonG:M"] },
      { out: f ? "tutu" : "hoodie", c1: p[1], c2: p[0], cr: f ? "" : "nxcasq", pose: "victoire", fx: ["pet", "notes"] },
      { out: f ? "princesse" : "patte", c1: p[0], c2: p[1], c3: f ? "" : "#2f2b3a", dessin: f ? "" : "nxm", coat: f ? null : { t: "veste", col: p[0] }, pose: "coucou", fx: ["pet", "notes", "coeurs"] }]],
    ["peinture", "peint tout ce qu'{il|elle} voit, et un peu ce qu'{il|elle} rêve.", [["cat", { p: "calico" }, "fffaf2", "3b3440", "ffffff", "sa chatte tricolore"], ["cat", { p: "tabby" }, "f6a052", "bd5a18", "fff1df", "son chat roux"]], (p, f) => [
      { out: "salopette", c1: "#fff3d9", c2: p[0], pose0: "applaudit", fx: ["o:crayons:S"] },
      { out: "salopette", c1: "#fff3d9", c2: p[0], fx: ["o:pinceau:S"] },
      { out: "salopette", c1: "#8fc4f5", c2: "#fff", mo: "raye", pose: "bras", fx: ["pet", "taches"] },
      { out: "salopette", c1: p[0], c2: p[1], cr: "nxberet", pose: "leve", fx: ["pet", "o:pinceau:M", "taches"] },
      { out: "tee", c1: "#fff", c2: p[0], dessin: "nxm", coat: { t: "tablier", col: "#c9b18a" }, cr: "nxberet", pose: "coucou", fx: ["pet", "o:palette:L", "o:chevalet:S"] },
      { out: "patte", c1: "#2f2b3a", c2: p[0], c3: "#4f6fa8", dessin: "nxm", coat: { t: "veste", col: p[0], mo: "pois" }, cr: "nxberet", pose: "tient", fx: ["pet", "o:toile:S"] }]],
    ["anatomie", "connaît déjà le nom de plein d'os et veut soigner tout le monde.", [["dog", { ear: "long", p: "blaze", saddle: true }, "c9803f", "3b2e2a", "fffaf4", "son beagle patient"], ["rabbit", {}, "fffdfb", "b5aebb", "ffffff", "son lapin cobaye (consentant)"]], (p, f) => [
      { out: "pj", c1: "#cfe6fa", c2: p[0], mo: "nxos", pose0: "nounours" },
      { out: "pj", c1: "#cfe6fa", c2: p[0], mo: "nxos", fx: ["o:os:S"] },
      { out: "tee", c1: "#fff", c2: p[0], dessin: "squel", pose: "tient", fx: ["pet", "o:nounoursP:V"] },
      { out: "doc", c1: p[0], c2: p[1], pose: "leve", fx: ["pet", "o:stetho:M"] },
      { out: "doc", c1: "#8fd0c9", c2: "#2f5f8f", kine: true, pose: "tient", fx: ["pet", "o:livreA:V"] },
      { out: "doc", c1: "#5fb5c9", c2: "#2f2b3a", kine: true, pose: "coucou", fx: ["pet", "o:squel:S"] }]],
    ["neige", "attend la neige toute l'année et fait des bonshommes avec des carottes en nez.", [["penguin", {}, "343846", "14161d", "ffffff", "son petit manchot"], ["fox", { fluff: true }, "fafcfe", "9db0c4", "ffffff", "son renard polaire"]], (p, f) => [
      { out: "pj", c1: p[0], c2: p[1], mo: "nxflo", cr: "nxbonnet", pose0: "applaudit", fx: ["neige"] },
      { out: "pj", c1: p[0], c2: p[1], mo: "nxflo", cr: "nxbonnet", fx: ["neige"] },
      { out: "combi", c1: p[0], c2: p[1], cr: "nxbonnet", pose: "bras", fx: ["pet", "o:boule:S", "neige"] },
      { out: "combi", c1: p[1], c2: p[0], cr: "nxbonnet", pose: "ouvert", fx: ["pet", "o:bonhomme:S", "neige"] },
      { out: "combi", c1: p[0], c2: "#fffaf0", cr: "parka", pose: "coucou", fx: ["pet", "o:luge:S", "neige"] },
      { out: "patte", c1: p[0], c2: p[1], c3: "#37405f", dessin: "nxm", coat: { t: "trench", col: p[0], belt: p[1] }, cr: "nxbonnet", pose: "hanche", fx: ["pet", "o:skis:S", "neige"] }]],
    ["fete", "transforme chaque journée en fête, avec des ballons et des confettis.", [["dog", { ear: "point", p: "bi", short: true }, "f0a04c", "a85f18", "fffaf2", "son corgi"], ["pig", {}, "fbc3cd", "c97f8f", "ffdfe4", "son petit cochon rose"]], (p, f) => [
      { out: "pj", c1: p[0], c2: p[1], mo: "nxbon", cr: "fete", pose0: "applaudit", fx: ["o:cadeau:S"] },
      { out: "pj", c1: p[1], c2: p[0], mo: "pois", cr: "fete", fx: ["o:cadeau:S", "confettis"] },
      { out: f ? "robe" : "tee", c1: p[0], c2: p[1], mo: "pois", cr: "fete", pose: "leve", fx: ["pet", "o:ballonG:M", "confettis"] },
      { out: "tee", c1: "#fff", c2: p[0], dessin: "nxgateau", pose: "tient", fx: ["pet", "o:gateau:V"] },
      { out: f ? "tutu" : "short", c1: p[1], c2: p[0], c3: f ? "" : "#37405f", mo: "etoile", cr: "fete", pose: "victoire", fx: ["pet", "confettis"] },
      { out: "patte", c1: "#2f2b3a", c2: p[0], c3: "#2f2b3a", dessin: "nxm", coat: { t: "veste", col: p[0], mo: "etoile" }, pose: "coucou", fx: ["pet", "o:micro:M", "confettis"] }]],
    ["nuit", "adore la nuit, les étoiles filantes et les histoires qui font un peu peur.", [["sheep", {}, "dcecfb", "8fb0d0", "fff8f2", "son mouton nuage"], ["owl", {}, "c9b5ec", "7a62ad", "f8f3ff", "sa chouette lilas"]], (p, f) => [
      { out: "pj", c1: "#4a4f8f", c2: p[0], mo: "nxlune", pose0: "nounours" },
      { out: "pj", c1: "#4a4f8f", c2: p[0], mo: "etoile", fx: ["o:doudou:S"] },
      { out: "pj", c1: "#5f66b5", c2: p[0], mo: "nxlune", cr: "nxbonnetnuit", pose: "tient", fx: ["pet", "o:doudou:V", "etoiles"] },
      { out: "pj", c1: p[0], c2: p[1], mo: "etoile", pose: "leve", fx: ["pet", "o:lanterne:M"] },
      { out: "tee", c1: "#2f3566", c2: p[0], mo: "nxlune", pose: "coucou", fx: ["pet", "o:telesc:S", "etoiles"] },
      { out: "patte", c1: "#2f3566", c2: p[0], c3: "#1d2040", dessin: "nxm", coat: { t: "trench", col: "#4a4f8f", mo: "etoile", belt: "#ffd84d" }, pose: "tient", fx: ["pet", "o:livreM:V", "etoiles"] }]],
    ["inventeur", "démonte tout pour comprendre, et remonte presque tout.", [["raccoon", {}, "9aa0ac", "3b3e49", "f5f5f3", "son raton laveur bricoleur"], ["hamster", { t: "astro" }, "f3b25a", "a5641b", "fff4e0", "son hamster astronaute"]], (p, f) => [
      { out: "salopette", c1: p[0], c2: p[1], pose0: "cubes" },
      { out: "salopette", c1: p[0], c2: p[1], fx: ["o:cle:S"] },
      { out: "salopette", c1: p[1], c2: p[0], mo: "nxdam", pose: "bras", fx: ["pet", "o:robotJ:S"] },
      { out: "combi", c1: "#f5a04c", c2: "#37405f", cr: "lunettes", pose: "leve", fx: ["pet", "o:cle:M"] },
      { out: "combi", c1: "#5f8fc9", c2: p[0], cr: "lunettes", pose: "coucou", fx: ["pet", "o:drone:L", "o:robotJ:S"] },
      { out: "doc", c1: p[0], c2: "#37405f", lun: "#3a3550", pose: "tient", fx: ["pet", "o:robotJ:V"] }]],
    ["lecture", "dévore les livres comme d'autres dévorent les bonbons.", [["sloth", {}, "b5926c", "63492f", "f5e6cf", "son paresseux lecteur"], ["cat", { ear: "fold" }, "a3acb9", "566072", "dfe4ea", "son chat scottish"]], (p, f) => [
      { out: "pj", c1: p[0], c2: p[1], mo: "coeur", pose0: "livre" },
      { out: "pj", c1: p[0], c2: p[1], fx: ["o:livreO:S"] },
      { out: "tee", c1: p[1], c2: p[0], dessin: "nxlivre", pose: "tient", fx: ["pet", "o:livreO:V"] },
      { out: f ? "chasuble" : "salopette", c1: p[0], c2: p[1], mo: "nxcar", pose: "menton", fx: ["pet", "o:pile:S"] },
      { out: "tee", c1: "#fff", c2: p[0], c3: "#37405f", dessin: "nxm", coat: { t: "gilet", col: p[0], mo: "nxcar" }, lun: "#5a3a2a", pose: "tient", fx: ["pet", "o:livreO:V"] },
      { out: "patte", c1: "#fffaf2", c2: p[0], c3: "#4a3a5a", dessin: "nxm", coat: { t: "veste", col: p[0], mo: "nxcar" }, lun: "#5a3a2a", pose: "croise", fx: ["pet", "o:pile:S"] }]],
    ["explorateur", "part en expédition au fond du jardin avec une loupe et beaucoup de courage.", [["lizard", { cham: true }, "7fd05c", "357a2a", "e3f7b5", "son caméléon"], ["meerkat", {}, "e3c193", "7d5a34", "fff4e0", "son suricate guetteur"]], (p, f) => [
      { out: "short", c1: "#c9b58a", c2: p[0], pose0: "pieds", fx: ["o:loupe:S"] },
      { out: "short", c1: "#c9b58a", c2: p[0], fx: ["o:feuilleP:S"] },
      { out: "short", c1: "#c9b58a", c2: p[0], cr: "nxexplo", pose: "bras", fx: ["pet", "o:filet:S"] },
      { out: "short", c1: "#d9c59a", c2: p[0], mo: "nxcam", cr: "nxexplo", pose: "leve", fx: ["pet", "o:loupe:M"] },
      { out: "tee", c1: "#fff3d9", c2: p[0], dessin: "nxm", coat: { t: "gilet", col: "#a8905a" }, cr: "nxexplo", pose: "coucou", fx: ["pet", "o:jumelles:L"] },
      { out: "patte", c1: "#d9c59a", c2: "#6b4a2a", c3: "#7a6a4a", dessin: "nxm", coat: { t: "veste", col: "#a8905a" }, cr: "nxexplo", pose: "tient", fx: ["pet", "o:carte:V"] }]]
  ];

  // trois parcours pour les totems : du costume entier au trench, à la cape ou à la veste
  function totemStages(t, ci, pi, p, f) {
    const [key, , cs, d0, mo, et, ds] = t, C0 = "#" + cs[ci], D = "#" + d0, inn = mix2(C0), H = hood(`nxh-${key}-${ci}`, et, C0, D, mo, inn), B = headband(`nxb-${key}-${ci}`, et, C0, D, inn), Cp = capEars(`nxc-${key}-${ci}`, et, C0, D, inn), [j3, j4, j5] = t[8];
    const hd = { out: "pj", c1: C0, c2: p[0], mo, cr: H }, lp = lt(p[0], .55), tpl = pi % 3;
    const TOY = [["hochet", "balle"], ["nounours", "cubes"], ["canard", "livre"]][(pi + ci) % 3];
    const s0 = { ...hd, fx: ["o:" + TOY[0] + ":S"] }, s1 = { ...hd, fx: ["o:" + TOY[1] + ":S"] };
    if (tpl === 0) return [s0, s1,
      { out: "tee", c1: lp, c2: p[0], c3: dk(p[1], .25), dessin: ds, cr: f ? B : "", pose: "bras", fx: ["pet"] },
      f ? { out: "chasuble", c1: C0, c2: p[0], mo, cr: B, pose: "leve", fx: ["pet", "o:" + j3 + ":M"] } : { out: "patte", c1: lp, c2: p[0], c3: C0, mo3: mo, dessin: ds, pose: "leve", fx: ["pet", "o:" + j3 + ":M"] },
      { out: "hoodie", c1: C0, c2: dk(C0 === "#fdfcfa" || C0 === "#fffdfa" ? D : C0, .3), mo, cr: f ? "" : Cp, pose: "coucou", fx: ["pet", "o:" + j4 + ":L"] },
      { out: "patte", c1: C0, c2: p[0], c3: "#2f2b3a", mo, dessin: "nxm", coat: { t: "trench", col: C0, mo, belt: p[0] }, pose: "hanche", fx: ["pet", "o:" + j5 + ":S"] }];
    if (tpl === 1) return [s0, s1,
      { out: "salopette", c1: C0, c2: p[0], mo: "raye", pose: "ouvert", fx: ["pet"] },
      f ? { out: "robe", c1: C0, c2: p[0], mo, pose: "leve", fx: ["pet", "o:" + j3 + ":M"] } : { out: "short", c1: lp, c2: p[0], c3: C0, dessin: ds, pose: "leve", fx: ["pet", "o:" + j3 + ":M"] },
      { out: "tee", c1: C0, c2: p[0], c3: "#37405f", mo, dessin: "nxm", coat: { t: "gilet", col: p[1] }, cr: f ? B : Cp, pose: "tient", fx: ["pet", "o:" + j4 + ":V"] },
      { out: "tee", c1: "#2f2b3a", c2: p[0], c3: "#2f2b3a", dessin: "nxm", coat: { t: "capeF", col: p[0] }, pose: "victoire", fx: ["cape:" + C0 + ":" + mo, "pet", "o:" + j5 + ":S"] }];
    return [s0, s1,
      f ? { out: "jupe", c1: C0, c2: p[0], mo, pose: "bras", fx: ["pet"] } : { out: "tee", c1: C0, c2: p[0], c3: dk(p[0], .3), mo, pose: "bras", fx: ["pet"] },
      { out: "tee", c1: lp, c2: p[0], dessin: ds, cr: f ? B : Cp, pose: "leve", fx: ["pet", "o:" + j3 + ":M"] },
      f ? { out: "chasuble", c1: C0, c2: p[0], mo, cr: B, pose: "coucou", fx: ["pet", "o:" + j4 + ":L"] } : { out: "patte", c1: "#fffaf2", c2: p[0], c3: C0, mo3: mo, dessin: ds, pose: "coucou", fx: ["pet", "o:" + j4 + ":L"] },
      { out: "tee", c1: "#fffaf2", c2: p[0], c3: dk(p[1], .3), dessin: "nxm", coat: { t: "veste", col: C0, mo }, pose: "croise", fx: ["pet", "o:" + j5 + ":S"] }];
  }
  const mix2 = c => lt(c, .55) === "#ffffff" ? "#ffc5d0" : CORPS.mix(c, "#ffb5c5", .55);

  // ======================== PRÉNOMS, CARACTÈRES ========================
  const GIRLS = "Adèle Agnès Aïda Albane Alexia Alice Aliénor Aline Alizée Amandine Amélie Ana Anaëlle Angèle Anissa Annabelle Antonia Ariane Arielle Armelle Astrid Aude Audrey Aurore Ava Axelle Aya Béatrice Bénédicte Berthe Billie Blandine Calypso Candice Carla Caroline Cassandre Cécile Célia Céline Chiara Clara Clarisse Claudia Clélia Cléo Clémence Coline Colombe Cora Cyrielle Dalia Danaé Delphine Diane Dina Domitille Dounia Édith Éléonore Elsa Élise Ella Élodie Éloïse Émilie Émeline Emy Erine Esther Eugénie Eva Ève Fanny Faustine Fleur Florence Francesca Gabrielle Gaïa Gisèle Giulia Gloria Grâce Gwen Hanaé Hannah Héloïse Hélène Hermine Hortense Ida Inès Ingrid Irène Isabelle Isis Jasmine Joséphine Judith Juliette Justine Kamila Kayla Laure Lana Lara Laurine Léa Léna Léontine Liliane Lisa Livia Lorette Louane Luce Lucie Lucille Ludivine Lydia Madeleine Maëva Malia Mallory Manel Marguerite Maria Marianne Marie Marine Marion Marthe Mathilde Maud Mélina Mélissa Mia Michelle Mila Mina Miriam Moana Mona Muriel Nadia Naomi Natacha Nell Nelly Noélie Noémie Nora Odile Olivia Ornella Pauline Pénélope Pia Pomme Rachel Rebecca Régine Rita Roxane Sabine Sandra Scarlett Selma Séraphine Serena Sofia Sonia Sophie Stella Sybille Talia Tamara Tess Thelma Tina Ursule Valentine Vanille Vera Victoria Virginie Wendy Yaëlle Yolande Zahra Zara Zelda Anaé Abby Aglaé Bérangère Bettina Camélia Carole Clio Daisy Dorothée Elina Elvire Fatoumata Gaëlle Hawa Ilona Kiara Lalla Lilia Lise Loane Lucine Lyna Maïssa Malou Mariam Mélie Myriam Nadège Naëlle Nawel Nélia Nilou Paola Philomène Rosa Rosine Sabrina Samia Sana Sixtine Solange Soraya Tara Thalia Valérie Yara Yuki Zaïna Zineb Aïko Amina Anya Bahia Chaïma Djeneba Esmée Hiba Kira Mahina Malak Nahia Neela Nyla Ramata Rokia Sakura Shirin Tsiory Xiu Zainab Alicia Anastasia Ayana Blanca Brigitte Carmela Cassie Cerise Charlotte Clotilde Corinne Dahlia Déborah Eléna Elisa Elvina Estée Eulalie Félicie Flavie Florine Frida Gina Héléna Honorine Irina Isadora Ivana Jacinthe Joëlle Josie Julia Katia Leslie Lilas Lorène Lucienne Magali Maïlys Marcelle Marjolaine Maxine Mireille Nadine Nicole Olympia Opaline Perla Raphaëlle Rosie Sabah Ségolène Sévane Simone Suzon Tatiana Tiana Tilda Uma Viviane Ysaline Zoélie".split(" ");
  const BOYS = "Abel Adrien Ahmed Alban Albert Alexandre Alexis Alfred Ali Amaury Amine Anas André Anselme Antonin Aristide Armel Arsène Aurélien Bastien Baptiste Benjamin Benoît Bilal Boris Brice Bruno Cyprien Cyril Damien Daniel David Denis Dimitri Dorian Elias Émile Émilien Emmanuel Éric Ernest Esteban Étienne Fabien Fabio Ferdinand Florent Florian François Frédéric Gauthier Georges Gilles Grégoire Guillaume Habib Hadrien Henri Hippolyte Ilian Ivan Jacques Jason Jean Jérémie Joachim Joël Jonas Jordan Joseph Josué Julien Karim Kylian Lazare Léandre Léonard Lilian Lino Loïc Luca Lucien Ludovic Malik Marc Marcel Marco Martin Matthias Maurice Max Mehdi Michel Milan Mohamed Nicolas Noah Norbert Olivier Omar Pacôme Pascal Patrice Philémon Pierre Rémi Renaud Richard Robinson Rodrigue Roland Romain Roméo Samuel Sébastien Séraphin Sylvain Thibault Thomas Tim Ugo Vincent Virgile Walid William Xavier Yanis Yann Yohan Yves Zacharie Ayoub Badr Bakary Cheikh Daouda Hamza Ilyas Issa Jibril Kader Lamine Mamadou Mounir Nassim Oussama Rachid Seydou Soufiane Tariq Yacine Younès Zakaria Akira Haruto Hiro Kenta Ren Sora Taro Yuto Chen Wei Arjun Dev Ravi Rohan Kiran Tenzin Joaquim Bento Iker Mikel Unai Pedro Santiago Nico Andrés Luis Otto Lars Erik Sven Finn Olaf Björn Leif Connor Owen Rhys Ewan Angus Fergus Corto Gwendal Malone Maël Erwan Ronan Tanguy Yannick Goulven Pol Briac Brendan Kilian Anton Aurèle Clovis Colin Darius Émeric Gédéon Honoré Horace Isidore Jasper Joas Lancelot Léopold Lisandro Marcellin Merlin Nestor Noël Odilon Oleg Orion Prosper Rufus Silvère Sixte Ulrich Urbain Valérian Wilfried Zéphyr Aimé Alain Alvaro Apollon Arnaud Arthus Balthazar Barthélemy Bernard Bertrand Calvin Casimir Charles Christophe Claude Constantin Cosimo Didier Dylan Edmond Elton Ezra Fabrice Fernand Gérard Gino Gonzague Guy Hervé Hubert Igor Jérôme Justin Laurent Lenny Lionel Luc Manuel Mathias Mattéo Maximilien Nathanaël Néo Oliver Paulin Philippe Raymond Rémy Robert Rodolphe Sami Serge Stanislas Stéphane Théophile Thierry Tobie Toussaint Vianney Victorien Wassim Yoann Yvon".split(" ");
  const TRAITS = ["pose mille questions par jour", "rit si fort que toute la garderie rit avec {lui|elle}", "collectionne les cailloux qui brillent", "danse dès qu'{il|elle} entend de la musique", "invente des histoires avant de dormir", "partage toujours son goûter", "est timide mais très {courageux|courageuse}", "adore les câlins et les bisous d'esquimau", "range tout par couleur", "chante faux, mais avec beaucoup de cœur", "veut soigner tout le monde plus tard", "connaît le nom de tous les os de la main", "fait des grimaces pour consoler les copains", "ne marche jamais : {il|elle} sautille", "dessine sur tout ce qui ressemble à du papier", "dit bonjour à tous les arbres", "a toujours une poche pleine de trésors", "est {le roi|la reine} des cabanes en coussins", "fait la sieste n'importe où", "compte tout : les marches, les nuages, les petits pois", "est {gourmand|gourmande} de fraises", "parle aux animaux et {il|elle} est {sûr|sûre} qu'ils répondent", "court partout, tout le temps", "adore les mots compliqués comme « sternocléidomastoïdien »", "fait des bulles de savon géantes", "écoute les autres avec ses grands yeux", "s'endort avec son doudou préféré", "invente des chorégraphies", "répare les jouets cassés avec du scotch", "adore se déguiser", "a un fou rire contagieux", "veut tout faire {tout seul|toute seule}", "applaudit à chaque bonne réponse", "trouve toujours le mot gentil", "joue au docteur avec ses peluches", "fait des colliers de pâtes pour tout le monde", "cherche des trèfles à quatre feuilles", "lit des livres à l'envers… pour rire", "imite tous les bruits d'animaux", "est {le premier levé|la première levée}, toujours de bonne humeur", "prend soin des plus petits", "a peur du noir mais pas des monstres", "fait des roulades dans l'herbe", "transforme chaque flaque en océan", "a des idées plein la tête", "est très {patient|patiente}", "fait rire même les grands-parents ronchons", "garde les secrets comme un coffre-fort", "veut voir le monde entier", "construit des tours plus grandes que {lui|elle}", "chante sous la douche… et sous la pluie", "ne dit jamais non à une partie de cache-cache", "fait des bisous aux bobos", "donne un prénom à chaque nuage", "dessine des squelettes rigolos", "rêve de voler", "invente des recettes bizarres mais délicieuses", "est {le champion|la championne} des devinettes", "adore les jeux de mots", "dit merci même aux portes automatiques"];
  const CARA = ["joyeux|joyeuse", "calme|calme", "farceur|farceuse", "rêveur|rêveuse", "rieur|rieuse", "curieux|curieuse"];
  const PETN = "Plic Ploc Biscotte Noisette Pistache Caramel Galopin Grelot Filou Pompon Gribouille Moustique Praline Chamallow Brindille Patapouf Zigzag Bouboule Croquette Pimousse Taquin Frimousse Câlin Tipouf Bulle Tornade Choupette Ricochet Sésame Cachou Dragée Pirouette Grignote Tambour Kiwi Banjo Cookie Pépite Flocon Cumulus Muscade Cannelle Réglisse Papillote Truffe Myrtille Clafoutis Biscuit Zéphyrin Gaufrette Picoti Bigoudi Chouquette Lutin Mistigri Calisson Tartine Grisou Nougat Fripouille Pétale".split(" ");
  const EXS = [[[HA, O], [HA, O], ["", O], [HA, O], ["", O], [WI, O]], [["", ""], ["", O], ["", ""], ["", O], ["", ""], ["", ""]], [[WI, "tongue"], ["", "tongue"], [WI, O], ["", "tongue"], [WI, O], [WI, ""]], [["sleep", ""], ["", O], [HA, ""], ["", ""], [HA, O], ["", ""]], [[HA, O], [HA, O], [HA, O], [HA, O], [HA, O], [HA, O]], [["", O], ["", O], ["", O], ["", O], ["", O], ["", O]]];
  const gen = (s, f) => s.replace(/\{([^|}]*)\|([^}]*)\}/g, (_, m, w) => f ? w : m);
  // peaux (12 réelles + 6 d'origine), quelques couleurs imaginaires (32 enfants en tout)
  const SKN = ["#fde3d2", "#f9d6bd", "#f3c4a2", "#e8b48c", "#d9a074", "#c4875c", "#a96f48", "#8f5a38", "#77482c", "#5f3822", "#4a2b1a", "#ecc39a", ...SK];
  const FANT = ["#9fc4f5", "#c5b3f2", "#a8e6cf", "#f7b8d3", "#a5dc8f", "#8fd8e0", "#f2d07a", "#b8c2d6", "#f5a98f", "#d0a8f0", "#8fb0e8", "#b8e0a0", "#f0b8e8", "#a0d8d0", "#c8d0f8", "#e8c8a0"];
  const FANP = { espace: [0, 3], magie: [1], dragon: [2], licorne: [0], nuit: [2], inventeur: [1], plage: [4], papillon: [3], flamant: [1], grenouille: [4], baleine: [2], dino: [4], cirque: [3], fete: [2], musique: [4] };
  const tone = h => parseInt(h.slice(1, 3), 16) * .3 + parseInt(h.slice(3, 5), 16) * .59 + parseInt(h.slice(5, 7), 16) * .11;
  const HAIRL = { clair: ["bl", "ch", "ro", "br", "pl", "no", "#d9a35c"], moyen: ["br", "ch", "no", "ve", "#7a4a2a"], fonce: ["no", "ve", "br", "#3a2418"], fan: ["rs", "bu", "vi", "tu", "#f5f0ff", "#ffd15c", "#2e2530"] };
  const EYEL = ["m", "b", "v", "n", "g", "i", "#2f9a8f", "#5a3a8f"];
  const GH = ["long", "raie", "ondule", "carre", "couettes", "nattes", "queue", "afro", "pompons", "macarons", "raieonde", "boucle"], BH = ["court", "epis", "boucle", "ras", "bol", "houppe", "meche", "under", "degrade", "dreads", "brosse", "vague", "rond", "afro", "duvet"];
  const GHK = ["curls", "longcurls", "curlybob", "boxbraids", "puffs2", "bubble", "bun", "pony", "sidebraid", "fishbraid", "dutch", "frenchbob", "halfbun", "buns", "crown", "braids", "wavy", "lowbun", "shoulderpony", "longbuns"], BHK = ["spiky", "mohawk", "afro", "pixie", "curls"];
  const ACC = [["#5fa8f0", "#ffd15c", "#e8607f"], ["#f0857a", "#5fc0c9", "#ffd84d"], ["#7fc98a", "#f5a04c", "#8f7bea"], ["#f7a8c4", "#6f8fd8", "#ffe08a"], ["#ffcf5c", "#e8607f", "#4fa5b5"], ["#9a85e0", "#f7c04c", "#5fbf8a"], ["#5fbfb5", "#f07a6a", "#f9e07a"], ["#f59a5c", "#4f8fb5", "#f7c5d5"], ["#b5d96f", "#8f6fc9", "#ff9f7a"], ["#f27fa5", "#5fc0c9", "#fff0a5"], ["#8fc4f5", "#f07a9c", "#b5e08a"], ["#c9a0e8", "#6fbf8a", "#ffb45c"], ["#e8646f", "#f5d58a", "#5f8fd0"], ["#4f7fc0", "#f59a4c", "#ffd9e5"], ["#f5b8a0", "#5f8fa0", "#e0c25c"], ["#a5d8c9", "#e87a8f", "#8a7ad8"], ["#e0b04c", "#5f6fb5", "#f59ab5"], ["#6fd0a0", "#ff8f6f", "#5f7fd0"], ["#ff9fd0", "#4fbfa8", "#ffd15c"], ["#7f8fe8", "#ffb85c", "#f57a8a"]];
  const P0 = ["assis", "applaudit", "tete", "pieds", "joues", "leve"];
  const shuf = L => { let s = 7; for (let i = L.length - 1; i > 0; i--) { s = (s * 16807) % 2147483647; const j = s % (i + 1); [L[i], L[j]] = [L[j], L[i]]; } return L; }; shuf(GIRLS); shuf(BOYS); // prénoms mélangés (toujours dans le même ordre)
  const used = new Set(A.animals.filter(a => a.kind === "enfant").map(a => a.name)); let gi = 0, bi = 0;
  const pick = L => { const i0 = L === GIRLS ? gi : bi; for (let i = i0; i < L.length; i++) if (!used.has(L[i])) { used.add(L[i]); if (L === GIRLS) gi = i + 1; else bi = i + 1; return L[i]; } return ""; };
  const LIST = [];
  const THEMES = [...TOT.map(t => ({ tot: t, key: t[0] })), ...PAS.map(p => ({ pas: p, key: p[0] }))];
  THEMES.forEach((th, ti) => {
    for (let pi = 0; pi < 5; pi++) {
      const fan = (FANP[th.key] || []).includes(pi), sk = fan ? FANT[(ti + pi * 3) % FANT.length] : SKN[(ti * 5 + pi * 7) % SKN.length];
      const tn = tone(sk), hl = fan ? HAIRL.fan : tn > 185 ? HAIRL.clair : tn > 120 ? HAIRL.moyen : HAIRL.fonce, hc0 = hl[(ti + pi * 2) % hl.length], hc = HC[hc0] || hc0;
      const eyL = tn > 185 || fan ? EYEL : ["m", "n", "m", "g", "v", "#3a2418"], ey0 = eyL[(ti * 3 + pi) % eyL.length], ey = EC[ey0] || ey0;
      const p = ACC[(ti * 7 + pi * 3) % ACC.length], ci = th.tot ? pi % th.tot[2].length : 0;
      ["f", "m"].forEach((g, gk) => {
        const f = g === "f", name = pick(f ? GIRLS : BOYS); if (!name) return;
        const n = LIST.length, hs = f ? GH[(ti * 3 + pi * 5 + gk) % GH.length] : BH[(ti * 5 + pi * 3) % BH.length];
        const hk = f ? ((ti + pi) % 2 === 0 ? GHK[(ti * 2 + pi) % GHK.length] : "") : ((ti + pi) % 3 === 0 ? BHK[(ti + pi) % BHK.length] : ""), hkMin = f ? 3 : 4;
        const S = th.tot ? totemStages(th.tot, ci, pi, p, f) : th.pas[3](p, f);
        const pt = th.tot ? th.tot[7] : th.pas[2][pi % 2], pet = { kind: pt[0], o: pt[1], hex: "#" + pt[2], dark: "#" + pt[3], belly: "#" + pt[4], label: th.tot ? th.tot[1].replace(/^(le |la |l')/, "") : pt[5].replace(/^(son |sa )/, "") };
        const petName = PETN[(ti * 11 + pi * 5 + gk * 3) % PETN.length], ex = (ti + pi * 2 + gk) % EXS.length;
        const ages6 = S.map((s, st) => { const q = { out: "tee", c1: "#fff", c2: p[0], c3: "", mo: "", mo3: "", dessin: "", cr: "", shoe: "", coat: null, kine: false, lun: (ti * 3 + pi + gk) % 9 === 4 && st > 2 ? "#3a3550" : "", hs, hk: st >= hkMin ? hk : "", hkMin: -1, ...s };
          if (HOOD.has(q.cr)) { q.hs = "rond"; q.hk = ""; } else if (HATK.has(q.cr)) { q.hs = SAFE[q.hs] || q.hs; q.hk = ""; }
          delete q.fx; delete q.pose; delete q.pose0; return q; });
        const histoire = gen(`${name} ${TRAITS[(ti * 13 + pi * 7 + gk * 29) % TRAITS.length]}. Comme ${f ? "son jumeau" : "sa jumelle"} de cœur §, ${f ? "elle" : "il"} ${th.tot ? th.tot[9] : th.pas[1]} Son compagnon : ${petName}, ${th.tot ? "un bébé " + pet.label : pt[5]}.`, f);
        const kid = { nx: true, name, id: "rigolo-nx-" + slug(name), g, sk, hc, ey, hat: "", jeu: "", pz: n % 12, fr: tn > 190 && (pi + gk) % 3 === 1, exp: EXS[ex], pose0: S[0].pose0 || P0[(n + ti) % P0.length], pose1: (n % 3 === 0) ? "coucou" : "",
          poseX: { 2: S[2].pose || "bras", 3: S[3].pose || "ouvert", 4: S[4].pose || "coucou", 5: S[5].pose || "repos" }, ages6, ...ages6[0],
          compagnon: { ...pet, nom: petName }, theme: th.key, caractere: gen("{" + CARA[ex] + "}", f), histoire };
        kid.fx = (st, c) => { if (st > 1) LC = c; return runFx(S[st].fx, kid, st, c); };
        LIST.push(kid);
      });
    }
  });
  // un « jumeau de cœur » : la fille et le garçon d'une même paire se ressemblent (couleurs, peau, thème)
  for (let i = 0; i + 1 < LIST.length; i += 2) { LIST[i].histoire = LIST[i].histoire.replace("§", LIST[i + 1].name); LIST[i + 1].histoire = LIST[i + 1].histoire.replace("§", LIST[i].name); LIST[i].jumeau = LIST[i + 1].id; LIST[i + 1].jumeau = LIST[i].id; }
  A.addKids(LIST);
  A.NX_KIDS = LIST.length;
  // le moteur, pour les fichiers suivants
  A.nx = { OBX, GROUND, FXR, COATX, hat, HATK, HOOD, SAFE, PLACE, sol0, ob, vol, fm, DOME, brim, band, mf, petArt, capeBack, umbrella, wings, mkFx: (kid, S) => (st, c) => { if (st > 1) LC = c; return runFx(S[st] || [], kid, st, c); } };
})();
