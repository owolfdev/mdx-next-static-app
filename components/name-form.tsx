"use client";
import type React from "react";
import { useState } from "react";

const NameForm: React.FC = () => {
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmittedName(name);
  };

  return (
    <div className="py-8">
      <div className="p-4 bg-green-100 text-green-800 rounded">
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Enter your name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="ml-2 p-1 border rounded"
            />
          </label>
          <button
            type="submit"
            className="px-2 py-1 bg-green-500 text-white rounded"
          >
            Submit
          </button>
        </form>
        {submittedName && <p className="mt-4">Hello, {submittedName}!</p>}
      </div>
    </div>
  );
};

export default NameForm;
