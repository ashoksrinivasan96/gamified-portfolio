import Platform from "./Platform";
import Player from "./Player";
import Scenery from "./Scenery";
import backgroundImg from '../assets/background.png'
import platformImg from '../assets/platform.png'
import backgroundImgLight from '../assets/Backgroundlight.png'

const Game = ({canvasContext}) => {
    const gravity = 1.5;
    
    const backgroundScenery = [Scenery({canvasContext}, 0,0, backgroundImg),
        Scenery({canvasContext}, 1792,0, backgroundImg),
        Scenery({canvasContext}, 3584,0, backgroundImg),
        Scenery({canvasContext}, 5376 -200,0, backgroundImgLight)
    ]
    
    const platforms = [Platform({canvasContext}, 200, 950, platformImg),
        Platform({canvasContext}, 800,950, platformImg)
    ]
    const player = Player({canvasContext}, gravity)  
    
    let scrollLength = 0;
    
    const keys = {
        right: {
            pressed: false
        },
        left: {
            pressed: false
        }
    }

    const animate = () => {
        requestAnimationFrame(animate);
        canvasContext.context.clearRect(0,0,canvasContext.canvas.width,canvasContext.canvas.height);
        
        backgroundScenery.forEach((scenery) =>{
            scenery.drawScenery();
        })
        platforms.forEach((platform) => {
            platform.drawPlatform();
        })
        player.updatePlayer();
        if(keys.right.pressed && player.player.position.x < 400){
            player.player.velocity.x = 5;
            scrollLength+=5;
        }
        else if(keys.left.pressed && player.player.position.x > 100){
            player.player.velocity.x = -5;
            scrollLength-= 5;
        } else {
            player.player.velocity.x = 0;
            if(keys.right.pressed){
                scrollLength+=5;
                backgroundScenery.forEach((scenery) =>{
                    scenery.scenery.position.x -= 3
                })
                platforms.forEach((platform) => {
    
                    platform.platform.position.x -= 5
                })
                
            }
            else if(keys.left.pressed){
                scrollLength-=5;
                backgroundScenery.forEach((scenery) =>{
                    scenery.scenery.position.x += 3
                })
                platforms.forEach((platform) => {            
                platform.platform.position.x += 5
                
                    
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
            player.player.velocity.y -= 20;
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
            player.player.velocity.y -= 20;
            break;                 
    }
 })
}

export default Game;