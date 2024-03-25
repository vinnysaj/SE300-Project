import React, {useEffect, useRef, useState} from 'react';
import { useInView } from 'react-intersection-observer';
import Navbar from "../Navbar/Navbar";
import NavbarHelper from "../Navbar/NavbarHelper";
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min.js';


const Home: React.FC = () => {

    const cloudRef = useRef(null);
    const [vantaEffect, setVantaEffect] = React.useState(null);

    useEffect(() => {
        if (!cloudRef.current) return;

        setVantaEffect(CLOUDS({
            el: cloudRef.current,
            THREE: THREE,
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            //texturePath: "images/noise.png"
        }));

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    return (
        <div className="h-full w-full">
            <Navbar pageTitle={"Home"}/>
            <div className="h-screen w-screen -z-10 fixed" ref={cloudRef}></div>
            <div className="h-screen w-screen">
                <div className="flex flex-col items-center justify-center h-full w-full text-white">
                    <div className="text-4xl md:text-6xl lg:text-8xl font-bold">BoundlessFlight</div>
                    <div className="text-xl md:text-2xl lg:text-4xl font-medium text-gray-200 mt-1">The ultimate aircraft maintenance tracker</div>
                    <a href="dashboard" id="dash-button"
                       className="mt-4 px-4 py-2 bg-white text-gray-600 text-lg rounded-full shadow-md hover:bg-gray-100 hover:scale-110 transition-all cursor-pointer">
                        <span className="inline">Get Started</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-5 h-5 inline-block -mt-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
                        </svg>
                    </a>
                </div>
            </div>
            <div className="h-screen w-screen bg-white bg-opacity-10 backdrop-blur-md">
                <div className="flex flex-col items-center justify-center h-full w-full text-white">
                    <div className="text-8xl font-bold">BoundlessFlight</div>
                    <div className="text-4xl font-medium text-gray-200">The ultimate aircraft maintenance tracker</div>
                </div>
            </div>
        </div>
    );
};

export default Home;

