var anzahl;
var counter;
var newgroup = new groupname();
var spieler;
var question;
var answerlist = new Array();
var answerproc;
var guessproc;
var gfriend = -1;
var alreadyplayed = new Array();
var diffvalues = new Array();

function newround()
{
	anzahl = prompt("Wie viele Leute seid ihr?");
	counter = anzahl;
	while (!(anzahl==2 || anzahl==3 || anzahl==4 || anzahl==5 || anzahl==6 || anzahl==7
		|| anzahl==8 || anzahl==9 || anzahl==10 || anzahl==11 || anzahl==12))
		{
			anzahl = prompt("Bitte eine Zahl zwischen 2 und 12 eingeben!");
		}
		
	alert("Ihr spielt zu "+anzahl+".");
	newgroup.addperson(anzahl);
	alert("Ihr spielt zu "+anzahl+".\n"+
	newgroup.groupar.join('\n'));
}

function groupname(){
	
	this.groupar = new Array();
	
	this.addperson = function (n){
	var personname;
	var fix = n;
	while (n>0){
		personname = prompt("Name Spieler "+(fix-n+1));
		
		/* TODO: Fixen!*/
		while (personname.length < 2 || personname.length >= 20)
			{
				personname = prompt("Bitte mindestens 2 und maximal 20 Zeichen eingeben!");
			}
			
		while(this.groupar.indexOf(personname)>=0)
			{
				personname = prompt("Name bereits vergeben!");
				while (personname.length < 2 || personname.length >= 20)
				{
					personname = prompt("Bitte einen Namen mit mindestens 2 und maximal 20 Zeichen eingeben!");
				}
			}
		n = n-1;
		this.groupar.push(personname);
		answerlist.push(0);				//answer in percs
		answerlist.push(0);				//person to guess
		answerlist.push(0);				//guess in percs
		/* TODO: keine Doppelauftreten, Abbrechen ermöglichen*/
		}
	}
	
}

	function randomnmb(){
	if (spieler!=null){
		alert(newgroup.groupar[spieler]+" darf anfangen!")}
	else {var n = anzahl
	var rnd = Math.floor(Math.random()*n);
	var starter = newgroup.groupar[rnd];
	spieler = rnd;
	document.getElementById('random').innerHTML = starter + ", du darfst die erste Frage stellen!";
	}
}
	
	function ask(){
		question = document.getElementById('frage').value;
		/* if question === null alert(frage eingeben)
		 * else href
		 */
	
}

	function getquestion(){
		var questionalt = question;
		question = question.replace(/seid /g,"bist ");
		question = question.replace(/Seid /g,"bist ");
		question = question.replace(/ihr /g,"Du ");
		question = question.replace(/Ihr /g,"Du ");
		question = question.replace(/iha /g,"Du ");
		question = question.replace(/Iha /g,"Du ");
		question = question.replace(/euch /g,"Dir ");
		question = question.replace(/eusch /g,"Dir ");
		question = question.replace(/Euch /g,"Dir ");
		question = question.replace(/Eusch /g,"Dir ");
		question = question.replace(/ihr,/g,"Du,");
		question = question.replace(/Ihr,/g,"Du,");
		question = question.replace(/iha,/g,"Du,");
		question = question.replace(/Iha,/g,"Du,");
		question = question.replace(/euch,/g,"Dir,");
		question = question.replace(/eusch,/g,"Dir,");
		question = question.replace(/Euch,/g,"Dir,");
		question = question.replace(/Eusch,/g,"Dir,");
		question = question.replace(/ihr?/g,"Du?");
		question = question.replace(/Ihr?/g,"Du?");
		question = question.replace(/iha?/g,"Du?");
		question = question.replace(/Iha?/g,"Du?");
		question = question.replace(/euch?/g,"Dir?");
		question = question.replace(/eusch?/g,"Dir?");
		question = question.replace(/Euch?/g,"Dir?");
		question = question.replace(/Eusch?/g,"Dir?");
		if (question != questionalt)
			{alert("Du darfst deine Freunde ruhig duzen. ;)");}
		if ((question.substr(question.length-1))!="?")
			{question = question + "?";}
		var firstchar = question.substr(0,1);
		question = question.replace(firstchar,firstchar.toLowerCase());
		document.getElementById('fragegg').innerHTML = newgroup.groupar[spieler]+", "+question;
}


	function mapanswer(){
		answerproc = ($('#slider1').val());
		answerlist.splice(spieler*3,1,answerproc);
}

	function getfriend(){
	if (gfriend<0){
	gfriend = Math.floor(Math.random()*anzahl);
		while (gfriend==spieler){
			gfriend = Math.floor(Math.random()*anzahl);
		}
	
	/*var questionedit = question;
	
	questionedit = questionedit.replace("Du ",newgroup.groupar[gfriend]+" ");
	questionedit = questionedit.replace("Du,",newgroup.groupar[gfriend]+",");
	questionedit = questionedit.replace("Du?",newgroup.groupar[gfriend]+"?");
	questionedit = questionedit.replace("Dir ",newgroup.groupar[gfriend]+" ");
	questionedit = questionedit.replace("Dir,",newgroup.groupar[gfriend]+",");
	questionedit = questionedit.replace("Dir?",newgroup.groupar[gfriend]+"?");
	questionedit = questionedit.replace("du ",newgroup.groupar[gfriend]+" ");
	questionedit = questionedit.replace("du,",newgroup.groupar[gfriend]+",");
	questionedit = questionedit.replace("du?",newgroup.groupar[gfriend]+"?");
	questionedit = questionedit.replace("dir ",newgroup.groupar[gfriend]+" ");
	questionedit = questionedit.replace("dir,",newgroup.groupar[gfriend]+",");
	questionedit = questionedit.replace("dir?",newgroup.groupar[gfriend]+"?");*/
	
	document.getElementById('guessone').innerHTML = newgroup.groupar[spieler]+", wie ist "+newgroup.groupar[gfriend]+"s Antwort?";
	answerlist.splice((spieler*3)+1,1,gfriend)
	}
	else {alert("Magst du "+newgroup.groupar[gfriend]+" etwa nicht?");}
}

	function inArray(needle,haystack)
	{
    var count=haystack.length;
    for(var i=0;i<count;i++)
    {
        if(haystack[i]===needle){return true;}
    }
    return false;
}

	function mapguess(){
		guessproc = ($('#slider2').val());
		answerlist.splice((spieler*3)+2,1,guessproc);
		counter = counter -1;
		alreadyplayed.push(spieler);
		gfriend = -1;
		if (counter<1){
			alert("Die Runde ist vorbei!\nKlickt auf 'Runde beenden' und ermittelt den Gewinner!");
		}
		else {
		var n = anzahl;
		var rnd = Math.floor(Math.random()*n);
		while (inArray(rnd,alreadyplayed)){
			var rnd = Math.floor(Math.random()*n);
		}
		var starter = newgroup.groupar[rnd];
		alert("Nächster Spieler: "+starter);
		spieler = rnd;}
		/*if (counter<0)
			{
			window.location.href = "winoffline.html";		
			}
		else{
		gfriend = -1;
		var n = anzahl;
		var rnd = Math.floor(Math.random()*n);
		while (inArray(rnd,alreadyplayed)){
			var rnd = Math.floor(Math.random()*n);
		}
		var starter = newgroup.groupar[rnd];
		alert("Nächster Spieler: "+starter);
		spieler = rnd;
		document.location.href = "answerquestion.html";
		}*/
}

	function winner(){
		/*anzahl = 3;
		answerlist = new Array(100,2,50,20,2,60,100,1,0);
		var newgroup = new Array("Alex","Marina","Sebastian");*/
		var np = anzahl;
		var ccount = 0;
		while (ccount<np){
			var pers = answerlist[ccount*3+1];
			var persans = answerlist[pers*3];
			// alert(pers + " " + persans);
			diffvalues.push((persans - answerlist[ccount*3+2])*(persans - answerlist[ccount*3+2]));	
			ccount = ccount +1;
			pers = 0;
			persans = 0;
			// alert(diffvalues);
		}
		// alert(diffvalues);
		var difmin = Math.min.apply(null, diffvalues);
		ccount = 0;
		var minima = new Array();
		while (ccount<np){
			if (diffvalues[ccount] == difmin)
				{
				minima.push(ccount);
				}
			ccount = ccount +1;
		}
		var rnd = Math.floor(Math.random()*minima.length);
		var roundwinner = newgroup.groupar[rnd];
		document.getElementById('winner').innerHTML=roundwinner+" hat die Runde gewonnen!"
		document.getElementById('winnerperc').innerHTML=roundwinner+" verfehlte "+
			newgroup.groupar[answerlist[diffvalues.indexOf(difmin)*3+1]]+"s Antwort um nur "
			+Math.sqrt(difmin) + "%!"
		spieler = newgroup.groupar.indexOf(roundwinner);
}

	function onlywinner(){
		alert("Folgendes ist nur für "+newgroup.groupar[spieler]+" !")
}

	function neuerunde(){
		alreadyplayed = new Array();
		counter = anzahl;
		question = document.getElementById('fragenew').value;
		answerlist = new Array();
		var z = (anzahl*3);
		while (z>0){
			answerlist.push(0);
			z= z-1;
		}
		gfriend = -1;
		diffvalues = new Array();
	}

	function getlist(){
		var anslist = new Array();
		var guepers = new Array();
		var guelist = new Array();
		var perslist = new Array();
		var n = 0;
		while (n<anzahl){
			var pers = newgroup.groupar[n];
			var guessedperson = newgroup.groupar[answerlist[n*3+1]];
			var guess = answerlist[n*3+2];
			var answ = answerlist[n*3];
			anslist.push(answ);
			perslist.push(pers);
			guepers.push(guessedperson);
			guelist.push(guess);
			n = n+1;
		}
		var ausgabe = "";
		n = 0;
		while (n<anzahl){
			ausgabe = ausgabe + perslist[n] + " antwortete mit " + anslist[n] +"%\n"
			+ perslist[n] + " schätzte " + guepers[n] + "s Antwort auf " + guelist[n]+"%\n\n";
			n = n+1;
		}
		var firstchar = question.substr(0,1);
		var questionedit = question.replace(firstchar,firstchar.toUpperCase());
		alert(questionedit+"\n\n"+ausgabe);
	}
	
function offlineajax(){
	
	$("#ajaxtest").load("offline.html",function(){
});
}

