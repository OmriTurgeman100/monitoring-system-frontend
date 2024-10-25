import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/get_node_rules.css";

interface Condition {
  node_id: number;
  status: "up" | "down";
  title: string;
}

interface ConditionsGroup {
  conditions: Condition[];
  operator: "AND" | "OR";
}

interface Rule {
  action: string;
  conditions: ConditionsGroup;
  parent_node_id: number;
  rule_id: number;
  time: string;
}

export const Get_Node_Rules = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rules, setRules] = useState<Rule[]>([]);

  const fetch_node_rules = async () => {
    const response = await fetch(
      `http://localhost/api/v1/get/node/rules/${id}`
    );

    const data: Rule[] = await response.json();
    console.log(data);

    if (response.ok) {
      setRules(data);
    }
  };

  useEffect(() => {
    fetch_node_rules();
  }, []);

  const handle_node_rules_delete = async () => {
    for (const rule of rules) {
      const rule_id: number = rule.rule_id;
      const response = await fetch(
        `http://localhost/api/v1/delete/node/rule/${rule_id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("החוקים נמחקו בהצלחה");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  };

  const handle_node_rules_post = () => {
    navigate(`/post/node/rules/${id}`);
  };

  return (
    <div>
      <div className="node_rules_container">
        {rules.map((rule) => (
          <div className="node_rule" key={rule.rule_id}>
            {rule.conditions.conditions.map((single_rule) => (
              <div className="status">
                <h3 className="operator">{rule.conditions.operator}</h3>
                <h3 className="title">{single_rule.title}</h3>
                <h3>=</h3>
                <h3
                  className={`${
                    single_rule.status === "down"
                      ? "node_stat_down"
                      : single_rule.status === "up"
                      ? "node_stat_up"
                      : single_rule.status === "critical"
                      ? "node_stat_critical"
                      : null
                  }`}
                >
                  {single_rule.status}
                </h3>
              </div>
            ))}
            <h3>==</h3>
            <h3
              className={`${
                rule.action === "set_parent_status_down"
                  ? "down"
                  : rule.action === "set_parent_status_critical"
                  ? "critical"
                  : rule.action === "set_parent_status_up"
                  ? "up"
                  : null
              }`}
            ></h3>
          </div>
        ))}
        <IconButton
          onClick={handle_node_rules_delete}
          sx={{ position: "absolute", top: "-8px", right: "-8px" }}
        >
          <AutoDeleteIcon sx={{ color: "white", fontSize: 35 }} />
        </IconButton>

        <IconButton
          onClick={handle_node_rules_post}
          sx={{ position: "absolute", bottom: "-15px", left: "235px" }}
        >
          <AddCircleIcon sx={{ color: "white", fontSize: 35 }} />
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
