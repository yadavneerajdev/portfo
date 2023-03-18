import React, { useState } from 'react';
import axios from 'axios';
import "./List.css"

const FormComponent = ({ effect }) => {
    const [title, setTitle] = useState('');
    const [lbody, setLbody] = useState('');
    const [lable, setLable] = useState([]);
    const [lables, setLables] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        let str = lable.join(' ');
        axios.post('http://localhost:5000/api/post', { title, lbody, str })
            .then(response => console.log(response))
            .catch(error => console.log(error));
        effect(e => { return parseInt(e + 1) })

    };

    const getLabels = (e) => {
        if (e.slice(-1) === "") {
            setLables("")
            return
        };
        if (e.slice(-1) === ",") {
            let lble = e.slice(0, e.length - 1)
            setLable([...lable, lble])
            console.log(lable)
            setLables("")
            return
        }
        setLables(e)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add Item</h3>
            <label htmlFor='title'>
                Title:
            </label>
            <input type="text" id='title' value={title} onChange={event => setTitle(event.target.value)} />
            <label htmlFor='lbody'>
                Body :
            </label>
            <textarea cols={10} rows={5} type="text" id='lbody' value={lbody} onChange={event => setLbody(event.target.value)} />
            <label htmlFor='lables'>
                Lables:
            </label>
            <div className="lables">
                <div>
                    {lable.map((elem, index) => {
                        return <span key={index} style={{ background: "#fff", borderRadius: "3px", margin: "0.1em", padding: "0.2em" }}>{elem}</span>
                    })}
                </div>
                <input type="text" id='lables' placeholder="add lables (',') new label" value={lables} onChange={event => getLabels(event.target.value)} />
            </div>

            <button type="submit">Submit</button>
        </form>
    )
}

export default FormComponent
