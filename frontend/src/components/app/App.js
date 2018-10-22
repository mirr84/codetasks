import React from 'react';

import {connector} from "../../store/utils/connector";
import lifecycle from 'react-pure-lifecycle';
import {Modal, ModalBody, Container, Row, Col, Card, CardBody} from "reactstrap";

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
                                        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam
                                            beatae consequatur distinctio dolorum esse, est id iusto laborum maiores
                                            obcaecati provident quam quia ratione rem repellendus, soluta totam unde.
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <CardBody>
                                        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam
                                            beatae consequatur distinctio dolorum esse, est id iusto laborum maiores
                                            obcaecati provident quam quia ratione rem repellendus, soluta totam unde.
                                        </div>
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
                                        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam
                                            beatae consequatur distinctio dolorum esse, est id iusto laborum maiores
                                            obcaecati provident quam quia ratione rem repellendus, soluta totam unde.
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <CardBody>
                                        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam
                                            beatae consequatur distinctio dolorum esse, est id iusto laborum maiores
                                            obcaecati provident quam quia ratione rem repellendus, soluta totam unde.
                                        </div>
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
