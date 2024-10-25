import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import "../styles/post_node_rules.css";

type Nodes = {
  description: string;
  excluded: string;
  node_id: number;
  parent: number;
  status: string;
  time: string;
  title: string;
};

export const Post_Node_Rules = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<Nodes[]>([]);
  const [operator, setOperator] = useState<string>("");
  const [statusMap, setStatusMap] = useState<{ [key: number]: string }>({});
  const [action, setAction] = useState<string>("");

  const handle_operator_Change = (event: SelectChangeEvent) => {
    setOperator(event.target.value as string);
  };

  const handle_Condition_Change = (event: SelectChangeEvent) => {
    setAction(event.target.value);
  };

  const get_nodes = async () => {
    const response = await fetch(`http://localhost/api/v1/only/nodes/${id}`);

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      setNodes(data);
    }
  };

  const handleStatusChange = (
    nodeId: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStatusMap((prev) => ({ ...prev, [nodeId]: event.target.value }));
  };

  const handleSubmit = async () => {
    const conditions = nodes.map((node) => ({
      title: node.title,
      node_id: node.node_id,
      status: statusMap[node.node_id] || "up",
    }));

    const payload = {
      conditions: {
        operator: operator,
        conditions: conditions,
      },
      action: action,
    };

    console.log(payload);

    if (payload.action == "" || payload.conditions.operator == "") {
      toast.error("נא למלא את כל השדות");
    } else {
      const response = await fetch(
        `http://localhost/api/v1/post/node/rules/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        toast.success("החוקים נוספו בהצלחה");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
        navigate(-1);
      }
    }
  };
  useEffect(() => {
    get_nodes();
  }, []);

  return (
    <div>
      <div className="post_node_rules">
        <div>
          <Box
            sx={{
              minWidth: 120,
              backgroundColor: "#343A40",
              borderRadius: "5px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={{ color: "#FFFFFF" }}
              >
                operator
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={operator}
                label="operator"
                onChange={handle_operator_Change}
                sx={{ color: "#FFFFFF" }}
              >
                <MenuItem value="AND">AND</MenuItem>
                <MenuItem value="OR">OR</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div>
            {nodes.map((node) => (
              <div className="node_conditions_post" key={node.node_id}>
                <h2>{node.title}</h2>
                <h2>=</h2>
                <select
                  value={statusMap[node.node_id] || "up"}
                  onChange={(event) => handleStatusChange(node.node_id, event)}
                  className="custom-select"
                >
                  <option value="up">{"up"}</option>
                  <option value="down">{"down"}</option>
                  <option value="critical">{"critical"}</option>
                </select>
              </div>
            ))}

            <Box
              sx={{
                minWidth: 120,
                backgroundColor: "#343A40",
                borderRadius: "5px",
              }}
            >
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ color: "#FFFFFF" }}
                >
                  action
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={action}
                  label="action"
                  onChange={handle_Condition_Change}
                  sx={{ color: "#FFFFFF" }}
                >
                  <MenuItem
                    value="set_parent_status_up"
                    sx={{
                      color: "green",
                    }}
                  >
                    up
                  </MenuItem>
                  <MenuItem
                    value="set_parent_status_down"
                    sx={{
                      color: "red",
                    }}
                  >
                    down
                  </MenuItem>
                  <MenuItem
                    value="set_parent_status_critical"
                    sx={{
                      color: "orange",
                    }}
                  >
                    critical
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <div className="node_result">
              <h2
                className={`${
                  action === "set_parent_status_up"
                    ? "up"
                    : action === "set_parent_status_down"
                    ? "down"
                    : action === "set_parent_status_critical"
                    ? "critical"
                    : null
                }`}
              ></h2>
            </div>
          </div>
        </div>

        <IconButton
          sx={{ position: "absolute", bottom: "-15px", left: "235px" }}
          onClick={handleSubmit}
        >
          <CheckIcon sx={{ color: "white", fontSize: 35 }} />
        </IconButton>
      </div>
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
