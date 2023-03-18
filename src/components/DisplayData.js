import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Display.css"


const DisplayData = ({ effect }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/data')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [effect]);

    return (<div>
        <div className='cards'>
            {data.map((elem, index) => {
                return <div key={index}>
                    <h3>{elem.title}</h3>
                    <p className='parabody'>{elem.lbody}</p>
                    <p className='tag'>Tags</p>
                    <p className='labels-dis'>{elem.labels.split(" ").map((e, index) => {
                        return <span key={index}> {e}</span>
                    })}</p>
                </div>
            })}
        </div>
    </div>
    );
}

export default DisplayData;
