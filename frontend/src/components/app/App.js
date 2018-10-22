import React from 'react';

import {connector} from "../../store/utils/connector";
import lifecycle from 'react-pure-lifecycle';
import {Modal, ModalBody, Container, Row, Col, Card, CardBody, CardTitle, CardText} from "reactstrap";

const methods = {
    componentDidMount(props) {
    }
}

const App = () => {
    return (
        <div>

            <Modal isOpen={true} size={'lg'} centered={true} fade={false}>
                <ModalBody>
                    <Container>
                        <Row>
                            <Col>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Авторизация</CardTitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Регистрация</CardTitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <br/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Новости</CardTitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Что то еще</CardTitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
            </Modal>

        </div>
    );
}

export default connector(lifecycle(methods)(App));
