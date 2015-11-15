
export const ADD_CARD = Symbol();
export const UPDATE_CARD = Symbol();
export const REMOVE_CARD = Symbol();
export const REORDER_CARD = Symbol();

export function addCard(card) {
    return {type: ADD_CARD, card};
}

export function updateCard(id, card) {
    return {type: UPDATE_CARD, id, card};
}

export function removeCard(id) {
    return {type: REMOVE_CARD, id};
}

export function reorderCard(card, otherCard) {
    return {type: REORDER_CARD, card, otherCard};
}
