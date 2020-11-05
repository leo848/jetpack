let rider;
let coins = [];
let lineObstacles = [];
let timer = 0;
let dead = false;

function setup (){
	createCanvas(600, 400);
	rider = new Rider();
	for (let i = 0; i < 100; i++) {
		coins.push(
			new Coin(
				i * random(50, 200) + 200,
				random(height),
			),
		);
	}
	for (let i = 0; i < 1; i++) {
		lineObstacles.push(
			new LineObstacle(200, 200, 400, 200),
		);
	}
}

function draw (){
	background(220);
	text(Math.floor(rider.x / 8), 0, 0 + 20);
	noStroke();

	// translate(-rider.xvel * frameCount, 0);
	if (!dead) translate(-frameCount, 0);
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

	for (let i = -1; i < 5 && !dead; i++) {
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
