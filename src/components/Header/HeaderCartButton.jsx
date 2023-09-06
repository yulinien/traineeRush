import React, { useContext, useState, useEffect } from 'react';
import classes from '../../styles/Header.module.css';
import CartIcon from '../UI/CartIcon';
import { CartContext } from '../../context/Context';

function HeaderCartButton() {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const { totalQuantity, setCartIsShown } = useContext(CartContext);
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
  // 讓結帳畫面顯示出來
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  useEffect(() => {
    if (totalQuantity === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    // eslint-disable-next-line
    return () => {
      clearTimeout(timer);
    };
  }, [totalQuantity]);
  return (
    <button type="button" className={btnClasses} onClick={showCartHandler}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
}

export default HeaderCartButton;
