import React, {Component, useState} from "react";

import axios from "axios";

class Form extends Component{
    initialState = {
        word : "",
        autoFillList : [{
            word: "",
            meanings : [],
            type : []
        }]
    }
    
    state = this.initialState

    handleChange = (event) => {
        this.state = this.initialState
        const {value} = event.target

        this.setState({
                word : value
            }
        )

        this.GetAutoFillSuggestions(value)

    }

    render() {
        const count = 0
        return(
            <form>
                <label htmlFor="word"> Enter Word </label>
                <input type= "word" list = "suggestions" name = "word" id = "word" onChange={this
                    .handleChange} autoComplete={"off"}/>
                <datalist id = "suggestions"> {this.state.autoFillList.map(this.showSuggestions)}</datalist>
            </form>
        );
    }

    GetAutoFillSuggestions(word) {
        var count = 0
        axios.get("http://localhost:8000/searchPrefix/" + word).then((res) => this.setState({autoFillList : res.data}))
    }

    showSuggestions(item) {
        return <option key = {item.word}  value={item.word}/>
    }
}


export default Form;