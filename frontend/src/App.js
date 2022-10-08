import './App.css';
import axios from "axios";
import {useState , useEffect} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import {Button} from "react-bootstrap";

function App() {

  const [word , setWord] = useState([{}])
  useEffect(() => {axios.get("http://localhost:8000/getMeanings/computer").then((res) => setWord(res.data))} , [])
  console.log(word)
  return(
      <div>
         {word.word} {}
          {word.meanings} {}
          {word.type}

      </div>
  )

}

export default App;
