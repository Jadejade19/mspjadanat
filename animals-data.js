"use strict";
// ============================================================================
//  LES 500 ANIMAUX. Une ligne = un animal :
//    nom | couleur | couleur foncée | couleur claire (ventre) | options | identifiant
//  (l'identifiant n'est précisé que pour les animaux qui existaient déjà, afin
//   de garder ceux déjà gagnés). Le dessin de chaque espèce est dans animals-art.js
// ============================================================================
window.ANIMALS_DATA = (function () {
  const out = [];
  const slug = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/œ/g, "oe").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const S = (kind, species, family, txt) => txt.trim().split("\n").forEach(l => {
    const [name, c, d, b, opts, id] = l.trim().split("|");
    const o = {}; (opts || "").split(",").filter(Boolean).forEach(p => { const [k, v] = p.split("="); o[k] = v === undefined ? true : v; });
    out.push({ kind, species, family, name, hex: "#" + c, dark: "#" + d, belly: "#" + b, o, id: id || kind + "-" + slug(name) });
  });

  S("ferret", "Furet", "ferret", `
Furet sable|e6c297|9c7244|f9ecd9||furet-sable
Furet zibeline|7b5030|3a2112|f3e8dc|mask|furet-zibeline
Furet albinos|fffaf3|e3d3cb|ffffff|eye=e0506e,sleep|furet-albinos
Furet cannelle|d0804e|8c4318|fde7d6|play|furet-cannelle
Furet argenté|a9b3c2|5d6a7d|f1f5f9||furet-argent
Furet chocolat|6f482b|38200f|edd8c5|mask|furet-chocolat
Furet champagne|f3d9b0|b98d58|fff9eb|play|furet-champagne
Furet charbon|565d6b|20242e|e2e8f0||furet-charbon
Furet panda|fdfbf7|2d2a38|ffffff|panda,play|furet-panda
Furet blaze|d58b45|7c4318|ffffff|blaze|furet-blaze
Furet mitt|f6e6b8|b57a36|ffffff|mask|furet-mitt
Furet wheaten|f3d27c|a06d24|fffbeb|play|furet-wheaten
Furet angora|f8eee0|c4a582|ffffff|sleep
Furet point bleu|d9dee6|6f7f98|ffffff|mask`);

  S("rabbit", "Lapin", "rabbit", `
Lapin bélier roux|e08e55|9a4e1e|fff4e6|ear=lop|lapin-belier-roux
Lapin nain blanc|ffffff|b8b3c4|fdfdfd|eye=d9577a|lapin-nain-blanc
Lapin papillon tacheté|fdfaf5|3c3a48|ffffff|p=butterfly|lapin-tachete
Lapin gris perle|cdd3de|6d7890|f5f7fa|ear=tilt|lapin-gris-perle
Lapin noisette|b07e54|63391a|f3e5d8||lapin-chocolat
Lapin bélier nuage|a4adbd|545f73|eceff4|ear=lop|lapin-belier-gris
Lapin rose pêche|fbcfd6|cf7f92|fff1f2|ear=tilt|lapin-fraise
Lapin trèfle|c9efc9|5a9a68|f3fff3||lapin-menthe
Lapin bélier cacao|7c5033|442612|f5e6d8|ear=lop|lapin-belier-chocolat
Lapin lavande|ddd3f7|8572bd|f8f5ff|ear=tilt|lapin-lavande
Lapin angora|fdf3dd|c9a877|ffffff|fluff|lapin-angora
Lapin hollandais|fdfcfa|2f2d3b|ffffff|p=dutch|lapin-hollandais
Lapin tête de lion|f3b878|b3672c|fff3e4|mane|lapin-lion
Lapin rex|b9c0cb|6d7688|eef1f5|curl|lapin-rex
Lapin hollandais bleu|fdfcfa|7d8ba5|ffffff|p=dutch
Lapin bélier tacheté|fdfaf5|a5693a|ffffff|ear=lop,p=patch
Lapin feu de Bourgogne|d9763b|94441a|fbe3cb|
Lapin noir et feu|35313c|14121a|e89a5b|p=tan
Lapin arlequin|f0b46a|37323e|f8d8ab|p=harlequin
Lièvre brun|b5824e|6a4320|f8ead4|big,p=tick
Lièvre arctique|f9fbfd|9fb0c4|ffffff|big,fluff`);

  S("hamster", "Hamster", "hamster", `
Hamster jaune canari|f9d64a|bd8e14|fff9dd||hamster-canari
Hamster Jedi|dab98a|8c6239|fef3dc|t=jedi|hamster-jedi
Hamster Ninja|8d97a8|3d4658|e7ebf1|t=ninja|hamster-ninja
Hamster Astronaute|f3b25a|a5641b|fff4e0|t=astro|hamster-astro
Hamster Chevalier|d4dae4|6d7890|f8fafc|t=knight|hamster-chevalier
Hamster Pirate|dd9b54|8a4e1b|fdf0dc|t=pirate|hamster-pirate
Hamster Mage|cfa6f0|7a48a8|faf3ff|t=mage|hamster-mage
Hamster Roi|fac553|a36a14|fff6e0|t=king|hamster-roi
Hamster Glace|b5d8f7|5486be|f2f9ff|t=ice|hamster-glace
Hamster Citron|fbe66b|b0931c|fffde6|t=lemon|hamster-citron
Hamster roborovski|eac48b|a77a3e|fffaf0|p=brow|hamster-robo
Hamster panda|fdfcfa|2f2d3b|ffffff|p=panda|hamster-panda
Hamster syrien|f0964a|a4571a|fff0df||hamster-syrien
Hamster russe|b1b8c4|616b7c|f6f8fa|p=stripe|hamster-russe
Hamster perle|f7f5f2|b5aeb5|ffffff|p=stripe
Hamster de Chine|a88a6a|5f4730|f4ebdf|p=stripe
Hamster crème|fbe8c6|c19c66|ffffff|
Hamster docteur|e3c29c|95683b|fff7ec|t=doc
Hamster fée|f9cfe3|c27aa2|fff5fa|t=fairy
Hamster viking|cf9b63|7d4f23|fbeedb|t=viking
Hamster licorne|fbf3ff|b193d6|ffffff|t=unicorn
Hamster apiculteur|f5d27a|a9781f|fffaeb|t=bee`);

  S("guinea", "Cochon d'Inde", "guinea", `
Cochon d'Inde tricolore|fdf8f0|3a3440|ffffff|p=tri
Cochon d'Inde roux|d9813f|8f4717|f8dcc0|
Cochon d'Inde rosette|c98a55|6f4220|fdf1e2|rosette
Cochon d'Inde couronné|9c6a42|573418|f9ecdd|crown
Cochon d'Inde crème|f9e7c5|bf9a64|ffffff|
Cochon d'Inde noir|3b3742|17151d|6f6876|
Cochon d'Inde himalayen|fdfcfa|5f4a45|ffffff|p=point,eye=d9577a
Cochon d'Inde argenté|b5bac4|656c7a|eff1f4|p=tick
Cochon d'Inde nu|f5c9b5|b8816c|fde3d7|nude`);

  S("cat", "Chat", "cat", `
Chat tigré roux|f6a052|bd5a18|fff1df|p=tabby,eye=5f9a3f|chat-tigre-roux
Chat noir mystérieux|3f3b4a|17141f|5a5566|eye=f2c230|chat-noir
Chaton blanc flocon|fffdfa|b5aebb|ffffff|eye=4f9fd8|chat-blanc
Chat calico tricolore|fffaf2|3b3440|ffffff|p=calico,eye=b5862a|chat-calico
Chat siamois|f7e8cf|51392f|fff7e8|p=point,eye=3f8fd8|chat-siamois
Chat lilas|dccbf0|8a6fb3|f8f3ff|p=tabby|chat-lavande
Scottish fold gris|a3acb9|566072|dfe4ea|ear=fold,eye=e09a2a|chat-scottish-gris
Scottish fold crème|f5deb3|b98a4b|fff8e8|ear=fold,p=tabby,eye=c98a2a|chat-scottish-creme
Chat tigré argenté|ccd3dd|566072|f3f5f8|p=tabby,eye=5fa54f|chat-tigre-gris
Chat vache noir et blanc|fffdfa|33303c|ffffff|p=cow,eye=6fa83f|chat-bicolore-noir
Chat roux et blanc|fff7ee|ea8a3c|ffffff|p=patchs,eye=c98a2a|chat-bicolore-roux
Bleu de Russie|8593a8|48556b|aab5c5|eye=4fae58|chat-bleue-russe
Chat écaille de tortue|5b3a2a|2a1a14|c9773a|p=tortie,eye=d9a12a|chat-écaille
Chaton rose bonbon|fbd3e0|cc7f9f|fff4f8|p=tabby,eye=8f6fc9|chat-rose-poudre
Chat bengal|e5a65a|6b3d17|fbe8cd|p=rosette,eye=5fa54f|chat-bengal
Chat persan|f8f3ea|bfae98|ffffff|fluff,flat,eye=e09a2a|chat-persan
Maine coon|a06a3c|54320f|e8cfae|p=tabby,ear=tuft,fluff,eye=c9a52a|chat-maine-coon
Sacré de Birmanie|fbf1de|6b4f3d|ffffff|p=point,fluff,mitt,eye=3f8fd8|chat-sacre-birmanie
Chat tuxedo|34303d|15131b|ffffff|p=tux,eye=8fb53f
Ragdoll|f6ecdf|8a7464|ffffff|p=point,fluff,eye=4f9fe0
Chartreux|7d8798|454f61|97a1b1|eye=e8902a
Sphynx|f3c9b5|b07f6b|fbe0d3|nude,eye=5fb5c9
Munchkin|f2c68a|a56e2c|fff3e0|p=tabby,short,eye=6fa83f
Abyssin|d08a4c|7d4517|f3cfa5|p=tick,eye=8fae3f
Van turc|fffdfa|d9813f|ffffff|p=van,eye=d9a12a
Sibérien|b5a592|5f5140|f6efe3|p=tabby,fluff,eye=7fa83f
Savannah|e8b76a|3f2a16|fbe9cb|p=spots,big,eye=c9a52a
Tonkinois|c9a98a|6b4d39|e5d0ba|p=point,eye=5fc0b5
Cornish rex|f3ece4|a89a8c|ffffff|ear=big,curl,eye=5fa8d8
Bobtail japonais|fffaf2|3b3440|ffffff|p=calico,bob,eye=d9a12a
Chat des sables|e8cf9f|9a7a45|fff6e0|p=tick,ear=big,eye=b5b53f
Chaton myrtille|9fb0e8|5566b0|eef2ff|p=tabby,eye=f2c230
Chaton galaxie|4c3f8f|231a52|7a63c9|p=star,eye=8fe0ff
Chat porte-bonheur|fffdfa|d9813f|ffffff|p=calico,lucky,eye=8a6a2a`);

  S("dog", "Chien", "dog", `
Chiot golden retriever|f4c26b|b57a24|fff2d8|ear=flop,fluff|chien-golden
Chiot dalmatien|fffdfa|2f2c38|ffffff|ear=flop,p=spots|chien-dalmatien
Chiot corgi roux|f0a04c|a85f18|fffaf2|ear=point,p=bi,short|chien-corgi-roux
Chiot corgi tricolore|3b3540|1b1822|fffaf2|ear=point,p=tri,short|chien-corgi-tricolore
Chiot husky|7f8b9e|3a4354|ffffff|ear=point,p=husky,eye=3f9fe8|chien-husky
Chiot labrador chocolat|8d5f3c|4f3018|b5835c|ear=flop|chien-chocolat
Chiot labrador noir|3a3744|16141d|57535f|ear=flop|chien-labrador-noir
Chiot beagle|c9803f|3b2e2a|fffaf4|ear=long,p=blaze,saddle|chien-beagle
Chiot shiba inu|ee9a4c|a85a1a|fff6ea|ear=point,p=shiba,curlt|chien-shiba
Chiot carlin|ecd0a0|3b302e|f6e3c3|ear=small,p=mask,flat,curlt|chien-carlin
Chiot caniche flocon|fffdfa|b8b0bd|ffffff|ear=flop,curly|chien-caniche-blanc
Chiot caniche abricot|f6be8a|b87840|fde2c8|ear=flop,curly|chien-caniche-abricot
Chiot berger allemand|c98a48|2f2723|e5b880|ear=point,p=mask,saddle|chien-berger-allemand
Bouledogue français gris|9aa4b3|545e70|c3cad4|ear=bat,flat|chien-bouledogue-bleu
Border collie|35313c|15131a|ffffff|ear=semi,p=blaze,fluff|chien-border-collie
Saint-Bernard|b5673a|5f2f17|fffaf3|ear=flop,p=blaze,big|chien-saint-bernard
Chihuahua|f0cd92|a87c3f|fff5e2|ear=big|chien-chihuahua
Carlin noir|3a3642|16141c|57525f|ear=small,flat,curlt|chien-pug-noir
Cocker américain|d39a5c|87531f|f6e0c3|ear=long,fluff
Teckel|8a5230|48260f|d9945a|ear=long,p=tan,short
Westie|fffdfa|b9b0b8|ffffff|ear=point,fringe
Schnauzer|6b7380|333a45|e8ebef|ear=semi,beard
Bichon frisé|fffdfa|c0b6bd|ffffff|ear=flop,curly
Maltais|fffdfb|c5bcc4|ffffff|ear=long,fringe,bow
Samoyède|fffdfa|b5b0bd|ffffff|ear=point,fluff,curlt
Malamute|5f6878|2b313d|ffffff|ear=point,p=husky,big
Rottweiler|2f2b34|121016|c9803f|ear=flop,p=tan,big
Boxer|d59555|3a2a24|fffaf4|ear=flop,p=blaze,flat
Lévrier|c3b5a5|7a6a5a|f0e8de|ear=rose
Basset hound|b5713c|33271f|fffaf2|ear=long,p=blaze,short,saddle
Jack Russell|fffdf8|a5652f|ffffff|ear=semi,p=patch
Berger australien|8f9aad|3a3f4b|ffffff|ear=semi,p=merle,fluff,eye=4fa8e8
Bouvier bernois|2f2b34|121016|ffffff|ear=flop,p=bernese,big
Terre-neuve|36323c|151319|4d4852|ear=flop,fluff,big
Shar-pei|dcb27c|8f6a3a|efd3a8|ear=small,wrinkle
Bobtail|8e96a5|4b5260|fffdfa|ear=flop,p=bi,fringe`);

  S("fox", "Renard", "fox", `
Renard roux|f08a3e|9c4a14|fff6ec||renard-roux
Renard polaire|fafcfe|9db0c4|ffffff|fluff|renard-polaire
Fennec|f3d39c|b5854a|fff8ea|ear=big|renard-fennec
Renard gris|a3a8b3|565c6a|f5efe8||renard-gris
Renard kit|e8c08a|a06a35|fff6e6|ear=big|renard-kit
Renard argenté|4a4c5a|1d1e28|c9ced8|
Renard croisé|b5693a|37241c|f3dcc6|cross
Renard du Tibet|d5a868|7f5a2c|f4ecdf|flat
Renard platine|d9dde5|8892a5|ffffff|
Renard à neuf queues|fffaf3|e0764c|ffffff|nine
Renard des étoiles|5b4bb0|2a2068|c9b8ff|star`);

  S("bear", "Ours", "bear", `
Ours brun|9a6a44|55351c|c99a70|
Ours polaire|fdfcf8|b5bcc9|ffffff|
Ours noir|3f3b45|18161d|a5805c|muz
Panda géant|fffdfa|2e2b36|ffffff|p=panda
Ours malais|3d3433|171211|e8b45a|muz,moon
Ours à collier|36333d|141218|f0e3bd|moon
Ours kermode|f7e9d0|b8966a|fffaf0|
Ours en peluche|d9a566|96652b|f5deb5|teddy
Ours miel|f0bd5c|a5761d|fff0c9|honey
Ours rêveur|b5c4f0|6a7ec0|f0f4ff|star`);

  S("koala", "Koala", "koala", `
Koala gris|a6afbb|5a6473|f3f5f7|
Koala brun|a8937f|5f4c3b|f5ede4|
Koala blanc|f7f5f2|b3adb3|ffffff|
Koala rosé|e8c3cb|a57883|fff2f4|`);
  S("redpanda", "Panda roux", "redpanda", `
Panda roux|c9602f|3a2019|fff3e6|
Panda roux de l'Himalaya|e08a4c|6b3417|fff7ec|
Panda roux de Chine|a8431f|2a1410|fde6d2|`);

  S("bigcat", "Félin sauvage", "bigcat", `
Lion|e8b565|a5692a|fff1d8|mane=9c5a24
Lion blanc|fbf6ea|cbb792|ffffff|mane=e3d3b3
Lionne|e8b97a|9c6a34|fff1db|
Tigre du Bengale|f3973c|33241e|fff8ee|p=tabby
Tigre blanc|fdfcfa|3a3844|ffffff|p=tabby,eye=4fa8e8
Tigre de Sibérie|f0aa5c|40302a|fffaf3|p=tabby,fluff
Léopard|f0bd68|3f2b1a|fff1d8|p=rosette
Léopard des neiges|e3e6ec|4b5160|ffffff|p=rosette,fluff
Panthère noire|34313c|12101a|46424f|p=rosette,eye=f2c230
Guépard|f3cf86|3b2a1c|fffaec|p=spots,tear
Lynx|d5b48c|6f5335|fbf3e6|p=spots,ear=tuft,bob
Lynx boréal|c3c7cf|5c626e|f9fafb|p=spots,ear=tuft,bob
Ocelot|ecc07c|3d2a1a|fff3dd|p=rosette
Serval|eec07a|35261b|fff4e0|p=spots,ear=big
Panthère nébuleuse|d3bd94|5b4a37|f8f0e0|p=rosette`);

  S("mouse", "Souris et rat", "mouse", `
Souris grise|aab0bb|646b79|eceef1|
Souris des moissons|e8a862|9c632a|fff4e4|
Souris sylvestre|c08d5e|6f4a28|fdf3e6|
Souris ballerine|f7dbe3|c58fa2|fff7f9|t=tutu
Souris fromagère|f3dca2|b5904a|fffaea|t=cheese
Rat noir|3b3944|17151d|6d6975|
Rat crème|f6e8cf|b89d73|ffffff|
Rat bleu|96a2b5|515c70|dfe4ec|
Gerboise|e8c99a|9f7b4a|fffaf0|ear=long,tuft
Chinchilla gris|a5abb8|5a6070|f3f4f7|ear=big,bushy
Chinchilla blanc|f8f7f5|b8b3ba|ffffff|ear=big,bushy
Chinchilla violet|b5a8c9|6f6288|f3effa|ear=big,bushy
Loir gris|a9aeb5|5d636d|f8f8f6|mask,bushy
Muscardin|efae5e|a5681f|fff1dc|bushy`);

  S("squirrel", "Écureuil", "squirrel", `
Écureuil noisette|d08b47|7d4818|fff1dd||ecureuil-noisette
Écureuil roux|c25b2c|6f2a10|fff0e2||ecureuil-roux
Écureuil gris|a1a7b3|565d6b|f5f6f7||ecureuil-gris
Écureuil volant|8a8490|4a4552|f7f3ee|fly|ecureuil-volant
Écureuil pygmée|f0c684|a5742f|fff8ea||ecureuil-pygmee
Écureuil noir|3a3640|16141b|57525e|
Tamia rayé|b5743f|33241b|fbeedc|stripe
Écureuil arc-en-ciel|c9502f|4f3fa0|f0a45c|rainbow
Écureuil de Prévost|34303a|141218|c9562e|
Spermophile|d5bb8f|86693f|fdf6e6|short,stripe`);

  S("hedgehog", "Hérisson", "hedgehog", `
Hérisson pomme|f3d3ae|7a4f30|fff3e2|apple|herisson-doux
Hérisson d'Afrique|fff1dc|9a7a5c|fffaf2||herisson-africain
Hérisson d'Europe|e0b98f|54382a|f9e6cf||herisson-europeen
Hérisson albinos|fffaf5|ddd0d0|ffffff|eye=d9577a|herisson-albinos
Hérisson à longues oreilles|f6dfbb|b5864f|fffaf0|ear=big|herisson-oreilles
Hérisson cannelle|fbe0c8|c07f4c|fff5ea|
Hérisson champignon|f8e0c3|8f5a3f|fff6ea|shroom
Hérisson des fleurs|fde6d6|b5789c|fff7f0|flower
Porc-épic|d0ab85|3d302a|f3dcc2|long
Échidné|c99b6c|4a3626|ecd2b0|beak`);

  S("otter", "Loutre", "otter", `
Loutre joueuse|a0744c|553619|f5dfc2||loutre-riviere
Loutre de mer|7d6250|41301f|f0e2d0|shell
Loutre géante|6b4c36|33210f|f3d9a8|
Loutre blanche|f9f5ee|bcae9f|ffffff|
Castor|8f5f3a|4a2d16|dcb287|beaver
Castor doré|c9924f|7d501f|f6dcb3|beaver
Hermine|fffdf8|bdb2a8|ffffff|tip
Belette|c27f48|6f4119|fff6e8|`);

  S("monkey", "Singe", "monkey", `
Ouistiti|b59a7a|5f4a35|f7ead6|tuft
Tamarin lion|f0943c|a3541a|f9cfa0|mane
Tamarin empereur|8d8a8f|44424a|f5efe6|stache
Chimpanzé|3d3438|18131a|e0b48f|
Orang-outan|d06a2c|7d3610|e8b592|fluff
Gorille|4a4854|1f1d26|6b6876|
Lémurien maki|b5b9c2|33313b|ffffff|lemur
Singe-écureuil|f0bd6b|8f6a41|fffaf0|`);

  S("elephant", "Éléphant", "elephant", `
Éléphant gris|a9b2c2|5c667a|cdd4de|
Éléphant d'Asie|9c98a0|55515c|e8b5b5|small
Éléphant rose|f6c3d1|bd7c92|fde3ea|
Éléphant bleu|a9c8ee|5c86ba|d8e8fa|
Mammouth|96603c|4d2c16|c08d62|mam`);

  S("horse", "Cheval", "horse", `
Cheval bai|a5653a|54301a|e8c6a0|mane=2e2320,p=star
Cheval alezan|c97a3c|7d4216|f3d3ab|mane=d99a5a,p=blaze
Cheval blanc|fdfbf8|b5aeb8|ffffff|mane=ece6ea
Pie noir|fdfbf8|332f3a|ffffff|mane=332f3a,p=patch
Haflinger|dba25c|8f5f24|fbe8ca|mane=fff3dc
Frison|2f2b35|110f15|46424d|mane=0f0d14,fluff
Poney Shetland|7a5238|3d2617|b58d6f|mane=e8d3b5,small
Poney Connemara|b5b9c4|666b7a|eef0f3|mane=8f94a3,small
Zèbre|fdfcfa|2d2a35|ffffff|mane=2d2a35,p=zebra
Âne gris|a7a6ab|5c5b63|efece8|mane=4f4d56,ear=long
Licorne|fffaff|b59fd0|ffffff|mane=rainbow,horn
Licorne rose|fde3ef|cc8fb0|fff7fb|mane=f58ab8,horn
Licorne nuit|4b428f|211a50|7d70c4|mane=8fd8ff,horn,p=stars
Pégase|fdfdff|9fb0d0|ffffff|mane=f3cf6b,wings`);

  S("cow", "Vache", "cow", `
Vache Holstein|fffdfa|302d38|ffc9cf|p=cow
Vache Normande|fffaf2|7d4a2c|ffc9cf|p=patchs
Jersiaise|d5a264|8a5c2b|f9e2c3|
Limousine|c9763c|7a3f16|f6d3ae|
Salers|8f3f24|4a1a0e|d0886a|horn
Highland|c97f3f|7d4618|f3d0a0|fringe,horn
Aubrac|d0a06c|6f4c2a|fbe8cf|horn
Bison|6f4a33|33201a|a57c5c|bison,horn
Yak|4a3c3a|1f1716|8a746b|fringe,horn`);

  S("sheep", "Mouton", "sheep", `
Mouton blanc|fffaf2|c0b09c|f6d9c4|
Mouton Suffolk|fffaf2|b5a894|3a3540|
Mouton Valais|fffdf8|bfb2a2|2c2932|horn
Mérinos|f6e7cf|b59d78|f3d0b5|horn
Mouton caramel|d9a56c|8f6231|f9e3c8|
Mouton nuage|dcecfb|8fb0d0|fff8f2|
Mouton jacob|f6f1ea|5a4a42|fff3e6|horn,p=patch
Mouton arc-en-ciel|fff0f6|b59fd0|fde3d3|rainbow`);

  S("pig", "Cochon", "pig", `
Cochon rose|fbc3cd|c97f8f|ffdfe4|
Cochon noir|4a464f|1f1c24|6b6670|
Cochon laineux|efdfc5|a88f68|fff6e6|curly
Cochon de Bayeux|fbd3d0|3d3640|ffe6e3|p=patch
Cochon gascon|57525c|28252d|78727d|
Sanglier|7a5b45|3b2819|b5947a|boar
Marcassin|c9975f|6b4424|f3dab5|boarlet
Phacochère|8f6f5a|47342a|c4a38c|boar
Cochon volant|fcd3dc|cc8a9c|fff0f3|wings`);

  S("deer", "Cervidé", "deer", `
Cerf élaphe|b5734a|5f3820|f8e2c9|antler
Biche|c98d5e|74492a|fdf0de|
Faon|d9a066|80552c|fffaf0|spots
Renne|a58a75|54402f|f6efe6|antler,red
Caribou|8f7a6b|45362c|f3ebe2|antler
Élan|6f523e|33231a|c4a58c|antler=palm,big
Cerf blanc|fdfbf8|b8ac9f|ffffff|antler
Cerf sika|c4713c|6a3717|fff5ea|antler,spots
Antilope|c78f58|6f4620|fff4e4|antler=horn
Cerf étoilé|54509f|262360|b9b5f0|antler=gold,spots`);
  S("llama", "Camélidé", "llama", `
Lama blanc|fff9ef|c0ad90|ffffff|
Lama tacheté|fffaf0|96623a|ffffff|p=patch
Alpaga crème|f6e3c3|b8966a|fffaf0|poof
Alpaga noir|45414b|1c1a21|6d6873|poof
Alpaga rose|f9d0dc|c4849b|fff3f6|poof
Dromadaire|d9b07a|8a6436|f6e3c4|camel
Chameau|b5834f|64431f|e3c297|camel`);

  S("songbird", "Oiseau", "bird", `
Mésange bleue|5fa8e8|2d5ea5|ffe98a|p=tit|oiseau-mesange
Rouge-gorge|a5886a|5f4a34|f7843c|p=robin|oiseau-rouge-gorge
Canari|fde36b|c09a1c|fff5b0||oiseau-canari
Toucan|2f2c38|121018|fff3c4|beak=toucan|oiseau-toucan
Mésange charbonnière|7d9a4a|26262f|f9e05a|p=tit
Pinson|7d93ad|46586f|e8a58a|
Chardonneret|d0a672|3b2f26|fff6e8|p=gold
Merle|35313a|131117|46424c|beak=ffb02e
Martin-pêcheur|2f9fc9|155a80|f7964a|beak=long
Huppe fasciée|f0b582|3b2c28|f9dcc0|crest=hoopoe,beak=long
Geai bleu|5f93e0|274a8f|f5f8fc|crest,p=cap
Cardinal rouge|e0453c|8f1a1c|f47a6b|crest,p=mask
Colibri émeraude|3fc08f|14735a|f3f8ee|beak=long
Roitelet|a9b56a|5c672f|f6f3dc|p=crown
Corbeau|33313d|121019|46434f|
Pic épeiche|2f2c35|121016|fff6ea|p=wood,beak=long
Diamant de Gould|5fbf5a|2a7a3a|b57ae0|p=gould
Lagopède|fdfcfa|a8adb8|ffffff|`);
  S("parrot", "Perroquet", "bird", `
Perroquet arc-en-ciel|3fc06a|1a7a3f|ffd84d|p=rainbow|perroquet-tropical
Ara rouge|ea4a3f|981c22|ffd23f|p=ara
Ara bleu|3f8fe8|1a4d9a|ffd23f|p=ara
Cacatoès blanc|fffdf8|bdb3a8|ffffff|crest=f9d84a
Cacatoès rosalbin|f39ab0|a5697d|fbc3cf|crest=ffe0e6
Calopsitte grise|b5bac4|686f7d|e8eaee|crest=f9e07a,cheek
Perruche verte|8fd94f|467d1c|b9ec85|p=budgie
Perruche jaune|fbe36b|b5941f|fff3b0|p=budgie
Inséparable rosegorge|6fc95c|2f7d2c|f9907a|p=love
Gris du Gabon|a9b0bb|5d6470|d0d5db|tail=e0453c
Amazone|4fb552|1f6b2a|8fd98c|p=love
Kakapo|9cb54a|54681c|d5dd8f|`);
  S("pigeon", "Pigeon", "pigeon", `
Pigeon blanc|fdfdfd|a5adba|ffffff||pigeon-blanc
Pigeon biset|9aa5b8|4d596e|b9c2d0|bars,neck|pigeon-biset
Pigeon paon|fff4e0|b59468|ffffff|fan|pigeon-paon
Pigeon ramier|8691a5|434e63|dbb5bd|collar|pigeon-ramier
Pigeon capucin|c98f62|74492a|fff5ea|hood
Tourterelle turque|e3d0bd|9a8470|f6ece2|ring
Tourterelle des bois|c99a75|6f4f38|f3c9c0|ring
Colombe diamant|c3cad6|6f7a8e|e8edf3|dots
Nicobar|3f8f80|173f4a|6fc0a8|neck`);
  S("owl", "Chouette et hibou", "owl", `
Chouette mignonne|b07f52|5f3f22|fff3df||chouette-neige
Chouette effraie|f3d9a8|a87c45|fffaf2|heart|chouette-effraie
Harfang des neiges|fdfdfd|8f99a8|ffffff|snow|chouette-harfang
Chouette pygmée|c98f55|74481f|fff0da||chouette-pygmee
Hulotte|7d5f48|3d2b1e|f0dfc8|darkeye|chouette-hulotte
Grand-duc|b5844a|4a3019|f6dfb8|horn
Petit-duc|a3948a|544a44|efe8e0|horn
Hibou moyen-duc|cf9c5c|6b4520|fbe9cc|horn
Chouette chevêche|a88f72|5a4732|fbf3e6|
Chouette lilas|c9b5ec|7a62ad|f8f3ff|
Chouette de minuit|4a4f8f|20244f|b9bdf0|horn`);
  S("duck", "Canard et oie", "duck", `
Canard colvert|3f9a68|1b5a3a|c9b39a|p=mallard
Cane colverte|b58f63|644a2c|efdcc0|p=tick
Caneton jaune|fde06b|c09a24|fff3b0|
Canard mandarin|d97a3c|3f4a9a|fff6e8|p=mandarin
Canard carolin|2f7d62|14382e|b5643f|p=mallard
Bernache|7a6d60|25222a|fff9f0|neck,p=cap
Cygne blanc|ffffff|a9b0bf|ffffff|neck,swan
Cygne noir|3a3743|15131a|55515f|neck,swan
Sarcelle|9a6a3f|2c7a6b|e8dccb|p=mallard
Canard de bain|ffd83d|b58f0f|ffec8f|bath`);
  S("chicken", "Poule", "chicken", `
Poule rousse|d07f42|7d4418|f3c490|
Poule noire|3b3742|17151c|57525e|
Poule Sussex|fffbf4|33303b|ffffff|p=collar
Poule soie|fffdfa|bfb5bf|ffffff|puff
Poule Padoue|f3d9a0|7d5a2a|fff4da|puff
Poule Marans|5a4034|271a14|c0703c|p=collar
Coq doré|e09a3c|1f6b5a|f9d074|rooster
Coq de Bresse|fffdf8|3f5f8f|ffffff|rooster
Poussin|fde47a|c4a02e|fff6c4|chick
Caille|b08a62|5f4730|f0e0c8|quail
Dindon|7a5040|3a231b|b58670|turkey
Paon|2f7fc9|144a80|5fb5e8|peacock
Paon blanc|fdfdff|a5b0c5|ffffff|peacock`);
  S("penguin", "Manchot", "penguin", `
Pingouin banquise|3f4658|1a1e2b|ffffff||pingouin-glace
Manchot empereur|2f3342|13151e|fffaf0|emperor
Manchot royal|4a5268|20242f|fffdf6|emperor
Manchot papou|343846|14161d|ffffff|band
Gorfou sauteur|30333f|12141a|ffffff|crest
Manchot pygmée|5f85b5|2c4f80|ffffff|
Manchot du Cap|3b3842|17151b|ffffff|chest
Macareux|2f2f3b|121218|ffffff|puffin
Pingouin rose|f3a3bd|b0617f|fff5f8|`);

  S("snake", "Serpent", "snake", `
Serpent caramel|e8a55c|8a4e1c|fff0d8|p=saddle|serpent-caramel
Serpent menthe|7fdcb3|2a8562|e8fff4||serpent-menthe
Python royal|caa05c|3d2819|f9e8c6|p=ball|serpent-python
Cobra|b5b56a|5a5f2a|f3f0c4|hood|serpent-cobra
Vipère|a5a8ae|3f424b|e8e9eb|p=zig|serpent-vipere
Serpent corail|e8503f|241f24|ffe07a|p=band|serpent-corail
Python vert|6cc95a|2c7a2a|e3f9c4|p=dots
Boa arc-en-ciel|b8582f|5f2412|f3c08a|p=dots,irid
Serpent des blés|f0843f|b03a1c|fff3e0|p=saddle
Anaconda|8a8f4a|2f3018|f0e3a0|p=dots
Crotale|c9ab80|634a2f|f3e6cf|p=ball,rattle
Serpent bleu|5fb5ec|1f5f9c|e0f3ff|
Serpent galaxie|4f429f|231a5c|b5a5f0|p=dots,irid`);
  S("turtle", "Tortue", "turtle", `
Tortue feuille|7cc96b|35803a|d5e88a||tortue-jardin
Tortue boîte|d9a04c|6a3f1c|efd08a|p=rays|tortue-boite
Tortue alligator|7d8578|3a4238|b5b89a|spike|tortue-alligator
Tortue de mer|5fbfc9|1f6b7a|bfe6d0|sea|tortue-mer
Tortue peinte|4a6b4a|c9402f|9ab55a|p=paint|tortue-peinte
Tortue d'Hermann|e8c45c|4f3a1c|c9b86a|p=hermann
Tortue étoilée|3d342c|f3d56b|c9b58a|p=star
Tortue luth|4f6078|222f44|8fa0b8|sea
Tortue imbriquée|c9823f|6a3514|e0d39a|sea,p=rays
Tortue à nez de cochon|9aa89a|566256|d9d9c9|sea
Tortue arc-en-ciel|b18cf2|5a3f9a|bfe6a8|p=rainbow`);
  S("crocodile", "Crocodile", "crocodile", `
Crocodile vert|7fcf7a|357a3c|e8f6c4||crocodile-vert
Crocodile du Nil|9aa58a|4d5840|eeecd0||crocodile-nil
Caïman|8f7350|473520|efdfba||caiman
Alligator|5f7068|2a3831|d3dcc4||alligator
Crocodile albinos|fdf6ea|cdb59c|ffffff|eye=d9577a
Caïman nain|7d6a5a|3b2f26|e0cfb5|
Alligator bleu|7fa8d0|385f8a|e8f3fb|`);

  S("axolotl", "Axolotl", "axolotl", `
Axolotl rose|fbc0d5|d9578c|fff0f5||axolotl-rose
Axolotl blanc|fffafa|f07f9c|ffffff|
Axolotl sauvage|7d7a5a|3f3c2a|b5b08a|tick
Axolotl noir|3d3a47|6a4f7d|5d5868|
Axolotl lilas|d5c0f5|8f62c9|f6f0ff|
Axolotl cuivre|d9a07a|9c4f3a|f6dcc9|tick
Axolotl menthe|b5ecd3|3f9a7a|effff8|`);
  S("frog", "Grenouille", "frog", `
Grenouille verte|7fcf5c|357a2c|eaf7c0|
Rainette|a3e04f|4f8a1c|f6ffd5|red
Dendrobate dorée|fbd23f|b58a14|fff0a0|
Dendrobate fraise|ec4f4f|2a3f80|f79a8a|
Grenouille de verre|bfeab0|6fa868|effce8|glass
Grenouille-taureau|7d8a4a|3f471f|e3e0a8|
Crapaud commun|a88a62|5c4528|eee0c3|wart
Crapaud d'or|f7a93c|b06a14|ffdd9a|
Rainette aux yeux rouges|5fd05c|2f6fd0|fff3c9|red
Grenouille lilas|cbaef0|7a55b5|f6eeff|`);

  S("fish", "Poisson", "fish", `
Poisson doré en bocal|fb9d3f|c05a14|ffdc9f|bowl|poisson-bulle
Poisson combattant|9a6ae8|5230a5|d3b8fa|betta|poisson-combat
Poisson clown|f9843c|2f2a30|ffffff|p=clown|poisson-clown
Poisson ange|fbe36b|3f3a44|fff8c9|angel,p=band|poisson-ange
Guppy|5fd0e8|e06ab5|d5f6fb|fan|poisson-guppy
Combattant rouge|ea4f4f|951c30|fbb0a5|betta
Combattant blanc|fdf7f9|b59fb8|ffffff|betta
Koï rouge et blanche|fffdfa|ec5a3c|ffffff|p=koi
Chirurgien bleu|3f7fe8|1a1f3a|5f9ff5|p=tang
Chirurgien jaune|fde04a|c0951a|fff2a0|
Néon|5fc9f0|e84f5c|d5f0fa|p=neon,slim
Poisson-globe|f3d88a|9a7a35|fffbee|puff
Poisson-lion|d9624a|fdf0e3|f3a890|lion,p=band
Mandarin|3f8fe8|f08a3c|7fb8f5|p=zig
Hippocampe jaune|fbd84f|b5901a|fff0a8|sea
Hippocampe rose|f9a5c0|b85a80|fdd5e0|sea
Hippocampe bleu|7fb8f0|35709f|cbe4fa|sea
Requin gris|8fa0b8|48586f|eef2f7|shark
Requin-baleine|5f85a8|2a4a6a|e3eef6|shark,p=dots
Raie manta|566078|262d3f|e8ecf3|ray`);
  S("sea", "Mer", "sea", `
Baleine bleue|6fa8d9|2f6298|e0eff9|whale
Baleine à bosse|5f6f8a|2c384f|dfe5ee|whale
Narval|9fb5cc|54708f|eff4f9|whale,horn
Orque|2f2f3b|111118|ffffff|whale,orca
Dauphin|8fb5d9|46749c|eef6fc|whale,beak
Dauphin rose|f6b5c9|b86d88|fde6ed|whale,beak
Phoque blanc|fdfdfb|b3bac5|ffffff|seal
Morse|a87a62|5f3f2e|d9b5a0|seal,tusk
Lamantin|a5adb5|5e6770|cdd3d8|seal,mana
Pieuvre violette|b58aea|6a42a5|dcc5f8|octo
Pieuvre bleue|6fa8f0|2f62a8|c5dffb|octo
Pieuvre dumbo|f9b5a0|b86a58|fde0d5|octo,ear
Méduse rose|fbb5d5|c9689c|fde6f1|jelly
Méduse lune|e3dcf9|8f80c4|f9f7ff|jelly
Crabe rouge|ec5a4a|9c2420|f99a88|crab
Bernard-l'ermite|f08a5c|a0472a|fbd5a8|crab,shell
Étoile de mer|fba05c|c05a1a|ffd3a5|star
Oursin violet|7a5bb5|3c2670|b59ae0|urchin`);

  S("butterfly", "Papillon", "butterfly", `
Papillon monarque|f59a3c|2b2220|ffd08a|
Papillon morpho|4fa8f5|14306b|a5daff|
Machaon|fbe07a|2f2a30|7fb0f0|tail
Paon du jour|d9583c|3a2420|f3cf6b|eye
Vulcain|33282a|ec5a3c|fff0e0|
Azuré|9fb5f5|4f5fa8|dde6ff|
Papillon émeraude|4fc99a|14584a|b5f0d5|tail
Papillon lune|c9f0c0|6f9a70|f3ffe8|tail
Papillon arc-en-ciel|b18cf2|4a2f8a|ffd98a|rainbow
Sphinx rose|f5a5b5|a8a04a|fbe0b5|fur`);

  S("bat", "Chauve-souris", "bat", `
Chauve-souris brune|8a6a52|3f2c20|d9bda5|
Chauve-souris blanche|fdfaf5|d9a56a|ffffff|
Renard volant|c97f42|2f2622|f0c08a|
Chauve-souris violette|9a7ad0|4a3585|dccbf5|
Chauve-souris lutin|565060|231f2a|a59fb0|`);
  S("dino", "Dinosaure", "dino", `
Tyrannosaure|8fc46a|46792f|eaf3c4|rex
Tricératops|e0a868|8a5a28|fbe8c9|tri
Stégosaure|7fb5d9|35688f|e3f0f9|steg
Diplodocus|9fd3a5|46865a|eef9e8|long
Vélociraptor|e88a5c|983f1c|fde0c9|rex,feather
Parasaure|f3b5c0|a85f72|fde8ec|para
Ptérodactyle|b5a5e8|5f4fa8|ece6fb|ptero
Spinosaure|6fc0b5|2a736b|dff6f1|rex,sail
Brachiosaure|c9a5e0|7a519a|f5eafb|long
Plésiosaure|5fa0d0|275c86|d9edf9|long,fin`);
  S("dragon", "Créature magique", "dragon", `
Dragon rouge|ea5a4a|951f24|ffd8a5|
Dragon bleu|5f9ff0|2453a0|dcecff|
Dragon d'or|fbcf4f|b07f14|fff6d5|
Dragon blanc|fdfcff|a5aecb|ffffff|
Dragon des glaces|b5e5fa|4a97c4|f3fcff|crystal
Dragon de lave|5a3a3a|f2702c|f9b04a|lava
Phénix|f9843c|b5301a|ffdd6b|phoenix
Phénix bleu|5fa5f9|2a4fb0|b5f0ff|phoenix
Griffon|d9a862|7d5426|fff8ee|griffin
Yéti|e8f3fb|8fa8c4|ffffff|yeti
Esprit de la forêt|b5dba0|4f8a54|f6fbe6|spirit
Fantôme chat|f3f0ff|a89fd6|ffffff|ghost`);
  S("platypus", "Ornithorynque", "platypus", `
Ornithorynque brun|a0663a|57331a|f0d5b5||ornithorynque-brun
Ornithorynque roux|c9803f|7d481c|fbe6cb||ornithorynque-roux
Ornithorynque noir|4a4753|1f1c26|9a96a8||ornithorynque-noir
Ornithorynque blanc|fbf9f5|b8b0b0|ffffff||ornithorynque-blanc`);
  return out;
})();
