import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/Context';
import classes from '../../styles/Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

function Cart() {
  const {
    setCartIsShown, totalAmount, cart, dispatch,
  } = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);// 是否點擊order
  const [isSubmit, setIsSubmit] = useState(false);// 是否送出訂單

  // 隱藏結帳畫面
  const disableCartHandler = () => {
    setCartIsShown(false);
  };

  // 購物車頁面增加商品
  const cartItemAddHandler = (id) => {
    dispatch({
      type: 'INCREMENT_QUANTITY',
      payload: { id, quantity: 1 },
    });
  };

  // 購物車頁面減少商品
  const cartItemRemoveHandler = (id) => {
    dispatch({
      type: 'DECREASE_QUANTITY',
      payload: { id },
    });
  };

  const submitHandler = async (userData) => {
    await fetch('https://food-app-65bd1-default-rtdb.firebaseio.com/order.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cart,
      }),
    });
  };

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={disableCartHandler} type="button">
        Close
      </button>
      {cart.length > 0 && (
      <button
        className={classes.button}
        onClick={() => setIsCheckout(true)}
        type="button"
      >
        Order
      </button>
      )}
    </div>
  );

  return (
    <Modal onClose={disableCartHandler}>
      {/* 購物車 */}
      { !isSubmit
      && (
      <>
        <ul className={classes['cart-items']}>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              amount={item.quantity}
              price={item.price}
              onRemove={() => cartItemRemoveHandler(item.id)}
              onAdd={() => cartItemAddHandler(item.id)}
            />
          ))}
        </ul>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>
            $
            {' '}
            {totalAmount.toFixed(2)}
          </span>
        </div>

      </>
      )}
      {/* 訂單填寫資料 */}
      {isCheckout
      && !isSubmit && (
      <Checkout
        onCancel={disableCartHandler}
        onSubmit={submitHandler}
        setIsSubmit={setIsSubmit}
      />
      )}
      {/* 點order後原本購物車底下按鈕隱藏 */}
      {!isCheckout && !isSubmit && modalAction}
      {/* 訂單確定送出畫面 */}
      {isSubmit && (
      <>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={disableCartHandler} type="button">
            Close
          </button>
        </div>
      </>
      ) }
    </Modal>
  );
}

export default Cart;
