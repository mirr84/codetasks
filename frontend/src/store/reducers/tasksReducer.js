import {ACTION_SETTER} from "../actions/actionConst";
import {getLocalStorage} from "../utils/getLocalStorage";

const initState = {
    isProgressGet: false,
    list: []
}

export const tasksReducer = (state = getLocalStorage('tasksReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.reducer === 'tasksReducer') {
        if (action.type === ACTION_SETTER) {
            newState = Object.assign(state, action.payload);
        }
    }

    return newState;

}