import * as React from 'react';

type CardEditorProps = {
    value: string,
    onEditingDone: Function,
    onEditingCancelled: Function
}

type CardEditorState = {
    editableContent: string
}

export class CardEditor extends React.Component<CardEditorProps, CardEditorState> {
    private el: HTMLTextAreaElement;
    constructor(props) {
        super(props);
        this.state = {
            editableContent: props.value
        };
    };

    componentDidMount() {
        this.el.focus();
        this.el.selectionStart = this.el.selectionEnd = this.el.value.length;
        this.autoResize();
    };

    onKeyDown(e) {
        if (e.keyCode === 13 && !e.shiftKey) { // Shift + Enter
            this.props.onEditingDone({
                content: e.target.value
            });
        } else if (e.keyCode === 27) { // Esc
            this.props.onEditingCancelled();
        }
    };

    autoResize() {
        // auto-resize the textarea
        this.el.style.height = '10px';
        this.el.style.height = this.el.scrollHeight + 'px';
    };

    onContentChange(e) {
        this.setState({editableContent: e.target.value});
        this.autoResize();
    };

    render() {
        return (
            <textarea
                className="card-card__content--editor"
                value={this.state.editableContent}
                onKeyDown={this.onKeyDown.bind(this)}
                onChange={this.onContentChange.bind(this)}
                ref={(el: HTMLTextAreaElement) => {this.el = el;}}></textarea>
        );
    };
}
