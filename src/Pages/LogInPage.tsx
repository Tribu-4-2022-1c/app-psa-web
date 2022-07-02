import React from 'react'
import LoginButton from "../Components/Recursos/LoginButton";
import loginButton from "../Components/Recursos/LoginButton";
import versionSoporteStyle from "../Styles/VersionSoporte.module.css";
import {NavLink, Route} from "react-router-dom";
import {link} from "fs";

const LogInPage = () => {


    return (
        <div>
        <form>
        <label>
          Usuario:
        </label>
      </form>
      <input type="text" name="name" />
      <form>
        <label>
          Contraseña:
        </label>
      </form>
      <input type="text" name="name" />
      </div>
    )
}

export default LogInPage;