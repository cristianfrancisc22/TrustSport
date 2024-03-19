// SubmenuItem.js
import React from 'react';
import { Link } from 'react-router-dom';

function SubmenuItem({ href, text }) {

  return (
    <li className="relative hover:bg-gray-50 ">
      <Link to={{ pathname: `/championship/${href}`, state: text}} className="block py-2 px-6 border-b border-gray-100 ">
        {text}
      </Link>
    </li>
  );
}

export default SubmenuItem;
