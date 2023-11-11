import Platform from "./Platform";
import Player from "./Player";
import Scenery from "./Scenery";
import { getPlatformConfig, getBackgroundConfig } from '../constants/config';
import { useEffect } from "react";

//main Game logical component
const Game = ({canvasContext}) => {
    //setting base gravity
    const gravity = 1.5;
    //creating platform and background scenery settings object using config.js file
    const PLATFORMS = getPlatformConfig(canvasContext)
    const SCENERY = getBackgroundConfig(canvasContext); 
//creating an empty platforms array and storing the platform object in it 
let platforms = [];
for(let i=0; i<PLATFORMS.length;i++){
    platforms[i] = Platform({ canvasContext}, PLATFORMS[i]);
} 
//creating an empty scenery array and storing the scenery object in it
let backgroundScenery = [];
 for(let i=0; i<SCENERY.length;i++){
    backgroundScenery[i] = Scenery({canvasContext}, SCENERY[i]);
 }  

//setting the amount
let scrollLength = 0;
let lockScroll = false;

let boss = false;


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

let player = Player({canvasContext}, {gravity:gravity, action:initialActions, direction:{forward:true}})




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
         
        })
        
        player.updatePlayer();

        
        // if d is pressed on the keyboard and player's current x position is less than 400, allow to move the player towards right
        if((keys.right.pressed && player.player.position.x < 400) ||
        (keys.right.pressed && lockScroll) ||
        (keys.right.pressed && boss && scrollLength>200 && player.player.position.x < canvasContext.canvas.width -200)
        )
            {
            player.player.velocity.x = player.player.speed;
            scrollLength+=player.player.speed;
            
            if (lockScroll && player.player.position.x > canvasContext.canvas.width - 200) {
                // Move player back to position x = 100
                player.player.position.x = 100;
                lockScroll = false;
                scrollLength = 0;
                boss = true;
                //backgroundScenery[4].scenery.position.x=0;
                backgroundScenery.forEach((scenery)=>{
                    scenery.scenery.position.x-=canvasContext.canvas.width;
                })

                platforms.forEach((platform)=>{
                    platform.platform.position.x-=canvasContext.canvas.width+50;
                })

            }
        }
        else if(
        (keys.left.pressed && player.player.position.x > 100) ||
        (keys.left.pressed && scrollLength === 0 && player.player.position.x > 0) ||
        (keys.left.pressed && lockScroll && player.player.position.x > 0) ||
        (keys.left.pressed && boss && player.player.position.x > 10)){
            player.player.velocity.x = -player.player.speed;
            scrollLength-= player.player.speed
          }
        
        else {
            player.player.velocity.x = 0;
            if(keys.right.pressed && player.player.position.x <canvasContext.canvas.width-200){
                if(!lockScroll) {
                scrollLength+=player.player.speed;
                backgroundScenery.forEach((scenery) => {
                    scenery.scenery.position.x -= player.player.speed*0.75;
                })
                platforms.forEach((platform) => {
    
                    platform.platform.position.x -= player.player.speed*.75;
                })
            }
                
            }
            else if(keys.left.pressed && scrollLength >0){
                if(lockScroll || !boss){
                scrollLength-=player.player.speed;
                backgroundScenery.forEach((scenery) =>{
                    scenery.scenery.position.x += player.player.speed*0.75;
                })
                platforms.forEach((platform) => {            
                platform.platform.position.x += player.player.speed*.75;
                
                    
            })
            }
        }
        }
        //collision detection logic
        platforms.forEach((platform) => {
            if (
                player.player.position.y + player.player.height <= platform.platform.position.y &&
                player.player.position.y + player.player.height + player.player.velocity.y >= platform.platform.position.y &&
                player.player.position.x + player.player.width - 100> platform.platform.position.x &&
                player.player.position.x < platform.platform.position.x + platform.platform.width -100
            ) {
                // Character is colliding with the platform from above
                player.player.velocity.y = 0;
                player.player.position.y = platform.platform.position.y - player.player.height;
            }
        });
    // win condition
    if(scrollLength >= 7900 && !boss){
        lockScroll = true;
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
            keys.up.pressed = true;
            player.player.action.jump.count ++;
            }
            player.player.action.stand.left = false;
            player.player.action.stand.right = false;
            player.player.action.run.left = false;
            player.player.action.run.right = false;
            
            // Check the current direction and set the jump animation
            if (!player.player.direction.forward) {
                player.player.action.jump.left = true;
            } else player.player.action.jump.right = true;

            
            break;
        case 'KeyA':
            if(!keys.right.pressed){
            keys.left.pressed = true;
            player.player.direction.forward = false;
            player.player.action.stand.left = false;
            player.player.action.stand.right = false;
            player.player.action.run.left = true;
            player.player.action.run.right = false;
            }
            break;
        case 'KeyS':
                break;      
        case 'KeyD':
            if(!keys.left.pressed){
            keys.right.pressed = true;
            player.player.direction.forward = true;
            player.player.action.stand.left = false;
            player.player.action.stand.right = false;
            player.player.action.run.left = false;
            player.player.action.run.right = true;
            }
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