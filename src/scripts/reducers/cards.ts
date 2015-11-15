/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path='../../../node_modules/immutable/dist/immutable.d.ts'/>
import {assign} from 'lodash';
import {Map} from 'immutable';
import {ADD_CARD, UPDATE_CARD, REMOVE_CARD, REORDER_CARD} from '../actions/cards';

function sortCards(c1, c2) {
    return c1.order - c2.order;
}

function normalizeOrders(card, id, map) {
    return assign({}, card, {
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
        assign({}, a, {[field]: b[field]}),
        assign({}, b, {[field]: a[field]})
    ];
}

export function cardReducer(cards = Map(), action) {
    switch (action.type) {
        case ADD_CARD:
            return cards.set(action.card.id, action.card).sort(sortCards).map(normalizeOrders);
        case UPDATE_CARD:
            if (cards.has(action.id)) {
                return cards.set(action.id, action.card).sort(sortCards).map(normalizeOrders);
            }
            return cards;
        case REMOVE_CARD:
            return cards.delete(action.id).sort(sortCards);
        case REORDER_CARD:
            let {card, otherCard} = action;
            if (otherCard.order < card.order) {
                card = assign({}, card, {order: otherCard.order});
                otherCard = assign({}, otherCard, {order: otherCard.order + 1});
            } else {
                card = assign({}, card, {order: otherCard.order + 1});
            }

            if (card.column !== otherCard.column) {
                card = assign({}, card, {column: otherCard.column});
            }

            if (card.row !== otherCard.row) {
                card = assign({}, card, {row: otherCard.row});
            }

            return cards
                .set(card.id, card)
                .set(otherCard.id, otherCard)
                .sort(sortCards)
                .map(normalizeOrders);
        default:
            return cards;
    }
}
