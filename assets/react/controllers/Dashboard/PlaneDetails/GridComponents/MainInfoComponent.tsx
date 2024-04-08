import React, {useState} from 'react';
import MainInfoComponentView from "./MainInfoComponent/MainInfoComponentView";
import MainInfoComponentEdit from "./MainInfoComponent/MainInfoComponentEdit";
import {PlaneDetailGridProps} from "../PlaneDetailGrid";

const MainInfoComponent: React.FC<PlaneDetailGridProps> = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditingStart() {
        setIsEditing(true);
    }

    function handleEditingDone() {
        setIsEditing(false);
        //makeAuthCall()!!
    }

    return (
        <div className="w-1/2 rounded-2xl bg-gray-200 p-8 shadow-xl">
            {isEditing ? (
                <MainInfoComponentEdit planeDataDetailed={props.planeDataDetailed} editingDone={handleEditingDone} />
            ) : (
                <MainInfoComponentView planeDataDetailed={props.planeDataDetailed} editingStart={handleEditingStart}/>
            )}
        </div>
    );
};

export default MainInfoComponent;