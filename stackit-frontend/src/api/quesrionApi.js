import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/questions';  

export const fetchQuestions = async ({ tag, search, sort = 'createdAt', page = 0, size = 10 }) => {
  const params = {};

  if (tag) params.tag = tag;
  if (search) params.search = search;
  if (sort) params.sort = sort;
  if (page !== undefined) params.page = page;
  if (size !== undefined) params.size = size;

  const response = await axios.get(`${API_BASE}/questions`, { params });
  return response.data;
};

export const createQuestion = async (questionData) => {
  const response = await axios.post(`${API_BASE}/create`, questionData);
  return response.data;
};
