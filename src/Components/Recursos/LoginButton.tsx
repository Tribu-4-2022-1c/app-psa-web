import LoginButtonCSS from '../../Styles/Recursos/LoginButton.module.css';

const LoginButton = (props:any) => {
    return (
      <div>
              <button className={`${LoginButtonCSS.loginButton} `}>
                Login
              </button>
      </div>  
    )
  }
  
  export default LoginButton;