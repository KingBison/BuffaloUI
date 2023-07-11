import React, { useState } from "react";
import axios from "axios";

const Login = (props) => {

    const url = props.url;
    const setName = props.setName;
    const setLogin= props.setLogin

    const [newName, setNewName] = useState("")

    const tryLogIn = () => {
        axios.post(url+"/addPlayer", newName)
        .then((res) => {
            sessionStorage.name = newName;
            setName(newName)
            setLogin(true)
        })
        .catch((err) => {
            alert(err)
        })
    }

    return(
        <div className="login-main">
            <h1>Login</h1>
            <br/>
            <h2>Enter Your Name</h2>
            <input
                type="textbox"
                value={newName}
                onChange={(e) => {setNewName(e.target.value)}}
            />
            <button
                onClick={tryLogIn}
            >Enter</button>
        </div>
    )

}

export default Login;