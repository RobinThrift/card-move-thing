/// <reference path="../../typings/tsd.d.ts" />
/// <reference path='../../node_modules/immutable/dist/immutable.d.ts'/>
import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Application} from './components/App';
import {state, SharedState, State} from './stores/state';

import {createDocument} from './services/collaborative';

import {syncCards} from './actions/cards';
import {syncColumns} from './actions/columns';
import {syncRows} from './actions/rows';
import {Map} from 'immutable';
import {Store} from 'redux';

let stateToJS = (store: Store) => {
  let s: State = store.getState();
  return {
    rows: s.rows.toJS(),
    columns: s.columns.toJS(),
    cards: s.cards.toJS()
  };
};

let connectToDocument = (documentId) => {
    createDocument<SharedState>(documentId, stateToJS(state), (newState) => {
        state.dispatch(syncCards(newState.cards));
        state.dispatch(syncColumns(newState.columns));
        state.dispatch(syncRows(newState.rows));
    }).then((doc) => {
        state.subscribe(() => doc.publish(stateToJS(state)));
    });

    window.history.replaceState(null, null, '/b/' + documentId);
};

render(
    (
        <Provider store={state}>
            <Application onDocumentNameSet={connectToDocument} />
        </Provider>
    ),
    document.getElementById('react-target')
);
