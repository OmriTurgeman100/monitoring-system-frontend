import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
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

      {/* Render filtered reports */}
      {filteredReports.length > 0 ? (
        filteredReports.map((report) => (
          <div key={report.report_id} className="report">
            <Button
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
          </div>
        ))
      ) : (
        <p>No reports found</p>
      )}
    </div>
  );
};
