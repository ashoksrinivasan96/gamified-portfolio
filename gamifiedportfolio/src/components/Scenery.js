import { useState, useEffect } from "react"


const Scenery = ({canvasContext},x,y, image) => {
    
    const [scenery, setScenery] = useState(
    {
        position: {
            x,
            y
        },
        width: window.innerWidth,
        height: window.innerHeight,

        
    })
    const img = new Image();
    img.src = image;

    const drawScenery = () => {
    canvasContext.context.drawImage(img, scenery.position.x, scenery.position.y, scenery.width, scenery.height);
    }


   return {drawScenery, scenery} 
}

export default Scenery;