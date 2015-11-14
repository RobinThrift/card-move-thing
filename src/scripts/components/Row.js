import React, {PropTypes} from 'react';
import {Column} from './Column';

export function Row(props) {
    let className = (props.header) ? 'card-row--header' : 'card-row';

    return (
        <div className={className}>
            <Column heading={true}>{props.title}</Column>
            {props.children}
        </div>
    );
}

Row.propTypes = {
    title: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element),
    header: PropTypes.bool
};
