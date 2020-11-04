let rider;
let coins = [];

function setup() {
    createCanvas(400, 400);
    rider = new Rider()
    for (let i = 0; i < 10; i++) {
        coins.push(new Coin(i * 50 + 200, 200))
    }
}

function draw() {
    background(220, 90)
    fill("orange")
    noStroke()

    translate(-frameCount, 0)
    rider.ride()
    rider.display()

    for (let coin of coins) {
        coin.display()
    }

    if (mouseIsPressed) {
        rider.gravity = false
    } else {
        setTimeout(() => {
            rider.gravity = true
        }, 200)

    }

}