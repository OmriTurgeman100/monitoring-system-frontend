import { useEffect, useState } from "react";
import "../styles/latest_reports.css";

type reports = {
  time: string;
  title: string;
  value: number;
};

export const LatestReports = () => {
  const [reports, setReports] = useState<reports[]>([]);

  const fetch_latest_reports = async () => {
    const response = await fetch("http://localhost/api/v1/latest/reports");

    const data = await response.json();

    if (response.ok) {
      setReports(data);
    }
  };

  useEffect(() => {
    fetch_latest_reports();

    setInterval(fetch_latest_reports, 1000);
  }, []);

  return (
    <div>
      <div className="grid-cards-container">
        {reports.map((report) => (
          <div className="single_card_report_distinct">
            <h2>{report.title}</h2>
            <p>{new Date(report.time).toLocaleString()}</p>
            <p>{report.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
