import React from 'react'
import ProductoSoporteCSS from '../Soporte/ProductoSoporte.module.css'
import { FaProductHunt } from 'react-icons/fa'
const ProductoSoporte = (props:any) => {
  const {product} = props;
  const {productSelect} = props;
  return (
    <div
      className={`${ProductoSoporteCSS.card} 
      ${(productSelect&&product&&productSelect.id===product.id)?ProductoSoporteCSS.isSelected:''}`}>
            <div className={ProductoSoporteCSS.contentDescription}>
              <p className={ProductoSoporteCSS.label}>Nombre de Producto:</p>
              <p>{product['name']} </p>
            </div>
            <div className={ProductoSoporteCSS.contentIcon}>
              <FaProductHunt />
            </div>
    </div>  
  )
}

export default ProductoSoporte;