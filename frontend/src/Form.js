import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {Button} from "react-bootstrap"
import Grid from '@mui/material/Grid';
import {Autocomplete, Container, InputAdornment, Select, TextField, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Dictionary from "./Dictionary";

class Form extends Component {
    initialState = {
        word: "",
        autoFillList: [{
            word: "",
            meanings: [],
            type: []
        }],
        renderMeanings: false
    }

    state = this.initialState

    handleChange = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            console.log("Enter pressed")
            this.setState({renderMeanings: true})
        }
    }


    render() {
        const fStyle = {
            width: '480px',
            background: 'white',
            borderRadius: '25px',
            padding: '28px 28px 45px',
            fontsize: '28px',
            fontweight: '500',
            textAlign: 'center'
        }
        const myStyle = {display: 'flex', alignItems: 'center', justifyContent: 'center'}
        const iStyle = {
            height: '45px', width: '400px', outline: 'none',
            padding: '0 45px', borderRadius: '5px', border: '1px solid #999'
        }
        const sStyle = {
            position: 'fixed', top: '50.5%', color: '#999', transform: 'translateY(-50%)',
            left: '630px', fontsize: '16px', pointerevents: 'none'
        }
        const hStyle = {
            fontweight: '600', backgroundImage: 'conic-gradient(#553c9a, #ee4b2b, #00c2cb,#553c9a)',
            color: 'transparent', backgroundClip: 'text', webkitBackgroundClip: 'text'
        }
        return (
            <div>
                <Grid>
                    <div style={{paddingBottom: 20,marginTop:'30px'}}>
                        <Grid container xs sx={{padding : "30px 10px 10px 10px"}}>
                            <Grid item xs paddingLeft={5} marginRight={'25px'}>
                                <Grid item xs paddingLeft={3} paddingTop={-1}><AutoStoriesIcon fontSize={"large"} style={{color:'white'}}/></Grid>
                                <Grid item xs paddingTop={-1}><Typography color={'white'}>Dictionary</Typography></Grid></Grid>
                            <Grid item xs={10}><Autocomplete filterOptions={e => e} onInputChange={(e, value) => {
                                if (value.trim() !== "") {
                                    this.setState({word: value});
                                    this.GetAutoFillSuggestions(value);
                                    this.setState({renderMeanings: false})
                                } else {
                                    this.state = this.initialState
                                }
                            }} onClick={(e, value) => {
                                this.setState({word: value});
                                document.getElementById("search-button").click();
                            }} freeSolo renderInput={(params) => <TextField
                                variant="outlined" style={{marginTop:'10px',width:'100%',backgroundColor:'white',borderRadius:'5px'}} {...params} placeholder={"Search a word"} onKeyUp={e => this.handleChange(e)}/>}
                                                            options={this.state.autoFillList.map(e => e.word)}/></Grid>
                            <Grid item xs paddingLeft={5} paddingTop={1}><Button id={"search-button"} variant={"contained"} style={{
                                color: "white",
                                backgroundColor: "blueviolet",
                                height: '5vh',
                                fontVariant: "oldstyle-nums",
                                marginTop: '8px'
                            }}onClick={() => this.setState({renderMeanings: true})}>Search</Button></Grid>
                        </Grid>
                    </div>
                    <br/>
                </Grid>
                {this.state.word !== "" && this.state.renderMeanings ?
                    <Dictionary word={this.state.word} displayBoolean={this.state.renderMeanings}/> : <div/>}
            </div>
        );
    }

    GetAutoFillSuggestions(word) {
        axios.get("http://localhost:8000/searchPrefix/" + word).then((res) => this.setState({autoFillList: res.data}))
    }


}


export default Form;