import { useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/nodes.css";

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
    <div>
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
      <ButtonGroup
        variant="contained"
        aria-label="Basic button group"
        sx={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          margin: "10px",
        }}
      >
        <Button disabled>rules</Button>
        <Button>nodes</Button>
        <Button disabled>reports</Button>
      </ButtonGroup>
    </div>
  );
};
