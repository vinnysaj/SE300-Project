import React from 'react';
import {
    addCommasToNumber,
    calculateTimeSinceFirstFlight,
    formatPlaneDate, PlaneDataDetailed,
} from "../../PlaneDetails";
import {render} from "react-dom";

const MainInfoComponentView: React.FC<MainInfoComponentProps> = (props) => {

    const renderModel = () => {
        if (props.planeDataDetailed.model === "" || props.planeDataDetailed.model === null) {
            return "No Model Specified";
        } else {
            return props.planeDataDetailed.model;
        }
    }

    const renderMileage = () => {
        if (props.planeDataDetailed.mileage === 0 || props.planeDataDetailed.mileage === null) {
            return "No miles recorded yet. Set your current mileage in the edit screen."
        } else {
            return addCommasToNumber(props.planeDataDetailed.mileage);
        }
    }

    const renderHours = () => {
        if (props.planeDataDetailed.hours === 0 || props.planeDataDetailed.hours === null) {
            return "No hours recorded yet. Set your current hours in the edit screen."
        } else {
            return addCommasToNumber(props.planeDataDetailed.hours);
        }
    }

    const renderFriendlyName = () => {
        if (props.planeDataDetailed.friendly_name === "" || props.planeDataDetailed.friendly_name === null) {
            return "Unnamed Plane";
        } else {
            return props.planeDataDetailed.friendly_name;
        }
    }

    return (
        <>
            <div className="flex justify-between">
                <div className="font-bold text-2xl">{renderFriendlyName()}</div>
                <button onClick={props.editingStart}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path
                            d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"/>
                        <path
                            d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"/>
                    </svg>
                </button>
            </div>
            <div className="flex flex-col flex-1 mt-2">
                <div className={"w-full h-96"}>
                    <img src={"https://api.boundlessflight.net/api/image/" + props.planeDataDetailed.cover_file_b64} alt="Plane Hero Image"
                         className="w-full h-full rounded-2xl object-cover"/>
                </div>
                <div className={"w-full flex"}>
                    <div className={"flex-1"}>
                        <div className={"mt-2"}>
                            <div className="font-extrabold text-sm text-gray-500">TAIL NUMBER</div>
                            <div className={"text-gray-800 -mt-1"}>{renderTailNumber(props.planeDataDetailed)}</div>
                        </div>
                        <div className={"mt-2"}>
                            <div className="font-extrabold text-sm text-gray-500">MODEL</div>
                            <div className={"text-gray-800 -mt-1"}>{renderModel()}</div>
                        </div>
                        <div className={"mt-2"}>
                            <div className="font-extrabold text-sm text-gray-500">LAST LOG DATE</div>
                            <div
                                className={"text-gray-800 -mt-1"}>{renderLastLogDate(props.planeDataDetailed)}</div>
                        </div>
                    </div>
                    <div className={"flex-1"}>
                        <div className={"mt-2"}>
                            <div className="font-extrabold text-sm text-gray-500">MILEAGE</div>
                            <div
                                className={"text-gray-800 -mt-1"}>{renderMileage()}</div>
                        </div>
                        <div className={"mt-2"}>
                            <div className="font-extrabold text-sm text-gray-500">HOURS</div>
                            <div
                                className={"text-gray-800 -mt-1"}>{renderHours()}</div>
                        </div>
                        <div className={"mt-2"}>
                            <div className="font-extrabold text-sm text-gray-500">MAINTENANCE DOCUMENTS</div>
                            <div className={"text-gray-800 -mt-1"}>{renderMaintenanceDocuments(props.planeDataDetailed)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export const renderTailNumber = (planeDataDetailed: PlaneDataDetailed) => {
    if (planeDataDetailed.tail === "" || planeDataDetailed.tail === null) {
        return "Error! No tail number found! How did we even get here??";
    } else {
        return planeDataDetailed.tail;
    }
}

export const renderMaintenanceDocuments = (planeDataDetailed: PlaneDataDetailed) => {
    if (planeDataDetailed.filesCount === 0 || planeDataDetailed.filesCount === null) {
        return "None yet!"
    } else {
        return planeDataDetailed.filesCount;
    }
}

export const renderLastLogDate = (planeDataDetailed: PlaneDataDetailed) => {
    if (planeDataDetailed.lastLogDate === "" || planeDataDetailed.lastLogDate === null) {
        return "No logs yet. Add some!"
    } else {
        return formatPlaneDate(planeDataDetailed.lastLogDate, true);
    }
}

export interface MainInfoComponentProps {
    planeDataDetailed: PlaneDataDetailed,
    editingStart: () => void,
}

export default MainInfoComponentView;