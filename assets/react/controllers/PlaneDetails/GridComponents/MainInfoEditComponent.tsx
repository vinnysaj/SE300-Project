/*import React, {ChangeEventHandler, ReactElement, useEffect, useState} from 'react';
import axios from "axios";
import {PlaneDetailsProps} from "../PlaneDetails";

const PlaneDetailGrid: React.FC<PlaneDetailsProps> = ({planeDetails,extendedPlaneDetails}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [planeName, setPlaneName] = useState(planeDetails.planeName);
    const [planeTailNumber, setPlaneTailNumber] = useState(planeDetails.planeTailNumber);
    const [planeModel, setPlaneModel] = useState(planeDetails.planeModel);
    const userToken = "1234"
    function switchIsEditing() {
        if(isEditing == true){
            axios.post('https://10.6.0.1:7000/api/user/update/assignedaircraft', {
                token: userToken,
                planes: {
                    //JSON data of all planes
                }
            })
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        setIsEditing(!isEditing);
    };
    const handlePlaneNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setPlaneName(event.target.value);
    };
    const handlePlaneTailNumChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setPlaneTailNumber(event.target.value);
    };
    const handlePlaneModelChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setPlaneModel(event.target.value);
    };

    return(
        <>
            {isEditing ? <div className="w-1/2 rounded-2xl bg-gray-200 p-8 shadow-xl">
                        <div className="flex flex-row-reverse">
                            <button onClick={switchIsEditing} className="">Save</button>
                        </div>
                        <div className="flex flex-col flex-1">
                            <div>
                                <img src={planeDetails.planeCoverImgPath} alt="Plane Hero Image"
                                     className="w-64 h-64 rounded-xl drop-shadow-lg shadow-lg"/>
                            </div>
                            <div>
                                <div className="font-bold text-2xl">
                                    <input
                                        className={"rounded-lg outline-none bg-gray-100"}
                                        type="name"
                                        value={planeName}
                                        onChange={handlePlaneNameChange}
                                        name="planeName">
                                    </input>
                                </div>
                                <div className="font-medium text-lg">
                                    <input
                                        className={"rounded-lg outline-none bg-gray-100"}
                                        type="name"
                                        value={planeTailNumber}
                                        onChange={handlePlaneTailNumChange}
                                        name="planeName">
                                    </input>
                                </div>
                                <div className="font-medium text-base">
                                    <input
                                        className={"rounded-lg outline-none bg-gray-100"}
                                        type="name"
                                        value={planeModel}
                                        onChange={handlePlaneModelChange}
                                        name="planeName">
                                    </input>
                                </div>
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    <div>
                                        <div className="font-semibold text-lg">Maintenance Documents</div>
                                        <div className="text-gray-700 text-lg">0</div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-lg">Mileage</div>
                                        <div className="text-gray-700 text-lg">24,152 mi</div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-lg">Last Log Date</div>
                                        <div className="text-gray-700 text-lg">Monday, February 12th, 2024</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> :
                <div className="w-1/2 rounded-2xl bg-gray-200 p-8 shadow-xl">
                    <div className="flex flex-row-reverse">
                        <button onClick={switchIsEditing}>Edit</button>
                    </div>
                    <div className="flex flex-col flex-1">
                        <div>
                            <img src={planeDetails.planeCoverImgPath} alt="Plane Hero Image"
                                 className="w-64 h-64 rounded-xl drop-shadow-lg shadow-lg"/>
                        </div>
                        <div>
                            <div className="font-bold text-2xl">{planeName}</div>
                            <div className="font-medium text-lg text-gray-400">{planeTailNumber}</div>
                            <div className="font-medium text-gray-400 text-base">{planeModel}</div>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                <div>
                                    <div className="font-semibold text-lg">Maintenance Documents</div>
                                    <div className="text-gray-700 text-lg">0</div>
                                </div>
                                <div>
                                    <div className="font-semibold text-lg">Mileage</div>
                                    <div className="text-gray-700 text-lg">24,152 mi</div>
                                </div>
                                <div>
                                    <div className="font-semibold text-lg">Last Log Date</div>
                                    <div className="text-gray-700 text-lg">Monday, February 12th, 2024</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>}
                </>
                );
            };

            export default PlaneDetailGrid;*/