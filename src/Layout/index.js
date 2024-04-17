import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import RootRoutes from "./RootRoutes";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <RootRoutes />
      </div>
    </div>
  )
}

export default Layout;
