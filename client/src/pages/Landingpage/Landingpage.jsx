import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import "./Landing.css";

const Landingpage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleChange = async (e) => {
    let response = "";
    setLoading(true);
    try {
      const selectedFile = e.target.files[0];

      const formData = new FormData();
      formData.append("file", selectedFile);

      response = await axios.post("http://127.0.0.1:8000/pdf", formData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      if (response) {
        navigate("/homepage");
      } else {
        toast.error("something went wrong");
      }
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="landing">
      <h2>Welcome To Ask Resume</h2>
      <input id="file" type="file" onChange={handleChange} accept=".pdf" />
      <label htmlFor="file">Upload Pdf</label>
    </div>
  );
};

export default Landingpage;
