import React, {PropTypes} from 'react';
import {Column} from './Column';

export function Row(props) {
    return (
        <div className="card-row">
            <Column heading={true}>{props.name}</Column>
            {props.children}
        </div>
    );
}

Row.propTypes = {
    name: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element)
};
