import axios from "axios";
import { API_URL } from "../enviroments/enviroment";

export class ProductService {
  list() {
    return axios.get(`${API_URL}/products`);
  }

  listByCategoryId(categoryId) {
    return axios.get(`${API_URL}/products`, {
      params: { categoryId },
    });
  }

  getById(id) {
    return axios.get(`${API_URL}/products/${id}`);
  }

  create(data) {
    return axios.post(`${API_URL}/products`, data);
  }

  update(id, data) {
    return axios.put(`${API_URL}/products/${id}`, data);
  }

  delete(id) {
    return axios.delete(`${API_URL}/products/${id}`);
  }
}

export default ProductService;
