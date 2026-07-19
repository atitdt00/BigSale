import { useEffect, useState } from "react";
import Backend from "../../Layouts/Backend";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
const API = import.meta.env.VITE_API_URL;

function Users() {
  const [role, setRole]=useState("customer")
  const [drop, setDrop] = useState(false);
  const [open, setOpen] = useState(false);
  let [editId, setEditid] = useState(false);
  let { register, handleSubmit, reset, } = useForm();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const respon = await axios.get(`${API}/api/users/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(respon.data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  const onsubmit = async (data) => {
    
    const userData={...data, role: role.toLowerCase(),};

    try {
      const token = sessionStorage.getItem("token");
      if (editId) {
        const res=await axios.put(`${API}/api/users/${editId}`, userData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success(res.data.response)
      } else {
        await axios.post(`${API}/api/users/`, userData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      getUsers();
      setOpen(false);
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async(id) => {
    try {
      const token = sessionStorage.getItem("token");
      const res=await axios.delete(`${API}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getUsers();
      reset();
      toast.success(res.data.message)
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleEdit = (item) => {
    setEditid(item._id);
    setOpen(true);
    reset({
      name: item.name,
      email: item.email,
      password: "",
    });
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Backend>
      <div className=" w-full h-auto flex justify-between mb-5">
        <h1 className="text-2xl font-serif font-bold text-blue-300">
          Manage Users
        </h1>
        <button
          onClick={() => {
            reset();
            setEditid(null);
            setOpen(true);
          }}
          className="text-blue-300 bg-slate-800 px-3 py-1 rounded-lg text-xl font-bold transition-all duration-200 hover:bg-slate-700 hover:ring-2"
        >
          Add User
        </button>
      </div>
      {/* Open Button */}
      {open && (
        <div
          onClick={() => {setOpen(false); setEditid(null); reset()}}
          className="fixed z-40 w-full h-screen inset-0 bg-black/60 flex justify-center items-center px-50 py-25"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md h-auto  mx-auto bg-slate-800 shadow-[] shadow-amber-700 rounded-2xl overflow-hidden"
          >
            <div className="w-full bg-white flex justify-between px-5 py-2.5">
              <h1 className="w-full text-blue-400 text-2xl font-bold">
                {editId ? "Update User" : "Add User"}
              </h1>
              <button
                type="reset"
                onClick={() => {
                  reset(null);
                  setOpen(false);
                  setEditid(false);
                }}
                className="text-xl font-bold text-blue-400"
              >
                Close
              </button>
            </div>
            <form
              onSubmit={handleSubmit(onsubmit)}
              className="w-full h-full  text-white flex flex-col gap-4 p-5"
            >
              <div>
                <label htmlFor="role" className="block mb-2 font-md" htmlFor="image">
                  Users Role
                </label>
                <div className="relative" id="role">
                  <button
                    type="button"
                    onClick={() => setDrop(!drop)}
                    className="block w-full rounded-lg border px-5 py-2 text-left transition-all duration-300 hover:ring-2"
                  >
                    {role}
                  </button>

                  {drop && (
                    <div className="absolute left-0 mt-2 w-full rounded-lg bg-slate-700 shadow-lg z-50 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => {
                          setRole("Customer");
                          setDrop(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-white hover:bg-slate-600"
                      >
                        Customer
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setRole("Admin");
                          setDrop(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-white hover:bg-slate-600"
                      >
                        Admin
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="name" className="block mb-2 font-md" htmlFor="Title">
                  User's Full Name
                </label>
                <input
                  {...register("name")}
                  id="name"
                  className="block w-full px-5 py-2 rounded-lg transition-all duration-300 border hover:ring-2"
                  type="text"
                  placeholder="write your real name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-md" htmlFor="Price">
                  Users Email
                </label>
                <input
                  {...register("email")}
                  id="email"
                  className="block w-full px-5 py-2 rounded-lg transition-all duration-300 border hover:ring-2"
                  type="email"
                  placeholder="write your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 font-md" htmlFor="Description">
                  User's Password
                </label>
                <input
                  {...register("password")}
                  id="password"
                  className="block w-full px-5 py-2 rounded-lg transition-all duration-300 border hover:ring-2"
                  type="password"
                  placeholder="write the password"
                />
              </div>
              <div className="w-full h-full flex items-center justify-between px-10">
                <button
                  type="submit"
                  className="font-semibold bg-gray-600 px-4 py-2 rounded-2xl transition-all duration-200 hover:ring-1 hover:scale-110"
                >
                  {editId ? "Update" : "ADD"}
                </button>
                <button
                  type="button"
                  onClick={() => reset(null)}
                  className="font-semibold bg-gray-600 px-4 py-2 rounded-2xl transition-all duration-200 hover:ring-1 hover:scale-110"
                >
                  clear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      `{" "}
      <div className="shadow-xl w-full min-h-70 p-5 bg-slate-900/10 rounded-2xl overflow-x-auto">
        <table className="w-full shrink border table-auto text-white overflow-hidden">
          <thead>
            <tr className="">
              <th className="border px-4 py-3 text-xs sm:text-sm md:text-base">
                ID
              </th>
              <th className="border  px-4 py-3 text-xs sm:text-sm md:text-base">
                Full Name
              </th>
              <th className="border  px-4 py-3 text-xs sm:text-sm md:text-base">
                Email
              </th>
              <th className="border  px-4 py-3 text-xs sm:text-sm md:text-base">
                Password
              </th>
              <th className="border  px-4 py-3 text-xs sm:text-sm md:text-base">
                Role
              </th>
              <th className="border  px-4 py-3 text-xs sm:text-sm md:text-base">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="font-bold">
            {users.map((item, index) => (
              <tr key={item._id}>
                <td className="border px-4 py-2 text-xs sm:text-sm">
                  {index + 1}
                </td>
                <td className="border px-4 py-2 text-xs sm:text-sm">
                  {item.name}
                </td>
                <td className="border px-4 py-2 text-xs sm:text-sm">
                  {item.email}
                </td>
                <td className="border px-4 py-2 text-xs sm:text-sm overflow-hidden">
                  {item.password}
                </td>
                <td className="border px-4 py-2 text-xs sm:text-sm">
                  {item.role}
                </td>
                <td className="border px-4 py-2 text-xs sm:text-sm">
                  <div className="flex flex-col md:flex-row gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-600 text-white px-3 py-1 rounded mr-2 transition-all duration-150 hover:underline w-full"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>{ handleDelete(item._id)}}
                      className="w-full bg-red-500 text-white px-3 py-1 rounded transition-all duration-150 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      `
    </Backend>
  );
}

export default Users;
