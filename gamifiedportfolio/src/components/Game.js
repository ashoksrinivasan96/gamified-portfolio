import Platform from "./Platform";
import Player from "./Player";
import Scenery from "./Scenery";
import { getPlatformConfig, getBackgroundConfig } from '../constants/config';
import { useEffect } from "react";



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


let scrollLength = 0;

let gameOver = false;

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    }
}
let initialActions = {
    stand:
    {
        right:true,
        left:false}
        ,
     run:
    {
        right:false,
        left:false
    },
    jump:
    {
        right:false,
        left:false
    }
} 
//logic for animation
let player = Player({canvasContext}, {gravity:gravity, action:initialActions, direction:{forward:true}})


useEffect(()=> { 

}, [player.player.action.jump.count])

  const restartGame = () => {
    
    window.location.reload();
    
  };
let animationFrameId;

    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        
        backgroundScenery.forEach((scenery) =>{
            scenery.drawScenery();
        })
        platforms.forEach((platform) => {
            platform.drawPlatform();
            console.log(platform.platform.collision)
        })
        
        player.updatePlayer();

        
        // if d is pressed on the keyboard and player's current x position is less than 400, allow to move the player towards right
        if(
        (keys.right.pressed && player.player.position.x < 400) ||
        (keys.right.pressed && scrollLength >= 10750 && player.player.position.x <canvasContext.canvas.width - 50)
        )
            {
            player.player.velocity.x = player.player.speed;
            if(!gameOver) {
                scrollLength+=player.player.speed;
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
            if(keys.right.pressed && scrollLength <=10850){
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

  useEffect(()=>{
    animate();

    return() => {
        stopAnimation();
    };
  },[])

//Key press logic
window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW':
            if(!keys.up.pressed && player.player.action.jump.count <2){
            player.player.velocity.y = -25
            
            }
            player.player.action.stand.left = false;
            player.player.action.stand.right = false;
            player.player.action.run.left = false;
            player.player.action.run.right = false;
            
            // Check the current direction and set the jump animation
            if (!player.player.direction.forward) {
                player.player.action.jump.left = true;
            } else player.player.action.jump.right = true;
            keys.up.pressed = true;
            player.player.action.jump.count ++;
            
            break;
        case 'KeyA':
            keys.left.pressed = true;
            player.player.direction.forward = false;
            player.player.action.stand.left = false;
            player.player.action.stand.right = false;
            player.player.action.run.left = true;
            player.player.action.run.right = false;
            break;
        case 'KeyS':
                break;      
        case 'KeyD':
            keys.right.pressed = true;
            player.player.direction.forward = true;
            player.player.action.stand.left = false;
            player.player.action.stand.right = false;
            player.player.action.run.left = false;
            player.player.action.run.right = true;
            break;
        // Other key event handling
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW':
           
             keys.up.pressed = false;
            setTimeout(() => {
                player.player.action.jump.right = false;
                player.player.action.jump.left = false;

                if (player.player.direction.forward && keys.right.pressed) {
                    player.player.action.run.right = true;
                } else if(player.player.direction.forward) {
                    player.player.action.stand.right = true;
                }
                else if(!player.player.direction.forward && keys.left.pressed){
                    player.player.action.run.left = true;
                }
                else if(!player.player.direction.forward){
                    player.player.action.stand.left = true
                }
            }, 500); 
        
            break;
        case 'KeyA':
            keys.left.pressed = false;
            player.player.action.run.left = false;
            if (!keys.right.pressed) {
                player.player.action.stand.left = true;
            }
            break;
        case 'KeyS':
            break;    
        case 'KeyD':
            keys.right.pressed = false;
            player.player.action.run.right = false;
            if (!keys.left.pressed) {
                player.player.action.stand.right = true;
            }
            break;
        // Other key event handling
    }
});


}

export default Game;