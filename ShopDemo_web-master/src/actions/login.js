import axios from 'axios';
import { checkHttpStatus, parseJSON } from '../utils';

export function loginSuccess(user) {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            user: user,
        }
    }
}

export function loginFailure(error) {
    return {
        type: 'LOGIN_FAILURE',
        payload: {
            status: 'error',
            statusText: '501'
        }
    }
}

export function loginRequest() {
    return {
        type: 'LOGIN_REQUEST'
    }
}

export function logout() {
    return {
        type: 'LOGOUT'
    }
}

export function login(credentials, callback) {
    return function (dispatch) {
        dispatch(loginRequest());
        return axios.post('http://localhost:8001/users/login',
                    {
                        email: credentials.email,
                        password: credentials.password
                    })
            .then(checkHttpStatus)
            .then(response => {
                try {
                    dispatch(loginSuccess(response.data.data));
                    callback(null, response.data.data);
                } catch (e) {
                    // dispatch(loginFailure({
                    //     response: {
                    //         status: 403,
                    //         statusText: 'Invalid token'
                    //     }
                    // }));
                }
            })
            .catch(error => {
                dispatch(loginFailure({
                    response: {
                        status: 403,
                        statusText: 'auth error' +
                        ''
                    }
                }));
                if (typeof callback === 'function') {
                    callback(error.response, null);
                }
            })
    }
}
