import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

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
        purchase: false
    }

    updatePrachasable(ingredients) {
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
        this.updatePrachasable(updatedIngredients);
    }

    OnMoreButtonClicked = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ ingredients: updatedIngredients, totalPrice: newTotalPrice });
        this.updatePrachasable(updatedIngredients);
    }

    OnOrderButtonClicked = () => {
        this.setState({ purchase: true });
    };

    OnBackdropClicked = () => {
        this.setState({ purchase: false });
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal 
                    show={this.state.purchase}
                    clicked={this.OnBackdropClicked}>
                    <OrderSummary ingredients={this.state.ingredients} />
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