import Button from "@mui/material/Button";
import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/post_nodes.css";

export const PostNode = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handle_submit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const response = await fetch("http://localhost/api/v1/post/nodes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: name,
          description: description,
          parent: id,
        }),
      });

      if (response.ok && id) {
        navigate(`/${id}`);
      } else if (response.ok && !id) {
        navigate(`/`);
      } else {
        console.log("else block");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post_node_layout">
      <form onSubmit={handle_submit}>
        <label>Name</label>
        <input onChange={(e) => setName(e.target.value)} value={name} />

        <label>Description</label>
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

        <Button sx={{ marginTop: "10px" }} type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};
