import soporteCSS from '../Styles/Soporte.module.css';
import { useEffect, useState } from 'react';
import soporteService from '../Services/soporteService';
import { TicketsSoporte } from '../Components/Soporte/TicketsSoporte';
import { VersionesSoporte } from '../Components/Soporte/VersionesSoporte';
import { ProductosSoporte } from '../Components/Soporte/ProductosSoporte';

const SoportePage = () => {

  const initialStateProduct = {
    id:""
  }
  const initialStateVersion = {
    id:''
  }
  const [products, setproducts] = useState([]);
  const [productSelect, setproductSelect] = useState(initialStateProduct);
  const [currentVersion, setcurrentVersion] = useState(initialStateVersion);

  useEffect(() => {
    const getProducts = async () => {
      let listProducts:any = await soporteService().getProducts();
      setproducts(listProducts);
      setproductSelect(listProducts[0]);
    }
    getProducts();
  }, []);

  return (
    <div className={soporteCSS.content}>

      <div className={soporteCSS.contentCards}>
        <ProductosSoporte products = {products} productSelect = {productSelect} setproductSelect = {setproductSelect} />
      </div>

      <div className={soporteCSS.contentCards}>
        <VersionesSoporte productSelect = {productSelect} currentVersion = {currentVersion} setcurrentVersion={setcurrentVersion} />
      </div>

      <div className={soporteCSS.contentCards}>
        <div className={soporteCSS.contentFilters}>

        </div>
        <div className={soporteCSS.contentTickets}>
          <TicketsSoporte currentVersion={currentVersion} />
        </div>
      </div>
    </div>
  )
}

export default SoportePage;