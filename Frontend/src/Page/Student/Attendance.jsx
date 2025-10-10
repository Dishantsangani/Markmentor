import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Attendance() {
  const subjects = ["Math", "Science", "English", "History"];
  const [selectedStd, setSelectedStd] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [students, setStudents] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (selectedStd && selectedSubject) {
      axios
        .get("https://markmentor-1.onrender.com/auth/students", {
          params: {
            standard: selectedStd,
            subject: selectedSubject,
          },
        })
        .then((res) => {
          if (res.data.length === 0) {
            Swal.fire({
              icon: "error",
              title: "No Students Found",
              text: "No students found for the selected standard and subject.",
            });
            setStudents([]);
            setAttendanceMap({});
          } else {
            setStudents(res.data);
            // Set default attendance to "Absent" for all students
            const defaultAttendance = {};
            res.data.forEach((s) => {
              defaultAttendance[s.rollno] = "Absent";
            });
            setAttendanceMap(defaultAttendance);
            setSaved(false);
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Fetch Error",
            text: err.message || "Error fetching students",
          });
          setStudents([]);
          setAttendanceMap({});
        });
    } else {
      setStudents([]);
      setAttendanceMap({});
    }
  }, [selectedStd, selectedSubject]);

  const handleStatusChange = (rollno, value) => {
    setAttendanceMap((prev) => ({ ...prev, [rollno]: value }));
  };

  const handleSave = async () => {
    if (!selectedStd || !selectedSubject || !selectedDate) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Information",
        text: "Please fill all fields before saving.",
      });
      return;
    }

    if (students.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No Students",
        text: "No students to save attendance for.",
      });
      return;
    }

    try {
      const promises = students.map((student) => {
        const status = attendanceMap[student.rollno] || "Absent";
        return axios.post("https://markmentor-1.onrender.com/auth/enterattendance", {
          rollno: student.rollno,
          subject: selectedSubject,
          date: selectedDate,
          status: status.toLowerCase(),
        });
      });

      await Promise.all(promises);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Attendance saved successfully!",
      });
      setSaved(true);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text:
          err.response?.data?.error ||
          err.message ||
          "Failed to save attendance",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 px-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Students / Attendance
        </h2>
      </div>

      {/* Dropdowns */}
      <div className="flex flex-wrap gap-6 px-6">
        <select
          value={selectedStd}
          onChange={(e) => setSelectedStd(e.target.value)}
          className="w-56 h-10 border border-gray-300 rounded"
        >
          <option value="">Select Standard</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

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

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-56 border border-gray-300 rounded p-2 text-sm"
        />

        <button
          onClick={handleSave}
          disabled={
            !selectedStd ||
            !selectedSubject ||
            !selectedDate ||
            students.length === 0
          }
          className={`w-56 py-2 px-3 rounded ${
            !selectedStd ||
            !selectedSubject ||
            !selectedDate ||
            students.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#509cdb] hover:bg-bg-[#509cdb] text-white"
          }`}
        >
          Save
        </button>
      </div>

      {/* Student list with attendance */}
      {students.length > 0 ? (
        students.map((student) => (
          <div
            key={student.rollno}
            className="flex items-center justify-between w-full max-w-4xl p-4 bg-white rounded-lg shadow border mt-4 mx-6"
          >
            <span className="text-gray-800 text-base font-medium">
              {student.firstname} {student.surname}
            </span>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`att-${student.rollno}`}
                  value="Present"
                  checked={attendanceMap[student.rollno] === "Present"}
                  onChange={() => handleStatusChange(student.rollno, "Present")}
                />
                Present
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`att-${student.rollno}`}
                  value="Absent"
                  checked={attendanceMap[student.rollno] === "Absent"}
                  onChange={() => handleStatusChange(student.rollno, "Absent")}
                />
                Absent
              </label>
            </div>
          </div>
        ))
      ) : (
        <div className="mt-6 mx-6 p-5 bg-red-50 border border-red-200 rounded-lg flex flex-col items-center justify-center text-center shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-red-500 mb-2"
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
          <p className="text-base font-semibold text-red-700">
            Student not found
          </p>
          <p className="text-sm text-red-600 mt-1">
            Please check the search term or try again with different criteria.
          </p>
        </div>
      )}

      {saved && (
        <div className="mx-6 mt-6 p-4 bg-green-50 border border-green-300 rounded shadow text-green-800">
          Attendance saved successfully!
        </div>
      )}
    </div>
  );
}

export default Attendance;
