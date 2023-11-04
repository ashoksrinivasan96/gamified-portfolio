import samuraiIdleLeft from '../assets/Samurai/IdleLeft.png'
import samuraiIdleRight from '../assets/Samurai/IdleRight.png'
import samuraiRunRight from '../assets/Samurai/RunRight.png'
import samuraiRunLeft from '../assets/Samurai/RunLeft.png'
import samuraiJumpRight from '../assets/Samurai/JumpRight.png';
import samuraiJumpLeft from '../assets/Samurai/JumpLeft.png';



const Player = ({canvasContext}, {...data}) => {
    const player = {
        speed: 15,
        position:{
            x: 100,
            y: canvasContext.canvas.height - 405
        },
        width : 256,
        height : 256,
        velocity: {
            x: 0,
            y: 1
        },
        frames: 1,
        totalFrames:6,
        action: {
            stand: {
                left:data.action.stand.left,
                right:data.action.stand.right,
            },
            run: {
                left:data.action.run.left,
                right:data.action.run.right,

            },
            jump: {
                left: data.action.jump.left,
                right: data.action.jump.right,
            }
        }
    }

const createImage = () => {
    const img = new Image();
    switch (true) {
        case player.action.stand.left:
            img.src = samuraiIdleLeft;
            player.totalFrames = 6;
            break;
        case player.action.stand.right:
            img.src = samuraiIdleRight;
            player.totalFrames = 6;
            break;
        case player.action.run.left:
            img.src = samuraiRunLeft;
            player.totalFrames = 8;
            break;
        case player.action.run.right:
            img.src = samuraiRunRight;
            player.totalFrames = 8;
            break;
        case player.action.jump.left:
            img.src = samuraiJumpLeft;
            player.totalFrames = 12;
            break; 
        case player.action.jump.right:
            img.src = samuraiJumpRight;
            player.totalFrames = 12;
            break;        
        default:
            // Handle the default case if none of the conditions are met
            break;
    }
    return img;
}


   
    const drawPlayer = () => {
       canvasContext.context.drawImage(createImage(),player.frames*128,0,128,128 ,player.position.x, player.position.y, player.width, player.height);
    }

    const updatePlayer = () => {
        player.frames++;
        if(player.frames>= player.totalFrames) player.frames = 0;
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