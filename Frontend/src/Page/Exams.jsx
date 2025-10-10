import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Exams = () => {
  const [showModal, setShowModal] = useState(false);
  const [exams, setExams] = useState([]);
  const toggleModal = () => setShowModal(!showModal);

  // Form state
  const [formData, setFormData] = useState({
    examName: "",
    subject: "",
    date: "",
    time: "",
    standard: "",
    totalMarks: "",
    description: "",
  });

  // Fetch exams from backend
  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get(
        "https://markmentor-1.onrender.com/auth/getallexams"
      );
      console.log("Fetched exams:", response.data); // Debug
      setExams(response.data);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://markmentor-1.onrender.com/auth/addexam", formData);
      toggleModal();
      setFormData({
        examName: "",
        subject: "",
        date: "",
        time: "",
        standard: "",
        totalMarks: "",
        description: "",
      });
      fetchExams(); // Refresh the exam list
      Swal.fire({
        title: "Added!",
        text: "New Exam Schedule.",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Server Error",
        text: error?.response?.data?.error || "Something went wrong!",
        icon: "error",
      });
    }
  };

  return (
    <>
      {/* Modal toggle button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Exam Schedule </h2>
        <button
          onClick={toggleModal}
          className="block text-white bg-[#509CDB] hover:bg-[#76a6ce] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
        >
          Add Exams
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-[#3d3d3d30]">
          <div className="relative p-4 w-full max-w-2xl max-h-full overflow-auto">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-white">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Schedule New Exam
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2  sm:col-span-1">
                    <label
                      htmlFor="examName"
                      className="block mb-2 text-sm font-medium text-black dark:text-black"
                    >
                      Exam Name
                    </label>
                    <input
                      type="text"
                      id="examName"
                      name="examName"
                      placeholder="Enter exam name"
                      required
                      value={formData.examName}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="subject"
                      className="block mb-2 text-sm font-medium text-black dark:text-black"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    >
                      <option value="">Select subject</option>
                      <option value="Math">Math</option>
                      <option value="Science">Science</option>
                      <option value="English">English</option>
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="date"
                      className="block mb-2 text-sm font-medium text-black dark:text-black"
                    >
                      Exam Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="time"
                      className="block mb-2 text-sm font-medium text-black dark:text-black"
                    >
                      Exam Time
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="standard"
                      className="block mb-2 text-sm font-medium text-black dark:text-black"
                    >
                      Standard
                    </label>
                    <select
                      id="standard"
                      name="standard"
                      value={formData.standard}
                      onChange={handleChange}
                      required
                      className="w-full h-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#509cdb] focus:border-[#509cdb] text-gray-800"
                    >
                      <option value="" disabled>
                        Select Standard
                      </option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((std) => (
                        <option key={std} value={std}>
                          {std}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="totalMarks"
                      className="block mb-2 text-sm font-medium text-black dark:text-black  "
                    >
                      Total Marks
                    </label>
                    <input
                      type="number"
                      id="totalMarks"
                      name="totalMarks"
                      placeholder="100"
                      required
                      value={formData.totalMarks}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-black dark:text-black"
                    >
                      Exam Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="3"
                      placeholder="Enter exam instructions or details here"
                      value={formData.description}
                      onChange={handleChange}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-[#509CDB] hover:bg-[#76a6ce] text-white inline-flex items-center focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Schedule Exam
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-2 ">Exam Name</th>
              <th className="px-4 py-2 ">Subject</th>
              <th className="px-4 py-2 ">Date</th>
              <th className="px-4 py-2 ">Time</th>
              <th className="px-4 py-2 ">Standard</th>
              <th className="px-4 py-2 ">Total Marks</th>
              <th className="px-4 py-2 ">Description</th>
            </tr>
          </thead>
          <tbody>
            {exams.length > 0 ? (
              exams.map((exam, index) => (
                <tr key={index} className="bg-white">
                  <td className="px-4 py-2">{exam.examName}</td>
                  <td className="px-4 py-2">{exam.subject}</td>
                  <td className="px-4 py-2">
                    {new Date(exam.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{exam.time}</td>
                  <td className="px-4 py-2">{exam.standard}th</td>
                  <td className="px-4 py-2">{exam.totalMarks}</td>
                  <td className="px-4 py-2">{exam.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-10 text-center bg-red-50 text-red-600"
                >
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 mb-2 text-red-500"
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
                    <p className="text-sm font-semibold">No Exams Scheduled</p>
                    <p className="text-xs text-gray-500 mt-1">
                      You haven’t added any exam schedules yet.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Exams;
