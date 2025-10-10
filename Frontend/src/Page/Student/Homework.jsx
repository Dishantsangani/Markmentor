import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Homework() {
  const subjects = ["Math", "Science", "English", "History"];
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [question, setQuestion] = useState("");
  const [apidata, setApidata] = useState([]);

  // Separate function to fetch all homework from API
  const fetchHomework = async () => {
    try {
      const response = await axios.get(
        "https://markmentor-1.onrender.com/auth/allhomework"
      );
      setApidata(response.data);
    } catch (error) {
      console.error("Failed to fetch homework:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch homework data.",
      });
    }
  };

  // Fetch homework on component mount
  useEffect(() => {
    fetchHomework();
  }, []);

  const handleSave = async () => {
    if (
      !selectedStandard ||
      !selectedSubject ||
      !selectedDate ||
      !question.trim()
    ) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Data",
        text: "Please fill all fields.",
      });
      return;
    }

    const newHomework = {
      standard: selectedStandard,
      subject: selectedSubject,
      date: selectedDate,
      question: question.trim(),
    };

    try {
      await axios.post("https://markmentor-1.onrender.com/auth/addhomework", newHomework);
      setQuestion(""); // Clear input

      // Refresh homework list by calling fetchHomework
      fetchHomework();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Homework saved successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Duplicate Entry",
          text: "Homework for this Standard, Subject, and Date already exists.",
        });
      } else {
        console.error("Error saving homework:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to save homework.",
        });
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center px-6 mt-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Students / Homework
        </h2>
      </div>

      {/* Dropdowns to create homework */}
      <div className="flex flex-wrap gap-6 px-6 mt-4">
        <div className="relative w-56">
          <select
            value={selectedStandard}
            onChange={(e) => setSelectedStandard(e.target.value)}
            className="w-56 h-10 border border-gray-300 rounded"
          >
            <option value="">Select Standard</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="relative w-56">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-56 border border-gray-300 rounded p-2 text-sm"
          >
            <option value="">Select Subject</option>
            {subjects.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="w-56">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full h-10 px-3 border border-gray-300 rounded text-sm text-gray-700"
          />
        </div>
      </div>

      {/* Add Question Section */}
      <div className="px-6 mt-6 w-full">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Add Homework Question
        </label>

        <div className="flex items-start gap-4">
          <textarea
            rows={1}
            placeholder="Enter your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          <button
            onClick={handleSave}
            className="bg-[#509cdb] hover:bg-[#5e7c96] text-white px-5 py-2 rounded-lg text-sm font-medium self-start"
          >
            Save
          </button>
        </div>
      </div>

      <div className="px-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Saved Questions
        </h3>
        {apidata.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center bg-red-50 text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M20.66 5.88A10.96 10.96 0 0112 2a10.96 10.96 0 01-8.66 3.88m17.32 0A10.96 10.96 0 0122 12c0 5.52-4.48 10-10 10S2 17.52 2 12c0-2.64.98-5.05 2.59-6.88"
              />
            </svg>
            <p className="font-semibold">No Questions Found</p>
            <p className="text-sm text-gray-500">
              Try adding some questions first.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {apidata.map((q, index) => (
              <li
                key={index}
                className="p-4 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-800"
              >
                <p className="font-medium">Q: {q.question}</p>
                <p className="text-xs text-gray-600 mt-1">
                  📘 {q.standard} | 🧪 {q.subject} | 📅 {q.date?.slice(0, 10)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Homework;
