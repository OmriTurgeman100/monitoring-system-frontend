import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import "../styles/report_rules.css";

type rule = {
  action: string;
  condition_operator: string;
  report_id: string;
  rule_id: number;
  threshold: number;
  time: string;
};

export const Report_Rules = () => {
  const { id } = useParams();
  const [rules, setRules] = useState<rule[]>([]);

  const fetch_rules = async () => {
    const response = await fetch(`http://localhost/api/v1/get/rules/${id}`);

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      setRules(data);
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
                <h2 className={rule.action === 'set_parent_status_down' ? 'down' : rule.action === 'set_parent_status_up' ? 'up' : 'None' }> </h2>
              </div>
            </div>
          </div>
        ))}
        
        <IconButton sx={{position: "absolute", bottom: "20px"}}>
        <AddCircleIcon sx={{ color: "white", fontSize: 40 }} />
      </IconButton>
      
      </div>
    </div>
  );
};
