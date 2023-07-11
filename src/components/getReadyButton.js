import axios from "axios";
import { handleGetServerData } from "../serverUtil";

export const getReadyUpButton = (url, name, serverData, setServerData) => {
    var player = null;
    for(var p of serverData.Game.Players){
        if (p.Name === name) {
            player = p;
        }
    }

    if (serverData.Game.QueenAction) {
        if (name !== serverData.Game.TurnPointer) {
            return(<button className="queen-wait-button">Wait for Queen Swap</button>)
        } else {
            return(<button className="swap-button" onClick={() => {
                axios.post(url+"/handleRequest", JSON.stringify(
                    {
                        Name: name,
                        Action: "swap"
                    }
                ))
                .then(
                    handleGetServerData(url, setServerData)
                )
                .catch((err) => {
                    alert(err.response.data)
                })
            }}>SWAP</button>)
        }
    }

    const handleToggle = () => {
        axios.post(url+"/handleRequest", JSON.stringify(
            {
                Name: name,
                Action: "toggle-ready"
            }
        ))
        .then(
            handleGetServerData(url, setServerData)
        )
        .catch((err) => {
            alert(err.response.data)
        })
    }

    if (player) {
        if (player.Ready){
            return(<button className="ready-button"
            onClick={handleToggle}
            >Ready</button>)
        } else {
            return(<button className="not-ready-button"
            onClick={handleToggle}
            >Not Ready</button>)
        }
    } else {
        return(<div>ERROR PLAYER NOT FOUND</div>)
    }
}