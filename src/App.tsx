import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { About } from "./pages/About";
import { Specified_node } from "./pages/Specified_node";
import { Root_nodes } from "./pages/Root_nodes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route index element={<Root_nodes />}></Route>
      <Route path=":id" element={<Specified_node />}></Route>
      <Route path="about" element={<About />}></Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
