import React, {PropTypes, Component} from 'react';
import {DragSource} from 'react-dnd';
import Markdown from 'react-markdown';

import {CardEditor} from './CardEditor';

class CardComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            editableContent: props.children
        };
    }

    onClick() {
        if (!this.state.editing) {
            this.setState({editing: !this.state.editing});
        }
    }

    onEditingDone(e) {
        this.props.onChange(e);
        this.setState({editing: false});
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
                <div className={classList}>
                    <CardEditor value={this.props.children} onEditingDone={this.onEditingDone.bind(this)}/>
                </div>
            );
        }

        return connectDragSource((
            <div className={classList} onClick={this.onClick.bind(this)}>
                <div className="card-card__content">
                    <Markdown source={this.props.children} />
                </div>
            </div>
        ));
    }
}

CardComp.propTypes = {
    color: PropTypes.string,
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
