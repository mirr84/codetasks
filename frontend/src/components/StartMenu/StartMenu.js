import React from 'react';

import {connector} from "../../store/utils/connector";
import lifecycle from 'react-pure-lifecycle';
import {Modal, ModalBody, Container, Row, Col, Card, CardBody, CardSubtitle, CardText} from "reactstrap";

const methods = {
    componentDidMount(props) {
    }
}

const StartMenu = ({state, dispatch, subComponent}) => {
    return (
        <div>

            <Modal isOpen={true} size={'lg'} centered={state.startMenuReducer.select === ''} fade={false}>
                <ModalBody>
                    <Container>
                        <Row>

                            {
                                state.loginReducer.isAuth ?
                                    <Col lg={state.startMenuReducer.select === '' ? 6 : 3}>
                                        <Card className={{
                                            'block-main-menu-margin': state.startMenuReducer.select === '',
                                            'block-main-menu': true
                                        }}
                                              onClick={() => dispatch.setter('startMenuReducer', {select: 'tasks'})}>
                                            <CardBody>
                                                <CardSubtitle>Задания</CardSubtitle>
                                                {
                                                    state.startMenuReducer.select === '' ?
                                                        <CardText>Тут список задач для решения</CardText> : ''
                                                }
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    :
                                    <Col lg={state.startMenuReducer.select === '' ? 6 : 3}>
                                        <Card className={{
                                            'block-main-menu-margin': state.startMenuReducer.select === '',
                                            'block-main-menu': true
                                        }}
                                              onClick={() => dispatch.setter('startMenuReducer', {select: 'auth'})}>
                                            <CardBody>
                                                <CardSubtitle>Авторизация</CardSubtitle>
                                                {
                                                    state.startMenuReducer.select === '' ?
                                                        <CardText>Если ты уже зарегистрирован, то тебе
                                                            сюда</CardText> : ''
                                                }
                                            </CardBody>
                                        </Card>
                                    </Col>
                            }

                            {
                                state.loginReducer.isAuth ? '' :
                                    <Col lg={state.startMenuReducer.select === '' ? 6 : 3}>
                                        <Card className={{
                                            'block-main-menu-margin': state.startMenuReducer.select === '',
                                            'block-main-menu': true
                                        }}
                                              onClick={() => dispatch.setter('startMenuReducer', {select: 'reg'})}>
                                            <CardBody>
                                                <CardSubtitle>Регистрация</CardSubtitle>
                                                {
                                                    state.startMenuReducer.select === '' ?
                                                        <CardText>Если ты еще не зарегистрирован, то тебе
                                                            сюда</CardText> : ''
                                                }
                                            </CardBody>
                                        </Card>
                                    </Col>
                            }

                            <Col lg={state.startMenuReducer.select === '' ? 6 : 3}>
                                <Card className={{
                                    'block-main-menu-margin': state.startMenuReducer.select === '',
                                    'block-main-menu': true
                                }}
                                      onClick={() => dispatch.setter('startMenuReducer', {select: 'news'})}>
                                    <CardBody>
                                        <CardSubtitle>Новости</CardSubtitle>
                                        {
                                            state.startMenuReducer.select === '' ?
                                                <CardText>Новости проекта, комментарии и общение</CardText> : ''
                                        }
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col lg={state.startMenuReducer.select === '' ? 6 : 3}>
                                <Card className={{
                                    'block-main-menu-margin': state.startMenuReducer.select === '',
                                    'block-main-menu': true
                                }}
                                      onClick={() => dispatch.setter('startMenuReducer', {select: 'rating'})}>
                                    <CardBody>
                                        <CardSubtitle>Рейтинг</CardSubtitle>
                                        {
                                            state.startMenuReducer.select === '' ?
                                                <CardText>Рейтинг, что тут ещё сказать, смотрим кто
                                                    круче</CardText> : ''
                                        }
                                    </CardBody>
                                </Card>
                            </Col>

                            {
                                state.loginReducer.isAuth ?
                                    <Col lg={state.startMenuReducer.select === '' ? 6 : 3}>
                                        <Card className={{
                                            'block-main-menu-margin': state.startMenuReducer.select === '',
                                            'block-main-menu': true
                                        }}
                                              onClick={() =>
                                                {
                                                    dispatch.setter('loginReducer', {login: '', password: '', isAuth: false, email: '', token: '', isProgressReg: false});
                                                    dispatch.setter('startMenuReducer', {select: ''});
                                                }
                                              }>
                                            <CardBody>
                                                <CardSubtitle>Выход</CardSubtitle>
                                                {
                                                    state.startMenuReducer.select === '' ?
                                                        <CardText>Жмахаем сюда что бы выйти из системы</CardText> : ''
                                                }
                                            </CardBody>
                                        </Card>
                                    </Col> : ''
                            }

                        </Row>
                        {
                            state.startMenuReducer.select !== '' ?
                                <Row>
                                    <Col>
                                        <Card className={'block-main-menu-margin'}>
                                            <CardBody>
                                                {subComponent}
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row> : ''
                        }
                    </Container>
                </ModalBody>
            </Modal>

        </div>
    );
}

export default connector(lifecycle(methods)(StartMenu));
