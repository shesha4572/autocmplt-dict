import './App.css';
import axios from "axios";
import {useState , useEffect} from "react";
import Dropdown from 'react-bootstrap/Dropdown';

function App() {
  const [hello , setHello] = useState([{}])
  useEffect(() => {axios.get("http://localhost:8000/tries").then((res) => setHello(res.data))} , [])
    return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu align={100}>
      {hello.map((data) => (
        <li key={data.word}>
          <p>{data.word}</p>
        </li>
      ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default App;
