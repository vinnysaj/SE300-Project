import React, {ReactElement} from 'react';

export default function (properties: DashboardGridElementProps):ReactElement {
    return (
        <div className="inline-block w-min h-min mx-auto">
            <a className="flex flex-col items-center transition-transform hover:scale-110 ease-in-out h-max w-max cursor-pointer" href={"dashboard/plane/" + properties.planeID}>
                <img src={properties.planeImgPath} className="w-32 h-32 rounded-xl drop-shadow-lg shadow-lg"/>
                <div className="text-center text-sm mt-2 drop-shadow-xl">{properties.planeName}</div>
            </a>
        </div>
    );
};

interface DashboardGridElementProps {
    planeName: string,
    planeImgPath: string,
    planeID: string
}