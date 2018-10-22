import {combineReducers} from 'redux';

import {loginReducer} from "./loginReducer";
import {startMenuReducer} from "./startMenuReducer";
import {tasksReducer} from "./tasksReducer";

export default combineReducers(
    {
        startMenuReducer,
        loginReducer,
        tasksReducer
    }
);