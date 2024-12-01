import React from "react";
import Header from "./components/Header";
import Board from "./components/Board";
import Footer from "./components/Footer";

const App = () => {
  const resetBoard = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header resetBoard={resetBoard} />
      <main className="flex-grow">
        <Board />
      </main>
      <Footer />
    </div>
  );
};

export default App;
