
import React from 'react';
import {connect} from 'react-redux';

import {Row} from './Row';
import {Column} from './Column';
import {Card} from './Card';

import {updateCard} from '../actions/cards';

function App(props) {
    let {rows, columns, cards, dispatch} = props;

    let headerCols = columns.map((col) => {
        return (
            <Column key={col.title}>
                {col.title}
            </Column>
        );
    }).toJS();

    let header = (
        <Row header={true}>
            {headerCols}
        </Row>
    );

    let onClickHandler = (card) => {
        let c = Object.assign({}, card, {color: 'red'});
        return () => {
            console.log(card);
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
                        <Card title={c.title} color={c.color} key={c.id} onClick={onClickHandler(c)}>
                            {c.content}
                        </Card>
                    );
                }).toJS();

            return (
                <Column key={col.title}>
                    {colCards}
                </Column>
            );
        }).toJS();

        return (
            <Row title={row.title} key={row.title}>
                {rowCols}
            </Row>
        );
    }).toJS();

    return (
        <div>
          {header}
          {rowEls}
        </div>
    );
}


export let Application = connect((s) => {return s;})(App);
