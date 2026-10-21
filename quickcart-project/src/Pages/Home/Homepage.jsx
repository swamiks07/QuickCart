import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from "../../components/Header";
import "./HomePage.css";
import { ProductsGrid } from './ProductsGrid';

export function HomePage({cart, loadCart}) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const getHomeData = async () =>{
        const response =  await axios.get('http://localhost:3000/api/products');
        setProducts(response.data);
      };

      getHomeData();
    }, [])
   

  return (
    <>
      <title>Quickcart Project</title>

      <link rel="icon" type="image/x-icon" href="../../assets/images/home-favicon" />

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart}/>
      </div>
    </>
  );
}
