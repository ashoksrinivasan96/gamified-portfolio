import { useState, useEffect } from "react"



const Player = ({canvasContext}, gravity) => {
    const initState = {
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
const [player, setPlayer] = useState(initState)

const resetPlayer = () => {
    
    setPlayer(initState);
}
   
    const drawPlayer = () => {
       canvasContext.context.fillStyle = 'red'; 
       canvasContext.context.fillRect(player.position.x,player.position.y,player.height,player.width)
    }

    const updatePlayer = () => {
        drawPlayer();
        player.position.y+=player.velocity.y;
        player.position.x+=player.velocity.x;
        if(player.position.y + player.height + player.velocity.y <=canvasContext.canvas.height){
            player.velocity.y+=gravity;
        }

      
        
    }

return {drawPlayer, player, updatePlayer, resetPlayer}
}

export default Player;