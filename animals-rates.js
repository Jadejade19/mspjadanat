"use strict";
// ============================================================================
//  LES RATÉS : les tout premiers dessins de l'application. Ils ont leur charme !
//  On en gagne un toutes les 15 questions ratées.
// ============================================================================
(function () {
  // --- 1. LES FURETS (8 existants + 4 nouveaux) ---
  const FERRETS = [
    { id: "furet-sable", name: "Furet sable", hex: "#e6c297", dark: "#9c7244", mask: "#f5e6d3", tail: "#7c5228", pose: "curious" },
    { id: "furet-zibeline", name: "Furet zibeline", hex: "#6b4423", dark: "#2e1a0b", mask: "#f3e8dc", tail: "#1e1208", pose: "bandit" },
    { id: "furet-albinos", name: "Furet albinos", hex: "#fffaf5", dark: "#cbd5e1", mask: "#ffffff", tail: "#e2e8f0", eye: "#e11d48", pose: "sleepy" },
    { id: "furet-cannelle", name: "Furet cannelle", hex: "#c86d3b", dark: "#7c3612", mask: "#fde7d6", tail: "#6b2d0e", pose: "playful" },
    { id: "furet-argent", name: "Furet argenté", hex: "#94a3b8", dark: "#475569", mask: "#f1f5f9", tail: "#334155", pose: "curious" },
    { id: "furet-chocolat", name: "Furet chocolat", hex: "#5c3a21", dark: "#29170a", mask: "#edd8c5", tail: "#29170a", pose: "bandit" },
    { id: "furet-champagne", name: "Furet champagne", hex: "#f3d5a5", dark: "#b4834b", mask: "#fff9eb", tail: "#9a6b38", pose: "playful" },
    { id: "furet-charbon", name: "Furet charbon", hex: "#475569", dark: "#0f172a", mask: "#e2e8f0", tail: "#0f172a", pose: "curious" },
    { id: "furet-panda", name: "Furet panda", hex: "#ffffff", dark: "#1e293b", mask: "#ffffff", tail: "#1e293b", pose: "playful" },
    { id: "furet-blaze", name: "Furet blaze", hex: "#d97706", dark: "#78350f", mask: "#ffffff", tail: "#78350f", pose: "curious" },
    { id: "furet-mitt", name: "Furet mitt", hex: "#fef3c7", dark: "#b45309", mask: "#ffffff", tail: "#b45309", pose: "bandit" },
    { id: "furet-wheaten", name: "Furet wheaten", hex: "#fcd34d", dark: "#92400e", mask: "#fffbeb", tail: "#92400e", pose: "playful" }
  ];

  // --- 2. LES LAPINS (10 existants + 4 nouveaux) ---
  const RABBITS = [
    { id: "lapin-belier-roux", name: "Lapin bélier roux", hex: "#e08e55", dark: "#9a4e1e", earStyle: "lop", belly: "#fff4e6" },
    { id: "lapin-nain-blanc", name: "Lapin nain blanc", hex: "#ffffff", dark: "#94a3b8", earStyle: "up", belly: "#f8fafc" },
    { id: "lapin-tachete", name: "Lapin papillon tacheté", hex: "#f8fafc", dark: "#334155", earStyle: "up", spot: "#334155" },
    { id: "lapin-gris-perle", name: "Lapin gris perle", hex: "#cbd5e1", dark: "#475569", earStyle: "tilt", belly: "#f1f5f9" },
    { id: "lapin-chocolat", name: "Lapin noisette", hex: "#a47148", dark: "#582f0e", earStyle: "up", belly: "#f3e5d8" },
    { id: "lapin-belier-gris", name: "Lapin bélier nuage", hex: "#94a3b8", dark: "#334155", earStyle: "lop", belly: "#e2e8f0" },
    { id: "lapin-fraise", name: "Lapin rose pêche", hex: "#fbcfe8", dark: "#db2777", earStyle: "tilt", belly: "#fff1f2" },
    { id: "lapin-menthe", name: "Lapin trèfle", hex: "#bbf7d0", dark: "#15803d", earStyle: "up", belly: "#f0fdf4" },
    { id: "lapin-belier-chocolat", name: "Lapin bélier cacao", hex: "#7c4a27", dark: "#3e220e", earStyle: "lop", belly: "#f5e6d8" },
    { id: "lapin-lavande", name: "Lapin lavande", hex: "#ddd6fe", dark: "#6d28d9", earStyle: "tilt", belly: "#f5f3ff" },
    { id: "lapin-angora", name: "Lapin angora", hex: "#fef3c7", dark: "#b45309", earStyle: "up", belly: "#ffffff" },
    { id: "lapin-hollandais", name: "Lapin hollandais", hex: "#ffffff", dark: "#1e293b", earStyle: "up", belly: "#ffffff", spot: "#1e293b" },
    { id: "lapin-lion", name: "Lapin tête de lion", hex: "#fdba74", dark: "#c2410c", earStyle: "tilt", belly: "#fff7ed" },
    { id: "lapin-rex", name: "Lapin rex", hex: "#cbd5e1", dark: "#64748b", earStyle: "up", belly: "#f8fafc" }
  ];

  // --- 3. LES HAMSTERS (10 existants + 4 nouveaux) ---
  const HAMSTERS = [
    { id: "hamster-canari", name: "Hamster jaune canari", hex: "#facc15", dark: "#ca8a04", belly: "#fefce8", theme: "classic" },
    { id: "hamster-jedi", name: "Hamster Jedi", hex: "#d6b485", dark: "#8c6239", belly: "#fef3c7", theme: "jedi" },
    { id: "hamster-ninja", name: "Hamster Ninja", hex: "#64748b", dark: "#1e293b", belly: "#e2e8f0", theme: "ninja" },
    { id: "hamster-astro", name: "Hamster Astronaute", hex: "#f59e0b", dark: "#b45309", belly: "#fffbeb", theme: "astro" },
    { id: "hamster-chevalier", name: "Hamster Chevalier", hex: "#cbd5e1", dark: "#475569", belly: "#f8fafc", theme: "knight" },
    { id: "hamster-pirate", name: "Hamster Pirate", hex: "#d97706", dark: "#78350f", belly: "#fef3c7", theme: "pirate" },
    { id: "hamster-mage", name: "Hamster Mage", hex: "#c084fc", dark: "#6b21a8", belly: "#faf5ff", theme: "mage" },
    { id: "hamster-roi", name: "Hamster Roi", hex: "#fbbf24", dark: "#92400e", belly: "#fffbeb", theme: "king" },
    { id: "hamster-glace", name: "Hamster Glace", hex: "#93c5fd", dark: "#1d4ed8", belly: "#eff6ff", theme: "ice" },
    { id: "hamster-citron", name: "Hamster Citron", hex: "#fde047", dark: "#a16207", belly: "#fefce8", theme: "lemon" },
    { id: "hamster-robo", name: "Hamster roborovski", hex: "#fcd34d", dark: "#b45309", belly: "#fffbeb", theme: "classic" },
    { id: "hamster-panda", name: "Hamster panda", hex: "#ffffff", dark: "#1e293b", belly: "#ffffff", theme: "panda" },
    { id: "hamster-syrien", name: "Hamster syrien", hex: "#f97316", dark: "#9a3412", belly: "#ffedd5", theme: "classic" },
    { id: "hamster-russe", name: "Hamster russe", hex: "#94a3b8", dark: "#475569", belly: "#f1f5f9", theme: "classic" }
  ];

  // --- 4. LES CHATS (14 existants + 4 nouveaux) ---
  const CATS = [
    { id: "chat-tigre-roux", name: "Chat tigré roux", hex: "#fb923c", dark: "#c2410c", pattern: "stripe", earFold: false },
    { id: "chat-noir", name: "Chat noir mystérieux", hex: "#334155", dark: "#0f172a", pattern: "plain", earFold: false },
    { id: "chat-blanc", name: "Chaton blanc flocon", hex: "#ffffff", dark: "#94a3b8", pattern: "plain", earFold: false },
    { id: "chat-calico", name: "Chat calico tricolore", hex: "#fffbeb", dark: "#78350f", pattern: "calico", earFold: false },
    { id: "chat-siamois", name: "Chat siamois", hex: "#fde68a", dark: "#451a03", pattern: "siamese", earFold: false },
    { id: "chat-lavande", name: "Chat lilas", hex: "#d8b4fe", dark: "#7e22ce", pattern: "stripe", earFold: false },
    { id: "chat-scottish-gris", name: "Scottish fold gris", hex: "#94a3b8", dark: "#334155", pattern: "plain", earFold: true },
    { id: "chat-scottish-creme", name: "Scottish fold crème", hex: "#fde68a", dark: "#b45309", pattern: "stripe", earFold: true },
    { id: "chat-tigre-gris", name: "Chat tigré argenté", hex: "#cbd5e1", dark: "#475569", pattern: "stripe", earFold: false },
    { id: "chat-bicolore-noir", name: "Chat vache noir & blanc", hex: "#ffffff", dark: "#1e293b", pattern: "cow", earFold: false },
    { id: "chat-bicolore-roux", name: "Chat roux & blanc", hex: "#fff7ed", dark: "#ea580c", pattern: "redwhite", earFold: false },
    { id: "chat-bleue-russe", name: "Bleu de Russie", hex: "#64748b", dark: "#1e293b", pattern: "plain", eye: "#16a34a", earFold: false },
    { id: "chat-écaille", name: "Chat écaille de tortue", hex: "#78350f", dark: "#291507", pattern: "calico", earFold: false },
    { id: "chat-rose-poudre", name: "Chaton rose bonbon", hex: "#fbcfe8", dark: "#be185d", pattern: "stripe", earFold: false },
    { id: "chat-bengal", name: "Chat bengal", hex: "#f59e0b", dark: "#78350f", pattern: "calico", earFold: false },
    { id: "chat-persan", name: "Chat persan", hex: "#f8fafc", dark: "#cbd5e1", pattern: "plain", earFold: false },
    { id: "chat-maine-coon", name: "Maine coon", hex: "#92400e", dark: "#451a03", pattern: "stripe", earFold: false },
    { id: "chat-sacre-birmanie", name: "Sacré de Birmanie", hex: "#fffbeb", dark: "#78350f", pattern: "siamese", earFold: false }
  ];

  // --- 5. LES CHIENS (14 existants + 4 nouveaux) ---
  const DOGS = [
    { id: "chien-golden", name: "Chiot golden retriever", hex: "#fbbf24", dark: "#b45309", ear: "flop" },
    { id: "chien-dalmatien", name: "Chiot dalmatien", hex: "#ffffff", dark: "#1e293b", ear: "flop", spots: 1 },
    { id: "chien-corgi-roux", name: "Chiot corgi roux", hex: "#f59e0b", dark: "#92400e", ear: "point" },
    { id: "chien-corgi-tricolore", name: "Chiot corgi tricolore", hex: "#e2e8f0", dark: "#1e293b", ear: "point", mask: 1 },
    { id: "chien-husky", name: "Chiot husky", hex: "#94a3b8", dark: "#1e293b", ear: "point", mask: 1, eye: "#0284c7" },
    { id: "chien-chocolat", name: "Chiot labrador chocolat", hex: "#8d5b34", dark: "#4a2c16", ear: "flop" },
    { id: "chien-labrador-noir", name: "Chiot labrador noir", hex: "#334155", dark: "#0f172a", ear: "flop" },
    { id: "chien-beagle", name: "Chiot beagle", hex: "#f8fafc", dark: "#78350f", ear: "flop", spots: 1 },
    { id: "chien-shiba", name: "Chiot shiba inu", hex: "#f97316", dark: "#9a3412", ear: "point", belly: "#fff7ed" },
    { id: "chien-carlin", name: "Chiot carlin", hex: "#eab308", dark: "#451a03", ear: "flop", snoutDark: 1 },
    { id: "chien-caniche-blanc", name: "Chiot caniche flocon", hex: "#ffffff", dark: "#94a3b8", ear: "flop", curly: 1 },
    { id: "chien-caniche-abricot", name: "Chiot caniche abricot", hex: "#fdba74", dark: "#c2410c", ear: "flop", curly: 1 },
    { id: "chien-berger-allemand", name: "Chiot berger", hex: "#d97706", dark: "#1e293b", ear: "point", mask: 1 },
    { id: "chien-bouledogue-bleu", name: "Chiot bouledogue gris", hex: "#94a3b8", dark: "#334155", ear: "point", snoutDark: 1 },
    { id: "chien-border-collie", name: "Border collie", hex: "#ffffff", dark: "#1e293b", ear: "flop", spots: 1 },
    { id: "chien-saint-bernard", name: "Saint-Bernard", hex: "#fef3c7", dark: "#b45309", ear: "flop", mask: 1 },
    { id: "chien-chihuahua", name: "Chihuahua", hex: "#fcd34d", dark: "#92400e", ear: "point" },
    { id: "chien-pug-noir", name: "Carlin noir", hex: "#334155", dark: "#0f172a", ear: "flop", snoutDark: 1 }
  ];

  // --- 6. LES OISEAUX ET PIGEONS (1 existant + 4 oiseaux + 4 pigeons) ---
  const BIRDS = [
    { id: "perroquet-tropical", name: "Perroquet arc-en-ciel", hex: "#22c55e", dark: "#15803d", kind: "bird" },
    { id: "oiseau-mesange", name: "Mésange bleue", hex: "#60a5fa", dark: "#1e3a8a", kind: "bird", belly: "#fef08a" },
    { id: "oiseau-rouge-gorge", name: "Rouge-gorge", hex: "#fca5a5", dark: "#7f1d1d", kind: "bird", belly: "#fee2e2" },
    { id: "oiseau-canari", name: "Canari", hex: "#fde047", dark: "#a16207", kind: "bird" },
    { id: "oiseau-toucan", name: "Toucan", hex: "#1e293b", dark: "#0f172a", kind: "bird", beak: "#f97316" },
    { id: "pigeon-blanc", name: "Pigeon blanc", hex: "#ffffff", dark: "#cbd5e1", kind: "pigeon" },
    { id: "pigeon-biset", name: "Pigeon biset", hex: "#94a3b8", dark: "#475569", kind: "pigeon" },
    { id: "pigeon-paon", name: "Pigeon paon", hex: "#fef3c7", dark: "#b45309", kind: "pigeon" },
    { id: "pigeon-ramier", name: "Pigeon ramier", hex: "#64748b", dark: "#1e293b", kind: "pigeon" }
  ];

  // --- 7. LES SERPENTS (2 existants + 4 nouveaux) ---
  const SNAKES = [
    { id: "serpent-caramel", name: "Serpent caramel", hex: "#d97706", dark: "#78350f", kind: "snake" },
    { id: "serpent-menthe", name: "Serpent menthe", hex: "#34d399", dark: "#047857", kind: "snake" },
    { id: "serpent-python", name: "Python royal", hex: "#fcd34d", dark: "#451a03", kind: "snake" },
    { id: "serpent-cobra", name: "Cobra", hex: "#a3e635", dark: "#3f6212", kind: "snake" },
    { id: "serpent-vipere", name: "Vipère", hex: "#94a3b8", dark: "#334155", kind: "snake" },
    { id: "serpent-corail", name: "Serpent corail", hex: "#ef4444", dark: "#7f1d1d", kind: "snake" }
  ];

  // --- 8. LES POISSONS (1 existant + 4 nouveaux) ---
  const FISH = [
    { id: "poisson-bulle", name: "Poisson doré en bocal", hex: "#fb923c", dark: "#c2410c", kind: "fish" },
    { id: "poisson-combat", name: "Poisson combattant", hex: "#a855f7", dark: "#4c1d95", kind: "fish" },
    { id: "poisson-clown", name: "Poisson clown", hex: "#f97316", dark: "#7f1d1d", kind: "fish" },
    { id: "poisson-ange", name: "Poisson ange", hex: "#fde047", dark: "#a16207", kind: "fish" },
    { id: "poisson-guppy", name: "Guppy", hex: "#22d3ee", dark: "#164e63", kind: "fish" }
  ];

  // --- 9. LES AUTRES (RENARDS, CHOUETTES, HÉRISSONS, TORTUES, AXOLOTL, LOUTRE, PINGOUIN, ÉCUREUILS, ORNITHORYNQUES, CROCODILES) ---
  const OTHERS = [
    // Renards (2 existants + 4)
    { id: "renard-roux", name: "Renard roux", hex: "#f97316", dark: "#9a3412", kind: "fox" },
    { id: "renard-polaire", name: "Renard polaire", hex: "#f8fafc", dark: "#94a3b8", kind: "fox" },
    { id: "renard-fennec", name: "Fennec", hex: "#fcd34d", dark: "#b45309", kind: "fox" },
    { id: "renard-gris", name: "Renard gris", hex: "#94a3b8", dark: "#475569", kind: "fox" },
    { id: "renard-kit", name: "Renard kit", hex: "#fde68a", dark: "#c2410c", kind: "fox" },
    // Chouettes (1 existante + 4)
    { id: "chouette-neige", name: "Chouette mignonne", hex: "#b45309", dark: "#573312", kind: "owl" },
    { id: "chouette-effraie", name: "Chouette effraie", hex: "#fef3c7", dark: "#b45309", kind: "owl" },
    { id: "chouette-harfang", name: "Harfang des neiges", hex: "#ffffff", dark: "#94a3b8", kind: "owl" },
    { id: "chouette-pygmee", name: "Chouette pygmée", hex: "#d97706", dark: "#78350f", kind: "owl" },
    { id: "chouette-hulotte", name: "Hulotte", hex: "#78350f", dark: "#291507", kind: "owl" },
    // Hérissons (1 existant + 4)
    { id: "herisson-doux", name: "Hérisson pomme", hex: "#d97706", dark: "#5c3a21", kind: "hedgehog" },
    { id: "herisson-africain", name: "Hérisson d'Afrique", hex: "#fef3c7", dark: "#78350f", kind: "hedgehog" },
    { id: "herisson-europeen", name: "Hérisson d'Europe", hex: "#78350f", dark: "#291507", kind: "hedgehog" },
    { id: "herisson-albinos", name: "Hérisson albinos", hex: "#ffffff", dark: "#cbd5e1", kind: "hedgehog" },
    { id: "herisson-oreilles", name: "Hérisson à longues oreilles", hex: "#fcd34d", dark: "#92400e", kind: "hedgehog" },
    // Tortues (1 existante + 4)
    { id: "tortue-jardin", name: "Tortue feuille", hex: "#4ade80", dark: "#15803d", kind: "turtle" },
    { id: "tortue-boite", name: "Tortue boîte", hex: "#f59e0b", dark: "#78350f", kind: "turtle" },
    { id: "tortue-alligator", name: "Tortue alligator", hex: "#64748b", dark: "#1e293b", kind: "turtle" },
    { id: "tortue-mer", name: "Tortue de mer", hex: "#22d3ee", dark: "#164e63", kind: "turtle" },
    { id: "tortue-peinte", name: "Tortue peinte", hex: "#ef4444", dark: "#7f1d1d", kind: "turtle" },
    // Divers (existants)
    { id: "axolotl-rose", name: "Axolotl rose", hex: "#f9a8d4", dark: "#db2777", kind: "axolotl" },
    { id: "loutre-riviere", name: "Loutre joueuse", hex: "#9c6f44", dark: "#4a2e14", kind: "otter" },
    { id: "pingouin-glace", name: "Pingouin banquise", hex: "#334155", dark: "#0f172a", kind: "penguin" },
    { id: "ecureuil-noisette", name: "Écureuil noisette", hex: "#d97706", dark: "#78350f", kind: "squirrel" },
    // Écureuils (1 existant + 3)
    { id: "ecureuil-roux", name: "Écureuil roux", hex: "#b91c1c", dark: "#450a0a", kind: "squirrel" },
    { id: "ecureuil-gris", name: "Écureuil gris", hex: "#94a3b8", dark: "#334155", kind: "squirrel" },
    { id: "ecureuil-volant", name: "Écureuil volant", hex: "#475569", dark: "#0f172a", kind: "squirrel" },
    { id: "ecureuil-pygmee", name: "Écureuil pygmée", hex: "#fcd34d", dark: "#92400e", kind: "squirrel" },
    // Ornithorynques (0 existant + 4)
    { id: "ornithorynque-brun", name: "Ornithorynque brun", hex: "#92400e", dark: "#451a03", kind: "platypus" },
    { id: "ornithorynque-roux", name: "Ornithorynque roux", hex: "#b45309", dark: "#78350f", kind: "platypus" },
    { id: "ornithorynque-noir", name: "Ornithorynque noir", hex: "#334155", dark: "#0f172a", kind: "platypus" },
    { id: "ornithorynque-blanc", name: "Ornithorynque blanc", hex: "#f8fafc", dark: "#cbd5e1", kind: "platypus" },
    // Crocodiles (0 existant + 4)
    { id: "crocodile-vert", name: "Crocodile vert", hex: "#4ade80", dark: "#15803d", kind: "crocodile" },
    { id: "crocodile-nil", name: "Crocodile du Nil", hex: "#64748b", dark: "#1e293b", kind: "crocodile" },
    { id: "caiman", name: "Caïman", hex: "#78350f", dark: "#291507", kind: "crocodile" },
    { id: "alligator", name: "Alligator", hex: "#334155", dark: "#0f172a", kind: "crocodile" }
  ];

  // --- FUSION DE TOUS LES ANIMAUX ---
  const ANIMALS = [
    ...FERRETS.map(x => ({ ...x, species: "Furet", kind: "ferret", family: "ferret" })),
    ...RABBITS.map(x => ({ ...x, species: "Lapin", kind: "rabbit", family: "rabbit" })),
    ...HAMSTERS.map(x => ({ ...x, species: "Hamster", kind: "hamster", family: "hamster" })),
    ...CATS.map(x => ({ ...x, species: "Chat", kind: "cat", family: "cat" })),
    ...DOGS.map(x => ({ ...x, species: "Chien", kind: "dog", family: "dog" })),
    ...BIRDS.map(x => ({ ...x, species: "Oiseau", kind: "bird", family: "bird" })),
    ...SNAKES.map(x => ({ ...x, species: "Serpent", kind: "snake", family: "snake" })),
    ...FISH.map(x => ({ ...x, species: "Poisson", kind: "fish", family: "fish" })),
    ...OTHERS.map(x => ({ 
      ...x, 
      species: x.kind === "fox" ? "Renard" : x.kind === "owl" ? "Chouette" : x.kind === "hedgehog" ? "Hérisson" : x.kind === "turtle" ? "Tortue" : x.kind === "platypus" ? "Ornithorynque" : x.kind === "crocodile" ? "Crocodile" : x.kind === "squirrel" ? "Écureuil" : "Autre", 
      family: x.kind 
    }))
  ];

  // --- LE DESSIN DES ANIMAUX (SVG) ---
  function animalSvg(a, cls, opts) {
    if (!a) return `<span style="font-size:2rem">🐾</span>`;
    const c = a.hex || "#f59e0b";
    const d = a.dark || "#b45309";
    const eyeCol = a.eye || "#1e293b";
    let art = "";

    if (a.kind === "ferret") {
      const mask = a.mask || "#fffaf5";
      const tail = a.tail || d;
      if (a.pose === "sleepy") {
        art = `<path d="M22,74 Q14,56 30,52" fill="none" stroke="${tail}" stroke-width="9" stroke-linecap="round"/><ellipse cx="52" cy="60" rx="26" ry="17" fill="${c}" stroke="${d}" stroke-width="2.2"/><circle cx="34" cy="44" r="7" fill="${mask}" stroke="${d}" stroke-width="1.8"/><circle cx="52" cy="44" r="7" fill="${mask}" stroke="${d}" stroke-width="1.8"/><ellipse cx="43" cy="52" rx="19" ry="15" fill="${c}" stroke="${d}" stroke-width="2.2"/><path d="M29,48 Q43,40 57,48 L53,61 Q43,66 33,61 Z" fill="${mask}"/><path d="M36,52 Q39,55 42,52 M45,52 Q48,55 51,52" fill="none" stroke="${eyeCol}" stroke-width="2" stroke-linecap="round"/><circle cx="43" cy="56" r="2.6" fill="#fb7185"/>`;
      } else if (a.pose === "bandit") {
        art = `<path d="M72,66 Q90,46 84,30" fill="none" stroke="${tail}" stroke-width="8" stroke-linecap="round"/><ellipse cx="52" cy="62" rx="18" ry="16" fill="${c}" stroke="${d}" stroke-width="2.2"/><polygon points="33,40 37,24 46,36" fill="${tail}" stroke="${d}" stroke-width="1.8"/><polygon points="65,40 61,24 52,36" fill="${tail}" stroke="${d}" stroke-width="1.8"/><ellipse cx="49" cy="48" rx="18" ry="15" fill="${c}" stroke="${d}" stroke-width="2.2"/><path d="M33,46 Q49,42 65,46 L63,53 Q49,56 35,53 Z" fill="${tail}"/><circle cx="42" cy="49" r="2.7" fill="#fff"/><circle cx="56" cy="49" r="2.7" fill="#fff"/><circle cx="42" cy="49" r="1.4" fill="#0f172a"/><circle cx="56" cy="49" r="1.4" fill="#0f172a"/><circle cx="49" cy="56" r="2.6" fill="#fb7185"/>`;
      } else {
        art = `<path d="M68,68 Q88,64 86,44" fill="none" stroke="${tail}" stroke-width="8.5" stroke-linecap="round"/><ellipse cx="52" cy="63" rx="19" ry="15" fill="${c}" stroke="${d}" stroke-width="2.2"/><ellipse cx="35" cy="34" rx="6.5" ry="9" fill="${c}" stroke="${d}" stroke-width="2"/><ellipse cx="61" cy="34" rx="6.5" ry="9" fill="${c}" stroke="${d}" stroke-width="2"/><ellipse cx="48" cy="47" rx="19" ry="15" fill="${c}" stroke="${d}" stroke-width="2.2"/><ellipse cx="48" cy="52" rx="12" ry="9" fill="${mask}"/><circle cx="41" cy="46" r="3" fill="${eyeCol}"/><circle cx="55" cy="46" r="3" fill="${eyeCol}"/><circle cx="40" cy="45" r="1.1" fill="#fff"/><circle cx="54" cy="45" r="1.1" fill="#fff"/><circle cx="48" cy="52" r="2.7" fill="#fb7185"/><path d="M43,57 Q48,61 53,57" fill="none" stroke="${eyeCol}" stroke-width="1.9" stroke-linecap="round"/>`;
      }
    } else if (a.kind === "rabbit") {
      const belly = a.belly || "#fff8f1";
      const ear = a.earStyle === "lop" ? `<ellipse cx="25" cy="52" rx="8" ry="18" transform="rotate(14 25 52)" fill="${c}" stroke="${d}" stroke-width="2"/><ellipse cx="75" cy="52" rx="8" ry="18" transform="rotate(-14 75 52)" fill="${c}" stroke="${d}" stroke-width="2"/>` : a.earStyle === "tilt" ? `<ellipse cx="36" cy="22" rx="6.5" ry="18" transform="rotate(-12 36 22)" fill="${c}" stroke="${d}" stroke-width="2"/><ellipse cx="65" cy="24" rx="6.5" ry="17" transform="rotate(18 65 24)" fill="${c}" stroke="${d}" stroke-width="2"/>` : `<ellipse cx="38" cy="20" rx="6.5" ry="19" fill="${c}" stroke="${d}" stroke-width="2"/><ellipse cx="62" cy="20" rx="6.5" ry="19" fill="${c}" stroke="${d}" stroke-width="2"/><ellipse cx="38" cy="21" rx="3" ry="13" fill="#fbcfe8" opacity=".75"/><ellipse cx="62" cy="21" rx="3" ry="13" fill="#fbcfe8" opacity=".75"/>`;
      const spot = a.spot ? `<circle cx="60" cy="46" r="6" fill="${a.spot}" opacity=".85"/><circle cx="38" cy="68" r="5" fill="${a.spot}" opacity=".8"/>` : "";
      art = `${ear}<circle cx="24" cy="72" r="7" fill="${belly}" stroke="${d}" stroke-width="1.8"/><ellipse cx="50" cy="64" rx="22" ry="18" fill="${c}" stroke="${d}" stroke-width="2.2"/><ellipse cx="50" cy="67" rx="12" ry="11" fill="${belly}"/>${spot}<ellipse cx="50" cy="47" rx="20" ry="16" fill="${c}" stroke="${d}" stroke-width="2.2"/><circle cx="41" cy="45" r="3.1" fill="${eyeCol}"/><circle cx="59" cy="45" r="3.1" fill="${eyeCol}"/><circle cx="40" cy="44" r="1.1" fill="#fff"/><circle cx="58" cy="44" r="1.1" fill="#fff"/><circle cx="50" cy="51" r="2.8" fill="#fb7185"/><path d="M45,55 L50,58 L55,55" fill="none" stroke="${eyeCol}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else if (a.kind === "hamster") {
      art = `<circle cx="25" cy="28" r="8.5" fill="${c}" stroke="${d}" stroke-width="2"/><circle cx="75" cy="28" r="8.5" fill="${c}" stroke="${d}" stroke-width="2"/><ellipse cx="50" cy="55" rx="27" ry="24" fill="${c}" stroke="${d}" stroke-width="2.2"/><ellipse cx="50" cy="62" rx="17" ry="13" fill="${a.belly || "#fffbeb"}" opacity=".9"/><circle cx="40" cy="49" r="3.2" fill="#1e293b"/><circle cx="60" cy="49" r="3.2" fill="#1e293b"/><circle cx="39" cy="48" r="1.1" fill="#fff"/><circle cx="59" cy="48" r="1.1" fill="#fff"/><ellipse cx="50" cy="55" rx="3.8" ry="2.6" fill="#fb7185"/><path d="M44,60 Q50,65 56,60" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round"/>`;
      if (a.theme === "jedi") art += `<path d="M25,36 L50,15 L75,36 Z" fill="#92400e" stroke="#451a03" stroke-width="2"/>`;
      else if (a.theme === "ninja") art += `<rect x="25" y="42" width="50" height="9" rx="4" fill="#0f172a"/><circle cx="40" cy="46.5" r="2.6" fill="#fff"/><circle cx="60" cy="46.5" r="2.6" fill="#fff"/>`;
      else if (a.theme === "astro") art += `<circle cx="50" cy="53" r="32" fill="none" stroke="#38bdf8" stroke-width="2.5" opacity=".75"/>`;
      else if (a.theme === "knight") art += `<path d="M29,34 L50,16 L71,34 Z" fill="#94a3b8" stroke="#334155" stroke-width="2"/>`;
      else if (a.theme === "pirate") art += `<path d="M24,32 L76,32 L64,20 L36,20 Z" fill="#1e293b"/><circle cx="40" cy="49" r="4.5" fill="#0f172a"/>`;
      else if (a.theme === "mage") art += `<path d="M28,33 L50,10 L72,33 Z" fill="#7e22ce" stroke="#4c1d95" stroke-width="2"/>`;
      else if (a.theme === "king") art += `<path d="M34,30 L32,16 L43,22 L50,13 L57,22 L68,16 L66,30 Z" fill="#facc15" stroke="#ca8a04" stroke-width="1.8"/>`;
      else if (a.theme === "ice") art += `<path d="M35,32 Q50,24 65,32 L61,40 Q50,36 39,40 Z" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.8"/>`;
      else if (a.theme === "lemon") art += `<circle cx="76" cy="24" r="6" fill="#fef08a" stroke="#ca8a04" stroke-width="1.6"/>`;
      else if (a.theme === "panda") art += `<circle cx="35" cy="40" r="7" fill="#1e293b"/><circle cx="65" cy="40" r="7" fill="#1e293b"/><circle cx="40" cy="49" r="3.2" fill="#1e293b"/><circle cx="60" cy="49" r="3.2" fill="#1e293b"/>`;
    } else if (a.kind === "cat") {
      const ears = a.earFold ? `<path d="M26,38 Q26,22 44,32 Z" fill="${c}" stroke="${d}" stroke-width="2"/><path d="M74,38 Q74,22 56,32 Z" fill="${c}" stroke="${d}" stroke-width="2"/>` : `<polygon points="25,42 31,15 44,32" fill="${a.pattern === "siamese" ? d : c}" stroke="${d}" stroke-width="2"/><polygon points="75,42 69,15 56,32" fill="${a.pattern === "siamese" ? d : c}" stroke="${d}" stroke-width="2"/>`;
      const pat = a.pattern === "stripe" ? `<path d="M46,24 V31 M50,23 V32 M54,24 V31" stroke="${d}" stroke-width="2" stroke-linecap="round"/>` : a.pattern === "calico" ? `<circle cx="35" cy="41" r="7" fill="#fb923c" opacity=".85"/><circle cx="63" cy="56" r="6" fill="#334155" opacity=".8"/>` : a.pattern === "siamese" ? `<ellipse cx="50" cy="55" rx="10" ry="7" fill="${d}" opacity=".85"/>` : a.pattern === "cow" ? `<circle cx="61" cy="42" r="7" fill="${d}"/><circle cx="37" cy="64" r="6" fill="${d}"/>` : a.pattern === "redwhite" ? `<circle cx="60" cy="42" r="7" fill="${d}"/><circle cx="40" cy="66" r="6" fill="${d}"/>` : "";
      art = `<path d="M72,72 Q88,62 82,46" fill="none" stroke="${a.pattern === "siamese" ? d : c}" stroke-width="7" stroke-linecap="round"/>${ears}<ellipse cx="50" cy="66" rx="20" ry="17" fill="${c}" stroke="${d}" stroke-width="2.2"/><circle cx="50" cy="48" r="22" fill="${c}" stroke="${d}" stroke-width="2.2"/>${pat}<circle cx="41" cy="46" r="3" fill="${eyeCol}"/><circle cx="59" cy="46" r="3" fill="${eyeCol}"/><circle cx="50" cy="52" r="3" fill="#fb7185"/><path d="M45,57 Q50,61 55,57" fill="none" stroke="#1e293b" stroke-width="1.9" stroke-linecap="round"/>`;
    } else if (a.kind === "dog") {
      const ears = a.ear === "point" ? `<polygon points="26,40 31,15 43,31" fill="${d}" stroke="${d}" stroke-width="1.8"/><polygon points="74,40 69,15 57,31" fill="${d}" stroke="${d}" stroke-width="1.8"/>` : `<ellipse cx="26" cy="52" rx="8" ry="15" transform="rotate(12 26 52)" fill="${d}"/><ellipse cx="74" cy="52" rx="8" ry="15" transform="rotate(-12 74 52)" fill="${d}"/>`;
      const mask = a.mask ? `<circle cx="40" cy="45" r="7" fill="${d}" opacity=".85"/><circle cx="60" cy="45" r="7" fill="${d}" opacity=".85"/>` : "";
      const spots = a.spots ? `<circle cx="38" cy="64" r="5" fill="${d}"/><circle cx="62" cy="44" r="4.5" fill="${d}"/>` : "";
      const snoutFill = a.snoutDark ? d : "#fffbeb";
      art = `${ears}<ellipse cx="50" cy="65" rx="21" ry="17" fill="${c}" stroke="${d}" stroke-width="2.2"/>${spots}<circle cx="50" cy="47" r="21" fill="${c}" stroke="${d}" stroke-width="2.2"/>${mask}<ellipse cx="50" cy="54" rx="10" ry="7.5" fill="${snoutFill}" opacity=".9"/><circle cx="41" cy="45" r="3" fill="${eyeCol}"/><circle cx="59" cy="45" r="3" fill="${eyeCol}"/><ellipse cx="50" cy="52" rx="4" ry="2.8" fill="#1e293b"/><path d="M45,58 Q50,62 55,58" fill="none" stroke="#1e293b" stroke-width="1.9" stroke-linecap="round"/>`;
    } else if (a.kind === "snake") {
      art = `<path d="M24,74 C20,54 44,54 48,68 C52,82 78,80 76,58 C74,42 56,44 54,32" fill="none" stroke="${c}" stroke-width="11" stroke-linecap="round"/><ellipse cx="54" cy="27" rx="14" ry="11" fill="${c}" stroke="${d}" stroke-width="2"/><circle cx="50" cy="25" r="2.6" fill="#1e293b"/><circle cx="59" cy="25" r="2.6" fill="#1e293b"/><path d="M54,38 V44 L50,47 M54,44 L58,47" stroke="#ef4444" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    } else if (a.kind === "bird") {
      art = `<ellipse cx="50" cy="55" rx="22" ry="25" fill="${c}" stroke="${d}" stroke-width="2.2"/><ellipse cx="52" cy="60" rx="12" ry="16" fill="${a.belly || "#fef08a"}" opacity=".85"/><circle cx="42" cy="44" r="3" fill="#1e293b"/><circle cx="58" cy="44" r="3" fill="#1e293b"/><polygon points="46,49 54,49 50,56" fill="${a.beak || "#f97316"}"/>`;
    } else if (a.kind === "pigeon") {
      art = `<ellipse cx="50" cy="55" rx="22" ry="20" fill="${c}" stroke="${d}" stroke-width="2.2"/><circle cx="60" cy="35" r="12" fill="${c}" stroke="${d}" stroke-width="2.2"/><polygon points="68,33 78,35 68,38" fill="#f97316"/><circle cx="63" cy="33" r="2.5" fill="#1e293b"/><path d="M28,55 L15,60 L28,65 Z" fill="${d}"/><path d="M45,75 L45,85 M55,75 L55,85" stroke="#f97316" stroke-width="2"/>`;
    } else if (a.kind === "fish") {
      art = `<circle cx="50" cy="52" r="31" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2.4" opacity=".75"/><ellipse cx="47" cy="54" rx="16" ry="11" fill="${c}" stroke="${d}" stroke-width="2"/><polygon points="63,54 75,45 75,63" fill="${c}" stroke="${d}" stroke-width="2"/><circle cx="37" cy="51" r="2.5" fill="#1e293b"/>`;
    } else if (a.kind === "squirrel") {
      art = `<ellipse cx="50" cy="65" rx="18" ry="16" fill="${c}" stroke="${d}" stroke-width="2.2"/><circle cx="40" cy="45" r="16" fill="${c}" stroke="${d}" stroke-width="2.2"/><polygon points="30,32 28,20 38,30" fill="${c}" stroke="${d}" stroke-width="1.5"/><polygon points="50,32 52,20 42,30" fill="${c}" stroke="${d}" stroke-width="1.5"/><path d="M60,70 Q80,50 70,25 Q65,15 55,25 Q50,40 65,60" fill="${d}" stroke="${d}" stroke-width="2"/><circle cx="35" cy="42" r="2.5" fill="#1e293b"/>`;
    } else if (a.kind === "hedgehog") {
      art = `<ellipse cx="50" cy="60" rx="25" ry="20" fill="${c}" stroke="${d}" stroke-width="2.2"/><path d="M30,45 L25,35 L35,45 M40,40 L35,30 L45,40 M50,38 L45,28 L55,38 M60,40 L55,30 L65,40 M70,45 L65,35 L75,45" fill="none" stroke="${d}" stroke-width="3" stroke-linecap="round"/><ellipse cx="70" cy="60" rx="12" ry="10" fill="#fffbeb" stroke="${d}" stroke-width="2"/><circle cx="78" cy="60" r="3" fill="#1e293b"/><circle cx="72" cy="56" r="2" fill="#1e293b"/>`;
    } else if (a.kind === "fox") {
      art = `<ellipse cx="50" cy="65" rx="20" ry="16" fill="${c}" stroke="${d}" stroke-width="2.2"/><polygon points="50,25 30,50 70,50" fill="${c}" stroke="${d}" stroke-width="2.2"/><polygon points="35,40 30,20 45,35" fill="${c}" stroke="${d}" stroke-width="1.5"/><polygon points="65,40 70,20 55,35" fill="${c}" stroke="${d}" stroke-width="1.5"/><ellipse cx="50" cy="52" rx="10" ry="6" fill="#fffbeb"/><path d="M25,70 Q10,50 20,40 Q25,50 30,60" fill="${c}" stroke="${d}" stroke-width="2"/>`;
    } else if (a.kind === "owl") {
      art = `<ellipse cx="50" cy="55" rx="22" ry="25" fill="${c}" stroke="${d}" stroke-width="2.2"/><ellipse cx="50" cy="62" rx="14" ry="16" fill="#fffbeb"/><circle cx="40" cy="45" r="8" fill="#fef08a" stroke="${d}" stroke-width="1.5"/><circle cx="60" cy="45" r="8" fill="#fef08a" stroke="${d}" stroke-width="1.5"/><circle cx="40" cy="45" r="3" fill="#1e293b"/><circle cx="60" cy="45" r="3" fill="#1e293b"/><polygon points="46,50 54,50 50,58" fill="#f97316"/><path d="M28,50 Q20,60 30,75" fill="none" stroke="${d}" stroke-width="2.5"/><path d="M72,50 Q80,60 70,75" fill="none" stroke="${d}" stroke-width="2.5"/>`;
    } else if (a.kind === "turtle") {
      art = `<ellipse cx="50" cy="60" rx="30" ry="20" fill="${c}" stroke="${d}" stroke-width="2.2"/><path d="M30,50 L50,40 L70,50 M25,60 L50,50 L75,60 M30,70 L50,60 L70,70" fill="none" stroke="${d}" stroke-width="1.5"/><circle cx="80" cy="55" r="8" fill="#a3e635" stroke="${d}" stroke-width="2"/><circle cx="82" cy="53" r="1.5" fill="#1e293b"/><ellipse cx="30" cy="78" rx="6" ry="4" fill="#a3e635" stroke="${d}" stroke-width="1.5"/><ellipse cx="65" cy="78" rx="6" ry="4" fill="#a3e635" stroke="${d}" stroke-width="1.5"/>`;
    } else if (a.kind === "platypus") {
      art = `<ellipse cx="50" cy="60" rx="25" ry="18" fill="${c}" stroke="${d}" stroke-width="2.2"/><path d="M25,60 L10,70 L15,80 L30,70 Z" fill="${d}" stroke="${d}" stroke-width="2"/><circle cx="65" cy="45" r="14" fill="${c}" stroke="${d}" stroke-width="2.2"/><path d="M75,45 Q90,45 90,52 Q80,55 75,52 Z" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/><circle cx="68" cy="42" r="2.5" fill="#1e293b"/><path d="M40,75 L40,85 M55,75 L55,85" stroke="#f97316" stroke-width="2"/>`;
    } else if (a.kind === "crocodile") {
      art = `<path d="M20,60 Q50,40 80,60 L90,60 Q95,65 90,70 L20,70 Q15,65 20,60 Z" fill="${c}" stroke="${d}" stroke-width="2.2"/><path d="M20,60 L5,50 L5,80 L20,70 Z" fill="${c}" stroke="${d}" stroke-width="2.2"/><rect x="75" y="58" width="25" height="12" rx="4" fill="${c}" stroke="${d}" stroke-width="2.2"/><circle cx="75" cy="52" r="4" fill="#fff" stroke="${d}" stroke-width="1.5"/><circle cx="76" cy="52" r="2" fill="#1e293b"/><path d="M30,55 L35,45 L40,55 M45,50 L50,40 L55,50 M60,50 L65,40 L70,50" fill="none" stroke="${d}" stroke-width="2"/><path d="M80,64 L82,68 L84,64 M86,64 L88,68 L90,64" fill="none" stroke="#fff" stroke-width="1.5"/>`;
    } else {
      art = `<polygon points="26,38 32,16 44,31" fill="${c}" stroke="${d}" stroke-width="2"/><polygon points="74,38 68,16 56,31" fill="${c}" stroke="${d}" stroke-width="2"/><ellipse cx="50" cy="56" rx="25" ry="22" fill="${c}" stroke="${d}" stroke-width="2.2"/><ellipse cx="50" cy="62" rx="14" ry="11" fill="#fffbeb" opacity=".82"/><circle cx="40" cy="50" r="3.1" fill="#1e293b"/><circle cx="60" cy="50" r="3.1" fill="#1e293b"/><circle cx="50" cy="56" r="3.5" fill="${d}"/><path d="M44,62 Q50,67 56,62" fill="none" stroke="#1e293b" stroke-width="1.9" stroke-linecap="round"/>`;
    }
    return art;
  }

  window.ANIMALS_RATES = ANIMALS.map(a => ({ ...a, id: "rate-" + a.id, name: a.name, species: a.species === "Autre" ? ({ axolotl: "Axolotl", otter: "Loutre", penguin: "Manchot" })[a.kind] || "Autre" : a.species, rate: true, o: {}, belly: a.belly || "#fffbeb", draw: (x, b) => animalSvg(x, "", { isBaby: b }) }));
})();
