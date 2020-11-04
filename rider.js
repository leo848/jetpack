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

	display () {
		circle(this.x, this.y, this.r);
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
			this.r = 0;
		}
	}
}
