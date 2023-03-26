import axios from "axios";
import { common_request } from "../../commonLibrary/httpStandard";

const baseUrl = common_request.serverBaseUrl

const login_request = (username: string, hashedPw: string) => {
    //  api of something

    var apiPath = baseUrl + '/login'

    axios.get(apiPath, {
        params: {
            context: 'ascsac',
            username: username,
            password: hashedPw
        },
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'token': 'xxx'
        }

    }).then(response => {
        console.log(response.data)

    }).catch(error => {

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
const request = (input: any) => {
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