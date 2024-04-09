import React from 'react';
import {PlaneData} from "./Dashboard";

const DashboardGridElement: React.FC<DashboardGridElementProps> = (props) => {

    function handlePlaneClicked() {
        props.planeClicked(props.planeData);
    }

    return (
        <div className="col-span-full md:col-span-1 w-full flex-grow">
            <div onClick={handlePlaneClicked} className="bg-gray-50 px-1 pt-1 pb-1 drop-shadow-lg shadow-lg rounded-2xl flex flex-col items-center transition-transform hover:scale-102 duration-300 ease-in-out cursor-pointer">
                <div className={"h-32 w-full"}>
                    <img src={props.planeData.cover_file_path}
                         className="rounded-xl w-full h-32 object-cover"
                         alt={"Plane hero image"}/>
                </div>

                <div className="text-center text-lg mt-1 drop-shadow-xl">{props.planeData.friendly_name}</div>
            </div>
        </div>
    );
};

interface DashboardGridElementProps {
    planeData: PlaneData;
    planeClicked: (arg0: PlaneData) => void;
}

export default DashboardGridElement;