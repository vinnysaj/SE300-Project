import React, {useState, useEffect} from 'react';
import Navbar from "../Navbar/Navbar";
import NavbarHelper from "../Navbar/NavbarHelper";
import PlaneDetailGrid from "./PlaneDetailGrid";
const PlaneDetails: React.FC = () => {
    const [planeDetails, setPlaneDetails] = useState<PlaneDetails | null>(null);

    useEffect(() => {
        const fetchPlaneDetails = async () => {
            // Simulated fetch operation
            const simulatedData: PlaneDetails = {
                coverImgPath: '/images/test.jpg',
                id: '12345',
                name: 'My Plane',
                model: '747-400',
                tailNumber: 'N12345',
                type: 'Commercial',
                mileage: 12345,
                documentCount: 5,
                firstFlightDate: '2023/02/29',
                lastLogDate: '2023/02/2'
            };
            setPlaneDetails(simulatedData);
        };

        fetchPlaneDetails();
    }, []);

    return (
        <div className="h-full w-full">
            <Navbar pageTitle={"Plane Dashboard"} />
            <NavbarHelper />
            <div className="px-16 mt-8">
                {planeDetails ? <PlaneDetailGrid planeDetails={planeDetails}  editingStart={null}/> : <p>Loading...</p>}
            </div>
        </div>
    );
};

export interface PlaneDetails {
    coverImgPath: string,
    id: string,
    name: string,
    model: string,
    tailNumber: string,
    type: string,
    mileage: number,
    documentCount: number,
    lastLogDate?: string,
    firstFlightDate?: string,
}

export interface PlaneEditProps {
    planeDetails: PlaneDetails,
    editingDone: (newPlaneDetails: PlaneDetails) => void,
}

export interface PlaneDetailsProps {
    planeDetails: PlaneDetails,
    editingStart: () => void,
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

export function addCommasToNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}