import React, { useState } from "react";
import axios from "axios";

function Billing() {
  const [loadingButton, setLoadingButton] = useState(null);
  const handlesubmit = async (e) => {
    e.preventDefault();

    // Button Type Checking
    const clicked = e.nativeEvent.submitter.name; // 'basic' or 'pro'
    setLoadingButton(clicked);

    try {
      const response = await axios.post("https://markmentor-1.onrender.com/auth/billing");
      if (response && response.status === 200) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.log("error: ", error);
      alert("Payment failed. Please try again.");
      setLoadingButton(null);
    }
  };

  return (
    <>
      <form onSubmit={handlesubmit}>
        <div className="mx-auto  grid max-w-lg grid-cols-1 items-center gap-y-6  sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
          <div className="rounded-3xl rounded-t-3xl bg-white/60 p-8 ring-1 ring-gray-900/10 sm:mx-8 sm:rounded-b-none sm:p-10 lg:mx-0 lg:rounded-tr-none lg:rounded-bl-3xl">
            <h3
              id="tier-hobby"
              className="text-base/7 font-semibold text-[#509CDB]"
            >
              Hobby
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-5xl font-semibold tracking-tight text-gray-900">
                $29
              </span>
              <span className="text-base text-gray-500">/month</span>
            </p>
            <p className="mt-6 text-base/7 text-gray-600">
              The perfect plan if you're just getting started with our product.
            </p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm/6 text-gray-600 sm:mt-10"
            >
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-[#509CDB]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
                Upto 100 Students
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-[#509CDB]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
                5 Teacher Accounts
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-[#509CDB]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
                Attendance, Homework & Exam Management
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-[#509CDB]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
                Basic Report Generation
              </li>
            </ul>
            <p
              aria-describedby="tier-hobby"
              className="mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-[#509CDB] ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-10"
            >
              <button
                type="submit"
                name="basic"
                disabled={loadingButton === "basic"}
              >
                {loadingButton === "basic"
                  ? "Redirecting..."
                  : "Get started today"}
              </button>
            </p>
          </div>

          {/* Enterprise */}
          <div className="relative rounded-3xl dark:bg-[#152259] p-8 shadow-2xl ring-1 ring-gray-900/10 sm:p-10">
            <h3
              id="tier-enterprise"
              className="text-base/7 font-semibold text-[#509CDB]"
            >
              Enterprise
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-5xl font-semibold tracking-tight text-white">
                $99
              </span>
              <span className="text-base text-gray-400">/month</span>
            </p>
            <p className="mt-6 text-base/7 text-gray-300">
              Dedicated support and infrastructure for your school.
            </p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm/6 text-gray-300 sm:mt-10"
            >
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-[#509CDB]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
                Upto 500 Students
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-[#509CDB]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
                Unlimited Teachers
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-[#509CDB]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
                Advanced Analytics Dashboard
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-[#509CDB]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
                Online Fee Collection & Billing
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-[#509CDB]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
                Custom Report Cards
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-[#509CDB]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
                SMS & Email Notifications
              </li>
            </ul>
            <p
              aria-describedby="tier-enterprise"
              className="mt-8 block rounded-md bg-[#509CDB] hover:bg-[#81b3db] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:mt-10"
            >
              <button
                type="submit"
                name="pro"
                disabled={loadingButton === "pro"}
              >
                {loadingButton === "pro"
                  ? "Redirecting..."
                  : "Get started today"}
              </button>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default Billing;
