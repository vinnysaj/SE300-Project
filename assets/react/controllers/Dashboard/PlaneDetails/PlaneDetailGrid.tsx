import React, {ReactElement, useEffect, useState} from 'react';
import {PlaneDataDetailed} from "./PlaneDetails";
import MainInfoComponent from "./GridComponents/MainInfoComponent";

const PlaneDetailGrid: React.FC<PlaneDetailGridProps> = (props) => {

    return (
        <div className={"grid grid-cols-3 gap-4 mt-4"}>
            <MainInfoComponent planeDataDetailed={props.planeDataDetailed} />
        </div>
    );
};

export interface PlaneDetailGridProps {
    planeDataDetailed: PlaneDataDetailed;
}

export default PlaneDetailGrid;