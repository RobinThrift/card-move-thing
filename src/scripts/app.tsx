/// <reference path="../../typings/tsd.d.ts" />
/// <reference path='../../node_modules/immutable/dist/immutable.d.ts'/>
import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Application} from './components/App';
import {state, State} from './stores/state';

import {createDocument} from './services/collaborative';

import {syncCards} from './actions/cards';
import {syncColumns} from './actions/columns';
import {syncRows} from './actions/rows';
import {Map} from 'immutable';

createDocument<State>(state.getState().id, state.getState(), (newState) => {
    state.dispatch(syncCards(newState.cards));
    state.dispatch(syncColumns(newState.columns));
    state.dispatch(syncRows(newState.rows));
}).then((doc) => {
    state.subscribe(() => {
        let s = state.getState();
        doc.publish({
            id: s.id,
            rows: s.rows.toJS(),
            columns: s.columns.toJS(),
            cards: s.cards.toJS()
        });
    });
});

render(
    (
        <Provider store={state}>
            <Application />
        </Provider>
    ),
    document.getElementById('react-target')
);
