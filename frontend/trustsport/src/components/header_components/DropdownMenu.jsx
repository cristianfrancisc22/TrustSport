import React from 'react';

function DropdownMenu({ children }) {
  return (
    <ul className="dropdown-menu w-full font-normal absolute left-0 right-auto top-full z-50 border-b-0 text-left bg-white text-gray-700 border border-gray-100">
      {children}
    </ul>
  );
}

export default DropdownMenu;
