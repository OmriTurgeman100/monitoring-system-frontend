import { useEffect, useState } from "react";

type reports = {
  time: Date;
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
      console.log(reports);
    }
  };

  useEffect(() => {
    fetch_latest_reports();
  }, [reports]);

  return (
    <div>
      <div className="grid-cards-container">
        {reports.map((report) => (
          <div className="single_card_report">
            <h2>{report.title}</h2>
            {/* <p>{report.time}</p> */}
            <p>{report.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
