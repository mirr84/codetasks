import axios from "axios";
import md5 from 'md5';

export const doReg = (props) => {

    props.dispatch.setter('loginReducer', {isProgressReg: true});

    return axios.post('/auth/reg',
        {
            login: props.state.loginReducer.login,
            password: md5(props.state.loginReducer.password),
            email: props.state.loginReducer.email
        })
        .then(
            resp => {
                alert('регистрация прошла успешно');
                props.dispatch.setter('startMenuReducer', {select: 'auth'});
                props.dispatch.setter('loginReducer', {password: '', email: ''});
            },
            err => {
                alert('login  или пароль не уникальны');
            }
        )
        .then(
            (r) => {
                props.dispatch.setter('loginReducer', {isProgressReg: false});
                return r;
            }
        )

}

export const doLogin = (props) => {

    props.dispatch.setter('loginReducer', {isProgressAuth: true});

    return axios.post('/auth/auth',
        {
            login: props.state.loginReducer.login,
            password: md5(props.state.loginReducer.password)
        })
        .then(
            resp => {
                alert('авторизация прошла успешно');
                props.dispatch.setter('loginReducer', {isAuth: true, token: resp.data});
                props.dispatch.setter('startMenuReducer', {select: 'tasks'});
            },
            err => {
                alert('ошибка в login или password');
                props.dispatch.setter('loginReducer', {isAuth: false, token: ''});
            }
        )
        .then(
            (r) => {
                props.dispatch.setter('loginReducer', {isProgressAuth: false, password: ''});
                return r;
            }
        )

}

export const checkToken = (props) => {

    if (!props.state.loginReducer.token) {
        return Promise.resolve({});
    }

    return axios.post('/auth/check',
        {
            token: props.state.loginReducer.token
        })
        .then(
            resp => {
            },
            err => {
                props.dispatch.setter('loginReducer', {login: '', password: '', isAuth: false, email: '', token: '', isProgressReg: false});
                props.dispatch.setter('startMenuReducer', {select: ''});
            }
        )
        .then(
            (r) => {
                props.dispatch.setter('loginReducer', {password: ''});
                return r;
            }
        )

}
