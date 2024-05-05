/** 
 * governs the player's properties and behaviors, movement, jumping 
 * */

import { canvas, ctx } from '../script.js'
import { Platform } from './Platform.js';
import { Bird } from '../bird.js';

export class FrogSprite {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height - 20; // minus the width
        this.width = 20;
        this.height = 20;
        this.speed = 7;
        this.maxJumpPower = 20;
        this.minJumpPower = 5;
        this.jumpCharge = 0; // how much the jump is charged
        this.gravity = 1.6; // can change the gravity of the player
        this.velocityY = 0;
        this.velocityX = 0;
        this.isJumping = false;
        this.movingLeft = false;
        this.movingRight = false;
    }

    startJump(platforms) {
        if (this.onGround(platforms) && !this.isJumping) {
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
            //console.log('Jump ended with charge:', this.velocityY);
        }
    }

    chargeJump() {
        if (this.isJumping && this.jumpCharge < this.maxJumpPower) {
            this.jumpCharge += 0.5;
            //console.log (this.jumpCharge)
        } 
    }

    // will need to change this to account for platform as well
    onGround(platforms) {
        if (this.y >= canvas.height - this.height) {
            return true; // On the ground
        }
    
        // Check if on a platform
        const platform = this.collisionWithPlatform(platforms);
        if (platform) {
            this.y = platform.y - this.height; // Align the bottom of the frog with the top of the platform
            this.velocityY = 0;
            return true;
        }
        return false; // In the air
    }

    update(platforms, birds) {
        this.chargeJump();
    
        if (!this.onGround(platforms)) {
            this.velocityY += this.gravity;
        }
    
        let potentialY = this.y + this.velocityY;
        let platform = this.collisionWithPlatform(platforms);
    
        if (platform) {
            if (this.isJumping) {
                potentialY = platform.y - this.height;
                //this.isJumping = false;
            }
        }
    
        if (potentialY < canvas.height - this.height) {
            this.y = potentialY;
        } else {
            this.y = canvas.height - this.height;
            this.velocityY = 0;
            //this.velocityX = 0;
        }
    
        this.handleHorizontalMovement(platforms);
        this.constrainToCanvas();

        // Check for collision with each bird
        birds.forEach(bird => {
            if (this.collisionWithBird(bird)) {
                console.log("Collision with bird detected!");
                this.x -= 10;
            }
        });

    }
    
    collisionWithPlatform(platforms) {
        const bottomOfFrog = this.y + this.height;
        const topOfFrog = this.y;
        for (let platform of platforms) {
            const onPlatformHorizontally = this.x < platform.x + platform.width && this.x + this.width > platform.x;
            const nextBottomOfFrog = bottomOfFrog + this.velocityY;
            const nextTopOfFrog = topOfFrog + this.velocityY;
    
            // Collision from below (frog is moving up and hits the bottom of the platform)
            if (onPlatformHorizontally && nextTopOfFrog <= platform.y + platform.height && nextTopOfFrog > platform.y) {
                if (this.velocityY < 0) {
                    this.velocityY = 0; // Stop vertical movement
                    this.y = platform.y + platform.height; // Place frog directly below the platform
                    return null; // No platform landed on, just blocked
                }
            }
    
            // Collision from above (frog is moving down and lands on the top of the platform)
            if (onPlatformHorizontally && nextBottomOfFrog >= platform.y && bottomOfFrog <= platform.y) {
                this.y = platform.y - this.height;
                this.velocityY = 0;
                //console.log(platform);
                return platform; // Frog lands on the platform
            }
        }
        return null;
    }

    collisionWithBird(bird) {
        return this.x < bird.x + bird.width &&
           this.x + this.width > bird.x &&
           this.y < bird.y + bird.height &&
           this.y + this.height > bird.y;
    }
    
    handleHorizontalMovement(platforms) {
        this.velocityX = 0;
        if (this.movingLeft) {
            this.velocityX = -this.speed;
        } else if (this.movingRight) {
            this.velocityX = this.speed;
        }
        if (this.onGround(platforms)) {
            this.velocityX *= 0.9; // Apply friction if on ground
        }
        this.x += this.velocityX;
    }
    
    constrainToCanvas() {
        this.x = Math.max(0, Math.min(this.x, canvas.width - this.width)); 
    }
    

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
