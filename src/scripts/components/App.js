
import React from 'react';
import {connect} from 'react-redux';

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {Row} from './Row';
import {Column} from './Column';
import {Card} from './Card';

import {updateCard} from '../actions/cards';

function App(props) {
    let {rows, columns, cards, dispatch} = props;

    let headerCols = columns.map((col) => {
        return (
            <Column key={col.id}>
                {col.title}
            </Column>
        );
    }).toArray();

    let header = (
        <Row header={true}>
            {headerCols}
        </Row>
    );

    let onClickHandler = (card) => {
        let c = Object.assign({}, card, {color: 'red'});
        return () => {
            dispatch(updateCard(c.id, c));
        };
    };

    let onDragEndHandler = (card) => {
        return (newPos) => {
            let c = Object.assign({}, card, newPos);
            dispatch(updateCard(c.id, c));
        };
    };

    let rowEls = rows.map((row) => {
        let rowCols = columns.map((col) => {
            let colCards = cards
                .filter((c) => { return c.row === row.order && c.column === col.order; })
                .sort((c1, c2) => c1.order - c2.order)
                .map((c) => {
                    return (
                        <Card
                            title={c.title}
                            color={c.color}
                            key={c.id}
                            onClick={onClickHandler(c)}
                            onDragEnd={onDragEndHandler(c)}
                        >
                            {c.content}
                        </Card>
                    );
                }).toArray();

            return (
                <Column key={col.id} column={col.order} row={row.order}>
                    {colCards}
                </Column>
            );
        }).toArray();

        return (
            <Row title={row.title} key={row.id}>
                {rowCols}
            </Row>
        );
    }).toArray();

    return (
        <div>
          {header}
          {rowEls}
        </div>
    );
}


export let Application = DragDropContext(HTML5Backend)(connect((s) => {return s;})(App));
