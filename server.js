var express = require('express');
var http = require('http');
var cons = require('console');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mysql = require('mysql');
var app = express();
app.use(cookieParser());
// app.use(session());


var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var server = http.createServer(app)
var database = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database: 'picolowars'
});

var mainScript = require('./script.js');
var Player = require('./player.js');
var Variables = require('./variables.js');

var io = require('socket.io')(server);

var sessionMiddleware = session({
    secret: "picolo zob"
});


app.use(express.static(__dirname + '/public'));

io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});
app.use(sessionMiddleware);


app.get('/', function(req, res) {
	cons.log('Demarage de l\'appli');
    res.render('index.ejs');
});

app.post('/login', function(req, res){
	var pseudo = req.body.pseudo //auth
	req.session.user_id = pseudo;
	req.session.game_id = 1;
    res.redirect('/game');
	
	// cons.log(req);
	// cons.log(res);
});


io.sockets.on('connection', function (socket) {
    cons.log('Connexion client');

    if(socket.request.session.user_id != undefined && socket.request.session.game_id != undefined){
	    var idP = socket.request.session.user_id ;
	    var idG = socket.request.session.game_id ;
	    cons.log("Pseudo : "+idP);
	    cons.log("Game_id : "+idG);
	    var img = 'img/character.png';
	    
	    if(idP == 'b'){
	    	img = 'img/characterRed.png' ;
	    }
	    else if(idP == 'c'){
	    	img = 'img/characterGreen.png' ;
	    }

	    var p = new Player(idP, socket, img);

	    if(Variables.LIST_OF_GAMES[idG] == undefined){
	    	Variables.LIST_OF_GAMES[idG] = {}
	    	Variables.LIST_OF_GAMES[idG].map = mainScript.createJsonTable(5,5) ;
	    	Variables.LIST_OF_GAMES[idG].players = {}
	    }

		var json = {};
		json.player = {};
		json.table = Variables.LIST_OF_GAMES[idG].map ; 

		json.player.pseudo = p.pseudo;
		json.player.coordX = p.coordX ; 
		json.player.coordY = p.coordY ; 
		json.player.imgUrl = p.imgUrl ; 
		socket.emit('jsonTable', json);
	    
    	for(var i in Variables.LIST_OF_GAMES[idG].players){
    		 Variables.LIST_OF_GAMES[idG].players[i].generateOtherPlayer(p);
    		 p.generateOtherPlayer(Variables.LIST_OF_GAMES[idG].players[i]);
    	}
	    
    	Variables.LIST_OF_GAMES[idG].players[idP] = p;

    }

    socket.on('moveClient', function(params){
		cons.log("Move");
		var idP = socket.request.session.user_id ;
		var idG = socket.request.session.game_id ;
	    cons.log("Joueur : "+idP);
	    cons.log("Game : "+idG);
	    var game = Variables.LIST_OF_GAMES[idG] ; 
	    game.players[idP].move(params);
	    
	    var json = {'pseudo':idP, 'direction':params}	

	    for(var i in game.players){
	    	if(i != idP){
	    		game.players[i].socket.emit('playerMoved', json);
	    	}
	    }



	});


	socket.on('askCard', function(){
		console.log('Carte demandée');
		var idP = socket.request.session.user_id;
		var idG = socket.request.session.game_id;
		var game = Variables.LIST_OF_GAMES[idG];
		var card;
		/*
		//Tirage non aléatoire
		database.query(
			'SELECT cards.id as "card_id", cards.name, cards.description as "card_description", effets.id as "effets_id", effets.description as "effet_description", effets.type, effets.value, effets.duration, effets.target FROM Cards\
			JOIN cards_effets ON Cards.id = cards_effets.card_id\
			JOIN effets ON effets.id = cards_effets.effet_id\
			JOIN targets ON targets.id = effets.target\
			JOIN types ON types.id = effets.type\
			WHERE cards.id=1'
			, function(err, rows, fields) {
		  if (err) throw err;
		  	console.log('Carte générée ');
		  	card = JSON.stringify(rows);
		  	game.players[idP].socket.emit('sendCard', rows);
		});
*/
		//Tirage de carte aléatoire
		//On compte les cartes de la base de données ici pour pouvoir réutiliser COUNT_CARDS plus tard
		//Voir si a la place on ne choisirait pas un deck à la création de la partie pour qu'on puisse le réutiliser
		database.query('SELECT count(id) as count FROM cards', function (err, rows, fields){
			if (err) throw err;
				var COUNT_CARDS = rows[0].count;
				var rand = Math.floor((Math.random()*COUNT_CARDS) + 1);
				database.query(
					'SELECT cards.id as "card_id", cards.name, cards.description as "card_description", effets.id as "effets_id", effets.description as "effet_description", effets.type, effets.value, effets.duration, effets.target FROM Cards\
					JOIN cards_effets ON Cards.id = cards_effets.card_id\
					JOIN effets ON effets.id = cards_effets.effet_id\
					JOIN targets ON targets.id = effets.target\
					JOIN types ON types.id = effets.type\
					WHERE cards.id='+rand+''
					, function(err, rows, fields) {
				  if (err) throw err;
				  	console.log('Carte générée !');
				  	game.players[idP].socket.emit('sendCard', rows);
				});
		});	
	});

    //Reception de la carte tiré et des cibles (s'il y en a)
	socket.on('cardPicked', function(card, targets){
		cons.log('card :' + card);
		cons.log('target :' + targets);
		var idP = socket.request.session.user_id;
		var idG = socket.request.session.game_id;
		var game = Variables.LIST_OF_GAMES[idG];
		//EFFECTUER L'ACTION ICI
		for (var effet in card) {
			switch (effet.type){
				case(1):
					//Modification de l'attaque
					game.players[targets.pseudo].attaque += effet.value;
					break;
				case(2):
					//Modification des PV
					game.players[targets.pseudo].pdv += effet.value;
					break;
				case(3):
					//Changement de tour
					console.log("Chagement de tour indisponible");
					break;
				case(4):
					//Objet
					console.log("Objets indisponible");
					break;
				default:
					console.log('Type de carte inconnu');
			}
		}
	});

    
    // cons.log(socket);
});


app.get('/addcard', function (req, res){
	//Les options pour types
	database.query('SELECT id, name FROM types', function (err, rows, fields){
		var liste_types = rows;
		database.query('SELECT id, name FROM targets', function(err, rows, fields){
			var liste_targets = rows;
			res.render('addcard.ejs', {liste_targets : liste_targets, liste_types : liste_types});
		});
	});

});

app.post('/addcard', function (req, res){
	//Les options pour types
	cons.log("Carte reçue");
	console.log(req.body);
	
	//database.query('SELECT id, name FROM types', function (err, rows, fields){
		

});


app.get('/game', function(req, res){
	var pseudo = null ; 
	if (req.session.user_id != '' && req.session.user_id != undefined && req.session.user_id != null) {
		pseudo = req.session.user_id
    }
    else {
    	res.redirect('/login');
    }
	//Récup config, creation template avec les donnée dans l'ejs
    res.render('game.ejs');

});

server.listen(8080);