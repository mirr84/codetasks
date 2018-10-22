import {ACTION_SETTER} from "../actions/actionConst";
import {getLocalStorage} from "../utils/getLocalStorage";

const initState = {
    select: ''
}

export const startMenuReducer = (state = getLocalStorage('startMenuReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.reducer === 'startMenuReducer') {
        if (action.type === ACTION_SETTER) {
            newState = Object.assign(state, action.payload);
        }
    }

    return newState;

}