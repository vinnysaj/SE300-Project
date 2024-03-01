import React, {ReactElement, useEffect, useState} from 'react';
import axios from "axios";
import {PlaneDetailsProps} from "../PlaneDetails";
import MainInfoComponentView from "./MainInfoComponent/MainInfoComponentView";
import MainInfoComponentEdit from "./MainInfoComponent/MainInfoComponentEdit";

const MainInfoComponent: React.FC<PlaneDetailsProps> = ({planeDetails}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditingStart() {
        setIsEditing(true);
    }

    function handleEditingDone() {
        setIsEditing(false);
    }

    return (
        <div className="w-1/2 rounded-2xl bg-gray-200 p-8 shadow-xl">
            {isLoading ? (
                <p>Loading...</p>
            ) : error !== null ? (
                <p>There has been an error! Please try again later.</p>
            ) : isEditing ? (
                <MainInfoComponentEdit planeDetails={planeDetails} editingDone={handleEditingDone}/>
            ) : (
                <MainInfoComponentView planeDetails={planeDetails} editingStart={handleEditingStart}/>
            )}
        </div>
    );
};

export default MainInfoComponent;