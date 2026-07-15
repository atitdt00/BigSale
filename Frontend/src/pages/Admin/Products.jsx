import { useEffect, useState } from "react";
import Backend from "../../Layouts/Backend";

import axios from "axios";
import { useForm } from "react-hook-form";
const API = import.meta.env.VITE_API_URL;

function Products() {
  const [open, setOpen] = useState(null);
  let [editId, setEditid] = useState(false);
  let { register, handleSubmit, reset } = useForm();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const respon = await axios.get(`${API}/api/products/`);
      setProducts(respon.data);
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };
  const onsubmit = async (data) => {
    try {
      const token = sessionStorage.getItem("token");

      const formData = new FormData();

      formData.append("Title", data.Title);
      formData.append("Price", data.Price);
      formData.append("Description", data.Description);

      formData.append("Image", data.Image[0]);

      if (editId) {
        await axios.put(`${API}/api/products/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API}/api/products/`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setEditid(false);
      getProducts();
      setOpen(null);
      reset();
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleDelete = (id) => {
    try {
      const token = sessionStorage.getItem("token");
      axios.delete(`${API}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getProducts();
      reset();
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleEdit = (item) => {
    setEditid(item._id);
    setOpen(true);
    reset({
      Title: item.Title,
      Price: item.Price,
      Description: item.Description,
    });
  };
  useEffect(() => {
    getProducts();
  }, []);

  console.log(products)
  return (
    <Backend>
      <div className=" w-full h-auto flex justify-between mb-5">
        <h1 className="text-2xl font-serif font-bold text-blue-300">
          Manage Product
        </h1>
        <button
          onClick={() => {
            reset(null);
            setEditid(false);
            setOpen(true);
          }}
          className="text-blue-300 bg-slate-800 px-3 py-1 rounded-lg text-xl font-bold transition-all duration-200 hover:bg-slate-700 hover:ring-2"
        >
          Add Product
        </button>
      </div>
      {/* Open Button */}
      {open && (
        <div className="fixed z-50 w-full h-screen inset-0 bg-black/60 flex justify-center items-center px-50 py-25">
          <div className="w-full max-w-md h-auto  mx-auto bg-slate-800 shadow-[] shadow-amber-700 rounded-2xl overflow-hidden">
            <header className="w-full bg-white flex justify-between px-5 py-2.5">
              <h1 className="w-full text-blue-400 text-2xl font-bold">
                {editId ? "Update Product" : "Add Product"}
              </h1>
              <button
                type="reset"
                onClick={() => {
                  setOpen(false);
                  setEditid(false);
                  reset();
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
                  Product Title
                </label>
                <input
                  {...register("Title")}
                  id="Title"
                  className="block w-full px-5 py-2 rounded-lg transition-all duration-300 border hover:ring-2"
                  type="text"
                  placeholder="write your Product name"
                />
              </div>
              <div>
                <label className="block mb-2 font-md" htmlFor="Price">
                  Product Pirce
                </label>
                <input
                  {...register("Price")}
                  id="Price"
                  className="block w-full px-5 py-2 rounded-lg transition-all duration-300 border hover:ring-2"
                  type="number"
                  placeholder="write your Product price"
                />
              </div>
              <div>
                <label className="block mb-2 font-md" htmlFor="Description">
                  Product Description
                </label>
                <textarea
                  {...register("Description")}
                  id="Description"
                  className="block w-full px-5 py-2 rounded-lg transition-all duration-300 border hover:ring-2"
                  type="text"
                  placeholder="write your Product price"
                />
              </div>
              <div>
                <label className="block mb-2 font-md" htmlFor="image">
                  Product Image
                </label>
                <input
                  {...register("Image")}
                  id="image"
                  className="block w-full px-5 py-2 rounded-lg transition-all duration-300 border hover:ring-2 file:text-blue-300"
                  type="file"
                  placeholder="write your Product price"
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

      <div className="shadow-xl w-full min-h-70 p-5 bg-slate-900/10 rounded">
        <table className="w-full border table-fixed text-white ">
          <thead>
            <tr className="">
              <th className="border p-2 ">ID</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Decription</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody className="font-bold">
            {products.map((item, index) => (
              <tr key={item._id}>
                <td className="border p-2 ">{index + 1}</td>
                <td className="border p-2">
                  <img
                    src={item.Image}
                    alt={item.Title}
                    className="w-16 h-16 object-cover rounded-lg mx-auto"
                  />
                </td>
                <td className="border p-2">{item.Title}</td>
                <td className="border p-2">{item.Price}</td>
                <td className="border p-2">{item.Description}</td>
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

export default Products;
