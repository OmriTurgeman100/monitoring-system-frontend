import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import "../styles/post_report.css";

interface Report {
  description: string;
  parent: string | null;
  report_id: string;
  title: string;
}

export const PostReport = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const { id } = useParams();
  const navigate = useNavigate();

  const fetch_reports = async () => {
    const response = await fetch(
      "http://localhost/api/v1/get/reports/distinct/null"
    );

    const data = await response.json();

    if (response.ok) {
      setReports(data);
    }
  };

  useEffect(() => {
    fetch_reports();
  }, []);

  const post_report = async (
    report_id: string,
    report_title: string,
    report_description: string
  ) => {
    console.log(report_id);
    console.log(id);

    const response = await fetch("http://localhost/api/v1/post/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        report_id: report_id,
        title: report_title,
        description: report_description,
        parent: id,
      }),
    });

    const data = await response.json();

    const message: string = data.message;

    if (response.ok) {
      navigate(-1);
    } else {
      console.log(message);
      toast.error('הריפורט הנ"ל כבר משויך לקוביה');

      console.log("response is bad", response);
    }
  };
  const filteredReports = reports.filter((report) =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="report_container">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search_input"
      />

      {filteredReports.length > 0 ? (
        filteredReports.map((report) => (
          <div key={report.report_id} className="report">
            <Button
              onClick={() =>
                post_report(report.report_id, report.title, report.description)
              }
              variant="contained"
              size="small"
              sx={{
                minWidth: "20px",
                padding: "2px 6px",
                fontSize: "10px",
              }}
            >
              <AddOutlinedIcon sx={{ fontSize: "16px" }} />{" "}
            </Button>
            <h3>{report.title}</h3>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};
