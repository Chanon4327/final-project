// Sky level
import { SpacePlatform, Platform } from './common/Platform.js';
import { canvas, ctx } from './script.js';

const backgroundImage = new Image();
backgroundImage.src = '../css/space.jpg';

function createSpacePlatforms() {

    const platform = [
        new SpacePlatform(350, 700, 120, 20),
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
