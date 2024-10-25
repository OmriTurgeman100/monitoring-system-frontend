import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@mui/material/IconButton";
import "../styles/report_rules.css";

type rule = {
  action: string;
  condition_operator: string;
  report_id: string;
  rule_id: number;
  threshold: number;
  time: string;
};

export const Get_Report_Rules = () => {
  const { id, parent } = useParams();
  const [rules, setRules] = useState<rule[]>([]);
  const navigate = useNavigate();

  const fetch_rules = async () => {
    const response = await fetch(`http://localhost/api/v1/get/rules/${id}`);

    const data = await response.json();

    if (response.ok) {
      setRules(data);
      toast.success("החוקים נקלטו בהצלחה");
    }
  };

  const handle_post_report = () => {
    navigate(`/post/rep/rules/${id}`);
  };

  const delete_report_rules = async () => {
    for (const rule of rules) {
      let rule_id: number = rule.rule_id;

      console.log(rule_id);

      const response = await fetch(
        `http://localhost/api/v1/delete/report/rules/${rule_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            report_id: id,
            parent: parent,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast.success("החוקים נמחקו בהצלחה");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  };

  useEffect(() => {
    fetch_rules();
  }, []);

  return (
    <div>
      <div className="rule_container">
        {rules.map((rule) => (
          <div>
            <div className="rule">
              <div className="single_rule">
                <h2 className="report">{rule.report_id}</h2>
                <h2 className="condition">{rule.condition_operator}</h2>
                <h2 className="threshold">{rule.threshold}</h2>
              </div>
              <div>
                <h2
                  className={
                    rule.action === "set_parent_status_down"
                      ? "down"
                      : rule.action === "set_parent_status_up"
                      ? "up"
                      : "None"
                  }
                >
                  {" "}
                </h2>
              </div>
            </div>
          </div>
        ))}

        <IconButton
          onClick={() => handle_post_report()}
          sx={{ position: "absolute", bottom: "-25px" }}
        >
          <AddCircleIcon sx={{ color: "white", fontSize: 40 }} />
        </IconButton>

        <IconButton
          onClick={() => delete_report_rules()}
          sx={{ position: "absolute", top: "20px", right: "10px" }}
        >
          <AutoDeleteIcon sx={{ color: "white", fontSize: 40 }} />
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
