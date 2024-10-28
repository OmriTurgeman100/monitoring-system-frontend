import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

export const TimeSeriesGraph = () => {
  const { id } = useParams();

  const fetch_graph_data = async () => {
    const response = await fetch(`http://localhost/api/v1/report/graph/${id}`);

    const data = await response.json();

    console.log(data);
  };

  useEffect(() => {
    fetch_graph_data();
  }, []);

  return (
    <div>
      <h2>{id}</h2>
    </div>
  );
};
