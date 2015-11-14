
import {List} from 'immutable';
import {ADD_CARD, UPDATE_CARD, REMOVE_CARD} from '../actions/cards.js';

function sortCards(c1, c2) {
    return c2.sort - c1.sort;
}

export function cardReducer(cards = new Map(), action) {
    switch (action.type) {
        case ADD_CARD:
            return cards.set(action.card.id, action.card).value().sort(sortCards);
        case UPDATE_CARD:
            return cards.map((card) => {
                if (card.id === action.id) {
                    return action.card;
                }
                return card;
            });
        case REMOVE_CARD:
            return cards.delete(action.id, action.card).sort(sortCards);
        default:
            return cards;
    }
}
