import React, { useRef, useEffect, useState } from 'react';
import Player from './Player';

const Canvas = () => {
    // Create a ref to the canvas element
    const [context, setContext] = useState(null);
    const [isPageLoaded, setPageLoaded] = useState(false);

    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
    
        if (canvas) {

          let c = canvas.getContext('2d');
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight; 
          setContext(c);
          setPageLoaded(true);
        }
      },[canvasRef]);
  
   
    return(
    <>
    <canvas ref={canvasRef}></canvas>
    
    {
        isPageLoaded?<Player context = {context} />:<></>}
    
    </>
    
    )
  } 

  export default Canvas;