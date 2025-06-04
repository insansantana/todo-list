import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="flex justify-between items-center px-4 py-2 text-blue-200">
    <div className="font-bold text-xl"><Link to="/portfolio">HIS</Link></div>
    <ul className="flex space-x-4 text-sm md:text-lg">
      <li><Link to="/portfolio">Home</Link></li>
      <li><Link to="/portfolio/about">About</Link></li>
      <li><Link to="/portfolio/skills">Skills</Link></li>
      <li><Link to="/portfolio/projects">Projects</Link></li>
    </ul>
  </nav>
);

export default Navbar;
