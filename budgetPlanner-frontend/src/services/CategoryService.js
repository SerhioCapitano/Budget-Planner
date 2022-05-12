import axios from 'axios';
import authHeader from "./auth-header";


const CATEGORIES_BASE_REST_API_URL = 'http://localhost:8080/api/v1/categories';


class CategoriesService {
    
    getAllCategories() {
        return axios.get(CATEGORIES_BASE_REST_API_URL, { headers: authHeader() })
    }

    createCategory(category) {
        return axios.post(CATEGORIES_BASE_REST_API_URL, category, { headers: authHeader() })
    }

    deleteCategory(categoryId) {
        return axios.delete(CATEGORIES_BASE_REST_API_URL + '/' + categoryId, { headers: authHeader() });
    }


    updateCategory(categoryId, category) {
        return axios.put(CATEGORIES_BASE_REST_API_URL + '/' + categoryId, category), { headers: authHeader() };
    }

    getCategoryById(categoryId) {
        return axios.get(CATEGORIES_BASE_REST_API_URL + '/' + categoryId, { headers: authHeader() });
    }

}

export default new CategoriesService();