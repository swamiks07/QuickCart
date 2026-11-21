import API_BASE_URL from '../../api';
import axios from "axios";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import "./OrdersPage.css";
import { OrderHeader } from "./OrderHeader";
import { OrderDetailsGrid } from "./OrderDetailsGrid";
import OrdersIcon from "../../assets/images/orders-favicon.png";


export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () =>{
      const response = await axios.get(`${API_BASE_URL}/api/orders?expand=products`);
      setOrders(response.data);
    }
    
    fetchOrdersData();
  }, []);

  useEffect(() => {
      document.title = "Orders - QuickCart";
  
      let favicon = document.querySelector("link[rel='icon']");
  
      if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "icon";
        document.head.appendChild(favicon);
      }
  
      favicon.href = OrdersIcon;
    }, []);

  return (
    <>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">

                <OrderHeader order={order} />

                <OrderDetailsGrid order={order} loadCart={loadCart} /> 
                
              </div>
            );
          })}
        
        </div>
      </div>
    </>
  );
}
