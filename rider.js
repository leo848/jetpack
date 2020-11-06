const print = console.log;

class Rider {
	constructor () {
		this.x = 50;
		this.xvel = 1;
		this.y = 200;
		this.yvel = 2;
		this.gravity = true;
		this.r = 20;
	}

	ride () {
		if (!this.immovable) {
			if (this.gravity) {
				this.y += this.yvel;
			} else {
				this.y -= this.yvel;
			}

			if (this.y >= height) {
				this.y -= this.yvel + 1;
			} else if (this.y <= 0) {
				this.y += this.yvel + 1;
			}

			this.x += this.xvel;
		}
	}

	display () {
		circle(this.x, this.y, this.r);
	}

	kill (msg) {
		let score = this.x / 8;

		this.x = 0;
		this.y = 0;
		this.immovable = true;
		showSplashScreen(
			score.toFixed(0),
			DEATH_MESSAGES[msg],
		);
	}
}

class Coin {
	constructor (x, y) {
		this.x = x;
		this.y = y;
		this.r = 20;
	}

	display () {
		push();

		stroke(0);
		fill(255, 100, 0);

		circle(this.x, this.y, this.r);

		pop();
	}

	plopIfRiderNearby () {
		if (
			Math.abs(rider.x - this.x) <
				rider.r &&
			Math.abs(rider.y - this.y) < rider.r
		) {
			let interval = setInterval(() => {
				if (this.r >= 0) {
					this.r--;
				} else {
					this.r = 0;
					clearInterval(interval);
				}
			}, 20);
		}
	}
}

class LineObstacle {
	constructor (x1, y1, x2, y2) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.angle = Math.atan2(y2 - y1, x2 - x1);
	}

	display () {
		push();

		strokeWeight(6);
		stroke(255, 0, 0);
		line(this.x1, this.y1, this.x2, this.y2);

		pop();
	}

	riderNearby () {
		let returnValue =
			Math.abs(rider.y - this.y1) < 20 &&
			rider.x > this.x1 &&
			rider.x < this.x2;
		return returnValue;
	}
}

function showSplashScreen (score, msg){
	noLoop();

	background(220);

	print(score, msg);
	translate(frameCount, 0);

	rectMode(CENTER);
	rect(
		width / 2,
		height / 2,
		width - 40,
		height - 40,
	);

	fill(0, 0, 0);
	textSize(100);
	textAlign(CENTER, CENTER);
	text(score + 'm', width / 2, height / 2);
	textSize(40);
	text(
		random(msg).replace(
			'{player}',
			playerName,
		),
		width / 2,
		height / 2 + 100,
	);
	fill(200, 200, 0);
	let playAgain = rect(
		width / 2,
		height / 2 - 200,
		width - 200,
		200,
	);

	playAgain.mousePressed(startAgain);
}
