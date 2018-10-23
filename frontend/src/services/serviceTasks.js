import axios from "axios";
import md5 from 'md5';

export const getTasks = (props) => {

    props.dispatch.setter('tasksReducer', {isProgressGet: true});

    return axios.post('/tasks/get',
        {
            token: props.state.loginReducer.token
        })
        .then(
            resp => {
                props.dispatch.setter('tasksReducer', {list: resp.data});
            },
            err => {
                alert('ошибка авторизации');
            }
        )
        .then(
            (r) => {
                props.dispatch.setter('tasksReducer', {isProgressGet: false});
                return r;
            }
        )

}

export const setTaskResult = (props, task) => {

    props.dispatch.setter('tasksReducer', {isProgressGet: true});

    return axios.post('/tasks/set',
        {
            token: props.state.loginReducer.token,
            task
        })
        .then(
            resp => {

            },
            err => {
                alert('ошибка авторизации');
            }
        )
        .then(
            (r) => {
                getTasks(props);
                return r;
            }
        )

}