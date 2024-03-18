import React, {ReactElement, useEffect, useState} from 'react';
import axios from "axios";
import {PlaneGridProps} from "./PlaneDetails";
import MainInfoComponent from "./GridComponents/MainInfoComponent";
import MainInfoEditComponent from "./GridComponents/MainInfoEditComponent";
import {extendedPlaneDetailsProps} from "./PlaneDetails";

const PlaneDetailGrid: React.FC<PlaneGridProps> = ({planeDetails, extendedPlaneDetails}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<extendedPlaneDetailsProps | null>(null)

    useEffect(() => {
        if (isLoading) {
            loadDashboard();
        }
    }, []);

    const loadDashboard = async() => {
        setIsLoading(true);
        try {
            const response = await axios.post("http://10.6.0.1:6969/user/get/assigned/Aircraft", {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imx1Y2NhZGltYXJpb0BnbWFpbC5jb20iLCJpYXQiOjE3MDkxNzMyNjMsImV4cCI6MTcwOTc3ODA2M30.QfWkxX5OHM5zZZ4QApdpPd9y_Mi_nmyxQZyQx_wM8is",
                user_id: "106128017282493053284"
            });
            console.log(response);

            setError(null);
        } catch (error) {
            setError(error);
            //setUserData(null);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <MainInfoEditComponent planeDetails={planeDetails} extendedPlaneDetails={extendedPlaneDetails} />
    );
};

export default PlaneDetailGrid;