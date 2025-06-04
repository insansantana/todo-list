import React from 'react';
import Button from './Button';

const Card = ({ title, desc, view, project }) => (
  <div className="overflow-hidden rounded-xl bg-gray-800 text-white p-5 transition transform duration-200 hover:-translate-y-0.5">
    <h1 className="text-2xl font-bold mb-5 text-blue-300">{title}</h1>
    <p className="mb-4 text-sm">{desc}</p>
    <div className="mt-6">
      {view && <Button link={view}>View</Button>}
      {project && <Button link={project}>Open Project</Button>}
    </div>
  </div>
);

export default Card;
