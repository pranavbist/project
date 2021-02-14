
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var Img
var rings, ringsImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,gameOverImg;
var restart,restartImg;
var survivalTime = 0;
var jungle, backgroundImg
var Invisibleground
var obst, obstImg
function preload() {
	Img = loadAnimation("mario1.png", "mario2.png", "mario3.png", "mario4.png")
	jungle = loadImage("jungleImg.jpg")
	obstImg = loadImage("Obstacle1.png")
	ringsImg = loadImage("coinImg.png")
}

function setup() {
	createCanvas(1200, 1000);

	backgroundImg = createSprite(200, 600, 20, 20)
	backgroundImg.addImage(jungle)
	backgroundImg.velocityX = -6
	backgroundImg.scale = 2
	abcd = createSprite(70, 880, 20, 20);
	abcd.addAnimation("mario running", Img)
	abcd.scale = 1
	Invisibleground = createSprite(500, 885, 1000, 20)
	ringsGroup = new Group();
	obstacleGroup = new Group()
	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	mario = new Mario(300, 300, 10, 10)
	Engine.run(engine);

}


function draw() {
	rectMode(CENTER);
	background("green");

	if (backgroundImg.x < 0) {
		backgroundImg.x = 200;
	}
	if (keyDown("space") && abcd.y > 794) {
		abcd.velocityY = -25
	}
	// adding gravity
	abcd.velocityY = abcd.velocityY + 0.8;
	Rings()
	spawnObstacles1()
	if (ringsGroup.isTouching(abcd)) {
		ringsGroup.destroyEach();
		survivalTime = survivalTime + 2
	}
	if (survivalTime === 10) {
		abcd.scale = 1.1;
	}
	if (survivalTime === 20) {
		abcd.scale = 1.2;
	}
	if (survivalTime === 30) {
		abcd.scale = 1.3;
	}
	if (survivalTime === 40) {
		abcd.scale = 1.4;
	}

	mario.display()
	
	abcd.collide(Invisibleground)
	Invisibleground.visible = false;
	//console.log(abcd.y)
	drawSprites()
	stroke("blue");
	textSize(35);
	fill("blue");
	text("rings Collected = " + survivalTime, 100, 250)
}
function spawnObstacles1() {
	if (frameCount % 70 === 0) {
		obst = createSprite(750, 800, 10, 10)
		obst.addImage(obstImg)
		obst.scale = 0.5
		obst.velocityX = -20
		obst.lifetime = 60
		obst.x = Math.round(random(300, 600))

	}
}
function Rings() {
	if (frameCount % 120 === 0) {
		console.log("in rings")
		rings = createSprite(500, 500, 10, 10);
		rings.addImage(ringsImg);
		rings.velocityX = -8;
		rings.scale = 0.2;
		rings.y = Math.round(random(450, 700));
		// abcd.depth = rings.depth;
		// abcd.depth = abcd.depth + 1;
		ringsGroup.add(rings);
	}
}
function reset() {
	gameState = PLAY;
	abcd.scale = 1;
	obstacleGroup.destroyEach();
	ringsGroup.destroyEach();
	survivalTime = 0;
	backgroundImg.velocityX = -6
}