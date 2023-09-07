import React from 'react';
import classes from '../../styles/Header.module.css';
import HeaderCartButton from './HeaderCartButton';

function Header() {
  return (
    <>
      <header className={classes.header}>
        <h1>Shoalter</h1>
        <HeaderCartButton />
      </header>
    </>
  );
}

export default Header;
