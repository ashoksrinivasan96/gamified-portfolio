import { useState, useEffect } from "react"


const Player = ({canvasContext}, {...data}) => {
    const player = {
        speed: 15,
        position:{
            x: 100,
            y: 100
        },
        width : 128,
        height : 128,
        velocity: {
            x: 0,
            y: 1
        },
        frames: 1,
        animation: {
            stand: {
                left:"",
                right:""
            },
            run: {
                left:"",
                right:""
            }
        }
    }

const img = new Image();
img.src = data.image;
   
    const drawPlayer = () => {
       canvasContext.context.drawImage(img,player.frames*128,0,128,128 ,player.position.x, player.position.y, player.width, player.height);
    }

    const updatePlayer = () => {
        player.frames++;
        if(player.frames>= 6) player.frames = 0;
        drawPlayer();
        player.position.y+=player.velocity.y;
        player.position.x+=player.velocity.x;
        if(player.position.y + player.height + player.velocity.y <=canvasContext.canvas.height){
            player.velocity.y+=data.gravity;
        }

      
        
    }

return {drawPlayer, player, updatePlayer}
}

export default Player;