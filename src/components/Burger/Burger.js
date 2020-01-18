import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {

    let listOfIngredients = Object.keys(props.ingredients)
    .map( igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey+i} type={igKey}/>
        })
    })
    .reduce((previousValue, currentValue) => {
        return previousValue.concat(currentValue);
    }, []);

    if(listOfIngredients.length === 0){
        listOfIngredients = <p>Start building your burger!</p>
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {listOfIngredients}
            <BurgerIngredient type = 'bread-bottom'/>
        </div>
    );
};

export default burger;