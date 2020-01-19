import React from 'react';

import Button from '../UI/Button/Button';

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
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Are you sure you want to checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
        </div>
    );
};

export default orderSummary;