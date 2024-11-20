import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckIcon from "@mui/icons-material/Check";
import "../styles/post_report_rule.css";

type Operator = "<" | ">" | "=" | "<=" | ">=";

export const Post_Report_Rules = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedOperator, setSelectedOperator] = useState<Operator>("<");
  const [threshold, setThreshold] = useState<number | string>("");
  const [action, setAction] = useState<string>("set_parent_status_up");

  const handleOperatorChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOperator(event.target.value as Operator);
  };

  const handleActionnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAction(event.target.value);
  };

  const post_report_rules = async () => {
    const response = await fetch("http://localhost/api/v1/post/report/rules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        report_id: id,
        condition_operator: selectedOperator,
        threshold: threshold,
        action: action,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      navigate(-1);
    } else {
      toast.error("שגיאה, נא למלא את כל השדות");
    }

    console.log(data);
    console.log(`${id}, ${selectedOperator}, ${threshold}, ${action}`);
  };

  return (
    <div className="post_rule_container">
      <h2 className="rule_title"> add rules</h2>

      <div className="rule_design">
        <div className="rules_menu">
          <h2 className="selected_report">{id}</h2>

          <select
            value={selectedOperator}
            onChange={handleOperatorChange}
            className="custom-select"
          >
            <option value="<">{"<"}</option>
            <option value=">">{">"}</option>
            <option value="=">{"="}</option>
            <option value="<=">{"<="}</option>
            <option value=">=">{">="}</option>
          </select>

          <input
            type="number"
            onChange={(e) => setThreshold(Number(e.target.value))}
            value={threshold}
            className="threshold"
          ></input>
        </div>
        <IconButton
          onClick={post_report_rules}
          sx={{ position: "absolute", bottom: "20px" }}
        >
          <CheckIcon sx={{ color: "white", fontSize: 40 }} />
        </IconButton>

        <div className="action_panel">
          <h2>results</h2>
          <select
            value={action}
            onChange={handleActionnChange}
            className="custom-select"
          >
            <option value="set_parent_status_up">{"up"}</option>
            <option value="set_parent_status_down">{"down"}</option>
            <option value="set_parent_status_critical">{"critical"}</option>
          </select>
        </div>
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
