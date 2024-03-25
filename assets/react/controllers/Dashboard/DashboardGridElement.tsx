import React, {ReactElement} from 'react';

export default function (properties: DashboardGridElementProps):ReactElement {
    return (
        <div className="col-span-full md:col-span-1 w-full flex-grow">
            <a className="bg-gray-50 px-1 pt-1 pb-1 drop-shadow-lg shadow-lg rounded-2xl flex flex-col items-center transition-transform hover:scale-102 duration-300 ease-in-out cursor-pointer" href={"dashboard/plane/" + properties.planeID}>
                <div className={"h-32 w-full"}>
                    <img src={properties.planeImgPath}
                         className="rounded-xl w-full h-32 object-cover"
                         alt={"Plane hero image"}/>
                </div>

                <div className="text-center text-lg mt-1 drop-shadow-xl">{properties.planeName}</div>
            </a>
        </div>
    );
};

interface DashboardGridElementProps {
    planeName: string,
    planeImgPath: string,
    planeID: string
}