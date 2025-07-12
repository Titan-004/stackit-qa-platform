import React, { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import JoditEditor from "jodit-react";

const mockQuestions = [
  {
    id: 1,
    title: "How to implement JWT in React?",
    tags: ["react", "jwt", "authentication"],
    description:
      "<p>I want to secure my frontend using JWT. How do I do that?</p><p>What libraries are best?</p>",
    votes: 12,
    answers: [
      {
        id: 1,
        content:
          "<p>You can use the <b>jsonwebtoken</b> package on the backend and store the token in localStorage.</p>",
        votes: 4,
        author: "Alice",
      },
      {
        id: 2,
        content:
          "<p>React context + axios interceptors work well for managing auth tokens.</p>",
        votes: 3,
        author: "Bob",
      },
    ],
  },
];

const QuestionDetail = () => {
  const { id } = useParams();
  const questionId = parseInt(id, 10);
  const question = mockQuestions.find((q) => q.id === questionId);

  const editor = useRef(null);
  const [answerContent, setAnswerContent] = useState("");
  const [answers, setAnswers] = useState(question.answers);
  const [answerVotes, setAnswerVotes] = useState(() =>
    question.answers.map((ans) => ({
      id: ans.id,
      votes: ans.votes,
      userVote: null,
    }))
  );

  if (!question) return <p>Question not found</p>;

  const handleAnswerSubmit = () => {
    if (!answerContent.trim()) {
      alert("Answer cannot be empty!");
      return;
    }

    const newAnswer = {
      id: answers.length + 1 + Math.floor(Math.random() * 1000),
      content: answerContent,
      votes: 0,
      author: "You",
    };

    setAnswers((prev) => [...prev, newAnswer]);
    setAnswerVotes((prev) => [
      ...prev,
      { id: newAnswer.id, votes: 0, userVote: null },
    ]);
    setAnswerContent("");
  };

  const handleAnswerVote = (answerId, type) => {
    setAnswerVotes((prevVotes) =>
      prevVotes.map((ans) => {
        if (ans.id !== answerId) return ans;

        let voteChange = 0;

        if (ans.userVote === type) {
          voteChange = type === "up" ? -1 : 1;
          return { ...ans, votes: ans.votes + voteChange, userVote: null };
        } else {
          const prevDelta =
            ans.userVote === "up" ? -1 : ans.userVote === "down" ? 1 : 0;
          const newDelta = type === "up" ? 1 : -1;
          voteChange = newDelta + prevDelta;

          return { ...ans, votes: ans.votes + voteChange, userVote: type };
        }
      })
    );
  };

  const getAnswerVoteData = (id) => {
    return answerVotes.find((a) => a.id === id) || { votes: 0, userVote: null };
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Breadcrumb */}
      <nav
        className="text-sm font-medium text-gray-600 mb-4"
        aria-label="Breadcrumb"
      >
        <ol className="list-reset flex">
          <li>
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li>
            <Link to="/" className="text-blue-600 hover:underline">
              Questions
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-500" aria-current="page">
            {question.title}
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold mb-2">{question.title}</h1>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {question.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 text-sm text-gray-800 px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div
        className="prose mb-6"
        dangerouslySetInnerHTML={{ __html: question.description }}
      />

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Answers ({answers.length})
        </h2>

        {answers.length === 0 && <p>No answers yet. Be the first!</p>}

        {answers.map((answer) => {
          const { votes, userVote } = getAnswerVoteData(answer.id);

          return (
            <div
              key={answer.id}
              className="border p-4 rounded mb-4 bg-gray-50"
            >
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: answer.content }}
              />
              <div className="mt-3 flex items-center gap-3 text-sm">
                <button
                  onClick={() => handleAnswerVote(answer.id, "up")}
                  className={`px-2 py-1 rounded ${
                    userVote === "up"
                      ? "bg-green-600 text-white"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  👍 Upvote
                </button>

                <span className="font-semibold">{votes} votes</span>

                <button
                  onClick={() => handleAnswerVote(answer.id, "down")}
                  className={`px-2 py-1 rounded ${
                    userVote === "down"
                      ? "bg-red-600 text-white"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  }`}
                >
                  👎 Downvote
                </button>

                <span className="text-gray-500 ml-auto">
                  Author: {answer.author}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Answer</h2>
        <JoditEditor
          ref={editor}
          defaultValue={answerContent}
          onBlur={(newContent) => setAnswerContent(newContent)}
          config={{
            readonly: false,
            height: 200,
            toolbarAdaptive: false,
            buttons: [
              "bold",
              "italic",
              "underline",
              "|",
              "ul",
              "ol",
              "|",
              "link",
              "image",
              "|",
              "align",
              "undo",
              "redo",
            ],
          }}
        />
        <button
          onClick={handleAnswerSubmit}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default QuestionDetail;
