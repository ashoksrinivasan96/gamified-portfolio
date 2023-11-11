import platformImg from '../assets/png/Tiles/2.png'
import platformImg2 from '../assets/png/Tiles/4.png'
import platformImg6 from '../assets/png/Tiles/6.png'
import oceanImg from '../assets/png/Tiles/17.png'
import graveTile from '../assets/grave/png/Tiles/gtile2.png'
import bg from '../assets/png/BG/BG.png'
import bossBg from '../assets/grave/png/BG.png'

export const getPlatformConfig = (canvasContext) => [
    { x: 100, y: canvasContext.canvas.height - 75, img: platformImg},
    { x: 500, y: canvasContext.canvas.height - 275, img: platformImg},
    { x: 100, y: canvasContext.canvas.height - 700, img: platformImg},
    { x: 1460, y: canvasContext.canvas.height - 125, img: platformImg2, height:150 },
    { x: 1460, y: canvasContext.canvas.height - 225, img: platformImg },
    { x: 1860, y: canvasContext.canvas.height - 125, img: platformImg6, height:150 },
    { x: 1850, y: canvasContext.canvas.height - 325, img: platformImg, height:200},
    { x: 2700, y: canvasContext.canvas.height - 375, img: platformImg },
    { x: 3500, y: canvasContext.canvas.height - 450, img: platformImg },
    { x: 3900, y: canvasContext.canvas.height - 125, img: platformImg, height:150, width:600 },
    { x: 4300, y: canvasContext.canvas.height - 600, img: platformImg },
    { x: 4900, y: canvasContext.canvas.height - 690, img: platformImg },
    { x: 5900, y: canvasContext.canvas.height - 75, img: platformImg },
    { x: 6300, y: canvasContext.canvas.height - 75, img: platformImg },
    { x: 6700, y: canvasContext.canvas.height - 475, img: platformImg },
    { x: 7100, y: canvasContext.canvas.height - 200, img: platformImg },
    { x: 7500, y: canvasContext.canvas.height - 75, img: graveTile},
    { x: 7500, y: canvasContext.canvas.height - 75, img: graveTile},
    { x: 7900, y: canvasContext.canvas.height - 75, img: graveTile },
    { x: 8300, y: canvasContext.canvas.height - 75, img: graveTile},
    { x: 8700, y: canvasContext.canvas.height - 75, img: graveTile},
    { x: 9100, y: canvasContext.canvas.height - 75, img: graveTile},
    { x: 9500, y: canvasContext.canvas.height - 75, img: graveTile },
    { x: 9000, y: canvasContext.canvas.height - 475, img: graveTile},
    { x: 8200, y: canvasContext.canvas.height - 300, img: graveTile },
    { x: 7600, y: canvasContext.canvas.height - 670, img: graveTile },
];

export const getBackgroundConfig = (canvasContext) => [
        { x: 0, y: 0, img: bg},
        { x: 1792, y: 0, img: bg},
        { x: 3584, y: 0, img: bg},
        { x: 5326, y: 0, img: bg, width:window.innerWidth+400},
        { x: 7490, y: 0, img: bossBg, width:window.innerWidth+400},
        
        { x: 1500, y:canvasContext.canvas.height - 125, img:oceanImg, width:2500, height:200},
];