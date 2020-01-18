import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const buildControls = (props) => {

    const listOfControls = props.controls.map((control) => {
        return <BuildControl key={control.label}
            label={control.label}
            type={control.type}
            moreClick={props.moreClick}
            lessClick={props.lessClick} />
    });

    return (
        <div className={classes.BuildControls}>
            {listOfControls}
        </div>
    )
}

export default buildControls;