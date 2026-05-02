import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Layout/RootLayout.jsx";
import Home from "./Components/Home/Home.jsx";
import AllArts from "./Components/AllArts/AllArts.jsx";
import Requirement from "./Components/Requrement/Requirement.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-arts",
        Component: AllArts,
      },
      {
        path:"requirement",
        Component: Requirement,
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
