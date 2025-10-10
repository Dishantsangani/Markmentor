import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Salary() {
  const [formData, setFormData] = useState({
    teacherName: "",
    subject: "",
    standard: "",
    amount: "",
    bonus: "",
  });
  const [salaryList, setSalaryList] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://markmentor.onrender.com/auth/techersalary", formData)
      .then((res) => {
        console.log("Posted Data", res.data);
        Swal.fire({
          title: "Added!",
          text: "New Teacher Add Successfully.",
          icon: "success",
        });
      })
      .catch((error) => {
        console.log("Posted Data Error", error);
        Swal.fire({
          title: "Server Error",
          text: error?.response?.data?.error || "Something went wrong!",
          icon: "error",
        });
      });
    // Reset form
    setFormData({
      teacherName: "",
      subject: "",
      standard: "",
      amount: "",
      bonus: "",
    });
  };

  useEffect(() => {
    axios
      .get("https://markmentor.onrender.com/auth/getalltechersalary")
      .then((res) => {
        const allSalaries = res.data.flatMap(
          (student) => student.techerssalary || []
        );
        setSalaryList(allSalaries);
      })

      .catch((err) => console.log("Api Error", err));
  }, [salaryList]);

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-gray-800">
          Students / Salary
        </h2>
      </div>

      <div className="flex gap-10">
        {/* Left side: form */}
        <form onSubmit={handleSubmit} className="w-96 p-5 bg-white  shadow-2xl">
          {/* Teacher Name */}
          <div className="mb-4">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="teacherName"
            >
              Teacher Name
            </label>
            <input
              type="text"
              id="teacherName"
              name="teacherName"
              value={formData.teacherName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter teacher's name"
            />
          </div>

          {/* Subject */}
          <div className="mb-4">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="subject"
            >
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>
                Select subject
              </option>
              <option value="Science">Science</option>
              <option value="Math">Math</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>

          {/* Standard */}
          <div className="mb-4">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="standard"
            >
              Standard
            </label>
            <input
              type="number"
              min={0}
              max={12}
              id="standard"
              name="standard"
              value={formData.standard}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter standard/class"
            />
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter salary amount"
            />
          </div>

          {/* Bonus */}
          <div className="mb-6">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="bonus"
            >
              Bonus
            </label>
            <input
              type="number"
              id="bonus"
              name="bonus"
              value={formData.bonus}
              onChange={handleChange}
              min="0"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter bonus amount (optional)"
            />
          </div>

          <button
            type="submit"
            className="bg-[#509CDB] hover:bg-[#76a6ce]  text-white px-6 py-2 rounded  transition"
          >
            Save
          </button>
        </form>

        {/* Right side: Display entered salary data */}
        <div className="w-1/2 p-6 bg-white rounded shadow-2xl max-h-[600px] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Entered Salaries</h3>

          {salaryList.length === 0 ? (
            <p className="text-gray-500">No salary data entered yet.</p>
          ) : (
            <table className="w-full  text-left  text-gray-700  rounded-lg">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className=" px-3 py-2">Teacher Name</th>
                  <th className=" px-3 py-2">Subject</th>
                  <th className=" px-3 py-2">Standard</th>
                  <th className=" px-3 py-2">Amount</th>
                  <th className=" px-3 py-2">Bonus</th>
                </tr>
              </thead>
              <tbody>
                {salaryList.map((item, index) => (
                  <tr key={index} className="odd:bg-gray-50">
                    <td className="px-3 py-2">{item.teacherName}</td>
                    <td className="px-3 py-2">{item.subject}</td>
                    <td className="px-3 py-2">{item.standard}</td>
                    <td className=" px-3 py-2">{item.amount}</td>
                    <td className="px-3 py-2">{item.bonus || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Salary;
