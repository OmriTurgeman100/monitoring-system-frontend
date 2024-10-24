import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { About } from "./pages/About";
import { Specified_node } from "./pages/Specified_node";
import { PostNode } from "./components/PostNode";
import { Root_nodes } from "./pages/Root_nodes";
import { PostReport } from "./components/PostReport";
import { Get_Report_Rules } from "./components/Get_Report_Rules";
import { Post_Report_Rules } from "./components/Post_Report_Rules";
import { Get_Node_Rules } from "./components/Get_Node_Rules";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route index element={<Root_nodes />}></Route>
      <Route path=":id" element={<Specified_node />}></Route>
      <Route path="about" element={<About />}></Route>
      <Route path="post/node/:id" element={<PostNode />}></Route>
      <Route path="post/root" element={<PostNode />}></Route>
      <Route path="post/report/:id" element={<PostReport />}></Route>
      <Route path="report/rules/:id/:parent" element={<Get_Report_Rules />}></Route>
      <Route path="post/rep/rules/:id" element={<Post_Report_Rules />}></Route>
      <Route path="get/node/rules/:id" element={<Get_Node_Rules />}></Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
