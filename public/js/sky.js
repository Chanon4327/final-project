// Sky level
import { SkyPlatform, Platform } from './common/Platform.js';
import { canvas, ctx } from './script.js';

const backgroundImage = new Image();
backgroundImage.src = '../css/sky.jpg';

function createSkyPlatforms() {

    const platform = [
        new SkyPlatform(350, 700, 120, 20),
        // ...
    ]
    return platform;
}

export function loadSkyLevel() {

    return createSkyPlatforms();
    
}

export function drawSkyBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}
