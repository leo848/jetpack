let rider;
let coins = [];
let lineObstacles = [];
let timer = 0;
let dead = false;
let onSplash = false;
let playerName = 'Leo'; //window.prompt('Name?');
let mouseElement;

function setup (){
	createCanvas(600, 400);
	rider = new Rider();
	mouseElement = createDiv(
		mouseX + ', ' + mouseY,
	);
	setInterval(() => {
		mouseElement.html(mouseX + ', ' + mouseY);
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
	push();

	background(220);
	textSize(20);
	textFont('Inter');
	text(Math.floor(rider.x / 8) + 'm', 0, 20); // display meters
	text(rider.coins + ' Coins', 0, 40); // display meters

	noStroke();

	// translate(-rider.xvel * frameCount, 0);
	if (!dead) translate(-rider.x + 20, 0);
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

	pop();
}

function mousePressed (){
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
