import React, {PropTypes} from 'react';
import {DragSource} from 'react-dnd';

function CardComp(props) {
    let classList = 'card-card';
    if (props.color) {
        classList += ' ' + props.color;
    }

    let {connectDragSource} = props;

    return connectDragSource((
        <div className={classList} onClick={props.onClick}>
            <h3 className="card-card__header">{props.title}</h3>
            {props.children}
        </div>
    ));
}

CardComp.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.string,
    onClick: PropTypes.func,
    onDragEnd: PropTypes.func
};

CardComp.defaultProps = {
    onDragEnd: () => {}
};

export const CARD_DRAG_TYPE = 'CARD_DRAG_TYPE';

function collect(connect) {
    return {
        connectDragSource: connect.dragSource()
    };
}

let cardSource = {
    beginDrag(props) {
        return {id: props.id};
    },

    endDrag(props, monitor) {
        if (!monitor.didDrop()) {
            return;
        }
        props.onDragEnd(monitor.getDropResult());
    }
};

export let Card = DragSource(CARD_DRAG_TYPE, cardSource, collect)(CardComp);
