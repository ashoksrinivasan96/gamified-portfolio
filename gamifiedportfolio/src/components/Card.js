// Card.js
import React from 'react';
import scroll from '../assets/scroll.png';

const Card = () => {
  return (
    
      <div className='bg-center bg-cover min-h-[32rem] min-w-[52rem]' style={{ backgroundImage: `url(${scroll})` }}>
        <ul className= "text-center font-mono text-white pt-[10rem]">
          <li>Use the 'W', 'A', 'S', 'D' keys to control the player.</li>
          <li>Press 'W' to jump, 'A' to move left, 'D' to move right.</li>
          <li>Avoid falling off the platforms</li>
          <li>collect codex to gain information about the candidate.</li>
          <li>Defeat various enemies.</li>
          <li>Fight the final boss.</li>
        </ul>
      </div>

  );
};

export default Card;
