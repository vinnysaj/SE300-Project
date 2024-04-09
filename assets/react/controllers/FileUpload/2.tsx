import React, {useEffect, useRef, useState} from 'react';
import {GridContextProvider, GridDropZone, GridItem, swap,} from "react-grid-dnd";

import './FileObj.css'; // Assuming you have some CSS for grid layout

interface MaintenanceLog {
    id: string;
    name: string;
    files: FileObject[];
}

interface FileObject {
    id: string;
    name: string;
    preview: string | null;
}

const FileUpload: React.FC = () => {
    const [maintenanceLogs, setMaintenanceLogs] = useState<MaintenanceLog[]>([
        {
            id: '1',
            name: 'Maintenance Log 1',
            files: [{id: "1", name: "name", preview: "preview"},
                {id: "1", name: "name", preview: "preview"},
                {id: "1", name: "name", preview: "preview"},
                {id: "1", name: "name", preview: "preview"}],
        },
        {
            id: '2',
            name: 'Maintenance Log 2',
            files: [{id: "1", name: "name", preview: "preview"},
                {id: "1", name: "name", preview: "preview"},
                {id: "1", name: "name", preview: "preview"},
                {id: "1", name: "name", preview: "preview"}],
        },
        // Add more maintenance logs as needed
    ]);
    const [selectedMaintenanceLogIndex, setSelectedMaintenanceLogIndex] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const hiddenFileInput = useRef(null);

    useEffect(() => {
        //pull maintenance logs
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            const file = fileList[0];
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setMaintenanceLogs(prevLogs => {
                    const updatedLogs = [...prevLogs];
                    updatedLogs[selectedMaintenanceLogIndex].files.push({
                        id: Date.now().toString(),
                        name: file.name,
                        preview: fileReader.result as string,
                    });
                    return updatedLogs;
                });
            };
            fileReader.readAsDataURL(file);
        }
    };

    function handleOnDragEnd(sourceId, sourceIndex, targetIndex, targetId) {
        const newMaintenanceLogs = [...maintenanceLogs];
        const newMaintenanceLog = newMaintenanceLogs[selectedMaintenanceLogIndex];
        newMaintenanceLog.files = swap(newMaintenanceLog.files, sourceIndex, targetIndex);
        newMaintenanceLogs[selectedMaintenanceLogIndex] = newMaintenanceLog;
        setMaintenanceLogs(newMaintenanceLogs);
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
        <div className="text-center">
            <div className={"pt-4"}>
                <button className="inline" onClick={goToPrevLog}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
                    </svg>
                </button>
                <h1 className={"inline px-16"}>{maintenanceLogs[selectedMaintenanceLogIndex].name}</h1>
                <button className="inline" onClick={goToNextLog}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                    </svg>
                </button>
            </div>
            <div>
                <div onClick={clickFileInput} className={"h-16 w-32 m-auto rounded-xl bg-gray-200 hover:cursor-pointer"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="w-full h-full">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                </div>
                <input
                    type="file"
                    onChange={handleFileChange}
                    ref={hiddenFileInput}
                    style={{display: 'none'}} // Make the file input element invisible
                />
            </div>
            <div className="grid-container">
                <GridContextProvider onChange={handleOnDragEnd}>
                    <GridDropZone
                        id="items"
                        boxesPerRow={4}
                        rowHeight={100}
                        style={{ height: "400px" }}
                    >
                        {maintenanceLogs[selectedMaintenanceLogIndex].files.map((file) => (
                            <GridItem key={file.id} className="griditemUI">
                                <div className="bg-gray-200 rounded-lg">
                                    {file.preview && (
                                        <img
                                            className="file-preview"
                                            draggable="false"
                                            src={file.preview}
                                            alt={file.name}
                                        />
                                    )}
                                    <div className="file-name">{file.name}</div>
                                </div>
                            </GridItem>
                            ))}
                    </GridDropZone>
                </GridContextProvider>
            </div>
        </div>
    );
};

export default FileUpload;
