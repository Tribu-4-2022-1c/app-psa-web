import React from 'react'
import LoginButton from "../Components/Recursos/LoginButton";
import loginButton from "../Components/Recursos/LoginButton";
import versionSoporteStyle from "../Styles/VersionSoporte.module.css";
import {NavLink, Route} from "react-router-dom";
import {link} from "fs";

const LogInPage = () => {


    return (
        <div >
            <LoginButton loginButton={loginButton}  >
                </LoginButton>
        </div>
    )
}

export default LogInPage;