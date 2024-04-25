/** governs the player's properties and behaviors, movement, jumping */

import { canvas, ctx } from './script.js'

export class Player {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height - 20; // minus the width
        this.width = 20;
        this.height = 20;
        this.speed = 5;
        this.maxJumpPower = 40;
        this.minJumpPower = 10;
        this.jumpCharge = 0; // how much the jump is charged
        this.gravity = 2;
        this.velocityY = 0;
        this.isJumping = false;
    }

    startJump() {
        if (this.onGround() && !this.isJumping) {
            this.isJumping = true;
            this.jumpCharge = this.minJumpPower;
        }
    }

    endJump() {
        if (this.isJumping) {
            this.isJumping = false;
            this.velocityY = -this.jumpCharge;
            this.jumpCharge = 0;
            console.log('Jump ended with charge:', this.velocityY);
        }
    }

    chargeJump() {
        if (this.isJumping && this.jumpCharge < this.maxJumpPower) {
            this.jumpCharge += 1;
            //console.log (this.jumpCharge)
        } 
    }

    // will need to change this to account for platform as well
    onGround() {
        return this.y >= canvas.height - this.height;
    }

    update() {
        this.chargeJump();
        console.log('Updating, jumpCharge:', this.jumpCharge);
        
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        // prevent from dropping through ground
        if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height;
            this.velocityY = 0;
        }

    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
