import React from 'react'
import ProductoSoporteCSS from '../Soporte/ProductoSoporte.module.css'
import { FaProductHunt } from 'react-icons/fa'
const ProductoSoporte = (props:any) => {
  const {product} = props;
  const {productSelect} = props;
  const {changeProduct} = props;
  return (
    <div onClick={() => changeProduct(product) }
      className={`${ProductoSoporteCSS.card} 
      ${(productSelect&&product&&productSelect.id===product.id)?ProductoSoporteCSS.isSelected:''}`}>
            <div>
              <p className={ProductoSoporteCSS.label}>Nombre:</p>
              <p>{product['id']} </p>
            </div>
            <div className={ProductoSoporteCSS.contentIcon}>
              <FaProductHunt />
            </div>
    </div>  
  )
}

export default ProductoSoporte;