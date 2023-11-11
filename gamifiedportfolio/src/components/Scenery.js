import { useState, useEffect } from "react"


const Scenery = ({canvasContext},{...data}) => {
    const scenery =  {
        position: {
            x: data.x,
            y: data.y
        },
        width: data.width?data.width:window.innerWidth,
        height: data.height?data.height:window.innerHeight,

        
    }
    const img = new Image();
    img.src = data.img;
    
    const drawScenery = () => {
    canvasContext.context.drawImage(img, scenery.position.x, scenery.position.y, scenery.width, scenery.height);
    }


   return {drawScenery, scenery} 
}

export default Scenery;