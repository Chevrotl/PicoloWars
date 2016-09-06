function Player(socket, imgUrl){
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

module.exports = Player;
