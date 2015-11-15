/// <reference path="../../../typings/tsd.d.ts" />
import * as React from 'react';
import {DropTarget} from 'react-dnd';
import {CARD_DRAG_TYPE} from './Card';

export type ColumnProps = {
    heading?: boolean,
    children?: string | React.ReactElement<any> | React.ReactElement<any>[],
    column?: number,
    row?: number,
    connectDropTarget?: Function,
    key?: string
}

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

@DropTarget(CARD_DRAG_TYPE, columnTarget, collect)
export class Column extends React.Component<ColumnProps, {}> {
    render() {
        let props = this.props;
        let classList = 'card-column';
        classList += (props.heading) ? ' card-column--header' : '';

        let content = (props.heading) ? (<span>{props.children}</span>) : props.children;
        return props.connectDropTarget((
            <div className={classList}>
                {content}
            </div>
        ));
    }
}
