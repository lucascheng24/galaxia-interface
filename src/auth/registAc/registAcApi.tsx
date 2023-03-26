import axios from "axios";
import { common_request } from "../../commonLibrary/httpStandard";
import { user } from "../../commonLibrary/userClass";

const baseUrl = common_request.serverBaseUrl

const register_request = (userDetail: user) => {
    //  api of something

    var apiPath = baseUrl + '/register'

    axios.post(apiPath, {
        user: userDetail
    },{
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'token': 'xxx'
        }
    }).then(response => {
        console.log(response.data)

    }).catch(error => {

    })
}


export default register_request;