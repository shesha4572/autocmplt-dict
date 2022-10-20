import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {Button} from "react-bootstrap";

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
        const link = "/:getMeaning/"
        return(
            <form>
                <label htmlFor="word"> Enter Word </label>
                <input type= "word" list = "suggestions" name = "word" id = "word" onChange={this
                    .handleChange} autoComplete={"off"}/>
                <Link to={link}>
                <Button className= "search-button" id = "search-button" > Search </Button>
                </Link>
                <datalist id = "suggestions" onClick={this.searchWord}> {this.state.autoFillList.map(this.showSuggestions)}</datalist>
            </form>
        );
    }

    GetAutoFillSuggestions(word) {
        var count = 0
        axios.get("http://localhost:8000/searchPrefix/" + word).then((res) => this.setState({autoFillList : res.data}))
    }

    showSuggestions(item) {
        return <option key = {item.word}  value={item.word} />
    }
}


export default Form;