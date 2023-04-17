import axios from "axios";
import { common_request } from "../../commonLibrary/httpStandard";
import { Role } from "../../commonLibrary/userClass";

const baseUrl = common_request.serverBaseUrl


export interface LoginRequest {
    username: string,
    password: string,
    rememberMe: boolean
}


export interface RegisterRequest {
    userName: string,
    password: string,
    role: Role,
    email: string,
    userPublicKey: string
}

export const login_request = (loginRequest: LoginRequest) => {
    const apiPath = baseUrl + '/auth/login';
  
    return axios.post(apiPath, loginRequest).then(response => {  
        return response;
    }).catch(error => {
        console.log(error);
        return error;
    });
};

export const logout_request = () => {
    //  api of something

    var apiPath = baseUrl + '/auth/logout'

    return axios.post(apiPath).then(response => {
        console.log('logout response', response)
        return response;
    }).catch(error => {
        console.log('logout error', error)
        return error;
    });
}



export const register_request = (registerRequest: RegisterRequest) => {
    //  api of something

    var apiPath = baseUrl + '/users/sign-up'

    return axios.post(apiPath, registerRequest,{
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'token': 'xxx'
        }
    }).then(response => {
        console.log(response.data)
        return response
    }).catch(error => {
        console.log(error)
        return error;
    })
}


// sample 1
const sample_01 = () => {
    var xhr = new XMLHttpRequest()

    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      console.log(xhr.responseText)
    })
    // open the request with the verb and the url
    xhr.open('GET', 'https://dog.ceo/api/breeds/list/all')
    // send the request
    xhr.send()
}

// sample_02
const request_02 = (input: any) => {
    fetch('/myserver.endpoint', {   //  '/myserver.endpoint' is the sample of api path 
        method: 'POST',
        body: JSON.stringify({
            // Add parameters here
            context: 'ascsac'
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'token': 'xxx'
        },
    }).then((response) => response.json()).then((data) => {
        console.log(data);
        // Handle data
    })
    .catch((err) => {
        console.log(err.message);
    });
}


export default login_request;