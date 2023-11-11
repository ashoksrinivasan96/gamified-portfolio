// Card.js
import React from 'react';
import scroll from '../assets/scroll.png';

const Card = () => {
  return (
    <div className="p-48 m-48 bg-contain bg-no-repeat relative overflow-hidden">
      <div
        className="absolute inset-0 flex items-center justify-center bg-cover"
        style={{ backgroundImage: `url(${scroll})` }}
      >
        <ul className="text-center font-proxima text-white">
          <li>Use the 'W', 'A', 'S', 'D' keys to control the player.</li>
          <li>Press 'W' to jump, 'A' to move left, 'D' to move right.</li>
          <li>Avoid falling off the platforms, collect codex to gain information about the candidate.</li>
          <li>Defeat various enemies.</li>
          <li>Fight the final boss.</li>
        </ul>
      </div>
    </div>
  );
};

export default Card;
