import { useState, useEffect } from "react"


const Platform = ({canvasContext},{...data}) => {
    
    const platform =  {
        position: {
            x: data.x,
            y: data.y
        },
        width: data.width?data.width:400,
        height: data.height?data.height:100,
        collision: (data.collision)?(data.collision):true

        
    }

    const img = new Image();
    img.src = data.img;

    const drawPlatform = () => {
    canvasContext.context.drawImage(img, platform.position.x, platform.position.y, platform.width, platform.height);
    }


   return {drawPlatform, platform} 
}

export default Platform;