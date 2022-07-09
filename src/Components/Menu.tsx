import React from 'react';
import getUser from "../Pages/LogInPage";
import menuModuleCSS from '../Styles/Menu.module.css';
import img from '../assets/psa_icon.png';
import {  NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
const Menu = () => {



    const routePSA = {
        proyectos: '/proyectos',
        recursos: '/recursos',
        soporte: '/soporte',
        login: '/login'
    };
    const intialStatePageSelected = {
        nameRoute: '/proyectos',
        isSelected: false,
    }
    const { pathname } = useLocation();
    const [pageSelected, setpageSelected] = useState(intialStatePageSelected);
    const [logon, setlog] = useState(false)

    const changePage = (route:string) => {
        setpageSelected({...pageSelected,nameRoute:route,isSelected:true});
    }

    useEffect(() => {
        let path = (pathname.split('/').length>1)?pathname.split('/')[1]:'';
        path = '/'+path;
        console.log(path);
        changePage(path);
    },[]);

    let logged = false;

    return (
        <div className={menuModuleCSS.contentMenu}>
            <div className={menuModuleCSS.contentDescription}>
                <img className={menuModuleCSS.imagePSA} src={img} alt='\' />
                <p>Praxis Systems Argentina</p>
            </div>
            <div className={menuModuleCSS.contentSegmentMenu}>
                <div className={`${menuModuleCSS.optionSegment} ${(pageSelected.nameRoute === routePSA.proyectos || pageSelected.nameRoute === '/')?menuModuleCSS.addMarker:''}`}>
                    <NavLink end className={menuModuleCSS.linkEfect} to={routePSA.proyectos} onClick={() => changePage(routePSA.proyectos)}>
                        PROYECTOS
                    </NavLink>
                </div>
                <div className={`${menuModuleCSS.optionSegment} ${(pageSelected.nameRoute === routePSA.soporte)?menuModuleCSS.addMarker:''}`}>
                    <NavLink end className={menuModuleCSS.linkEfect} 
                    to={routePSA.soporte} onClick={() => changePage(routePSA.soporte)}>
                        SOPORTE
                    </NavLink>
                </div>
                <div className={`${menuModuleCSS.optionSegment} ${pageSelected.nameRoute === routePSA.recursos?menuModuleCSS.addMarker:''}`}>
                    <NavLink end className={menuModuleCSS.linkEfect} to={routePSA.recursos} onClick={() => changePage(routePSA.recursos)}>
                        RECURSOS
                    </NavLink>
                </div>
                {logon === false ? (
                <div className={`${menuModuleCSS.optionSegment} ${pageSelected.nameRoute === routePSA.login?menuModuleCSS.addMarker:''}`}>
                    {<NavLink end className={menuModuleCSS.linkEfect} to={routePSA.login} onClick={() => {changePage(routePSA.login); setlog(true)}}>
                        Log in
                    </NavLink>}
                </div>
                ) : (
                    <div className={`${menuModuleCSS.optionSegment} ${pageSelected.nameRoute === routePSA.login?menuModuleCSS.addMarker:''}`}>
                        <div className={menuModuleCSS.linkEfect} >{
                            "LOGGED"
                        } </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default Menu;