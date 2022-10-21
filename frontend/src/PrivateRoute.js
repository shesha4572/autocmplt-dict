import React from "react";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children}) => {
    let word = ""
   try {
       word = document.getElementById("word").value
   }
   catch (e){
        word = null
   }

    return word ? children : <Navigate to= "/"/>
}

export default PrivateRoute