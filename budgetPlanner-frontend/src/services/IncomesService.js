import axios from 'axios';
import authHeader from "./auth-header";


const INCOMES_BASE_REST_API_URL = 'http://localhost:8080/api/v1/incomes';


class IncomesService {
    
    getAllIncomes() {
        return axios.get(INCOMES_BASE_REST_API_URL, { headers: authHeader() })
    }

    createIncome(income) {
        return axios.post(INCOMES_BASE_REST_API_URL, income, { headers: authHeader() })
    }

    deleteIncome(incomeId) {
        return axios.delete(INCOMES_BASE_REST_API_URL + '/' + incomeId, { headers: authHeader() });
    }


    updateIncome(incomeId,income) {
        return axios.put(INCOMES_BASE_REST_API_URL + '/' + incomeId,income, { headers: authHeader()});
    }

    getIncomeById(incomeId) {
        return axios.get(INCOMES_BASE_REST_API_URL + '/' + incomeId, { headers: authHeader() });
    }

}

export default new IncomesService();