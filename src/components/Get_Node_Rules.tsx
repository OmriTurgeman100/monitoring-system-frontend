import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/get_node_rules.css";

// Define the Rule type
interface Condition {
  node_id: number;
  status: "up" | "down";
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

  // Set state to use Rule[] type
  const [rules, setRules] = useState<Rule[]>([]);

  const fetch_node_rules = async () => {
    const response = await fetch(
      `http://localhost/api/v1/get/node/rules/${id}`
    );

    const data: Rule[] = await response.json(); // Explicitly type the response data

    console.log(data);

    if (response.ok) {
      setRules(data); // Set the data to state
    }
  };

  useEffect(() => {
    fetch_node_rules();
  }, []);

  return (
    <div>
      <div className="node_rules_container">
      
        {rules.map((rule) => (
          <div className="node_rule" key={rule.rule_id}>
            {rule.conditions.conditions.map((single_rule) => (
              <div>
                <h2 className="operator">{rule.conditions.operator}</h2>

                <div className="status">
                  <h2>{single_rule.node_id}</h2>
                  <h2>=</h2>
                  <h2>{single_rule.status}</h2>
                </div>

            
              </div>
              
            ))}
          </div>
          
        ))}
      </div>
    </div>
  );
};
