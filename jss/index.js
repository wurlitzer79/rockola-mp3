      const container = document.querySelector(".alphabet-container");
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#";

      alphabet.split("").forEach(letter => {
        const button = document.createElement("button");
        button.textContent = letter;
        button.className = "alphabet-button";        
		//button.innerHTML = `<a href="index.html?valor=${letter}">${letter}</a>`;
		
        // Evento para mostrar un alert al hacer clic
        button.addEventListener("click", () => {
          //alert(`Has seleccionado la letra: ${letter}`);
			location.href = `elegido.html?valor=${letter}`;
        });

        container.appendChild(button);
      });
