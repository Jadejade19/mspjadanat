"use strict";
// ============================================================================
//  ACCESSOIRES DU COMPAGNON : un à chaque niveau, un toutes les 10 bonnes
//  réponses d'affilée. Un accessoire par emplacement, combinables entre eux.
//    tete / yeux / cou : posés sur l'animal     dos : derrière lui
//    objet : à côté de lui     lieu : son habitat     aura : autour de lui
// ============================================================================
(function () {
  const { dk, lt, starD, heartD } = CORPS;
  const P = (d, f, s, w = 2.4, x = "") => `<path d="${d}" fill="${f}"${s === "" ? "" : ` stroke="${s || (f[0] === "#" ? dk(f, .45) : "#4a3550")}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`} ${x}/>`;
  const N = (d, c, w = 2, x = "") => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${x}/>`;
  const C = (x, y, r, f, s, w = 2) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${s === "" ? "" : ` stroke="${s || (f[0] === "#" ? dk(f, .45) : "#4a3550")}" stroke-width="${w}"`}/>`;
  const E = (x, y, a, b, f, s, w = 2, t = "") => `<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="${f}"${s === "" ? "" : ` stroke="${s || (f[0] === "#" ? dk(f, .45) : "#4a3550")}" stroke-width="${w}"`} ${t}/>`;
  const R = (x, y, w, h, r, f, s, sw = 2.2) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" stroke="${s || (f[0] === "#" ? dk(f, .45) : "#4a3550")}" stroke-width="${sw}"/>`;
  const M = s => s + `<g transform="scale(-1 1)">${s}</g>`;
  const MX = s => s + `<g transform="matrix(-1 0 0 1 200 0)">${s}</g>`;
  const star = (x, y, r, c = "#ffd84d") => P(starD(x, y, r), c, dk(c, .4), 1.4), heart = (x, y, s, c = "#f0567c") => P(heartD(x, y, s), c, dk(c, .4), 1.5);
  const spark = (x, y, s, c = "#fff") => `<path d="M${x},${y - s} Q${x},${y} ${x + s},${y} Q${x},${y} ${x},${y + s} Q${x},${y} ${x - s},${y} Q${x},${y} ${x},${y - s}Z" fill="${c}"/>`;
  const fl = (x, y, r, c, m = "#ffd166") => [0, 72, 144, 216, 288].map(a => { const t = a * Math.PI / 180; return `<circle cx="${(x + r * .6 * Math.sin(t)).toFixed(1)}" cy="${(y - r * .6 * Math.cos(t)).toFixed(1)}" r="${(r * .5).toFixed(1)}" fill="${c}" stroke="${dk(c, .28)}" stroke-width="1"/>`; }).join("") + C(x, y, r * .36, m, dk(m, .3), 1);
  const bow = (x, y, s, c) => P(`M${x},${y} C${x - s * .5},${y - s} ${x - s * 1.6},${y - s} ${x - s * 1.4},${y} C${x - s * 1.6},${y + s} ${x - s * .5},${y + s} ${x},${y} C${x + s * .5},${y - s} ${x + s * 1.6},${y - s} ${x + s * 1.4},${y} C${x + s * 1.6},${y + s} ${x + s * .5},${y + s} ${x},${y}Z`, c) + E(x, y, s * .34, s * .42, lt(c, .2), dk(c, .4));
  const GO = "url(#gGold)", GD = "#8f5a0c", SI = "url(#gSilver)", SD = "#56627a", CR = "url(#gCrystal)", CD = "#3f74b8";
  const L = [];
  const A = (id, s, name, art) => L.push({ id: "gear-" + id, s, name, ...(typeof art === "string" ? { a: art } : art) });

  // ======================== TÊTE (origine : sommet du crâne) ========================
  const T = (id, n, a) => A(id, "tete", n, a);
  T("crown-pet", "Mini couronne", P("M-30,6 L-34,-26 L-16,-12 L-8,-34 L0,-14 L8,-34 L16,-12 L34,-26 L30,6 Q0,-6 -30,6Z", GO, GD, 2.6) + C(0, -6, 5, "#ef4b6c") + C(-17, -3, 3, "#5bb8f5") + C(17, -3, 3, "#5bb8f5"));
  T("hautdeforme", "Haut-de-forme", E(0, 2, 42, 9, "#332e44") + P("M-25,0 L-27,-44 Q0,-54 27,-44 L25,0 Q0,10 -25,0Z", "#3d3752") + P("M-26,-14 Q0,-4 26,-14 L25,-2 Q0,8 -25,-2Z", "#d6435a") + E(0, -45, 27, 6, "#4b4464"));
  T("paille", "Chapeau de paille", E(0, 2, 50, 12, "#f3d48a") + P("M-28,-2 C-28,-38 28,-38 28,-2 Q0,8 -28,-2Z", "#f9e0a5") + P("M-29,-10 Q0,2 29,-10 L29,-1 Q0,10 -29,-1Z", "#ef6f7d") + fl(22, -6, 9, "#fff") + N("M-18,-22 q18,-8 36,0 M-44,2 Q0,14 44,2", "#c9a050", 1.6));
  T("casquette", "Casquette", P("M-32,2 C-32,-36 32,-36 32,2 Q0,-8 -32,2Z", "#4f86e8") + P("M-34,4 Q0,-12 42,4 Q50,12 40,14 Q0,2 -34,10Z", "#3566c0") + C(0, -26, 3.5, "#ffd84d") + star(0, -10, 8));
  T("bonnet", "Bonnet à pompon", P("M-34,0 C-34,-42 34,-42 34,0 Q0,-10 -34,0Z", "url(#pKnitRed)", "#7c1c2a") + P("M-37,-2 Q0,-14 37,-2 L36,12 Q0,0 -36,12Z", "#fff6ea", "#b59d83") + C(0, -36, 11, "#fff6ea", "#b59d83"));
  T("beret", "Béret d'artiste", P("M-34,2 C-44,-22 0,-38 36,-22 C50,-14 44,2 34,4 Q0,-10 -34,2Z", "#d63e4e") + N("M8,-27 q2,-9 7,-10", "#8f1f2c", 4) + N("M-24,-10 Q-6,-22 18,-20", "#f58a94", 3));
  T("pirate", "Chapeau de pirate", P("M-46,4 C-40,-18 -30,-42 0,-42 C30,-42 40,-18 46,4 Q0,-14 -46,4Z", "#34303f") + N("M-40,0 Q0,-18 40,0", "#f3c04a", 3) + C(0, -24, 7, "#fff", "") + C(-2.6, -25, 1.8, "#34303f", "") + C(2.6, -25, 1.8, "#34303f", "") + N("M-9,-13 L9,-9 M9,-13 L-9,-9", "#fff", 3));
  T("chef", "Toque de chef", P("M-26,2 V-18 C-48,-24 -40,-52 -20,-46 C-14,-62 14,-62 20,-46 C40,-52 48,-24 26,-18 V2 Q0,-8 -26,2Z", "#fff", "#a8b0c0") + N("M-26,-10 Q0,-20 26,-10 M-10,-40 v12 M10,-40 v12", "#c9cfdb", 2));
  T("fete", "Chapeau de fête", P("M-24,4 L0,-54 L24,4 Q0,-8 -24,4Z", "#b48cf2") + N("M-18,-10 Q0,-18 14,-18 M-12,-26 Q0,-32 9,-30", "#ffe27a", 5) + P("M0,-54 l-9,-9 l6,1 l3,-10 l3,10 l6,-1Z", "#ff7aa8") + C(-8, -2, 3, "#5bd6a0", "") + C(10, -4, 3, "#ff9a5c", ""));
  T("chantier", "Casque de chantier", P("M-34,2 C-34,-40 34,-40 34,2 Q0,-8 -34,2Z", "#ffc93c") + P("M-44,4 Q0,-12 44,4 L42,11 Q0,-2 -42,11Z", "#f5b020") + P("M-6,-31 h12 V-4 h-12Z", "#ffdc7a"));
  T("cowboy", "Chapeau de cow-boy", P("M-52,-6 C-40,6 -30,6 -26,-2 C-30,-30 -20,-42 -8,-34 Q0,-28 8,-34 C20,-42 30,-30 26,-2 C30,6 40,6 52,-6 C46,18 -46,18 -52,-6Z", "#a5683a") + N("M-26,-4 Q0,8 26,-4", "#5f3316", 5) + star(0, 0, 6));
  T("sorcier", "Chapeau de sorcier", E(0, 4, 46, 10, "#4b3590") + P("M-30,0 C-16,-20 -10,-46 18,-66 C14,-50 22,-30 30,0 Q0,12 -30,0Z", "#5f45b0") + star(-4, -18, 6) + star(10, -36, 4.5, "#fff") + star(14, -8, 4));
  T("noeud", "Gros nœud rose", bow(0, -8, 17, "#ff7fb0"));
  T("noeudbleu", "Nœud à pois", bow(0, -8, 17, "#5f9fe8") + [[-18, -12], [-14, -2], [16, -13], [20, -3]].map(([x, y]) => C(x, y, 2.2, "#fff", "")).join(""));
  T("fleur", "Grande fleur", fl(0, -8, 22, "#ff9fc0") + E(20, 2, 10, 5, "#7cc47c", undefined, 2, 'transform="rotate(25 20 2)"'));
  T("marguerites", "Couronne de fleurs", N("M-38,10 Q0,-22 38,10", "#5fa35f", 5) + [[-34, 4, "#ff9fb8"], [-18, -5, "#fff"], [0, -9, "#ffd98a"], [18, -5, "#c7a3f5"], [34, 4, "#ff9fb8"]].map(([x, y, c]) => fl(x, y, 12, c)).join(""));
  T("antennes", "Antennes d'abeille", N("M-32,8 Q0,-12 32,8", "#3a2a1c", 5) + M(N("M14,-4 Q18,-24 28,-34", "#3a2a1c", 3) + C(28, -36, 6, "#ffd23f")));
  T("lapinou", "Oreilles de lapin", M(P("M8,-2 C6,-34 14,-58 24,-54 C32,-44 28,-16 22,2Z", "#fff", "#b59aa8") + P("M14,-6 C12,-30 17,-46 22,-44 C26,-36 24,-18 20,-4Z", "#ffb3c7", "")) + N("M-32,8 Q0,-12 32,8", "#f7a1bd", 5));
  T("licorne", "Corne de licorne", P("M-9,2 L0,-52 L9,2 Q0,6 -9,2Z", "#ffe27a", "#b5861c") + N("M-6,-10 L7,-16 M-4,-24 L5,-30 M-2,-38 L3,-42", "#b5861c", 2) + [[-22, -2, "#ff8fb0"], [-13, -7, "#ffd166"], [13, -7, "#7fd68c"], [22, -2, "#7fb8f5"]].map(([x, y, c]) => C(x, y, 8, c)).join(""));
  T("diademe", "Diadème de glace", P("M-32,6 Q-16,-14 -10,-8 L-6,-22 L0,-10 L0,-34 L0,-10 L6,-22 L10,-8 Q16,-14 32,6 Q0,-10 -32,6Z", CR, CD) + P("M-6,-28 L0,-42 L6,-28 L0,-18Z", "#dff6ff", CD) + spark(18, -18, 6) + spark(-18, -16, 5));
  T("aureole", "Auréole", `<circle cx="0" cy="-18" r="40" fill="url(#gGlow)" opacity=".7"/>` + E(0, -20, 32, 9, "none", GD, 8) + E(0, -20, 32, 9, "none", "#ffd84d", 5));
  T("audio", "Casque audio", N("M-46,46 C-52,-24 52,-24 46,46", "#8f3f70", 9) + N("M-46,46 C-52,-24 52,-24 46,46", "#ff8fb8", 6) + M(R(38, 32, 17, 30, 8, "#ff6fa3")));
  T("diplome", "Chapeau de diplômée", P("M-26,6 V-8 Q0,2 26,-8 V6 Q0,16 -26,6Z", "#3a3552") + P("M-48,-14 L0,-30 L48,-14 L0,4Z", "#4a4468") + N("M0,-14 Q26,-10 34,-2 V14", "#ffd84d", 2.6) + P("M30,12 h8 l2,14 h-12Z", "#ffd84d", "#a87a10", 1.6));
  T("noel", "Bonnet de Noël", P("M-32,2 C-30,-30 0,-48 34,-40 C46,-36 48,-18 46,-8 C38,-24 30,-20 32,2 Q0,-10 -32,2Z", "#e5404c") + P("M-36,0 Q0,-14 36,0 L35,12 Q0,0 -35,12Z", "#fff", "#b5b0b8") + C(46, -4, 9, "#fff", "#b5b0b8"));
  T("helmet", "Casque spatial", `<circle cx="0" cy="44" r="66" fill="#bfe6ff" opacity=".22"/><circle cx="0" cy="44" r="66" fill="none" stroke="#e8eef8" stroke-width="6"/><circle cx="0" cy="44" r="69" fill="none" stroke="#7d8aa5" stroke-width="2"/>` + N("M-46,18 Q-34,-6 -10,-12", "#fff", 6, 'opacity=".9"'));
  T("feuilletete", "Feuille de printemps", N("M0,4 V-10", "#4f8a54", 4) + M(P("M0,-10 C8,-28 28,-26 32,-16 C26,-4 10,-4 0,-10Z", "#7fd67f", "#2f7a3a")));
  T("champi", "Chapeau champignon", P("M-40,6 C-44,-40 44,-40 40,6 Q0,-8 -40,6Z", "#ec4a4f") + [[-20, -14, 7], [4, -24, 8], [24, -10, 6], [0, -6, 4]].map(([x, y, r]) => E(x, y, r, r * .8, "#fff", "")).join(""));
  T("viking", "Casque viking", P("M-34,4 C-34,-38 34,-38 34,4 Q0,-8 -34,4Z", SI, SD) + M(P("M28,-6 C50,-4 56,-24 50,-40 C44,-26 34,-22 24,-22Z", "#fff6e0", "#b59a6a")) + P("M-36,2 Q0,-12 36,2 L35,10 Q0,-2 -35,10Z", "#d9a04c"));
  T("the", "Tasse de thé", P("M-22,-22 H22 C22,0 12,6 0,6 C-12,6 -22,0 -22,-22Z", "#fff", "#c25a86") + N("M22,-16 q14,-2 10,10 q-4,6 -14,4", "#c25a86", 4) + E(0, -22, 22, 5, "#b5743c", "#c25a86") + fl(0, -8, 8, "#ff9fc0") + N("M-6,-32 q-5,-6 0,-12 M6,-32 q-5,-6 0,-12", "#c9bcc8", 2.4) + E(0, 8, 32, 5, "#fff", "#c25a86"));
  T("sherlock", "Chapeau de détective", P("M-30,2 C-30,-38 30,-38 30,2 Q0,-8 -30,2Z", "url(#pArgyle)", "#6d3d1e") + M(P("M22,2 C38,0 50,8 48,16 C36,18 26,12 20,8Z", "#b9784a", "#6d3d1e")) + bow(0, -32, 7, "#8a5230"));
  T("pompier", "Casque de pompier", P("M-32,4 C-32,-38 32,-38 32,4 Q0,-6 -32,4Z", "#e5404c") + P("M-44,6 Q0,-10 44,6 Q40,14 0,4 Q-40,14 -44,6Z", "#c22f3c") + P("M-10,-2 V-20 Q0,-28 10,-20 V-2 Q0,4 -10,-2Z", GO, GD) + P("M-4,-36 h8 V-24 h-8Z", "#ffd84d", "#a87a10"));
  T("glacetete", "Cornet de glace", P("M-18,-10 L0,-54 L18,-10Z", "#e8b06a") + N("M-12,-18 L4,-44 M-4,-12 L10,-34 M12,-18 L-4,-44", "#a5703c", 1.6) + P("M-30,-2 C-32,-20 -18,-24 0,-18 C18,-24 32,-20 30,-2 C32,8 20,8 18,0 C14,10 4,10 2,0 C-4,12 -14,8 -14,0 C-20,8 -32,8 -30,-2Z", "#ffb3cf"));
  T("poussin", "Poussin perché", C(0, -18, 19, "#fde06b") + C(0, -40, 13, "#fde06b") + C(-5, -42, 2.2, "#2b1a24", "") + C(5, -42, 2.2, "#2b1a24", "") + P("M-4,-37 h8 l-4,6Z", "#f5963c", "#8f4f14", 1.4) + E(-9, -37, 3, 2, "#ff9f9f", "") + E(9, -37, 3, 2, "#ff9f9f", ""));

  // ======================== YEUX (origine : entre les yeux, écart ±1 = centre de l'œil) ========================
  const Y = (id, n, one, bridge = "") => A(id, "yeux", n, { eye: one, bridge });
  Y("lunettes", "Lunettes rondes", `<circle r="17" fill="#dff3ff" fill-opacity=".35" stroke="#8a4a2e" stroke-width="3.4"/>` + N("M-9,-8 Q-5,-12 0,-12", "#fff", 2.2), "#8a4a2e");
  Y("soleil", "Lunettes de soleil", P("M-18,-12 Q0,-17 18,-12 Q19,12 2,14 Q-17,13 -18,-12Z", "#2c2740", "#14101f") + N("M-11,-8 L-2,-10", "#8f86c4", 2.6), "#14101f");
  Y("coeurs", "Lunettes cœur", `<g opacity=".88">${P(heartD(0, 0, 16), "#f0567c", "#9c2348", 2.4)}</g>` + N("M-9,-6 Q-7,-10 -3,-9", "#fff", 2.2), "#9c2348");
  Y("etoiles", "Lunettes étoile", `<g opacity=".88">${P(starD(0, 0, 20), "#ffd23f", "#a87a10", 2.4)}</g>`, "#a87a10");
  Y("trois-d", "Lunettes 3D", `<rect x="-17" y="-13" width="34" height="26" rx="4" fill="#5bb8f5" fill-opacity=".75" stroke="#fff" stroke-width="5"/><rect x="-19.500" y="-15.500" width="39" height="31" rx="6" fill="none" stroke="#8fa0b8" stroke-width="1.500"/>`, "#fff");
  Y("heros", "Masque de super-héros", P("M-22,-10 Q0,-22 22,-8 Q22,12 4,14 Q-18,16 -22,-10Z M-11,0 a11,12 0 1 0 22,0 a11,12 0 1 0 -22,0Z", "#e5404c", "#8f1a2c", 2.2, 'fill-rule="evenodd"'), "#e5404c");
  Y("ski", "Masque de ski", P("M-20,-14 Q0,-19 22,-14 V12 Q0,18 -20,12Z", "url(#gRainbowH)", "#4a3550", 3, 'opacity=".9"') + N("M-12,-8 L-2,-10", "#fff", 3), "#4a3550");
  Y("monocle", "Lunettes d'aviateur", P("M-17,-12 Q0,-16 17,-12 Q18,8 0,16 Q-18,8 -17,-12Z", "#d9a04c", "#8f5f1c", 2.6, 'fill-opacity=".55"') + N("M-9,-8 Q-5,-11 0,-11", "#fff", 2.2), "#8f5f1c");
  Y("papillons", "Lunettes papillon", P("M-16,10 Q-20,-8 0,-12 Q16,-16 26,-20 Q22,14 2,15 Q-12,16 -16,10Z", "#b48cf2", "#5f3fa5", 2.4, 'fill-opacity=".7"'), "#5f3fa5");
  Y("fleurs", "Lunettes fleur", [0, 72, 144, 216, 288].map(a => `<circle cx="0" cy="-11" r="8" fill="#ff9fc0" fill-opacity=".85" stroke="#c25a86" stroke-width="1.500" transform="rotate(${a})"/>`).join("") + `<circle r="9" fill="#fff6d8" fill-opacity=".55" stroke="#c25a86" stroke-width="1.500"/>`, "#c25a86");
  Y("cernes", "Maquillage de clown", P("M-5,-24 L0,-12 L5,-24Z M-5,24 L0,12 L5,24Z", "#5bb8f5", "#215f94", 1.4));
  Y("paillettes", "Paillettes", spark(-12, 14, 6, "#ffd84d") + spark(2, 19, 5, "#ff9fd0") + spark(13, 12, 5, "#8fe0ff"));

  // ======================== COU ========================
  const K = (id, n, a) => A(id, "cou", n, a);
  const scarf = (f, s) => P("M-34,-8 Q0,8 34,-8 L36,6 Q0,24 -36,6Z", f, s) + P("M14,10 L28,44 L16,42 L8,48 L4,12Z", f, s);
  const ban = (c, w = 7) => N("M-32,-6 Q0,10 32,-6", dk(c, .45), w + 3) + N("M-32,-6 Q0,10 32,-6", c, w);
  K("scarf-pet", "Écharpe rouge", scarf("#e5484d", "#8f1f2c"));
  K("echarpe-arc", "Écharpe arc-en-ciel", scarf("url(#pStripeRainbow)", "#7a4a9a"));
  K("echarpe-noel", "Écharpe rayée", scarf("url(#pStripeRed)", "#9c2a3c"));
  K("bell", "Clochette", ban("#e5484d", 5) + C(0, 12, 12, GO, GD) + N("M-12,11 H12 M0,14 V22", GD, 2));
  K("papillon", "Nœud papillon", ban("#7a5cd6", 4) + bow(0, 6, 14, "#7a5cd6"));
  K("papillon-rouge", "Nœud papillon rouge", ban("#d6435a", 4) + bow(0, 6, 14, "#d6435a"));
  K("perles", "Collier de perles", `<path d="M-32,-6 Q0,20 32,-6" fill="none" stroke="#b9a894" stroke-width="9" stroke-dasharray=".01 8.500" stroke-linecap="round"/><path d="M-32,-6 Q0,20 32,-6" fill="none" stroke="#fffaf2" stroke-width="7" stroke-dasharray=".01 8.500" stroke-linecap="round"/>`);
  K("medaille", "Médaille d'or", P("M-24,-8 L-14,-6 L4,20 L-6,24Z", "#3f6fd8") + P("M24,-8 L14,-6 L-4,20 L6,24Z", "#e5484d") + C(0, 28, 14, GO, GD, 2.4) + star(0, 28, 8));
  K("cravate", "Cravate", ban("#fff8ee", 5) + P("M-6,2 H6 L4,12 L10,42 L0,52 L-10,42 L-4,12Z", "url(#pStripeNavy)", "#1f3361"));
  K("bandana", "Bandana", P("M-34,-8 Q0,8 34,-8 Q30,6 0,36 Q-30,6 -34,-8Z", "url(#pDotsBlue)", "#2a4a9a"));
  K("bandana-fleur", "Bandana fleuri", P("M-34,-8 Q0,8 34,-8 Q30,6 0,36 Q-30,6 -34,-8Z", "url(#pFlowers)", "#b5825a"));
  K("hawai", "Collier hawaïen", [[-30, -4, "#ff7aa8"], [-20, 6, "#ffd166"], [-7, 11, "#ff9a5c"], [7, 11, "#c78af0"], [20, 6, "#ff7aa8"], [30, -4, "#ffd166"]].map(([x, y, c]) => fl(x, y, 12, c, "#fff3b0")).join(""));
  K("stetho", "Stéthoscope", N("M-26,-8 C-30,20 -14,24 0,24 C14,24 30,20 26,-8 M0,24 Q2,40 18,40", "#3d7f8a", 5) + C(24, 41, 9, SI, SD) + C(24, 41, 4.4, "#eef3fa", SD, 1.4));
  K("osier", "Pendentif os", ban("#8a5230", 4) + P("M-11,16 a5,5 0 1 1 4,-5 h14 a5,5 0 1 1 4,5 a5,5 0 1 1 -4,9 h-14 a5,5 0 1 1 -4,-9Z", "#fffaf0", "#a8957c"));
  K("coeur", "Médaillon cœur", ban("#f0567c", 4) + heart(0, 14, 13));
  K("diamants", "Rivière de diamants", [[-28, -4, 6], [-16, 4, 7], [0, 9, 10], [16, 4, 7], [28, -4, 6]].map(([x, y, s]) => P(`M${x - s},${y - s * .3} L${x - s * .5},${y - s} H${x + s * .5} L${x + s},${y - s * .3} L${x},${y + s}Z`, CR, CD, 1.5)).join("") + spark(4, 3, 6));
  K("lion", "Collerette de bouffon", [-28, -14, 0, 14, 28].map((x, i) => P(`M${x - 9},${-6 + (14 - Math.abs(x) / 2) * .7} L${x},${26 - Math.abs(x) * .3} L${x + 9},${-6 + (14 - Math.abs(x) / 2) * .7}Z`, ["#ef5366", "#ffd166", "#5fc48a", "#5f9fe8", "#b48cf2"][i]) + C(x, 28 - Math.abs(x) * .3, 4, GO, GD, 1.5)).join(""));
  K("feuilles", "Collier de feuilles", ban("#6fae5a", 3) + [-28, -16, -4, 8, 20].map((x, i) => E(x + 4, 4 - Math.abs(x) * .18, 9, 5, i % 2 ? "#8fd07a" : "#5fae5a", undefined, 1.6, `transform="rotate(${x * 1.5 + 70} ${x + 4} ${4 - Math.abs(x) * .18})"`)).join(""));

  // ======================== DOS (repère de l'animal) ========================
  const B = (id, n, b) => A(id, "dos", n, { b });
  B("ailes-ange", "Ailes d'ange", MX(P("M74,130 C40,86 -12,84 -22,104 C-12,104 -8,110 -12,116 C-20,120 -14,134 -2,132 C-4,142 12,150 24,144 C32,156 58,156 72,148Z", "url(#gWing)", "#8c9cc4") + N("M66,134 C44,112 14,102 -10,106 M64,142 C44,130 20,124 0,126", "#b3c2e6")));
  B("ailes-fee", "Ailes de fée", MX(P("M76,126 C50,60 -6,40 -22,64 C-30,92 30,126 72,134 C30,136 4,164 18,180 C40,190 66,164 78,144Z", "url(#gFairy)", "#a88fd6") + N("M72,126 C46,92 12,70 -10,68 M70,140 C50,146 34,158 26,170", "#fff") + spark(10, 84, 7) + spark(34, 166, 5)));
  B("ailes-papillon", "Ailes de papillon", MX(P("M78,126 C60,60 0,28 -20,62 C-30,90 20,124 70,130 C24,134 10,170 34,182 C56,186 72,160 80,142Z", "url(#gButter)", "#6f1f48") + C(8, 72, 9, "#ffe0a8", "#6f1f48") + C(40, 164, 7, "#ffd1e0", "#6f1f48")));
  B("ailes-dragon", "Ailes de dragon", MX(P("M76,130 C50,80 10,60 -24,62 C-12,76 -10,88 -14,100 C0,98 10,106 14,120 C26,116 40,124 46,140 C58,136 68,140 78,148Z", "url(#gDragon)", "#0f4a3f") + N("M74,130 C46,98 10,74 -20,64 M72,134 C48,114 18,102 -10,102", "#0f4a3f")));
  B("ailes-bat", "Ailes de chauve-souris", MX(P("M76,130 C54,78 14,66 -20,74 C-8,86 -8,100 -14,112 C2,110 12,120 14,132 C28,126 42,134 48,146 C60,140 70,144 78,150Z", "url(#gBat)", "#150a26") + N("M74,130 C48,100 14,80 -14,76 M72,136 C50,118 22,110 -8,112", "#8a6ab5")));
  B("ailes-arc", "Ailes arc-en-ciel", MX(P("M76,130 C50,72 0,56 -22,76 C-28,88 -14,94 -8,92 C-18,102 -6,114 4,110 C0,124 16,132 26,124 C28,140 48,144 54,134 C62,146 74,146 80,140Z", "url(#gRainbow)", "#7a4a9a") + spark(0, 84, 7) + spark(34, 112, 6)));
  B("cape", "Cape de super-héros", P("M66,112 C40,140 14,176 4,194 Q100,212 196,194 C186,176 160,140 134,112Z", "url(#gCape)", "#6f1230", 2.6));
  B("cape-etoiles", "Cape étoilée", P("M66,112 C40,140 14,176 4,194 Q100,212 196,194 C186,176 160,140 134,112Z", "url(#pStars)", "#141b4a", 2.6));
  B("cape-galaxie", "Cape galaxie", P("M66,112 C40,140 14,176 4,194 Q100,212 196,194 C186,176 160,140 134,112Z", "url(#pGalaxy)", "#1d1550", 2.6));
  B("sac", "Cartable", R(42, 104, 116, 84, 22, "#e5565e") + P("M84,106 Q100,90 116,106", "none", "#8f1f2c", 6) + R(34, 130, 26, 44, 9, "#c23a46") + R(140, 130, 26, 44, 9, "#c23a46"));
  B("jetpack", "Jetpack", MX(R(22, 92, 34, 78, 16, SI, SD) + R(18, 118, 42, 10, 4, "#e5484d") + P("M26,170 h26 l5,10 h-36Z", "#5a6478") + P("M24,180 Q28,206 39,214 Q50,206 54,180Z", "url(#gFlame)", "#b5401c")));
  B("carapace", "Carapace", E(100, 132, 78, 64, "#5fae6a", "#245a30", 3) + E(100, 132, 64, 52, "#7cc47f", "#245a30") + N("M42,104 L64,116 M158,104 L136,116 M38,150 L62,146 M162,150 L138,146", "#245a30", 3));
  B("ballons", "Ballons", N("M100,150 L40,40 M100,150 L162,44 M100,150 L22,78 M100,150 L180,84", "#a89ab0", 1.8) + [[38, 18, "#ff6f8f"], [164, 22, "#5bb8f5"], [14, 60, "#ffd23f"], [186, 66, "#8fd67a"]].map(([x, y, c]) => E(x, y, 20, 24, c) + P(`M${x - 4},${y + 24} h8 l-4,-5Z`, c) + E(x - 7, y - 9, 4, 7, "#fff", "", 0, 'opacity=".6"')).join(""));
  B("paon", "Queue de paon", [-60, -40, -20, 0, 20, 40, 60].map(r => `<g transform="rotate(${r} 100 150)">${P("M90,150 C82,80 86,20 100,-6 C114,20 118,80 110,150Z", "#2f9a7a", "#155a3a", 2) + E(100, 18, 10, 13, "#f3c94a", "") + E(100, 19, 6, 9, "#2f6fd0", "")}</g>`).join(""));
  B("epees", "Épées croisées", `<g transform="rotate(40 100 110)">${P("M95,10 L100,-8 L105,10 V130 H95Z", SI, SD) + R(80, 128, 40, 9, 4, GO, GD) + R(95, 136, 10, 26, 3, "#7a4a24")}</g><g transform="rotate(-40 100 110)">${P("M95,10 L100,-8 L105,10 V130 H95Z", SI, SD) + R(80, 128, 40, 9, 4, GO, GD) + R(95, 136, 10, 26, 3, "#7a4a24")}</g>`);

  // ======================== OBJET (origine : à droite, posé au sol) ========================
  const O = (id, n, a) => A(id, "objet", n, a);
  O("sabre", "Sabre lumineux", N("M-4,-2 L14,-96", "#7fe0ff", 12, 'opacity=".5"') + N("M-4,-2 L14,-96", "#7fe0ff", 7) + N("M-4,-2 L14,-96", "#fff", 3) + P("M-12,22 L-8,-4 L2,-2 L-3,24Z", "#8f9ab0", "#4a5266"));
  O("baguette", "Baguette magique", N("M-4,22 L12,-44", "#5a3a1c", 8) + N("M-4,22 L12,-44", "#a5703c", 5) + star(14, -54, 18) + spark(34, -70, 6, "#ffe27a") + spark(-8, -66, 5, "#ff9fd0"));
  O("lantern", "Lanterne", `<circle cy="-16" r="36" fill="url(#gGlow)"/>` + N("M0,-52 V-38", "#7a4a1c", 3) + P("M-18,-30 H18 L14,8 H-14Z", "#ffe27a", "#c4303c", 3) + P("M-22,-30 H22 L0,-44Z", "#e5484d") + P("M-18,8 H18 V16 H-18Z", "#e5484d"));
  O("bouquet", "Bouquet de fleurs", N("M-8,4 L-12,-24 M0,4 V-30 M8,4 L12,-24", "#4f9a5c", 3) + P("M-22,-14 L0,26 L22,-14 Q0,-4 -22,-14Z", "#ffe0ec", "#c25a86") + [[-16, -24, "#ff8fb0"], [0, -34, "#ffd166"], [16, -24, "#c7a3f5"], [-7, -18, "#fff"], [8, -16, "#ff9a7a"]].map(([x, y, c]) => fl(x, y, 12, c, "#f5a623")).join("") + bow(0, 8, 7, "#f0567c"));
  O("ballon", "Ballon cœur", N("M0,20 Q-8,-20 4,-60", "#8a7a9a") + heart(6, -86, 28, "#ff5f7f"));
  O("sucette", "Sucette géante", N("M0,24 V-30", "#c9bcd0", 8) + N("M0,24 V-30", "#fff", 5) + C(0, -48, 25, "#ff8fb8", "#b03a70", 2.4) + `<path d="M0,-48 a5,5 0 0 1 10,0 a10,10 0 0 1 -20,0 a16,16 0 0 1 32,0" fill="none" stroke="#fff" stroke-width="4.500" stroke-linecap="round"/>`);
  O("livre", "Livre d'anatomie", R(-26, -36, 50, 58, 5, "#2f8a7a", "#124a40") + R(-22, -33, 44, 52, 2, "#fffaf0", "#d8cbb8", 1.4) + R(-26, -36, 45, 58, 5, "#3fa894", "#124a40") + P("M-12,-16 a5,5 0 1 1 4,-5 h10 a5,5 0 1 1 4,5 a5,5 0 1 1 -4,9 h-10 a5,5 0 1 1 -4,-9Z", "#fffaf0", "#8a7a5c", 1.6) + `<text x="-3" y="12" text-anchor="middle" font-size="11" font-weight="900" fill="#fff" font-family="Nunito,sans-serif">ANAT</text>`);
  O("loupe", "Loupe", N("M10,4 L26,26", "#5a3a1c", 11) + N("M10,4 L26,26", "#a5703c", 7) + `<circle cx="-4" cy="-14" r="24" fill="#dff3ff" fill-opacity=".75" stroke="#7d8aa5" stroke-width="5"/>` + N("M-18,-20 Q-14,-30 -4,-31", "#fff", 4));
  O("bowl", "Bocal de poisson", `<circle r="30" cy="-6" fill="#c5ebff" opacity=".85" stroke="#5fa8d0" stroke-width="3"/>` + P("M-26,6 Q0,18 26,6 Q20,24 0,24 Q-20,24 -26,6Z", "#f3d9a5", "") + E(8, -8, 9, 6, "#fb9d3f") + P("M16,-8 l8,-6 v12Z", "#fb9d3f") + E(0, -34, 18, 4, "#eaf8ff", "#5fa8d0"));
  O("leaf", "Grande feuille", N("M-16,24 Q-2,0 10,-22", "#3f7a35", 4) + P("M-14,16 C-20,-12 -6,-34 26,-40 C30,-10 14,14 -14,16Z", "#7fd067", "#3f7a35") + N("M-8,10 Q6,-12 22,-36", "#3f7a35"));
  O("os", "Os géant", `<g transform="rotate(-18)">${P("M-24,-4 a9,9 0 1 1 7,-9 h26 a9,9 0 1 1 7,9 a9,9 0 1 1 -7,16 h-26 a9,9 0 1 1 -7,-16Z", "#fffaf0", "#a8957c", 2.6)}</g>`);
  O("gamelle", "Gamelle pleine", E(0, -2, 26, 10, "#b5743c") + [[-12, -6], [0, -9], [12, -6], [-5, -3], [7, -2]].map(([x, y]) => C(x, y, 6, "#c98a4c")).join("") + P("M-30,-2 Q0,10 30,-2 L26,20 Q0,28 -26,20Z", "#ef6f7d") + `<text y="18" text-anchor="middle" font-size="13" font-weight="900" fill="#fff" font-family="Nunito,sans-serif">MIAM</text>`);
  O("balle", "Balle rebondissante", `<g class="bounce">${C(0, 2, 20, "#5bb8f5") + P("M-20,2 Q0,-10 20,2 Q0,14 -20,2Z", "#ffd23f") + E(-7, -8, 5, 3.500, "#fff", "", 0)}</g>`);
  O("foot", "Ballon de foot", C(0, 0, 22, "#fff", "#3a3a48", 2.6) + P("M0,-9 L9,-2 L5,8 H-5 L-9,-2Z", "#3a3a48") + N("M0,-9 V-21 M9,-2 L20,-7 M5,8 L12,18 M-5,8 L-12,18 M-9,-2 L-20,-7", "#3a3a48", 2.4));
  O("pelote", "Pelote de laine", C(0, 0, 23, "#e86aa5") + N("M-18,-12 Q4,-6 20,10 M-21,0 Q0,2 14,18 M-8,-21 Q12,-10 22,2 M-16,14 Q-4,-10 6,-22 M-4,22 Q10,6 18,-12", "#b5407a", 2) + N("M14,18 Q34,26 30,10", "#e86aa5", 3));
  O("poisson", "Poisson frais", `<g transform="rotate(-20)">${E(-2, 0, 24, 13, "#7fb8e0") + P("M18,0 L36,-13 V13Z", "#7fb8e0") + C(-14, -3, 3, "#22304a", "") + N("M-4,-8 q5,8 0,16 M4,-8 q5,8 0,16", "#4a7fa8", 1.8)}</g>`);
  O("carotte", "Carotte", `<g transform="rotate(20)">${P("M-13,-16 Q0,-24 13,-16 L2,30 Q0,34 -2,30Z", "#f9903c") + N("M-9,-6 h8 M-4,6 h8 M-5,16 h5", "#b5601c", 2) + [-24, 0, 24].map(r => `<path d="M0,-18 q-7,-14 0,-24 q7,10 0,24Z" fill="#6fbf5a" stroke="#2f6b2c" stroke-width="1.800" transform="rotate(${r} 0 -18)"/>`).join("")}</g>`);
  O("fromage", "Part de fromage", P("M-28,6 L16,-24 L28,4 V22 H-28Z", "#fcd04a") + N("M-28,6 H28", "#a87a10") + E(-8, 14, 5, 4, "#e0a92a", "") + E(12, 14, 4, 3.4, "#e0a92a", "") + E(10, -6, 5, 3.600, "#e0a92a", ""));
  O("gland", "Noisette", P("M-16,-4 C-18,18 -4,28 0,28 C4,28 18,18 16,-4Z", "#d9a05c") + P("M-20,-4 C-20,-22 20,-22 20,-4 Q0,4 -20,-4Z", "#8a5a2c") + N("M0,-18 v-9", "#4a2c10", 5));
  O("guitare", "Guitare", `<g transform="rotate(20)">${R(-4, -62, 8, 54, 2, "#7a4a24") + R(-8, -74, 16, 16, 4, "#5f3316") + P("M0,-14 C-18,-16 -22,-4 -16,4 C-26,10 -24,32 0,32 C24,32 26,10 16,4 C22,-4 18,-16 0,-14Z", "#e8963c") + C(0, 10, 7, "#4a2410") + N("M-2,-60 V24 M2,-60 V24", "#fff3d0", 1)}</g>`);
  O("parapluie", "Parapluie", N("M0,-50 V14 q0,10 10,8", "#5a3a1c", 4) + P("M-40,-22 C-36,-60 36,-60 40,-22 q-10,-8 -20,0 q-10,-8 -20,0 q-10,-8 -20,0 q-10,-8 -20,0Z", "#ef6f7d") + N("M0,-50 V-22 M-20,-22 Q-16,-42 0,-50 M20,-22 Q16,-42 0,-50", "#a82a3c", 1.8));
  O("drapeau", "Fanion", N("M-14,26 V-60", "#7a5236", 5) + P("M-12,-58 L34,-44 L-12,-28Z", "#5fc48a") + star(2, -43, 7));
  O("trophee", "Trophée", P("M-18,-40 H18 C18,-10 10,0 0,0 C-10,0 -18,-10 -18,-40Z", GO, GD) + N("M-18,-34 c-16,0 -14,22 4,22 M18,-34 c16,0 14,22 -4,22", GD, 5) + P("M-5,0 h10 v12 h-10Z", GO, GD) + R(-17, 12, 34, 12, 3, "#8a5230") + star(0, -24, 9, "#fff3c4"));
  O("squelette", "Mini squelette", C(0, -34, 14, "#fffaf0", "#8a7a5c") + E(-5, -35, 3.600, 4.400, "#3a3040", "") + E(5, -35, 3.600, 4.400, "#3a3040", "") + N("M-5,-25 h10 M-2,-27 v4 M2,-27 v4", "#8a7a5c", 1.6) + N("M0,-20 V8 M-13,-12 Q0,-18 13,-12 M-12,-4 Q0,-9 12,-4 M-9,3 Q0,-1 9,3 M-13,-12 L-18,4 M13,-12 L18,4 M-7,10 H7 M-6,10 L-8,26 M6,10 L8,26", "#8a7a5c", 6.4) + N("M0,-20 V8 M-13,-12 Q0,-18 13,-12 M-12,-4 Q0,-9 12,-4 M-9,3 Q0,-1 9,3 M-13,-12 L-18,4 M13,-12 L18,4 M-7,10 H7 M-6,10 L-8,26 M6,10 L8,26", "#fffaf0", 3.400));
  O("marteau", "Marteau à réflexes", `<g transform="rotate(16)">${N("M0,26 V-28", SD, 6) + N("M0,26 V-28", "#dfe8f3", 3.4) + P("M-18,-38 H18 L24,-30 L18,-22 H-18 L-24,-30Z", "#e5565e")}</g>`);
  O("perch", "Perchoir", N("M0,-80 V26", "#5a3a1c", 9) + N("M0,-80 V26", "#a5703c", 6) + N("M-24,-60 H24", "#5a3a1c", 9) + N("M-24,-60 H24", "#b57f4a", 6) + C(0, -86, 7, "#f9b53c"));
  O("epee", "Épée", `<g transform="rotate(14)">${P("M-5,-62 L0,-76 L5,-62 V0 H-5Z", SI, SD) + R(-16, -2, 32, 8, 4, GO, GD) + R(-4, 6, 8, 20, 3, "#7a4a24")}</g>`);
  O("fraise", "Fraise géante", P("M-24,-14 Q0,-30 24,-14 Q24,14 0,28 Q-24,14 -24,-14Z", "#f0485e") + P("M0,-18 L-20,-24 L-9,-28 L0,-40 L9,-28 L20,-24Z", "#58b368") + [[-9, -4], [9, -4], [0, 6], [-8, 14], [8, 14]].map(([x, y]) => E(x, y, 1.800, 2.800, "#ffe9a8", "")).join(""));
  O("donut", "Donut", C(0, -2, 24, "#d9a05c") + P("M-23,-4 C-22,-32 22,-32 23,-4 C20,8 14,0 8,8 C2,14 -4,4 -10,8 C-16,12 -22,6 -23,-4Z", "#ff9fc8") + C(0, -4, 8, "#fff6ea", "#a5703c") + [[-14, -12, "#5bb8f5"], [10, -16, "#ffd23f"], [16, -4, "#7fd68c"], [-4, -20, "#fff"], [-16, -2, "#ffd23f"]].map(([x, y, c]) => N(`M${x},${y} l4,3`, c, 3)).join(""));
  O("cactus", "Cactus", P("M-9,8 V-38 Q0,-50 9,-38 V8Z", "#6fbf7a") + P("M9,-10 H16 V-24 Q21,-30 26,-24 V-4 H9Z", "#6fbf7a") + P("M-9,-4 H-16 V-16 Q-21,-22 -26,-16 V4 H-9Z", "#6fbf7a") + fl(0, -46, 9, "#ff8fb0") + P("M-18,6 H18 L14,28 H-14Z", "#d9804c"));
  O("cadeau", "Paquet cadeau", R(-24, -14, 48, 40, 4, "#8f7bea") + P("M-28,-22 H28 V-10 H-28Z", "#a593f2") + P("M-5,-22 h10 V26 h-10Z", "#ffd23f") + bow(0, -28, 12, "#ffd23f"));
  O("plante", "Petite plante", [-34, 0, 34].map(r => `<path d="M0,0 C-12,-16 -10,-40 0,-50 C10,-40 12,-16 0,0Z" fill="#7fd067" stroke="#3f7a35" stroke-width="2" transform="rotate(${r})"/>`).join("") + P("M-18,-4 H18 L14,26 H-14Z", "#5f9fe8") + N("M-17,6 H17", "#fff", 3));
  O("peluche", "Nounours", C(-12, -32, 7, "#c98a58") + C(12, -32, 7, "#c98a58") + E(0, 8, 18, 18, "#c98a58") + C(0, -20, 17, "#d9a06c") + E(0, -14, 8, 6, "#f3dcc0", "") + C(-6, -23, 2, "#3a2010", "") + C(6, -23, 2, "#3a2010", "") + E(0, -17, 2.600, 2, "#3a2010", "") + heart(0, 8, 8));
  O("telescope", "Télescope", N("M0,-10 L-16,26 M0,-10 L16,26 M0,-10 V26", "#5a6478", 4) + `<g transform="rotate(-30 0 -14)">${R(-30, -24, 52, 18, 5, "#4f6fc0") + R(20, -26, 12, 22, 4, "#ffd23f") + R(-40, -20, 12, 10, 3, "#8f9ab0")}</g>`);
  O("violon", "Violon", `<g transform="rotate(22)">${R(-3, -60, 6, 46, 2, "#3a2418") + P("M0,-22 C-16,-24 -18,-8 -11,-2 C-11,2 -18,6 -16,18 C-12,30 12,30 16,18 C18,6 11,2 11,-2 C18,-8 16,-24 0,-22Z", "#b5602a") + N("M-1,-58 V20 M2,-58 V20", "#fff3d0", 1) + N("M-7,0 q-3,5 0,10 M7,0 q3,5 0,10", "#4a2410", 2)}</g>` + N("M26,-50 L32,26", "#7a4a24", 3));

  // ======================== LIEU (habitat : derrière / devant) ========================
  const H = (id, n, b, f) => A(id, "lieu", n, { b, f });
  const wheel = `<g class="spin" style="transform-origin:100px 92px">` + `<circle cx="100" cy="92" r="92" fill="none" stroke="#8a5a2c" stroke-width="13"/><circle cx="100" cy="92" r="92" fill="none" stroke="#e8b06a" stroke-width="9"/><circle cx="100" cy="92" r="76" fill="none" stroke="#c98a4c" stroke-width="3"/>` + Array.from({ length: 24 }, (_, i) => `<path d="M176,92 H192" stroke="#8a5a2c" stroke-width="4" transform="rotate(${i * 15} 100 92)"/>`).join("") + [0, 60, 120].map(r => `<path d="M24,92 H176" stroke="#c98a4c" stroke-width="4.500" transform="rotate(${r} 100 92)"/>`).join("") + `</g>`;
  H("wheel", "Roue de hamster", N("M100,92 L40,200 M100,92 L160,200", "#6b4a35", 11) + N("M100,92 L40,200 M100,92 L160,200", "#a5785a", 7) + wheel + C(100, 92, 9, "#f9b53c"), N("M28,198 H172", "#6b4a35", 9) + N("M28,198 H172", "#a5785a", 5.5));
  H("basket", "Panier", E(100, 166, 84, 22, "#b5743c") , P("M16,164 Q100,190 184,164 L170,196 Q100,208 30,196Z", "#d99a55", "#7a4a1c") + N("M24,174 Q100,198 176,174 M30,186 Q100,206 170,186", "#7a4a1c", 2, 'stroke-dasharray="11 5"') + N("M16,164 Q100,190 184,164", "#e8b06a", 7));
  H("cushion", "Coussin violet", P("M10,182 C6,166 40,160 100,160 C160,160 194,166 190,182 C194,198 160,202 100,202 C40,202 6,198 10,182Z", "#c9a2f5", "#6f42a8") + C(14, 182, 6, "#ffd166") + C(186, 182, 6, "#ffd166"));
  H("niche", "Niche", P("M-18,196 V80 L100,-6 L218,80 V196Z", "#e0a566", "#7a4a1c", 3) + P("M-30,90 L100,-18 L230,90 L218,104 L100,8 L-18,104Z", "#e5565e", "#8f1f2c", 3) + P("M38,196 V120 Q38,70 100,70 Q162,70 162,120 V196Z", "#5a3a24") + R(70, 34, 60, 22, 5, "#fff6e0", "#7a4a1c") + `<text x="100" y="50" text-anchor="middle" font-size="15" font-weight="900" fill="#7a4a1c" font-family="Nunito,sans-serif">KINÉ</text>`);
  H("arbre-chat", "Arbre à chat", R(-22, 40, 22, 156, 5, "#e3c9a0", "#8a6a3c") + N("M-22,60 h22 M-22,76 h22 M-22,92 h22 M-22,108 h22 M-22,124 h22 M-22,140 h22 M-22,156 h22", "#b5946a", 2.4) + R(-44, 26, 68, 18, 9, "#b48cf2") + R(186, 92, 20, 104, 5, "#e3c9a0", "#8a6a3c") + R(166, 78, 62, 18, 9, "#b48cf2") + N("M206,96 V120", "#8a7a9a") + C(206, 126, 8, "#ff8fb0") + R(-40, 190, 276, 14, 7, "#9a7ad0"));
  H("aquarium", "Aquarium", R(-24, 34, 248, 164, 14, "#bfe8fa", "#5fa8d0", 4) + P("M-20,172 Q60,158 120,172 T220,168 V190 Q220,196 210,196 H-10 Q-20,196 -20,190Z", "#f3d9a5") + [[-4, 70, 5], [204, 90, 6], [190, 60, 4], [10, 110, 4]].map(([x, y, r]) => C(x, y, r, "#fff", "#8fc9ec", 1.4)).join("") + N("M200,178 q-10,-20 2,-38 q10,-18 0,-32 M-6,180 q10,-18 -2,-36", "#6fbf7a", 6), `<rect x="-24" y="34" width="248" height="164" rx="14" fill="#7fd0f5" opacity=".14"/>` + N("M-10,60 V110", "#fff", 6, 'opacity=".8"'));
  H("igloo", "Igloo", P("M-24,196 C-24,60 60,14 100,14 C140,14 224,60 224,196Z", "#eef8ff", "#7fb0d0", 3) + N("M-10,132 H210 M14,84 H186 M54,44 H146 M60,44 V84 M140,44 V84 M20,84 V132 M180,84 V132 M-4,132 V196 M204,132 V196", "#a9cfe6", 2.6) + P("M40,196 V130 Q40,86 100,86 Q160,86 160,130 V196Z", "#8fb8d9"));
  H("tente", "Tente de camping", P("M-30,198 L100,0 L230,198Z", "#f5a33c", "#9c5a10", 3) + P("M40,198 L100,26 L160,198Z", "#6b4a2c") + P("M100,26 L40,198 L12,198 L92,30Z", "#ffbe6a", "#9c5a10"));
  H("tapis", "Tapis volant", P("M-24,178 Q40,164 100,180 T224,174 L214,202 Q150,212 100,202 T-14,204Z", "#b5385a", "#5f1428", 3) + N("M-14,186 Q40,174 100,189 T214,183", "#ffd23f", 4) + [-18, 0, 18].map((d, i) => N(`M${-22 + i * 3},${184 + i * 9} l-12,4 M${220 - i * 3},${180 + i * 9} l12,4`, "#ffd23f", 3)).join(""));
  H("nuage", "Nuage", `<g class="float"><path d="M0,204 C-40,204 -44,160 -8,158 C-6,130 44,126 54,148 C74,128 124,128 140,150 C160,132 206,140 204,164 C238,166 234,204 200,204Z" fill="#fff" stroke="#b9cfe6" stroke-width="3"/></g>`);
  H("skate", "Skateboard", "", C(50, 204, 10, "#ffd23f") + C(150, 204, 10, "#ffd23f") + P("M10,184 Q16,194 30,194 H170 Q184,194 190,184 L196,188 Q190,202 170,202 H30 Q10,202 4,188Z", "#e5565e"));
  H("bain", "Bain moussant", "", P("M-6,142 H206 C206,190 170,202 100,202 C30,202 -6,190 -6,142Z", "#fff", "#8fa0b8", 3) + [[8, 138, 17], [38, 132, 20], [70, 140, 16], [100, 136, 18], [132, 140, 17], [164, 132, 20], [192, 138, 16]].map(([x, y, r]) => C(x, y, r, "#f3fbff", "#a9d0ea", 1.8) + C(x - r * .3, y - r * .3, r * .22, "#fff", "")).join(""));
  H("canape", "Canapé", R(-26, 70, 252, 120, 34, "#6f9fd8") + R(-34, 112, 50, 84, 22, "#5f8fc9") + R(184, 112, 50, 84, 22, "#5f8fc9") + R(6, 150, 188, 46, 16, "#82afe3"));
  H("carton", "Boîte en carton", P("M10,140 L-20,116 L60,110 L80,140Z M190,140 L220,116 L140,110 L120,140Z", "#c99a62", "#7a5428"), P("M8,146 H192 L184,204 H16Z", "#dcb27a", "#7a5428", 3) + N("M8,146 H192", "#b5874a", 5) + `<g transform="translate(100 178)">${heart(0, 0, 12, "#b5743c")}</g>`);
  H("lit", "Petit lit", R(-28, 70, 22, 130, 8, "#a5703c") + R(206, 110, 22, 90, 8, "#a5703c") + R(-14, 136, 224, 50, 12, "#fff", "#b5a8c0"), P("M30,168 Q110,150 212,164 V198 H14Z", "#b48cf2", "#5f3fa5", 2.6) + [[60, 182], [100, 176], [140, 182], [180, 178]].map(([x, y]) => star(x, y, 7)).join(""));
  H("citrouille", "Citrouille", "", P("M20,150 C-10,150 -14,204 20,204 C40,212 70,210 100,206 C130,210 160,212 180,204 C214,204 210,150 180,150 C150,140 120,146 100,150 C80,146 50,140 20,150Z", "#f5903c", "#9c4a10", 3) + N("M60,148 Q46,176 60,206 M140,148 Q154,176 140,206 M100,150 V206", "#c9681c", 3) + P("M62,168 l10,14 h-20Z M138,168 l10,14 h-20Z", "#5a2a0c", "") + N("M62,192 Q100,206 138,192", "#5a2a0c", 5));
  H("lune", "Croissant de lune", `<g class="float"><path d="M190,20 A104,104 0 1 1 -6,110 A86,86 0 0 0 190,20Z" fill="#fff0b5" stroke="#c9a03c" stroke-width="3"/>${C(40, 180, 8, "#f3dc8a", "")}${C(110, 196, 6, "#f3dc8a", "")}</g>` + star(196, 70, 8) + star(10, 30, 6));
  H("fusee", "Fusée", P("M100,-60 C150,-20 176,60 172,150 H28 C24,60 50,-20 100,-60Z", "#f3f6fb", "#6b7a94", 3) + P("M100,-60 C118,-46 134,-24 146,4 H54 C66,-24 82,-46 100,-60Z", "#e5565e") + P("M30,110 L-16,178 L30,164Z M170,110 L216,178 L170,164Z", "#e5565e") + P("M70,150 Q76,196 100,214 Q124,196 130,150Z", "url(#gFlame)", "#b5401c"));
  H("chateau", "Château", R(-20, 60, 240, 138, 4, "#e3dcec", "#8a7aa5", 3) + [-28, 178].map(x => R(x, 24, 50, 174, 4, "#d3c9e3", "#8a7aa5", 3) + P(`M${x - 6},26 L${x + 25},-30 L${x + 56},26Z`, "#8f6fd0")).join("") + P("M22,60 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h18 v14", "#e3dcec", "#8a7aa5") + P("M50,198 V130 Q50,96 100,96 Q150,96 150,130 V198Z", "#6b5a80"));
  H("bouee", "Bouée", "", E(100, 188, 96, 22, "#ff8fa8", "#b0405f", 3) + [0, 1, 2, 3].map(i => P(`M${18 + i * 46},176 q12,-6 24,-6 l-4,38 q-12,-2 -22,-6Z`, "#fff", "")).join("") + E(100, 182, 60, 10, "#7fd0f0", "#b0405f"));
  H("hamac", "Hamac", N("M-30,60 V200 M230,60 V200", "#7a5236", 11) + N("M-28,90 L30,150 M228,90 L170,150", "#a8906a", 3), P("M-4,124 Q100,236 204,124 Q196,196 100,206 Q4,196 -4,124Z", "url(#pStripeRainbow)", "#7a5a8a", 3));
  H("jardin", "Jardin fleuri", `<path d="M-30,200 V168 Q100,150 230,168 V200Z" fill="#9bd97f"/>` + N("M-20,130 V196 M0,130 V196 M20,130 V196 M180,130 V196 M200,130 V196 M220,130 V196 M-26,150 H30 M170,150 H226", "#fff", 8), [[6, 188, "#ff9fc0"], [30, 198, "#ffd166"], [170, 196, "#c7a3f5"], [194, 188, "#ff8f7a"], [100, 202, "#fff"]].map(([x, y, c]) => fl(x, y, 13, c, "#f5a623")).join(""));
  H("theatre", "Scène de théâtre", `<rect x="-30" y="-40" width="260" height="240" rx="10" fill="#6b1f38"/>` + P("M-30,-40 H230 V-10 q-16,18 -32,0 q-16,18 -33,0 q-16,18 -32,0 q-16,18 -33,0 q-16,18 -32,0 q-16,18 -33,0 q-16,18 -32,0 q-16,18 -33,0Z", "#d6435a") + P("M-30,-40 H6 Q26,90 -14,200 H-30Z", "#c23a50") + P("M230,-40 H194 Q174,90 214,200 H230Z", "#c23a50") + `<rect x="-30" y="184" width="260" height="20" fill="#c98a4c"/>`);

  // ======================== AURA ========================
  const U = (id, n, f, b = "") => A(id, "aura", n, { f, b });
  const at = [[0, 20], [190, 14], [-14, 84], [212, 78], [14, 140], [196, 142], [60, -18], [142, -20]];
  U("a-etoiles", "Pluie d'étoiles", at.map(([x, y], i) => `<g class="twk">${star(x, y, i % 2 ? 9 : 6)}</g>`).join(""));
  U("a-coeurs", "Nuée de cœurs", at.map(([x, y], i) => `<g class="float">${heart(x, y, i % 2 ? 9 : 6, i % 3 ? "#ff7a9c" : "#ffb3cf")}</g>`).join(""));
  U("a-bulles", "Bulles de savon", at.map(([x, y], i) => `<g class="float"><circle cx="${x}" cy="${y}" r="${i % 2 ? 11 : 7}" fill="#dff3ff" fill-opacity=".55" stroke="#8fc9ec" stroke-width="1.600"/><circle cx="${x - 3}" cy="${y - 3}" r="2.500" fill="#fff"/></g>`).join(""));
  U("a-petales", "Pétales de cerisier", at.map(([x, y], i) => E(x, y, 7, 4.500, "#ffc0d6", "#e08aa8", 1.4, `transform="rotate(${i * 47} ${x} ${y})" class="float"`)).join(""));
  U("a-neige", "Flocons", at.map(([x, y]) => N(`M${x - 7},${y} h14 M${x},${y - 7} v14 M${x - 5},${y - 5} l10,10 M${x + 5},${y - 5} l-10,10`, "#8fc7f0", 2.4, 'class="float"')).join(""));
  U("a-notes", "Notes de musique", at.map(([x, y], i) => `<g class="float">${E(x, y + 8, 5.500, 4.200, ["#8f7bea", "#f0567c", "#3fa8d0"][i % 3], "") + N(`M${x + 4.5},${y + 8} V${y - 8} l8,3`, ["#8f7bea", "#f0567c", "#3fa8d0"][i % 3], 2.6)}</g>`).join(""));
  U("a-feu", "Flammes", "", MX([[-4, 196, 1.2], [26, 200, .8]].map(([x, y, k]) => `<g transform="translate(${x} ${y}) scale(${k})">${P("M0,0 C-26,-8 -24,-40 -8,-56 C-8,-44 2,-40 4,-58 C22,-40 26,-8 0,0Z", "url(#gFlame)", "#b5401c")}</g>`).join("")));
  U("a-eclairs", "Éclairs", MX([[-12, 40, 1.4], [4, 112, 1]].map(([x, y, k]) => `<g transform="translate(${x} ${y}) scale(${k})">${P("M2,-14 L-8,3 L-1,3 L-4,15 L9,-4 L1,-4 L6,-14Z", "#ffd84d", "#a3690a")}</g>`).join("")));
  U("a-paillettes", "Paillettes dorées", at.concat([[30, 60], [172, 52], [-4, 112], [204, 112]]).map(([x, y], i) => `<g class="twk">${spark(x, y, i % 2 ? 9 : 6, i % 3 ? "#ffc93c" : "#ff9fd0")}</g>`).join(""));
  U("a-halo", "Halo de lumière", "", `<circle cx="100" cy="100" r="128" fill="url(#gGlow)"/>`);
  U("a-arc", "Arc-en-ciel", "", ["#ff7a95", "#ffb45c", "#ffe26b", "#74dd92", "#63b8f7", "#b491f5"].map((c, i) => `<path d="M${-28 + i * 9},180 A${128 - i * 9},${150 - i * 9} 0 0 1 ${228 - i * 9},180" fill="none" stroke="${c}" stroke-width="10" opacity=".8"/>`).join(""));
  U("a-papillons", "Papillons", at.slice(0, 6).map(([x, y], i) => `<g class="float" transform="translate(${x} ${y})">${M(P("M0,0 C3,-12 15,-13 14,-4 C13,2 5,2 0,0 C8,2 12,9 7,11 C3,12 1,6 0,0Z", ["#8f7bea", "#f58ad0", "#5fa8f0"][i % 3], undefined, 1.6))}</g>`).join(""));
  U("a-planetes", "Planètes", at.slice(0, 6).map(([x, y], i) => `<g class="float">${C(x, y, 9, ["#f5a06a", "#7fb8f0", "#c9a2f5"][i % 3]) + (i % 2 ? E(x, y, 16, 4.500, "none", "#b58a5a", 2.2, `transform="rotate(-20 ${x} ${y})"`) : "")}</g>`).join(""));
  U("a-feuilles", "Feuilles d'automne", at.map(([x, y], i) => `<g class="float">${P(`M${x - 9},${y + 5} C${x - 8},${y - 8} ${x + 4},${y - 12} ${x + 10},${y - 7} C${x + 10},${y + 4} ${x},${y + 9} ${x - 9},${y + 5}Z`, ["#e8843c", "#d9503c", "#f0b53c"][i % 3], undefined, 1.6)}</g>`).join(""));

  // ---------- Où se trouve quoi sur chaque espèce ----------
  const HAT = { hamster: [100, 40], guinea: [100, 44], ferret: [100, 48], hedgehog: [100, 60], songbird: [100, 38], parrot: [100, 38], owl: [100, 42], penguin: [100, 36], llama: [100, 34], snake: [100, 36], frog: [100, 60], sheep: [100, 34], horse: [100, 36], cow: [100, 36], deer: [100, 40], pigeon: [72, 28], duck: [124, 48], turtle: [168, 78], fish: [66, 70], sea: [96, 40], butterfly: [100, 66], chicken: [100, 40], crocodile: [100, 46], giraffe: [100, 30], wader: [70, 26], raptor: [100, 38], insect: [100, 58], lizard: [100, 46], goat: [100, 36], roo: [100, 42], bat: [100, 40],  axolotl: [100, 48], kiwi: [100, 34], cassowary: [100, 20], nudi: [77, 56], lobster: [100, 56], rate: [100, 78] };
  const EYE = { kiwi: [100, 78, 24], cassowary: [100, 82, 22], nudi: [76.5, 100, 22.5], lobster: [100, 94, 22], anteater: [100, 80, 25], meerkat: [100, 86, 23], hamster: [100, 92, 26], guinea: [100, 96, 30], ferret: [100, 86, 22], hedgehog: [100, 112, 23], sheep: [100, 82, 19], llama: [100, 66, 22], horse: [100, 76, 22], cow: [100, 78, 22], deer: [100, 80, 24], songbird: [100, 82, 22], parrot: [100, 82, 22], owl: [100, 86, 25], penguin: [100, 86, 22], snake: [100, 62, 22], frog: [100, 65, 34], axolotl: [100, 86, 36], platypus: [100, 78, 26], giraffe: [100, 62, 22], wader: [71, 48, 10], raptor: [100, 80, 23], insect: [100, 90, 15], lizard: [100, 80, 30], goat: [100, 78, 22], roo: [100, 80, 22], hippo: [100, 74, 25], bat: [100, 84, 24], sloth: [100, 86, 22],  crocodile: [100, 50, 32], chicken: [100, 82, 19], dino: [100, 80, 26], dragon: [100, 80, 26], pigeon: [70, 56, 0], duck: [127, 84, 15], turtle: [172, 104, 11], fish: [52, 104, 0], butterfly: [100, 86, 10], rate: [100, 115, 20], rabbit: [100, 84, 25], mouse: [100, 84, 23], bear: [100, 84, 25], elephant: [100, 80, 26] };
  const NECK = { kiwi: [100, 118], cassowary: [100, 120], nudi: [78, 144], lobster: [100, 138], hamster: [100, 136], guinea: [100, 140], songbird: [100, 118], parrot: [100, 122], owl: [100, 120], penguin: [100, 122], snake: [100, 98], frog: [100, 144], llama: [100, 110], hedgehog: [100, 150], butterfly: [100, 112], chicken: [100, 114], giraffe: [100, 116], wader: [74, 88], raptor: [100, 120], insect: [100, 126],  pigeon: [76, 92], duck: [122, 126], turtle: [160, 140], fish: [64, 142], sea: [96, 130], rate: [100, 148], ferret: [100, 126] };
  function anchors(a, stg) {
    const spec = !a.rate && ANIMALS_ART.anchor[a.kind]; if (spec) { const [h, e, n, s] = spec(a, stg); return { h, e, n, s }; }
    const k = a.rate ? "rate" : a.kind, o = a.o || {};
    let h = HAT[k] || [100, 42], e = EYE[k] || [100, 84, 24], n = NECK[k] || [100, 124];
    if (k === "sea") { if (o.whale) { h = [78, 56]; e = [54, 108, 0]; n = [60, 148]; } else if (o.seal) { h = [98, 42]; e = [100, 82, 25]; n = [100, 124]; } else if (o.octo) { h = [100, 30]; e = [100, 98, 25]; n = [100, 142]; } else if (o.jelly) { h = [100, 26]; e = [100, 82, 25]; n = [100, 112]; } else if (o.crab) { h = [100, 60]; e = [100, 72, 18]; n = [100, 150]; } else if (o.star) { h = [100, 34]; e = [100, 100, 18]; n = [100, 130]; } else { h = [100, 54]; e = [100, 104, 22]; n = [100, 146]; } }
    if (k === "fish" && o.sea) { h = [100, 24]; e = [98, 54, 0]; n = [100, 84]; }
    if (k === "fish" && o.ray) { h = [100, 50]; e = [100, 78, 24]; n = [100, 110]; }
    if (k === "fish" && o.shark) { h = [84, 66]; e = [50, 106, 0]; n = [70, 148]; }
    if (k === "duck" && o.neck) { h = [130, 26]; e = [132, 52, 11]; n = [132, 104]; }
    if (k === "dino" && o.long) { h = [68, 18]; e = [69, 46, 13]; n = [70, 86]; }
    if (k === "dino" && o.ptero) { h = [100, 42]; e = [100, 74, 22]; }
    if (k === "insect") { if (o.snail) { h = [178, 106]; e = [178, 126, 10]; n = [178, 156]; } else if (o.cater) { h = [150, 96]; e = [150, 126, 14]; n = [148, 160]; } else if (o.spider) { h = [100, 66]; e = [100, 100, 17]; n = [100, 138]; } else if (o.fly) { h = [100, 56]; e = [100, 84, 14]; n = [100, 116]; } }
    if (k === "lizard" && !o.cham) e = [100, 78, 32];
    if (o.pose === "loaf") { h = [h[0], h[1] + 24]; e = [e[0], e[1] + 24, e[2]]; n = [n[0], n[1] + 24]; }
    if (o.short) { h = [h[0], h[1] + 9]; e = [e[0], e[1] + 9, e[2]]; n = [n[0], n[1] + 12]; }
    return { h, e, n };
  }
  const BY = Object.fromEntries(L.map(x => [x.id, x]));
  function layers(ids, a, stg) { // ids portés -> { b: derrière, f: devant }
    const A0 = anchors(a, stg), sc = A0.s && A0.s !== 1 ? ` scale(${A0.s})` : "", g = ([x, y], s) => `<g transform="translate(${x} ${y})${sc}">${s}</g>`;
    const ord = ["lieu", "dos", "aura", "cou", "yeux", "tete", "objet"], its = ids.map(i => BY[i]).filter(Boolean).sort((p, q) => ord.indexOf(p.s) - ord.indexOf(q.s));
    let b = "", f = "";
    for (const i of its) {
      if (i.b) b += i.b; if (i.f) f += i.f;
      if (i.s === "tete") f += g(A0.h, i.a); else if (i.s === "cou") f += g(A0.n, i.a); else if (i.s === "objet") f += g([176, 176], i.a);
      else if (i.s === "yeux") { const [x, y, d] = A0.e, k = d && d < 16 ? Math.max(.5, d / 19) : 1; const one = s => `<g transform="scale(${k})">${s}</g>`; f += d ? (i.bridge ? N(`M${x - d + 15 * k},${y - 2} Q${x},${y - 7} ${x + d - 15 * k},${y - 2}`, i.bridge, 3) : "") + g([x - d, y], one(i.eye)) + `<g transform="translate(${x + d} ${y}) scale(-1 1)">${one(i.eye)}</g>` : g([x, y], i.eye); }
    }
    return { b, f };
  }
  window.PETGEAR = { list: L, byId: BY, layers, SLOTS: { tete: "Tête", yeux: "Yeux", cou: "Cou", dos: "Dos", objet: "Objets", lieu: "Habitat", aura: "Ambiance" } };
})();
