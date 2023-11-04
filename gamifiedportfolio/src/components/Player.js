import samuraiIdleLeft from '../assets/Samurai/IdleLeft.png'
import samuraiIdleRight from '../assets/Samurai/IdleRight.png'
import samuraiRunRight from '../assets/Samurai/RunRight.png'
import samuraiRunLeft from '../assets/Samurai/RunLeft.png'



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
        action: {
            stand: {
                left:data.action.stand.left,
                right:data.action.stand.right
            },
            run: {
                left:data.action.run.left,
                right:data.action.run.right
            }
        }
    }

const createImage = () => {
    const img = new Image();
    if(player.action.stand.left){
        img.src = samuraiIdleLeft;
    } else if(player.action.stand.right){
        img.src = samuraiIdleRight;
    } else if(player.action.run.left){
        img.src = samuraiRunLeft;
    } else if(player.action.run.right){
        img.src = samuraiRunRight; 
    } 
    return img; 
}


   
    const drawPlayer = () => {
       canvasContext.context.drawImage(createImage(),player.frames*128,0,128,128 ,player.position.x, player.position.y, player.width, player.height);
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