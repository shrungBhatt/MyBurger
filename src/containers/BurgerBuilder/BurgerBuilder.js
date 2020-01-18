import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';

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
        ]
    }

    OnLessButtonClicked = (type) => {
        const oldCount = this.state.ingredients[type];
        let newCount = oldCount;
        if (oldCount > 0) {
            newCount = newCount - 1;
        }
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        this.setState({ ingredients: updatedIngredients });
    }

    OnMoreButtonClicked = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        this.setState({ ingredients: updatedIngredients });
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    controls={this.state.buildControls}
                    moreClick={this.OnMoreButtonClicked}
                    lessClick={this.OnLessButtonClicked} />
            </Aux>
        );
    }
}

export default BurgerBuilder;