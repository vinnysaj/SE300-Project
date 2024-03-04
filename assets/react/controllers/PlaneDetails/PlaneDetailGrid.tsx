import React, {ReactElement, useEffect, useState} from 'react';
import axios from "axios";
import {PlaneDetailsProps} from "./PlaneDetails";
import MainInfoComponent from "./GridComponents/MainInfoComponent";
import MainInfoEditComponent from "./GridComponents/MainInfoEditComponent";

const PlaneDetailGrid: React.FC<PlaneDetailsProps> = ({planeDetails}) => {
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
            const response = await axios.post("https://10.6.0.1:7000/user/get/assigned/Aircraft", {
                user_id: "106128017282493053284",
                token: "12345"
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
        <MainInfoComponent planeDetails={planeDetails} editingStart={null}/>
    );
};

export default PlaneDetailGrid;