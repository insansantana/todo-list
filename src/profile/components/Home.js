import React from 'react';

const Home = () => (
  <div className="flex flex-col items-center justify-center py-10 text-center text-primary flex-grow">
    <h1 className="text-white text-3xl font-bold mb-4">Hi, I am Hayatul Insan Santana</h1>
    <p className="text-sm mb-6 max-w-xl">A passionate full stack developer who loves building web applications with JavaScript and exploring new technologies.</p>
    <div className="flex space-x-3">
      <a href="/portfolio/about" className="bg-blue-400 text-white rounded-md py-2 px-4 text-sm">More Info</a>
      <a href="https://example.com/cv.pdf" className="bg-red-400 text-white rounded-md py-2 px-4 text-sm" target="_blank" rel="noreferrer">Download Resume</a>
    </div>
  </div>
);

export default Home;
