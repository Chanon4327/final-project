/** 
 *  Platform class
 */
import { canvas, ctx } from '../script.js'

// Base Platform Class
export class Platform {
    constructor(x, y, width, height, image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
    }

    draw(ctx) {
        let imgAspectRatio = this.image.naturalWidth / this.image.naturalHeight;
        let scaleWidth = this.width; // Scale based on platform width
        let scaleHeight = scaleWidth / imgAspectRatio; // Calculate the height based on the width

        let offsetX = (this.width - scaleWidth) / 2;
        let offsetY = (this.height - scaleHeight) / 2;
        if (this.image.complete) {
            ctx.drawImage(this.image, this.x + offsetX, this.y + offsetY, scaleWidth, scaleHeight);
        } else {
            this.image.onload = () => {
                ctx.drawImage(this.image, this.x + offsetX, this.y + offsetY, scaleWidth, scaleHeight);
            };
        }
    }
}

const forestPlatformImage = new Image();
const skyPlatformImage = new Image();
const spacePlatformImage = new Image();

forestPlatformImage.src = '../css/log.webp'
skyPlatformImage.src = '../css/cloud.png'
spacePlatformImage.src = '../css/space-rock.png'

// Forest Platform
export class ForestPlatform extends Platform {
    constructor(x, y, width, height) {
        super(x, y, width, height, forestPlatformImage);
    }
}

// Sky Platform
export class SkyPlatform extends Platform {
    constructor(x, y, width, height) {
        super(x, y, width, height, skyPlatformImage);
    }
}

// Space Platform
export class SpacePlatform extends Platform {
    constructor(x, y, width, height) {
        super(x, y, width, height, spacePlatformImage);
    }
}

// export class MovingPlatform extends Platform {
//     constructor(x, y, width, height, minX, maxX, minY, maxY, speedX, speedY) {
//         super(x, y, width, height, spacePlatformImage); // Initialize with the base class constructor
//         this.minX = minX;
//         this.maxX = maxX;
//         this.minY = minY;
//         this.maxY = maxY;
//         this.speedX = speedX;
//         this.speedY = speedY;
//         this.directionX = 1;  // Moving right initially
//         this.directionY = 0;  // Moving vertically is optional, set speedY to 0 if not needed
//     }

//     update() {
//         // Move horizontally within the specified bounds
//         if (this.speedX !== 0) {
//             this.x += this.speedX * this.directionX;
//             if (this.x <= this.minX || this.x + this.width >= this.maxX) {
//                 this.directionX *= -1;  // Reverse direction when reaching the bounds
//             }
//         }

//         // Move vertically within the specified bounds
//         if (this.speedY !== 0) {
//             this.y += this.speedY * this.directionY;
//             if (this.y <= this.minY || this.y + this.height >= this.maxY) {
//                 this.directionY *= -1;  // Reverse direction when reaching the bounds
//             }
//         }
//     }
// }

export class MovingPlatform extends Platform {
    constructor(x, y, width, height, minX, maxX, minY, maxY, speedX, speedY) {
        super(x, y, width, height, spacePlatformImage); // Pass the image appropriate for the platform type
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;
        this.speedX = speedX;
        this.speedY = speedY;
        this.directionX = 1;  // Moving right initially
        this.directionY = speedY !== 0 ? 1 : 0;  // Set directionY based on whether vertical movement is needed
    }

    update() {
        // Move horizontally within the specified bounds
        if (this.speedX !== 0) {
            this.x += this.speedX * this.directionX;
            if (this.x < this.minX || this.x + this.width > this.maxX) {
                this.directionX *= -1;  // Reverse direction when reaching the bounds
            }
        }

        // Move vertically within the specified bounds
        if (this.speedY !== 0) {
            this.y += this.speedY * this.directionY;
            if (this.y < this.minY || this.y + this.height > this.maxY) {
                this.directionY *= -1;  // Reverse direction when reaching the bounds
            }
        }
    }
}