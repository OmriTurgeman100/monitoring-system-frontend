import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

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
  const [loading, setLoading] = useState<boolean>(true);

  const get_data = async () => {
    setLoading(true); // Set loading state to true before fetching
    try {
      const response = await fetch(`http://127.0.0.1/api/v1/nodes/${id}`);
      const data: data = await response.json();
      setNodesData(data); // Always set nodesData to the fetched data
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false); // Set loading to false after fetch is complete
    }
  };

  useEffect(() => {
    get_data(); // Fetch data when component mounts and when id changes
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Display nodes if available */}
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

      {/* Display reports if available */}
      {nodesData?.reports && nodesData.reports.length > 0 && (
        <div className="grid-cards-container">
          {nodesData.reports.map((report) => (
            <div key={report.id} className="single_card">
              <h2>{report.title}</h2>
              <h2>{report.value}</h2>
            </div>
          ))}
        </div>
      )}

  
      {nodesData?.nodes?.length === 0 && nodesData?.reports?.length === 0 && (
        <div></div>
      )}
    </div>
  );
};
