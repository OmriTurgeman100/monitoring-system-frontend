import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { PostNode } from "./PostNode";
import Alert from "@mui/material/Alert";
import { PostReport } from "./PostReport";

import { useState } from "react";

type id_props = {
  id: string | undefined;
};

export const NodeReport = (props: id_props) => {
  const [view, setView] = useState<string>("");

  const handle_view = (mode: string) => {
    setView(mode);
    console.log(props.id);
  };

  return (
    <div>
      {view === "nodes" ? (
        <PostNode />
      ) : view === "reports" ? (
        <PostReport />
      ) : (
        <Alert sx={{ margin: "20px", width: "300px", backgroundColor: "#212529", color: "white", fontWeight: "bold"}} severity="info">לחצו למטה על מנת להוסיף קוביה או ריפורט</Alert>

      )}

      <ButtonGroup
        variant="contained"
        aria-label="Basic button group"
        sx={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          margin: "10px",
        }}
      >
        <Button disabled>rules</Button>
        <Button onClick={() => handle_view("nodes")}>nodes</Button>
        <Button onClick={() => handle_view("reports")}>reports</Button>
      </ButtonGroup>
    </div>
  );
};
