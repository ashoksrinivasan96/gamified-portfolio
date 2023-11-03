import Platform from "./Platform";
import Player from "./Player";
import Scenery from "./Scenery";
import backgroundImg from '../assets/background.png'

import backgroundImgLight from '../assets/Backgroundlight.png'
import { useEffect, useState } from "react";

import { getPlatformConfig, getBackgroundConfig } from '../constants/constants';



const Game = ({canvasContext}) => {
    const gravity = 1.5;
    const PLATFORMS = getPlatformConfig(canvasContext)
    const SCENERY = getBackgroundConfig(canvasContext);
let platforms = [];
for(let i=0; i<PLATFORMS.length;i++){
    platforms[i] = Platform({ canvasContext}, PLATFORMS[i]);
} 
let backgroundScenery = [];

 for(let i=0; i<SCENERY.length;i++){
    backgroundScenery[i] = Scenery({canvasContext}, SCENERY[i]);
 }  


let player = Player({canvasContext}, gravity)  

let scrollLength = 0;

let gameOver = false;

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

        // if d is pressed on the keyboard and player's current x position is less than 400, allow to move the player
        if(
        (keys.right.pressed && player.player.position.x < 400) ||
        (keys.right.pressed && scrollLength >= 10750 && player.player.position.x <canvasContext.canvas.width - 50)
        )
            {
            player.player.velocity.x = player.player.speed;
            if(!gameOver) {
                scrollLength+=5;
            }
            }
        else if(
        (keys.left.pressed && player.player.position.x > 100) ||
        (keys.left.pressed && scrollLength === 0 && player.player.position.x > 0) ||
        (keys.left.pressed && gameOver && player.player.position.x > 0)
         ){
            player.player.velocity.x = -player.player.speed;
            if(!gameOver){
                scrollLength-= player.player.speed
            }
          }
        
        else {
            player.player.velocity.x = 0;
            if(keys.right.pressed && scrollLength <=10750){
                if(!gameOver) {
                scrollLength+=player.player.speed;
                backgroundScenery.forEach((scenery) => {
                    scenery.scenery.position.x -= player.player.speed*0.50;
                })
                platforms.forEach((platform) => {
    
                    platform.platform.position.x -= player.player.speed*.75;
                })
            }
                
            }
            else if(keys.left.pressed && scrollLength >0){
                if(!gameOver){
                scrollLength-=player.player.speed;
                backgroundScenery.forEach((scenery) =>{
                    scenery.scenery.position.x += player.player.speed*0.50;
                })
                platforms.forEach((platform) => {            
                platform.platform.position.x += player.player.speed*.75;
                
                    
            })
            }
        }
        }
        //collision detection logic
        platforms.forEach((platform) => {
        if(player.player.position.y + player.player.height <= platform.platform.position.y 
            && player.player.position.y +player.player.height+player.player.velocity.y >= platform.platform.position.y
            && player.player.position.x + player.player.width >= platform.platform.position.x
            && player.player.position.x <= platform.platform.position.x + platform.platform.width
            && platform.platform.collision
            ){
              
            player.player.velocity.y = 0;
        }
    })
    // win condition
    if(scrollLength >= 10750){
        gameOver = true;
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