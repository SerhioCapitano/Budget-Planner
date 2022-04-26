import axios from 'axios';

const INCOMES_BASE_REST_API_URL = 'http://localhost:8080/api/v1/incomes';


class IncomesService {
    
    getAllIncomes() {
        return axios.get(INCOMES_BASE_REST_API_URL)
    }

    createIncome(income) {
        return axios.post(INCOMES_BASE_REST_API_URL, income)
    }

    deleteIncome(incomeId) {
        return axios.delete(INCOMES_BASE_REST_API_URL + '/' + incomeId);
    }


    updateIncome(incomeId,income) {
        return axios.put(INCOMES_BASE_REST_API_URL + '/' + incomeId,income);
    }

    getIncomeById(incomeId) {
        return axios.get(INCOMES_BASE_REST_API_URL + '/' + incomeId);
    }





}

export default new IncomesService();