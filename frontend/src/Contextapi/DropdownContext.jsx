import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

const DropdownContext = createContext();

export const useDropdown = () => {
    return useContext(DropdownContext);
};

export const DropdownProvider = ({ children }) => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleMouseEnter = (dropdownName) => {
        setOpenDropdown(dropdownName);
    };

    const handleMouseLeave = () => {
        setOpenDropdown(null);
    };
    const dropdownRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpenDropdown(null);
        }
    };
    const handleScroll = () => {
        setOpenDropdown(false);
            };
    useEffect(() => {
      
                document.addEventListener('mousedown', handleOutsideClick);
                window.addEventListener('scroll', handleScroll);
        
        
                return () => {
                    document.removeEventListener('mousedown', handleOutsideClick);
                    window.removeEventListener('scroll', handleScroll);
                };
            }, []);
    return (
        <DropdownContext.Provider value={{ openDropdown, handleMouseEnter, handleMouseLeave, dropdownRef }}>
            {children}
        </DropdownContext.Provider>
    );
};
