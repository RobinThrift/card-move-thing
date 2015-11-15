/// <reference path="../../../typings/tsd.d.ts" />
import * as React from 'react';
import {Column, ColumnProps} from './Column';

type RowProps = {
    title?: string,
    children?: React.ReactElement<ColumnProps>[],
    header?: boolean,
    key?: string
}

// this should be a stateless component, but can't due to TS nonsense
export class Row extends React.Component<RowProps, {}> {
    render() {
        let props = this.props;
        let className = (props.header) ? 'card-row--header' : 'card-row';
        return (
            <div className={className}>
                <Column heading={true}>{props.title}</Column>
                {props.children}
            </div>
        );
    }
}
