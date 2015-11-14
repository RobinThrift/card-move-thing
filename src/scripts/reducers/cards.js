
import {List} from 'immutable';
import {ADD_CARD, UPDATE_CARD, REMOVE_CARD} from '../actions/cards.js';

function sortCards(c1, c2) {
    return c2.sort - c1.sort;
}

export function cardReducer(cards = new List(), action) {
    switch (action.type) {
        case ADD_CARD:
            return cards.push(action.card).sort(sortCards);
        case UPDATE_CARD:
            return cards.set(action.id, action.card).sort(sortCards);
        case REMOVE_CARD:
            return cards.delete(action.id, action.card).sort(sortCards);
        default:
            return cards;
    }
}

