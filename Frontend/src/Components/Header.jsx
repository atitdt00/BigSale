import  { useEffect, useRef, useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { useCartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Header() {
  const navigate= useNavigate()
  const [profile, setProfile] = useState(false);
  const { setOpenLogin, setOpenRegister } = useCartContext();

  //logout navigate from AuthContext
  const { loggedIn, logout, user } = useAuth();
  
//handle Loggedout
const handleLogout=()=>{
  logout()
  setProfile(false)
  navigate("/")
}


//handle user Profile for navigation
const ShowProfile=()=>{
  if(user){
    navigate("/admin/dashboard")
    setProfile(false)
  }
}


//navigation menu on mobile screen
  let [menu, setMenu] = useState(false);

  const handleResize = () => {
    if (window.matchMedia("(min-width: 640px)").matches) {
      setMenu(false);
    }
  };




  //profile icon click out side handler
  const profileRef = useRef();
  const handleClickoutSide = (e) => {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setProfile(false);
    }
  };

  useEffect(() => {
    handleResize();
    // Listen for window resize
    window.addEventListener("resize", handleResize);

    //handle outside click
    document.addEventListener("mousedown", handleClickoutSide);
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickoutSide);
    };
  }, []);
  return (
    <>
      <div className="relative w-full min-h-10 flex justify-between items-center">
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-widest uppercase text-white flex flex-wrap">
          <span className="text-blue-400">BIG</span>
          <span className="text-orange-400">SALE</span>
        </h1>
        <ul className="hidden sm:flex items-center gap-3 md:gap-6 lg:gap-8">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg text-slate-100 text-sm md:text-lg lg:text-xl font-semibold transition-all duration-300 hover:bg-white/10 hover:text-cyan-300 hover:-translate-y-1"
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="px-4 py-2 rounded-lg text-slate-100 text-sm md:text-lg lg:text-xl font-semibold transition-all duration-300 hover:bg-white/10 hover:text-cyan-300 hover:-translate-y-1"
          >
            Cart
          </Link>
          {!loggedIn ? (
            <div className="w-full space-x-2">
              <button
                onClick={() => setOpenRegister(true)}
                className="px-4 py-2 rounded-lg text-slate-100 text-sm md:text-lg lg:text-xl font-semibold transition-all duration-300 hover:bg-cyan-500 hover:text-white hover:-translate-y-1"
              >
                Register
              </button>

              <button
                onClick={() => setOpenLogin(true)}
                className="px-5 py-2 rounded-full bg-cyan-500 text-white text-sm md:text-lg lg:text-xl font-semibold shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:bg-cyan-400 hover:scale-105"
              >
                Login
              </button>
            </div>
          ) : (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfile(!profile)}
                className="flex justify-center items-center bg-linear-to-t from-blue-200 to-yellow-200 px-5 py-3 w-11 h-11 font-bold rounded-4xl"
              >
                {user.email?.charAt(0).toUpperCase()}
              </button>
              {profile && (
                <ul className="absolute top-15 right-0 z-50 w-48 h-auto bg-slate-500 rounded-2xl flex flex-col py-1 overflow-hidden cursor-pointer">
                  <button onClick={()=>ShowProfile()} className="text-xl  text-blue-300 font-semibold rounded transition duration-200 hover:font-bold hover:bg-slate-700">
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-xl text-blue-300 font-semibold rounded transition duration-200 hover:font-bold hover:bg-slate-700"
                  >
                    Logout
                  </button>
                </ul>
              )}
            </div>
          )}
        </ul>

        {/* for mobile responsive */}
        <i
          onClick={() => setMenu(!menu)}
          className="sm:hidden hover:bg-[#35374B] rounded p-2"
        >
          <IoMenu />
        </i>

        <ul
          className={`bg-gray-600/60 w-full absolute z-100 top-13 right-0 space-x-4 ${menu ? "flex" : "hidden"}  flex-col gap-3 rounded-xl p-5`}
        >
          <Link className="inline-block text-[rgb(213,218,218)] text-xs md:text-xl lg:text-2xl font-bold transition-transform duration-100 ease-in-out hover:-translate-y-2 hover:text-[#96d3db]">
            Home
          </Link>
          <Link className="inline-block text-[rgb(213,218,218)] text-xs md:text-xl lg:text-2xl font-bold transition-transform duration-100 ease-in-out hover:-translate-y-2 hover:text-[#96d3db]">
            Category
          </Link>
          <Link className="inline-block text-[rgb(213,218,218)] text-xs md:text-xl lg:text-2xl font-bold transition-transform duration-100 ease-in-out hover:-translate-y-2 hover:text-[#96d3db]">
            Register
          </Link>
          <Link className="inline-block text-[rgb(213,218,218)] text-xs md:text-xl lg:text-2xl font-bold transition-transform duration-100 ease-in-out hover:-translate-y-2 hover:text-[#96d3db]">
            Login
          </Link>
        </ul>
      </div>
    </>
  );
}

export default Header;
