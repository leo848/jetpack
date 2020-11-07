let rider;
let coins = [];
let lineObstacles = [];
let timer = 0;
let dead = false;
let onSplash = false;
let playerName = 'Leo'; //window.prompt('Name?');
let mouseElement;
let bricksImage;

function preload (){
	bricksImage = loadImage('bricks.png');
}

function setup (){
	createCanvas(600, 400);
	rider = new Rider();
	mouseElement = createDiv(
		mouseX +
			', ' +
			mouseY +
			'; fps=' +
			frameRate(),
	);
	setInterval(() => {
		mouseElement.html(
			mouseX +
				', ' +
				mouseY +
				'; fps=' +
				frameRate().toFixed(1),
		);
	}, 50);
	for (let i = 0; i < 100; i++) {
		coins.push(
			new Coin(
				i * random(50, 200) + 200,
				random(height),
			),
		);
	}
	for (let i = 1; i < 100; i++) {
		let j = i * 120 * random(2, 5);
		let k = random(height);
		lineObstacles.push(
			new LineObstacle(j, k, j + 200, k),
		);
	}
}

function draw (){
	background(220);
	push();
	if (!dead)
		translate((-rider.x + 40) * 1.1, 0); // translate the wall so that it moves
	for (let i = -2; i < 3; i++) {
		imgWidth = height;
		image(
			bricksImage, //image
			rider.x +
				imgWidth -
				rider.x % imgWidth +
				i * imgWidth, // x loc
			0, // y loc
			imgWidth,
			height, // width
			// height
		);
	}
	pop();

	textSize(20);
	textFont('Inter');
	text(Math.floor(rider.x / 8) + 'm', 0, 20); // display meters
	text(rider.coins + ' Coins', 0, 40); // display meters

	noStroke();

	// translate(-rider.xvel * frameCount, 0);
	if (!dead) translate(-rider.x + 40, 0);
	fill('orange');
	rider.ride();
	rider.display();

	for (let coin of coins) {
		coin.display();
		coin.plopIfRiderNearby();
	}

	for (let lineObstacle of lineObstacles) {
		lineObstacle.display();
		if (lineObstacle.riderNearby()) {
			rider.kill('lineObstacle');
			dead = true;
		}
	}

	for (let i = -1; i < 5; i++) {
		stroke(0);
		line(
			rider.x +
				(800 - rider.x % 800) +
				i * 800,
			height,
			rider.x +
				(800 - rider.x % 800) +
				i * 800,
			0,
		);
		noStroke();
		fill(0, 0, 0);
		textSize(20);
		text(
			(rider.x +
				(800 - rider.x % 800) +
				i * 800) /
				8,
			rider.x +
				(800 - rider.x % 800) +
				i * 800 +
				5,
			height,
		);
	}

	// if (dead) {
	// 	splashScreen.show();
	// }

	if (mouseIsPressed) {
		rider.gravity = false;
	} else {
		setTimeout(() => {
			rider.gravity = true;
		}, 200);
	}
}

function mousePressed (){
	if (!dead) {
		rider.yvel++;
		setTimeout(() => {
			rider.yvel--;
		}, 500);
	}

	if (
		mouseX > 125 &&
		mouseX < 475 &&
		mouseY > 50 &&
		mouseY < 110 // press on playy again in splash
	) {
		onSplash = false;
		dead = false;
		rider.x = 0;
		rider.y = height / 2;
		rider.immovable = false;

		loop();
	}
}

function mouseReleased (){
	if (!dead) {
		rider.yvel = 0.2;
		let mouseInterval = setInterval(() => {
			if (rider.yvel <= 2) {
				rider.yvel += 0.03;
			} else {
				rider.yvel = 2;
				clearInterval(mouseInterval);
			}
		}, 5);
	}
}
