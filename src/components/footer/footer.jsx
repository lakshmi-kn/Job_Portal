import React from 'react';
import './footer.css'; // Optional if you want to style it

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Job Portal. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
