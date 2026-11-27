"use strict";
// ============================================================================
//  LES 300 ACCESSOIRES : 20 par zone du corps (un tous les 5 % de QCM réussis).
//  Chaque accessoire est dessiné dans le repère de sa zone :
//    f / b      : sur le tronc (face / dos)      over/overB : par-dessus les bras
//    head/headB : sur la tête                    under/underB : derrière le corps
//    arm / leg  : dans le repère du membre (recopié en miroir, sauf single:1)
//    held       : tenu dans la main              top/topB : tout devant
//  s = emplacement (deux accessoires du même emplacement se remplacent), l = ordre
// ============================================================================
(function () {
  const { mix, dk, lt, starD, heartD, legSeg, armSeg, sleeve, handPath, footPath } = CORPS;
  const ACC = [];
  let Z = "";
  const A = (name, ico, s, l, parts) => ACC.push({ z: Z, name, ico, s, l, ...parts });
  // ---------- Briques ----------
  const P = (d, fill, st, w = 1.7, x = "") => `<path d="${d}" fill="${fill}" stroke="${st || (fill[0] === "#" ? dk(fill) : "#4a3550")}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round" ${x}/>`;
  const N = (d, c, w = 1.6, x = "") => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${x}/>`;
  const C = (x, y, r, fill, st, w = 1.4) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"${st === "" ? "" : ` stroke="${st || dk(fill[0] === "#" ? fill : "#888888")}" stroke-width="${w}"`}/>`;
  const E = (x, y, rx, ry, fill, st, w = 1.4, x2 = "") => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}"${st === "" ? "" : ` stroke="${st || dk(fill[0] === "#" ? fill : "#888888")}" stroke-width="${w}"`} ${x2}/>`;
  const R = (x, y, w, h, r, fill, st, sw = 1.5, x2 = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${st || dk(fill[0] === "#" ? fill : "#888888")}" stroke-width="${sw}" ${x2}/>`;
  const GO = "url(#gGold)", GD = "#8f5a0c", SI = "url(#gSilver)", SD = "#56627a", CR = "url(#gCrystal)", CD = "#3f74b8", GX = "url(#pGalaxy)", GXD = "#1d1550";
  const star = (x, y, r, c = GO, st = GD) => P(starD(x, y, r), c, st, 1.2);
  const heart = (x, y, s, c = "#f0567c", st) => P(heartD(x, y, s), c, st, 1.3) + `<ellipse cx="${x - s * .5}" cy="${y - s * .3}" rx="${s * .22}" ry="${s * .15}" fill="#fff" opacity=".8"/>`;
  const flower = (x, y, r, c, m = "#ffd166") => [0, 72, 144, 216, 288].map(a => { const t = a * Math.PI / 180 - 1.57; return `<circle cx="${(x + r * .62 * Math.cos(t)).toFixed(1)}" cy="${(y + r * .62 * Math.sin(t)).toFixed(1)}" r="${(r * .5).toFixed(1)}" fill="${c}" stroke="${dk(c, .28)}" stroke-width=".9"/>`; }).join("") + `<circle cx="${x}" cy="${y}" r="${(r * .36).toFixed(1)}" fill="${m}" stroke="${dk(m, .3)}" stroke-width=".7"/>`;
  const bow = (x, y, s, c) => P(`M${x},${y} C${x - s * .5},${y - s} ${x - s * 1.5},${y - s} ${x - s * 1.4},${y} C${x - s * 1.5},${y + s} ${x - s * .5},${y + s} ${x},${y}Z M${x},${y} C${x + s * .5},${y - s} ${x + s * 1.5},${y - s} ${x + s * 1.4},${y} C${x + s * 1.5},${y + s} ${x + s * .5},${y + s} ${x},${y}Z`, c) + N(`M${x - s * .5},${y} L${x - s},${y - s * .2} M${x + s * .5},${y} L${x + s},${y - s * .2}`, dk(c, .3), 1.1) + E(x, y, s * .32, s * .4, lt(c, .15), dk(c));
  const gem = (x, y, s, c = CR, st = CD) => P(`M${x - s},${y - s * .3} L${x - s * .5},${y - s} L${x + s * .5},${y - s} L${x + s},${y - s * .3} L${x},${y + s}Z`, c, st, 1.1) + N(`M${x - s},${y - s * .3}H${x + s} M${x - s * .4},${y - s * .3} L${x},${y + s} L${x + s * .4},${y - s * .3}`, st, .7) + `<path d="M${x - s * .6},${y - s * .4} L${x - s * .35},${y - s * .85}" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>`;
  const spark = (x, y, s, c = "#fff") => `<path d="M${x},${y - s} Q${x},${y} ${x + s},${y} Q${x},${y} ${x},${y + s} Q${x},${y} ${x - s},${y} Q${x},${y} ${x},${y - s}Z" fill="${c}"/>`;
  const beads = (d, c, w = 4, gap = 4.6) => `<path d="${d}" fill="none" stroke="${dk(c, .35)}" stroke-width="${w + 1.4}" stroke-dasharray=".01 ${gap}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-dasharray=".01 ${gap}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#fff" stroke-width="${w * .3}" stroke-dasharray=".01 ${gap}" stroke-linecap="round" opacity=".9" transform="translate(-.6 -.8)"/>`;
  const strap = (d, c, w) => N(d, dk(c), w + 2.4) + N(d, c, w) + N(d, lt(c, .45), w * .22, 'opacity=".6"');
  const bolt = (x, y, k, c = "#ffd84d") => `<g transform="translate(${x} ${y}) scale(${k})">${P("M2,-14 L-8,3 L-1,3 L-4,15 L9,-4 L1,-4 L6,-14Z", c, "#a3690a", 1.4)}</g>`;
  const butter = (x, y, k, c) => `<g transform="translate(${x} ${y}) scale(${k})">${P("M0,0 C-4,-12 -15,-13 -14,-4 C-13,2 -5,2 0,0 C-8,2 -12,9 -7,11 C-3,12 -1,6 0,0 C4,-12 15,-13 14,-4 C13,2 5,2 0,0 C8,2 12,9 7,11 C3,12 1,6 0,0Z", c)}${N("M0,-3 V9 M0,-3 L-3,-9 M0,-3 L3,-9", dk(c, .6), 1.4)}${C(-9, -5, 1.6, "#fff", "")}${C(9, -5, 1.6, "#fff", "")}</g>`;
  const smile = (x, y, r) => C(x, y, r, "#ffd84d", "#b07d10") + C(x - r * .35, y - r * .2, r * .13, "#5a3a00", "") + C(x + r * .35, y - r * .2, r * .13, "#5a3a00", "") + N(`M${x - r * .45},${y + r * .2} Q${x},${y + r * .75} ${x + r * .45},${y + r * .2}`, "#5a3a00", 1.3);
  const plaster = (x, y, a, c = "#f7c99a", w = 22, h = 9) => `<g transform="rotate(${a} ${x} ${y})">${R(x - w / 2, y - h / 2, w, h, h / 2, c)}<rect x="${x - w * .19}" y="${y - h / 2 + 1}" width="${w * .38}" height="${h - 2}" fill="${lt(c, .5)}"/>${[-w * .34, w * .34].map(d => `<circle cx="${x + d}" cy="${y - 1.6}" r=".8" fill="${dk(c, .3)}"/><circle cx="${x + d}" cy="${y + 1.6}" r=".8" fill="${dk(c, .3)}"/>`).join("")}</g>`;
  const FLX = c => c[0] === "#" ? dk(c) : "#4a3550";
  // bandes de tissu prêtes à l'emploi
  const arm = (y0, y1, c, p = 1.8, st) => P(armSeg(y0, y1, p), c, st || FLX(c));
  const leg = (y0, y1, c, p = 1.8, st) => P(legSeg(y0, y1, p), c, st || FLX(c));
  const shine = (seg, o = .25) => `<path d="${seg}" fill="url(#gLimb)" opacity="${o + .5}"/>`;

  // ======================== TÊTE ========================
  Z = "tete";
  const glass = (l, r, fr, op = 1) => `<g fill-opacity="${op}">${l}${r}</g>`;
  A("Lunettes de soleil", "😎", "yeux", 6, { head: P("M160,93 Q177,88 195,94 Q196,114 180,117 Q163,117 160,93Z", "#2c2740", "#14101f", 2) + P("M240,93 Q223,88 205,94 Q204,114 220,117 Q237,117 240,93Z", "#2c2740", "#14101f", 2) + N("M195,97 Q200,94 205,97 M160,95 L148,92 M240,95 L252,92", "#14101f", 2.6) + N("M166,96 L176,94 M211,96 L221,94", "#8f86c4", 2.4) });
  A("Lunettes rondes", "👓", "yeux", 6, { head: `<g fill="#dff3ff" fill-opacity=".35" stroke="#8a4a2e" stroke-width="3"><circle cx="177" cy="103" r="17"/><circle cx="223" cy="103" r="17"/></g>` + N("M194,101 Q200,97 206,101 M160,100 L148,96 M240,100 L252,96", "#8a4a2e", 2.6) + N("M167,95 Q171,90 177,90 M213,95 Q217,90 223,90", "#fff", 2) });
  A("Lunettes cœur", "💗", "yeux", 6, { head: `<g fill-opacity=".85">${P(heartD(177, 102, 15), "#f0567c", "#9c2348", 2.2)}${P(heartD(223, 102, 15), "#f0567c", "#9c2348", 2.2)}</g>` + N("M193,98 Q200,94 207,98 M161,97 L148,94 M239,97 L252,94", "#9c2348", 2.4) + N("M168,97 Q170,94 174,94 M214,97 Q216,94 220,94", "#fff", 2) });
  const catEars = c => P("M150,52 L146,6 L182,28Z", c) + P("M250,52 L254,6 L218,28Z", c) + P("M155,42 L152,18 L171,30Z", "#ffb3c7", "#c96a86", 1.2) + P("M245,42 L248,18 L229,30Z", "#ffb3c7", "#c96a86", 1.2);
  A("Serre-tête chat", "🐱", "chapeau", 7, { head: N("M146,66 Q150,20 200,18 Q250,20 254,66", "#3b3350", 5) + catEars("#3b3350"), headB: N("M146,66 Q150,22 200,20 Q250,22 254,66", "#3b3350", 5) + P("M150,52 L146,6 L182,28Z", "#3b3350") + P("M250,52 L254,6 L218,28Z", "#3b3350") });
  const hp = N("M143,96 Q136,10 200,9 Q264,10 257,96", "#a84f7c", 10) + N("M143,96 Q136,10 200,9 Q264,10 257,96", "#ff8fb8", 7) + R(132, 82, 18, 36, 9, "#ff6fa3") + R(250, 82, 18, 36, 9, "#ff6fa3") + R(146, 86, 8, 28, 4, "#5a3a55") + R(246, 86, 8, 28, 4, "#5a3a55") + heart(141, 99, 4, "#fff", "#ff8fb8") + heart(259, 99, 4, "#fff", "#ff8fb8");
  A("Casque audio", "🎧", "chapeau", 7, { head: hp, headB: hp });
  const beret = P("M142,48 C138,10 190,-8 226,-2 C268,4 276,38 258,50 C230,34 176,32 142,48Z", "#d63e4e") + P("M146,50 Q200,30 256,50 Q254,42 250,40 Q200,22 150,40Z", "#a82a3c") + N("M206,-4 q2,-10 6,-11", "#a82a3c", 4) + N("M160,28 Q180,6 212,6", "#f58a94", 4, 'opacity=".7"');
  A("Béret rouge", "🎨", "chapeau", 7, { head: beret, headB: beret });
  const crown = P("M150,42 L144,-6 L170,16 L185,-20 L200,8 L215,-20 L230,16 L256,-6 L250,42 Q200,28 150,42Z", GO, GD, 2.2) + P("M150,42 Q200,28 250,42 L250,50 Q200,36 150,50Z", "#f9d66b", GD, 1.6) + gem(200, 22, 8, "#ef4b6c", "#8f1a38") + C(172, 28, 4, "#5bb8f5", "#215f94") + C(228, 28, 4, "#5bb8f5", "#215f94") + [[144, -8], [185, -22], [215, -22], [256, -8]].map(([x, y]) => C(x, y, 4.4, "#fff6d8", GD)).join("") + spark(158, 6, 5) + spark(238, 12, 4);
  A("Couronne royale", "👑", "chapeau", 7, { head: crown, headB: crown });
  A("Barrette étoile", "⭐", "barrette", 6, { head: star(158, 58, 13) + spark(153, 53, 4) });
  const fraise = (x, y) => P(`M${x - 10},${y - 5} Q${x},${y - 13} ${x + 10},${y - 5} Q${x + 10},${y + 7} ${x},${y + 14} Q${x - 10},${y + 7} ${x - 10},${y - 5}Z`, "#f0485e") + P(`M${x},${y - 6} L${x - 9},${y - 10} L${x - 4},${y - 11} L${x},${y - 16} L${x + 4},${y - 11} L${x + 9},${y - 10}Z`, "#58b368") + [[-4, 0], [4, 0], [0, 5]].map(([a, b]) => E(x + a, y + b, .9, 1.4, "#ffe9a8", "")).join("");
  A("Barrette fraise", "🍓", "barrette", 6, { head: fraise(243, 60) });
  A("Grand nœud rose", "🎀", "barrette", 8, { head: bow(236, 34, 19, "#ff7fb0"), headB: bow(200, 44, 20, "#ff7fb0") });
  const ear2 = f => f(146) + f(254);
  A("Boucles perles", "🤍", "oreilles", 3, { head: ear2(x => C(x, 118, 5, "#fffaf0", "#b9a894") + C(x - 1.5, 116.5, 1.4, "#fff", "")) });
  A("Créoles dorées", "💛", "oreilles", 3, { head: ear2(x => `<circle cx="${x}" cy="125" r="11" fill="none" stroke="${GD}" stroke-width="4.6"/><circle cx="${x}" cy="125" r="11" fill="none" stroke="#fbc93d" stroke-width="2.8"/>`) });
  A("Casquette", "🧢", "chapeau", 7, { head: P("M146,56 C144,14 172,0 200,0 C228,0 256,14 254,56 Q200,36 146,56Z", "#4f7fe0") + P("M140,58 Q200,30 260,58 Q256,76 200,62 Q144,76 140,58Z", "#3561bd") + N("M200,0 V42 M172,8 Q164,24 166,46 M228,8 Q236,24 234,46", "#2f55a5", 1.6) + C(200, 0, 4.5, "#ffd84d") + heart(200, 26, 8, "#fff", "#2f55a5"), headB: P("M144,66 C142,14 172,0 200,0 C228,0 258,14 256,66 Q200,82 144,66Z", "#4f7fe0") + N("M200,0 V56 M172,8 Q160,34 162,70 M228,8 Q240,34 238,70", "#2f55a5", 1.6) + P("M182,74 Q200,52 218,74Z", "#3561bd") + C(200, 0, 4.5, "#ffd84d") });
  const fc = [[148, 62, 10, "#ff9fb8"], [156, 44, 11, "#ffffff"], [172, 32, 12, "#f58ad0"], [191, 26, 11, "#ffd98a"], [211, 26, 12, "#ff9fb8"], [229, 32, 11, "#ffffff"], [244, 44, 12, "#c7a3f5"], [252, 62, 10, "#ffb38a"]];
  const fCrown = N("M146,68 Q154,22 200,22 Q246,22 254,68", "#5fa35f", 5) + fc.map(([x, y, r, c]) => flower(x, y, r, c)).join("") + [[164, 46], [202, 36], [238, 48]].map(([x, y]) => E(x, y, 6, 2.8, "#7cc47c", "#3f7a45", 1, `transform="rotate(30 ${x} ${y})"`)).join("");
  A("Couronne de fleurs", "🌸", "chapeau", 7, { head: fCrown, headB: fCrown });
  const bonnet = P("M144,58 C142,8 172,-8 200,-8 C228,-8 258,8 256,58 Q200,40 144,58Z", "url(#pKnitRed)", "#7c1c2a", 2) + P("M140,62 Q200,36 260,62 L258,78 Q200,54 142,78Z", "#fff6ea", "#b59d83", 2) + [152, 168, 184, 200, 216, 232, 248].map(x => N(`M${x},${56 + Math.abs(x - 200) * .12 - 8} v12`, "#dcc8ae", 1.8)).join("") + C(200, -14, 16, "#fff6ea", "#b59d83") + N("M190,-18 q4,4 8,0 M202,-10 q4,4 8,0 M194,-8 q3,3 6,0", "#dcc8ae", 1.8);
  A("Bonnet à pompon", "🧶", "chapeau", 7, { head: bonnet, headB: bonnet });
  const bun = P("M168,34 C150,-4 148,-44 162,-54 C180,-56 190,-16 188,28Z", "#fff") + P("M170,22 C160,-6 158,-34 165,-42 C175,-40 181,-12 180,20Z", "#ffb3c7", "#e08aa4", 1.2);
  const lapin = N("M146,66 Q150,20 200,18 Q250,20 254,66", "#f7a1bd", 5) + bun + `<g transform="matrix(-1 0 0 1 400 0)">${bun}</g>`;
  A("Oreilles de lapin", "🐰", "chapeau", 7, { head: lapin, headB: lapin });
  const witch = P("M120,48 Q200,14 280,48 Q272,64 200,52 Q128,64 120,48Z", "#4b3178") + P("M152,42 C172,20 178,-20 222,-56 C216,-40 220,-32 232,-28 C222,-20 232,16 248,42 Q200,28 152,42Z", "#5c3f92") + P("M154,40 Q200,24 246,38 L242,24 Q200,12 162,26Z", "#f2a93b") + R(190, 18, 20, 18, 3, "#f9d66b", GD) + star(228, -8, 5) + star(200, 0, 4) + spark(186, 8, 4, "#ffe27a");
  A("Chapeau de magicienne", "🧙", "chapeau", 7, { head: witch, headB: witch });
  A("Paillettes et taches de rousseur", "✨", "visage", 2, { head: [[160, 117], [167, 121], [174, 117], [226, 117], [233, 121], [240, 117]].map(([x, y]) => C(x, y, 1.6, "#b8673f", "")).join("") + spark(157, 127, 6, "#ffd84d") + spark(243, 127, 6, "#ffd84d") + spark(170, 130, 4, "#ff9fd0") + spark(230, 130, 4, "#ff9fd0") });
  const tiara = P("M150,52 Q200,18 250,52 Q236,34 222,34 L214,16 L206,28 L200,4 L194,28 L186,16 L178,34 Q164,34 150,52Z", SI, SD, 1.8) + gem(200, 24, 8) + gem(178, 33, 4.5) + gem(222, 33, 4.5) + spark(200, 4, 6) + spark(186, 16, 4) + spark(214, 16, 4);
  A("Diadème de cristal", "💎", "chapeau", 7, { head: tiara, headB: N("M146,64 Q170,40 200,40 Q230,40 254,64", "#b9c6da", 4) });
  const halo = `<circle cx="200" cy="-22" r="46" fill="url(#gGlow)" opacity=".7"/>` + `<ellipse cx="200" cy="-20" rx="46" ry="12" fill="none" stroke="${GD}" stroke-width="9"/><ellipse cx="200" cy="-20" rx="46" ry="12" fill="none" stroke="#ffd84d" stroke-width="6"/><path d="M162,-24 Q180,-31 204,-31" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`;
  A("Auréole", "😇", "aura", 9, { head: halo, headB: halo });

  // ======================== COU ========================
  Z = "cou";
  const NK = "M180,172 Q200,202 220,172", NB = "M178,172 Q200,180 222,172";
  A("Collier de perles", "🤍", "collier", 4, { f: beads(NK, "#fffaf2"), b: beads(NB, "#fffaf2") });
  A("Foulard rouge", "🧣", "echarpe", 8, { f: P("M178,160 Q200,172 222,160 L228,176 Q200,194 172,176Z", "#e5484d") + P("M206,180 L224,214 L210,208 L202,216 L198,184Z", "#d13a42") + N("M184,168 Q200,178 216,168 M208,188 L212,202", "#a82533", 1.5) + C(206, 182, 5, "#f06a6e"), b: P("M178,160 Q200,168 222,160 L228,176 Q200,186 172,176Z", "#e5484d") + N("M182,170 Q200,176 218,170", "#a82533", 1.5) });
  A("Ras-de-cou velours", "🖤", "rasducou", 3, { f: strap("M185,160 Q200,168 215,160", "#3a2c44", 6) + heart(200, 168, 4.6, "#f0567c"), b: strap("M185,160 Q200,166 215,160", "#3a2c44", 6) });
  const pend = (c, inner) => ({ f: N("M182,174 Q190,192 200,200 Q210,192 218,174", "#8f5a0c", 2.6) + N("M182,174 Q190,192 200,200 Q210,192 218,174", "#fbd25e", 1.5) + inner, b: N(NB, "#fbd25e", 1.8) });
  A("Pendentif cœur", "💖", "collier", 4, pend(0, heart(200, 207, 8)));
  A("Pendentif étoile", "🌟", "collier", 4, pend(0, star(200, 208, 9)));
  const knitS = fill => ({ f: P("M174,156 Q200,172 226,156 Q234,172 226,184 Q200,200 174,184 Q166,172 174,156Z", fill, "#6b4a30", 2) + P("M210,186 L228,182 L234,240 L214,243Z", fill, "#6b4a30", 2) + [216, 221, 226, 231].map(x => N(`M${x},241 v10`, "#6b4a30", 1.6)).join("") + N("M178,172 Q200,186 222,172", "#6b4a30", 1.3, 'opacity=".5"'), b: P("M174,156 Q200,166 226,156 Q234,172 226,184 Q200,194 174,184 Q166,172 174,156Z", fill, "#6b4a30", 2) });
  A("Écharpe tricotée", "🧶", "echarpe", 8, knitS("url(#pKnit)"));
  A("Médaille d'or", "🏅", "collier", 5, { f: P("M178,172 L186,170 L205,216 L198,222Z", "#3f6fd8") + P("M222,172 L214,170 L195,216 L202,222Z", "#e5484d") + C(200, 228, 14, GO, GD, 2) + C(200, 228, 10, "#fde08a", GD, 1) + star(200, 228, 7) + spark(194, 221, 4), b: strap("M178,170 Q200,178 222,170", "#3f6fd8", 5) });
  A("Nœud papillon", "🎀", "collier", 6, { f: bow(200, 174, 12, "#7a5cd6"), b: strap("M184,166 Q200,172 216,166", "#7a5cd6", 4) });
  A("Cravate d'étudiante", "👔", "collier", 6, { f: strap("M183,164 Q200,182 217,164", "#fff8ee", 5) + P("M193,176 L207,176 L204,186 L212,234 L200,248 L188,234 L196,186Z", "url(#pStripeNavy)", "#1f3361") + P("M193,172 L207,172 L205,184 L195,184Z", "#2f4a86"), b: strap("M184,166 Q200,172 216,166", "#fff8ee", 5) });
  A("Collier hawaïen", "🌺", "collier", 7, { f: [[176, 178, "#ff7aa8"], [180, 194, "#ffd166"], [189, 207, "#ff9a5c"], [200, 213, "#f55f8e"], [211, 207, "#c78af0"], [220, 194, "#ff7aa8"], [224, 178, "#ffd166"]].map(([x, y, c]) => flower(x, y, 10, c, "#fff3b0")).join(""), b: [[178, 174, "#ff7aa8"], [189, 180, "#ffd166"], [200, 182, "#c78af0"], [211, 180, "#ff9a5c"], [222, 174, "#ff7aa8"]].map(([x, y, c]) => flower(x, y, 9, c, "#fff3b0")).join("") });
  A("Stéthoscope", "🩺", "echarpe", 8, { f: N("M177,166 C168,184 166,206 170,226 M223,166 C232,186 234,206 230,226", "#1f4f58", 6.4) + N("M177,166 C168,184 166,206 170,226 M223,166 C232,186 234,206 230,226", "#4a97a3", 4) + N("M172,168 Q176,160 184,158 M228,168 Q224,160 216,158", "#1f4f58", 6.4) + N("M172,168 Q176,160 184,158 M228,168 Q224,160 216,158", "#4a97a3", 4) + P("M165,224 h10 v7 h-10Z", "#3a4560") + N("M167,231 C162,240 160,246 161,254 M173,231 C177,240 179,246 178,254", "#8f9ab0", 3.4) + C(161, 256, 3.6, "#3a3440") + C(178, 256, 3.6, "#3a3440") + C(230, 236, 10.5, "url(#gSilver)", "#56627a", 2) + C(230, 236, 6, "#eef3fa", "#56627a", 1.2) + N("M226,232 q3,-3 6,-2", "#fff", 1.8), b: N("M180,160 Q200,176 220,160", "#1f4f58", 7) + N("M180,160 Q200,176 220,160", "#4a97a3", 4.4) });
  A("Pendentif petit os", "🦴", "collier", 4, pend(0, `<g transform="rotate(-18 200 208)">${P("M190,204 a4,4 0 1 1 3,-4 h14 a4,4 0 1 1 3,4 a4,4 0 1 1 -3,8 h-14 a4,4 0 1 1 -3,-8Z", "#fffaf0", "#a8957c", 1.5)}</g>`));
  A("Jabot de dentelle", "🤍", "collier", 6, { f: P("M184,164 Q200,176 216,164 L220,176 Q226,190 214,194 Q222,208 210,212 Q214,226 200,230 Q186,226 190,212 Q178,208 186,194 Q174,190 180,176Z", "#fffdf8", "#b5a693") + N("M186,194 Q200,202 214,194 M190,212 Q200,218 210,212 M200,180 V226", "#d8cbb8", 1.4) + gem(200, 178, 6, "#5bb8f5", "#215f94"), b: strap("M184,166 Q200,172 216,166", "#fffdf8", 6) });
  const claud = P("M185,162 Q191,175 200,178 Q197,193 180,191 Q168,188 171,177 Q180,173 185,162Z", "#fffdf8", "#b5a693") + P("M215,162 Q209,175 200,178 Q203,193 220,191 Q232,188 229,177 Q220,173 215,162Z", "#fffdf8", "#b5a693");
  A("Col Claudine", "👗", "echarpe", 7, { f: claud + N("M174,184 Q184,189 194,183 M226,184 Q216,189 206,183", "#f9a8c9", 1.5) + bow(200, 180, 5.5, "#f0567c"), b: P("M183,164 Q200,172 217,164 Q228,176 234,184 Q200,202 166,184 Q172,176 183,164Z", "#fffdf8", "#b5a693") + N("M174,184 Q200,196 226,184", "#f9a8c9", 1.6) });
  A("Clochette", "🔔", "rasducou", 3, { f: strap("M185,160 Q200,168 215,160", "#e5484d", 6) + C(200, 174, 8, GO, GD, 1.7) + N("M192,174 H208 M200,178 V182", GD, 1.6) + C(200, 178, 1.6, GD, ""), b: strap("M185,160 Q200,166 215,160", "#e5484d", 6) + bow(200, 166, 7, "#e5484d") });
  A("Perles arc-en-ciel", "🌈", "collier", 4, { f: [["#ff6b8b", 180, 176], ["#ffa552", 183.5, 185], ["#ffe066", 190, 192], ["#6fdc8c", 200, 195], ["#5db7f5", 210, 192], ["#b18cf2", 216.5, 185], ["#ff8fd0", 220, 176]].map(([c, x, y]) => C(x, y, 5, c) + C(x - 1.4, y - 1.6, 1.3, "#fff", "")).join(""), b: beads(NB, "#ffa552") });
  A("Pendentif lune", "🌙", "collier", 4, pend(0, P("M204,198 A10,10 0 1 0 210,212 A8,8 0 0 1 204,198Z", SI, SD, 1.5) + star(206, 206, 3.4)));
  A("Écharpe rayée", "🧣", "echarpe", 8, knitS("url(#pStripePink)"));
  A("Grosse chaîne dorée", "⛓️", "collier", 5, { f: `<path d="M178,172 Q200,216 222,172" fill="none" stroke="${GD}" stroke-width="8" stroke-dasharray="7 3"/><path d="M178,172 Q200,216 222,172" fill="none" stroke="#fbc93d" stroke-width="5" stroke-dasharray="7 3"/>` + C(200, 204, 9, GO, GD, 1.8) + `<text x="200" y="208" text-anchor="middle" font-size="11" font-weight="900" fill="${GD}" font-family="Nunito,sans-serif">A</text>`, b: `<path d="${NB}" fill="none" stroke="#fbc93d" stroke-width="5" stroke-dasharray="7 3"/>` });
  A("Rivière de diamants", "💎", "collier", 5, { f: [[178, 176, 5], [183, 187, 5.5], [191, 196, 6], [200, 200, 8.5], [209, 196, 6], [217, 187, 5.5], [222, 176, 5]].map(([x, y, s]) => gem(x, y, s)).join("") + spark(200, 192, 6) + spark(183, 182, 4), b: beads(NB, "#bfeaff", 4) });

  // ======================== ÉPAULE ========================
  Z = "epaule";
  const tape = (d, c) => N(d, dk(c, .3), 9.4) + N(d, c, 7.6) + N(d, lt(c, .35), 1.2, 'stroke-dasharray="3 4" opacity=".8"');
  A("Kinésio rose", "🩹", "epaule-peau", 2, { arm: tape("M-14,-8 Q-4,14 -4,36", "#ff6fa8") + tape("M10,-12 Q6,12 0,36", "#ff8fbe") });
  A("Kinésio bleu", "🩹", "epaule-peau", 2, { arm: tape("M-16,-2 Q0,8 14,0", "#3fa9e8") + tape("M-2,-18 Q-2,10 -2,34", "#5fc0f5") });
  const pauldron = (c, st) => P("M-27,10 C-30,-18 -12,-31 4,-30 C20,-28 26,-12 24,6 Q0,-4 -27,10Z", c, st, 2);
  A("Épaulière de sport", "🏈", "epaule", 6, { arm: pauldron("#3f5fae") + N("M-22,0 Q0,-14 21,-2", "#fff", 2.6) + star(-1, -17, 6) });
  A("Épaulettes dorées", "⭐", "epaule", 6, { arm: P("M-26,-4 C-24,-22 -8,-29 4,-28 C18,-26 24,-14 23,-2 Q0,-12 -26,-4Z", GO, GD, 1.9) + [-23, -17, -11, -5, 1, 7, 13, 19].map(x => N(`M${x},${-4 - (1 - Math.abs(x) / 24) * 4} v15`, GD, 4) + N(`M${x},${-4 - (1 - Math.abs(x) / 24) * 4} v15`, "#fcd45c", 2.6)).join("") + star(-1, -17, 5.5, "#fff3c4") });
  A("Tatouage papillon", "🦋", "epaule-peau", 2, { arm: butter(-2, 4, 1, "#8f7bea") });
  A("Tatouage fleur", "🌸", "epaule-peau", 2, { arm: N("M-2,12 Q-8,20 -4,30 M-4,20 q8,-4 9,2", "#4f9a63", 1.8) + flower(-2, 4, 10, "#ff9fc0") });
  const puff = (c, st) => P("M-27,12 C-36,-20 -14,-34 4,-32 C24,-30 34,-10 24,14 Q12,20 0,18 Q-14,20 -27,12Z", c, st, 2) + N("M-18,12 Q-20,-6 -10,-20 M-4,16 Q-4,-6 2,-24 M12,15 Q14,-4 12,-18", st, 1.2, 'opacity=".45"') + P("M-21,11 Q0,22 20,12 L19,19 Q0,28 -20,19Z", c, st, 1.6);
  A("Manches bouffantes blanches", "👗", "manche", 5, { arm: puff("#fffdf8", "#b5a693") });
  A("Manches bouffantes lilas", "💜", "manche", 5, { arm: puff("#cdb4f6", "#7a5cb5") });
  A("Épaulière de chevalière", "🛡️", "epaule", 6, { arm: P("M-28,14 C-34,-20 -14,-34 4,-33 C24,-31 30,-10 26,12 Q0,0 -28,14Z", SI, SD, 2) + P("M-28,14 Q0,0 26,12 L24,20 Q0,9 -26,22Z", "#aab6c9", SD, 1.7) + N("M-20,-10 Q0,-22 20,-10", SD, 1.4) + C(-18, 3, 2, "#eef3fa", SD, 1) + C(18, 1, 2, "#eef3fa", SD, 1) + gem(0, -14, 6, "#ef4b6c", "#8f1a38") });
  A("Nœuds satin", "🎀", "epaule", 6, { arm: bow(-2, -16, 12, "#ff8fb0") + P("M-4,-12 L-12,12 L-6,8Z M0,-12 L6,14 L8,6Z", "#ff8fb0") });
  A("Perroquet sur l'épaule", "🦜", "ami", 8, { single: 1, arm: `<g transform="rotate(-14) translate(-4 -24)">` + P("M8,-6 Q20,18 10,34 Q4,18 -4,6Z", "#3f7fe0") + P("M-12,4 C-16,-22 -6,-36 4,-34 C16,-32 18,-12 12,6 Q0,14 -12,4Z", "#34b56a") + P("M-6,6 Q-4,-12 6,-10 Q12,0 4,8Z", "#ffd84d") + C(0, -24, 4.6, "#fff", "#1d6b3c") + C(-.6, -24, 2, "#2b1a24", "") + P("M-9,-25 Q-18,-22 -14,-13 Q-9,-16 -7,-19Z", "#f59a3c") + N("M-4,8 v5 M3,8 v5", "#c9751c", 2.2) + `</g>` });
  A("Hamster sur l'épaule", "🐹", "ami", 8, { single: 1, arm: `<g transform="rotate(-14) translate(-2 -28)">` + C(-11, -12, 5, "#f3c17f") + C(11, -12, 5, "#f3c17f") + E(0, 0, 17, 15, "#f7cf94") + E(0, 6, 11, 8, "#fff6e6", "") + C(-6, -3, 2.4, "#2b1a24", "") + C(6, -3, 2.4, "#2b1a24", "") + C(-6.7, -3.8, .8, "#fff", "") + C(5.3, -3.8, .8, "#fff", "") + E(0, 1, 2, 1.4, "#f0768c", "") + C(-11, 3, 2.6, "#ffb3b3", "") + C(11, 3, 2.6, "#ffb3b3", "") + `</g>` });
  A("Écusson étoile", "🌟", "epaule-peau", 4, { arm: P("M-12,-6 H10 V8 Q10,18 -1,22 Q-12,18 -12,8Z", "#3f5fae") + star(-1, 6, 8) });
  A("Volants fleuris", "🌼", "manche", 5, { arm: P("M-26,6 C-28,-18 -12,-30 4,-29 C20,-27 27,-12 25,6 Q20,16 13,9 Q8,18 0,11 Q-7,19 -13,11 Q-22,17 -26,6Z", "url(#pFlowers)", "#b5825a", 1.9) });
  A("Épaules à plumes", "🪶", "epaule", 6, { arm: [[62, 0], [-62, 4], [32, 1], [-32, 3], [0, 2]].map(([a, i]) => `<g transform="translate(0 -20) rotate(${a})">${P("M0,0 Q12,16 0,42 Q-12,16 0,0Z", ["#8fd6f5", "#c4b5fd", "#f9a8d4", "#c4b5fd", "#8fd6f5"][i])}${N("M0,6 V36", "#fff", 1.3)}</g>`).join("") + C(0, -20, 5, GO, GD) });
  A("Fleur d'hibiscus", "🌺", "epaule", 6, { single: 1, arm: flower(-2, -8, 19, "#f5486f", "#ffd84d") + N("M-2,-8 L6,-18", "#ffd84d", 2.4) + E(16, 4, 9, 4, "#4fa864", "#2c6b3c", 1.3, 'transform="rotate(30 16 4)"') });
  A("Épaulière de cristal", "💠", "epaule", 6, { arm: P("M-25,8 L-28,-14 L-16,-12 L-12,-34 L0,-18 L10,-36 L15,-14 L28,-14 L24,6 Q0,-4 -25,8Z", CR, CD, 1.8) + N("M-12,-34 L-8,-4 M10,-36 L6,-5 M0,-18 V-4", "#fff", 1.3) + spark(-18, -16, 5) + spark(18, -18, 5) });
  A("Patch chauffant", "🔥", "epaule-peau", 2, { arm: R(-13, -10, 22, 26, 6, "#f9d7b0", "#b5825a") + `<g transform="translate(-2 4) scale(.62)">${P("M0,-14 C8,-6 10,0 8,7 C6,14 -6,14 -8,7 C-9,1 -4,0 -4,-6 C-1,-4 0,-2 1,1 C3,-4 2,-9 0,-14Z", "url(#gFlame)", "#b5401c", 2)}</g>` });
  A("Manches étoilées", "🌌", "manche", 5, { arm: P(sleeve(40, 4), "url(#pStars)", "#1d2558", 2) + P(armSeg(34, 41, 4.4), "#ffd84d", GD, 1.3) });
  const aw = P("M-4,-8 C-26,-40 -58,-38 -62,-20 C-52,-22 -48,-18 -50,-12 C-58,-12 -58,-2 -52,2 C-46,0 -42,2 -42,7 C-30,12 -14,8 -4,-2Z", "url(#gWing)", "#8c9cc4", 1.8) + N("M-14,-10 Q-34,-26 -54,-20 M-12,-4 Q-30,-12 -46,-9 M-10,0 Q-26,2 -40,3", "#b3c2e6", 1.4);
  A("Ailettes d'ange", "🕊️", "epaule", 6, { arm: `<g transform="translate(-4 -6)">${aw}</g>` + C(-3, -10, 5, GO, GD) });

  // ======================== THORAX ========================
  Z = "thorax";
  const SIDE_L = "C266,196 264,206 260,214 C256,226 252,240 249,252 C247,264 246,274 247,285", SIDE_R = "C153,274 154,264 151,252 C148,240 144,226 140,214 C136,206 134,196 142,187";
  const shirtF = (neck, c, st) => P(`${neck} L258,187 ${SIDE_L} Q200,297 153,285 ${SIDE_R} Z`, c, st, 2);
  const N_ROUND = "M168,181 Q176,202 200,202 Q224,202 232,181", N_V = "M170,180 L200,218 L230,180", N_BACK = "M168,181 Q182,190 200,190 Q218,190 232,181", N_HIGH = "M180,174 Q200,184 220,174 Q226,179 232,181";
  const body3 = `<path d="M142,187 ${"C134,196 136,206 140,214"} C144,226 148,240 151,252 C154,264 153,274 153,285 L166,288 C164,262 158,236 152,214Z" fill="#000" opacity=".07"/>` + `<path d="M234,200 C236,230 234,262 232,290 L247,286 C246,274 247,264 249,252 C254,238 260,222 262,206Z" fill="#000" opacity=".08"/>`;
  const tee = (c, st, deco = "", decoB = "", sl = 46, neck = N_ROUND) => ({ f: shirtF(neck, c, st) + body3 + N(neck.replace(/^M/, "M"), st, 3.2) + deco, b: shirtF(N_BACK, c, st) + body3 + decoB, arm: sl ? P(sleeve(sl, 3.2), c, st, 2) + shine(sleeve(sl, 3.2)) : "" });
  const tank = (c, st, deco = "", decoB = "") => ({ f: P(`M164,181 L178,178 C180,200 190,208 200,208 C210,208 220,200 222,178 L236,181 C236,200 244,214 254,222 C252,246 246,266 247,285 Q200,297 153,285 C154,266 148,246 146,222 C156,214 164,200 164,181Z`, c, st, 2) + body3.replace(/M142,187[^Z]*Z/, "M146,222 C148,246 154,266 153,285 L164,288 C162,262 156,240 152,218Z") + deco, b: P(`M164,181 L178,178 C182,192 190,198 200,198 C210,198 218,192 222,178 L236,181 C236,200 244,214 254,222 C252,246 246,266 247,285 Q200,297 153,285 C154,266 148,246 146,222 C156,214 164,200 164,181Z`, c, st, 2) + decoB });
  A("Débardeur bleu", "🎽", "haut", 4, tank("#5cc0f2", "#24719c", `<text x="200" y="258" text-anchor="middle" font-size="30" font-weight="900" fill="#fff" font-family="Nunito,sans-serif">19</text>`, `<text x="200" y="256" text-anchor="middle" font-size="30" font-weight="900" fill="#fff" font-family="Nunito,sans-serif">19</text>`));
  A("Marinière", "⚓", "haut", 4, tee("url(#pStripeNavy)", "#22386b"));
  A("T-shirt cœur", "❤️", "haut", 4, tee("#ffe3ec", "#b5567c", heart(200, 240, 17)));
  A("Chemise à carreaux", "👕", "haut", 4, tee("url(#pPlaid)", "#5f1428", P("M180,178 L200,200 L220,178 L228,190 L210,206 L200,200 L190,206 L172,190Z", "url(#pPlaid)", "#5f1428") + N("M200,202 V290", "#5f1428", 1.6) + [216, 236, 256, 276].map(y => C(200, y, 2.4, "#fff3d0", "#7a5a2a")).join(""), "", 70, N_V));
  const coat = { f: P(`M170,180 L196,232 L192,290 Q172,291 153,286 ${SIDE_R} Z`, "#ffffff", "#8fa0b8", 2) + P(`M230,180 L204,232 L208,290 Q228,291 247,286 C246,274 247,264 249,252 C252,240 256,226 260,214 C264,206 266,196 258,187Z`, "#ffffff", "#8fa0b8", 2) + P("M170,180 L160,196 L176,206 L170,214 L196,234Z M230,180 L240,196 L224,206 L230,214 L204,234Z", "#eef3fa", "#8fa0b8", 1.6) + R(214, 244, 24, 22, 3, "#f4f8fd", "#8fa0b8") + N("M220,240 v12", "#3f6fd8", 3) + N("M228,240 v10", "#e5484d", 3) + P("M162,246 h22 v10 h-22Z", "#d9f0ee", "#4f9a94", 1.2) + `<text x="173" y="254" text-anchor="middle" font-size="8" font-weight="900" fill="#1f6f69" font-family="Nunito,sans-serif">KINÉ</text>`, b: shirtF(N_BACK, "#ffffff", "#8fa0b8") + body3 + N("M200,196 V290", "#c5d0de", 1.6) + R(176, 262, 48, 10, 4, "#eef3fa", "#8fa0b8"), arm: P(sleeve(150, 3.6), "#ffffff", "#8fa0b8", 2) + shine(sleeve(150, 3.6)) + N("M-14,146 Q0,152 13,146", "#c5d0de", 1.5) };
  A("Blouse de kiné", "🥼", "haut", 4, coat);
  A("Pull en maille", "🧶", "haut", 4, { ...tee("url(#pKnit)", "#8a6234", "", "", 148, N_ROUND), armx: 1 });
  const ribs = [214, 228, 242, 256, 270].map((y, i) => N(`M196,${y} Q176,${y - 8} ${166 - i},${y + 8} M204,${y} Q224,${y - 8} ${234 + i},${y + 8}`, "#f4f1ea", 4.2)).join("") + N("M200,208 V274", "#f4f1ea", 6) + N("M178,198 Q190,206 198,206 M222,198 Q210,206 202,206", "#f4f1ea", 4);
  A("T-shirt cage thoracique", "🩻", "haut", 4, tee("#3a3350", "#1a1528", ribs, N("M200,196 V284", "#f4f1ea", 6) + [212, 228, 244, 260].map(y => N(`M192,${y} Q172,${y + 2} 164,${y + 12} M208,${y} Q228,${y + 2} 236,${y + 12}`, "#f4f1ea", 4)).join("")));
  A("Veste en jean", "👖", "haut", 4, { f: P(`M168,181 L192,212 L190,290 Q172,291 153,286 ${SIDE_R} Z`, "url(#pDenim)", "#2f4f80", 2) + P(`M232,181 L208,212 L210,290 Q228,291 247,286 C246,274 247,264 249,252 C252,240 256,226 260,214 C264,206 266,196 258,187Z`, "url(#pDenim)", "#2f4f80", 2) + P("M168,181 L156,196 L178,204 L192,212Z M232,181 L244,196 L222,204 L208,212Z", "#7ea3d6", "#2f4f80", 1.6) + R(160, 222, 22, 18, 3, "#7ea3d6", "#2f4f80") + R(218, 222, 22, 18, 3, "#7ea3d6", "#2f4f80") + N("M160,228 H182 M218,228 H240", "#f3b04a", 1.4) + [222, 244, 266].map(y => C(187, y, 2.2, "#f3b04a", "#8a5a10")).join(""), b: shirtF(N_BACK, "url(#pDenim)", "#2f4f80") + N("M150,216 Q200,228 250,216 M176,222 L180,288 M224,222 L220,288", "#f3b04a", 1.5) + star(200, 256, 14), arm: P(sleeve(150, 3.4), "url(#pDenim)", "#2f4f80", 2) + P(armSeg(140, 152, 4.4), "#7ea3d6", "#2f4f80", 1.6) });
  A("Sweat lavande", "💜", "haut", 4, tee("#c9b5f5", "#7357b8", P("M170,178 Q200,214 230,178 Q238,188 232,198 Q200,226 168,198 Q162,188 170,178Z", "#b79ff0", "#7357b8") + N("M190,208 v22 M210,208 v22", "#fff", 2.2) + `<g transform="translate(200 254)">${smile(0, 0, 13)}</g>`, P("M170,178 Q200,188 230,178 Q238,220 200,228 Q162,220 170,178Z", "#b79ff0", "#7357b8"), 150));
  A("Broche fleur", "🌼", "broche", 8, { f: flower(226, 206, 11, "#ffd1e0", "#f5a623") + E(236, 216, 6, 2.8, "#6fb86f", "#3a7a42", 1, 'transform="rotate(40 236 216)"') });
  A("Badge « Future kiné »", "📛", "broche", 8, { f: R(210, 204, 34, 22, 5, "#fff", "#4f9a94") + R(210, 204, 34, 8, 4, "#3fb5a8", "#4f9a94", 1) + heart(217, 219, 4) + N("M224,217 H239 M224,221 H235", "#8fa0b8", 1.8) });
  A("Emblème de super-héroïne", "🦸", "broche", 7, { f: P("M172,212 H228 L238,228 L200,274 L162,228Z", GO, GD, 2.4) + P("M176,218 H224 L231,228 L200,265 L169,228Z", "#e5484d", "#8f1f2c", 1.4) + `<text x="200" y="248" text-anchor="middle" font-size="30" font-weight="900" fill="#fde08a" font-family="Nunito,sans-serif">A</text>` });
  A("Cœur qui brille", "💓", "broche", 8, { f: `<circle cx="222" cy="232" r="26" fill="url(#gGlow)"/>` + heart(222, 230, 13, "#ff4b6e") + spark(236, 218, 5) + spark(210, 246, 4) });
  A("Top à sequins", "🪩", "haut", 4, tank("url(#pSequin)", "#8f2a66", spark(180, 236, 6) + spark(222, 256, 7) + spark(214, 222, 4)));
  A("Kimono de judo", "🥋", "haut", 4, { f: shirtF(N_V, "#fffdf8", "#a89a86") + P("M170,180 L178,178 L214,240 L240,287 L226,290 L196,236Z", "#f1e9dc", "#a89a86", 1.7) + P("M230,180 L222,178 L186,240 L166,287 L178,290 L204,240Z", "#fffdf8", "#a89a86", 1.7), b: shirtF(N_BACK, "#fffdf8", "#a89a86") + body3, arm: P(sleeve(116, 6, 5), "#fffdf8", "#a89a86", 2) + shine(sleeve(116, 6, 5)) });
  A("Armure dorée", "⚔️", "haut", 4, { f: shirtF(N_ROUND, GO, GD) + N("M200,204 V290 M152,250 Q200,268 248,250 M153,270 Q200,286 247,270", GD, 1.8) + P("M162,206 Q180,200 194,216 Q190,242 170,240 Q158,226 162,206Z M238,206 Q220,200 206,216 Q210,242 230,240 Q242,226 238,206Z", "#fde39a", GD, 1.6) + gem(200, 214, 8, "#5bb8f5", "#215f94") + spark(172, 214, 6) + spark(232, 270, 5), b: shirtF(N_BACK, GO, GD) + N("M200,192 V290 M152,240 Q200,254 248,240", GD, 1.8) });
  A("Chemisier à nœud", "🎀", "haut", 4, tee("#fffaf2", "#b59d83", N("M200,206 V290", "#d8c8b2", 1.5) + [236, 256, 276].map(y => C(200, y, 2.2, "#f9a8c9", "#b5567c")).join("") + P("M196,208 L180,244 L192,240 L200,216Z M204,208 L220,244 L208,240 L200,216Z", "#ff9fc0") + bow(200, 206, 14, "#ff9fc0"), "", 60, N_HIGH));
  A("Pull de Noël", "🎄", "haut", 4, tee("url(#pKnitRed)", "#6f1522", `<rect x="150" y="214" width="100" height="10" fill="#fff6ea" opacity=".95"/>` + N("M152,219 l5,-3 5,3 5,-3 5,3 5,-3 5,3 5,-3 5,3 5,-3 5,3 5,-3 5,3 5,-3 5,3 5,-3 5,3 5,-3 5,3 5,-3", "#2f7a5c", 1.8) + P("M200,230 L214,250 H207 L219,268 H181 L193,250 H186Z", "#2f8a5c") + R(196, 268, 8, 8, 1, "#8a5a2a") + star(200, 229, 6) + C(194, 258, 2.4, "#ffd84d") + C(207, 262, 2.4, "#ff6b8b") + C(201, 247, 2.2, "#5bb8f5"), "", 150));
  A("Gilet cardigan", "🌿", "gilet", 6, { f: P(`M168,181 C176,206 188,226 190,250 L188,291 Q170,291 153,286 ${SIDE_R} Z`, "#8fcaa4", "#3f7a56", 2) + P(`M232,181 C224,206 212,226 210,250 L212,291 Q230,291 247,286 C246,274 247,264 249,252 C252,240 256,226 260,214 C264,206 266,196 258,187Z`, "#8fcaa4", "#3f7a56", 2) + [238, 256, 274].map(y => C(185, y, 2.6, "#fff3d0", "#8a6a3a")).join("") + R(160, 252, 18, 18, 3, "#a5d9b8", "#3f7a56") + R(222, 252, 18, 18, 3, "#a5d9b8", "#3f7a56"), b: shirtF(N_BACK, "#8fcaa4", "#3f7a56") + body3, arm: P(sleeve(148, 3.8), "#8fcaa4", "#3f7a56", 2) + shine(sleeve(148, 3.8)) + P(armSeg(140, 151, 4.2), "#78b890", "#3f7a56", 1.5) });
  A("Top galaxie", "🌌", "haut", 4, tank(GX, GXD, spark(176, 240, 6) + spark(224, 226, 5) + spark(214, 266, 7, "#ffe27a")));

  // ======================== BRAS ========================
  Z = "bras";
  A("Brassard musique", "🎵", "bras", 4, { arm: arm(40, 60, "#2f9fe0") + R(-8, 41, 15, 18, 3, "#1f2a44") + `<text x="-1" y="55" text-anchor="middle" font-size="12" fill="#8fe0ff">♪</text>` });
  A("Tatouage cœur", "💘", "bras-peau", 2, { arm: heart(-2, 50, 10) + N("M-14,58 L10,42 M10,42 l-5,0 M10,42 l-1,5", "#7a2a48", 1.8) });
  A("Tatouage branche", "🌿", "bras-peau", 2, { arm: N("M4,30 Q-8,48 0,74", "#4f8a5c", 2) + [[0, 38, 40], [-5, 46, -40], [2, 54, 40], [-6, 60, -40], [3, 68, 40]].map(([x, y, a]) => E(x, y, 5.5, 2.6, "#7cc48a", "#3f7a4c", 1, `transform="rotate(${a} ${x} ${y})"`)).join("") });
  const coil = (c, d, y) => N(`M-16,${y} Q0,${y + 12} 14,${y + 3} M-16,${y + 12} Q0,${y + 24} 14,${y + 15}`, d, 6) + N(`M-16,${y} Q0,${y + 12} 14,${y + 3} M-16,${y + 12} Q0,${y + 24} 14,${y + 15}`, c, 3.8);
  A("Serpent doré", "🐍", "bras", 4, { arm: coil("#fbc93d", GD, 36) + E(12, 39, 5, 3.6, "#fbc93d", GD) + C(13, 38, 1, "#e5484d", "") });
  A("Kinésio biceps", "🩹", "bras-peau", 2, { arm: tape("M-9,28 Q-12,52 -5,76", "#46c07a") + tape("M8,28 Q10,52 4,76", "#62d492") });
  A("Brassard de capitaine", "©️", "bras", 4, { arm: arm(38, 58, "#e5484d") + N("M-16,42 Q0,48 14,42 M-15,55 Q0,61 13,55", "#fff", 1.8) + `<text x="-1" y="55" text-anchor="middle" font-size="14" font-weight="900" fill="#fff" font-family="Nunito,sans-serif">C</text>` });
  A("Longs gants satin", "🧤", "bras", 3, { arm: P(armSeg(44, 172, 1.8) + " " + handPath(1.6), "#f7b6d0", "#a84f7c", 1.8) + shine(armSeg(44, 172, 1.8)) + arm(44, 52, "#ffe0ec", 2.4, "#a84f7c") });
  A("Ruban satin", "🎀", "bras", 4, { arm: arm(46, 56, "#b48cf2") + bow(-1, 52, 9, "#b48cf2") + P("M-4,56 L-9,74 L-3,70Z M2,56 L7,74 L8,66Z", "#b48cf2") });
  A("Tatouage étoiles", "✨", "bras-peau", 2, { arm: star(-4, 36, 6, "#8f7bea", "#4f3fa8") + star(4, 50, 8, "#8f7bea", "#4f3fa8") + star(-5, 64, 5, "#8f7bea", "#4f3fa8") + spark(6, 36, 4, "#f0a8d0") });
  A("Tensiomètre", "🩺", "bras", 4, { arm: arm(34, 70, "#3d5f8f") + N("M-16,40 Q0,46 14,40 M-15,66 Q0,73 13,66", "#8fb0dc", 1.4) + C(-1, 54, 9, "#fff", SD, 2) + N("M-1,54 L3,48", "#e5484d", 2) + N("M-7,56 q1,-8 6,-8", "#8fa0b8", 1.2) });
  A("Brassard fleuri", "🌸", "bras", 4, { arm: N("M-17,48 Q0,58 15,48", "#5fa35f", 4) + [[-13, 49, "#ff9fc0"], [-5, 53, "#fff"], [4, 53, "#c7a3f5"], [12, 49, "#ffd98a"]].map(([x, y, c]) => flower(x, y, 7, c)).join("") });
  A("Petit pansement vaccin", "💉", "bras-peau", 2, { arm: plaster(-3, 34, -10, "#f7c99a", 20, 9) + heart(-3, 34, 3) });
  A("Brassards fluo", "💡", "bras", 4, { arm: arm(38, 48, "#d7ff3f", 2.2, "#6f9a10") + arm(54, 64, "#ff5fd0", 2.2, "#9a1f78") });
  A("Brassards de natation", "🛟", "bras", 5, { arm: P("M-24,36 Q-30,52 -22,70 Q0,80 20,70 Q27,52 22,36 Q0,44 -24,36Z", "#ff8a3c", "#a84f10", 2) + `<ellipse cx="-12" cy="48" rx="4" ry="8" fill="#fff" opacity=".6"/>` + `<path d="M-24,36 Q0,28 22,36 Q0,44 -24,36Z" fill="#ffb07a" stroke="#a84f10" stroke-width="1.6"/>` + star(4, 58, 7, "#fff", "#a84f10") });
  A("Bracelets de perles", "🔮", "bras", 4, { arm: beads("M-16,42 Q0,50 14,42", "#7fd1e8", 4.6, 5) + beads("M-15,51 Q0,59 13,51", "#f7a1c9", 4.6, 5) });
  A("Brassard de cuir", "🏹", "bras", 4, { arm: arm(32, 70, "#9a6236") + N("M-5,36 L4,44 M4,36 L-5,44 M-5,46 L4,54 M4,46 L-5,54 M-5,56 L4,64 M4,56 L-5,64", "#f3d9b0", 1.7) });
  A("Guirlande de lierre", "🍃", "bras-peau", 4, { arm: N("M-17,30 Q0,42 15,38 M-16,46 Q0,58 14,52 M-15,62 Q0,72 13,66", "#4f8a5c", 2.6) + [[-10, 35], [6, 39], [-8, 51], [7, 54], [-6, 67], [6, 68]].map(([x, y]) => heart(x, y, 4.4, "#74c27f", "#2f6b3f")).join("") });
  A("Brassard de diamants", "💎", "bras", 4, { arm: arm(42, 58, SI, 2, SD) + gem(-1, 50, 8) + gem(-12, 48, 4) + gem(10, 48, 4) + spark(3, 44, 4) });
  A("Éclairs de puissance", "⚡", "bras-aura", 6, { arm: bolt(-28, 36, 1) + bolt(-25, 66, .75) });
  A("Bras de championne", "💪", "bras", 4, { arm: arm(36, 66, GO, 2.4, GD) + N("M-17,42 Q0,50 15,42 M-16,62 Q0,70 14,62", GD, 1.5) + star(-1, 53, 9, "#fff3c4") });

  // ======================== COUDE ========================
  Z = "coude";
  const pad = (c, st, deco = "", y0 = 74, y1 = 108) => arm(y0, y1, c, 2.6, st) + shine(armSeg(y0, y1, 2.6)) + deco;
  const pads = (c, cup, deco = "") => ({ arm: pad(c, undefined, N("M-16,79 Q0,87 15,79 M-16,104 Q0,112 15,104", lt(c, .4), 1.5) + E(-1, 92, 10, 11, cup) + deco) });
  A("Pansement", "🩹", "coude", 3, { arm: plaster(-1, 91, -24) });
  A("Coudière de skate", "🛹", "coude", 4, pads("#2c2740", "#ff6fa8", N("M-6,88 H4 M-6,92 H4 M-6,96 H4", "#a82a66", 1.5)));
  A("Coudière en cuir", "🤎", "coude", 4, { arm: heart(-1, 92, 12, "#a5683a") + N("M-10,90 Q-1,82 8,90", "#f3d9b0", 1.2, 'stroke-dasharray="2 2"') });
  A("Kinésio en croix", "🩹", "coude", 3, { arm: tape("M-11,76 L9,106", "#f5a33c") + tape("M9,76 L-11,106", "#ffbe6a") });
  A("Bandage", "🤕", "coude", 4, { arm: pad("#fbf3e4", "#b5a07f", N("M-16,84 L14,90 M-16,92 L14,98 M-16,100 L14,104 M-15,78 L14,82", "#d8c6a5", 1.5) + P("M4,95 l8,2 l-2,7 l-8,-2Z", "#fff", "#b5a07f", 1)) });
  A("Coudière fluo", "💚", "coude", 4, pads("#3d4257", "#c8ff4a", bolt(-1, 92, .5, "#fff")));
  A("Patch étoile", "⭐", "coude", 3, { arm: star(-1, 92, 13) + spark(-5, 87, 4) });
  A("Pansement rose étoilé", "🩷", "coude", 3, { arm: plaster(-1, 91, 18, "#ff9fc0", 24, 10) + star(-1, 91, 4.5, "#fff", "#c25a86") });
  A("Coudière fleurie", "🌸", "coude", 4, { arm: pad("url(#pFlowers)", "#b5825a") });
  A("Coudière arc-en-ciel", "🌈", "coude", 4, { arm: pad("url(#gRainbow)", "#7a5a8a") });
  A("Nœud au coude", "🎀", "coude", 4, { arm: arm(88, 95, "#ff8fb0") + bow(-1, 92, 10, "#ff8fb0") });
  A("Dentelle", "🤍", "coude", 4, { arm: pad("url(#pLace)", "#cbb8d6", beads("M-16,108 Q0,117 15,108", "#ffffff", 3.4, 4)) });
  A("Coudière de chevalière", "🛡️", "coude", 4, { arm: pad(SI, SD, P("M-20,92 L-26,90 L-18,82Z", SI, SD) + E(-1, 92, 10, 11, "#dbe4f0", SD) + gem(-1, 92, 5, "#ef4b6c", "#8f1a38")) });
  A("Sourire au coude", "🙂", "coude", 3, { arm: smile(-1, 92, 12) });
  A("Pansement dino", "🦕", "coude", 3, { arm: plaster(-1, 91, -10, "#9be0a5", 26, 12) + `<g transform="translate(-1 91) scale(.5)">${P("M-12,4 Q-12,-4 -2,-4 Q2,-4 4,-10 Q10,-14 12,-8 Q10,-5 7,-6 Q8,4 0,6 H-6Z", "#3f9a6b")}</g>` });
  A("Poche de glace", "🧊", "coude", 4, { arm: P("M-16,82 Q-20,104 -8,106 Q2,110 12,104 Q18,92 12,80 Q0,74 -16,82Z", "#bfe8fa", "#4a90b8", 1.8) + R(-9, 86, 9, 9, 2, "#e8f8ff", "#7fb8d8", 1) + R(1, 92, 9, 9, 2, "#e8f8ff", "#7fb8d8", 1) + R(-8, 97, 7, 7, 2, "#e8f8ff", "#7fb8d8", 1) + R(-7, 74, 12, 7, 3, "#3f7fd8") });
  A("Coudière léopard", "🐆", "coude", 4, { arm: pad("url(#pLeopard)", "#8a5a1c") });
  A("Coudière en or", "🏆", "coude", 4, { arm: pad(GO, GD, star(-1, 92, 10, "#fff3c4")) });
  A("Coudière galaxie", "🌌", "coude", 4, { arm: pad(GX, GXD, spark(-5, 88, 5) + spark(6, 99, 4, "#ffe27a")) });
  A("Coudière en diamant", "💎", "coude", 4, { arm: pad(CR, CD, N("M-16,82 L-1,92 L14,82 M-16,102 L-1,92 L14,102 M-1,78 V106", "#fff", 1.3) + gem(-1, 92, 8) + spark(8, 82, 5)) });

  // ======================== ABDOMEN ========================
  Z = "abdomen";
  const belt = (y, h, c, st, extra = "") => { const w = y < 300 ? 47 : y < 316 ? 49.5 : 52; return P(`M${200 - w},${y} Q200,${y + 10} ${200 + w},${y} L${200 + w + 1},${y + h} Q200,${y + h + 10} ${200 - w - 1},${y + h}Z`, c, st || FLX(c), 1.9) + extra; };
  const buckle = (x, y, w, h) => `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="3" fill="none" stroke="${GD}" stroke-width="5"/><rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="3" fill="none" stroke="#fbc93d" stroke-width="3"/>`;
  A("Ceinture en cuir", "🟤", "ceinture", 6, { f: belt(310, 12, "#8a5230", 0, buckle(200, 321, 18, 15)), b: belt(310, 12, "#8a5230") });
  A("Piercing au nombril", "💧", "nombril", 2, { f: gem(200, 312, 4.6, "#5bb8f5", "#215f94") + C(200, 304, 2, "#fff", "#8fa0b8") });
  const abs = N("M200,284 V318", "#a85f48", 2.2) + [[290, 3], [300, 3], [310, 3]].map(([y]) => N(`M184,${y} Q192,${y + 4} 199,${y} M201,${y} Q208,${y + 4} 216,${y}`, "#a85f48", 2)).join("") + N("M182,284 Q178,300 184,318 M218,284 Q222,300 216,318", "#a85f48", 1.8);
  A("Tablettes de chocolat", "🍫", "abdos", 1, { f: `<g opacity=".75">${abs}</g>` });
  A("Obi rose", "👘", "taille", 5, { f: belt(282, 30, "#f58ab0", 0, N("M154,300 Q200,310 246,300", "#ffe0ec", 5) + [[176, 300], [200, 303], [224, 300]].map(([x, y]) => flower(x, y, 7, "#fff")).join("")), b: belt(282, 30, "#f58ab0") + bow(200, 300, 22, "#f7a1c2") });
  A("Chaîne de taille", "⛓️", "ceinture", 4, { f: `<path d="M153,306 Q200,330 247,306" fill="none" stroke="${GD}" stroke-width="4.4" stroke-dasharray="5 2.4"/><path d="M153,306 Q200,330 247,306" fill="none" stroke="#fbd25e" stroke-width="2.6" stroke-dasharray="5 2.4"/>` + star(200, 322, 5) + heart(180, 319, 4) + heart(220, 319, 4), b: N("M153,306 Q200,318 247,306", "#fbd25e", 2.6) });
  A("Ceinture noire", "🥋", "ceinture", 6, { f: belt(300, 13, "#2c2740", 0, P("M194,314 L180,352 L190,354 L200,320Z M206,314 L218,352 L208,354 L200,320Z", "#2c2740", "#14101f") + R(192, 306, 16, 13, 4, "#3a3450", "#14101f") + N("M183,346 l7,2 M217,346 l-7,2", "#fbc93d", 2)), b: belt(300, 13, "#2c2740") });
  A("Corset", "🎭", "taille", 5, { f: P("M152,270 Q200,282 248,270 C246,288 248,304 251,322 Q200,336 149,322 C152,304 154,288 152,270Z", "#9b4f86", "#5a2350", 2) + N("M176,276 Q174,300 172,328 M224,276 Q226,300 228,328", "#5a2350", 1.6) + [282, 292, 302, 312].map(y => N(`M194,${y} L206,${y + 8} M206,${y} L194,${y + 8}`, "#fff0fa", 1.6)).join("") + bow(200, 328, 7, "#ffb3d6"), b: P("M152,270 Q200,282 248,270 C246,288 248,304 251,322 Q200,336 149,322 C152,304 154,288 152,270Z", "#9b4f86", "#5a2350", 2) });
  A("Ceinture lombaire", "🩻", "taille", 5, { f: belt(282, 34, "#e8e0d2", "#9a8c74", R(178, 290, 44, 22, 6, "#d3c8b4", "#9a8c74") + `<text x="200" y="306" text-anchor="middle" font-size="11" font-weight="900" fill="#6b5f4a" font-family="Nunito,sans-serif">L1–L5</text>`), b: belt(280, 38, "#e8e0d2", "#9a8c74", [184, 200, 216].map(x => N(`M${x},288 v32`, "#9a8c74", 3)).join("")) });
  const duck = { f: P("M126,308 Q124,286 160,288 Q200,300 240,288 Q276,286 274,308 Q272,334 200,338 Q128,334 126,308Z", "#ffd84d", "#b5830f", 2.2) + `<path d="M140,300 Q160,294 180,300" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/>` + P("M206,308 C200,284 214,268 230,270 C248,272 252,292 244,304 C240,314 216,318 206,308Z", "#ffd84d", "#b5830f", 2) + C(228, 286, 3.2, "#2b1a24", "") + C(227, 285, 1, "#fff", "") + P("M243,286 Q262,286 260,294 Q250,298 243,295Z", "#ff9a3c"), b: P("M126,308 Q124,286 160,288 Q200,296 240,288 Q276,286 274,308 Q272,334 200,338 Q128,334 126,308Z", "#ffd84d", "#b5830f", 2.2) + P("M190,300 Q200,284 212,298Z", "#ffd84d", "#b5830f") };
  A("Bouée canard", "🦆", "bouee", 9, { over: duck.f, overB: duck.b });
  A("Ceinture de cow-girl", "🤠", "ceinture", 6, { f: belt(308, 14, "#b0713c", 0, [164, 176, 224, 236].map(x => star(x, 320 - Math.abs(x - 200) * .06, 4)).join("") + E(200, 322, 17, 12, SI, SD, 2) + `<path d="M190,322 q10,-8 20,0 q-10,8 -20,0Z" fill="#e5484d" stroke="#8f1f2c"/>`), b: belt(308, 14, "#b0713c") });
  A("Gaine fleurie", "🌼", "taille", 5, { f: belt(280, 38, "url(#pFlowers)", "#b5825a"), b: belt(280, 38, "url(#pFlowers)", "#b5825a") });
  A("Soleil au nombril", "☀️", "nombril", 2, { f: [0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M200,294 l3.4,6 h-6.8Z" fill="#f5a33c" stroke="#b5690f" stroke-width="1" transform="rotate(${a} 200 306)"/>`).join("") + `<circle cx="200" cy="306" r="5.4" fill="none" stroke="#f5a33c" stroke-width="2.4"/>` });
  A("Ceinture à outils de kiné", "🧰", "ceinture", 6, { f: belt(306, 13, "#4f6b7a", 0, buckle(200, 317, 15, 13) + R(158, 314, 24, 26, 4, "#7a5236") + N("M164,314 v-14 M170,314 v-18", "#c9d3e2", 3.4) + P("M160,298 h14 l3,-7 h-20Z", "#e5484d") + R(220, 314, 22, 24, 4, "#7a5236") + `<circle cx="231" cy="305" r="9" fill="#dff3ff" fill-opacity=".85" stroke="#3f7fb5" stroke-width="1.8"/>` + N("M231,305 L238,299 M231,305 V297", "#3f7fb5", 1.4)), b: belt(306, 13, "#4f6b7a") });
  A("Foulard noué", "🧣", "ceinture", 6, { f: belt(304, 14, "url(#pDots)", "#c25a86", P("M228,318 L240,352 L230,348 L222,356 L220,320Z", "url(#pDots)", "#c25a86") + C(225, 319, 6.5, "#ffb3cf", "#c25a86")), b: belt(304, 14, "url(#pDots)", "#c25a86") });
  A("Brassière longue", "🎽", "taille", 4, { f: P("M153,264 Q200,276 247,264 C245,284 246,296 249,312 Q200,324 151,312 C154,296 155,284 153,264Z", "#48b5a4", "#1f6f63", 1.9) + N("M151,305 Q200,317 249,305", "#c9f5ec", 3), b: P("M153,264 Q200,276 247,264 C245,284 246,296 249,312 Q200,324 151,312 C154,296 155,284 153,264Z", "#48b5a4", "#1f6f63", 1.9) });
  A("Poche kangourou", "🦘", "taille", 5, { f: P("M160,290 Q200,300 240,290 L246,322 Q200,334 154,322Z", "#d99a66", "#8a5430", 1.9) + N("M160,294 Q168,306 156,318 M240,294 Q232,306 244,318", "#8a5430", 1.5) + C(192, 290, 5, "#c9855a") + C(208, 290, 5, "#c9855a") + E(200, 294, 12, 10, "#e0a877") + C(195, 292, 1.8, "#2b1a24", "") + C(205, 292, 1.8, "#2b1a24", "") + E(200, 297, 2.6, 1.8, "#5a3020", "") + P("M162,300 Q200,310 238,300 L246,322 Q200,334 154,322Z", "#d99a66", "#8a5430", 1.6) });
  A("Papillon au nombril", "🦋", "nombril", 2, { f: butter(200, 306, .9, "#f58ad0") });
  A("Ceinture d'étoiles", "🌟", "ceinture", 6, { f: N("M152,308 Q200,326 248,308", "#6d5bd0", 4) + [[160, 311], [180, 316], [200, 318], [220, 316], [240, 311]].map(([x, y]) => star(x, y, 8)).join(""), b: N("M152,308 Q200,320 248,308", "#6d5bd0", 4) + [[170, 312], [200, 315], [230, 312]].map(([x, y]) => star(x, y, 7)).join("") });
  A("Abdos cosmiques", "🌌", "abdos", 1, { f: `<path d="M180,284 Q200,290 220,284 Q224,302 218,320 Q200,326 182,320 Q176,302 180,284Z" fill="url(#pGalaxy)" opacity=".75"/>` + `<g opacity=".9">${abs.replace(/#a85f48/g, "#f3e6ff")}</g>` + spark(188, 292, 5) + spark(212, 308, 4) });
  A("Ceinture d'or", "🏆", "ceinture", 7, { f: belt(300, 20, GO, GD, N("M152,306 Q200,316 248,306 M151,318 Q200,328 249,318", GD, 1.4) + E(200, 316, 22, 17, GO, GD, 2.2) + E(200, 316, 16, 12, "#fde39a", GD, 1.2) + star(200, 316, 10) + gem(168, 312, 5, "#ef4b6c", "#8f1a38") + gem(232, 312, 5, "#5bb8f5", "#215f94") + spark(212, 304, 6)), b: belt(300, 20, GO, GD) });

  // ======================== AVANT-BRAS ========================
  Z = "avantbras";
  const cuff = (y, c, w = 3.6, d) => N(`M-14,${y} Q0,${y + 8} 12,${y}`, d || dk(c), w + 2) + N(`M-14,${y} Q0,${y + 8} 12,${y}`, c, w);
  A("Bracelets brésiliens", "🧵", "poignet", 4, { arm: cuff(142, "#b48cf2") + cuff(149, "#ff9a5c") + cuff(156, "#4fc98a") });
  A("Montre", "⌚", "poignet", 5, { single: 1, arm: arm(148, 162, "#5a3a2a") + C(-.5, 156, 10.5, SI, SD, 2) + C(-.5, 156, 7.6, "#fff", SD, 1) + N("M-.5,156 V151 M-.5,156 H4", "#2c2740", 1.5) });
  A("Manchettes dorées", "🌟", "manchette", 4, { arm: arm(118, 158, GO, 2.4, GD) + N("M-15,124 Q0,132 13,124 M-12,152 Q0,160 11,152", GD, 1.5) + gem(-1, 139, 8, "#ef4b6c", "#8f1a38") });
  A("Jonc doré", "💛", "poignet", 4, { arm: cuff(150, "#fbc93d", 5.4, GD) + spark(-4, 154, 4) });
  A("Bracelet de perles", "🤍", "poignet", 4, { arm: beads("M-12,150 Q0,160 11,150", "#fffaf2", 5, 5.4) });
  A("Bracelet à breloques", "🍀", "poignet", 4, { arm: cuff(148, "#d9e2ee", 2.4, SD) + heart(-7, 159, 4.4) + star(0, 162, 5) + C(8, 158, 4, "#6fd08c") });
  A("Manchette de cuir", "🏹", "manchette", 4, { arm: arm(116, 160, "#8a5230", 2.2) + N("M-5,122 L4,130 M4,122 L-5,130 M-5,132 L4,140 M4,132 L-5,140 M-5,142 L4,150 M4,142 L-5,150", "#f3d9b0", 1.8) });
  A("Montre connectée", "📱", "poignet", 5, { single: 1, arm: arm(146, 163, "#ff6fa8") + R(-10, 145, 19, 20, 5, "#1f2238") + heart(-.5, 153, 4) + N("M-7,161 l3,0 l2,-3 l2,5 l2,-2 l4,0", "#6fe0a0", 1.3) });
  A("Bandeau éponge", "🎾", "poignet", 4, { arm: arm(142, 164, "#fff", 2.6, "#a8b5c9") + arm(149, 156, "#3f7fd8", 2.6) });
  A("Bandes de boxe", "🥊", "manchette", 3, { arm: arm(122, 170, "#fff6ea", 1.8, "#b5a07f") + N("M-14,128 L12,134 M-13,138 L11,144 M-12,148 L10,154 M-11,158 L10,163", "#d8c6a5", 1.6) });
  A("Orthèse de poignet", "🩺", "manchette", 4, { arm: arm(124, 172, "#3a4a66", 2.6) + [132, 146, 160].map(y => arm(y, y + 7, "#6f86ad", 3)).join("") });
  A("Tatouage vague", "🌊", "avbras-peau", 2, { arm: N("M-12,128 q4,-8 8,0 q4,8 8,0 q3,-6 6,-2 M-11,138 q4,-8 8,0 q4,8 8,0 q3,-5 5,-2", "#3f8fd0", 2.2) });
  A("Tatouage roses", "🌹", "avbras-peau", 2, { arm: N("M-2,112 Q6,130 -2,152", "#4f8a5c", 2) + E(5, 124, 5, 2.4, "#7cc48a", "#3f7a4c", 1) + E(-7, 138, 5, 2.4, "#7cc48a", "#3f7a4c", 1) + flower(-2, 116, 7, "#f0567c", "#ffc0cf") + flower(1, 146, 7, "#f58aa6", "#ffe0e8") });
  A("Bracelet de jade", "💚", "poignet", 4, { arm: cuff(150, "#63c99a", 6, "#1f7a54") + N("M-9,154 Q-4,157 0,157", "#d7fff0", 1.6) });
  A("Chouchou", "🎀", "poignet", 5, { arm: P("M-15,148 q-4,6 1,9 q0,6 6,4 q4,6 8,1 q7,2 8,-4 q6,-3 2,-9 q1,-6 -5,-5 q-4,-4 -9,-1 q-6,-3 -11,5Z", "url(#pDots)", "#c25a86") });
  A("Bracelet étoile", "⭐", "poignet", 4, { arm: cuff(150, "#8f7bea", 3) + star(-1, 154, 8) });
  A("Mitaines de dentelle", "🤍", "manchette", 3, { arm: arm(114, 172, "url(#pLace)", 1.8, "#cbb8d6") + beads("M-15,114 Q0,124 14,114", "#ffffff", 3.4, 4) });
  A("Bracelets fluo", "✨", "poignet", 4, { arm: cuff(134, "#ff5fd0", 3) + cuff(141, "#5fffb0", 3, "#0f8a52") + cuff(148, "#ffe84d", 3, "#a3860a") + cuff(155, "#5fd0ff", 3) });
  A("Bracelet de diamants", "💎", "poignet", 5, { arm: cuff(150, "#c9d9ee", 4, SD) + gem(-8, 152, 4.6) + gem(0, 155, 5.6) + gem(8, 152, 4.6) + spark(2, 148, 4) });
  A("Gantelets de chevalière", "⚔️", "manchette", 4, { arm: P("M-21,112 Q0,122 19,112 L12,168 Q0,174 -12,168Z", SI, SD, 2) + N("M-18,124 Q0,133 16,124 M-15,140 Q0,148 14,140 M-13,154 Q0,161 12,154", SD, 1.5) + gem(-1, 118, 5, "#5bb8f5", "#215f94") });

  // ======================== DOS ========================
  Z = "dos";
  const straps = c => strap("M166,182 C160,206 160,232 160,256 M234,182 C240,206 240,232 240,256", c, 7);
  const pack = (c, c2, deco = "") => ({ f: straps(c2), overB: P("M152,206 C150,180 172,174 200,174 C228,174 250,180 248,206 L250,286 Q250,304 232,304 H168 Q150,304 150,286Z", c, undefined, 2.2) + P("M160,236 Q200,226 240,236 L242,290 Q240,298 230,298 H170 Q160,298 158,290Z", c2, dk(c2), 1.8) + N("M160,250 Q200,242 240,250", dk(c2), 1.6) + P("M180,174 Q200,158 220,174", "none", dk(c), 4) + `<path d="M164,196 Q176,184 196,184" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".45"/>` + deco });
  A("Sac à dos vert", "🎒", "dos", 6, pack("#5cc488", "#3f9a68", R(193, 243, 14, 8, 3, GO, GD)));
  const capeF = c => P("M142,190 C120,280 96,400 92,520 Q200,552 308,520 C304,400 280,280 258,190Z", c, "#6f1230", 2.2) + N("M130,300 Q112,420 112,516 M270,300 Q288,420 288,516", "#6f1230", 1.6, 'opacity=".5"');
  const capeB = c => P("M160,180 Q200,194 240,180 C270,270 300,400 308,520 Q200,556 92,520 C100,400 130,270 160,180Z", c, "#6f1230", 2.2) + N("M170,200 Q140,380 140,530 M200,204 V540 M230,200 Q260,380 260,530", "#6f1230", 1.8, 'opacity=".45"');
  const clasp = P("M166,182 Q184,196 200,194 Q216,196 234,182 L238,190 Q218,206 200,204 Q182,206 162,190Z", "#c22f4c", "#6f1230", 1.6) + C(200, 198, 7, GO, GD);
  A("Cape rouge", "🦸", "dos", 6, { under: capeF("url(#gCape)"), f: clasp, overB: capeB("url(#gCape)") });
  const wing = (d, c, st, ribs) => { const w = P(d, c, st, 2.2) + ribs; return w + `<g transform="matrix(-1 0 0 1 400 0)">${w}</g>`; };
  const angel = wing("M190,220 C160,150 96,118 44,132 C30,138 34,154 46,156 C28,160 30,180 46,182 C34,190 38,206 54,206 C48,218 58,230 72,226 C74,242 92,248 104,240 C114,254 140,256 152,246 C170,256 186,246 190,230Z", "url(#gWing)", "#8c9cc4", N("M176,212 C150,176 110,150 62,146 M176,220 C146,192 106,174 60,174 M178,228 C150,210 110,198 70,200 M180,234 C156,226 124,218 92,224", "#b3c2e6", 2));
  A("Ailes d'ange", "👼", "dos", 2, { under: angel, overB: angel });
  const butt = wing("M194,216 C170,120 80,80 46,124 C26,160 70,206 130,214 C70,216 54,270 84,296 C120,318 176,270 194,236Z", "url(#gButter)", "#6f1f48", C(82, 138, 12, "#ffe0a8", "#6f1f48") + C(112, 166, 8, "#ffe0a8", "#6f1f48") + C(98, 270, 10, "#ffd1e0", "#6f1f48") + N("M190,218 C150,190 110,150 72,120 M190,228 C150,232 110,256 90,284", "#6f1f48", 1.6));
  A("Ailes de papillon", "🦋", "dos", 2, { under: butt, overB: butt });
  const fairy = wing("M194,214 C176,130 110,70 70,90 C50,110 90,190 182,218 C120,218 80,250 92,278 C116,296 170,262 194,232Z", "url(#gFairy)", "#a88fd6", N("M190,216 C160,170 120,120 86,100 M190,226 C160,232 130,250 108,270 M184,212 C150,180 116,160 92,146", "#fff", 1.8) + spark(96, 120, 8) + spark(120, 170, 6) + spark(112, 258, 7));
  A("Ailes de fée", "🧚", "dos", 2, { under: fairy, overB: fairy });
  const tw = N("M196,214 C186,196 166,192 154,200 C160,204 162,208 160,212 C154,212 154,220 160,224 C158,230 164,236 172,232 C176,240 190,236 196,226Z M188,214 Q172,204 162,204 M188,222 Q174,218 166,222", "#5f4fb5", 2);
  A("Tatouage ailes", "🪽", "dos-peau", 1, { b: tw + `<g transform="matrix(-1 0 0 1 400 0)">${tw}</g>` });
  const vert = [194, 208, 222, 236, 250, 264, 278, 292, 306];
  A("Tatouage colonne fleurie", "🌸", "dos-peau", 1, { b: N("M200,186 V316", "#4f8a5c", 2) + vert.map((y, i) => P(`M194,${y - 4} Q200,${y - 7} 206,${y - 4} L208,${y + 3} Q200,${y + 6} 192,${y + 3}Z`, "#fffaf0", "#a8957c", 1.2) + (i % 2 ? E(212, y, 6, 2.6, "#7cc48a", "#3f7a4c", 1, `transform="rotate(-25 212 ${y})"`) : E(188, y, 6, 2.6, "#7cc48a", "#3f7a4c", 1, `transform="rotate(25 188 ${y})"`))).join("") + flower(218, 208, 8, "#ff9fc0") + flower(182, 236, 8, "#f5a6e0") + flower(218, 266, 8, "#ffc08a") + flower(182, 294, 8, "#ff9fc0") });
  A("Sac à dos chat", "🐱", "dos", 6, (() => { const p = pack("#6b6580", "#57516b"); p.overB = P("M160,196 L156,158 L186,178Z M240,196 L244,158 L214,178Z", "#6b6580") + p.overB + E(184, 264, 5, 7, "#ffe27a", "#2c2740") + E(216, 264, 5, 7, "#ffe27a", "#2c2740") + E(184, 265, 1.8, 5, "#2c2740", "") + E(216, 265, 1.8, 5, "#2c2740", "") + P("M196,274 h8 l-4,5Z", "#ff9fb0") + N("M200,279 q-5,6 -9,2 M200,279 q5,6 9,2 M172,276 l-12,-2 M172,281 l-12,3 M228,276 l12,-2 M228,281 l12,3", "#2c2740", 1.6); return p; })());
  A("Carquois et flèches", "🏹", "dos", 6, { f: strap("M236,186 C214,220 184,256 158,276", "#8a5230", 6), overB: `<g transform="rotate(24 210 240)">${[200, 210, 220].map((x, i) => N(`M${x},${168 - i * 4} V200`, "#8a6a3a", 2.4) + P(`M${x},${160 - i * 4} l5,6 v10 l-5,-5 l-5,5 v-10Z`, ["#e5484d", "#ffd84d", "#5bb8f5"][i])).join("")}${P("M192,188 H228 L224,300 Q210,308 196,300Z", "#a5683a", "#5f3316", 2)}${P("M190,186 H230 V198 H190Z", "#c9935a", "#5f3316", 1.7)}${N("M198,214 H222 M198,284 H222", "#f3d9b0", 2, 'stroke-dasharray="3 3"')}</g>` });
  A("Guitare", "🎸", "dos", 6, { f: strap("M164,186 C186,220 216,256 242,276", "#5f4fb5", 6), overB: `<g transform="rotate(-32 200 240)">${R(194, 120, 12, 104, 3, "#7a4a24")}${R(190, 100, 20, 26, 5, "#5f3316")}${P("M200,214 C174,210 166,232 176,248 C160,258 160,300 200,302 C240,300 240,258 224,248 C234,232 226,210 200,214Z", "#e8963c", "#8a4a10", 2.2)}${C(200, 254, 12, "#4a2410")}${R(186, 280, 28, 6, 2, "#4a2410")}${N("M197,110 V282 M200,110 V282 M203,110 V282", "#fff3d0", .9)}${[[187, 106], [187, 116], [213, 106], [213, 116]].map(([x, y]) => C(x, y, 2.6, "#e2e8f0")).join("")}</g>` });
  A("Kinésio du dos", "🩹", "dos-peau", 1, { b: tape("M188,200 Q186,250 184,308", "#3fa9e8") + tape("M212,200 Q214,250 216,308", "#3fa9e8") + tape("M162,262 Q200,268 238,262", "#ff6fa8") });
  A("Cape étoilée", "🌠", "dos", 6, { under: capeF("url(#pStars)"), f: P("M166,182 Q184,196 200,194 Q216,196 234,182 L238,190 Q218,206 200,204 Q182,206 162,190Z", "#2d3a7f", "#141b4a", 1.6) + star(200, 199, 8), overB: capeB("url(#pStars)") });
  const jet = P("M160,196 Q160,176 178,176 Q196,176 196,196 V276 H160Z", SI, SD, 2.2) + P("M204,196 Q204,176 222,176 Q240,176 240,196 V276 H204Z", SI, SD, 2.2) + R(156, 214, 88, 12, 4, "#e5484d") + R(156, 252, 88, 10, 4, "#3f7fd8") + P("M164,276 h28 l4,12 h-36Z M208,276 h28 l4,12 h-36Z", "#5a6478") + P("M164,290 Q166,330 178,344 Q190,330 192,290Z M208,290 Q210,330 222,344 Q234,330 236,290Z", "url(#gFlame)", "#b5401c", 1.8) + N("M168,188 v20 M212,188 v20", "#fff", 3);
  A("Jetpack", "🚀", "dos", 6, { under: P("M164,270 Q158,330 178,350 Q196,330 190,270Z M210,270 Q204,330 222,350 Q242,330 236,270Z", "url(#gFlame)", "#b5401c", 1.8), f: straps("#e5484d"), overB: jet });
  A("Carapace de tortue", "🐢", "dos", 6, { under: E(200, 250, 78, 70, "#4f9a5c", "#245a30", 2.4), f: straps("#8a6a3a"), overB: E(200, 250, 72, 76, "#5fae6a", "#245a30", 2.6) + E(200, 250, 60, 64, "#7cc47f", "#245a30", 1.6) + P("M200,204 L226,220 V256 L200,274 L174,256 V220Z", "#9bd98f", "#245a30", 2) + N("M200,204 V186 M226,220 L250,206 M226,256 L252,276 M200,274 V314 M174,256 L148,276 M174,220 L150,206", "#245a30", 2) });
  const drag = wing("M192,222 C170,160 110,110 40,108 C56,126 60,140 56,156 C72,156 84,166 88,184 C104,180 120,190 126,206 C146,204 166,218 180,240Z", "url(#gDragon)", "#0f4a3f", N("M190,220 C150,170 96,126 46,110 M188,222 C150,186 104,166 58,156 M186,226 C154,204 122,192 90,184 M184,230 C162,218 146,210 128,206", "#0f4a3f", 2.2));
  A("Ailes de dragon", "🐉", "dos", 2, { under: drag, overB: drag });
  const bat = wing("M192,220 C166,150 110,120 52,126 C62,140 60,154 50,166 C68,166 80,176 82,194 C96,188 112,196 118,212 C136,206 160,220 180,240Z", "url(#gBat)", "#150a26", N("M190,218 C150,176 104,142 58,130 M188,222 C152,190 110,172 60,168 M186,226 C154,208 122,196 88,194", "#8a6ab5", 2));
  A("Ailes de chauve-souris", "🦇", "dos", 2, { under: bat, overB: bat });
  A("Cartable rouge", "📕", "dos", 6, pack("#e5565e", "#c23a46", star(200, 272, 12) + R(170, 226, 10, 18, 2, GO, GD) + R(220, 226, 10, 18, 2, GO, GD)));
  const sword = `<g transform="rotate(38 200 240)">${P("M195,150 L200,132 L205,150 V260 H195Z", SI, SD, 1.8)}${N("M200,142 V256", "#fff", 1.6)}${R(178, 258, 44, 9, 4, GO, GD)}${R(195, 266, 10, 30, 3, "#7a4a24")}${C(200, 300, 6, "#ef4b6c", "#8f1a38")}</g>`;
  A("Épées croisées", "⚔️", "dos", 6, { under: sword + `<g transform="matrix(-1 0 0 1 400 0)">${sword}</g>`, f: strap("M164,186 C186,220 216,256 242,276", "#8a5230", 6), overB: sword + `<g transform="matrix(-1 0 0 1 400 0)">${sword}</g>` });
  A("Bouclier rond", "🛡️", "dos", 6, { f: strap("M164,186 C186,220 216,256 242,276", "#5a3a2a", 6), overB: C(200, 248, 58, "#3f7fd8", "#1f4a8a", 3) + C(200, 248, 44, "#e8eef8", "#56627a", 2.4) + C(200, 248, 30, "#e5484d", "#8f1f2c", 2.4) + star(200, 248, 20) + `<path d="M158,224 A50,50 0 0 1 186,200" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".6"/>` });
  const rain = wing("M190,222 C160,130 90,90 34,112 C26,124 36,136 48,138 C32,146 36,164 52,166 C40,176 48,192 64,192 C58,206 72,216 86,210 C90,226 108,232 120,224 C132,240 156,242 164,232 C176,244 188,240 192,232Z", "url(#gRainbow)", "#7a4a9a", N("M180,214 C150,166 100,128 56,124 M178,220 C146,186 104,164 60,156 M178,226 C150,206 112,190 72,186 M180,232 C158,222 128,214 98,214", "#fff", 2.2, 'opacity=".8"') + spark(60, 122, 8) + spark(104, 170, 7) + spark(140, 220, 6));
  A("Ailes arc-en-ciel", "🌈", "dos", 2, { under: rain, overB: rain });

  // ======================== MAIN ========================
  Z = "main";
  const nails = c => { const cs = Array.isArray(c) ? c : [c, c, c, c]; return [[-6.6, 222.5], [-1.5, 225.8], [3.2, 225], [7.2, 220.5]].map(([x, y], i) => E(x, y, 2.1, 3, cs[i], dk(cs[i], .35), .8) + `<circle cx="${x - .6}" cy="${y - 1}" r=".7" fill="#fff"/>`).join("") + E(17.4, 194.5, 2, 2.8, cs[0], dk(cs[0], .35), .8); };
  A("Vernis rouge", "💅", "ongles", 4, { arm: nails("#e5354d") });
  A("Vernis rose nacré", "💅", "ongles", 4, { arm: nails("#ff9fc8") + spark(-2, 220, 3) });
  A("Vernis menthe", "💅", "ongles", 4, { arm: nails("#5fd6b0") });
  A("Vernis arc-en-ciel", "🌈", "ongles", 4, { arm: nails(["#ff6b8b", "#ffd84d", "#5fd68c", "#5bb8f5"]) });
  A("Bague diamant", "💍", "bague", 5, { arm: N("M-7.5,208 Q-5,210 -3,208", GD, 3.6) + N("M-7.5,208 Q-5,210 -3,208", "#fbc93d", 2.2) + gem(-5.4, 204, 4.6) + spark(-2, 200, 4) });
  A("Bague fleur", "🌸", "bague", 5, { arm: N("M1,209 Q4,211 7,209", "#fbc93d", 2.4) + flower(4, 207, 6, "#ff9fc0") });
  A("Henné", "🪬", "main-peau", 2, { arm: `<g stroke="#8a3f1c" stroke-width="1.5" fill="none" stroke-linecap="round"><circle cx="-1" cy="194" r="6"/><circle cx="-1" cy="194" r="2.4"/><path d="M-1,188 V182 M-7,194 H-9.6 M5,194 H8 M-5,199 L-7,212 M-1,201 V214 M3,199 L5,211 M-6,183 q5,-4 10,0"/></g>` + [[-1, 184], [-7, 206], [5, 206]].map(([x, y]) => C(x, y, 1, "#8a3f1c", "")).join("") });
  const glove = (c, st, deco = "", y0 = 160) => P(handPath(2), c, st, 2) + N("M-5,229 Q-6,219 -5,211 M1,230 Q1,219 1,210 M6,227 Q7,218 7,210", st, 1.3, 'opacity=".6"') + P(armSeg(y0, 172, 3), c, st, 1.8) + deco;
  A("Gants blancs", "🧤", "gants", 5, { arm: glove("#ffffff", "#8fa0b8", C(-1, 164, 2, "#fff6d8", GD)) });
  A("Moufles en laine", "🧶", "gants", 5, { arm: P("M-13,166 C-17,190 -16,214 -9,226 C-4,233 6,232 10,226 C15,218 15,210 14,202 C20,206 25,200 22,191 C19,182 14,176 12,166Z", "url(#pKnitLilac)", "#6b4fb0", 2) + P(armSeg(154, 172, 4), "#fff6ff", "#6b4fb0", 1.8) + heart(-1, 204, 7) });
  A("Gants de boxe", "🥊", "gants", 6, { arm: P("M-13,170 C-24,188 -24,220 -12,232 C0,240 16,234 18,220 C20,212 18,206 16,202 C24,204 28,194 22,184 C18,176 14,174 12,170Z", "#e5404c", "#8f1a2c", 2.2) + `<path d="M-14,192 C-18,206 -14,220 -8,224" fill="none" stroke="#ff9aa2" stroke-width="4" stroke-linecap="round"/>` + P(armSeg(152, 172, 4), "#fff", "#a8b5c9", 1.8) });
  A("Gants d'examen", "🧤", "gants", 5, { arm: `<g opacity=".88">${glove("#7fb8f0", "#2f6fae")}</g>` });
  A("Gants dorés", "✨", "gants", 6, { arm: glove(GO, GD, star(-1, 196, 7, "#fff3c4"), 154) });
  A("Gants de dentelle", "🤍", "gants", 5, { arm: glove("url(#pLace)", "#b59fc4", beads("M-12,160 Q0,168 11,160", "#ffffff", 3.2, 4)) });
  A("Chevalière rubis", "❤️", "bague", 5, { arm: N("M-2.6,210 Q0,212 3,210", GD, 4) + N("M-2.6,210 Q0,212 3,210", "#fbc93d", 2.6) + R(-3.4, 203, 7, 7, 2, "#ef4b6c", "#8f1a38") });
  A("Baguette magique", "🪄", "tenu", 8, { single: 1, held: `<g transform="rotate(-30 0 205)">${N("M0,236 V160", "#7a5236", 5.4)}${N("M0,236 V160", "#c9935a", 3)}${star(0, 150, 16)}${spark(18, 136, 6, "#ffe27a")}${spark(-18, 160, 5, "#ff9fd0")}${spark(-12, 130, 4, "#8fe0ff")}</g>` });
  A("Bouquet de fleurs", "💐", "tenu", 8, { single: 1, held: `<g transform="rotate(-14 0 205) translate(-2 0)">${N("M-6,220 L-14,186 M0,220 V180 M6,220 L14,186", "#4f9a5c", 2.6)}${P("M-18,192 L0,236 L18,192 Q0,202 -18,192Z", "#ffe0ec", "#c25a86", 1.8)}${[[-14, 182, "#ff8fb0"], [0, 174, "#ffd166"], [14, 182, "#c7a3f5"], [-7, 190, "#fff"], [8, 191, "#ff9a7a"]].map(([x, y, c]) => flower(x, y, 10, c, "#f5a623")).join("")}${bow(0, 218, 7, "#f0567c")}</g>` });
  A("Livre d'anatomie", "📗", "tenu", 8, { single: 1, held: `<g transform="rotate(-14 0 205) translate(-24 186)">${R(0, 0, 42, 54, 4, "#2f8a7a", "#124a40", 2)}${R(4, 2, 36, 50, 2, "#fffaf0", "#d8cbb8", 1)}${R(0, 0, 38, 54, 4, "#3fa894", "#124a40", 2)}${N("M6,0 V54", "#124a40", 1.5)}${P("M16,20 a4,4 0 1 1 3,-4 h8 a4,4 0 1 1 3,4 a4,4 0 1 1 -3,8 h-8 a4,4 0 1 1 -3,-8Z", "#fffaf0", "#8a7a5c", 1.2)}<text x="22" y="44" text-anchor="middle" font-size="8.5" font-weight="900" fill="#fff" font-family="Nunito,sans-serif">ANAT</text></g>` });
  A("Sucette géante", "🍭", "tenu", 8, { single: 1, held: `<g transform="rotate(-24 0 205)">${N("M0,240 V180", "#fff", 5)}${C(0, 160, 22, "#ff8fb8", "#b03a70", 2)}<path d="M0,160 m0,0 a4,4 0 0 1 8,0 a9,9 0 0 1 -18,0 a14,14 0 0 1 28,0" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/></g>` });
  A("Ballon cœur", "🎈", "tenu", 8, { single: 1, held: `<g transform="translate(0 205) rotate(-14) translate(0 -205)">${N("M0,205 Q-30,150 -40,90", "#8a7a9a", 1.6)}<g transform="translate(-42 58)">${heart(0, 0, 27, "#ff5f7f")}</g></g>` });
  A("Gants galaxie", "🌌", "gants", 6, { arm: glove(GX, GXD, spark(-3, 190, 5) + spark(4, 208, 4, "#ffe27a"), 150) });

  // ======================== BASSIN ========================
  Z = "bassin";
  const WB = "M149,318 Q200,331 251,318";
  const shortF = (c, st, y = 46, deco = "", legDeco = "") => ({ f: P("M149,318 Q200,331 251,318 C257,338 262,352 261,368 C240,386 214,388 200,396 C186,388 160,386 139,368 C138,352 143,338 149,318Z", c, st, 2) + N("M200,330 V392", st, 1.4, 'opacity=".6"') + deco, b: P("M149,318 Q200,331 251,318 C257,338 262,352 261,368 C240,386 214,388 200,396 C186,388 160,386 139,368 C138,352 143,338 149,318Z", c, st, 2) + N("M200,330 V392", st, 1.4, 'opacity=".6"'), leg: P(legSeg(4, y, 3, 0, 4), c, st, 2) + legDeco });
  A("Short de sport", "🩳", "bas", 4, shortF("#4f5fd0", "#262f80", 44, N("M151,328 Q200,341 249,328", "#fff", 3), N("M-26,10 L-26,42", "#fff", 3)));
  const skirt = (c, st, yb, w, deco = "", wavy = 0) => { const y0 = 316; let hem = ""; const n = 8, xs = 200 - w, step = 2 * w / n; if (wavy) { for (let i = 0; i < n; i++) hem += ` q${-step / 2},${wavy} ${-step},0`; } else hem = ` Q200,${yb + 16} ${xs},${yb}`; const d = `M151,${y0} Q200,${y0 + 13} 249,${y0} C258,${y0 + 26} ${200 + w - 4},${yb - 30} ${200 + w},${yb}${hem} C${xs + 4},${yb - 30} 142,${y0 + 26} 151,${y0}Z`; return P(d, c, st, 2) + deco; };
  const pleats = (st, yb, w) => [-.75, -.5, -.25, 0, .25, .5, .75].map(k => N(`M${200 + k * 46},${326 - Math.abs(k) * 5} L${200 + k * w},${yb + 6 - Math.abs(k) * 4}`, st, 1.5, 'opacity=".55"')).join("");
  const sk = (c, st, yb, w, deco, wavy) => ({ top: "", f: skirt(c, st, yb, w, deco, wavy), b: skirt(c, st, yb, w, deco, wavy) });
  A("Jupe plissée", "👗", "bas", 6, sk("#4a5a8f", "#222d57", 420, 88, pleats("#222d57", 420, 86) + N("M151,322 Q200,335 249,322", "#8fa0d6", 4)));
  A("Tutu", "🩰", "bas", 6, sk("#ffc6dc", "#c96a96", 396, 104, `<path d="M152,326 Q120,360 98,386 Q200,350 302,386 Q280,360 248,326Z" fill="#fff" opacity=".35"/>` + N("M151,322 Q200,335 249,322", "#ff8fb8", 6) + [[130, 376], [160, 360], [200, 356], [240, 360], [270, 376]].map(([x, y]) => spark(x, y, 5)).join(""), 12));
  A("Sac banane", "👝", "ceinture-b", 8, { f: strap("M147,330 Q200,350 253,330", "#b0501c", 4) + P("M168,338 Q200,330 232,338 Q238,362 222,368 Q200,374 178,368 Q162,362 168,338Z", "#ff9a3c", "#a84f10", 2) + N("M174,346 Q200,340 226,346", "#a84f10", 2) + C(226, 347, 2.6, "#ffe27a", "#8a5a10"), b: strap("M147,330 Q200,344 253,330", "#b0501c", 4) });
  A("Ceinture de championne", "🏆", "ceinture-b", 8, { f: P("M147,322 Q200,338 253,322 L256,344 Q200,360 144,344Z", "#8f2438", "#4a0f1c", 2) + E(200, 342, 30, 21, GO, GD, 2.4) + E(200, 342, 22, 14, "#fde39a", GD, 1.2) + star(200, 342, 12) + C(160, 335, 7, GO, GD) + C(240, 335, 7, GO, GD), b: P("M147,322 Q200,338 253,322 L256,344 Q200,360 144,344Z", "#8f2438", "#4a0f1c", 2) });
  A("Short en jean", "👖", "bas", 4, shortF("url(#pDenim)", "#2f4f80", 36, N("M160,332 Q168,348 152,354 M240,332 Q232,348 248,354", "#f3b04a", 1.6) + C(200, 333, 3, "#f3b04a", "#8a5a10"), P(legSeg(30, 38, 3.6, 0, 4), "#9dbce6", "#2f4f80", 1.5)));
  A("Jupe longue fleurie", "🌷", "bas", 6, sk("url(#pFlowers)", "#b5825a", 530, 104, N("M151,322 Q200,335 249,322", "#f58aa6", 5) + N("M108,512 Q200,540 292,512", "#f58aa6", 3), 0));
  A("Paréo", "🏝️", "bas", 6, sk("url(#pTropic)", "#0f5f57", 480, 92, P("M232,324 Q262,400 240,486 L292,478 Q292,420 251,322Z", "url(#pTropic)", "#0f5f57", 1.8) + C(238, 326, 8, "#2fc0b0", "#0f5f57")));
  A("Jupe écossaise", "🏴", "bas", 6, sk("url(#pPlaidGreen)", "#12382f", 424, 86, pleats("#12382f", 424, 84) + N("M232,330 V420", "#f6d365", 2) + N("M228,396 l8,0", "#f6d365", 2.4)));
  A("Ceinture à grelots", "🔔", "ceinture-b", 8, { f: N("M146,330 Q200,356 254,330", "#a83a7c", 5) + [150, 164, 178, 192, 208, 222, 236, 250].map((x, i) => { const y = 336 + 11 - Math.pow((x - 200) / 50, 2) * 12; return N(`M${x},${y} v8`, "#fbc93d", 1.5) + C(x, y + 11, 4.4, GO, GD); }).join(""), b: N("M146,330 Q200,348 254,330", "#a83a7c", 5) });
  A("Short rayé", "🍬", "bas", 4, shortF("url(#pStripeV)", "#24719c", 40));
  A("Jupe à volants", "💃", "bas", 6, sk("#ff8a5c", "#a83f1c", 430, 90, P("M148,346 Q200,360 252,346 L262,374 q-10,10 -20,0 q-10,10 -21,0 q-10,10 -21,0 q-10,10 -21,0 q-10,10 -21,0 q-10,10 -20,0Z", "#ffa57a", "#a83f1c", 1.7) + P("M151,316 Q200,329 249,316 L256,340 q-9,9 -19,0 q-9,9 -18,0 q-10,9 -19,0 q-9,9 -19,0 q-9,9 -18,0 q-10,9 -19,0Z", "#ffbf9a", "#a83f1c", 1.7), 12));
  A("Jogging confort", "🏃", "bas", 4, (() => { const s = shortF("#8f96ab", "#4a5066", 214, N("M151,327 Q200,340 249,327", "#c9cede", 4) + N("M194,336 q-4,14 -8,18 M206,336 q4,14 8,18", "#fff", 2.4), N("M-24,20 Q-20,120 -14,204", "#fff", 3)); s.leg += P(legSeg(206, 218, 4, 0, 3), "#7a8198", "#4a5066", 1.7); return s; })());
  A("Jupe galaxie", "🌌", "bas", 6, sk(GX, GXD, 420, 92, spark(150, 390, 7) + spark(230, 370, 6, "#ffe27a") + spark(260, 410, 7) + N("M151,322 Q200,335 249,322", "#b18cf2", 4), 10));
  const tailFox = P("M226,372 C286,392 330,352 322,292 C320,268 300,258 296,276 C300,316 270,340 232,346Z", "#f28a3c", "#9c4a10", 2.2) + P("M322,292 C320,268 300,258 296,276 C297,290 296,300 291,310 Q306,316 320,308 Q323,300 322,292Z", "#fff6ea", "#9c4a10", 1.8);
  A("Queue de renard", "🦊", "queue", 2, { under: tailFox, overB: tailFox.replace(/M226,372/, "M206,372") });
  const tailCat = N("M214,366 C280,390 300,330 286,280 C282,262 300,256 302,270", "#1a1528", 15) + N("M214,366 C280,390 300,330 286,280 C282,262 300,256 302,270", "#4a4366", 11.5);
  A("Queue de chat", "🐈", "queue", 2, { under: tailCat, overB: tailCat + bow(220, 364, 9, "#ff7fa8") });
  const bigBow = `<g>${bow(200, 352, 34, "#ff8fb8")}${P("M192,358 L168,440 L184,432 L196,442Z M208,358 L232,440 L216,432 L204,442Z", "#ff8fb8")}</g>`;
  A("Grand nœud dans le dos", "🎀", "queue", 2, { under: bow(200, 340, 48, "#ff8fb8"), overB: bigBow, f: N("M148,324 Q200,340 252,324", "#ff8fb8", 6) });
  A("Short fleuri", "🌺", "bas", 4, shortF("url(#pTropic)", "#0f5f57", 50));
  A("Jupe royale", "👸", "bas", 6, sk("#7a4fc4", "#3c2070", 540, 118, P("M188,332 Q200,336 212,332 L240,546 Q200,556 160,546Z", "#efe3ff", "#3c2070", 1.8) + N("M84,520 Q200,572 316,520", "#fbc93d", 5) + N("M151,322 Q200,335 249,322", "#fbc93d", 6) + [[120, 480], [280, 480], [134, 420], [266, 420]].map(([x, y]) => star(x, y, 8)).join("") + gem(200, 330, 7, "#ef4b6c", "#8f1a38")));
  A("Jupe d'armure", "⚔️", "bas", 6, sk(SI, SD, 408, 78, pleats(SD, 408, 76) + N("M134,380 Q200,398 266,380", SD, 2) + P("M149,316 Q200,330 251,316 L254,332 Q200,346 146,332Z", GO, GD, 1.8) + gem(200, 334, 7, "#5bb8f5", "#215f94")));

  // ======================== CUISSE ========================
  Z = "cuisse";
  A("Kinésio quadriceps", "🩹", "cuisse-peau", 2, { leg: tape("M-12,34 Q-18,62 -8,92", "#46c07a") + tape("M10,34 Q16,62 6,92", "#62d492") + tape("M-1,34 V88", "#8fe0b0") });
  A("Ruban à nœud", "🎀", "cuisse", 3, { leg: leg(64, 72, "#ff8fb8") + bow(-2, 70, 10, "#ff8fb8") });
  A("Éclairs de sprinteuse", "⚡", "cuisse-aura", 6, { leg: bolt(-46, 44, 1.3) + bolt(-42, 82, .9) });
  A("Chaussettes montantes", "🧦", "cuisse", 3, { leg: P(legSeg(58, 224, 1.8), "#fdf8f0", "#a89a86", 1.8) + leg(58, 66, "#f58aa6", 2.4) + leg(69, 73, "#f58aa6", 2.2) + shine(legSeg(58, 224, 1.8)) });
  A("Trousse à crayons", "✏️", "cuisse", 4, { single: 1, leg: leg(52, 58, "#7a5236") + leg(78, 84, "#7a5236") + R(-22, 50, 24, 38, 4, "#a5683a", "#5f3316") + [["#e5484d", -17], ["#ffd84d", -10], ["#5bb8f5", -3]].map(([c, x]) => P(`M${x - 2.6},50 V38 L${x},30 L${x + 2.6},38 V50Z`, c, undefined, 1.2)).join("") + N("M-20,62 H0", "#f3d9b0", 1.5, 'stroke-dasharray="2 2"') });
  A("Tatouage rose", "🌹", "cuisse-peau", 2, { leg: N("M-4,58 Q2,74 -4,92 M-2,72 q10,-4 11,3", "#4f8a5c", 2.2) + flower(-4, 50, 12, "#e5486a", "#ffb3c4") + E(7, 74, 7, 3, "#7cc48a", "#3f7a4c", 1) });
  A("Tatouage papillon", "🦋", "cuisse-peau", 2, { leg: butter(-2, 60, 1.25, "#5fa8f0") });
  A("Cuissard de vélo", "🚴", "cuisse", 3, { leg: P(legSeg(2, 90, 1.8), "#2c2f45", "#12142a", 1.9) + leg(80, 91, "#4fd0a0", 2.2) + N("M-26,20 Q-25,50 -20,78", "#4fd0a0", 3) });
  A("Bandage", "🤕", "cuisse", 3, { leg: leg(46, 84, "#fbf3e4", 2, "#b5a07f") + N("M-27,54 L24,62 M-25,64 L22,71 M-24,74 L20,80", "#d8c6a5", 1.7) + P("M6,72 l10,2 l-2,8 l-10,-2Z", "#fff", "#b5a07f", 1) });
  A("Rubans croisés", "🩰", "cuisse", 3, { leg: N("M-28,48 Q0,60 20,78 M26,48 Q0,60 -22,78", "#a84f7c", 6) + N("M-28,48 Q0,60 20,78 M26,48 Q0,60 -22,78", "#f9b3cf", 4) + bow(-1, 60, 7, "#f58ab0") });
  A("Cuissière de chevalière", "🛡️", "cuisse", 4, { leg: P("M-30,34 Q0,24 28,34 Q30,66 18,90 Q0,100 -18,90 Q-32,66 -30,34Z", SI, SD, 2) + N("M0,30 V94 M-28,52 Q0,62 27,52 M-24,74 Q0,84 22,74", SD, 1.5) + gem(0, 44, 6, "#ef4b6c", "#8f1a38") });
  A("Dentelle bleue", "💙", "cuisse", 3, { leg: leg(62, 76, "#a8d0f7", 2, "#4a7fb5") + beads("M-25,78 Q0,90 22,78", "#eaf5ff", 4, 4.8) + bow(-2, 70, 6, "#5f9fe8") });
  A("Patch étoile", "⭐", "cuisse-peau", 2, { leg: star(-2, 58, 17) + spark(-8, 52, 5) });
  A("Bande de capitaine", "🏅", "cuisse", 3, { leg: leg(54, 74, "url(#pStripeRainbow)", 2, "#7a5a8a") });
  A("Chaîne dorée", "⛓️", "cuisse", 3, { leg: `<path d="M-27,54 Q0,72 24,54" fill="none" stroke="${GD}" stroke-width="4" stroke-dasharray="5 2.2"/><path d="M-27,54 Q0,72 24,54" fill="none" stroke="#fbd25e" stroke-width="2.4" stroke-dasharray="5 2.2"/>` + N("M-25,66 Q0,82 22,66", "#fbd25e", 2) + heart(-1, 76, 5) });
  A("Pochette de cuisse", "👜", "cuisse", 4, { single: 1, leg: leg(50, 56, "#4a5a66") + leg(80, 86, "#4a5a66") + P("M-20,50 H12 V82 Q12,90 4,90 H-12 Q-20,90 -20,82Z", "#6f8a7a", "#34493d", 1.8) + P("M-21,48 H13 V62 Q-4,72 -21,62Z", "#86a392", "#34493d", 1.7) + C(-4, 64, 3, GO, GD) });
  A("Rangs de perles", "🤍", "cuisse", 3, { leg: beads("M-28,52 Q0,66 25,52", "#fffaf2", 4.6, 5.2) + beads("M-25,64 Q0,78 22,64", "#ffd9e6", 4.6, 5.2) });
  A("Legging galaxie", "🌌", "cuisse", 3, { leg: P(legSeg(2, 212, 1.7), GX, GXD, 1.9) + spark(-10, 40, 5) + spark(8, 70, 4, "#ffe27a") + spark(-6, 150, 5) + shine(legSeg(2, 212, 1.7)) });
  A("Cuissière de cristal", "💠", "cuisse", 4, { leg: P("M-30,36 L-16,26 L0,34 L16,26 L28,36 L24,72 L0,96 L-24,72Z", CR, CD, 2) + N("M-30,36 L0,62 L28,36 M0,34 V96 M-24,72 L0,62 L24,72", "#fff", 1.5) + spark(-14, 44, 6) });
  A("Cuissière en or", "🏆", "cuisse", 4, { leg: P("M-31,30 Q0,20 29,30 Q31,64 19,90 Q0,102 -19,90 Q-33,64 -31,30Z", GO, GD, 2.1) + N("M-28,44 Q0,34 27,44 M-21,84 Q0,94 20,84", GD, 1.6) + star(-1, 62, 16, "#fff3c4") + spark(10, 50, 6) });

  // ======================== GENOU ========================
  Z = "genou";
  const kn = (c, st, deco = "", y0 = 88, y1 = 134) => leg(y0, y1, c, 2.4, st) + shine(legSeg(y0, y1, 2.4)) + deco;
  const kpad = (c, cup, deco = "") => kn(c, undefined, N("M-21,95 Q0,104 19,95 M-20,128 Q0,137 18,128", lt(c, .4), 1.6) + E(-1, 112, 14, 15, cup) + N("M-9,104 Q-5,100 0,100", "#fff", 2.4, 'opacity=".7"') + deco);
  A("Pansement", "🩹", "genou", 3, { leg: plaster(-1, 110, 18, "#f7c99a", 28, 11) });
  A("Genouillère violette", "🦵", "genou", 4, { leg: kpad("#3a3350", "#a36be8") });
  A("Kinésio en U", "🩹", "genou", 3, { leg: tape("M-13,92 Q-20,114 -8,130", "#3fa9e8") + tape("M11,92 Q18,114 6,130", "#3fa9e8") + tape("M-12,130 Q0,136 10,130", "#ff6fa8") });
  A("Pansement étoile", "⭐", "genou", 3, { leg: plaster(-1, 110, -14, "#8fc7ff", 28, 12) + star(-1, 110, 6) });
  A("Genouillère fluo", "💚", "genou", 4, { leg: kpad("#3d4257", "#c8ff4a", bolt(-1, 112, .65, "#fff")) });
  A("Bandage", "🤕", "genou", 4, { leg: kn("#fbf3e4", "#b5a07f", N("M-21,98 L17,106 M-21,108 L17,115 M-20,118 L17,124", "#d8c6a5", 1.8) + P("M6,118 l10,2 l-2,8 l-10,-2Z", "#fff", "#b5a07f", 1)) });
  A("Genouillère de skate", "🛹", "genou", 4, { leg: kpad("#2c2740", "#ff6fa8", N("M-8,108 H6 M-8,113 H6 M-8,118 H6", "#a82a66", 1.8)) });
  A("Patch cœur", "❤️", "genou", 3, { leg: heart(-1, 110, 16) + N("M-12,106 Q-9,101 -4,102", "#fff", 1.4, 'stroke-dasharray="2 2"') });
  A("Patch fleur", "🌼", "genou", 3, { leg: flower(-1, 111, 16, "#fff", "#ffc83d") });
  A("Genouillère de volley", "🏐", "genou", 4, { leg: kn("#fff", "#8fa0b8", N("M-21,94 Q0,104 18,94 M-20,128 Q0,138 18,128", "#3f7fd8", 3) + C(-1, 112, 11, "#ffe9a8", "#8fa0b8") + N("M-11,110 Q-1,104 9,110 M-6,121 Q-4,110 -1,101 M9,117 Q2,112 -1,101", "#3f7fd8", 1.4)) });
  A("Sourire au genou", "🙂", "genou", 3, { leg: smile(-1, 111, 15) });
  A("Orthèse articulée", "🦿", "genou", 4, { leg: kn("#4a5568", undefined, "", 82, 140) + [88, 130].map(y => leg(y, y + 7, "#7a8aa5", 3)).join("") + N("M-22,84 L-23,112 L-22,138", SD, 6) + N("M-22,84 L-23,112 L-22,138", "#dfe8f3", 3.4) + C(-23, 112, 5.4, SI, SD) + E(-1, 112, 9, 10, "#e8c3a8", "#4a5568") });
  A("Genouillère arc-en-ciel", "🌈", "genou", 4, { leg: kn("url(#gRainbow)", "#7a5a8a") });
  A("Poche de glace", "🧊", "genou", 4, { leg: P("M-20,98 Q-25,124 -10,128 Q2,133 15,126 Q22,112 15,96 Q0,88 -20,98Z", "#bfe8fa", "#4a90b8", 2) + R(-13, 102, 11, 11, 2, "#e8f8ff", "#7fb8d8", 1) + R(1, 108, 11, 11, 2, "#e8f8ff", "#7fb8d8", 1) + R(-10, 115, 9, 9, 2, "#e8f8ff", "#7fb8d8", 1) + R(-9, 87, 15, 9, 4, "#3f7fd8") });
  A("Nœuds", "🎀", "genou", 4, { leg: leg(96, 104, "#b48cf2") + bow(-1, 101, 11, "#b48cf2") });
  A("Genouillère de chevalière", "🛡️", "genou", 4, { leg: kn(SI, SD, P("M-22,104 L-31,112 L-22,120Z", SI, SD) + E(-1, 112, 14, 15, "#dbe4f0", SD) + gem(-1, 112, 7, "#5bb8f5", "#215f94")) });
  A("Genouillère léopard", "🐆", "genou", 4, { leg: kn("url(#pLeopard)", "#8a5a1c") });
  A("Genouillère galaxie", "🌌", "genou", 4, { leg: kn(GX, GXD, spark(-7, 104, 6) + spark(7, 120, 5, "#ffe27a")) });
  A("Genouillère en or", "🏆", "genou", 4, { leg: kn(GO, GD, star(-1, 112, 14, "#fff3c4") + spark(8, 100, 5)) });
  A("Genouillère de diamant", "💎", "genou", 4, { leg: kn(CR, CD, N("M-21,96 L-1,112 L18,96 M-20,128 L-1,112 L18,128 M-1,92 V132", "#fff", 1.5) + gem(-1, 112, 10) + spark(9, 100, 6)) });

  // ======================== JAMBE ========================
  Z = "jambe";
  const sock = (c, st, y0 = 140, deco = "", cuffc) => ({ leg: P(legSeg(y0, 224, 1.8, 3, 2), c, st || FLX(c), 1.8) + shine(legSeg(y0, 224, 1.8)) + (cuffc ? leg(y0, y0 + 8, cuffc, 2.4) : "") + deco });
  A("Chaussettes rayées", "🧦", "jambe", 3, sock("url(#pStripeRed)", "#9c2a3c", 150));
  A("Jambières violettes", "🩰", "jambe", 4, { leg: P(legSeg(142, 208, 4.4, 3, 5), "url(#pKnitLilac)", "#6b4fb0", 2) + leg(142, 151, "#a98ae6", 5) + leg(200, 209, "#a98ae6", 5) });
  A("Protège-tibias", "⚽", "jambe", 4, { leg: P("M-15,132 Q0,126 14,132 Q18,164 10,200 Q0,208 -10,200 Q-19,164 -15,132Z", "#2f9fe0", "#0f5a8a", 2) + N("M-13,148 Q0,156 13,148 M-11,184 Q0,192 10,184", "#fff", 2) + star(-1, 166, 10, "#fff", "#0f5a8a") });
  A("Chaussettes hautes blanches", "🤍", "jambe", 3, sock("#fdfaf4", "#a89a86", 128, leg(138, 142, "#e5484d", 2) + leg(146, 150, "#3f5fae", 2)));
  A("Chaussettes à pois", "🫧", "jambe", 3, sock("url(#pDots)", "#c25a86", 146, "", "#ff8fb8"));
  A("Kinésio mollet", "🩹", "jambe-peau", 2, { leg: tape("M-11,140 Q-13,180 -4,216", "#f5a33c") + tape("M10,140 Q11,180 4,216", "#ffbe6a") });
  A("Chaussettes cœurs", "💕", "jambe", 3, sock("url(#pHearts)", "#b53a5c", 148, "", "#f0567c"));
  A("Guêtres en laine", "🧶", "jambe", 4, { leg: P(legSeg(150, 216, 5, 3, 6), "url(#pKnit)", "#8a6234", 2) + P("M-25,148 Q0,162 22,148 Q24,156 21,162 Q0,174 -24,162 Q-27,156 -25,148Z", "#f5e4c8", "#8a6234", 1.8) });
  A("Bas de contention", "🩺", "jambe", 3, { leg: P(legSeg(126, 224, 1.5), "#d8a98a", "#8a5a42", 1.8) + leg(126, 134, "#c28f70", 2) + N("M-8,140 Q-12,180 -5,220 M0,140 V222 M8,140 Q10,180 5,220", "#c28f70", 1.1) });
  A("Rubans de ballerine", "🩰", "jambe", 3, { leg: N("M-20,146 Q0,158 16,172 M17,146 Q0,158 -18,172 M-18,178 Q0,190 12,204 M15,178 Q0,190 -13,204", "#b5567c", 5.6) + N("M-20,146 Q0,158 16,172 M17,146 Q0,158 -18,172 M-18,178 Q0,190 12,204 M15,178 Q0,190 -13,204", "#ffc0d6", 3.8) + bow(-1, 142, 8, "#ff9fc0") });
  A("Tatouage lierre", "🍃", "jambe-peau", 2, { leg: N("M6,134 Q-14,160 4,184 Q12,200 -4,220", "#4f8a5c", 2.2) + [[-2, 144, 30], [-8, 160, -30], [4, 176, 30], [8, 192, -30], [-2, 208, 30]].map(([x, y, a]) => E(x, y, 6, 2.8, "#7cc48a", "#3f7a4c", 1, `transform="rotate(${a} ${x} ${y})"`)).join("") });
  A("Chaussettes arc-en-ciel", "🌈", "jambe", 3, sock("url(#pStripeRainbow)", "#7a5a8a", 136));
  A("Chaussettes losanges", "🔶", "jambe", 3, sock("url(#pArgyle)", "#7a4a28", 144, "", "#b9784a"));
  A("Chaussettes étoilées", "🌟", "jambe", 3, sock("url(#pStars)", "#1d2558", 144, "", "#ffd84d"));
  A("Plâtre dédicacé", "✍️", "jambe", 4, { single: 1, leg: P(legSeg(132, 222, 4, 2, 2), "#fdfaf2", "#b0a48e", 2) + heart(-6, 152, 5) + `<text x="2" y="178" text-anchor="middle" font-size="9" fill="#3f6fd8" font-family="Nunito,cursive" transform="rotate(-8 2 178)">Bravo!</text>` + smile(6, 198, 6) + star(-8, 206, 5) });
  A("Bracelets de cheville", "🐚", "jambe-peau", 4, { leg: beads("M-14,198 Q0,208 13,198", "#7fd1e8", 4, 4.6) + beads("M-13,207 Q0,217 12,207", "#ffd166", 4, 4.6) });
  A("Jambière de chevalière", "🛡️", "jambe", 4, { leg: P("M-23,130 Q0,122 21,130 Q23,170 13,214 Q0,222 -13,214 Q-25,170 -23,130Z", SI, SD, 2) + N("M0,128 V216 M-21,150 Q0,160 20,150 M-18,178 Q0,187 17,178", SD, 1.5) + gem(0, 140, 7, "#ef4b6c", "#8f1a38") });
  A("Bottes galaxie", "🌌", "jambe", 3, sock(GX, GXD, 136, spark(-8, 156, 5) + spark(6, 186, 5, "#ffe27a"), "#b18cf2"));
  A("Chaussettes chat", "🐱", "jambe", 3, sock("#8d86a5", "#4a4366", 152, P("M-19,154 L-20,138 L-8,150Z M17,154 L18,138 L6,150Z", "#8d86a5") + E(-7, 168, 2.4, 3.4, "#2c2740", "") + E(6, 168, 2.4, 3.4, "#2c2740", "") + P("M-3,174 h5 l-2.5,3.4Z", "#ff9fb0") + N("M-15,174 l-6,-1 M-15,178 l-6,2 M13,174 l6,-1 M13,178 l6,2", "#4a4366", 1.4)));
  A("Jambières en or", "🏆", "jambe", 4, { leg: P("M-24,128 Q0,118 22,128 Q24,170 14,214 Q0,224 -14,214 Q-26,170 -24,128Z", GO, GD, 2.1) + N("M-21,146 Q0,156 20,146 M-14,206 Q0,215 13,206", GD, 1.6) + star(-1, 174, 13, "#fff3c4") + spark(8, 152, 6) });

  // ======================== PIED ========================
  Z = "pied";
  const toesN = c => { const cs = Array.isArray(c) ? c : [c, c, c, c, c]; return [[-21.5, 261, 2.2], [-14.5, 263, 2.4], [-7.5, 263.6, 2.6], [-.5, 263.4, 2.8], [8.5, 261.4, 4]].map(([x, y, r], i) => E(x, y, r, r * .9, cs[i], dk(cs[i], .35), .8) + `<circle cx="${x - .7}" cy="${y - .8}" r=".7" fill="#fff"/>`).join(""); };
  const FB = p => `C-14,238 ${-26 - p},244 ${-28 - p},256 C${-29 - p},${265 + p} -20,${268 + p} -12,${268 + p} L8,${268 + p} C${17 + p},${268 + p} ${17 + p},256 ${15 + p},248 C13,240 12,236 `;
  const shoe = (y0, c, st, p = 2.2) => P(`M${-12.6 - p * .5},${y0} ${y0 < 230 ? `L${-12.4 - p * .4},232 ` : ""}${FB(p)}${12.4 + p * .5},${Math.max(y0, 232)} L${12.6 + p * .5},${y0} Q0,${y0 + 6} ${-12.6 - p * .5},${y0}Z`, c, st || FLX(c), 2);
  const sole = (c, st) => P("M-31,259 Q-6,266 18,258 Q20,272 10,272 L-16,272 Q-32,272 -31,259Z", c, st || FLX(c), 1.8);
  const laces = c => N("M-9,238 L8,241 M8,238 L-9,242 M-11,246 L9,249 M9,245 L-11,250", c, 1.9);
  A("Vernis rouge", "💅", "ongles-pied", 2, { leg: toesN("#e5354d"), legB: "" });
  A("Vernis rose", "💅", "ongles-pied", 2, { leg: toesN("#ff8fc0"), legB: "" });
  A("Vernis turquoise", "💅", "ongles-pied", 2, { leg: toesN("#35c9c0"), legB: "" });
  A("Vernis arc-en-ciel", "🌈", "ongles-pied", 2, { leg: toesN(["#b18cf2", "#5bb8f5", "#5fd68c", "#ffd84d", "#ff6b8b"]), legB: "" });
  A("Baskets blanches", "👟", "chaussures", 6, { leg: shoe(232, "#fbfcff", "#6b7690") + P("M-27,252 Q-10,244 4,256 Q-8,262 -28,260Z", "#ffd0de", "#c25a86", 1.4) + laces("#8fa0b8") + sole("#fff", "#6b7690") + N("M-30,264 Q-6,271 18,263", "#ff6f9a", 2.6) });
  A("Ballerines", "🩰", "chaussures", 6, { leg: P("M-28,252 Q-32,268 -14,269 L9,269 Q20,268 16,250 Q10,262 -4,262 Q-20,262 -28,252Z", "#f0568c", "#8f1f4c", 2) + bow(-5, 263, 5, "#ffb3d0") });
  A("Sandales", "👡", "chaussures", 6, { leg: sole("#c9935a", "#7a4a1c") + strap("M-27,254 Q-6,244 14,254", "#a5683a", 5) + strap("M-12,232 Q0,238 12,232 M0,236 V250", "#a5683a", 4) + flower(-5, 250, 6, "#fff") });
  A("Socquettes", "🧦", "socquettes", 4, { leg: P(footPath(214, 1.8), "#fffaf4", "#a89a86", 1.8) + leg(212, 221, "#8fd0f5", 2.6) });
  A("Socquettes à pois", "🫧", "socquettes", 4, { leg: P(footPath(214, 1.8), "url(#pDotsBlue)", "#2a4a9a", 1.8) + leg(212, 221, "#fff", 2.6, "#2a4a9a") });
  A("Chaussons lapin", "🐰", "chaussures", 6, { leg: P("M-17,236 Q-34,244 -32,260 Q-30,273 -10,272 L8,272 Q22,272 20,256 Q18,242 14,236 Q0,242 -17,236Z", "#fff", "#b59aa8", 2) + P("M-18,240 C-30,222 -28,208 -20,208 C-12,212 -10,228 -10,240Z M8,240 C20,224 20,210 12,208 C4,212 2,228 2,240Z", "#fff", "#b59aa8", 1.8) + N("M-19,232 Q-22,220 -20,214 M10,232 Q13,220 12,214", "#ffb3c7", 3) + C(-12, 253, 2.2, "#3a2a35", "") + C(2, 253, 2.2, "#3a2a35", "") + E(-5, 259, 2.8, 2, "#ff8fa8", "") + C(-19, 259, 3, "#ffc6d4", "") + C(9, 259, 3, "#ffc6d4", "") });
  A("Bottes de pluie", "🌧️", "chaussures", 6, { leg: P(`M-22,170 Q0,180 20,170 L16,232 C17,240 19,246 20,252 C22,268 14,271 8,271 L-14,271 C-26,271 -32,266 -31,256 C-29,244 -18,240 -17,232Z`, "#ffd23d", "#a87c0a", 2.1) + P("M-23,168 Q0,178 21,168 L20,178 Q0,188 -22,178Z", "#ffe58a", "#a87c0a", 1.7) + N("M-31,262 Q-6,268 20,261", "#a87c0a", 2) + `<path d="M-14,186 Q-14,214 -12,230" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/>` });
  A("Baskets montantes", "👟", "chaussures", 6, { leg: shoe(208, "#e5484d", "#8f1f2c", 3) + P("M-28,254 Q-10,246 14,256 Q12,266 -6,266 Q-28,266 -28,254Z", "#fff", "#8f1f2c", 1.6) + N("M-8,216 L8,220 M8,216 L-8,220 M-8,226 L8,230 M8,226 L-8,230 M-9,236 L8,240 M8,236 L-9,240", "#fff", 2) + sole("#fff", "#6b7690") + star(-13, 224, 5, "#fff", "#8f1f2c") });
  A("Pointes de danse", "🩰", "chaussures", 6, { leg: P("M-13,232 C-16,244 -24,250 -24,260 Q-22,272 -6,272 Q12,272 13,258 C13,248 12,240 12,232 Q0,250 -13,232Z", "#ffc9bd", "#b5705f", 2) + P("M-22,262 Q-6,256 13,262 Q12,273 -6,273 Q-22,273 -22,262Z", "#ffe0d6", "#b5705f", 1.5) + N("M-13,234 Q0,220 11,208 M12,234 Q0,220 -12,208 M-12,208 Q0,214 11,208", "#b5705f", 4.8) + N("M-13,234 Q0,220 11,208 M12,234 Q0,220 -12,208 M-12,208 Q0,214 11,208", "#ffd6cb", 3.2) + bow(0, 209, 5, "#ffb3a3") });
  A("Bracelet de cheville", "🌟", "cheville", 3, { leg: N("M-12,220 Q0,230 12,220", GD, 3) + N("M-12,220 Q0,230 12,220", "#fbd25e", 1.8) + star(-6, 230, 4) + heart(2, 232, 3.4) + C(8, 228, 2.4, "#5bb8f5") });
  A("Tongs", "🩴", "chaussures", 3, { leg: P("M-31,256 Q-32,274 -14,274 L8,274 Q22,274 19,256 Q17,268 8,268 L-12,268 Q-26,268 -31,256Z", "#ff9a3c", "#a84f10", 1.8) + strap("M-24,250 Q-8,250 2,262 M14,248 Q8,252 2,262", "#35c9c0", 4) + flower(2, 259, 5, "#fff") });
  A("Rollers", "🛼", "chaussures", 6, { leg: P(`M-18,196 Q0,204 16,196 L15,232 C16,240 18,246 19,252 C20,262 14,264 8,264 L-14,264 C-26,264 -31,260 -30,252 C-28,244 -16,240 -15,232Z`, "#fff", "#7a6a9a", 2) + N("M-8,206 L8,210 M8,206 L-8,210 M-8,218 L8,222 M8,218 L-8,222", "#ff6fa8", 2.2) + R(-28, 262, 46, 5, 2, "#8f9ab5") + [-22, -10, 2, 14].map(x => C(x, 271, 5, "#ff6fa8") + C(x, 271, 1.8, "#fff", "")).join("") + star(-12, 250, 5) });
  A("Chaussons ourson", "🐻", "chaussures", 6, { leg: C(-24, 240, 6, "#b9784a") + C(14, 240, 6, "#b9784a") + P("M-17,236 Q-34,244 -32,260 Q-30,273 -10,272 L8,272 Q22,272 20,256 Q18,242 14,236 Q0,242 -17,236Z", "#c98a58", "#6f3f1c", 2) + E(-5, 262, 10, 7, "#f3dcc0", "#6f3f1c", 1.2) + C(-14, 251, 2.2, "#3a2010", "") + C(4, 251, 2.2, "#3a2010", "") + E(-5, 258, 3, 2.2, "#3a2010", "") });
  A("Crampons de foot", "⚽", "chaussures", 6, { leg: shoe(230, "#2c3148", "#10131f") + P("M-28,252 Q-14,240 6,254 Q-10,256 -29,258Z", "#4fffb0", "#0f8a52", 1.4) + laces("#fff") + P("M-31,260 Q-6,267 18,259 L17,266 Q-6,272 -30,267Z", "#4fffb0", "#0f8a52", 1.6) + [-25, -14, -3, 8].map(x => P(`M${x - 2.6},267 h5.2 l-1,7 h-3.2Z`, "#10131f", "#10131f", 1)).join("") });
  A("Baskets ailées", "🪽", "chaussures", 7, { leg: P("M-14,232 C-34,206 -58,208 -60,220 C-52,220 -50,224 -52,228 C-58,230 -54,238 -48,238 C-44,244 -28,246 -18,242Z", "url(#gWing)", "#8c9cc4", 1.8) + N("M-22,234 Q-38,220 -54,221 M-22,238 Q-36,232 -48,234", "#b3c2e6", 1.5) + shoe(226, GO, GD, 2.6) + laces("#fff8e0") + sole("#fff6dc", GD) + star(-15, 250, 5, "#fff3c4") });
  A("Souliers de cristal", "👠", "chaussures", 7, { leg: shoe(234, CR, CD, 2) + N("M-24,252 Q-10,244 2,250", "#fff", 3) + gem(-4, 254, 6) + P("M-31,260 Q-6,267 18,259 L17,268 Q-6,274 -30,268Z", "#d8f3ff", CD, 1.6) + spark(-20, 246, 6) + spark(10, 252, 5) });

  // ---------- Finitions : identifiants ----------
  const n = {};
  // cadrages de vignette particuliers (objets plus grands que leur zone) et vue conseillée
  const VB = { "dos-2": "80 160 240 240", "dos-3": "20 80 360 360", "dos-4": "20 60 360 360", "dos-5": "30 60 340 340", "dos-10": "70 110 260 260", "dos-12": "80 150 260 260", "dos-13": "90 150 220 220", "dos-15": "20 70 360 360", "dos-16": "20 70 360 360", "dos-18": "80 110 240 240", "dos-20": "10 70 380 380", "dos-9": "100 130 220 220",
    "main-15": "14 278 150 150", "main-18": "24 300 140 140", "main-19": "0 196 220 220", "abdomen-9": "112 220 176 176", "bassin-7": "70 300 260 260", "bassin-8": "90 300 220 220", "bassin-15": "140 220 200 200", "bassin-16": "140 220 200 200", "bassin-17": "110 286 180 180", "bassin-19": "60 300 280 280", "bassin-2": "104 296 192 192", "bassin-3": "94 290 212 212", "bassin-12": "104 296 192 192", "bassin-14": "104 296 192 192", "bassin-13": "90 300 220 220",
    "epaule-11": "74 108 136 136", "epaule-12": "82 132 120 120", "epaule-20": "42 122 136 136", "cuisse-3": "88 346 120 120", "cuisse-4": "104 340 130 130", "cuisse-18": "96 340 170 170", "thorax-5": "110 160 180 180", "bras-7": "46 210 190 190", "bras-19": "66 206 110 110", "pied-11": "98 500 130 130", "pied-19": "72 528 130 130", "pied-16": "104 520 124 124" };
  ACC.forEach(r => { n[r.z] = (n[r.z] ?? 0) + 1; r.id = r.z + "-" + n[r.z]; r.vb = VB[r.id]; r.back = r.z === "dos" || r.id === "bassin-17"; delete r.armx; });
  // vignette : le personnage portant seulement cet accessoire, cadré sur sa zone
  CORPS.thumb = (a, o = {}) => CORPS.svg({ view: a.back ? "b" : "f", worn: [a], crop: a.z, vb: a.vb, cls: "thumb", label: a.name, ...o });
  CORPS.ACC = ACC;
  CORPS.ACC_BY = Object.fromEntries(ACC.map(a => [a.id, a]));
  CORPS.accByZone = z => ACC.filter(a => a.z === z);
  CORPS.BACK_ZONES = ["dos"]; // zones à montrer de dos
  CORPS.brush = { P, N, C, E, R, star, heart, flower, bow, gem, spark, bolt };
})();
