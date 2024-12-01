import React from "react";

const Footer = () => (
  <footer className="bg-gray-800 text-white text-center py-4">
    <p className="text-sm">
      Trello Clone App &copy; {new Date().getFullYear()} | Built by
      <a
        href="https://github.com/Likhithkumar105"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline ml-1"
      >
        Likhith Kumar
      </a>
    </p>
  </footer>
);

export default Footer;
