import { useState, useEffect } from "react"


const Scenery = ({canvasContext},x,y, image) => {
    
    const [scenery, setScenery] = useState(
    {
        position: {
            x,
            y
        },
        width: 400,
        height: 100,

        
    })
    const img = new Image();
    img.src = image;

    const drawScenery = () => {
    canvasContext.context.drawImage(img, scenery.position.x, scenery.position.y, scenery.width, scenery.height);
    }


   return {drawScenery, platform} 
}

export default Scenery;