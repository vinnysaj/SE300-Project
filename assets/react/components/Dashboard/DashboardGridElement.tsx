import React, {ReactElement} from 'react';

export default function (properties: DashboardGridElementProps):ReactElement {
    return (
        <div className="inline-block w-min h-min mx-auto">
            <div className="flex flex-col items-center transition-transform hover:scale-110 ease-in-out h-max w-max cursor-pointer">
                <img src={properties.planeImgPath} className="w-32 h-32 rounded-xl drop-shadow-lg shadow-lg"/>
                <div className="text-center text-sm mt-2 drop-shadow-xl">{properties.planeName}</div>
            </div>
        </div>
    );
};

interface DashboardGridElementProps {
    planeName: string,
    planeImgPath: string
}