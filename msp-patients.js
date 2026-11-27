"use strict";
// MSP : dessin d'un patient à partir de ses signes cliniques (« attributs »).
// Le patient est vu DE FACE : son côté DROIT est donc à GAUCHE de l'écran (comme en clinique).
// Utilisation : MSPDRAW.svg({ hemi: "D", amimie: true, douleurs: [{ zone: "epauleD", type: "mecanique" }] })
(function () {
  const C = { skin: "#f6d2b8", skinL: "#e9b996", hair: "#7a5233", top: "#8fb7e8", topL: "#5d86c2", pant: "#5b6b8c", pantL: "#3e4b66", line: "#3b2f4a", shoe: "#4a3a5a", hemi: "rgba(155,89,182,.28)" };
  // Types de douleur : un code couleur unique dans toute l'application
  const PAIN = {
    mecanique: { c: "#f39c12", label: "Mécanique (à l'effort, au mouvement, calmée par le repos)" },
    inflammatoire: { c: "#e53935", label: "Inflammatoire (nocturne, raideur matinale > 30 min, chaleur, rougeur)" },
    neuropathique: { c: "#8e44ad", label: "Neuropathique (brûlure, décharge électrique, fourmillements, allodynie)" },
    nociplastique: { c: "#2f80ed", label: "Nociplastique / sensibilisation centrale (diffuse, disproportionnée)" },
    sdrc: { c: "#c2185b", label: "Algodystrophie / SDRC (douleur + troubles vasomoteurs et trophiques)" }
  };
  // Zones du corps : coordonnées (debout, de face). « D » = droite du patient = gauche de l'écran.
  const Z = {
    tete: [100, 36], cou: [100, 66], epauleD: [72, 76], epauleG: [128, 76], coudeD: [62, 114], coudeG: [138, 114], poignetD: [58, 146], poignetG: [142, 146], mainD: [57, 156], mainG: [143, 156],
    thorax: [100, 92], abdomen: [100, 126], lombaire: [100, 140], hancheD: [84, 152], hancheG: [116, 152], cuisseD: [87, 176], cuisseG: [113, 176], genouD: [87, 200], genouG: [113, 200],
    molletD: [87, 222], molletG: [113, 222], chevilleD: [87, 243], chevilleG: [113, 243], piedD: [84, 251], piedG: [116, 251], talonD: [89, 252], talonG: [111, 252], sacrum: [100, 150]
  };
  const ZLABEL = { tete: "tête", cou: "cou", epauleD: "épaule droite", epauleG: "épaule gauche", coudeD: "coude droit", coudeG: "coude gauche", poignetD: "poignet droit", poignetG: "poignet gauche", mainD: "main droite", mainG: "main gauche", thorax: "thorax", abdomen: "abdomen", lombaire: "région lombaire", hancheD: "hanche droite", hancheG: "hanche gauche", cuisseD: "cuisse droite", cuisseG: "cuisse gauche", genouD: "genou droit", genouG: "genou gauche", molletD: "mollet droit", molletG: "mollet gauche", chevilleD: "cheville droite", chevilleG: "cheville gauche", piedD: "pied droit", piedG: "pied gauche", talonD: "talon droit", talonG: "talon gauche", sacrum: "sacrum" };

  // Catalogue des attributs dessinables (pour l'atelier et les légendes)
  const ATTRS = [
    { k: "hemi", t: "choix", g: "Neurologique", label: "Hémiplégie / hémiparésie (schéma de Wernicke-Mann)", opts: { D: "côté droit", G: "côté gauche" }, help: "Membre supérieur en flexion (épaule en adduction et rotation interne, coude, poignet et doigts fléchis), membre inférieur en extension avec pied en varus équin. L'hémicorps atteint est teinté." },
    { k: "flasque", t: "bool", g: "Neurologique", label: "Hémiplégie flasque (phase initiale)", help: "Bras ballant, pas de schéma spastique (à combiner avec « Hémiplégie » pour choisir le côté)." },
    { k: "amimie", t: "bool", g: "Neurologique", label: "Amimie (visage figé)", help: "Visage réduit à deux yeux : pas de sourire, pas d'expression (Parkinson)." },
    { k: "regard", t: "choix", g: "Neurologique", label: "Déviation de la tête et du regard", opts: { D: "vers la droite", G: "vers la gauche" }, help: "Héminégligence gauche : tête et regard déviés vers la droite (côté de la lésion)." },
    { k: "aphasie", t: "bool", g: "Neurologique", label: "Aphasie", help: "Bulle de parole brouillée." },
    { k: "trembRepos", t: "choix", g: "Neurologique", label: "Tremblement de repos", opts: { D: "main droite", G: "main gauche" }, help: "Main posée sur un oreiller qui tremble : disparaît au mouvement (Parkinson)." },
    { k: "trembAction", t: "choix", g: "Neurologique", label: "Tremblement d'action / intentionnel", opts: { D: "bras droit", G: "bras gauche" }, help: "Bras tendu vers une cible qui tremble de plus en plus en approchant (syndrome cérébelleux)." },
    { k: "hlh", t: "choix", g: "Neurologique", label: "Hémianopsie latérale homonyme (HLH)", opts: { D: "champ visuel droit perdu", G: "champ visuel gauche perdu" }, help: "Moitié du champ visuel perdue des deux yeux, du côté opposé à la lésion (demi-cercle noir)." },
    { k: "horner", t: "choix", g: "Neurologique", label: "Claude Bernard-Horner", opts: { D: "œil droit", G: "œil gauche" }, help: "Ptosis (paupière tombante) et myosis (petite pupille) du côté de la lésion (Wallenberg)." },
    { k: "facePeriph", t: "choix", g: "Neurologique", label: "Paralysie faciale périphérique", opts: { D: "côté droit", G: "côté gauche" }, help: "Toute l'hémiface est atteinte (front compris), contrairement à la paralysie faciale centrale de l'AVC hémisphérique." },
    { k: "diplopie", t: "bool", g: "Neurologique", label: "Diplopie (vision double)", help: "Deux petits yeux superposés." },
    { k: "vertige", t: "bool", g: "Neurologique", label: "Vertiges / syndrome vestibulaire", help: "Spirale au-dessus de la tête." },
    { k: "deglut", t: "bool", g: "Neurologique", label: "Troubles de la déglutition", help: "Verre barré : risque de fausse route et de pneumonie d'inhalation." },
    { k: "frontal", t: "bool", g: "Neurologique", label: "Syndrome frontal (apathie, désinhibition)", help: "Point d'interrogation dans une bulle de pensée." },
    { k: "tetra", t: "bool", g: "Neurologique", label: "Tétraplégie (locked-in)", help: "Les deux hémicorps sont atteints ; seuls les yeux bougent (verticalement)." },
    { k: "dysarthrie", t: "bool", g: "Neurologique", label: "Dysarthrie (parole scandée)", help: "Bulle « pa-ro-le » hachée (syndrome cérébelleux, AVC du tronc…)." },
    { k: "nystagmus", t: "bool", g: "Neurologique", label: "Nystagmus", help: "Petites flèches aller-retour près des yeux." },
    { k: "bras", t: "choix", g: "Équilibre et marche", label: "Position des bras", opts: { ecartes: "écartés (rattrapage)" }, help: "Bras écartés pour se rattraper (ataxie cérébelleuse)." },
    { k: "polygone", t: "bool", g: "Équilibre et marche", label: "Élargissement du polygone de sustentation", help: "Jambes écartées (syndrome cérébelleux, ataxie)." },
    { k: "flexion", t: "bool", g: "Équilibre et marche", label: "Attitude en flexion (tronc penché en avant)", help: "Parkinson : cyphose, tête projetée en avant, coudes et genoux fléchis." },
    { k: "freezing", t: "bool", g: "Équilibre et marche", label: "Freezing (enrayement cinétique)", help: "Pieds « collés » au sol au démarrage, au demi-tour ou aux passages étroits." },
    { k: "petitsPas", t: "bool", g: "Équilibre et marche", label: "Marche à petits pas", help: "Pas courts, traînants." },
    { k: "steppage", t: "choix", g: "Équilibre et marche", label: "Steppage (déficit des releveurs)", opts: { D: "pied droit", G: "pied gauche" }, help: "Le pied tombe en flexion plantaire : le patient lève haut le genou." },
    { k: "fauchage", t: "choix", g: "Équilibre et marche", label: "Fauchage", opts: { D: "jambe droite", G: "jambe gauche" }, help: "La jambe décrit un arc de cercle vers l'extérieur pour passer le pas." },
    { k: "chute", t: "bool", g: "Équilibre et marche", label: "Risque de chute / chutes répétées", help: "Pictogramme d'alerte." },
    { k: "aide", t: "choix", g: "Aides et appareillage", label: "Aide technique", opts: { canne: "canne simple", quadri: "canne quadripode", beq: "2 béquilles", deamb: "déambulateur / rollator", fauteuil: "fauteuil roulant" }, help: "" },
    { k: "aideCote", t: "choix", g: "Aides et appareillage", label: "Côté de la canne", opts: { D: "main droite", G: "main gauche" }, help: "La canne se tient du côté SAIN." },
    { k: "afo", t: "choix", g: "Aides et appareillage", label: "Orthèse suro-pédieuse / releveur", opts: { D: "jambe droite", G: "jambe gauche" }, help: "" },
    { k: "echarpe", t: "choix", g: "Aides et appareillage", label: "Écharpe / attelle du membre supérieur", opts: { D: "bras droit", G: "bras gauche" }, help: "" },
    { k: "attelleGenou", t: "choix", g: "Aides et appareillage", label: "Attelle de genou", opts: { D: "genou droit", G: "genou gauche" }, help: "" },
    { k: "minerve", t: "bool", g: "Aides et appareillage", label: "Minerve / collier cervical", help: "" },
    { k: "o2", t: "bool", g: "Respiratoire", label: "Lunettes à oxygène", help: "" },
    { k: "intube", t: "bool", g: "Respiratoire", label: "Intubé / ventilé", help: "Sonde d'intubation reliée au respirateur." },
    { k: "dyspnee", t: "bool", g: "Respiratoire", label: "Dyspnée", help: "Souffle court (lignes de respiration)." },
    { k: "toux", t: "bool", g: "Respiratoire", label: "Toux / encombrement", help: "" },
    { k: "fatigue", t: "bool", g: "Général", label: "Fatigue", help: "Batterie presque vide." },
    { k: "anxiete", t: "bool", g: "Général", label: "Anxiété / peur de tomber", help: "Gouttes de sueur, sourcils inquiets." },
    { k: "oedeme", t: "zones", g: "Peau et trophicité", label: "Œdème", help: "Zone gonflée bleutée." },
    { k: "escarre", t: "zones", g: "Peau et trophicité", label: "Escarre / rougeur d'appui", help: "Talons et sacrum surtout." },
    { k: "cicatrices", t: "cicatrices", g: "Peau et trophicité", label: "Cicatrice(s)", help: "Trait avec points de suture ; recouvert d'un pansement si la cicatrice est récente." },
    { k: "douleurs", t: "douleurs", g: "Douleur", label: "Douleur(s)", help: "Couleur selon le type de douleur." }
  ];

  const side = s => s === "G" ? 1 : -1; // côté gauche du patient = droite de l'écran
  const mir = (s, x) => s === "G" ? 200 - x : x;   // coordonnées données pour le côté DROIT du patient, miroir pour le gauche

  function arm(s, a) { // bras du côté s ; s = "D" (écran gauche) ou "G"
    const hemi = a.hemi === s && !a.flasque, flasque = a.hemi === s && a.flasque, trR = a.trembRepos === s, trA = a.trembAction === s, ech = a.echarpe === s, fl = a.flexion;
    let p; // épaule, coude, main (pour le côté droit du patient)
    if (hemi) p = [[74, 78], [70, 112], [88, 102]];               // coude fléchi, main ramenée sur le thorax
    else if (trA) p = [[74, 78], [52, 92], [26, 96]];              // bras tendu vers une cible
    else if (flasque) p = [[74, 80], [70, 118], [70, 156]];         // bras ballant, épaule « tombante »
    else if (fl) p = [[74, 80], [64, 110], [74, 134]];              // coudes fléchis (Parkinson)
    else if (a.bras === "ecartes") p = [[74, 78], [52, 102], [36, 120]]; // bras écartés (rattrapage)
    else p = [[74, 78], [63, 114], [58, 148]];
    if (a.aide && a.aide !== "fauteuil" && ((a.aideCote || (a.hemi ? (a.hemi === "D" ? "G" : "D") : "D")) === s || a.aide === "beq" || a.aide === "deamb") && !hemi && !trA && !ech) p = [[74, 78], [60, 112], [52, 140]];
    const P = p.map(([x, y]) => [mir(s, x), y]), w = 12;
    let o = `<path d="M${P[0]}L${P[1]}L${P[2]}" fill="none" stroke="${C.topL}" stroke-width="${w + 3}" stroke-linecap="round" stroke-linejoin="round"/><path d="M${P[0]}L${P[1]}L${P[2]}" fill="none" stroke="${C.top}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
    o += `<circle cx="${P[2][0]}" cy="${P[2][1]}" r="6.5" fill="${C.skin}" stroke="${C.skinL}" stroke-width="1.5"/>`;
    if (hemi) o += `<path d="M${P[2][0] - 4 * side(s)} ${P[2][1] + 2}q${3 * side(s)} 5 ${8 * side(s)} 3" fill="none" stroke="${C.skinL}" stroke-width="2"/>`; // doigts fléchis
    if (trA) { const t = [mir(s, 14), 97]; o += `<path d="M${P[2][0] - 5 * side(s) * -1} ${P[2][1]}l${-6 * -side(s)} 0" stroke="${C.skinL}" stroke-width="3" stroke-linecap="round"/>`;
      o += `<circle cx="${t[0]}" cy="${t[1]}" r="7" fill="none" stroke="#e53935" stroke-width="2"/><circle cx="${t[0]}" cy="${t[1]}" r="2" fill="#e53935"/>`;
      o += `<path d="M${mir(s, 40)} 84l3 6l3-6l3 6l3-6l3 6" fill="none" stroke="#e53935" stroke-width="1.8" stroke-linejoin="round" transform="translate(${s === "G" ? -12 : 0} 0)"/>`; }
    if (trR) { const h = P[2]; o = o.replace(/<circle cx="[^"]+" cy="[^"]+" r="6.5"[^>]*\/>$/, "");
      o += `<rect x="${h[0] - 15}" y="${h[1] + 2}" width="30" height="13" rx="6" fill="#fff6d8" stroke="#d1b779" stroke-width="1.5"/><circle cx="${h[0]}" cy="${h[1]}" r="6.5" fill="${C.skin}" stroke="${C.skinL}" stroke-width="1.5"/>`;
      o += `<path d="M${h[0] - 13} ${h[1] - 9}q-3 3 0 6M${h[0] - 17} ${h[1] - 11}q-4 5 0 10M${h[0] + 13} ${h[1] - 9}q3 3 0 6M${h[0] + 17} ${h[1] - 11}q4 5 0 10" fill="none" stroke="#8e44ad" stroke-width="1.6" stroke-linecap="round"/>`; }
    if (ech) o += `<path d="M${mir(s, 96)} 72L${mir(s, 66)} 120L${mir(s, 100)} 122Z" fill="#dfe8f5" stroke="#7d93b8" stroke-width="1.5" opacity=".95"/>`;
    return { svg: o, hand: P[2], P };
  }
  function leg(s, a) {
    const hemi = a.hemi === s && !a.flasque, wide = a.polygone, fau = a.fauchage === s, st = a.steppage === s;
    let p = wide ? [[88, 150], [80, 200], [72, 245]] : a.flexion ? [[89, 150], [84, 198], [88, 245]] : [[89, 150], [88, 200], [88, 245]];
    if (hemi) p = [[89, 150], [86, 200], [84, 243]];
    if (fau) p = [[89, 150], [74, 196], [70, 238]];
    if (st) p = [[89, 150], [90, 190], [86, 228]];
    const P = p.map(([x, y]) => [mir(s, x), y]);
    let o = `<path d="M${P[0]}L${P[1]}L${P[2]}" fill="none" stroke="${C.pantL}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/><path d="M${P[0]}L${P[1]}L${P[2]}" fill="none" stroke="${C.pant}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>`;
    const f = P[2], dir = side(s);
    if (hemi || st) o += `<path d="M${f[0] - 6 * dir} ${f[1] + 2}l${10 * dir} 12" stroke="${C.shoe}" stroke-width="9" stroke-linecap="round"/>`; // pied tombant / varus équin
    else o += `<ellipse cx="${f[0] + 3 * dir}" cy="${f[1] + 7}" rx="11" ry="5.5" fill="${C.shoe}"/>`;
    if (fau) o += `<path d="M${mir(s, 92)} 246q${-26 * -dir} -10 ${-6 * -dir} -40" fill="none" stroke="#2f9a8a" stroke-width="1.8" stroke-dasharray="4 3" marker-end="url(#mspArr)"/>`;
    if (st) o += `<path d="M${mir(s, 98)} 188l0-16" stroke="#2f9a8a" stroke-width="1.8" marker-end="url(#mspArr)"/>`;
    if (a.afo === s) o += `<path d="M${f[0] - 7} ${f[1] - 30}h14v30h-14z" fill="rgba(120,160,210,.55)" stroke="#5d86c2" stroke-width="1.5"/>`;
    if (a.attelleGenou === s) o += `<rect x="${P[1][0] - 11}" y="${P[1][1] - 20}" width="22" height="40" rx="5" fill="rgba(90,90,110,.35)" stroke="#555" stroke-width="1.5"/>`;
    return { svg: o, P };
  }
  function seatedLeg(s, a) { // assis au fauteuil : cuisse vue en raccourci, jambe verticale
    const P = [[88, 190], [86, 204], [86, 244]].map(([x, y]) => [mir(s, x), y]);
    let o = `<path d="M${P[0]}L${P[1]}L${P[2]}" fill="none" stroke="${C.pantL}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/><path d="M${P[0]}L${P[1]}L${P[2]}" fill="none" stroke="${C.pant}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="${P[2][0] + 3 * side(s)}" cy="${P[2][1] + 6}" rx="11" ry="5.5" fill="${C.shoe}"/>`;
    if (a.afo === s) o += `<path d="M${P[2][0] - 7} ${P[2][1] - 30}h14v30h-14z" fill="rgba(120,160,210,.55)" stroke="#5d86c2" stroke-width="1.5"/>`;
    return { svg: o, P };
  }
  function face(a) {
    const look = a.regard === "D" ? -4 : a.regard === "G" ? 4 : 0, cx = 100, cy = a.flexion ? 46 : 38;
    let o = `<circle cx="${cx}" cy="${cy}" r="23" fill="${C.skin}" stroke="${C.skinL}" stroke-width="2"/>`;
    if (a.amimie) return o + `<circle cx="${cx - 8 + look}" cy="${cy - 1}" r="2.6" fill="${C.line}"/><circle cx="${cx + 8 + look}" cy="${cy - 1}" r="2.6" fill="${C.line}"/>`; // amimie : deux points, rien d'autre
    o += `<path d="M${cx - 22} ${cy - 6}q4-22 22-21q20 0 22 21q-8-11-22-11q-14 0-22 11z" fill="${C.hair}"/>`;
    o += `<circle cx="${cx - 8 + look}" cy="${cy}" r="2.6" fill="${C.line}"/><circle cx="${cx + 8 + look}" cy="${cy}" r="2.6" fill="${C.line}"/>`;
    if (a.anxiete) o += `<path d="M${cx - 13} ${cy - 8}l7 2M${cx + 13} ${cy - 8}l-7 2" stroke="${C.line}" stroke-width="1.8" stroke-linecap="round"/><path d="M${cx + 24} ${cy - 10}q3 5 0 7q-3-2 0-7z" fill="#7cc7f5"/>`;
    const hemiF = a.hemi && !a.flasque; // paralysie faciale centrale : commissure tombante du côté atteint
    o += hemiF ? `<path d="M${cx - 8} ${cy + 10}q8 ${a.hemi === "D" ? -2 : 4} 16 ${a.hemi === "D" ? 4 : -2}" fill="none" stroke="${C.line}" stroke-width="2.2" stroke-linecap="round" transform="rotate(${a.hemi === "D" ? 8 : -8} ${cx} ${cy + 10})"/>` : a.dyspnee ? `<ellipse cx="${cx}" cy="${cy + 11}" rx="4" ry="3" fill="${C.line}"/>` : `<path d="M${cx - 7} ${cy + 9}q7 5 14 0" fill="none" stroke="${C.line}" stroke-width="2.2" stroke-linecap="round"/>`;
    if (a.regard) o += `<path d="M${cx + 30 * side(a.regard)} ${cy - 18}l${10 * side(a.regard)} 0" stroke="#2f9a8a" stroke-width="2" marker-end="url(#mspArr)"/>`;
    if (a.horner) { const ex = cx + (a.horner === "G" ? 8 : -8) + look; o += `<path d="M${ex - 5} ${cy - 3}q5 4 10 0" fill="${C.skin}" stroke="${C.line}" stroke-width="1.6"/><circle cx="${ex}" cy="${cy + 1}" r="1.2" fill="${C.line}"/>`; }
    if (a.facePeriph) { const s0 = a.facePeriph === "G" ? 1 : -1; o += `<path d="M${cx + 4 * s0} ${cy - 14}h${12 * s0}" stroke="${C.skinL}" stroke-width="1.5" stroke-dasharray="2 2"/><path d="M${cx + 2 * s0} ${cy + 11}l${8 * s0} 3" stroke="${C.line}" stroke-width="2" stroke-linecap="round"/>`; }
    if (a.diplopie) o += `<g transform="translate(${cx - 46} ${cy - 22})"><ellipse cx="8" cy="6" rx="7" ry="4" fill="#fff" stroke="${C.line}"/><circle cx="8" cy="6" r="2" fill="${C.line}"/><ellipse cx="12" cy="10" rx="7" ry="4" fill="none" stroke="${C.line}" opacity=".5"/></g>`;
    if (a.vertige) o += `<path d="M${cx} ${cy - 34}m-8 0a8 4 0 1 0 16 0a6 3 0 1 0-12 0a4 2 0 1 0 8 0" fill="none" stroke="#2f80ed" stroke-width="1.6"/>`;
    if (a.frontal) o += `<g transform="translate(${cx + 26} ${cy - 40})"><circle cx="12" cy="10" r="10" fill="#fff" stroke="#9b59b6" stroke-width="1.5"/><circle cx="-1" cy="22" r="2.5" fill="#fff" stroke="#9b59b6"/><text x="12" y="15" text-anchor="middle" font-size="13" font-weight="900" fill="#9b59b6">?</text></g>`;
    if (a.tetra) o += `<path d="M${cx - 14} ${cy - 30}l0-8l-3 3M${cx - 14} ${cy - 38}l3 3M${cx + 14} ${cy - 38}l0 8l-3-3M${cx + 14} ${cy - 30}l3-3" stroke="#2f9a8a" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
    if (a.nystagmus) o += `<path d="M${cx - 15} ${cy - 7}h6M${cx - 15} ${cy - 7}l2-2M${cx - 9} ${cy - 7}l-2 2M${cx + 9} ${cy - 7}h6M${cx + 9} ${cy - 7}l2-2M${cx + 15} ${cy - 7}l-2 2" stroke="#2f80ed" stroke-width="1.4" stroke-linecap="round"/>`;
    if (a.intube) o += `<path d="M${cx} ${cy + 10}q14 4 34 0q20-4 34 10" fill="none" stroke="#7fc4e8" stroke-width="4" stroke-linecap="round"/><rect x="${cx + 62}" y="${cy + 6}" width="22" height="16" rx="3" fill="#dfe8f5" stroke="#7d93b8" stroke-width="1.5"/>`;
    if (a.o2) o += `<path d="M${cx - 6} ${cy + 5}q-14 4-22 26M${cx + 6} ${cy + 5}q14 4 22 26" fill="none" stroke="#7fc4e8" stroke-width="2"/><circle cx="${cx - 4}" cy="${cy + 5}" r="1.6" fill="#7fc4e8"/><circle cx="${cx + 4}" cy="${cy + 5}" r="1.6" fill="#7fc4e8"/>`;
    return o;
  }
  function painMark(d, Z) {
    const p = Z[d.zone], k = PAIN[d.type] || PAIN.mecanique; if (!p) return "";
    const [x, y] = p;
    if (d.type === "neuropathique") return `<path d="M${x - 5} ${y - 12}l7 9h-5l6 11l-11-12h5z" fill="${k.c}" stroke="#fff" stroke-width="1"/><circle cx="${x}" cy="${y}" r="11" fill="${k.c}" opacity=".18"/>`;
    if (d.type === "nociplastique") return `<circle cx="${x}" cy="${y}" r="16" fill="${k.c}" opacity=".22"/><circle cx="${x}" cy="${y}" r="9" fill="${k.c}" opacity=".3"/>`;
    if (d.type === "inflammatoire") return `<circle cx="${x}" cy="${y}" r="9" fill="${k.c}" opacity=".85"/><path d="M${x - 7} ${y - 13}q2-3 0-6M${x} ${y - 14}q2-3 0-6M${x + 7} ${y - 13}q2-3 0-6" fill="none" stroke="${k.c}" stroke-width="1.6" stroke-linecap="round"/>`;
    if (d.type === "sdrc") return `<circle cx="${x}" cy="${y}" r="10" fill="${k.c}" opacity=".55"/><circle cx="${x - 3}" cy="${y - 2}" r="2.5" fill="#7b1fa2" opacity=".7"/><circle cx="${x + 4}" cy="${y + 3}" r="2" fill="#7b1fa2" opacity=".7"/>`;
    return `<circle cx="${x}" cy="${y}" r="8" fill="${k.c}" opacity=".9"/><path d="M${x} ${y - 13}v-4M${x + 11} ${y - 6}l3-2M${x - 11} ${y - 6}l-3-2" stroke="${k.c}" stroke-width="2" stroke-linecap="round"/>`;
  }
  function scar(c, Z) {
    const p = Z[c.zone]; if (!p) return ""; const [x, y] = p, L = c.long || 22, v = c.horiz;
    if (c.recent) return `<rect x="${x - (v ? L / 2 + 3 : 6)}" y="${y - (v ? 6 : L / 2 + 3)}" width="${v ? L + 6 : 12}" height="${v ? 12 : L + 6}" rx="3" fill="#fbf3e4" stroke="#c9b48c" stroke-width="1.4"/><path d="M${x - 3} ${y - 3}l6 6M${x + 3} ${y - 3}l-6 6" stroke="#d9c7a3" stroke-width="1.2"/>`;
    const d = v ? `M${x - L / 2} ${y}h${L}` : `M${x} ${y - L / 2}v${L}`; let st = "";
    for (let i = -L / 2 + 4; i < L / 2; i += 5) st += v ? `M${x + i} ${y - 3}v6` : `M${x - 3} ${y + i}h6`;
    return `<path d="${d}" stroke="#b03a2e" stroke-width="2.2" stroke-linecap="round"/><path d="${st}" stroke="#b03a2e" stroke-width="1.1"/>`;
  }
  function wheelchair() {
    return `<g><circle cx="58" cy="210" r="38" fill="none" stroke="#6b6b80" stroke-width="5"/><circle cx="142" cy="210" r="38" fill="none" stroke="#6b6b80" stroke-width="5"/><circle cx="58" cy="210" r="3" fill="#6b6b80"/><circle cx="142" cy="210" r="3" fill="#6b6b80"/><rect x="66" y="138" width="68" height="40" rx="6" fill="#8d8da6"/><rect x="70" y="90" width="60" height="52" rx="6" fill="#a6a6bf"/></g>`;
  }
  function aid(a, handD, handG) {
    if (!a.aide || a.aide === "fauteuil") return "";
    const s = a.aideCote || (a.hemi ? (a.hemi === "D" ? "G" : "D") : "D"), h = s === "G" ? handG : handD;
    if (a.aide === "deamb") return `<path d="M44 140h112M48 140l-6 112M152 140l6 112M46 196h108" fill="none" stroke="#8a8aa0" stroke-width="5" stroke-linecap="round"/><circle cx="42" cy="252" r="5" fill="#555"/><circle cx="158" cy="252" r="5" fill="#555"/>`;
    const cane = x => `<path d="M${x} ${h[1] - 2}V252" stroke="#9c6b3c" stroke-width="5" stroke-linecap="round"/><path d="M${x - 1} ${h[1] - 4}q${8 * (x < 100 ? -1 : 1)} -6 ${12 * (x < 100 ? -1 : 1)} 2" fill="none" stroke="#9c6b3c" stroke-width="5" stroke-linecap="round"/>`;
    if (a.aide === "beq") return cane(handD[0]) + cane(handG[0]);
    if (a.aide === "quadri") return `<path d="M${h[0]} ${h[1] - 2}V244" stroke="#8a8aa0" stroke-width="5" stroke-linecap="round"/><path d="M${h[0] - 12} 252l12-8l12 8M${h[0] - 4} 252l4-8l4 8" fill="none" stroke="#8a8aa0" stroke-width="4" stroke-linecap="round"/>`;
    return cane(h[0]);
  }
  function svg(a = {}, o = {}) {
    a = a || {}; const fau = a.aide === "fauteuil";
    let s = `<svg class="${o.cls || "msp-pat"}" viewBox="${o.vb || "0 0 200 262"}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${o.label || "Patient"}"><defs><marker id="mspArr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#2f9a8a"/></marker></defs>`;
    s += `<ellipse cx="100" cy="256" rx="62" ry="5" fill="rgba(0,0,0,.08)"/>`;
    if (fau) s += wheelchair();
    if (a.tetra) s += `<rect x="20" y="8" width="160" height="250" rx="10" fill="${C.hemi}"/>`;
    else if (a.hemi) s += `<rect x="${a.hemi === "D" ? 20 : 100}" y="8" width="80" height="250" rx="10" fill="${C.hemi}"/>`;
    if (a.hlh) { const hy = fau ? 78 : 38; s += `<path d="M100 ${hy}L${a.hlh === "D" ? 22 : 178} ${hy - 26}A80 80 0 0 ${a.hlh === "D" ? 0 : 1} ${a.hlh === "D" ? 22 : 178} ${hy + 26}z" fill="#2c2c3a" opacity=".45"/><text x="${a.hlh === "D" ? 40 : 160}" y="${hy + 4}" text-anchor="middle" font-size="9" font-weight="800" fill="#fff">HLH</text>`; }
    // jambes (assis au fauteuil : le haut du corps descend de 40)
    const dy = fau ? 40 : 0, LD = fau ? seatedLeg("D", a) : leg("D", a), LG = fau ? seatedLeg("G", a) : leg("G", a);
    s += LD.svg + LG.svg;
    // tronc, bras, tête
    const ty = a.flexion ? 8 : 0;
    let up = `<path d="M76 ${70 + ty}q24-8 48 0l4 80q-28 8-56 0z" fill="${C.top}" stroke="${C.topL}" stroke-width="2.5" stroke-linejoin="round"/>`;
    if (a.flexion) up += `<path d="M138 70q16 20 2 44" fill="none" stroke="#2f9a8a" stroke-width="1.8" stroke-dasharray="4 3" marker-end="url(#mspArr)"/>`;
    const A = arm("D", a), B = arm("G", a);
    up += (fau ? "" : aid(a, A.hand, B.hand)) + A.svg + B.svg;
    if (a.minerve) up += `<rect x="86" y="${58 + ty}" width="28" height="14" rx="5" fill="#f1f1f5" stroke="#9a9ab0" stroke-width="1.5"/>`;
    up += face(a);
    s += dy ? `<g transform="translate(0 ${dy})">${up}</g>` : up;
    // zones réelles : elles suivent la position des membres (bras fléchi, écharpe, fauteuil…)
    const Zd = { ...Z }, sh = ([x, y], k = 0) => [x, y + k];
    for (const z in Zd) if (!/(genou|mollet|cheville|pied|talon|cuisse)/.test(z)) Zd[z] = sh(Zd[z], dy);
    [["D", A.P], ["G", B.P]].forEach(([k, Pa]) => { Zd["epaule" + k] = sh(Pa[0], dy); Zd["coude" + k] = sh(Pa[1], dy); Zd["poignet" + k] = sh([(Pa[1][0] + 2 * Pa[2][0]) / 3, (Pa[1][1] + 2 * Pa[2][1]) / 3], dy); Zd["main" + k] = sh(Pa[2], dy); });
    [["D", LD.P], ["G", LG.P]].forEach(([k, Pl]) => { Zd["genou" + k] = Pl[1]; Zd["cheville" + k] = Pl[2]; Zd["mollet" + k] = [(Pl[1][0] + Pl[2][0]) / 2, (Pl[1][1] + Pl[2][1]) / 2]; Zd["cuisse" + k] = [(Pl[0][0] + Pl[1][0]) / 2, (Pl[0][1] + Pl[1][1]) / 2]; Zd["pied" + k] = [Pl[2][0], Pl[2][1] + 7]; Zd["talon" + k] = [Pl[2][0], Pl[2][1] + 8]; });
    // marqueurs
    for (const c of a.cicatrices || []) s += scar(c, Zd);
    for (const z of a.oedeme || []) if (Zd[z]) s += `<ellipse cx="${Zd[z][0]}" cy="${Zd[z][1]}" rx="12" ry="9" fill="#7fb3ff" opacity=".45" stroke="#4f86d9" stroke-width="1.2"/>`;
    for (const z of a.escarre || []) if (Zd[z]) s += `<circle cx="${Zd[z][0]}" cy="${Zd[z][1]}" r="5" fill="#c0392b" stroke="#fff" stroke-width="1.2"/>`;
    for (const d of a.douleurs || []) s += painMark(d, Zd);
    if (a.aphasie) s += `<path d="M130 6h60a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6h-44l-10 8l2-8h-8a6 6 0 0 1-6-6v-18a6 6 0 0 1 6-6z" fill="#fff" stroke="#8e44ad" stroke-width="1.5"/><text x="160" y="27" text-anchor="middle" font-size="13" font-weight="700" fill="#8e44ad">?!#…</text>`;
    if (a.dysarthrie && !a.aphasie) s += `<path d="M130 6h60a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6h-44l-10 8l2-8h-8a6 6 0 0 1-6-6v-18a6 6 0 0 1 6-6z" fill="#fff" stroke="#2f80ed" stroke-width="1.5"/><text x="160" y="26" text-anchor="middle" font-size="11" font-weight="700" fill="#2f80ed">pa · ro · le</text>`;
    if (a.dyspnee) s += `<path d="M124 46q8-2 12 2M126 52q10-1 16 4M124 58q8 1 12 6" fill="none" stroke="#7fc4e8" stroke-width="2" stroke-linecap="round"/>`;
    if (a.deglut) s += `<g transform="translate(160 92)"><path d="M2 0h18l-3 24h-12z" fill="#dff1ff" stroke="#5d86c2" stroke-width="1.5"/><path d="M-2 26L24 -2" stroke="#e53935" stroke-width="2.5"/></g>`;
    if (a.toux) s += `<text x="126" y="${a.dyspnee ? 76 : 50}" font-size="11" font-weight="800" fill="#7f8c8d">khr !</text>`;
    if (a.fatigue) s += `<g transform="translate(14 10)"><rect width="26" height="13" rx="3" fill="#fff" stroke="#7f8c8d" stroke-width="1.5"/><rect x="26" y="4" width="3" height="5" fill="#7f8c8d"/><rect x="2" y="2" width="6" height="9" rx="1" fill="#e74c3c"/></g>`;
    if (a.freezing) s += `<g transform="translate(70 254)"><rect x="-6" y="-12" width="72" height="16" rx="8" fill="#fff" stroke="#2f80ed" stroke-width="1.4"/><text x="30" y="0" text-anchor="middle" font-size="9.5" font-weight="800" fill="#2f80ed">❄ freezing</text></g>`;
    if (a.petitsPas) s += `<path d="M150 250h6M160 250h6M170 250h6M180 250h6" stroke="#2f9a8a" stroke-width="3" stroke-linecap="round"/>`;
    if (a.chute) s += `<g transform="translate(166 214)"><path d="M14 0l14 25h-28z" fill="#ffd54f" stroke="#e0a800" stroke-width="1.5"/><text x="14" y="21" text-anchor="middle" font-size="14" font-weight="900" fill="#5d4037">!</text></g>`;
    return s + `</svg>`;
  }
  // Légende lisible des attributs d'un patient
  function legend(a = {}) {
    const out = [], lab = k => ATTRS.find(x => x.k === k);
    for (const x of ATTRS) {
      const v = a[x.k]; if (!v || (Array.isArray(v) && !v.length)) continue;
      if (x.t === "bool") out.push(x.label);
      else if (x.t === "choix") out.push(`${x.label} : ${x.opts[v] || v}`);
      else if (x.t === "zones") out.push(`${x.label} : ${v.map(z => ZLABEL[z] || z).join(", ")}`);
      else if (x.t === "cicatrices") v.forEach(c => out.push(`Cicatrice ${c.recent ? "récente (pansement)" : "ancienne"} : ${ZLABEL[c.zone] || c.zone}${c.note ? ` (${c.note})` : ""}`));
      else if (x.t === "douleurs") v.forEach(d => out.push(`<span class="pdot" style="background:${(PAIN[d.type] || PAIN.mecanique).c}"></span>Douleur ${d.type} : ${ZLABEL[d.zone] || d.zone}${d.eva != null ? ` (EVA ${d.eva}/10)` : ""}`));
    }
    return out;
  }
  window.MSPDRAW = { svg, legend, ATTRS, PAIN, Z, ZLABEL };
})();
