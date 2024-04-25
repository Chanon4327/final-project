/** 
 * Handles core game loop, canvas management, and rendering
 */

import { Player } from './player.js'

export const canvas = document.getElementById('game-canvas');
export const ctx = canvas.getContext('2d');
canvas.width = 800; // change according to the canvas width
canvas.height = 600; // change according to the canvas height

let player = new Player(); // create player object

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.draw(ctx);
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        player.startJump();
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'Space') {
        player.endJump();
    }
});

gameLoop();