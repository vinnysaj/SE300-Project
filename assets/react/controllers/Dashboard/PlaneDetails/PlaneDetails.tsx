import React, {useState, useEffect} from 'react';
import PlaneDetailGrid from "./PlaneDetailGrid";
import {PlaneData} from "../Dashboard";
import {makeAuthCall} from "../../AuthManager/AuthManager";
const PlaneDetails: React.FC<PlaneDetailsProps> = (props) => {
    const [planeDataDetailed, setPlaneDataDetailed] = useState<PlaneDataDetailed | null>(null);

    useEffect(() => {
        const getPlaneDetailsURL = "https://api.boundlessflight.net/api/user/get/assignedaircraft/details/" + props.planeData.id
        let response = makeAuthCall(getPlaneDetailsURL, "GET", null);
        response.then((res) => {
            let planeDetails: PlaneDataDetailed = res.data as PlaneDataDetailed;
            setPlaneDataDetailed(planeDetails);
        }).catch((err) => {
            console.log(err);
            let result = confirm("Error fetching detailed plane data! Perhaps you are not authenticated? Press 'OK' to sign in.");
            if (result) {
                window.location.href = "https://auth.boundlessflight.net";
            } else {
                props.exitDetails();
            }
        });
    }, []);

    function editingStart() {

    }
    
    function addDocClicked(planeDataDetailed: PlaneDataDetailed) {
        window.location.href = "https://127.0.0.1:8000/fileUpload"
    }

    return (
        <div className="px-16 mt-8">
            {planeDataDetailed ? <PlaneDetailGrid planeDataDetailed={planeDataDetailed} addDocClicked={addDocClicked}/> : <p>Loading...</p>}
        </div>
    );
};


export interface PlaneDetailsProps {
    planeData: PlaneData;
    exitDetails: () => void;
}

export interface PlaneDataDetailed extends PlaneData {
    filesCount: number;
}

export default PlaneDetails;

export function formatPlaneDate(dateString: string, includeWeekday?:boolean): string {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date(dateString);

    const dayOfWeek = days[date.getDay()];
    const day = date.getDate();

    let daySuffix;
    switch (day) {
        case 1:
        case 21:
        case 31:
            daySuffix = "st";
            break;
        case 2:
        case 22:
            daySuffix = "nd";
            break;
        case 3:
        case 23:
            daySuffix = "rd";
            break;
        default:
            daySuffix = "th";
    }

    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    if (includeWeekday) {
        return `${dayOfWeek}, ${monthName} ${day}${daySuffix}, ${year}`;
    } else {
        return `${monthName} ${day}${daySuffix}, ${year}`;
    }
}

export function calculateTimeSinceFirstFlight(date: string): string {
    const dateObj = new Date(date);
    const today = new Date();

    const diffInMs = Math.abs(today.getTime() - dateObj.getTime());
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays < 30) {
        return diffInDays === 1 ? `${diffInDays} day ago` : `${diffInDays} days ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return diffInMonths === 1 ? `${diffInMonths} month ago` : `${diffInMonths} months ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return diffInYears === 1 ? `${diffInYears} year ago` : `${diffInYears} years ago`;
}

export function addCommasToNumber(num?: number): string {
    if (!num) return "0";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}