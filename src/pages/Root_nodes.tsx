import { useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<root_nodes[]>([]);

  const get_root_nodes = async () => {
    const response = await fetch("http://127.0.0.1/api/v1/root_nodes");

    const data = await response.json();

    if (response.ok) {
      setNodes(data);
    }
  };

  const handle_nodes_post = async () => {
    navigate(`/post/root`);
  };

  useEffect(() => {
    get_root_nodes();

    // setInterval(get_root_nodes, 5000);
  }, []);

  return (
    <div>
      <div className="grid-cards-container">
        {nodes.map((node) => (
          <Link to={`/${node.node_id}`} key={node.node_id}>
            <div
              className={`${
                node.status === "up"
                  ? "single_card_up"
                  : node.status === "down"
                  ? "single_card_down"
                  : node.status === "critical"
                  ? "single_card_critical"
                  : "single_card_expired"
              }`}
            >
              <h2 className="card">{node.title}</h2>
              <h2 className="card">{node.status}</h2>
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
        <Button onClick={handle_nodes_post}>nodes</Button>
        <Button disabled>reports</Button>
      </ButtonGroup>
    </div>
  );
};
