import React from "react";

const Header = ({ resetBoard }) => (
  <header className="bg-blue-500 text-white py-4 px-6 flex justify-between items-center">
    <h1 className="text-xl font-bold">Trello Clone</h1>
    <button
      onClick={resetBoard}
      className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
    >
      Reset Board
    </button>
  </header>
);

export default Header;
