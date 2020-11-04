class Rider {
    constructor() {
        this.x = 50
        this.y = 200
        this.gravity = true
    }

    ride() {

        if (this.gravity) {
            this.y += 2
        } else {
            this.y -= 2
        }

        if (this.y >= height) {
            this.y -= 4
        } else if (this.y <= 0) {
            this.y += 4
        }

        this.x++;
    }

    display() {
        circle(this.x, this.y, 20)
    }
}

class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 20;
    }

    display() {
        push()

        stroke(0)
        fill(255, 100, 0)

        circle(this.x, this.y, this.r)

        pop()
    }


}