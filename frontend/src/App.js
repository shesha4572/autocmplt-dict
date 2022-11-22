import './App.css';
import {Route , Routes} from "react-router-dom";
import Form from "./Form";
import Dictionary from "./Dictionary"
import PrivateRoute from "./PrivateRoute"
import React from "react";

function App() {
    return(
        <Routes>
            <Route exact path = "/" element = {<Form/>}/>
            <Route path = "/:getMeaning" element = {<Dictionary/>}/>
        </Routes>

    )
}



export default App;
