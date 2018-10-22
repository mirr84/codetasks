import React from 'react';

import {connector} from "../../store/utils/connector";
import lifecycle from 'react-pure-lifecycle';
import StartMenu from "../StartMenu/StartMenu";

import Auth from "../Auth/Auth";
import Reg from "../Reg/Reg";
import News from "../News/News";
import Rating from "../Rating/Rating";
import Tasks from "../Tasks/Tasks";
import {checkToken} from "../../services/serviceAuth";

const methods = {
    componentDidMount(props) {
        checkToken(props);
    }
}

const App = ({state, dispatch}) => {
    return (
        <div>

            <StartMenu subComponent={
                state.startMenuReducer.select === 'auth' ? <Auth /> :
                    state.startMenuReducer.select === 'reg' ? <Reg /> :
                        state.startMenuReducer.select === 'news' ? <News /> :
                            state.startMenuReducer.select === 'rating' ? <Rating /> :
                                state.startMenuReducer.select === 'tasks' ? <Tasks /> : ''
            } />

        </div>
    );
}

export default connector(lifecycle(methods)(App));
