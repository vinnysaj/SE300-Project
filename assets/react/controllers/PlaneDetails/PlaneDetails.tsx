import React, {useState, useEffect} from 'react';
import Navbar from "../Navbar/Navbar";
import NavbarHelper from "../Navbar/NavbarHelper";
import PlaneDetailGrid from "./PlaneDetailGrid";
const PlaneDetails: React.FC = () => {
    const [planeDetails, setPlaneDetails] = useState<PlaneDetailsProps | null>(null);
    useEffect(() => {
        const fetchPlaneDetails = async () => {
            // Simulated fetch operation
            const simulatedData: PlaneDetailsProps = {
                planeCoverImgPath: '/images/test.jpg',
                planeID: '12345',
                planeName: 'Plane',
                planeModel: '747-400',
                planeTailNumber: 'N12345',
                planeType: 'Commercial',
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
                {planeDetails ? <PlaneDetailGrid planeDetails={planeDetails} /> : <p>Loading...</p>}
            </div>
        </div>
    );
};

export interface PlaneDetailsProps {
    planeCoverImgPath: string,
    planeID: string,
    planeName: string,
    planeModel: string,
    planeTailNumber: string,
    planeType: string,
}

export interface PlaneGridProps {
    planeDetails: PlaneDetailsProps
}

export default PlaneDetails;