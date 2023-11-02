import { useState, useEffect } from "react"

const Player = ({canvasContext}) => {
const gravity = 1.5;
const [player, setPlayer] = useState({
        position:{
            x: 100,
            y: 100
        },
        width : 30,
        height : 30,
        velocity: {
            x: 0,
            y: 1
        }
    }
    )

    const draw = () => {
       canvasContext.context.fillStyle = 'red'; 
       canvasContext.context.fillRect(player.position.x,player.position.y,player.height,player.width)
    }

    const update = () => {
        draw();
        player.position.y+=player.velocity.y;
        if(player.position.y + player.height + player.velocity.y <=canvasContext.canvas.height){
            player.velocity.y+=gravity;
        }
        else player.velocity.y =0 ;
      
        
    }

    const animate = () => {
        requestAnimationFrame(animate);
        canvasContext.context.clearRect(0,0,canvasContext.canvas.width,canvasContext.canvas.height);
        update();
    }

 animate();

}

export default Player;