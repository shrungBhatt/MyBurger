import axios from 'axios';

const instance = axios.create({
    baseURL: "https://my-burger-a3724.firebaseio.com/"
});

export default instance;