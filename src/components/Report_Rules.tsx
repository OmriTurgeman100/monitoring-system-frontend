import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const Report_Rules = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log("hey from rules page! ");
  }, []);

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};
