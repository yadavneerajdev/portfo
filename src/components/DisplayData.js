import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./Display.css"


const DisplayData = ({ effect, setEffect }) => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("")

    useEffect(() => {
        axios.get('http://localhost:5000/api/data')
            .then(response => {
                setData(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [effect]);


    const makeArchived = (id, value) => {
        axios.put(`http://localhost:5000/api/update`, { id: id, archive: (value ? '1' : '0') });
        setEffect(e => { return parseInt(e + 1) })

    }

    const removeItem = (e) => {
        console.log(e)
        axios.delete('http://localhost:5000/api/delete', {
            data: {
                id: e // Replace with the actual ID of the student you want to delete
            }
        })
            .then(response => {
                console.log(response.data); // Logs the success message from the server
                setEffect(e => { return parseInt(e + 1) })

            })
            .catch(error => {
                console.error(error); // Logs any errors that occur during the request
            });
    }

    return (<div className='wrapper-cards' style={{ textAlign: "center" }}>
        <h2>Keep Notes <span>( {data.length}    )</span></h2>
        <input type="text" placeholder='search by tag or title' value={filter} onChange={(e) => setFilter(e.target.value)} />
        <br />
        <span>{(filter !== "") ? `Results for  "${filter}"` : "All"}</span>
        <div className='cards'>
            <div>
                <span>Archived : {data.filter(e => { return e.archived }).length}</span>
                {data.filter(elem => {
                    return elem.archived
                }).map((elem, title) => {
                    return <div key={title}>
                        <h3>{elem.title}</h3>
                        <label>Achive :<input type="checkbox" onChange={(e) => makeArchived(elem.id, e.target.checked)} checked={elem.archived} className='archive' /></label>
                        <p className='parabody'>{elem.lbody}</p>
                        <p className='tag'>Tags</p>
                        <p className='labels-dis'>{elem.labels.split(" ").map((e, index) => {
                            return <span onClick={(e) => setFilter(e.target.innerText)} key={index}> {e}</span>
                        })}</p>
                        <button className='remove' onClick={(e) => removeItem(elem.id)}>Remove From List</button>

                    </div>
                })
                }
            </div>
            <div>
                <span>{data.filter(e => { return !e.archived }).length}</span>

                {data.filter(elem => {
                    return elem.labels.split(" ").find(e => {
                        return (e.toLowerCase().includes(filter.toLowerCase()) || elem.title.toLowerCase().includes(filter.toLowerCase()))
                    })
                }).filter(elem => {
                    return !elem.archived
                })
                    .map((elem, index) => {
                        return <div key={index}>
                            <h3>{elem.title}</h3>
                            <label>Achive :<input type="checkbox" onChange={(e) => makeArchived(elem.id, e.target.checked)} checked={elem.archived} className='archive' /></label>
                            <p className='parabody'>{elem.lbody}</p>
                            <p className='tag'>Tags</p>
                            <p className='labels-dis'>{elem.labels.split(" ").map((e, index) => {
                                return <span onClick={(e) => setFilter(e.target.innerText)} key={index}> {e}</span>
                            })}</p>
                            <button className='remove' onClick={(e) => removeItem(elem.id)}>Remove From List</button>
                        </div>
                    })}
            </div>
        </div>
    </div>
    );
}

export default DisplayData;
