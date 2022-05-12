import axios from 'axios';
import authHeader from "./auth-header";

const USERS_BASE_REST_API_URL = 'http://localhost:8080/api/v1/users';


class UserService {
    
    getAllUsers() {
        return axios.get(USERS_BASE_REST_API_URL,  { headers: authHeader() })
    }

    createUsers(user) {
        return axios.post(USERS_BASE_REST_API_URL, user,  { headers: authHeader() })
    }

    deleteUsers(userId) {
        return axios.delete(USERS_BASE_REST_API_URL + '/' + userId,  { headers: authHeader() });
    }

    updateUsers(userId, user) {
        return axios.put(USERS_BASE_REST_API_URL + '/' + userId, user,  { headers: authHeader() });
    }

    getUsersById(userId) {
        return axios.get(USERS_BASE_REST_API_URL + '/' + userId,  { headers: authHeader() });
    }




}

export default new UserService();