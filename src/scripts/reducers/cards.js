
import {Map} from 'immutable';
import {ADD_CARD, UPDATE_CARD, REMOVE_CARD} from '../actions/cards.js';

function sortCards(c1, c2) {
    return c2.sort - c1.sort;
}

export function cardReducer(cards = new Map(), action) {
    switch (action.type) {
        case ADD_CARD:
            return cards.set(action.card.id, action.card).sort(sortCards);
        case UPDATE_CARD:
            if (cards.has(action.id)) {
                return cards.set(action.id, action.card);
            }
            return cards;
        case REMOVE_CARD:
            return cards.delete(action.id, action.card).sort(sortCards);
        default:
            return cards;
    }
}
