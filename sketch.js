var backgroundColor;

const MIN_SIZE = 5;
const MAX_SIZE = 50;
var POPULATION_SIZE = 100;

var population = [];

var zombieCount = 0;
var humanCount = 0;

var zombieDeath;

function setup() {
    zombieDeath = loadSound('assets/zombie_death.mp3');
    createCanvas(windowWidth, windowHeight);
    backgroundColor = color(245, 255, 245);
    initializePopulation();
}

function draw() {
    background(backgroundColor);
    noStroke();
    drawPopulation();
    movePopulation();
    drawPopulationCounts();
    handleCollisions();
}


function handleCollisions() {
    for (var i = 0; i < POPULATION_SIZE; ++i) {
        var attacker = population[i];
        for (var j = i + 1; j < POPULATION_SIZE; ++j) {
            var target = population[j];

            if (attacker.isTouching(target) && attacker.strength() > target.strength()){
                if(Math.random() > 0.5 && attacker.humanoidType == "zombie") {
                    target.humanoidType = "zombie";
                    target.color = color(random(0, 150), random(140, 250), random(0, 80), 150); // Death marker
                    zombieCount += 1;
                    humanCount -= 1;
                } else if (attacker.humanoidType == "human") {
                    fill(color(244, 75, 66), 150);
                    ellipse(target.x, target.y, target.size, target.size); // Death marker
                    population.splice(j,1);
                    POPULATION_SIZE = population.length;
                    zombieCount -=1;
                    zombieDeath.play();
                } else {
                    fill(color(244, 75, 66), 150);
                    ellipse(target.x, target.y, target.size, target.size); // Death marker
                    population.splice(j,1);
                    POPULATION_SIZE = population.length;
                    humanCount -= 1;
                }

            } else if (attacker.isTouching(target) && attacker.strength() < target.strength()){
                if(Math.random() > 0.5 && target.humanoidType == "zombie") {
                    attacker.humanoidType = "zombie";
                    attacker.color = color(random(0, 150), random(140, 250), random(0, 80), 150);
                    zombieCount += 1;
                    humanCount -= 1;
                } else if (target.humanoidType == "human") {
                    fill(color(244, 75, 66), 150);
                    ellipse(attacker.x, attacker.y, attacker.size, attacker.size); // Death marker
                    population.splice(i,1);
                    POPULATION_SIZE = population.length;
                    zombieCount -=1;
                    zombieDeath.play();
                } else {
                    fill(color(244, 75, 66), 150);
                    ellipse(attacker.x, attacker.y, attacker.size, attacker.size); // Death marker
                    population.splice(i,1);
                    POPULATION_SIZE = population.length;
                    humanCount -= 1;
                }
            }
        }
    }
}

function initializePopulation() {
    for (var i = 0; i < POPULATION_SIZE; ++i) {
        var humanoid_type = random(0, 100);
        if (humanoid_type <= 50) {
            population[i] = initializeZombie();
            ++zombieCount;
        } else {
            population[i] = initializeHuman();
            ++humanCount;
        }
    }
}

function drawPopulationCounts() {
    stroke(0);
    textSize(72);
    textAlign(CENTER);
    text("Zombies: " + zombieCount, width / 2, 100);
    text("Humans: " + humanCount, width / 2, height - 100);
}

function drawPopulation() {
    for (var i = 0; i < POPULATION_SIZE; ++i) {
        population[i].draw();
    }
}

function movePopulation() {
    for (var i = 0; i < POPULATION_SIZE; ++i) {
        population[i].move();
    }
}

function initializeZombie() {
    return {
        humanoidType: "zombie",
        x: random(0, windowWidth),
        y: random(0, 200),
        speed: random(1, 3),
        size: random(MIN_SIZE, MAX_SIZE),
        strength: function() {
          var strength = this.size;
          return strength;
        },
        color: color(random(0, 150), random(140, 250), random(0, 80), 150),
        move: function() {
            var o = this;
            if(this.humanoidType == "zombie") {
                moveDown(o);
            } else if (this.humanoidType == "human") {
                moveUp(o);
            }
        },
        draw: function() {
            fill(this.color);
            ellipse(this.x, this.y, this.size, this.size);
        },
        isTouching: function(target) {
            if (this.humanoidType == target.humanoidType) {
                return false;
            }
            var distance = dist(this.x, this.y, 0, target.x, target.y, 0);
            if (distance <= (this.size / 2 + target.size / 2)) {
                return true;
            } else {
                return false;
            }
        }
    };
}

function moveDown(o) {
    var direction = random(0, 100);
    if (direction < 20) {
        o.x += o.speed;
    } else if (direction < 40) {
        o.x -= o.speed;
    } else if (direction < 60) {
        o.y -= o.speed;
    } else {
        o.y += o.speed;
    }
}

function moveUp(o) {
    var direction = random(0, 100);
    if (direction < 20) {
        o.x += o.speed;
    } else if (direction < 40) {
        o.x -= o.speed;
    } else if (direction < 60) {
        o.y += o.speed;
    } else {
        o.y -= o.speed;
    }
}

function initializeHuman() {
    return {
        humanoidType: "human",
        x: random(0, windowWidth),
        y: random(windowHeight - 200, windowHeight),
        speed: random(1, 3),
        size: random(MIN_SIZE, MAX_SIZE),
        strength: function() {
          var strength = this.size;
          return strength;
        },
        color: color(random(0, 60), random(90, 160), random(180, 255), 150),
        move: function() {
            var o = this;
            if(this.humanoidType == "zombie") {
                moveDown(o);
            } else if (this.humanoidType == "human") {
                moveUp(o);
            }
        },
        draw: function() {
            fill(this.color);
            ellipse(this.x, this.y, this.size, this.size);
        },
        isTouching: function(target) {
            if (this.humanoidType == target.humanoidType) {
                return false;
            }
            var distance = dist(this.x, this.y, target.x, target.y);
            if (distance <= (this.size / 2 + target.size / 2)) {
                return true;
            } else {
                return false;
            }
        }
    };
}
