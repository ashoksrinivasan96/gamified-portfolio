import React, { useRef, useEffect, useState } from 'react';
import Game from './Game';


const Canvas = () => {
    // Create a ref to the canvas element
    const [canvasContext, setCanvasContext] = useState(null);
    const [isPageLoaded, setPageLoaded] = useState(false);
   
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
    
        if (canvas) {

          let c = canvas.getContext('2d');
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight; 
         
          setCanvasContext({context:c,canvas:canvas});
          setPageLoaded(true);
        }
      },[canvasRef]);
  
    

    return(
    <>
    <canvas ref={canvasRef}></canvas>
       {isPageLoaded && <Game canvasContext={canvasContext} />}
    </>
    
    )
  } 

  export default Canvas;