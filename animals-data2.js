"use strict";
// ============================================================================
//  SUITE DES ANIMAUX : races x robes. Ajouté à ANIMALS_DATA (animals-data.js).
//  Chaque animal garde un identifiant stable (tiré de son nom).
// ============================================================================
(function () {
  const out = window.ANIMALS_DATA, names = new Set(out.map(a => a.kind + a.name)), ids = new Set(out.map(a => a.id));
  const key = a => a.kind + a.hex + a.dark + a.belly + JSON.stringify(a.o), looks = new Set(out.map(key));
  const slug = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/œ/g, "oe").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const opt = s => { const o = {}; (s || "").split(",").filter(Boolean).forEach(p => { const [k, v] = p.split("="); o[k] = v === undefined ? true : v; }); return o; };
  const hash = s => { let h = 7; for (const c of s) h = (Math.imul(h, 31) + c.charCodeAt(0)) >>> 0; return h; };
  // accord de la couleur avec le genre de l'animal
  const FEM = new Set("Grenouille Rainette Girafe Chèvre Mouffette Buse Cigogne Grue Autruche Luciole Abeille Coccinelle Libellule Chenille Araignée Salamandre Tortue Pieuvre Méduse Étoile Baleine Raie Baudroie Couleuvre Vipère Perruche Calopsitte Chouette Mésange Poule Souris Gerbille Gerboise Marmotte Vache Loutre Hermine Chauve-souris Roussette Gazelle Licorne Alicorne Koï Hyène Limace Skinny".split(" ").filter(x => x !== "Skinny"));
  const PAIRS = [["noir", "noire"], ["gris", "grise"], ["blanc", "blanche"], ["roux", "rousse"], ["vert", "verte"], ["bleu", "bleue"], ["violet", "violette"], ["doré", "dorée"], ["brun", "brune"], ["argenté", "argentée"], ["rosé", "rosée"], ["bleuté", "bleutée"], ["orangé", "orangée"], ["royal", "royale"], ["blond", "blonde"], ["tacheté", "tachetée"], ["cendré", "cendrée"], ["moucheté", "mouchetée"]];
  const TOF = Object.fromEntries(PAIRS), TOM = Object.fromEntries(PAIRS.map(([m, f]) => [f, m]));
  const agree = (n, s) => { if (/^(à|de|en) /.test(s)) return s; const f = FEM.has(n.split(" ")[0]), inv = /bleu nuit|merle|loup/.test(s); return inv ? s : s.split(" ").map(w => (f ? TOF : TOM)[w] || w).join(" "); };
  const SKIP = new Set(window.ANIMALS_SKIP = /*SKIP*/["wolf|Louveteau gris", "wolf|Loup brun", "wolf|Loup sable", "wolf|Loup bleu nuit", "wolf|Loup lilas", "raccoon|Tanuki gris", "raccoon|Raton laveur brun", "raccoon|Tanuki blond", "raccoon|Raton laveur roux", "goat|Chèvre naine blanche", "giraffe|Girafon doré", "giraffe|Girafon orangé", "giraffe|Girafe brune", "giraffe|Girafe rose", "raptor|Buse royale", "raptor|Vautour noir", "raptor|Milan doré", "raptor|Milan royal", "raptor|Aigle roux", "raptor|Buse rousse", "raptor|Aigle blanc", "raptor|Aigle doré", "horse|Cheval à étoile bai", "horse|Cheval à liste alezan", "horse|Frison gris", "cow|Vache des prés isabelle", "sheep|Agneau bleu", "sheep|Mouton menthe"]/*END*/);
  function add(kind, species, family, name, c, d, b, o) {
    const a = { kind, species, family, name, hex: "#" + c, dark: "#" + d, belly: "#" + b, o, id: kind + "-" + slug(name) };
    if (SKIP.has(kind + "|" + name)) return false;
    if (names.has(kind + name) || ids.has(a.id) || looks.has(key(a))) return false;
    const h = hash(a.id); // un peu de vie : certains sont couchés, d'autres rient
    if (["dog", "cat", "rabbit", "fox", "bigcat", "cow", "pig", "bear", "deer", "wolf", "raccoon", "goat"].includes(kind) && !o.fringe && h % 4 === 0) o.pose = "loaf";
    if (["dog", "cat", "rabbit", "fox", "bigcat", "bear", "guinea", "hamster", "ferret", "mouse", "squirrel"].includes(kind)) { const m = [0, 0, "open", "grin", "tongue"][(h >> 3) % 5]; if (m) o.mouth = m; }
    names.add(kind + name); ids.add(a.id); looks.add(key(a)); out.push(a); return true;
  }
  // coats : code:suffixe|c|d|b|options   breeds : race|options|codes   max : total visé pour la famille d'espèces
  function G(kind, species, family, max, coats, breeds, count) {
    const C = {}; coats.trim().split("\n").forEach(l => { const [k, r] = [l.trim().slice(0, 2), l.trim().slice(3)]; C[k] = r.split("|"); });
    const B = breeds.trim().split("\n").map(l => { const [n, o, cs] = l.trim().split("|"); return { n, o, cs: cs === "*" ? Object.keys(C) : cs.split(" ") }; });
    const cnt = count || (() => out.filter(a => a.species === species).length);
    for (let i = 0; i < 40; i++) for (const b of B) { if (cnt() >= max) return; const k = b.cs[i]; if (!k) continue; const c = C[k]; if (!c) throw new Error("robe " + k); add(kind, species, family, b.n + (c[0] ? " " + agree(b.n, c[0]) : ""), c[1], c[2], c[3], { ...opt(b.o), ...opt(c[4]) }); }
  }
  const S = (kind, species, family, txt) => txt.trim().split("\n").forEach(l => { const [n, c, d, b, o] = l.trim().split("|"); add(kind, species, family, n, c, d, b, opt(o)); });

  // ======================== 200 CHIENS ========================
  G("dog", "Chien", "dog", 200, `
fa:fauve|d99a58|8a5424|f7e2c4
no:noir|36323e|131118|55505f
nf:noir et feu|2f2b35|121016|c9803f|p=tan
ch:chocolat|6f452c|381f10|a5785a
cf:chocolat et feu|5f3a26|2f1a0e|d08d52|p=tan
bl:bleu|7f8a9c|424b5b|aab4c3
cr:crème|f6e6cb|b89a6c|fffaf2
bc:blanc|fffdfa|b8b0ba|ffffff
br:bringé|9a6a40|3a2416|c99a6c|p=brindle
bm:bleu merle|97a3b5|3a404d|ffffff|p=merle,eye=4fa8e8
rm:rouge merle|c98a66|7a3f24|ffffff|p=merle
tr:tricolore|35313c|141219|fffaf4|p=tri
nb:noir et blanc|34303b|131118|ffffff|p=bi
rb:roux et blanc|cf7c3a|85471a|ffffff|p=bi
cb:citron et blanc|f3cf80|b5893a|ffffff|p=blaze
gr:gris|8d93a0|4a4f5c|c3c8d1
ab:abricot|f3ba85|b57c40|fde3c8
is:isabelle|c9b39a|86705a|efe4d6
mq:fauve masqué|d9a566|3a2a22|f3dcb5|p=mask
ro:rouan roux|fffdf8|8a4f30|ffffff|p=roan
rk:rouan bleu|f3f3f6|4a5060|ffffff|p=roan
ta:tacheté|fffdfa|3a3640|ffffff|p=spots
tb:tacheté foie|fffdfa|7a4a30|ffffff|p=spots
pn:pie noir|fffdfa|302d38|ffffff|p=dutch
px:pie roux|fffdfa|c9702f|ffffff|p=dutch
go:doré|f0bd62|ab7526|fff0d2
hg:gris loup|7f8b9e|3a4354|ffffff|p=husky
hr:roux|c98a5c|6b3a1c|ffffff|p=husky
hn:noir|34303b|131118|ffffff|p=husky,eye=3f9fe8
hs:sable|c9b08a|7a5f3a|ffffff|p=husky
sn:noir|35313c|131118|fff3e2|p=shiba
ss:sésame|b5834f|5a3a1c|fff3e2|p=shiba
sr:roux|ee9a4c|a85a1a|fff6ea|p=shiba
pt:à une tache|fffdfa|b5672f|ffffff|p=patch
pk:à œil noir|fffdfa|34303b|ffffff|p=patch
be:marqué|2f2b34|121016|ffffff|p=bernese`, `
Teckel nain|ear=long,short|ch cf bm is nf
Teckel à poil long|ear=long,short,fluff|fa nf cr no
Caniche|ear=flop,curly|no ch gr ab
Grand caniche|ear=flop,curly,big|bc no fa ch
Cocker anglais|ear=long,fluff|no rk ro cr
Springer|ear=long|px pn ro ch
Setter|ear=long,fluff,big|ro rk nf fa
Pointer|ear=flop,big|ta tb pn cb
Braque|ear=flop|ro rk ch gr
Épagneul|ear=flop,fluff|px pn tr ro
Retriever|ear=flop,fluff|go no ch cr
Labrador|ear=flop|cr fa bc go
Berger américain|ear=semi,fluff|bm rm tr nb
Border collie|ear=semi|bm rm tr rb
Shetland|ear=semi,fluff,short|bm tr rb nb
Corgi|ear=point,short|bm fa rm sr
Husky|ear=point|hr hn hs bc
Malamute|ear=point,big,fluff|hr hs hn hg
Shiba|ear=point,curlt|sn ss cr sr
Akita|ear=point,big,curlt|br nb mq ss
Spitz|ear=small,fluff,curlt|bc no cr nf
Chihuahua|ear=big|no nf ch ta
Chihuahua poil long|ear=big,fluff|nf cr bc rb
Yorkshire|ear=point,fringe|nf bl ch go
Shih tzu|ear=long,fringe|px pn go no
Lhassa apso|ear=long,fringe,curlt|cr gr bl bc
Havanais|ear=flop,fringe|ch no cr nb
Cavalier|ear=long,big|px tr nf fa
Beagle|ear=long|cb tr px bl
Basset|ear=long,short,big|tr ro rb cb
Bouledogue français|ear=bat,flat|br fa pk cr
Boston terrier|ear=bat|nb br no rb
Bouledogue anglais|ear=small,flat|px bc br fa
Carlin|ear=small,flat,curlt|bc ab gr br
Boxer|ear=flop,flat|br bc mq fa
Mastiff|ear=flop,big,wrinkle|mq br bl fa
Dogue allemand|ear=flop,big,flat|bl ta no mq
Doberman|ear=point|nf cf bl is
Pinscher nain|ear=point,short,curlt|nf cf fa is
Lévrier|ear=rose|no br fa bl
Whippet|ear=rose,big|cb br gr pt
Jack Russell|ear=semi,short|pt pk tr px
Fox terrier|ear=semi,beard|px pn tr bc
Schnauzer|ear=semi,beard,big|no gr nf cr
Terrier écossais|ear=point,beard|no br cr gr
Berger belge|ear=point,fluff|no mq fa cr
Berger allemand|ear=point,big|no nf bc mq
Briard|ear=flop,fringe,big|fa no gr cr
Montagne des Pyrénées|ear=flop,fluff,big|bc cr pn ch
Shar-pei|ear=small,wrinkle|cr no ch bl
Basenji|ear=point,curlt,flat|rb tr br nb
Bull terrier|ear=point,flat|pk br bc rb
Staffie|ear=rose,flat|bl br fa no
Bouvier|ear=flop,big,beard|be gr br no
Bolognais|ear=flop,curly,short|bc cr ab gr`);

  // ======================== 200 CHATS ========================
  G("cat", "Chat", "cat", 200, `
ti:tigré brun|a98560|4f3620|f3e3cf|p=tabby
tg:tigré gris|b5bcc8|565d6b|f3f5f8|p=tabby
tr:tigré roux|f2a55c|b8601e|fff0dc|p=tabby
tc:tigré crème|f6dfb8|c09050|fff9ec|p=tabby
tb:tigré bleu|9aa8bf|56657f|e8eef5|p=tabby
no:noir|38343f|151319|57525f
bl:bleu|8d98ab|4e596d|b3bccb
ch:chocolat|6f4a36|3a2418|94705a
li:lilas|c9b7bd|8f7a84|e8dde1
cn:cannelle|b5774a|6f4020|dcb08a
cr:crème|f9e6c9|c4a274|fffaf2
bc:blanc|fffdfb|b8b0ba|ffffff
ca:calico|fffaf4|3b3440|ffffff|p=calico
cd:calico dilué|fffaf4|8a94a8|ffffff|p=calico
ec:écaille|5b3a2a|2a1a14|c9773a|p=tortie
eb:écaille bleue|8a94a8|5a6478|ecc9a8|p=tortie
nb:smoking noir|34303b|151319|ffffff|p=tux
bb:smoking bleu|8a96ab|4b566b|ffffff|p=tux
rb:smoking roux|f09a4c|b05c1c|ffffff|p=tux
vn:van noir|fffdfa|302d38|ffffff|p=van
vb:van bleu|fffdfa|8490a5|ffffff|p=van
ps:seal point|f7e8cf|51392f|fff7e8|p=point
pb:blue point|f3f1f0|7f8aa0|ffffff|p=point
pl:lilac point|f9f3f3|b5a0a8|ffffff|p=point
pr:red point|fff6ea|e09a5c|ffffff|p=point
pc:chocolat point|fbf1e4|8a5a3c|ffffff|p=point
sm:fumé noir|d9dbe2|35333d|ffffff|p=smoke
sb:fumé bleu|e3e8ef|7080a0|ffffff|p=smoke
sg:silver|eef1f5|a3adbd|ffffff
go:golden|f0cb8c|96652a|fff3dc|p=tick
ly:lynx|c9c1b5|6b5f50|f6f2ea|p=tick
sp:moucheté brun|d9b183|5a3a1e|fbeed9|p=spots
ss:moucheté argent|d3d8e0|4f5664|f8f9fb|p=spots
rn:rosettes neige|f5ecda|7d6a50|ffffff|p=rosette
rf:rosettes feu|e8964c|5a2c10|fde3c4|p=rosette
cw:vache|fffdfa|33303c|ffffff|p=cow
cg:vache grise|fffdfa|7f8798|ffffff|p=cow
mt:à gants blancs|4a4652|201d28|ffffff|p=tux2
pt:à taches rousses|fffaf2|e58a3c|ffffff|p=patchs`, `
Européen|eye=7a9a3f|ti tg ca nb ec cw rb vn
British shorthair|eye=e8902a,big|cr li bb sg ch
Scottish fold|ear=fold,eye=e0952a|bl tb no ca cw
Highland fold|ear=fold,fluff,eye=d98a2a|cr bb sm tg tr
Persan|fluff,flat,eye=e0902a|no bl ca tr ps
Exotic shorthair|flat,eye=e0a02a|tr tc bb ec sg
Maine coon|ear=tuft,fluff,big,eye=c9a52a|no tg tr sm ec
Norvégien|ear=tuft,fluff,eye=6fa84f|ti tb nb ca cr
Sibérien|fluff,big,eye=8fa83f|tr ps bl tg nb
Ragdoll|fluff,mitt,eye=4f9fe0|pb pl pr pc sb
Siamois|ear=big,eye=3f8fd8|ps pb pl pr pc
Oriental|ear=big,eye=4fae58|no ch li cn ti ec
Balinais|ear=big,fluff,eye=3f8fd8|ps pb pl pr
Devon rex|ear=big,curl,eye=b5c93f|bc no tr ca bl
Cornish rex|ear=big,curl,short,eye=5fa8d8|nb cr eb ch
Selkirk rex|curl,eye=e09a2a,big|cr tb bc ec
Munchkin|short,eye=6fa83f|bc ca no tg sm
Munchkin poil long|short,fluff,eye=4f9fe0|ti cr ps bb
Bobtail|bob,eye=d9a12a|tr vn bc ec
Manx|bob,big,eye=8fae3f|tg no cw ti
American curl|ear=curl,eye=8fae3f|ti bc nb pb cr
Bengal|eye=5fa54f,big|rn ss rf sp
Savannah|big,ear=big,eye=c9a52a|sp ss go
Mau égyptien|eye=9ac93f|ss sp sm
Ocicat|ear=big,eye=b5902a|rf ss cn
Abyssin|ear=big,eye=8fae3f|go cn ly bl
Somali|fluff,ear=big,eye=8fae3f|go cn ly
Burmese|eye=e8b52a|ch li cr bl
Tonkinois|eye=5fc0b5|pc pb pl
Angora turc|fluff,eye=odd|bc no cr tr
Van turc|fluff,eye=odd|vn vb pt
Nebelung|fluff,eye=4fae58|bl sb
Sphynx|nude,ear=big,eye=5fb5c9|bl no cr ca
Minuet|short,fluff,flat,eye=e09a2a|bc cr li
Chaton|eye=8f6fc9|li cr mt pt cg
Pixie-bob|bob,ear=tuft,eye=c9a52a|sp ly ti
Toyger|eye=c9902a,big|tr ti
Lykoi|curl,eye=e8b02a|sm sb
Chat de gouttière|eye=b5a52a|pt cg mt eb vb ly
Chantilly|fluff,eye=d9a52a|ch li cn`);

  // ======================== 200 LAPINS ========================
  G("rabbit", "Lapin", "rabbit", 200, `
bc:blanc|fffdfb|bdb5c0|ffffff
no:noir|3a3642|17151c|5c5764
bl:bleu|8f99ab|525c70|c0c8d5
ha:havane|6b4632|38221a|9a7660
li:lynx|c9b8b5|8c7874|efe6e4
ag:agouti|b5966f|67492b|f3e6d0|p=tick
ch:chinchilla|b0b6c1|5f6672|f3f5f8|p=tick
fa:fauve|e0a05a|9a5f24|fbe8cf
is:isabelle|e6cdaa|a3865c|fbf3e6
cr:crème|fbecd2|c7a77a|ffffff
ec:écaille|d99a5c|4a3428|f3cfa0|p=tortie
si:siamois|c9a98a|5a4034|e8d5c0|p=point
hi:himalaya|fffdf9|4a424a|ffffff|p=point,eye=d9577a
hb:californien bleu|fffdfb|8290a8|ffffff|p=point,eye=d9577a
pn:papillon noir|fffcf7|38343f|ffffff|p=butterfly
pb:papillon bleu|fffcf7|8490a5|ffffff|p=butterfly
ph:papillon havane|fffcf7|7a4c30|ffffff|p=butterfly
pr:papillon roux|fffcf7|d9833c|ffffff|p=butterfly
lo:loutre noir|37333e|15131a|e8a565|p=tan
lb:loutre bleu|8a94a8|4a5468|f0d8b5|p=tan
lc:loutre chocolat|6b4632|33201a|e8b57a|p=tan
ar:arlequin|f0b46a|37323e|f8d8ab|p=harlequin
am:arlequin pie|fbf7f0|37323e|ffffff|p=harlequin
ab:arlequin bleu|f3dcb8|8a94a8|fbeed8|p=harlequin
dn:hollandais noir|fffdfb|34303b|ffffff|p=dutch
df:hollandais fauve|fffdfb|d9934c|ffffff|p=dutch
dg:hollandais gris|fffdfb|8f95a3|ffffff|p=dutch
tr:tricolore|fffaf2|38343f|ffffff|p=calico
pt:à taches noires|fffdf9|38343f|ffffff|p=patch
px:à taches rousses|fffdf9|d9833c|ffffff|p=patchs
cw:pie vache|fffdf9|3a3640|ffffff|p=cow
ho:hotot|fffefc|2b2832|ffffff|p=hotot
ro:rose poudré|fbd9de|c98a98|fff3f5
me:menthe|cdeedd|5fa585|f3fff8
lv:lilas|ddd0f3|8a76bd|f8f4ff`, `
Lapin nain|eye=4f7fb5|*
Bélier nain|ear=lop|*
Bélier géant|ear=lop,big|bc ag fa ch lo ec dn no is ha px
Bélier cachemire|ear=lop,fluff|bc cr bl fa si ec li no ar pt ro
Rex|curl,big|no bc bl ha lo ag tr ar ch pn si is
Mini rex|curl,short|cr li lb pb am hi fa lv ro cw
Angora|fluff,big|bc no bl fa ag li ro me
Tête de lion|mane|bc no cr bl ag si tr ho ec lb pt
Bélier tête de lion|ear=lop,mane|fa bc lo is li pn ha
Géant|big|no bl ch ag fa bc dg
Lapin de ferme|ear=tilt|ag px cw no cr pr tr dn
Jersey wooly|ear=tilt,fluff|bc li bl si lv cr ch
Bélier rex|ear=lop,curl|no ha bc lb ph ab
Lièvre belge|ear=tilt,big|fa ha no ag lo
Lapin polonais|short|bc hi no ch bl ho pn lo is ec`);

  // ======================== 200 OISEAUX (toutes familles à plumes) ========================
  S("songbird", "Oiseau", "bird", `
Canari orange|fb9a4a|b5591a|ffd3a5
Canari blanc|fffefb|b5b0b8|ffffff
Canari panaché|fde36b|6f8a3a|fff5b0|p=cap
Canari rouge mosaïque|fdf6ee|d9503c|ffffff|p=mask
Canari ardoise|8f98a8|4f5868|d5dae3
Diamant mandarin|b5b9c4|3a3640|f9efe3|p=sparrow
Diamant mandarin blanc|fffdfb|e8743c|ffffff
Diamant à longue queue|a9a59f|2b2830|f3c9b5|p=cap
Diamant bleu|6f9fe0|2f5a9c|d5e6fa|p=gould
Moineau domestique|b5875c|5f4028|f3e6d3|p=sparrow
Moineau friquet|c9975f|7a3f20|fbf1e2|p=sparrow
Bouvreuil pivoine|8f9aa8|25232b|f0705a|p=cap
Verdier|9ab54f|566e22|d9e88a
Tarin des aulnes|b5c24a|2f2f28|f3f0a5|p=cap
Serin cini|d9cf5c|8a7f22|fbf6b5
Linotte|b58a6a|6a432c|f0a59a|p=robin
Pinson du Nord|c98a5a|2b2830|f9b57a|p=cap
Rougequeue|6f7688|2d313c|e8703c
Gorgebleue|9a8468|54422f|4f8fe8|p=robin
Rossignol|b08058|644327|f6e6d3
Fauvette à tête noire|a5a59f|2b2a2e|e8e8e3|p=cap
Mésange huppée|b59c80|5a4636|fbf3e8|p=tit,crest
Mésange noire|7f8a9c|1f1f27|f6efe2|p=tit
Mésange azurée|9fd0f7|3f7fc0|ffffff|p=tit
Hirondelle rustique|3f5490|1c2a54|fff0e6|p=robin
Huppe dorée|f3b04c|5a3016|fde3b8|crest=hoopoe,beak=long
Guêpier|3fae9a|b5602a|fbe06b|p=gould,beak=long
Colibri rubis|5fae6b|2c6b3a|f0567a|p=robin,beak=long
Colibri saphir|5f7fe8|2a3f9a|e3f0ff|beak=long
Colibri améthyste|9a6ae0|4f2f9c|eadcff|beak=long
Colibri topaze|f3a03c|9c5210|ffe6b5|beak=long
Cardinal jaune|fbd84a|b08a14|fff3b0|crest,p=mask
Geai des chênes|c9977a|4f3a4a|f3dccd|crest
Geai de Steller|3f6fc0|1d2f5a|8fb0e8|crest,p=cap
Toucan ariel|34303b|15131a|f5543c|beak=toucan
Toucan vert|4fae6a|1f6b3a|fbe06b|beak=toucan
Martin-pêcheur violet|8f6fe0|4a3098|fbb57a|beak=long
Pic vert|9ac25a|4f7a22|eef3d0|p=wood,beak=long
Pic noir|2f2c35|121016|4a4654|p=wood,beak=long
Étourneau|4a4660|1e1b2e|6f6a8c
Loriot|fbd23f|2d2a30|ffe98f|p=cap
Paradisier|a8562c|54240f|f9e06b|crest
Corneille blanche|fdfcfa|a8a5b0|ffffff
Tangara écarlate|ec4a3c|2b2028|f58a7a
Tangara paradis|4fd0c0|2f3f9a|fbe06b|p=gould
Cotinga bleu|4fb5f0|2a3f9a|9a5fd0
Grive musicienne|b08a62|5a3f26|fdf3df`);
  S("parrot", "Perroquet", "bird", `
Perruche bleue|6fb8f0|2f70a8|a9d8f9|p=budgie
Perruche violette|b59af0|6a50ad|d8c9fa|p=budgie
Perruche blanche|fdfdff|9fb0c5|ffffff|p=budgie
Perruche grise|b5bac4|5f6674|dfe3e9|p=budgie
Perruche turquoise|5fd0c9|1f7f7a|b5f0ec|p=budgie
Perruche olive|a5b55a|5a6a22|dbe3a5|p=budgie
Perruche anthracite|565c6b|24272f|8d94a3|p=budgie
Inséparable de Fischer|6fc95c|2f7d2c|f9803c|p=love
Inséparable bleu|7fc4ec|357ba8|f3f6f8|p=love
Inséparable lutino|fbe36b|b5941f|f97a6a|p=love
Inséparable masqué|7fd06a|2f7d2c|3a3640|p=love
Inséparable violet|a58af0|5a42ad|f0e8ff|p=love
Calopsitte lutino|fff3b8|cfae4f|fffbe3|crest=f9d84a,cheek
Calopsitte perlée|c9bfae|7d7058|f3ecdd|crest=f3dc8a,cheek
Calopsitte blanche|fdfdfb|b0b0b5|ffffff|crest=fff3b5,cheek
Calopsitte cannelle|d9bfa0|8f7250|f6eadb|crest=f9e07a,cheek
Ara hyacinthe|4a5fd0|212f8a|6f85e8|p=love
Ara vert|5fb84f|2a6b2a|e8503c|p=ara
Cacatoès noir|3a3743|17151c|56525f|crest=e0453c
Cacatoès à huppe orange|fffdf8|bdb3a8|ffffff|crest=f9903c
Cacatoès de Leadbeater|fbd5d0|c98a86|fff0ee|crest=f9785c
Lori arlequin|3fae5c|1b6b34|f47a3c|p=rainbow
Lori noir|3d3545|18141f|e0506a|p=love
Lori rouge|e8443f|951c20|f58a6a|p=rainbow
Conure soleil|fbb52f|c9601a|fde06b|p=love
Conure à joues vertes|5f9a5c|2c5a34|c96a5a|p=love
Conure de Jandaya|f9a03c|2f7d3c|fbd25c|p=gould
Caïque|fdf9ef|3f9a4f|ffffff|p=love
Éclectus vert|3fb54f|1a6b2c|e0453c
Éclectus rouge|d9343c|3f2a8a|8f5fd0
Perroquet à collier bleu|6fa8e8|2d5a9c|b5d3f7`);
  S("pigeon", "Pigeon", "pigeon", `
Pigeon noir|45434f|1b1a21|6b6876|neck
Pigeon rouge|b5603f|65301c|d99a7f|bars
Pigeon tacheté|f6f4f2|6f7688|ffffff|dots
Pigeon paon noir|4a4754|1f1d25|6b6876|fan
Pigeon paon bleu|9fb0c9|54657f|e8eef6|fan
Pigeon capucin noir|3f3c48|19181e|f3f1f5|hood
Pigeon argenté|c9d0db|7a8598|e8ecf2|bars,neck
Pigeon lilas|cbbbe0|7f6aa8|efe8f9|neck
Tourterelle blanche|fdfbf8|b5aca5|ffffff|ring
Tourterelle rose|f3c9c5|a8706c|fde6e3|ring
Colombe de la paix|ffffff|9fb3c9|ffffff|dots`);
  S("owl", "Chouette et hibou", "owl", `
Chouette lapone|9aa0a8|50555e|f0f1f2|rings
Effraie dorée|e8b56a|96682a|fff6e6|heart
Effraie grise|b5b9c2|5f6572|f8f8fa|heart
Grand-duc des neiges|f3f3f5|7d8490|ffffff|horn,snow
Petit-duc roux|c9703f|6f3618|f6d9bd|horn
Hibou des marais|d9b07a|7a5628|fff0d8|darkeye
Chouette rose|f9c0d0|b8708a|fff2f6|
Chouette menthe|a9e0c5|4a9a78|f2fff8|
Chouette bleue|8fb8f0|3f6aad|eff6ff|horn
Chouette à lunettes|5a4030|2c1c13|fbeacb|rings
Hibou roux|d98a4c|7d4418|fde8cf|horn`);
  S("duck", "Canard et oie", "duck", `
Canard blanc|fffefb|b5b5bd|ffffff
Canard noir|3d3a46|18161d|57535f
Canard roux|c97a45|70401c|f0c9a5
Canard siffleur|b5643f|5a6a78|f3e0c5|p=mandarin
Canard pilet|8a6a52|4a5566|fbf6ee|p=cap
Fuligule milouin|b5452f|3a3640|b9bec8|p=mallard
Cane mandarine|a5a09a|5d5a58|f0ede8|p=tick
Oie blanche|fffefc|b0b3bd|ffffff|neck
Oie cendrée|a59d95|5d564f|e8e3dd|neck
Oie des neiges|fdfdff|3a3a44|ffffff|neck,p=tick
Cygne à cou noir|fdfdfd|2f2d36|ffffff|neck,p=cap
Canard de bain rose|ff9fc0|b5507a|ffd0e0|bath
Canard de bain bleu|7fc4f5|2f78b0|c9e8fb|bath
Canard de bain arc-en-ciel|b18cf2|5a3f9a|ffe0a5|bath,p=mandarin`);
  S("chicken", "Poule", "chicken", `
Poule blanche|fffdf8|b8aea5|ffffff
Poule Wyandotte|f3f0ec|35323c|ffffff|p=scale
Poule Wyandotte dorée|d99a45|4a2c14|f3cf8a|p=scale
Poule bleue|94a0b5|4f5b70|c5cedb
Poule Araucana|b5a58a|6a5a42|e3d9c5|p=collar
Poule soie noire|4a4552|1e1b24|6b6574|puff
Poule soie grise|b5b8c2|6a6f7c|e3e5ea|puff
Poule Padoue argentée|eceaf0|4a4754|ffffff|puff,p=scale
Coq noir|3a3743|1f6b5a|57525f|rooster
Coq roux|c4602c|2f5f3f|f0a868|rooster
Poussin gris|b5b5bd|74747f|dcdce2|chick
Poussin chocolat|a5754c|634021|d9b08a|chick
Pintade|8a90a3|454b5e|c3c8d5
Caille blanche|f9f3ea|b5a58f|ffffff|quail
Paon vert|2f9a6a|10503a|5fd0a0|peacock
Paon violet|8a5fd0|3f2580|b58af0|peacock`);
  S("penguin", "Manchot", "penguin", `
Manchot Adélie|2b2c36|111218|ffffff|ringeye
Manchot à jugulaire|343743|14161c|ffffff|chin
Gorfou doré|3a3640|17151c|fff6e0|crest
Manchot bleu nuit|3f4f9a|1c2458|ffffff|band
Manchot lilas|a58fd9|5c4799|fbf8ff|
Macareux huppé|34303b|141218|ffffff|puffin,crest
Manchot menthe|5fb5a0|256b5c|f3fffb|chest`);
  const FEATHER = ["songbird", "parrot", "pigeon", "owl", "duck", "chicken", "penguin"], nB = () => out.filter(a => FEATHER.includes(a.kind)).length;
  G("songbird", "Oiseau", "bird", 200, `
ab:abricot|fbb98a|b56f3a|ffe6d0
ci:citron|f3ec6b|a8a022|fffbc9
co:corail|f58a7a|a8443c|ffd3cb
tu:turquoise|5fd0d0|1f8080|d3f6f6
la:lavande|c4b0f0|7358b5|f0eaff
ol:olive|a3b05c|5c6624|e5ebbf
an:anthracite|585c6b|262932|a3a8b5
iv:ivoire|fdf6e6|b8a888|ffffff`, `
Oiselet|crest|*
Passereau masqué|p=mask|*`, nB);

  // ======================== LES AUTRES ESPÈCES ========================
  G("hamster", "Hamster", "hamster", 44, `
cr:crème|fbe8c6|c19c66|ffffff
ca:caramel|dba15f|8f5a24|fff2dd
no:noir|3d3945|18161d|6b6674
gr:gris|a9afba|5f6573|f3f4f7
bl:bleu|96a8c9|51648a|eef2fa
ch:chocolat|7d553a|42291a|ead8c8
ab:abricot|f7b57a|b5702f|fff1e0
pe:perle|f7f5f2|b5aeb5|ffffff
ro:rosé|f9cfd8|c08593|fff5f7`, `
Hamster nain|p=stripe|cr ca no bl ab ro
Hamster angora|p=brow|cr ca gr ch no
Hamster tacheté|p=patch|cr ca pe gr ro
Hamster chevalier d'argent|t=knight|no bl
Hamster sorcier|t=mage|gr no
Hamster de glace|t=ice|pe gr
Hamster fée des bois|t=fairy|cr ab
Hamster flibustier|t=pirate|no ch
Hamster cosmonaute|t=astro|gr pe`);
  G("guinea", "Cochon d'Inde", "guinea", 26, `
ch:chocolat|7a4f38|3f271a|b58a70
li:lilas|c9b5b0|8c7570|efe5e2
do:doré|e8b45c|9c6a1c|fbe3b5
bl:blanc|fdfcfa|b8b0b5|ffffff
no:noir|3b3742|17151d|6f6876
ro:roux|d9813f|8f4717|f8dcc0
ag:agouti|9a8468|54412b|d9c9b0|p=tick
tr:tricolore|fdf8f0|3a3440|ffffff|p=tri`, `
Cochon d'Inde péruvien|rosette|do bl no tr li
Cochon d'Inde anglais||ch li do bl ag
Cochon d'Inde couronné|crown|no ro tr bl li
Cochon d'Inde à rosettes|rosette,crown|ch do ag no
Skinny|nude|li ch no`);
  G("horse", "Cheval", "horse", 34, `
ba:bai|a5653a|54301a|e8c6a0|mane=2e2320
al:alezan|c97a3c|7d4216|f3d3ab|mane=d99a5a
no:noir|38343e|141218|5a5561|mane=17151c
gr:gris|c9ccd5|7d828f|eef0f3|mane=8f94a3
pa:palomino|efc478|a5752c|fff3da|mane=fff7ea
pn:pie|fdfbf8|332f3a|ffffff|mane=332f3a,p=cow
px:pie alezan|fdfbf8|b5672f|ffffff|mane=b5672f,p=patchs
ap:appaloosa|f6f2ee|6b5f66|ffffff|mane=5a5058,p=spots
cr:crème|fbeed3|bfa06a|ffffff|mane=fffaf0
bl:bleu|9fb5d9|566f9c|e8effa|mane=4a5f9c
li:lilas|d9c5f3|8a6fb8|f8f2ff|mane=b58af0
me:menthe|c5ecd9|5fa585|f3fff8|mane=5fc4a0`, `
Pur-sang||no gr pa cr
Trait|fluff,big|ba al gr no
Poney|small|px pn pa no
Appaloosa|big|ap
Licorne|horn|li me bl no pa
Pégase|wings|li no bl cr
Ânon|ear=long|cr no gr`);
  G("cow", "Vache", "cow", 16, `
no:noire|3a3640|17151c|5c5764
ro:rousse|c0673a|6f3416|e8b58a
bl:blanche|fffaf2|c0b09c|ffd3cf
pn:pie noire|fffdfa|302d38|ffc9cf|p=cow
pr:pie rouge|fffaf4|b5502a|ffc9cf|p=cow
ca:caille|fffaf4|7d4a2c|ffc9cf|p=patchs
ec:écaille|b5703c|3a2419|e8a56a|p=tortie`, `
Vache||no ca ec bl
Vache des Highlands|fringe,horn|no bl ro
Vache bretonne|small|pn pr ca
Aurochs|big,horn|no ro`);
  G("mouse", "Souris et rat", "mouse", 30, `
bl:blanc|fdfcfa|c0b5b8|ffffff|eye=d9577a
no:noir|3b3944|17151d|6d6975
ch:chocolat|7a5440|3f291d|b59482
cr:crème|f6e8cf|b89d73|ffffff
bu:bleu|96a2b5|515c70|dfe4ec
pi:pie|fdfbf8|3a3743|ffffff|p=blaze
hu:husky|5d606e|2c2f3a|ffffff|p=bi
fa:fauve|e8a862|9c632a|fff4e4
ro:rosé|f7d3d8|c58a96|fff6f7`, `
Rat dumbo|ear=big|bl no ch bu pi
Rat|big|hu pi ch fa
Souriceau|short|bl fa cr ro
Gerbille|tuft|no cr bu fa
Chinchilla|ear=big,bushy|no cr fa
Octodon|bushy,tuft|bu fa cr`);
  G("ferret", "Furet", "ferret", 20, `
ca:caramel|dba15f|8f5a24|fff2dd
no:noir|3c3742|17141c|d8cfd2
gr:gris|b5bac4|666d7a|f3f5f8
bl:blanc|fdfbf7|c9bdb5|ffffff`, `
Furet|blaze|ca no gr
Furet masqué|mask|bl gr ca
Furet joueur|play|no gr bl
Furet dormeur|sleep|ca no gr`);
  G("fox", "Renard", "fox", 20, `
ro:roux|f08a3e|9c4a14|fff6ec
bl:blanc|fafcfe|9db0c4|ffffff
no:noir|3d3a46|17151c|8a8794
cr:crème|f9e3bd|c09a60|fffaf0
ci:cendré|a9aab5|5a5c6a|f3f1f0
rs:rosé|f9c5cf|c4788a|fff2f5
bu:bleu|8fb0e8|43639f|eaf2ff`, `
Renardeau||cr rs bu
Fennec|ear=big|bl no ci
Renard croisé|cross|bl ci
Renard à neuf queues|nine|ro bu no`);
  G("bigcat", "Félin sauvage", "bigcat", 24, `
ro:roux|c9743c|6b3416|f8dcc0
gr:gris|a9adb8|555a66|f3f4f6
no:noir|38353f|16141a|4d4955
do:doré|eebd6a|a5702a|fff1d5
bl:blanc|fdfaf3|bdb5a8|ffffff`, `
Puma|big|gr no do
Lion des étoiles|mane=6f5fd0|bl no
Lionceau|short|do bl
Chat du désert|ear=big|do gr
Léopard|p=spots,big|gr bl
Tigre|p=tabby,big|do no gr
Caracal|ear=tuft|ro no`);
  G("bear", "Ours", "bear", 18, `
br:brun|9a6a44|55351c|c99a70
no:noir|3f3b45|18161d|a5805c
bl:blanc|fdfcf8|b5bcc9|ffffff
ro:roux|c9743f|75401c|f3c9a0
rs:rose|f9c5d3|c47a92|fff0f4
ml:miel|eebd66|a5751f|fff0c9`, `
Ourson|short|br bl ro rs
Panda|p=panda,short|bl
Ours en peluche|teddy|rs bl no
Ours gourmand|honey|br no
Ours à lunettes|p=spec|no ro`);
  G("squirrel", "Écureuil", "squirrel", 18, `
do:doré|eeb45c|9c641c|fff3dc
br:brun|8f623f|4a2f1a|f0dcc4
bl:blanc|fdfbf8|bfb3b5|ffffff
no:noir|3a3640|16141b|57525e
ro:roux|c25b2c|6f2a10|fff0e2`, `
Tamia|stripe|do bl no
Écureuil volant|fly|do bl
Marmotte|short|br do
Écureuil magique|rainbow|bl no`);
  G("hedgehog", "Hérisson", "hedgehog", 18, `
ro:rosé|fde3dd|c9868a|fff6f4
bl:bleuté|e6ecf6|6f84ad|f8fbff
do:doré|fdebc5|b58a35|fffaf0
no:noir|e0cbb8|38303a|f6e8da
li:lilas|f0e6f9|8f76bd|fbf7ff`, `
Hérisson||ro bl do li
Hérisson pomme|apple|do no
Hérisson champignon|shroom|bl no
Hérisson fleuri|flower|li ro`);
  G("sheep", "Mouton", "sheep", 18, `
no:noir|4a4550|1f1c25|37323c
gr:gris|c5c5cc|7a7a85|e8dcd5
br:brun|8f6a4c|54381f|d9b594
rs:rose|fcd5e0|c98aa2|fff0f3
li:lilas|e0d3f7|8f76bd|f8f0ee
me:menthe|d3f0e0|6fae90|fff6ee`, `
Agneau||no gr rs li me
Bélier|horn|no br gr li
Mouton tacheté|p=patch|gr me`);
  G("pig", "Cochon", "pig", 14, `
ro:roux|cf7f4a|80451c|f3c9a5
gr:gris|a5a0a8|5d5862|cfcad2
bl:blanc|fdf0ec|cfa59c|fff9f7
no:noir|4a464f|1f1c24|6b6670`, `
Cochonnet||ro bl gr
Cochon laineux|curly|no ro bl
Cochon ailé|wings|bl no`);
  G("deer", "Cervidé", "deer", 16, `
ro:roux|c4713c|6a3717|fff5ea
bl:blanc|fdfbf8|b8ac9f|ffffff
br:brun|8f6546|4c321e|f0dcc6
bu:bleu|8fa8e0|435a9c|eef3ff`, `
Faon|spots|ro bl br
Cerf des neiges|antler|bu ro
Gazelle|antler=horn|bl bu
Renne magique|antler=gold|bl br`);
  G("llama", "Camélidé", "llama", 12, `
br:brun|a87648|5f3d1d|f6e2c8
gr:gris|b5b5bd|66666f|f3f3f5
li:lilas|dccbf3|8a70b8|f8f3ff
bu:bleu|bcd5f3|6286b5|f0f7ff`, `
Lama||br gr li
Alpaga|poof|gr li bu`);
  G("elephant", "Éléphant", "elephant", 10, `
li:lilas|cdbcec|7d64b3|efe8fb
me:menthe|b5e0cd|5a9a80|e6f9f0
do:doré|efcf8a|a8802f|fff0cf
bl:blanc|f6f5f3|b0adb5|ffffff`, `
Éléphanteau|small|li me bl
Mammouth|mam|bl do`);
  G("koala", "Koala", "koala", 7, `
li:lilas|cfc0e8|7f6aad|f6f2fc
bu:bleu|a9c5e8|567cad|f0f7ff
do:doré|e8c98f|9c7838|fff6e3`, `
Koala||li bu do`);
  G("redpanda", "Panda roux", "redpanda", 6, `
do:doré|eeae5c|6f4216|fff8ea
no:noir|4f3f45|1d1519|f0e3dd
rs:rosé|f2a59c|80403c|fff3f0`, `
Panda roux||do no rs`);
  G("monkey", "Singe", "monkey", 14, `
no:noir|3d3438|18131a|e0b48f
do:doré|f0b45c|a56a1b|fff0d5
gr:gris|b0aeb5|5f5c66|f3ece6
bl:blanc|fbf8f3|b8aca3|f9d9c5`, `
Ouistiti|tuft|do bl
Tamarin|mane|no bl
Macaque||do gr
Lémurien|lemur|do bl`);
  G("otter", "Loutre", "otter", 13, `
do:dorée|d9a860|8a5f24|fdf0d5
no:noire|45404a|1c1a20|c9bfc0
gr:grise|a5a5ad|57575f|f3f1ef`, `
Loutre||do no gr
Loutre au coquillage|shell|do gr`);
  G("bat", "Chauve-souris", "bat", 10, `
ro:rousse|cf7f45|5f3014|f3cfa5
rs:rose|f3a8bd|a05a74|fff0f4
bu:bleue|7f9fe0|32468f|dce8fb
gr:grise|a5a3ad|4a4852|e8e6ea`, `
Chauve-souris|ear=big|ro rs bu gr
Roussette||rs`);
  G("axolotl", "Axolotl", "axolotl", 16, `
bu:bleu|a5d0f5|4f86c9|e6f4ff
do:doré|fbe08a|d9902a|fff6d5
ve:vert|a5d98a|4f9a3f|effbe3
ro:rouge|f58a8a|b5303f|ffdada
gl:galaxie|5c4fb0|b55fd0|a593e8
pc:pêche|fdd0b5|e8805c|fff1e6
ni:nuit|38406b|5f9fe0|5d6699`, `
Axolotl||bu do ve ro gl pc ni
Axolotl moucheté|tick|bu do pc`);
  G("turtle", "Tortue", "turtle", 20, `
bl:bleue|6f9fd8|2f5590|cfe0f3
ro:rose|f3a5b8|a8566f|fde0e6
vi:violette|a98ae0|5a3f9a|e0d3f5
do:dorée|e8c45c|8f6a1c|f3e3b5
no:noire|4a4a52|1f1f26|a9a9a0`, `
Tortue marine|sea|bl ro vi do
Tortue géante|big,p=rays|do no
Tortue étoilée|p=star|bl vi`);
  G("crocodile", "Crocodile", "crocodile", 11, `
vi:violet|b08ae0|5c3f9c|efe3fb
ro:rose|f5a5b8|a8506a|fde8ee
do:doré|e8c45c|94701c|fbf1cf
tu:turquoise|5fc9c0|1f756e|dff8f5`, `
Crocodile||vi ro tu
Gavial|thin|do tu`);
  G("snake", "Serpent", "snake", 34, `
al:albinos|fff3d0|f2b04c|fffdf0
pi:pastel|e8c98a|7a5a34|fdf3dc
bl:bleu|6fb5ec|1f5f9c|e0f3ff
vi:violet|b08ae8|5a3a9c|f0e6ff
ro:rose|f9b0c0|b5566f|fff0f3
ve:vert|7fd06a|2a7a2a|eefbd8
no:noir|3a3843|f3dc8a|5c5a66
ro2:rouge|e8604f|7a1f1a|ffd9cf
ci:citron|f9e96b|b5981f|fffbd0`.replace("\nro2:", "\nrg:"), `
Python royal|p=ball|al pi bl vi ro no
Serpent des blés|p=saddle|al pi ro ve rg
Serpent roi|p=band|al bl vi rg
Boa|p=dots|pi ve ci no
Vipère|p=zig|ve bl rg
Cobra|hood|al no bl`);
  G("frog", "Grenouille", "frog", 22, `
ro:rose|f9a5c0|b0567c|ffe3ec
tu:turquoise|5fd0c9|1f807a|d9f8f5
or:orange|f9983c|a8560f|ffe0b5
vi:violette|a98ae8|5a3f9f|ece3ff
do:dorée|fbd84f|b08a14|fff3b5
no:noire|3d3b46|f9d23f|6b6875`, `
Dendrobate|p=spots|tu or vi no ro
Rainette|red|ro tu do
Grenouille de verre|glass|ro vi tu
Grenouille cornue|horn|or do vi`);
  G("fish", "Poisson", "fish", 46, `
ro:rouge|ea4f4f|951c30|fbb0a5
bl:bleu|4f7fe8|1f3a9a|b0c8fa
tu:turquoise|4fd0d0|1f8a8f|c5f3f3
vi:violet|a06ae8|5230a5|d9c0fb
no:noir|3d3a45|7a6fd0|5c5866
do:doré|fbcf5c|c0861a|fff0c0
rs:rose|f9a5c8|c4588f|fde0ee
or:orange|f9903c|b5520f|ffd5a5
bc:blanc|fdf9fa|b59fb8|ffffff
ve:vert|7fd06a|2f8a3f|dcf6cf`, `
Combattant|betta|tu vi no do rs ve
Guppy|fan|ro bl vi do or
Koï|p=koi|bc do rs bl
Scalaire|angel,p=band|bc rs tu no
Discus|angel,p=zig|ro bl tu ve
Poisson perroquet|p=scale|rs ve or vi
Hippocampe|sea|vi or ve bc
Tétra|p=neon,slim|rs do ve
Poisson-globe|puff|rs bl ve
Poisson en bocal|bowl|bl rs no`);
  G("butterfly", "Papillon", "butterfly", 26, `
ro:rouge|e8503f|3a1a1c|ffb5a0
bl:bleu|5f9ff0|1f2f6b|cfe3ff
vi:violet|a87ae8|3f2078|e6d5ff
ve:vert|7fd06a|2a5a2a|e0f8cf
ja:jaune|fbe04a|5a4a14|fff6b5
rs:rose|f9a0c8|8a3a68|fde3ef
no:noir|3a3640|e8a03c|6b6675
tu:turquoise|4fd0c9|144f52|cff5f3`, `
Papillon||vi ve ja rs tu
Machaon|tail|bl rs ve no
Paon|eye|bl vi tu rs
Papillon de nuit|fur|rs vi ja`);
  G("dino", "Dinosaure", "dino", 22, `
ro:rose|f9a5bd|b0567a|ffe6ee
bl:bleu|7fb0f0|33619f|e3f0ff
vi:violet|b59ae8|604a9c|f0e8fb
ve:vert|8fd080|3f803a|ecf8e0
or:orange|f9a55c|a85f1c|ffedd5
tu:turquoise|5fd0c5|20807a|dcf8f5`, `
T-rex|rex|ro bl or
Tricératops|tri|ro vi ve
Stégosaure|steg|or ve vi
Diplodocus|long|ro or bl
Ptérodactyle|ptero|ro tu
Parasaure|para|tu bl`);
  G("dragon", "Créature magique", "dragon", 26, `
vi:violet|a87af0|5830a5|efe3ff
ve:vert|6fc97a|28783f|eef9c9
ro:rose|fba0c0|b84f7d|ffeaf2
tu:turquoise|5fd0d0|1f808a|dff8f8
or:orange|f9a04c|a8560f|ffe6c5
no:noir|45424f|1a1821|9f6fe0`, `
Dragon||vi ve ro tu or no
Dragon de cristal|crystal|vi ro tu
Phénix|phoenix|vi ve ro
Griffon|griffin|no tu
Esprit|spirit|ro tu or
Fantôme|ghost|ro tu`);
  G("sea", "Mer", "sea", 34, `
ro:rose|f9b0c5|b5607f|fde6ee
bl:bleu|7fb0f0|2f62a8|d9eaff
vi:violet|b08ae8|5c3f9c|e6d9fb
ja:jaune|fbd86b|b58a1c|fff5cf
ve:vert|8fd9a5|3a8a58|e3f8ea
or:orange|f9a05c|a8541c|ffe0c5`, `
Pieuvre|octo|ro ja ve or
Méduse|jelly|bl vi ja ve
Étoile de mer|star|ro bl vi ja
Crabe|crab|bl ve vi
Phoque|seal|ro bl
Baleine|whale|ro vi
Oursin||ro ve`);
  window.ANIMALS_GEN = { G, S };
})();
