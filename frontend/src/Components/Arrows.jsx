import React from 'react';

const NextArrow = ({ onClick }) => {
    return (
        <div
            className="absolute top-1/2 right-0 transform z-20 -translate-y-1/2 bg-gray-200 rounded-full shadow-lg p-2 cursor-pointer"
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-red-800"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </div>
    );
};

const PrevArrow = ({ onClick }) => {
    return (
        <div
            className="absolute top-1/2 left-0 transform -translate-y-1/2 z-20 bg-gray-200 rounded-full shadow-lg p-2 cursor-pointer"
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-red-800"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5l-7 7 7 7" />
            </svg>
        </div>
    );
};

export { NextArrow, PrevArrow };
