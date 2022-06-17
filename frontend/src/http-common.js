import axios from 'axios';

export default axios.create({
    baseURL:'http://localhost:9090/api',
    headers: { "Content-type":"application/json"
                , "Access-Control-Allow-Origin":"*"
                , "Authorization":  "Bearer "+ sessionStorage.getItem('token')
            }
});
