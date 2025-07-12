import { useState, useEffect } from 'react';
import { fetchQuestions } from '../api/questionApi';

export const useQuestions = (filters) => {
  const [questions, setQuestions] = useState([]);
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 10, totalPages: 0, totalElements: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchQuestions(filters);
      setQuestions(data.content);
      setPageInfo({
        page: data.number,
        size: data.size,
        totalPages: data.totalPages,
        totalElements: data.totalElements,
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch questions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [filters.tag, filters.search, filters.sort, filters.page, filters.size]);

  return { questions, pageInfo, loading, error, reload: loadQuestions };
};
