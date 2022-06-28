import LoginButtonCSS from '../../Styles/Recursos/LoginButton.module.css';
import versionSoporteStyle from "../../Styles/VersionSoporte.module.css";
import {NavLink} from "react-router-dom";
import empleadosCSS from "../../Styles/Empleados.module.css";

const LoginButton = (props:any) => {
    function goProyectos() {

    }

    return (
      <div>
              <button className={`${LoginButtonCSS.loginButton} `}>
                  <NavLink
                      to={'/proyectos'}
                      className={versionSoporteStyle.styleNav}
                  >
                  <div className={LoginButtonCSS.loginButton} onClick={() => {goProyectos()}} >
                    Login
                  </div>
                  </NavLink>
              </button>
      </div>  
    )
  }
  
  export default LoginButton;