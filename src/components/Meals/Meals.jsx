import React, { useContext } from 'react';
import classes from '../../styles/Meals.module.css';
import MealItem from './MealItem';
// import { CartContext } from '../../context/Context';
import fiftyBImg from '../../assets/50blue.png';
import MacuImg from '../../assets/macu.png';
import FiveImg from '../../assets/5min.png';
import MilkshaImg from '../../assets/Milksha.jpg';
import {FiftyB} from '../../DummyData/FiftyB';

function Meals() {
  // const { mealItem } = useContext(CartContext);
  return (
    <>
      <section className={classes.summary}>
        {/* TODO 推薦商品輪播 */}
      </section>
      <section className={classes.meals}>
        <div className={classes.card}>
          <ul>
          <img className={classes.brandIcon} src={fiftyBImg} alt="50b" />
          {FiftyB.map((meal,index) => (
              <MealItem
                id={meal.id}
                name={meal.name}
                img={meal.img}
                price={meal.price}
                key={`50b${index}`}
              />
          ))}
          </ul>
        </div>
        <div className={classes.card}>
        {/* TODO 換資料 */}
          <ul>
          <img className={classes.brandIcon} src={MilkshaImg} alt="50b" />
          {FiftyB.map((meal,index) => (
              <MealItem
                id={meal.id}
                name={meal.name}
                img={meal.img}
                price={meal.price}
                key={`50b${index}`}
              />
          ))}
          </ul>
        </div>
        <div className={classes.card}>
        {/* TODO 換資料 */}
          <ul>
          <img className={classes.brandIcon} src={FiveImg} alt="50b" />
          {FiftyB.map((meal,index) => (
              <MealItem
                id={meal.id}
                name={meal.name}
                img={meal.img}
                price={meal.price}
                key={`50b${index}`}
              />
          ))}
          </ul>
        </div>
        <div className={classes.card}>
        {/* TODO 換資料 */}
          <ul>
          <img className={classes.brandIcon} src={MacuImg} alt="50b" />
          {FiftyB.map((meal,index) => (
              <MealItem
                id={meal.id}
                name={meal.name}
                img={meal.img}
                price={meal.price}
                key={`50b${index}`}
              />
          ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Meals;
