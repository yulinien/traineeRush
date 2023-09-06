import React, { useContext } from 'react';
import classes from '../../styles/Meals.module.css';
import MealItem from './MealItem';
import { CartContext } from '../../context/Context';

function Meals() {
  const { mealItem } = useContext(CartContext);
  return (
    <>
      <section className={classes.summary}>
        <h2>Delicious Food, Delivered To You</h2>
        <p>
          Choose your favorite meal from our broad selection of available meals
          and enjoy a delicious lunch or dinner at home.
        </p>
        <p>
          All our meals are cooked with high-quality ingredients, just-in-time and
          of course by experienced chefs!
        </p>
      </section>
      <section className={classes.meals}>
        <div className={classes.card}>
          {mealItem.map((meal) => (
            <ul key={meal.id}>
              <MealItem
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
              />

            </ul>
          ))}
        </div>
      </section>
    </>
  );
}

export default Meals;
