import React, {useEffect, useState} from "react";
import { Progress } from "@material-tailwind/react";
import {makeAuthCall} from "../AuthManager/AuthManager";

export default function Queue(props: {listItems: Blob[] | null, setListItems: React.Dispatch<React.SetStateAction<Blob[]>>}) {
    const [listItemsHTML, setListItemsHTML] = useState<React.JSX.Element[] | null>(null)
    const [isSending, setIsSending] = useState<boolean>(false)
    const [numQueueItems, setNumQueueItems] = useState(0)
    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };
    const sendDataToServer = async (data) => {
        try {
            // Simulate sending data to the server
            console.log("Sending data to server:", data);
            const newData = {
                "blob": "TEST BLOB",
                "handwritten": "True"
            }
            console.log(newData);
            // Replace this with your actual server call
            let url = "https://api.boundlessflight.net/api/ocr"
            let response = await makeAuthCall(url, "POST", newData);
            console.log("Data sent successfully!");
            console.log(response);
        } catch (error) {
            console.error("Error sending data to server:", error);
        }
    };
    useEffect(() => {
        const list = props.listItems.map((queueElement) => (
                <li>
                    <h1 className="text-gray-600 font-semibold">
                        {"Item " + numQueueItems}
                    </h1>
                </li>
            )
        )
        setListItemsHTML(list);
    }, [props.listItems])
    useEffect(() => {
        // Check if there are items in the queue and if we are not currently sending data
        if (props.listItems.length > 0 && !isSending) {
            // Set isSending to true to prevent sending data simultaneously
            setIsSending(true);
            const dataToSend = props.listItems[0]; // Get the first item in the queue
            sendDataToServer(dataToSend)
                .then(() => {
                    // If data is sent successfully, remove the sent item from the queue
                    props.setListItems((prevQueue) => prevQueue.slice(1));
                })
                .catch((error) => {
                    console.error("Error sending data:", error);
                })
                .finally(() => {
                    // After sending data, reset isSending flag
                    setIsSending(false);
                });
        }
    }, [props.listItems, isSending]);
    return (
        <div className={"w-24 h-max border-gray-200 ring-gray-200 ring-1"}>
            <ul>
                {listItemsHTML}
            </ul>
        </div>
    );
}
