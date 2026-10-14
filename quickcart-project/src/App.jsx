import axios from 'axios'
import { Routes,Route } from 'react-router'
import { useState, useEffect } from 'react'
import { HomePage } from './Pages/Homepage'
import { CheckoutPage } from './Pages/Checkout/CheckoutPage'
import { OrdersPage } from './Pages/OrdersPage'
import { TrackingPage } from './Pages/TrackingPage'
import { PageNotFound } from './Pages/PageNotFound'
import './App.css'

function App() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/cart-items?expand=product')
      .then((response)=>{
          setCart(response.data);
        });
  },[]);


  return (
    <Routes>
      <Route path='/' element={<HomePage cart={cart} />} />
      <Route path='checkout' element={<CheckoutPage cart={cart} />} />
      <Route path='orders' element={<OrdersPage />} />
      <Route path='tracking' element={<TrackingPage />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
    
  )
}

export default App
