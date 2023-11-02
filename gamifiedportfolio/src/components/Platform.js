import { useState, useEffect } from "react"

const Platform = ({canvasContext}) => {

    const [platform, setPlatform] = useState(
    {
        position: {
            x: 200,
            y: 100
        },
        width: 200,
        height: 20
    })

    const drawPlatform = () => {
    canvasContext.context.fillStyle = 'blue'    
    canvasContext.context.fillRect(platform.position.x, platform.position.y, platform.width, platform.height);
    }


   return {drawPlatform, platform} 
}

export default Platform;