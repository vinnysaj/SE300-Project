import React, {useEffect, useRef, useState} from "react";
import "./FileObj.css";
import {GridContextProvider, GridDropZone, GridItem, swap} from "react-grid-dnd";
import Navbar from "../Navbar/Navbar";
import NavbarHelper from "../Navbar/NavbarHelper";
import {v4 as uuidv4} from 'uuid';
import Dropdown from "./Dropdown";

interface MaintenanceLog {
    id: string;
    name: string;
    files: FileObject[]
}

export interface FileObject {
    fileID?: string;
    guiKey: string;
    name: string;
    preview: string | null;
}

export default function FileUpload() {
    const [maintenanceLogs, setMaintenanceLogs] = useState<MaintenanceLog[]>([
        {
            id: '1',
            name: 'Maintenance Log 1',
            files: [],
        },
        {
            id: '2',
            name: 'Maintenance Log 2',
            files: [],
        },
        // Add more maintenance logs as needed
    ]);
    const[files, setFiles] = useState<FileObject[]>([])
    const [selectedMaintenanceLogIndex, setSelectedMaintenanceLogIndex] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const hiddenFileInput = useRef(null);

    useEffect(() => {
        //simulated call
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            const newFiles: FileObject[] = Array.from(fileList).map((file) => ({
                guiKey: uuidv4(),
                name: file.name,
                preview: URL.createObjectURL(file), // Use URL.createObjectURL to generate a preview URL for the file
            }));

            setMaintenanceLogs((prevLogs) => {
                const updatedLogs = [...prevLogs];
                const selectedLog = updatedLogs[selectedMaintenanceLogIndex];
                // Append the new files to the files array of the selected maintenance log
                selectedLog.files = [...selectedLog.files, ...newFiles];
                return updatedLogs;
            });
        }
    };


    function onChange(sourceId, sourceIndex, targetIndex, targetId) {
        setMaintenanceLogs((prevLogs) => {
            const selectedLog = maintenanceLogs[selectedMaintenanceLogIndex];
            if (selectedLog) {
                selectedLog.files = swap([...selectedLog.files], sourceIndex, targetIndex);
            }
            return [...prevLogs, selectedLog]; // Ensure a new reference for React state update
        });
    }


    function clickFileInput(){
        hiddenFileInput.current.click();
    };

    const goToPrevLog = () => {
        setSelectedMaintenanceLogIndex(prevIndex => (prevIndex === 0 ? maintenanceLogs.length - 1 : prevIndex - 1));
    };

    const goToNextLog = () => {
        setSelectedMaintenanceLogIndex(prevIndex => (prevIndex === maintenanceLogs.length - 1 ? 0 : prevIndex + 1));
    };
    return (
        <>
        <Navbar pageTitle={"Plane Dashboard"} />
        <NavbarHelper />
        <div className="font-sans text-center bg-gray-200 rounded-2xl shadow-xl">
            <div className={"pt-4"}>
                <button className="inline" onClick={goToPrevLog}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
                    </svg>
                </button>
                <h1 className={"inline px-16 text-3xl"}>{maintenanceLogs[selectedMaintenanceLogIndex].name}</h1>
                <button className="inline" onClick={goToNextLog}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                    </svg>
                </button>
            </div>
            <div>
                <div onClick={clickFileInput}
                     className={"h-16 pt-4 w-full m-auto rounded-xl bg-gray-200 hover:cursor-pointer"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-full h-full">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                </div>
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    ref={hiddenFileInput}
                    style={{display: 'none'}} // Make the file input element invisible
                />
            </div>
            <GridContextProvider onChange={onChange}>
                <GridDropZone
                    id="items"
                    boxesPerRow={6}
                    rowHeight={250}
                    style={{height: 250 * Math.ceil(maintenanceLogs[selectedMaintenanceLogIndex].files.length / 6) + 6}}
                >
                    {maintenanceLogs[selectedMaintenanceLogIndex].files.map((item) => (
                        <GridItem key={item.guiKey} className="cursor-grab bg-gray-200 rounded-2xl text-ellipsis border-2 border-white">
                            <div className={"no-select"}
                                style={{
                                    width: "100%",
                                    height: "100%"
                                }}
                            >
                                <div className={"absolute top-0 right-0 p-1"}>
                                        <Dropdown/>
                                </div>
                                {item.preview && (
                                    <img
                                        className="rounded-2xl file-preview mx-auto text-center"
                                        draggable="false"
                                        src={item.preview}
                                        alt={item.name}
                                    />
                                )}
                                <h1 className="p-1 mx-auto" style={{
                                    maxWidth: "100%",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}>{item.name}</h1>
                            </div>
                        </GridItem>
                    ))}
                </GridDropZone>
            </GridContextProvider>
        </div>
        </>
    );
}
