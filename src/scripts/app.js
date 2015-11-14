import React from 'react';
import ReactDOM from 'react-dom';

import _mockData from './mockData';

import {Row} from './components/Row';
import {Column} from './components/Column';
import {Card} from './components/Card';

class Application extends React.Component {
    render() {
        let {rows, columns, cards} = _mockData;

        let rowEls = rows.map((row) => {
            let rowCols = columns.map((col) => {
                let colCards = cards
                    .filter((c) => { return c.row === row.order && c.column === col.order; })
                    .map((c) => {
                        return (
                            <Card title={c.title} color={c.color} key={c.order}>
                                {c.content}
                            </Card>
                        );
                    });
                    // @TODO sort/order

                return (
                    <Column key={col.order}>
                        {colCards}
                    </Column>
                );
            });

            return (
                <Row title={row.title} key={row.order}>
                    {rowCols}
                </Row>
            );
        });

        return (
            <div>{rowEls}</div>
        );
    }
}

ReactDOM.render(<Application />, document.getElementById('react-target'));
