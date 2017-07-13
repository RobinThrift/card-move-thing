/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path='../../../node_modules/immutable/dist/immutable.d.ts'/>
import * as React from 'react';

type HeaderEditorProps = {
    value: string,
    onEditingDone: Function,
    onEditingCancelled: Function
}

type HeaderEditorState = {
    editableContent: string
}

export class HeaderEditor extends React.Component<HeaderEditorProps, HeaderEditorState> {
    private el: HTMLInputElement;

    constructor(props) {
        super(props);
        this.state = {
            editableContent: props.value
        };
    }

    componentDidMount() {
        this.el.focus();
        this.el.selectionStart = this.el.selectionEnd = this.el.value.length;
    }

    onKeyDown(e) {
        if (e.keyCode === 13 && !e.shiftKey) { // shift + enter
            this.props.onEditingDone({
                content: e.target.value
            });
        } else if (e.keyCode === 27) { // esc
            this.props.onEditingCancelled();
        }
    }

    onContentChange(e) {
        this.setState({editableContent: e.target.value});
    }

    render() {
        return (
            <input
                type="text"
                className="card-header--editor"
                value={this.state.editableContent}
                onKeyDown={this.onKeyDown.bind(this)}
                onChange={this.onContentChange.bind(this)}
                ref={(el: HTMLInputElement) => {this.el = el;}}
            />
        );
    }
}
