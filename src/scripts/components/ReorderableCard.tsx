/// <reference path="../../../typings/tsd.d.ts" />
import * as React from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import {Card, CardProps} from './Card';

interface ReorderableCardProps extends CardProps {
    onDragEnd?: Function;
    connectDragSource: Function;
    connectDropTarget: Function;
}

class ReorderableCardComp extends React.Component<ReorderableCardProps, {}> {
    render() {
        let {connectDragSource, connectDropTarget} = this.props;

        return connectDragSource(connectDropTarget(((
            <div>
                <Card {...this.props}>
                    {this.props.children}
                </Card>
            </div>
        ))));
    }

    // tslint is being an arse -.-
    /* tslint:disable */
    static defaultProps = {
        onDragEnd: () => {},
        onChange: () => {}
    }
    /* tslint:enable */
}

export const CARD_DRAG_TYPE = 'CARD_DRAG_TYPE';

function collectSource(connect) {
    return {
        connectDragSource: connect.dragSource()
    };
}

let cardSource = {
    beginDrag(props) {
        return {data: {id: props.id}, action: 'REORDER'};
    },

    endDrag(props, monitor) {
        if (!monitor.didDrop()) {
            return;
        }
        props.onDragEnd(monitor.getDropResult());
    }
};

let cardTarget = {
    canDrop() {
        return true;
    },
    drop(props) {
        return {data: {id: props.id}, action: 'REORDER'};
    }
};

function collectDrop(connect) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

export let ReorderableCard = DropTarget(CARD_DRAG_TYPE, cardTarget, collectDrop)(DragSource(CARD_DRAG_TYPE, cardSource, collectSource)(ReorderableCardComp));
