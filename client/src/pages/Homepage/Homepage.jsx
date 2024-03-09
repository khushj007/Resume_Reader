import { useState, useRef, useEffect } from "react";
import "./Homepage.css";
import axios from "axios";
import Loader2 from "../../components/Loader2/Loader2";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
const Homepage = () => {
  const [query, setQuery] = useState([""]);
  const [response, setResponse] = useState(["Ask me anything ?"]);
  const [question, setQuestion] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const maxLength = Math.max(query.length, response.length);
  const chatsRef = useRef(null);

  const scrollToBottom = () => {
    if (chatsRef?.current?.scrollHeight) {
      chatsRef.current.scrollTop = chatsRef?.current?.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [maxLength, response, query]);

  async function handleSubmit() {
    if (question) {
      toast.error("provide query");
      return;
    }
    setLoading(true);
    try {
      setQuery((prevQueries) => [...prevQueries, question]);

      const res = await axios.post("http://127.0.0.1:8000/query", {
        query: question,
      });
      if (res.status === 200) {
        setResponse((prevResponses) => [...prevResponses, res.data.response]);
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

  async function changePdf(e) {
    try {
      setLoading1(true);
      const selectedFile = e.target.files[0];

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post("http://127.0.0.1:8000/pdf", formData);
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
        <h2>Read Resume</h2>
        <input
          style={{ display: "none" }}
          id="file"
          type="file"
          onChange={changePdf}
          accept=".pdf"
        />
        <label htmlFor="file" className="unp">
          Change PDF
        </label>
      </div>
      <div className="page">
        <div className="chats" ref={chatsRef}>
          {Array.from({ length: maxLength }).map((_, index) => (
            <div key={index} className="chat">
              <div className="query">{query[index]}</div>
              <div className="response">{response[index]}</div>
            </div>
          ))}
          {loading ? <Loader2 /> : null}
        </div>
      </div>
      <div className="bottom" style={{ display: loading ? "none" : null }}>
        <div className="askquery">
          <input
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
            type="text"
            placeholder="Ask me anything "
            className="askquery"
            value={question}
          />
          <button className="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
