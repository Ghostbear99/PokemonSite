window.onload = () => {
    const searchButton = document.getElementById('search-btn');
    const searchText = document.getElementById('search-input');
    const searchDiv = document.getElementById('search-div');
    const pokemonDiv = document.getElementById('pokemon-data-div');

    pokemonDiv.style.display = 'none';

    searchButton.onclick = () => {
        const pokemonName = searchText.value.toLowerCase();
        console.log(pokemonName);
        callAPI(pokemonName);

    }
    const callAPI = (pokemonName) => {
        $.ajax({url:'pokemon/' + pokemonName, success:function(res){
            if(!(res === 'error')){
                searchDiv.style.height = '20%';
                searchText.style.margin = '5% 0% 5% 20%';
        
                pokemonDiv.style.display = 'inline';
    
                wipeAbilities();
                wipeItems();
                wipeMoves();

                const pokemon = res;
                for (let i = 0; i < pokemon['abilities'].length; i++) {
                    let abilityId = pokemon.abilities[i].ability.url.split('/');
                    $.ajax({
                        url: 'pokemon/ability/' + abilityId[6], success: function (res) {
                            const ability = res;
                            const abilityName = ability.name;
                            const abilityEffect = ability.effect_entries[1].short_effect;
                            fillAbilities(abilityName, abilityEffect);
                        }
                    });
                }
                for (let i = 0; i < pokemon.held_items.length; i++) {
                    let itemName = pokemon.held_items[i].item.name;
                    $.ajax({
                        url: 'pokemon/item/' + itemName, success: function (res) {
                            const item = res;
                            const itemName = item.name;
                            const itemEffect = item.effect_entries[0].short_effect;
                            fillItemsHeld(itemName, itemEffect);
                        }
                    });
                }
                for (let i = 0; i < pokemon.moves.length; i++) {
                    let moveName = pokemon.moves[i].move.name;
                    $.ajax({
                        url: 'pokemon/move/' + moveName, success: function (res) {
                            const move = res;
                            const moveName = move.name;
                            const moveEffect = move.effect_entries[0].short_effect;
                            fillMoves(moveName, moveEffect);
                        }
                    });
                }
            } else {
                searchText.value = '';
                searchText.placeholder = 'That pokemon does not exist';
            }
        }});
    }
    const fillGeneral = () => {

    }
    const fillAbilities = (name, effect) => {
        const display = document.getElementById('pokemon-abilities');
        const div = document.createElement('div');
        const abilityTitle = document.createElement('h3');
        const abililityEffect = document.createElement('p');

        div.className = 'ability-container';

        const abilityTitleText = document.createTextNode(name);
        abilityTitle.appendChild(abilityTitleText);

        const abililityEffectText = document.createTextNode(effect);
        abililityEffect.appendChild(abililityEffectText);
        
        div.appendChild(abilityTitle);
        div.appendChild(abililityEffect);
        display.appendChild(div);
    }
    const fillItemsHeld = (name, effect) =>{
        const display = document.getElementById('pokemon-items');
        const div = document.createElement('div');
        const abilityTitle = document.createElement('h3');
        const abililityEffect = document.createElement('p');

        div.className = 'ability-container';

        const abilityTitleText = document.createTextNode(name);
        abilityTitle.appendChild(abilityTitleText);

        const abililityEffectText = document.createTextNode(effect);
        abililityEffect.appendChild(abililityEffectText);
        
        div.appendChild(abilityTitle);
        div.appendChild(abililityEffect);
        display.appendChild(div);
    }
    const fillMoves = (name, effect) => {
        const display = document.getElementById('pokemon-moves');
        const div = document.createElement('div');
        const abilityTitle = document.createElement('h3');
        const abililityEffect = document.createElement('p');

        div.className = 'moves-container';

        const abilityTitleText = document.createTextNode(name);
        abilityTitle.appendChild(abilityTitleText);

        const abililityEffectText = document.createTextNode(effect);
        abililityEffect.appendChild(abililityEffectText);
        
        div.appendChild(abilityTitle);
        div.appendChild(abililityEffect);
        display.appendChild(div);
    }
    const wipeAbilities = () => {
        var display = document.getElementById("pokemon-abilities");
        while (display.hasChildNodes()) {
            display.removeChild(display.firstChild);
        }
    }
    const wipeItems = () => {
        var display = document.getElementById("pokemon-items");
        while (display.hasChildNodes()) {
            display.removeChild(display.firstChild);
        }
    }
    const wipeMoves = () => {
            var display = document.getElementById("pokemon-moves");
            while (display.hasChildNodes()) {
                display.removeChild(display.firstChild);
        }
    }
}
