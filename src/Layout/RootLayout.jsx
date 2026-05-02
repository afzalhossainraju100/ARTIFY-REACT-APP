import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar.jsx";
import Footer from "../Components/Footer/Footer.jsx";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-[4.5rem]">
        <Outlet />
      </main>
      <div className="sticky bottom-0 z-50">
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
