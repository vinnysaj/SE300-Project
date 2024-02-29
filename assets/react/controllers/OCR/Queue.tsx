import React, {useEffect, useState} from "react";
import { Progress } from "@material-tailwind/react";

export default function Queue(props: {listItems: string[] | null}) {
    const [listItems, setListItems] = useState<React.JSX.Element[] | null>(null)
    useEffect(() => {
        const list = props.listItems.map((queueElement) => (
                <li>
                    <h1 className="text-gray-600 font-semibold">
                        {queueElement ? queueElement : "Unnamed"}
                    </h1>
                </li>
            )
        )
        setListItems(list);
    }, [props.listItems])
    return (
        <div className={"w-24 h-max border-gray-200 ring-gray-200 ring-1"}>
            <ul>
                {listItems}
            </ul>
        </div>
    );
}
