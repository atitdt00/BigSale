import { TbCategoryFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
function AdminSidebar() {
  const {user}=useAuth()
  return (
    <>
      <div>
        <h1 className="bg-slate-800 w-full max-w-md h-10 flex justify-center space-x-2 items-center text-xl sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-widest py-6">
          <i className="text-white text-xl">
            <TbCategoryFilled />
          </i>
          <span className="text-blue-300 tracking-widest">Menu</span>
        </h1>
      </div>
      <ul className="h-full w-full flex flex-col  py-5 text-xl text-white">
        <Link
          className="w-full transition-all duration-200 hover:bg-slate-800 hover:text-blue-400 hover:font-bold hover:scale-100  px-5 py-3"
          to="/admin/categories"
        >
          Category
        </Link>
        <Link
          className="transition-all duration-200 hover:bg-slate-800 hover:text-blue-400 hover:font-bold hover:scale-100  px-5 py-3"
          to="/admin/products"
        >
          Product
        </Link>
        {user?.role === "admin" && (
          <Link
            className="transition-all duration-200 hover:bg-slate-800 hover:text-blue-400 hover:font-bold hover:scale-100 px-5 py-3"
            to="/admin/users"
          >
            Users
          </Link>
        )}
      </ul>
    </>
  );
}

export default AdminSidebar;
