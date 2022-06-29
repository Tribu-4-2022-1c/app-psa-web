import React from 'react'
import ProductoSoporte from './ProductoSoporte';

export const ProductosSoporte = (props:any) => {
    const {products} = props;
    const {productSelect} = props;
    const {setproductSelect} = props;
    const changeProduct = (product:any) => {
        setproductSelect(product);
    };
  return (
    <div>
        <h3>PRODUCTOS:</h3>
        {products.map( (product:any,index:number) => 
          <ProductoSoporte key={index} product = {product} productSelect = {productSelect}
          changeProduct = {changeProduct} />
        )}
    </div>
  )
}
