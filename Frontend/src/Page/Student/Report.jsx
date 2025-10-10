import React, { useState, useEffect } from "react";
import axios from "axios";

function Report() {
  const [formdata, setformdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 2;

  useEffect(() => {
    axios
      .get("https://markmentor-1.onrender.com/auth/entermarks")
      .then((res) => {
        setformdata(res.data);
        console.log("res.data: ", res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getGrade = (mark) => {
    if (mark >= 100) return "A";
    if (mark >= 85) return "B";
    if (mark >= 60) return "C";
    if (mark >= 35) return "D";
    return "F";
  };

  // Pagination Logic
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = formdata.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(formdata.length / studentsPerPage);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Students / Report
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() =>
              setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
            }
            disabled={currentPage === 1}
            className="px-4 py-1 bg-[#509CDB] hover:bg-[#76a6ce]  text-white rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-1 bg-[#509CDB] hover:bg-[#76a6ce]  text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {currentStudents.map((item, index) => {
        const total = item?.marks?.reduce(
          (sum, m) => sum + Number(m.score || 0),
          0
        );
        const percent = item?.marks?.length
          ? (total / (item.marks.length * 100)) * 100
          : 0;
        const result = percent >= 35 ? "Pass" : "Fail";
        const resultColor = percent >= 35 ? "text-green-600" : "text-red-600";

        return (
          <div key={index} className="max-w-7xl mx-auto p-2 bg-white mb-1 ">
            {/* Student Info */}
            <div className="grid grid-cols-2 mt-2 md:grid-cols-4 gap-6 mb-2">
              <input
                type="text"
                readOnly
                value={item.firstname}
                placeholder="Your Name"
                className="h-12 w-full bg-gray-100 px-3 text-gray-600"
              />
              <input
                type="text"
                readOnly
                value={item.rollno}
                placeholder="Your Roll No"
                className="h-12 w-full bg-gray-100 px-3 text-gray-600"
              />
              <input
                type="text"
                readOnly
                value={item.standard}
                placeholder="Your Std"
                className="h-12 w-full bg-gray-100 px-3 text-gray-600"
              />
              <input
                type="text"
                readOnly
                value={item.grno}
                placeholder="Your Gr No"
                className="h-12 w-full bg-gray-100 px-3 text-gray-600"
              />
            </div>

            {/* Report Table */}
            <section>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-gray-700 overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-sm font-semibold">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-sm font-semibold">Marks</th>
                      <th className="px-6 py-3 text-sm font-semibold">
                        Total Marks
                      </th>
                      <th className="px-6 py-3 text-sm font-semibold">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {item?.marks?.map((mark, idx) => (
                      <tr
                        key={idx}
                        className="border-t hover:bg-[#3d3d3d30] transition"
                      >
                        <td className="px-6 py-2 font-medium">
                          {mark.subject}
                        </td>
                        <td className="px-6 py-2">{mark.score}</td>
                        <td className="px-6 py-2">100</td>
                        <td className="px-6 py-2">{getGrade(mark.score)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Footer Info */}
                <div className="flex justify-between mt-2 px-4 text-lg font-medium text-gray-800">
                  <div className={resultColor}>Per: {percent.toFixed(2)}%</div>
                  <div className={resultColor}>Result: {result}</div>
                </div>
              </div>
            </section>
          </div>
        );
      })}
    </>
  );
}

export default Report;
