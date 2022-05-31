let score = 295;
let health = 100;

let deadscreen = document.getElementById("deadScreen");
let startscreen = document.getElementById("startScreen");
let gamescreen = document.getElementById("gameScreen");

let shoot1 = new Howl({
	src: ['utils/shoot1.mp3']
});
let shoot2 = new Howl({
	src: ['utils/shoot2.mp3']
});

let jdm = new Howl({
	src: ['utils/jdm.mp3'],
	loop: true,
	volume: 0.7
});
let oldSckl = new Howl({
	src: ['utils/oldSckl.mp3'],
	loop: true,
	volume: 0.7
});
let goat = new Howl({
	src: ['utils/goat.mp3'],
	loop: true,
	volume: 0.7
});
 
let songs = [jdm, oldSckl, goat];
song = jdm;
randomizeMusic();

 
function updateHealthPoints(points) {

	health = points;
	let healthBar = document.querySelector("#healthBar");
	healthBar.style.width = points + "%";

}

function updateScorePoints(points) {
	score = points;
	let scoreTxt = document.getElementById("score");
	scoreTxt.innerHTML = score;
}

function iShoot(enemy) {
	enemy.classList.add("dead");
	enemy.classList.remove("show");

	gamescreen.classList.add("bloodShot");

	setTimeout(()=> {	
		gamescreen.classList.remove("bloodShot");
	}, 200);

	if (livingEnemies().length == 0){
		updateScorePoints(score+40);
		realiveAll();
	}
}

function realiveAll(){
    console.log("realiving all");
    document.querySelectorAll(".enemy").forEach((enemy) => {
		changeImg(enemy);
		enemy.classList.remove('dead');	
	});
}

function enemyShootsMe(enemy) {

	if(!enemy.classList.contains("dead")) {
		shoot1.play();
		
		enemy.classList.add("shoot");
		updateHealthPoints(health - 20);

		setTimeout(()=> {	
			enemy.classList.remove("shoot");
		}, 200);

	}

}

function enemyAttacksMe(enemy) {
	
	if(health > 0) {
		enemy.classList.add("show");
		setTimeout(()=> {
			enemyShootsMe(enemy);
		},Math.floor( Math.random() * ( 1 + 1000 - 300 ) ) + 500);

		setTimeout(()=> {
			enemy.classList.remove("showing");
		}, 3000);
		
	}

}

function livingEnemies() {
	return document.querySelectorAll(".enemy:not(.dead)");
}


function randomEnemyAttacks() {
	var randomEnemyNo = Math.floor(Math.random() * livingEnemies().length);
	var enemy = livingEnemies()[randomEnemyNo];
	var randomDelay = Math.random() * 1500 + 700;

	setTimeout( ()=> {
		if(health > 0){
			enemyAttacksMe(enemy);
			randomEnemyAttacks();
		} else {
			showDeadScreen();
		}
	}, randomDelay);

}


function changeImg(enemy) {
	let imgNo = Math.floor((Math.random()*8) + 1);
	enemy.getElementsByTagName("img")[0].src = `utils/img${imgNo}.png`;
}

function shootSound() {
    shoot2.play();
}

function showStartScreen(){
	startscreen.classList.add("show");
	gamescreen.style.filter = "blur(20px)";
}

function showDeadScreen(){
	deadscreen.classList.add("show");
	let scoreTxt = deadscreen.querySelector("#score");
	scoreTxt.innerHTML = score;
}

function play() {
	updateHealthPoints(100);
	updateScorePoints(295);
	document.querySelectorAll(".enemy").forEach((enemy) => {
		changeImg(enemy);
		enemy.classList.remove('show');	
	});
	

	deadscreen.classList.remove("show");
	startscreen.classList.remove("show");
	gamescreen.style.filter = "blur(0px)";

	let scoreTxt = document.getElementById("score");
	scoreTxt.innerHTML = score;
	randomEnemyAttacks();
}

function randomizeMusic() {
	song = songs[(Math.random() * songs.length) | 0];
	song.play();
}

showStartScreen();