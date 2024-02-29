import React, {useState} from 'react';
import Navbar from "../Navbar/Navbar";
import DashboardGrid from "../Dashboard/DashboardGrid";
import DashboardGridElement from "../Dashboard/DashboardGridElement";
import NavbarHelper from "../Navbar/NavbarHelper";
import DashboardGridAddElement from "../Dashboard/DashboardGridAddElement";



const Dashboard: React.FC = () => {
    const [planeGridElements, setPlaneGridElements] = useState(null)
    React.useEffect(() => {
        const gridElements = [
            <DashboardGridElement key={0} planeImgPath={"/images/test.jpg"} planeName={"My Plane"} planeID={"testID"}></DashboardGridElement>,
            <DashboardGridAddElement key={1} addText="Add new" />
        ]
        setPlaneGridElements(gridElements)
    }, []);

    return (
        <div className="h-full w-full">
            <Navbar pageTitle={"Dashboard"} />
            <NavbarHelper />
            <div className="px-16 mt-8">
                <DashboardGrid gridElements={planeGridElements} gridTitle="Your Planes" />
            </div>
        </div>
    );
};

export default Dashboard;