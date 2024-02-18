import React, {ReactElement, useState} from 'react';

export default function (properties: NavbarProps):ReactElement {
    const [redirect, setRedirect] = useState("");
    const getRedirect = () => {
        console.log("Here");
        if(window.location.pathname == "/home") {
            return("#");
        }
        return("/home")
    }
    return (
        <div className="w-full h-12 rounded-b-lg fixed bg-black backdrop-blur-xl opacity-80 z-50">
            <div className="flex items-center justify-between h-full">
                <div className="ml-4">
                    <div className="text-xl text-gray-200">
                        <a
                            href={getRedirect()}>
                            <span className="font-bold text-white">BoundlessFlight</span>
                        </a>
                        <span className="mx-2">//</span>
                        <span>{properties.pageTitle}</span>
                    </div>
                </div>
                <div className="mr-4">
                    <div className="text-xl text-white">User</div>
                </div>
            </div>
        </div>
    );
};

interface NavbarProps {
    pageTitle: string
}