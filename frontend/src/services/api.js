import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    let message = error.response?.data?.message || error.message || 'Something went wrong';

    if (error.response?.data instanceof Blob) {
      const text = await error.response.data.text();
      try {
        message = JSON.parse(text).message || message;
      } catch {
        message = text || message;
      }
    }

    return Promise.reject(new Error(message));
  }
);

// Post API functions
export const postAPI = {
  // Get all posts with pagination
  getAllPosts: async (page = 1, limit = 10, category = '', status = '') => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (category) params.append('category', category);
    if (status) params.append('status', status);
    
    const response = await api.get(`/posts?${params.toString()}`);
    return response.data;
  },

  // Search posts
  searchPosts: async (query, page = 1, limit = 10, category = '', status = '') => {
    const params = new URLSearchParams();
    params.append('q', query);
    params.append('page', page);
    params.append('limit', limit);
    if (category) params.append('category', category);
    if (status) params.append('status', status);
    
    const response = await api.get(`/posts/search?${params.toString()}`);
    return response.data;
  },

  // Get single post
  getPostById: async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  // Create post
  createPost: async (postData) => {
    const response = await api.post('/posts', postData);
    return response.data;
  },

  // Update post
  updatePost: async (id, postData) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  },

  // Delete post
  deletePost: async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },

  // Export to CSV
  exportToCSV: async (category = '', status = '', query = '') => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (status) params.append('status', status);
    if (query) params.append('q', query);
    
    const response = await api.get(`/posts/export?${params.toString()}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

export default api;
