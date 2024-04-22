import React, {useEffect, useState} from "react"
import {FileObject} from "../FileUpload/FileUpload";



export default function FileView() {
    const [file, setFile] = useState<FileObject | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        //pull file id
        console.log(loading);
        const newFileObject: FileObject  = {
            guiKey: "4",
            name: "FILE",
            mlogID: 4,
            type: "image",
            preview: "https://picsum.photos/id/258/700"
        }
        setFile(newFileObject);
        setLoading(false)
        console.log(loading);
    }, []);


    return(
        <>
            <div className={"container min-h-full drop-shadow-2xl w-1/2 p-2"}>
            {!loading ? (
            <div className={"overflow-hidden"}>
                {file.type === "image" && file.preview && (
                    <img
                        className="rounded-2xl m-auto w-full flex text-center p-2"
                        draggable="false"
                        src={file.preview}
                        alt={file.name}
                    />
                )}
                {file.type === "pdf" && file.preview && (
                    <iframe
                        src={file.preview}>

                    </iframe>
                )}
            </div>
            ) : (
                <p>Loading...</p>
            )

            }
            </div>
        </>
    )
}
