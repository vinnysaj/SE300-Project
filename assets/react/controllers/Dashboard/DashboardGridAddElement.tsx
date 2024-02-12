import React, {ReactElement} from 'react';

export default function (properties: DashboardGridElementProps):ReactElement {
    return (
        <div className="inline-block w-min h-min mx-auto">
            <div className="flex flex-col items-center transition-transform hover:scale-110 ease-in-out h-max w-max cursor-pointer">
                <div className="w-32 h-32 flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-28 h-28"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                </div>
                <div className="text-center text-sm mt-2 drop-shadow-xl">{properties.addText}</div>
            </div>
        </div>
    );
};

interface DashboardGridElementProps {
    addText: string
}