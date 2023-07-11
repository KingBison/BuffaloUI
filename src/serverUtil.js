import axios from "axios"

export const fetchUrl = (setter) => {
    fetch("config.json").then(
    (res) => res.json())
    .then((config) => {
        setter(config.serverAddr)
        console.log("URL SET TO "+config.serverAddr)
    }).catch(setter(false))
}

export const handleGetServerData = (url, setServerData) => {
    if (!url){
        console.log("URL FAILURE: " + url)
        return;
    }
    axios.get(url+"/getServerData")
        .then((res) => {
            if (res.data) {
            setServerData(res.data)
            console.log("SUCCESSFULLY SET SERVER DATA")
            } else {
            setServerData(false)
            console.log("SERVER DATA NOT RECOVERED")
            }
        }
        ).catch(()=>setServerData(false))
}

export const activateServerManager = (url, setServerData) => {
    if (!url) return;
    let intervalController = setInterval(function(){return handleGetServerData(url,setServerData)}, 1000)
    return () => clearInterval(intervalController)
}
