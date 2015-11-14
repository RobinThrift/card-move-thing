import React, {PropTypes} from 'react';
import {Column} from './Column';

export function Row(props) {
    return (
        <div className="card-row">
            <Column heading={true}>{props.title}</Column>
            {props.children}
        </div>
    );
}

Row.propTypes = {
    title: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element)
};
