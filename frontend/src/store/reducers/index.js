import {combineReducers} from 'redux';

import {loginReducer} from "./loginReducer";
import {startMenuReducer} from "./startMenuReducer";

export default combineReducers(
    {
        startMenuReducer,
        loginReducer
    }
);