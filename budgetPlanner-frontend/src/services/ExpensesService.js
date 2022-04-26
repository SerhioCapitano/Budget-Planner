import axios from 'axios';

const EXPENSES_BASE_REST_API_URL = 'http://localhost:8080/api/v1/expenses';


class ExpensesService {
    
    getAllExpenses() {
        return axios.get(EXPENSES_BASE_REST_API_URL)
    }

    createExpense(expense) {
        return axios.post(EXPENSES_BASE_REST_API_URL, expense)
    }

    deleteExpense(expenseId) {
        return axios.delete(EXPENSES_BASE_REST_API_URL + '/' + expenseId);
    }





}

export default new ExpensesService();