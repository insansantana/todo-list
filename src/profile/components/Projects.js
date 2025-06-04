import React from 'react';
import Card from './Card';

const projects = [
  {
    id: 1,
    title: 'Sammitr',
    view: 'https://github.com/insansantana',
    project: 'https://sammitr.co.id/',
    desc: 'Company profile website with a dynamic dashboard built using CodeIgniter and Bootstrap.'
  },
  {
    id: 2,
    title: 'Software Beauty Clinic',
    view: 'https://github.com/insansantana',
    project: '#',
    desc: 'A system to manage patient schedules, medical records, inventory and multi-branch clinics.'
  },
  {
    id: 3,
    title: 'Tamaro Information System',
    view: 'https://github.com/insansantana',
    project: 'http://staging-tis.tamaro.co.id/',
    desc: 'Software to manage payroll, attendance and other HR processes.'
  },
  {
    id: 4,
    title: 'Quraan Apps',
    view: 'https://github.com/insansantana',
    project: 'https://quraan-app.vercel.app/',
    desc: 'Simple Quran application built with love.'
  }
];

const Projects = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-4 text-primary">
    {projects.map(p => (
      <Card key={p.id} title={p.title} view={p.view} project={p.project} desc={p.desc} />
    ))}
  </div>
);

export default Projects;
