import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const TimeSeriesGraph = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log("hello from the graph page");
  }, []);

  return (
    <div>
      <h2>{id}</h2>
      <h1>future graph page</h1>
    </div>
  );
};
