import React from "react";
import GameOptions from "./GameOptions";
import GameBoard from "./GameBoard";
import PlayerBoard from "./PlayerBoard";

const Game = (props) => {
    const name = props.name;
    const url = props.url;
    const serverData = props.serverData;
    const setLogin = props.setLogin;
    const setServerData = props.setServerData

    return(
        <div className="game-main">
            <div className="game-section">
                <h1>Hello {name}</h1>
                <h1>Welcome to Buffalo</h1>
                <PlayerBoard
                    name={name}
                    serverData={serverData}
                />
            </div>
            <div className="game-section">
                <GameBoard
                    url={url}
                    name={name}
                    serverData={serverData}
                    setServerData={setServerData}
                />
            </div>
            <div className="game-section">
                <h1>Options</h1>
                <GameOptions
                    url={url}
                    name={name}
                    setLogin={setLogin}
                    serverData={serverData}
                    setServerData={setServerData}
                />
            </div>
            
        </div>
    )
}

export default Game;