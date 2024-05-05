/** 
 *  Platform class
 */
import { canvas, ctx } from '../script.js'

// Base Platform Class
export class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.fillStyle = '#ffffffff'; // Default white
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Forest Platform
export class ForestPlatform extends Platform {
    draw(ctx) {
        ctx.fillStyle = '#8B4513'; // Dark green for the forest
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Sky Platform
export class SkyPlatform extends Platform {
    draw(ctx) {
        ctx.fillStyle = '#6ca6cd'; // Light blue for the sky
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Space Platform
export class SpacePlatform extends Platform {
    draw(ctx) {
        ctx.fillStyle = '#4b0082'; // Indigo for space
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}