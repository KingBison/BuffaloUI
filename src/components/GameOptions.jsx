import React from "react";
import axios from "axios";
import { handleGetServerData } from "../serverUtil";

const GameOptions = (props) =>  {

    const url = props.url;
    const name = props.name;
    const setLogin = props.setLogin;
    const serverData = props.serverData;
    const setServerData = props.setServerData;

    if (!serverData) {
        return(<></>)
    }

    const returnToLogin = () => {
        sessionStorage.removeItem("name")
        setLogin(false)
    }

    const removePlayer = () => {
        axios.post(url+"/removePlayer", name)
        .then(() => {
            sessionStorage.removeItem("name")
            setLogin(false)
        })
        .catch((err)=>{
            alert(err.data)
        })
    }

    const getGameStage = () => {
        if (serverData.Game.GameStage){
            return(<h2>Game Stage: {serverData.Game.GameStage}</h2>)
        }
    }

    const getInstructions = () => {
        if (serverData.Game.GameStage === "playing" && name === serverData.Game.TurnPointer) {
            if (!serverData.Game.Drawn) {
                return(<h2>Click on the deck to draw a card</h2>)
            }
            if (!serverData.Game.Discarded) {
                return(<h2>You can either click the discard pile to discard or click one of your cards to replace</h2>)
            }
            if (serverData.Game.Discarded) {
                return(<h2>you have discarded, click on one of your cards to play on top or ready up to proceed</h2>)
            }
        }
        if (serverData.Game.GameStage === "playing") {
            if (serverData.Game.Discarded) {
                return(<h2>{serverData.Game.TurnPointer} discarded, click on one of your cards to play on top or ready up to proceed</h2>)
            }
        }
    }

    const getCallBuffaloButton = () => {
        if (serverData.Game.BuffaloCalled) {
            return(<h2 style={{color: "red", fontWeight: "bolder"}}>BUFFALO HAS BEEN CALLED</h2>)
        } else if (serverData.Game.TurnPointer === name && !serverData.Game.BuffaloCalled) {
            return(<button className="call-buffalo-button" onClick={()=>{
                axios.post(url+"/handleRequest",JSON.stringify({
                    Name: name,
                    Action: "call-buffalo"
                }))
                .then(()=>{
                    handleGetServerData(url, setServerData)
                })
                .catch((err) => {
                    alert(err.response.data)
                })
            }}>Call Buffalo</button>)
        }
    }

    return(
        <div className="gameoptions-main">
            <button onClick={returnToLogin}>Return to Login Menu</button>
            <br/>
            <button onClick={removePlayer}>Exit Game</button>
            <br/>
            {getGameStage()}
            <br/>
            {getCallBuffaloButton()}
            <br/>
            {getInstructions()}
        </div>
    )
}

export default GameOptions;