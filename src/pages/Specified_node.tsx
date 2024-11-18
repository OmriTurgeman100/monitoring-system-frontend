import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import RuleIcon from "@mui/icons-material/Rule";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import Checkbox from "@mui/material/Checkbox";
import "react-toastify/dist/ReactToastify.css";
import "../styles/report.css";

type sub_nodes = {
  description: string;
  excluded: string;
  node_id: number;
  parent: number | null;
  status: string;
  time: string;
  title: string;
};

type reports = {
  description: string;
  id: number;
  parent: number;
  report_id: string;
  time: string;
  title: string;
  value: number | null;
};

type data = {
  reports?: reports[];
  nodes?: sub_nodes[];
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const Specified_node = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nodesData, setNodesData] = useState<data | null>(null);

  const get_data = async () => {
    try {
      const response = await fetch(`http://127.0.0.1/api/v1/nodes/${id}`);
      const data: data = await response.json();
      setNodesData(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // * todo use context api to always fetch the node, without viewing a specific route.
  const handle_nodes_post = async () => {
    navigate(`/post/node/${id}`);
  };

  const handle_report_post = async () => {
    navigate(`/post/report/${id}`);
  };

  const handle_report_delete = async (report_id: string) => {
    console.log(report_id); // ! not ready yet.

    const response = await fetch(
      `http://localhost/api/v1/remove/report/null/${report_id}`,
      {
        method: "PATCH",
      }
    );

    if (response.ok) {
      toast.success("הבדיקה נמחקה בהצלחה");
    }
  };

  const handle_report_rules = async (report_id: string) => {
    navigate(`/report/rules/${report_id}/${id}`);
  };

  const handle_nodes_rules = () => {
    navigate(`/get/node/rules/${id}`);
  };

  const handle_delete_node = async (node_id: number) => {
    const response = await fetch(
      `http://localhost/api/v1/delete/node/${node_id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      toast.success("הקוביה נמחקה בהצלחה");
    }
  };

  const handle_report_graph = async (report_id: string) => {
    navigate(`/report/graph/${report_id}`);
  };

  useEffect(() => {
    get_data();
  }, [id]);

  return (
    <div>
      {nodesData?.nodes && nodesData.nodes.length > 0 && (
        <div>
          <div className="grid-cards-container">
            {nodesData.nodes.map((node) => (
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
                <Link to={`/${node.node_id}`} key={node.node_id}>
                  <h2 className="card">{node.title}</h2>
                  <h2 className="card">{node.status}</h2>
                </Link>
                <Checkbox
                  {...label}
                  sx={{ position: "absolute", left: "185px", top: "30px" }}
                />
                <Button
                  onClick={() => handle_delete_node(node.node_id)}
                  sx={{
                    position: "absolute",
                    left: "175px",
                    top: "5px",
                    color: "white",
                  }}
                >
                  <DeleteIcon />
                </Button>
              </div>
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
            <Button onClick={handle_nodes_rules}>rules</Button>
            <Button onClick={handle_nodes_post}>nodes</Button>
            <Button disabled>reports</Button>
          </ButtonGroup>
        </div>
      )}

      {nodesData?.reports && nodesData.reports.length > 0 && (
        <div>
          <div className="grid-cards-container">
            {nodesData.reports.map((report) => (
              <div>
                <div key={report.id} className="single_card_report">
                  <h2>{report.title}</h2>
                  <p>{report.value}</p>
                  <Button
                    onClick={() => handle_report_delete(report.report_id)}
                    sx={{
                      position: "absolute",
                      bottom: "60px",
                      right: "0px",
                      left: "165px",
                      color: "white",
                    }}
                  >
                    {" "}
                    <DeleteIcon />{" "}
                  </Button>
                  <Button
                    onClick={() => handle_report_rules(report.report_id)}
                    sx={{
                      position: "absolute",
                      bottom: "30px",
                      right: "0px",
                      left: "165px",
                      color: "white",
                    }}
                  >
                    {" "}
                    <RuleIcon />{" "}
                  </Button>
                  <Button
                    onClick={() => handle_report_graph(report.report_id)}
                    sx={{
                      position: "absolute",
                      bottom: "2px",
                      left: "165px",
                      color: "white",
                    }}
                  >
                    <AutoGraphIcon />
                  </Button>
                </div>
                <h2 className="report-time">{report.time}</h2>
              </div>
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
            <Button disabled>nodes</Button>
            <Button disabled>reports</Button>
          </ButtonGroup>
        </div>
      )}
      {nodesData?.nodes?.length === 0 && nodesData?.reports?.length === 0 && (
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
          <Button onClick={handle_report_post}>reports</Button>
        </ButtonGroup>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
