const print = console.log;

class Rider {
	constructor () {
		let options = {
			x       : 50,
			xvel    : 1,
			y       : 200,
			yvel    : 2,
			gravity : true,
			r       : 20,
			coins   : 0,
			onFloor : false,
			onCeil  : false,
			midAir  : true,
		};

		for (let option of Object.keys(options)) {
			eval(
				'this.' +
					option +
					' = ' +
					options[option],
			);
		}
	}

	ride () {
		if (!this.immovable) {
			if (this.gravity) {
				this.y += this.yvel;
			} else {
				this.y -= this.yvel;
			}

			if (this.y >= height - 20) {
				this.y -= this.yvel;
				this.onCeil = false;
				this.midAir = false;
				this.onFloor = true;
			} else if (this.y <= 20) {
				this.y += this.yvel;
				this.onCeil = true;
				this.midAir = false;
				this.onFloor = false;
			} else {
				this.onCeil = false;
				this.midAir = true;
				this.onFloor = false;
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
		this.coins = 0;
		showSplashScreen(
			score.toFixed(0),
			this.coins,
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
			rider.coins++;
			this.plopIfRiderNearby = function (){};
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

function showSplashScreen (score, coins, msg){
	onSplash = true;
	noLoop();
	resetMatrix();

	stroke(0);
	print(score, msg);
	translate(width / 2, height / 2);

	rectMode(CENTER);
	rect(0, 0, width - 40, height - 40);

	fill(0, 0, 0);
	textSize(100);
	textAlign(CENTER, CENTER);
	text(score + 'm', 0, 0);
	textSize(40);
	text(
		random(msg).replace(
			'{player}',
			playerName,
		),
		0,
		+100,
	);

	fill(255, 255, 0);
	rect(0, -120, width - 250, 60);
	fill(0);
	text('Play again?', 0, -120);
}
