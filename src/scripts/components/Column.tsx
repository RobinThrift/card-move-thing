/// <reference path="../../../typings/tsd.d.ts" />
import * as React from 'react';
import {DropTarget} from 'react-dnd';
import {CARD_DRAG_TYPE} from './ReorderableCard';
import {FLOATING_CARD_DRAG_TYPE} from './FloatingCard';
import {HeaderEditor} from './HeaderEditor';

export type ColumnProps = {
    heading?: boolean,
    children?: string,
    column?: number,
    row?: number,
    connectDropTarget?: Function,
    key?: string,
    onChange: Function
}

type ColumnState = {
    editing: boolean
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
        let item = monitor.getItem();
        if (item.action === 'NEW_CARD') {
            item.data.column = props.column;
            item.data.row = props.row;
            return item;
        } else {
            return {data: {row: props.row, column: props.column}, action: 'CHANGE_COLUMN'};
        }
    }
};

function collect(connect) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

@DropTarget([CARD_DRAG_TYPE, FLOATING_CARD_DRAG_TYPE], columnTarget, collect)
export class Column extends React.Component<ColumnProps, ColumnState> {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
    }

    onClick() {
        this.setState({editing: !this.state.editing});
    }

    onEditingDone(e) {
        this.props.onChange(e);
        this.setState({editing: false});
    }

    onEditingCancelled() {
        this.setState({editing: false});
    }

    render() {
        let props = this.props;
        let classList = 'card-column';
        classList += (props.heading) ? ' card-column--header' : '';

        let content = (props.heading) ? (<span>{props.children}</span>) : props.children;
        if (!this.state.editing) {
            return props.connectDropTarget((
                <div className={classList} onClick={this.onClick.bind(this)}>
                    {content}
                </div>
            ));
        } else {
            classList += ' editing';
            return (
                <div className={classList} onClick={this.onClick.bind(this)}>
                    <HeaderEditor
                        value={this.props.children}
                        onEditingDone={this.onEditingDone.bind(this)}
                        onEditingCancelled={this.onEditingCancelled.bind(this)}
                    />
                </div>
            );
        }
    }
}
