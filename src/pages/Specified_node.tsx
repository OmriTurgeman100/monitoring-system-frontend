import { useParams } from "react-router-dom";

export const Specified_node = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};
