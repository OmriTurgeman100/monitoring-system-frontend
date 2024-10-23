import Button from "@mui/material/Button";
import { FormEvent, useState } from "react";
import "../styles/post_nodes.css";

export const PostNode = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handle_submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");
    console.log(`name is ${name}`);
    console.log(`description is ${description}`);
  };

  return (
    <div className="post_node_layout">
      <form onSubmit={handle_submit}>
        <label> Name </label>
        <input onChange={(e) => setName(e.target.value)} value={name} />

        <label> Description </label>
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
