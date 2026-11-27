"use strict";
// Contenu du module MSP. Chaque information renvoie à sa source (clé de SRC).
// Priorité en cas de contradiction : comptes rendus MSP 2026-27 > cours des profs > synthèses d'étudiants > références externes.
window.MSPDATA = (function () {
  const LIB = "Bibliothèque MSP › ";
  const SRC = {
    cr1: { t: "CR MSP Neuro – cours 1 (24/09/2026) : anamnèse", k: "CR 2026-27", f: LIB + "02_NEURO › A › 2026-09-24 - Neuro - Cours 1 anamnese.docx" },
    crC: { t: "Cours MSP Neuro (Mme Delobel), notes du groupe C : anamnèse et bilans par pathologie", k: "CR 2026-27", f: LIB + "02_NEURO › A › 2026-09 - Neuro - Cours Delobel groupe C (anamnese + bilans).docx" },
    cr3: { t: "CR MSP Neuro – cours 3 : grille d'évaluation /200", k: "CR 2026-27", f: LIB + "02_NEURO › A › 2026-10 - Neuro - Cours 3 grille + Parkinson.docx" },
    cr4: { t: "CR MSP Neuro – cours 4 : AVC fronto-pariétal droit J+90 + capsulite", k: "CR 2026-27", f: LIB + "02_NEURO › A › 2026-10 - Neuro - Cours 4 AVC fronto-parietal + capsulite.docx" },
    cr1211: { t: "CR MSP Neuro 12/11/2026 : AVC sylvien gauche J+45, objectifs", k: "CR 2026-27", f: LIB + "02_NEURO › A › 2026-11-12 - Neuro - AVC sylvien J+45 objectifs.docx" },
    cr1911: { t: "CR MSP Neuro 19/11/2026 : AVC sylvien J+45, exemples de séances", k: "CR 2026-27", f: LIB + "02_NEURO › A › 2026-11-19 - Neuro - AVC sylvien suite (equilibre, chutes).docx" },
    fiche: { t: "Fiche de cours « Accident vasculaire cérébral » (fondamentaux neuro)", k: "Fiche de cours", f: LIB + "02_NEURO › C › ACCIDENT VASCULAIRE CÉRÉBRAL.docx" },
    geria: { t: "Notions essentielles MSP (gériatrie, 03/04/2025)", k: "CR 2024-25", f: LIB + "06_GERIATRIE › B › Notes de cours MSP 2024-25 › 25.04.03_Groupe D_GERIA_NOTIONS ESSENTIELLES MSP.pdf" },
    perry: { t: "Perry J et al. Classification of walking handicap in the stroke population. Stroke. 1995;26:982-989.", k: "Référence scientifique (hors de tes cours)" },
    berg: { t: "Berg KO et al. Measuring balance in the elderly: validation of an instrument. Can J Public Health. 1992;83 Suppl 2:S7-11.", k: "Référence scientifique (hors de tes cours)" },
    tug: { t: "Shumway-Cook A et al. Predicting the probability for falls in community-dwelling older adults using the Timed Up & Go Test. Phys Ther. 2000;80:896-903.", k: "Référence scientifique (hors de tes cours)" },
    mas: { t: "Bohannon RW, Smith MB. Interrater reliability of a modified Ashworth scale of muscle spasticity. Phys Ther. 1987;67:206-207.", k: "Référence scientifique (hors de tes cours)" },
    ecass: { t: "Hacke W et al. (ECASS III). Thrombolysis with alteplase 3 to 4.5 hours after acute ischemic stroke. N Engl J Med. 2008;359:1317-1329.", k: "Référence scientifique (hors de tes cours)" }
  };

  // ---------------- Tests et échelles (réutilisables par toutes les pathologies) ----------------
  // video : lien de RECHERCHE (pas une vidéo précise) pour ne jamais donner un lien inventé.
  const yt = q => "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);
  const TESTS = {
    mas: { nom: "Échelle d'Ashworth modifiée (MAS)", cat: "Tonus", but: "Coter la spasticité : la résistance à l'étirement passif d'un muscle.",
      deroul: "Patient détendu ; le kiné mobilise passivement le segment dans toute l'amplitude, en environ 1 seconde, dans le sens qui étire le muscle testé, et cote la résistance ressentie.",
      faux: ["Le patient contracte le muscle contre la résistance du kiné, qui cote la force de 0 à 5.", "Le kiné mobilise à trois vitesses différentes et note l'angle d'accrochage.", "On percute le tendon et on cote l'amplitude du réflexe."],
      cot: "0 : pas d'augmentation du tonus · 1 : accrochage ou résistance minime en fin d'amplitude · 1+ : accrochage suivi d'une résistance minime sur moins de la moitié de l'amplitude restante · 2 : résistance plus marquée sur presque toute l'amplitude, mobilisation encore facile · 3 : résistance importante, mobilisation passive difficile · 4 : segment rigide en flexion ou en extension.",
      positif: "Toute cotation ≥ 1 = hypertonie spastique.", diag: "Syndrome pyramidal (spasticité) : AVC, SEP, blessé médullaire, trauma crânien…", incl: "Échelle de mesure (pas un test diagnostique) : ni « inclure » ni « exclure ». Elle ne distingue pas spasticité et rétraction : c'est le rôle de Tardieu.",
      src: ["fiche", "mas", "crC"], video: yt("modified Ashworth scale physiotutors") },
    tardieu: { nom: "Échelle de Tardieu", cat: "Tonus", but: "Distinguer la spasticité (dépendante de la vitesse) des rétractions musculaires.",
      deroul: "Mobilisation passive à 3 vitesses : V1 la plus lente possible, V2 à la vitesse de la chute du segment sous l'effet de la gravité, V3 la plus rapide possible. On note la qualité de la réaction (0 à 4) et l'angle où elle apparaît.",
      faux: ["Une seule mobilisation lente, en cotant de 0 à 4 la résistance en fin d'amplitude.", "Le patient réalise lui-même le mouvement le plus vite possible.", "On mesure le temps de relâchement après une contraction maximale."],
      cot: "0 : pas de résistance · 1 : discrète résistance sans ressaut net · 2 : ressaut franc à un angle précis, suivi d'un relâchement · 3 : clonus épuisable (< 10 s) · 4 : clonus inépuisable (> 10 s).",
      positif: "Une résistance qui apparaît à vitesse rapide (V3) et pas à vitesse lente signe la spasticité ; une limitation présente dès V1 signe une rétraction.", diag: "Spasticité vs rétraction musculaire.", incl: "Échelle de mesure. Utile quand l'Ashworth est à 0 (on mobilise vite et on peut trouver une spasticité).", src: ["fiche", "crC"], video: yt("Tardieu scale physiotutors") },
    moteur: { nom: "Bilan moteur de l'hémiplégique (cotation 0-1-2)", cat: "Moteur", but: "Évaluer la commande motrice sélective, fonction par fonction (il ne s'agit pas d'une perte de force pure).",
      deroul: "On demande des gestes fonctionnels et on cote chacun 0 (impossible), 1 (possible avec difficultés ou incomplet), 2 (acquis). MS : stabilité de l'épaule, du coude, pro-supination, préhension grossière, préhension fine. MI : stabilisation latérale et postérieure de hanche (pont, pont unipodal), verrouillage du genou, flexion de genou, flexion dorsale et éversion de cheville.",
      faux: ["Testing analytique de chaque muscle de 0 à 5 contre résistance.", "Chronométrer le patient pendant qu'il déplace des cubes.", "Mobiliser passivement chaque articulation à vitesse rapide."],
      cot: "0 = incapable · 1 = capable avec difficultés, mouvement incomplet · 2 = mouvement acquis.", positif: "Une cotation de 0 ou 1 oriente le traitement vers la fonction concernée.", diag: "Déficit de commande motrice (syndrome pyramidal).", incl: "Bilan descriptif.", src: ["crC", "fiche"], video: yt("bilan moteur hémiplégique kinésithérapie") },
    tu: { nom: "Testing musculaire (0 à 5)", cat: "Moteur", but: "Quantifier la force d'un muscle ou d'un groupe musculaire.",
      deroul: "0 : aucune contraction · 1 : contraction visible ou palpable sans mouvement · 2 : mouvement complet sans pesanteur · 3 : mouvement complet contre pesanteur · 4 : contre pesanteur et légère résistance · 5 : résistance maximale.",
      faux: ["0 : mouvement contre pesanteur · 5 : aucune contraction.", "On cote la résistance à l'étirement passif.", "On cote la vitesse du mouvement."],
      cot: "Voir le déroulement. En pratique, l'intérêt est souvent de savoir si le muscle est à 2, 3 ou 4 et plus (ex. moyen fessier à 3/5 : ne pas le mettre en unipodal).", positif: "—", diag: "Déficit de force.", incl: "Mesure. Chez l'hémiplégique spastique, on lui préfère le bilan moteur fonctionnel (0-1-2) : le problème est la commande, pas la force pure.", src: ["fiche", "geria"], video: yt("manual muscle testing grades physiotutors") },
    picTouche: { nom: "Pic-touche", cat: "Sensibilité", but: "Évaluer la sensibilité superficielle nociceptive (discrimination pique / touche).",
      deroul: "Yeux fermés, on alterne au hasard la pointe (pique) et le côté mousse (touche) ; pour le « touche », on fait le même geste que pour le pique, sans laisser glisser la pointe sur la peau. Comparaison avec le côté sain.",
      faux: ["Yeux ouverts, on frotte la peau avec un coton.", "On place un diapason sur les reliefs osseux.", "On mobilise passivement l'articulation et le patient dit dans quel sens elle bouge."],
      cot: "Nombre de bonnes réponses ; zones d'hypo- ou d'anesthésie.", positif: "Erreurs répétées du côté atteint = trouble de la sensibilité superficielle.", diag: "Atteinte sensitive (lobe pariétal, voies spinothalamiques).", incl: "Bilan descriptif.", src: ["crC", "fiche"], video: yt("sharp blunt discrimination test sensation") },
    sensPos: { nom: "Sens de position (statesthésie)", cat: "Sensibilité", but: "Évaluer la sensibilité profonde (proprioception).",
      deroul: "Yeux fermés, le kiné mobilise passivement une articulation (ex. hanche en abduction/adduction, genou en flexion/extension) avec des prises latérales qui ne changent pas, puis le patient reproduit la position avec l'autre membre ou dit la position. De proximal à distal.",
      faux: ["Yeux ouverts, le patient imite les mouvements du kiné.", "On teste la force en position statique.", "On pique la peau à plusieurs endroits."],
      cot: "Correct / incorrect, écart d'amplitude.", positif: "Erreurs = trouble de la sensibilité profonde ; à relier à l'équilibre (les troubles sont majorés yeux fermés).", diag: "Atteinte proprioceptive (voie lemniscale, lobe pariétal).", incl: "Bilan descriptif.", src: ["crC", "fiche"], video: yt("joint position sense test physiotutors") },
    extinction: { nom: "Extinction sensitive (stimulation bilatérale simultanée)", cat: "Sensibilité", but: "Mettre en évidence une négligence sensitive.",
      deroul: "On touche d'abord un côté, puis l'autre, puis les deux côtés en même temps.",
      faux: ["On touche un seul côté avec deux pointes et on rapproche les pointes.", "On place un objet dans la main, yeux fermés.", "On demande de barrer des cibles sur une feuille."],
      cot: "Perçu / non perçu de chaque côté lors de la stimulation simultanée.", positif: "Le patient perçoit chaque côté isolément, mais seulement le côté sain quand on stimule les deux à la fois.", diag: "Héminégligence / atteinte pariétale.", incl: "Bilan descriptif.", src: ["cr4", "fiche"], video: yt("sensory extinction double simultaneous stimulation") },
    babinski: { nom: "Signe de Babinski", cat: "Réflexes", but: "Rechercher une atteinte de la voie pyramidale.",
      deroul: "Stimulation appuyée du bord externe de la plante du pied, du talon vers les orteils.",
      faux: ["Percussion du tendon calcanéen.", "Flexion dorsale brusque de la cheville.", "Pichenette sur la dernière phalange du majeur."],
      cot: "Présent / absent.", positif: "Extension lente et majestueuse du gros orteil (au lieu d'une flexion).", diag: "Syndrome pyramidal (présent dès le stade flasque : spécifique de l'atteinte pyramidale).", incl: "Signe clinique d'atteinte pyramidale.", src: ["fiche", "cr1211"], video: yt("Babinski sign test") },
    hoffmann: { nom: "Signe de Hoffmann", cat: "Réflexes", but: "Rechercher une hyperréflexie pyramidale au membre supérieur.",
      deroul: "Pichenette sur l'ongle (phalange distale) du majeur, doigt maintenu.",
      faux: ["Stimulation du bord externe de la plante du pied.", "Percussion du tendon rotulien.", "Étirement rapide du triceps sural."],
      cot: "Présent / absent.", positif: "Flexion réflexe du pouce et de l'index.", diag: "Syndrome pyramidal au membre supérieur.", incl: "Signe clinique.", src: ["cr4"], video: yt("Hoffmann sign test physiotutors") },
    berg: { nom: "Berg Balance Scale", cat: "Équilibre", but: "Évaluer l'équilibre statique et dynamique et le risque de chute.",
      deroul: "14 items fonctionnels (assis-debout, debout sans appui, transferts, yeux fermés, pieds joints, se pencher en avant, ramasser un objet, se retourner, tour sur soi-même, pied sur un marchepied, tandem, unipodal…), chacun coté de 0 à 4.",
      faux: ["Se lever, marcher 3 m, faire demi-tour et se rasseoir, chronométré.", "Marcher 6 minutes le plus loin possible.", "Tenir 30 secondes yeux fermés pieds joints."],
      cot: "Score sur 56.", positif: "Seuil le plus cité : < 45/56 = risque de chute augmenté (les seuils varient selon les études et les populations).", diag: "Trouble de l'équilibre / risque de chute.", incl: "Échelle d'évaluation (mesure le risque, ne pose pas de diagnostic).", src: ["berg", "cr1211", "cr4"], video: yt("Berg Balance Scale physiotutors") },
    tug: { nom: "Timed Up and Go (TUG)", cat: "Fonctionnel", but: "Évaluer la mobilité fonctionnelle et le risque de chute.",
      deroul: "Assis sur une chaise avec accoudoirs : se lever, marcher 3 mètres, faire demi-tour, revenir et se rasseoir, à vitesse habituelle, avec l'aide technique habituelle. Consignes claires, chronométré.",
      faux: ["Marcher 10 mètres le plus vite possible, sans demi-tour.", "Se lever 5 fois d'une chaise le plus vite possible.", "Rester debout pieds joints 30 secondes."],
      cot: "Temps en secondes.", positif: "Repère souvent cité : > 13,5 s = risque de chute augmenté chez la personne âgée vivant à domicile (seuil à adapter à la population).", diag: "Risque de chute, mobilité.", incl: "Test de dépistage du risque de chute.", src: ["tug", "geria"], video: yt("Timed Up and Go test physiotutors") },
    tmw10: { nom: "Test de marche de 10 mètres (vitesse de marche)", cat: "Marche", but: "Mesurer la vitesse de marche, très liée au pronostic fonctionnel et à l'indépendance de marche.",
      deroul: "Le patient marche à vitesse confortable sur un parcours plus long que 10 m ; on chronomètre les 10 m centraux (pour exclure l'accélération et la décélération). Vitesse = 10 / temps.",
      faux: ["On compte le nombre de pas en 10 secondes.", "On mesure la distance parcourue en 2 minutes.", "On chronomètre 10 levers de chaise."],
      cot: "Vitesse en m/s.", positif: "Après AVC (Perry) : < 0,4 m/s = marche limitée au domicile · 0,4 à 0,8 m/s = marche extérieure limitée · > 0,8 m/s = marche extérieure (communautaire).", diag: "Niveau de marche fonctionnelle.", incl: "Mesure.", src: ["perry", "cr1211"], video: yt("10 meter walk test physiotutors") },
    bbt: { nom: "Box and Block Test", cat: "Préhension", but: "Mesurer la dextérité manuelle globale (grossière), un membre supérieur à la fois.",
      deroul: "Déplacer un par un le plus de cubes possible d'un compartiment à l'autre, par-dessus la cloison, en 1 minute.",
      faux: ["Placer 9 tiges dans des trous le plus vite possible.", "Serrer un dynamomètre 3 fois.", "Toucher alternativement son nez et le doigt du kiné."],
      cot: "Nombre de cubes par minute, comparé au côté sain et aux normes (les performances diminuent avec l'âge).", positif: "Score nettement inférieur au côté sain = déficit de dextérité globale.", diag: "Dextérité manuelle grossière.", incl: "Mesure.", src: ["fiche", "cr4"], video: yt("Box and Block Test physiotutors") },
    nhpt: { nom: "Nine Hole Peg Test", cat: "Préhension", but: "Mesurer la dextérité fine (préhension fine).",
      deroul: "Placer 9 tiges dans 9 trous puis les retirer, le plus vite possible ; chronométré.",
      faux: ["Déplacer des cubes par-dessus une cloison en 1 minute.", "Écrire une phrase le plus vite possible.", "Ouvrir et fermer la main 10 fois."],
      cot: "Temps (ou nombre de tiges en 50 s).", positif: "Temps allongé par rapport aux normes.", diag: "Dextérité fine. Réservé aux patients qui ont une motricité distale (au moins une cotation 1 en préhension fine).", incl: "Mesure.", src: ["fiche"], video: yt("Nine Hole Peg Test physiotutors") },
    mmse: { nom: "MMSE (Mini Mental State Examination)", cat: "Psycho-cognitif", but: "Dépister des troubles cognitifs.",
      deroul: "Questionnaire de 30 points : orientation dans le temps et l'espace, apprentissage, attention et calcul, rappel, langage, praxies constructives.",
      faux: ["Questionnaire sur l'humeur et la tristesse.", "Échelle d'anxiété en 3 items.", "Test chronométré de marche."],
      cot: "Score sur 30.", positif: "Repères de ta fiche : > 27 = normal ; entre 24 et 27 = faire un test plus sensible ; < 24 = atteinte cognitive probable (à interpréter selon le niveau d'études). ⚠ Peu utilisable chez un patient aphasique.", diag: "Troubles cognitifs (dépistage, pas diagnostic).", incl: "Test de dépistage.", src: ["fiche", "geria"], video: yt("MMSE mini mental state examination") },
    hamilton: { nom: "Échelle de Hamilton (dépression)", cat: "Psycho-cognitif", but: "Évaluer l'intensité d'un état dépressif.",
      deroul: "Entretien structuré, items cotés par l'examinateur (humeur, culpabilité, sommeil, ralentissement, anxiété…).",
      faux: ["30 questions d'orientation et de mémoire.", "Le patient cote sa douleur de 0 à 10.", "Questionnaire de qualité de vie respiratoire."],
      cot: "Score total : plus il est élevé, plus la dépression est intense.", positif: "—", diag: "Dépression (fréquente après AVC).", incl: "Échelle d'évaluation.", src: ["fiche", "crC"], video: yt("Hamilton depression rating scale") },
    postural: { nom: "Cotation de la station assise (0-3) et debout (0-4)", cat: "Équilibre", but: "Évaluer le contrôle postural de l'hémiplégique.",
      deroul: "Assis : 0 ne tient pas · 1 tient avec aide · 2 tient seul mais instable · 3 tient seul et résiste aux poussées vers le côté plégique. Debout : 0 ne tient pas · 1 tient avec aide · 2 tient seul mais penche du côté plégique · 3 tient seul en appui sur les 2 jambes · 4 résiste aux poussées.",
      faux: ["14 items cotés de 0 à 4.", "On chronomètre le patient debout pieds joints.", "On compte les chutes du dernier mois."],
      cot: "Voir le déroulement.", positif: "Une cotation basse oriente le travail postural.", diag: "Contrôle postural.", incl: "Bilan descriptif.", src: ["fiche"], video: yt("trunk control stroke assessment") }
  };

  // ---------------- AVC sylvien ----------------
  const avc = {
    id: "avc-sylvien", cell: "neuro", titre: "AVC sylvien (hémiplégie / hémiparésie)", court: "AVC sylvien",
    statut: "Pathologie pilote : relis et signale-moi tout ce qui te semble faux.",
    resume: [
      "<b>Définition</b> : développement rapide de signes cliniques de dysfonction cérébrale, sans autre cause apparente qu'une origine vasculaire. AVC ischémique (80 à 85 %) ou hémorragique (15 à 20 %).",
      "<b>Territoire</b> : artère cérébrale moyenne (sylvienne). Sylvien superficiel : hémiparésie sensitivo-motrice à prédominance brachio-faciale, HLH ; sylvien profond : hémiplégie massive et proportionnelle.",
      "<b>Selon l'hémisphère</b> : gauche → aphasie, apraxie (hémicorps droit atteint) ; droit → héminégligence, anosognosie (hémicorps gauche atteint).",
      "<b>Évolution du tonus</b> : stade flasque (hypotonie + Babinski), puis stade spastique (hyperréflexie, clonus, spasticité) en quelques semaines.",
      "<b>Schéma spastique (Wernicke-Mann)</b> : MS en flexion (épaule en adduction et rotation interne, coude, poignet et doigts fléchis) ; MI en extension avec pied en varus équin.",
      "<b>Complications à prévenir</b> : épaule douloureuse (pas de traction sur le bras), algodystrophie, positions vicieuses (équin), chutes, escarres, TVP, pneumonie d'inhalation, dépression.",
      "<b>Bilans clés</b> : constat d'attitude, psycho-cognitif, douleur, cutané-trophique, articulaire, tonus (Ashworth, Tardieu), moteur (0-1-2), sensibilité (pic-touche, sens de position, extinction), postural, transferts, équilibre (Berg), marche (10 m, analyse qualitative).",
      "<b>Objectifs</b> : chacun doit avoir une implication clinique. Le sevrage des aides techniques n'est pas un objectif thérapeutique. On vise l'<i>indépendance</i> (capacité physique), à distinguer de l'<i>autonomie</i> (capacité de décider pour soi).",
      "<b>Traitement</b> : travailler en situation fonctionnelle, solliciter le côté parétique (stimuler le côté sain inhibe le côté atteint), postures d'inhibition (plus efficaces en chaîne fermée), proprioception et sensibilité, transfert d'appui, passage du pas, prévention des chutes."
    ],
    pro: [
      { id: "def", titre: "Définition, types, territoires", src: ["fiche", "ecass"], html: `
<p><b>AVC</b> = développement rapide de signes cliniques localisés ou globaux de dysfonction cérébrale, sans autre cause apparente qu'une origine vasculaire.</p>
<table class="mt"><tr><th></th><th>Ischémique (80-85 %)</th><th>Hémorragique (15-20 %)</th></tr>
<tr><td>Mécanisme</td><td>Occlusion de l'artère qui irrigue le territoire. <b>AIT</b> = déficit régressif en moins de 24 h (facteur de risque d'AVC).</td><td>Saignement dans le parenchyme (± espace sous-arachnoïdien ou ventricules), rupture d'une artère de petit calibre.</td></tr>
<tr><td>Causes</td><td>Athérosclérose, embolie d'origine cardiaque, artérites, affections hématologiques…</td><td>HTA, malformations vasculaires, troubles de la coagulation, angiopathie amyloïde.</td></tr>
<tr><td>Clinique</td><td>Déficit focal qui s'aggrave ± céphalées, vomissements.</td><td>Installation rapide des symptômes moteurs, céphalées, vomissements, troubles de la conscience, crises d'épilepsie.</td></tr>
<tr><td>Imagerie</td><td>Scanner : souvent <b>normal</b> les premières heures, puis zone <b>hypodense</b> ; l'IRM est plus sensible.</td><td>Scanner : zone <b>hyperdense</b> (le sang).</td></tr></table>
<p class="warn">⚠ Ta fiche de cours indique « scanner : zone hyperdense » aussi pour l'AVC ischémique : c'est une erreur. L'ischémie est hypodense ; c'est l'hémorragie qui est hyperdense.</p>
<p><b>Physiopathologie de l'ischémie</b> : au centre, le seuil de nécrose est dépassé (lésions irréversibles, œdème cytotoxique qui aggrave pendant environ une semaine, cavité kystique ensuite). Autour, la <b>zone de pénombre</b> : cellules encore intactes mais sans activité électrique, récupérables si on reperfuse vite.</p>
<p><b>Thrombolyse</b> : seul traitement curatif (lyse du thrombus), avec un risque hémorragique. Contre-indiquée en cas d'hémorragie, d'anticoagulants, de traumatisme récent… Ta fiche donne un délai de « 3-4 h » ; la fenêtre reconnue aujourd'hui va jusqu'à <b>4 h 30</b> après le début des symptômes (essai ECASS III). La thrombectomie mécanique complète ce traitement pour les grosses artères. À demander en anamnèse : elle influence le pronostic.</p>
<p><b>Territoires</b> :</p><ul>
<li><b>Sylvien superficiel</b> : hémiparésie sensitivo-motrice à prédominance <b>brachio-faciale</b>, HLH (hémianopsie latérale homonyme), troubles cognitifs selon l'hémisphère.</li>
<li><b>Sylvien profond</b> : hémiplégie <b>massive, proportionnelle</b>, controlatérale (troubles moteurs et sensitifs ++).</li>
<li>Cérébral antérieur : hémiparésie à prédominance <b>crurale</b> (MI) + syndrome frontal.</li>
<li>Cérébral postérieur : HLH (superficiel) ; syndrome thalamique (profond) avec hémi-hypoesthésie et douleur thalamique.</li>
<li>Tronc cérébral : syndrome alterne (nerfs crâniens du côté de la lésion, hémiplégie de l'autre côté) ; Wallenberg (bulbaire latéral) ; cérébelleux : hémisyndrome cérébelleux du côté de la lésion.</li></ul>
<p><b>Hémisphère gauche</b> (hémicorps droit) : aphasie, apraxie. <b>Hémisphère droit</b> (hémicorps gauche) : héminégligence, anosognosie.</p>
<p><b>Facteurs de risque</b> : âge, HTA, hyperlipidémie, diabète, tabac, alcool, obésité, contraceptifs oraux, hyperagrégabilité plaquettaire.</p>` },
      { id: "clin", titre: "Tableau clinique", src: ["fiche", "cr1211", "cr4"], html: `
<p><b>Syndrome pyramidal</b> : trouble de la commande motrice volontaire et automatique. Ce n'est pas une simple perte de force, mais un trouble de la commande avec altération de la qualité du mouvement. Il épargne souvent le tronc et le cou ; il touche les membres, le bas du visage et les fléchisseurs du MI. Il varie selon la position, la fatigue et le type de mouvement (le volontaire est le plus touché). Les réactions automatiques et posturales sont diminuées.</p>
<p><b>Syncinésies</b> : <i>globale</i> (exagération de l'attitude hémiplégique lors d'un effort ou d'un éternuement), <i>de coordination</i> (contraction parasite d'autres groupes musculaires), <i>d'imitation</i> (le membre opposé reproduit le mouvement).</p>
<p><b>Tonus</b> : stade <b>flasque</b> (hypotonie + signe de Babinski, spécifique de l'atteinte pyramidale), puis stade <b>spastique</b> en quelques semaines (environ 4 selon ta fiche) : hyperréflexie, clonus achilléen et rotulien, hypertonie élastique avec <b>signe du canif</b> (résistance qui cède brusquement à un certain angle). La spasticité prédomine sur les fléchisseurs du MS et les extenseurs (« allongeurs ») du MI ; elle augmente avec la fatigue, l'effort et toute épine irritative (douleur, escarre, constipation…). On parle aujourd'hui de « syndrome spastique ».</p>
<p><b>Schéma de spasticité le plus fréquent</b> (Wernicke-Mann) : MS : épaule en adduction et rotation interne, coude fléchi, avant-bras en pronation, poignet et doigts fléchis. MI : hanche en extension, adduction et rotation interne ; genou en extension ; pied en <b>varus équin</b>. D'autres schémas existent (ta fiche donne MS en flexion ≈ 80 %, MI en triple extension ≈ 80 %).</p>
<p class="warn">⚠ Ta fiche écrit « épaule : add + RI + antépulsion » pour le schéma principal. L'adduction et la rotation interne sont classiques ; sur la position antérieure ou postérieure du bras, vérifie la version de ton prof.</p>
<p><b>Réflexes</b> : vifs du côté atteint, Babinski, Hoffmann (MS) : voir les cas du 12/11 et du cours 4.</p>
<p><b>Syndrome sensitif</b> (atteinte pariétale, trouble de l'interprétation et non de la conduction) : <i>superficiel</i> (an-, hypo- ou hyperesthésie ; douleurs spontanées ou provoquées : hyperalgie, allodynie ; paresthésies, dysesthésies ; troubles discriminatifs) ; <i>profond</i> (pallesthésie, astéréognosie, ataxie sensitive aggravée yeux fermés : Romberg positif, dysmétrie yeux fermés).</p>
<p><b>Troubles cognitifs et autres</b> : aphasie (Broca = expression, non fluente ; Wernicke = compréhension), apraxie, agnosie et anosognosie, <b>héminégligence</b> (souvent gauche), troubles de la mémoire, syndrome frontal, fatigue, <b>dépression</b>, troubles de la déglutition (risque de pneumonie d'inhalation), troubles vésico-sphinctériens.</p>` },
      { id: "compl", titre: "Douleurs et complications", src: ["fiche", "cr4", "cr1211"], html: `
<ul>
<li><b>Douleur centrale (neurogène)</b> : si la lésion est latéro-bulbaire, thalamique ou pariétale. Douleurs thalamiques : fortes, diffuses, en picotements ou coups de poignard, elles limitent toutes les amplitudes.</li>
<li><b>Épaule douloureuse de l'hémiplégique</b> : déséquilibre musculaire, pesanteur (subluxation), manipulations traumatisantes. → <b>Jamais de traction sur le bras</b>, bien le positionner (accoudoir, écharpe). Pas de longues séries en flexion à 180° (risque de conflit) ni en rotation externe (risque de tendinopathie du long biceps).</li>
<li><b>Algodystrophie (SDRC)</b> : 1<sup>re</sup> cause traumatique, 2<sup>e</sup> cause neurologique. Syndrome classique épaule-main (parfois cheville-pied). Phase chaude (œdème, rougeur, impotence : mobilisation sous le seuil douloureux, drainage), puis phase froide (pâleur, cyanose, enraidissement : mobiliser ++).</li>
<li><b>Capsulite rétractile</b> sur épaule hémiplégique (cas du cours 4) : limitation capsulaire en actif ET en passif.</li>
<li><b>POAN</b> (para-ostéo-arthropathies neurogènes), douleur liée à la spasticité, positions vicieuses (risque d'<b>équin</b>), escarres, TVP, œdème, chutes, constipation, infections urinaires.</li></ul>` },
      { id: "anam", titre: "Anamnèse", src: ["cr1", "crC", "fiche", "geria"], html: `
<p><b>Questions génériques</b> (cours 1) : âge, sexe, poids, taille, BMI et variation de poids ; <b>latéralité</b> (spécifique ++ dans l'AVC, mais peut s'obtenir par l'observation chez l'aphasique) ; histoire de la maladie ; antécédents familiaux, médicaux, chirurgicaux (datés, séquelles) ; médication (pourquoi, depuis quand, heure de prise, effets secondaires, impact sur la rééducation) ; examens complémentaires ; prise en charge pluridisciplinaire.</p>
<p><b>Spécifique à l'AVC sylvien</b> (cours Delobel) :</p><ul>
<li>Date exacte et heure de début ; contexte (repos, effort, réveil) ; témoin, appel des secours, délai de prise en charge.</li>
<li>Services traversés et durée (soins intensifs ?) ; <b>thrombolyse / thrombectomie</b> ?</li>
<li>Sévérité initiale (score NIHSS) et complications aiguës (transformation hémorragique, œdème, craniectomie).</li>
<li>Nature et côté du déficit initial (force, sensibilité, langage, champ visuel) ; évolution (récupération motrice, aphasie, négligence, déglutition).</li>
<li>Chute lors de l'AVC : temps au sol, comment il s'est relevé, séquelles.</li></ul>
<p><b>Puis</b> : état antérieur (il conditionne les objectifs), aides techniques (avant / maintenant, depuis quand, sait-il les utiliser), chutes (fréquence, contexte, appréhension), lieu de vie (étages, escaliers, salle de bain), entourage et aidant (âge, état, disponibilité), animaux (motivation mais risque de chute), hygiène de vie (déglutition, alcool, tabac → risque de récidive, sommeil), kiné antérieure, profession, loisirs, AVJ, conduite, <b>objectifs du patient</b>.</p>
<p class="tip">💡 Le moral relève du bilan psycho-cognitif, pas de l'anamnèse (sauf traitement antidépresseur). Pose les questions à l'imparfait pour l'état antérieur, et structure-les par priorités.</p>` },
      { id: "bilans", titre: "Bilans (ordre et contenu)", src: ["crC", "fiche", "cr1211"], html: `
<p><b>Ordre proposé en cours (AVC sylvien)</b> : constat d'attitude → psycho-cognitif → douleur → fatigue → cutané-trophique → motricité spontanée → articulaire → tonus → moteur → sensitif → transferts → postural → marche.</p>
<ul>
<li><b>Constat d'attitude</b> : comment le patient arrive (fauteuil, marche, aide technique), schéma spastique, prédominance MS/MI, attitude posturale, déviation tête/regard (héminégligence), pusher syndrome, bras ballant (flasque : s'il ne le « trouve » pas = négligence ; s'il le trouve = trouble sensitif), positions vicieuses, orthèses, sondes, bas de contention.</li>
<li><b>Psycho-cognitif</b> : orientation, compréhension des consignes (aphasie), MMSE, dépression (Hamilton, mini-GDS), anxiété (COVI).</li>
<li><b>Douleur</b> : localisation, type, EVA, moment, facteurs aggravants et soulageants, médication. Penser neuropathique, épaule, SDRC, spasticité.</li>
<li><b>Fatigue</b> : qualité, quantité, siestes, ENA, évolution dans la journée.</li>
<li><b>Cutané-trophique</b> : escarres (rougeur = début), hématomes (chocs dus à la négligence, chutes), SDRC, œdème (main ++), amyotrophie (quadriceps, interosseux, crête tibiale, deltoïde, temporaux).</li>
<li><b>Motricité spontanée</b> : ce qu'il sait faire seul. Inutile s'il arrive en marchant.</li>
<li><b>Articulaire</b> : en passif, de proximal à distal, après inhibition de la spasticité si nécessaire. RE d'épaule coude au corps. Attention aux positions à risque de subluxation de hanche (flexion-abduction ; extension-rotation externe).</li>
<li><b>Tonus</b> : Ashworth modifiée, Tardieu ; réflexes ostéotendineux, clonus, Babinski, Hoffmann.</li>
<li><b>Moteur</b> : cotation 0-1-2 par fonction, syncinésies, Box and Block, Nine Hole Peg (si motricité distale).</li>
<li><b>Sensitif</b> : superficiel (pic-touche, discriminatif, thermique avec un linge froid), profond (sens de position, kinesthésie), extinction sensitive, stéréognosie.</li>
<li><b>Transferts</b> : sécuritaires ? avec aide ?</li>
<li><b>Postural</b> : station assise (0-3), debout (0-4), transferts d'appui, réactions posturales.</li>
<li><b>Équilibre et fonctionnel</b> : Berg, TUG, Tinetti.</li>
<li><b>Marche</b> : 10 m (vitesse), 2MWT, 14 m ; analyse : fauchage (ischio-jambiers, psoas), steppage (releveurs), contrôle du genou, longueur du pas, croisement de la ligne médiane, éversion, dissociation des ceintures ; escaliers.</li></ul>` },
      { id: "obj", titre: "Objectifs", src: ["cr1211", "cr3"], html: `
<p class="tip">« Quand on cite un objectif, on doit avoir une implication clinique. » Ils comptent pour /30 dans la grille neuro 2026-27 (sur 200).</p>
<p>Exemple du cas AVC sylvien gauche J+45 (CR du 12/11) :</p><ul>
<li>Sensibiliser au risque de chute (animaux, tapis, luminosité, sécurité des transferts).</li>
<li>Surveiller la spasticité, prévenir les attitudes vicieuses (risque d'<b>équin</b>).</li>
<li>Améliorer le passage du pas (déficit des fléchisseurs de hanche et des ischio-jambiers).</li>
<li>Améliorer l'appui, la qualité de mise en charge et le transfert du poids du corps.</li>
<li>Améliorer la sensibilité et la proprioception pour la prise d'appui.</li>
<li>Améliorer la commande motrice.</li>
<li>Maintenir les amplitudes articulaires (<b>extension de hanche</b> +++).</li>
<li>Améliorer le périmètre de marche, l'équilibre et la capacité fonctionnelle pour diminuer le risque de chute.</li>
<li>Stimuler les fonctions cognitives.</li></ul>
<p class="warn">⚠ <b>Le sevrage des aides techniques n'est pas un objectif thérapeutique.</b> On parle d'améliorer l'<b>indépendance</b> à la marche (capacité physique de faire quelque chose), pas l'<b>autonomie</b> (capacité cognitive de décider pour soi).</p>
<p>Les objectifs se répartissent en court, moyen et long terme, et se classent par priorité.</p>` },
      { id: "ttt", titre: "Traitement et exercices", src: ["cr1911", "cr4", "fiche"], html: `
<p class="tip">Grand principe : utiliser la motricité saine pour proposer des gestes qui fonctionnent, au service d'une motricité automatique. Solliciter le côté parétique : stimuler le côté sain inhibe le côté atteint. On peut travailler le membre sain seul si le membre parétique bloque la progression vers l'objectif principal.</p>
<p><b>Équilibre et prévention des chutes</b> : assis sur ballon de Bobath (transferts d'appui droite/gauche ; au début, ballon calé contre un mur et sur les côtés, puis on retire les calages en gardant celui du côté pathologique) ; avant/arrière en prise bimanuelle ; aller chercher un plot ; assis-debout depuis une table haute puis de plus en plus basse ; debout entre les barres (base spontanée puis réduite, tourner la tête, fermer les yeux, lâcher une main puis l'autre) ; appui à côté d'une table et aller chercher des cônes pour charger l'hémicorps atteint ; quatre pattes sur table de Bobath ; transferts de cônes en prise bimanuelle avec les appuis décalés ; relevé du sol par étapes intermédiaires.</p>
<p><b>Spasticité et amplitudes</b> : installation en position d'inhibition. L'inhibition ne dure pas : faire <b>inhibition + travail du MS, puis inhibition + travail du MI</b> (et non tout inhiber puis tout travailler). Les postures d'inhibition sont plus efficaces <b>en chaîne fermée</b> (point fixe distal, mobilisation du proximal) : on les intègre dans les exercices dès que possible. Exemples : bras tendu avec soutien du coude et stimulation du triceps ; ouvrir la main poignet fléchi puis en position neutre ; debout, MS en appui sur la table en inhibition (avec une balance pour le feedback) ; assis bâton tenu bras tendus vers le plafond, puis rotations ; bâton sous la main parétique, bloqué entre les pieds (mobilisation activo-passive, contre-appuis sur l'omoplate ou le coude) ; extension de hanche dans les barres, serviette sous le pied.</p>
<p><b>Proprioception et sensibilité</b> : reproduire yeux fermés avec le bras sain la position du bras atteint, puis corriger yeux ouverts ; placer le pied devant le plot 1, 2 ou 3 (yeux ouverts à chaque répétition pour corriger ; sans chaussette, sur ballon : on ajoute la sensibilité) ; discriminer deux densités ou textures de balles, yeux fermés ; objets sous le pied, debout dans les barres (on demande le plus doux ; si on demande l'épaisseur, on travaille plutôt la proprioception).</p>
<p><b>Stabilité de hanche, transfert d'appui, passage du pas</b> : pont (puis glisser ou lever le pied sain) ; genou parétique sur la table et pied sain qui glisse sur un gant ; petites poussées vers l'arrière pour activer les releveurs ; planche de Freeman sous le pied atteint ; espalier avec un élastique derrière la cuisse pour aider à lever le MI ; toucher des languettes avec le talon (sans orthèse) ; marche dans les barres en levant les genoux, marche arrière (extension de hanche) ; assis-debout pied sain en avant ou sur une Freeman (pour charger le côté atteint).</p>
<p><b>Si l'épaule est touchée</b> (capsulite, cas du cours 4) : éducation (durée de la capsulite), gestion de la douleur, gain d'amplitude (grosse balle contre un mur), proprioception et sensibilité de la main et du coude (réglette entre les doigts : bien savoir si l'on vise la motricité ou la sensibilité), excentrique du quadriceps pour la descente des escaliers.</p>
<p><b>Mobilisations passives</b> (fiche) : prévenir les limitations, les troubles circulatoires, les escarres ; améliorer le schéma corporel. MS : pas de traction, insister sur la main, pas d'étirement sauf des fléchisseurs des doigts. MI : insister sur la cheville (œdème) et sur la rotation interne (position vicieuse en rotation externe).</p>` },
      { id: "pieges", titre: "Pièges et erreurs repérées", src: ["cr1211", "cr1911", "fiche", "geria"], html: `
<ul>
<li>Citer « sevrer les aides techniques » comme objectif : <b>non</b>.</li>
<li>Confondre indépendance (physique) et autonomie (décisionnelle).</li>
<li>Renforcer surtout le côté sain : déconseillé (il inhibe le côté atteint), sauf si cela débloque l'objectif principal.</li>
<li>Inhiber MS et MI d'un coup puis enchaîner les exercices : l'inhibition ne tient pas dans le temps.</li>
<li>Ajouter un facilitateur du triceps sural chez une patiente déjà spastique : inutile.</li>
<li>Exercice trop difficile pour le patient (ex. longer un bâtonnet avec le doigt : trop de motricité fine) : adapter.</li>
<li>Faire un MMSE classique chez un aphasique sans adaptation.</li>
<li><b>Erreurs dans les supports</b> : la fiche de cours dit « scanner hyperdense » pour l'AVC ischémique (faux : hypodense) et « thrombolyse dans les 3-4 h » (aujourd'hui jusqu'à 4 h 30).</li></ul>` }
    ],
    // ---- QCM (a = bonne(s) réponse(s) ; si plusieurs : choix multiple) ----
    qcm: [
      { id: "def1", part: "def", q: "Quelle proportion des AVC est ischémique ?", a: ["80 à 85 %"], d: ["15 à 20 %", "50 %", "95 %"], src: "fiche" },
      { id: "def2", part: "def", q: "Un AIT (accident ischémique transitoire) est un déficit qui régresse en moins de :", a: ["24 heures"], d: ["1 heure", "7 jours", "4 h 30"], src: "fiche" },
      { id: "def3", part: "def", q: "Au scanner précoce, un AVC ischémique apparaît le plus souvent :", a: ["Normal, puis hypodense"], d: ["Hyperdense", "Hyperdense puis normal", "Toujours visible dès la 1re heure"], expl: "C'est l'hémorragie qui est hyperdense. Ta fiche contient une erreur sur ce point.", src: "fiche" },
      { id: "def4", part: "def", q: "La zone de pénombre correspond à :", a: ["Des cellules intactes mais sans activité électrique, récupérables si la reperfusion est rapide"], d: ["La zone de nécrose irréversible", "La cavité kystique qui se forme après 4 semaines", "L'œdème autour d'un hématome"], src: "fiche" },
      { id: "def5", part: "def", q: "Un AVC sylvien SUPERFICIEL donne typiquement :", a: ["Une hémiparésie sensitivo-motrice à prédominance brachio-faciale", "Une HLH (hémianopsie latérale homonyme)"], d: ["Une hémiplégie massive et proportionnelle", "Une hémiparésie à prédominance crurale avec syndrome frontal", "Un hémisyndrome cérébelleux homolatéral"], src: "fiche" },
      { id: "def6", part: "def", q: "Une lésion de l'hémisphère DROIT donne plutôt :", a: ["Une héminégligence", "Une anosognosie"], d: ["Une aphasie", "Une hémiplégie droite"], src: "fiche" },
      { id: "def7", part: "def", q: "Un AVC sylvien GAUCHE donne :", a: ["Une hémiplégie / hémiparésie droite", "Possiblement une aphasie et/ou une apraxie"], d: ["Une hémiplégie gauche", "Une héminégligence gauche typique"], src: "fiche" },
      { id: "def8", part: "def", q: "Facteurs de risque d'AVC ischémique (plusieurs réponses) :", a: ["HTA", "Hyperlipidémie", "Tabagisme", "Diabète"], d: ["Hypotension chronique", "Pratique sportive régulière"], src: "fiche" },
      { id: "def9", part: "def", q: "Jusqu'à quel délai après le début des symptômes la thrombolyse est-elle aujourd'hui reconnue ?", a: ["4 h 30"], d: ["1 heure", "24 heures", "72 heures"], expl: "Ta fiche dit 3-4 h ; l'essai ECASS III (2008) a étendu la fenêtre à 4 h 30.", src: "ecass" },
      { id: "cl1", part: "clin", q: "Le stade flasque de l'hémiplégie associe :", a: ["Une hypotonie", "Un signe de Babinski"], d: ["Un clonus inépuisable", "Un signe du canif"], src: "fiche" },
      { id: "cl2", part: "clin", q: "Le « signe du canif » caractérise :", a: ["La spasticité : résistance croissante qui cède brusquement à un certain angle"], d: ["La rigidité parkinsonienne en tuyau de plomb", "La rétraction musculaire", "L'hypotonie"], src: "fiche" },
      { id: "cl3", part: "clin", q: "Dans le schéma de Wernicke-Mann, le membre inférieur est :", a: ["En extension, avec pied en varus équin"], d: ["En triple flexion, pied en talus", "En abduction et rotation externe, pied en valgus", "Flasque, sans position particulière"], src: "fiche" },
      { id: "cl4", part: "clin", q: "Dans le schéma spastique classique, le membre supérieur est (plusieurs réponses) :", a: ["Épaule en adduction et rotation interne", "Coude fléchi", "Poignet et doigts fléchis"], d: ["Épaule en abduction et rotation externe", "Coude en extension et supination"], src: "fiche" },
      { id: "cl5", part: "clin", q: "La spasticité augmente avec (plusieurs réponses) :", a: ["La fatigue", "L'effort", "Une épine irritative (douleur, escarre, constipation…)"], d: ["Le repos en position d'inhibition", "La mobilisation lente"], src: "fiche" },
      { id: "cl6", part: "clin", q: "Une syncinésie « d'imitation », c'est :", a: ["Le membre opposé reproduit involontairement le mouvement volontaire"], d: ["L'exagération de l'attitude hémiplégique lors d'un éternuement", "La contraction parasite d'autres groupes musculaires du même membre", "Un tremblement d'action"], src: "fiche" },
      { id: "cl7", part: "clin", q: "L'ataxie sensitive est aggravée par :", a: ["La fermeture des yeux"], d: ["L'ouverture des yeux", "La position assise", "La chaleur"], src: "fiche" },
      { id: "cl8", part: "clin", q: "Le syndrome pyramidal est avant tout :", a: ["Un trouble de la commande motrice, avec altération de la qualité du mouvement"], d: ["Une perte de force pure, comme dans une atteinte périphérique", "Un trouble de la coordination d'origine cérébelleuse", "Un trouble exclusivement sensitif"], src: "fiche" },
      { id: "co1", part: "compl", q: "Pour prévenir l'épaule douloureuse de l'hémiplégique :", a: ["Ne jamais tirer sur le bras atteint", "Bien positionner le bras (accoudoir, écharpe)"], d: ["Faire de longues séries de flexion à 180°", "Faire de longues séries en rotation externe"], src: "fiche" },
      { id: "co2", part: "compl", q: "Phase chaude de l'algodystrophie : on retrouve…", a: ["Œdème et rougeur", "Impotence fonctionnelle"], d: ["Pâleur et cyanose", "Enraidissement au premier plan"], expl: "Phase chaude : mobilisation sous le seuil douloureux, drainage. Phase froide : enraidissement, on mobilise ++.", src: "fiche" },
      { id: "an1", part: "anam", q: "Pourquoi demander s'il y a eu une thrombolyse ou une thrombectomie ?", a: ["Cela renseigne sur la prise en charge et le pronostic"], d: ["Pour savoir s'il peut faire du renforcement", "Ce n'est pas une question de kiné", "Pour connaître sa latéralité"], src: "crC" },
      { id: "an2", part: "anam", q: "En anamnèse neuro, le « moral » du patient :", a: ["Relève du bilan psycho-cognitif, sauf s'il prend des antidépresseurs"], d: ["Est la première question à poser", "Ne doit jamais être évalué", "Se demande uniquement à la famille"], src: "geria" },
      { id: "an3", part: "anam", q: "Chez un patient aphasique, comment connaître sa latéralité ?", a: ["Par l'observation ou son dossier"], d: ["On ne peut pas la connaître", "Par le MMSE", "Ce n'est pas utile dans l'AVC"], expl: "La latéralité est spécifique ++ dans l'AVC (impact sur les gestes du quotidien).", src: "cr1" },
      { id: "an4", part: "anam", q: "Questions spécifiques de l'anamnèse d'un AVC sylvien (plusieurs réponses) :", a: ["Date et heure de début, contexte de survenue", "Services traversés, soins intensifs", "Évolution des déficits (motricité, aphasie, négligence, déglutition)"], d: ["Nombre de poussées et score EDSS", "Infection dans les 6 semaines précédentes"], expl: "EDSS = SEP ; infection dans les 6 semaines = Guillain-Barré.", src: "crC" },
      { id: "an5", part: "anam", q: "Pourquoi demander si le patient a des animaux ?", a: ["Facteur de motivation, mais aussi de risque de chute"], d: ["Risque d'allergie au matériel", "Ce n'est jamais pertinent"], src: "crC" },
      { id: "bi1", part: "bilans", q: "Le bilan articulaire de l'hémiplégique se fait :", a: ["En passif, de proximal à distal, après inhibition de la spasticité si nécessaire"], d: ["En actif uniquement, de distal à proximal", "À vitesse rapide pour révéler la spasticité", "Uniquement du côté sain"], src: "fiche" },
      { id: "bi2", part: "bilans", q: "Bras ballant au stade flasque : le patient ne « trouve » pas son bras. On pense à :", a: ["Une héminégligence"], d: ["Un trouble sensitif isolé", "Une spasticité", "Une capsulite"], expl: "S'il le cherche et le trouve, on pense plutôt à un trouble sensitif.", src: "fiche" },
      { id: "bi3", part: "bilans", q: "Quelle échelle distingue la spasticité des rétractions ?", a: ["Tardieu"], d: ["Ashworth modifiée", "Berg", "MMSE"], src: "fiche" },
      { id: "bi4", part: "bilans", q: "Le Nine Hole Peg Test est réservé aux patients qui :", a: ["Ont une motricité distale (au moins une cotation 1 en préhension fine)"], d: ["Sont en phase flasque", "Ne savent pas tenir assis", "Ont une héminégligence sévère"], src: "fiche" },
      { id: "bi5", part: "bilans", q: "Vitesse de marche de 0,38 m/s après un AVC (classification de Perry) :", a: ["Marche limitée au domicile"], d: ["Marche extérieure limitée", "Marche extérieure (communautaire)", "Vitesse normale"], expl: "< 0,4 m/s : domicile ; 0,4-0,8 : extérieur limité ; > 0,8 : extérieur.", src: "perry" },
      { id: "bi6", part: "bilans", q: "Le test de la rotation externe d'épaule chez l'hémiplégique se fait :", a: ["Coude au corps"], d: ["En abduction à 90°", "En position assise, bras au zénith", "Uniquement en actif"], expl: "L'abduction peut être douloureuse.", src: "fiche" },
      { id: "bi7", part: "bilans", q: "Fauchage à la marche : faiblesse surtout…", a: ["Des ischio-jambiers (et un peu du psoas)"], d: ["Du tibial antérieur", "Du quadriceps", "Du moyen fessier uniquement"], expl: "Le steppage, lui, traduit une faiblesse des releveurs (tibial antérieur).", src: "fiche" },
      { id: "bi8", part: "bilans", q: "Extinction sensitive : le patient perçoit chaque côté isolément, mais seulement le côté sain lors de la stimulation simultanée. Cela évoque :", a: ["Une héminégligence / atteinte pariétale"], d: ["Une neuropathie périphérique", "Un syndrome cérébelleux", "Une simulation"], src: "cr4" },
      { id: "ob1", part: "obj", q: "« Sevrer les aides techniques » est-il un objectif thérapeutique ?", a: ["Non"], d: ["Oui, c'est l'objectif principal", "Oui, à court terme"], src: "cr1211" },
      { id: "ob2", part: "obj", q: "L'indépendance, c'est :", a: ["La capacité physique de réaliser quelque chose"], d: ["La capacité cognitive de prendre des décisions pour soi", "Le fait de vivre seul", "L'absence d'aide technique"], expl: "L'autonomie, c'est la capacité cognitive de décider pour soi. On améliore l'indépendance à la marche.", src: "cr1211" },
      { id: "ob3", part: "obj", q: "Cas J+45, équin débutant (MAS 1+ fléchisseurs plantaires). Objectifs pertinents (plusieurs réponses) :", a: ["Surveiller la spasticité et prévenir les attitudes vicieuses", "Maintenir les amplitudes articulaires, extension de hanche +++"], d: ["Renforcer en force maximale le triceps sural", "Sevrer l'orthèse suro-pédieuse dès la 1re séance"], src: "cr1211" },
      { id: "ob4", part: "obj", q: "Un objectif bien formulé en MSP neuro doit :", a: ["Avoir une implication clinique"], d: ["Être le plus général possible", "Reprendre mot pour mot la plainte du patient", "Concerner uniquement le long terme"], src: "cr1211" },
      { id: "tt1", part: "ttt", q: "Ordre recommandé pour inhibition et travail actif :", a: ["Inhibition et travail du MS, puis inhibition et travail du MI"], d: ["Inhibition du MS et du MI d'abord, puis tous les exercices", "Exercices d'abord, inhibition à la fin", "Aucune inhibition chez un patient spastique"], expl: "L'inhibition ne tient pas dans le temps.", src: "cr1911" },
      { id: "tt2", part: "ttt", q: "Les postures d'inhibition sont plus efficaces :", a: ["En chaîne fermée (point fixe distal, mobilisation du proximal)"], d: ["En chaîne ouverte", "À vitesse rapide", "En position debout uniquement"], src: "cr1911" },
      { id: "tt3", part: "ttt", q: "Pourquoi éviter de surcharger le travail du côté sain ?", a: ["Stimuler le côté sain inhibe le côté atteint"], d: ["Le côté sain est toujours douloureux", "Cela augmente le risque de chute", "C'est interdit dans les recommandations"], expl: "Exception : on peut travailler le membre sain seul si le membre parétique bloque la progression vers l'objectif principal.", src: "cr1911" },
      { id: "tt4", part: "ttt", q: "Pour charger davantage le membre parétique lors de l'assis-debout :", a: ["Pied sain en avant, ou posé sur une planche de Freeman"], d: ["Pied atteint en avant", "Utiliser les deux accoudoirs avec le bras sain", "Monter la hauteur d'assise au maximum à chaque fois"], src: "cr1911" },
      { id: "tt5", part: "ttt", q: "Patiente déjà spastique au triceps sural : un facilitateur du triceps est-il utile ?", a: ["Non"], d: ["Oui, toujours", "Oui, en chaîne ouverte"], src: "cr1911" },
      { id: "tt6", part: "ttt", q: "Exercice : objets sous le pied, on demande lequel est le plus doux. On travaille surtout :", a: ["La sensibilité"], d: ["La proprioception", "La force", "L'endurance"], expl: "Si on demande l'épaisseur, on travaille plutôt la proprioception.", src: "cr1911" },
      { id: "tt7", part: "ttt", q: "Consignes de mobilisation passive du MS hémiplégique (plusieurs réponses) :", a: ["Pas de traction", "Insister sur la main"], d: ["Longues séries de flexion à 180°", "Étirer tous les muscles du MS"], expl: "Pas d'étirement du MS, sauf des fléchisseurs des doigts.", src: "fiche" }
    ],
    // ---- Patients illustrés (dessins) ----
    patients: [
      { id: "p1211", nom: "Mme L., 68 ans · AVC sylvien gauche J+45", origine: "cours", src: "cr1211", desc: "Hémiparésie droite, aphasie non fluente modérée, MAS 1+ fléchisseurs plantaires, releveurs 2/5, Berg 35/56, marche 0,38 m/s avec canne quadripode et orthèse suro-pédieuse droite.",
        attrs: { hemi: "D", aphasie: true, aide: "quadri", aideCote: "G", afo: "D", chute: true } },
      { id: "pc4", nom: "Mme R., 42 ans · AVC fronto-pariétal droit J+90 + capsulite", origine: "cours", src: "cr4", desc: "Hémiplégie gauche en récupération partielle, capsulite de l'épaule gauche (EVA 7/10 en fin d'amplitude), marche autonome sans aide 0,85 m/s, Berg 51/56.",
        attrs: { hemi: "G", douleurs: [{ zone: "epauleG", type: "mecanique", eva: 7 }] } },
      { id: "pflasque", nom: "Illustration : phase aiguë flasque, AVC sylvien droit", origine: "invente", src: "fiche", desc: "Hémiplégie gauche flasque, héminégligence gauche (tête et regard déviés à droite), au fauteuil. Illustration construite d'après la fiche de cours : ce n'est pas un cas réel.",
        attrs: { hemi: "G", flasque: true, regard: "D", aide: "fauteuil", escarre: ["talonG"] } },
      { id: "psdrc", nom: "Illustration : épaule-main douloureuse de l'hémiplégique (SDRC)", origine: "invente", src: "fiche", desc: "Hémiplégie gauche, syndrome épaule-main en phase chaude : œdème et rougeur de la main, douleur. Construite d'après la fiche de cours.",
        attrs: { hemi: "G", echarpe: "G", oedeme: ["mainG"], douleurs: [{ zone: "mainG", type: "sdrc" }, { zone: "epauleG", type: "mecanique" }] } }
    ],
    // ---- Cas cliniques ----
    cas: [
      { id: "cas1211", origine: "cours", src: ["cr1211", "cr1911", "crC"], patient: "p1211", titre: "AVC sylvien gauche à J+45 (Mme L., 68 ans)",
        fiche: "Mme L., 68 ans. AVC ischémique sylvien gauche il y a 45 jours. Vous la recevez pour sa rééducation.",
        etapes: [
          { type: "anamnese", titre: "Anamnèse", consigne: "Choisis tes questions dans l'ordre où tu les poserais. Les questions inutiles ou hors sujet coûtent du temps (5 min en neuro).",
            items: [
              { q: "Âge, taille, poids, BMI, variation de poids ?", p: 1, r: "68 ans (taille et poids non précisés dans le cas)." },
              { q: "Latéralité ?", p: 1, r: "Non précisée : elle peut s'observer. Spécifique ++ dans l'AVC, ici l'hémicorps droit est atteint." },
              { q: "Que s'est-il passé ? Date, heure, contexte, premiers symptômes ?", p: 1, r: "Apparition brutale d'une hémiparésie droite et de troubles du langage, il y a 45 jours." },
              { q: "Prise en charge : délai, services, soins intensifs, thrombolyse ou thrombectomie ?", p: 1, r: "Non précisé dans le cas : à demander (pronostic)." },
              { q: "Évolution depuis l'AVC (motricité, langage, déglutition) ?", p: 1, r: "Récupération partielle ; aphasie non fluente modérée, compréhension des consignes simples préservée." },
              { q: "Antécédents médicaux et chirurgicaux ?", p: 1, r: "HTA, dyslipidémie." },
              { q: "Médication (heures de prise, effets secondaires) ?", p: 2, r: "Non précisée." },
              { q: "État antérieur : autonomie, marche, aides techniques avant l'AVC ?", p: 1, r: "Autonome, marchait sans aide technique." },
              { q: "Aides techniques actuelles ?", p: 1, r: "Canne quadripode, orthèse suro-pédieuse droite." },
              { q: "Chutes depuis l'AVC ? Peur de tomber ?", p: 1, r: "Non précisé, mais le risque est élevé (Berg 35/56) : à demander." },
              { q: "Lieu de vie et entourage ?", p: 1, r: "Vit avec son conjoint, dans une maison à étage." },
              { q: "Hygiène de vie (tabac, alcool, sommeil, déglutition) ?", p: 2, r: "Non précisée." },
              { q: "Prise en charge pluridisciplinaire (logopède, ergothérapeute) ?", p: 2, r: "Non précisée : pertinent avec l'aphasie (logopédie)." },
              { q: "Objectifs de la patiente ?", p: 1, r: "« Je voudrais pouvoir marcher seule et utiliser à nouveau ma main droite. »" },
              { q: "Comment va votre moral en ce moment ?", p: 3, r: "Relève du bilan psycho-cognitif, pas de l'anamnèse (sauf antidépresseurs)." },
              { q: "Quel métier exerciez-vous à 25 ans ?", p: 3, r: "Hors sujet à cet âge : la profession est à poser en fin d'anamnèse, et seulement si elle est utile." }
            ] },
          { type: "bilans", titre: "Choix et ordre des bilans", consigne: "Sélectionne les bilans utiles, dans l'ordre où tu les ferais.",
            ordre: ["Constat d'attitude", "Psycho-cognitif", "Douleur", "Cutané-trophique", "Articulaire", "Tonus", "Moteur", "Sensibilité", "Transferts", "Équilibre", "Marche"],
            items: [
              { b: "Constat d'attitude", ok: true, r: "Arrive avec une canne quadripode et une orthèse suro-pédieuse droite ; schéma spastique ; sous-utilisation du MI droit." },
              { b: "Psycho-cognitif", ok: true, r: "Aphasie non fluente modérée, compréhension des consignes simples préservée (le MMSE classique est peu adapté)." },
              { b: "Douleur", ok: true, r: "Non précisée dans le cas : à rechercher (épaule ++)." },
              { b: "Cutané-trophique", ok: true, r: "Non précisé : rechercher œdème, rougeurs d'appui sous l'orthèse, amyotrophie." },
              { b: "Articulaire", ok: true, r: "Non précisé : vérifier surtout la flexion dorsale de cheville (équin) et l'extension de hanche." },
              { b: "Tonus", ok: true, r: "MAS 1+ fléchisseurs plantaires droits, MAS 1 fléchisseurs du coude ; ROT vifs à droite, Babinski droit.", tests: ["mas", "tardieu", "babinski"] },
              { b: "Moteur", ok: true, r: "MS droit : épaule 3/5, coude 3/5, extension du poignet et des doigts 2/5. MI droit : fléchisseurs de hanche, moyen fessier, ischio-jambiers 3+/5, quadriceps 4/5, releveurs 2/5. Mouvements sélectifs limités, synergies prédominantes.", tests: ["moteur", "tu"] },
              { b: "Sensibilité", ok: true, r: "Hypoesthésie tactile et altération de la proprioception distale droite.", tests: ["picTouche", "sensPos"] },
              { b: "Transferts", ok: true, r: "Autonome sous surveillance." },
              { b: "Équilibre", ok: true, r: "Berg 35/56 ; pieds joints possible avec surveillance ; unipodal droit impossible ; transfert d'appui asymétrique ; réactions posturales retardées vers la droite.", tests: ["berg"] },
              { b: "Marche", ok: true, r: "10 m en 26 s avec canne quadripode = 0,38 m/s. Appui droit raccourci ; oscillation droite avec flexion de hanche compensatoire et dégagement du pied insuffisant sans orthèse ; demi-tour lent ; escaliers avec aide et rampe.", tests: ["tmw10", "tug"] },
              { b: "Bilan respiratoire complet (EFR, gazométrie)", ok: false, r: "Pas justifié ici : rien dans le cas n'oriente vers un problème respiratoire." },
              { b: "Testing analytique de tous les muscles du côté sain", ok: false, r: "Peu pertinent : aucun problème côté sain dans le cas." }
            ] },
          { type: "choix", titre: "Objectifs", consigne: "Coche les objectifs pertinents pour Mme L.", src: "cr1211",
            items: [
              { t: "Sensibiliser au risque de chute (animaux, tapis, luminosité, transferts)", ok: true },
              { t: "Surveiller la spasticité, prévenir l'équin", ok: true },
              { t: "Améliorer le passage du pas (fléchisseurs de hanche, ischio-jambiers)", ok: true },
              { t: "Améliorer l'appui et le transfert du poids sur le MI droit", ok: true },
              { t: "Améliorer la sensibilité et la proprioception pour la prise d'appui", ok: true },
              { t: "Maintenir les amplitudes, extension de hanche +++", ok: true },
              { t: "Améliorer l'équilibre et le périmètre de marche", ok: true },
              { t: "Stimuler les fonctions cognitives", ok: true },
              { t: "Sevrer la canne quadripode", ok: false, why: "Le sevrage des aides techniques n'est pas un objectif thérapeutique." },
              { t: "Rendre la patiente autonome à la marche", ok: false, why: "On parle d'indépendance (capacité physique), pas d'autonomie (capacité de décider)." },
              { t: "Renforcer en priorité le côté sain", ok: false, why: "Stimuler le côté sain inhibe le côté atteint." }
            ] },
          { type: "choix", titre: "Traitement et exercices", consigne: "Coche les exercices adaptés à Mme L.", src: "cr1911",
            items: [
              { t: "Assise sur ballon de Bobath calé (mur + côtés), transferts d'appui ; on retire les calages en gardant celui du côté atteint", ok: true },
              { t: "Assis-debout depuis une table haute, puis de plus en plus basse, pied sain en avant", ok: true },
              { t: "Inhibition + travail du MS, puis inhibition + travail du MI", ok: true },
              { t: "Pied devant le plot 1, 2 ou 3 sans chaussette, yeux ouverts pour corriger", ok: true },
              { t: "Espalier, élastique derrière la cuisse pour aider le passage du pas", ok: true },
              { t: "Relevé du sol travaillé par étapes intermédiaires", ok: true },
              { t: "Inhiber le MS et le MI au début, puis enchaîner tous les exercices", ok: false, why: "L'inhibition ne tient pas dans le temps." },
              { t: "Ajouter un facilitateur du triceps sural", ok: false, why: "La patiente est déjà spastique." },
              { t: "Longer un bâtonnet avec le doigt, à l'horizontale puis à la verticale", ok: false, why: "Trop de motricité fine pour cette patiente (extension des doigts 2/5)." },
              { t: "Fentes avec appui renforcé sur la main droite pour renforcer le côté sain", ok: false, why: "Pas de problème côté sain dans les bilans, et cela inhibe le côté atteint." }
            ] }
        ] },
      { id: "casc4", origine: "cours", src: ["cr4"], patient: "pc4", titre: "AVC fronto-pariétal droit J+90 + capsulite (Mme R., 42 ans)",
        fiche: "Mme R., 42 ans, livreuse de mazout. AVC ischémique fronto-pariétal droit il y a 90 jours, hémiplégie gauche en récupération partielle, capsulite de l'épaule gauche. « Je voudrais récupérer mon bras et reprendre mon travail. La douleur à l'épaule me limite beaucoup. »",
        etapes: [
          { type: "lecture", titre: "Bilans (donnés en cours)", html: `<ul><li><b>Tonus</b> : hypertonie modérée des fléchisseurs des doigts et du poignet gauches (MAS 1 à 1+).</li><li><b>Motricité</b> : MS gauche, épaule 2+/5 ; MI gauche, hanche 4/5, quadriceps 4/5, releveurs 4-/5 ; dissociation poignet-doigts difficile.</li><li><b>Sensibilité</b> : hypoesthésie tactile, proprioception modérément altérée au MS gauche ; extinction sensitive gauche discrète.</li><li><b>Réflexes</b> : vifs à gauche, Hoffmann gauche.</li><li><b>Épaule gauche</b> : EVA 2/10 au repos, 7/10 en fin d'amplitude ; passif : flexion 95°, abduction 75°, RE 15° ; actif : flexion 65°, abduction 45° ; limitation capsulaire active ET passive.</li><li><b>Fonction</b> : Box and Block gauche 12 blocs/min ; marche autonome sans aide, 0,85 m/s ; Berg 51/56 ; escaliers autonome avec rampe ; transferts autonomes ; difficultés pour l'habillage et les activités bimanuelles.</li></ul>` },
          { type: "choix", titre: "Objectifs", consigne: "Coche les objectifs pertinents.", src: "cr4",
            items: [
              { t: "Éduquer la patiente sur sa capsulite (durée d'évolution…)", ok: true },
              { t: "Gérer la douleur de la capsulite", ok: true },
              { t: "Récupérer les amplitudes en actif", ok: true },
              { t: "Améliorer la proprioception et la sensibilité du MS", ok: true },
              { t: "Diminuer la spasticité", ok: true },
              { t: "Travail excentrique du quadriceps pour la descente des escaliers", ok: true },
              { t: "Apprendre à marcher avec une canne quadripode", ok: false, why: "Elle marche sans aide technique à 0,85 m/s." },
              { t: "Prévenir les escarres par des changements de position toutes les 2 h", ok: false, why: "Hors sujet : patiente ambulante et active." }
            ] },
          { type: "choix", titre: "Traitement", consigne: "Coche les propositions adaptées.", src: "cr4",
            items: [
              { t: "Gain d'amplitude d'épaule avec une grosse balle contre un mur", ok: true },
              { t: "Passer une réglette entre les doigts (en sachant si l'on vise la motricité ou la sensibilité)", ok: true },
              { t: "Sensibilité et proprioception de la main et du coude", ok: true },
              { t: "Bien soigner l'installation pour la pro-supination", ok: true },
              { t: "Tractions longitudinales répétées sur le bras pour décoaptater l'épaule", ok: false, why: "Jamais de traction sur le bras hémiplégique." }
            ] }
        ] },
      { id: "casflasque", origine: "invente", src: ["fiche"], patient: "pflasque", titre: "Phase aiguë flasque avec héminégligence (cas d'entraînement)",
        fiche: "Cas inventé pour l'entraînement, construit uniquement à partir de ta fiche de cours. M. D., 74 ans, AVC sylvien droit il y a 5 jours, hémiplégie gauche flasque, héminégligence gauche, au fauteuil.",
        etapes: [
          { type: "choix", titre: "Constat et bilans prioritaires", consigne: "Coche ce que tu observes ou bilantes en priorité.", src: "fiche",
            items: [
              { t: "Déviation de la tête et du regard (héminégligence)", ok: true },
              { t: "Bras ballant : le « trouve »-t-il ? (négligence vs trouble sensitif)", ok: true },
              { t: "Escarres et rougeurs d'appui (talons, sacrum)", ok: true },
              { t: "Position du MI (flasque : flexion, abduction, rotation externe)", ok: true },
              { t: "Station assise cotée de 0 à 3", ok: true },
              { t: "Test de marche de 6 minutes", ok: false, why: "Pas réalisable ni pertinent à ce stade." },
              { t: "Tardieu à vitesse rapide sur tous les muscles comme bilan principal", ok: false, why: "Au stade flasque, la priorité est ailleurs (le tonus est bas)." }
            ] },
          { type: "choix", titre: "Consignes de prise en charge", consigne: "Coche les consignes justes.", src: "fiche",
            items: [
              { t: "Ne jamais tirer sur le bras plégique", ok: true },
              { t: "Bien positionner le bras sur l'accoudoir ou dans une écharpe", ok: true },
              { t: "Mobilisations passives : insister sur la main, la cheville et la rotation interne de hanche", ok: true },
              { t: "Stimuler par le côté négligé (se placer à gauche du patient)", ok: true, why: "Proposition d'entraînement (pas dans ta fiche) : stimuler l'hémiespace négligé. Vérifie avec ton cours." },
              { t: "Longues séries de flexion d'épaule à 180°", ok: false, why: "Risque de conflit." },
              { t: "Étirer tous les muscles du MS", ok: false, why: "Pas d'étirement du MS, sauf des fléchisseurs des doigts." }
            ] }
        ] }
    ]
  };

  // ======== Sources supplémentaires (AVC) ========
  Object.assign(SRC, {
    fcer: { t: "Fiche de cours « Syndrome cérébelleux » (fondamentaux neuro)", k: "Fiche de cours", f: LIB + "02_NEURO › C › SYNDROME CÉRÉBELLEUX.docx" },
    rea24: { t: "MSP Respi-Neuro 19/12/2024 : AVC hémorragique en réanimation", k: "CR 2024-25", f: LIB + "02_NEURO › B › Notes de cours MSP 2024-25 › 24.12.19_Bilans AVC en réanimation.pdf" },
    syl0602: { t: "MSP Neuro 06/02/2025 : AVC sylvien droit + algodystrophie (NON corrigé en classe)", k: "CR 2024-25", f: LIB + "02_NEURO › B › Notes de cours MSP 2024-25 › 25.02.06_NON CORRIGE AVC Sylvien droit et algo.pdf" },
    isch0403: { t: "MSP Neuro 03/04/2025 : AVC ischémique droit à 12 ans (préparation de l'examen, avec correction)", k: "CR 2024-25", f: LIB + "02_NEURO › B › Notes de cours MSP 2024-25 › 25.04.03_Bilan AVC ischémique D.pdf" },
    geriaTeams: { t: "CR MSP Gériatrie 12/11/2026 (« MSP GERIA TEAMS »)", k: "CR 2026-27", f: LIB + "06_GERIATRIE › A › 2026-11-12 - Geria - Examen oral (Teams).pdf" }
  });
  Object.assign(TESTS, {
    doigtNez: { nom: "Épreuve doigt-nez", cat: "Coordination", but: "Rechercher dysmétrie, hypermétrie, dyschronométrie et tremblement d'action (intentionnel).",
      deroul: "Patient assis (position stable). Les deux bras tendus à l'horizontale, il vient toucher alternativement le bout de son nez avec l'index, sans bouger la tête, regard fixe ; d'abord lentement puis plus vite ; yeux ouverts puis yeux fermés. On compare les deux côtés.",
      faux: ["Patient debout pieds joints, on observe s'il tombe à la fermeture des yeux.", "Le patient tape alternativement la paume et le dos de la main sur sa cuisse.", "Le kiné retient l'avant-bras fléchi puis lâche brusquement."],
      cot: "Description : précision, tremblement (lent / rapide), retard au départ ou à l'arrêt, côté.", positif: "Le doigt dépasse ou n'atteint pas la cible (dysmétrie / hypermétrie), avec un tremblement qui augmente à l'approche de la cible.", diag: "Syndrome cérébelleux (ataxie cinétique) ; si les troubles n'apparaissent qu'yeux fermés : ataxie sensitive.", incl: "Test clinique. Bras bien tendus : le trajet est plus long, ce qui fait mieux ressortir la dyschronométrie.", src: ["fcer"], video: yt("finger to nose test physiotutors") },
    marionnettes: { nom: "Test des marionnettes", cat: "Coordination", but: "Rechercher une adiadococinésie (incapacité à réaliser des mouvements alternatifs rapides).",
      deroul: "Pronation-supination rapide et répétée des avant-bras (comme pour faire tourner des marionnettes), puis on augmente la vitesse. Au MI : frotter les pieds sur un paillasson, plutôt assis.",
      faux: ["Toucher son nez avec l'index, bras tendus.", "Rester debout pieds joints, yeux fermés.", "Placer 9 tiges dans des trous."],
      cot: "Normal / irrégulier / impossible, côté.", positif: "Mouvements irréguliers, lents, désorganisés du côté atteint.", diag: "Adiadococinésie : syndrome cérébelleux (homolatéral à la lésion).", incl: "Test clinique.", src: ["fcer"], video: yt("dysdiadochokinesia test") },
    stewart: { nom: "Manœuvre de Stewart-Holmes", cat: "Coordination", but: "Rechercher un défaut de freinage (asynergie agonistes-antagonistes, hypotonie cérébelleuse).",
      deroul: "Le patient fléchit l'avant-bras contre une forte résistance du kiné, qui tient les poignets ; le kiné lâche brusquement. Faire les deux côtés en même temps pour comparer (et protéger le visage du patient).",
      faux: ["On mobilise passivement l'avant-bras à 3 vitesses.", "On percute le tendon du biceps.", "Le patient touche son nez avec l'index."],
      cot: "Positif / négatif, côté, importance.", positif: "Le patient ne freine pas : l'avant-bras part en flexion excessive (il peut se frapper la poitrine).", diag: "Syndrome cérébelleux (hypotonie, asynergie).", incl: "Test clinique.", src: ["fcer"], video: yt("Stewart Holmes rebound test") },
    talonGenou: { nom: "Épreuve talon-genou", cat: "Coordination", but: "Rechercher une dysmétrie et une décomposition du mouvement au MI.",
      deroul: "En décubitus dorsal, le patient pose le talon sur le genou opposé puis le fait glisser le long de la crête tibiale ; yeux ouverts puis fermés.",
      faux: ["Debout, poser un talon devant la pointe de l'autre pied.", "Assis, frotter le pied sur un paillasson.", "Lever la jambe tendue le plus haut possible."],
      cot: "Description, côté.", positif: "Talon qui dépasse ou manque le genou, mouvement décomposé, oscillations le long du tibia.", diag: "Syndrome cérébelleux ; aggravé yeux fermés : ataxie sensitive.", incl: "Test clinique.", src: ["fcer", "cr4"], video: yt("heel to shin test physiotutors") },
    romberg: { nom: "Épreuve de Romberg", cat: "Équilibre", but: "Différencier une ataxie sensitive (proprioceptive) d'une ataxie cérébelleuse.",
      deroul: "Debout, pieds joints, bras le long du corps : on observe yeux ouverts, puis yeux fermés (sécuriser le patient).",
      faux: ["Le patient marche en tandem sur une ligne.", "Le patient piétine sur place 50 pas yeux fermés.", "On pousse le patient vers l'arrière."],
      cot: "Positif / négatif.", positif: "Positif si le déséquilibre apparaît ou s'aggrave nettement à la fermeture des yeux (ataxie sensitive). Dans le syndrome cérébelleux, Romberg NÉGATIF : instable dès les yeux ouverts, peu aggravé yeux fermés.", diag: "Ataxie proprioceptive (et vestibulaire, avec latéralisation) vs cérébelleuse.", incl: "Test clinique.", src: ["fcer", "fiche"], video: yt("Romberg test physiotutors") },
    glasgow: { nom: "Score de Glasgow", cat: "Réanimation", but: "Évaluer le niveau de conscience (première chose à regarder en entrant dans une chambre de réanimation).",
      deroul: "Somme de 3 réponses : ouverture des yeux (1 à 4), réponse verbale (1 à 5), réponse motrice (1 à 6).",
      faux: ["Somme de 14 items d'équilibre cotés de 0 à 4.", "Questionnaire de 30 points sur l'orientation et la mémoire.", "Mesure de la pression artérielle moyenne."],
      cot: "Score de 3 à 15.", positif: "15 = conscience normale ; 3 = score minimal (coma profond, aucune réponse).", diag: "Trouble de la conscience ; oriente ce que le kiné peut faire (à 3/15 en réa respi : seule l'aspiration endotrachéale est possible).", incl: "Échelle d'évaluation.", src: ["rea24"], video: yt("Glasgow coma scale") }
  });

  // ======== AVC sylvien : patients et cas des années précédentes ========
  avc.patients.push(
    { id: "p0602", nom: "Patiente 45 ans · AVC sylvien droit à 2 mois + algodystrophie", origine: "cours", src: "syl0602", desc: "Institutrice, 2 enfants. Marche seule sans canne avec une orthèse Chignon. Motricité globale 1/2, extrémité du MI à 0, spasticité globale 2/4, algodystrophie du MS en phase froide, légers troubles sensitifs.",
      attrs: { hemi: "G", afo: "G", douleurs: [{ zone: "mainG", type: "sdrc" }] } },
    { id: "p0403", nom: "Homme 59 ans · AVC ischémique droit il y a 12 ans", origine: "cours", src: "isch0403", desc: "Administrateur, HTA, asthme, ancien fumeur. Marche avec une canne, arrive en tricycle avec son fils. Picotements nocturnes derrière la jambe (EVA 2/10). Pic-touche MI 6/10, MS gauche 7/10 ; MAS fléchisseurs du coude 1+, fléchisseurs du poignet 2, gastrocnémiens 2.",
      attrs: { hemi: "G", aide: "canne", aideCote: "D" } });
  avc.cas.push(
    { id: "cas0403", origine: "cours", src: ["isch0403"], patient: "p0403", titre: "AVC ischémique droit à 12 ans : préparation de l'examen (avec correction des profs)",
      fiche: "Homme de 59 ans, administrateur, AVC ischémique droit il y a 12 ans. Vu à l'hôpital 3 fois par semaine. 2 enfants vivent avec lui. Premier symptôme : un matin, perte de force du bras gauche. Antécédents : HTA, asthme. Loisirs : foot, lecture, marche.",
        etapes: [
          { type: "anamnese", titre: "Anamnèse", consigne: "Choisis tes questions dans l'ordre. La correction des profs signalait des oublis : à toi de ne pas les reproduire.",
            items: [
              { q: "Taille, poids ?", p: 1, r: "1,75 m, 68 kg." },
              { q: "Histoire : comment est-ce arrivé, prise en charge ?", p: 1, r: "Perte de force du bras gauche un matin, il s'est assis ; quelques mois à l'hôpital. Kiné commencée 2 ans plus tard (raisons financières)." },
              { q: "Thrombolyse ? Dans quels services a-t-il été pris en charge ?", p: 1, r: "Non demandé par l'étudiant : la correction dit que c'était intéressant à demander." },
              { q: "Examens complémentaires ?", p: 2, r: "Aucun cité. La correction évoque une scintigraphie possible en cas de suspicion d'algodystrophie." },
              { q: "Chutes ?", p: 1, r: "Non demandé : relevé comme oubli par les profs." },
              { q: "Aides techniques ? Distance de marche ?", p: 1, r: "Canne ; marche 30 min, 2 fois par semaine. La marche devient difficile, la canne ne suffit plus : à creuser (pourquoi ?)." },
              { q: "Habitation, aides à domicile ?", p: 1, r: "Maison sans étage, pas d'aménagement ; ses neveux vivent avec lui et l'aident." },
              { q: "Alimentation : texture, fausses routes ?", p: 2, r: "Mange bien, 1,5 l d'eau, pas d'alcool. La correction : demander la texture pour évaluer le risque de fausse route." },
              { q: "Tabac ?", p: 2, r: "Ne fume plus depuis 2011 (1/2 paquet par jour pendant 30 ans)." },
              { q: "Travail : a-t-il travaillé ces 12 ans ? aménagements ?", p: 1, r: "Ne sait plus se rendre au travail seul (doit être accompagné, avec la canne). Évolution à documenter : belle ligne du temps." },
              { q: "Kiné antérieure ? Reprise depuis quand ?", p: 1, r: "Non demandé : relevé comme oubli." },
              { q: "Conduite ?", p: 2, r: "Non demandé : relevé comme oubli." },
              { q: "Objectif du patient ?", p: 1, r: "Reprendre le travail." },
              { q: "Troubles vésico-sphinctériens ?", p: 2, r: "Non demandé : la correction conseille de s'y intéresser." }
            ] },
          { type: "lecture", titre: "Bilans réalisés et remarques des profs", html: `<ul><li><b>Constat d'attitude</b> : arrive en tricycle avec son fils, canne ; au cabinet, on lui donne une tribune. Profs : chercher une héminégligence (se retourne-t-il ?), justifier toute question sur orthèse ou écharpe.</li><li><b>Douleur</b> : arrière de la jambe, EVA 2/10, picotements la nuit seulement, depuis 2 mois. → Une douleur citée par le patient doit être investiguée.</li><li><b>Fatigue</b> : 8 h de sommeil + 3 h de sieste par jour.</li><li><b>Sensibilité</b> : pic-touche MI 6/10, MS gauche 7/10 ; sens de position hanche et gros orteil 10/10. Profs : préciser la ZONE déficitaire, retester, ne pas oublier la plante du pied.</li><li><b>Tonus (MAS)</b> : fléchisseurs du coude 1+, supinateur 1+, fléchisseurs du poignet 2, fléchisseurs de hanche 0, extenseurs du genou 1, adducteurs 1, gastrocnémiens 2. Profs : nommer les muscles (pas « fléchisseurs d'épaule »), penser à tous les schémas (biceps ET triceps peuvent être spastiques) ; souvent fait en même temps que l'articulaire passif.</li><li><b>Moteur (0-1-2)</b> : stabilité d'épaule 2/2, coude 1/2, préhension 2/2, pince pouce-index 1/2 ; hanche 2/2 ; flexion et extension de genou 1+.</li><li><b>Transferts</b> : assis-debout en s'appuyant sur le MS sain et en chargeant la jambe saine ; le reste sans problème.</li><li><b>Équilibre</b> : non évalué sans canne → profs : compléter (Berg, Held si le bilan moteur est à 2/2 partout mais qu'il y a des défauts de marche).</li><li><b>Oubli</b> : aspect psychologique (Hamilton, moral).</li></ul><p class="small">Ordre conseillé par la correction : bilan sensitif après articulaire et tonus.</p>` },
          { type: "choix", titre: "Objectifs", consigne: "Coche les objectifs retenus pour ce patient.", src: "isch0403",
            items: [
              { t: "Améliorer le contrôle moteur du coude et la préhension fine", ok: true },
              { t: "Améliorer le verrouillage du genou", ok: true },
              { t: "Améliorer les transferts (charger le côté atteint)", ok: true },
              { t: "Corriger les défauts de marche, améliorer l'équilibre", ok: true },
              { t: "Diminuer le tonus des gastrocnémiens", ok: true },
              { t: "Gagner en amplitude de flexion et d'abduction d'épaule", ok: true },
              { t: "Préserver ce qui fonctionne bien", ok: true, why: "La correction rappelle de ne pas oublier de préserver les acquis." },
              { t: "Arrêter la canne pour qu'il puisse retourner au travail", ok: false, why: "Le sevrage d'une aide technique n'est pas un objectif thérapeutique (CR 2026-27)." }
            ] }
        ] },
    { id: "cas0602", origine: "cours", src: ["syl0602"], patient: "p0602", titre: "AVC sylvien droit à 2 mois + algodystrophie : exercices créatifs pour le MS",
      fiche: "Patiente de 45 ans, institutrice maternelle, mariée, 2 enfants de 8 et 11 ans. AVC sylvien droit il y a 2 mois, en revalidation depuis 6 semaines, veut rentrer chez elle vite. Marche seule sans canne avec une orthèse Chignon ; motricité globale 1/2 (extrémité du MI à 0) ; spasticité 2/4 ; algodystrophie du MS en phase froide ; légers troubles sensitifs. ⚠ Séance non corrigée en classe.",
      etapes: [
        { type: "choix", titre: "Exercices pour le MS spastique", consigne: "Coche les exercices proposés en cours (non corrigés : garde un regard critique).", src: "syl0602",
          items: [
            { t: "Flexion-extension du coude sur skateboard avec élastique et repère visuel : triceps concentrique et excentrique, inhibition du biceps (type Perfetti)", ok: true },
            { t: "Appui du MS spastique sur la table pendant que la main saine va chercher une balle (stabilisateurs, verrouillage du coude, régulation du tonus, sensibilité)", ok: true },
            { t: "Faire rouler une balle au mur avec le MS spastique (extension du coude, étirement dynamique de la chaîne spastique)", ok: true },
            { t: "Adduction horizontale bras tendu pour déposer une balle dans un cerceau", ok: true },
            { t: "Suivre un trajet avec la main (puis main décollée, trajet plus long, vers le schéma spastique)", ok: true },
            { t: "Préhension avec des pinces à linge ; rattraper un objet qui roule sur la table", ok: true },
            { t: "Tractions répétées sur le bras pour gagner de l'amplitude d'épaule", ok: false, why: "Jamais de traction sur le bras hémiplégique." },
            { t: "Immobilisation stricte du MS pendant toute la phase froide", ok: false, why: "En phase froide de l'algodystrophie, l'enraidissement domine : on mobilise ++ (fiche de cours)." }
          ] }
      ] });

  // ======== AVC cérébelleux / syndrome cérébelleux ========
  const cer = {
    id: "avc-cerebelleux", cell: "neuro", titre: "AVC cérébelleux (syndrome cérébelleux)", court: "AVC cérébelleux",
    statut: "Construit à partir de la fiche « syndrome cérébelleux », du cours Delobel 2026-27 et du cas du cours 4. Relis et signale-moi les écarts.",
    resume: [
      "<b>Définition</b> : troubles de la coordination, de l'équilibre et de la posture par lésion du cervelet. Ici, cause vasculaire (artères cérébelleuses : PICA, AICA, artère cérébelleuse supérieure).",
      "<b>Côté</b> : l'hémisyndrome cérébelleux est <b>homolatéral</b> à la lésion (AVC cérébelleux droit → troubles à droite).",
      "<b>Signes</b> : ataxie statique (polygone élargi, oscillations, danse des tendons, démarche ébrieuse en zig-zag), hypotonie (ballant exagéré, ROT pendulaires, Stewart-Holmes +), ataxie cinétique (dysmétrie, dyschronométrie, adiadococinésie, asynergie, tremblement intentionnel), dysarthrie scandée, nystagmus, écriture cérébelleuse.",
      "<b>Romberg NÉGATIF</b> : instable dès les yeux ouverts, peu aggravé yeux fermés (≠ ataxie sensitive). Hypotonie mais <b>pas flasque</b> (pas d'atteinte pyramidale).",
      "<b>Anamnèse spécifique</b> : nausées, vomissements, vertiges, céphalées, dysarthrie, diplopie, dysphagie, chutes et direction (latéropulsion), peur de tomber, fatigue, déglutition, tremblement d'action.",
      "<b>Bilans clés</b> : doigt-nez, talon-genou, marionnettes, Stewart-Holmes, prise d'une bouteille (fonctionnel), oculomoteur, postural (poussées dans tous les sens), Berg, marche (10 m seulement après avoir demandé la distance de marche), double tâche, SARA.",
      "<b>Traitement</b> : prévention des chutes, stimuler les réactions posturales, équilibre avec la base de sustentation élargie (ne pas chercher à la réduire au bilan), coordination et dysmétrie (cibles de taille adaptée au doigt-nez), progression lesté → léger, gros → petit, couché → assis → debout, yeux ouverts → fermés ; tapis roulant ; travailler les deux membres."
    ],
    pro: [
      { id: "def", titre: "Définition, anatomie, étiologie", src: ["fcer", "fiche"], html: `
<p><b>Syndrome cérébelleux</b> : troubles de la coordination, de l'équilibre et de la posture dus à une lésion du cervelet.</p>
<ul><li><b>Archéocérébellum</b> (lobe flocculo-nodulaire, vestibulo-cervelet) : équilibre ; son atteinte donne nystagmus et troubles oculomoteurs.</li><li><b>Paléocérébellum</b> : tonus, proprioception.</li><li><b>Néocérébellum</b> : coordination, planification et régulation du mouvement volontaire.</li></ul>
<p><b>Syndrome statique (vermien)</b> : troubles souvent bilatéraux, dominés par la station debout, la marche et les adaptations posturales. <b>Syndrome cinétique (hémisphérique)</b> : ataxie cinétique +++, troubles <b>homolatéraux</b> à la lésion (incoordination des membres, hypotonie).</p>
<p><b>Étiologies</b> : AVC (une des artères cérébelleuses), SEP, traumatisme crânien, tumeurs, éthylisme, maladies dégénératives et malformations.</p>
<p><b>AVC cérébelleux</b> : hémisyndrome cérébelleux homolatéral à la lésion. À distinguer du syndrome de Wallenberg (bulbaire latéral), qui associe signes cérébelleux, vestibulaires et nerfs crâniens du côté de la lésion, et une hémianesthésie thermo-algique de l'autre côté.</p>` },
      { id: "clin", titre: "Signes cliniques", src: ["fcer"], html: `
<p><b>Ataxie statique (équilibre)</b> : oscillations, tendance à la chute, <b>élargissement du polygone de sustentation</b>, <b>danse des tendons</b> (contraction des muscles antérieurs de la jambe pour corriger le déséquilibre vers l'arrière). <b>Romberg négatif</b> : pas d'aggravation nette yeux fermés.</p>
<p><b>Marche</b> : démarche <b>ébrieuse</b>, polygone élargi, bras écartés, mouvements de rattrapage, longueur et cadence des pas irrégulières, allure en zig-zag (il corrige trop à chaque pas), difficultés de mise en route, d'arrêt et de changement de direction.</p>
<p><b>Hypotonie</b> (pas une flaccidité : pas d'atteinte pyramidale) : visible et palpable, ballant exagéré du bras, de la main et du poignet, <b>ROT pendulaires</b>, défaut de freinage à la <b>manœuvre de Stewart-Holmes</b>.</p>
<p><b>Ataxie cinétique</b> (homolatérale) :</p><ul><li>Dans le temps : <b>dyschronométrie</b> (retard au démarrage et à l'arrêt), <b>adiadococinésie</b> (mouvements alternatifs rapides impossibles), <b>tremblement intentionnel</b> (grande amplitude, plus marqué au début et à la fin du mouvement, majoré par l'émotion, absent au repos).</li><li>Dans l'espace : <b>asynergie</b> (mouvement décomposé), <b>dysmétrie / hypermétrie</b> (le mouvement dépasse ou n'atteint pas la cible).</li></ul>
<p><b>Faiblesse et fatigabilité</b> : fréquentes les premières semaines, du côté de la lésion ; retard à la contraction, force maximale diminuée, relâchement lent, production de force irrégulière (répéter le testing).</p>
<p><b>Troubles associés</b> : écriture cérébelleuse (grande, irrégulière), <b>dysarthrie</b> scandée et explosive, <b>nystagmus</b>, troubles de la déglutition, tremblement.</p>
<p class="tip">Repère fonctionnel : ataxie importante → plus de mal à enfiler un fil dans une aiguille qu'à porter un sac de 10 kg ; ataxie légère → l'inverse.</p>` },
      { id: "anam", titre: "Anamnèse", src: ["crC", "fcer", "cr1"], html: `
<p>Questions génériques (voir AVC sylvien), puis spécifiques (cours Delobel) :</p><ul>
<li>Date de survenue, territoire (artère cérébelleuse supérieure, PICA, AICA), lésion isolée ou associée (tronc cérébral, hémisphères) ; thrombolyse ou thrombectomie et délai ; sévérité initiale (NIHSS, ataxie).</li>
<li>Symptôme initial : vertige, étourdissement, <b>nausées, vomissements</b>, céphalées, trouble de la marche, dysarthrie.</li>
<li>Nerfs crâniens : diplopie, dysarthrie, dysphagie, dysphonie, dysesthésie faciale. Tremblement d'action ou de la tête ?</li>
<li><b>Chutes</b> depuis l'AVC : circonstances, instabilité, direction (latéropulsion), peur de tomber, restriction d'activité, blessures, hospitalisations ; évaluation du risque déjà faite ?</li>
<li>Fatigue non soulagée par le repos, sommeil ; déglutition (texture, liquides épaissis) ; tabac (risque de récidive), alcool ; sédentarité (l'ataxie la favorise).</li>
<li>Usage fonctionnel de la main (dysmétrie, gestes fins), AVJ, aides techniques, marche avant et après, objectifs.</li></ul>` },
      { id: "bilans", titre: "Bilans", src: ["fcer", "crC", "cr4"], html: `
<ul>
<li><b>Constat d'attitude</b> : aides techniques, faciès anxieux, tremblement d'effort après la marche, démarche ébrieuse, polygone élargi, ballant des bras, danse des tendons, utilisation des bras aux transferts.</li>
<li><b>Psycho-cognitif</b> : en principe pas d'atteinte des fonctions supérieures (sauf patient âgé ou pathologie mixte) ; le patient comprend, mais c'est parfois le kiné qui ne le comprend pas (dysarthrie). Anxiété, dépression.</li>
<li><b>Douleur et cutané-trophique</b> : pas un symptôme du syndrome cérébelleux, mais ces patients se cognent et chutent (hématomes, plaies). Avis divergents entre profs (voir Remarques MSP).</li>
<li><b>Fatigue</b> : Borg ; faiblesse musculaire qui diminue à la répétition et revient après 2 min de repos ; distinguer fatigue cognitive et physique.</li>
<li><b>Oculomoteur</b> : poursuite du doigt (nystagmus horizontal) ou regard fixe et tête qui bouge.</li>
<li><b>Coordination</b> (yeux ouverts puis fermés, comparer les deux côtés) : doigt-nez, talon-genou, marionnettes, Stewart-Holmes, prise d'une bouteille (lourde puis légère, objets gros puis petits).</li>
<li><b>Tonus</b> : hypotonie, ballant, ROT pendulaires, Stewart-Holmes. <b>Articulaire, sensitif, moteur</b> : pas nécessaires dans une atteinte purement cérébelleuse, sauf contexte (immobilisation, chutes, douleur ; rachis cervical souvent sous tension).</li>
<li><b>Postural</b> : poussées déséquilibrantes <b>dans tous les sens</b> ; station assise (0-3), debout (0-4). Ne pas chercher à réduire la base de sustentation au bilan.</li>
<li><b>Tests dynamiques</b> : marche en tandem, marche en étoile, Fukuda. Cérébelleux : troubles dès le début, peu majorés yeux fermés, non latéralisés ; vestibulaire : déviation du côté de la lésion, majorée yeux fermés.</li>
<li><b>Fonctionnel</b> : transferts, Berg, TUG, SARA (échelle d'ataxie /40), marche (distance quotidienne et maximale, 2MWT ou 6MWT ; le 10 m seulement si l'on a demandé la distance de marche avant), arrêts et demi-tours, double tâche, escaliers.</li></ul>` },
      { id: "obj", titre: "Objectifs", src: ["cr4"], html: `
<p>Cas du cours 4 (AVC cérébelleux droit J+28) :</p><ul><li>Prévenir les chutes ; diminuer l'appréhension.</li><li>Stimuler les réactions posturales, améliorer l'équilibre, acquérir la station debout sans appui des MS.</li><li>Diminuer la dysmétrie, améliorer la coordination des MS et des MI.</li><li>Maintenir l'indépendance et la sécurité des transferts ; améliorer la vitesse de marche.</li><li>Faire évoluer l'aide technique (tribune → une béquille) et apprendre à l'utiliser seule.</li><li>Orienter vers une prise en charge pluridisciplinaire.</li></ul>
<p class="warn">⚠ Le CR du cours 4 liste « diminuer l'aide technique tribune à une béquille » comme objectif, alors que le CR du 12/11 dit que le sevrage des aides techniques n'est pas un objectif thérapeutique. Formule plutôt : « améliorer l'équilibre et l'indépendance à la marche » (l'évolution de l'aide technique en sera la conséquence).</p>` },
      { id: "ttt", titre: "Traitement et exercices", src: ["fcer", "cr4"], html: `
<p><b>Principes</b> : progression balle lourde → légère, grosse → petite, cible grande → petite (taille choisie d'après le doigt-nez), couché → assis → debout, yeux ouverts → fermés (attention à la dépendance visuelle), lent → rapide ; travailler <b>les deux membres</b> même si l'atteinte est unilatérale ; utiliser des objets de la vie quotidienne ; environnement dégagé ; <b>tapis roulant</b> intéressant (environnement visuel fixe) ; exercices oculomoteurs avant la séance ; cacher l'œil du côté de la lésion si vertiges ou nausées.</p>
<p><b>Membre supérieur</b> : déplacer une balle dans des cerceaux (« top » pour changer de cible) ; passes avec le kiné ; panier de basket ; bras tendus en élévation latérale avec cerceaux autour des poignets (cercles, possibilité de lester les avant-bras) ; récupérer des cerceaux avec un bâton (lester si trop dur) ; bâton à repères visuels puis auditifs (s'arrêter au signal : dyschronométrie) ; bouteille, cartes, livre ; tapoter les doigts.</p>
<p><b>Équilibre et coordination</b> (cours 4) : au milieu des barres, step parallèle aux barres, monter et descendre de côté ; progression : lâcher les mains (côté atteint d'abord), augmenter la vitesse, puis yeux fermés (seule la proprioception reste). Toucher une balle posée sur un cône, d'abord lestée, puis sans la vue (dysmétrie + contrôle postural).</p>
<p><b>Marche</b> : avec la base élargie, arrêts, demi-tours, changements de direction, double tâche.</p>` }
    ],
    qcm: [
      { id: "c1", part: "def", q: "Un AVC cérébelleux DROIT donne un hémisyndrome cérébelleux :", a: ["Droit (homolatéral)"], d: ["Gauche (controlatéral)", "Bilatéral obligatoirement", "Sans côté prédominant"], src: "fiche" },
      { id: "c2", part: "def", q: "Le vestibulo-cervelet (archéocérébellum, lobe flocculo-nodulaire) gère surtout :", a: ["L'équilibre"], d: ["La planification du mouvement volontaire", "La sensibilité thermique", "La commande pyramidale"], src: "fcer" },
      { id: "c3", part: "def", q: "Le syndrome cérébelleux statique (vermien) est dominé par :", a: ["Les troubles de la station debout, de la marche et des adaptations posturales"], d: ["L'ataxie cinétique d'un seul membre", "La spasticité", "Les troubles sensitifs"], src: "fcer" },
      { id: "c4", part: "clin", q: "Chez un patient cérébelleux, l'épreuve de Romberg est :", a: ["Négative : instable dès les yeux ouverts, peu aggravé yeux fermés"], d: ["Positive : chute à la fermeture des yeux", "Impossible à réaliser", "Positive du côté opposé à la lésion"], src: "fcer" },
      { id: "c5", part: "clin", q: "L'hypotonie cérébelleuse se manifeste par (plusieurs réponses) :", a: ["Un ballant exagéré des bras", "Des ROT pendulaires", "Un défaut de freinage à la manœuvre de Stewart-Holmes"], d: ["Un signe de Babinski", "Un signe du canif"], src: "fcer" },
      { id: "c6", part: "clin", q: "Le patient cérébelleux est-il « flasque » ?", a: ["Non : il est hypotonique, mais sans atteinte pyramidale"], d: ["Oui, comme au stade initial de l'hémiplégie", "Oui, si la lésion est vermienne"], src: "fcer" },
      { id: "c7", part: "clin", q: "La dyschronométrie, c'est :", a: ["Un retard à la mise en route et à l'arrêt du mouvement"], d: ["L'incapacité à faire des mouvements alternatifs rapides", "Un mouvement qui dépasse la cible", "Un tremblement de repos"], src: "fcer" },
      { id: "c8", part: "clin", q: "L'adiadococinésie se recherche avec :", a: ["Le test des marionnettes"], d: ["L'épreuve de Romberg", "Le doigt-nez", "La manœuvre de Stewart-Holmes"], src: "fcer" },
      { id: "c9", part: "clin", q: "Le tremblement cérébelleux est (plusieurs réponses) :", a: ["Intentionnel (d'action)", "Absent au repos", "Plus marqué à l'approche de la cible"], d: ["Présent surtout au repos, main posée", "Diminué par l'émotion"], src: "fcer" },
      { id: "c10", part: "clin", q: "La danse des tendons correspond à :", a: ["La contraction des muscles antérieurs de la jambe pour corriger le déséquilibre"], d: ["Un clonus achilléen inépuisable", "Des fasciculations", "Un tremblement des tendons du poignet"], src: "fcer" },
      { id: "c11", part: "clin", q: "La dysarthrie cérébelleuse est :", a: ["Scandée et explosive"], d: ["Une aphasie de compréhension", "Une voix monotone et faible", "Un mutisme"], src: "fcer" },
      { id: "c12", part: "clin", q: "Ataxie cérébelleuse IMPORTANTE : qu'est-ce qui est le plus difficile ?", a: ["Enfiler un fil dans une aiguille"], d: ["Porter un sac de 10 kg", "Les deux autant", "Ni l'un ni l'autre"], src: "fcer" },
      { id: "c13", part: "anam", q: "Signes à rechercher à l'anamnèse d'un AVC cérébelleux (plusieurs réponses) :", a: ["Nausées, vomissements, vertiges", "Chutes et direction des chutes", "Troubles de la déglutition"], d: ["Nombre de poussées", "Heures de prise de L-dopa"], src: "crC" },
      { id: "c14", part: "bilans", q: "Pourquoi faire le doigt-nez bras bien tendus ?", a: ["Le trajet est plus long : on voit mieux la dyschronométrie"], d: ["Pour tester la force du deltoïde", "Pour éviter le tremblement", "Pour tester la sensibilité"], src: "fcer" },
      { id: "c15", part: "bilans", q: "Les tests de coordination se font :", a: ["Yeux ouverts puis yeux fermés, en comparant les deux côtés"], d: ["Yeux fermés uniquement", "Du côté atteint uniquement", "Debout, pieds joints"], expl: "Une compensation visuelle est possible.", src: "fcer" },
      { id: "c16", part: "bilans", q: "Bilan postural du cérébelleux : les poussées déséquilibrantes se font…", a: ["Dans tous les sens"], d: ["Uniquement vers le côté atteint", "Uniquement vers l'arrière", "On ne pousse jamais un cérébelleux"], src: "fcer" },
      { id: "c17", part: "bilans", q: "Marche en tandem, en étoile, Fukuda : chez le cérébelleux on observe…", a: ["Des troubles dès le début, peu majorés yeux fermés, non latéralisés"], d: ["Une déviation du côté de la lésion, majorée yeux fermés", "Aucun trouble yeux ouverts", "Une déviation toujours vers la droite"], expl: "La déviation latéralisée et majorée yeux fermés oriente vers une atteinte vestibulaire.", src: "fcer" },
      { id: "c18", part: "bilans", q: "Le test des 10 m chez le cérébelleux est intéressant à condition…", a: ["D'avoir demandé avant la distance de marche"], d: ["Qu'il soit fait yeux fermés", "Qu'il soit fait sur tapis roulant", "Qu'il n'ait jamais chuté"], src: "fcer" },
      { id: "c19", part: "bilans", q: "Bilans en général NON nécessaires dans une atteinte purement cérébelleuse (plusieurs réponses) :", a: ["Sensitif", "Moteur (commande pyramidale)", "Motricité spontanée"], d: ["Coordination", "Équilibre"], src: "fcer" },
      { id: "c20", part: "ttt", q: "Pour l'équilibre du cérébelleux, au bilan comme en traitement :", a: ["On ne cherche pas à réduire sa base de sustentation au bilan ; on améliore la fonction avec cette base élargie"], d: ["On impose d'emblée les pieds joints", "On travaille uniquement yeux fermés", "On interdit la marche"], src: "fcer" },
      { id: "c21", part: "ttt", q: "Comment choisir la taille de la cible dans les exercices de dysmétrie ?", a: ["D'après le résultat du doigt-nez"], d: ["Toujours la plus petite possible", "Au hasard", "D'après le score de Berg"], src: "fcer" },
      { id: "c22", part: "ttt", q: "Pourquoi le tapis roulant est-il intéressant chez le cérébelleux ?", a: ["L'environnement visuel reste fixe pendant que les MI bougent"], d: ["Il renforce le quadriceps en excentrique", "Il supprime les nausées", "Il remplace le travail d'équilibre"], src: "fcer" },
      { id: "c23", part: "ttt", q: "Atteinte unilatérale : quel(s) membre(s) faire travailler ?", a: ["Les deux (coordination entre main saine et main atteinte)"], d: ["Uniquement le membre atteint", "Uniquement le membre sain"], src: "fcer" },
      { id: "c24", part: "obj", q: "Objectifs du cas du cours 4 (AVC cérébelleux droit J+28) (plusieurs réponses) :", a: ["Prévention des chutes", "Stimuler les réactions posturales", "Diminuer la dysmétrie"], d: ["Diminuer la spasticité du triceps sural", "Récupérer l'extension des doigts"], src: "cr4" }
    ],
    patients: [
      { id: "pc4b", nom: "Patiente 62 ans · AVC cérébelleux droit J+28", origine: "cours", src: "cr4", desc: "Dysmétrie droite modérée, talon-genou décomposé à droite, mouvements alternatifs irréguliers à droite, dysarthrie légère. SARA 14/40, Berg 35/56, tandem impossible, 10 m en 19 s avec surveillance. « Je perds l'équilibre et j'ai peur de tomber. »",
        attrs: { polygone: true, trembAction: "D", dysarthrie: true, anxiete: true, chute: true, aide: "deamb" } },
      { id: "pcerill", nom: "Illustration : syndrome cérébelleux statique", origine: "invente", src: "fcer", desc: "Polygone élargi, oscillations, bras écartés, démarche ébrieuse en zig-zag, nystagmus. Construite d'après la fiche de cours.",
        attrs: { polygone: true, nystagmus: true, chute: true, bras: "ecartes" } }
    ],
    cas: [
      { id: "casc4b", origine: "cours", src: ["cr4", "fcer", "crC"], patient: "pc4b", titre: "AVC cérébelleux droit J+28 (patiente de 62 ans)",
        fiche: "Patiente de 62 ans, AVC ischémique cérébelleux droit il y a 28 jours, sans atteinte du tronc cérébral documentée. Marchait sans aide technique avant. « Je perds l'équilibre et j'ai peur de tomber. »",
        etapes: [
          { type: "bilans", titre: "Choix et ordre des bilans", consigne: "Sélectionne les bilans utiles dans l'ordre.",
            ordre: ["Constat d'attitude", "Psycho-cognitif", "Douleur et cutané-trophique", "Fatigue", "Tonus", "Coordination", "Postural", "Équilibre", "Transferts", "Marche"],
            items: [
              { b: "Constat d'attitude", ok: true, r: "Faciès anxieux, polygone élargi, aide technique (tribune), tremblement d'effort." },
              { b: "Psycho-cognitif", ok: true, r: "Dysarthrie légère sans trouble majeur de la compréhension ; appréhension de la chute." },
              { b: "Douleur et cutané-trophique", ok: true, r: "Non précisé : rechercher hématomes et plaies dus aux chutes." },
              { b: "Fatigue", ok: true, r: "Non précisée : Borg, faiblesse qui diminue à la répétition." },
              { b: "Tonus", ok: true, r: "Normotonie, ROT symétriques (cas du cours).", tests: ["stewart"] },
              { b: "Coordination", ok: true, r: "Doigt-nez : dysmétrie droite modérée. Talon-genou : décomposition à droite. Mouvements alternatifs rapides irréguliers à droite.", tests: ["doigtNez", "talonGenou", "marionnettes"] },
              { b: "Postural", ok: true, r: "Pieds joints instable, surveillance rapprochée ; tandem impossible sans aide ; réactions posturales retardées et parfois excessives.", tests: ["romberg", "postural"] },
              { b: "Équilibre", ok: true, r: "SARA 14/40 ; Berg 35/56.", tests: ["berg"] },
              { b: "Transferts", ok: true, r: "Autonomes avec surveillance." },
              { b: "Marche", ok: true, r: "10 m en 19 s avec surveillance rapprochée ; avec main courante possible mais irrégulière ; sans appui instabilité majorée ; demi-tour déstabilisant en plusieurs pas ; escaliers avec assistance et rampe.", tests: ["tmw10", "tug"] },
              { b: "Sensibilité (pic-touche, sens de position)", ok: false, r: "Conservée ; dans une atteinte purement cérébelleuse, ce bilan n'est en principe pas nécessaire (fiche)." },
              { b: "Bilan moteur 0-1-2 de l'hémiplégique", ok: false, r: "Pas d'atteinte pyramidale : non pertinent." }
            ] },
          { type: "choix", titre: "Objectifs", consigne: "Coche les objectifs pertinents.", src: "cr4",
            items: [
              { t: "Prévenir les chutes et diminuer l'appréhension", ok: true },
              { t: "Stimuler les réactions posturales, améliorer l'équilibre", ok: true },
              { t: "Acquérir la station debout sans appui des MS", ok: true },
              { t: "Diminuer la dysmétrie, améliorer la coordination MS et MI", ok: true },
              { t: "Maintenir l'indépendance et la sécurité des transferts", ok: true },
              { t: "Améliorer la vitesse de marche", ok: true },
              { t: "Orienter vers une prise en charge pluridisciplinaire", ok: true },
              { t: "Diminuer la spasticité du triceps sural", ok: false, why: "Pas de spasticité : normotonie, pas d'atteinte pyramidale." },
              { t: "Réduire d'emblée sa base de sustentation, pieds joints", ok: false, why: "On améliore la fonction avec la base élargie." }
            ] },
          { type: "choix", titre: "Exercices", consigne: "Coche les exercices adaptés.", src: "cr4",
            items: [
              { t: "Barres parallèles, step parallèle aux barres : monter et descendre de côté, puis lâcher les mains (côté atteint d'abord), accélérer", ok: true },
              { t: "Toucher une balle posée sur un cône, d'abord lestée, puis sans la vue", ok: true },
              { t: "Balle à déplacer entre des cerceaux, cible choisie d'après le doigt-nez", ok: true },
              { t: "Marche avec arrêts, demi-tours et double tâche", ok: true },
              { t: "Passer tout de suite les exercices yeux fermés", ok: false, why: "On progresse yeux ouverts → fermés, en surveillant la dépendance visuelle." },
              { t: "Travailler uniquement le membre atteint", ok: false, why: "Travailler les deux membres, en coordination." }
            ] }
        ] }
    ]
  };

  // ======== AVC en réanimation (phase aiguë) ========
  const rea = {
    id: "avc-rea", cell: "neuro", titre: "AVC en réanimation (phase aiguë)", court: "AVC en réa",
    statut: "D'après le cours MSP Respi-Neuro du 19/12/2024 (pas encore de CR 2026-27 sur ce thème).",
    resume: [
      "<b>En réanimation, le respiratoire passe avant le neurologique.</b>",
      "<b>En entrant</b> : Glasgow (3 à 15), monitoring (FC, TA et surtout PAM, SpO2 avec FiO2, FR), installation (proclive ≤ 35° : prévention des pneumonies sous ventilation et de l'HTIC), sondes, voies centrales, drain intracrânien (hauteur du lit).",
      "<b>PAM < 60 mmHg</b> : risque de malaise, on ne verticalise pas.",
      "<b>Glasgow 3/15 chez un patient intubé</b> : la seule technique de kiné respi possible est l'aspiration endotrachéale (± drainage postural avant d'aspirer).",
      "<b>Complications</b> : pneumonie d'inhalation (troubles de la déglutition), escarres (talons, occiput, coccyx), positions vicieuses (flexion, abduction, rotation externe ; équin +++), polyneuropathie des soins intensifs, hypotension orthostatique au premier lever (patient flasque).",
      "<b>Mobiliser du distal vers le proximal</b>. En réa, on ne s'occupe pas de la spasticité en priorité."
    ],
    pro: [
      { id: "def", titre: "Contexte et cas du cours", src: ["rea24"], html: `
<p><b>Cas (19/12/2024)</b> : homme de 65 ans, plégie de l'hémicorps droit et dysarthrie pendant un repas, jusqu'à la perte de conscience. <b>AVC hémorragique thalamo-capsulaire avec inondation ventriculaire</b>, drainé chirurgicalement (CT cérébral). Insuffisance respiratoire aiguë en USI, intubation, <b>pneumonie d'inhalation</b>, troubles de la déglutition, à jeun strict, grabataire, légère rhabdomyolyse. 15 jours d'USI. Professeur de maths, sportif (basket), vit avec sa femme et ses 2 enfants dans une maison à étage ; autonome et indépendant avant.</p>
<p>Puis : mutique, flasque, testing 0/5, début de spasticité des fléchisseurs des doigts, sensibilité difficile à évaluer ; apraxie ++.</p>
<p><b>Hémorragie intracrânienne</b> : le sang augmente la pression intracrânienne (HTIC) jusqu'à l'engagement du tronc cérébral dans le trou occipital (centres cardio-respiratoires) : risque vital → volet crânien, drainage. Réflexe pupillaire aboli = mauvais pronostic.</p>` },
      { id: "bilans", titre: "Bilans en réanimation", src: ["rea24"], html: `
<ul>
<li><b>Glasgow</b> en premier (3/15 : coma profond).</li>
<li><b>Monitoring</b> : FC ; TA, surtout la <b>PAM</b> (perfusion du cerveau et du rein) : si PAM < 60 mmHg, pas de verticalisation ; SpO2 (reflet de la SaO2 mesurée à la gazométrie) toujours lue avec la FiO2 ; FR (donnée par les électrodes de l'ECG, peu précise) ; température.</li>
<li><b>Installation</b> : proclive maximal 35° (prévention des pneumonies sous ventilation et de l'HTIC). Attention à la hauteur du lit s'il y a un drain intracrânien, aux cathéters (artéfacts) et à la voie centrale (sous-clavière : risque de pneumothorax à la pose).</li>
<li><b>Respiratoire</b> : auscultation (bases, dômes, carène : 2-3 travers de doigt sous la fourchette sternale, puis comparer les deux bronches souches). Encombrement ? Latéralisé ? Une intubation sélective donne une bonne ventilation d'un seul côté → risque d'atélectasie.</li>
<li><b>Ventilation (VAC)</b> : Vt 6 à 8 ml/kg de poids idéal, pression de plateau < 30 cmH2O, FR ≈ 15/min, FiO2 réglée selon la SpO2, PEEP à partir de 5 cmH2O (recrutement alvéolaire ; attention à la baisse de TA), I/E 1/2 (1/3 si trapping).</li>
<li><b>Cutané-trophique</b> : escarres (talons, occiput, coccyx), rougeurs, chaleur, fragilité de la peau (corticoïdes).</li>
<li><b>Neuro-orthopédique</b> : positions vicieuses (flexion, abduction, rotation externe), <b>équin +++</b> (attelles de nuit), polyneuropathie des soins intensifs.</li>
<li><b>Moteur</b> : testing quand le patient coopère et comprend ; bilan Bobath (fonctionnel) ensuite.</li>
<li><b>Au premier lever</b> : test d'hypotension orthostatique (patient flasque : le sang stagne dans les MI).</li></ul>` },
      { id: "ttt", titre: "Prise en charge", src: ["rea24"], html: `
<ul><li><b>Réa > neuro</b> : priorité au respiratoire.</li><li>Glasgow 3/15, intubé : <b>aspiration endotrachéale</b> (surtout au niveau des bronches souches) ; si la bronche gauche est difficile à aspirer : drainage postural (décubitus latéral droit chez le patient ventilé, à l'inverse de la ventilation spontanée) puis aspiration ; dégonfler le ballonnet avant de mobiliser le tube.</li>
<li>Mobilisations du distal vers le proximal, prévention de l'équin et des positions vicieuses, prévention des escarres.</li>
<li>Au retour en revalidation : surveiller les surinfections bronchiques à la reprise de l'alimentation (fausses routes).</li>
<li>Polyneuropathie des soins intensifs : liée aux médicaments (sédatifs…), à l'état inflammatoire, au sepsis et à l'alitement ; atteinte du distal vers le proximal.</li></ul>
<p class="warn">⚠ La note dit « Glasgow 3/15 = mort ». C'est le score minimal (coma profond, aucune réponse), pas un constat de décès. Elle dit aussi « la spasticité se mesure par Tardieu et non Ashworth » : Tardieu tient compte de la vitesse, mais l'Ashworth modifiée reste utilisée en cours (voir Remarques MSP).</p>` }
    ],
    qcm: [
      { id: "r1", part: "def", q: "En réanimation, chez un patient AVC intubé, quelle prise en charge est prioritaire ?", a: ["Le respiratoire"], d: ["La spasticité", "La marche", "Le bilan sensitif complet"], src: "rea24" },
      { id: "r2", part: "bilans", q: "Première chose à évaluer en entrant dans la chambre de réanimation :", a: ["Le score de Glasgow"], d: ["Le testing musculaire", "Le score de Berg", "L'Ashworth"], src: "rea24" },
      { id: "r3", part: "bilans", q: "PAM < 60 mmHg :", a: ["Risque de malaise : on ne verticalise pas"], d: ["On verticalise pour faire remonter la tension", "C'est la valeur normale", "Cela n'intéresse pas le kiné"], src: "rea24" },
      { id: "r4", part: "bilans", q: "Proclive maximal recommandé pour le patient de réanimation :", a: ["35°"], d: ["90°", "10°", "Toujours à plat"], expl: "Prévention des pneumonies sous ventilation et de l'hypertension intracrânienne.", src: "rea24" },
      { id: "r5", part: "ttt", q: "Patient intubé, Glasgow 3/15 : technique de kiné respi possible ?", a: ["L'aspiration endotrachéale"], d: ["La spirométrie incitative", "L'ELTGOL", "La toux dirigée"], src: "rea24" },
      { id: "r6", part: "bilans", q: "La SpO2 doit toujours être interprétée avec :", a: ["La FiO2"], d: ["La FC seule", "Le Glasgow", "La température"], src: "rea24" },
      { id: "r7", part: "bilans", q: "Zones d'escarres à surveiller chez le patient alité en réa (plusieurs réponses) :", a: ["Talons", "Occiput", "Coccyx"], d: ["Paume des mains", "Front"], src: "rea24" },
      { id: "r8", part: "bilans", q: "Au premier lever d'un AVC flasque, il faut surveiller :", a: ["Une hypotension orthostatique"], d: ["Une hypertension réactionnelle uniquement", "Un clonus", "Une crise d'asthme"], src: "rea24" },
      { id: "r9", part: "ttt", q: "Les mobilisations en réanimation se font de préférence :", a: ["Du distal vers le proximal"], d: ["Du proximal vers le distal", "Uniquement à l'épaule", "Jamais avant la sortie de réa"], src: "rea24" },
      { id: "r10", part: "def", q: "Risque majeur d'une hémorragie intracrânienne importante :", a: ["L'hypertension intracrânienne avec engagement du tronc cérébral"], d: ["L'hypotension artérielle", "La spasticité précoce", "L'aphasie isolée"], src: "rea24" },
      { id: "r11", part: "bilans", q: "Position vicieuse typique du MI chez le patient alité :", a: ["Flexion, abduction, rotation externe, avec équin"], d: ["Extension, adduction, rotation interne", "Talus", "Aucune"], src: "rea24" }
    ],
    patients: [
      { id: "prea", nom: "Homme 65 ans · AVC hémorragique thalamo-capsulaire en réanimation", origine: "cours", src: "rea24", desc: "Hémiplégie droite flasque, intubé et ventilé, pneumonie d'inhalation, troubles de la déglutition, grabataire, 15 jours d'USI.",
        attrs: { hemi: "D", flasque: true, intube: true, escarre: ["talonD", "talonG", "sacrum"], fatigue: true } }
    ],
    cas: [
      { id: "casrea", origine: "cours", src: ["rea24"], patient: "prea", titre: "AVC hémorragique en réanimation (homme de 65 ans)",
        fiche: "Homme de 65 ans, AVC hémorragique thalamo-capsulaire avec inondation ventriculaire drainé ; intubé, ventilé, sédaté ; pneumonie d'inhalation ; Glasgow 3/15.",
        etapes: [
          { type: "choix", titre: "En entrant dans la chambre", consigne: "Coche ce que tu évalues en priorité.", src: "rea24",
            items: [
              { t: "Glasgow", ok: true }, { t: "Paramètres vitaux, dont la PAM", ok: true }, { t: "SpO2 lue avec la FiO2", ok: true }, { t: "Installation (proclive ≤ 35°), drains, sondes, voies", ok: true }, { t: "Auscultation (encombrement, latéralisation)", ok: true }, { t: "Escarres et positions vicieuses (équin)", ok: true },
              { t: "Échelle de Tardieu sur tous les muscles", ok: false, why: "En réa, la spasticité n'est pas la priorité." }, { t: "Test de marche de 10 m", ok: false, why: "Impossible et non pertinent." }
            ] },
          { type: "choix", titre: "Prise en charge", consigne: "Coche les actions adaptées.", src: "rea24",
            items: [
              { t: "Aspiration endotrachéale", ok: true }, { t: "Drainage postural puis aspiration si une bronche souche est encombrée", ok: true }, { t: "Mobilisations du distal vers le proximal", ok: true }, { t: "Prévention de l'équin (attelles de nuit)", ok: true },
              { t: "Verticalisation malgré une PAM à 55 mmHg", ok: false, why: "PAM < 60 mmHg : on ne verticalise pas." }, { t: "Spirométrie incitative", ok: false, why: "Impossible chez un patient sédaté, Glasgow 3/15." }
            ] }
        ] }
    ]
  };

  // ======== Autres territoires ========
  const terr = {
    id: "avc-territoires", cell: "neuro", titre: "AVC : vue d'ensemble des territoires", court: "Territoires",
    statut: "Fiche de synthèse des territoires (fiche de cours), pour reconnaître le tableau à partir du diagnostic de la fiche patient.",
    resume: [
      "<b>Cérébral antérieur</b> : hémiparésie à prédominance <b>crurale</b> (MI), troubles sensitifs surtout au MI, syndrome frontal (comportement).",
      "<b>Sylvien superficiel</b> : brachio-facial + HLH + aphasie (G) ou négligence (D). <b>Sylvien profond</b> : hémiplégie massive et proportionnelle.",
      "<b>Cérébral postérieur</b> : superficiel → HLH ; profond → <b>syndrome thalamique</b> (hémi-hypoesthésie, douleur thalamique).",
      "<b>Tronc cérébral</b> : <b>syndrome alterne</b> (nerfs crâniens du côté de la lésion, hémiplégie de l'autre côté).",
      "<b>Wallenberg</b> (bulbaire latéral) : côté de la lésion → nerfs crâniens, vestibulaire, cérébelleux ; côté opposé → hémianesthésie thermo-algique, sans hémiplégie.",
      "<b>Cérébelleux</b> : hémisyndrome cérébelleux homolatéral. <b>Tronc basilaire</b> : locked-in syndrome."
    ],
    pro: [{ id: "def", titre: "Tableau des territoires", src: ["fiche"], html: `<table class="mt"><tr><th>Territoire</th><th>Tableau</th></tr>
<tr><td>Cérébral antérieur</td><td>Trouble du tonus ; hémiparésie voire hémiplégie avec troubles sensitifs prédominant au MI ; syndrome frontal.</td></tr>
<tr><td>Sylvien superficiel</td><td>Hémiparésie sensitivo-motrice brachio-faciale, HLH ; G : aphasie, apraxie ; D : héminégligence, anosognosie.</td></tr>
<tr><td>Sylvien profond</td><td>Hémiplégie massive, proportionnelle, controlatérale ; troubles cognitifs selon le côté.</td></tr>
<tr><td>Cérébral postérieur superficiel</td><td>HLH.</td></tr>
<tr><td>Cérébral postérieur profond (thalamique)</td><td>Hémi-hypoesthésie, douleur thalamique de l'hémicorps.</td></tr>
<tr><td>Tronc cérébral</td><td>Syndrome alterne : nerfs crâniens homolatéraux, hémiplégie controlatérale.</td></tr>
<tr><td>Bulbaire latéral (Wallenberg)</td><td>Homolatéral : nerfs crâniens, vestibulaire, cérébelleux ; controlatéral : hémianesthésie thermo-algique (sans hémiplégie).</td></tr>
<tr><td>Cérébelleux</td><td>Hémisyndrome cérébelleux homolatéral.</td></tr>
<tr><td>Tronc basilaire</td><td>Locked-in syndrome.</td></tr></table>
<p class="small">« AVC frontal pur : plus de symptômes comportementaux que moteurs » ; « 80 % des AVC sont sylviens » (CR réa 19/12/2024).</p>` }],
    qcm: [
      { id: "t1", part: "def", q: "Hémiparésie à prédominance crurale (MI) + syndrome frontal :", a: ["AVC cérébral antérieur"], d: ["AVC sylvien superficiel", "AVC cérébral postérieur", "AVC cérébelleux"], src: "fiche" },
      { id: "t2", part: "def", q: "Syndrome alterne (nerfs crâniens d'un côté, hémiplégie de l'autre) :", a: ["AVC du tronc cérébral"], d: ["AVC sylvien profond", "AVC cérébelleux", "AVC cérébral antérieur"], src: "fiche" },
      { id: "t3", part: "def", q: "Syndrome de Wallenberg (bulbaire latéral), du côté OPPOSÉ à la lésion :", a: ["Hémianesthésie thermo-algique"], d: ["Hémiplégie massive", "Signes cérébelleux", "Atteinte des nerfs crâniens"], src: "fiche" },
      { id: "t4", part: "def", q: "Syndrome thalamique (cérébral postérieur profond) :", a: ["Hémi-hypoesthésie et douleur thalamique"], d: ["Aphasie de Broca", "Locked-in syndrome", "Hémisyndrome cérébelleux"], src: "fiche" },
      { id: "t5", part: "def", q: "Occlusion du tronc basilaire :", a: ["Locked-in syndrome"], d: ["Syndrome frontal", "HLH isolée", "Héminégligence"], src: "fiche" },
      { id: "t6", part: "def", q: "Proportion des AVC qui sont sylviens (CR du 19/12/2024) :", a: ["Environ 80 %"], d: ["Environ 20 %", "Environ 50 %", "Moins de 5 %"], src: "rea24" }
    ],
    patients: [{ id: "pthal", nom: "Illustration : syndrome thalamique (cérébral postérieur profond)", origine: "invente", src: "fiche", desc: "Hémi-hypoesthésie gauche et douleurs thalamiques diffuses (picotements, coups de poignard). Construite d'après la fiche de cours.", attrs: { douleurs: [{ zone: "epauleG", type: "neuropathique" }, { zone: "cuisseG", type: "neuropathique" }, { zone: "mainG", type: "neuropathique" }] } }],
    cas: []
  };

  // ======== Un cours par territoire ========
  Object.assign(SRC, {
    cen: { t: "Référentiel du Collège des enseignants de neurologie (CEN), item « Accidents vasculaires cérébraux » : sémiologie des territoires artériels", k: "Référence hors de tes cours" },
    lise: { t: "Notes MSP Neuro de Lise, 29/02 et 14/03/2024 : infarctus médullaire + AVC sylvien gauche (homme de 70 ans), avec traitement", k: "Notes d'une étudiante (année antérieure)", f: LIB + "02_NEURO › B › Notes de cours MSP de Lise (annee anterieure) › 2902 AVC médullaire et sylvien + TTT.docx" },
    fbm: { t: "Fiche de cours « Blessé médullaire » (fondamentaux neuro)", k: "Fiche de cours", f: LIB + "02_NEURO › C › BLÉSSÉ MÉDULLAIRE.docx" },
    cenMed: { t: "Référentiel du Collège des enseignants de neurologie (CEN) : syndromes médullaires, infarctus médullaire (artère spinale antérieure)", k: "Référence hors de tes cours" }
  });
  const T = (id, titre, court, o) => ({ id, cell: "neuro", titre, court, statut: "Cours par territoire : ta fiche donne la base ; les compléments marqués « hors de tes cours » viennent du référentiel de neurologie. Signale-moi tout écart avec ton prof.", cas: [], ...o });
  const kineTerr = (items) => `<ul>${items.map(x => `<li>${x}</li>`).join("")}</ul>`;

  const aca = T("avc-aca", "AVC de l'artère cérébrale antérieure", "Cérébrale antérieure", {
    resume: [
      "<b>Territoire</b> : face interne (médiale) des lobes frontal et pariétal, dont le lobule paracentral (zone motrice et sensitive du MI), et la partie antérieure du corps calleux.",
      "<b>Signe phare</b> : hémiparésie controlatérale à <b>prédominance crurale</b> (MI ≫ MS, face peu ou pas atteinte), avec troubles sensitifs surtout au MI.",
      "<b>Syndrome frontal</b> : apathie, aboulie, troubles du comportement (désinhibition), grasping (préhension forcée), persévérations.",
      "<b>Autres</b> : troubles sphinctériens (incontinence urinaire) ; apraxie de la main gauche si le corps calleux est touché (déconnexion calleuse). Atteinte bilatérale : paraparésie et mutisme akinétique.",
      "<b>En kiné</b> : la marche est au premier plan (verrouillage du genou, releveurs, passage du pas) ; adapter les consignes au syndrome frontal (simples, une à la fois, cadre, sécurité, motivation)."
    ],
    pro: [
      { id: "def", titre: "Territoire et tableau clinique", src: ["fiche", "cen"], html: `<p>L'artère cérébrale antérieure (branche de la carotide interne) irrigue la <b>face médiale</b> des lobes frontal et pariétal, dont le <b>lobule paracentral</b>, où se trouve la représentation du <b>membre inférieur</b> (homonculus), ainsi que la partie antérieure du <b>corps calleux</b>.</p>
<p><b>Ta fiche de cours</b> : trouble du tonus ; hémiparésie voire hémiplégie avec troubles sensitifs prédominant aux MI ; syndrome frontal (troubles du comportement).</p>
<p><b>Compléments (référentiel de neurologie)</b> :</p><ul><li>Déficit moteur <b>controlatéral, à prédominance crurale</b> ; face et MS peu atteints.</li><li>Troubles sensitifs à prédominance crurale.</li><li><b>Syndrome frontal</b> : apathie, aboulie (manque d'initiative), désinhibition, <b>grasping</b> (préhension forcée de la main), persévérations.</li><li><b>Troubles sphinctériens</b> : incontinence urinaire.</li><li>Atteinte du corps calleux : <b>apraxie de la main gauche</b> (déconnexion calleuse).</li><li>Infarctus bilatéral : paraparésie et mutisme akinétique.</li></ul>` },
      { id: "kine", titre: "Particularités du bilan et de la prise en charge", src: ["fiche", "cen", "crC"], html: kineTerr([
        "<b>Constat et psycho-cognitif</b> : comportement (apathie, désinhibition, impulsivité), compréhension et exécution des consignes, initiative. Échelles cognitives selon le cours (MMSE) ; demander l'avis de la famille.",
        "<b>Moteur</b> : bilan 0-1-2 en insistant sur le MI (verrouillage du genou, flexion de genou, releveurs, stabilisation de hanche) ; grasping (le patient ne lâche pas l'objet).",
        "<b>Sensibilité</b> : surtout au MI (sens de position du gros orteil, pic-touche de la plante du pied).",
        "<b>Fonctionnel</b> : transferts, équilibre, marche (steppage, fauchage, contrôle du genou), sécurité (risque de chute lié à l'impulsivité).",
        "<b>Traitement</b> : marche, transfert d'appui, contrôle du genou, passage du pas ; consignes courtes, une à la fois, cadre structuré, renforcement positif ; travail en situation fonctionnelle ; prévention des chutes ; lien avec l'équipe pour les troubles sphinctériens."]) }
    ],
    qcm: [
      { id: "a1", part: "def", q: "Un AVC de la cérébrale antérieure donne une hémiparésie à prédominance :", a: ["Crurale (membre inférieur)"], d: ["Brachio-faciale", "Proportionnelle (face, MS et MI égaux)", "Faciale isolée"], src: "fiche" },
      { id: "a2", part: "def", q: "Pourquoi le MI est-il le plus touché dans l'AVC cérébral antérieur ?", a: ["L'artère irrigue la face médiale de l'hémisphère (lobule paracentral), où est représenté le membre inférieur"], d: ["Parce que la capsule interne est toujours atteinte", "Parce que le cervelet est touché", "Parce que la moelle est ischémiée"], src: "cen" },
      { id: "a3", part: "def", q: "Signes du syndrome frontal (plusieurs réponses) :", a: ["Apathie, aboulie", "Désinhibition", "Grasping (préhension forcée)"], d: ["Hémianopsie latérale homonyme", "Nystagmus"], src: "cen" },
      { id: "a4", part: "def", q: "Trouble souvent associé à l'AVC cérébral antérieur :", a: ["Incontinence urinaire"], d: ["Diplopie", "Hémianesthésie thermo-algique croisée", "Locked-in syndrome"], src: "cen" },
      { id: "a5", part: "def", q: "Atteinte de la partie antérieure du corps calleux :", a: ["Apraxie de la main gauche (déconnexion calleuse)"], d: ["Aphasie de Wernicke", "Syndrome de Claude Bernard-Horner", "Tremblement de repos"], src: "cen" },
      { id: "a6", part: "kine", q: "Comment adapter tes consignes à un patient avec syndrome frontal ?", a: ["Consignes courtes, une à la fois, dans un cadre structuré"], d: ["Donner toute la séance d'un coup au début", "Ne jamais lui parler pendant l'exercice", "Le laisser choisir seul tous les exercices"], src: "cen" },
      { id: "a7", part: "kine", q: "Priorité fonctionnelle fréquente après un AVC cérébral antérieur :", a: ["La marche (verrouillage du genou, releveurs, passage du pas)"], d: ["La préhension fine", "La déglutition", "La rééducation vestibulaire"], src: "fiche" }
    ],
    patients: [{ id: "paca", nom: "Illustration : AVC cérébral antérieur gauche", origine: "invente", src: "fiche", desc: "Hémiparésie droite à prédominance crurale (steppage droit), syndrome frontal. Construite d'après la fiche de cours et le référentiel.", attrs: { steppage: "D", frontal: true, aide: "canne", aideCote: "G", chute: true } }]
  });

  const sylvSP = T("avc-sylv-sp", "AVC sylvien superficiel, profond et total", "Sylvien : superficiel / profond", {
    resume: [
      "<b>Artère cérébrale moyenne (sylvienne)</b> : la plus souvent touchée (environ 80 % des AVC selon ton CR du 19/12/2024).",
      "<b>Superficiel</b> (branches corticales : face latérale de l'hémisphère) : hémiparésie sensitivo-motrice à prédominance <b>brachio-faciale</b>, HLH, troubles cognitifs selon le côté.",
      "<b>Profond</b> (artères lenticulo-striées : capsule interne, noyaux gris) : hémiplégie <b>massive et proportionnelle</b> (face, MS et MI également atteints).",
      "<b>Total</b> (superficiel + profond) : hémiplégie massive, hémianesthésie, HLH, aphasie globale (gauche) ou négligence (droite), déviation de la tête et des yeux vers la lésion.",
      "<b>Hémisphère gauche</b> : aphasie (Broca : non fluente, compréhension relativement préservée ; Wernicke : fluente, compréhension altérée), apraxie. <b>Hémisphère droit</b> : héminégligence gauche, anosognosie."
    ],
    pro: [
      { id: "def", titre: "Superficiel, profond, total", src: ["fiche", "cen", "rea24"], html: `<table class="mt"><tr><th></th><th>Superficiel</th><th>Profond</th></tr>
<tr><td>Vaisseaux</td><td>Branches corticales de l'artère cérébrale moyenne</td><td>Artères lenticulo-striées (perforantes)</td></tr>
<tr><td>Structures</td><td>Face latérale de l'hémisphère (cortex moteur et sensitif du MS et de la face, aires du langage, radiations optiques)</td><td>Capsule interne, noyaux gris centraux</td></tr>
<tr><td>Déficit moteur</td><td>Hémiparésie sensitivo-motrice à prédominance <b>brachio-faciale</b></td><td>Hémiplégie <b>massive, proportionnelle</b></td></tr>
<tr><td>Vision</td><td>HLH (atteinte des radiations optiques)</td><td>Pas de HLH en général</td></tr>
<tr><td>Cognition</td><td>Gauche : aphasie, apraxie ; droit : négligence, anosognosie</td><td>Ta fiche cite les mêmes troubles selon le côté ; ils sont souvent moins marqués que dans l'atteinte corticale</td></tr></table>
<p><b>Sylvien total</b> : hémiplégie massive, hémianesthésie, HLH, aphasie globale (gauche) ou négligence sévère (droite), déviation de la tête et du regard <b>vers la lésion</b> (le patient « regarde sa lésion »).</p>
<p><b>Aphasies</b> : <b>Broca</b> (branche antérieure, frontal) : non fluente, manque du mot, compréhension relativement préservée ; <b>Wernicke</b> (branche postérieure, temporal) : fluente, jargon, compréhension altérée, souvent sans conscience du trouble ; <b>globale</b> : expression et compréhension.</p>
<p class="small">Pour le bilan, les objectifs et le traitement de l'hémiplégique : voir la fiche « AVC sylvien ».</p>` },
      { id: "kine", titre: "Ce qui change pour le kiné", src: ["fiche", "crC", "cr1211"], html: kineTerr([
        "<b>Aphasie</b> (gauche) : consignes simples, démonstration, gestes, vérifier la compréhension ; MMSE peu adapté ; latéralité par observation ; logopédie.",
        "<b>Héminégligence</b> (droit) : chercher la déviation de la tête et du regard, le bras « oublié », l'extinction sensitive ; sécurité (chocs, hématomes du côté négligé, fauteuil).",
        "<b>HLH</b> : apprendre à balayer du regard le côté aveugle ; disposer les objets en tenant compte du champ visuel ; risque de chute et de chocs de ce côté.",
        "<b>Profond, hémiplégie proportionnelle</b> : MS et MI aussi atteints l'un que l'autre ; pronostic de marche lié au contrôle du tronc et du MI.",
        "<b>Brachio-facial</b> : le MS est la priorité fonctionnelle (préhension, épaule douloureuse à prévenir)."]) }
    ],
    qcm: [
      { id: "s1", part: "def", q: "Hémiplégie massive et proportionnelle (face, MS et MI également atteints) :", a: ["Sylvien profond"], d: ["Sylvien superficiel", "Cérébral antérieur", "Cérébral postérieur superficiel"], src: "fiche" },
      { id: "s2", part: "def", q: "Hémiparésie brachio-faciale + HLH + aphasie :", a: ["Sylvien superficiel gauche"], d: ["Sylvien superficiel droit", "Sylvien profond droit", "Cérébral antérieur gauche"], src: "fiche" },
      { id: "s3", part: "def", q: "Vaisseaux du territoire sylvien profond :", a: ["Les artères lenticulo-striées (perforantes)"], d: ["Les branches corticales de l'artère cérébrale moyenne", "L'artère cérébrale postérieure", "La PICA"], src: "cen" },
      { id: "s4", part: "def", q: "Dans un AVC sylvien total, la tête et le regard sont déviés :", a: ["Vers le côté de la lésion"], d: ["Vers le côté paralysé", "Vers le haut", "Il n'y a pas de déviation"], src: "cen" },
      { id: "s5", part: "def", q: "Aphasie de Wernicke (plusieurs réponses) :", a: ["Fluente, avec jargon", "Compréhension altérée"], d: ["Non fluente avec compréhension préservée", "Toujours associée à une HLH droite exclusivement"], src: "cen" },
      { id: "s6", part: "def", q: "L'HLH d'un AVC sylvien superficiel est due à l'atteinte :", a: ["Des radiations optiques"], d: ["Du nerf optique d'un seul œil", "Du cervelet", "De la capsule interne"], src: "cen" },
      { id: "s7", part: "kine", q: "Patient avec HLH gauche : stratégie de rééducation", a: ["Apprendre à balayer du regard le côté aveugle et sécuriser l'environnement"], d: ["Lui cacher l'œil gauche", "Ignorer le champ visuel, il récupérera seul", "Placer tous les objets du côté aveugle sans le prévenir"], src: "cen" }
    ],
    patients: [
      { id: "psylvsp", nom: "Illustration : sylvien superficiel gauche", origine: "invente", src: "fiche", desc: "Hémiparésie droite brachio-faciale, HLH droite, aphasie.", attrs: { hemi: "D", hlh: "D", aphasie: true } },
      { id: "psylvtot", nom: "Illustration : sylvien total droit", origine: "invente", src: "fiche", desc: "Hémiplégie gauche massive, HLH gauche, héminégligence, tête et regard déviés vers la droite (la lésion).", attrs: { hemi: "G", hlh: "G", regard: "D", aide: "fauteuil" } }
    ]
  });

  const acp = T("avc-acp", "AVC de l'artère cérébrale postérieure (superficiel et thalamique)", "Cérébrale postérieure", {
    resume: [
      "<b>Territoire vertébro-basilaire</b>. L'artère cérébrale postérieure irrigue le lobe occipital, la face inférieure du lobe temporal (hippocampe) et, par ses branches profondes, le <b>thalamus</b>.",
      "<b>Superficiel</b> : <b>HLH</b> controlatérale (souvent isolée), ± alexie sans agraphie (gauche), agnosie visuelle, troubles de la mémoire ; bilatéral : cécité corticale.",
      "<b>Profond = syndrome thalamique</b> : hémi-hypoesthésie controlatérale (surtout la sensibilité profonde), puis <b>douleurs thalamiques</b> (centrales, neuropathiques, souvent d'apparition retardée), ataxie sensitive.",
      "<b>Douleurs thalamiques</b> : fortes, diffuses, en picotements ou coups de poignard ; elles limitent toutes les amplitudes. Ta fiche : « le kiné n'a pas de pouvoir dessus ».",
      "<b>En kiné</b> : compensation visuelle et sécurité (HLH), proprioception et équilibre (Romberg souvent positif si l'ataxie sensitive domine), douleur : ne pas provoquer, éducation, travail fonctionnel."
    ],
    pro: [
      { id: "def", titre: "Superficiel et profond (thalamique)", src: ["fiche", "cen"], html: `<p><b>Ta fiche</b> : cérébral postérieur superficiel → HLH ; profond → syndrome thalamique (hémi-hypoesthésie, douleur thalamique de l'hémicorps).</p>
<p><b>Superficiel (cortex occipital, temporal inférieur)</b> : <b>HLH controlatérale</b>, souvent isolée (sans déficit moteur) ; selon le côté : alexie sans agraphie (gauche), agnosie visuelle ou prosopagnosie (reconnaissance des visages), troubles de la mémoire (hippocampe). Atteinte bilatérale : cécité corticale, parfois niée par le patient (anosognosie).</p>
<p><b>Profond (thalamus) = syndrome thalamique</b> : hémi-hypoesthésie controlatérale à toutes les modalités, surtout la sensibilité profonde (→ ataxie sensitive, aggravée yeux fermés) ; <b>douleurs centrales</b> de l'hémicorps, souvent d'apparition <b>retardée</b> (semaines, mois), avec allodynie et hyperpathie ; parfois hémiparésie transitoire (capsule interne voisine) et mouvements anormaux.</p>
<p><b>Douleurs thalamiques</b> (fiche) : fortes, intenses, diffuses, picotements, coups de poignard ; elles limitent toutes les amplitudes ; le kiné n'a pas de pouvoir direct dessus (traitement médicamenteux).</p>` },
      { id: "kine", titre: "Bilan et prise en charge", src: ["fiche", "cen"], html: kineTerr([
        "<b>HLH</b> : test du champ visuel au doigt (comparer les deux hémichamps) ; observer les chocs et la marche dans les passages ; balayage visuel, repères, sécurité du domicile.",
        "<b>Sensibilité</b> : superficielle et profonde (sens de position, kinesthésie), stéréognosie ; Romberg ; équilibre yeux ouverts et fermés.",
        "<b>Douleur</b> : localisation, type (code couleur neuropathique), allodynie au toucher ; éviter les stimulations qui la déclenchent ; adapter les prises ; travailler en fonctionnel ; collaboration médicale.",
        "<b>Traitement</b> : proprioception et sensibilité (voir AVC sylvien), équilibre avec et sans la vue, compensation visuelle, marche en environnement varié, éducation à la douleur."]) }
    ],
    qcm: [
      { id: "p1", part: "def", q: "AVC cérébral postérieur superficiel : signe principal", a: ["HLH controlatérale, souvent isolée"], d: ["Hémiplégie massive", "Syndrome frontal", "Tétraplégie"], src: "fiche" },
      { id: "p2", part: "def", q: "Le syndrome thalamique associe (plusieurs réponses) :", a: ["Hémi-hypoesthésie controlatérale", "Douleurs centrales de l'hémicorps"], d: ["Hémisyndrome cérébelleux homolatéral", "Paralysie faciale périphérique"], src: "fiche" },
      { id: "p3", part: "def", q: "Les douleurs thalamiques apparaissent souvent :", a: ["De façon retardée (semaines ou mois après l'AVC)"], d: ["Uniquement dans la première heure", "Jamais au repos", "Seulement en cas d'hémorragie"], src: "cen" },
      { id: "p4", part: "def", q: "Caractère des douleurs thalamiques (fiche) :", a: ["Fortes, diffuses, en picotements ou coups de poignard"], d: ["Mécaniques, calmées par le repos", "Inflammatoires avec raideur matinale", "Localisées à une seule articulation"], src: "fiche" },
      { id: "p5", part: "def", q: "Atteinte bilatérale du cortex occipital :", a: ["Cécité corticale"], d: ["Locked-in syndrome", "Aphasie de Broca", "Syndrome de Wallenberg"], src: "cen" },
      { id: "p6", part: "kine", q: "Ataxie sensitive (syndrome thalamique) : l'épreuve de Romberg est…", a: ["Positive : aggravation à la fermeture des yeux"], d: ["Négative comme chez le cérébelleux", "Impossible", "Toujours normale"], src: "fiche" },
      { id: "p7", part: "kine", q: "Face à des douleurs thalamiques, le kiné…", a: ["N'agit pas directement dessus : il évite de les déclencher, adapte les prises et travaille en fonctionnel"], d: ["Les fait disparaître par massage profond", "Les traite par étirements intenses", "Arrête toute rééducation"], src: "fiche" }
    ],
    patients: [
      { id: "pacps", nom: "Illustration : AVC cérébral postérieur superficiel droit", origine: "invente", src: "fiche", desc: "HLH gauche isolée, sans déficit moteur : se cogne du côté gauche.", attrs: { hlh: "G", chute: true } },
      { id: "pthal2", nom: "Illustration : syndrome thalamique droit", origine: "invente", src: "fiche", desc: "Hémi-hypoesthésie gauche, douleurs thalamiques diffuses de l'hémicorps gauche, ataxie sensitive.", attrs: { douleurs: [{ zone: "epauleG", type: "neuropathique" }, { zone: "mainG", type: "neuropathique" }, { zone: "cuisseG", type: "neuropathique" }, { zone: "piedG", type: "neuropathique" }], polygone: true } }
    ]
  });

  const tronc = T("avc-tronc", "AVC du tronc cérébral (syndromes alternes)", "Tronc cérébral", {
    resume: [
      "<b>Territoire vertébro-basilaire</b> (artères vertébrales, tronc basilaire et leurs branches).",
      "<b>Syndrome alterne</b> : atteinte d'un ou plusieurs <b>nerfs crâniens du côté de la lésion</b> + atteinte d'une voie longue (motrice et/ou sensitive) <b>du côté opposé</b>.",
      "<b>Exemples</b> : Weber (mésencéphale : III homolatéral + hémiplégie controlatérale) ; Millard-Gubler (protubérance : VII périphérique ± VI homolatéral + hémiplégie controlatérale épargnant la face) ; Wallenberg (bulbe, voir sa fiche).",
      "<b>Signes associés fréquents</b> : vertiges, diplopie, dysarthrie, troubles de la déglutition, troubles de la conscience.",
      "<b>En kiné</b> : déglutition (risque de pneumonie d'inhalation), équilibre et vertiges, diplopie (fatigue, compensations), hémiplégie (comme en sylvien), respiratoire si troubles de conscience."
    ],
    pro: [
      { id: "def", titre: "Syndromes alternes", src: ["fiche", "cen"], html: `<p><b>Ta fiche</b> : AVC du tronc cérébral = syndrome alterne : atteinte des nerfs crâniens homolatéraux à la lésion + hémiplégie controlatérale.</p>
<p><b>Pourquoi « alterne » ?</b> Les noyaux des nerfs crâniens sont dans le tronc et innervent le même côté, alors que les voies motrices et sensitives longues croisent plus bas (décussation pyramidale au niveau du bulbe). Une même lésion touche donc le nerf crânien de son côté et le corps du côté opposé.</p>
<table class="mt"><tr><th>Niveau</th><th>Exemple</th><th>Côté de la lésion</th><th>Côté opposé</th></tr>
<tr><td>Mésencéphale</td><td>Weber</td><td>Paralysie du III (ptosis, œil en dehors, mydriase)</td><td>Hémiplégie</td></tr>
<tr><td>Protubérance (pont)</td><td>Millard-Gubler</td><td>Paralysie faciale <b>périphérique</b> (VII) ± VI</td><td>Hémiplégie épargnant la face</td></tr>
<tr><td>Bulbe latéral</td><td>Wallenberg</td><td>V, IX-X, Claude Bernard-Horner, vestibulaire, cérébelleux</td><td>Hémianesthésie thermo-algique (pas d'hémiplégie)</td></tr></table>
<p><b>Paralysie faciale centrale vs périphérique</b> : dans l'AVC hémisphérique (centrale), seul le bas du visage est atteint ; dans l'atteinte du noyau ou du nerf VII (périphérique), toute l'hémiface est atteinte, front compris.</p>
<p><b>Signes associés</b> : vertiges, nystagmus, diplopie, dysarthrie, dysphagie, ataxie, troubles de la conscience (formation réticulée), troubles respiratoires.</p>` },
      { id: "kine", titre: "Bilan et prise en charge", src: ["cen", "crC", "rea24"], html: kineTerr([
        "<b>Anamnèse</b> : vertiges, diplopie, déglutition (texture, fausses routes, liquides épaissis), voix, chutes.",
        "<b>Bilans</b> : nerfs crâniens observés (visage, regard, déglutition, voix), hémiplégie (comme en sylvien : tonus, moteur 0-1-2, sensibilité), coordination (signes cérébelleux possibles), équilibre, respiratoire (encombrement, toux efficace ?).",
        "<b>Traitement</b> : prévention de la pneumonie d'inhalation (installation, toux, collaboration logopède), rééducation de l'hémiplégie, équilibre et vertiges, gestion de la fatigue liée à la diplopie (orthoptiste), sécurité."]) }
    ],
    qcm: [
      { id: "tc1", part: "def", q: "Un syndrome alterne associe :", a: ["Une atteinte de nerf crânien du côté de la lésion et une hémiplégie du côté opposé"], d: ["Une hémiplégie et une HLH du même côté", "Une atteinte bilatérale symétrique", "Une ataxie et une aphasie"], src: "fiche" },
      { id: "tc2", part: "def", q: "Pourquoi le déficit est-il « croisé » dans le tronc cérébral ?", a: ["Les nerfs crâniens innervent leur propre côté, alors que les voies longues croisent plus bas"], d: ["Parce que le cervelet inverse les commandes", "Parce que les deux hémisphères sont touchés", "Parce que la moelle est lésée"], src: "cen" },
      { id: "tc3", part: "def", q: "Syndrome de Weber (mésencéphale) :", a: ["Paralysie du III homolatérale + hémiplégie controlatérale"], d: ["Paralysie faciale périphérique + hémiplégie controlatérale", "Hémianesthésie thermo-algique croisée sans hémiplégie", "Tétraplégie avec conscience préservée"], src: "cen" },
      { id: "tc4", part: "def", q: "Syndrome de Millard-Gubler (protubérance) :", a: ["Paralysie faciale périphérique homolatérale + hémiplégie controlatérale épargnant la face"], d: ["Paralysie du III + hémiplégie", "HLH isolée", "Hémisyndrome cérébelleux pur"], src: "cen" },
      { id: "tc5", part: "def", q: "Paralysie faciale PÉRIPHÉRIQUE : quelle partie du visage est atteinte ?", a: ["Toute l'hémiface, front compris"], d: ["Seulement le bas du visage", "Seulement le front", "Les deux côtés"], expl: "Dans l'AVC hémisphérique, la paralysie faciale est centrale : seul le bas du visage est atteint.", src: "cen" },
      { id: "tc6", part: "kine", q: "Risque prioritaire à prévenir dans un AVC du tronc avec troubles de la déglutition :", a: ["La pneumonie d'inhalation"], d: ["L'épicondylite", "La luxation de rotule", "La capsulite"], src: "rea24" },
      { id: "tc7", part: "def", q: "Signes associés fréquents d'un AVC du tronc (plusieurs réponses) :", a: ["Vertiges", "Diplopie", "Dysarthrie"], d: ["Grasping", "Alexie sans agraphie"], src: "cen" }
    ],
    patients: [{ id: "pmg", nom: "Illustration : syndrome de Millard-Gubler droit", origine: "invente", src: "cen", desc: "Paralysie faciale périphérique droite (front compris) + hémiplégie gauche épargnant la face, diplopie.", attrs: { facePeriph: "D", hemi: "G", diplopie: true, vertige: true } }]
  });

  const wall = T("avc-wallenberg", "Syndrome de Wallenberg (AVC bulbaire latéral)", "Wallenberg", {
    resume: [
      "<b>Infarctus de la partie latérale du bulbe</b> : artère vertébrale ou PICA (artère cérébelleuse postéro-inférieure).",
      "<b>Côté de la lésion</b> : atteinte du V (hypoesthésie thermo-algique de l'hémiface), IX-X (troubles de la déglutition, voix rauque), <b>Claude Bernard-Horner</b> (ptosis, myosis), <b>syndrome vestibulaire</b> (vertige, nystagmus, nausées, latéropulsion), <b>hémisyndrome cérébelleux</b>.",
      "<b>Côté opposé</b> : <b>hémianesthésie thermo-algique</b> du corps (la face est épargnée), avec tact et proprioception conservés.",
      "<b>Pas d'hémiplégie</b> (la voie pyramidale, ventrale, est épargnée) : c'est un « syndrome alterne sensitif ».",
      "<b>En kiné</b> : déglutition et risque d'inhalation, vertiges (rééducation vestibulaire), équilibre et latéropulsion, ataxie cérébelleuse, prévention des brûlures et blessures (perte de la sensibilité au chaud et à la douleur)."
    ],
    pro: [
      { id: "def", titre: "Clinique", src: ["fiche", "cen"], html: `<p><b>Ta fiche</b> : côté homolatéral → atteinte des nerfs crâniens, atteinte vestibulaire, signes cérébelleux ; côté controlatéral → hémianesthésie thermo-algique (syndrome alterne sensitif sans hémiplégie).</p>
<table class="mt"><tr><th>Côté de la lésion</th><th>Côté opposé</th></tr>
<tr><td><ul><li>V : hypoesthésie thermo-algique de l'hémiface (± douleurs faciales)</li><li>IX-X : troubles de la déglutition, dysphonie (voix rauque), paralysie du voile</li><li>Claude Bernard-Horner : ptosis, myosis (± énophtalmie)</li><li>Syndrome vestibulaire : vertige rotatoire, nystagmus, nausées, vomissements, latéropulsion</li><li>Hémisyndrome cérébelleux</li></ul></td><td><ul><li>Hémianesthésie <b>thermo-algique</b> du corps (face épargnée)</li><li>Tact et sensibilité profonde conservés (atteinte du faisceau spinothalamique, qui a déjà croisé)</li></ul></td></tr></table>
<p><b>Pas d'hémiplégie</b> : la voie pyramidale passe en avant du bulbe, hors du territoire latéral. Hoquet possible.</p>` },
      { id: "kine", titre: "Bilan et prise en charge", src: ["fcer", "cen"], html: kineTerr([
        "<b>Anamnèse</b> : vertiges (position, durée), nausées, chutes et direction (latéropulsion du côté de la lésion), déglutition, voix.",
        "<b>Bilans</b> : sensibilité thermique (tube chaud et froid ou linge froid) et douloureuse des deux côtés, en comparant à la face ; coordination (doigt-nez, talon-genou, marionnettes) ; vestibulaire (nystagmus, marche en étoile, Fukuda : déviation du côté de la lésion, majorée yeux fermés) ; équilibre (Berg), marche.",
        "<b>Traitement</b> : rééducation vestibulaire (habituation, stabilisation du regard), équilibre, coordination (comme en cérébelleux), déglutition avec le logopède, <b>prévention des brûlures</b> (vérifier la température de l'eau avec le côté sensible), sécurité contre les chutes."]) }
    ],
    qcm: [
      { id: "w1", part: "def", q: "Le syndrome de Wallenberg est dû à un infarctus :", a: ["De la partie latérale du bulbe (artère vertébrale ou PICA)"], d: ["De la capsule interne", "Du lobe occipital", "De la face médiale du lobe frontal"], src: "cen" },
      { id: "w2", part: "def", q: "Du côté OPPOSÉ à la lésion, on trouve :", a: ["Une hémianesthésie thermo-algique du corps"], d: ["Une hémiplégie", "Un hémisyndrome cérébelleux", "Un syndrome de Claude Bernard-Horner"], src: "fiche" },
      { id: "w3", part: "def", q: "Signes du côté de la LÉSION (plusieurs réponses) :", a: ["Claude Bernard-Horner", "Syndrome vestibulaire", "Hémisyndrome cérébelleux", "Troubles de la déglutition (IX-X)"], d: ["Hémiplégie", "Aphasie"], src: "fiche" },
      { id: "w4", part: "def", q: "Y a-t-il une hémiplégie dans le Wallenberg ?", a: ["Non : la voie pyramidale (ventrale) est épargnée"], d: ["Oui, du côté de la lésion", "Oui, du côté opposé", "Oui, bilatérale"], src: "fiche" },
      { id: "w5", part: "def", q: "Le syndrome de Claude Bernard-Horner associe :", a: ["Ptosis et myosis (± énophtalmie)"], d: ["Mydriase et exophtalmie", "Diplopie et nystagmus", "HLH et alexie"], src: "cen" },
      { id: "w6", part: "kine", q: "Conseil de sécurité spécifique au Wallenberg :", a: ["Vérifier la température de l'eau avec le côté sensible (risque de brûlure)"], d: ["Porter une écharpe en permanence", "Ne jamais marcher seul de nuit dans le noir", "Éviter toute activité physique"], src: "cen" },
      { id: "w7", part: "kine", q: "Tests vestibulaires (marche en étoile, Fukuda) : en cas d'atteinte vestibulaire, on observe…", a: ["Une déviation du côté de la lésion, majorée yeux fermés"], d: ["Des troubles diffus non latéralisés, peu majorés yeux fermés", "Aucune déviation", "Une déviation toujours vers l'avant"], src: "fcer" },
      { id: "w8", part: "def", q: "Sensibilités conservées du côté opposé :", a: ["Tact et proprioception"], d: ["Chaud et froid", "Douleur", "Aucune"], src: "cen" }
    ],
    patients: [{ id: "pwall", nom: "Illustration : Wallenberg droit", origine: "invente", src: "fiche", desc: "Côté droit : Claude Bernard-Horner, vertiges, signes cérébelleux, troubles de la déglutition. Côté gauche du corps : hémianesthésie thermo-algique (pas d'hémiplégie).", attrs: { horner: "D", vertige: true, nystagmus: true, deglut: true, trembAction: "D", polygone: true, chute: true } }]
  });

  const lis = T("avc-lis", "Locked-in syndrome (occlusion du tronc basilaire)", "Locked-in", {
    resume: [
      "<b>Cause</b> : occlusion du tronc basilaire, lésion de la partie ventrale de la protubérance (ta fiche : « occlusion du tronc basilaire : locked-in syndrome »).",
      "<b>Tableau</b> : tétraplégie, diplégie faciale, anarthrie (mutisme), troubles de la déglutition, mais <b>conscience et cognition préservées</b>.",
      "<b>Communication</b> : par les mouvements <b>verticaux</b> des yeux et le clignement (code oui/non).",
      "<b>En kiné</b> : respiratoire (encombrement, déglutition, ventilation), prévention des complications de l'immobilité (escarres, rétractions, équin, TVP), installation, communication ; récupération partielle possible : guetter et stimuler la motricité qui revient."
    ],
    pro: [
      { id: "def", titre: "Clinique et prise en charge", src: ["fiche", "cen", "rea24"], html: `<p><b>Mécanisme</b> : lésion bilatérale de la partie ventrale de la protubérance (voies pyramidales et cortico-bulbaires), avec épargne de la formation réticulée (vigilance) et des voies du regard vertical.</p>
<ul><li>Tétraplégie, diplégie faciale, anarthrie, troubles de la déglutition.</li><li><b>Conscience normale</b> : le patient entend et comprend tout. Attention aux propos tenus devant lui.</li><li>Communication par mouvements verticaux des yeux et clignements (code oui/non, tableau de lettres).</li></ul>
<p><b>Kiné</b> (principes de la réanimation et du patient alité) : respiratoire prioritaire (encombrement, aspiration si intubé, prévention de l'inhalation), installation et changements de position, prévention des escarres, des rétractions et de l'équin (mobilisations, attelles), TVP ; établir un code de communication avant de mobiliser ; stimuler toute motricité qui réapparaît.</p>` }
    ],
    qcm: [
      { id: "l1", part: "def", q: "Le locked-in syndrome est dû à :", a: ["Une occlusion du tronc basilaire (protubérance ventrale)"], d: ["Un AVC sylvien gauche", "Un AVC cérébral antérieur bilatéral", "Un infarctus du cervelet"], src: "fiche" },
      { id: "l2", part: "def", q: "Dans le locked-in syndrome, la conscience est :", a: ["Préservée"], d: ["Abolie (coma)", "Fluctuante, avec confusion permanente", "Remplacée par un syndrome frontal"], src: "cen" },
      { id: "l3", part: "def", q: "Le patient communique par :", a: ["Les mouvements verticaux des yeux et le clignement"], d: ["La parole", "Les mouvements de la main", "Les mouvements horizontaux de la tête"], src: "cen" },
      { id: "l4", part: "def", q: "Tableau moteur du locked-in :", a: ["Tétraplégie avec diplégie faciale et anarthrie"], d: ["Hémiplégie brachio-faciale", "Paraplégie isolée", "Hémisyndrome cérébelleux"], src: "cen" },
      { id: "l5", part: "def", q: "Avant de mobiliser un patient locked-in, il faut :", a: ["Établir un code de communication (oui / non par les yeux)"], d: ["Attendre qu'il puisse parler", "Lui faire passer un MMSE classique", "Le mettre debout pour évaluer la marche"], src: "cen" }
    ],
    patients: [{ id: "plis", nom: "Illustration : locked-in syndrome", origine: "invente", src: "fiche", desc: "Tétraplégie, anarthrie, communication par les mouvements verticaux des yeux, trouble de la déglutition.", attrs: { tetra: true, deglut: true, aide: "fauteuil", amimie: true } }]
  });

  // cas d'entraînement : reconnaître le territoire
  terr.cas.push({ id: "casterr", origine: "invente", src: ["fiche", "cen"], patient: "pthal", titre: "Quel territoire ? (entraînement à la reconnaissance)",
    fiche: "Cas inventés et très courts pour t'entraîner à associer un tableau clinique à son territoire.",
    etapes: [
      { type: "choix", titre: "Associer tableau et territoire (1/2)", consigne: "Coche les associations JUSTES.", src: "fiche",
        items: [
          { t: "Hémiparésie droite à prédominance crurale + apathie + incontinence → cérébrale antérieure gauche", ok: true },
          { t: "Hémiplégie gauche massive et proportionnelle → sylvien profond droit", ok: true },
          { t: "HLH gauche isolée → cérébrale postérieure droite", ok: true },
          { t: "Paralysie faciale périphérique gauche + hémiplégie droite → AVC sylvien gauche", ok: false, why: "Atteinte croisée nerf crânien / corps = syndrome alterne : tronc cérébral (protubérance gauche, Millard-Gubler)." },
          { t: "Vertige, Claude Bernard-Horner droit, ataxie droite + perte de la sensibilité au chaud du côté gauche du corps → Wallenberg droit", ok: true },
          { t: "Ataxie gauche avec dysmétrie → AVC cérébelleux droit", ok: false, why: "L'hémisyndrome cérébelleux est HOMOLATÉRAL : ataxie gauche → cervelet gauche." }
        ] },
      { type: "choix", titre: "Associer tableau et territoire (2/2)", consigne: "Coche les associations JUSTES.", src: "fiche",
        items: [
          { t: "Tétraplégie, anarthrie, conscience préservée, communication par les yeux → tronc basilaire (locked-in)", ok: true },
          { t: "Hémi-hypoesthésie droite puis douleurs diffuses en coups de poignard → thalamus gauche", ok: true },
          { t: "Hémiparésie brachio-faciale droite + aphasie + HLH droite → sylvien superficiel gauche", ok: true },
          { t: "Héminégligence gauche → hémisphère gauche", ok: false, why: "L'héminégligence gauche vient d'une lésion de l'hémisphère DROIT." }
        ] }
    ] });
  terr.resume.push("<b>Chaque territoire a maintenant son propre cours</b> dans la cellule Neurologie (cérébrale antérieure, sylvien superficiel / profond, cérébrale postérieure, tronc cérébral, Wallenberg, locked-in, médullaire) ; ce cas d'entraînement t'aide à les reconnaître.");

  // ======== AVC médullaire ========
  const med = T("avc-medullaire", "AVC médullaire (infarctus de la moelle)", "AVC médullaire", {
    statut: "Ta fiche AVC ne parle pas de l'AVC médullaire. Cette fiche combine : le cas des notes de Lise (2024, cours MSP), ta fiche « blessé médullaire », le cours Delobel 2026-27 (questions et bilans du blessé médullaire) et le référentiel de neurologie pour la sémiologie (signalé).",
    resume: [
      "<b>Définition</b> : ischémie (ou plus rarement hémorragie) de la moelle épinière. Rare. Le territoire le plus touché est celui de l'<b>artère spinale antérieure</b> (deux tiers antérieurs de la moelle) — référentiel, hors de tes cours.",
      "<b>Installation brutale</b> (minutes à heures), souvent avec une douleur rachidienne : para- ou tétraparésie selon le niveau, <b>flasque au début</b> (choc spinal) puis <b>spastique</b> sous la lésion.",
      "<b>Dissociation sensitive</b> (artère spinale antérieure) : perte de la sensibilité <b>thermo-algique</b> sous la lésion, avec <b>tact fin et proprioception conservés</b> (cordons postérieurs irrigués par les artères spinales postérieures).",
      "<b>Troubles vésico-sphinctériens</b> fréquents (sonde vésicale), troubles neurovégétatifs, douleurs neuropathiques.",
      "<b>Bilan</b> comme le blessé médullaire : <b>niveau lésionnel</b> (ASIA : sensibilité par dermatome + testing des muscles clés), lésion complète ou incomplète, testing analytique +++ (cours Delobel), tonus (Ashworth, Tardieu, clonus), équilibre, marche.",
      "<b>Traitement</b> (cas du cours) : améliorer la <b>commande motrice</b> par la répétition (on ne parle pas de « renforcement » en neuro central, sauf force déjà bonne), travailler la <b>sensibilité avant l'équilibre</b>, éducation à la marche (fauchage), relevé du sol."
    ],
    pro: [
      { id: "def", titre: "Définition et sémiologie", src: ["cenMed", "fbm"], html: `<p><b>Infarctus médullaire</b> : ischémie de la moelle épinière. La vascularisation de la moelle repose sur l'<b>artère spinale antérieure</b> (deux tiers antérieurs : cornes antérieures, faisceaux pyramidaux et spinothalamiques) et les <b>artères spinales postérieures</b> (cordons postérieurs). Le syndrome de l'artère spinale antérieure est le plus fréquent.</p>
<table class="mt"><tr><th>Sous la lésion</th><th>Atteint</th><th>Conservé</th></tr>
<tr><td>Motricité</td><td>Para- ou tétraplégie (flasque, puis spastique)</td><td></td></tr>
<tr><td>Sensibilité</td><td>Thermo-algique (faisceau spinothalamique)</td><td>Tact fin, sens de position, vibration (cordons postérieurs)</td></tr>
<tr><td>Sphincters</td><td>Rétention ou incontinence</td><td></td></tr></table>
<p><b>Installation</b> brutale, souvent avec une douleur dorsale ou cervicale ; diagnostic par IRM médullaire. Causes : athérosclérose, chirurgie de l'aorte, dissection, hypotension prolongée…</p>
<p><b>Rappels de ta fiche « blessé médullaire »</b> : troubles neurovégétatifs (respiration, hypotension, thermorégulation, hyperréflexie autonome), sensitifs, moteurs, spasticité, troubles urinaires, intestinaux et sexuels, orthopédiques (ankylose, <b>POAN</b>), trophiques (œdème, escarres), douleurs, troubles psychologiques. Niveau de la lésion déterminé par les réflexes, le niveau sensitif et le niveau moteur (testing) ; classification <b>ASIA</b> (niveau + lésion complète ou incomplète).</p>` },
      { id: "anam", titre: "Anamnèse et bilans", src: ["crC", "fbm", "lise"], html: `<p><b>Questions spécifiques</b> (cours Delobel 2026-27, blessé médullaire) : antécédents de chirurgie rachidienne, pathologie vertébrale, maladie neuro préexistante, insuffisance respiratoire ; ligne du temps datée ; <b>mécanisme</b> (traumatique, tumoral, hernie, infection, <b>vasculaire</b>, inflammatoire) ; niveau lésionnel annoncé ; lésion complète ou incomplète (ASIA) ; soins intensifs, ventilation, durée d'alitement ; <b>phase actuelle</b> (choc spinal, aiguë, subaiguë, chronique) ; complications (escarres, POAN, rétractions, amyotrophie, TVP, ostéoporose, respiratoires) ; immobilisation (corset).</p>
<p><b>Bilans</b> : constat d'attitude (aides techniques, orthèses, ventilation, sondes, perfusions, matelas anti-escarres) ; respiratoire si nécessaire ; douleur ; cutané-trophique (sous les dispositifs, escarres, signes de TVP, cicatrices) ; sensibilité superficielle (pic-touche, thermique) et profonde (sens de position) ; motricité spontanée ; transferts ; articulaire passif ; tonus (ROT, clonus rotulien et achilléen, Ashworth et Tardieu) ; <b>testing analytique +++</b> (il détermine le niveau de lésion ; compris dans l'ASIA) ; échelle de Held ; fatigue ; fonctionnel.</p>
<p class="tip">Leçon du cas du cours : le bilan moteur « Bobath » était à 2/2 partout, alors que la clinique (fauchage, chutes) ne collait pas. Il faut alors chercher plus loin : le <b>testing analytique</b> est autorisé et même nécessaire quand rien (spasticité, négligence, cognition) ne vient le fausser. Il a montré un psoas à 3/5.</p>` },
      { id: "ttt", titre: "Objectifs et traitement (cas du cours)", src: ["lise"], html: `<p><b>Objectifs</b> : éducation (hydratation, déroulé du pas, rassurer, relevé du sol) ; améliorer la commande motrice des muscles à moins de 5/5 (quadriceps, psoas, ischio-jambiers, tibial antérieur) ; corriger la marche (fauchage) ; équilibre en unipodal et aux poussées ; relevé du sol ; douleur (informer le médecin, surveiller, adapter les mobilisations) ; distance de marche.</p>
<ul>
<li><b>Commande motrice, pas renforcement</b> : en pathologie centrale, on améliore le message nerveux par la <b>répétition</b> des mouvements, pas par la charge. Testing à 0, 1, 2 (voire 3) : pas de charge. À 4 ou 5 (force globale bonne) : on peut charger. Préférer le global et le fonctionnel à l'analytique ; travailler tous les muscles, pas seulement les déficitaires.</li>
<li><b>Sensibilité avant équilibre</b> : l'équilibre était altéré par la sensibilité. Textures yeux fermés (2 très différentes, puis plus proches ; en cas d'erreur, faire ressentir à nouveau plutôt que corriger) ; pointe du pied devant un repère ; cubes de hauteurs différentes sous une planche de Freeman. Ensuite seulement, l'équilibre fonctionnel (pied qui glisse devant, derrière, sur le côté, yeux fermés).</li>
<li><b>Marche</b> (fauchage gauche par psoas à 3/5) : entre les barres, passer le pas sur une ligne en évitant un plot, montées de genou, enjamber un coussin incliné avec attaque du talon, toucher un cône ; progression deux mains → une main → sans appui → hors des barres. Déroulé du pas : planche de Freeman, skate, pointes et talons, passage de haies, parcours.</li>
<li><b>Relevé du sol</b> par étapes, d'abord sur table de Bobath : triceps brachiaux (pompes à l'espalier), psoas (genou sur la table, chevalier servant), MI (genou sur un step puis au sol), équilibre à 4 pattes et en chevalier servant (laisser le patient choisir sa jambe), marche à 4 pattes, retournements (pas de sphinx à cause des hernies), puis relevé complet sans indication, répété.</li>
<li>Lever de chaise : accoudoirs pour se lever, <b>pas pour se rasseoir</b> en neuro (risque de déséquilibre).</li></ul>` }
    ],
    qcm: [
      { id: "m1", part: "def", q: "Le territoire le plus souvent touché dans l'infarctus médullaire :", a: ["L'artère spinale antérieure"], d: ["Les artères spinales postérieures", "L'artère cérébrale moyenne", "L'artère basilaire"], src: "cenMed" },
      { id: "m2", part: "def", q: "Syndrome de l'artère spinale antérieure : sensibilités CONSERVÉES sous la lésion", a: ["Tact fin, sens de position et vibration (cordons postérieurs)"], d: ["Sensibilité au chaud, au froid et à la douleur", "Aucune sensibilité", "Seulement la douleur"], src: "cenMed" },
      { id: "m3", part: "def", q: "Profil d'évolution du tonus sous la lésion :", a: ["Flasque au début (choc spinal), puis spastique"], d: ["Spastique d'emblée puis flasque", "Toujours normal", "Rigidité parkinsonienne"], src: "fbm" },
      { id: "m4", part: "def", q: "La classification ASIA permet de déterminer (plusieurs réponses) :", a: ["Le niveau de la lésion", "Le caractère complet ou incomplet"], d: ["Le score de Glasgow", "Le risque de chute"], src: "fbm" },
      { id: "m5", part: "def", q: "Les POAN chez le blessé médullaire touchent :", a: ["Toujours des articulations sous-lésionnelles (hanche, genou ; épaule et coude chez le tétraplégique)"], d: ["Uniquement le rachis", "Uniquement les articulations sus-lésionnelles", "Les petites articulations des doigts"], src: "fbm" },
      { id: "m6", part: "anam", q: "Bilan moteur « Bobath » à 2/2 partout, mais fauchage et chutes : que faire ?", a: ["Chercher plus loin, avec un testing analytique (autorisé si rien ne le fausse)"], d: ["Conclure qu'il n'y a pas de déficit moteur", "Ne rien faire de plus : le Bobath suffit", "Faire un MMSE"], src: "lise" },
      { id: "m7", part: "anam", q: "Pourquoi le testing analytique est-il « hyper important » chez le blessé médullaire ?", a: ["Il détermine le niveau de la lésion (compris dans l'ASIA)"], d: ["Il mesure la spasticité", "Il remplace le bilan sensitif", "Il évalue le risque d'escarre"], src: "crC" },
      { id: "m8", part: "ttt", q: "En pathologie centrale, avec un testing à 2/5, on améliore la force par :", a: ["La répétition du mouvement (commande motrice), sans charge"], d: ["Des charges lourdes en force maximale", "L'électrostimulation seule", "Le repos"], src: "lise" },
      { id: "m9", part: "ttt", q: "Équilibre altéré par un trouble sensitif : dans quel ordre travailler ?", a: ["D'abord la sensibilité, puis l'équilibre fonctionnel"], d: ["D'abord l'équilibre, la sensibilité suivra", "Uniquement la force", "Uniquement les yeux fermés"], src: "lise" },
      { id: "m10", part: "ttt", q: "Lever de chaise chez un patient neuro :", a: ["Accoudoirs pour se lever, mais pas pour se rasseoir"], d: ["Jamais d'accoudoirs", "Accoudoirs uniquement pour se rasseoir", "Se lever en sautant"], src: "lise" },
      { id: "m11", part: "ttt", q: "Exercice de textures yeux fermés : le patient se trompe. Que faire ?", a: ["Lui faire ressentir à nouveau la texture pour qu'il se corrige lui-même"], d: ["Lui dire simplement que c'est faux et passer à la suite", "Arrêter l'exercice", "Ouvrir les yeux définitivement"], src: "lise" },
      { id: "m12", part: "ttt", q: "Relevé du sol en chevalier servant : quelle jambe mettre en avant ?", a: ["Celle que le patient choisit spontanément"], d: ["Toujours la jambe atteinte", "Toujours la jambe saine", "Peu importe, on alterne au hasard"], expl: "S'il chute, il se relèvera avec sa jambe préférentielle.", src: "lise" }
    ],
    patients: [{ id: "pmed", nom: "Homme 70 ans · probable infarctus médullaire + AVC sylvien gauche", origine: "cours", src: "lise", desc: "Ancien chef d'équipe, BPCO gold II, hernies L4-L5 et L5-S1, myélopathie D7-D12. Fauchage gauche (psoas 3/5), chutes, brûlures à la face interne de la cuisse gauche (3/10 au repos, 7/10 au toucher), unipodal impossible, anxieux, essoufflé dans les escaliers.",
      attrs: { fauchage: "G", douleurs: [{ zone: "cuisseG", type: "neuropathique", eva: 7 }], chute: true, anxiete: true, dyspnee: true } }],
    cas: [{ id: "casmed", origine: "cours", src: ["lise"], patient: "pmed", titre: "Infarctus médullaire + AVC sylvien gauche (homme de 70 ans)",
      fiche: "Homme de 70 ans, en neurologie aiguë. Troubles de la marche depuis le 01/11, aggravation, urgences le 10/11 : probable infarctus médullaire, avec découverte d'un infarctus sylvien gauche. Prescription : revalidation à la marche. ⚠ Notes d'une étudiante (2024) : garde un regard critique.",
      etapes: [
        { type: "anamnese", titre: "Anamnèse", consigne: "Choisis tes questions dans l'ordre.",
          items: [
            { q: "Âge, taille, poids, BMI ?", p: 1, r: "70 ans, 1,83 m, 66 kg (BMI 19,7), pas de variation récente." },
            { q: "Histoire : quels troubles de la marche, depuis quand ?", p: 1, r: "Depuis le 01/11 ; il tombe parce que le pied accroche le sol (fauchage)." },
            { q: "Antécédents (avec les dates) ?", p: 1, r: "Cardiopathie dilatée, hypertrophie bénigne de la prostate, thyroïdectomie pour cancer, HTA, BPCO gold II. Les dates comptent : effets secondaires récents, risque de récidive d'un cancer." },
            { q: "Médication ?", p: 1, r: "Aspirine, hypocholestérolémiant, bêtabloquant, antihypertenseur, diurétiques, hormones thyroïdiennes, bronchodilatateur, traitement de l'insuffisance cardiaque." },
            { q: "Examens complémentaires ?", p: 1, r: "Scanner ; IRM du rachis : hernies postéro-latérales gauches L4-L5 et L5-S1, myélopathie D7-D12 ; IRM cérébro-médullaire : AVC sylvien gauche." },
            { q: "Chutes ?", p: 1, r: "Jamais avant ; il tombe depuis ses troubles de la marche." },
            { q: "Aides techniques ?", p: 1, r: "Aucune." },
            { q: "Distance de marche ?", p: 1, r: "50 m au maximum, limité par l'essoufflement et la faiblesse musculaire." },
            { q: "Habitation, entourage ?", p: 1, r: "Maison de plain-pied ; marié, épouse en bonne santé et autonome ; 2 enfants et des petits-enfants, visites quotidiennes. Demander l'accessibilité (tapis, baignoire ou douche) plutôt que « votre maison est-elle adaptée ? » (dramatisant)." },
            { q: "AVJ, conduite ?", p: 2, r: "Autonome pour tout ; conduit toujours." },
            { q: "Hygiène de vie ?", p: 2, r: "Mange équilibré, 1 l d'eau par jour, 30 paquets-années (arrêt il y a 4 jours), dort 9 h, alcool occasionnel." },
            { q: "Kiné antérieure (penser à la BPCO) ?", p: 2, r: "Aucune." },
            { q: "Objectifs ?", p: 1, r: "Améliorer l'équilibre, marcher sans boiter." },
            { q: "Votre maison est-elle adaptée à un handicap ?", p: 3, r: "Formulation dramatisante, à éviter : demande plutôt l'accessibilité concrète." }
          ] },
        { type: "lecture", titre: "Résultats des bilans", html: `<ul><li><b>Constat</b> : au fauteuil, bien installé, souriant ; sonde vésicale ; pas d'aide technique.</li><li><b>Psycho-cognitif</b> : anxieux, non dépressif, orienté, pas de négligence.</li><li><b>Fatigue</b> : fatigué après les tests (à évaluer malgré un sommeil réparateur).</li><li><b>Douleur</b> : face interne de la cuisse gauche depuis le 01/11, 3/10 au repos, 7/10 au toucher, brûlures, augmentée par les draps → douleur neuropathique (allodynie).</li><li><b>Cutané</b> : hématome du dos de la main gauche.</li><li><b>Tonus</b> : Ashworth 0.</li><li><b>Sensibilité</b> : ne pas tester au pic-touche uniquement sur la zone douloureuse ; profonde : test des 3 positions.</li><li><b>Articulaire</b> (actif fonctionnel) : pas de limitation.</li><li><b>Moteur</b> : Bobath 2/2 partout → incohérent avec la clinique → testing : psoas 3/5 ; quadriceps, ischio-jambiers, tibial antérieur 4/5 ; grand et moyen fessiers, triceps sural, triceps brachial 5/5.</li><li><b>Transferts</b> : sécurisés, sans aide, appui des MS.</li><li><b>Équilibre</b> : base spontanée OK ; base réduite 10 s ; yeux fermés : oscille ; poussées base réduite : ne tient pas ; unipodal impossible.</li><li><b>Marche</b> : fauchage gauche, légère boiterie, pas symétriques. Escaliers : environ 20 marches en alterné avec rampe, essoufflé.</li></ul>` },
        { type: "choix", titre: "Objectifs et traitement", consigne: "Coche les propositions adaptées.", src: "lise",
          items: [
            { t: "Améliorer la commande motrice du psoas pour corriger le fauchage", ok: true },
            { t: "Travailler la sensibilité avant l'équilibre fonctionnel", ok: true },
            { t: "Apprendre le relevé du sol par étapes, d'abord sur table de Bobath", ok: true },
            { t: "Charger modérément les muscles à 4/5 (force globale bonne)", ok: true },
            { t: "Éduquer : hydratation, déroulé du pas, rassurer", ok: true },
            { t: "Passer par la position de sphinx pour le relevé du sol", ok: false, why: "Évité ici à cause des hernies discales." },
            { t: "Imposer la jambe atteinte en avant en chevalier servant", ok: false, why: "Laisser le patient choisir sa jambe préférentielle." },
            { t: "Ignorer la douleur de cuisse", ok: false, why: "Informer le médecin, surveiller, adapter les mobilisations." }
          ] }
      ] }]
  });

  const TERR = [aca, sylvSP, acp, tronc, wall, lis, med];

  // ======== Remarques MSP : erreurs et contradictions repérées dans les supports ========
  const REMARQUES = [
    { g: "Erreurs repérées", t: "Dafalgan « anti-inflammatoire »", s: "geriaTeams", txt: "Le CR géria du 12/11/2026 dit que « le paracétamol est un antidouleur tandis que le Dafalgan est un anti-inflammatoire ». Faux : le Dafalgan EST du paracétamol (antalgique, antipyrétique, sans effet anti-inflammatoire). Le raisonnement du cas reste juste : une EVA de 7/10 à 2 mois d'une PTG doit faire chercher une algodystrophie ou une TVP." },
    { g: "Erreurs repérées", t: "Scanner de l'AVC ischémique « hyperdense »", s: "fiche", txt: "La fiche de cours AVC indique « scanner : zone hyperdense » pour l'AVC ischémique. Faux : l'ischémie est souvent invisible les premières heures, puis hypodense. C'est l'hémorragie qui est hyperdense." },
    { g: "Erreurs repérées", t: "Délai de thrombolyse « 3-4 h »", s: "fiche", txt: "La fiche de cours donne 3-4 h. La fenêtre reconnue est aujourd'hui de 4 h 30 après le début des symptômes (ECASS III, 2008), complétée par la thrombectomie pour les grosses artères." },
    { g: "À vérifier avec tes profs", t: "Schéma spastique : « épaule en antépulsion » ?", s: "fiche", txt: "La fiche donne « épaule : adduction + rotation interne + antépulsion » pour le schéma le plus fréquent. L'adduction et la rotation interne sont classiques ; vérifie la position antérieure ou postérieure du bras dans la version de ton prof." },
    { g: "À vérifier avec tes profs", t: "Glasgow 3/15 « = mort »", s: "rea24", txt: "Note du 19/12/2024. 3/15 est le score minimal (coma profond, aucune réponse) ; ce n'est pas un constat de décès." },
    { g: "À vérifier avec tes profs", t: "Spasticité : Tardieu « et non Ashworth »", s: "rea24", txt: "Note du 19/12/2024. Tardieu tient compte de la vitesse (spasticité vs rétraction), mais l'Ashworth modifiée est utilisée dans tes cours 2026-27 (MAS dans les cas du 12/11 et du cours 4). Les deux sont complémentaires (cours Delobel)." },
    { g: "Contradictions entre supports", t: "La latéralité est-elle une question utile ?", s: "isch0403", txt: "Correction du 03/04/2025 : « pas intéressante, peu importe le côté il faut récupérer au max ». Cours 1 2026-27 : « spécifique ++ dans l'AVC » (impact sur les gestes du quotidien), tout en précisant qu'on ne rééduque pas moins un membre moins utilisé. → Suis la version 2026-27 : pose-la, mais pas en premier." },
    { g: "Contradictions entre supports", t: "Le moral en anamnèse ?", s: "geria", txt: "Notions essentielles géria (2025) : le moral relève du bilan, sauf antidépresseurs. Correction neuro du 03/04/2025 : « moral ? » cité parmi les oublis. → Pose-le dans le bilan psycho-cognitif (Hamilton), et en anamnèse seulement s'il y a un traitement ou un contexte qui le justifie." },
    { g: "Contradictions entre supports", t: "Objectif « diminuer l'aide technique »", s: "cr1211", txt: "CR du 12/11/2026 : le sevrage des aides techniques n'est pas un objectif thérapeutique. Cours 4 (2026-27) : « diminuer aide technique tribune à 1 béquille » listé dans les objectifs. → Formule l'objectif sur l'équilibre et l'indépendance à la marche." },
    { g: "À vérifier avec tes profs", t: "Niveau des hernies dans le cas d'infarctus médullaire", s: "lise", txt: "Notes de Lise (2024) : le scanner indique une « hernie L3-L4 », l'IRM des « hernies L4-L5 et L5-S1 ». Les deux examens ne disent pas la même chose (erreur de prise de notes probable). Retiens les données de l'IRM, plus précise." },
    { g: "Contradictions entre supports", t: "Bilan de la douleur chez le cérébelleux", s: "fcer", txt: "Fiche cérébelleux : pertinent selon Mmes Weenen et Delobel (patients qui se cognent et chutent) ; pas pertinent selon M. Hanuise. → Fais-le court, orienté vers les traumatismes et les chutes, et adapte-toi au jury." }
  ];


  // ---------------- Cellules et pathologies prévues ----------------
  const CELLS = [
    { id: "neuro", nom: "Neurologie", ico: "🧠", pathos: ["avc-territoires", "avc-sylvien", "avc-sylv-sp", "avc-aca", "avc-acp", "avc-tronc", "avc-wallenberg", "avc-cerebelleux", "avc-lis", "avc-medullaire", "avc-rea"], bientot: ["Maladie de Parkinson", "Guillain-Barré", "Sclérose en plaques", "Traumatisme crânien", "Blessé médullaire", "IMC / paralysie cérébrale", "Polyneuropathie", "SLA"] },
    { id: "respi", nom: "Respiratoire / réanimation", ico: "🫁", pathos: [], bientot: ["BPCO (revalidation, exacerbation)", "Pneumothorax", "OAP / ARDS en soins intensifs", "Mucoviscidose", "Bronchiolite", "Pneumonie", "Kiné respi post-chirurgie abdominale / thoracique", "VNI (CPAP, BiPAP) et ventilation invasive"] },
    { id: "otr", nom: "OTR (ortho, rachis, membres)", ico: "🦴", pathos: [], bientot: ["Cervicalgie", "Lombalgie", "Céphalées de tension", "Scoliose", "Épaule (coiffe, capsulite, instabilité)", "Genou (LCA, ménisques, SFP)", "Cheville (entorse)"] },
    { id: "sport", nom: "Sport", ico: "🏃", pathos: [], bientot: ["Déchirure musculaire", "Syndrome de la bandelette ilio-tibiale", "MTSS (périostite)", "Syndrome des loges", "Pubalgie", "Fracture de fatigue", "Tendinopathies"] },
    { id: "geria", nom: "Gériatrie", ico: "👵", pathos: [], bientot: ["PTH", "PTG", "PTE", "Chute / syndrome post-chute", "Fracture du bassin", "Altération de l'état général", "Patient dément"] }
  ];
  const PATHOS = { [avc.id]: avc, [cer.id]: cer, [rea.id]: rea, [terr.id]: terr }; TERR.forEach(p => { PATHOS[p.id] = p; });
  return { version: "2026-11-27c", SRC, TESTS, CELLS, REMARQUES, PATHOS };
})();
