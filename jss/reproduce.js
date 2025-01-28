// Obtener parámetros de la URL
    const params = new URLSearchParams(window.location.search);
	const collectionId = params.get("id"); // Obtener el parámetro 'id'  
	const collectionName = params.get("name"); // Obtener el parámetro 'name'   
	
    const apiUrl = `https://archive.org/metadata/${collectionId}`;
    const songList = document.getElementById("songList");
    const audioPlayer = document.getElementById("audioPlayer");

    // Mostrar el valor en el título
	const huno = document.getElementById("titulo");
	if (huno) {
      huno.textContent = collectionName;
    } else {
      huno.textContent = "Rockola Virtual";
    }

	//Input oculto para saber el total de canciones cargadas;
	const tot = document.getElementById("totalsong");
	tot.value = 0;

    let playlist = []; // Lista de canciones
    let currentIndex = 0; // Índice de la canción actual

   /* =========================================================================
      === CODIGO QUE CARGA TODAS LAS EXTENSIONES QUE SE FILTRAN (.mp3 y .flac)
	  =========================================================================
    // Obtener canciones de la API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
		const files = data.files.filter(file => 
		  file.name.endsWith(".mp3") || file.name.endsWith(".flac")
		); // Filtrar solo archivos MP3 y FLAC

        if (files.length > 0) {
          songList.innerHTML = ""; // Limpiar lista

          files.forEach((file, index) => {
            const li = document.createElement("li");
            const button = document.createElement("button");
			//button.width = "100%";
            button.textContent = file.title || file.name; // Usar título o nombre del archivo
			button.id = "btn_" + index;
            button.onclick = () => playSong(index);
            li.appendChild(button);
            songList.appendChild(li);

            // Agregar canción a la playlist
            playlist.push({
              name: file.title || file.name,
              url: `https://archive.org/download/${collectionId}/${file.name}`
            });
			tot.value = index + 1;
          });
		  
        } else {
          songList.innerHTML = "<li>No se encontraron canciones.</li>";
        }
      })
      .catch(error => {
        console.error("Error al cargar canciones:", error);
        songList.innerHTML = "<li>Error al cargar las canciones.</li>";
      });
    ======================================================================= */
	
	// Obtener canciones de la API, priorizando los .mp3, si no hay, carga los .flac, si es que existen
	fetch(apiUrl)
	  .then(response => response.json())
	  .then(data => {
		// Filtrar archivos por extensión
		const mp3Files = data.files.filter(file => file.name.toLowerCase().endsWith(".mp3"));
		const flacFiles = data.files.filter(file => file.name.toLowerCase().endsWith(".flac"));

		// Elegir qué extensión cargar (MP3 tiene prioridad)
		const files = mp3Files.length > 0 ? mp3Files : flacFiles;

		if (files.length > 0) {
		  songList.innerHTML = ""; // Limpiar lista

		  files.forEach((file, index) => {
			const li = document.createElement("li");
			const button = document.createElement("button");
			button.textContent = (index+1) + ".- " +  (file.title || file.name); // Usar título o nombre del archivo
			button.id = "btn_" + index;
			button.onclick = () => playSong(index);
			li.appendChild(button);
			songList.appendChild(li);

			// Agregar canción a la playlist
			playlist.push({
			  name: file.title || file.name,
			  url: `https://archive.org/download/${collectionId}/${file.name}`
			});
			tot.value = index + 1;
		  });
		} else {
		  songList.innerHTML = "<li>No se encontraron canciones.</li>";
		}
	  })
	  .catch(error => {
		console.error("Error al cargar canciones:", error);
		songList.innerHTML = "<li>Error al cargar las canciones.</li>";
	  });
	  
	// Desactiva todos los botones
	function desactivabtns(){
		// Crear un array con los índices del 0 al 21
		const indices = document.getElementById("totalsong").value;
		for (let i = 0; i <= indices - 1; i++) {
		  document.getElementById("btn_" + i).classList.remove("active");
		}
	}
	
    // Reproducir canción por índice
    function playSong(index) {	  
      currentIndex = index;
      audioPlayer.src = playlist[currentIndex].url;
	  songName.textContent = `Reproduciendo: ` + (currentIndex+1) + ".- " +  playlist[currentIndex].name;	  
      audioPlayer.play();
	  
	  //desactivabtns();	
	  const indices = document.getElementById("totalsong").value;
	  for (let i = 0; i <= indices - 1; i++) {
	    document.getElementById("btn_" + i).classList.remove("active");
	  }	  
	  //alert(indices);
	  document.getElementById("btn_" + index).classList.add("active");
    }

    // Reproducir siguiente canción al finalizar
    audioPlayer.addEventListener("ended", () => {
      currentIndex = (currentIndex + 1) % playlist.length; // Avanzar y reiniciar al final
      playSong(currentIndex);
    });
	
	// Limpiar el nombre de la canción cuando se pausa la reproducción
	audioPlayer.addEventListener("pause", () => {
	  if (audioPlayer.currentTime !== audioPlayer.duration) {
		songName.textContent = `Reproduciendo: `; // Limpia el texto del nombre
	  }
	});
	
	// Evento Play
	audioPlayer.addEventListener("play", () => {
	  if (audioPlayer.currentTime !== 0) { // Verifica que no sea el inicio del audio
		songName.textContent = `Reproduciendo: ` + playlist[currentIndex].name;
	  }
	});	
