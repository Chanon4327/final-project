/** 
 * Handles core game loop, canvas management, and rendering
 */

import { Player } from './player.js'

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800; // change according to the canvas width
canvas.height = 600; // change according to the canvas height

let player = new Player(100, 100); // postion the player

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.draw(ctx);
    requestAnimationFrame(gameLoop);
}

gameLoop();