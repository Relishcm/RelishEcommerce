import React, { useEffect, useState } from 'react';

const Alert = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Automatically hide the alert after 3 seconds
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose(); // Optionally call the parent onClose handler
        }, 3000);

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, [onClose]);

    // Conditional classes based on alert type (success, error)
    const alertClasses = type === 'success' 
        ? 'bg-green-100 text-green-800 border border-green-400'
        : 'bg-red-100 text-red-800 border border-red-400';

    if (!visible) return null;

    return (
        <div className={`max-w-sm mx-auto p-4 mb-4 rounded-md ${alertClasses} shadow-lg`} role="alert">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    {type === 'success' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M16.704 4.296a1 1 0 00-1.408 0l-7.44 7.44-3.648-3.648a1 1 0 00-1.408 1.416l4.3 4.296a1 1 0 001.417-.009l8.48-8.48a1 1 0 000-1.408z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 8a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1V8z" clipRule="evenodd" />
                        </svg>
                    )}
                </div>
                <div className="ml-3 flex-1">
                    <p className="text-sm font-medium">{message}</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                    <button onClick={() => setVisible(false)} className="text-sm font-medium text-gray-500 hover:text-gray-600">
                        <span className="sr-only">Close</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Alert;
