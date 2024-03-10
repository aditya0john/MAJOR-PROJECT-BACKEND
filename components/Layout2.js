import React from "react";
import Navbar from "./Navbar";
import { useSession } from "next-auth/react";

function Layout2({ children }) {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="bg-black h-screen gridee">
        <Navbar />
        <div className="bg-white rounded-lg p-2 m-2 ml-0 flex-grow overflow-y-scroll">
          {children}
        </div>
      </div>
    );
  }
}

export default Layout2;
