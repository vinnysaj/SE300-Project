import React, {ReactElement, useLayoutEffect, useState} from 'react';
import ProfileMenu from './ProfileMenu';
import {render} from "react-dom";

export default function (properties: NavbarProps):ReactElement {
    const [homeEnabled, setHomeEnabled] = React.useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    useLayoutEffect(() => {
        if (window.location.pathname === "/" || window.location.pathname === "/home") {
            setHomeEnabled(false);
        }
    }, []);

    const renderRoutes = () => {
        return routes.map((route, index) => {
            const isCurrentRoute = (route.path === '/home' && (location.pathname === '/home' || location.pathname === '/')) ||  route.path === location.pathname;
            if (isCurrentRoute) {
                return <span key={route.path} className={`${index !== 0 ? 'ml-4' : ''} opacity-70 cursor-default`}>{route.title}</span>;
            }
            return <a key={route.path} href={route.path} className={`underline ${index !== 0 ? 'ml-4' : ''}`}>{route.title}</a>;
        });
    }

    const routes = [
        { title: 'Home', path: '/home' },
        { title: 'About', path: '/about' },
        { title: 'Dashboard', path: '/dashboard' },
        { title: 'Login', path: 'https://auth.boundlessflight.net' },
        { title: 'Sign Up', path: 'https://auth.boundlessflight.net' }
    ];

    return (
        <div className="w-full md:h-12 h-16 rounded-b-lg fixed bg-black backdrop-blur-xl opacity-80 z-50 text-white">
            <div className="flex items-center h-full">
                <div className="ml-4 flex-1" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <div className="text-gray-200">
                        <span className={"md:text-xl text-md"}>
                            {homeEnabled ? (
                                <a href="/">
                                    <span className="font-bold">BoundlessFlight</span>
                                </a>
                            ) : (
                                <span className="font-bold">BoundlessFlight</span>
                            )}
                            <span className="mx-2">//</span>
                            <span>{properties.pageTitle}</span>
                        </span>
                        <span className={"hidden md:inline-block text-xl"}>
                            <span className={`slide-hover ${isHovered ? "hovered" : ""}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="-mt-0.5 w-6 h-6 inline-block">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                </svg>
                            </span>
                            <span className={`ml-4 font-light md:slide-fade-hover ${isHovered ? "hovered" : ""}`}>
                                {renderRoutes()}
                            </span>
                        </span>
                        <div className={"text-sm md:hidden"}>
                            {renderRoutes()}
                        </div>



                    </div>
                </div>
                <div className="mr-4">
                    <ProfileMenu dropdownName={"User"}/>
                </div>
            </div>
        </div>
    );
};

interface NavbarProps {
    pageTitle: string
}