import React, {ReactElement, useEffect, useState} from 'react';
import axios from "axios";
import {PlaneGridProps} from "../PlaneDetails";

const PlaneDetailGrid: React.FC<PlaneGridProps> = ({planeDetails}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    return (
        <div className="w-1/2 rounded-2xl bg-gray-200 p-8 shadow-xl">
            <div className="flex flex-row-reverse">
                <button>
                    EDIT
                </button>
            </div>
            <div className="flex flex-col flex-1 -mt-6">
                <div>
                    <img src={planeDetails.planeCoverImgPath} alt="Plane Hero Image"
                         className="w-64 h-64 rounded-xl drop-shadow-lg shadow-lg"/>
                </div>
                <div>
                    <div className="font-bold text-2xl">{planeDetails.planeName}</div>
                    <div className="font-medium text-lg text-gray-400">{planeDetails.planeTailNumber}</div>
                    <div className="font-medium text-gray-400 text-base">{planeDetails.planeModel}</div>
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

        </div>
    );
};

export default PlaneDetailGrid;