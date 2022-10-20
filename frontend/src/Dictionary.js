import React, {Component, useEffect} from "react";
import axios from "axios";


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
        axios.get("http://localhost:8000/getMeanings/" + this.state.word).then((res) => {this.setState({jsonWord : res.data})})

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
        console.log(this.state.jsonWord.meanings)
        console.log(this.state.jsonWord.type)
        let out = []
        for (let i = 0; i < this.state.jsonWord.meanings.length; i++) {
            out.push([this.state.jsonWord.meanings[i] , this.state.jsonWord.type[i]])
        }
        return out
    }

    printMeanings(lst){
        return(
            <div>
                <p> Meaning : {lst[0]}</p>
                <small> Speech type : {lst[1]}</small>
            </div>
        )
    }


}

export default Dictionary