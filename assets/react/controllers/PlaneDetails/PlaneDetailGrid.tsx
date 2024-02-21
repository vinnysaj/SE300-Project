import React, {ReactElement, useEffect, useState} from 'react';
import axios from "axios";
import {PlaneGridProps} from "./PlaneDetails";
import MainInfoComponent from "./GridComponents/MainInfoComponent";
import MainInfoEditComponent from "./GridComponents/MainInfoEditComponent";

const PlaneDetailGrid: React.FC<PlaneGridProps> = ({planeDetails}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if (isLoading) {
            loadDashboard();
        }
    }, []);

    const loadDashboard = async() => {
        setIsLoading(true);
        try {
            const response = await axios.post("http://10.6.0.1:6969/user/get/assigned/Aircraft", {
                user_id: "106128017282493053284"
            });
            console.log(response)
            /*const jsonData:UserData = response.data;

            if (!isValidUserData(jsonData)) {
                throw new Error('Invalid data received')
            }
            setError(null);
            setUserData(jsonData)*/
        } catch (error) {
            setError(error);
            //setUserData(null);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <MainInfoEditComponent planeDetails={planeDetails} />
    );
};

export default PlaneDetailGrid;