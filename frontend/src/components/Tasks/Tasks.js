import React from 'react';

import {connector} from "../../store/utils/connector";
import lifecycle from 'react-pure-lifecycle';

import {checkToken} from "../../services/serviceAuth";
import {getTasks, setTaskResult} from "../../services/serviceTasks";
import LoadingOverlay from "react-loading-overlay";
import {Badge, FormGroup, Input, Label, ListGroup, ListGroupItem, Button} from "reactstrap";
import {FaPen, FaCheckDouble, FaBookOpen} from 'react-icons/fa';

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
                text='Получение списка задач'
            >

                <ListGroup flush>
                    {
                        state.tasksReducer.list.map(
                            (item, idx) =>
                                (
                                    <ListGroupItem key={idx}
                                                   color={state.tasksReducer.selectTask === item.id ? 'info' : (item.succ ? 'success' : 'warning')}>
                                        {item.title}
                                        {
                                            item.id === state.tasksReducer.selectTask ? (
                                                <div>
                                                    {item.description}
                                                    <br/>
                                                    <FormGroup>
                                                        <Label for="result">Результат</Label>
                                                        <Input type="textarea"
                                                               name="text"
                                                               id="result"
                                                               disabled={item.succ}
                                                               value={item.result || ''}
                                                               onChange={
                                                                   (e) => {
                                                                       let list_tmp = state.tasksReducer.list;
                                                                       list_tmp.filter( item1 => item1.id === item.id )[0].result = e.target.value;
                                                                       dispatch.setter('tasksReducer', {list: list_tmp});
                                                                   }
                                                               }
                                                        />
                                                    </FormGroup>
                                                    <br/>
                                                    {
                                                        item.succ ? '' :
                                                            <Button size="sm"
                                                                    disabled={!item.result}
                                                                    onClick={() => setTaskResult({state, dispatch}, item)}
                                                            >
                                                                Проверить
                                                            </Button>
                                                    }
                                                </div>
                                            ) : ''
                                        }

                                        <Badge className={'badge-right'}
                                               onClick={(e) => {
                                                   if (state.tasksReducer.selectTask === item.id) {
                                                       dispatch.setter('tasksReducer', {selectTask: ''});
                                                   } else {
                                                       dispatch.setter('tasksReducer', {selectTask: item.id});
                                                   }
                                               }}>
                                            <FaPen/>
                                        </Badge>

                                        {/*<Badge className={'badge-right'} onClick={(e) => alert(item.id)}>*/}
                                        {/*<FaCheckDouble />*/}
                                        {/*</Badge>*/}

                                        {/*<Badge className={'badge-right'} onClick={(e) => alert(item.id)}>*/}
                                        {/*<FaBookOpen />*/}
                                        {/*</Badge>*/}

                                    </ListGroupItem>
                                )
                        )
                    }
                </ListGroup>

            </LoadingOverlay>

        </div>
    );
}

export default connector(lifecycle(methods)(Tasks));
