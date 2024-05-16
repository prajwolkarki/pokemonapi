    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const pokemonName = document.getElementById('pokemon-name');
    const pokemonId = document.getElementById('pokemon-id');
    const weight = document.getElementById('weight');
    const height = document.getElementById('height');
    const types = document.getElementById('types');
    const hp = document.getElementById('hp');
    const attack = document.getElementById('attack');
    const defense = document.getElementById('defense');
    const specialAttack = document.getElementById('special-attack');
    const specialDefense = document.getElementById('special-defense');
    const speed = document.getElementById('speed');

    searchButton.addEventListener('click', searchPokemon);

    async function searchPokemon() {
      const query = searchInput.value.toLowerCase();
      const pokemonData = await fetchPokemonData(query);

      if (!pokemonData) {
        alert('Pokémon not found');
        return;
      }

      pokemonName.textContent = pokemonData.name.toUpperCase();
      pokemonId.textContent = `#${pokemonData.id}`;
      weight.textContent = `Weight: ${pokemonData.weight}`;
      height.textContent = `Height: ${pokemonData.height}`;
      types.innerHTML = '';
      pokemonData.types.forEach(type => {
        const typeElement = document.createElement('span');
        typeElement.textContent = type.type.name.toUpperCase();
        types.appendChild(typeElement);
      });
      hp.textContent = pokemonData.stats[0].base_stat;
      attack.textContent = pokemonData.stats[1].base_stat;
      defense.textContent = pokemonData.stats[2].base_stat;
      specialAttack.textContent = pokemonData.stats[3].base_stat;
      specialDefense.textContent = pokemonData.stats[4].base_stat;
      speed.textContent = pokemonData.stats[5].base_stat;

      const spriteElement = document.getElementById('sprite');
      if (spriteElement) {
        spriteElement.remove();
      }
      const img = document.createElement('img');
      img.id = 'sprite';
      img.src = pokemonData.sprites.front_default;
      document.body.appendChild(img);
    }

    async function fetchPokemonData(query) {
      try {
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return null;
      }
    }