import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "../styles/graph_report.css";
import "react-toastify/dist/ReactToastify.css";

type report = {
  description: string;
  id: number;
  parent: number;
  report_id: string;
  time: string;
  title: string;
  value: number;
};

export const TimeSeriesGraph = () => {
  const { id } = useParams();
  const [reports, setReports] = useState<report[]>([]);

  const fetch_graph_data = async () => {
    const response = await fetch(`http://localhost/api/v1/report/graph/${id}`);

    const data = await response.json();

    if (response.ok) {
      setReports(data);
      toast.success("fetched reports");
    }
  };

  useEffect(() => {
    fetch_graph_data();
  }, []);

  return (
    <div>
      <div className="report_data_container">
        <h2 className="report-type">{id}</h2>
        {reports.map((report) => (
          <div className="graph-report">
            <h2>value: {report.value}</h2>
            <h2>date {report.time}</h2>
          </div>
        ))}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};
