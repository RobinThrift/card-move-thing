import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Application} from './components/App';

import {state} from './stores/state';

render(
    (
        <Provider store={state}>
            <Application />
        </Provider>
    ),
    document.getElementById('react-target')
);
