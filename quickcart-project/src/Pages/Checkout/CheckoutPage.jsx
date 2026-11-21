import API_BASE_URL from '../../api';
import axios from "axios";
import { useState, useEffect } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import "./CheckoutPage.css";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./Paymentsummary";
import CartIcon from "../../assets/images/cart-favicon.png";


export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      const response = await axios.get(
        `${API_BASE_URL}/api/delivery-options?expand=estimatedDeliveryTime`,
      );
      setDeliveryOptions(response.data);
    };
    fetchCheckoutData();
  }, []);

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      const response = await axios.get(
        `${API_BASE_URL}/api/payment-summary`,
      );
      setPaymentSummary(response.data);
    };
    fetchPaymentSummary();
  }, [cart]);

  useEffect(() => {
    document.title = "Checkout - QuickCart";

    let favicon = document.querySelector("link[rel='icon']");

    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }

    favicon.href = CartIcon;
  }, []);

  return (
    <>
      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}
