import Platform from "./Platform";
import Player from "./Player";
import Scenery from "./Scenery";
import backgroundImg from '../assets/background.png'
import platformImg from '../assets/platform.png'
import backgroundImgLight from '../assets/Backgroundlight.png'
import { useEffect, useState } from "react";


const Game = ({canvasContext}) => {
    const gravity = 1.5;
    
   // Define initial state values for your game elements
   let backgroundScenery = [Scenery({canvasContext}, 0,0, backgroundImg),
    Scenery({canvasContext}, 1792,0, backgroundImg),
    Scenery({canvasContext}, 3584,0, backgroundImg),
    Scenery({canvasContext}, 5376 -200,0, backgroundImgLight)
]

let platforms = [Platform({canvasContext}, 100, 950, platformImg),
    Platform({canvasContext}, 700,950, platformImg)
]
let player = Player({canvasContext}, gravity)  

let scrollLength = 0;

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

  const restartGame = () => {
    
    window.location.reload();
    
  };
let animationFrameId;

    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        canvasContext.context.clearRect(0,0,canvasContext.canvas.width,canvasContext.canvas.height);
        
        backgroundScenery.forEach((scenery) =>{
            scenery.drawScenery();
        })
        platforms.forEach((platform) => {
            platform.drawPlatform();
        })
        player.updatePlayer();
        if(keys.right.pressed && player.player.position.x < 400){
            player.player.velocity.x = 12;
            scrollLength+=5;
        }
        else if(keys.left.pressed && player.player.position.x > 100){
            player.player.velocity.x = -12;
            scrollLength-= 5;
        } else {
            player.player.velocity.x = 0;
            if(keys.right.pressed){
                scrollLength+=5;
                backgroundScenery.forEach((scenery) =>{
                    scenery.scenery.position.x -= 5
                })
                platforms.forEach((platform) => {
    
                    platform.platform.position.x -= 10
                })
                
            }
            else if(keys.left.pressed){
                scrollLength-=5;
                backgroundScenery.forEach((scenery) =>{
                    scenery.scenery.position.x += 5
                })
                platforms.forEach((platform) => {            
                platform.platform.position.x += 10
                
                    
            })
            }
        }
        platforms.forEach((platform) => {
        if(player.player.position.y + player.player.height <= platform.platform.position.y 
            && player.player.position.y +player.player.height+player.player.velocity.y >= platform.platform.position.y
            && player.player.position.x + player.player.width >= platform.platform.position.x
            && player.player.position.x <= platform.platform.position.x + platform.platform.width
            ){
            player.player.velocity.y = 0;
        }
    })
    // win condition
    if(scrollLength > 5000){
    
        console.log("Winner!")
    }

   //lose condition
    if(player.player.position.y > canvasContext.canvas.height) {
        stopAnimation();
        restartGame();
    }
}

const stopAnimation = () => {
    cancelAnimationFrame(animationFrameId);
  };
   
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
            if(player.player.position.y > canvasContext.canvas.height/2 +300)
            {player.player.velocity.y -= 20;
            }else player.player.velocity.y = 0;
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
            break;                 
    }
 })
}

export default Game;