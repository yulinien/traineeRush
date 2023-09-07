import React, { useRef, useContext } from 'react';
import classes from '../../styles/Meals.module.css';
import { CartContext } from '../../context/Context';

function MealItem({
  // eslint-disable-next-line react/prop-types
  id, name, description, price,
}) {
  const amountInputRef = useRef();
  const { cart, dispatch } = useContext(CartContext);

  // 加入購物車
  const checkCart = (checkId, quantity) => {
    const existingItemIndex = cart.findIndex((item) => item.id === checkId);
    // 購物車有該商品的話，沒有的話會返回-1
    if (existingItemIndex !== -1) {
      // 增加數量
      //使用 useReducer 的 dispatch 函數來發送一個 'INCREMENT_QUANTITY' 類型的 action，以增加特定商品的數量
      dispatch({
        type: 'INCREMENT_QUANTITY',
        payload: { id: checkId, quantity: parseInt(quantity, 10) },
      });
    } else {
      // 新增商品到購物車
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          id: amountInputRef.current.id,
          name,
          description,
          price,
          quantity: parseInt(quantity, 10),
        },
      });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    checkCart(amountInputRef.current.id, amountInputRef.current.value);
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <form className={classes.form} onSubmit={onSubmit}>
        <div className={classes.input}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor={id}>Amount</label>
          <input
            ref={amountInputRef}
            id={id}
            type="number"
            min="1"
            max="5"
            defaultValue="1"
          />
        </div>
        <button type="submit">+ Add</button>
      </form>
    </li>
  );
}

export default MealItem;
