
import {createStore} from 'redux';
import {appReducers} from '../reducers';

import _mockData from '../mockData';

export let state = createStore(appReducers, _mockData);

