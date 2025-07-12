// src/pages/QuestionsList.jsx
import React from "react";
import { Link } from "react-router-dom";

const mockQuestions = [
  {
    id: 1,
    title: "How to implement JWT in React?",
    tags: ["react", "jwt", "authentication"],
    description: "<p>I want to secure my frontend using JWT. How do I do that?</p>",
  },
  {
    id: 2,
    title: "What's the difference between useEffect and useLayoutEffect?",
    tags: ["react", "hooks"],
    description: "<p>Both seem similar, but behave differently. Can someone explain?</p>",
  },
];

const QuestionsList = () => {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Questions</h1>

      {mockQuestions.map((question) => (
        <div key={question.id} className="border-b py-4 mb-4">
          <Link to={`/questions/${question.id}`}>
            <h2 className="text-xl font-semibold text-blue-600 hover:underline">{question.title}</h2>
          </Link>

          <div className="mt-1 text-gray-700" dangerouslySetInnerHTML={{ __html: question.description.slice(0, 100) + "..." }} />

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
    </div>
  );
};

export default QuestionsList;
