import React, { useEffect, useState } from "react";
import StepTwo from "./StepTwo";
import Final from "./Final";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [lastName,setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);
  const [page, setPage] = useState(0);
  const [selectedArea, setSelectedArea] = useState("");
  const [district, setDistrict] = useState("");
  const [local, setLocal] = useState("");
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [selectedGuild, setSelectedGuild] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [disable, setDisable] = useState(true);
  const [studentSchool, setStudentSchool] = useState("");
  const [studentCourse, setStudentCourse] = useState("");
  const [studentLevel, setStudentLevel] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false); // Loader state
  const [imagePreview, setImagePreview] = useState(null); // Add this line
  const [otherProfession, setOtherProfession] = useState("");
  const [studentStatus, setStudentStatus] = useState("No");
  useEffect(() => {
    if (firstName && lastName && phone && gender) {
      setDisable(false);
    }
  }, [firstName, lastName, email, phone, gender]);
  const notify = (msg) => toast(msg);
  const UploadData = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/register-pewg-members",
        //"https://pewgapi.echgh.bid/api/pewg-members",
        data
      );
      return res;
    } catch (error) {
      setLoading(false); // Hide loader
      console.log(error);

      if (error.response) {
        // Server responded with a status code out of 2xx range
        console.error("Error Response Details:", {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
        setErrorMessage(error.response?.data?.msg || "Server error");
        toast.error(error.response?.data?.msg || "Something went wrong!!");
      } else if (error.request) {
        // Request was made but no response was received
        console.error("Error Request Details:", error.request);
        setErrorMessage("Network error. Please try again later.");
        toast.error("Network error. Please try again later.");
      } else {
        // Something else happened while setting up the request
        console.error("Unexpected Error:", error.message);
        setErrorMessage("An error occurred while setting up the request.");
        toast.error("An error occurred while setting up the request.");
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine the profession based on student status
    const profession =
      studentStatus === "Yes"
        ? "Student"
        : otherProfession
        ? otherProfession
        : selectedProfession?.value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("firstName", firstName);
    formData.append("otherName", otherName);
    formData.append("lastName",lastName)
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("gender", gender);
    formData.append("selectedArea", selectedArea?.value);
    formData.append("district", district);
    formData.append("local", local);
    formData.append("selectedProfession", profession); 
    formData.append("selectedGuild", selectedGuild?.value);
    formData.append("selectedStatus", selectedStatus?.value);
    formData.append("studentSchool", studentSchool);
    formData.append("studentCourse", studentCourse);
    formData.append("studentLevel", studentLevel);

    setLoading(true); // Show loader

    try {
      const response = await UploadData(formData);
      if (response) {
        notify(response.data?.msg || "Registration successful");
        // Reset state to initial values
        setTitle("");
        setFirstName("");
        setOtherName("");
        setLastName("")
        setEmail("");
        setPhone("");
        setGender("");
        setImage(null);
        setSelectedArea("");
        setDistrict("");
        setLocal("");
        setSelectedProfession(null);
        setSelectedGuild(null);
        setSelectedStatus(null);
        setStudentSchool("");
        setStudentCourse("");
        setStudentLevel("");
        setOtherProfession("");
        setStudentStatus("No")
        setPage(0);

        setLoading(false); // Hide loader
      }
    } catch (error) {
      setLoading(false); // Hide loader
      setErrorMessage(error.response?.data?.msg || "Registration failed");
      toast.error(error.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen ">
      <div className="bg-[#052c65] p-1">
        <h4 className="text-white text-lg">Home</h4>
      </div>
      <div className="md:flex justify-center hidden">
        <img src="pewglogo.png" alt="" className="w-16 rounded-full -mt-8" />
      </div>
      <div className="flex justify-center mt-4 p-1">
        <ToastContainer />
        <form className="md:w-1/2 w-96  bg-white shadow-lg p-4">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-50 bg-white bg-opacity-50">
              <div className="text-center mb-4 text-green-700 font-medium">
                Submitting... Please wait.
              </div>
            </div>
          )}

          {page === 0 ? (
            <div className="">
              <div className="flex flex-col items-center">
                <h4 className="text-lg italic">PeWG Registration Portal</h4>
                <hr className="md:w-96 h-1 border-violet-900" />
              </div>
              <div className="flex flex-col gap-4 mb-4">
                <div className="flex flex-col gap-4 mb-4 md:flex-row">
                  <div className="flex flex-col w-full md:w-1/2">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Title <span className="text-red-600">*</span>
                    </label>

                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    >
                      <option>Select Title</option>
                      <option value="Apostle">Apostle</option>
                      <option value="Prophet">Prophet</option>
                      <option value="Evangelist">Evangelist</option>
                      <option value="Pastor">Pastor</option>
                      <option value="Overseer">Overseer</option>
                      <option value="Elder">Elder</option>
                      <option value="Deacon">Deacon</option>
                      <option value="Deaconess">Deaconess</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Miss">Miss</option>
                      <option value="Bro">Bro</option>
                      <option value="Sis">Sis</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full md:w-1/2">
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      First name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Doe"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 mb-4">
                <div className="flex flex-col gap-4 mb-4 md:flex-row">
                  <div className="flex flex-col w-full md:w-1/2">
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Last name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-1/2">
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Other names 
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="John"
                      value={otherName}
                      onChange={(e) => setOtherName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              
                <div className="flex flex-col gap-4 mb-4 md:flex-row">
                  <div className="flex flex-col w-full md:w-full">
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Email 
                    </label>
                    <input
                      type="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="john.doe@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              

              <div className="flex flex-col gap-4 mb-4 md:flex-row">
                <div className="flex flex-col w-full md:w-1/2">
                  <label
                    htmlFor="phone_number"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="phone_number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="123-456-7890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Gender <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">--Select Gender--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 "
                  htmlFor="file_input"
                >
                  Upload Image
                </label>
                <input
                  className="w-full text-sm text-gray-900 border border-gray-300 p-1 rounded-lg cursor-pointer bg-gray-50"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setImagePreview(reader.result); // Set preview URL
                      };
                      reader.readAsDataURL(file);
                      setImage(file); // Set file
                    }
                  }}
                  aria-describedby="file_input_help"
                  type="file"
                  accept="image/*" // Accept only image files
                  id="file_input" // Give the input an ID to reference it
                />
                <p className="mt-1 text-sm text-gray-500 " id="file_input_help">
                  SVG, PNG, JPG, or GIF (MAX. 800x400px).
                </p>

                {/* Display Image Preview and Delete Option */}
                {image ? (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-20 h-20 object-cover border rounded-lg shadow"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null); // Clear image
                        setImagePreview(null); // Clear preview
                        document.getElementById("file_input").value = ""; // Clear file input
                      }}
                      className="mt-2 text-red-500 hover:underline text-sm"
                    >
                      Delete Image
                    </button>
                  </div>
                ) : (
                  <div>
                    <img
                      src="person.png"
                      alt="sample_image"
                      className="w-20 h-20 "
                    />
                  </div>
                )}
              </div>

              <br />

              <button
                type="submit"
                disabled={disable}
                onClick={() => setPage(1)}
                className={`text-white bg-blue-700 ${
                  disable && "bg-opacity-35"
                } font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
              >
                Next
              </button>
            </div>
          ) : page === 1 ? (
            <StepTwo
              setLocal={setLocal}
              setDistrict={setDistrict}
              district={district}
              setSelectedArea={setSelectedArea}
              selectedArea={selectedArea}
              local={local}
              setPage={setPage}
              page={page}
            />
          ) : (
            <Final
              selectedGuild={selectedGuild}
              page={page}
              setPage={setPage}
              selectedProfession={selectedProfession}
              setSelectedStatus={setSelectedStatus}
              setSelectedProfession={setSelectedProfession}
              setSelectedGuild={setSelectedGuild}
              selectedStatus={selectedStatus}
              handleSubmit={handleSubmit}
              studentCourse={studentCourse}
              studentSchool={studentSchool}
              setStudentCourse={setStudentCourse}
              setStudentSchool={setStudentSchool}
              studentLevel={studentLevel}
              setStudentLevel={setStudentLevel}
              otherProfession={otherProfession}
              setOtherProfession={setOtherProfession}
              studentStatus={studentStatus}
              setStudentStatus={setStudentStatus}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default Home;
