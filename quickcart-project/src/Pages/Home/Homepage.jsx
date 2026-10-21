import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Header } from "../../components/Header";
import "./HomePage.css";
import { ProductsGrid } from './ProductsGrid';

export function HomePage({cart, loadCart}) {
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');

    useEffect(() => {
      const getHomeData = async () =>{
        const urlPath = search ? `http://localhost:3000/api/products?search=${search}` : 'http://localhost:3000/api/products' ;
        const response =  await axios.get(urlPath);
        setProducts(response.data);
      };

      getHomeData();
    }, [search]);
   

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
