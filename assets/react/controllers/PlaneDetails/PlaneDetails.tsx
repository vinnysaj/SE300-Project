import React, {useState, useEffect} from 'react';
import Navbar from "../Navbar/Navbar";
import NavbarHelper from "../Navbar/NavbarHelper";
import PlaneDetailGrid from "./PlaneDetailGrid";
const PlaneDetails: React.FC = () => {
    const [planeDetails, setPlaneDetails] = useState<PlaneDetailsProps | null>(null);
    const [extendedPlaneDetails, setExtendedPlaneDetails] = useState<extendedPlaneDetailsProps | null>(null);
    const [planeData, setPlaneData] = useState<PlaneDetailsProps | null>(null);
    useEffect(() => {
        const fetchPlaneDetails = async () => {
            // Simulated fetch operation
            const simulatedCompleteData: extendedPlaneDetailsProps = {
                id: 10,
                reg: 'string',
                active: true,
                serial: 'string',
                icao: 'string',
                model: 'string',
                typeName: 'string',
                regowner: 'string',
                hours: 10,
                plane_data: JSON,
                owner_id: JSON,
                icon_file_uid: "string",
            }
            setPlaneDetails(simulatedCompleteData);
        };

        fetchPlaneDetails();
    }, []);

    return (
        <div className="h-full w-full">
            <Navbar pageTitle={"Plane Dashboard"} />
            <NavbarHelper />
            <div className="px-16 mt-8">
                {planeDetails ? <PlaneDetailGrid extendedPlaneDetails={extendedPlaneDetails} /> : <p>Loading...</p>}
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
export interface extendedPlaneDetailsProps {
    id: number,
    reg: string,
    active: boolean,
    serial: string,
    icao: string,
    model: string,
    typeName: string,
    regowner: string,
    hours: number,
    plane_data: JSON,
    owner_id: JSON,
    icon_file_uid: string,
}
export interface PlaneGridProps {
    extendedPlaneDetails: extendedPlaneDetailsProps
}

export default PlaneDetails;