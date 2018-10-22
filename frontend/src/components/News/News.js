import React from 'react';

import {connector} from "../../store/utils/connector";
import lifecycle from 'react-pure-lifecycle';
import {Modal, ModalBody, Container, Row, Col, Card, CardBody, CardTitle, CardText} from "reactstrap";

const methods = {
    componentDidMount(props) {
    }
}

const News = ({state, dispatch}) => {
    return (
        <div>

            News

        </div>
    );
}

export default connector(lifecycle(methods)(News));
