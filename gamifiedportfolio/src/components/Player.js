import { useState, useEffect } from "react"
import Platform from "./Platform";

const Player = ({canvasContext}) => {
const platform = Platform({canvasContext})    
const gravity = 1.5;
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}
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
        player.position.x+=player.velocity.x;
        if(player.position.y + player.height + player.velocity.y <=canvasContext.canvas.height){
            player.velocity.y+=gravity;
        }
        else player.velocity.y =0 ;
      
        
    }

    const animate = () => {
        requestAnimationFrame(animate);
        canvasContext.context.clearRect(0,0,canvasContext.canvas.width,canvasContext.canvas.height);
        update();
        platform.drawPlatform();
        if(keys.right.pressed && player.position.x < 400){
            player.velocity.x = 5;
        }
        else if(keys.left.pressed && player.position.x > 100){
            player.velocity.x = -5;
        }
        else {
            player.velocity.x = 0;
            if(keys.right.pressed){
                platform.platform.position.x -= 5
            }
            else if(keys.left.pressed){
                platform.platform.position.x += 5}
        }
        if(player.position.y + player.height <= platform.platform.position.y 
            && player.position.y +player.height+player.velocity.y >= platform.platform.position.y
            && player.position.x + player.width >= platform.platform.position.x
            && player.position.x <= platform.platform.position.x + platform.platform.width
            ){
            player.velocity.y = 0;
        }


    }

 animate();

 window.addEventListener('keydown', ({keyCode}) => {
    switch(keyCode) {
        case 65:
            console.log("THis is left");
            keys.left.pressed = true
            break;
        case 83:
            console.log("THis is down");
            break;
        case 68:
            console.log("THis is right");
            keys.right.pressed = true
            break;
        case 87:
            console.log("THis is up");
            player.velocity.y -= 20;
            break;                 
    }
 })

 window.addEventListener('keyup', ({keyCode}) => {
    switch(keyCode) {
        case 65:
            console.log("THis is left");
            keys.left.pressed = false
            break;
        case 83:
            console.log("THis is down");
            break;
        case 68:
            console.log("THis is right");
            keys.right.pressed = false
            break;
        case 87:
            console.log("THis is up");
            player.velocity.y -= 20;
            break;                 
    }
 })

}

export default Player;