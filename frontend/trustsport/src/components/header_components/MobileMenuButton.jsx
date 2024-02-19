// MobileMenuButton.js
import React from 'react';

function MobileMenuButton({ onClick }) {
  return (
    <div className="relative hover:bg-gray-800 block lg:hidden">
      <button type="button" className="menu-mobile block py-3 px-6 border-b-2 border-transparent" onClick={onClick}>
        <span className="sr-only">Mobile menu</span>
        {/* Mobile Menu Icon */}
        <svg className="inline-block h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg> 
        Menu
      </button>
    </div>
  );
}

export default MobileMenuButton;
