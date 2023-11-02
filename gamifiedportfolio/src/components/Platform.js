import { useState, useEffect } from "react"


const Platform = ({canvasContext},x,y, image) => {
    const initState =  {
        position: {
            x,
            y
        },
        width: 400,
        height: 100,

        
    }
    const [platform, setPlatform] = useState(initState)
    const img = new Image();
    img.src = image;

    const drawPlatform = () => {
    canvasContext.context.drawImage(img, platform.position.x, platform.position.y, platform.width, platform.height);
    }

    const resetPlatform = () => {

        setPlatform(initState);
    }


   return {drawPlatform, platform, setPlatform, resetPlatform} 
}

export default Platform;