import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export const Specified_node = () => {
  const { id } = useParams();

  const get_data = async () => {
    const response = await fetch(`http://127.0.0.1/api/v1/nodes/${id}`);

    const data = await response.json();

    if (data.reports && data.reports.length > 0) {
      console.log("reports");
    }
    

    if (data.nodes && data.nodes.length > 0) {
      console.log("nodes");
    }
    
  };

  useEffect(() => {
    get_data();
  }, []);

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};
