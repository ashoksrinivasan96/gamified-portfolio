import { useState, useEffect } from "react"


const Platform = ({canvasContext},x,y, image) => {
    
    const [platform, setPlatform] = useState(
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

    const drawPlatform = () => {
    canvasContext.context.drawImage(img, platform.position.x, platform.position.y, platform.width, platform.height);
    }


   return {drawPlatform, platform, setPlatform} 
}

export default Platform;