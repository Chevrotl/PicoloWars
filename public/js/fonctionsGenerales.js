
	
	//Renvoi parseInt de la variable entree en parametre ou alors une chaine vide -> Permet d'enlever les 0 dans le tableau
	function parseIntOrEmpty(s){
		return (parseInt(s)==0) ? "" : parseInt(s);
	}

	//Renvoi parseInt de la valeur, ou 0 si NaN
	function parseIntOrZero(s){
		if(isNaN(parseInt(s))){
			return 0 ;
		}
		else {
			return parseInt(s);
		}
	}
	
	//Renvoi parseFloat de la variable entree en parametre ou alors une chaine vide -> Permet d'enlever les 0 dans le tableau
	function parseFloatOrEmpty(s){
		return (parseFloat(s)==0) ? "" : parseFloat(s);
	}

	//Renvoi parseFloat de la valeur, ou 0 si NaN
	function parseFloatOrZero(s){
		if(isNaN(parseFloat(s))){
			return 0 ;
		}
		else {
			return parseFloat(s);
		}
	}
	
	//Supprime le dernier caractere d'une chaine
	function supprimerDernierCaractere(chaine){
		return chaine.substring(0,chaine.length-1); 
	
	}

	
	//Creation d'une methode contains pour verifier filtrer les magasins
	function contains(table, value) {
		for (var i = 0; i < table.length; i++) {
			if (table[i] === value) {
				return true;
			}
		}
		return false;
	}

	//Renvoi l'index d'une valeur dans un tableau
	function getIndexInArray(array, value){
		for(var i in array){
			if(array[i] === value)
				return i ;
		}
		return null ; 
	}

	//Inversion d'une phrase selon un caractère (utilisation dans ASRobotacheBonin)
	function inverseString(str, caractere){
		if(str.indexOf(caractere)==-1){return str;}

		var chaine = str.split(caractere);

		var newStr = "" ;
		for (var i = chaine.length - 1; i >= 0; i--) {
			newStr+=chaine[i]+caractere
		};
		
		return supprimerDernierCaractere(newStr); ;
	}

	//Renvoi une date au format JJ/MM/AAAA
	function jsonDateToStringDate(stringDate){
		if(stringDate == "" || stringDate == null){
			return "" ; 
		}
		date = jsonDateToDateObject(stringDate);
		var jour = String(date.getDate()) ;
		if(jour.length == 1)
			jour = "0"+jour;

		var mois = String(date.getMonth()+1) ;
		if(mois.length == 1)
			mois = "0"+mois;

		return jour+"/"+mois+"/"+date.getFullYear() ; 
	}

	//Renvoi un objet date par rapport a la valeur renvoyé par les requetes ajax
	function jsonDateToDateObject(stringDate){
		if(stringDate == "" || stringDate == null){
			return "" ; 
		}
		stringDate = stringDate.substring(6,stringDate.length-2);
		return new Date(parseInt(stringDate)) ;	
	}

	//Renvoi une data au format YYYYMMDD
	function jsonDateToYyyymmdd(stringDate){
		if(stringDate == "" || stringDate == null){
			return "" ; 
		}
		date = jsonDateToDateObject(stringDate);
		var yyyy = this.getFullYear().toString();
   		var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   		var dd  = this.getDate().toString();
   		return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]);
	}

	//Renvoi un objet date avec une date au format YYYYMMDD
	function yyyymmddToJsonDate(strDate){
		var year = parseInt(strDate.substring(0,4));
		var month = parseInt(strDate.substring(4,6));
		var day = parseInt(strDate.substring(6,8));
		return new Date(year,month,day);
	}

	//Enleve les slash des date
	function removeSlashFromDate(strDate){
		
		var t = strDate.split("/");
		var s = t[0]+t[1]+t[2] ;
		return parseIntOrZero(s);
	}

	//Met une date au format YYYY/MM/JJ au format JJ/MM/YYYY
	function dateToFrFormat(enFormat){
		if(enFormat == "######"){
			return enFormat;
		}
		else if (enFormat != "" && enFormat != null && enFormat != undefined ){
			var tabDate = enFormat.split("/");
			return tabDate[2]+"/"+tabDate[1]+"/"+tabDate[0];
		}
		else {
			return "" ; 
		}
	}

	var dialogChargementArticles ; 

	//Modifie un caractere a une position donnée dans une chaine
	function setCharAt(str,index,chr) {
    	if(index > str.length-1) return str;
    	return str.substr(0,index) + chr + str.substr(index+1);
	}

//Renvoi la différence en semaines entre deux dates
function getDayDiffDate(d1, d2){
	var milli = d1 - d2 ;
	return parseInt(milli/1000/3600/24/7);
	// return Math.ceil(milli/1000/3600/24/7);
}



