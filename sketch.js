// Zombulator by Francesco Aiello

var zombieX = 80;
var zombie2X = 100;
var change = 5;
var randomnumber1 = 120;
var randomnumber2 = 35;
var randomnumber3 = 16;

function setup() {
	createCanvas(800, 800);
}


function draw() {
	background(255, 255, 255);
	fill(randomnumber1, randomnumber2, randomnumber3);
	ellipse(zombieX, 50, 80, 80);
	fill(randomnumber2, randomnumber3, randomnumber1);
	ellipse(zombie2X, 150, 80, 80);
	zombieX = zombieX + change;
	zombie2X = zombie2X + change;

	if (zombieX >= 800 || zombieX <=0) {
		change = change * -1;
		randomnumber = Math.floor((Math.random() * (256)) + 1);
		randomnumber2 = Math.floor((Math.random() * (256)) + 1);
		randomnumber3 = Math.floor((Math.random() * (256)) + 1);
		}
	}


