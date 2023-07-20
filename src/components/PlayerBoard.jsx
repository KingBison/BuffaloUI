import React from "react";
import buffaloPng from "./card-assets/buffalo.png"

const PlayerBoard = (props) => {

    const name = props.name;
    const serverData = props.serverData;

    if (!name || !serverData || !serverData.Game.Players) {
        return (<h2>SERVER NOT FOUND</h2>)
    }

    const getMeIfMe = (p) => {
        if (p.Name === name) {
            return(<div style={{fontWeight: "bolder", color: "darkblue"}}>YOU</div>)
        } else {
            return(<div>{p.Name}</div>)
        }
    }

    const getTurnIndicator = (player) => {
        if (player.Name === serverData.Game.TurnPointer) {
            return(<div>My Turn</div>)
        }
    }

    const getReadyIndicatorClass = (player) => {
        if (player.Ready) {
            return({
                backgroundColor: "green"
            })
        } else {
            return({
                backgroundColor: "red"
            })
        }
    }

    const getBuffalo = (player) => {
        if (player.Name === serverData.Game.WhoBuffaloCalled) {
            return(<img className="buffalo-emoji" src={buffaloPng}/>)
        }
    }

    const getPlayerBoard = () => {
        return(serverData.Game.Players.map((player)=>{
            return(
            <div className="player-card">
                <div className="player-card-name">
                    {getMeIfMe(player)}
                    {getBuffalo(player)}
                </div>
                <div className="player-card-middle">
                    <div style={getReadyIndicatorClass(player)}>&nbsp;</div>
                    <div className="player-card-wins">Wins: {player.Wins}</div>
                </div>
                {getTurnIndicator(player)}
            </div>
            );
        }))
    }


    return(getPlayerBoard());
}

export default PlayerBoard
