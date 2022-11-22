import React, {Component} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from "axios";
import {Button} from "react-bootstrap"
import Grid from '@mui/material/Grid';
import {Autocomplete, Container, Select, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
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
        const fStyle={width:'480px',background:'white',borderRadius:'25px',padding:'28px 28px 45px',fontsize:'28px',fontweight:'500',textAlign:'center'}
        const myStyle={display:'flex',alignItems:'center',justifyContent:'center',
            minHeight:'100vh',backgroundColor:'lightblue',
        backgroundImage:'url("https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.macmillandictionaryblog.com%2Fwp-content%2Fuploads%2F2018%2F01%2Fdictionary-1024x575.jpg&imgrefurl=https%3A%2F%2Fwww.macmillandictionaryblog.com%2Fdictionary&tbnid=RZxnbZNskBoghM&vet=12ahUKEwi49Z-Vjr37AhUUn9gFHdqUBA8QMygkegUIARC5Ag..i&docid=8XEI-GjGozMzfM&w=1024&h=575&q=dictionary%20image&ved=2ahUKEwi49Z-Vjr37AhUUn9gFHdqUBA8QMygkegUIARC5Ag")'}
        const iStyle={height:'45px',width:'400px',outline:'none',
        padding:'0 45px',borderRadius: '5px',border:'1px solid #999'}
        const sStyle={position:'fixed',top:'50.5%',color:'#999',transform:'translateY(-50%)',
          left:'630px',fontsize:'16px',pointerevents:'none'}
        const hStyle={fontweight: '600',backgroundImage:'conic-gradient(#553c9a, #ee4b2b, #00c2cb,#553c9a)',
        color:'transparent',backgroundClip:'text',webkitBackgroundClip:'text'}
        const aStyle={width:'4px'}
        return(
            <div style={myStyle}>
                <form style={fStyle}>
                    <Grid item xs={1} style={aStyle}><AutoStoriesIcon/></Grid>
                    <Grid item xs={1} style={sStyle} ><SearchIcon/></Grid>
                    <h1 style={hStyle}>Dictionary</h1>
                    <input type= "word" style={iStyle} placeholder={"Search a word"} list = "suggestions" name = "word" id = "word" onKeyUp={this
                        .handleChange} autoComplete={"off"}/>
                    <Link to={this.state.linkMeaning}>
                       <Button variant={"contained"} style={{color:"white",backgroundColor:"blueviolet",height:'4vh',borderRadius:"25px",fontVariant:"oldstyle-nums",marginTop:'8px'}}>Search</Button>
                    </Link>
                    <Autocomplete freeSolo renderInput={(params) => <TextField {...params} onKeyUp={e => {if(e.target.value !== "") {this.setState({word : e.target.value}); this.GetAutoFillSuggestions(e.target.value);}}} label="Word" />} options={this.state.autoFillList.map(e => e.word)}/>
                    </form>
            </div>

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