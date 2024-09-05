import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-dark-green p-4">
      <ul className="flex justify-around">
        <li>
          <Link to="/" className="text-white hover:text-light-green">Characters List</Link>
        </li>
        <li>
          <Link to="/locations" className="text-white hover:text-light-green">Characters By Location</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
