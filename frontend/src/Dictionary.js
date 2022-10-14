import React , {Component} from "react";
import axios from "axios";


class Dictionary extends React.Component{

    initialState = {
        word : document.getElementById("word").value,
        jsonWord : axios.get("http://localhost:8000/getMeanings/" + document.getElementById("word").value).then((res) => this.setState({jsonWord : res.data}))
    }

    state = this.initialState

    render() {
        return(
            <div>
                <h1> {this.state.word} </h1>
                <p>
                    {this.state.jsonWord.word} {this.state.jsonWord.meanings}
                </p>
            </div>
        );
    }


}

export default Dictionary