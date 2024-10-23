import { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
  }, []);

  return (
    <div>
      <h1>post report</h1>
    </div>
  );
};
