/** 
 * Handles core game loop, canvas management, and rendering
 */

import { Bird } from './bird.js';
import { FrogSprite } from './common/FrogSprite.js'
import { loadForestLevel, drawForestBackground } from './forest.js'; // forest level
import { loadSkyLevel, drawSkyBackground, updateSkyLevel, drawSkyLevel, getCurrentBirds } from './sky.js'; // sky level
import { loadSpaceLevel, drawSpaceBackground } from './space.js'; // space level
import { Trophy } from './common/Trophy.js';
import { Confetti } from './common/confetti.js';

export const canvas = document.getElementById('game-canvas');
export const ctx = canvas.getContext('2d');
canvas.width = 1000; // change according to the canvas width
canvas.height = 800; // change according to the canvas height

let Frog; // create player object
let birds = [];
let confet = [];
let platforms = loadForestLevel(); // default
let drawBackground = drawForestBackground; // default
let animationFrameId;
let trophy = new Trophy(); // define the endgame
let isGameRunning = true;

let forestLevel = document.getElementById("forestLevel");
let skyLevel = document.getElementById("skyLevel");
let spaceLevel = document.getElementById("spaceLevel");

let currentLevel = "forest"; // default

function initForestLevel() {
    currentLevel = "forest";
    platforms = loadForestLevel();
    drawBackground = drawForestBackground;
    trophy = new Trophy(240, 80, 40, 40, 'css/trophy.png')
    Frog = new FrogSprite(); // Re-instantiate Frog
    birds = []; // Clear any birds from previous levels
    cancelExistingGameLoop();
    gameLoop();
}

function initSkyLevel() {
    currentLevel = "sky";
    platforms = loadSkyLevel(); 
    drawBackground = drawSkyLevel;
    trophy = new Trophy(200, 120, 40, 40, 'css/trophy.png')
    Frog = new FrogSprite(); // Re-instantiate Frog
    birds = []; // Clear any birds from previous levels
    cancelExistingGameLoop();
    gameLoop();
}

function initSpaceLevel() {
    currentLevel = "space";
    platforms = loadSpaceLevel();
    drawBackground = drawSpaceBackground;
    trophy = new Trophy(100, 70, 40, 40, 'css/trophy.png')
    Frog = new FrogSprite(); // Re-instantiate Frog
    birds = []; // Clear any birds from previous levels
    Frog.gravity = 0.6;
    Frog.speed = 4;
    cancelExistingGameLoop();
    gameLoop();
}

function endGame() {
    //alert("Nice JOB!!")
    spawnConfetti(Frog.x + Frog.width / 2, Frog.y + Frog.height / 2);
}

function spawnConfetti(x, y) {
    const colors = ['#ff3838', '#ffb8b8', '#fff383', '#38ff85', '#386eff', '#b838ff']; // Confetti colors
    for (let i = 0; i < 100; i++) { // Spawn 100 confetti particles
        const color = colors[Math.floor(Math.random() * colors.length)];
        confet.push(new Confetti(x, y, color));
    }
}

function updateConfetti() {
    confet.forEach(particle => particle.update());
    confet = confet.filter(particle => particle.isAlive()); // Remove dead confetti
}

function drawConfetti() {
    confet.forEach(particle => particle.draw(ctx));
}

function gameLoop() {

    // stop the game
    if (!isGameRunning) {        
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentLevel === "sky") {
        updateSkyLevel();
        birds = getCurrentBirds();
    }

    if (currentLevel === "space") {
        platforms.forEach(platform => {
            if (platform.update) {
                platform.update();  // Call update on moving platforms
            }
            platform.draw(ctx);
        });
    }

    drawBackground();
    platforms.forEach(platform => {
        platform.draw(ctx);
    });
    
    Frog.update(platforms, birds);
    Frog.draw(ctx);
    trophy.draw();
    drawConfetti();
    updateConfetti();
    
    if (trophy.checkCollision(Frog)) {
        endGame();
    } 

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

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//initSkyLevel();
//initSpaceLevel();
initForestLevel(); // default

