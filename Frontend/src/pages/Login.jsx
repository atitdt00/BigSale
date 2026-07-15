import {  useNavigate } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
const API = import.meta.env.VITE_API_URL;

function Login() {
  let navigate = useNavigate();
  let { register, handleSubmit, reset } = useForm();

  //for pop-up cartContext
  const { openLogin, setOpenLogin } = useCartContext();

  //Authcontext
  const {login} = useAuth()

  const onsubmit = async (data) => {
    try {
      let response = await axios.post(`${API}/api/auth/login`, data);
      if (response.data.token) {
       login(response.data.user, response.data.token)
        reset();
        setOpenLogin(false)
        toast.success(response.data.message)
        if(response.data.user.role === "admin"){
          navigate("/admin/dashboard");
        }else{
          navigate("/")
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "login failed");
    }
  };
  if (!openLogin) return null;

  return (
    <>
      {openLogin && (
        <div
          onClick={() => setOpenLogin(false)}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-md rounded-lg p-6 backdrop-blur-2xl"
          >
           <div className="flex items-center justify-between">
             <h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-heading md:text-3xl lg:text-4xl">
              Login Form
            </h1>
             <button type="reset"
                onClick={() => { setOpenLogin(false); reset() }}
                className=" text-xl font-bold"
              >
                Close
              </button>
           </div>
            <form
              onSubmit={handleSubmit(onsubmit)}
              className="mx-auto w-full  flex max-w-md flex-col justify-center gap-4"
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1">Your email</Label>
                </div>
                <TextInput
                  id="email1"
                  type="email"
                  placeholder="example@email.com"
                  required
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password1">Your password</Label>
                </div>
                <TextInput
                  id="password1"
                  type="password"
                  required
                  {...register("password", {
                    required: "password is required",
                  })}
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <Button type="submit">Login</Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
