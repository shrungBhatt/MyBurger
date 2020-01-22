import React, {Component} from 'react';

import Aux from '../Aux/Aux';
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WithComponent, axios) => {
    return class extends Component{

        state = {
            error: null
        }

        componentDidMount() {

            axios.interceptors.request.use(
               value => {
                   this.setState({error: null});
                   return value;
               }
            );

            axios.interceptors.response.use(
                res => res,
                error => {
                    this.setState({error: error});
                }
            );
        }

        errorConfirmedClickHandler = () => {
            this.setState({error: null});
        };


        render() {

            return (
                <Aux>
                    <Modal show={this.state.error} clicked={this.errorConfirmedClickHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WithComponent {...this.props}/>
                </Aux>
            );

        }
    }

};

export default withErrorHandler;