import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Marks() {
  const [formadata, setformadata] = useState([]);
  const [marks, setMarks] = useState({});
  const [selectedstd, setSelectedstd] = useState("");
  const [selectedsubject, setSelectedsubject] = useState("");

  const handlemarks = (id, value) => {
    setMarks((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Subject & Standard Selection
  const Filterdata = formadata.filter((item) => {
    const Filterdstd = !selectedstd || item.standard.toString() === selectedstd;
    const Filterdsubject =
      !selectedsubject || item.subject.includes(selectedsubject);
    return Filterdstd && Filterdsubject;
  });

  // Save Button
  const HandleSave = async () => {
    if (!selectedstd || !selectedsubject) {
      Swal.fire({
        title: "Error",
        text: "Please Select Standard and Subject.",
        icon: "error",
      });
      return;
    }

    const newMarks = [];

    // Step 1: Validate marks
    Object.entries(marks).forEach(([studentId, score]) => {
      if (
        score === "" ||
        isNaN(score) ||
        parseFloat(score) < 0 ||
        parseFloat(score) > 100
      ) {
        return;
      }

      const student = formadata.find((item) => item._id === studentId);
      if (student) {
        newMarks.push({
          studentId: student._id,
          Name: student.firstname + " " + student.surname,
          RollNo: student.rollno,
          Standard: student.standard,
          Subject: selectedsubject,
          score: parseFloat(score),
        });
      }
    });

    if (newMarks.length === 0) {
      Swal.fire({
        title: "Error",
        text: "Enter valid marks before saving.",
        icon: "error",
      });
      return;
    }

    // Use formadata instead of refetching
    for (const mark of newMarks) {
      const matchedStudent = formadata.find((s) => s._id === mark.studentId);
      const existingMark = matchedStudent?.marks?.find(
        (m) => m.subject === mark.Subject && m.score !== undefined
      );

      if (existingMark) {
        Swal.fire({
          title: "Error",
          text: `Marks for ${mark.Name} in ${mark.Subject} already exist.`,
          icon: "error",
        });
        return;
      }
    }

    try {
      // Step 3: Send to backend
      await axios.post("https://markmentor-1.onrender.com/auth/entermarks", {
        marks: newMarks.map(({ studentId, Subject, score }) => ({
          studentId,
          subject: Subject,
          score,
        })),
      });

      Swal.fire({
        title: "Success",
        text: "Marks saved successfully!",
        icon: "success",
      });

      // Reset
      setMarks({});
      setSelectedsubject("");
      setSelectedstd("");
    } catch (err) {
      Swal.fire({
        title: { err },
        text: "Failed to save marks.",
        icon: "error",
      });
    }
  };

  // Featching Data
  useEffect(() => {
    axios
      .get("https://markmentor-1.onrender.com/auth/students")
      .then((res) => {
        setformadata(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Students / Marks</h2>
      </div>

      <div className="max-w-6xl mx-auto mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Standard Selection */}
          <div>
            <label
              htmlFor="std"
              className="block text-gray-700 font-semibold text-base"
            >
              Standard (STD)
            </label>
            <select
              value={selectedstd}
              onChange={(e) => {
                setSelectedstd(e.target.value);
                setSelectedsubject(""); // reset subject on std change
              }}
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

          {/* Subject Selection */}
          <div>
            <label className="block text-gray-700 font-semibold text-base">
              Subjects
            </label>
            <div className="flex flex-wrap gap-2">
              <label className="flex items-center space-x-1 text-gray-700 select-none">
                <input
                  type="radio"
                  name="Subject"
                  value="Hindi"
                  checked={selectedsubject === "Hindi"}
                  onChange={(e) => setSelectedsubject(e.target.value)}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="text-sm">Hindi</span>
              </label>
              <label className="flex items-center space-x-1 text-gray-700 select-none">
                <input
                  type="radio"
                  name="Subject"
                  value="English"
                  checked={selectedsubject === "English"}
                  onChange={(e) => setSelectedsubject(e.target.value)}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="text-sm">English</span>
              </label>
              <label className="flex items-center space-x-1 text-gray-700 select-none">
                <input
                  type="radio"
                  name="Subject"
                  value="Science"
                  checked={selectedsubject === "Science"}
                  onChange={(e) => setSelectedsubject(e.target.value)}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="text-sm">Science</span>
              </label>
              <label className="flex items-center space-x-1 text-gray-700 select-none">
                <input
                  type="radio"
                  name="Subject"
                  value="Math"
                  checked={selectedsubject === "Math"}
                  onChange={(e) => setSelectedsubject(e.target.value)}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="text-sm">Math</span>
              </label>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <section className="mt-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700 bg-gray-100">
              <thead>
                <tr>
                  {["Name", "STD", "Roll No", "Subject", "Marks", "Action"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-3 py-2 text-sm font-semibold"
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody className="bg-white">
                {Filterdata.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-[#3d3d3d30] hover:text-black"
                  >
                    <td className="px-3 py-2 font-medium">{item.firstname}</td>
                    <td className="px-3 py-2">{item.standard}</td>
                    <td className="px-3 py-2">{item.rollno}</td>
                    <td className="px-3 py-2">{item.subject}</td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        inputMode="numeric"
                        placeholder="Marks"
                        value={marks[item._id] || ""}
                        onChange={(e) => handlemarks(item._id, e.target.value)}
                        className="w-16 border border-gray-300 rounded focus:outline-none focus:ring-2 form-control focus:ring-[#509cdb]"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        className="px-3 py-1 bg-[#509cdb] text-white rounded shadow"
                        onClick={HandleSave}
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}

export default Marks;
