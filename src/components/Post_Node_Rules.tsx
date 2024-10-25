import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const Post_Node_Rules = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>post node rules</h1>
    </div>
  );
};
