
import React from 'react';
import {connect} from 'react-redux';

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import uuid from 'uuid';

import {Row} from './Row';
import {Column} from './Column';
import {Card} from './Card';

import {updateCard} from '../actions/cards';
import * as columnActions from '../actions/columns';

function App(props) {
    let {rows, columns, cards, dispatch} = props;

    let headerCols = columns.map((col) => {
        return (
            <Column key={col.id}>
                {col.title}
            </Column>
        );
    }).toArray();

    let addColumnHandler = () => {
        let column = {id: uuid.v4(), title: 'New column', order: props.columns.count()};
        dispatch(columnActions.addColumn(column));
    };

    headerCols.push(
        <Column key={uuid.v4()}>
            <span onClick={addColumnHandler.bind(this)}>+</span>
        </Column>
    );

    let header = (
        <Row header={true}>
            {headerCols}
        </Row>
    );

    let onDragEndHandler = (card) => {
        return (newPos) => {
            let c = Object.assign({}, card, newPos);
            dispatch(updateCard(c.id, c));
        };
    };

    let onCardChangeHandler = (card) => {
        return (newContent) => {
            let c = Object.assign({}, card, newContent);
            dispatch(updateCard(c.id, c));
        }
    }

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
                            onDragEnd={onDragEndHandler(c)}
                            onChange={onCardChangeHandler(c)}
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
