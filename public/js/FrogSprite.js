/** governs the player's properties and behaviors, movement, jumping */

import { canvas, ctx } from './script.js'

export class FrogSprite {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height - 20; // minus the width
        this.width = 20;
        this.height = 20;
        this.speed = 5;
        this.maxJumpPower = 40;
        this.minJumpPower = 10;
        this.jumpCharge = 0; // how much the jump is charged
        this.gravity = 2; // can change the gravity of the player
        this.velocityY = 0;
        this.velocityX = 0;
        this.isJumping = false;
        this.movingLeft = false;
        this.movingRight = false;
    }

    startJump() {
        if (this.onGround() && !this.isJumping) {
            this.isJumping = true;
            this.jumpCharge = this.minJumpPower;
        }

        this.velocityX = 0;
        if (this.movingLeft) {
            this.velocityX = -this.speed;
        } else if (this.movingRight) {
            this.velocityX = this.speed;
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
            this.jumpCharge += 0.5;
            //console.log (this.jumpCharge)
        } 
    }

    // will need to change this to account for platform as well
    onGround() {
        return this.y >= canvas.height - this.height;
    }

    update() {
        // Jump Charge
        this.chargeJump();
        console.log('Updating, jumpCharge:', this.jumpCharge);

        this.velocityY += this.gravity;
        this.y += this.velocityY;
        
        // prevent from dropping through ground
        if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height;
            this.velocityY = 0;
            this.velocityX = 0;
        }

        // Horizontal movement
        if (this.movingLeft) {
            this.velocityX = -this.speed;
        } else if (this.movingRight) {
            this.velocityX = this.speed;
        } 

        // can move horizontally in the air
        if (!this.onGround()) {
            this.x += this.velocityX;
        } else {
            this.velocityX *= 0.9; // friction
            this.velocityX = 0;
        }

        this.x += this.velocityX;
        this.x = Math.max(0, Math.min(this.x, canvas.width - this.width)); 
        
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
