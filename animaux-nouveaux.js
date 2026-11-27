"use strict";
// ============================================================================
//  LES NOUVEAUX ANIMAUX (300+) : chacun a un prénom, un caractère et une histoire.
//  1) 12 espèces jamais vues dans l'appli, dessinées ici (taupe, pika, lièvre
//     cornu, tarsier, pélican, dodo, tardigrade, crevette, mante, sauterelle,
//     fourmi, monstre du lac), chacune en plusieurs variétés.
//  2) Des « personnages » d'espèces déjà connues, avec leur métier et leur
//     accessoire (toque, béret, lunettes, stéthoscope…), jamais deux pareils.
//  Champs en plus : prenom, caractere, histoire, metier. À charger après
//  animals-art.js (par exemple juste après rigolos.js).
// ============================================================================
(function () {
  const A = window.ANIMALS_ART, { mix, dk, lt, starD, heartD } = CORPS, { P, N, E, V, VE, two, G, spark, scal, eye, eyes, blush, smile, nose, whisk, quad, line } = A.h, K = A.kinds, AN = A.anchor;
  const slug = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/œ/g, "oe").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const C = (x, y, r, f, s = "", w = 1.6) => E(x, y, r, r, f, s, w);
  const R = (x, y, w, h, r, f, s = "", k = 1.6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}"${s ? ` stroke="${s}" stroke-width="${k}"` : ""}/>`;
  const bb = (b, s, k = .84, y = 190) => b ? G(`translate(100 ${y}) scale(${k}) translate(-100 -${y})`, s) : s;
  const cheeks = (dx, y) => blush(dx, y);

  // ======================== 1. ESPÈCES NOUVELLES ========================
  // Taupe : petits yeux, gros nez rose, grandes pattes-pelles
  K.taupe = (a, b) => { const L = line(a), o = a.o; return quad(a, b, { ears: "", tail: N("M126,180 q16,4 20,-6", L, 5),
    paw: "#f3b5b5", bellyC: a.belly, muzzle: E(100, 98, 26, 18, lt(a.hex, .25)) + (o.etoile ? [0, 40, 80, 120, 160, 200, 240, 280, 320].map(r => E(100, 86, 4, 9, "#f58aa0", "#b5506a", 1.2, `transform="rotate(${r} 100 96)"`)).join("") : "") + VE(100, 96, 12, 9, "#f58aa0", "#b5506a", 1.8),
    face: eyes(a, 22, 78, b ? 7 : 4.6, b, "#2a1a2e") + whisk(102) + N("M92,110 Q100,116 108,110", L, 2.2) + cheeks(34, 100),
    chest: two(P("M60,150 C44,150 38,166 48,172 L56,168 L54,176 L62,172 L62,180 L70,170 C74,162 70,152 60,150Z", "#f3b5b5", "#b5707a", 1.8)) + (o.casque && !b ? P("M62,60 C62,34 82,26 100,26 C118,26 138,34 138,60 Q100,48 62,60Z", "#ffd84d", "#a8801c", 2) + C(100, 40, 6, "#fff6c9", "#a8801c") : "") }); };
  // Pika : boule de poils aux oreilles rondes
  K.pika = (a, b) => { const L = line(a); return quad(a, b, { ears: two(VE(64, 52, 18, 17, a.hex, L) + E(65, 54, 10, 9, "#f9c5c9")), tail: "", bellyC: a.belly, paw: lt(a.hex, .2),
    head: "M46,90 C44,58 68,42 100,42 C132,42 156,58 154,90 C154,116 130,128 100,128 C70,128 46,116 46,90Z", face: eyes(a, 24, 84, 9, b, "#2a1a2e") + nose(100, 4, 3.4, "#4a3030") + smile(108, 6) + whisk(102) + cheeks(36, 102) }); };
  // Lièvre cornu : un lièvre avec de petits bois
  K.jackalope = (a, b) => { const L = line(a), w = a.dark;
    const ant = b ? two(N("M62,56 q-8,-8 -14,-8", w, 5)) : two(N("M62,56 C50,40 40,30 26,24 M46,36 q-12,-2 -18,6 M38,30 q-2,-10 4,-16", dk(w, .3), 7) + N("M62,56 C50,40 40,30 26,24 M46,36 q-12,-2 -18,6 M38,30 q-2,-10 4,-16", w, 4));
    return quad(a, b, { top: ant, ears: two(V("M70,46 C58,24 54,0 62,-6 C74,-4 84,22 86,44Z", a.hex, L) + P("M72,40 C64,24 62,8 65,2 C72,6 79,22 81,38Z", "#f9c5c9")), tail: VE(140, 178, 12, 11, a.belly, L, 2), bellyC: a.belly, face: eyes(a, 23, 82, 10, b, "#5a3a24") + nose(98, 5, 3.6) + smile(106, 7) + whisk(100) + cheeks(36, 100) }); };
  // Tarsier : des yeux immenses et de longs doigts
  K.tarsier = (a, b) => { const L = line(a); return quad(a, b, { ears: two(VE(52, 52, 18, 20, a.hex, L) + E(53, 53, 11, 13, "#f3c5b5")), tail: N("M126,178 C160,184 176,160 170,120", L, 5) + N("M126,178 C160,184 176,160 170,120", a.hex, 2.6) + VE(170, 116, 6, 9, a.hex, L, 1.6), bellyC: a.belly,
    face: two(E(76, 82, 20, 20, "#fff3c4", L, 1.8)) + eye(76, 84, 16, a.o.iris || "#e8902a", b) + eye(124, 84, 16, a.o.iris || "#e8902a", b) + nose(106, 3, 2.6, "#5a3a2a") + smile(112, 5) + cheeks(42, 106),
    chest: two(N("M74,150 q-8,10 -4,20 M78,152 q-2,12 2,20 M82,150 q4,10 8,18", L, 4) + N("M74,150 q-8,10 -4,20 M78,152 q-2,12 2,20 M82,150 q4,10 8,18", a.hex, 2) + C(70, 171, 3, a.hex, L, 1) + C(80, 173, 3, a.hex, L, 1) + C(90, 169, 3, a.hex, L, 1)) }); };
  // Pélican : un grand bec avec une poche
  K.pelican = (a, b) => { const L = line(a), bk = a.o.bec || "#f5b84c", o = a.o;
    return bb(b, N("M88,170 V188 M112,170 V188", "#e8964c", 6) + two(P("M80,188 l-10,4 h20Z", "#e8964c", "#a8501c", 1.4)) + V("M58,128 C56,96 76,80 104,82 C140,84 156,110 150,140 C146,168 122,180 100,180 C76,180 60,160 58,128Z", a.hex, L) + P("M130,104 C152,112 164,136 150,160 C142,140 132,126 120,120Z", a.dark, L, 2) + E(100, 146, 24, 24, a.belly, "", 0, 'opacity=".8"')
      + V("M70,70 C68,44 86,32 104,34 C122,36 130,52 126,72 C122,88 108,94 94,92 C80,90 72,84 70,70Z", a.hex, L) + (o.huppe ? P("M92,36 C86,22 98,14 104,22 C108,12 120,18 112,34Z", a.dark, L, 1.6) : "")
      + P("M112,70 C130,66 172,70 184,78 C176,82 150,84 120,86Z", bk, dk(bk, .4), 2) + P("M118,84 C140,86 168,84 182,80 C174,104 140,112 122,100Z", lt(bk, .25), dk(bk, .4), 2) + eye(96, 62, 7.5, "#3a2a1e", b) + cheeks(-8, 76) + (o.poisson && !b ? G("translate(156 96) rotate(-10) scale(.7)", P("M-16,0 C-12,-10 8,-10 14,0 L24,-8 V8 L14,0 C8,10 -12,10 -16,0Z", "#8fc4f0", "#3f6fa8", 1.6) + E(-8, -2, 2, 2.4, "#1a2a3a")) : ""), .82); };
  // Dodo : tout rond, un bec crochu et une petite houppe
  K.dodo = (a, b) => { const L = line(a), bk = a.o.bec || "#e8d27a";
    return bb(b, N("M86,172 V188 M114,172 V188", "#e8b04c", 7) + two(P("M78,189 l-8,3 h18Z", "#e8b04c", "#a8761c", 1.4)) + P("M138,132 C160,118 168,130 164,142 C176,140 178,154 166,158 C150,160 140,152 136,146Z", lt(a.belly, .1), L, 2) + V(scal(100, 138, 46, 44, 14, .9), a.hex, L) + E(100, 150, 28, 24, a.belly, "", 0, 'opacity=".85"') + two(P("M58,128 C44,140 46,160 58,164 C66,154 70,140 68,128Z", a.dark, L, 2))
      + V("M66,80 C64,52 82,40 100,40 C122,40 136,54 134,80 C132,100 116,108 100,108 C82,108 68,100 66,80Z", a.hex, L) + P("M96,42 C92,30 100,22 106,30 C110,22 118,28 112,40Z", a.dark, L, 1.6)
      + P("M114,72 C128,60 150,66 154,84 C156,96 146,104 140,98 C142,90 136,86 128,88 C122,90 116,86 114,80Z", bk, dk(bk, .45), 2) + P("M140,98 C146,104 156,96 154,84 L148,92Z", dk(bk, .25)) + eye(92, 72, 9, "#3a2a1e", b) + cheeks(-2, 92), .82); };
  // Tardigrade (ourson d'eau) : un petit tonneau à huit pattes
  K.tardigrade = (a, b) => { const L = line(a), c = a.hex;
    const legs = [62, 88, 112, 138].map((x, i) => VE(x, 178 - (i % 3 ? 4 : 0), 13, 11, c, L, 2) + N(`M${x - 6},${186 - (i % 3 ? 4 : 0)} l-2,4 M${x},${188 - (i % 3 ? 4 : 0)} v4 M${x + 6},${186 - (i % 3 ? 4 : 0)} l2,4`, L, 1.6)).join("");
    return bb(b, legs + V("M30,128 C28,92 60,74 100,74 C140,74 172,92 170,128 C170,160 140,174 100,174 C60,174 30,160 30,128Z", c, L) + N("M64,80 Q56,128 64,170 M100,74 V174 M136,80 Q144,128 136,170", dk(c, .2), 2, 'opacity=".35"') + E(100, 150, 46, 14, a.belly, "", 0, 'opacity=".55"')
      + V("M42,104 C40,72 64,56 92,58 C112,60 122,74 120,100 C118,122 98,132 78,130 C58,128 44,120 42,104Z", c, L) + VE(66, 104, 9, 8, lt(c, .3), L, 1.8) + E(66, 104, 4, 3.6, dk(c, .45)) + eye(76, 88, 6.5, "#2a1a2e", b) + eye(100, 86, 6.5, "#2a1a2e", b) + cheeks(12, 104) + (a.o.etoiles ? [[140, 100], [120, 140], [154, 132]].map(([x, y]) => P(starD(x, y, 5), "#fff6c9")).join("") : ""), .86); };
  // Crevette : un corps en arc, des antennes, un éventail
  K.crevette = (a, b) => { const L = line(a), c = a.hex;
    const segs = [[150, 104, 22], [140, 128, 22], [122, 146, 21], [100, 156, 20], [78, 152, 18]].map(([x, y, r]) => VE(x, y, r, r * .86, c, L, 2) + N(`M${x - r * .7},${y - r * .5} Q${x},${y - r * 1.05} ${x + r * .7},${y - r * .5}`, lt(c, .35), 2.2, 'opacity=".7"')).join("");
    return bb(b, N("M140,90 C110,40 70,30 30,44 M146,88 C130,50 100,26 64,22", dk(c, .3), 2.4) + [100, 116, 132, 148].map(x => N(`M${x},${150 + (x - 100) * -.3} l-4,26`, dk(c, .3), 2.6)).join("") + P("M66,150 C46,132 34,140 30,156 C40,158 48,162 52,172 C58,166 64,160 70,158Z", lt(c, .1), L, 2) + segs
      + V("M128,92 C130,70 152,60 168,72 C182,84 178,108 164,114 C150,120 128,112 128,92Z", c, L) + eye(152, 86, 8, "#2a1a2e", b) + N("M160,100 q6,4 10,0", L, 2) + E(144, 100, 6, 4, "url(#aBl)"), .86); };
  // Mante religieuse : tête triangle, grands yeux, bras repliés
  K.mante = (a, b) => { const L = line(a), c = a.hex, d = a.dark;
    return bb(b, two(N("M88,150 L64,176 L58,190 M96,154 L84,186", L, 4) + N("M88,150 L64,176 L58,190 M96,154 L84,186", c, 2)) + P("M84,180 C66,160 74,120 100,112 C126,120 134,160 116,180 C110,190 90,190 84,180Z", c, L, 2.4) + P("M100,118 C112,130 118,156 110,176", "none", d, 1.6) + (a.o.ailes ? two(P("M98,124 C70,140 66,170 82,182 C92,166 96,146 100,128Z", lt(c, .5), c, 1.6, 'fill-opacity=".7"')) : "")
      + V("M90,84 C88,98 92,114 100,118 C108,114 112,98 110,84Z", c, L) + two(V("M92,100 C76,96 62,104 60,116 L70,118 C72,110 80,108 92,110Z", c, L, 2) + P("M60,116 L50,92 L58,94 L66,116Z", d, L, 1.6))
      + V("M60,58 C62,40 82,30 100,30 C118,30 138,40 140,58 C138,74 118,90 100,92 C82,90 62,74 60,58Z", c, L) + two(N("M88,32 C80,16 70,6 56,4", L, 2) + VE(72, 56, 13, 14, d, L, 2) + E(68, 52, 4, 4, "#fff", "", 0, 'opacity=".8"')) + N("M92,78 Q100,84 108,78", L, 2) + cheeks(22, 72), .86); };
  // Sauterelle : grandes pattes arrière, longues antennes
  K.sauterelle = (a, b) => { const L = line(a), c = a.hex, d = a.dark;
    return bb(b, two(P("M70,150 C40,110 30,96 40,92 C50,104 72,130 86,148Z", c, L, 2) + N("M44,96 L30,186 M40,186 h-14", L, 3)) + N("M90,160 L82,188 M110,160 L118,188", L, 3) + V("M60,160 C58,132 80,118 100,118 C120,118 142,132 140,160 C138,180 120,188 100,188 C80,188 62,180 60,160Z", c, L) + N("M70,140 Q100,132 130,140 M66,158 Q100,150 134,158 M70,174 Q100,168 130,174", d, 2, 'opacity=".5"') + (a.o.ailes ? P("M74,128 C92,120 118,120 128,130 C120,150 90,156 74,128Z", lt(c, .4), d, 1.6, 'fill-opacity=".8"') : "")
      + two(N("M88,62 C80,30 66,12 50,6", L, 2.4) + C(50, 6, 3, d)) + V("M58,88 C56,62 76,48 100,48 C124,48 144,62 142,88 C142,108 124,120 100,120 C76,120 58,108 58,88Z", c, L) + eyes(a, 22, 84, 11, b, "#3a2a1e") + smile(102, 8) + cheeks(36, 100), .86); };
  // Fourmi : trois boules, six pattes, deux antennes
  K.fourmi = (a, b) => { const L = line(a), c = a.hex, o = a.o;
    return bb(b, two(N("M88,150 C70,156 60,170 54,188 M92,140 C72,138 58,146 46,160 M96,160 C86,170 82,180 82,190", L, 4)) + VE(100, 168, 34, 24, c, L) + VE(100, 136, 18, 16, c, L) + E(100, 170, 18, 10, lt(c, .3), "", 0, 'opacity=".4"')
      + two(N("M84,58 C72,30 62,20 50,20", L, 3) + VE(48, 19, 6, 6, o.bout || c, L, 1.6)) + V("M54,88 C52,58 74,44 100,44 C126,44 148,58 146,88 C146,112 126,124 100,124 C74,124 54,112 54,88Z", c, L) + eyes(a, 24, 84, 11, b, "#3a2a1e") + smile(104, 8) + cheeks(38, 102)
      + (o.charge && !b ? G("translate(150 112)", { feuille: P("M-14,-14 C-18,-40 10,-46 18,-34 C14,-20 0,-12 -14,-14Z", "#7fcb6a", "#3f7a34", 1.8), miette: V("M-12,-12 L-6,-30 L10,-32 L16,-16 L4,-10Z", "#f3c98a", "#a8763c", 1.8), sucre: R(-10, -30, 20, 18, 3, "#fff", "#9aa5bf", 1.8), fraise: P("M0,-12 C-14,-18 -14,-34 0,-34 C14,-34 14,-18 0,-12Z", "#f0485e", "#8f1f34", 1.8) }[o.charge]) : ""), .86); };
  // Monstre du lac : long cou, bosses, et une vaguelette
  K.nessie = (a, b) => { const L = line(a), c = a.hex;
    return bb(b, [[58, 166, 26], [104, 172, 20]].map(([x, y, r]) => V(`M${x - r},${y} C${x - r},${y - r * 1.4} ${x + r},${y - r * 1.4} ${x + r},${y}Z`, c, L)).join("") + N("M150,178 C158,160 150,120 132,104", L, 25) + N("M150,178 C158,160 150,120 132,104", c, 21) + two(N("M50,182 q10,-6 20,0", "#fff", 2.4, 'opacity=".7"')) + E(100, 184, 92, 10, "#8fc4f0", "#5f8fc9", 2, 'opacity=".8"')
      + (a.o.crete ? [[146, 150], [152, 132], [148, 114]].map(([x, y]) => P(`M${x},${y} l10,-4 l-6,10Z`, a.dark, L, 1.4)).join("") : "") + V("M100,92 C98,70 116,58 134,60 C154,62 164,78 160,96 C156,112 140,118 124,116 C108,114 100,106 100,92Z", c, L) + eye(124, 84, 8.5, "#2a2a3e", b) + eye(146, 84, 8.5, "#2a2a3e", b) + N("M126,102 Q136,108 146,102", L, 2.2) + E(118, 100, 6, 4, "url(#aBl)") + E(154, 100, 6, 4, "url(#aBl)"), .86); };
  Object.assign(AN, { taupe: () => [[100, 42], [100, 80, 24], [100, 124], 1], pika: () => [[100, 44], [100, 84, 26], [100, 126], 1], jackalope: () => [[100, 40], [100, 82, 24], [100, 124], 1], tarsier: () => [[100, 40], [100, 84, 30], [100, 124], 1], pelican: () => [[98, 36], [96, 62, 14], [98, 100], .8], dodo: () => [[100, 42], [94, 72, 16], [100, 108], .85], tardigrade: () => [[82, 60], [88, 88, 18], [82, 128], .8], crevette: () => [[154, 64], [152, 86, 10], [140, 112], .6], mante: () => [[100, 32], [100, 56, 30], [100, 96], .85], sauterelle: () => [[100, 50], [100, 84, 24], [100, 120], .9], fourmi: () => [[100, 46], [100, 84, 24], [100, 124], .9], nessie: () => [[132, 60], [135, 84, 13], [134, 120], .7] });

  // prénom | variété | pelage | foncé | ventre | options
  const NEW = {
    taupe: ["Taupe", "Une taupe", "creuse des tunnels pour rendre visite à ses amis", `Taupinette|des jardins|5a4f5f|2a2430|8f8494|;Gaspardine|dorée|b5925c|6b5230|e3cfa8|;Pelleteur|mineuse|4a4552|1f1c24|8a8494|casque;Mouflette|à nez étoilé|3f3a48|17141c|7a7486|etoile;Grisette|argentée|9aa0ac|565c68|d3d7de|;Truffaut|chocolat|6b4a36|38241a|a5856c|;Lilou|lilas|b5a5d3|6a5a8f|e8e0f5|;Piochette|rousse|b5703c|6b3a14|e8c5a0|casque;Velours|noire|35313c|121016|5f5a66|etoile;Cacahuète|des sables|d9b98a|8f7048|f6e8d0|;Myrtil|bleutée|7f8fb5|3f4a70|c9d0e8|`],
    pika: ["Pika", "Un pika", "fait des réserves de fleurs séchées pour l'hiver", `Pomponnette|des montagnes|c9a07a|7a5a3a|f3e3cf|;Bouillotte|gris|a5a8b3|5c606c|eceef2|;Caramelle|caramel|d9985a|8a5424|f8e2c8|;Neigeon|des neiges|f3f4f7|a3a8b5|ffffff|;Brioche|doré|e8c070|94701c|fff3d5|;Sésame|tacheté|e3cba5|8a6a42|fff8ea|;Mochi|rosé|f3c9cf|a8707c|fff0f2|;Grignou|chocolat|7a5440|3f291d|c9a890|;Fripon|cendré|8a8a94|4a4a54|cfcfd8|;Noisetine|noisette|b5834f|6a4520|eed8bc|`],
    jackalope: ["Lièvre cornu", "Un lièvre cornu", "est une légende des grandes plaines, et il le sait", `Arpent|des plaines|c9a07a|6b4a2a|f3e3cf|;Bourrasque|des prairies|b58a62|5f4226|f0dcc4|;Plumeau|des neiges|f6f7fa|8f7a5f|ffffff|;Sirocco|du désert|e3c193|8f6a3a|fff4e0|;Fable|gris|a9aeb8|5f5240|eef0f3|;Cerfeuil|roux|d08a52|7a4418|fde6cc|;Lunaire|de minuit|5f66a8|c9a56a|cfd5f7|;Brindille|chocolat|7d553a|c9a06a|e8d5c0|`],
    tarsier: ["Tarsier", "Un tarsier", "voit tout la nuit grâce à ses yeux géants", `Noctule|des philippines|b5967a|6b5040|f0e0cc||;Grandzieux|doré|d9b07a|8a6a3a|f8ead4|;Lanterne|gris|a5a0a5|5c585e|e8e5e8|iris=f5c84c;Clignote|roux|c9845a|7a4424|f6dcc4|;Pupille|crème|ecdcc0|a08a68|fffaf0|iris=6fbf5a;Ébène|sombre|6a5a52|302824|a89a92|iris=ffb84c;Minouche|rosé|e3bdb5|926a66|fbeeec|;Calypso|cannelle|b5774a|6f4020|e8c8a8|iris=5fa8e8`],
    pelican: ["Pélican", "Un pélican", "garde toujours un poisson dans son bec pour un ami affamé", `Gosier|blanc|fbfbf9|a8adb8|ffffff|poisson;Brontë|brun|8f7a68|4a3a2e|e8ddd0|;Capitaine|à huppe|f3f1ec|8a8f9a|ffffff|huppe,poisson;Flamboyante|rose|f7c5cf|b5707f|fff0f3|bec=f58a5c;Grand Large|gris|b5bcc8|5f6878|eef1f5|;Barbotine|frisé|e8e6e0|9a968c|fffdf8|huppe;Soupape|doré|f3d9a0|a8803c|fff6e0|poisson;Marée|bleuté|c5d5ec|6a7fa8|f0f5fc|bec=e8c05a;Croisière|noir|4a4752|1f1d24|8f8a96|bec=f5b84c`],
    dodo: ["Dodo", "Un dodo", "a disparu des livres d'histoire mais pas de la garderie", `Dodu|gris|a9aab5|5c5e6b|e8e9ee|;Pataude|brun|a0846a|5a4632|e8dccd|;Rondelet|blanc|f6f5f2|a8a5a0|ffffff|;Patapon|bleuté|9fb0cc|56657f|e5ebf5|bec=f0d06a;Gros-Câlin|rosé|e8c0c5|a07580|fbeef0|;Bidou|doré|e3c27a|94702c|fbf0d5|;Mauricette|de l'île Maurice|8f9a8a|4a5644|dfe5da|;Bouboule|lilas|c5b5e0|6f5f9a|f3eefa|bec=f5c84c;Tonnelet|chocolat|7a5a48|3f2c22|d0bba8|`],
    tardigrade: ["Tardigrade", "Un tardigrade", "survit au froid, au chaud et même à l'espace, sans jamais perdre le sourire", `Increvable|rose|f5c5cf|b0707f|fff2f4|;Mousse|menthe|bfe8d2|4f9a72|f0fff6|;Patapouf|beige|e8dcc8|8f7f66|fbf6ee|;Cosmos|de l'espace|7a6fd0|33286f|c9c2f5|etoiles;Lichen|vert|a8cf8a|557a3c|ecf7e0|;Goutte|bleu|a8c8f0|4f70a8|ebf3fd|;Pistil|jaune|f3e08a|a8901c|fffbe0|;Nébula|violet|b59ae8|5f4aa8|eee6fd|etoiles;Biscotte|caramel|e0b07a|8f6230|fbeedd|;Perle|nacré|f3eef5|a89fb5|ffffff|`],
    crevette: ["Crevette", "Une crevette", "nettoie les dents des poissons et leur raconte des blagues", `Corail|rose|f9a5a0|c0504a|ffe0dc|;Mandarine|orange|f9a05c|b5520f|ffe6c9|;Grenadine|rouge|e8564a|8f1f1c|ffd5cb|;Lagon|bleue|7fb8f0|2f62a8|e0eeff|;Calicot|rayée|fbe6dc|e5485a|fff6f2|;Opale|translucide|e6eef5|8fa0b5|ffffff|;Paprika|tachetée|f5873c|8f3a14|ffe0c5|;Lilas|violette|c5a8f0|6a4aa8|f3ebff|`],
    mante: ["Mante", "Une mante", "médite des heures sur une feuille sans bouger une antenne", `Zénith|verte|8fd06a|3f7a2c|e3f7cf||;Orchidée|orchidée|f9d0e0|c0708f|fff3f8|ailes;Brindille|brune|c0a07a|6b5236|f0e3d0|;Jade|jade|5fc9a0|1f7a5a|dcf7ec|ailes;Citronnelle|jaune|e8e07a|8a8a1c|fbf9d8|;Sakura|rose|f7b5c9|b5607f|fff0f5|ailes;Feuillette|des bois|9ab56a|556b30|e8f0d5|;Lune|pâle|dfe8d0|8f9a7a|f8fbf2|ailes`],
    sauterelle: ["Sauterelle", "Une sauterelle", "saute si haut qu'elle dit bonjour aux nuages", `Ressort|verte|8fcf5c|3f7a1c|e8f7d0|;Galipette|des prés|b5cf6a|5f7a24|f0f7d5|ailes;Cigalou|brune|c9a56a|6b5226|f3e6cc|;Rebond|rose|f7a5c0|b0507a|ffe8f0|ailes;Trampoline|jaune|f3d84f|a8861a|fff6c9|;Pirouette|turquoise|5fd0c9|157a75|dcf7f5|ailes;Criquette|orange|f5a04c|a8560f|ffe6c5|;Kangourette|lilas|c5b0f0|6f58b0|f6f0ff|ailes`],
    fourmi: ["Fourmi", "Une fourmi", "porte des choses dix fois plus lourdes qu'elle, en chantant", `Brindille|rousse|c9603c|6b2a1c|f3c9b8|charge=feuille;Miette|noire|4a4552|1f1c24|8f8a96|charge=miette;Sucrette|dorée|e8bf5c|8f6a18|fff3cf|charge=sucre;Fraisine|rouge|d9443f|7d1a1c|ffd0c9|charge=fraise;Ouvrière|brune|8a6a48|4a3420|e0cba8|;Reinette|violette|8f6fd0|3f2a7a|e3dbfa|bout=ffd84d;Fourmillon|verte|6fb85a|2f6b2a|dcf3d0|charge=feuille;Mimosa|jaune|f3d04f|8a7a14|fff3c0|bout=ff8fb0;Capucine|rose|f095b0|a8486c|ffe3ec|charge=sucre`],
    nessie: ["Monstre du lac", "Un monstre du lac", "se cache depuis des siècles, mais adore les photos", `Nessie|du Loch Ness|6fae8a|2f6b4a|d5f0e0|crete;Bulle|bleu|7fb0e8|2f5aa8|dcecfd|;Algue|vert d'eau|8fd0b5|2f8a6a|e3f8ef|crete;Brume|gris|a5afbd|56607a|eceff4|;Lagune|turquoise|5fcbc4|1f7a75|dcf7f4|crete;Vaguelette|lilas|c0aee8|6a52a8|f4effd|;Champy|du lac Champlain|9ab56a|4f6b2a|ecf3dd|crete;Ogopogo|vert sapin|4f8a6a|1f4a36|c9e8d5|`]
  };

  // ======================== 2. PERSONNAGES D'ESPÈCES CONNUES ========================
  // où poser les accessoires : copie des repères du compagnon (compagnon-art.js)
  const HAT = { hamster: [100, 40], guinea: [100, 44], ferret: [100, 48], hedgehog: [100, 60], songbird: [100, 38], parrot: [100, 38], owl: [100, 42], penguin: [100, 36], llama: [100, 34], snake: [100, 36], frog: [100, 60], sheep: [100, 34], horse: [100, 36], cow: [100, 36], deer: [100, 40], pigeon: [72, 28], duck: [124, 48], turtle: [168, 78], chicken: [100, 40], crocodile: [100, 46], giraffe: [100, 30], raptor: [100, 38], lizard: [100, 46], goat: [100, 36], roo: [100, 42], bat: [100, 40], axolotl: [100, 48], kiwi: [100, 34] };
  const EYE = { kiwi: [100, 78, 24], anteater: [100, 80, 25], meerkat: [100, 86, 23], hamster: [100, 92, 26], guinea: [100, 96, 30], ferret: [100, 86, 22], hedgehog: [100, 112, 23], sheep: [100, 82, 19], llama: [100, 66, 22], horse: [100, 76, 22], cow: [100, 78, 22], deer: [100, 80, 24], songbird: [100, 82, 22], parrot: [100, 82, 22], owl: [100, 86, 25], penguin: [100, 86, 22], snake: [100, 62, 22], frog: [100, 65, 34], axolotl: [100, 86, 36], platypus: [100, 78, 26], giraffe: [100, 62, 22], raptor: [100, 80, 23], lizard: [100, 80, 30], goat: [100, 78, 22], roo: [100, 80, 22], hippo: [100, 74, 25], bat: [100, 84, 24], sloth: [100, 86, 22], crocodile: [100, 50, 32], chicken: [100, 82, 19], dino: [100, 80, 26], dragon: [100, 80, 26], pigeon: [70, 56, 0], duck: [127, 84, 15], turtle: [172, 104, 11], rabbit: [100, 84, 25], mouse: [100, 84, 23], bear: [100, 84, 25], elephant: [100, 80, 26] };
  const NECK = { kiwi: [100, 118], hamster: [100, 136], guinea: [100, 140], songbird: [100, 118], parrot: [100, 122], owl: [100, 120], penguin: [100, 122], snake: [100, 98], frog: [100, 144], llama: [100, 110], hedgehog: [100, 150], chicken: [100, 114], giraffe: [100, 116], raptor: [100, 120], pigeon: [76, 92], duck: [122, 126], turtle: [160, 140], ferret: [100, 126] };
  const anc = a => { const k = a.kind; return { h: HAT[k] || [100, 42], e: EYE[k] || [100, 84, 24], n: NECK[k] || [100, 124] }; };
  // accessoires (repère : point d'ancrage en 0,0 ; s = échelle)
  const HATS = {
    toque: c => N("M-24,-2 Q0,-10 24,-2", "#b5b0c0", 12) + N("M-24,-2 Q0,-10 24,-2", "#fff", 9) + V("M-22,-8 C-40,-14 -34,-40 -16,-36 C-10,-50 14,-50 18,-36 C36,-40 40,-14 22,-8 Q0,-16 -22,-8Z", "#fff", "#a8a3b5", 2),
    beret: c => V("M-30,0 C-38,-22 -6,-34 20,-26 C40,-20 42,-4 30,0 Q0,-10 -30,0Z", c, dk(c, .42), 2) + N("M8,-28 v-7", dk(c, .42), 3),
    couronne: c => P("M-22,0 L-26,-24 L-12,-12 L0,-30 L12,-12 L26,-24 L22,0 Q0,-6 -22,0Z", "#ffd15c", "#a8761c", 2) + C(0, -14, 3.6, c, dk(c, .4), 1),
    fleurs: c => [-24, -12, 0, 12, 24].map((x, i) => [0, 72, 144, 216, 288].map(t => E(x + 4 * Math.cos(t / 57.3), -4 + Math.abs(x) * .2 + 4 * Math.sin(t / 57.3), 3.4, 3.4, ["#ff9fc0", "#fff", c, "#ffd166", "#b99af2"][i])).join("") + C(x, -4 + Math.abs(x) * .2, 2.4, "#ffc93c")).join(""),
    paille: c => E(0, -2, 40, 9, "#f6dfa5", "#a8823c", 2) + V("M-20,-4 C-22,-24 -10,-30 0,-30 C10,-30 22,-24 20,-4Z", "#f6dfa5", "#a8823c", 2) + N("M-20,-7 Q0,-2 20,-7", c, 5),
    sorcier: c => E(0, -2, 38, 8, dk(c, .1), dk(c, .45), 2) + V("M-22,-4 C-18,-24 0,-44 22,-56 C12,-40 18,-20 22,-4Z", c, dk(c, .45), 2) + P(starD(4, -24, 5), "#ffd84d"),
    casquette: c => V("M-24,0 C-24,-22 -10,-28 0,-28 C10,-28 24,-22 24,0 Q0,-8 -24,0Z", c, dk(c, .42), 2) + P("M-20,0 Q0,-8 20,0 Q34,6 20,8 Q0,2 -20,8Z", dk(c, .15), dk(c, .45), 1.8),
    hdf: c => E(0, 0, 30, 7, "#2f2b3a", "#15131b", 2) + R(-16, -34, 32, 34, 3, "#2f2b3a", "#15131b", 2) + R(-16, -10, 32, 6, 1, c),
    nuit: c => V("M-24,0 C-24,-24 0,-32 14,-28 C30,-22 36,-6 42,6 C34,6 28,0 24,-2 Q0,-8 -24,0Z", c, dk(c, .42), 2) + C(42, 8, 6, "#fff", "#b5a8b5", 1.4),
    noeud: c => G("translate(14 -6) rotate(16)", P("M0,0 C-8,-12 -22,-9 -20,0 C-22,9 -8,12 0,0 C8,12 22,9 20,0 C22,-9 8,-12 0,0Z", c, dk(c, .4), 1.8) + C(0, 0, 4.6, lt(c, .3), dk(c, .4), 1.4)),
    marin: c => V("M-24,-4 C-26,-22 26,-22 24,-4 Q0,-12 -24,-4Z", "#fff", "#8a9ab5", 2) + P("M-24,-4 Q0,-12 24,-4 L22,2 Q0,-6 -22,2Z", "#24508f") + C(0, -22, 4, c),
    cowboy: c => E(0, -2, 38, 8, c, dk(c, .42), 2) + V("M-18,-4 C-20,-28 -8,-24 0,-28 C8,-24 20,-28 18,-4 Q0,2 -18,-4Z", c, dk(c, .42), 2) + N("M-18,-8 Q0,-2 18,-8", dk(c, .42), 3),
    sport: c => N("M-26,4 Q0,-14 26,4", dk(c, .4), 10) + N("M-26,4 Q0,-14 26,4", c, 7) + N("M-26,3 Q0,-15 26,3", "#fff", 2),
    explo: c => E(0, -2, 36, 8, "#c9b07a", "#7a6a3a", 2) + V("M-22,-4 C-24,-26 -10,-32 0,-32 C10,-32 24,-26 22,-4Z", "#d9c08a", "#7a6a3a", 2) + N("M-22,-8 Q0,-14 22,-8", c, 4),
    casqueC: c => V("M-26,2 C-28,-24 -12,-34 0,-34 C12,-34 28,-24 26,2Z", "#ffd84d", "#a8801c", 2) + C(0, -22, 6, "#fff6c9", "#a8801c", 1.4),
    bandana: c => V("M-26,2 C-28,-22 -12,-30 0,-30 C12,-30 28,-22 26,2 Q0,-8 -26,2Z", c, dk(c, .42), 2) + P("M22,0 L36,8 L30,16 L24,6Z", c, dk(c, .42), 1.6) + [[-12, -16], [0, -22], [12, -14]].map(([x, y]) => C(x, y, 2.2, "#fff")).join("")
  };
  const EYES = {
    rondes: (dx, c) => [-1, 1].map(q => E(q * dx * .7, 0, dx * .55, dx * .55, "#eaf6ff", c, 2.6, 'fill-opacity=".3"')).join("") + N(`M${-dx * .15},-1 Q0,-4 ${dx * .15},-1`, c, 2.4),
    soleil: (dx, c) => [-1, 1].map(q => E(q * dx * .7, 0, dx * .58, dx * .46, "#2f2b3a", c, 2.2) + E(q * dx * .7 - dx * .2, -dx * .15, dx * .14, dx * .1, "#fff", "", 0, 'opacity=".5"')).join("") + N(`M${-dx * .15},-1 Q0,-4 ${dx * .15},-1`, c, 2.4),
    monocle: (dx, c) => E(dx * .7, 0, dx * .5, dx * .5, "#eaf6ff", "#c9a03c", 2.4, 'fill-opacity=".3"') + N(`M${dx * .7},${dx * .5} q4,14 -2,24`, "#c9a03c", 1.2),
    bandeau: (dx, c) => N(`M${-dx * 1.4},${-dx * .5} L${dx * 1.4},${-dx * .1}`, "#2f2b3a", 2.2) + E(-dx * .7, 0, dx * .5, dx * .45, "#2f2b3a"),
    masque: (dx, c) => P(`M${-dx * 1.4},${-dx * .3} Q0,${-dx * .7} ${dx * 1.4},${-dx * .3} Q${dx * 1.3},${dx * .6} ${dx * .3},${dx * .4} Q0,${dx * .1} ${-dx * .3},${dx * .4} Q${-dx * 1.3},${dx * .6} ${-dx * 1.4},${-dx * .3}Z`, c, dk(c, .45), 1.6, 'fill-opacity=".85"') + [-1, 1].map(q => E(q * dx * .7, 0, dx * .26, dx * .22, "#fff", "", 0, 'opacity=".9"')).join("")
  };
  const NECKS = {
    noeudpap: c => P("M0,0 L-16,-9 L-16,9Z M0,0 L16,-9 L16,9Z", c, dk(c, .42), 1.6) + C(0, 0, 4, dk(c, .1), dk(c, .42), 1.2),
    echarpe: c => N("M-30,-4 Q0,10 30,-4", dk(c, .4), 12) + N("M-30,-4 Q0,10 30,-4", c, 9) + P("M14,4 L24,30 L14,32 L8,6Z", c, dk(c, .4), 1.6) + N("M12,26 h10", "#fff", 2, 'opacity=".6"'),
    medaille: c => N("M-14,-6 L0,10 L14,-6", "#e5485a", 4) + C(0, 16, 8, "#ffd84d", "#a8761c", 1.8) + P(starD(0, 16, 4.4), "#fff6c9"),
    stetho: c => N("M-14,-6 C-18,14 -6,24 2,22 C12,20 16,8 14,-6", "#3f4f70", 2.6) + C(2, 26, 5, "#c9d3e2", "#56627a", 1.4),
    perles: c => [-24, -16, -8, 0, 8, 16, 24].map(x => C(x, -2 + (24 - Math.abs(x)) * .25, 3.4, "#fffaf6", "#b5a8b5", 1)).join(""),
    foulard: c => P("M-24,-6 Q0,6 24,-6 L4,22 Q0,26 -4,22Z", c, dk(c, .42), 1.8) + C(-8, 2, 1.8, "#fff") + C(6, 4, 1.8, "#fff"),
    cloche: c => N("M-22,-6 Q0,8 22,-6", "#b5281f", 5) + V("M-8,2 C-8,-6 8,-6 8,2 L10,12 H-10Z", "#ffd84d", "#a8761c", 1.6) + C(0, 13, 2, "#a8761c"),
    cravate: c => N("M-16,-4 Q0,4 16,-4", "#fff", 4) + P("M-3,0 H3 L2,4 L6,22 L0,28 L-6,22 L-2,4Z", c, dk(c, .42), 1.4),
    badge: c => R(-12, -6, 24, 14, 3, "#fff", "#8fa0b8", 1.2) + `<text x="0" y="4.5" text-anchor="middle" font-size="7.5" font-weight="900" fill="${c}" font-family="Nunito,sans-serif">KINÉ</text>`
  };
  const accArt = a => { const { h, e, n } = anc(a), X = a.acc, s = e[2] / 24 || .6; let out = "";
    if (X.n && NECKS[X.n]) out += G(`translate(${n[0]} ${n[1]}) scale(${s})`, NECKS[X.n](X.c));
    if (X.e && EYES[X.e] && e[2]) out += G(`translate(${e[0]} ${e[1]})`, EYES[X.e](e[2], X.ec || "#3a3550"));
    if (X.h && HATS[X.h]) out += G(`translate(${h[0]} ${h[1]}) scale(${s})`, HATS[X.h](X.c));
    return out; };
  // métiers / rôles : accessoires et petite phrase
  const ROLES = {
    patissier: [{ h: "toque", n: "foulard" }, "est {pâtissier|pâtissière} : ses gâteaux sentent bon jusqu'au bout de la rue"],
    peintre: [{ h: "beret", n: "foulard" }, "peint des arcs-en-ciel sur les murs gris"],
    roi: [{ h: "couronne", n: "perles" }, "règne sur un royaume de coussins avec beaucoup de gentillesse"],
    fleuriste: [{ h: "fleurs" }, "tresse des couronnes de fleurs pour tous ses amis"],
    jardinier: [{ h: "paille", n: "foulard" }, "fait pousser des tomates géantes"],
    magicien: [{ h: "sorcier" }, "fait apparaître des bonbons derrière les oreilles"],
    facteur: [{ h: "casquette", n: "cravate" }, "distribue le courrier en courant, sans jamais se tromper d'adresse"],
    artiste: [{ h: "hdf", n: "noeudpap" }, "présente le spectacle du soir avec une voix de géant"],
    dormeur: [{ h: "nuit" }, "est {champion|championne} du monde de la sieste"],
    coquet: [{ h: "noeud", n: "perles" }, "ne sort jamais sans son plus beau nœud"],
    marin: [{ h: "marin", n: "foulard" }, "a fait trois fois le tour du lac en barque"],
    cowboy: [{ h: "cowboy", n: "foulard" }, "galope dans les prairies en chantant des chansons de feu de camp"],
    sportif: [{ h: "sport", n: "medaille" }, "a gagné la médaille d'or de la course en sac"],
    explorateur: [{ h: "explo", e: "rondes" }, "a exploré tous les recoins du jardin, même derrière le compost"],
    savant: [{ e: "rondes", n: "noeudpap" }, "fait des expériences qui font des bulles de toutes les couleurs"],
    star: [{ e: "soleil", n: "echarpe" }, "pose pour les photos comme une vedette de cinéma"],
    docteur: [{ e: "rondes", n: "stetho" }, "soigne les bobos des peluches avec beaucoup de sérieux"],
    kine: [{ n: "badge" }, "{kiné|kiné} de la ménagerie : {il|elle} masse les pattes fatiguées et connaît tous les muscles"],
    poete: [{ h: "beret", n: "echarpe" }, "écrit des poèmes sur la lune et les pissenlits"],
    detective: [{ h: "casquette", e: "monocle" }, "résout les mystères des chaussettes disparues"],
    pirate: [{ h: "bandana", e: "bandeau" }, "cherche un trésor qu'{il|elle} a {lui-même|elle-même} enterré"],
    superheros: [{ e: "masque", n: "echarpe" }, "vole au secours de tous ceux qui ont perdu leur doudou"],
    chantier: [{ h: "casqueC", n: "foulard" }, "construit des cabanes solides comme des châteaux"],
    berger: [{ n: "cloche" }, "ne se perd jamais grâce à sa petite cloche"],
    elegant: [{ e: "monocle", n: "cravate" }, "boit son chocolat chaud le petit doigt en l'air"]
  };
  const RK = Object.keys(ROLES);
  const RNAME = { patissier: "{pâtissier|pâtissière}", peintre: "peintre", roi: "{roi|reine}", fleuriste: "fleuriste", jardinier: "{jardinier|jardinière}", magicien: "{magicien|magicienne}", facteur: "{facteur|factrice}", artiste: "{Monsieur Loyal|Madame Loyale}", dormeur: "{dormeur|dormeuse}", coquet: "{coquet|coquette}", marin: "marin", cowboy: "{cow-boy|cow-girl}", sportif: "{sportif|sportive}", explorateur: "{explorateur|exploratrice}", savant: "{savant|savante}", star: "star", docteur: "{docteur|docteure}", kine: "kiné", poete: "{poète|poétesse}", detective: "détective", pirate: "pirate", superheros: "{super-héros|super-héroïne}", chantier: "{bâtisseur|bâtisseuse}", berger: "{montagnard|montagnarde}", elegant: "{élégant|élégante}" };
  const ACCOL = ["#e5485a", "#5fa8f0", "#7fc98a", "#8f7bea", "#f5a04c", "#ff7aa5", "#3fae9a", "#ffd15c", "#4f6fc0", "#c9405f"];
  // base existante (identifiant) | prénoms (un par personnage)
  const PERSO = `chien-golden|Biscuit Câline Ronron Taquine Domino|dog|Chien|le chien|la chienne
chien-dalmatien|Pois-Chiche Pointille Confetti|dog|Chien|le chien|la chienne
chien-corgi-roux|Brioche Gaufrette Tartine Croûton|dog|Chien|le chien|la chienne
chien-husky|Blizzard Igloo Aurore|dog|Chien|le chien|la chienne
chien-carlin|Grognon Pépère Mamie Plissée|dog|Chien|le chien|la chienne
chien-shiba|Sushi Miso Yuzu|dog|Chien|le chien|la chienne
chat-tigre-roux|Garfieldine Mandarin Abricotine Rouquin|cat|Chat|le chat|la chatte
chat-noir|Minuit Réglisse Ombrelle Pruneau|cat|Chat|le chat|la chatte
chat-siamois|Saphir Lotus Moka|cat|Chat|le chat|la chatte
chat-persan|Duchesse Pacha Coton|cat|Chat|le chat|la chatte
chat-calico|Patchwork Arlequine Mosaïque|cat|Chat|le chat|la chatte
chat-maine-coon|Lion_d'Or Panache Broussaille|cat|Chat|le chat|la chatte
renard-roux|Rusé Cannelle Flammèche Goupil|fox|Renard|le renard|la renarde
renard-fennec|Oasis Dune Sahara|fox|Renard|le renard|la renarde
renard-polaire|Givre Banquise Frimas|fox|Renard|le renard|la renarde
lapin-belier-roux|Carottin Pirouette Doudou|rabbit|Lapin|le lapin|la lapine
lapin-angora|Pompon Nuage Flocon_d'Or|rabbit|Lapin|le lapin|la lapine
lapin-hollandais|Domino Bicolore Panda|rabbit|Lapin|le lapin|la lapine
hamster-canari|Joufflu Grignotte Tournicoti|hamster|Hamster|le hamster|la hamster
hamster-syrien|Roudoudou Cacahuète Biscotin|hamster|Hamster|le hamster|la hamster
furet-sable|Furtif Zigzag Faufile|ferret|Furet|le furet|la furette
loutre-riviere|Galet Ricochet Plouf Clapotis|otter|Loutre|la loutre|la loutre
ecureuil-noisette|Noisetier Gland Écorce|squirrel|Écureuil|l'écureuil|l'écureuil
herisson-doux|Piquant Châtaigne Bogue|hedgehog|Hérisson|le hérisson|la hérissonne
chouette-neige|Hulotte Pleine-Lune Sagesse|owl|Chouette et hibou|la chouette|la chouette
chouette-harfang|Blizzard Neigeuse Polaire|owl|Chouette et hibou|la chouette|la chouette
pingouin-glace|Smoking Frigo Glaçon Pingo|penguin|Manchot|le manchot|la manchote
tortue-jardin|Lambine Salade Carapace|turtle|Tortue|la tortue|la tortue
axolotl-rose|Sourire Bubulle Corail|axolotl|Axolotl|l'axolotl|l'axolotl
perroquet-tropical|Bavard Coco Mangue|parrot|Perroquet|le perroquet|la perruche
oiseau-mesange|Piou Mésangette Cui-Cui|songbird|Oiseau|l'oiseau|l'oiselle
pigeon-biset|Roucou Gris-Gris Facteur|pigeon|Pigeon|le pigeon|la colombe
crocodile-vert|Croquignol Sourire Mâchoire|crocodile|Crocodile|le crocodile|la crocodile
ornithorynque-brun|Bizarre Palmé Castorette|platypus|Ornithorynque|l'ornithorynque|l'ornithorynque
serpent-menthe|Zigouigoui Sifflote Menthol|snake|Serpent|le serpent|la couleuvre
bear-panda-geant|Bambou Dodu Yin-Yang Mochi|bear|Ours|le panda|la panda
bear-ours-brun|Martin Miel_d'Acacia Grizzou|bear|Ours|l'ours|l'ourse
bear-ours-polaire|Igloo Aurore_Boréale Banquiz|bear|Ours|l'ours|l'ourse
koala-koala-gris|Eucalyptus Câlinou Dormeur|koala|Koala|le koala|la koala
redpanda-panda-roux|Rouquette Feuillu Tanuki|redpanda|Panda roux|le panda roux|la panda rousse
bigcat-lion|Sa_Majesté Crinière Rugissant|bigcat|Félin sauvage|le lion|la lionne
bigcat-tigre-du-bengale|Rayé Bengali Shere|bigcat|Félin sauvage|le tigre|la tigresse
elephant-elephant-gris|Trompette Mémoire Barrissou|elephant|Éléphant|l'éléphant|l'éléphante
horse-licorne|Arc-en-Ciel Paillette Féérie|horse|Cheval|la licorne|la licorne
cow-vache-holstein|Marguerite Meuh Clochette|cow|Vache|le taureau|la vache
sheep-mouton-blanc|Frisotte Laineux Bêlou|sheep|Mouton|le mouton|la brebis
pig-cochon-rose|Groin-Groin Truffette Rose_Bonbon|pig|Cochon|le cochon|la truie
deer-faon|Bambi Clairière Fougère|deer|Cervidé|le faon|la biche
llama-alpaga-creme|Pelote Crachouille Andine|llama|Camélidé|l'alpaga|l'alpaga
monkey-ouistiti|Galipette Banane Acrobate|monkey|Singe|le ouistiti|la ouistiti
duck-caneton-jaune|Coin-Coin Barboteur Flaquette|duck|Canard et oie|le canard|la cane
chicken-poussin|Piou-Piou Coquille Œuf-Mollet|chicken|Poule|le poussin|la poulette
frog-rainette|Croâ Nénuphar Têtard|frog|Grenouille|la grenouille|la grenouille
dino-tyrannosaure|Rex Petit-Bras Grrr|dino|Dinosaure|le dinosaure|la dinosaure
dragon-dragon-rouge|Braise Étincelle Fumerolle|dragon|Créature magique|le dragon|la dragonne
wolf-loup-gris|Hurlou Lunaire Grisonnant|wolf|Loup|le loup|la louve
raccoon-raton-laveur-gris|Masqué Lavandière Chapardeur|raccoon|Raton laveur|le raton laveur|la raton laveuse
goat-chevre-blanche|Biquette Seguin Cabriole|goat|Chèvre|le bouc|la chèvre
giraffe-girafe-doree|Échasse Girafon Long-Cou|giraffe|Girafe|la girafe|la girafe
hippo-capybara-brun|Zen Baignoire Tranquille|hippo|Géant doux|le capybara|la capybara
roo-kangourou-roux|Boing Poche Sauteur|roo|Kangourou|le kangourou|la kangourou
sloth-paresseux-brun|Lentement Hamac Sieste|sloth|Paresseux|le paresseux|la paresseuse
bat-chauve-souris-brune|Écho Nocturne Radar|bat|Chauve-souris|la chauve-souris|la chauve-souris
meerkat-suricate-sable|Sentinelle Guetteur Périscope|meerkat|Suricate|le suricate|la suricate
mouse-souris-grise|Fromage Gruyère Trottinette|mouse|Souris et rat|la souris|la souris
guinea-cochon-d-inde-roux|Couinou Pissenlit Roudoudou|guinea|Cochon d'Inde|le cochon d'Inde|la cochonne d'Inde`;
  const TRAITS = ["adore les matins qui sentent le pain grillé", "rit pour un rien, surtout pour les chatouilles", "range ses affaires par ordre de taille", "est {gourmand|gourmande} de tout, sauf des brocolis", "connaît par cœur le nom de tous les os de la patte", "fait des câlins à qui en a besoin", "a toujours une histoire à raconter", "ronfle tout doucement en faisant la sieste", "collectionne les plumes trouvées", "chante très faux et très fort", "est {timide|timide}, mais {fidèle|fidèle} comme personne", "s'invente des danses le dimanche", "ne perd jamais son calme", "fait rire tout le monde avec ses grimaces", "prend soin des plus petits", "adore les énigmes", "rêve de voyages lointains", "a peur des orages mais pas des araignées", "compte les étoiles chaque soir", "ne dit jamais non à un goûter"];
  const CARA = ["joyeux|joyeuse", "calme|calme", "farceur|farceuse", "rêveur|rêveuse", "courageux|courageuse", "curieux|curieuse", "câlin|câline", "malin|maligne"];
  const gen = (s, f) => s.replace(/\{([^|}]*)\|([^}]*)\}/g, (_, m, w) => f ? w : m);
  const NEWLIST = [], fem = s => /^(la |une |l'(?!é))/i.test(s);

  // --- 1) les espèces nouvelles
  let ni = 0;
  Object.entries(NEW).forEach(([kind, [sp, un, phrase, rows]]) => rows.split(";").forEach((l, i) => {
    const [pr, va, c, d, w, op] = l.split("|"), o = {}; (op || "").split(",").filter(Boolean).forEach(q => { const [k, v] = q.split("="); o[k] = v === undefined ? true : /^[0-9a-f]{6}$/.test(v) ? "#" + v : v; });
    const f = /^Une/.test(un), name = `${pr}, ${sp.toLowerCase()} ${va}`, ca = CARA[(ni * 3) % CARA.length];
    NEWLIST.push({ kind, species: sp, family: kind, name, hex: "#" + c, dark: "#" + d, belly: "#" + w, o, id: "nx-" + kind + "-" + slug(pr + "-" + va), nxa: true, prenom: pr, caractere: gen("{" + ca + "}", f),
      histoire: gen(`${pr} est ${un.toLowerCase()} ${va} qui ${phrase}. ${f ? "Elle" : "Il"} ${TRAITS[(ni * 7) % TRAITS.length]}.`, f) }); ni++; }));

  // --- 2) les personnages
  let pk = 0;
  PERSO.trim().split("\n").forEach((l, bi) => {
    const [bid, names, , species, lm, lf] = l.trim().split("|"), base = A.byId[bid]; if (!base) return;
    names.split(" ").forEach((pr0, j) => {
      const pr = pr0.replace(/_/g, " "), role = RK[(bi * 5 + j * 3) % RK.length], [acc0, phrase] = ROLES[role], f = (bi + j) % 2 === 1, lab = f ? lf : lm, col = ACCOL[(bi * 3 + j * 7) % ACCOL.length];
      const tint = [0, .1, -.08, .16, -.14][j % 5], hx = tint > 0 ? mix(base.hex, "#ffffff", tint) : tint < 0 ? mix(base.hex, base.dark, -tint) : base.hex, ca = CARA[(pk * 5 + bi) % CARA.length];
      const name = `${pr}, ${lab.replace(/^(le |la |l')/, "")} ${gen(RNAME[role] || role, f)}`;
      NEWLIST.push({ ...base, o: { ...base.o, pose: undefined, mouth: ["open", "grin", "tongue", ""][j % 4] || undefined }, hex: hx, id: "nx-perso-" + slug(pr + "-" + bid), name, species, nxa: true, prenom: pr, metier: role, acc: { ...acc0, c: col }, caractere: gen("{" + ca + "}", f),
        histoire: gen(`${pr} est ${lab} qui ${phrase}. ${f ? "Elle" : "Il"} ${TRAITS[(pk * 3 + bi) % TRAITS.length]}.`, f) }); pk++; }); });

  // les personnages portent leur accessoire (pas leurs bébés)
  const used = new Set(NEWLIST.filter(a => a.acc).map(a => a.kind));
  used.forEach(k => { const f0 = K[k]; K[k] = (a, b, o) => { const s = f0(a, b, o); return a.acc && !b ? s + accArt(a) : s; }; });
  // anti-doublon d'identifiants, puis ajout à la ménagerie
  NEWLIST.forEach(a => { let id = a.id, n = 2; while (A.byId[id]) id = a.id + "-" + n++; a.id = id; A.animals.push(a); A.byId[id] = a; });
  A.NX_ANIMALS = NEWLIST.length;

  // ======================== LES TROIS BÉBÉS ========================
  // Chaque animal peut avoir trois bébés : en plus de la pose, du regard et du sourire (déjà propres à
  // chacun), ils ont chacun leur teinte (un peu plus clair, plus doré, plus doux), leur taille et un petit signe.
  A.DEFS += [[-8, 1.07, .03, .92], [10, .97, 0, 1.08], [0, 1.02, .05, 1.16]].map(([h, sl, ic, sat], i) => `<filter id="nxBb${i}" color-interpolation-filters="sRGB"><feColorMatrix type="hueRotate" values="${h}"/><feColorMatrix type="saturate" values="${sat}"/><feComponentTransfer>${["R", "G", "B"].map(c => `<feFunc${c} type="linear" slope="${sl}" intercept="${ic}"/>`).join("")}</feComponentTransfer></filter>`).join("");
  const R0 = A.renderSvg, BK = [.98, .92, .86], SIGN = [P(heartD(0, 0, 7), "#ff8fb0", "#b5476a", 1.4), P(starD(0, 0, 7), "#ffe27a", "#b5903c", 1.4), [0, 72, 144, 216, 288].map(t => C(4 * Math.cos(t / 57.3), 4 * Math.sin(t / 57.3), 3, "#b99af2", "", 0)).join("") + C(0, 0, 2.6, "#ffd15c", "", 0)];
  A.renderSvg = (a, cls, opts = {}, ...rest) => { const s = R0(a, cls, opts, ...rest); if (!opts || !opts.isBaby || !a) return s; const i = (opts.babyN || 0) % 3;
    return s.replace('<g class="petart">', `<g class="petart"><g filter="url(#nxBb${i})" transform="translate(100 190) scale(${BK[i]}) translate(-100 -190)">`).replace('</g><g class="gearf">', `</g></g><g class="gearf">`).replace(/<\/svg>$/, `<g transform="translate(36 34)">${SIGN[i]}</g></svg>`); };
})();
