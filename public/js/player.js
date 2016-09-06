var Player = function(socket, pseudo,  x, y ,img, isPlayer){
	this.pseudo = pseudo ; 
	this.socket = socket ;
	this.coordX = x ;
	this.coordY = y ;
	this.imgUrl = img ;
	this.isPlayer = isPlayer ;
	$("#x"+this.coordX+"y"+this.coordY).append("<img src='"+this.imgUrl+"'>");
	
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
		$("#x"+this.coordX+"y"+this.coordY).append("<img src='"+this.imgUrl+"'>");
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

