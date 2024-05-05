export class Confetti {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * (5 - 2) + 2; // Random size between 2 and 5
        this.speedX = Math.random() * 10 - 5; // Random horizontal speed
        this.speedY = Math.random() * 10 - 5; // Random vertical speed
        this.color = color;
        this.gravity = 0.1;
        this.life = 100; // Lifespan of the confetti particle
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += this.gravity; // Apply gravity effect
        this.life -= 1; // Decrease life
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    isAlive() {
        return this.life > 0;
    }
}