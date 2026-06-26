import axios from "axios";
import { API_URL } from "../enviroments/enviroment";

export class ProductCategoryService {
  list() {
    return axios.get(`${API_URL}/productCategories`);
  }

  create(data) {
    return axios.post(`${API_URL}/productCategories`, data);
  }

  getById(id) {
    return axios.get(`${API_URL}/productCategories/${id}`);
  }

  update(id, data) {
    return axios.put(`${API_URL}/productCategories/${id}`, data);
  }

  delete(id) {
    return axios.delete(`${API_URL}/productCategories/${id}`);
  }
}

export default ProductCategoryService;
