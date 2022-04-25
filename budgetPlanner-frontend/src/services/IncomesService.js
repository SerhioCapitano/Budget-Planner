import axios from 'axios';

const INCOMES_BASE_REST_API_URL = 'http://localhost:8080/api/v1/incomes';


class IncomesService {
    
    getAllIncomes() {
        return axios.get(INCOMES_BASE_REST_API_URL)
    }





}

export default new IncomesService();