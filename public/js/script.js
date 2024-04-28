/** 
 * Handles core game loop, canvas management, and rendering
 */

import { FrogSprite } from './FrogSprite.js'

export const canvas = document.getElementById('game-canvas');
export const ctx = canvas.getContext('2d');
canvas.width = 800; // change according to the canvas width
canvas.height = 600; // change according to the canvas height

let Frog = new FrogSprite(); // create player object

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    Frog.update();
    
    Frog.draw(ctx);
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && Frog.onGround()) {
        Frog.isCharging = true;  // Start charging
        Frog.startJump();
    }
    // When left or right arrow keys are pressed, don't immediately apply movement,
    // just set the flags to be used when the jump is actually executed.
    if (event.code === 'ArrowLeft') {
        Frog.movingLeft = true;
    }
    if (event.code === 'ArrowRight') {
        Frog.movingRight = true;
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'Space') {
        Frog.isCharging = false;  // Stop charging
        Frog.endJump(); // Execute the jump with the charged power
    }
    // When the keys are released, clear the flags
    if (event.code === 'ArrowLeft') {
        Frog.movingLeft = false;
    }
    if (event.code === 'ArrowRight') {
        Frog.movingRight = false;
    }
});

gameLoop();