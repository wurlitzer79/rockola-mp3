// Obtener parámetros de la URL
    const params = new URLSearchParams(window.location.search);
	let letra = params.get("valor"); // Obtener el parámetro 'valor'

    // Mostrar el valor en el título
	const huno = document.getElementById("letraElegida");
	if (huno) {
      huno.textContent = letra;
    }

// Función para cargar metadatos de una colección
async function fetchThumbnails(collectionId) {
  const apiUrl = `https://archive.org/metadata/${collectionId}`;
  try {
	const response = await fetch(apiUrl);
	const data = await response.json();
	return data.files.filter(file => file.name.endsWith("_ia_thumb.jpg")); // Filtrar solo _ia_thumb.jpg
  } catch (error) {
	console.error(`Error al cargar ${collectionId}:`, error);
	return [];
  }
}

	// Generar menú dinámico	==> ,{ id: "",		name: "" }
	async function generateMenu() {
		let collections;
		
		collections = [
		 { id: "14-unknown-artist-track-14",					name: "10 Años De Exitos Con Radio Corazón" }
		,{ id: "04-pass-the-40",						name: "2 Pac - Evolution The Definitive Collection" }			
		,{ id: "300-christmas-songs_202305",					name: "300 Christmas Songs" }
		,{ id: "03-whats-up_202307",					    	name: "4 Non Blondes - Bigger, Better, Faster, More!" }
		,{ id: "50-cent_202110",						name: "50 Cent" }
		,{ id: "Get-Rich-or-Die-Tryin-42069",					name: "50 Cent - Get Rich or Die Tryin'" } 
		,{ id: "08-all-you-zombies-album-version",				name: "80s Rock - The Essential" }
		,{ id: "euro-dance",							name: "90's EuroDance Parte I" }
		,{ id: "90s-eurodance-part-ii-compiled-by-electro75-2018",		name: "90's EuroDance Parte II" }		
		,{ id: "007.-robert-miles-fable-dream-version",			  	name: "90's EuroDance Parte III" } 
		,{ id: "02-shoot-to-thrill_202307",					name: "ACDC - Back In Black" }
		,{ id: "acdc-the-razors-edge",						name: "AC/DC - The Razors Edge" }		 
		,{ id: "aerosmith-tough-love-the-best-of-the-ballads", 			name: "Aerosmith - Tough Love" }		
		,{ id: "15.-livin-on-the-edge",						name: "Aerosmith - Big Ones" }
		,{ id: "02-i-dont-want-to-miss-a-thing-pop-mix",			name: "Aerosmith - I Don't Want To Miss a Thing" }
		,{ id: "albertocortezargentina",					name: "Alberto Cortez - Argentina" }
		,{ id: "03.-rooster_202307",						name: "Alice In Chains - Greatest Hits" }
		,{ id: "11-frogs_20210521",						name: "Alice.In Chains - MTV Unplugged" }
		,{ id: "adrian-y-los-dados-negros-grandes-exitos-2011-461",		name: "Adrián y los Dados Negros - Grandes Éxitos (2011) [WAVE]" }	
		,{ id: "americo-a-morir-2008-512",					name: "Américo - A morir (2008) [WAVE]" }		
		,{ id: "amar-azul-amar-azul-1992-507",					name: "Amar Azul - Amar Azul (1992) [WAVE]" }		
		,{ id: "armando-hernandez-la-mujer-de-mi-vida-2015-540",		name: "Armando Hernández - La Mujer de Mi Vida (2015) [Flac]" }
		,{ id: "armando-hernandez-historia-musical-de...-cd-1-2003-325",	name: "Armando Hernández - Historia Musical de... [CD 1] (2003) [WAVE]" }
		,{ id: "armando-hernandez-historia-musical-de...-cd-2-2003-801",	name: "Armando Hernández - Historia Musical de... [CD 2] (2003) [WAVE]" }
		,{ id: "armando-hernandez-si-vas-para-chile-1996-35",			name: "Armando Hernández - Si Vas Para Chile" }		
		,{ id: "02-you-know-im-no-good",					name: "Amy Winehouse - Back to Black" }
		,{ id: "11-amy-amy-amy-outro",						name: "Amy Winehouse - Frank" }
		,{ id: "05-like-smoke-feat.-nas",					name: "Amy Winehouse - Lioness-Hidden Treasures" }
		,{ id: "10-nunca-es-igual", 						name: "Andrés Calamaro - Alta Suciedad" }
		,{ id: "04.-paloma_202304",						name: "Andrés Calamaro - Obras Incompletas" }
		,{ id: "angie-stone-live-at-hip-hop-festival-baden-baden-2000",		name: "Angie Stone - Live At Festival Germany 2000" }
		,{ id: "anthony_ventura-music_for_making_love-vinyl-1980",		name: "Anthony Ventura - Music For Making Love I" }
		,{ id: "anthony_ventura-music_for_making_love_2-vinyl-1982",		name: "Anthony Ventura - Music For Making Love II" }			
		,{ id: "08-anything-but-ordinary_202308",				name: "Avril Lavigne - Let Go" }
		,{ id: "10-girlfriend-junkie-xl-extended-mix",				name: "Avril Lavigne - Masters" }
		,{ id: "aparcoachile",							name: "Aparcoa - Chile" }
		,{ id: "bad-religion-into-the-unknown",					name: "Bad Religion - Into The Unknown" }
		,{ id: "Bad_Bunny-UnVeranoSinTi",					name: "Bad Bunny - Un Verano Sin Tí" }
		,{ id: "bad_bunny-debitirarmasfotos",                  			name: "Bad Bunny - DeBí TIRAR MáS FOToS" }
		,{ id: "audklv20210409bandasonora1992candycandyost",			name: "Banda Sonora Original - Candy Candy" }		
		,{ id: "audklv20210406bandasonora1978greasetheoriginalsoundtrackfromthemotionpicturecd",name: "Banda Sonora - Grease Brillantina" }			
		,{ id: "ShrekMusicfromtheOriginalMotionPicture", 			name: "Banda Sonora - Shrek" } 
		,{ id: "sonic-mana-original-soundtrack",				name: "Banda Sonora - Sonic Mania Original (FLAC)" }
		,{ id: "the-fast-and-the-furious-collection",				name: "Banda Sonora - Rapidos y Furiosos" }			
		,{ id: "dg-138-775-beethoven-o-concertos-pour-piano-n-2-et-n-4-wilhelm-kempff-ferdinand-leitner",name: "Beethoven • Concertos pour piano n° 2 et n° 4" }			
		,{ id: "rock_around_the_clock-vinyl",					name: "Bill Haley & The Comets - Rock Around The Clock" }
		,{ id: "06.-mony-mony",							name: "Billy Idol - Idol Songs, 11 Of The Best" }
		,{ id: "billboard-80s",							name: "Billboard 80s" }		 			
		,{ id: "beethoven-piano_concerto_no_5-vinyl-1978",     			name: "Beethoven - Piano Concerto No. 5" }			
		,{ id: "16.-not-now_202310",						name: "Blink 182 - Greatest Hits" }
		,{ id: "09.-susie-and-jeffrey_202408",					name: "Blondie - The Essential Collection" }
		,{ id: "01.-screaming-skin",						name: "Blondie - No Exit" }
		,{ id: "06-justice-in-the-barrel",					name: "Bon Jovi - Blaze of Glory" }
		,{ id: "10.-bed-of-roses",						name: "Bon Jovi - The Ultimate Collection Vol.01" }
		,{ id: "10.-these-days",						name: "Bon Jovi - The Ultimate Collection Vol.02" }
		,{ id: "boney_m-nightflight_to_venus-vinyl-1978",			name: "Boney M - Nightflight To Venus" }
		,{ id: "17-daddy-cool-remix-2001",					name: "Boney M - Greatest Hits" }		 
		,{ id: "BossaNovaStones",						name: "Bossa Nova - The Rolling Stones" }
		,{ id: "BossaNovaRoses",						name: "Bossa Nova - Guns and Roses" }
		,{ id: "BossaNovaMarley",						name: "Bossa Nova - Bob Marley" }
		,{ id: "bronco-pura-sangre-1993-503",					name: "Bronco - Pura Sangre (1993) [WAVE]" }				
		,{ id: "03.-darlington-county",						name: "Bruce Springsteen - Born In The U.S.A" }
		,{ id: "12.-human-touch",						name: "Bruce Springsteen - Greatest Hits" }
		,{ id: "14-everything-i-do-i-do-it-for-you",				name: "Bryan Adams - Anthology Vol.01" }
		,{ id: "06-lets-make-a-night-to-remember",				name: "Bryan Adams - Anthology Vol.02" }
		,{ id: "02.-circus-pleasures-of-a-lifetime",				name: "Circus - circus 1969 UK" }		
		,{ id: "climax-vol.-iii-1991-539",					name: "Climax - Vol. III (1991) [WAVE]" }					
		,{ id: "20.-talk",							name: "Coldplay - Essentials" }
		,{ id: "djdaga-megamix-chep",						name: "Chancho en Piedra - Megamix" }		 			
		,{ id: "chep-1995-peor-es-mascar-lauchas",				name: "Chancho en Piedra - Peor es Mascar Lauchas" }
		,{ id: "chep-1997-la-dieta-del-lagarto",				name: "Chancho en Piedra - La Dieta del Lagarto" }
		,{ id: "chep-1998-rindanse-terricolas",					name: "Chancho en Piedra - Rindanse Terricolas" }
		,{ id: "chep-2000-marca-chancho",					name: "Chancho en Piedra - Marca Chancho" }
		,{ id: "chep-2002-el-tinto-elemento",					name: "Chancho en Piedra - El Tinto Elemento" }
		,{ id: "chep-2004-chancho-6",						name: "Chancho en Piedra - Chancho 6" }
		,{ id: "chep-2005-desde-el-batiscafo",					name: "Chancho en Piedra - Desde el Batiscafo" }
		,{ id: "chep-2007-grandes-exitos-de-ayer-y-oink",			name: "Chancho en Piedra - Grandes Exitos de Ayer y Oink" }   			
		,{ id: "circus-of-rock-come-one-come-all-2021",				name: "Circus of Rock - Come One, Come All" }
		,{ id: "2-15.-desnudate",						name: "Christina Aguilera - The Collection" }
		,{ id: "07-peter-frampton-breaking-all-the-rules",			name: "Classic Metal One" }
		,{ id: "09-faith-no-more-falling-to-pieces",				name: "Classic Metal Two" }
		,{ id: "the-classic-project",						name: "Classic Project" }						
		,{ id: "01.-suzy-q_202311",						name: "Creedence Clearwater Revival - Chronicle" }
		,{ id: "compilado-musica-anos-80-90-00-cd01",				name: "Compilado Musica Años 80-90-00 cd01" }
		,{ id: "compilado-musica-anos-80-90-00-cd-02",				name: "Compilado Musica Años 80-90-00 cd02" }
		,{ id: "compilado-musica-anos-80-90-00-cd-03",				name: "Compilado Musica Años 80-90-00 cd03" }		 
		,{ id: "mix-cumbias",							name: "Cumbias Mix" }
		,{ id: "daddy-yankee_202110",						name: "Daddy Yankee Discography" }		
		,{ id: "front_20210629",						name: "Daft Punk - Daft Club (Remix Album 2003)" }			
		,{ id: "daft-punk-homework",						name: "Daft Punk - Homework 1997" } 
		,{ id: "12.-diamond-dogs",						name: "David Bowie - The Platinum Collection Vol.01" }
		,{ id: "05.-john-im-only-dancing-again",				name: "David Bowie - The Platinum Collection Vol.02" }
		,{ id: "13.-loving-the-alien",						name: "David Bowie - The Platinum Collection Vol.03" }
		,{ id: "07-b-3-river-deep-mountain-high",				name: "Deep Purple - The Book of the taliesyn / taliesian" }
		,{ id: "deep_purple_-_deep_purple_vinyl_rip",				name: "Deep Purple - Deep Purple 1969" }
		,{ id: "07-deep-purple-child-in-time",					name: "Deep Purple - Essential [FLAC]" }
		,{ id: "deeppurplemachineheadoriginalrecordrip",			name: "Deep Purple - Machine Head" }
		,{ id: "beauty-school",							name: "Deftones - Diamond Eyes" }
		,{ id: "disney-records-the-legacy-collection",				name: "Disney Records The Legacy Collection" }		
		,{ id: "djs-en-accion-chile-vol.1-1999_202112",				name: "Dj's En Acción - Chile Vol.1 (1999) [WAVE]" }
		,{ id: "djs-en-accion-2-chile-sin-fronteras-2000-371",			name: "Dj's En Acción - Chile Vol.2 Sin Fronteras (2000) [WAVE]" }
		,{ id: "dj-pinky-reventon-mix-vol.-1-2006-995",				name: "DJ Pinky - Reventon Mix Vol. 1 (2006) [Flac]" }
		,{ id: "dj-pinky-reventon-mix-vol.-2-2007-458",				name: "DJ Pinky - Reventon Mix Vol. 2 (2007) [WAVE]" }		
		,{ id: "don-omar",							name: "Don Omar Discography" }			
		,{ id: "donna_summer-the_wanderer-vinyl_single-1980",			name: "Donna Summer - The Wanderer" }
		,{ id: "edith_piaf-edith_piaf-vinyl-1972",				name: "Edith Piaf - Edith Piaf" }		
		,{ id: "16-fanatica-club-mix",						name: "Eisbrecher - Eisbrecher 2004" }		
		,{ id: "08-kein-mitleid",						name: "Eisbrecher - Antikörper 2006" }		
		,{ id: "06-segne-deinen-schmerz",					name: "Eisbrecher - Eiszeit 2010" }
		,{ id: "14-treiben",							name: "Eisbrecher - Die Hölle muss warten 2012" }
		,{ id: "11-noch-zu-retten",						name: "Eisbrecher - Schock 2015" }
		,{ id: "04-in-einem-boot",						name: "Eisbrecher - Sturmfahrt 2017" }
		,{ id: "12-menschenfresser",						name: "Eisbrecher - Schicksalsmelodien 2020" }		
		,{ id: "04-im-guten-im-bosen",						name: "Eisbrecher - Liebe Macht Monster 2021" }		
		,{ id: "03-bridge-over-troubled-water-elvis-presley_202408",		name: "Elvis Presley - Greatest Hits" }		 		
		,{ id: "enanitosverdesargentina",					name: "Enanitos Verdes - Argentina" }
		,{ id: "03-carrie",							name: "Europe - Gold Vol.01" }
		,{ id: "06-sweet-love-child",						name: "Europe - Gold Vol.02" }
		,{ id: "14-yesterdays-news",						name: "Europe - Gold Vol.03" }
		,{ id: "blues-away",							name: "Erasure - I Say I Say I Say" }
		,{ id: "take-me-out-of-myself",						name: "Erasure - World Be Gone" }
		,{ id: "eternal_202105",						name: "Evanescence - Origin" }
		,{ id: "never-going-back",						name: "Evanescence - Evanescence" }
		,{ id: "fiesta-mixes",							name: "Fiestas Mixes" }
		,{ id: "varios-interpretes-fieston-tropical-1997",			name: "Fiesta Tropical" }						
		,{ id: "these-days",							name: "Foo Fighters - Wasting Light" }
		,{ id: "06-living-on-my-own-roger-s-mix",				name: "Freddie Mercury - Remixes" }
		,{ id: "gilda-el-mito-2000-436",					name: "Gilda - El Mito (2000) [Flac]" }
		,{ id: "gilda-las-alas-del-alma-1999-680",				name: "Gilda - Las alas del alma (1999) [WAVE]" }
		,{ id: "giolito-y-su-combo-lo-mejor-2001-597",				name: "Giolito y Su Combo - Lo Mejor (2001) [Flac]" }			
		,{ id: "09.-clint-eastwood",						name: "Gorillaz - Greatest Songs" }
		,{ id: "07.-clint-eastwood",						name: "Gorillaz - Essentials" }
		,{ id: "grupo-green-megamix-2008-557",					name: "Grupo Green - Megamix (24 Super Hits)" }
		,{ id: "grupo-red-20-grandes-exitos-2007-686",				name: "Grupo Red - 20 Grandes Éxitos" }		 
		,{ id: "03.-longview",							name: "Green Day - International Superhits!" }
		,{ id: "08.-one-in-a-million",						name: "Guns N' Roses - G N' R Lies" }
		,{ id: "06-paradise-city",						name: "Guns N' Roses - Appetite For Destruction" }
		,{ id: "16.-coma",							name: "Guns N' Roses - Use Your Illusion I" }
		,{ id: "11.-estranged",							name: "Guns N' Roses - Use Your Illusion II" }
		,{ id: "09.-november-rain",						name: "Guns N' Roses - Greatest Hits" }
		,{ id: "audklv20210404gunsnroses1993thespaghettiincident",		name: "Guns N' Roses - The Spaghetti Incident" }
		,{ id: "16-coma-2022-remaster",						name: "Guns N' Roses - Use Your Illusion I (Deluxe Edition) Album 01" }
		,{ id: "11-its-alright-november-rain-live-in-paris-hippodrome-de-vincennes-june-6-1992",name: "Guns N' Roses - Use Your Illusion I (Deluxe Edition) Album 02" }	
		,{ id: "11-estranged-2022-remaster",					name: "Guns N' Roses - Use Your Illusion II (Deluxe Edition) Album 01" }
		,{ id: "13-estranged-live-in-las-vegas-thomas-mack-center-january-25-1992",name: "Guns N' Roses - Use Your Illusion II (Deluxe Edition) Album 02" }
		,{ id: "10-all-i-wanna-do-is-make-love-to-you",				name: "Heart - Greatest Hits" }
		,{ id: "05-suicide-blonde-demolition-mix",				name: "INXS - Suicide Blonde" }
		,{ id: "07.-devil-inside",						name: "INXS - The Greatest Hits" }
		,{ id: "iron_maiden-brave_new_world-vinyl-2000",			name: "Iron Maiden - Brave New World" }
		,{ id: "seventh-son-of-a-seventh-son",					name: "Iron Maiden - Seventh Son Of A Seventh Son" }
		,{ id: "silver-as-in-silence",						name: "Iron Maiden - The Book Of Souls" }
		,{ id: "iron-maiden-killers",						name: "Iron Maiden - Killers" }
		,{ id: "iron-maiden-senjutsu-2021_202109",				name: "Iron Maiden - Senjutsu" }
		,{ id: "isabel-pantoja-grandes-exitos",					name: "Isabel Pantoja - Grandes Exitos" }					
		,{ id: "jimi_hendrix-in_the_beginning-vinyl-1973",			name: "Jimi Hendrix - In the Beginning" }
		,{ id: "20-god-gave-rock-n-roll-to-you_202307",				name: "Kiss - Greatest Kiss" }
		,{ id: "karicia-20-grandes-exitos-2007-222",				name: "Karicia - 20 Grandes Éxitos" }
		,{ id: "karicia-el-poder-del-ritmo-1993-963",				name: "Karicia - El Poder Del Ritmo (1993) [WAVE]" }
		,{ id: "karicia-serie-super-tropi-1998-588",				name: "Karicia - Serie Super Tropi (1998) [WAVE]" }
		,{ id: "karicia-megamix-24-super-hits-2008-741",			name: "Karicia - Megamix (24 Super Hits) (2008) [WAVE]" }			
		,{ id: "la-sonora-malecon-grandes-exitos-2013-790",			name: "La Sonora Malecón - Grandes Exitos (2013) [WAVE]" }		
		,{ id: "n1fearedwolfxrmf_20211121_2052",				name: "Lady Gaga Discography" }		
		,{ id: "grupo-green-grupo-red-blue-contagio-la-guerra-de-los-colores-ii-1999-290",name: "La Guerra De Los Colores - Grupo Green, Grupo Red, Blue, Contagio (1999)" }
		,{ id: "la-sonora-de-tommy-rey-amor-en-llamas-1996-513",		name: "La Sonora de Tommy Rey - Amor en Llamas (1996) [Flac]" }			
		,{ id: "la-cumbia-sa-za...sabor-1998_202104",				name: "La Cumbia - Sa, Za...Sabor! (1998) [WAVE]" }		
		,{ id: "la-cumbia-re-chapita-1999-228",					name: "La Cumbia - Re-Chapita (1999) [WAVE]" }
		,{ id: "la-cumbia-sabor-cumbia-y-nada-mas-2000_202104",			name: "La Cumbia - Sabor, Cumbia y Nada más (2000) [WAVE]" }
		,{ id: "la-cumbia-querias-cumbia-toma-2006-830",			name: "La Cumbia - ¿Querías Cumbia? Toma!!!! (2006) [WAVE]" }
		,{ id: "la-cumbia-no-es-lo-mismo-ni-es-igual-es-la-cumbia-2009",	name: "La Cumbia - No es lo mismo, ni es igual, es La Cumbia (2009) [WAVE]" }		
		,{ id: "la-rosa-perfume-de-cumbia-1999-284", 				name: "La Rosa - Perfume de Cumbia (1999) [WAVE]" }		
		,{ id: "la-sonora-dinamita-la-movida-de-la-cumbia-1998-flac",		name: "La Sonora Dinamita - La Movida de la Cumbia" }
		,{ id: "la-sonora-malecon-20-grandes-exitos-2000-312",			name: "La Sonora Malecón - 20 Grandes Exitos (2000) [WAVE]" }		
		,{ id: "los-charros-de-la-comuna-de-lumaco-bailemos-con-los-charros-2007-556",name: "Los Charros de la Comuna de Lumaco - Bailemos con los Charros (2007) [WAVE]" }
		,{ id: "los-fantasmas-del-caribe-caramelo-1993-447",			name: "Los Fantasmas Del Caribe - Caramelo (1993) [WAVE]" }		
		,{ id: "los-kuatreros-del-sur-el-baile-del-gusano-2009-530",		name: "Los Kuatreros del Sur - El Baile del Gusano (2009) [WAVE]" }
		,{ id: "los-kuatreros-del-sur-10-anos-de-trayectoria-2016",		name: "Los Kuatreros Del Sur - 10 Años De Trayectoria (2016) [Flac]" }			
		,{ id: "14.-let-love-rule",						name: "Lenny Kravitz - Greatest Hits" }
		,{ id: "xxxl-2012",							name: "La mejor música para tener sexo" }		
		,{ id: "la-cultura-de-la-basura-version-chilena",			name: "Los Prisioneros - La Cultura De La Basura (Versión chilena)" }
		,{ id: "los-mox",							name: "Los Mox - Todos los Discos" }			
		,{ id: "0155_led_zeppelin_led_zeppelin_1969__mlib",			name: "Led Zeppelin - Led Zeppelin" }
		,{ id: "masters-of-hardcore-full-collection-of-series",			name: "Masters Of Hardcore - Full Collection Of Series" }
		,{ id: "megaherz-discography",						name: "Megaherz - Discography" }
		,{ id: "megapuesta-de-chile-pal-mundo-2016-486",			name: "Megapuesta - De Chile Pal' Mundo" }/*no subido*/
		,{ id: "playlisthifi", 							name: "Metal PlayList CD1" } 
		,{ id: "hificollectionp2",						name: "Metal PlayList CD2" }				
		,{ id: "fixxxer_202105",						name: "Metallica - Reload" }
		,{ id: "blackalbum_202304", 						name: "Metallica - Black Album" }
		,{ id: "BeyondMagneticEP",						name: "Metallica - Beyond Magnetic" }
		,{ id: "MetallicaMOP",							name: "Metallica - Master Of Puppets" }
		,{ id: "02-the-four-horsemen-metallica-1983",				name: "Metallica - Kill 'Em All [FLAC]" }
		,{ id: "metallica_...-and-justice-for-all",				name: "Metallica - ...And Justice For All [FLAC]"}
		,{ id: "modern-talking-brother-louie-special-long-version",		name: "Modern Talking - Brother Louie ( Special Long Version)" }
		,{ id: "oceanica-2021",							name: "Musica Ambiental - Grupo Oceanica" }
		,{ id: "spa-massage-2019",						name: "Musica para Masajes & SPA" }
		,{ id: "n1fearedwolfxrmf_20211121_1921",				name: "Miley Cyrus Discography" }		
		,{ id: "mission-impossible_202111",					name: "Mission Impossible" }		
		,{ id: "mister-gato-los-senores-de-la-cumbia-1999",			name: "Mister Gato – Los Señores De La Cumbia (1999)" }					
		,{ id: "nirvana_bootlegs_202004",					name: "Nirvana - Bootlegs" }		 
		,{ id: "downer_202105", 						name: "Nirvana - Bleach" }
		,{ id: "Nirvana2002CD", 						name: "Nirvana - Black" }
		,{ id: "a-lo-cubano-album",						name: "Orishas - A lo cubano" }		 
		,{ id: "cosita-buena-album",						name: "Orishas - Cosita Buena" }
		,{ id: "BlizzardOfOzz",							name: "Ozzy Osbourne - Blizzard of Ozz" }
		,{ id: "London_Philharmonic_Orchestra-cinema_broadway_gold",		name: "Orchestra Philharmonic by London - Cinema & Broadway Gold" }
		,{ id: "orquesta-huambaly-20-grandes-exitos-1995-677",			name: "Orquesta Huambaly - 20 Grandes Éxitos (1995) [Flac]" }						
		,{ id: "07-silly-love-songs",						name: "Paul McCartney - All The Best" }
		,{ id: "07.-us-and-them_202311",					name: "Pink Floyd - The Dark Side Of The Moon" }
		,{ id: "06.-mother",							name: "Pink Floyd - The Wall Vol.01" }
		,{ id: "06.-comfortably-numb_202311",					name: "Pink Floyd - The Wall Vol.02" }
		,{ id: "PinkFloyd_WelcometotheMachine_NY_2jul77",			name: "Pink Floyd - Welcome to the Machine" }
		,{ id: "PinkFloyd03FatOldSun",						name: "Pink Floyd - Labyrinths" }
		,{ id: "06-prince-purple-rain",						name: "Prince - The Very Best" }
		,{ id: "ahora_si_ke_si",						name: "Palmas arriba - Ahora si que sí" }
		,{ id: "pastor-lopez-16-exitos-vol.-2-1996-625",			name: "Pastor Lopez - 16 Exitos Vol. 2 (1996) [Flac]" }		
		,{ id: "pitbull-discography",						name: "Pitbull Discography" }
		,{ id: "proyecto-power-cumbia-power-2015-396",				name: "Proyecto Power - Cumbia Power (2015) [Flac]" }			
		,{ id: "01-bohemian-rhapsody_202404",					name: "Queen - Greatest Hits I" }
		,{ id: "06-innuendo",							name: "Queen - Greatest Hits II" }
		,{ id: "06-you-dont-fool-me",						name: "Queen - Greatest Hits III" }
		,{ id: "rafaga-vuela-2004-456",						name: "Ráfaga - Vuela (2004) [WAVE]" }
		,{ id: "rafaga-una-cerveza-2016-965",					name: "Ráfaga - Una Cerveza (2016) [WAVE]" }		
		,{ id: "11-rbd-salvame", 						name: "Rebelde RBD (2004)" }			
		,{ id: "06.-dont-go-back-to-rockville",					name: "R.E.M - The Best Of" }
		,{ id: "15-dani-california-jerry-comann-remix",				name: "Red Hot Chili Peppers - Extended & Remixes Vol.01" }
		,{ id: "26-if-you-have-to-ask-the-disco-krisco-mix",			name: "Red Hot Chili Peppers - Extended & Remixes Vol.02" }
		,{ id: "50-freaky-styley-extended-red-hot-chili-peppers-p-funk-all-stars",name: "Red Hot Chili Peppers - Extended & Remixes Vol.03" }
		,{ id: "0901_red_hgot_chili_peppers_californication_1999__mlib",	name: "Red Hot Chili Peppers - Californication [FLAC]"}
		,{ id: "rihanna-dont_stop_the_music-vinyl-2007",			name: "Rihanna - Don't Stop The Music Remixes" }
		,{ id: "05.-sing-this-all-together-see-what-happens",			name: "Rolling Stones - Their Satanic Majesties Request 1967" }
		,{ id: "Radiohead_2018-07-11", 						name: "Radiohead Live - Madison Square Garden" }
		,{ id: "Raggamufin",							name: "Raggamufin" }		
		,{ id: "RammsteinBest",							name: "Rammstein - Lo Mejor" }			
		,{ id: "SehnsuchtFlack", 						name: "Rammstein - Sehnsucht" }
		,{ id: "RammsteinHerzeleidFlac",					name: "Rammstein - Herzeleid" }
		,{ id: "RammsteinRaritaten",						name: "Rammstein - Raritäten" }
		,{ id: "MutterFlac",							name: "Rammstein - Mutter" }
		,{ id: "RammsteinReiseReiseFlac",					name: "Rammstein - Reise, Reise" }
		,{ id: "RammCollection",						name: "Rammstein - Składanka" }
		,{ id: "RammsteinUntitled",						name: "Rammstein - Untitled" }
		,{ id: "rammsteinxxiklavier",						name: "Rammstein - XXI - Klavier" }
		,{ id: "RammsteinZeit2022",						name: "Rammstein - Zeit" }
		,{ id: "santaferia-y-otros-artistas-coleccion-la-gran-cumbia-2010",	name: "Santaferia - Colección La Gran Cumbia (2010) [WAVE]" }		
		,{ id: "sebastian-un-grande-1990-300",					name: "Sebastián - Un grande (1990) [WAVE]" }							
		,{ id: "sebastian-megamix-24-super-hits-2010-907",			name: "Sebastián - Megamix" }		
		,{ id: "07-troy",							name: "Sinead O' Connor - So Far...The Best Of" }
		,{ id: "simpy_red-picture_book-vinyl-1985",				name: "Simply Red - Picture Book" }
		,{ id: "gemini_202105",							name: "Slayer - Undisputed Attitude" }				 		 
		,{ id: "10-seasons-in-the-abyss",					name: "Slayer Seasons In The Abyss" }
		,{ id: "slipknot_1999",							name: "Slipknot - Slipknot" }
		,{ id: "adderall-instrumental",						name: "Slipknot - Adderall" }
		,{ id: "iowa_album",							name: "Slipknot - Iowa" }
		,{ id: "loyw_fanmade",							name: "Slipknot - Look Outside Your Window" }
		,{ id: "the-end-so-far_202209",						name: "Slipknot - The End, So Far" }
		,{ id: "thegraychapter",						name: "Slipknot - The Gray Chapter" }
		,{ id: "06-walking-on-the-moon-the-police",				name: "Sting & The Police - The Very Best" }		
		,{ id: "super-techno-discothek-vol.1-25-1995",				name: "Super Techno Discothek Vol.1-25 (1995)" }		
		,{ id: "SystemOfaDownCollection",					name: "System Of a Down (Full Discography Collection 1998 - 2005)" }		
		,{ id: "system_of_a_down_1998",						name: "System Of A Down - 1998 - System Of A Down" }
		,{ id: "toxicity_202301",						name: "System Of A Down - 2001 - Toxicity" }
		,{ id: "16-streamline",							name: "System of a Down - 2002 - Steal this album" }
		,{ id: "02-byob",							name: "System of a Down - 2005 - Mezmerize" }
		,{ id: "08.-holy-mountains",						name: "System of a Down - 2005 - Hypnotize" }			
		,{ id: "let-it-happen", 						name: "Tame Impala - Currents" }
		,{ id: "04.-shout",							name: "Tears For Fears - Greatest Hits" }
		,{ id: "21-hey-jude_202404",						name: "The Beatles - Beatles 1" }
		,{ id: "23-a-day-in-the-life_202404",					name: "The Beatles - Love" }
		,{ id: "15-the-police-wrapped-around-your-finger",			name: "The Police - Greatest Hits" }
		,{ id: "the-cure-greatest-hits-cdrip-bubanee",				name: "The Cure - Greatest Hits" }
		,{ id: "the-offspring-let-the-bad-times-roll-2021",			name: "The Offspring - Let The Bad Times Roll" }		 
		,{ id: "02-declaracion-de-principios",					name: "Tiro de Gracia - 2003 - Patron del Vicio" }
		,{ id: "03-suen-os",							name: "Tiro de Gracia - 2001 - Retorno de misericordia" }
		,{ id: "10-vagabundo",							name: "Tiro de Gracia - 1999 - Decision" }
		,{ id: "20-leyenda-negra",						name: "Tiro de Gracia - 1997 - Ser Humano !!" }
		,{ id: "vikings-5-iconos-kitsch-2006-777",				name: "Vikings 5 - Iconos Kitsch (2006) [Flac]" }		
		,{ id: "vikings-5-35-anos-de-exitos-2005-573",				name: "Vikings 5 - 35 Años De Éxitos (2005) [WAVE]" }
		,{ id: "vikings-5-coleccion-platino-2013-537",				name: "Vikings 5 - Colección Platino (2013) [Flac]" }			
		,{ id: "VengaBoys-ThePartyAlbum",					name: "VengaBoys - The Party Album 1998" }		
		,{ id: "VengaBoys-ThePlatinumAlbum",					name: "VengaBoys - The Platinum Album 2001" }			
		,{ id: "yazoo-situation-1990",						name: "Yazoo - Situation" }
		,{ id: "Yazoo-TheBestOfYazoo",						name: "Yazoo - The Best Of Yazoo" }
		,{ id: "yerba-brava-20-grandes-exitos-2007-39",				name: "Yerba Brava - 20 Grandes Éxitos" }
		,{ id: "", name: "" }
		,{ id: "100-disco-va-2001-wav",						name: "100% Musica Disco<br>VA 2001" }
		,{ id: "02-elvis-crespo-victor-manuelle-el-cuerpo-me-pide",		name: "Victor Manuelle<br>30 Años 30 Exitos" }
		,{ id: "80s-love-2014-flac",						name: "80's Love<br>2014" }
		,{ id: "6-rosas-rojas",							name: "Alejandra Guzmán<br>12 Grandes Exitos" }
		,{ id: "amar-azul-con-amor-1993_202308",				name: "Amar Azul<br>Con Amor"}
		,{ id: "amar-azul-dime-tu-1996_202308",					name: "Amar Azul<br>Dime Tú" }
		,{ id: "amar-azul-cumbia-nena-1998-flac",				name: "Amar Azul<br>Cumbia Nena" }
		,{ id: "10.-le-falta-luz",						name: "Amar Azul<br>Inmenso" }
		,{ id: "10.-no-te-olvides-de-mi_202302",				name: "Amar Azul<br>Lo Mejor de lo Mejor" }
		,{ id: "amanda-miguel-16-kilates-musicales",				name: "Amanda Miguel<br>16 Kilates Musicales" }
		,{ id: "09.-matame",							name: "Ana Bárbara<br>Te Atraparé... Bandido" }
		,{ id: "06-ana-barbara-ya-me-encontraste_202301",			name: "Ana Bárbara<br>Los Besos No Se Dan En La Camisa" }
		,{ id: "08-me-voy-a-emborrachar",					name: "Antonio Ríos<br>El Maestro" }
		,{ id: "absolute-rock-ballads-classics-2001-flac",			name: "Absolute Rock Ballads Classics<br>1CD" }
		,{ id: "absolute-rock-ballads-classics-2cds-2001",			name: "Absolute Rock Ballads Classics<br>2CD" }		
		,{ id: "08-esa-chica-es-para-mi-can-a-brava_20230128",			name: "Caña Brava<br>En su mejor momento" }
		,{ id: "al-bano-romina-power-grandes-exitos",				name: "Al Bano & Romina Power<br>Grandes Exitos" }
		,{ id: "08-alex-ubago-despertar",					name: "Alex Ubago<br>Fantasia o Realidad" }
		,{ id: "belinda-2004-wav",						name: "Belinda<br>2004" }
		,{ id: "12.-que-paso",							name: "Bersuit Vergarabat<br>Libertinaje" }
		,{ id: "bersuit-vergarabat-de-la-cabeza-con-bersuit-vergarabat-9",	name: "Bersuit Vergarabat<br>De La Cabeza" }
		,{ id: "vilma-palma-e-vampiros-grandes-exitos-wav",			name: "Vilma Palma E Vampiros<br>Grandes Exitos" }
		,{ id: "06-britney-spears-from-the-bottom-of-my-broken-heart",		name: "Britney Spears<br>Baby One More Time" }
		,{ id: "03.-show-me-the-meaning-of-being-lonely",			name: "Backstreet Boys<br>Millennium" }
		,{ id: "backstreet-boys_202302",				 	name: "Backstreet Boys<br>Backstreets Back" }
		,{ id: "backstreet-boys_20220325_1132", 		 		name: "Backstreet Boys<br>Never Gone" }
		,{ id: "backstreet-boys_20220325_1138", 		 		name: "Backstreet Boys<br>Unbreakable" }
		,{ id: "05-luis-miguel-te-extrano",					name: "Luis Miguel<br>Romance" }
		,{ id: "luis-miguel-romances-cd", 					name: "Luis Miguel<br>Romances" }
		,{ id: "08-bravo-amor-bravo_202403", 					name: "Luis Miguel<br>Cómplices" }				
		,{ id: "08-el-dia-que-me-quieras", 					name: "Luis Miguel<br>Mis Boleros Favoritos" }
		,{ id: "09-romances-medley-live_20240319", 				name: "Luis Miguel<br>Vivo" }
		,{ id: "02-te-desea-muy-felices-fiestas", 				name: "Luis Miguel<br>Navidades" }
		,{ id: "15-mi-ciudad", 							name: "Luis Miguel<br>México en la Piel" }
		,{ id: "08-bravo-amor-bravo", 						name: "Luis Miguel<br>Busca una Mujer" }
		,{ id: "01-cafe-tacuba-noche-oscura", 					name: "Cafe Tacvba<br>Cafe Tacvba" }
		,{ id: "15-callados-con-angela-carrasco", 				name: "Camilo Sesto<br>20 Súper Éxitos" }
		,{ id: "02.-quimeras-2", 						name: "Charlie Zaa<br>Sentimientos" }
		,{ id: "04-atado-a-tu-amor", 						name: "Chayanne<br>Atado a tu Amor" }
		,{ id: "chayanne-volver-a-nacer-1996", 					name: "Chayanne<br>Volver A Nacer" }
		,{ id: "02.-creedence-clearwater-revival-i-put-a-spell-on-you",		name: "Creedence Clearwater<br>Revival" }
		,{ id: "02-mi-eterno-amor-secreto_202307", 				name: "Olga Tañón<br>Como olvidar... Lo mejor de" }
		,{ id: "01-mayonesa_202305", 						name: "Chocolate 2000<br>Grandes Exitos" }
		,{ id: "chicago-exitos", 						name: "Chicago<br>Exitos" }
		,{ id: "deep-purple-2cds-infinite-the-gold-edition-2017",		name: "Deep Purple<br>Infinite The Gold Edition" }
		,{ id: "07-it-s-no-good", 						name: "Depeche Mode<br>The best of" }
		,{ id: "david-guetta-apl.-de-ap-will.i.am-on-the-dancefloor", 		name: "David Guetta" }
		,{ id: "debbie-gibson-32.-we-could-be-together-live-mix_202305", 	name: "Debbie Gibson ⭐<br>Electric Youth" }
		,{ id: "14-mourir-aupr-de-mon-amour", 					name: "Demis Roussos<br>Greatest Hits" }
		,{ id: "shakira-donde-estan-los-ladrones", 				name: "Shakira<br>Dónde Están Los Ladrones" }
		,{ id: "05.-amada-amante", 						name: "Eddie Santiago<br>Cada vez Otra vez" }
		,{ id: "eddie-santiago-...sigo-atrevido-1988", 				name: "Eddie Santiago<br>...Sigo Atrevido!" }
		,{ id: "05-elvis-crespo-princesita", 					name: "Elvis Crespo<br>Suavemente" }
		,{ id: "antologia-2000-flac", 						name: "Enanitos Verdes<br>Antología" }
		,{ id: "erasure-pop-the-first-20-hits", 				name: "Erasure<br>Pop! The First 20 Hits" }
		,{ id: "eros-ramazzotti-todo-historias-1993-flac", 			name: "Eros Ramazzotti<br>Todo Historias" }
		,{ id: "11.-whisper", 							name: "Evanescence<br>Fallen" }
		,{ id: "03-foreigner-with-heaven-on-our-side", 				name: "Foreigner<br>The Very Best... And Beyond" }
		,{ id: "fey-20-exitos-originales-2005", 				name: "Fey<br>20 Exitos Originales" }
		,{ id: "01-git-es-por-amor", 						name: "Git<br>El Álbum" }
		,{ id: "gloria-estefan-mi-tierra-1993-wav",	 			name: "Gloria Estefan<br>Mi Tierra" }
		,{ id: "gondwana-sentimiento-original-extended-version", 		name: "Gondwanna<br>Éxitos" }
		,{ id: "06.-gondwana-jah-children", 					name: "Gondwanna<br>Ras Portraits" }
		,{ id: "gondawana-second-coming",   					name: "Gondwanna<br>Second Coming" }		
		,{ id: "05.-primer-tren-a-marte-gianluca-grignani",	 		name: "Gianluca Grignani<br>Destino Paraíso" }
		,{ id: "05-ven-chiquilla", 						name: "Grupo Alegria<br>Bribabai" }
		,{ id: "17.-green-day-21-guns-usre-10900679_20240324", 			name: "Green Day<br>Greatest Hits" }
		,{ id: "haddaway-1993-wav", 						name: "Haddaway<br>Haddaway" }
		,{ id: "01-jose-luis-perales-y-te-vas", 				name: "José Luis Perales<br>Mis Mejores 17 Canciones" }
		,{ id: "02-juanes-es-por-ti", 						name: "Juanes<br>Un día Normal" }
		,{ id: "02.-para-ser-eterno", 						name: "Juanes<br>Fijate Bien" }
		,{ id: "10-ultima-vez", 						name: "Julieta Venegas<br>Limón y Sal" }
		,{ id: "jon-secada-solo-lo-mejor-20-exitos-2002-flac", 			name: "Jon Secada<br>Solo Lo Mejor 20 Exitos" }
		,{ id: "kaoma-worldbeat-wav", 						name: "Kaoma<br>Worldbeat" }
		,{ id: "07.-simplemente-amigos", 					name: "Karla<br>Colección De Oro" }
		,{ id: "karla-la-rompecorazones-1996-flac", 				name: "Karla<br>La Rompecorazones" }
		,{ id: "01-con-tu-amor", 						name: "Karla<br>Grandes Éxitos" }
		,{ id: "02-lagrimas-por-lagrimas", 					name: "Karla<br>Lágrimas por Lágrimas" }
		,{ id: "01-escapar", 							name: "Kudai<br>Grandes Éxitos" }
		,{ id: "13.-a-veces_202304", 						name: "La Ley<br>Prisioneros de la Piel" }
		,{ id: "01.-animal", 							name: "La Ley<br>Invisible" }
		,{ id: "la-ley-unplugged-2001_202312", 					name: "La Ley<br>Unplugged" }
		,{ id: "10-al-final", 							name: "La Ley<br>Uno" }
		,{ id: "la-noche-amor-entre-sabanas-2006-flac", 			name: "La Noche<br>Amor Entre Sabanas" }
		,{ id: "la-noche-en-tu-cuarto-2008_202309", 				name: "La Noche<br>En tu Cuarto" }
		,{ id: "lenny-kravitz-you-were-in-my-heart", 				name: "Lenny Kravitz<br>Lenny" }
		,{ id: "los-autenticos-decadentes-sigue-tu-camino", 			name: "Los Auténticos Decadentes<br>Sigue tu camino" }
		,{ id: "04-el-pajaro-vio-el-cielo-y-se-volo",	 			name: "Los Auténticos Decadentes<br>Mi vida loca" }
		,{ id: "hoobastank-96", 						name: "Hoobastank<br>Hoobastank" }
		,{ id: "12-la-bouche-fallin-in-love-spike-mix", 			name: "La Bouche<br>Sweet Dreams" }
		,{ id: "01-la-quinta-estacion-algo-mas", 				name: "La Quinta Estación<br>Personalidad" }
		,{ id: "la-quinta-estacion-el-mundo-se-equivoca", 			name: "La Quinta Estación<br>El mundo se equivoca" }
		,{ id: "la-mosca-tse-tse-visperas-de-carnaval-1999", 			name: "La Mosca Tse Tse<br>Vísperas de carnaval" }
		,{ id: "12.-emergencia-de-amor", 					name: "Laura Pausini<br>Volveré junto a ti" }
		,{ id: "cumbia-los-angeles-azules-inolvidables-2000", 			name: "Los Angeles Azules<br>Inolvidables" }
		,{ id: "07-la-mujer-de-los-dos", 					name: "Los Temerarios<br>Sueño De Amor" }
		,{ id: "08.-mi-secreto_202303", 					name: "Los Temerarios<br>Tu Última Canción" }
		,{ id: "11-lou-bega-the-trumpet-part-ii", 				name: "Lou Bega<br>A little bit of mambo" }
		,{ id: "09-marco-antonio-solis-si-no-te-hubieras-ido", 			name: "Marco Antonio Solís<br>La Historia Continúa..." }
		,{ id: "12-marco-antonio-solis-sera-mejor-que-te-vayas",		name: "Marco Antonio Solís<br>La Historia Continúa 2." }
		,{ id: "11-melendi-de-repente-desperte", 				name: "Melendi<br>Lagrimas Desordenadas" }
		,{ id: "04-melendi-saraluna_20230412", 					name: "Melendi<br>Un alumno más" }
		];	

  const menu = document.getElementById("menu");
  menu.innerHTML = ""; // Limpiar menú

  //Filtra colección con solo los que comiencen con la letra elejida
  //const filteredCollections = collections.filter(item => item.name.startsWith(letra));
  
  //Aparte de Filtrar con letra, los ordena alfabeticamente
	const filteredCollections = collections
	     .filter(item => item.name.startsWith(letra))
	     .sort((a, b) => a.name.localeCompare(b.name));  
		
  for (const collection of filteredCollections) {
	const thumbnails = await fetchThumbnails(collection.id);

	thumbnails.forEach(file => {
	  const menuItem = document.createElement("div");
	  menuItem.className = "menu-item";
	  menuItem.innerHTML = `		
		<a href="reproduce.html?id=${collection.id}&name=${collection.name}">
			<img src="https://archive.org/download/${collection.id}/${file.name}" alt="${collection.name}">
		</a>
		${collection.name}
	  `;
	  menuItem.onclick = () => {
		//alert(`Has seleccionado: ${collection.id}`)
		menuItem.styleName = "menu-item2";
	  };
	  menu.appendChild(menuItem);
	});
  }

  if (menu.innerHTML === "") {
	menu.innerHTML = "<p>No se encontraron carátulas.</p>";
  }
}

// Llamar a la función para generar el menú
generateMenu();
