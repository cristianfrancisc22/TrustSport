import React, { useState } from 'react';
import NavbarItem from './header_components/NavbarItem';
import MobileMenuButton from './header_components/MobileMenuButton';
import SideArea from './header_components/SideArea';

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <nav className="bg-black">
                <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
                    <div className="flex justify-between">
                        <div className="mx-w-10 text-2xl font-bold capitalize text-white flex items-center">Trustsport</div>
                        <div className="flex flex-row">
                            <ul className="navbar hidden lg:flex lg:flex-row text-gray-400 text-sm items-center font-bold">
                                <NavbarItem href="/" text="Home" />
                                <NavbarItem text="Fotbal national" dropdown={true}/>
                                <NavbarItem href="/stiri/fotbal/international" text="Fotbal International" />
                                <NavbarItem href="/login" text="Autentificare" />
                                <NavbarItem href="/signup" text="Inregistrare" />
                            </ul>
                            <div className="flex flex-row items-center text-gray-300">
                                <MobileMenuButton onClick={handleMobileMenuToggle} />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Render SideArea and pass isMenuOpen state and toggle function */}
            <SideArea isMenuOpen={isMobileMenuOpen} toggleMenu={handleMobileMenuToggle} />
        </header>
    );
}

export default Header;
