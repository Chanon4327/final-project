// Sky level
import { SkyPlatform, Platform } from './common/Platform.js';
import { canvas, ctx } from './script.js';
import { Bird } from './bird.js';

const backgroundImage = new Image();
backgroundImage.src = '../css/sky.jpg';
let birds = []; 
let frameCount = 0;

function addRandomBird() {
    const x = canvas.width; // Start from the right edge of the canvas
    const y = Math.random() * (canvas.height - 100) + 50; // Random y between 50 and canvas.height - 50
    const speed = Math.random() * 2 + 3; // Random speed between 3 and 5
    const bird = new Bird(x, y, speed);
    birds.push(bird);
}

function createSkyPlatforms() {
    const platform = [
        new SkyPlatform(350, 700, 120, 20),
        new SkyPlatform(500, 600, 120, 20),
        new SkyPlatform(700, 550, 50, 10),
        new SkyPlatform(750, 450, 50, 10),
        new SkyPlatform(800, 380, 50, 10),
        new SkyPlatform(900, 300, 100, 20), 
        new SkyPlatform(600, 250, 80, 20),   
        new SkyPlatform(850, 200, 50, 20),  
        new SkyPlatform(200, 150, 40, 10),  
        new SkyPlatform(400, 320, 110, 20), 
        new SkyPlatform(350, 210, 30, 10),
    ];
    return platform;
}

export function getCurrentBirds() {
    return birds;
}

// export function clearCurrentBirds() {
//     birds = [];
// }

export function loadSkyLevel() {
    return createSkyPlatforms();
}

export function updateSkyLevel() {
    frameCount++;
    if (frameCount % 30 === 0) { // Approximately every 2 seconds if frame rate is 60 fps
        addRandomBird();
    }
    birds.forEach(bird => bird.update());
    birds = birds.filter(bird => bird.x + bird.width > 30); // Remove birds that have moved off screen
    //console.log(birds.map(bird => bird.x + bird.width)); // Log positions to see if they reach negative values or less than 0
}

export function drawSkyBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

export function drawSkyLevel() {
    drawSkyBackground();  // Draws the background
    loadSkyLevel();
    birds.forEach(bird => bird.draw(ctx));  // Draws birds
}
