import React from 'react';
import ReactDOM from 'react-dom';

class Application extends React.Component {
    render() {
        return (
            <h1>Hello World</h1>
        );
    }
}

ReactDOM.render(<Application />, document.getElementById('react-target'));
