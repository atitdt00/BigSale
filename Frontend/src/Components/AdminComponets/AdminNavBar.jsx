import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bird from "../../image/bird.jpg";
import { useAuth } from "../../context/AuthContext";

function AdminNavBar() {

  //LogoutContext 
  const { logout }= useAuth()


  let [profile, setProfile] = useState(false);

  return (
    <>
      <Link
        to={"/admin/dashboard"}
        className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-widest"
      >
        <span className="text-orange-300 font-bold">Admin </span>
        <span className="text-blue-300 font-extrabold">Panel </span>
      </Link>
      <div className="relative">
        <img
          onClick={() => setProfile(!profile)}
          src={bird}
          alt="profile Picture"
          className="object-cover w-12 h-12 rounded-full border transition-all duration-200 outline-1 hover:outline-yellow-100"
        />
        {profile && (
          <ul className="absolute top-15 right-0 z-40 w-48 h-auto bg-slate-500 rounded-2xl flex flex-col justify-center py-1 overflow-hidden cursor-pointer ">
            <li className="text-xl pl-5 text-blue-300 font-semibold rounded transition duration-200 hover:font-bold hover:bg-slate-700">
              Profile
            </li>
            <li
              onClick={() => logout()}
              className="text-xl pl-5 text-blue-300 font-semibold rounded transition duration-200 hover:font-bold hover:bg-slate-700"
            >
              Logout
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default AdminNavBar;
