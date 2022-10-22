import React, {Component, useEffect} from "react";
import axios from "axios";
import {json} from "react-router-dom";


class Dictionary extends React.Component{


    initialState = {
        word : document.getElementById("word").value,
        jsonWord :
            {
               word : "",
               meanings : [],
               type : []
            }
    }

    state = this.initialState

    componentDidMount() {
        console.log(this.state.word.split('/').join('%2'))
        axios.get("http://localhost:8000/getMeanings/" + this.state.word.split('/').join('%2')).then((res) => {this.setState({jsonWord : res.data})})

    }

    render() {

        return(
            <div>
                <h1> {this.state.word} </h1>
                <div>
                    {this.parseMeanings().map(this.printMeanings)}
                </div>
            </div>
        );
    }

    parseMeanings(){
        let out = []
        for (let i = 0; i < this.state.jsonWord.meanings.length; i++) {
            out.push([this.state.jsonWord.meanings[i] , this.state.jsonWord.type[i]])
        }
        return out
    }

    printMeanings(lst){
        let errorOut = ["Word does not Exist" , "Error"]
        if(JSON.stringify(lst) === JSON.stringify(errorOut)){
            console.log("Wrong")
            return (
                <div>
                    <p> Word not Found in Dictionary </p>
                </div>
            )
        }

        return(
            <div>
                <p> Meaning : {lst[0]}</p>
                <small> Speech type : {lst[1]}</small>
            </div>
        )
    }


}

export default Dictionary