// bird obstacle
import { canvas, ctx } from './script.js';
export class Bird {

    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.width = 30; // Set width of the bird
        this.height = 20; // Set height of the bird
        this.speed = speed;
        this.img = new Image();
        this.img.src = '../css/bird.gif'
    }

    draw(ctx) {
        if (this.img.complete) {  // Check if the image is loaded
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } else {
            this.img.onload = () => {
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            };
        }
    }

    update() {
        this.x -= this.speed; // Move the bird from right to left
        if (this.x + this.width < 0) {
            this.x = canvas.width; // Reset position to the right side
        }
    }

}