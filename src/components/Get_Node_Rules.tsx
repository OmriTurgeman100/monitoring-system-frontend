import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/get_node_rules.css";

export const Get_Node_Rules = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rules, setRules] = useState<any>([])

  const fetch_node_rules = async () => {
    const response = await fetch(
      `http://localhost/api/v1/get/node/rules/${id}`
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {
        setRules(data)
    }
  };

  useEffect(() => {
    fetch_node_rules();
  }, []);

  return (
    <div>
      <div className="node_rules_container">
        

      </div>
    </div>
  );
};
