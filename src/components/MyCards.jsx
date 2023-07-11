import React from "react";
import axios from "axios";
import { getCardGraphic } from "./getCardGraphic";
import { handleGetServerData } from "../serverUtil";

const MyCards = (props) => {

    const serverData = props.serverData;
    const name = props.name;
    const url = props.url;
    const setServerData = props.setServerData

    const getKingPeeking = (playerName, turnPointer, cardNumName, cardOnTop, discarded) => {
        if (!discarded) {
            return false
        }
        if (playerName !== turnPointer) {
            return false
        }
        if (cardNumName === "king"){
            return false
        }
        if (cardOnTop !== "king") {
            return false
        }
        return true
    }

    const getQueenAction = (playerName, turnPointer, cardNumName, cardOnTop, discarded) => {
        if (!discarded) {
            return false
        }
        if (playerName !== turnPointer) {
            return false
        }
        if (cardNumName === "queen"){
            return false
        }
        if (cardOnTop !== "queen") {
            return false
        }
        return true
    }

    const getQueenSelectedStyle = (myTurn, cardI) => {
        if (!serverData.Game.QueenSelected) {
            return {}
        }
        for (var card of serverData.Game.QueenSelected) {
            if (card.Player === name && card.CardI === cardI) {
                return {filter: "drop-shadow(0px 0px 20px green)"}
            }
        }
        return {}
    }

    const getCards = () => {
        for (var player of serverData.Game.Players){
            if (player.Name === name){
                return(player.Cards.map((card, index) => {
                    return(<img className="card" style={getQueenSelectedStyle(player.Name === serverData.Game.TurnPointer, index)} src={getCardGraphic(card.Suit.Name, card.Number.Name, card.Visible || name==="Sam" || serverData.Game.GameStage === "resolution")} alt="card"
                        onClick={()=>{
                            var action = "";
                            if (getQueenAction(player.Name, serverData.Game.TurnPointer, card.Number.Name, serverData.Game.TopOfDiscard.Number.Name, serverData.Game.Discarded) && serverData.Game.QueenAction) {
                                action = "queen-swap-select"
                            } else if (serverData.Game.GameStage === "peeking" || getKingPeeking(player.Name, serverData.Game.TurnPointer, card.Number.Name, serverData.Game.TopOfDiscard.Number.Name, serverData.Game.Discarded)) {
                                action = "toggle-card-visibility"
                            } else if (serverData.Game.GameStage === "playing" && serverData.Game.Discarded) {
                                action = "play-on-discard"
                            } else if (serverData.Game.GameStage === "playing" && serverData.Game.Drawn && !serverData.Game.Discarded && player.Name === serverData.Game.TurnPointer) {
                                action = "replace"
                            }
                            if (action === "") {
                                return
                            }
                            axios.post(url+"/handleRequest",JSON.stringify({
                                Name: name,
                                Action: action
                            }), {params:{
                                cardI: index,
                                player: name
                            }})
                            .then(()=>{
                                handleGetServerData(url, setServerData)
                            })
                            .catch((err) => {
                                alert(err.response.data)
                            })
                            
                        }}
                    />)
                }))
            }
        }
    }

    return(
        <div>
            {getCards()}
        </div>
    ) 
}

export default MyCards