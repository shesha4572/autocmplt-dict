import React, {Component} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from "axios";
import {Button} from "react-bootstrap";

class Form extends Component{
    initialState = {
        word : "",
        autoFillList : [{
            word: "",
            meanings : [],
            type : []
        }],
        linkMeaning : "/:getMeaning/"
    }
    
    state = this.initialState

    handleChange = (event) => {
        if(event.key === "Enter"){
            console.log("Enter pressed")
            event.preventDefault()
            document.getElementById("search-button").click()
            return;
        }
        this.state = this.initialState
        const {value} = event.target
        if(value === ""){
            return;
        }
        console.log(value)
        this.setState({word: value})
        this.GetAutoFillSuggestions(value)
    }


    componentDidMount() {
        document.addEventListener("keydown" , this.handleChange)
    }

    render() {
        return(
            <form>
                <label htmlFor="word"> Enter Word </label>
                <input type= "word" list = "suggestions" name = "word" id = "word" onChange={this
                    .handleChange} autoComplete={"off"}/>
                <Link to={this.state.linkMeaning}>
                <Button className= "search-button" id = "search-button" > Search </Button>
                </Link>
                <datalist id = "suggestions"> {this.state.autoFillList.map(this.showSuggestions)}</datalist>
            </form>
        );
    }

    GetAutoFillSuggestions(word) {
        axios.get("http://localhost:8000/searchPrefix/" + word).then((res) => this.setState({autoFillList : res.data}))
    }

    showSuggestions(item) {
        return <option key = {item.word}  value={item.word} />
    }
}


export default Form;