// Zombulator by Francesco Aiello

var zombieX = 80;
var zombie2X = 100;
var change = 5;
var randomNumber1 = 120;
var randomNumber2 = 35;
var randomNumber3 = 16;

function setup() {
	createCanvas(800, 800);
}


function draw() {
	background(255, 255, 255);
	strokeWeight(10);
	stroke(32, 15, 29);
	fill(randomNumber1, randomNumber2, randomNumber3);
	ellipse(zombieX, 50, 80, 80);
	fill(randomNumber2, randomNumber3, randomNumber1);
	ellipse(zombie2X, 150, 80, 80);
	zombieX = zombieX + change;
	zombie2X = zombie2X + change;

	if (zombieX >= 800 || zombieX <=0) {
		change = change * -1;
		randomNumber = random(255);
		randomNumber2 = random(255);
		randomNumber3 = random(255);
	}
}


