import React, {ReactElement} from 'react';

export default function (properties: NavbarProps):ReactElement {
    return (
        <div className="w-full h-12 rounded-b-lg fixed bg-black backdrop-blur-xl opacity-80">
            <div className="flex items-center justify-between h-full">
                <div className="ml-4">
                    <div className="text-xl text-white"><span
                        className={"font-bold"}>BoundlessFlight</span> // {properties.pageTitle}</div>
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