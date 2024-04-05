import React, {useState} from 'react';
import Navbar from "../Navbar/Navbar";
import DashboardGrid from "../Dashboard/DashboardGrid";
import DashboardGridElement from "../Dashboard/DashboardGridElement";
import NavbarHelper from "../Navbar/NavbarHelper";
import DashboardGridAddElement from "../Dashboard/DashboardGridAddElement";
import {makeAuthCall} from "../AuthManager/AuthManager";
import {interactive} from "@material-tailwind/react/types/components/popover";
import PlaneDetails from "../PlaneDetails/PlaneDetails";
import AddPlaneModal, {NewPlaneData} from "./AddPlaneModal";

const Dashboard: React.FC = () => {
    const [planeGridElements, setPlaneGridElements] = useState(null)
    const [planeAddModalVisible, setPlaneAddModalVisible] = React.useState<boolean>(false);
    const [refresh, setRefresh] = useState<number>(0);

    function addPlaneClicked() {
        setPlaneAddModalVisible(true);
    }

    React.useEffect(() => {
        const getPlanesURL = "https://api.boundlessflight.net/api/user/get/assignedaircraft"
        let response = makeAuthCall(getPlanesURL, "GET", null);
        response.then((res) => {
            let planeDataArray: PlaneData[] = res.data as PlaneData[];
            const gridElements:React.JSX.Element[] = [];
            for (let i = 0; i < planeDataArray.length; i++) {
                gridElements.push(<DashboardGridElement key={i} planeImgPath={"/images/test.jpg"} planeName={planeDataArray[i].reg} planeID={planeDataArray[i].id.toString()}></DashboardGridElement>)
            }
            gridElements.push(<DashboardGridAddElement key={planeDataArray.length + 1} addText="Add new" addClicked={addPlaneClicked} />)
            setPlaneGridElements(gridElements);
        }).catch((err) => {
            console.log(err);
            // alert with options to redirect or close
            let result = confirm("Error fetching planes! Perhaps you are not authenticated? Press 'OK' to sign in.");
            if (result) {
                window.location.href = "https://auth.boundlessflight.net";
            } else {
                alert("so be it. >:(")
            }
        });
    }, [refresh]);

    async function saveNewPlane(newPlaneData:NewPlaneData) {
        console.log(newPlaneData);
        let response = await makeAuthCall("https://api.boundlessflight.net/api/user/add/assignedaircraft", "POST", newPlaneData);
        if (response.status === 201) {
            successfulPlaneAdd();
        }
    }

    function successfulPlaneAdd() {
        console.log("Successfully added a new plane!")
        closeModal();
        setRefresh(refresh + 1);
    }

    function errorPlaneAdd() {
        alert("Error adding a new plane. Please try again later.")
    }

    function closeModal() {
        setPlaneAddModalVisible(false);
    }

    return (
        <>
            <div className="h-full w-full">
                <Navbar pageTitle={"Dashboard"}/>
                <NavbarHelper/>
                <div className="px-16 mt-8">
                    <DashboardGrid gridElements={planeGridElements} gridTitle="Your Planes"/>
                </div>
            </div>
            { planeAddModalVisible ? (
                <AddPlaneModal closeModal={closeModal} savePlane={saveNewPlane} />
            ) : null }
        </>
    );
};

export interface PlaneData {
    id: number;
    reg: string;
    active: boolean;
    serial: string;
    icao: string;
    model: string;
    typeName: string;
    regowner: string;
    hours: number;
    plane_data: any;
    owner_id: any;
    createdAt: string;
    updatedAt: string;
    icon_file_b64: string;
    cover_file_b64: string;
}

export default Dashboard;