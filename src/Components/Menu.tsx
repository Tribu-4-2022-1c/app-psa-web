import menuModuleCSS from '../Styles/Menu.module.css';
import img from '../assets/psa_icon.png';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
const Menu = () => {
    const routePSA = {
        proyectos: '/proyectos',
        recursos: '/recursos',
        soporte: '/soporte'
    };
    const intialStatePageSelected = {
        nameRoute: '/proyectos',
        isSelected: false,
    }
    const [pageSelected, setpageSelected] = useState(intialStatePageSelected);
    // useEffect(() => {
    //     setpageSelected({...pageSelected,nameRoute:routePSA.proyectos});
    // }, )

    const changePage = (route:string) => {
        setpageSelected({...pageSelected,nameRoute:route});
    }

    return (
        <div className={menuModuleCSS.contentMenu}>
            <div className={menuModuleCSS.contentDescription}>
                <img className={menuModuleCSS.imagePSA} src={img} alt='\' />
                <p>Praxis Systems Argentina</p>
            </div>
             {/* <div className={menuModuleCSS.contentButton}>
               <NavLink className={menuModuleCSS.linkEfect} to={routePSA.proyectos} onClick={() => changePage(routePSA.proyectos)}>
                    <div className={menuModuleCSS.buttonSection}>
                        <p>PROYECTOS</p>
                        <hr className={pageSelected.nameRoute === routePSA.proyectos ? menuModuleCSS.line : menuModuleCSS.notLine} />
                    </div>
                </NavLink>
                <NavLink className={menuModuleCSS.linkEfect} to={routePSA.soporte} onClick={() => changePage(routePSA.soporte)}>
                    <div className={menuModuleCSS.buttonSection}>
                        <p>SOPORTES</p>
                        <hr className={pageSelected.nameRoute === routePSA.soporte ? menuModuleCSS.line : menuModuleCSS.notLine} />
                    </div>
                </NavLink>
                <NavLink className={menuModuleCSS.linkEfect} to={routePSA.recursos} onClick={() => changePage(routePSA.recursos)}>
                    <div className={menuModuleCSS.buttonSection}>
                        <p>RECURSOS</p>
                        <hr className={pageSelected.nameRoute === routePSA.recursos ? menuModuleCSS.line : menuModuleCSS.notLine} />
                    </div>
                </NavLink>
            </div> */}
            <div className={menuModuleCSS.contentSegmentMenu}>
                <div className={menuModuleCSS.optionSegment}>
                    <NavLink end className={menuModuleCSS.linkEfect} to={routePSA.proyectos} onClick={() => changePage(routePSA.proyectos)}>
                        PROYECTOS
                    </NavLink>
                    <hr className={pageSelected.nameRoute === routePSA.proyectos ? menuModuleCSS.line : menuModuleCSS.notLine} />
                </div>
                <div className={menuModuleCSS.optionSegment}>
                    <NavLink end className={menuModuleCSS.linkEfect} 
                    to={routePSA.soporte} onClick={() => changePage(routePSA.soporte)}>
                        SOPORTES
                    </NavLink>
                    <hr className={pageSelected.nameRoute === routePSA.soporte ? menuModuleCSS.line : menuModuleCSS.notLine} />
                </div>
                <div className={menuModuleCSS.optionSegment}>
                    <NavLink end className={menuModuleCSS.linkEfect} to={routePSA.recursos} onClick={() => changePage(routePSA.recursos)}>
                        RECURSOS
                    </NavLink>
                    <hr className={pageSelected.nameRoute === routePSA.recursos ? menuModuleCSS.line : menuModuleCSS.notLine} />
                </div>
            </div>
        </div>
    )
}

export default Menu;