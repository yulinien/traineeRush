/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useContext, useState } from 'react';
import classes from '../../styles/Checkout.module.css';
import { CartContext } from '../../context/Context';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

function Checkout({ onCancel, onSubmit, setIsSubmit }) {
  const { dispatch } = useContext(CartContext);
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    // 表單驗證
    setFormInputsValidity({
      name: !isEmpty(enteredName),
      street: !isEmpty(enteredStreet),
      city: !isEmpty(enteredCity),
      postalCode: isFiveChars(enteredPostalCode),
    });

    const formIsValid = !isEmpty(enteredName)
      && !isEmpty(enteredStreet)
      && !isEmpty(enteredCity)
      && isFiveChars(enteredPostalCode);
    if (!formIsValid) {
      return null;
    }
    // 送出訂單
    onSubmit({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
    dispatch({ type: 'CLEAR' });
    setIsSubmit(true);
    return null;
  };
  // 輸入錯誤變紅
  const nameControlClasses = ({ id }) => `${classes.control} ${
    formInputsValidity[id] ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses({ id: 'name' })}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={nameControlClasses({ id: 'street' })}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={nameControlClasses({ id: 'postalCode' })}>
        <label htmlFor="postal">Postal Code</label>
        <input minLength="5" maxLength="5" type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode
        && <p>Please enter a valid postal code (5 characters long)!</p>}
      </div>
      <div className={nameControlClasses({ id: 'city' })}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={classes.submit} type="submit">Confirm</button>
      </div>
    </form>
  );
}

export default Checkout;
