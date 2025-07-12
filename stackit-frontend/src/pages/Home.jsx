import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const mockQuestions = [
  {
    id: 1,
    title: "How to implement JWT in React?",
    tags: ["react", "jwt", "authentication"],
    description: "<p>I want to secure my frontend using JWT. How do I do that?</p>",
    votes: 12,
    answers: 3,
    createdAt: "2025-07-10T10:00:00Z",
  },
  {
    id: 2,
    title: "What's the difference between useEffect and useLayoutEffect?",
    tags: ["react", "hooks"],
    description: "<p>Both seem similar, but behave differently. Can someone explain?</p>",
    votes: 25,
    answers: 5,
    createdAt: "2025-07-11T15:30:00Z",
  },
  {
    id: 3,
    title: "How to optimize React app performance?",
    tags: ["react", "performance"],
    description: "<p>Looking for best practices to speed up React apps.</p>",
    votes: 8,
    answers: 2,
    createdAt: "2025-07-08T09:00:00Z",
  },
  {
    id: 4,
    title: "What is the Context API?",
    tags: ["react", "context"],
    description: "<p>How does React Context API help with state management?</p>",
    votes: 10,
    answers: 1,
    createdAt: "2025-07-12T12:20:00Z",
  },
  {
    id: 5,
    title: "Using React with TypeScript",
    tags: ["react", "typescript"],
    description: "<p>What are the best ways to use TypeScript in React projects?</p>",
    votes: 14,
    answers: 4,
    createdAt: "2025-07-09T14:00:00Z",
  },
  {
    id: 6,
    title: "How to handle forms in React?",
    tags: ["react", "forms"],
    description: "<p>What libraries or techniques do you recommend for forms?</p>",
    votes: 18,
    answers: 6,
    createdAt: "2025-07-07T08:45:00Z",
  },
];

const ITEMS_PER_PAGE = 5;

function QuestionsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const allTags = useMemo(() => {
    const tagsSet = new Set();
    mockQuestions.forEach((q) => q.tags.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet).sort();
  }, []);

  const filteredQuestions = useMemo(() => {
    let filtered = mockQuestions;

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (q) =>
          q.title.toLowerCase().includes(term) ||
          q.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    if (selectedTag) {
      filtered = filtered.filter((q) => q.tags.includes(selectedTag));
    }

    if (sortOrder === "newest") {
      filtered = filtered.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      filtered = filtered.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return filtered;
  }, [searchTerm, selectedTag, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE);
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleTagClick = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
      setCurrentPage(1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search questions or tags..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-2 rounded flex-grow"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded w-40"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
        <Link
          to="/ask"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap"
        >
          Ask Question
        </Link>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Filter by Tag:</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 rounded cursor-pointer border ${
                selectedTag === tag
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
              }`}
            >
              #{tag}
            </button>
          ))}
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="px-3 py-1 rounded cursor-pointer border bg-red-100 text-red-700 border-red-400 ml-2"
            >
              Clear Tag Filter
            </button>
          )}
        </div>
      </div>

      {paginatedQuestions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        paginatedQuestions.map((question) => (
          <div key={question.id} className="border-b py-4 mb-4">
            <Link to={`/questions/${question.id}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline">{question.title}</h2>
            </Link>
            <div
              className="mt-1 text-gray-700"
              dangerouslySetInnerHTML={{ __html: question.description.slice(0, 100) + "..." }}
            />
            <div className="flex flex-wrap mt-2 gap-2 items-center">
              <div>
                <span className="font-semibold mr-2">{question.votes} votes</span>
                <span className="font-semibold">{question.answers} answers</span>
              </div>
              <div className="flex flex-wrap gap-2 ml-auto">
                {question.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 text-sm text-gray-800 px-2 py-1 rounded cursor-pointer hover:bg-gray-300"
                    onClick={() => handleTagClick(tag)}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-3">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => {
            const page = idx + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded ${
                  currentPage === page ? "bg-blue-600 text-white" : "hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionsList;
