function generateTable(json){
	
	var h ;
	var l ; 
	var table = $("#mainTableTbody") ;

	h = parseIntOrZero(json.hauteur);
	l = parseIntOrZero(json.largeur);

	if(h == 0 || l == 0){
		console.log("Valeur de largeur ou hauteur invalide pour la table h : "+h+" l : "+l);
		return false ; 
	}
	// table.parent().width(l*50);

	var tiles = json.cases ; 

	for(var x in tiles){
		var str = '';
		str += '<tr id="x'+x+'">' ; 
		for(var y in tiles[x]){
			str += '<td id="x'+x+'y'+y+'" style=background-image:url(\"'+tiles[x][y].img+'\")></td>' ; 
		}
		str += ('</tr>')
		table.append(str) ;	
	}

	return true ; 

}

function movePlayerToCoordinate(xAxis, yAxis){
	var x ;
	var y ; 

	x = parseInt(xAxis);
	y = parseInt(yAxis);

	if(isNaN(x) || isNaN(y)){
		console.log("Coordonnée NaN : x : "+x+" y : "+y);
		return false ; 
	}
	else if(x < 0 || y < 0 || x > TABLE_INFO.hauteur || y > TABLE_INFO.largeur){
		console.log("Coordonnée incorrecte : x : "+x+" y : "+y);
		return false ; 
	}
	else if(TABLE_INFO.cases[x][y].bloc){
		console.log("Gaffe au mur - x : "+x+" y : "+y);
		return false;
	}


	var id= 'x'+x+'y'+y ;
	$("#"+id).addClass('casePerso');
	return true ; 
}

function displayArrow(){
	var idTd = 'x'+SELF_PLAYER.coordX+'y'+SELF_PLAYER.coordY ;
	var td = $("#"+idTd) ;
	var top = td.offset().top - 110 ;
	var left = td.offset().left - 100 ;
	//top -110 left -100
	$("#arrows").css('top',top).css('left',left).css('visibility','visible') ;
}


function hideArrow(){
	$("#arrows").css('visibility','hidden');	
}


function arrowMove(direction){
	SELF_PLAYER.move(direction);
}

function createJsonTable(hauteur,largeur){
	var json = {
	"hauteur" : hauteur,
	"largeur" : largeur
	}

	var cases = [] ;
	for (var x = 0; x <= json.hauteur; x++) {
		var tabX = []
		for (var y = 0; y <= json.largeur; y++) {
			var rand = Math.floor((Math.random() * 100) + 1); 
			if(rand < 10){
				var img = "img/tiles/cobble_blood10.png" ;
				var bloc = true ;	
			}
			else {
				var img = "img/tiles/grass0-dirt-mix1.png" ;
				var bloc = false ; 
			}
			var j = {"x":x, 
					"y":y,
					"bloc":bloc,
					"img":img}
			tabX.push(j);
		}
		cases.push(tabX);
	}
	json.cases = cases ;
	// console.log(json);
	return json ; 
}

exports.createJsonTable = createJsonTable