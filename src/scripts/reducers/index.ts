
import {combineReducers} from 'redux';
import {cardReducer as cards} from './cards';
import {rowReducer as rows} from './rows';
import {columnReducer as columns} from './columns';

export const appReducers = combineReducers({
    cards,
    rows,
    columns
});
