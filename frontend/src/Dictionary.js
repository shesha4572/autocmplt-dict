import React, {Component, useEffect} from "react";
import axios from "axios";


class Dictionary extends React.Component{


    initialState = {
        word : "",
        jsonWord :
            {
               word : "",
               meanings : [],
               type : []
            }
    }

    state = this.initialState

    componentDidMount() {
        this.setState({word : this.props.word})
        console.log(this.props.word.split('/').join('%2'))
        axios.get("http://localhost:8000/getMeanings/" + this.props.word.split('/').join('%2')).then((res) => {this.setState({jsonWord : res.data})})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.word !== prevProps.word){
            this.setState({word : this.props.word})
            console.log(this.props.word.split('/').join('%2'))
            axios.get("http://localhost:8000/getMeanings/" + this.props.word.split('/').join('%2')).then((res) => {this.setState({jsonWord : res.data})})
        }
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