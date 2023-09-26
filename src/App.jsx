import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import CreatePost from "./pages/CreatePost";
import Root from "./pages/Root";
import Errorpage from "./pages/Errorpage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <Errorpage />,
//     children: [
//       { path: "/", element: <Homepage /> },
//       { path: "/post", element: <CreatePost /> },
//     ],
//   },
// ]);

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/post", element: <CreatePost /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
