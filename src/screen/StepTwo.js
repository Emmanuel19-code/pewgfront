import React, { useEffect, useState } from "react";
import { ChurchArea } from "../data/churchArea";
import Select from "react-select";

const StepTwo = ({
  setSelectedArea,
  selectedArea,
  district,
  setDistrict,
  local,
  setLocal,
  setPage,
  page,
}) => {
  const [disable, setDisable] = useState(true);
  useEffect(() => {
    if (district && local && selectedArea) {
      setDisable(false);
    }
  }, [district, local, selectedArea]);
 
  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <h4 className="text-lg italic">PeWG Registration Portal</h4>
        <hr className="w-96 h-1" />
      </div>
      <div className="my-2">
        <h4 className="font-nunito font-bold">STEP TWO</h4>
      </div>
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex flex-col">
          <label
            htmlFor="church_area"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Select a Church Area / Sector <span className="text-red-600">*</span>
          </label>
          <Select
            id="church_area"
            value={selectedArea}
            onChange={setSelectedArea}
            options={ChurchArea.map((item) => ({
              value: item.value,
              label: item.label,
            }))}
            placeholder="--Select Area--"
            className="react-select-container"
            classNamePrefix="react-select"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="district"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          District <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="district"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter Church District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="local"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Local <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="local"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter Local Assembly"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-row">
        <button
          type="button"
          disabled={disable}
          className={`text-white m-1 bg-gray-600 hover:bg-gray-400  font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
          onClick={() => setPage(page - 1)} // Use navigate(-1) to go back
        >
          Previous
        </button>
        <button
          type="submit"
          className={`text-white m-1 bg-blue-700 ${
            disable && "bg-opacity-40"
          }  font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
