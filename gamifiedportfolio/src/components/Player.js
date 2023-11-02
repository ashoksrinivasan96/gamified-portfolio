import { useState, useEffect } from "react"
import Platform from "./Platform";
import platformImg from '../assets/platform.png';

const Player = ({canvasContext}) => {
const platforms = [Platform({canvasContext}, 200, 950, platformImg),
    Platform({canvasContext}, 800,950, platformImg)
]  
const gravity = 1.5;
let scrollLength = 0;

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
        
        platforms.forEach((platform) => {
            platform.drawPlatform();
        })
        update();
        if(keys.right.pressed && player.position.x < 400){
            player.velocity.x = 5;
            scrollLength+=5;
        }
        else if(keys.left.pressed && player.position.x > 100){
            player.velocity.x = -5;
            scrollLength-= 5;
        } else {
            player.velocity.x = 0;
            if(keys.right.pressed){
                scrollLength+=5;
                platforms.forEach((platform) => {
    
                    platform.platform.position.x -= 5
                })
                
            }
            else if(keys.left.pressed){
                scrollLength-=5;
                platforms.forEach((platform) => {            
                platform.platform.position.x += 5
                
                    
            })
            }
        }
        platforms.forEach((platform) => {
        if(player.position.y + player.height <= platform.platform.position.y 
            && player.position.y +player.height+player.velocity.y >= platform.platform.position.y
            && player.position.x + player.width >= platform.platform.position.x
            && player.position.x <= platform.platform.position.x + platform.platform.width
            ){
            player.velocity.y = 0;
        }
    })

    if(scrollLength > 2000){
    
        console.log("Winner!")
    }
    }

 animate();

 window.addEventListener('keydown', (event) => {
    switch(event.code) {
        case 'KeyA':
            keys.left.pressed = true
            break;
        case 'KeyS': 
            break;
        case 'KeyD':
            keys.right.pressed = true
            break;
        case 'KeyW':
            player.velocity.y -= 20;
            break;                 
    }
 })

 window.addEventListener('keyup', (event) => {
    switch(event.code) {
        case 'KeyA':
            keys.left.pressed = false
            break;
        case 'KeyS':
            break;
        case 'KeyD':
            keys.right.pressed = false
            break;
        case 'KeyW':
            player.velocity.y -= 20;
            break;                 
    }
 })

}

export default Player;