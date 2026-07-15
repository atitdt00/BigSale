import React from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../Components/AdminComponets/AdminSidebar.jsx";
import AdminNavBar from "../Components/AdminComponets/AdminNavBar.jsx";

function Backend({ children }) {
  return (
    <div className="w-full min-h-screen bg-linear-to-b from-slate-700 to-zinc-600 flex overflow-hidden relative">
      <aside className="sm:w-64  min-h-screen shadow-2xl  border-r-2">
        <AdminSidebar />
      </aside>
      <main className="flex-1 overflow-x-hidden min-h-screen ">
        <nav className="border-b-2 w-full min-h-30 flex flex-col sm:flex-row justify-between items-center gap-5 p-5">
          <AdminNavBar />
        </nav>
        <section className="w-full p-5">{children}</section>
      </main>
    </div>
  );
}

export default Backend;
