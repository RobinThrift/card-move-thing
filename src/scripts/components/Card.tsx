/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../react-markdown.d.ts" />
/// <reference path='../../../node_modules/immutable/dist/immutable.d.ts'/>
import * as React from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import * as Markdown from 'react-markdown';

type CardProps = {
    title: string,
    children?: string,
    onChange?: Function,
    onDragEnd?: Function,
    color?: string,
    connectDragSource: Function,
    connectDropTarget: Function
};

type CardState = {
    editing?: boolean,
    editableContent?: string,
    editableTitle?: string
};

import {CardEditor} from './CardEditor';

const COLORS = ['red', 'green', 'blue', 'yellow', 'orange', 'rainbow'];

class CardComp extends React.Component<CardProps, CardState> {
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

        let attributes = {color: ''};
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

export let Card = DropTarget(CARD_DRAG_TYPE, cardTarget, collectDrop)(DragSource(CARD_DRAG_TYPE, cardSource, collectSource)(CardComp));
