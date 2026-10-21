import { Link } from "react-router";
import CheckoutLockIcon from '../../assets/images/icons/checkout-lock-icon.png';
import Logo from '../../assets/images/quickcart-logo.png';
import MobileLogoWhite from '../../assets/images/mobile-logo-white.png';
import './CheckoutHeader.css'

export function CheckoutHeader({ cart }) {
  let totalQuatity = 0;

  cart.forEach((cartItem) => {
    totalQuatity += cartItem.quantity;
  });

  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src={Logo} />
              <img className="mobile-logo" src={MobileLogoWhite} />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              {totalQuatity} items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src={CheckoutLockIcon} />
          </div>
        </div>
      </div>
    </>
  );
}
