import React, {ReactElement, useEffect, useState} from 'react';
import axios from "axios";
import {makeAuthCall} from "../AuthManager/AuthManager";

const DashboardGrid: React.FC<DashboardGridProps> = ({gridTitle, gridElements}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [planeData, setPlaneData] = useState<PlaneData | null>(null);


    useEffect(() => {
        if (isLoading) {
            loadDashboard();
        }
    }, []);

    const loadDashboard = async() => {
        setIsLoading(true);
        try {
            let url = "https://api.boundlessflight.net/api/user/get/assignedaircraft";
            let response = makeAuthCall(url, "POST", null);

            console.log(response);
        } catch (error) {
            setError(error);
            //setUserData(null);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full rounded-2xl bg-gray-200 p-8 shadow-xl">
            <div className="font-semibold text-3xl">{gridTitle}</div>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {gridElements}
            </div>
        </div>
    );
};

interface PlaneData {

}

interface DashboardGridProps {
    gridTitle: string,
    gridElements: React.ReactElement[]
}

export default DashboardGrid;