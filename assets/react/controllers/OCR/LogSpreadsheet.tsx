import Spreadsheet from "react-spreadsheet";
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import {useEffect, useMemo, useState} from "react";
import React from "react";
export default function LogSpreadsheet() {
    const defaultColDef = useMemo(() => ({
        editable: true, // Enable editing on all cells
    }),[])
    const [rowData, setRowData] = useState([])
    const [colDefs, setColDefs] = useState([
        { field: "Date"},
        { field: "Time in service" },
        { field: "Time since overhaul" },
        { field: "Tach time" },
        { field: "Description",
            cellEditor: 'agLargeTextCellEditor',
            cellEditorPopup: true, },
    ]);
    function addRow() {
        const item: rowDataInterface = {
            date: null,
            timeInService: null,
            timeSinceOverhaul: null,
            tachTime: null,
            description: null
        }
        setRowData((prevRowData) => [...prevRowData, item]);
    }
    function printData() {
        console.log(rowData);
    }
    return(
        <div className="flex-1 ag-theme-quartz max-h-max overflow-hidden" style={{ height: screen.height }}>
            <AgGridReact
                columnDefs={colDefs}
                rowData={rowData}
                defaultColDef={defaultColDef}
                onCellValueChanged={printData}
            />
        </div>
    );
}
export interface rowDataInterface {
    date: string | null,
    timeInService: number | null,
    timeSinceOverhaul: number | null,
    tachTime: number | null,
    description: string | null,
}