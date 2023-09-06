import React from 'react';
import classes from '../../styles/CartItem.module.css';

function CartItem({
  // eslint-disable-next-line react/prop-types
  name, price, amount, onRemove, onAdd,
}) {
  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>
            x
            {' '}
            {amount}
          </span>
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onRemove}>−</button>
        <button type="button" onClick={onAdd}>+</button>
      </div>
    </li>
  );
}

export default CartItem;
