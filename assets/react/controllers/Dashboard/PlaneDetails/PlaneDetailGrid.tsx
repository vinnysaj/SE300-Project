import React, {ReactElement, useEffect, useState} from 'react';
import {PlaneDataDetailed} from "./PlaneDetails";
import MainInfoComponent from "./GridComponents/MainInfoComponent";
import AddDocumentComponent from "./GridComponents/AddDocumentComponent";

const PlaneDetailGrid: React.FC<PlaneDetailGridProps> = (props) => {

    return (
        <div className={"grid grid-cols-12 gap-3 mt-4"}>
            <MainInfoComponent planeDataDetailed={props.planeDataDetailed} />
            <AddDocumentComponent planeDataDetailed={props.planeDataDetailed} addText={"Add a new document"} addDocClicked={props.addDocClicked} />
        </div>
    );
};

export interface PlaneDetailGridProps {
    planeDataDetailed: PlaneDataDetailed;
    addDocClicked: (arg0: PlaneDataDetailed) => void;
}

export default PlaneDetailGrid;