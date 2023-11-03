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
    Scenery({canvasContext}, 5376 -50,0, backgroundImgLight)
]


let platforms = [
    Platform({ canvasContext }, 100, canvasContext.canvas.height - 75, platformImg),
    Platform({ canvasContext }, 700, canvasContext.canvas.height - 150, platformImg),
    Platform({ canvasContext }, 1300, canvasContext.canvas.height - 225, platformImg),
    Platform({ canvasContext }, 1900, canvasContext.canvas.height - 300, platformImg),
    Platform({ canvasContext }, 2500, canvasContext.canvas.height - 375, platformImg),
    Platform({ canvasContext }, 3100, canvasContext.canvas.height - 450, platformImg),
    Platform({ canvasContext }, 3700, canvasContext.canvas.height - 525, platformImg),
    Platform({ canvasContext }, 4300, canvasContext.canvas.height - 600, platformImg),
    Platform({ canvasContext }, 4900, canvasContext.canvas.height - 675, platformImg),
    Platform({ canvasContext }, 5500, canvasContext.canvas.height - 675, platformImg),
    Platform({ canvasContext }, 5900, canvasContext.canvas.height - 675, platformImg),
    Platform({ canvasContext }, 6300, canvasContext.canvas.height - 675, platformImg),
    Platform({ canvasContext }, 6700, canvasContext.canvas.height - 675, platformImg),
    Platform({ canvasContext }, 7100, canvasContext.canvas.height - 675, platformImg),
    Platform({ canvasContext }, 7500, canvasContext.canvas.height - 675, platformImg),
    Platform({ canvasContext }, 7900, canvasContext.canvas.height - 675, platformImg),
    Platform({ canvasContext }, 8300, canvasContext.canvas.height - 675, platformImg),
    Platform({ canvasContext }, 8700, canvasContext.canvas.height - 675, platformImg),
    Platform({ canvasContext }, 9100, canvasContext.canvas.height - 675, platformImg),
    Platform({ canvasContext }, 9500, canvasContext.canvas.height - 675, platformImg)

];



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
            player.player.velocity.x = player.player.speed;
            scrollLength+=5;
        }
        else if(keys.left.pressed && player.player.position.x > 100){
            player.player.velocity.x = -player.player.speed;
            scrollLength-= player.player.speed;
        } else {
            player.player.velocity.x = 0;
            if(keys.right.pressed){
                scrollLength+=player.player.speed;
                backgroundScenery.forEach((scenery) =>{
                    scenery.scenery.position.x -= player.player.speed*0.50;
                })
                platforms.forEach((platform) => {
    
                    platform.platform.position.x -= player.player.speed*.75;
                })
                
            }
            else if(keys.left.pressed){
                scrollLength-=player.player.speed;
                backgroundScenery.forEach((scenery) =>{
                    scenery.scenery.position.x += player.player.speed*0.50;
                })
                platforms.forEach((platform) => {            
                platform.platform.position.x += player.player.speed*.75;
                
                    
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
    if(scrollLength > 9500){
        console.log(scrollLength);
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

            player.player.velocity.y -= 25;
            
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