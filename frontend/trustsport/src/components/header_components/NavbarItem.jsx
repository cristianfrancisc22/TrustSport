import React from 'react';
import DropdownMenu from './DropdownMenu'; // Assuming you have a DropdownMenu component
import SubmenuItem from './SubmenuItem';

function NavbarItem({ href, text, dropdown }) {
  return (
    <li className={`relative border-l border-gray-800 hover:bg-gray-900 ${dropdown ? 'dropdown' : ''}`}>
      <a className="block py-3 px-6 border-b-2 border-transparent" href={href}>
        {text}
      </a>
      {dropdown && 
      <DropdownMenu>
        <SubmenuItem href="Liga_1" text="Liga 1" />
        <SubmenuItem href="Liga_2" text="Liga 2" />
        <SubmenuItem href="Cupa_Romaniei" text="Cupa Romaniei" />
      </DropdownMenu>}
    </li>
  );
}

export default NavbarItem;
