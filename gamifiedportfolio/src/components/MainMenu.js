// MainMenu.js
import React from 'react';
import Card from './Card';
import mainMenu from '../assets/mainmenu.jpg';

const MainMenu = ({ startGame }) => {
  return (
    <div className="bg-center" style={{ backgroundImage: `url(${mainMenu})` }}>
      <div className="flex flex-col items-center justify-center text-white">
        <div className="mt-[13rem] rounded-lg shadow-lg text-center">
          <h1 className="text-5xl font-extrabold text-yellow-300 mb-6">Talent Hunter</h1>
          <div className="text-lg mb-6">
            <p className="text-yellow-200">Welcome, Recruiters! Are you ready to hunt top talent? Follow these instructions:</p>
          </div>
        </div>
        <Card />
        <button
          onClick={startGame}
          className="bg-yellow-300 hover:bg-yellow-500 text-green-900 font-bold py-2 px-6 rounded-full focus:outline-none mt-8"
        >
          Hunt
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
