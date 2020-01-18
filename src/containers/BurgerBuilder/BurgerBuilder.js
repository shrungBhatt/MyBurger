import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';

class BurgerBuilder extends Component{

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        buildControls: [
            {label: 'Salad', type: 'salad'},
            {label: 'Bacon', type: 'bacon'},
            {label: 'Meat', type: 'meat'},
            {label: 'Cheese', type: 'cheese'}
        ]
    }

    render(){
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls controls={this.state.buildControls}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;