var Player = function(socket, pseudo,  x, y ,img, isPlayer){
	this.pseudo = pseudo ; 
	this.socket = socket ;
	this.coordX = x ;
	this.coordY = y ;
	this.imgUrl = img ;
	this.isPlayer = isPlayer ;
	$("#x"+this.coordX+"y"+this.coordY).append("<img id='img"+this.pseudo+"' src='"+this.imgUrl+"'>");
	$("#img"+this.pseudo).click(function(e){
		console.log(e);
		console.log(this);
	});
	
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

/*
Player.prototype.move = function pickCard(card){
		var targets = []
		//Afficher name et description
		alert(card.name + '/n' + card.description);
		//On parcours tous les effets et si besoin on demande de selectionner une cible
		for (var i = 0 ; i < len(card[effects];i++)){
			if(card[effects][i].targets == 2){
				//Afficher la description de l'effet
				//Rendre les personnages cliquables et ajouter un event sur les perso 
				for (var j = 0 ; j < len(OTHERS_PLAYERS);j++){
					$("#x"+OTHERS_PLAYERS[j].coordX+"y"+OTHERS_PLAYERS[j].coordY).children().addEventListener('click', function(targets, j){
						for (var k = 0 ; k < len(OTHERS_PLAYERS); k++){
							if (OTHERS_PLAYERS[k].pseudo == this.pseudo){
								targets[j] = OTHERS_PLAYERS[k];
							}
						}
					})
				}
				//On passe à l'effet suivant
			}
		}

}; */

