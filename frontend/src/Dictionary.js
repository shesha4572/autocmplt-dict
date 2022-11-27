import React, {Component, useEffect} from "react";
import axios from "axios";
import {List, ListItem, ListItemIcon, Typography} from "@mui/material"
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CircleIcon from '@mui/icons-material/Circle';


class Dictionary extends React.Component{


    initialState = {
        jsonWord :
            {
                word: "",
                meanings: {}
            }
    }

    state = this.initialState

    componentDidMount() {
        this.getWord()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.word !== prevProps.word && this.props.word !== ""){
            this.getWord()
        }
    }

    getWord = () => {
        console.log(this.props.word.split('/').join('%2'))
        axios.get("http://localhost:8000/getMeanings/" + this.props.word.split('/').join('%2')).then((res) => {this.setState({jsonWord : res.data})}).catch(error => {
            if(error.response.status === 404){
                alert("Word doesnt exist in Dictionary")
            }
        })
    }

    handleSpeechClick = () => {
        const speakObj = new SpeechSynthesisUtterance();
        speakObj.text = this.state.jsonWord.word;
        speakObj.rate = 0.9
        speakObj.voice = speechSynthesis.getVoices().filter((voice) => voice.name === "Samantha")[0]
        speechSynthesis.speak(speakObj);
    }


    render() {
        if (this.props.displayBoolean && this.state.jsonWord.word !== "") {
            return (
                <div>
                    <Typography style={{fontFamily : "Playfair Display" , fontWeight : "bold"}} variant={"h2"}> {this.state.jsonWord.word.charAt(0).toUpperCase() + this.state.jsonWord.word.slice(1)} </Typography>
                    <Typography variant={"h3"} style={{fontFamily : "Times New Roman"  , fontWeight : "bolder"}}> {Object.keys(this.state.jsonWord.meanings).map((el , ind) => el + (ind === (Object.keys(this.state.jsonWord.meanings).length - 1) ? "   " : " / "))} </Typography>
                    <VolumeUpIcon style={{padding : "10px 10px 10px 10px"}} onClick={this.handleSpeechClick}></VolumeUpIcon>
                    <div>
                        {Object.keys(this.state.jsonWord.meanings).map(e => this.printMeanings(e))}
                    </div>
                </div>
            );
        }
        else{
            return (
                <div></div>
            )
        }
    }



    printMeanings(type){
        return(
            <div style={{padding : "10px 10px 10px 10px"}}>
                <Typography variant={"h5"}>{type}</Typography>
                <List sx = {{listStyleType : "disc" , pl : 4}}>{this.state.jsonWord.meanings[type].map(e => <div>
                    <ListItem sx = {{display : "list-item"}}><Typography variant={"h6"}>{e}</Typography></ListItem>
                </div>)}</List>
            </div>
        )
    }

}

export default Dictionary