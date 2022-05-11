import axios from 'axios';

const USERS_BASE_REST_API_URL = 'http://localhost:8080/api/v1/users';


class UserService {
    
    getAllUsers() {
        return axios.get(USERS_BASE_REST_API_URL)
    }

    createUsers(user) {
        return axios.post(USERS_BASE_REST_API_URL, user)
    }

    deleteUsers(userId) {
        return axios.delete(USERS_BASE_REST_API_URL + '/' + userId);
    }

    updateUsers(userId, user) {
        return axios.put(USERS_BASE_REST_API_URL + '/' + userId, user);
    }

    getUsersById(userId) {
        return axios.get(USERS_BASE_REST_API_URL + '/' + userId);
    }




}

export default new UserService();