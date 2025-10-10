import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Component/Layout";
// Home
import Home from "./Page/Home";
import Exams from "./Page/Exams";
import Notice from "./Page/Notice";
import Billing from "./Page/Billing";

// Student
import Attendance from "./Page/Student/Attendance";
import Homework from "./Page/Student/Homework";
import Marks from "./Page/Student/Marks";
import Report from "./Page/Student/Report";
import Student from "./Page/Student/Student";
import Fees from "./Page/Student/Fees";

// Techer
import Teacher from "./Page/Techer/Teacher";
import Salary from "./Page/Techer/Salary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* home */}
          <Route path="/" element={<Home />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/billing" element={<Billing />} />

          {/* Student */}
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/homework" element={<Homework />} />
          <Route path="/marks" element={<Marks />} />
          <Route path="/report" element={<Report />} />
          <Route path="/student" element={<Student />} />
          <Route path="/fees" element={<Fees />} />
          {/* Techer */}
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/salary" element={<Salary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
