import { useState, useRef, useEffect } from "react";
import "./Homepage.css";
import axios from "axios";
import Loader2 from "../../components/Loader2/Loader2";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import Logo from "../../assets/logo.svg";
import File from "../../assets/file.svg";
import Submit from "../../assets/submit.png";
import System from "../../assets/system.jpeg";
import Profile from "../../assets/profile.png";
import { v4 as uuidv4 } from "uuid";
const Homepage = () => {
  const FileUploaded = useRef(false);
  const [Filename, setFileName] = useState("");
  const [question, setQuestion] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [rq, setRq] = useState(["Ask me anything ?"]);
  const chatsRef = useRef(null);

  // automatically scroll down the chats
  const scrollToBottom = () => {
    if (chatsRef?.current?.scrollHeight) {
      chatsRef.current.scrollTop = chatsRef?.current?.scrollHeight;
      console.log(chatsRef?.current?.scrollHeight);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [rq.length]);
  //  function to send query and receive answers
  async function handleSubmit() {
    // validation question should not be empty
    try {
      setLoading(true);
      if (!question) {
        toast.error("provide query");
        return;
      }
      if (!FileUploaded.current) {
        toast.error("please upload resume first");
        return;
      }

      setRq((prevvalue) => [...prevvalue, question]);
      const res = await axios.post("https://resume-reader.onrender.com/query", {
        query: question,
      });
      if (res.status === 200) {
        setRq((prevvalue) => [...prevvalue, res.data.response]);
      } else {
        toast.error("No data received from the server");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setQuestion("");
      setLoading(false);
    }
  }

  // function to change resume pdf
  async function changePdf(e) {
    try {
      setLoading1(true);
      const selectedFile = e.target.files[0];
      let filename = e.target.files[0].name;
      setFileName(filename.slice(0, 17));
      setRq(["Ask me anything ?"]);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "https://resume-reader.onrender.com/pdf",
        formData
      );

      console.log("respone", response);
      FileUploaded.current = response.status == 200 ? true : false;
    } catch (error) {
      console.log("error", error.message);
    } finally {
      setLoading1(false);
    }
  }

  if (loading1) {
    return <Loader />;
  }

  return (
    <div className="homepage">
      <div className="navbar">
        <img src={Logo} alt="logo" className="logo" />
        <div className="rnav">
          <input
            style={{ display: "none" }}
            id="file"
            type="file"
            onChange={changePdf}
            accept=".pdf"
          />
          {Filename ? <img className="fimg" src={File} alt="file" /> : null}
          {Filename ? <p className="fname">{Filename}</p> : null}
          <label htmlFor="file" className="unp">
            <span>&#x2295;</span> Upload PDF
          </label>
          <label htmlFor="file" className="unp2">
            &#x2295;
          </label>
        </div>
      </div>
      <div className="page">
        {/* display both response and chats in a chat style */}
        <div className="chats" ref={chatsRef}>
          {rq.map((value, index) => {
            if (index % 2 != 0) {
              return (
                <div key={uuidv4()} className="query">
                  <img src={Profile} alt="profile" />
                  <p>{value}</p>
                </div>
              );
            } else {
              return (
                <div key={uuidv4()} className="response">
                  <img src={System} alt="system" />
                  <p>{value}</p>
                </div>
              );
            }
          })}
          {loading ? <Loader2 /> : null}
        </div>
      </div>

      {/*stop user from entering question when the response is processing */}
      <div className="bottom" style={{ display: loading ? "none" : null }}>
        <div className="askquery">
          <input
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
            type="text"
            placeholder="Send a message..."
            className="askquery_inp"
            value={question}
          />
          <img
            className="submit"
            src={Submit}
            alt="submit"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
