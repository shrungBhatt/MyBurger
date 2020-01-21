import React, { Component } from 'react';

import axios from '../../axios-orders';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        buildControls: [
            { label: 'Salad', type: 'salad' },
            { label: 'Bacon', type: 'bacon' },
            { label: 'Meat', type: 'meat' },
            { label: 'Cheese', type: 'cheese' }
        ],
        totalPrice: 4,
        purchasable: false,
        purchase: false,
        loading: false
    };

    updatePurchasable(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 })
    }

    OnLessButtonClicked = (type) => {
        const oldCount = this.state.ingredients[type];
        let newCount = oldCount;
        let newTotalPrice = this.state.totalPrice;
        if (oldCount > 0) {
            newCount = newCount - 1;
            newTotalPrice = newTotalPrice - INGREDIENT_PRICES[type];
        }
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        this.setState({ ingredients: updatedIngredients, totalPrice: newTotalPrice });
        this.updatePurchasable(updatedIngredients);
    };

    OnMoreButtonClicked = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ ingredients: updatedIngredients, totalPrice: newTotalPrice });
        this.updatePurchasable(updatedIngredients);
    };

    OnOrderButtonClicked = () => {
        this.setState({ purchase: true });
    };

    OnBackdropClicked = () => {
        this.setState({ purchase: false });
    };

    OnPurchaseCancelClick = () => {
        this.setState({ purchase: false });
    };

    OnPurchaseContinueClick = () => {

        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Shrung Bhatt',
                address: {
                    street: 'Test1',
                    zipCode: '123125',
                    country: 'India'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                console.log(response);
            })
            .catch(error => {
                this.setState({loading: false});
                console.log(error);
            });
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary
            totalPrice={this.state.totalPrice}
            ingredients={this.state.ingredients}
            purchaseCancelled={this.OnPurchaseCancelClick}
            purchaseContinued={this.OnPurchaseContinueClick} />;

        if(this.state.loading){
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchase}
                    clicked={this.OnBackdropClicked}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    controls={this.state.buildControls}
                    moreClick={this.OnMoreButtonClicked}
                    lessClick={this.OnLessButtonClicked}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    order={this.OnOrderButtonClicked}
                    disabled={disabledInfo} />
            </Aux>
        );
    }
}

export default BurgerBuilder;