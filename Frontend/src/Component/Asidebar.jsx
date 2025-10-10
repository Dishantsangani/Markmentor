import React, { useState } from "react";
// Home
import logo from "../assets/Ellipse.png";
import Dashboard from "../assets/Icons/Dashboard.svg";
import Exams from "../assets/Icons/Exam.svg";
import Billing from "../assets/Icons/Billing.svg";
import Notice from "../assets/Icons/Notice.png";
// Student
import Attendance from "../assets/Icons/Attendance.png";
import Homework from "../assets/Icons/Homework.png";
import Marks from "../assets/Icons/Marks.png";
import Report from "../assets/Icons/Report.png";
import Student from "../assets/Icons/Student.svg";
// Techer
import Techer from "../assets/Icons/Teacher.jpg";
import Salary from "../assets/Icons/Salary.png";

import { Link } from "react-router-dom";

function Asidebar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [techermodel, setTechermodel] = useState(false);
  return (
    <aside className="flex  flex-col h-screen w-64 lg:w-64 sm:w-20 px-4 py-6 bg-white border-r shadow-md dark:bg-[#152259] dark:border-gray-700 transition-all">
      {/* Logo */}
      <div className="flex flex-col items-center">
        <img className="w-25 h-20 rounded-lg" src={logo} alt="Logo" />
        <p className="mt-2 text-center font-semibold text-lg">Markmentor</p>
        <hr className="w-45 border-t-3 border-blue-700 rounded mt-3" />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col flex-1 mt-6">
        <nav className="space-y-2">
          {/* Home */}
          <Link
            to={"/"}
            className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#509CDB]"
          >
            <img src={Dashboard} alt="Dashboard" className="w-5 h-5" />
            <span className="text-base font-medium block">Dashboard</span>
          </Link>
          {/* Student */}
          <Link
            to={"/student"}
            className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg cursor-pointer dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#509CDB]"
          >
            <img src={Student} alt="Student" className="w-5 h-5" />
            <span className="text-base font-medium block">Student</span>
            <svg
              className={`w-4 h-4 ml-auto transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Link>
          {isDropdownOpen && (
            <div className="ml-8 mt-1 space-y-1">
              <Link
                to="/marks"
                className="flex items-center gap-3 px-4 py-2 text-gray-600 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#509CDB]"
              >
                <img src={Marks} alt="Marks" className="w-5 h-5 rounded-2xl" />
                <span className="text-sm font-medium">Marks</span>
              </Link>
              <Link
                to="/report"
                className="flex items-center gap-3 px-4 py-2 text-gray-600 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#509CDB]"
              >
                <img src={Report} alt="Report" className="w-6 h-6" />
                <span className="text-sm font-medium">Report</span>
              </Link>{" "}
              <Link
                to="/attendance"
                className="flex items-center gap-3 px-4 py-2 text-gray-600 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#509CDB]"
              >
                <img src={Attendance} alt="Report" className="w-6 h-6" />
                <span className="text-sm font-medium">Attendance</span>
              </Link>
              <Link
                to="/homework"
                className="flex items-center gap-3 px-4 py-2 text-gray-600 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#509CDB]"
              >
                <img src={Homework} alt="Report" className="w-6 h-6" />
                <span className="text-sm font-medium">Home Work</span>
              </Link>{" "}
              <Link
                to="/fees"
                className="flex items-center gap-3 px-4 py-2 text-gray-600 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#509CDB]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span className="text-sm font-medium">Fees</span>
              </Link>
            </div>
          )}

          {/* Exams */}
          <Link
            to={"/exams"}
            className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#509CDB]"
          >
            <img src={Exams} alt="Report" className="w-6 h-6" />
            <span className="text-base font-medium block">Exams </span>
          </Link>

          {/* Techer */}
          <Link
            to={"/teacher"}
            className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#509CDB]"
          >
            <img src={Techer} alt="Pricing" className="w-5 h-5" />
            <span className="text-base font-medium block">Teacher</span>
            <svg
              className={`w-4 h-4 ml-auto transition-transform ${
                techermodel ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              onClick={() => setTechermodel(!techermodel)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Link>
          {techermodel && (
            <div className="ml-8 mt-1 space-y-1">
              <Link
                to="/salary"
                className="flex items-center gap-3 px-4 py-2 text-gray-600 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#509CDB]"
              >
                <img src={Salary} alt="Marks" className="w-5 h-5 rounded-2xl" />
                <span className="text-sm font-medium">Salary</span>
              </Link>
            </div>
          )}

          {/* Billing */}
          <Link
            to={"/billing"}
            className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#509CDB]"
          >
            <img src={Billing} alt="History" className="w-5 h-5" />
            <span className="text-base font-medium block">Billing</span>
          </Link>
          {/* Notice */}
          <Link
            to={"/notice"}
            className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#509CDB]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
            <span className="text-base font-medium block">Notice</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}

export default Asidebar;
