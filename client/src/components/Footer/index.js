import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container">&copy;{currentYear} by Anthony Tropeano</div>
    </footer>
  );
};

export default Footer;
