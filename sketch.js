// Zombulator by Francesco Aiello

// human settings
var humanY = 100;
var humanV = 0;
var humanA = 0.2;
var humanSize = 80;
var humanDamping = -0.5;

// zombie settings
var zombieY = 100;
var zombieV = 0;
var zombieA = 0.3;
var zombieSize = 160;
var zombieDamping = -0.5;

function setup() {
	createCanvas(windowWidth, windowHeight);
	backgroundColor = color(66, 134, 244);
	humanColor = color(244, 235, 65);
	zombieColor = color(84, 232, 51);

}


function draw() {
	background(backgroundColor);
	noStroke();
	fill(humanColor);
	ellipse(windowWidth / 4, humanY, humanSize, humanSize);
	fill(zombieColor);
	ellipse(windowWidth / 2, zombieY, zombieSize, zombieSize);

	// Y coordinate & velocity calculations for human
	humanY = humanY + humanV;
	humanV = humanV + humanA;

	// Calculations for zombie
	zombieY = zombieY + zombieV;
	zombieV = zombieV + zombieA;

	if (humanY + (humanSize / 2) >= windowHeight) {
		humanY = windowHeight - (humanSize / 2);
		humanV = humanV * humanDamping;
	}

	if (zombieY + (zombieSize / 2) >= windowHeight) {
		zombieY = windowHeight - (zombieSize /2);
		zombieV = zombieV * zombieDamping;
	}
}


