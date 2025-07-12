import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { TagsInput } from "react-tag-input-component";

const AskQuestion = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const config = {
    readonly: false,
    height: 300,
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
  };

  const handleSubmit = () => {
    console.log({ title, description: content, tags });
    alert("Question submitted!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Ask a Question</h1>

      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter a descriptive title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <p className="mt-1 text-sm text-gray-500">
          Be specific and imagine you're asking a question to another person.
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Details
        </label>
        <div className="border border-gray-300 rounded-md overflow-hidden">
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Include all the information someone would need to answer your question.
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <div className="border border-gray-300 rounded-md p-2">
          <TagsInput
            value={tags}
            onChange={setTags}
            name="tags"
            placeHolder="Enter tags (press enter to add)"
            classNames={{
              input: "p-2 w-full focus:outline-none",
              tag: "bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2 text-sm",
            }}
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Add up to 5 tags to describe what your question is about.
        </p>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
      >
        Post Your Question
      </button>
    </div>
  );
};

export default AskQuestion;