import React from 'react';

import {connector} from "../../store/utils/connector";
import lifecycle from 'react-pure-lifecycle';
import {Col, Form, FormGroup, Label, Input, Button} from "reactstrap";

import {doLogin} from "../../services/serviceAuth";
import LoadingOverlay from "react-loading-overlay";

const methods = {
    componentDidMount(props) {
    }
}

const Auth = ({state, dispatch}) => {
    return (
        <div>

            <LoadingOverlay
                active={state.loginReducer.isProgressAuth}
                background={'#f0f8ffbd'}
                color={'black'}
                spinner
                text='Вход в систему'
            >

            <Form onSubmit={(e) => {
                e.preventDefault();
                doLogin({state, dispatch});
            }}>

                <FormGroup row>
                    <Label for="login" sm={2}>Логин</Label>
                    <Col sm={10}>
                        <Input bsSize="sm" type="text" name="login" id="login" placeholder="Логин"
                               value={state.loginReducer.login}
                               onChange={
                                   (e) => dispatch.setter('loginReducer', {login: e.target.value})
                               }
                        />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="password" sm={2}>Пароль</Label>
                    <Col sm={10}>
                        <Input bsSize="sm" type="password" name="password" id="password" placeholder="Пароль"
                               value={state.loginReducer.password}
                               onChange={(e) => dispatch.setter('loginReducer', {password: e.target.value}) }
                        />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Col sm={{size: 10, offset: 2}}>
                        <Button size="sm"
                                disabled={!state.loginReducer.login || !state.loginReducer.password}>
                            Войти
                        </Button>
                    </Col>
                </FormGroup>

            </Form>

            </LoadingOverlay>

        </div>
    );
}

export default connector(lifecycle(methods)(Auth));
