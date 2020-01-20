import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    OnCloseSideDrawerClicked = () => {
        this.setState({ showSideDrawer: false });
    }

    OnToggleSlideDrawerClicked = () => {
        this.setState((prevState) => this.setState({ showSideDrawer: !prevState.showSideDrawer }));
    }

    render() {
        return (
            <Aux>
                <Toolbar toggleSlideDrawer={this.OnToggleSlideDrawerClicked} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    close={this.OnCloseSideDrawerClicked} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }

}

export default Layout; 