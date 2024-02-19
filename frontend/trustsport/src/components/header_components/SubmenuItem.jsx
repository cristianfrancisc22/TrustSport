// SubmenuItem.js
import React from 'react';

function SubmenuItem({ href, text }) {
  return (
    <li className="relative hover:bg-gray-50 ">
      <a className="block py-2 px-6 border-b border-gray-100 " href={href}>{text}</a>
    </li>
  );
}

export default SubmenuItem;
