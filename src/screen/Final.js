import React, { useEffect, useState } from "react";
import { Profession } from "../data/Professions";
import { Business } from "../data/Business";
import { Roles } from "../data/Role";
import Select from "react-select";

const Final = ({
  selectedGuild,
  setSelectedGuild,
  page,
  setPage,
  selectedProfession,
  setSelectedProfession,
  setSelectedStatus,
  selectedStatus,
  handleSubmit,
  studentSchool,
  setStudentSchool,
  studentLevel,
  setStudentLevel,
  studentCourse,
  setStudentCourse,
}) => {
  const [disable, setDisable] = useState(true);
  const [studentStatus, setStudentStatus] = useState("No");
  useEffect(() => {
    if (selectedGuild && selectedProfession && selectedStatus) {
      setDisable(false);
    }
  }, [selectedGuild, selectedProfession, selectedStatus]);
 useEffect(()=>{
  if(studentStatus === "Yes"){
     setSelectedProfession("Student")
     setSelectedGuild("Student")
  }
 },[studentStatus])
  const handleProfessionChange = (selectedOption) => {
    setSelectedProfession(selectedOption);
  };

  const handleGuildChange = (selectedOption) => {
    setSelectedGuild(selectedOption);
  };

  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption);
  };

  return (
    <div className="">
      <div className="">
        <div className="w-full">
          <div className="flex flex-col items-center">
            <h4 className="text-lg italic">PeWG Registration Portal</h4>
            <hr className="md:w-96 h-1" />
          </div>
          <div className="flex flex-row items-center mb-2">
            <p className=" text-sm font-bold text-gray-900">
              Are you a Student?
            </p>
            <div className="ml-2">
              <input
                type="radio"
                name="student"
                value="No"
                checked={studentStatus === "No"}
                onChange={(e) => setStudentStatus(e.target.value)}
              />
              <label className="ml-1">No</label>
            </div>
            <div className="ml-2">
              <input
                type="radio"
                name="student"
                value="Yes"
                checked={studentStatus === "Yes"}
                onChange={(e) => setStudentStatus(e.target.value)}
              />
              <label className="ml-1">Yes</label>
            </div>
          </div>
          {studentStatus === "No" && (
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex flex-col">
                <label
                  htmlFor="profession"
                  className="block mb-2 text-sm font-bold text-gray-900"
                >
                  Select your Occupation or Profession{" "}
                  <span className="text-red-600">*</span>
                </label>
                <Select
                  id="profession"
                  value={selectedProfession}
                  onChange={handleProfessionChange}
                  options={Profession.map((item) => ({
                    value: item.value,
                    label: item.label,
                  }))}
                  className="w-full"
                  placeholder="Select a profession..."
                />
              </div>
            </div>
          )}
          {studentStatus === "No" && (
            <div className="mb-4">
              <label
                htmlFor="guild"
                className="block mb-2 text-sm font-bold text-gray-900"
              >
                Select your Guild <span className="text-red-600">*</span>
              </label>
              <Select
                id="guild"
                value={selectedGuild}
                onChange={handleGuildChange}
                options={Business.map((item) => ({
                  value: item.value,
                  label: item.label,
                }))}
                className="w-full"
                placeholder="Select a guild..."
              />
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="status"
              className="block mb-2 text-sm font-bold text-gray-900"
            >
              Member Status <span className="text-red-600">*</span>
            </label>
            <Select
              id="status"
              value={selectedStatus}
              onChange={handleStatusChange}
              options={Roles.map((item) => ({
                value: item.value,
                label: item.label,
              }))}
              className="w-full"
              placeholder="Select a status..."
            />
          </div>
          {studentStatus === "Yes" && (
            <div>
              <div className="flex flex-col">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Student School
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="John"
                  value={studentSchool}
                  onChange={(e) => setStudentSchool(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Student Program / Course
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="John"
                  value={studentCourse}
                  onChange={(e) => setStudentCourse(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Student Level
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="John"
                  value={studentLevel}
                  onChange={(e) => setStudentLevel(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <h4 className="text-red-700 font-bold">Applicant's Consent</h4>
            <p>
              By completing this form, I hereby provide my explicit consent to
              the COP Workers Guild for the utilization of my personal
              information exclusively for the purposes related to this
              registration.
            </p>
          </div>

          <div className="flex flex-row">
            <button
              type="button"
              className="text-white m-1 bg-gray-600 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <button
              type="submit"
              disabled={disable}
              onClick={handleSubmit}
              className={`text-white m-1 bg-blue-700 ${
                disable && "bg-opacity-20"
              } font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Final;
