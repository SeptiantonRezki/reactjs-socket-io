import { useContext, useEffect, useReducer } from 'react';
import Message from '../../modals/messageModal';
import User from "../../modals/userModal";
import socket from "../../socket";
import CurrentUserContext from '../../store/userStore';
import { MyMessage, OthersMessage } from '../Components/index';
import './Home.css';
import { InputGroup, Form } from 'react-bootstrap'
import ListClientsOnline from './ListClientsOnline';
import ListMessages from './ListMessages';
import MessagePrivate from '../../modals/MessagePrivateModal';
import Group from '../../modals/groupModal';
import Chat from './Chat';

const HomePage = () => {
    const { currentUser, dispatch } = useContext(CurrentUserContext);
    const [state, dispatchState] = useReducer(reducer, initialState);

    useEffect(() => {
        try {
            socket.connect();
            let newUser: User = new User({ idUser: currentUser!.idUser, idSocket: socket.id, name: currentUser!.name, password: currentUser!.password, username: currentUser!.username, imageUrl: currentUser!.imageUrl, statusOnline: true, lastOnline : Date.now().toString() })
            dispatch(newUser);
            localStorage.setItem('user', JSON.stringify(newUser))
            socket.emit('storeClientInfo', newUser);
        } catch (error) {
            console.log('something wrong' + error)
        }
    }, [])


    const sendMessage = () => {
        let newMessageSend = new Message({ idMessage: Date.now().toString(), user: currentUser!, textMessage: state.message });
        let sendMessage: MessagePrivate = new MessagePrivate({ clientA: currentUser!, clientB: state.selectedClient!, message: newMessageSend })
        socket.emit('private message', sendMessage)
        let newDataMessage : Group = state.group;
        newDataMessage.messages.push(newMessageSend);
        dispatchState({type: 'group', value: newDataMessage})
    }

    const handleSelectedClient = (userSelected: User) => {
        dispatchState({ type: 'selectedClient', value: userSelected })
        let newMessageSend = new Message({ idMessage: Date.now().toString(), user: currentUser!, textMessage: '' });
        let sendMessage: MessagePrivate = new MessagePrivate({ clientA: currentUser!, clientB: userSelected, message: newMessageSend })
        socket.emit('messageClientSelected', sendMessage)
    }
    socket.on('online user', (data: User[]) => {
        let dataClient: User[] = data;
        // console.log(dataClient);
        dispatchState({ type: 'users', value: dataClient })
        if (dataClient.length > 0) {
            if (state.selectedIDClient !== '') {
                dataClient.forEach((element1) => {
                    if (element1.idUser === state.selectedClient.idUser) {
                        dispatchState({ type: 'selectedClient', value: element1 })
                    }
                })
            }
        }
    })
    socket.on('private message', (data: Group) => {
        dispatchState({ type: 'group', value: data })
    })
    socket.on('messageClientSelected', (data: Group) => {
        dispatchState({ type: 'group', value: data })
    })





    return (
        <div className="container">
            <div className="row clearfix">
                <div className="col-lg-12">
                    <div className="card chat-app">
                        <div id="plist" className="people-list">
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><i className="fa fa-search"></i></InputGroup.Text>
                                <Form.Control
                                    placeholder="Search...."
                                    aria-label="search"
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => dispatchState({ type: 'search', value: e.target.value })}
                                />
                            </InputGroup>
                            <ListClientsOnline users={state.users} handleSelectedClient={handleSelectedClient} />
                        </div>
                        <div className="chat">
                            {state.selectedIDClient !== '' ? <Chat user={state.selectedClient} group={state.group} sendMessage={sendMessage} onChange={(value: any) => dispatchState({ type: 'message', value: value })} /> : <div className='d-flex justify-content-center align-items-center' style={{ height: '500px' }}>Please select your friend</div>}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const initialState = {
    search: '' as String,
    message: '' as String,
    selectedGroupId: '' as String,
    selectedIDClient: '',
    selectedClient: null as User | null,
    users: [] as User[],
    group: null as Group | null,

}

const reducer = (state: any, action: any) => {
    if (action.type === 'search') {
        return {
            ...state,
            search: action.value
        }
    } else if (action.type === 'message') {
        return {
            ...state,
            message: action.value
        }
    } else if (action.type === 'selectedGroupId') {
        return {
            ...state,
            selectedGroupId: action.value
        }
    } else if (action.type === 'selectedClient') {
        return {
            ...state,
            selectedIDClient: action.value.idUser,
            selectedClient: action.value
        }
    } else if (action.type === 'users') {
        return {
            ...state,
            users: action.value
        }
    } else if (action.type === 'group') {
        return {
            ...state,
            group: action.value
        }
    }

    else {
        throw new Error();
    }
}

export default HomePage;