import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Fees() {
  const [billingData, setBillingData] = useState([]); // ⬅️ For showing billing table
  const [formdata, setformdata] = useState({
    bilname: "",
    standard: "",
    billedToRoll: "",
    amount: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://markmentor.onrender.com/auth/addbilling", formdata)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "Added!",
          text: "Paid SuccessFully.",
          icon: "success",
        });
        window.location.reload();
      })
      .catch((err) => console.log("api error", err));
  };

  useEffect(() => {
    axios
      .get("https://markmentor.onrender.com/auth/getallbilling")
      .then((res) => {
        console.log("Response data", res.data);
        const allBilling = res.data.flatMap((item) => item.billing);
        setBillingData(allBilling); // ✅ Use separate state
      })
      .catch((err) => console.log("Backend Error", err));
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Pay Fees</h2>
      </div>
      <div className="max-w-6xl mx-auto mt-5">
        <form onSubmit={handlesubmit}>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="bilname"
                onChange={handlechange}
                placeholder="Enter name"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Standard */}
            <div>
              <label
                htmlFor="standard"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Standard
              </label>
              <select
                id="standard"
                name="standard"
                onChange={handlechange}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Select standard</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((std) => (
                  <option key={std} value={std}>
                    {std}
                  </option>
                ))}
              </select>
            </div>

            {/* Roll No */}
            <div>
              <label
                htmlFor="billedToRoll"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Roll No
              </label>
              <input
                type="number"
                name="billedToRoll"
                onChange={handlechange}
                placeholder="Enter roll no"
                required
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="amountrollNo"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <input
                type="number"
                name="amount"
                onChange={handlechange}
                placeholder="Enter Amount"
                required
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Payment */}
            <div>
              <label
                htmlFor="payment"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Payment
              </label>
              <button
                type="submit"
                className="bg-[#509CDB] hover:bg-[#76a6ce] text-white text-sm font-medium rounded-lg w-full p-2 transition duration-200"
              >
                Pay
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-2 ">Name</th>
              <th className="px-4 py-2 ">Standard</th>
              <th className="px-4 py-2 ">Roll No</th>
              <th className="px-4 py-2 ">Amount</th>
            </tr>
          </thead>
          <tbody>
            {billingData.length > 0 ? (
              billingData.map((exam, index) => (
                <tr key={index} className="bg-white">
                  <td className="px-4 py-2">{exam.bilname}</td>
                  <td className="px-4 py-2">{exam.standard}th</td>
                  <td className="px-4 py-2">{exam.billedToRoll}</td>
                  <td className="px-4 py-2">{exam.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
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
                    <p className="text-sm font-semibold">
                      No Billing Records Found
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      This student hasn't made any payments yet.
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
}

export default Fees;
