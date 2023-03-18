import './App.css';
import FormComponent from './components/AddList';
import DisplayData from './components/DisplayData';
import { useState } from 'react';


function App() {

  const [effect, setEffect] = useState(0);

  return (
    <div className="App">
      <FormComponent effect={(e) => setEffect(e)} />
      <DisplayData effect={effect} />
    </div>
  );
}

export default App;
