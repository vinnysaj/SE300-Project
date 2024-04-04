import React, {useEffect, useRef, useState} from "react";
import "./FileObj.css";
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap
} from "react-grid-dnd";

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

    function onChange(sourceId, sourceIndex, targetIndex, targetId) {
        const newMaintenanceLogs = [...maintenanceLogs];
        newMaintenanceLogs[selectedMaintenanceLogIndex].files = swap(newMaintenanceLogs[selectedMaintenanceLogIndex].files, sourceIndex, targetIndex);
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
        <div className="App">
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
                <div onClick={clickFileInput}
                     className={"h-16 w-full m-auto rounded-xl bg-gray-200 hover:cursor-pointer"}>
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
            <GridContextProvider onChange={onChange}>
                <GridDropZone
                    id="items"
                    boxesPerRow={6}
                    rowHeight={250}
                    style={{height: "400px"}}
                >
                    {maintenanceLogs[selectedMaintenanceLogIndex].files.map((item) => (
                        <GridItem key={item.id} className="griditemUI cursor-grab bg-gray-200 rounded-lg text-ellipsis">
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%"
                                }}
                            >
                                {item.preview && (
                                    <img
                                        className="file-preview mx-auto text-center"
                                        draggable="false"
                                        src={item.preview}
                                        alt={item.name}
                                    />
                                )}
                                <h1 className="p-1 mx-auto" style={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</h1>
                            </div>
                        </GridItem>
                    ))}
                </GridDropZone>
            </GridContextProvider>
        </div>
    );
}
