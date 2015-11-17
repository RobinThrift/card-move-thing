/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../react-dnd-html5-backend.d.ts" />
/// <reference path='../../../node_modules/immutable/dist/immutable.d.ts'/>
import * as React from 'react';
import {connect} from 'react-redux';

import {assign} from 'lodash';

import {DragDropContext} from 'react-dnd';
import HTML5Backend = require('react-dnd-html5-backend');

import {FloatingActionButton, FontIcon} from 'material-ui';

import * as uuid from 'node-uuid';

import {Row} from './Row';
import {Column} from './Column';
import {CreateBoardDialog} from './CreateBoardDialog';
import {ReorderableCard} from './ReorderableCard';
import {FloatingCard} from './FloatingCard';

import {updateCard, reorderCard, removeCard, addCard} from '../actions/cards';
import * as columnActions from '../actions/columns';

import {createDocument} from '../services/collaborative';

import {Card as CardType} from '../types/Card';
import {Map} from 'immutable';
type AppProps = {
    onDocumentNameSet: (id: string) => any,
    rows: Map<string, any>,
    columns: Map<string, any>,
    cards: Map<string, any>,
    dispatch: Function
};

type AppState = {
    newCard?: CardType,
    isNew?: boolean
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            newCard: null
        };

        let documentIdMatcher = window.location.pathname.match(/\/b\/([^\/]+)/);
        if (documentIdMatcher) {
            this.state.isNew = false;
            this.props.onDocumentNameSet(documentIdMatcher[1]);
        } else {
            this.state.isNew = true;
        }
    }

    createBoard(id: string) {
        this.props.onDocumentNameSet(id);
        this.setState({isNew: false});
    }

    onAddCardClick() {
        this.setState({
            newCard: {
                id: uuid.v4(),
                order: 0,
                row: 0,
                column: 0,
                content: ''
            }
        });
    }

    render() {
        let {rows, columns, cards, dispatch} = this.props;

        let headerCols = columns.map((col) => {
            return (
                <Column key={col.id}>
                    {col.title}
                </Column>
            );
        }).toArray();

        let addColumnHandler = () => {
            let column = {id: uuid.v4(), title: 'New column', order: columns.count() + 1};
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
            return (event) => {
                switch (event.action) {
                    case 'NEW_CARD':
                        this.setState({newCard: null});
                        return dispatch(addCard(event.data));
                    case 'REORDER':
                        return dispatch(reorderCard(card, cards.get(event.data.id)));
                    case 'CHANGE_COLUMN':
                        let c = assign({}, card, event.data) as CardType;
                        return dispatch(updateCard(c.id, c));
                }
            };
        };

        let onCardChangeHandler = (card) => {
            return (newContent) => {
                let c = assign({}, card, newContent) as CardType;
                if (c.content.trim().length === 0) {
                    dispatch(removeCard(c.id));
                } else {
                    dispatch(updateCard(c.id, c));
                }
            };
        };

        let rowEls = rows.map((row) => {
            let rowCols = columns.map((col) => {
                let colCards = cards
                    .filter((c) => { return c.row === row.order && c.column === col.order; })
                    .sort((c1, c2) => c1.order - c2.order)
                    .map((c) => {
                        return (
                            <ReorderableCard
                                title={c.title}
                                color={c.color}
                                key={c.id}
                                onDragEnd={onDragEndHandler(c)}
                                onChange={onCardChangeHandler(c)}
                                id={c.id}
                            >
                                {c.content}
                            </ReorderableCard>
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
                <div>
                    {header}
                    {rowEls}
                </div>
                {(this.state.newCard) ?
                    <FloatingCard
                        onDragEnd={onDragEndHandler(this.state.newCard)}
                        onChange={onCardChangeHandler(this.state.newCard)}
                        id={this.state.newCard.id} />
                :
                    <FloatingActionButton onClick={this.onAddCardClick.bind(this)} style={{
                        position: 'absolute',
                        right: '22px',
                        bottom: '22px'
                    }}>
                        <FontIcon className="material-icons">add</FontIcon>
                    </FloatingActionButton>
                }
                <CreateBoardDialog open={this.state.isNew} onBoardCreate={this.createBoard.bind(this)} />
            </div>
        );
    }
}

export let Application = DragDropContext(HTML5Backend)(connect((s) => {return s;})(App));
