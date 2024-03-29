import React from 'react';
import NavbarItem from "./NavbarItem";
import DropdownMenu from "./DropdownMenu";
import SubmenuItem from "./SubmenuItem";

function MobileNavbar(isMenuOpen) {
    return (
        <nav id="mobile-nav" className={`side-menu flex flex-col right-0 w-64 fixed top-0 bg-white dark:bg-gray-800 h-full overflow-auto z-40 ${isMenuOpen ? "show " : ""} `}>
            <div className="mb-auto">
                <nav className="relative flex flex-wrap">
                    <div className="text-center py-4 w-full font-bold border-b border-gray-100">TAILNEWS</div>
                    <ul id="side-menu" className="w-full float-none flex flex-col">
                        <NavbarItem text="Home" href="/" />
                        <NavbarItem text="Liga 1" href="/championship/Liga_1" />
                        <NavbarItem text="Liga 2" href="/championship/Liga_2" />
                        <NavbarItem text="Fotbal International" href="/championship/international" />
                        <NavbarItem text="Cupa Romaniei" href="/championship/Cupa_Romaniei" />
                        <NavbarItem text="Autentificare" href="/login" />
                        <NavbarItem text="Inregistrare" href="/signup" />

                    </ul>
                </nav>
            </div>
            <div className="py-4 px-6 text-sm mt-6 text-center">
                <p>Copyright <a href="#">Trustsport</a> - All right reserved</p>
            </div>
        </nav>
    );
}

export default MobileNavbar;
