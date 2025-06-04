import React from 'react';

const skills = ['HTML', 'CSS', 'JavaScript', 'PHP', 'CodeIgniter', 'MySQL', 'MongoDB', 'Bootstrap', 'TailwindCSS', 'React'];

const Skills = () => (
  <div className="p-4 text-primary">
    <h1 className="text-2xl font-bold mb-6 text-blue-300">My Backpack</h1>
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {skills.map(skill => (
        <li key={skill} className="text-center bg-gray-800 text-white py-2 rounded-md text-sm">{skill}</li>
      ))}
    </ul>
  </div>
);

export default Skills;
