import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {Button} from "react-bootstrap"
import Grid from '@mui/material/Grid';
import {Autocomplete, Container, InputAdornment, Select, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Dictionary from "./Dictionary";
class Form extends Component{
    initialState = {
        word : "",
        autoFillList : [{
            word: "",
            meanings : [],
            type : []
        }],
        renderMeanings : false
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




    render() {
        const fStyle={width:'480px',background:'white',borderRadius:'25px',padding:'28px 28px 45px',fontsize:'28px',fontweight:'500',textAlign:'center'}
        const myStyle={display:'flex',alignItems:'center',justifyContent:'center'}
        const iStyle={height:'45px',width:'400px',outline:'none',
        padding:'0 45px',borderRadius: '5px',border:'1px solid #999'}
        const sStyle={position:'fixed',top:'50.5%',color:'#999',transform:'translateY(-50%)',
          left:'630px',fontsize:'16px',pointerevents:'none'}
        const hStyle={fontweight: '600',backgroundImage:'conic-gradient(#553c9a, #ee4b2b, #00c2cb,#553c9a)',
        color:'transparent',backgroundClip:'text',webkitBackgroundClip:'text'}
        const aStyle={width:'4px'}
        return(
            <div style={myStyle}>
                <Grid>
                <div style={{paddingBottom : 20}}>
                <form style={fStyle}>
                    <Grid item xs={1} style={aStyle}><AutoStoriesIcon/></Grid>
                    <h1 style={hStyle}>Dictionary</h1>
                       <Button  variant={"contained"} style={{color:"white",backgroundColor:"blueviolet",height:'4vh',borderRadius:"25px",fontVariant:"oldstyle-nums",marginTop:'8px'}} onClick={() => this.setState({renderMeanings : true})} id = "search-button">Search</Button>
                    <Autocomplete filterOptions={e => e} onClick = {(e , value) => {this.setState({word : value}); document.getElementById("search-button").click();}} onInputChange={(e , value) => {if(value !== "") {this.setState({word : value}); this.GetAutoFillSuggestions(e.target.value); this.setState({renderMeanings : false})}}} freeSolo renderInput={(params) => <TextField variant = "standard" {...params} label="Word" />} options={this.state.autoFillList.map(e => e.word)}/>
                    </form>
                    </div>
                <br/>
                {this.state.word !== "" && this.state.renderMeanings ? <Dictionary word = {this.state.word} displayBoolean = {this.state.renderMeanings}/> : <div/>}
                </Grid>
                </div>
        );
    }

    GetAutoFillSuggestions(word) {
        axios.get("http://localhost:8000/searchPrefix/" + word).then((res) => this.setState({autoFillList : res.data}))
    }


}


export default Form;