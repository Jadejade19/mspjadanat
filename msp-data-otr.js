"use strict";
// MSP OTR & Sport : cours de B. Papalia (tests, Kaltenborn, cas genou), articles scientifiques à lire (donnés en cours), liens avec ton dossier MSP.
// Images : diapos et pages des documents, chargées à la demande (msp-img-*.js) ; clé « deck-page ».
(function () {
  const M = window.MSPDATA; if (!M) return;
  const LIB = "Bibliothèque MSP › ";
  const yt = q => "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);
  Object.assign(M.SRC, {
    pap: { t: "B. Papalia, « L'épaule douloureuse », thérapie manuelle 3.11.2, HEPH Condorcet 2024-25 (algorithme d'Ann Cools)", k: "Cours du prof (sport)", f: "Téléchargements › 2024-25_BLOC 3_EPAULE_ANN_COOLS.pdf" },
    kob: { t: "Pack épaule Kobus : fiches des tests (but, manœuvre, positivité, Se/Sp, RV)", k: "Document donné en cours", f: "Téléchargements › PackEpauleKobus.pdf" },
    kal: { t: "B. Papalia, « Kaltenborn : roulement-glissement », thérapie manuelle BLOC 3, 2023", k: "Cours du prof (sport)", f: "Téléchargements › KALTENBORN_BLOC3_2023.pdf" },
    gen3: { t: "Genou : cas cliniques BLOC 3, 2024-25 (5 cas : entorse grave, SFP, ménisque, instabilité chronique, gonarthrose)", k: "Cours du prof (sport)", f: "Téléchargements › 2024-25_GENOU_Cas_Cliniques_BLOC3.pdf" },
    hedges: { t: "Hegedus EJ et al. Which physical examination tests provide clinicians with the most value when examining the shoulder? Update of a systematic review with meta-analysis. Br J Sports Med. 2012;46:964-978.", k: "Article à lire (donné en cours)" },
    lach: { t: "", k: "Article à lire (donné en cours)" },
    rlg: { t: "Picard M et al. Le programme de réathlétisation post-ligamentoplastie du genou : un accompagnement pour un retour opérationnel. Kinesither Rev. 2021;21(233):31-36.", k: "Article à lire (donné en cours)" },
    tourne: { t: "Tourné Y et al. Diagnosis and treatment of tibiofibular syndesmosis lesions. Orthop Traumatol Surg Res. 2019.", k: "Article à lire (donné en cours)" },
    martin: { t: "Martin RL et al. Ankle stability and movement coordination impairments: ankle ligament sprains. Clinical practice guidelines (JOSPT). 2013.", k: "Article à lire (donné en cours)" },
    doherty: { t: "Doherty C et al. Treatment and prevention of acute and recurrent ankle sprain: an overview of systematic reviews with meta-analysis. Br J Sports Med. 2017;51:113-125.", k: "Article à lire (donné en cours)" },
    gribble: { t: "Gribble PA, Hertel J, Plisky P. Using the Star Excursion Balance Test to assess dynamic postural-control deficits and outcomes in lower extremity injury. J Athl Train. 2012.", k: "Article à lire (donné en cours)" },
    forest: { t: "Forestier N et al. Quels tests en pratique quotidienne pour diagnostiquer les déficits fonctionnels associés à l'instabilité de cheville ? Intérêt du dispositif Myolux. 2015.", k: "Article à lire (donné en cours)" },
    pf: { t: "Martin RL et al. Heel pain – plantar fasciitis: revision 2014. Clinical practice guidelines (JOSPT).", k: "Article à lire (donné en cours)" },
    lin: { t: "Lin I et al. What does best practice care for musculoskeletal pain look like? Eleven consistent recommendations from high-quality clinical practice guidelines. Br J Sports Med. 2020;54:79-86.", k: "Article à lire (donné en cours)" },
    ghos: { t: "Ghossoub P et al. Mobilisations spécifiques. EMC Kinésithérapie. 2009.", k: "Article à lire (donné en cours)" },
    recapOTR: { t: "Récapitulatif MSP OTR (fiches de cours) : entorse de cheville, Ottawa, squeeze, tests de retour au sport", k: "Fiche de cours", f: LIB + "04_OTR › C › … › RECAPITULATIF MSP OTR.docx" },
    sport1: { t: "CR MSP Sport 24/09/2026 (cas annoncés, Ankle-GO, Illinois)", k: "CR 2026-27", f: LIB + "05_SPORT › A › 2026-09-24 - Sport - Cours 1 (programme des cas).pdf" },
    nice: { t: "NICE CG177 (2014) : Osteoarthritis – care and management (diagnostic clinique de l'arthrose)", k: "Référence hors de tes cours" }
  });
  M.SRC.lach.t = "Van de Pol GJ et al. Méta-analyse (17 études) sur le tiroir antérieur, le Lachman et le ressaut, 2005 ; analyse critique publiée dans Kinésithérapie, la revue 2007;(65):4-14 : « Le Lachman est le plus sensible et le ressaut le plus spécifique des tests diagnostiques de rupture du LCA ».";

  // ---------------- Tests ----------------
  const T = (o) => ({ video: yt(o.nom + " test physiotutors"), ...o });
  Object.assign(M.TESTS, {
    // ===== Épaule (cours Papalia / Ann Cools + Kobus + Hegedus) =====
    jobe: T({ nom: "Test de Jobe / Empty can", cat: "Épaule", img: ["cools-32", "kobus-4"], but: "Provoquer une douleur de conflit sous-acromial (selon Cools) ; mettre en évidence une souffrance du supra-épineux (selon Kobus).",
      deroul: "Bras à 90° dans le plan de la scapula, rotation interne maximale (pouces vers le bas), coudes tendus ; le kiné applique une résistance vers le bas sur les deux bras ; isométrique, assis ou debout.",
      faux: ["Coude fléchi à 90° contre le corps, résister à la rotation externe.", "Main sur le ventre, presser contre l'abdomen.", "Élévation passive avec la scapula fixée en rotation interne."],
      cot: "Douleur (antérieure ?) et/ou faiblesse.", positif: "Cours : (+) si douleur ANTÉRIEURE = conflit sous-acromial (espace SA trop petit) ; (−) en cas de conflit interne (position trop éloignée de l'armé). Kobus : positif si diminution de force ; si douleur, non interprétable.",
      diag: "Conflit sous-acromial / supra-épineux.", se: "44 %", sp: "90 % (Kobus ; RV+ 4,40)", incl: "Plutôt pour INCLURE (spécifique). Empty can + full can : voir le full can.", src: ["pap", "kob"] }),
    fullcan: T({ nom: "Full can test", cat: "Épaule", img: ["cools-60"], but: "Distinguer un conflit sous-acromial d'une atteinte de la coiffe (comparé à l'empty can).",
      deroul: "Comme l'empty can, mais pouces vers le haut (rotation externe), bras à 90° dans le plan de la scapula, résistance vers le bas.",
      faux: ["Pouces vers le bas, rotation interne maximale.", "Bras derrière le dos, décoller la main.", "Bras le long du corps, traction vers le bas."],
      cot: "Douleur et/ou faiblesse.", positif: "Empty (+) et full (−) : conflit sous-acromial sans atteinte de la coiffe. Empty (+) et full (+) : atteinte de la coiffe. Grosse faiblesse en plus de la douleur : déchirure (taille ?).",
      diag: "Atteinte de la coiffe des rotateurs vs conflit.", incl: "À interpréter avec l'empty can (les deux activent autant le supra-épineux).", src: ["pap"] }),
    hawkins: T({ nom: "Test de Hawkins(-Kennedy)", cat: "Épaule", img: ["cools-33", "kobus-7"], but: "Provoquer une douleur de conflit sous-acromial.",
      deroul: "Assis (ou debout), bras à 90° de flexion, coude fléchi à 90° ; le kiné fixe la scapula et amène passivement le bras en rotation interne maximale. Ne jamais corriger la position avant le test.",
      faux: ["Bras à 90° d'abduction, rotation externe maximale, poussée antérieure de la tête humérale.", "Avant-bras fléchi contre forte résistance puis lâché.", "Coude au corps, résister à la supination."],
      cot: "Douleur.", positif: "Douleur antérieure = conflit sous-acromial.", diag: "Syndrome douloureux sous-acromial.", se: "79 % (Hegedus 2012, méta-analyse) ; 77 % (Kobus)", sp: "59 % (Hegedus 2012) ; 26 % (Kobus)", incl: "Le plus SENSIBLE des tests de conflit (Hegedus) : plutôt pour EXCLURE s'il est négatif. Peu spécifique.", src: ["pap", "hedges", "kob"] }),
    neer: T({ nom: "Test de Neer (Neer 1 et Neer 2 « modifié »)", cat: "Épaule", img: ["cools-34", "kobus-7"], but: "Provoquer un conflit : Neer 1 = sous-acromial (externe) ; Neer 2 modifié = gléno-huméral interne.",
      deroul: "Neer 1 : main sur le toit de l'épaule (maintien), rotation interne et élévation passive. Neer 2 modifié : main sur la scapula (maintien), rotation EXTERNE et élévation passive.",
      faux: ["Bras en adduction horizontale passive devant le thorax.", "Pression de la main sur le ventre.", "Rotation externe résistée coude au corps."],
      cot: "Douleur et sa localisation.", positif: "Neer 1 : douleur antérieure = conflit sous-acromial. Neer 2 modifié : douleur postérieure = conflit gléno-huméral interne.", diag: "Conflit externe vs interne.", se: "72 % (Hegedus 2012) ; 60 % (Kobus)", sp: "60 % (Hegedus 2012)", incl: "Ni très sensible ni très spécifique : test de provocation, pas de diagnostic.", src: ["pap", "hedges", "kob"] }),
    arc: T({ nom: "Arc douloureux", cat: "Épaule", ctx: ["cools-21"], but: "Rechercher une douleur de conflit sous-acromial lors de l'abduction active.",
      deroul: "Abduction active complète ; on note l'amplitude où la douleur apparaît.",
      faux: ["Rotation interne passive à 90° de flexion.", "Traction vers le bas du bras le long du corps.", "Rotation externe résistée."],
      cot: "Présent / absent, amplitude.", positif: "Douleur entre 60 et 120° d'abduction active (conflit sous-acromial, patient souvent > 35 ans).", diag: "Syndrome douloureux sous-acromial (fait partie du cluster de Michener).", se: "53 % (Hegedus 2012)", sp: "76 % (Hegedus 2012)", incl: "Plutôt spécifique.", src: ["pap", "hedges"] }),
    michener: T({ nom: "Cluster de Michener (2009)", cat: "Épaule", ctx: ["cools-21", "cools-22"], but: "Révéler un conflit CINÉMATIQUE (pas poser un diagnostic de structure).",
      deroul: "5 tests : Jobe/empty can, Hawkins, Neer, force de rotation externe, arc douloureux.",
      faux: ["3 tests : Lachman, tiroir antérieur, ressaut.", "Apprehension, relocation, release.", "Speed, O'Brien, biceps load II."],
      cot: "Nombre de tests positifs sur 5.", positif: "Si 3 tests sur 5 sont positifs : conflit cinématique avéré → tests de modification des symptômes.", diag: "Syndrome douloureux sous-acromial (SAPS).", incl: "Les tests de provocation sont utiles pour révéler un conflit cinématique, pas pour isoler une structure.", src: ["pap"] }),
    apprehension: T({ nom: "Apprehension test (Cools : marqueur de symptômes)", cat: "Épaule", img: ["cools-47", "cools-48", "cools-46"], but: "Instabilité antérieure ; chez Cools, marqueur : il oriente vers un conflit externe ou interne.",
      deroul: "Bras à 90° de flexion/abduction, rotation externe maximale (chez le sportif, majorer l'abduction ou la flexion pour reproduire les symptômes ; bras en dehors de la table ; se rapprocher du geste provocateur).",
      faux: ["Recentrer la tête humérale vers l'arrière.", "Bras le long du corps, traction vers le bas.", "Main derrière le dos, décoller la main."],
      cot: "Douleur (antérieure ou postérieure) et/ou appréhension.", positif: "Douleur antérieure : conflit sous-acromial (externe). Douleur postérieure : conflit gléno-huméral (interne). Appréhension : instabilité.", diag: "Instabilité ; marqueur de conflit.", incl: "Test de provocation. Il peut provoquer ou réduire les symptômes.", src: ["pap", "kob"] }),
    relocation: T({ nom: "Relocation test", cat: "Épaule", img: ["cools-49", "cools-46"], but: "Savoir si le conflit est primaire (structurel) ou secondaire (fonctionnel).",
      deroul: "Dans la position de l'apprehension, recentrer la tête humérale en postérieur et latéral (au-delà de 90° : postérieur, latéral et supérieur).",
      faux: ["Relâcher brusquement la tête humérale.", "Pousser la tête humérale vers l'avant.", "Tracter le bras vers le bas."],
      cot: "Disparition ou persistance de la douleur.", positif: "(+) si la douleur disparaît : conflit secondaire (fonctionnel), translation antérieure excessive. (−) si la douleur persiste : conflit primaire (structurel), indépendant de la position de la tête humérale.", diag: "Conflit primaire vs secondaire.", se: "52 % pour les SLAP (meilleure sensibilité, Hegedus 2012)", incl: "Marqueur de symptômes (Cools).", src: ["pap", "hedges"] }),
    release: T({ nom: "Release (anterior) test", cat: "Épaule", img: ["cools-50", "cools-46"], but: "Confirmer un conflit fonctionnel.",
      deroul: "À n'utiliser que si le relocation est positif (suspicion de protection musculaire de l'instabilité) : on relâche la tête humérale.",
      faux: ["On pousse la tête humérale vers l'arrière.", "On fait une élévation passive en rotation interne.", "On résiste à la rotation externe."],
      cot: "Réapparition de la douleur.", positif: "(+) si la douleur réapparaît : conflit fonctionnel.", diag: "Conflit secondaire (fonctionnel).", incl: "Suite du relocation.", src: ["pap"] }),
    loadshift: T({ nom: "Load and shift test", cat: "Épaule", img: ["cools-73"], but: "Évaluer la laxité antérieure (et postérieure) gléno-humérale.",
      deroul: "Patient assis, coussin sous le coude ; le kiné, derrière, empaume le moignon de l'épaule, centre la tête humérale (légère compression médiale et postérieure) puis la mobilise vers l'avant et en dedans, dans le plan de la glène.",
      faux: ["Traction vers le bas du coude, pouce dans le creux sous-acromial.", "Coude au zénith, poussée vers l'arrière.", "Élévation passive en rotation interne."],
      cot: "Grade 1 : tête au bord antérieur de la glène · 2 : au-delà, réductible instantanément · 3 : au-delà, non réductible (luxation).", positif: "Fin de mouvement trop lâche avec ressaut = instable (souple avec retour élastique = normal ; dure sans retour élastique = fixée en dysfonction ?).", diag: "Laxité antérieure.", incl: "Test de laxité (comparer les deux côtés).", src: ["pap"] }),
    sulcus: T({ nom: "Sulcus test (test du sillon)", cat: "Épaule", img: ["cools-75", "cools-76", "cools-77"], but: "Évaluer la laxité inférieure et multidirectionnelle.",
      deroul: "Assis, bras relâché, coussin sous l'avant-bras ; le kiné, derrière, tracte le coude vers le bas, pouce dans l'espace sous-acromial postérieur. Variante en décubitus dorsal.",
      faux: ["Rotation externe maximale à 90° d'abduction.", "Adduction horizontale passive.", "Pression de la main sur le ventre."],
      cot: "Fossette sous-acromiale, en mm, comparée à l'autre côté.", positif: "Fossette plus marquée que du côté sain : laxité inférieure, souvent signe d'instabilité multidirectionnelle. Déclic ou craquement : lésion du bourrelet ?", diag: "Instabilité inférieure / multidirectionnelle.", incl: "Test de laxité.", src: ["pap"] }),
    jerk: T({ nom: "Jerk test (posterior subluxation) et Fulcrum postérieur", cat: "Épaule", img: ["cools-78", "cools-79"], but: "Évaluer la laxité / instabilité postérieure.",
      deroul: "Jerk : bras en adduction, rotation interne et 70-90° de flexion, la main médiale fixe la scapula, poussée dans l'axe de la diaphyse humérale, puis abduction et rotation externe douces. Fulcrum postérieur : couché, petit coussin sous l'omoplate, coude au zénith, poussée de la tête humérale vers l'arrière.",
      faux: ["Recentrage de la tête humérale vers l'arrière en position d'armé.", "Traction vers le bas du bras.", "Rotation externe résistée."],
      cot: "Douleur, ressaut (« jerk »).", positif: "Douleur et/ou ressaut = instabilité postérieure (rare : 2 à 5 % des épaules instables).", diag: "Instabilité postérieure.", incl: "Test de laxité.", src: ["pap"] }),
    sat: T({ nom: "Scapular Assistance Test (SAT)", cat: "Épaule", img: ["cools-67", "cools-65"], but: "Tester l'implication de la scapula (qualité du mouvement) dans les symptômes.",
      deroul: "Pendant l'élévation active du bras, le kiné assiste la scapula en rotation vers le haut et en tilt postérieur.",
      faux: ["Le kiné fixe la scapula en rétraction pendant un test de force.", "Le kiné relâche brusquement la tête humérale.", "On mesure la rotation interne en décubitus."],
      cot: "Douleur avec et sans assistance.", positif: "(+) si la douleur diminue : la scapula est impliquée dans les symptômes.", diag: "Dyskinésie scapulaire.", incl: "Test de modification des symptômes.", src: ["pap"] }),
    srt: T({ nom: "Scapular Retraction Test (SRT)", cat: "Épaule", img: ["cools-68", "cools-65"], but: "Tester la stabilité scapulaire dans les symptômes.",
      deroul: "Le kiné stabilise la scapula en rétraction pendant un test (force ou douleur) de l'épaule.",
      faux: ["Le kiné assiste la rotation vers le haut pendant l'élévation.", "On mesure la fossette sous-acromiale.", "On teste la supination résistée."],
      cot: "Douleur / force avec et sans stabilisation.", positif: "(+) si la douleur diminue (ou la force augmente) : implication de la scapula.", diag: "Dyskinésie scapulaire.", incl: "Test de modification des symptômes.", src: ["pap"] }),
    speed: T({ nom: "Speed's test", cat: "Épaule", img: ["cools-82"], but: "Rechercher une pathologie du long biceps (ou SLAP).",
      deroul: "Élévation antérieure résistée, coude tendu, avant-bras en supination ; isométrique.",
      faux: ["Coude fléchi à 90°, résister à la supination.", "Bras à 90° d'abduction en rotation externe, résister à la flexion du coude.", "Bras à 90° de flexion et 10° d'adduction, pouce vers le bas."],
      cot: "Douleur et localisation.", positif: "(+) si douleur antérieure au biceps. Si négatif, ne pas poursuivre les autres tests biceps/SLAP. Douleur au deltoïde : coiffe.", diag: "Pathologie du long biceps.", incl: "Test de provocation.", src: ["pap"] }),
    obrien: T({ nom: "Test d'O'Brien (compression active)", cat: "Épaule", img: ["cools-84"], but: "Rechercher une lésion SLAP (cours : « seul test diagnostique »).",
      deroul: "Bras à 90° de flexion, 10-15° d'adduction, coude tendu : position A pouce vers le bas, résistance vers le bas ; position B paume vers le haut, même résistance.",
      faux: ["Coude au corps, résister à la supination.", "Main sur le ventre, presser.", "Rotation interne passive à 90° de flexion."],
      cot: "Douleur en A et en B.", positif: "(+) si douleur en A qui diminue ou disparaît en B. Douleur en A et en B : penser à l'acromio-claviculaire.", diag: "Lésion SLAP.", incl: "Prudence : nombreux tests SLAP aux performances non confirmées (Hegedus).", src: ["pap", "hedges"] }),
    bicepsload: T({ nom: "Biceps load test II", cat: "Épaule", img: ["cools-85", "kobus-9"], but: "Rechercher une lésion SLAP / souffrance du long biceps.",
      deroul: "Couché, bras à 120° d'abduction, coude fléchi à 90°, avant-bras en supination, rotation externe maximale ; le patient fléchit le coude contre résistance (le kiné cherche à l'ouvrir).",
      faux: ["Coude tendu, élévation antérieure résistée.", "Bras le long du corps, traction vers le bas.", "Rotation interne passive."],
      cot: "Douleur.", positif: "(+) si douleur profonde dans l'épaule (ou appréhension non modifiée par la contraction, douleur aggravée).", diag: "SLAP / long biceps.", incl: "Annoncé avec d'excellentes statistiques, non confirmées ensuite (Hegedus) ; Kobus : utile comme marqueur.", src: ["pap", "kob", "hedges"] }),
    yergason: T({ nom: "Test de Yergason", cat: "Épaule", img: ["kobus-8"], but: "Rechercher une tendinopathie du long biceps.",
      deroul: "Coude fléchi à 90°, avant-bras en pronation ; le kiné résiste à la supination.",
      faux: ["Élévation antérieure résistée coude tendu.", "Bras à 90° d'abduction en rotation externe maximale.", "Main derrière le dos."],
      cot: "Douleur.", positif: "Douleur locale en regard de la gouttière bicipitale.", diag: "Tendinopathie du long biceps.", se: "12 % (Kobus)", sp: "96 % (Kobus) ; meilleure spécificité pour les SLAP : 95 % (Hegedus 2012)", incl: "Plutôt pour INCLURE (très spécifique, peu sensible).", src: ["kob", "hedges"] }),
    patte: T({ nom: "Test de Patte", cat: "Épaule", img: ["kobus-5"], but: "Mettre en évidence une pathologie de l'infra-épineux et du petit rond.",
      deroul: "Assis, bras à 90° dans le plan de la scapula, coude fléchi à 90° ; le kiné stabilise la scapula et résiste à la rotation externe.",
      faux: ["Main sur le ventre, presser.", "Main derrière le dos, décoller.", "Rotation interne passive à 90° de flexion."],
      cot: "Douleur, faiblesse.", positif: "Douleur et/ou diminution de force du côté lésé.", diag: "Infra-épineux / petit rond.", se: "100 % (Kobus)", sp: "93 % (Kobus ; RV+ 14,29)", incl: "Kobus : « licorne » (une seule étude) : utile, en gardant son sens clinique.", src: ["kob"] }),
    belly: T({ nom: "Belly press test", cat: "Épaule", img: ["kobus-6"], but: "Mettre en évidence une pathologie du subscapulaire.",
      deroul: "Debout, main sur le ventre, poignet en rectitude, coude fléchi à 90° et décollé du tronc ; presser la main sur le ventre.",
      faux: ["Main derrière le dos, la décoller.", "Rotation externe résistée.", "Bras à 90°, pouces vers le bas."],
      cot: "Douleur, compensations.", positif: "Douleur et/ou incapacité à garder le poignet et le coude : flexion du poignet, coude qui recule vers le tronc.", diag: "Subscapulaire.", se: "17 % (Kobus)", sp: "92 % (Kobus)", incl: "Valeur insuffisante pour inclure ou exclure (Kobus). Alternative au lift-off si la rotation interne manque.", src: ["kob"] }),
    liftoff: T({ nom: "Lift-off test (Gerber)", cat: "Épaule", img: ["kobus-6"], but: "Mettre en évidence une pathologie du subscapulaire.",
      deroul: "Assis, main derrière le dos, coude fléchi à 90° ; décoller la main du dos (± contre la résistance du kiné).",
      faux: ["Main sur le ventre, presser.", "Rotation externe résistée.", "Élévation antérieure résistée."],
      cot: "Douleur, force.", positif: "Douleur et/ou diminution de force. Impossibilité de décoller la main sans résistance : rupture partielle ou totale du subscapulaire.", diag: "Subscapulaire.", se: "28 % (Kobus)", sp: "89 % (Kobus)", incl: "Valeur insuffisante pour inclure ou exclure (Kobus).", src: ["kob"] }),
    jobelat: T({ nom: "Test de Jobe latéral", cat: "Épaule", img: ["kobus-5"], but: "Mettre en évidence une tendinopathie / rupture de la coiffe.",
      deroul: "Bras à 90° d'abduction dans le plan frontal, rotation médiale maximale, coudes fléchis ; résistance vers le bas sur les coudes.",
      faux: ["Bras dans le plan de la scapula, coudes tendus, pouces vers le bas.", "Coude au corps, rotation externe résistée.", "Main sur le ventre."],
      cot: "Douleur, faiblesse.", positif: "Douleur, faiblesse ou impossibilité.", diag: "Coiffe des rotateurs (rupture).", se: "81 % (Kobus)", sp: "89 % (Kobus ; RV+ 7,36)", incl: "Plutôt pour INCLURE ; « raison d'être optimiste » selon Hegedus (une seule étude).", src: ["kob", "hedges"] }),
    crossarm: T({ nom: "Cross-arm test (adduction horizontale)", cat: "Épaule", img: ["kobus-8"], but: "Évaluer la mobilité / l'acromio-claviculaire.",
      deroul: "Assis ; le kiné fixe la scapula (prise entre clavicule et épine), élévation antérieure passive à 90°, puis adduction horizontale.",
      faux: ["Rotation externe à 90° d'abduction.", "Traction vers le bas.", "Supination résistée."],
      cot: "Douleur, angle humérus / ligne des épaules.", positif: "Douleur à l'épaule ou déficit de mobilité par rapport au côté opposé.", diag: "Arthropathie acromio-claviculaire / raideur postérieure.", sp: "82 % (Kobus)", incl: "Valeur insuffisante pour inclure ou exclure (Kobus).", src: ["kob"] }),
    gird: T({ nom: "Mesure du GIRD", cat: "Épaule", img: ["cools-89", "cools-90"], but: "Objectiver un déficit de rotation interne gléno-humérale (raideur postérieure).",
      deroul: "Rotation interne en décubitus dorsal, abduction 90° (goniomètre) ; adduction horizontale en décubitus latéral ; arc total (RI + RE) comparé à l'autre côté.",
      faux: ["Rotation interne coude au corps, debout.", "Test du sillon.", "Élévation passive en rotation interne."],
      cot: "Degrés, comparés à l'autre côté.", positif: "Déficit de RI (et d'arc total) par rapport au côté sain.", diag: "GIRD (sportifs overhead).", incl: "Goniométrie très fiable si même kiné avant et après (Riddle 1987) ; peu fiable en population pathologique à long terme (Borstad 2007). Interpréter aussi la sensation de fin de course.", src: ["pap"] }),
    // ===== Genou =====
    lachman: T({ nom: "Test de Lachman", cat: "Genou", ctx: ["genou-2"], but: "Rechercher une rupture du LCA.",
      deroul: "Décubitus dorsal, genou fléchi à environ 20-30° ; une main stabilise le fémur, l'autre tire le tibia vers l'avant ; on apprécie la translation et l'arrêt (dur ou mou), en comparant avec l'autre genou.",
      faux: ["Genou à 90°, pied fixé, traction du tibia vers l'avant.", "Valgus + rotation interne du tibia en passant de l'extension à la flexion.", "Flexion maximale puis rotations du tibia."],
      cot: "Translation antérieure, arrêt dur ou mou.", positif: "Translation antérieure augmentée avec arrêt mou par rapport au côté sain.", diag: "Rupture du LCA.", se: "86 % [IC95 76-92]", sp: "91 % [79-96]", incl: "Le plus SENSIBLE : un Lachman négatif permet d'EXCLURE une rupture quand la probabilité de départ est faible.", src: ["lach", "gen3"], video: yt("Lachman test physiotutors") }),
    tiroir: T({ nom: "Tiroir antérieur", cat: "Genou", but: "Rechercher une rupture du LCA.",
      deroul: "Décubitus dorsal, genou fléchi à 90°, pied fixé (le kiné s'assoit dessus) ; traction du tibia vers l'avant.",
      faux: ["Genou à 20-30°, une main sur le fémur, traction du tibia.", "Valgus + rotation interne de l'extension vers la flexion.", "Compression axiale en décubitus ventral."],
      cot: "Translation antérieure.", positif: "Translation antérieure augmentée par rapport au côté sain.", diag: "Rupture du LCA.", se: "62 % [42-78]", sp: "88 % [83-95]", incl: "Moins performant que le Lachman.", src: ["lach"], video: yt("anterior drawer test knee physiotutors") }),
    pivot: T({ nom: "Ressaut (pivot shift)", cat: "Genou", ctx: ["genou-2", "genou-5"], but: "Rechercher une rupture du LCA (instabilité rotatoire antérolatérale).",
      deroul: "Décubitus dorsal ; valgus et rotation interne du tibia en partant de l'extension vers la flexion : on recherche le ressaut de réduction du plateau tibial latéral (vers 20-40°).",
      faux: ["Traction antérieure du tibia, genou à 20-30°.", "Flexion maximale et rotations du tibia en cherchant un claquement.", "Compression axiale en décubitus ventral avec rotations."],
      cot: "Présent / absent.", positif: "Ressaut (subluxation antérieure du plateau tibial latéral qui se réduit).", diag: "Rupture du LCA.", se: "32 %", sp: "98 %", incl: "Le plus SPÉCIFIQUE : positif, il permet d'INCLURE (probabilité de rupture > 90 % si le contexte est évocateur). Souvent difficile chez le patient vigilant (défense).", src: ["lach", "gen3"], video: yt("pivot shift test physiotutors") }),
    mcmurray: T({ nom: "Test de McMurray", cat: "Genou", ctx: ["genou-4"], but: "Rechercher une lésion méniscale.",
      deroul: "Décubitus dorsal, genou en flexion maximale ; le kiné imprime des rotations du tibia (externe pour le ménisque médial, interne pour le latéral) en étendant progressivement le genou, un doigt sur l'interligne.",
      faux: ["Décubitus ventral, compression axiale et rotations.", "Traction antérieure du tibia à 20-30°.", "Glissement de la rotule vers le bas avec contraction du quadriceps."],
      cot: "Douleur, claquement.", positif: "Douleur et/ou claquement sur l'interligne.", diag: "Lésion méniscale.", incl: "À combiner avec l'anamnèse (blocage, accrochage) et la palpation de l'interligne (cas du cours).", src: ["gen3"], video: yt("McMurray test physiotutors") }),
    appley: T({ nom: "Test d'Apley (grinding)", cat: "Genou", ctx: ["genou-4"], but: "Différencier une lésion méniscale d'une atteinte ligamentaire.",
      deroul: "Décubitus ventral, genou à 90° ; compression axiale + rotations (ménisque), puis distraction + rotations (ligaments).",
      faux: ["Décubitus dorsal, flexion maximale puis extension en rotation.", "Traction antérieure à 20-30°.", "Valgus forcé en extension."],
      cot: "Douleur en compression vs en distraction.", positif: "Douleur en compression (soulagée en distraction) : ménisque ; en distraction : ligaments.", diag: "Lésion méniscale.", incl: "Test clinique du cas 3.", src: ["gen3"], video: yt("Apley test knee physiotutors") }),
    zohlen: T({ nom: "Signe de Zohlen (rabot)", cat: "Genou", ctx: ["genou-3"], but: "Provoquer une douleur fémoro-patellaire.",
      deroul: "Genou en extension, le kiné bloque la rotule vers le bas puis demande une contraction du quadriceps.",
      faux: ["Flexion maximale avec rotations.", "Traction antérieure du tibia.", "Valgus en flexion à 30°."],
      cot: "Douleur rétro-patellaire.", positif: "Douleur antérieure / rétro-patellaire.", diag: "Syndrome fémoro-patellaire (cas 2).", incl: "Test de provocation, à interpréter avec l'anamnèse (escaliers, accroupissement) et le step-down.", src: ["gen3"], video: yt("Clarke sign patellofemoral grind test") }),
    stepdown: T({ nom: "Step-down test", cat: "Genou", ctx: ["genou-3"], but: "Évaluer le contrôle dynamique du MI (valgus dynamique).",
      deroul: "Debout sur une marche sur le MI testé, descendre lentement l'autre talon vers le sol puis remonter ; on observe le genou, la hanche, le bassin, le tronc.",
      faux: ["Sauter 3 fois le plus loin possible sur une jambe.", "Rester 30 s en unipodal yeux fermés.", "Monter 10 marches le plus vite possible."],
      cot: "Qualité du mouvement.", positif: "Valgus dynamique du genou, chute du bassin, inclinaison du tronc.", diag: "Déficit de contrôle (hanche, quadriceps) : SFP, LCA.", incl: "Test fonctionnel (cas 2).", src: ["gen3"], video: yt("step down test physiotutors") }),
    // ===== Cheville / pied =====
    frick: T({ nom: "Test de Frick (rotation externe)", cat: "Cheville", ctx: ["tourne-3"], but: "Rechercher une lésion de la syndesmose tibio-fibulaire.",
      deroul: "Genou fléchi à 90°, flexion dorsale et rotation externe forcées de la cheville (variante en charge).",
      faux: ["Compression haute du tibia et de la fibula.", "Tiroir antérieur de cheville.", "Inversion forcée en flexion plantaire."],
      cot: "Douleur.", positif: "Douleur au niveau de la syndesmose.", diag: "Entorse de la syndesmose (« entorse haute »).", se: "30 à 71 %", sp: "85 %", incl: "Plutôt spécifique.", src: ["tourne"], video: yt("external rotation test syndesmosis") }),
    squeeze: T({ nom: "Squeeze test", cat: "Cheville", ctx: ["tourne-3"], but: "Rechercher une lésion de la syndesmose (et exclure une fracture malléolaire selon ta fiche OTR).",
      deroul: "Compression du tibia et de la fibula au tiers moyen de la jambe : cela écarte les deux os en distal.",
      faux: ["Flexion dorsale et rotation externe forcées.", "Translation antéro-postérieure de la fibula.", "Talon frappé vers le haut."],
      cot: "Douleur distale.", positif: "Douleur à la syndesmose.", diag: "Lésion ligamentaire de la syndesmose.", se: "30 %", sp: "88 à 93,5 %", incl: "Spécifique, peu sensible : positif = INCLURE ; négatif n'exclut pas.", src: ["tourne", "recapOTR"], video: yt("squeeze test ankle physiotutors") }),
    cotton: T({ nom: "Test de Cotton / crossed-leg test", cat: "Cheville", ctx: ["tourne-3"], but: "Rechercher une instabilité de la syndesmose (translation médio-latérale du talus).",
      deroul: "Cotton : translation médio-latérale du talus comparée au côté sain. Crossed-leg : assis, le patient croise la jambe blessée sur l'autre, appui à la jonction tiers moyen / tiers distal.",
      faux: ["Compression haute tibia-fibula.", "Inversion forcée.", "Flexion dorsale en charge, genou vers le mur."],
      cot: "Translation, douleur.", positif: "Translation plus grande que du côté sain ; douleur à la syndesmose.", diag: "Instabilité de la syndesmose.", incl: "Complète Frick et squeeze. Translation de la fibula : course antéro-postérieure excessive.", src: ["tourne"] }),
    sebt: T({ nom: "Star Excursion Balance Test (SEBT) / Y-Balance", cat: "Cheville", img: ["forestier-4"], but: "Évaluer le contrôle postural dynamique (instabilité de cheville, risque de blessure, retour au sport).",
      deroul: "Pieds nus, en unipodal au centre, mains sur les hanches : atteindre le plus loin possible avec l'autre pied dans chaque direction sans poser le pied, puis revenir. Version simplifiée : 3 directions (antérieure, postéro-médiale, postéro-latérale). 4 essais d'entraînement, puis 3 essais mesurés (moyenne).",
      faux: ["Sauter 10 fois entre deux lignes à 30 cm.", "Tenir 30 s en unipodal yeux fermés.", "Marcher en tandem sur 3 m."],
      cot: "Distance atteinte, NORMALISÉE à la longueur du MI (en % de la longueur), comparée au côté sain.", positif: "Distances plus faibles que du côté sain ou que les normes. Un score composite bas est associé à un risque de blessure plus élevé (basketteuses : 6 fois plus de blessures).", diag: "Déficit de contrôle postural dynamique (instabilité chronique, LCA, SFP…).", incl: "Fiable, valide, sensible au traitement (Gribble 2012). La flexion dorsale de cheville influence l'atteinte antérieure.", src: ["gribble", "forest", "recapOTR"], video: yt("Y balance test physiotutors") }),
    sidehop: T({ nom: "Side hop test", cat: "Cheville", but: "Évaluer l'aptitude au retour au sport de la cheville.",
      deroul: "10 sauts unipodaux latéraux entre deux marques séparées de 30 cm, chronométrés ; comparer au côté sain.",
      faux: ["Atteindre le plus loin possible dans 3 directions.", "Monter sur la pointe des pieds 25 fois.", "Courir 6 minutes."],
      cot: "Temps, différence entre les côtés.", positif: "Ta fiche OTR : différence > 30 % = pas de retour à la course ; vise 10 % pour un retour sur le terrain.", diag: "Déficit fonctionnel de cheville.", incl: "Test de retour au sport (avec SEBT, Ankle-GO).", src: ["recapOTR", "sport1"] }),
    ottawa: T({ nom: "Règles d'Ottawa (cheville)", cat: "Cheville", but: "Décider s'il faut une radiographie après un traumatisme de cheville (exclure une fracture).",
      deroul: "Douleur de la zone malléolaire + : sensibilité osseuse au bord postérieur ou à la pointe d'une malléole (6 derniers cm), ou à la base du 5e métatarsien, ou au naviculaire, ou incapacité de faire 4 pas (immédiatement et aux urgences).",
      faux: ["Compression haute tibia-fibula.", "Tiroir antérieur.", "Mesure de la flexion dorsale en charge."],
      cot: "Présence d'un des critères.", positif: "Un critère présent : radiographie.", diag: "Fracture (cheville, médio-pied).", incl: "Outil d'EXCLUSION (très sensible) : aucun critère = radio inutile. Ta fiche OTR : à faire si le trauma est récent.", src: ["recapOTR", "gen3"] }),
    windlass: T({ nom: "Windlass test", cat: "Pied", but: "Provoquer une douleur de fasciite plantaire.",
      deroul: "Extension passive de l'hallux (en charge ou en décharge), qui met l'aponévrose plantaire en tension.",
      faux: ["Compression latérale du calcanéum.", "Percussion du nerf tibial derrière la malléole médiale.", "Flexion dorsale + éversion."],
      cot: "Douleur.", positif: "Reproduction de la douleur au talon / à l'insertion de l'aponévrose.", diag: "Fasciite plantaire.", incl: "Recommandé parmi les mesures cliniques (CPG 2008, repris en 2014).", src: ["pf"] })
  });

  // ---------------- Pathologies ----------------
  const kineTerr = items => `<ul>${items.map(x => `<li>${x}</li>`).join("")}</ul>`;
  const slides = (deck, pages, cap) => `<div class="mslides">${pages.map(p => `<figure><img class="mimg" data-mi="${deck}-${p}" alt="Diapo ${p}"><figcaption>${cap} p. ${p}</figcaption></figure>`).join("")}</div>`;

  const epaule = {
    id: "epaule-cools", cell: "otr", titre: "Épaule douloureuse : algorithme d'Ann Cools", court: "Épaule douloureuse",
    statut: "Cours de B. Papalia (tests) + articles à lire (Hegedus 2012, Kobus, Lin 2018). Les diapos du cours sont dans chaque chapitre.",
    resume: [
      "<b>Conflit = ensemble de symptômes</b>, pas un diagnostic. Mécanismes sous-jacents : coiffe des rotateurs, dyskinésie scapulaire, instabilité, biceps / SLAP, GIRD (± anomalies sous-acromiales : calcifications, bursite, ostéophytes → imagerie).",
      "<b>Conflit externe = sous-acromial</b> : douleur ANTÉRIEURE, arc douloureux 60-120°, patient > 35 ans. <b>Conflit interne postéro-supérieur</b> : douleur POSTÉRIEURE en armé (abduction + RE max), sports de lancer, patient < 35 ans, 1re cause de douleur chronique chez le sportif.",
      "<b>Primaire = structurel</b> (espace sous-acromial rétréci : acromion, arthropathie AC, gonflement) ; <b>secondaire = fonctionnel</b> (pas d'anomalie structurelle : problème de position, de cinématique).",
      "<b>Étape 1</b> : tests de provocation (Jobe, Hawkins, Neer 1 / 2) + cluster de Michener (3/5 positifs = conflit cinématique). <b>Étape 2</b> : tests d'instabilité détournés en marqueurs (apprehension → douleur antérieure ou postérieure ; relocation → primaire si la douleur persiste, secondaire si elle disparaît ; release → fonctionnel).",
      "<b>Étape 3</b> : chercher la cause : empty can vs full can (coiffe), SAT et SRT (scapula), laxité (load & shift, sulcus, jerk), biceps / SLAP (Speed, O'Brien, biceps load II), GIRD (RI à 90° d'abduction, arc total).",
      "<b>Hegedus 2012</b> : aucun test isolé n'est pathognomonique ; Neer Se 72 / Sp 60, Hawkins Se 79 / Sp 59, arc douloureux Se 53 / Sp 76. Les combinaisons aident un peu : anamnèse + examen complet.",
      "<b>Traitement de la dyskinésie</b> : peu de preuves que la stabilisation spécifique soit supérieure à des exercices plus généraux (Struyf 2013). Berckmans 2022 : 2 exercices en décubitus latéral (RE, flexion) pour le trapèze moyen et inférieur, même si le petit pectoral est hyperactif ; prudence avec l'élévateur de la scapula et le rhomboïde hyperactifs."
    ],
    pro: [
      { id: "conflit", titre: "Conflits : externe, interne, primaire, secondaire", src: ["pap"], html: `<p>Depuis Codman et Neer, douleur d'épaule = douleur mécanique de conflit. Aujourd'hui : aspect mécanique ET cinématique, <b>ensemble de symptômes</b>. Mécanismes : pathologie de la coiffe, dyskinésie scapulaire, instabilité, biceps, SLAP, GIRD.</p>
<table class="mt"><tr><th></th><th>Externe / sous-acromial</th><th>Interne postéro-supérieur</th><th>Interne antéro-supérieur (sous-coracoïdien)</th></tr>
<tr><td>Structures</td><td>Tendons de la coiffe contre le bec de l'acromion et le ligament acromio-coracoïdien (± ostéophytes AC) ; face supérieure du supra-épineux</td><td>Supra- et infra-épineux contre le rebord postéro-supérieur de la glène (bras en abduction + RE)</td><td>Jonction subscapulaire / supra-épineux contre la coracoïde ; LGHM ; biceps</td></tr>
<tr><td>Clinique</td><td>Douleur en abduction active 60-120° (arc douloureux), > 35 ans</td><td>Douleur en RE max / abduction horizontale, phase d'armé ; sports de lancer (volley, hand, tennis) ; < 35 ans ; souvent instabilité antérieure ou rétraction capsulaire postéro-inférieure</td><td>Rare, peu de littérature (non abordé ensuite)</td></tr></table>
<p><b>Primaire = structurel</b> : rétrécissement de l'espace sous-acromial (arthropathie AC, acromion de type II ou III, gonflement des tissus mous). <b>Secondaire = fonctionnel</b> : pas d'anomalie structurelle ; problème dans certaines positions → place au paradigme de <b>modification des symptômes</b>.</p>
<p><b>SAPS</b> (subacromial pain syndrome) : terme « parapluie » remplaçant « conflit sous-acromial » : tendinopathie de la coiffe, déchirures partielles, bursite. Depuis 2000 : impossible d'identifier une structure responsable → nouveau paradigme.</p>${slides("cools", [9, 13, 17, 20], "Cours Papalia")}` },
      { id: "algo", titre: "Algorithme d'Ann Cools et tests de provocation", src: ["pap", "hedges"], html: `<p>Algorithme 2008 (revisité 2016) : <b>1)</b> conflit sous-acromial ou gléno-huméral ? <b>2)</b> primaire (structurel) ou secondaire (fonctionnel) ? <b>3)</b> quelle cause ?</p>
<ul><li><b>Jobe / empty can</b> (isométrique, assis) : douleur antérieure = conflit sous-acromial ; négatif dans le conflit interne (position trop éloignée de l'armé).</li><li><b>Hawkins</b> (passif) : douleur antérieure = sous-acromial. Ne jamais corriger la position avant le test.</li><li><b>Neer 1</b> (main sur le toit de l'épaule, RI, élévation passive) : douleur antérieure = sous-acromial. <b>Neer 2 modifié</b> (main sur la scapula, RE, élévation passive) : douleur postérieure = gléno-huméral interne.</li><li><b>Cluster de Michener (2009)</b> : Jobe, Hawkins, Neer, force de RE, arc douloureux. 3/5 positifs = conflit cinématique → modification des symptômes. Ces tests révèlent un conflit, ils ne posent pas de diagnostic de structure.</li></ul>
<p><b>Hegedus 2012</b> (méta-analyse) : Neer Se 72 % / Sp 60 % ; Hawkins-Kennedy Se 79 % / Sp 59 % ; arc douloureux Se 53 % / Sp 76 %. Hawkins = le plus sensible ; aucun test isolé n'est pathognomonique ; les combinaisons n'améliorent que légèrement la précision.</p>${slides("cools", [21, 25, 29, 31, 32, 33, 34, 35], "Cours Papalia")}` },
      { id: "instab", titre: "Tests d'instabilité comme marqueurs (primaire / secondaire) et laxité", src: ["pap"], html: `<table class="mt"><tr><th>Apprehension</th><th>Relocation</th><th>Release</th><th>Conclusion</th></tr>
<tr><td>Douleur antérieure</td><td>(−) douleur persiste</td><td>—</td><td>Conflit EXTERNE PRIMAIRE (structurel)</td></tr>
<tr><td>Douleur postérieure</td><td>(−)</td><td>—</td><td>Conflit INTERNE PRIMAIRE</td></tr>
<tr><td>Douleur antérieure ou postérieure</td><td>(+) douleur disparaît</td><td>(+) douleur réapparaît</td><td>Conflit SECONDAIRE (fonctionnel), translation antérieure excessive</td></tr></table>
<p>Apprehension : 90° de flexion/abduction, RE max ; chez le sportif, majorer pour reproduire le geste. Relocation : recentrer la tête humérale en postérieur et latéral (+ supérieur au-delà de 90°). Release : uniquement si relocation positif. « Relocation test de Jobe » (suite du release, non décrit par Cools) : douleur persistante → structurel, labrum ?</p>
<p><b>Instabilité</b> : douleur, mais aussi peur, appréhension, refus du test. Laxité : score de Beighton (≥ 5/9). <b>Load & shift</b> (laxité antérieure, grades 1-3), <b>sulcus</b> (inférieure, multidirectionnelle), <b>jerk / fulcrum postérieur</b> (postérieure : 2 à 5 % des épaules instables).</p>${slides("cools", [40, 47, 49, 50, 51, 73, 75, 78, 79], "Cours Papalia")}` },
      { id: "causes", titre: "Coiffe, scapula, biceps-SLAP, GIRD", src: ["pap", "kob", "hedges"], html: `<ul>
<li><b>Coiffe</b> : empty can (+) et full can (−) → conflit sans atteinte de la coiffe ; les deux (+) → coiffe ; grosse faiblesse → déchirure. Conflit primaire : la réaction inflammatoire rétrécit l'espace ; secondaire : la coiffe n'assure plus le glissement caudal → la tête humérale remonte. Kobus : Patte (infra-épineux, Se 100 / Sp 93), belly press et lift-off (subscapulaire, valeur insuffisante), Jobe latéral (Se 81 / Sp 89).</li>
<li><b>Dyskinésie scapulaire</b> (Kibler 1998, Cools 2007) : en élévation, la scapula ne suit pas assez (manque de rotation vers le haut, de tilt postérieur, de RE). Mouvements : rotation médiale/latérale (axe cranio-caudal), rotation haut/bas = sonnettes (axe antéro-postérieur), tilt antérieur/postérieur (axe médio-latéral ; en tilt antérieur l'angle inférieur recule). <b>SAT</b> (qualité du mouvement) et <b>SRT</b> (stabilité) : positifs si la douleur diminue.</li>
<li><b>Biceps / SLAP</b> : Speed (si négatif, ne pas continuer ; douleur au deltoïde = coiffe), O'Brien (« seul test diagnostique » ; douleur en A et B → AC ?), biceps load II. Grande prudence avec les tests portant le nom de leur auteur (Hegedus 2008). Meilleure combinaison (Oh 2008) : [Crank, O'Brien, apprehension antérieure] 2/3 + [Speed, Yergason, biceps load II] 1/3 → Se 75 % ; 2/3 + 3/3 → Sp 90 %. Hegedus 2012 : meilleure Se pour les SLAP = relocation (52 %), meilleure Sp = Yergason (95 %).</li>
<li><b>GIRD</b> : raideur postérieure ; RI en décubitus à 90° d'abduction, adduction horizontale en décubitus latéral, arc total (RI + RE) comparé à l'autre côté.</li>
<li><b>Examen du sportif overhead</b> : entretien motivationnel (anamnèse approfondie), red flags, inspection, tests actifs, passifs, résistés, tests de provocation, imagerie, puis palpation APRÈS l'examen.</li></ul>${slides("cools", [59, 60, 63, 64, 67, 68, 82, 84, 85, 87, 89, 90], "Cours Papalia")}` },
      { id: "kobus", titre: "Algorithme Kobus et red flags", src: ["kob", "lin"], html: `<p><b>L'entretien</b> sert à diminuer la probabilité d'une douleur projetée (cervicales), radiculaire, viscérale, et à éliminer les pathologies sérieuses. <b>Red flags</b> : douleur liée à un effort cardiaque, douleur sans lien avec la sollicitation de l'épaule, douleur nocturne, asthénie, perte de poids, atteinte neurologique, antécédent de cancer, traumatisme récent → référer au médecin.</p>
<p><b>Catégories</b> : épaule instable (traumatisme ou épisode d'instabilité : apprehension, relocation) ; épaule raide (capsulite, omarthrose ; perte de RE coude au corps, shrug sign) ; coiffe (drop arm, belly press, Jobe latéral, Patte, lift-off ; bursite : Hawkins, Neer ; tendinopathie calcifiante : fortes douleurs soudaines, nocturnes) ; biceps (biceps load II, Yergason) ; clavicule (AC : cross-arm ; SC) ; épaule faible (Parsonage-Turner, nerf thoracique long) ; douleurs référées (rachis cervical) ; tableau peu clair → surveillance active.</p>
<p><b>Lin 2018</b> (11 recommandations, dont l'épaule) : soins centrés sur le patient, dépister les red flags, évaluer les facteurs psychosociaux, imagerie sélective, examen physique, suivre les progrès, éduquer, activité physique et exercice, thérapie manuelle seulement en complément, soins non chirurgicaux de qualité avant la chirurgie, aider à rester au travail.</p>${slides("kobus", [3], "Pack Kobus")}` },
      { id: "ttt", titre: "Traitement et exercices", src: ["pap", "lin"], html: `<ul><li><b>Dyskinésie</b> : peu de preuves que les exercices de stabilisation scapulaire fassent mieux que des exercices plus généraux (Struyf 2013). Exercices montrés : 90° neutre, 90° en RE, 120° neutre, 120° en RE, 90° coudes fléchis en RE, « Iron Man ».</li>
<li><b>Berckmans 2022</b> : stabilisateurs profonds (élévateur de la scapula et rhomboïde = sonnette interne ; petit pectoral = tilt antérieur) vs superficiels (trapèzes supérieur, moyen, inférieur ; dentelé antérieur). Les 2 exercices en décubitus latéral (RE coude au corps avec serviette ; flexion à 90°) renforcent le trapèze moyen et inférieur même en cas d'hyperactivité du petit pectoral ; les exercices en procubitus (abduction horizontale avec RE ; extension) : prudence en cas d'hyperactivité de l'élévateur ou du rhomboïde.</li>
<li><b>EMG (diapos Kiné TOP)</b> : l'élévation dans le plan de la scapula en quadrupédie ou en décubitus ventral active le plus le trapèze inférieur (meilleur ratio trapèze sup / inf) ; l'activité du dentelé antérieur est maximale en élévation dans le plan de la scapula avec 1,8 kg ; ces données ne guident qu'en théorie : un exercice « optimal » peut être mal toléré.</li>
<li><b>Situations cliniques</b> (diapos 102-113) : pour chaque douleur (fin d'abduction, 30°, arc douloureux, retour d'abduction, flexion, main dans le dos…), identifier les groupes musculaires (coiffe, axio-scapulaires), leur rôle (mobilisateur / stabilisateur), le secteur (course interne, moyenne, externe) et le type de contraction. Ex. abduction en fin d'amplitude : coiffe antérieure antagoniste de la RL, en course externe, excentrique ; coiffe postérieure mobilisatrice en RL, course interne, concentrique ; deltoïde mobilisateur concentrique ; le rôle stabilisateur de la coiffe diminue car les contraintes ascensionnelles du deltoïde sont faibles.</li></ul>${slides("cools", [92, 93, 94, 97, 98, 99, 103, 105, 107, 109, 111], "Cours Papalia")}` }
    ],
    qcm: [
      { id: "e1", part: "conflit", q: "Douleur antérieure entre 60 et 120° d'abduction active chez un patient de 50 ans :", a: ["Conflit sous-acromial (externe)"], d: ["Conflit postéro-supérieur interne", "Instabilité postérieure", "GIRD isolé"], src: "pap" },
      { id: "e2", part: "conflit", q: "Conflit postéro-supérieur interne : position typique douloureuse", a: ["Abduction + rotation externe maximale (armé du lancer)"], d: ["Rotation interne coude au corps", "Bras le long du corps", "Adduction horizontale"], src: "pap" },
      { id: "e3", part: "conflit", q: "Conflit primaire vs secondaire :", a: ["Primaire = structurel ; secondaire = fonctionnel"], d: ["Primaire = fonctionnel ; secondaire = structurel", "Primaire = interne ; secondaire = externe", "Primaire = aigu ; secondaire = chronique"], src: "pap" },
      { id: "e4", part: "conflit", q: "Le SAPS (syndrome douloureux sous-acromial) regroupe (plusieurs réponses) :", a: ["Tendinopathie de la coiffe", "Déchirures partielles", "Bursite"], d: ["Capsulite rétractile", "Instabilité multidirectionnelle"], src: "pap" },
      { id: "e5", part: "algo", q: "Cluster de Michener : combien de tests positifs pour un conflit cinématique avéré ?", a: ["3 sur 5"], d: ["1 sur 5", "5 sur 5", "2 sur 3"], src: "pap" },
      { id: "e6", part: "algo", q: "Les 5 tests du cluster de Michener (plusieurs réponses) :", a: ["Jobe / empty can", "Hawkins", "Neer", "Force de rotation externe", "Arc douloureux"], d: ["Apprehension"], src: "pap" },
      { id: "e7", part: "algo", q: "Neer 2 « modifié » : douleur POSTÉRIEURE signe…", a: ["Un conflit gléno-huméral interne"], d: ["Un conflit sous-acromial", "Une rupture du subscapulaire", "Une arthropathie AC"], src: "pap" },
      { id: "e8", part: "algo", q: "Hegedus 2012 : le test de conflit le plus SENSIBLE est…", a: ["Hawkins-Kennedy (Se 79 %)"], d: ["Neer (Se 72 %)", "Arc douloureux (Se 53 %)", "Yergason"], src: "hedges" },
      { id: "e9", part: "algo", q: "Conclusion de Hegedus 2012 :", a: ["Aucun test isolé ne permet un diagnostic pathognomonique ; anamnèse + examen complet"], d: ["Le Neer suffit pour diagnostiquer un conflit", "Les combinaisons de tests sont parfaites", "L'imagerie est inutile"], src: "hedges" },
      { id: "e10", part: "instab", q: "Apprehension (+) avec douleur antérieure, relocation (−) :", a: ["Conflit externe primaire (structurel)"], d: ["Conflit externe secondaire", "Conflit interne secondaire", "Épaule normale"], src: "pap" },
      { id: "e11", part: "instab", q: "Relocation (+) = la douleur…", a: ["Disparaît : conflit secondaire (fonctionnel)"], d: ["Persiste : conflit secondaire", "Disparaît : conflit primaire", "Augmente : lésion SLAP certaine"], src: "pap" },
      { id: "e12", part: "instab", q: "Quand utiliser le release test ?", a: ["Uniquement si le relocation est positif"], d: ["Toujours en premier", "Uniquement si l'apprehension est négative", "Jamais chez le sportif"], src: "pap" },
      { id: "e13", part: "instab", q: "Load & shift grade 2 :", a: ["Tête humérale au-delà de la glène, réductible instantanément"], d: ["Tête au bord antérieur de la glène", "Tête au-delà de la glène, non réductible", "Aucune translation"], src: "pap" },
      { id: "e14", part: "instab", q: "Sulcus test positif évoque souvent :", a: ["Une instabilité multidirectionnelle (laxité inférieure)"], d: ["Une rupture du LCA", "Un conflit interne isolé", "Une capsulite"], src: "pap" },
      { id: "e15", part: "causes", q: "Empty can (+) et full can (−) :", a: ["Conflit sous-acromial sans atteinte de la coiffe"], d: ["Atteinte de la coiffe", "Rupture complète du supra-épineux", "Instabilité postérieure"], src: "pap" },
      { id: "e16", part: "causes", q: "SAT et SRT sont positifs si…", a: ["La douleur diminue avec l'assistance / la stabilisation de la scapula"], d: ["La douleur augmente", "La force diminue", "Le patient ressent de l'appréhension"], src: "pap" },
      { id: "e17", part: "causes", q: "Speed's test négatif :", a: ["On ne poursuit pas avec les autres tests biceps / SLAP"], d: ["On fait obligatoirement O'Brien", "On conclut à une lésion SLAP", "On refait le test plus fort"], src: "pap" },
      { id: "e18", part: "causes", q: "O'Brien : douleur en position A ET en position B :", a: ["Penser à l'articulation acromio-claviculaire"], d: ["Lésion SLAP certaine", "Rupture du subscapulaire", "Test normal"], src: "pap" },
      { id: "e19", part: "causes", q: "Test de Patte (Kobus) : quels muscles ?", a: ["Infra-épineux et petit rond"], d: ["Subscapulaire", "Supra-épineux seul", "Long biceps"], src: "kob" },
      { id: "e20", part: "causes", q: "Yergason (Se 12 %, Sp 96 %) : utile pour…", a: ["INCLURE (positif = forte probabilité)"], d: ["EXCLURE (négatif = pas de lésion)", "Ni l'un ni l'autre", "Mesurer la force"], src: "kob" },
      { id: "e21", part: "causes", q: "En tilt antérieur de la scapula, l'angle inférieur…", a: ["Recule"], d: ["Avance", "Monte", "Ne bouge pas"], src: "pap" },
      { id: "e22", part: "kobus", q: "Red flags d'une douleur d'épaule (plusieurs réponses) :", a: ["Douleur liée à un effort cardiaque", "Antécédent de cancer, perte de poids", "Douleur nocturne"], d: ["Douleur à l'abduction à 90° uniquement"], src: "kob" },
      { id: "e23", part: "kobus", q: "Lin 2018 : place de la thérapie manuelle ?", a: ["Seulement en complément d'autres traitements (exercice, éducation)"], d: ["Traitement de première intention isolé", "Contre-indiquée", "Uniquement après chirurgie"], src: "lin" },
      { id: "e24", part: "ttt", q: "Berckmans 2022 : exercices conseillés pour le trapèze moyen et inférieur, même si le petit pectoral est hyperactif :", a: ["Les 2 exercices en décubitus latéral (RE et flexion)"], d: ["Les exercices en procubitus uniquement", "Shrugs", "Pompes"], src: "pap" },
      { id: "e25", part: "ttt", q: "Struyf 2013 : les exercices de stabilisation scapulaire…", a: ["Ne semblent pas supérieurs à des exercices plus généraux"], d: ["Sont toujours supérieurs", "Sont contre-indiqués", "Remplacent l'éducation"], src: "pap" }
    ],
    patients: [{ id: "pepa", nom: "Illustration : volleyeur de 24 ans, conflit postéro-supérieur interne", origine: "invente", src: "pap", desc: "Douleur postérieure en armé (abduction + RE max), sport de lancer, < 35 ans. Construite d'après le cours.", attrs: { douleurs: [{ zone: "epauleD", type: "mecanique" }] } },
      { id: "pepa2", nom: "Illustration : 52 ans, syndrome douloureux sous-acromial", origine: "invente", src: "pap", desc: "Douleur antérieure, arc douloureux 60-120°.", attrs: { douleurs: [{ zone: "epauleG", type: "mecanique" }], echarpe: "" } }],
    cas: [{ id: "casepa", origine: "invente", src: ["pap"], patient: "pepa", titre: "Volleyeur douloureux à l'armé (entraînement à l'algorithme)",
      fiche: "Cas inventé pour s'entraîner à l'algorithme du cours. Volleyeur de 24 ans, douleur postérieure de l'épaule droite lors du smash depuis 3 mois.",
      etapes: [
        { type: "choix", titre: "Résultats → interprétation", consigne: "Coche les interprétations JUSTES.", src: "pap", items: [
          { t: "Neer 2 modifié : douleur postérieure → conflit gléno-huméral interne", ok: true },
          { t: "Apprehension : douleur postérieure, relocation : la douleur disparaît → conflit interne secondaire (fonctionnel)", ok: true },
          { t: "Release : la douleur réapparaît → confirme le conflit fonctionnel", ok: true },
          { t: "Relocation (+) → conflit primaire structurel", ok: false, why: "Relocation (+) = la douleur disparaît = SECONDAIRE (fonctionnel)." },
          { t: "Il faut mesurer le GIRD (RI à 90° d'abduction, arc total comparé)", ok: true },
          { t: "Un Hawkins positif suffit à diagnostiquer une rupture du supra-épineux", ok: false, why: "Test de provocation peu spécifique (Sp 59 %) : il révèle un conflit, pas une structure." }
        ] }
      ] }]
  };

  const lca = {
    id: "lca", cell: "sport", titre: "Rupture du LCA : diagnostic, ligamentoplastie, réathlétisation", court: "LCA",
    statut: "Cas cliniques genou du cours (BLOC 3) + articles à lire (méta-analyse Lachman / ressaut ; réathlétisation, Kinésithérapie la revue 2021).",
    resume: [
      "<b>Contexte typique</b> (cas 1) : footballeur de 22 ans, tacle, « crack », gonflement rapide, appui difficile ; Lachman et ressaut positifs ; Ottawa négatif.",
      "<b>Tests</b> : Lachman Se 86 % / Sp 91 % (le plus SENSIBLE : négatif → exclut quand la probabilité est faible) ; ressaut Se 32 % / Sp 98 % (le plus SPÉCIFIQUE : positif → inclut ; > 90 % si contexte évocateur) ; tiroir antérieur Se 62 % / Sp 88 %.",
      "<b>Biais</b> : aucune étude en aveugle, biais de vérification dans 15/17 études → la précision est surestimée.",
      "<b>Retour au sport</b> (Picard 2021) : pivots et changements de direction autorisés entre 6 et 9 mois ; critères : genou sec, indolore, stable, amplitudes physiologiques ; isocinétique à 6 mois avec déficit max 30 % quadriceps et 15 % ischio-jambiers, ratio de Croisier > 0,9 ; course 30 min ; ACL-RSI (appréhension) et IKDC.",
      "<b>Objectif</b> : moins de 10 % de déficit de force et d'endurance par rapport au côté sain. Récidive ou lésion controlatérale : 5,9 % (population générale) jusqu'à 25,3 % (sports à pivots).",
      "<b>Instabilité chronique</b> (cas 4) : objectiver l'instabilité (pivot shift, isocinétique, hop tests, questionnaires), tests de retour au sport, programme de réathlétisation progressif."
    ],
    pro: [
      { id: "diag", titre: "Diagnostic : Lachman, tiroir, ressaut", src: ["lach", "gen3"], html: `<table class="mt"><tr><th>Test</th><th>Sensibilité</th><th>Spécificité</th><th>Usage</th></tr>
<tr><td>Lachman</td><td>86 % [76-92]</td><td>91 % [79-96]</td><td>Le plus sensible : négatif → exclut</td></tr>
<tr><td>Tiroir antérieur</td><td>62 % [42-78]</td><td>88 % [83-95]</td><td>Moins bon</td></tr>
<tr><td>Ressaut (pivot shift)</td><td>32 %</td><td>98 %</td><td>Le plus spécifique : positif → inclut</td></tr></table>
<p>Méta-analyse de 17 études (Medline 1966-2004, Embase 1980-2004), référence : arthrotomie, arthroscopie ou IRM. Commentaire (M. Prins) : aucune étude en aveugle ni en médecine générale ; biais de vérification dans 15/17 → précision surestimée.</p>
<p><b>Interprétation selon la probabilité de départ</b> : si elle est > 50 %, même un Lachman négatif laisse au moins 10 % de probabilité de rupture. Si elle est faible (< 10 %), un Lachman négatif la fait passer sous 3 %, et un ressaut positif la fait monter à 40-60 %. Contexte évocateur + ressaut positif : > 90 % (imagerie de confirmation inutile avant l'arthroscopie).</p>
<p class="small">Mécanisme (cas 1) : tacle, « crack », gonflement rapide (hémarthrose), appui difficile. Ottawa (genou) pour exclure une fracture.</p>${slides("genou", [2, 5], "Cas cliniques genou")}` },
      { id: "rlg", titre: "Réathlétisation et retour au sport (Picard 2021)", src: ["rlg"], html: `<p><b>Phases</b> : retour à la participation (kiné libérale) → retour au sport (programme intensif) → retour à la performance (compétition ; pour le militaire : le terrain). Aptitude décidée à 1 an selon les lésions associées et la laxité résiduelle.</p>
<p><b>Entrée dans le programme</b> (entre 6 et 9 mois post-op, pivots et changements de direction réautorisés) :</p><ul><li>Examen clinique : genou sec, indolore, stable, sans laxité anormale, amplitudes physiologiques.</li><li>Isocinétique à 6 mois : déficit max 30 % pour le quadriceps, 15 % pour les ischio-jambiers ; rapport de Croisier (IJ excentrique 30°/s ÷ quadriceps concentrique 240°/s) > 0,9.</li><li>Reprise sportive indolore : course 30 min, renforcement, proprioception.</li><li>Questionnaires : ACL-RSI (appréhension), IKDC (fonction).</li></ul>
<p>Critères les plus utilisés dans la littérature (Burgi) : délai post-opératoire (85 %), force (41 %), examen clinique (26 %), performances (20 %), hop tests (14 %), ressenti (12 %). Les critères fonctionnels et psychologiques sont au moins aussi importants.</p>
<p><b>Contenu</b> (3 semaines) : pré-activation, 2 séances par jour, récupération. Renforcement pour atteindre moins de 10 % de déficit (force et endurance) : ischio-jambiers (protecteurs du transplant), quadriceps (déficit lié à la douleur persistante et à la récidive), contrôle moteur du tronc et des hanches (changements de direction, sauts, réceptions), pliométrie, explosivité ; course (endurance environ 1 h avec 100 m de dénivelé, vitesse, résistance d'après la VMA) ; cardio sans impact (natation).</p>
<p><b>Risque</b> : récidive ou lésion controlatérale 5,9 % (population générale, surtout 2 premières années) ; jusqu'à 25,3 % chez les sportifs à pivots.</p>` },
      { id: "cas", titre: "Cas cliniques genou du cours", src: ["gen3"], html: `<p>Les 5 cas du cours (questions sans corrigé) : entorse grave chez un footballeur (LCA), SFP chez une étudiante, lésion méniscale chez un maçon, instabilité chronique chez un rugbyman, gonarthrose. Les cas SFP, ménisque et gonarthrose sont dans la fiche « Genou : SFP, ménisque, gonarthrose ».</p>${slides("genou", [2, 5], "Cas cliniques genou")}` }
    ],
    qcm: [
      { id: "l1", part: "diag", q: "Le test le plus SENSIBLE pour une rupture du LCA :", a: ["Lachman"], d: ["Ressaut", "Tiroir antérieur", "McMurray"], src: "lach" },
      { id: "l2", part: "diag", q: "Le test le plus SPÉCIFIQUE pour une rupture du LCA :", a: ["Ressaut (pivot shift)"], d: ["Lachman", "Tiroir antérieur", "Apley"], src: "lach" },
      { id: "l3", part: "diag", q: "Sensibilité et spécificité du Lachman (méta-analyse) :", a: ["Se 86 %, Sp 91 %"], d: ["Se 32 %, Sp 98 %", "Se 62 %, Sp 88 %", "Se 100 %, Sp 100 %"], src: "lach" },
      { id: "l4", part: "diag", q: "Probabilité de départ faible (< 10 %), Lachman négatif :", a: ["La probabilité de rupture passe sous 3 %"], d: ["Elle reste au-dessus de 10 %", "Elle monte à 40-60 %", "On ne peut rien conclure"], src: "lach" },
      { id: "l5", part: "diag", q: "Contexte évocateur + ressaut positif :", a: ["Probabilité de rupture > 90 %"], d: ["Probabilité < 10 %", "Il faut toujours une IRM pour confirmer", "Le test n'a aucune valeur"], src: "lach" },
      { id: "l6", part: "diag", q: "Pourquoi la précision de ces tests est-elle probablement surestimée ?", a: ["Pas d'évaluation en aveugle et biais de vérification (15/17 études)"], d: ["Trop d'études en médecine générale", "Échantillons trop grands", "Tests réalisés sous anesthésie"], src: "lach" },
      { id: "l7", part: "rlg", q: "Critère isocinétique d'entrée en réathlétisation (Picard 2021) pour le quadriceps :", a: ["Déficit maximal de 30 % par rapport au côté sain"], d: ["Déficit maximal de 5 %", "Déficit maximal de 50 %", "Aucun critère de force"], src: "rlg" },
      { id: "l8", part: "rlg", q: "Et pour les ischio-jambiers ?", a: ["Déficit maximal de 15 %"], d: ["30 %", "0 %", "50 %"], src: "rlg" },
      { id: "l9", part: "rlg", q: "Rapport de Croisier visé :", a: ["> 0,9 (IJ excentrique 30°/s ÷ quadriceps concentrique 240°/s)"], d: ["< 0,5", "Exactement 1,5", "Il n'est pas utilisé"], src: "rlg" },
      { id: "l10", part: "rlg", q: "Questionnaire qui mesure l'APPRÉHENSION au retour au sport :", a: ["ACL-RSI"], d: ["IKDC", "MMSE", "CAIT"], src: "rlg" },
      { id: "l11", part: "rlg", q: "Objectif de la réathlétisation en force et endurance :", a: ["Moins de 10 % de déficit par rapport au côté sain"], d: ["Moins de 50 %", "Égalité parfaite obligatoire", "Aucun objectif chiffré"], src: "rlg" },
      { id: "l12", part: "rlg", q: "Risque de récidive / lésion controlatérale chez les sportifs à pivots :", a: ["Jusqu'à 25,3 %"], d: ["0,5 %", "5,9 % au maximum", "75 %"], src: "rlg" },
      { id: "l13", part: "rlg", q: "Pivots et changements de direction réautorisés à partir de…", a: ["6 à 9 mois post-opératoires"], d: ["6 semaines", "3 mois", "2 ans"], src: "rlg" }
    ],
    patients: [{ id: "plca", nom: "Paul, 22 ans · entorse grave du genou (cas 1 du cours)", origine: "cours", src: "gen3", desc: "Footballeur semi-pro, tacle, « crack », gonflement rapide, appui difficile ; Lachman et ressaut positifs, Ottawa négatif.", attrs: { attelleGenou: "D", aide: "beq", oedeme: ["genouD"], douleurs: [{ zone: "genouD", type: "inflammatoire" }] } }],
    cas: [{ id: "caslca", origine: "cours", src: ["gen3", "lach"], patient: "plca", titre: "Cas 1 : entorse grave du genou chez un footballeur",
      fiche: "Paul, 22 ans, football semi-pro, blessure après un tacle : douleur aiguë, « crack » entendu, gonflement rapide, difficulté à poser le pied. Lachman et pivot shift positifs ; Ottawa négatif. (Questions du cours, sans corrigé : propositions à valider.)",
      etapes: [{ type: "choix", titre: "Raisonnement", consigne: "Coche les propositions justes.", src: "lach", items: [
        { t: "Hypothèse principale : rupture du LCA", ok: true },
        { t: "Ressaut positif dans ce contexte évocateur : probabilité de rupture > 90 %", ok: true },
        { t: "Ottawa négatif : radiographie non nécessaire pour exclure une fracture", ok: true },
        { t: "Gonflement rapide après « crack » : évoque une hémarthrose", ok: true, why: "Proposition (non corrigée en cours)." },
        { t: "Lachman positif seul suffit à exclure une rupture", ok: false, why: "Un test POSITIF n'exclut pas ; le Lachman sert à exclure quand il est NÉGATIF." },
        { t: "Retour au foot avec pivots dès 3 mois post-op si le genou est sec", ok: false, why: "Pivots réautorisés à partir de 6-9 mois, après critères (Picard 2021)." }
      ] }] }]
  };

  const genou = {
    id: "genou-bloc3", cell: "otr", titre: "Genou : SFP, ménisque, gonarthrose (cas du cours)", court: "Genou (SFP, ménisque, arthrose)",
    statut: "Les cas du cours posent des questions sans corrigé : les réponses proposées sont signalées et sont à valider avec ton prof.",
    resume: [
      "<b>SFP</b> (cas 2) : douleurs antérieures progressives, majorées en descente d'escaliers, sans traumatisme ; Zohlen positif ; step-down : valgus dynamique.",
      "<b>Ménisque</b> (cas 3) : douleur aiguë après accroupissement prolongé, blocage et accrochage en flexion ; McMurray et Apley positifs, douleur à la palpation de l'interligne.",
      "<b>Gonarthrose</b> (cas 5) : 58 ans, douleurs chroniques en station debout prolongée et dans les escaliers, raideur matinale d'environ 15 minutes, gonflement modéré, compression patellaire légèrement positive, flexion diminuée.",
      "<b>Prise en charge</b> (Lin 2018, recommandations pour l'arthrose) : éducation, exercice et activité physique, thérapie manuelle seulement en complément, traitement non chirurgical de qualité avant toute chirurgie, imagerie sélective."
    ],
    pro: [{ id: "cas", titre: "Les 3 cas et leur raisonnement", src: ["gen3", "lin", "nice"], html: `<p><b>Cas 2 (SFP)</b> : Marion, 24 ans, CrossFit et running. Tests : <b>Zohlen</b> (+), <b>step-down</b> : valgus dynamique. Facteurs biomécaniques possibles (proposition à valider) : déficit de contrôle de la hanche (abducteurs, rotateurs latéraux), du quadriceps, valgus dynamique, gestion de la charge (CrossFit et course). Exercices (proposition) : renforcement de la hanche et du quadriceps, contrôle du valgus (step-down, squat contrôlé), adaptation de la charge, éducation.</p>
<p><b>Cas 3 (ménisque)</b> : Jean, 45 ans, maçon. Tests : <b>McMurray</b> et <b>Apley</b> (+), douleur à l'interligne. Question du cours : chirurgie ou traitement conservateur ? À 45 ans avec un mécanisme d'accroupissement (lésion possiblement dégénérative), le traitement conservateur par l'exercice est en général proposé d'abord (proposition hors cours, à valider) ; un vrai blocage mécanique oriente vers le chirurgien.</p>
<p><b>Cas 5 (gonarthrose)</b> : Monique, 58 ans, secrétaire. Diagnostic clinique de l'arthrose (NICE 2014, référence hors cours) : ≥ 45 ans, douleur liée à l'activité, pas de raideur matinale ou raideur ≤ 30 min → ici compatible (15 min). Lin 2018 : éducation, exercice (renforcement, mobilité), activité physique, thérapie manuelle en complément, soins non chirurgicaux avant la chirurgie.</p>${slides("genou", [3, 4, 6], "Cas cliniques genou")}` }],
    qcm: [
      { id: "g1", part: "cas", q: "Cas 2 : douleur antérieure majorée en descente d'escaliers, Zohlen (+), valgus dynamique au step-down :", a: ["Syndrome fémoro-patellaire"], d: ["Rupture du LCA", "Lésion méniscale", "Gonarthrose"], src: "gen3" },
      { id: "g2", part: "cas", q: "Cas 3 : blocage et accrochage en flexion, McMurray (+), douleur de l'interligne :", a: ["Lésion méniscale"], d: ["SFP", "Tendinopathie rotulienne", "Rupture du LCP"], src: "gen3" },
      { id: "g3", part: "cas", q: "Test d'Apley : douleur en COMPRESSION soulagée en distraction :", a: ["Ménisque"], d: ["Ligaments", "Rotule", "Bandelette ilio-tibiale"], src: "gen3" },
      { id: "g4", part: "cas", q: "Raideur matinale de 15 minutes chez une patiente de 58 ans avec douleurs d'activité :", a: ["Compatible avec une gonarthrose (raideur ≤ 30 min)"], d: ["Évoque d'abord une polyarthrite", "Exclut une arthrose", "Évoque une rupture méniscale aiguë"], src: "nice" },
      { id: "g5", part: "cas", q: "Lin 2018 : avant une chirurgie pour arthrose, il faut…", a: ["Proposer des soins non chirurgicaux de qualité (éducation, exercice)"], d: ["Opérer le plus tôt possible", "Faire systématiquement une IRM", "Imposer le repos complet"], src: "lin" },
      { id: "g6", part: "cas", q: "Step-down test : on observe surtout…", a: ["Le valgus dynamique du genou, la chute du bassin, l'inclinaison du tronc"], d: ["La force maximale du quadriceps", "Le temps de réaction", "La sensibilité de la plante du pied"], src: "gen3" }
    ],
    patients: [{ id: "psfp", nom: "Marion, 24 ans · SFP (cas 2)", origine: "cours", src: "gen3", desc: "CrossFit, running ; douleur antérieure en descente d'escaliers ; Zohlen +, valgus dynamique.", attrs: { douleurs: [{ zone: "genouG", type: "mecanique" }] } },
      { id: "pmen", nom: "Jean, 45 ans · lésion méniscale (cas 3)", origine: "cours", src: "gen3", desc: "Maçon, douleur après accroupissement prolongé, blocage, accrochage.", attrs: { douleurs: [{ zone: "genouD", type: "mecanique" }] } },
      { id: "parth", nom: "Monique, 58 ans · gonarthrose (cas 5)", origine: "cours", src: "gen3", desc: "Douleurs en station debout prolongée et dans les escaliers, raideur matinale 15 min, gonflement modéré, flexion diminuée.", attrs: { douleurs: [{ zone: "genouD", type: "mecanique" }], oedeme: ["genouD"] } }],
    cas: []
  };

  const cheville = {
    id: "cheville", cell: "sport", titre: "Entorse latérale de cheville, syndesmose et instabilité chronique", court: "Cheville",
    statut: "Articles à lire (Martin 2013 CPG, Doherty 2017, Tourné 2019, Gribble 2012, Forestier 2015) + ta fiche OTR (Ottawa, squeeze, side hop) + CR sport 2026-27 (Ankle-GO).",
    resume: [
      "<b>Après traumatisme</b> : règles d'Ottawa (exclure une fracture) ; rechercher une lésion de la syndesmose (Frick Se 30-71 / Sp 85 ; squeeze Se 30 / Sp 88-93,5 ; Cotton, crossed-leg).",
      "<b>Traitement de l'entorse aiguë</b> (Doherty 2017) : preuves FORTES pour les AINS et la mobilisation précoce ; MODÉRÉES pour l'exercice et la thérapie manuelle ; preuves contradictoires pour la chirurgie et l'acupuncture ; insuffisantes pour les ultrasons. Orthèses et taping efficaces.",
      "<b>Prévention des récidives / de l'instabilité chronique</b> : preuves FORTES pour l'orthèse (bracing), MODÉRÉES pour l'entraînement neuromusculaire.",
      "<b>CPG Martin 2013</b> : support externe + mise en charge progressive ; glace en applications répétées ; PAS d'ultrasons ; exercices thérapeutiques pour les entorses sévères ; thérapie manuelle (mobilisations, manipulations, mobilisation avec mouvement) pour la flexion dorsale ; exercices fonctionnels en charge et équilibre unipodal sur surface instable ; questionnaires FAAM, LEFS, CAIT.",
      "<b>Facteurs de risque d'instabilité</b> (Martin 2013) : courbure du talus augmentée, pas de support externe, pas d'exercices d'équilibre / proprioception après l'entorse.",
      "<b>SEBT / Y-balance</b> (Gribble 2012) : test dynamique fiable et valide ; 3 directions (antérieure, postéro-médiale, postéro-latérale), 4 essais d'entraînement, distances normalisées à la longueur du MI.",
      "<b>Retour au sport</b> (ta fiche OTR) : side hop (différence > 30 % = pas de course ; viser 10 %), SEBT ; CR sport 2026 : Ankle-GO, Illinois."
    ],
    pro: [
      { id: "eval", titre: "Évaluation : Ottawa, syndesmose, questionnaires", src: ["recapOTR", "tourne", "martin"], html: `<ul><li><b>Anamnèse</b> (fiche OTR) : circonstances, 1re fois ou récidive (date de la dernière), marche après le trauma, boiterie, consignes du médecin, premiers soins, échauffement ; chaussures, semelles ; sport, profession ; objectifs.</li>
<li><b>Bilans</b> (fiche OTR) : Ottawa si trauma récent ; constat (attelle ?) ; cutané (hématome sous la malléole externe = entorse classique ; hématome de la voûte plantaire = red flag) ; morpho-statique (tendon d'Achille, calcanéum, mollet) ; articulaire (FD active, FD + FP + inversion passives, glissement tibio-fibulaire, FD + RE, squeeze) ; musculaire (fibulaires) ; fonctionnel (petits pas, pointe des pieds, AVJ).</li>
<li><b>Syndesmose</b> (Tourné 2019) : Frick (FD + RE forcées, genou à 90°), squeeze (compression haute tibia-fibula), translation de la fibula, Cotton ou crossed-leg. Sous rotation externe, le diastasis augmente quand on sectionne les 3 ligaments (tibio-fibulaire antéro-inférieur, inférieur transverse, postéro-inférieur). Chirurgie (suture button, arthroscopie) surtout pour les lésions instables ou chroniques (> 6 mois).</li>
<li><b>Classification</b> (Martin 2013) : niveau de fonction, laxité, hémorragie, douleur ponctuelle, mobilité totale, gonflement, douleur ; questionnaires FAAM, LEFS ; CAIT pour l'instabilité.</li></ul>${slides("tourne", [3, 4], "Tourné 2019")}` },
      { id: "ttt", titre: "Traitement : niveaux de preuve (Doherty, Martin)", src: ["doherty", "martin"], html: `<table class="mt"><tr><th>Intervention</th><th>Entorse aiguë</th><th>Prévention des récidives</th></tr>
<tr><td>AINS</td><td>Preuve forte</td><td>—</td></tr><tr><td>Mobilisation précoce</td><td>Preuve forte</td><td>—</td></tr><tr><td>Exercice</td><td>Preuve modérée</td><td>Soutenu (avec l'orthèse)</td></tr><tr><td>Thérapie manuelle</td><td>Preuve modérée</td><td>—</td></tr><tr><td>Orthèse / taping</td><td>Efficaces (fonction, récidive)</td><td>Orthèse : preuve forte</td></tr><tr><td>Entraînement neuromusculaire</td><td>—</td><td>Preuve modérée</td></tr><tr><td>Chirurgie, acupuncture</td><td>Preuves contradictoires</td><td>—</td></tr><tr><td>Ultrasons</td><td>Preuves insuffisantes ; Martin 2013 : ne pas les utiliser</td><td>—</td></tr></table>
<p><b>Martin 2013</b> : support externe et mise en charge progressive ; glace en applications répétées (douleur, consommation d'antalgiques, appui) ; exercices thérapeutiques pour les entorses sévères ; thérapie manuelle (mobilisations graduées, manipulations, mobilisation avec mouvement en charge et hors charge) pour la flexion dorsale, la proprioception et la tolérance à l'appui ; en post-aigu : exercices fonctionnels en charge et équilibre unipodal sur surface instable.</p>` },
      { id: "fonction", titre: "Tests fonctionnels et retour au sport", src: ["gribble", "forest", "recapOTR", "sport1"], html: `<ul><li><b>SEBT</b> (Gribble 2012) : unipodal, mains sur les hanches, atteinte maximale avec l'autre pied ; 8 directions à l'origine, 3 recommandées (antérieure, postéro-médiale, postéro-latérale) ; 4 essais d'entraînement suffisent ; normaliser à la longueur du MI ; la flexion dorsale explique une part de l'atteinte antérieure. Fiable, valide, prédit le risque de blessure (basketteuses à score composite bas : 6 fois plus de blessures) et répond aux programmes d'entraînement.</li>
<li><b>Forestier 2015</b> : les tests posturaux statiques détectent mal l'instabilité chronique ; le SEBT réalisé avec une perturbation de l'arrière-pied (dispositif Myolux) fait mieux ressortir le déficit ; test de faiblesse des éverseurs en charge (plus fonctionnel que l'isocinétique).</li>
<li><b>Ta fiche OTR</b> : side hop (10 sauts entre deux marques à 30 cm, chronométrés : différence > 30 % = pas de course ; 10 % = retour sur le terrain) ; SEBT (3 essais, moyenne).</li>
<li><b>CR sport 2026</b> : Ankle-GO (combinaison de tests et questionnaires pour le retour à la course), Illinois (agilité) ; proprioception : laser sur la cheville et 3 repères au mur (FD max, neutre, FP max), yeux fermés, chez les instables chroniques.</li></ul>${slides("forestier", [4, 5], "Forestier 2015")}` }
    ],
    qcm: [
      { id: "c1", part: "eval", q: "Les règles d'Ottawa servent à :", a: ["Décider de la radiographie (exclure une fracture)"], d: ["Diagnostiquer une rupture du LTFA", "Évaluer le retour au sport", "Mesurer l'instabilité chronique"], src: "recapOTR" },
      { id: "c2", part: "eval", q: "Squeeze test : Se et Sp (Tourné 2019) :", a: ["Se 30 %, Sp 88-93,5 %"], d: ["Se 86 %, Sp 91 %", "Se 30-71 %, Sp 85 %", "Se 100 %, Sp 50 %"], src: "tourne" },
      { id: "c3", part: "eval", q: "Test de Frick :", a: ["Flexion dorsale + rotation externe forcées, genou à 90°"], d: ["Compression haute tibia-fibula", "Inversion forcée en flexion plantaire", "Tiroir antérieur de cheville"], src: "tourne" },
      { id: "c4", part: "eval", q: "Hématome de la voûte plantaire après une entorse (fiche OTR) :", a: ["Red flag"], d: ["Signe d'entorse bénigne", "Normal à J2", "Signe de syndesmose"], src: "recapOTR" },
      { id: "c5", part: "ttt", q: "Doherty 2017 : preuves FORTES pour l'entorse aiguë (plusieurs réponses) :", a: ["AINS", "Mobilisation précoce"], d: ["Ultrasons", "Acupuncture"], src: "doherty" },
      { id: "c6", part: "ttt", q: "Prévention des récidives : preuve FORTE pour…", a: ["L'orthèse (bracing)"], d: ["Les ultrasons", "La chirurgie systématique", "Le repos strict"], src: "doherty" },
      { id: "c7", part: "ttt", q: "Martin 2013 : les ultrasons dans l'entorse aiguë…", a: ["Ne doivent pas être utilisés"], d: ["Sont recommandés", "Sont obligatoires", "Remplacent l'exercice"], src: "martin" },
      { id: "c8", part: "ttt", q: "Facteurs de risque d'instabilité chronique (Martin 2013) (plusieurs réponses) :", a: ["Courbure du talus augmentée", "Pas de support externe", "Pas d'exercices d'équilibre / proprioception après l'entorse"], d: ["Pratique de la natation"], src: "martin" },
      { id: "c9", part: "ttt", q: "Thérapie manuelle recommandée (Martin 2013) pour améliorer…", a: ["La flexion dorsale, la proprioception et la tolérance à l'appui"], d: ["L'inversion uniquement", "La force des fibulaires uniquement", "La sensibilité cutanée"], src: "martin" },
      { id: "c10", part: "fonction", q: "SEBT : directions recommandées (Gribble 2012) (plusieurs réponses) :", a: ["Antérieure", "Postéro-médiale", "Postéro-latérale"], d: ["Latérale pure"], src: "gribble" },
      { id: "c11", part: "fonction", q: "SEBT : pourquoi normaliser les distances ?", a: ["Pour comparer des individus de tailles différentes (en % de la longueur du MI)"], d: ["Pour supprimer l'effet de l'âge", "Parce que le test est chronométré", "Ce n'est pas nécessaire"], src: "gribble" },
      { id: "c12", part: "fonction", q: "Nombre d'essais d'entraînement suffisant avant de mesurer le SEBT :", a: ["4"], d: ["0", "1", "20"], src: "gribble" },
      { id: "c13", part: "fonction", q: "Side hop (fiche OTR) : différence > 30 % entre les côtés :", a: ["Pas de retour à la course"], d: ["Retour au terrain autorisé", "Résultat normal", "Indication chirurgicale"], src: "recapOTR" },
      { id: "c14", part: "fonction", q: "Forestier 2015 : les tests posturaux statiques…", a: ["Détectent mal l'instabilité chronique : préférer des tests dynamiques / perturbés"], d: ["Sont les meilleurs tests de l'instabilité", "Remplacent le SEBT", "Sont inutiles dans toute pathologie"], src: "forest" },
      { id: "c15", part: "eval", q: "Questionnaire qui identifie la présence et la sévérité de l'instabilité de cheville :", a: ["CAIT (Cumberland Ankle Instability Tool)"], d: ["ACL-RSI", "Oswestry", "MMSE"], src: "martin" }
    ],
    patients: [{ id: "pentorse", nom: "Illustration : entorse latérale aiguë de cheville droite", origine: "invente", src: "recapOTR", desc: "Œdème et douleur sous la malléole externe, boiterie, appui progressif avec support externe.", attrs: { oedeme: ["chevilleD"], douleurs: [{ zone: "chevilleD", type: "inflammatoire" }], aide: "beq" } }],
    cas: [{ id: "caschev", origine: "invente", src: ["martin", "doherty", "recapOTR"], patient: "pentorse", titre: "Entorse aiguë : quelles décisions ? (entraînement)",
      fiche: "Cas inventé : basketteur de 20 ans, entorse en inversion il y a 2 jours, 2e entorse de la saison. Marche 4 pas avec douleur, pas de douleur osseuse à la palpation des malléoles, du 5e métatarsien ni du naviculaire.",
      etapes: [{ type: "choix", titre: "Décisions", consigne: "Coche les décisions justifiées par les articles et ta fiche.", src: "martin", items: [
        { t: "Ottawa négatif : pas de radiographie nécessaire", ok: true },
        { t: "Faire squeeze et Frick pour rechercher une syndesmose", ok: true },
        { t: "Support externe et mise en charge progressive", ok: true },
        { t: "Glace en applications répétées", ok: true },
        { t: "Ultrasons quotidiens", ok: false, why: "Martin 2013 : ne pas utiliser ; Doherty : preuves insuffisantes." },
        { t: "Prévenir la récidive : orthèse + entraînement neuromusculaire", ok: true },
        { t: "Immobilisation stricte 3 semaines", ok: false, why: "Mobilisation précoce : preuve forte (Doherty)." }
      ] }] }]
  };

  const fasciite = {
    id: "fasciite", cell: "otr", titre: "Talalgie / fasciite plantaire (CPG 2014)", court: "Fasciite plantaire",
    statut: "Article à lire : Heel pain – plantar fasciitis, révision 2014 (JOSPT).",
    resume: [
      "<b>Facteurs de risque</b> : flexion dorsale de cheville limitée, IMC élevé chez le non-sportif, course, activités professionnelles en charge (surtout sur sol peu amortissant).",
      "<b>Examen</b> : douleur aux premiers pas du matin, palpation de l'insertion, flexion dorsale, windlass test, test flexion dorsale-éversion (tunnel tarsien), angle de l'arche longitudinale ; rechercher aussi muscles, tendons et nerfs.",
      "<b>Questionnaires</b> : FAAM, FHSQ ou FFI (± LEFS informatisé).",
      "<b>Traitement recommandé</b> : thérapie manuelle (articulations, tissus mous) ; étirements spécifiques de l'aponévrose et du triceps sural (court terme : 1 semaine à 4 mois) ; taping anti-pronation (immédiat, jusqu'à 3 semaines) ; orthèses plantaires ; orthèse de nuit 1 à 3 mois si douleur aux premiers pas ; préférer thérapie manuelle, étirements et orthèses aux électrothérapies (1-6 mois).",
      "<b>Possibles</b> : taping élastique (1 semaine), iontophorèse, laser, renforcement et entraînement du mouvement (muscles qui contrôlent la pronation), éducation au poids, chaussures à semelle « rocker » et rotation des chaussures pour ceux qui restent debout longtemps."
    ],
    pro: [{ id: "cpg", titre: "Recommandations du CPG 2014", src: ["pf"], html: `<p><b>Diagnostic et facteurs de risque</b> : flexion dorsale limitée, IMC élevé (non-sportifs), course, travail en charge (sol peu amortissant). Évaluer aussi les muscles, tendons et nerfs (diagnostic différentiel : tunnel tarsien, nerfs plantaires).</p>
<p><b>Mesures</b> : flexion dorsale, test flexion dorsale-éversion, <b>windlass test</b>, angle de l'arche longitudinale ; questionnaires FAAM, FHSQ, FFI ; mesures de performance reproductibles.</p>
<p><b>Interventions</b> : thérapie manuelle (mobilisation articulaire et des tissus mous) pour la mobilité et la souplesse du mollet ; étirements de l'aponévrose et du triceps sural ; taping anti-pronation ; orthèses plantaires ; orthèse de nuit 1 à 3 mois pour la douleur aux premiers pas ; thérapie manuelle, étirements et orthèses plutôt que l'électrothérapie pour les résultats à 1-6 mois ; options : taping élastique, iontophorèse, laser basse énergie, phonophorèse au kétoprofène, chaussure à semelle « rocker » + orthèse, rotation des chaussures, éducation sur le poids, renforcement et entraînement des muscles qui contrôlent la pronation.</p>
<p class="small">Fiches de ton dossier : « Talalgie – Fasciite plantaire » (Ambre), fiche OTR : triade douloureuse (palpation, étirement, contraction isométrique ou excentrique).</p>` }],
    qcm: [
      { id: "f1", part: "cpg", q: "Facteurs de risque de fasciite plantaire (plusieurs réponses) :", a: ["Flexion dorsale de cheville limitée", "IMC élevé chez le non-sportif", "Travail en charge sur sol peu amortissant"], d: ["Natation régulière"], src: "pf" },
      { id: "f2", part: "cpg", q: "Douleur aux premiers pas du matin persistante : le CPG recommande…", a: ["Une orthèse de nuit pendant 1 à 3 mois"], d: ["Des ultrasons quotidiens", "Une immobilisation plâtrée", "L'arrêt de toute marche"], src: "pf" },
      { id: "f3", part: "cpg", q: "Taping anti-pronation : effet attendu", a: ["Diminution immédiate de la douleur (jusqu'à 3 semaines)"], d: ["Guérison définitive", "Effet uniquement après 6 mois", "Aucun effet"], src: "pf" },
      { id: "f4", part: "cpg", q: "Pour des résultats à 1-6 mois, préférer…", a: ["Thérapie manuelle, étirements et orthèses plutôt que l'électrothérapie"], d: ["L'électrothérapie seule", "Le repos strict", "La chirurgie d'emblée"], src: "pf" },
      { id: "f5", part: "cpg", q: "Windlass test : manœuvre", a: ["Extension passive de l'hallux qui tend l'aponévrose plantaire"], d: ["Compression latérale du calcanéum", "Flexion plantaire forcée", "Percussion du nerf tibial"], src: "pf" }
    ],
    patients: [{ id: "pfasc", nom: "Illustration : fasciite plantaire gauche", origine: "invente", src: "pf", desc: "Douleur du talon aux premiers pas du matin.", attrs: { douleurs: [{ zone: "talonG", type: "mecanique" }] } }],
    cas: []
  };

  const techniques = {
    id: "techniques", cell: "otr", titre: "Mobilisations spécifiques (Kaltenborn) et bonnes pratiques", court: "Kaltenborn",
    statut: "Cours Papalia (Kaltenborn) + articles à lire (Ghossoub 2009, Lin 2018).",
    resume: [
      "<b>Mobilisation</b> : moyen thérapeutique passif pour améliorer la mobilité des tissus mous et/ou d'une articulation ; Kaltenborn / Maitland : lutter contre les restrictions, gagner de l'amplitude, diminuer la douleur, limiter la gêne, retarder l'évolution dégénérative.",
      "<b>Mouvement accessoire</b> : petite amplitude, impossible volontairement, induit par le thérapeute (glissement, roulement, parfois rotation) ; il débute généralement la séance.",
      "<b>Règle concave-convexe</b> : élément mobile CONCAVE (ex. tibia sur fémur) → glissement dans le MÊME sens que le mouvement angulaire ; élément mobile CONVEXE (ex. tête humérale, tête fémorale) → glissement en sens OPPOSÉ.",
      "<b>Grades de traction</b> : I = annulation des forces de compression ; II = tension des tissus péri-articulaires ; III = étirement.",
      "<b>Modalités</b> : oscillations rythmées 2 à 3 Hz pendant 1 à 2 min (douleur, trophicité, assouplissement) ; pour une restriction : traction + glissement, mobilisation de 5 à 7 s toutes les 10 s.",
      "<b>Hanche</b> : coxarthrose expulsive (douleur du toit) → traction caudale ; protrusive (mur interne) → traction latérale ; flexion → glissement antéro-postérieur (au-delà de 90° : caudal) ; extension → glissement postéro-antérieur et crânial."
    ],
    pro: [{ id: "kal", titre: "Kaltenborn : principes et applications", src: ["kal", "ghos", "lin"], html: `<p><b>Principes</b> : fixer un élément osseux et imprimer à l'élément mobile : traction (dans l'axe de l'élément mobile, décoaptation), glissement (perpendiculaire à l'axe), compression (coaptation).</p>
<p><b>Roulement</b> : deux points équidistants d'une surface touchent deux points équidistants de l'autre (roue). <b>Glissement</b> : un même point de la surface fixe touche de nouveaux points de la surface mobile (translation, roue qui patine). Le sens du roulement = le sens du mouvement angulaire.</p>
<p><b>Concave-convexe</b> : mobile concave sur fixe convexe (tibio-fémorale) : glissement dans le même sens (flexion : roulement et glissement en arrière). Mobile convexe sur fixe concave (gléno-humérale, coxo-fémorale) : glissement opposé (abduction : roulement vers le haut, glissement vers le bas).</p>
<p><b>Grades</b> : I relâcher (annuler la compression), II tendre, III étirer (au-delà de BM2).</p>
<p><b>Modalités</b> : oscillations 2-3 Hz pendant 1-2 min ; restriction : traction + glissement, 5-7 s toutes les 10 s.</p>
<p><b>Ghossoub 2009</b> : les mobilisations spécifiques redonnent la mobilité perdue (traumatique ou rhumatologique) en restaurant glissements et rotations ; le bilan articulaire identifie les mouvements limités ; elles interviennent souvent en début de traitement avec les techniques myofasciales. Contre-indications générales : prudence selon l'âge, facteurs de fragilisation osseuse (ostéoporose…), etc.</p>
<p><b>Lin 2018</b> : la thérapie manuelle ne s'utilise qu'en complément de l'exercice et de l'éducation.</p>${slides("kalt", [5, 7, 8, 12, 13, 15, 16, 18], "Cours Kaltenborn")}` }],
    qcm: [
      { id: "k1", part: "kal", q: "Élément mobile CONVEXE sur fixe concave (ex. gléno-humérale) : sens du glissement ?", a: ["Opposé au mouvement angulaire"], d: ["Même sens que le mouvement angulaire", "Toujours vers le haut", "Aucun glissement"], src: "kal" },
      { id: "k2", part: "kal", q: "Élément mobile CONCAVE (tibia sur fémur) en flexion : glissement…", a: ["Vers l'arrière (même sens que le mouvement)"], d: ["Vers l'avant", "Vers le haut", "Latéral"], src: "kal" },
      { id: "k3", part: "kal", q: "Grade II de traction (Kaltenborn) :", a: ["Mise en tension des tissus péri-articulaires"], d: ["Annulation des forces de compression", "Étirement des tissus", "Manipulation à haute vitesse"], src: "kal" },
      { id: "k4", part: "kal", q: "Abduction gléno-humérale : roulement et glissement de la tête humérale", a: ["Roulement vers le haut, glissement vers le bas"], d: ["Roulement et glissement vers le haut", "Roulement vers le bas, glissement vers le haut", "Aucun glissement"], src: "kal" },
      { id: "k5", part: "kal", q: "Coxarthrose protrusive (douleur au mur interne du cotyle) : traction…", a: ["Latérale"], d: ["Caudale", "Crâniale", "Aucune traction"], src: "kal" },
      { id: "k6", part: "kal", q: "Fréquence des oscillations selon Kaltenborn :", a: ["2 à 3 Hz pendant 1 à 2 minutes"], d: ["10 Hz pendant 10 s", "1 oscillation par minute", "Pas d'oscillations"], src: "kal" },
      { id: "k7", part: "kal", q: "Récupérer l'extension de hanche : glissement…", a: ["Postéro-antérieur et crânial"], d: ["Antéro-postérieur et caudal", "Latéral", "Médial"], src: "kal" },
      { id: "k8", part: "kal", q: "Les 11 recommandations de Lin 2018 incluent (plusieurs réponses) :", a: ["Dépister les red flags", "Évaluer les facteurs psychosociaux", "Utiliser l'imagerie de façon sélective", "Aider le patient à rester au travail"], d: ["Imagerie systématique"], src: "lin" }
    ],
    patients: [{ id: "pkal", nom: "Illustration : raideur de hanche (coxarthrose)", origine: "invente", src: "kal", desc: "Restriction de mobilité traitée par traction + glissement.", attrs: { douleurs: [{ zone: "hancheD", type: "mecanique" }], aide: "canne", aideCote: "G" } }],
    cas: []
  };

  for (const p of [epaule, lca, genou, cheville, fasciite, techniques]) M.PATHOS[p.id] = p;
  const cell = id => M.CELLS.find(c => c.id === id);
  cell("otr").pathos.push("epaule-cools", "genou-bloc3", "fasciite", "techniques");
  cell("sport").pathos.push("lca", "cheville");
  cell("otr").bientot = cell("otr").bientot.filter(x => !/Épaule|Genou|Cheville/.test(x));
  cell("sport").bientot = cell("sport").bientot.filter(x => !/LCA/.test(x));
})();
