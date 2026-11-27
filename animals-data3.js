"use strict";
// ============================================================================
//  ENCORE DES ANIMAUX : 11 espèces nouvelles, puis de nombreuses variétés.
// ============================================================================
(function () {
  const { G, S } = window.ANIMALS_GEN;
  // ======================== ESPÈCES NOUVELLES ========================
  G("wolf", "Loup", "wolf", 60, `
gr:gris|8e95a3|474d5b|f1f3f6
bl:blanc|fafbfd|a3afc0|ffffff
no:noir|3a3844|15131b|6d6977
ro:roux|c0794a|6b3a1c|f6e3d0
br:brun|8a674a|4a3220|e8d5c0
sa:sable|d9bd92|8f7148|fbf3e4
ar:argenté|c3c9d3|6f7888|f8f9fb
bu:bleu nuit|4a5a8f|222c52|a9b5dc
li:lilas|c3b0e0|735ca0|f3edfb
do:doré|e8b45c|96661c|fff2d5`, `
Loup||*
Loup à crinière|ear=big|ro no sa do gr
Louveteau|short|gr bl no br sa
Loup des neiges|fluff|bl ar bu li
Chacal|ear=big,short|do sa ro
Dingo|curlt|ro sa bl
Loup-garou|fluff,star|no bu li
Coyote|thin|gr sa br`);
  G("raccoon", "Raton laveur", "raccoon", 40, `
gr:gris|9aa0ac|3b3e49|f5f5f3
bl:blond|e0c69c|8a6a44|fffaf0
br:brun|8f6a4c|38241a|f3e3d0
no:noir|4a4854|17151d|d5d2da
ro:roux|c9743c|5f2f14|fdebd9
bc:blanc|fbf9f6|9a9096|ffffff
li:lilas|b5a5d3|594a85|f6f2fb`, `
Raton laveur||*
Blaireau|badger|gr br no bc
Mouffette|skunk|no br gr li
Tanuki|fluff|br gr bl ro
Coati|long|ro br no bl
Raton nain|short|gr bl li`);
  G("goat", "Chèvre", "goat", 40, `
bl:blanche|fffdf9|b9aeb0|ffffff
no:noire|3f3c48|19171f|8d8a95
ro:rousse|c9703a|6f3616|f6d5b8
gr:grise|a5a5ad|57575f|f1f0ee
br:brune|8a5f40|4a2f1c|e8d0b8
pi:pie|fffaf4|3a3440|ffffff|p=cow
to:tachetée|fffaf4|a8552c|ffffff|p=patchs
hd:à tête brune|fffaf4|8f4a26|ffffff|p=hood`, `
Chèvre||*
Chevreau|short|bl no ro pi br
Bouquetin|big|gr br ro no
Chèvre angora|curly|bl no gr ro
Chèvre naine|small|to hd bl pi`);
  G("giraffe", "Girafe", "giraffe", 22, `
do:dorée|f9d98c|a8652a|fff4d8
or:orangée|f3b55c|7d3f14|fff0cf
bl:blanche|fdf8ec|cdb894|ffffff
br:brune|c9945c|5f3414|f6e3c5
rs:rose|f9c5d0|b86a80|fff0f3
bu:bleue|b5d0f5|4f76b0|eff6ff
li:lilas|d5c5f5|7a5fb5|f6f0ff
me:menthe|bfeccf|4f9a72|f0fff5`, `
Girafe||*
Girafon|short|do or br rs
Okapi|okapi|br do li
Girafe étoilée|star|bu li rs`);
  G("hippo", "Géant doux", "hippo", 34, `
gr:gris|a5a8b5|5d616c|d3d6dd
ro:rosé|d9adb5|8a5a66|f3d5da
br:brun|9a7560|54382a|d3b5a0
bu:bleu|9fb8e0|4f6a9c|dbe6f9
li:lilas|bfaede|6b5399|ebe2f9
no:noir|4f4c58|211f28|8d8a96
me:menthe|a5dcc3|4a8a6c|dff5ea`, `
Hippopotame||*
Rhinocéros|horn|gr no bu li br
Capybara|capy|br gr ro me
Tapir|tapir|no br li
Hippopotame nain|short|ro bu me`);
  G("roo", "Kangourou", "roo", 24, `
ro:roux|c9825a|74432a|f8e2cf
gr:gris|a5a3a5|5c5a60|efedec
br:brun|97714f|543a24|eddac5
bl:blanc|fdf9f6|c5b5b5|ffffff
do:doré|e8bd76|93662a|fff3dd
bu:bleuté|9fb2d3|4f6288|eaf1fa`, `
Kangourou||*
Wallaby|short|ro gr do bu
Quokka|smile|br do gr bl
Kangourou boxeur|box|ro gr br`);
  G("sloth", "Paresseux", "sloth", 18, `
br:brun|b5926c|63492f|f5e6cf
do:doré|e0bd85|96713a|fff3dc
gr:gris|a7a59f|5d5b57|f2efe8
mo:mousse|b0b58a|62693f|f3f2dc
rs:rosé|e3b5b5|915a5c|fbe9e6
li:lilas|bfb0d9|6b5893|f3edfb`, `
Paresseux||*
Paresseux fleuri|flower|br gr li mo
Paresseux nain|short|do rs br`);
  G("raptor", "Rapace", "bird", 40, `
br:royal|8a5c38|48290f|d0a06c
no:noir|3a3743|15131b|6b6874
gr:gris|7d88a0|3a4356|f0f2f6
ro:roux|b0562f|5c2614|f0d0b5
bl:blanc|fbfaf8|a5a3ad|ffffff
do:doré|d9a04c|80531a|fdedcf
bu:bleu|5f85c9|294a86|e8f0fb`, `
Aigle||*
Pygargue|bald|br no gr ro
Faucon|falcon|gr br ro bu no
Buse|small|br do bl ro
Vautour|vulture|br no gr
Condor|vulture,big|no bl
Milan|long|ro do br`);
  G("wader", "Échassier", "bird", 40, `
rs:rose|f98fae|c0527a|fcc0d0
co:corail|f7755f|b03f34|fba898
bl:blanc|fffdfb|a5aab8|ffffff
no:noir|3c3843|17151b|6d6a76
gr:gris|a5afbf|566175|f3f5f8
bu:bleu|7fa8e0|35609c|e0edfb
li:lilas|c9aef0|7853ad|f3ebfd
ja:jaune|fbe07a|b0901f|fff8d5`, `
Flamant|flam|rs co bl li ja bu
Cigogne|stork|bl no gr rs
Héron|heron|gr bl no bu
Grue couronnée|crown|gr no bl li
Ibis|ibis|co bl no ja
Autruche|ostrich|no gr br`.replace("no gr br", "no gr bl"));
  G("lizard", "Lézard", "lizard", 54, `
ve:vert|7fd05c|357a2a|e3f7b5
tu:turquoise|5fcbc4|1f7a75|dcf7f4
or:orange|f9a04c|a8560f|ffe8c5
ja:jaune|f9d94f|a8861a|fff6c9
ro:rouge|e8604f|8f2219|ffd9cc
bu:bleu|6fa5ec|2a5aa5|deecfd
vi:violet|b08ae8|5a3a9c|eee4fc
br:brun|b08a62|5f4426|f3e3cc
rs:rose|f9a5bd|b0567a|ffe6ee`, `
Caméléon|cham|*
Gecko|p=spots|*
Iguane|crest|ve bu br or tu
Dragon barbu|beard|br ja or ro
Lézard à collerette|frill|br ve rs vi
Salamandre|axo|ja ro no`.replace("ja ro no", "ja ro bu vi"));
  G("insect", "Petite bête", "insect", 50, `
ja:jaune|fbcf4a|3a2a1c|fff3c4
ro:rouge|ea4a3f|2b2226|ffc5b5
rs:rose|f78fb5|4a2a3c|fdd9e6
bu:bleu|6fa8f0|1f2f5a|dceafd
ve:vert|8fd65c|2a4a1c|e5f8d0
vi:violet|b08ae8|33206b|ebe0fc
or:orange|f99c4a|4a2a10|ffe5c5
tu:turquoise|5fd0c5|144f4a|dcf8f5`, `
Abeille|bee|ja or rs vi
Coccinelle|lady|ro ja rs or bu
Escargot|snail|or rs bu ve vi tu
Scarabée|beetle|ve bu vi tu ro ja
Libellule|fly|bu ro ve vi tu
Chenille|cater|ve rs ja tu or
Luciole|bee,glow|vi bu tu
Araignée|spider|vi ro bu or`);

  // ======================== BEAUCOUP PLUS DE VARIÉTÉS ========================
  const PELAGES = `
cr:crème|fbe8c6|c19c66|ffffff
ca:caramel|dba15f|8f5a24|fff2dd
no:noir|3d3945|18161d|6b6674
gr:gris|a9afba|5f6573|f3f4f7
bu:bleu|96a8c9|51648a|eef2fa
ch:chocolat|7d553a|42291a|ead8c8
ab:abricot|f7b57a|b5702f|fff1e0
bl:blanc|fdfcfa|b5aeb5|ffffff
rs:rosé|f9cfd8|c08593|fff5f7
li:lilas|d5c8ec|7f6ab0|f8f4ff
ro:roux|d9813f|8f4717|f8dcc0
is:isabelle|e3cfae|94764a|fbf4e6
me:menthe|c5ecd9|5fa585|f3fff8
cn:cannelle|c98a58|74451f|f6e0ca`;
  G("hamster", "Hamster", "hamster", 110, PELAGES, `
Hamster bille||*
Hamster rayé|p=stripe|*
Hamster sourcil|p=brow|*
Hamster pie|p=patch|ca no gr ch ro bu cn
Hamster docteur|t=doc|no bl rs me
Hamster chevalier|t=knight|ca ch ro
Hamster reine|t=king|rs li bl
Hamster viking roux|t=viking|ro no gr
Hamster licorne|t=unicorn|rs me bu
Hamster apiculteur|t=bee|ca cr ab
Hamster ninja|t=ninja|ca bl ro
Hamster citron vert|t=lemon|me cr`);
  G("guinea", "Cochon d'Inde", "guinea", 80, PELAGES, `
Cochon d'Inde lisse||*
Cochon d'Inde frisé|rosette|*
Cochon d'Inde à couronne|crown|*
Cochon d'Inde point|p=point|cr bl is rs li
Cochon d'Inde agouti|p=tick|ca gr ro is cn
Cochon d'Inde trois couleurs|p=tri|bl cr is`);
  G("mouse", "Souris et rat", "mouse", 100, PELAGES, `
Souris||*
Rat à grandes oreilles|ear=big|*
Gerbille du désert|tuft|*
Chinchilla doux|ear=big,bushy|*
Loir|bushy,mask|gr ca ro is bu
Gerboise|ear=long,tuft|cr ca ro is rs
Souris danseuse|t=tutu|bl no li me
Souris gourmande|t=cheese|gr no ca bl`);
  G("ferret", "Furet", "ferret", 60, PELAGES, `
Furet pointé|mask|*
Furet à étoile|blaze|*
Furet rieur|play|ro is li bu cn rs
Furet endormi|sleep|cr ro is li bu cn`);
  G("squirrel", "Écureuil", "squirrel", 60, PELAGES, `
Écureuil des bois||*
Tamia des bois|stripe|*
Polatouche|fly|cr ca gr ro rs li
Marmotte des prés|short|ca gr cn is ch`);
  G("fox", "Renard", "fox", 60, PELAGES, `
Renard des bois||*
Fennec du soir|ear=big|*
Renard à croix|cross|ca ab ro cn li
Renard céleste|star|bu li no me
Renard aux neuf queues|nine|rs li me no ca`);
  G("bear", "Ours", "bear", 60, PELAGES, `
Ours des bois||*
Ours en chocolat|teddy|*
Ours apiculteur|honey|*
Ours rêveur|star|li rs me no
Panda|p=panda,big|rs li bu`);
  G("bigcat", "Félin sauvage", "bigcat", 80, PELAGES, `
Puma des monts||*
Léopard des bois|p=rosette|ca gr cr bl ro rs li cn
Tigre des bois|p=tabby|ca gr cr bl ro rs li bu
Guépard|p=spots,tear|cr ca bl is rs
Lynx des bois|p=spots,ear=tuft,bob|ca gr bl ro cn
Lion|mane=7a4a24|cr ca bl is cn
Lion de nuit|mane=2f2a3f|gr bu li is
Caracal|ear=tuft|ca ab is cn`);
  G("horse", "Cheval", "horse", 110, `
ba:bai|a5653a|54301a|e8c6a0|mane=2e2320
al:alezan|c97a3c|7d4216|f3d3ab|mane=d99a5a
no:noir|38343e|141218|5a5561|mane=17151c
gr:gris|c9ccd5|7d828f|eef0f3|mane=8f94a3
pa:palomino|efc478|a5752c|fff3da|mane=fff7ea
is:isabelle|e3cfae|94764a|fbf4e6|mane=3a2a20
cr:crème|fbeed3|bfa06a|ffffff|mane=fffaf0
ch:chocolat|6f4a36|38241a|a5785a|mane=f0dcb5
bu:bleu|9fb5d9|566f9c|e8effa|mane=4a5f9c
li:lilas|d9c5f3|8a6fb8|f8f2ff|mane=b58af0
me:menthe|c5ecd9|5fa585|f3fff8|mane=5fc4a0
rs:rose|fbd5e0|c07f97|fff5f8|mane=f58ab8
ru:rouan|b5a0a3|6b585c|e3d8d8|mane=3a2f35`, `
Cheval à étoile|p=star|*
Cheval à liste|p=blaze|ba al no ch is bu
Cheval tacheté|p=spots|gr cr pa is
Frison|fluff|ch gr bu li is
Poney|small|ba al gr is ch rs
Âne|ear=long|ba gr cr ch is
Licorne|horn|rs ru gr cr ch ba
Licorne étoilée|horn,p=stars|no bu li ch
Pégase|wings|rs me pa gr no ba
Alicorne|horn,wings|li rs me bu cr no`);
  G("cow", "Vache", "cow", 50, PELAGES, `
Vache des prés||*
Vache à cornes|horn|ca gr ch ro is cn
Vache poilue|fringe,horn|cr ca gr ab ch
Vache mouchetée|p=spots|bl cr is
Veau|short|ca no bl ro is`);
  G("sheep", "Mouton", "sheep", 46, PELAGES, `
Mouton||*
Bélier|horn|cr ca ch li rs me cn
Agneau|short|bl rs li me bu`);
  G("pig", "Cochon", "pig", 44, PELAGES, `
Cochon||*
Cochon frisé|curly|cr ca ab rs li
Cochon à tache|p=patch|rs bl cr is
Sanglier|boar|gr ch ro no
Cochon ailé|wings|rs li me bu`);
  G("deer", "Cervidé", "deer", 50, PELAGES, `
Faon|spots|*
Cerf|antler|ca gr ch cr li cn
Daim|antler=palm|ca is ch ro
Renne|antler,red|gr ch bl cn
Gazelle|antler=horn|ca is ab cr
Cerf doré|antler=gold,spots|bu li me rs`);
  G("llama", "Camélidé", "llama", 40, PELAGES, `
Lama||*
Alpaga|poof|*
Lama pie|p=patch|bl cr is`);
  G("monkey", "Singe", "monkey", 46, PELAGES, `
Singe||*
Tamarin|mane|ca ab ro gr li
Ouistiti|tuft|ca gr ch cr
Lémurien|lemur|ca bu li ch
Moustac|stache|gr ro no`);
  G("otter", "Loutre", "otter", 40, PELAGES, `
Loutre de rivière||*
Castor|beaver|ca ch gr ro cr
Hermine|tip|cr ca gr rs
Loutre au coquillage|shell|ca ch cr rs li`);
  G("elephant", "Éléphant", "elephant", 24, PELAGES, `
Éléphant||*
Éléphanteau|small|rs li me bu cr`);
  G("koala", "Koala", "koala", 18, PELAGES, `
Koala||*`);
  G("redpanda", "Panda roux", "redpanda", 14, PELAGES, `
Panda||ca ab cn cr gr rs li ch`);
  G("bat", "Chauve-souris", "bat", 32, PELAGES, `
Chauve-souris||*
Oreillard|ear=big|ca ch cr li ro cn`);
  G("hedgehog", "Hérisson", "hedgehog", 46, PELAGES, `
Hérisson||*
Hérisson gourmand|apple|cr ca bl ab
Hérisson des bois|shroom|ca ch cr rs
Hérisson fleuri|flower|bl cr me ab
Porc-épic|long|ca gr cr`);
  const VIFS = `
ro:rouge|e8564a|8f1f1c|ffd5cb
or:orange|f9983c|a8560f|ffe2bd
ja:jaune|fbd84f|a8861a|fff5c5
ve:vert|7fd06a|2a7a2a|e8f9d8
tu:turquoise|4fd0c9|157a75|d5f7f5
bu:bleu|5f9ff0|1f4f9c|d9eaff
vi:violet|a87ae8|4a2a94|eadcff
rs:rose|f99fc0|b0507c|ffe6ef
no:noir|3d3b46|8f7fd9|6b6875
bl:blanc|fdfaf8|a5a0b5|ffffff
do:doré|f0c44c|94681a|fff0c0
ci:ciel|a5d5f9|4a86c0|eef8ff
me:menthe|a5e5c5|3f8f68|eefcf4
br:brun|a87a52|5a3a20|f0dcc5`;
  G("fish", "Poisson", "fish", 150, VIFS, `
Poisson voile|betta|*
Poisson éventail|fan|*
Poisson des récifs|p=scale|*
Koï|p=koi|*
Scalaire|angel|*
Poisson zébré|p=zig|*
Néon|p=neon,slim|*
Hippocampe|sea|ro tu bu do ci me no
Poisson-globe|puff|or ve vi ja
Poisson-lion|lion,p=band|ro or vi bu
Requin|shark|ci rs vi br
Raie|ray|bu vi rs tu
Poisson-lune|moon|ci rs ja
Baudroie|lamp|vi no bu`);
  G("snake", "Serpent", "snake", 110, VIFS, `
Serpent||*
Python|p=ball|*
Serpent annelé|p=band|*
Couleuvre|p=dots|*
Serpent taché|p=saddle|*
Vipère|p=zig|ro or ja vi rs do
Cobra|hood|ro or ve vi rs do
Serpent irisé|p=dots,irid|bu vi tu no
Crotale|p=ball,rattle|br do or`);
  G("butterfly", "Papillon", "butterfly", 80, VIFS, `
Papillon||*
Machaon|tail|*
Paon|eye|*
Papillon velours|fur|*`);
  G("frog", "Grenouille", "frog", 60, VIFS, `
Grenouille||*
Dendrobate|p=spots|*
Rainette|red|or ja bu vi rs me
Crapaud|wart|br do ve or
Grenouille de verre|glass|me ci rs`);
  G("turtle", "Tortue", "turtle", 60, VIFS, `
Tortue||*
Tortue marine|sea|*
Tortue rayonnée|p=rays|or ve bu vi rs br
Tortue étoilée|p=star|no br bu vi
Tortue à piques|spike|ve br no`);
  G("axolotl", "Axolotl", "axolotl", 40, VIFS, `
Axolotl||*
Axolotl moucheté|tick|*`);
  G("crocodile", "Crocodile", "crocodile", 30, VIFS, `
Crocodile||*
Gavial|thin|ve tu br ja bu`);
  G("dino", "Dinosaure", "dino", 90, VIFS, `
T-rex|rex|*
Tricératops|tri|*
Stégosaure|steg|ro ve tu bu vi rs
Diplodocus|long|ro ja ve tu vi ci
Ptérodactyle|ptero|ro or ja ve bu vi
Parasaure|para|or ja ve vi me
Spinosaure|rex,sail|ro or bu vi
Ankylosaure|steg,ank|br or ve
Plésiosaure|long,fin|tu vi me rs
Raptor|rex,feather|ro ve bu vi`);
  G("dragon", "Créature magique", "dragon", 80, VIFS, `
Dragon||*
Dragon de cristal|crystal|*
Phénix|phoenix|*
Griffon|griffin|ro ve bu br
Esprit des bois|spirit|*
Fantôme|ghost|ja ve bu me ci
Yéti|yeti|ci rs me
Dragon de lave|lava|no br ro`);
  G("sea", "Mer", "sea", 100, VIFS, `
Pieuvre|octo|*
Pieuvre dumbo|octo,ear|*
Méduse|jelly|*
Étoile de mer|star|*
Crabe|crab|or ja tu rs no
Bernard-l'ermite|crab,shell|ro or bu
Baleine|whale|tu vi ci me
Dauphin|whale,beak|bu tu vi
Narval|whale,horn|rs tu vi
Phoque|seal|ci rs br bl
Calamar|octo,squid|ro or vi rs`);
  G("songbird", "Oiseau", "bird", 150, VIFS, `
Oiseau des jardins||*
Mésange|p=tit|*
Oiseau à plastron|p=robin|*
Oiseau huppé|crest|*
Colibri|beak=long|*
Toucan|beak=toucan|or ja ve tu bu vi rs bl
Oiseau calotte|p=cap|ro or ja ve tu bu vi`);
  G("parrot", "Perroquet", "bird", 100, VIFS, `
Perruche|p=budgie|*
Inséparable|p=love|*
Cacatoès|crest=f9d84a|*
Ara|p=ara|*
Calopsitte|crest=f9903c,cheek|*`);
  G("owl", "Chouette et hibou", "owl", 50, VIFS, `
Chouette||*
Hibou|horn|*`);
  G("penguin", "Manchot", "penguin", 40, VIFS, `
Manchot||*
Gorfou|crest|ro bu vi no ci`);
  G("pigeon", "Pigeon", "pigeon", 50, PELAGES, `
Pigeon||*
Pigeon paon|fan|*
Pigeon capucin|hood|ca gr ch li rs`);
  G("duck", "Canard et oie", "duck", 50, VIFS, `
Caneton|p=tick|*
Canard de bain|bath|ro or ve tu vi me`);
  G("chicken", "Poule", "chicken", 60, PELAGES, `
Poule||*
Poule houppée|puff|*
Poussin|chick|*`);

  // ======================== 100 ANIMAUX DE PLUS (12 espèces nouvelles) ========================
  const NEUFS = `
sa:sable|e3c193|7d5a34|fff4e0
ca:caramel|d9985a|7a4418|fde8d0
gr:gris|a5a8b3|474b58|f1f2f5
no:noir|46424f|1a1720|b5b0bd
br:brun|8f6848|452c19|ecd6bf
ro:roux|cf7a42|6f3413|fbe0c9
bl:blanc|fbf8f4|9a8f95|ffffff
rs:rosé|f5c3ca|a0606f|fff1f2
li:lilas|cfc0ec|6a52a0|f7f2ff
me:menthe|bfe8d2|41886a|f3fff8
bu:bleu|9db6de|3d5890|edf3fc
do:doré|eec468|8f651c|fff3d5`;
  G("meerkat", "Suricate", "meerkat", 10, NEUFS, `
Suricate||sa ca gr ro br no bl li rs me`);
  G("armadillo", "Tatou et pangolin", "armadillo", 20, NEUFS, `
Tatou||sa gr br rs li me bu do no ca
Pangolin|scale|br ca gr sa no do li bu rs me`);
  G("anteater", "Fourmilier", "anteater", 10, NEUFS, `
Fourmilier||gr br ca no sa bl li ro bu do`);
  G("opossum", "Marsupial", "opossum", 22, NEUFS, `
Opossum||gr no br sa li rs bu ro
Diable de Tasmanie|devil|no br gr ro li bu`);
  G("wombat", "Marsupial", "wombat", 22, NEUFS, `
Wombat||br gr sa ca no rs li bl`);
  G("hyena", "Hyène", "hyena", 8, NEUFS, `
Hyène tachetée||sa ca gr br
Hyène rayée|stripe|gr do ro li`);
  G("kiwi", "Kiwi et casoar", "kiwi", 10, NEUFS, `
Kiwi||br ca gr no ro sa rs li me do`);
  G("cassowary", "Kiwi et casoar", "cassowary", 16, `
bl:bleu|3a3744|15131b|5fa5f0
vi:violet|3f3648|17121d|a987ee
tu:turquoise|33424a|121a1e|55cfc4
ro:rosé|4a3a3f|1d1417|f99ab5
or:orange|40352f|191310|f9a85c
ve:vert|343f36|121a14|86d67c`, `
Casoar||*`);
  G("nudi", "Limace de mer", "nudi", 8, `
bl:bleue|5f9ff0|f9b93c|dcecff
rs:rose|f99fc0|8f5fd8|fff0f6
ja:jaune|fbdb5c|3f8fd0|fffbe0
vi:violette|a983ec|f98a5c|f1e8ff
ve:verte|86d98c|e8608f|effce9
or:orange|fba45c|5f62d8|fff0dc
bc:blanche|fdfaf8|f0607f|ffffff
tu:turquoise|5fd0c9|f9d04c|e0faf6`, `
Limace de mer||*`);
  G("lobster", "Homard", "lobster", 6, `
ro:rouge|e8564a|8f1f1c|ffd5cb
bu:bleu|5f8ff0|22489c|dce8ff
or:orange|f9983c|a8560f|ffe6c5
vi:violet|a87ae8|4a2a94|eadcff
do:doré|f0c850|94681a|fff5cc
rs:rose|f99fc0|b0507c|ffe6ef`, `
Homard||*`);
  // noms portés par deux espèces : on précise (l'identifiant, lui, ne change jamais)
  window.ANIMALS_DATA.forEach(a => { if (a.kind === "redpanda" && /^Panda (?!roux)/.test(a.name)) a.name = "Petit panda" + a.name.slice(5); if (a.kind === "butterfly" && /^Paon (?!du|de)/.test(a.name)) a.name = "Papillon paon" + a.name.slice(4); });
})();
