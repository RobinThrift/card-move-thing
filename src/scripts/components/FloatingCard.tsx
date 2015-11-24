/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../react-markdown.d.ts" />
/// <reference path='../../../node_modules/immutable/dist/immutable.d.ts'/>
import * as React from 'react';
import {DragSource} from 'react-dnd';
import {Card, CardProps} from './Card';

interface FloatingCardProps extends CardProps {
    onDragEnd?: Function;
    connectDragSource: Function;
}

type FloatingCardState = {
    content: string
}

class FloatingCardComp extends React.Component<FloatingCardProps, FloatingCardState> {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }

    onChange({content}) {
        this.setState({
            content
        });
    }

    render() {
        let {connectDragSource} = this.props;

        return connectDragSource(((
            <div>
                <Card {...this.props}
                    editing={true}
                    className="card-card--floating"
                    onChange={this.onChange.bind(this)}
                >
                    {this.state.content}
                </Card>
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

export const FLOATING_CARD_DRAG_TYPE = 'FLOATING_CARD_DRAG_TYPE';

function collect(connect) {
    return {
        connectDragSource: connect.dragSource()
    };
}

let source = {
    beginDrag(props, monitor, comp) {
        return {data: {id: props.id, content: comp.state.content}, action: 'NEW_CARD'};
    },

    endDrag(props, monitor) {
        if (!monitor.didDrop()) {
            return;
        }
        props.onDragEnd(monitor.getDropResult());
    }
};

export let FloatingCard = DragSource(FLOATING_CARD_DRAG_TYPE, source, collect)(FloatingCardComp);
