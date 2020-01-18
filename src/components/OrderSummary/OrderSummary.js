import React from 'react';

const orderSummary = (props) => {

    const listOfIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}: {props.ingredients[igKey]}</span> </li>
        });

    return (
        <div>
            <h3>Your order summary</h3>
            <p>Your burger contains the following ingredients:</p>
            <ul>
                {listOfIngredients}
            </ul>
            <p>Are you sure you want to checkout?</p>
        </div>
    );
};

export default orderSummary;