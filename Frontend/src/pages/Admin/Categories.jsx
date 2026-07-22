import { useEffect, useState } from "react";
import Backend from "../../Layouts/Backend";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCartContext } from "../../context/CartContext";

function Categories() {
  const [open, setOpen] = useState(null);
  const [editId, setEditid] = useState(null);
  let { register, handleSubmit, reset } = useForm();
  let [categories, setCategories] = useState([]);
  const { progress, setProgress } = useCartContext();
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      const respo = await axios.get(`${API}/api/categories/`);
      setCategories(respo.data.categories);
    } catch (error) {
      alert(error.response?.message?.data);
    }
  };

  const onsubmit = async (data) => {
    try {
      setLoading(true)
      const token = sessionStorage.getItem("token");
      if (editId) {
        const rp = await axios.put(`${API}/api/categories/${editId}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success(rp.data.message);
      } else {
        const rp = await axios.post(`${API}/api/categories`, data, {
          headers: { Authorization: `Bearer ${token}` },
          onUploadProgress: (ProgressEvent) => {
            const percent = Math.round(
              (ProgressEvent.loaded * 100) / ProgressEvent.total,
            );
            setProgress(percent);
          },
        });
        toast.success(rp.data.message);
      }
      setOpen(null);
      setEditid(false);
      getCategories();
      reset();
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleEdit = (item) => {
    setEditid(item._id);
    setOpen(true);
    reset({ name: item.name });
  };
  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(`${API}/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      reset();
      getCategories();
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Backend>
      <div className=" w-full h-auto flex justify-between mb-5">
        <h1 className="text-2xl font-serif font-bold text-blue-300">
          Manage Products Category
        </h1>
        <button
          onClick={() => {
            reset();
            setEditid(null);
            setOpen(true);
          }}
          className="text-blue-300 bg-slate-800 px-3 py-1 rounded-lg text-xl font-bold transition-all duration-200 hover:bg-slate-700 hover:ring-2"
        >
          Add Category
        </button>
      </div>
      {/* Open Button */}
      {open && (
        <div className="fixed z-50 w-full h-screen inset-0 bg-black/60 flex justify-center items-center px-50 py-25">
          <div className="w-full max-w-md h-auto  mx-auto bg-slate-800 shadow-[] shadow-amber-700 rounded-2xl overflow-hidden">
            <header className="w-full h-auto bg-white flex justify-between items-center max-md:flex-col px-5 py-2.5">
              <h1 className="text-blue-400 text-2xl font-bold">
                {editId ? "Update Category" : "Add Category"}
              </h1>
              <button
                type="reset"
                onClick={() => {
                  reset();
                  setOpen(null);
                  setEditid(false);
                }}
                className=" text-xl font-bold text-blue-400"
              >
                Close
              </button>
            </header>
            <form
              onSubmit={handleSubmit(onsubmit)}
              className="w-full h-full  text-white flex flex-col gap-4 p-5"
            >
              <div>
                <label className="block mb-2 font-md" htmlFor="Title">
                  Category Title
                </label>
                <input
                  {...register("name")}
                  id="Title"
                  className="block w-full px-5 py-2 rounded-lg transition-all duration-300 border hover:ring-2"
                  type="text"
                  placeholder="write your Product name"
                />
              </div>

              <div className="w-full h-full flex items-center justify-between flex-wrap gap-2 max-md:px-2 px-10">
                <button
                  type="submit"
                  className={`font-semibold px-4 py-2 rounded-2xl transition-all duration-200 ${
                    loading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-gray-600 hover:ring-1 hover:scale-110"
                  } `}
                >
                  {loading
                    ? `uploading...${progress}%`
                    : editId
                      ? "Update"
                      : "ADD"}
                </button>
                <button
                  type="button"
                  onClick={() => reset()}
                  className="font-semibold bg-gray-600 px-4 py-2 rounded-2xl transition-all duration-200 hover:ring-1 hover:scale-110"
                >
                  clear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="shadow-xl w-full min-h-70 p-5 bg-slate-900/10 rounded">
        <table className="w-full border table-fixed text-white ">
          <thead>
            <tr className="">
              <th className="border p-2 ">ID</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody className="font-bold">
            {categories.map((item, index) => (
              <tr key={item._id}>
                <td className="border p-2 ">{index + 1}</td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2 space-y-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2 transition-all duration-150 hover:underline "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded transition-all duration-150 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Backend>
  );
}

export default Categories;
