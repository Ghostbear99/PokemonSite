const express = require('express');
var Pokedex = require('pokedex-promise-v2');
const app = express();
var options = {
    protocol: 'https',
    hostName: 'pokeapi.co',
    versionPath: '/api/v2/',
    cacheLimit: 100 * 1000, // 100s
    timeout: 5 * 1000 // 5s
  }
  var P = new Pokedex(options);

const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/home.html');
})
app.get('/pokemon/:pokemonName', function(req, res){
    P.getPokemonByName(req.params.pokemonName, function(response, error) { // with callback
        if(error) {
          res.send('error');
          console.log(error);
        } else {
           res.send(response);
        }
      });
});
app.get('/pokemon/ability/:abilityId', function(req, res){
    P.resource('/api/v2/ability/' + req.params.abilityId)
        .then(function(response) {
            res.send(response);
          });
});
app.get('/pokemon/item/:itemName', function(req, res){
    P.getItemByName(req.params.itemName, function(response, error){
        if(error){
            res.send('error');
            console.log(error);
        }else{
            res.send(response);
        }
    });
});
app.get('/pokemon/move/:moveName', function(req, res){
    P.getMoveByName(req.params.moveName, function(response, error){
        if(error){
            res.send('error');
            console.log(error);
        }else{
            res.send(response);
        }
    });
});
app.listen(port);