import React from 'react';

import {connector} from "../../store/utils/connector";
import lifecycle from 'react-pure-lifecycle';

import {checkToken} from "../../services/serviceAuth";
import {getTasks} from "../../services/serviceTasks";
import LoadingOverlay from "react-loading-overlay";

const methods = {
    componentDidMount(props) {
        checkToken(props);
        getTasks(props);
    }
}

const Tasks = ({state, dispatch}) => {
    return (
        <div>

            <LoadingOverlay
                active={state.tasksReducer.isProgressGet}
                background={'#f0f8ffbd'}
                color={'black'}
                spinner
                text='Вход в систему'
            >

                {
                    JSON.stringify(state.tasksReducer.list)
                }

            </LoadingOverlay>

        </div>
    );
}

export default connector(lifecycle(methods)(Tasks));
