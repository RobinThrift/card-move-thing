
import {Map} from 'immutable';
import {ADD_CARD, UPDATE_CARD, REMOVE_CARD, REORDER_CARD} from '../actions/cards.js';

function sortCards(c1, c2) {
    return c1.order - c2.order;
}

function normalizeOrders(card, id, map) {
    return Object.assign({}, card, {
        order: map
            .filter((c) => {
                return card.column === c.column
                    && card.row === c.row;
            })
            .takeWhile((c) => {
                return card.id !== c.id;
            }).size + 1
    });
}

function switchValues(a, b, field) {
    return [
        Object.assign({}, a, {[field]: b[field]}),
        Object.assign({}, b, {[field]: a[field]})
    ];
}

export function cardReducer(cards = new Map(), action) {
    switch (action.type) {
        case ADD_CARD:
            return cards.set(action.card.id, action.card).sort(sortCards).map(normalizeOrders);
        case UPDATE_CARD:
            if (cards.has(action.id)) {
                return cards.set(action.id, action.card).sort(sortCards).map(normalizeOrders);
            }
            return cards;
        case REMOVE_CARD:
            return cards.delete(action.id, action.card).sort(sortCards);
        case REORDER_CARD:
            let {card, otherCard} = action;
            if (card.column !== otherCard.column || card.row !== otherCard.row) {
                card = Object.assign({}, card, {order: otherCard.order});
            }

            if (card.column !== otherCard.column) {
                card = Object.assign({}, card, {column: otherCard.column});
            }

            if (card.row !== otherCard.row) {
                card = Object.assign({}, card, {row: otherCard.row});
            }

            let [mutCard, mutOtherCard] = switchValues(card, otherCard, 'order');
            return cards
                .set(card.id, mutCard)
                .set(otherCard.id, mutOtherCard)
                .sort(sortCards)
                .map(normalizeOrders);
        default:
            return cards;
    }
}
