import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-zinc-900 text-white">
            <div className="flex flex-col items-center">
                <FaSpinner className="animate-spin text-teal-500 text-6xl mb-4" />
                <p className="text-lg">Loading...</p>
            </div>
        </div>
    );
}

export default Loading;
