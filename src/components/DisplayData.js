import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Display.css"


const DisplayData = ({ effect }) => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("")

    useEffect(() => {
        axios.get('http://localhost:5000/api/data')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [effect]);

    return (<div className='wrapper-cards' style={{ textAlign: "center" }}>
        <h2>Keep Notes</h2>
        <input type="text" placeholder='search by tag or title' value={filter} onChange={(e) => setFilter(e.target.value)} />
        <br />
        <span>{(filter !== "") ? `Results for  "${filter}"` : "All"}</span>
        <div className='cards'>
            {data.filter(elem => {
                return elem.labels.split(" ").find(e => {
                    return e.toLowerCase().includes(filter.toLowerCase())
                }) || elem.title.toLowerCase().includes(filter.toLowerCase())
            })
                .map((elem, index) => {
                    return <div key={index}>
                        <h3>{elem.title}</h3>
                        <p className='parabody'>{elem.lbody}</p>
                        <p className='tag'>Tags</p>
                        <p className='labels-dis'>{elem.labels.split(" ").map((e, index) => {
                            return <span onClick={(e) => setFilter(e.target.innerText)} key={index}> {e}</span>
                        })}</p>
                    </div>
                })}
        </div>
    </div>
    );
}

export default DisplayData;
