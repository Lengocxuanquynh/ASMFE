import axios from "axios";
import { API_URL } from "../enviroments/enviroment";

export class UserService {
  list() {
    return axios.get(`${API_URL}/users`);
  }

  getById(id) {
    return axios.get(`${API_URL}/users/${id}`);
  }

  create(data) {
    return axios.post(`${API_URL}/users`, data);
  }

  update(id, data) {
    return axios.put(`${API_URL}/users/${id}`, data);
  }

  delete(id) {
    return axios.delete(`${API_URL}/users/${id}`);
  }
}

export default UserService;
