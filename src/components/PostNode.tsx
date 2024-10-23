import Button from "@mui/material/Button";
import "../styles/post_nodes.css";

export const PostNode = () => {
  const handle_submit = (event: any) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="post_node_layout">
      <form onSubmit={handle_submit}>
        <label> Name </label>
        <input type="text" name="name" />

        <label> Description </label>
        <input type="text" name="description" />

        <Button sx={{ marginTop: "10px" }} type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};
