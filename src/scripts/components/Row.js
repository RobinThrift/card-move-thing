import React, {PropTypes} from 'react';
import {Column} from './Column';

export function Row(props) {
    if (props.header) {
        return (
            <div className="card-row--header">
                <Column heading={true}></Column>
                {props.children}
            </div>
        )
    } else {
        return (
            <div className="card-row">
                <Column heading={true}>{props.title}</Column>
                {props.children}
            </div>
        );
    }
}

Row.propTypes = {
    title: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element),
    header: PropTypes.bool
};
