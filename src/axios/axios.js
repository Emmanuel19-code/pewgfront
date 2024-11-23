import axios from "axios";

export const UploadData = async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/v1/pewg/register_pewg_member",
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
