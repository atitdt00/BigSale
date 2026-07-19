import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

function ResetPassword() {
  const { token } = useParams();
  const navigate= useNavigate()
  let { register, handleSubmit } = useForm();

  const onsubmit = async (data) => {
    try {
      const res = await axios.post(
        `${API}/api/forgot/reset-password/${token}`,
        data,
      );
      navigate("/")
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset Failed");
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="w-full max-w-md bg-slate-600 rounded flex flex-col gap-4 p-5"
      >
        <div >
          <label htmlFor="reset" className="block">Create a New Password</label>
          <input
            type="password"
            id="reset"
            placeholder="Write a New Pasword"
            {...register("password", {required : "password is required", minLength: { value: 4}, message: "password must be 4 character"})}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button type="submit" className="bg-blue-200 rounded-2xl py-2 ">
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
