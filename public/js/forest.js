// Forest Level
import { ForestPlatform, Platform } from './common/Platform.js';
import { canvas, ctx } from './script.js';

const backgroundImage = new Image();
backgroundImage.src = '../css/forest.avif';

function createForestPlatforms() {

    const platform = [
        new ForestPlatform(300, 600, 60, 20),
        new ForestPlatform(350, 700, 120, 20),
        //new ForestPlatform(100, 500, 60, 20),
        new ForestPlatform(200, 500, 60, 20),
        new ForestPlatform(350, 400, 120, 20),
        new ForestPlatform(600, 311, 120, 20),
        new ForestPlatform(450, 200, 50, 20),
        new ForestPlatform(233, 122, 120, 20)
        // ...
    ]
    return platform;
}

export function loadForestLevel() {

    return createForestPlatforms();
    
}

export function drawForestBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}
