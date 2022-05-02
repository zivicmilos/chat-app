import axios from "axios";

const baseUrl = 'http://localhost:8080/Chat-war/api/chat/';

function register(user) {
    return axios.post(baseUrl + 'register', user);
}

function login(user) {
    return axios.post(baseUrl + 'login', user);
}

function getUsers() {
    return axios.get(baseUrl + 'loggedIn');
}

export default { register, login, getUsers }
