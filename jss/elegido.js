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
		 { id: "300-christmas-songs_202305",					name: "300 Christmas Songs" }
		,{ id: "03-whats-up_202307",					    	name: "4 Non Blondes - Bigger, Better, Faster, More!" }
		,{ id: "Get-Rich-or-Die-Tryin-42069",					name: "50 Cent - Get Rich or Die Tryin'" } 
		,{ id: "08-all-you-zombies-album-version",				name: "80s Rock - The Essential" }
		,{ id: "007.-robert-miles-fable-dream-version",				name: "90's Eurodance Part III" } 
		,{ id: "02-shoot-to-thrill_202307",					name: "ACDC - Back In Black" }
		,{ id: "acdc-the-razors-edge",						name: "AC/DC - The Razors Edge" }		 
		,{ id: "aerosmith-tough-love-the-best-of-the-ballads", 			name: "Aerosmith - Tough Love" }		
		,{ id: "15.-livin-on-the-edge",						name: "Aerosmith - Big Ones" }
		,{ id: "02-i-dont-want-to-miss-a-thing-pop-mix",			name: "Aerosmith - I Don't Want To Miss a Thing" }
		,{ id: "albertocortezargentina",					name: "Alberto Cortez - Argentina" }
		,{ id: "03.-rooster_202307",						name: "Alice In Chains - Greatest Hits" }
		,{ id: "11-frogs_20210521",						name: "Alice.In Chains - MTV Unplugged" }		 
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
		,{ id: "03.-darlington-county",						name: "Bruce Springsteen - Born In The U.S.A" }
		,{ id: "12.-human-touch",						name: "Bruce Springsteen - Greatest Hits" }
		,{ id: "14-everything-i-do-i-do-it-for-you",				name: "Bryan Adams - Anthology Vol.01" }
		,{ id: "06-lets-make-a-night-to-remember",				name: "Bryan Adams - Anthology Vol.02" }
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
		,{ id: "daft-punk-homework",						name: "Daft Punk - Homework 1997" } 
		,{ id: "12.-diamond-dogs",						name: "David Bowie - The Platinum Collection Vol.01" }
		,{ id: "05.-john-im-only-dancing-again",				name: "David Bowie - The Platinum Collection Vol.02" }
		,{ id: "13.-loving-the-alien",						name: "David Bowie - The Platinum Collection Vol.03" }
		,{ id: "07-b-3-river-deep-mountain-high",				name: "Deep Purple - The Book of the taliesyn / taliesian" }
		,{ id: "deep_purple_-_deep_purple_vinyl_rip",				name: "Deep Purple - Deep Purple 1969" }
		,{ id: "07-deep-purple-child-in-time",					name: "Deep Purple - Essential [FLAC]" }
		,{ id: "deeppurplemachineheadoriginalrecordrip",			name: "Deep Purple - Machine Head" }
		,{ id: "beauty-school",							name: "Deftones - Diamond Eyes" }
		,{ id: "donna_summer-the_wanderer-vinyl_single-1980",			name: "Donna Summer - The Wanderer" }
		,{ id: "enanitosverdesargentina",					name: "Enanitos Verdes - Argentina" }
		,{ id: "euro-dance",							name: "Euro Dance - The Best" }
		,{ id: "03-carrie",							name: "Europe - Gold Vol.01" }
		,{ id: "06-sweet-love-child",						name: "Europe - Gold Vol.02" }
		,{ id: "14-yesterdays-news",						name: "Europe - Gold Vol.03" }
		,{ id: "edith_piaf-edith_piaf-vinyl-1972",				name: "Edith Piaf - Edith Piaf" }
		,{ id: "blues-away",							name: "Erasure - I Say I Say I Say" }
		,{ id: "take-me-out-of-myself",						name: "Erasure - World Be Gone" }
		,{ id: "eternal_202105",						name: "Evanescence - Origin" }
		,{ id: "never-going-back",						name: "Evanescence - Evanescence" }
		,{ id: "03-bridge-over-troubled-water-elvis-presley_202408",		name: "Elvis Presley - Greatest Hits" }		 
		,{ id: "fiesta-mixes",							name: "Fiestas Mixes" }
		,{ id: "varios-interpretes-fieston-tropical-1997",			name: "Fiesta Tropical" }						
		,{ id: "these-days",							name: "Foo Fighters - Wasting Light" }
		,{ id: "06-living-on-my-own-roger-s-mix",				name: "Freddie Mercury - Remixes" }
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
		,{ id: "14.-let-love-rule",						name: "Lenny Kravitz - Greatest Hits" }
		,{ id: "la-cultura-de-la-basura-version-chilena",			name: "Los Prisioneros - La Cultura De La Basura (Versión chilena)" }
		,{ id: "los-mox",							name: "Los Mox - Todos los Discos" }			
		,{ id: "0155_led_zeppelin_led_zeppelin_1969__mlib",			name: "Led Zeppelin - Led Zeppelin" }
		,{ id: "playlisthifi", 							name: "Metal PlayList CD1" } 
		,{ id: "hificollectionp2",						name: "Metal PlayList CD2" }				
		,{ id: "fixxxer_202105",						name: "Metallica - Reload" }
		,{ id: "blackalbum_202304", 						name: "Metallica - Black Album" }
		,{ id: "BeyondMagneticEP",						name: "Metallica - Beyond Magnetic" }
		,{ id: "MetallicaMOP",							name: "Metallica - Master Of Puppets" }
		,{ id: "02-the-four-horsemen-metallica-1983",				name: "Metallica - Kill 'Em All [FLAC]" }
		,{ id: "metallica_...-and-justice-for-all",				name: "Metallica - ...And Justice For All [FLAC]"}
		,{ id: "modern-talking-brother-louie-special-long-version",		name: "Modern Talking - Brother Louie ( Special Long Version)" }
		,{ id: "nirvana_bootlegs_202004",					name: "Nirvana - Bootlegs" }		 
		,{ id: "downer_202105", 						name: "Nirvana - Bleach" }
		,{ id: "Nirvana2002CD", 						name: "Nirvana - Black" }
		,{ id: "a-lo-cubano-album",						name: "Orishas - A lo cubano" }		 
		,{ id: "cosita-buena-album",						name: "Orishas - Cosita Buena" }
		,{ id: "BlizzardOfOzz",							name: "Ozzy Osbourne - Blizzard of Ozz" }
		,{ id: "07-silly-love-songs",						name: "Paul McCartney - All The Best" }
		,{ id: "07.-us-and-them_202311",					name: "Pink Floyd - The Dark Side Of The Moon" }
		,{ id: "06.-mother",							name: "Pink Floyd - The Wall Vol.01" }
		,{ id: "06.-comfortably-numb_202311",					name: "Pink Floyd - The Wall Vol.02" }
		,{ id: "PinkFloyd_WelcometotheMachine_NY_2jul77",			name: "Pink Floyd - Welcome to the Machine" }
		,{ id: "PinkFloyd03FatOldSun",						name: "Pink Floyd - Labyrinths" }
		,{ id: "06-prince-purple-rain",						name: "Prince - The Very Best" }
		,{ id: "ahora_si_ke_si",						name: "Palmas arriba - Ahora si que sí" }
		,{ id: "01-bohemian-rhapsody_202404",					name: "Queen - Greatest Hits I" }
		,{ id: "06-innuendo",							name: "Queen - Greatest Hits II" }
		,{ id: "06-you-dont-fool-me",						name: "Queen - Greatest Hits III" }
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
		,{ id: "07-troy",							name: "Sinead O' Connor - So Far...The Best Of" }
		,{ id: "06-walking-on-the-moon-the-police",				name: "Sting & The Police - The Very Best" }
		,{ id: "sebastian-megamix-24-super-hits-2010-907",			name: "Sebastián - Megamix" }
		,{ id: "simpy_red-picture_book-vinyl-1985",				name: "Simply Red - Picture Book" }
		,{ id: "gemini_202105",							name: "Slayer - Undisputed Attitude" }				 		 
		,{ id: "10-seasons-in-the-abyss",					name: "Slayer Seasons In The Abyss" }
		,{ id: "SystemOfaDownCollection",					name: "System Of a Down (Full Discography Collection 1998 - 2005)" }
		,{ id: "slipknot_1999",							name: "Slipknot - Slipknot" }
		,{ id: "adderall-instrumental",						name: "Slipknot - Adderall" }
		,{ id: "iowa_album",							name: "Slipknot - Iowa" }
		,{ id: "loyw_fanmade",							name: "Slipknot - Look Outside Your Window" }
		,{ id: "the-end-so-far_202209",						name: "Slipknot - The End, So Far" }
		,{ id: "thegraychapter",						name: "Slipknot - The Gray Chapter" }
		,{ id: "let-it-happen", 						name: "Tame Impala - Currents" }
		,{ id: "04.-shout",							name: "Tears For Fears - Greatest Hits" }
		,{ id: "21-hey-jude_202404",						name: "The Beatles - Beatles 1" }
		,{ id: "23-a-day-in-the-life_202404",					name: "The Beatles - Love" }
		,{ id: "15-the-police-wrapped-around-your-finger",			name: "The Police - Greatest Hits" }
		,{ id: "the-cure-greatest-hits-cdrip-bubanee",				name: "The Cure - Greatest Hits" }
		,{ id: "the-offspring-let-the-bad-times-roll-2021",			name: "The Offspring - Let The Bad Times Roll" }		 
		,{ id: "yazoo-situation-1990",						name: "Yazoo - Situation" }
		,{ id: "yerba-brava-20-grandes-exitos-2007-39",				name: "Yerba Brava - 20 Grandes Éxitos" }
		];	

  const menu = document.getElementById("menu");
  menu.innerHTML = ""; // Limpiar menú

  //Filtra colección con solo los que comiencen con la letra elejida
  const filteredCollections = collections.filter(item => item.name.startsWith(letra));
		
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
