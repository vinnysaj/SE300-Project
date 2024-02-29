import React, {ReactElement} from 'react';

export default function (properties: DashboardGridElementProps):ReactElement {
    return (
        <div className="col-span-1 w-full flex-grow">
            <a className="bg-gray-50 px-1 pt-1 pb-1 drop-shadow-lg shadow-lg rounded-2xl flex flex-col items-center transition-transform hover:scale-102 duration-300 ease-in-out cursor-pointer"
               href={"dashboard/plane/add"}>
                <div className={"h-32 w-full rounded-xl bg-gray-200"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="w-full h-full">
                        <path
                            d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25ZM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6ZM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5Z"/>
                    </svg>
                </div>
                <div className="text-center text-lg mt-1 drop-shadow-xl">{properties.addText}</div>
            </a>
        </div>
    )
        ;
};

interface DashboardGridElementProps {
    addText: string
}