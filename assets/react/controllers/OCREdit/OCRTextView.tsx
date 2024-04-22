import React, {useEffect, useState} from "react";
import { textarea } from "@material-tailwind/react";
export default function OCRTextView(props: {fileID: string}) {
    const [textBoxData, setTextBoxData] = useState('');
    useEffect(() => {
        //pull OCRed data from fileID
        setTextBoxData('Hello Brother!');
    }, []);

    const handleTextBoxChange = (event) => {
        setTextBoxData(event.target.value);
    };
    return (
        <>
            <div
                className="container h-full w-1/2 p-2 flex flex-1">
                <textarea
                    className="flex-grow p-2 m-2 w-1/2 h-[750px] resize-none rounded-lg"
                    value={textBoxData}
                    onChange={handleTextBoxChange}
                    placeholder=""
                ></textarea>
            </div>
        </>
    )
}
