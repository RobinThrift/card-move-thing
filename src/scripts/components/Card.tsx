/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../react-markdown.d.ts" />
/// <reference path='../../../node_modules/immutable/dist/immutable.d.ts'/>
import * as React from 'react';
import * as Markdown from 'react-markdown';

export interface CardProps {
    title: string;
    children?: string;
    onChange?: Function;
    onEditingCancelled?: Function;
    color?: string;
    className: string;
};

type CardState = {
    editing?: boolean,
    editableContent?: string,
    editableTitle?: string
};

import {CardEditor} from './CardEditor';

const COLORS = ['red', 'green', 'blue', 'yellow', 'orange', 'rainbow'];

export class Card extends React.Component<CardProps, CardState> {
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

    onEditingCancelled() {
        this.props.onEditingCancelled();
        this.setState({editing: false});
    }

    render() {
        let classList = 'card-card ' + this.props.className;

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

        markdown = markdown.replace(attributeMatcher, '');

        if (this.state.editing) {
            classList += ' editing';
            return (
                <div className={classList}>
                    <CardEditor
                        value={this.props.children}
                        onEditingDone={this.onEditingDone.bind(this)}
                        onEditingCancelled={this.onEditingCancelled.bind(this)} />
                </div>
            );
        }

        return (
             <div className={classList} onClick={this.onClick.bind(this)}>
                 <div className="card-card__content">
                    <Markdown source={markdown} />
                 </div>
             </div>
        );
    }

    // tslint is being an arse -.-
    /* tslint:disable */
    static defaultProps = {
        onChange: () => {},
        onEditingCancelled: () => {},
        className: ''
    }
    /* tslint:enable */
}
