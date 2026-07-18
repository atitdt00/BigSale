import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCartContext } from "../context/CartContext";

const API = import.meta.env.VITE_API_URL;

function ForgetPassword() {
  const { register, handleSubmit } = useForm();
  const { forgotForm, setForgotForm } = useCartContext();

  const onsubmit = async (data) => {
    try {
      const res = await axios.post(`${API}/api/forgot/forgot-password`, data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!forgotForm) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-md p-4"
      >
        <div className="w-full flex items-center justify-between px-2">
          <h2 className="text-center text-whte mb-2">Forgot Password</h2>
          <button onClick={() => setForgotForm(false)}>Close</button>
        </div>
        <form onSubmit={handleSubmit(onsubmit)}>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="border w-full rounded p-2 mb-2"
          />
          <button className="bg-slate-400 px-2 py-3 rounded">
            Send reset link
          </button>
        </form>
       
      </div>
    </div>
  );
}

export default ForgetPassword;
