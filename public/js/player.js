/** governs the player's properties and behaviors, movement, jumping */

export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.speed = 5;
        this.jumpPower = 20;
        this.gravity = 2;
        this.velocityY = 0;
    }

    update() {
        this.velocityY += this.gravity;
        this.y += this.velocityY;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
