import { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import "../styles/post_report.css";

interface report {
  description: string;
  parent: string | null;
  report_id: string;
  title: string;
}

export const PostReport = () => {
  const [reports, setReports] = useState<report[]>([]);
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
    console.log(reports);
  }, [reports]);

  return (
    <div className="report_container">
      <input></input> 
      {reports.map((report) => (
        <div className="report">
          <Button
            variant="contained"
            size="small"
            sx={{
              minWidth: "20px", // Custom width
              padding: "2px 6px", // Custom padding
              fontSize: "10px", // Smaller font size
            }}
          >
            <AddOutlinedIcon sx={{ fontSize: "16px" }} />{" "}
            {/* Smaller icon size */}
          </Button>
          <h3>{report.title}</h3>
        </div>
      ))}
    </div>
  );
};
