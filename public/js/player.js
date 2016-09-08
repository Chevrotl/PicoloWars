var Player = function(socket, pseudo,  x, y ,img, isPlayer){
	console.log('pseudo :' + pseudo);
	this.pseudo = pseudo ; 
	this.socket = socket ;
	this.coordX = x ;
	this.coordY = y ;
	this.imgUrl = img ;
	this.isPlayer = isPlayer ;
	$("#x"+this.coordX+"y"+this.coordY).append("<img id='img"+this.pseudo+"' src='"+this.imgUrl+"'>");
	
}


Player.prototype.move = function(direction) {
	var nextX = this.coordX ; 
	var nextY = this.coordY ; 
	switch(direction){
		case('N') : nextX-- ; break ;
		case('S') : nextX++ ; break ;
		case('E') : nextY++ ; break ;
		case('O') : nextY-- ; break ;
		default : {return false ;}
	}
	if(movePlayerToCoordinate(nextX, nextY)){
		$("#x"+this.coordX+"y"+this.coordY+" > img").remove();
		this.coordX = nextX ;
		this.coordY = nextY ;
		$("#x"+this.coordX+"y"+this.coordY).append("<img id='img"+this.pseudo+"' src='"+this.imgUrl+"'>");
		if(this.isPlayer){
			displayArrow();
			this.socket.emit('moveClient', direction);
		}
		return true;
	}
	else {
		return false ; 
	}

}; 

$('#askCard').click(function(){
	console.log('Demande de carte au serveur');
	SELF_PLAYER.socket.emit('askCard');
})



//-------- TEST ---------------
/*
Player.prototype.pickCard = function pickCard(card){
		console.log(OTHER_PLAYERS);
		console.log(card);
		var targets = [];
		var effect_target = [];
		var k = 0;
		alert(card['name'] + '/n' + card['description']);
		$("#x"+SELF_PLAYER.coordX+"y"+SELF_PLAYER.coordY).children().click(function(targets){
			console.log("La cible a été selectionnée, envoi des données");
			SELF_PLAYER.socket.emit('cardPicked', card, 'pseudo du joueur');		
			$("#x"+SELF_PLAYER.coordX+"y"+SELF_PLAYER.coordY).children().off('click');
		});	
}; 
*/

Player.prototype.pickCard = function pickCard(card){
		var targets = [];
		var effect_target = [];
		var nb_target = 0;
		console.log(card);
		console.log(card[0]);
		//Afficher name et description
		alert(card[0].name + '/n' + card[0].card_description);
		//On parcours tous les effets et si regarde les effets demendant la selection d'un perso
		console.log('len card :' + card.length);
		for (var i = 0 ; i < card.length;i++){
			if(card[i].target == 2){
				//On parcours les effets
				effect_target.push(card[i].effet_description);
				nb_target++;
				//effect_target = card['effects'][i];
			}
		}
		if (effect_target.length > 0){
			alert(effect_target[0]);
			for(var i in OTHER_PLAYERS){
				$("#x" +OTHER_PLAYERS[i].coordX + "y" +OTHER_PLAYERS[i].coordY).children().click(function(e){
					//Ajouter la cible à targets
					targets.push(OTHER_PLAYERS[this.id.substring(3)]);
					if (targets.length == nb_target){
						for (var j in OTHER_PLAYERS){
							//On retire l'event de click sur tous les joueurs
							$("#x" + OTHER_PLAYERS[j].coordX + "y" + OTHER_PLAYERS[j].coordY).children().off('click');
							SELF_PLAYER.socket.emit('cardPicked', card, targets);
							console.log("Cibles selectionnées, envoi des données");
						}
					} else {
						//Si toutes les cibles ne sont pas selectionnée
						alert(effect_target[targets.length]);
					}
				});
			}
		} else {
			this.socket.emit('cardPicked', card);
			console.log('Carte sans cible, envoi des données');
		}


/*
		if (typeof effect_target !== 'undefined' && effect_target.length > 0) {
			aler(card[k].description);
			$("#x"+OTHERS_PLAYER[j].coordX+"y"+OTHER_PLAYERS[j].coordY).children().addEventListener('click', function(targets, j){
				for (var k = 0 ; k < OTHERS_PLAYER.length; k++){
					if (OTHER_PLAYERS[k].pseudo == this.pseudo){
						//On ajoute la cible à targets[];
						targets.push(OTHER_PLAYERS[k]);
					}
				}
				k++;
				if (targets.length == effect_target.length){
					//Si autant de cible selectionnée que voulu, on envoi les infos aux serveurs
					this.socket.emit('cardPicked', card, targets);
					console.log("Toutes les cibles sont selectionnées, envoi des données");
				} else {
					alert(effect_target[k].description);
				}
			});
		} else {
			//Envoi des données sans selections de personnages
			this.socket.emit('cardPicked', card); //Voir s'il faut obligatoirement ajouter le param 'targets'
			console.log("Envoi des données sans selection de perso");
		}*/
}; 
