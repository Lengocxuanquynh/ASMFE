import axios from "axios";
import { API_URL } from "../enviroments/enviroment";

export class BlogService {
  list() {
    return axios.get(`${API_URL}/blogs`);
  }

  getById(id) {
    return axios.get(`${API_URL}/blogs/${id}`);
  }

  create(data) {
    return axios.post(`${API_URL}/blogs`, data);
  }

  update(id, data) {
    return axios.put(`${API_URL}/blogs/${id}`, data);
  }

  delete(id) {
    return axios.delete(`${API_URL}/blogs/${id}`);
  }
}

export default BlogService;
