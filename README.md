裡面看到類似左邊的註解可以不用理它// eslint 

對應module.css (各自的作用域的 CSS 文件)

Cart.jsx > Cart.module.css
CartItem.jsx > CartItem.module.css
Checkout.jsx > Checkout.module.css

Header.jsx > Header.module.css
HeaderCartButton.jsx > Header.module.css

MealItem.jsx > Meals.module.css
Meals.jsx > Meals.module.css

Modal.jsx >Modal.module.css (點開購物車背景變暗)

舉例:
import classes from '../../styles/Header.module.css'; 
<header className={classes.header}>
就是 Header.module.css 裡面的 .header{...}
calsses名稱可以自己取

功能:
加入購物車的功能我放在MealItem裡面


