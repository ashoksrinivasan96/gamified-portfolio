import { useState, useEffect } from "react"

const Player = ({context}) => {

const [player, setPlayer] = useState({
        position:{
            x: 100,
            y: 100
        },
        width : 30,
        height : 30
    }
    )

    const draw = () => {

       context.fillRect(player.position.x,player.position.y,player.height,player.width)
    }

    draw();

}

export default Player;