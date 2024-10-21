import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/root_nodes.css";

type root_nodes = {
  description: string;
  excluded: string;
  node_id: number;
  parent: number | null;
  status: string;
  time: string;
  title: string;
};

export const Root_nodes = () => {
  const [nodes, setNodes] = useState<root_nodes[]>([]);

  const get_root_nodes = async () => {
    const response = await fetch("http://127.0.0.1/api/v1/root_nodes");

    const data = await response.json();

    console.log("test");

    if (response.ok) {
      setNodes(data);
    }
  };

  useEffect(() => {
    get_root_nodes();

    setInterval(get_root_nodes, 5000);
  }, []);

  return (
    <div className="grid-cards-container">
      {nodes.map((node) => (
        <Link to={`/${node.node_id}`} key={node.node_id}>
          <div className="single_card">
            <h2>{node.title}</h2>
            <h2>{node.status}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};
