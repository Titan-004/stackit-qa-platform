import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuestions } from "../hooks/useQuestions";

const QuestionsList = () => {
  const [filters, setFilters] = useState({
    tag: "",
    search: "",
    sort: "createdAt",
    page: 0,
    size: 10,
  });

  const { questions, pageInfo, loading, error } = useQuestions(filters);

  const onSearchChange = (e) =>
    setFilters((f) => ({ ...f, search: e.target.value, page: 0 }));
  const onTagChange = (e) =>
    setFilters((f) => ({ ...f, tag: e.target.value, page: 0 }));
  const onSortChange = (e) =>
    setFilters((f) => ({ ...f, sort: e.target.value, page: 0 }));
  const onPageChange = (newPage) =>
    setFilters((f) => ({ ...f, page: newPage }));

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Questions</h1>

      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search questions..."
          value={filters.search}
          onChange={onSearchChange}
          className="border rounded px-3 py-1 w-64"
        />

        <input
          type="text"
          placeholder="Filter by tag"
          value={filters.tag}
          onChange={onTagChange}
          className="border rounded px-3 py-1 w-48"
        />

        <select
          value={filters.sort}
          onChange={onSortChange}
          className="border rounded px-3 py-1"
        >
          <option value="createdAt">Newest</option>
          <option value="votes">Votes</option>
        </select>
      </div>

      {loading && <p>Loading questions...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && questions.length === 0 && (
        <p>No questions found.</p>
      )}

      {!loading &&
        !error &&
        questions.map((question) => (
          <div key={question.id} className="border-b py-4 mb-4">
            <Link to={`/questions/${question.id}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                {question.title}
              </h2>
            </Link>

            <div
              className="mt-1 text-gray-700"
              dangerouslySetInnerHTML={{
                __html:
                  question.description.length > 100
                    ? question.description.slice(0, 100) + "..."
                    : question.description,
              }}
            />

            <div className="flex flex-wrap mt-2 gap-2">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-200 text-sm text-gray-800 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}

      {/* Pagination controls */}
      {!loading && !error && pageInfo.totalPages > 0 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={pageInfo.page === 0}
            onClick={() => onPageChange(pageInfo.page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {pageInfo.page + 1} of {pageInfo.totalPages}
          </span>

          <button
            disabled={pageInfo.page + 1 === pageInfo.totalPages}
            onClick={() => onPageChange(pageInfo.page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionsList;
