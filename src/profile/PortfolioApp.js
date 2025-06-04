import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';

const PortfolioApp = () => (
  <div className="relative bg-primary box-content max-w-screen-xl min-h-screen mx-auto bg-white flex flex-col lg:px-24 lg:rounded-xl">
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="skills" element={<Skills />} />
      <Route path="projects" element={<Projects />} />
    </Routes>
    <Footer />
  </div>
);

export default PortfolioApp;
