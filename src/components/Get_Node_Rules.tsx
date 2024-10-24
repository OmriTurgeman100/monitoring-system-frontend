import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Get_Node_Rules = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("hey from use effect!");
  }, []);

  return (
    <div>
      <h1>get node rules</h1>
    </div>
  );
};
