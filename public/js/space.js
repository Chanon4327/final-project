// Space level
import { SpacePlatform, Platform, MovingPlatform } from './common/Platform.js';
import { canvas, ctx } from './script.js';

const backgroundImage = new Image();
backgroundImage.src = '../css/space.jpg';

function createSpacePlatforms() {

    const platform = [
        new SpacePlatform(350, 700, 40, 20),
        new MovingPlatform(100, 400, 60, 20, 100, 800, 0, 0, 4, 0),
        new MovingPlatform(500, 100, 40, 20, 500, 800, 0, 0, 3, 0),

        new SpacePlatform(100, 100, 60, 30),
        new MovingPlatform(700, 500, 40, 20, 500, 1000, 0, 0, 2, 0),
        new SpacePlatform(500, 300, 40, 20),
        new MovingPlatform(300, 200, 40, 20, 0, 0, 200, 500, 0, 2),
        
        // ...
    ]
    return platform;
}

export function loadSpaceLevel() {

    return createSpacePlatforms();
    
}

export function drawSpaceBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}
