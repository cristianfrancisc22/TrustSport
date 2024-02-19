import React, { useState } from 'react';
import MobileNavbar from "./MobileNavbar";

export default function SideArea({ isMenuOpen, toggleMenu }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(isMenuOpen);

    const handleCloseMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleToggleMenu = () => {
        toggleMenu(); // Call the toggleMenu function provided by the parent component
        setIsMobileMenuOpen(!isMobileMenuOpen); // Update the local state
    };

    return (
        <div className={`side-area fixed w-full h-full inset-0 z-50 ${isMenuOpen ? "show" : ''}`}>
            {/* bg open */}
            <div className="back-menu fixed bg-gray-900 bg-opacity-70 w-full h-full inset-x-0 top-0" onClick={handleCloseMenu}>
                <div className="cursor-pointer text-white absolute right-64 p-2" onClick={handleToggleMenu}>
                    <svg className="bi bi-x" width="2rem" height="2rem" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clipRule="evenodd"></path>
                        <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clipRule="evenodd"></path>
                    </svg>
                </div>
            </div>
            <MobileNavbar isMenuOpen={isMobileMenuOpen}/>
        </div>
    );
}

