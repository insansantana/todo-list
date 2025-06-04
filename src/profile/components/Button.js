import React from 'react';

const Button = ({ link, children }) => (
  <a href={link} target="_blank" rel="noreferrer" className="bg-gray-100 inline-block text-black mr-3 p-2 rounded-md font-semibold">
    {children}
  </a>
);

export default Button;
