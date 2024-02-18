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
    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/space-mission-data.json') // Fetch data from server
            .then(result => result.json()) // Convert to JSON
            .then(rowData => setRowData(rowData)); // Update state of `rowData`
    }, [])
    const [rowData, setRowData] = useState([])
    const [colDefs, setColDefs] = useState([
        { field: "mission",
            cellEditor: 'agLargeTextCellEditor',
            cellEditorPopup: true, },
        { field: "company" },
        { field: "location" },
        { field: "date" },
        { field: "price" },
        { field: "successful" },
        { field: "rocket" }
    ]);
    function printData() {
        console.log(rowData);
    }
    return(
        <div className="flex-1 ag-theme-quartz" style={{ height: screen.height }}>
            <AgGridReact
                columnDefs={colDefs}
                rowData={rowData}
                defaultColDef={defaultColDef}
                onCellValueChanged={printData}
                pagination={true}
            />
        </div>
    );
}