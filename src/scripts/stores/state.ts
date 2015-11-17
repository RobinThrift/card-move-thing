/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path='../../../node_modules/immutable/dist/immutable.d.ts'/>
import {createStore} from 'redux';
import {appReducers} from '../reducers';

import {Map} from 'immutable';
import {Row} from '../types/Row';
import {Column} from '../types/Column';
import {Card} from '../types/Card';

export type State = {
    rows: Map<string, Row>,
    columns: Map<string, Column>,
    cards: Map<string, Card>
}

export type SharedState = {
    rows: Map<string, Row>,
    columns: Map<string, Column>,
    cards: Map<string, Card>
}

import mockData from '../mockData';

export let state = createStore(appReducers, mockData);
