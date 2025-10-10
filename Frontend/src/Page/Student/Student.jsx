import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Student() {
  const [showModal, setShowModal] = useState(false);
  const [Formdata, setFormdata] = useState([]);
  const [Name, setName] = useState("");
  const [Surname, setSurname] = useState("");
  const [Dob, setDob] = useState("");
  const [Standard, setStandard] = useState("");
  const [RollNo, setRollNo] = useState("");
  const [GRNo, setGRNo] = useState("");
  const [Subject, setSubject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchinput, setSearchinput] = useState("");
  const [refresh, setRefresh] = useState(false);

  // ModelOpen  State
  const toggleModal = () => setShowModal(!showModal);

  //Search Inputs
  const Filterdata = Formdata.filter((item) =>
    `${item.firstname} ${item.surname} ${item.rollno} ${item.standard}`
      .toLowerCase()
      .includes(searchinput.toLowerCase())
  );

  // Age Calculation
  const CalculateAge = (dob) => {
    const today = new Date();
    const birthdate = new Date(dob);
    let age = today.getFullYear() - birthdate.getFullYear();
    let MonthDiff = today.getMonth() - birthdate.getMonth();
    if (
      MonthDiff < 0 ||
      (MonthDiff === 0 && today.getDate() < birthdate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Clear Data
  function ClearHandle() {
    setName("");
    setSurname("");
    setDob("");
    setStandard("");
    setRollNo("");
    setGRNo("");
    setSubject([]);
  }

  // Date Of Birth Validation
  const ValidDob = (dob, standard) => {
    const age = CalculateAge(dob);
    const minage = standard + 6;
    if (age < minage) {
      Swal.fire({
        title: "Warning",
        text: `For Standard ${standard}, The Minimum Age is ${minage} Years. Your Age is ${age} Years.`,
        icon: "warning",
      });
      return false;
    }
    return true;
  };

  // Submit Button
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !Name.trim() ||
      !Surname.trim() ||
      !Dob.trim() ||
      !Standard.trim() ||
      !RollNo.trim() ||
      !GRNo.trim() ||
      Subject.length === 0
    ) {
      Swal.fire({
        title: "Enter All Inputs",
        text: "Please Enter All Inputs",
        icon: "error",
      });
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(Dob)) {
      Swal.fire({
        title: "Invalid Date Format",
        text: "Please Enter The date In YYYY-MM-DD Format",
        icon: "error",
      });
      return;
    }

    if (Formdata.some((item) => item.grno === GRNo)) {
      Swal.fire({
        title: "Duplicate GR Number",
        text: "GR Number Already Exists",
        icon: "error",
      });
      return;
    }
    if (!ValidDob(Dob, parseInt(Standard))) {
      return;
    }
    if (
      Formdata.some(
        (item) =>
          item.Standard === parseInt(Standard) &&
          item.RollNo === parseInt(RollNo)
      )
    ) {
      Swal.fire({
        title: "Dublicate Entry",
        text: "RollNO & Standard Already Exists",
        icon: "error",
      });
      return;
    }

    const rollNoInt = parseInt(RollNo);
    if (isNaN(rollNoInt) || rollNoInt.toString() !== RollNo.trim()) {
      Swal.fire({
        title: "Invalid Roll No",
        text: "Roll No must be an integer.",
        icon: "error",
      });
      return;
    }

    // API Calling
    {
      const added = {
        firstname: Name,
        surname: Surname,
        dateofbirth: Dob,
        standard: parseInt(Standard),
        rollno: parseInt(RollNo),
        grno: GRNo,
        subject: Subject,
      };

      axios
        .post("https://markmentor-1.onrender.com/auth/students", added)
        .then((response) => {
          setFormdata((prev) => [...prev, response.data.student]);
          setRefresh((prev) => !prev); // toggles the refresh value, triggering useEffect
          Swal.fire({
            title: "Added!",
            text: "New data has been added.",
            icon: "success",
          });
          ClearHandle();
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            title: "Server Error",
            text: error?.response?.data?.error || "Something went wrong!",
            icon: "error",
          });
        });
    }
    toggleModal();
  };

  // Delete Button
  const Removehandle = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/auth/students/${id}`)
          .then(() => {
            setFormdata((prev) => prev.filter((item) => item._id !== id));
            Swal.fire("Deleted!", "Student has been deleted.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete the student.", "error");
          });
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://markmentor-1.onrender.com/auth/students")
      .then((res) => {
        setFormdata(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setError("Failed to load students");
        setLoading(false);
      });
  }, [refresh]);

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          {/* Left side: Heading */}
          <h2 className="text-xl font-semibold text-gray-800">Students</h2>

          {/* Right side: Search form and Add Student button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center w-full sm:w-auto"
            >
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  value={searchinput}
                  onChange={(e) => setSearchinput(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                  placeholder="Search Student name..."
                />
              </div>
              <button
                type="submit"
                className="ml-2 p-2.5 text-sm font-medium text-white bg-[#509CDB] hover:bg-[#76a6ce] rounded-lg focus:ring-4 focus:outline-none"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>

            <button
              onClick={toggleModal}
              className="text-white bg-[#509CDB] hover:bg-[#76a6ce] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="button"
            >
              Add Student
            </button>
          </div>
        </div>

        {/* Model */}
        {showModal && (
          <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-[#3d3d3d30]">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-white">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Add Students
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
                  {/* Row 1 */}
                  <div className="grid gap-4 mb-4 grid-cols-2 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        value={Name}
                        placeholder="Enter first name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="surname"
                        onChange={(e) => setSurname(e.target.value)}
                        value={Surname}
                        placeholder="Enter last name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid gap-4 mb-4 grid-cols-2 sm:grid-cols-4">
                    <div>
                      <label
                        htmlFor="dob"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="dob"
                        onChange={(e) => setDob(e.target.value)}
                        value={Dob}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="gender"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="standard"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Standard
                      </label>
                      <select
                        id="standard"
                        onChange={(e) => setStandard(e.target.value)}
                        value={Standard}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      >
                        <option>Select standard</option>
                        {[...Array(12).keys()].map((i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={Subject}
                        onChange={(e) => {
                          const selected = [];
                          for (let option of e.target.options) {
                            if (option.selected) selected.push(option.value);
                          }
                          setSubject(selected);
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      >
                        <option value="Hindi">Hindi</option>
                        <option value="English">English</option>
                        <option value="Science">Science</option>
                        <option value="Math">Math</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid gap-4 mb-4 grid-cols-2 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="rollNo"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Roll No
                      </label>
                      <input
                        type="number"
                        id="rollNo"
                        placeholder="Enter roll no"
                        onChange={(e) => setRollNo(e.target.value)}
                        value={RollNo}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="grNo"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        GR No
                      </label>
                      <input
                        type="number"
                        id="grNo"
                        placeholder="Enter GR no"
                        value={GRNo}
                        onChange={(e) => setGRNo(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      />
                    </div>
                  </div>

                  {/* Parent Details Section */}
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-black mb-2">
                      Parent Details
                    </h2>
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 mb-4">
                      <div>
                        <label
                          htmlFor="parentName"
                          className="block mb-2 text-sm font-medium text-black"
                        >
                          Parent Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter parent name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="parentContact"
                          className="block mb-2 text-sm font-medium text-black"
                        >
                          Parent Contact No.
                        </label>
                        <input
                          type="tel"
                          placeholder="Enter contact no"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="address"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Address
                      </label>
                      <textarea
                        rows="2"
                        placeholder="Enter address"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-[#509CDB] hover:bg-[#76a6ce] text-white inline-flex items-center font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Data Table */}
        <section className="mt-4">
          <div className="overflow-x-auto">
            {Filterdata.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 w-full bg-red-50 border border-red-200 rounded-xl shadow-sm p-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-red-500 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856C18.07 19.37 20 16.507 20 13.5S18.07 7.63 15.938 7H8.062C5.93 7 4 9.863 4 12.87S5.93 19.37 8.062 19z"
                  />
                </svg>
                <p className="text-lg font-semibold text-red-600">
                  Student Not Found
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Please try again or check your entry.
                </p>
              </div>
            ) : (
              <table className="w-full text-left text-gray-700 overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-2 text-sm font-semibold">
                      Firstname
                    </th>
                    <th className="px-6 py-2 text-sm font-semibold">Surname</th>
                    <th className="px-6 py-2 text-sm font-semibold">DOB</th>
                    <th className="px-6 py-2 text-sm font-semibold">STD</th>
                    <th className="px-6 py-2 text-sm font-semibold">Roll No</th>
                    <th className="px-6 py-2 text-sm font-semibold">GR No</th>
                    <th className="px-6 py-2 text-sm font-semibold">Subject</th>
                    <th className="px-6 py-2 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {Filterdata.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t hover:bg-[#3d3d3d30] transition"
                    >
                      <td className="px-6 py-3 font-medium">
                        {item.firstname}
                      </td>
                      <td className="px-6 py-3 font-medium">{item.surname}</td>
                      <td className="px-6 py-3 font-medium">
                        {new Date(item.dateofbirth).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3 font-medium">{item.standard}</td>
                      <td className="px-6 py-3 font-medium">{item.rollno}</td>
                      <td className="px-6 py-3 font-medium">{item.grno}</td>
                      <td className="px-6 py-3 font-medium">{item.subject}</td>
                      <td className="px-6 py-3 font-medium">
                        <div className="flex justify-between items-center">
                          <button
                            type="button"
                            className="text-gray-500 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                            onClick={() => Removehandle(item._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Loader */}
        {loading && (
          <div className="flex items-center justify-center ">
            <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </>
  );
}

export default Student;
