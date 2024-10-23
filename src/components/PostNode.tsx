import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import "../styles/post_nodes.css";

export const PostNode = () => {
  return (
    <div className="post_node_layout">
      <form>
        <label> name </label>
        <input type="text"></input>

        <label> description </label>

        <input type="text"></input> 

        <Button sx={{ marginTop: "10px"}} variant="contained">submit</Button>
      </form>
    </div>
  );
};
