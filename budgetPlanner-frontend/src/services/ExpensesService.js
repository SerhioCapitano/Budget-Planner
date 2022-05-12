import axios from 'axios';
import authHeader from "./auth-header";

const EXPENSES_BASE_REST_API_URL = 'http://localhost:8080/api/v1/expenses';


class ExpensesService {
    
    getAllExpenses() {
        return axios.get(EXPENSES_BASE_REST_API_URL,  { headers: authHeader() })
    }

    createExpense(expense) {
        return axios.post(EXPENSES_BASE_REST_API_URL, expense, { headers: authHeader() })
    }

    deleteExpense(expenseId) {
        return axios.delete(EXPENSES_BASE_REST_API_URL + '/' + expenseId, { headers: authHeader() });
    }

    updateExpense(expenseId, expense) {
        return axios.put(EXPENSES_BASE_REST_API_URL + '/' + expenseId, expense, { headers: authHeader() });
    }

    getExpenseById(expenseId) {
        return axios.get(EXPENSES_BASE_REST_API_URL + '/' + expenseId, { headers: authHeader() });
    }




}

export default new ExpensesService();