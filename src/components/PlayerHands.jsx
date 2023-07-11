import React from "react";
import { getCardGraphic } from "./getCardGraphic";
import axios from "axios";
import { handleGetServerData } from "../serverUtil";

const PlayerHands = (props) => {

    const name = props.name
    const url = props.url
    const serverData = props.serverData
    const setServerData = props.setServerData

    if (!name || !serverData || !serverData.Game.Players) {
        return<h1>Server Error</h1>
    }

    const getVisible = (visBool) => {
        if (serverData.Game.GameStage === "resolution" || name==="Sam") {
            return(true);
        }
        if (serverData.Game.GameStage === "playing" && visBool) {
            return(true);
        }
        return false;
    }

    const getSelected = (name, index) => {
        if (!serverData.Game.QueenSelected) {
            return {}
        }
        for (var card of serverData.Game.QueenSelected) {
            if (card.Player === name && card.CardI === index) {
                return {filter: "drop-shadow(0px 0px 20px green)"}
            }
        }

        return{}
    }

    const getPlayerHands = () => {
        return(serverData.Game.Players.map((player, index)=>{
            if (player.Name === name){
                return;
            }
            return(
                <div className="player-hands-player">
                    <div>{player.Name}</div>
                    <div>
                        {player.Cards.map((card, index) => {
                            return(<img src={getCardGraphic(card.Suit.Name,card.Number.Name,getVisible(card.Visible))} alt="card-back" className="player-hands-card" style={getSelected(player.Name, index)}
                                onClick={() => {
                                    if (serverData.Game.TurnPointer === name && serverData.Game.QueenAction) {
                                        axios.post(url+"/handleRequest",JSON.stringify({
                                            Name: name,
                                            Action: "queen-swap-select"
                                        }), {params:{
                                            cardI: index,
                                            player: player.Name
                                        }})
                                        .then(()=>{
                                            handleGetServerData(url, setServerData)
                                        })
                                        .catch((err) => {
                                            alert(err.response.data)
                                        })
                                    } 
                                }}
                            />)
                        })}
                    </div>
                </div>
            )
        }))
    }




    return(<div className="player-hands">
        {getPlayerHands()}
    </div>)
}

export default PlayerHands;