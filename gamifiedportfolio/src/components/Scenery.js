import { useState, useEffect } from "react"


const Scenery = ({canvasContext},x,y, image) => {
    const initState =  {
        position: {
            x,
            y
        },
        width: window.innerWidth,
        height: window.innerHeight,

        
    }
    const [scenery, setScenery] = useState(initState)
    const img = new Image();
    img.src = image;

    const drawScenery = () => {
    canvasContext.context.drawImage(img, scenery.position.x, scenery.position.y, scenery.width, scenery.height);
    }

    const resetScenery = () => {
        setScenery(initState);
    }


   return {drawScenery, scenery, setScenery, resetScenery} 
}

export default Scenery;