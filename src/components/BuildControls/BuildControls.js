import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const buildControls = (props) => {

    const listOfControls = props.controls.map((control) => {
        return <BuildControl label={control.label}/>
    });

    return (
    <div className={classes.BuildControls}>
        {listOfControls}
    </div>
    )
}

export default buildControls;