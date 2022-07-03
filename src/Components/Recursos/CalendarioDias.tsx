import React from 'react'
import ProductoSoporteCSS from  '../../Styles/ProductoSoporte.module.css'//'../ Soporte/'
import { FaPlusCircle } from 'react-icons/fa'
import { TareasEmpleados } from './TareasEmpleados'; 
const CalendarioDias = (props:any) => {
    const {dia} = props;
    const {diaSelect} = props;
    return (
        <div>
            <div
                className={`${ProductoSoporteCSS.card} 
        ${(diaSelect&&dia&&diaSelect.id===dia.id)?ProductoSoporteCSS.isSelected:''}`}>
                <div className={ProductoSoporteCSS.contentDescription}>
                    <p>{dia['dia']} </p>
                </div>
                <div className={ProductoSoporteCSS.contentIcon} /*onClick={}*/>

                    <FaPlusCircle  />
                </div>
            </div>
            <div>
                <TareasEmpleados />
            </div>
        </div>
    )
}

export default CalendarioDias;