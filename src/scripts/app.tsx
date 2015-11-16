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

let stateToJS: (state: State) => SharedState = (state: State) => {
  let s: State = state.getState();
  return {
    rows: s.rows.toJS(),
    columns: s.columns.toJS(),
    cards: s.cards.toJS()
  };
};

createDocument<SharedState>('doc', stateToJS(state), (newState) => {
    state.dispatch(syncCards(newState.cards));
    state.dispatch(syncColumns(newState.columns));
    state.dispatch(syncRows(newState.rows));
}).then((doc) => {
    state.subscribe(() => doc.publish(stateToJS(state)));
});

render(
    (
        <Provider store={state}>
            <Application />
        </Provider>
    ),
    document.getElementById('react-target')
);
