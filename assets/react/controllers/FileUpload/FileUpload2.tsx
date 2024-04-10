import {useRef, useState} from "react";
import Dropdown from "./Dropdown";
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap,
} from "react-grid-dnd";
import {FileObject} from "./FileUpload";
import React from "react";
import Navbar from "../Navbar/Navbar";
import NavbarHelper from "../Navbar/NavbarHelper";
import { v4 as uuidv4 } from 'uuid';
import "./FileObj.css";
export default function FileUpload2() {
    const[files, setFiles] = useState<FileObject[]>([])
    const hiddenFileInput = useRef(null);
    function onChange(
        sourceId: string,
        sourceIndex: number,
        targetIndex: number
    ) {
        const nextState = swap(files, sourceIndex, targetIndex);
        setFiles(nextState);
    }
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            const newFiles: FileObject[] = Array.from(fileList).map((file) => ({
                guiKey: uuidv4(),
                name: file.name,
                preview: URL.createObjectURL(file), // Use URL.createObjectURL to generate a preview URL for the file
            }));
            setFiles((prevFiles) => {
                // Append the new files to the files array of the selected maintenance log
                return([...prevFiles, ...newFiles]);
            });
        }
    };
    function clickFileInput(){
        hiddenFileInput.current.click();
    }
    return (
        <>
            <Navbar pageTitle={"Plane Dashboard"}/>
            <NavbarHelper/>
            <div className="font-sans text-center bg-gray-200 rounded-2xl shadow-xl">
                <div className={"pt-4"}>
                    <h1 className={"inline px-16 text-3xl"}>{"1"}</h1>
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
                        boxesPerRow={4}
                        rowHeight={280}
                        style={{height: 280 * Math.ceil(files.length / 4)}}
                    >
                        {files.map((item) => (
                            <GridItem className={"cursor-grab bg-gray-200 rounded-2xl border-2 border-white"} key={item.guiKey}>
                                <>
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
                                </>
                            </GridItem>
                        ))}
                    </GridDropZone>
                </GridContextProvider>
            </div>
        </>
    );
}