import './App.css';
import {Route , Routes} from "react-router-dom";
import Form from "./Form";
import Dictionary from "./Dictionary"
import React from "react";

function App() {
    let initialState = {
        isFormFilled : false
    }
    return(
        <Routes>
            <Route exact path = "/" element = {<Form/>}> </Route>
                <Route exact path = "/:getMeaning" element = {<Dictionary/>}> </Route>
        </Routes>
    )
}



export default App;
