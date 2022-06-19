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

    const changePage = (route:string) => {
        setpageSelected({...pageSelected,nameRoute:route});
    }

    return (
        <div className={menuModuleCSS.contentMenu}>
            <div className={menuModuleCSS.contentDescription}>
                <img className={menuModuleCSS.imagePSA} src={img} alt='\' />
                <p>Praxis Systems Argentina</p>
            </div>
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