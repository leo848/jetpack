let rider;
let coins = [];
let timer = 0;

function setup() {
    createCanvas(400, 400);
    rider = new Rider()
    for (let i = 0; i < 10; i++) {
        coins.push(new Coin(i * 50 + 200, 200))
    }
}

function draw() {

    translate(-rider.xvel * frameCount, 0)
    background(220, 90)
    fill("orange")
    noStroke()



    rider.ride()
    rider.display()

    for (let coin of coins) {
        coin.display()
        coin.plopIfRiderNearby()
    }

    if (mouseIsPressed) {
        rider.gravity = false
    } else {
        setTimeout(() => {
            rider.gravity = true
        }, 200)

    }

}