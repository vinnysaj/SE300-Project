import React, {ReactElement, useEffect, useState} from 'react';
import axios from "axios";
import {formatPlaneDate, PlaneDetailsProps, PlaneEditProps} from "../../PlaneDetails";

const MainInfoComponentEdit: React.FC<PlaneEditProps> = ({planeDetails: initialPlaneDetails, editingDone}) => {

    const [planeDetails, setPlaneDetails] = React.useState(initialPlaneDetails);

    function saveEdits() {
        console.log("Pushing updated info to database (... eventually!)"); //post to database
        editingDone(planeDetails);
    }

    const handlePlaneNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlaneDetails(prevDetails => ({ ...prevDetails, name: event.target.value }));
    }

    const handlePlaneTailNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlaneDetails(prevDetails => ({ ...prevDetails, tailNumber: event.target.value }));
    }

    const handlePlaneModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlaneDetails(prevDetails => ({ ...prevDetails, model: event.target.value }));
    }

    const handleFirstFlightDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlaneDetails(prevDetails => ({ ...prevDetails, firstFlightDate: event.target.value }));
    }

    const handleMileageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlaneDetails(prevDetails => ({ ...prevDetails, mileage: parseInt(event.target.value) }));
    }

    return (
        <>
            <div className="flex justify-between">
                <input
                    className={"text-2xl rounded-lg outline-1 outline-gray-200 bg-gray-100"}
                    type="text"
                    value={planeDetails.name}
                    onChange={handlePlaneNameChange}
                    name="planeName">
                </input>
                <button onClick={saveEdits}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                    </svg>
                </button>
            </div>
            <div className="flex flex-col flex-1 mt-2">
                <div className={"w-full h-64"}>
                    <img src={planeDetails.coverImgPath} alt="Plane Hero Image"
                         className="w-full h-full rounded-xl object-cover"/>
                </div>
                <div className={"w-full flex"}>
                    <div className={"flex-1"}>
                        <div className={"mt-2"}>
                            <div className="font-extrabold text-sm text-gray-500">TAIL NUMBER</div>
                            <input
                                className={"rounded-lg outline-none bg-gray-100 -mt-1"}
                                type="name"
                                value={planeDetails.tailNumber}
                                onChange={handlePlaneTailNumChange}
                                name="tailNumber">
                            </input>
                        </div>
                        <div className={"mt-2"}>
                            <div className="font-extrabold text-sm text-gray-500">MODEL</div>
                            <input
                                className={"rounded-lg outline-none bg-gray-100 -mt-1"}
                                type="name"
                                value={planeDetails.model}
                                onChange={handlePlaneModelChange}
                                name="planeModel">
                            </input>
                        </div>
                        <div className={"mt-2"}>
                            <div className="font-extrabold text-sm text-gray-500">FIRST FLIGHT DATE</div>
                            <input
                                className={"rounded-lg outline-none bg-gray-100 -mt-1"}
                                type="name"
                                value={planeDetails.firstFlightDate}
                                onChange={handleFirstFlightDateChange}
                                name="firstFlightDate">
                            </input>
                        </div>
                    </div>
                    <div className={"flex-1"}>
                        <div className={"mt-2"}>
                            <div className="font-extrabold text-sm text-gray-500">MILEAGE</div>
                            <input
                                className={"rounded-lg outline-none bg-gray-100 -mt-1"}
                                type="name"
                                value={planeDetails.mileage}
                                onChange={handleMileageChange}
                                name="mileage">
                            </input>
                        </div>
                        <div className={"mt-2"}>
                            <div className="font-extrabold text-sm text-gray-500">MAINTENANCE DOCUMENTS</div>
                            <div className={"text-gray-800 -mt-1"}>{planeDetails.documentCount}</div>
                        </div>
                        <div className={"mt-2"}>
                        <div className="font-extrabold text-sm text-gray-500">LAST LOG DATE</div>
                            <div className={"text-gray-800 -mt-1"}>{formatPlaneDate(planeDetails.lastLogDate, true)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainInfoComponentEdit;