import React, {PropTypes, Component} from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import Markdown from 'react-markdown';

class CardComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            editableTitle: props.title,
            editableContent: props.children
        };
    }

    onDoubleClick() {
        if (!this.state.editing) {
            this.setState({editing: !this.state.editing});
        }
    }

    onKeyDown(event) {
        if (this.state.editing) {
            if (event.keyCode === 13 && !event.shiftKey) {
                this.setState({editing: false});
                this.props.onChange({
                    title: this.state.editableTitle,
                    content: this.state.editableContent
                });
            }
        }
    }

    onTitleChange(e) {
        this.setState({editableTitle: e.target.value});
    }

    onContentChange(e) {
        this.setState({editableContent: e.target.value});
    }

    render() {
        let classList = 'card-card';
        if (this.props.color) {
            classList += ' ' + this.props.color;
        }

        let {connectDragSource, connectDropTarget} = this.props;

        if (this.state.editing) {
            classList += ' editing';
            return (
                <div className={classList}>
                    <input
                        className="card-card__header--editor"
                        type="text" value={this.state.editableTitle}
                        onChange={this.onTitleChange.bind(this)}
                        onKeyDown={this.onKeyDown.bind(this)}
                    />
                    <textarea
                        className="card-card__content--editor"
                        value={this.state.editableContent}
                        onChange={this.onContentChange.bind(this)}
                        onKeyDown={this.onKeyDown.bind(this)}></textarea>
                </div>
            );
        }

        return connectDragSource(connectDropTarget((
            <div className={classList} onClick={this.onDoubleClick.bind(this)}>
                <h3 className="card-card__header">{this.props.title}</h3>
                <div className="card-card__content">
                    <Markdown source={this.props.children} />
                </div>
            </div>
        )));
    }
}

CardComp.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
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
