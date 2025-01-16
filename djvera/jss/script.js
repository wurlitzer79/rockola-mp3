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

// Generar menú dinámico
async function generateMenu() {
  const collections = [
	{ id: "20.-talk",								name: "Coldplay Essentials" }
   ,{ id: "09.-susie-and-jeffrey_202408",			name: "Blondie The Essential Collection" }
   ,{ id: "09.-clint-eastwood",						name: "Gorillaz Greatest Songs" }
   ,{ id: "07.-clint-eastwood",						name: "Gorillaz Essentials" }
   ,{ id: "chep-1995-peor-es-mascar-lauchas",		name: "Chancho en Piedra Peor es Mascar Lauchas" }
   ,{ id: "chep-1997-la-dieta-del-lagarto",			name: "Chancho en Piedra La Dieta del Lagarto" }
   ,{ id: "chep-1998-rindanse-terricolas",			name: "Chancho en Piedra Rindanse Terricolas" }
   ,{ id: "chep-2000-marca-chancho",				name: "Chancho en Piedra Marca Chancho" }
   ,{ id: "chep-2002-el-tinto-elemento",			name: "Chancho en Piedra El Tinto Elemento" }
   ,{ id: "chep-2004-chancho-6",					name: "Chancho en Piedra Chancho 6" }
   ,{ id: "chep-2005-desde-el-batiscafo",			name: "Chancho en Piedra Desde el Batiscafo" }
   ,{ id: "chep-2007-grandes-exitos-de-ayer-y-oink",name: "Chancho en Piedra Grandes Exitos de Ayer y Oink" }
   
  ];

  const menu = document.getElementById("menu");
  menu.innerHTML = ""; // Limpiar menú

  for (const collection of collections) {
	const thumbnails = await fetchThumbnails(collection.id);

	thumbnails.forEach(file => {
	  const menuItem = document.createElement("div");
	  menuItem.className = "menu-item";
	  menuItem.innerHTML = `		
		<a href="reproduce2.html?id=${collection.id}&name=${collection.name}">
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