import React, {useEffect, useRef, useState} from "react";
import "./FileObj.css";
import {GridContextProvider, GridDropZone, GridItem, swap} from "react-grid-dnd";
import Navbar from "../Navbar/Navbar";
import NavbarHelper from "../Navbar/NavbarHelper";
import {v4 as uuidv4} from 'uuid';
import Dropdown from "./Dropdown";
import {makeAuthCall} from "../AuthManager/AuthManager";
import AddMlogModal, {NewMlogData} from "./AddMlogModal";
import AddPlaneModal, {NewPlaneData} from "../Dashboard/AddPlaneModal";

interface MaintenanceLog {
    id: number;
    planeID: number;
    name: string;
    files: FileObject[]
}

export interface FileObject {
    handwritten?: boolean
    fileID?: string;
    guiKey: string;
    mlogID: number;
    name: string;
    type: "image" | "pdf"
    preview: string | null;
}
export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

export default function FileUpload(props: {id: number}) {
    const[files, setFiles] = useState<FileObject[]>([])
    const [selectedMaintenanceLogIndex, setSelectedMaintenanceLogIndex] = useState<number>(0);
    const [refresh, setRefresh] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [mlogLoading, setMlogLoading] = useState<boolean>(true);
    const [mlogRemove, setMlogRemove] = useState<boolean>(false);
    const [keyToEdit, setKeyToEdit] = useState<string | null>(null);
    const hiddenFileInputMultiple = useRef(null);
    const hiddenFileInputReplace = useRef(null);
    const hiddenFileInputInsertFront = useRef(null);
    const hiddenFileInputInsertBehind = useRef(null);
    const [mlogAddModalVisible, setMlogAddModalVisible] = React.useState<boolean>(false);
    const [maintenanceLogs, setMaintenanceLogs] = useState<MaintenanceLog[]>([]);
    useEffect(() => {
        pullAircraftLogs(4)
    }, [refresh]);
    const pullAircraftLogs = async(id: number) => {
        console.log(mlogLoading)
        const url = `https://api.boundlessflight.net/api/mlog/${id}`
        let response;
        try{
            response = await makeAuthCall(url, "GET", );
        }
        catch(e){
            window.confirm("There has been an issue getting saved maintenance logs. Perhaps you're not signed in?");
            setMlogLoading(false);
        }
        console.log(response);
        if(response.data.length != 0) {
            for(let i = 0; i < response.data.length; i++) {
                const url = `https://api.boundlessflight.net/api/mlog_files/${response.data[i].id}`
                let response2 = await makeAuthCall(url, "GET");

                const fileArray: FileObject[] = await Promise.all(response2.data.map((fileInfo) => {
                    return {
                        fileID: fileInfo.file_uid,
                        guiKey: fileInfo.gui_key,
                        mlogID: fileInfo.mlog_id,
                        name: fileInfo.title,
                        type: fileInfo.file_type,
                        preview: `https://api.boundlessflight.net/api/image/${fileInfo.file_uid}`
                    }
                }))
                setMaintenanceLogs((prevLogs) => {
                    const loadedMaintenenanceLog: MaintenanceLog = {
                        id: response.data[i].id,
                        name: response.data[i].name,
                        planeID: response.data.planeID,
                        files: fileArray
                    }
                    return[...prevLogs, loadedMaintenenanceLog]
                })
            }
        }
        else {
            console.log(maintenanceLogs.length);
        }
        setMlogLoading(false);
        console.log(mlogLoading);
    }
    const saveFiles = async() => {

    }
    const uploadFile = async(file: FileObject, blob: File) => {
        let b64;
        try {
            b64 = await toBase64(blob);
        }
        catch (e) {
            console.error("Error converting ot b64")
        }
        const data = {
            tail: props.id,
            hand_written: file.handwritten,
            type: file.type,
            blob: b64
        }
        //const response = await makeAuthCall("https://api.boundlessflight.net/api/file/upload", "POST", data)
    }
    const viewOCR = () => {
        window.location.href = "https://127.0.0.1:8000/ocrView/1"
    }
    const handleFileChangeMultiple = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            const newFiles: FileObject[] = Array.from(fileList).map((file) => {
                const fileType = file.type.startsWith("image") ? "image" : "pdf";
                const newFile: FileObject = {
                    guiKey: uuidv4(),
                    name: file.name,
                    mlogID: maintenanceLogs[selectedMaintenanceLogIndex].id,
                    type: fileType,
                    preview: URL.createObjectURL(file),
                }
                uploadFile(newFile, file);
                return (newFile);
            });

            setMaintenanceLogs((prevLogs) => {
                const updatedLogs = [...prevLogs];
                const selectedLog = updatedLogs[selectedMaintenanceLogIndex];
                // Append the new files to the files array of the selected maintenance log
                selectedLog.files = [...selectedLog.files, ...newFiles];
                return updatedLogs;
            });
        }
    };

    const handleFileReplace = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            const newFiles: FileObject[] = Array.from(fileList).map((file) => {
                const fileType = file.type.startsWith("image") ? "image" : "pdf";
                return {
                    guiKey: uuidv4(),
                    name: file.name,
                    mlogID: maintenanceLogs[selectedMaintenanceLogIndex].id,
                    type: fileType,
                    preview: URL.createObjectURL(file),
                };
            });

            setMaintenanceLogs((prevLogs) => {
                const selectedLog = maintenanceLogs[selectedMaintenanceLogIndex];
                if(selectedLog) {
                    const replacedLocation = selectedLog.files.findIndex(item => item.guiKey === keyToEdit)
                    if(replacedLocation >= 0 && replacedLocation <= selectedLog.files.length) {
                        const urlToRevoke = selectedLog.files[replacedLocation].preview;
                        selectedLog.files.splice(replacedLocation, 1, ...newFiles);
                        URL.revokeObjectURL(urlToRevoke);
                    }
                    else {
                        console.error("replacedLocation improper value, falsy?");
                    }
                    setKeyToEdit(null)
                    return[...prevLogs, selectedLog]

                }
            })
        }
    }
    const handleFileInsertFront = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            const newFiles: FileObject[] = Array.from(fileList).map((file) => {
                const fileType = file.type.startsWith("image") ? "image" : "pdf";
                return {
                    guiKey: uuidv4(),
                    name: file.name,
                    mlogID: maintenanceLogs[selectedMaintenanceLogIndex].id,
                    type: fileType,
                    preview: URL.createObjectURL(file),
                };
            });

            setMaintenanceLogs((prevLogs) => {
                const selectedLog = maintenanceLogs[selectedMaintenanceLogIndex];
                if(selectedLog) {
                    const replacedLocation = selectedLog.files.findIndex(item => item.guiKey === keyToEdit)
                    if(replacedLocation >= 0 && replacedLocation <= selectedLog.files.length) {
                        selectedLog.files.splice(replacedLocation + 1, 0, ...newFiles);
                    }
                    else {
                        console.error("replacedLocation improper value, falsy?");
                    }
                    setKeyToEdit(null)
                    return[...prevLogs, selectedLog]

                }
            })
        }
    }
    const handleFileInsertBehind = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            const newFiles: FileObject[] = Array.from(fileList).map((file) => {
                const fileType = file.type.startsWith("image") ? "image" : "pdf";
                return {
                    guiKey: uuidv4(),
                    name: file.name,
                    mlogID: maintenanceLogs[selectedMaintenanceLogIndex].id,
                    type: fileType,
                    preview: URL.createObjectURL(file),
                };
            });

            setMaintenanceLogs((prevLogs) => {
                const selectedLog = maintenanceLogs[selectedMaintenanceLogIndex];
                if(selectedLog) {
                    const replacedLocation = selectedLog.files.findIndex(item => item.guiKey === keyToEdit)
                    if(replacedLocation >= 0 && replacedLocation <= selectedLog.files.length) {
                        selectedLog.files.splice(replacedLocation, 0, ...newFiles);
                    }
                    else {
                        console.error("replacedLocation improper value, falsy?");
                    }
                    setKeyToEdit(null)
                    return[...prevLogs, selectedLog]

                }
            })
        }
    }
    function deleteFile(guiKey: string) {
        setMaintenanceLogs((prevLogs) => {
            const selectedLog = maintenanceLogs[selectedMaintenanceLogIndex];
            if(selectedLog) {
                const replacedLocation = selectedLog.files.findIndex(item => item.guiKey === guiKey)
                if(replacedLocation >= 0 && replacedLocation <= selectedLog.files.length) {
                    const urlToRevoke = selectedLog.files[replacedLocation].preview;
                    selectedLog.files.splice(replacedLocation, 1);
                    URL.revokeObjectURL(urlToRevoke);
                }

            }
            return [...prevLogs, selectedLog]
        })
    }
    function replaceFile(guiKey: string) {
        setKeyToEdit(guiKey);
        hiddenFileInputReplace.current.click();
    }
    function insertFilesFront(guiKey: string) {
        setKeyToEdit(guiKey);
        hiddenFileInputInsertFront.current.click();
    }
    function insertFilesBehind(guiKey: string) {
        setKeyToEdit(guiKey);
        hiddenFileInputInsertBehind.current.click();
    }

    function onChange(sourceId, sourceIndex, targetIndex, targetId) {
        setMaintenanceLogs((prevLogs) => {
            const selectedLog = maintenanceLogs[selectedMaintenanceLogIndex];
            if (selectedLog) {
                selectedLog.files = swap([...selectedLog.files], sourceIndex, targetIndex);
                console.log(selectedLog.files);
            }
            return [...prevLogs, selectedLog]; // Ensure a new reference for React state update
        });
    }
    async function saveNewMlog(newMlogData:NewMlogData) {
        console.log(newMlogData);
        const response = await makeAuthCall(`https://api.boundlessflight.net/api/mlog/create/${4}/${newMlogData.mlogName}`, "POST")
        if (response.status === 200) {
            successfulMlogAdd();
        }

    }
    function clickFileInput(){
        hiddenFileInputMultiple.current.click();
    };

    const goToPrevLog = () => {
        setSelectedMaintenanceLogIndex(prevIndex => (prevIndex === 0 ? maintenanceLogs.length - 1 : prevIndex - 1));
    };

    const goToNextLog = () => {
        setSelectedMaintenanceLogIndex(prevIndex => (prevIndex === maintenanceLogs.length - 1 ? 0 : prevIndex + 1));
    };
    function successfulMlogAdd() {
        console.log("Successfully added a new Maintenance Log!")
        closeModal();
        setRefresh(refresh + 1);
    }

    function errorMlogAdd() {
        alert("Error adding a new Maintenance Log. Please try again later.")
    }

    function closeModal() {
        setMlogAddModalVisible(false);

    }
    return (
        <>
        <Navbar pageTitle={"Plane Logs"} />
        <NavbarHelper />
        <div className="font-sans text-center bg-gray-200 rounded-2xl shadow-xl">
            <div className={"pt-4"}>
                <button className="inline" onClick={goToPrevLog}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
                    </svg>
                </button>
                <h1 className={"inline px-16 text-3xl"}>{(maintenanceLogs.length !=0) ? maintenanceLogs[selectedMaintenanceLogIndex].name : " "}</h1>
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
                    onChange={handleFileChangeMultiple}
                    ref={hiddenFileInputMultiple}
                    style={{display: 'none'}} // Make the file input element invisible
                />
                <input
                    type="file"
                    multiple
                    onChange={handleFileReplace}
                    ref={hiddenFileInputReplace}
                    style={{display: 'none'}} // Make the file input element invisible
                />
                <input
                    type="file"
                    multiple
                    onChange={handleFileInsertFront}
                    ref={hiddenFileInputInsertFront}
                    style={{display: 'none'}} // Make the file input element invisible
                />
                <input
                    type="file"
                    multiple
                    onChange={handleFileInsertBehind}
                    ref={hiddenFileInputInsertBehind}
                    style={{display: 'none'}} // Make the file input element invisible
                />
            </div>
            <GridContextProvider onChange={onChange}>
                <GridDropZone
                    id="items"
                    boxesPerRow={6}
                    rowHeight={250}
                    style={{height: 250 * Math.ceil(((maintenanceLogs.length) != 0) ? ((maintenanceLogs[selectedMaintenanceLogIndex].files.length + 1) / 6) : (1 / 6)) + 6}}
                >

                    {(maintenanceLogs.length != 0) ? (maintenanceLogs[selectedMaintenanceLogIndex].files.map((item) => (
                        <GridItem key={item.guiKey} className="cursor-grab bg-gray-200 rounded-2xl text-ellipsis border-2 border-white">
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%"
                                }}
                            >
                                <div className={"absolute top-0 right-0 p-1"}>
                                    {<Dropdown
                                            guiKey={item.guiKey}
                                            onViewOCR={viewOCR}
                                            onDelete={deleteFile}
                                            onReplace={replaceFile}
                                            onInsertFront={insertFilesFront}
                                            onInsertBehind={insertFilesBehind}
                                        />}
                                </div>
                                {item.type === "image" && item.preview && (
                                    <img
                                        className="rounded-2xl file-preview mx-auto text-center"
                                        draggable="false"
                                        src={item.preview}
                                        alt={item.name}
                                    />
                                )}
                                {item.type === "pdf" && item.preview && (
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         version="1.1" id="Icons" viewBox="0 0 32 32" xmlSpace="preserve" className={"file-preview mx-auto"}>
                                        <path
                                            d="M1.4,30l5.4-5.5l1.7,2.1c0.4,0.5,1.2,0.5,1.6,0l0.5-0.6l4.1,4H1.4z M16,28.6l-4.9-4.8c-0.2-0.2-0.5-0.3-0.8-0.3  c-0.3,0-0.5,0.2-0.7,0.4l-0.4,0.5l-1.6-2C7.4,22.2,7.1,22,6.8,22c-0.3,0-0.6,0.1-0.8,0.3L0,28.5V19c0-0.6,0.4-1,1-1h14  c0.6,0,1,0.4,1,1V28.6z"/>
                                        <path
                                            d="M29,8h-8.9l-2.3-3.5C17.7,4.2,17.3,4,17,4H7C5.3,4,4,5.3,4,7v9h11c1.7,0,3,1.3,3,3v9h11c1.7,0,3-1.3,3-3V11  C32,9.3,30.7,8,29,8z M30,23.6L21.4,10H29c0.6,0,1,0.4,1,1V23.6z"/>
                                    </svg>
                                )}
                                <h1 className="p-1 mx-auto" style={{
                                    maxWidth: "100%",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}>{item.name}</h1>
                            </div>
                        </GridItem>
                    ))) : null}
                </GridDropZone>
            </GridContextProvider>
        </div>
            {(((mlogAddModalVisible || ((maintenanceLogs.length == 0) && !mlogLoading)))) ? (
                <AddMlogModal closeModal={closeModal} savePlane={saveNewMlog}/>
            ) : null}
        </>
    );
}
