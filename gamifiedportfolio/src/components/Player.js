import samuraiIdleLeft from '../assets/Samurai/IdleLeft.png'
import samuraiIdleRight from '../assets/Samurai/IdleRight.png'
import samuraiRunRight from '../assets/Samurai/RunRight.png'
import samuraiRunLeft from '../assets/Samurai/RunLeft.png'
import samuraiJumpRight from '../assets/Samurai/JumpRight.png';
import samuraiJumpLeft from '../assets/Samurai/JumpLeft.png';

//preloading images
const images = {
  samuraiIdleLeft: new Image(),
  samuraiIdleRight: new Image(),
  samuraiRunRight: new Image(),
  samuraiRunLeft: new Image(),
  samuraiJumpRight: new Image(),
  samuraiJumpLeft: new Image(),
};

images.samuraiIdleLeft.src = samuraiIdleLeft;
images.samuraiIdleRight.src = samuraiIdleRight;
images.samuraiRunRight.src = samuraiRunRight;
images.samuraiRunLeft.src = samuraiRunLeft;
images.samuraiJumpRight.src = samuraiJumpRight;
images.samuraiJumpLeft.src = samuraiJumpLeft;

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
        frames: 0,
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
                count: 0
            },
        },
        direction: {
            forward: data.direction.forward,
            backward: !data.direction.forward
        }
    }

    



    const createImage = () => {
        const img = new Image();
      
        if (player.action.stand.left) {
          img.src = images.samuraiIdleLeft.src;
          player.totalFrames = 6;
        } else if (player.action.stand.right) {
          img.src = images.samuraiIdleRight.src;
          player.totalFrames = 6;
        } else if (player.action.run.left) {
          img.src = images.samuraiRunLeft.src;
          player.totalFrames = 8;
        } else if (player.action.run.right) {
          img.src = images.samuraiRunRight.src;
          player.totalFrames = 8;
        } else if (player.action.jump.left) {
          img.src = images.samuraiJumpLeft.src;
          player.totalFrames = 12;
        } else if (player.action.jump.right) {
          img.src = images.samuraiJumpRight.src;
          player.totalFrames = 12;
        }

        return img;
      };
   
    const drawPlayer = () => {
       canvasContext.context.drawImage(createImage(),player.frames*128,0,128,128 ,player.position.x, player.position.y, player.width, player.height);
    }

    const updatePlayer = () => {
        player.frames++;
        if(player.frames >= player.totalFrames) player.frames = 0;
        drawPlayer();
        player.position.y+=player.velocity.y;
        player.position.x+=player.velocity.x;
        if(player.velocity.y ===0)  {
            player.action.jump.count = 0
        }
        if(player.position.y + player.height + player.velocity.y <=canvasContext.canvas.height){
            player.velocity.y+=data.gravity;
        }

      
        
    }

return {drawPlayer, player, updatePlayer}
}

export default Player;