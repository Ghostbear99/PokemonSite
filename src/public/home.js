window.onload = () => {
    const searchButton = document.getElementById('search-btn');
    const searchText = document.getElementById('search-input');
    const searchDiv = document.getElementById('search-div');
    const pokemonDiv = document.getElementById('pokemon-data-div');
    const pokemonNameTitle = document.getElementById('pokemon-name');
    const moveText = document.getElementById('move-search-input')
    const moveSearch = document.getElementById('move-search-btn');
    const showAllMoves = document.getElementById('show-all-moves-btn');

    pokemonDiv.style.display = 'none';
    let pokemon = null;

    searchButton.onclick = () => {
        const pokemonName = searchText.value.toLowerCase();
        console.log(pokemonName);
        callGeneralAPI(pokemonName);

    }
    moveSearch.onclick = () => {
        let move = moveText.value.toLowerCase();
        const moveSplit = move.split(' ');
        if(moveSplit.length == 2){
            move = moveSplit[0] + '-' + moveSplit[1];
        }
        wipeMoves();
        callMoveAPI(move);
    }
    showAllMoves.onclick = () => {
        wipeMoves();
        getAllMoves();
    }
    const callGeneralAPI = (pokemonName) => {
        $.ajax({url:'pokemon/' + pokemonName, success:function(res){
            if(!(res === 'error')){
                searchDiv.style.height = '20%';
                searchText.style.margin = '5% 0% 5% 20%';
        
                pokemonDiv.style.display = 'inline';
    
                wipeAbilities();
                wipeItems();
                wipeMoves();
                wipeStatLeft();
                wipeStatRight();

                pokemon = res;
                pokemonName = res.name;
                pokemonNameTitle.innerText = (pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1));

                for(let i =0; i < pokemon.stats.length; i++){
                    pokemonStatName = pokemon.stats[i].stat.name;
                    pokemonStatBase = pokemon.stats[i].base_stat;
                    if(i%2 === 0){
                        fillStatLeft(pokemonStatName, pokemonStatBase);
                    }else{
                        fillStatRight(pokemonStatName, pokemonStatBase);
                    }
                }
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
                getAllMoves();
            } else {
                searchText.value = '';
                searchText.placeholder = 'That pokemon does not exist';
            }
        }});
    }
    const callMoveAPI = (move) => {
        $.ajax({
            url: 'pokemon/move/' + move, success: function (res) {
                if(!(res === 'error')){
                    const move = res;
                    const moveName = move.name;
                    const moveEffect = move.effect_entries[0].short_effect;
                    fillMoves(moveName, moveEffect);
                }else{
                    moveText.value = '';
                    moveText.placeholder = 'No move found'
                }
            }
        });
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
    const fillStatLeft = (name, base) => {
        const display = document.getElementById('stat-left');
        const stat = document.createElement('p');

        const pokemonName = name.charAt(0).toUpperCase() + name.slice(1);
        const statText = document.createTextNode(pokemonName + ': ' + base);
        stat.appendChild(statText);

        display.appendChild(stat);
    }
    const fillStatRight = (name, base) => {
        const display = document.getElementById('stat-right');
        const stat = document.createElement('p');

        const pokemonName = name.charAt(0).toUpperCase() + name.slice(1);
        const statText = document.createTextNode(pokemonName + ': ' + base);
        stat.appendChild(statText);

        display.appendChild(stat);
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
    const wipeStatLeft = () => {
        var display = document.getElementById("stat-left");
        while (display.hasChildNodes()) {
            display.removeChild(display.firstChild);
    }
    }
    const wipeStatRight = () => {
        var display = document.getElementById("stat-right");
        while (display.hasChildNodes()) {
            display.removeChild(display.firstChild);
    }
    }
    const getAllMoves = () => {
        for (let i = 0; i < pokemon.moves.length; i++) {
            let moveName = pokemon.moves[i].move.name;
            $.ajax({
                url: 'pokemon/move/' + moveName, success: function (res) {
                    const move = res;
                    console.log(move);
                    const moveName = move.name;
                    const moveEffect = move.effect_entries[0].short_effect;
                    fillMoves(moveName, moveEffect);
                }
            });
        }
    }
}
