import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import "../styles/post_node_rules.css";

type nodes = {
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
  const [nodes, setNodes] = useState<nodes[]>([]);
  const [operator, setOperator] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setOperator(event.target.value as string);
  };

  const get_nodes = async () => {
    const response = await fetch(`http://localhost/api/v1/only/nodes/${id}`);

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      setNodes(data);
    }
  };

  useEffect(() => {
    get_nodes();
  }, [nodes]);

  return (
    <div>
      <div className="post_node_rules">
        <div>
          <Box sx={{ minWidth: 120, backgroundColor: "#343A40" }}>
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
                onChange={handleChange}
                sx={{ color: "#FFFFFF" }} // Set text color inside Select to white
              >
                <MenuItem value={10}>AND</MenuItem>
                <MenuItem value={20}>OR</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div>
            {nodes.map((node) => (
              <div>
                <h2>{node.title}</h2>
                <h2>=</h2>
              </div>
            ))}
          </div>
        </div>

        <IconButton sx={{ position: "absolute", bottom: "-15px", left: "235px" }}>
            <CheckIcon sx={{ color: "white", fontSize: 35 }}/>
        </IconButton>
      </div>
    </div>
  );
};
