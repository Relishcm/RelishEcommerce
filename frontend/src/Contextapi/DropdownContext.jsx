// DropdownContext.js
import React, { createContext, useState, useContext } from 'react';

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

    return (
        <DropdownContext.Provider value={{ openDropdown, handleMouseEnter, handleMouseLeave }}>
            {children}
        </DropdownContext.Provider>
    );
};
