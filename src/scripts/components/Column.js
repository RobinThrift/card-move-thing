import React, {PropTypes} from 'react';
import {DropTarget} from 'react-dnd';
import {CARD_DRAG_TYPE} from './Card';

function ColumnProp(props) {
    let classList = 'card-column';
    classList += (props.heading) ? ' card-column--header' : '';

    let content = (props.heading) ? (<span>{props.children}</span>) : props.children;
    return props.connectDropTarget((
        <div className={classList}>
            {content}
        </div>
    ));
}

ColumnProp.propTypes = {
    heading: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]),
    column: PropTypes.number,
    row: PropTypes.number
};

let columnTarget = {
    canDrop(props) {
        // don't allow dropping in header cells
        return !props.heading && typeof props.row !== 'undefined';
    },
    drop(props, monitor) {
        if (monitor.didDrop()) {
            return;
        }
        /* eslint-disable */
        return {data: {row: props.row, column: props.column}, action: 'CHANGE_COLUMN'};
        /* eslint-enable */
    }
};

function collect(connect) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

export let Column = DropTarget(CARD_DRAG_TYPE, columnTarget, collect)(ColumnProp);
