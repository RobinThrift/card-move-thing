import React, {PropTypes, Component} from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import Markdown from 'react-markdown';

import {CardEditor} from './CardEditor';

const COLORS = ['red', 'green', 'blue', 'yellow', 'orange', 'rainbow'];

class CardComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            editableContent: props.children
        };
    }

    onClick(e) {
        if (e.target.tagName === 'A') { // don't start editing when a link is clicked
            e.target.target = '_blank';
        } else if (!this.state.editing) {
            this.setState({editing: !this.state.editing});
        }
    }

    onEditingDone(e) {
        this.props.onChange(e);
        this.setState({editing: false});
    }

    render() {
        let classList = 'card-card';

        let markdown = this.props.children;
        let attributeMatcher = /^\-\-\s+([^\s].*)\s*:\s+([^\s].*)/gm;

        let attributes = {};
        let attr = attributeMatcher.exec(markdown);
        while (attr) {
            attributes[attr[1]] = attr[2];
            attr = attributeMatcher.exec(markdown);
        }

        if (COLORS.indexOf(attributes.color) >= 0) {
            classList += ' ' + attributes.color;
        }

        markdown = markdown.replace(attributeMatcher, '')

        let {connectDragSource, connectDropTarget} = this.props;

        if (this.state.editing) {
            classList += ' editing';
            return (
                <div className={classList}>
                    <CardEditor value={this.props.children} onEditingDone={this.onEditingDone.bind(this)}/>
                </div>
            );
        }

        return connectDragSource(connectDropTarget((
            <div className={classList} onClick={this.onClick.bind(this)}>
                <div className="card-card__content">
                    <Markdown source={markdown} />
                </div>
            </div>
        )));
    }
}

CardComp.propTypes = {
    color: PropTypes.string,
    children: PropTypes.string,
    onDoubleClick: PropTypes.func,
    onDragEnd: PropTypes.func,
    onChange: PropTypes.func,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
};

CardComp.defaultProps = {
    onDragEnd: () => {},
    onChange: () => {}
};

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

export let Card = DropTarget(CARD_DRAG_TYPE, cardTarget, collectDrop)(DragSource(CARD_DRAG_TYPE, cardSource, collectSource)(CardComp));
