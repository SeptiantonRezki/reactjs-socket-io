
import { useEffect, useReducer, useRef } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import listUser from '../../data/Users';
import User from '../../modals/userModal';


const LoginPage = () => {
    const windowSize = useRef(window.innerHeight);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        let dataUserLocalSave: string | null = localStorage.getItem('user');
        if (dataUserLocalSave !== null) {
            let getDataLocal: User = JSON.parse(dataUserLocalSave);
            dispatch({ type: 'authUser', value: getDataLocal })
        }
    }, [])

    const handleLogin = () => {
        setTimeout(() => { }, 5000)
        let userFound: User | null = null;
        listUser.forEach((element1: User) => {
            if (element1.username === state.username && element1.password === state.password) {
                userFound = element1;
            }
        })
        if (userFound === null) {
            dispatch({ type: 'errorMessage', value: 'Incorrect username or password' })
        } else {
            localStorage.setItem('user', JSON.stringify(userFound))
            dispatch({ type: 'authUser', value: userFound })
        }
    }
    if (state.authUser !== null) return <Navigate to="/home" replace={true} />;
    return (
        <div className='container'>
            <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: `${windowSize.current}px` }}>
                <div className='w-100'>
                    <h1 className='text-center mb-2'>LOGIN</h1>
                    <div className='mb-2'>
                        <Form.Label htmlFor="username">Username</Form.Label>
                        <Form.Control type="text" value={state.title} id="username" onChange={(e) => { dispatch({ type: 'username', value: e.target.value }) }} />
                    </div>
                    <div className='mb-2'>
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control type="password" value={state.title} id="password" onChange={(e) => { dispatch({ type: 'password', value: e.target.value }) }} />
                    </div>
                    {
                        state.errorMessage === '' ? <></> :
                            <Alert variant={'danger'}>
                                {state.errorMessage}
                            </Alert>
                    }
                    <Button className='text-white' onClick={handleLogin} as="input" type="button" value="Login" variant="info" />
                </div>

            </div>
        </div>
    )
}

const initialState = {
    authUser: null,
    username: '',
    password: '',
    errorMessage: '',
}

const reducer = (state: any, action: any) => {
    if (action.type === 'authUser') {
        return {
            ...state,
            authUser: action.value
        }
    } else if (action.type === 'username') {
        return {
            ...state,
            username: action.value
        }
    } else if (action.type === 'password') {
        return {
            ...state,
            password: action.value
        }
    } else if (action.type === 'errorMessage') {
        return {
            ...state,
            errorMessage: action.value
        }
    } else {
        throw new Error()
    }
}

export default LoginPage;