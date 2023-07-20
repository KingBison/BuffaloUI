import React from "react";
import { getCardGraphic } from "./getCardGraphic";
import axios from "axios";
import { handleGetServerData } from "../serverUtil";
import { getReadyUpButton } from "./getReadyButton";

const DeckMiddle = (props) => {

    const serverData = props.serverData;
    const name = props.name;
    const url = props.url;
    const setServerData = props.setServerData

    const getLookingCardSuit = () => {

        if (name !== serverData.Game.TurnPointer || !serverData.Game.Drawn) {
            return("")
        } else {
            return(serverData.Game.LookingCard.Suit.Name)
        }
    }

    const getLookingCardNumber = () => {
        if (name !== serverData.Game.TurnPointer ||!serverData.Game.Drawn) {
            return("")
        } else {
            return(serverData.Game.LookingCard.Number.Name)
        }
    }

    const getLookingCardVisible = () => {
        if (serverData.Game.Drawn && serverData.Game.TurnPointer === name && !serverData.Game.Discarded) {
            return true
        } else {
            return false
        }
    }

    const getDiscardCardSuit = () => {
        if (!serverData.Game.TopOfDiscard.Suit.Name) {
            return("")
        } else {
            return(serverData.Game.TopOfDiscard.Suit.Name)
        }
    }

    const getDiscardCardNumber = () => {
        if (!serverData.Game.TopOfDiscard.Number.Name) {
            return("")
        } else {
            return(serverData.Game.TopOfDiscard.Number.Name)
        }
    }

    const getDiscardPileClickAction = () => {
        if (serverData.Game.Drawn) {
            axios.post(url+"/handleRequest", JSON.stringify({
                Name: name,
                Action: "discard"
            }))
            .then(()=>{handleGetServerData(url,setServerData)})
            .catch((err)=>{alert(err.response.data)})
        }
    }

    return(<div className="deck-middle">
                <div className="deck-middle-labels">Deck --------------- Discard</div>
                <img src={getCardGraphic(getLookingCardSuit(),getLookingCardNumber(),getLookingCardVisible())} alt="deck" className="deck-middle-looker"
                        onClick={() => {
                            axios.post(url+"/handleRequest", JSON.stringify({
                                Name: name,
                                Action: "draw"
                            }))
                            .then(()=>{handleGetServerData(url,setServerData)}).catch((err) => {
                                alert(err.response.data)
                            })
                        }}
                    />
                <img src={getCardGraphic(getDiscardCardSuit(), getDiscardCardNumber(), true)} alt="" onClick={getDiscardPileClickAction}/>
                {getReadyUpButton(url,name,serverData, setServerData)}
            </div>)

}

export default DeckMiddle;