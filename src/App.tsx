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
import { Report_Rules } from "./components/Report_Rules";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route index element={<Root_nodes />}></Route>
      <Route path=":id" element={<Specified_node />}></Route>
      <Route path="about" element={<About />}></Route>
      <Route path="post/node/:id" element={<PostNode />}></Route>
      <Route path="post/root" element={<PostNode />}></Route>
      <Route path="post/report/:id" element={<PostReport />}></Route>
      <Route path="report/rules/:id" element={<Report_Rules />}></Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
