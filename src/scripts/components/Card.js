import React, {PropTypes, Component} from 'react';
import {DragSource} from 'react-dnd';
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
        this.setState({editing: !this.state.editing});
        this.props.onChange({
            title: this.state.editableTitle,
            content: this.state.editableContent
        });
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

        let {connectDragSource} = this.props;

        if (this.state.editing) {
            classList += ' editing';
            return (
                <div className={classList} onDoubleClick={this.onDoubleClick.bind(this)}>
                    <input
                        className="card-card__header--editor"
                        type="text" value={this.state.editableTitle}
                        onChange={this.onTitleChange.bind(this)}
                    />
                    <textarea
                        className="card-card__content--editor"
                        value={this.state.editableContent}
                        onChange={this.onContentChange.bind(this)}></textarea>
                </div>
            );
        }

        return connectDragSource((
            <div className={classList} onDoubleClick={this.onDoubleClick.bind(this)}>
                <h3 className="card-card__header">{this.props.title}</h3>
                <div className="card-card__content">
                    <Markdown source={this.props.children} />
                </div>
            </div>
        ));
    }
}

CardComp.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.string,
    onDoubleClick: PropTypes.func,
    onDragEnd: PropTypes.func,
    onChange: PropTypes.func,
    connectDragSource: PropTypes.func.isRequired
};

CardComp.defaultProps = {
    onDragEnd: () => {},
    onChange: () => {}
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
