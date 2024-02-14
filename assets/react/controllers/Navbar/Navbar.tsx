import React, {ReactElement} from 'react';

export default function (properties: NavbarProps):ReactElement {
    return (
        <div className="w-full h-12 rounded-b-lg fixed bg-black backdrop-blur-xl opacity-80 z-50">
            <div className="flex items-center justify-between h-full">
                <div className="ml-4">
                    <div className="text-xl text-gray-200">
                        <span className="font-bold text-white">BoundlessFlight</span>
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