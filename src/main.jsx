import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Layout/RootLayout.jsx";
import Home from "./Components/Home/Home.jsx";
import AllArts from "./Components/AllArts/AllArts.jsx";
import ArtDetails from "./Components/ArtDetails/ArtDetails.jsx";
import Requirement from "./Components/Requrement/Requirement.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import SignUp from "./Components/SignUp/SignUp.jsx";
import LogIn from "./Components/LogIn/LogIn.jsx";
import Order from "./Components/Order/Order.jsx";
import PaymentPage from "./Components/PaymentPage/PaymentPage.jsx";
import ArtBooking from "./Components/ArtBooking/ArtBooking.jsx";
import RequireAuth from "./Components/RouteGuards/RequireAuth.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import { ArtGalleryCard } from "./Components/ArtGallaryCard/ArtGallary.jsx";

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
        element: (
          <RequireAuth>
            <AllArts />
          </RequireAuth>
        ),
      },
      {
        path: "art-details/:artId",
        element: (
          <RequireAuth>
            <ArtDetails />
          </RequireAuth>
        ),
      },
      {
        path: "requirement",
        element: (
          <RequireAuth>
            <Requirement />
          </RequireAuth>
        ),
      },
      {
        path: "allarts",
        element: (
          <RequireAuth>
            <AllArts />
          </RequireAuth>
        ),
      },
      {
        path: "profile",
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ),
      },
      {
        path: "sign-up",
        Component: SignUp,
      },
      {
        path: "login",
        Component: LogIn,
      },
      {
        path: "order",
        element: (
          <RequireAuth allowedRoles={["customer"]} redirectTo="/profile">
            <Order />
          </RequireAuth>
        ),
      },
      {
        path: "payment",
        element: (
          <RequireAuth allowedRoles={["customer"]} redirectTo="/profile">
            <PaymentPage />
          </RequireAuth>
        ),
      },
      {
        path: "art-booking",
        element: (
          <RequireAuth>
            <ArtBooking />
          </RequireAuth>
        ),
      },
      {
        path: "art-gallary",
        element: (
          <RequireAuth>
            <ArtGalleryCard />
          </RequireAuth>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
