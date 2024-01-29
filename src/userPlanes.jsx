import React, { useState, useEffect } from 'react';
export default function UserPlanes() {
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async() => {
        try {
            const response = await fetch(new Request("http://10.6.0.1:6969/getPlanes"), {
                method: "POST",
                headers: new Headers({
                    user_id: "106128017282493053284"
                })
            })
            const data = await response.json();
            return data;
        }
        catch(error) {
            console.log(error);
        }
        
    }
    const listifyData = (data) => {
        console.log(data);
        setData(data);
        /*setData(data.map((data) =>
                <li>
                    <h1>
                    {data ?  data.id + " " + data.tailNum + " " + data.make + " " + data.model : <div>Unavailable</div>}
                    </h1>
                </li>
                )
            );*/
        setLoading(false);
    } 

    useEffect(() => {
        fetchData();
    }, [])

    if(loading) {
        return(
            <div>
                Loading...
            </div>
        )
    }
    return(
        <div>
            <ul>
                {data}
            </ul>
            
        </div>
    )


}