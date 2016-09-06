function Player(pseudo, socket, imgUrl){
	if(socket != null && socket != undefined){
		this.socket = socket
	}
	else {
		this.socket = null ; 
	}

	if(imgUrl != null && imgUrl != undefined){
		this.imgUrl = imgUrl;
	}
	else {
		this.imgUrl = 'img/character.png' ;
	}

	this.pseudo = pseudo ;
	this.coordX = 0 ;
	this.coordY = 0 ;
	this.socket = socket;
	this.imgUrl = imgUrl ;
}

Player.prototype.move = function(direction) {
	switch(direction){
		case('N') : this.coordX-- ; break ;
		case('S') : this.coordX++ ; break ;
		case('E') : this.coordYr++ ; break ;
		case('O') : this.coordYr-- ; break ;
		default : {return false ;}
	}
}; 

Player.prototype.moveOtherPlayer = function(idPlayer, direction) {
	var json = {'idPlayer':idPlayer, 'direction':direction};
	this.socket.emit('moveOtherPlayer', json);
}; 

Player.prototype.generateOtherPlayer = function(player){
	var json = {'pseudo':player.pseudo, 'x':player.coordX, 'y':player.coordY, 'img':player.imgUrl}
	this.socket.emit('generateOtherPlayer', json);
	
}

module.exports = Player;
