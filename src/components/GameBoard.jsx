import React from "react";
import { getReadyUpButton } from "./getReadyButton";
import PlayerHands from "./PlayerHands";
import DeckMiddle from "./DeckMiddle";
import MyCards from "./MyCards";

const GameBoard = (props) => {


    const url = props.url;
    const name = props.name;
    const serverData = props.serverData;
    const setServerData = props.setServerData

    if (!serverData || !name || !url || !serverData.Game.Players) {
        return;
    }



    const getBoard = () => {
        if (!serverData.Game.GameActive){
            return getReadyUpButton(url,name,serverData, setServerData);
        } else {
            return (
            <>
                <PlayerHands serverData={serverData} name={name} url={url} setServerData={setServerData}/>
                <DeckMiddle serverData={serverData} name={name} url={url} setServerData={setServerData}/>
                <MyCards serverData={serverData} name={name} url={url} setServerData={setServerData}/>
                {getReadyUpButton(url,name,serverData, setServerData)}
            </>)
        }
    }


    return(
        <>
            {getBoard()}
        </>
    )
}

export default GameBoard;