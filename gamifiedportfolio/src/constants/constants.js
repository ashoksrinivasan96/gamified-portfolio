import platformImg from '../assets/png/Tiles/2.png'
import platformImg2 from '../assets/png/Tiles/4.png'
import platformImg6 from '../assets/png/Tiles/6.png'
import oceanImg from '../assets/png/Tiles/17.png'
import backgroundImg from '../assets/background.png'
import backgroundImgLight from '../assets/Backgroundlight.png'

export const getPlatformConfig = (canvasContext) => [
    { x: 100, y: canvasContext.canvas.height - 75, img: platformImg},
    { x: 500, y: canvasContext.canvas.height - 75, img: platformImg},
    { x: 1000, y: canvasContext.canvas.height - 75, img: platformImg},
    { x: 1500, y: canvasContext.canvas.height - 125, img: platformImg2, height:150 },
    { x: 1500, y: canvasContext.canvas.height - 225, img: platformImg },
    { x: 2200, y: canvasContext.canvas.height - 125, img: oceanImg, height:200, collision:false},
    { x: 1900, y: canvasContext.canvas.height - 125, img: platformImg6, height:150 },
    { x: 1900, y: canvasContext.canvas.height - 325, img: platformImg, height:200 },
    { x: 2600, y: canvasContext.canvas.height - 125, img: oceanImg, height:200},
    { x: 3000, y: canvasContext.canvas.height - 125, img: oceanImg, height:200 },
    { x: 2500, y: canvasContext.canvas.height - 375, img: platformImg },
    { x: 3100, y: canvasContext.canvas.height - 450, img: platformImg },
    { x: 3700, y: canvasContext.canvas.height - 525, img: platformImg },
    { x: 4300, y: canvasContext.canvas.height - 600, img: platformImg },
    { x: 4900, y: canvasContext.canvas.height - 675, img: platformImg },
    { x: 5500, y: canvasContext.canvas.height - 675, img: platformImg },
    { x: 5900, y: canvasContext.canvas.height - 675, img: platformImg },
    { x: 6300, y: canvasContext.canvas.height - 675, img: platformImg },
    { x: 6700, y: canvasContext.canvas.height - 675, img: platformImg },
    { x: 7100, y: canvasContext.canvas.height - 675, img: platformImg },
    { x: 7500, y: canvasContext.canvas.height - 675, img: platformImg },
    { x: 7900, y: canvasContext.canvas.height - 675, img: platformImg },
    { x: 8300, y: canvasContext.canvas.height - 675, img: platformImg },
    { x: 8700, y: canvasContext.canvas.height - 675, img: platformImg },
    { x: 9100, y: canvasContext.canvas.height - 675, img: platformImg },
    { x: 9500, y: canvasContext.canvas.height - 675, img: platformImg },
];

export const getBackgroundConfig = (canvasContext) => [
        { x: 0, y: 0, img: backgroundImgLight},
        { x: 1792, y: 0, img: backgroundImgLight},
        { x: 3584, y: 0, img: backgroundImgLight},
        { x: 5326 - 50, y: 0, img: backgroundImg},
];