import React from 'react';
import ReactDOM from 'react-dom';

import {Row} from './components/Row';
import {Column} from './components/Column';
import {Card} from './components/Card';

class Application extends React.Component {
    render() {
        return (
            <div>
                <Row name="Test 1">
                    <Column>
                        <Card title="Test 1-1">
                            Test 1-1-1
                        </Card>
                    </Column>
                    <Column>
                        <Card title="Test 1-2">
                            Test 1-2-1
                        </Card>
                    </Column>
                </Row>
                <Row name="Test 2">
                    <Column>Test 2-1</Column>
                    <Column>Test 2-2</Column>
                </Row>
                <Row name="Test 3">
                    <Column>Test 3-1</Column>
                    <Column>Test 3-2</Column>
                </Row>
            </div>
        );
    }
}

ReactDOM.render(<Application />, document.getElementById('react-target'));
