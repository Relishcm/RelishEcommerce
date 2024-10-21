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

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    return (
        <DropdownContext.Provider value={{ openDropdown, handleMouseEnter, handleMouseLeave, dropdownRef }}>
            {children}
        </DropdownContext.Provider>
    );
};
