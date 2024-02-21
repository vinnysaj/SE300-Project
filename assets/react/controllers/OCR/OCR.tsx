import React, {useEffect, useRef, useState} from 'react';
import { useInView } from 'react-intersection-observer';
import Navbar from "../Navbar/Navbar";
import NavbarHelper from "../Navbar/NavbarHelper";
import Cropper from "./Cropper";
import LogSpreadsheet from "./LogSpreadsheet";


function OCR(){


    return (
        <div className={"flex"}>
            <Cropper/>
            <LogSpreadsheet/>
        </div>
    );
};

export default OCR;

