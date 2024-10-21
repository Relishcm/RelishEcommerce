import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const DropdownContext = createContext();

export const DropHoverProvider = ({ children }) => {
    const [openDropdown, setOpenDropdown] = useState(null); // Track open dropdown by name
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
        <DropdownContext.Provider value={{ openDropdown, setOpenDropdown, dropdownRef }}>
            {children}
        </DropdownContext.Provider>
    );
};

export const useHoverDropdown = () => useContext(DropdownContext);
