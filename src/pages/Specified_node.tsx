import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PostNodeReport } from "../components/PostNodeReport";
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
  value: number;
};

type data = {
  reports?: reports[];
  nodes?: sub_nodes[];
};

export const Specified_node = () => {
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

  useEffect(() => {
    console.log(typeof id);
    get_data();
  }, [id]);

  return (
    <div>
      {nodesData?.nodes && nodesData.nodes.length > 0 && (
        <div className="grid-cards-container">
          {nodesData.nodes.map((node) => (
            <Link to={`/${node.node_id}`} key={node.node_id}>
              <div className="single_card">
                <h2>{node.title}</h2>
                <h2>{node.status}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}

      {nodesData?.reports && nodesData.reports.length > 0 && (
        <div className="grid-cards-container">
          {nodesData.reports.map((report) => (
            <div key={report.id} className="single_card_report">
              <h2>{report.title}</h2>
              <p>{report.value}</p>
            </div>
          ))}
        </div>
      )}

      {nodesData?.nodes?.length === 0 && nodesData?.reports?.length === 0 && (
        <PostNodeReport id={id} />
      )}
    </div>
  );
};
