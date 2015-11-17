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
import {Card} from './Card';
import {CreateBoardDialog} from './CreateBoardDialog';

import {updateCard, reorderCard, removeCard} from '../actions/cards';
import * as columnActions from '../actions/columns';

import {createDocument} from '../services/collaborative';

import {Map} from 'immutable';
type AppProps = {
    onDocumentNameSet: (id: string) => any,
    rows: Map<string, any>,
    columns: Map<string, any>,
    cards: Map<string, any>,
    dispatch: Function
};

import {Card as CardType} from '../types/Card';

class App extends React.Component<AppProps, {isNew: boolean}> {
    constructor(props: AppProps) {
        super(props);
              
        let documentIdMatcher = window.location.pathname.match(/\/b\/([^\/]+)/);
        if (documentIdMatcher) {
            this.state = {isNew: false};
            this.props.onDocumentNameSet(documentIdMatcher[1]);
        } else {
            this.state = {isNew: true};
        }
    }
    
    createBoard(id: string) {
        this.props.onDocumentNameSet(id);
        this.setState({isNew: false});
    }
    
    onAddCardClick() {
        //TODO actually add a card
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
                if (event.action === 'REORDER') {
                    dispatch(reorderCard(card, cards.get(event.data.id)));
                } else if (event.action === 'CHANGE_COLUMN') {
                    let c = assign({}, card, event.data) as CardType;
                    dispatch(updateCard(c.id, c));
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
                            <Card
                                title={c.title}
                                color={c.color}
                                key={c.id}
                                onDragEnd={onDragEndHandler(c)}
                                onChange={onCardChangeHandler(c)}
                                id={c.id}
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
                <FloatingActionButton onClick={this.onAddCardClick.bind(this)} style={{
                    position: 'absolute',
                    right: '22px',
                    bottom: '22px'
                }}>
                    <FontIcon className="material-icons">add</FontIcon>
                </FloatingActionButton>
                
                <CreateBoardDialog open={this.state.isNew} onBoardCreate={this.createBoard.bind(this)} />
            </div>
        );
    }
}

export let Application = DragDropContext(HTML5Backend)(connect((s) => {return s;})(App));
