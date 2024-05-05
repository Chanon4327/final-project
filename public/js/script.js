/** 
 * Handles core game loop, canvas management, and rendering
 */

import { FrogSprite } from './common/FrogSprite.js'
import { loadForestLevel, drawForestBackground } from './forest.js'; // forest level
import { loadSkyLevel, drawSkyBackground } from './sky.js'; // sky level
import { loadSpaceLevel, drawSpaceBackground } from './space.js'; // space level


export const canvas = document.getElementById('game-canvas');
export const ctx = canvas.getContext('2d');
canvas.width = 1000; // change according to the canvas width
canvas.height = 800; // change according to the canvas height

let Frog; // create player object
let platforms = loadForestLevel(); // default
let drawBackground = drawForestBackground; // default
let animationFrameId;

let forestLevel = document.getElementById("forestLevel");
let skyLevel = document.getElementById("skyLevel");
let spaceLevel = document.getElementById("spaceLevel");

function initForestLevel() {
    platforms = loadForestLevel();
    drawBackground = drawForestBackground;
    Frog = new FrogSprite(); // Re-instantiate Frog
    cancelExistingGameLoop();
    gameLoop();
}

function initSkyLevel() {
    platforms = loadSkyLevel();
    drawBackground = drawSkyBackground;
    Frog = new FrogSprite(); // Re-instantiate Frog
    cancelExistingGameLoop();
    gameLoop();
}

function initSpaceLevel() {
    platforms = loadSpaceLevel();
    drawBackground = drawSpaceBackground;
    Frog = new FrogSprite(); // Re-instantiate Frog
    cancelExistingGameLoop();
    gameLoop();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    platforms.forEach(platform => {
        platform.draw(ctx);
    });

    Frog.update(platforms);
    Frog.draw(ctx);

    //Frog.correctPositionOnPlatform(pl atforms);
    animationFrameId = requestAnimationFrame(gameLoop);
}

function cancelExistingGameLoop() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
}

// button handler for each level
forestLevel.addEventListener('click', initForestLevel);
skyLevel.addEventListener('click', initSkyLevel);
spaceLevel.addEventListener('click', initSpaceLevel);

document.addEventListener('keydown', function(event) {
    switch (event.code) {
        case 'Space':
            if (!Frog.isCharging && Frog.onGround(platforms)) {
                Frog.isCharging = true;
                Frog.startJump(platforms);
            }
            break;
        case 'ArrowLeft':
            Frog.movingLeft = true;
            break;
        case 'ArrowRight':
            Frog.movingRight = true;
            break;
    }
});

document.addEventListener('keyup', function(event) {
    switch (event.code) {
        case 'Space':
            if (Frog.isCharging) {
                Frog.isCharging = false;
                Frog.endJump();
            }
            break;
        case 'ArrowLeft':
            Frog.movingLeft = false;
            break;
        case 'ArrowRight':
            Frog.movingRight = false;
            break;
    }
});

initForestLevel(); // default

