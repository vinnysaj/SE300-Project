import React, {useState} from 'react';
import Navbar from "../components/Navbar/Navbar";
import DashboardGrid from "../components/Dashboard/DashboardGrid";
import DashboardGridElement from "../components/Dashboard/DashboardGridElement";
import NavbarHelper from "../components/Navbar/NavbarHelper";
import DashboardGridAddElement from "../components/Dashboard/DashboardGridAddElement";



export default function (properties: any) {
    const [planeGridElements, setPlaneGridElements] = useState(null)
    React.useEffect(() => {
        const gridElements = [
            <DashboardGridElement key={0} planeImgPath={"images/test.jpg"} planeName={"Plane 1"}></DashboardGridElement>,
            <DashboardGridAddElement key={1} addText="Add new" />
        ]
        setPlaneGridElements(gridElements)
    }, []);

    return (
        <div className="h-full w-full">
            <Navbar pageTitle={"Dashboard"} />
            <NavbarHelper />
            <div className="px-16 mt-8">
                <DashboardGrid gridElements={planeGridElements} gridTitle="Your Tracked Planes" />
            </div>
        </div>
    );
};