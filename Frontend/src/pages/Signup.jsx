import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCartContext } from "../context/CartContext";
import { toast } from "react-toastify";
const API = import.meta.env.VITE_API_URL;
function Signup() {
  //cartContext POP-up
  const { openRegister, setOpenRegister } = useCartContext();

  let navigate = useNavigate();
  let { register, handleSubmit, reset } = useForm({
    defaultValues: { role: "customer" },
  });
  const onsubmit = async (data) => {
    const { repeatPassword, ...userdata } = data;
    if (userdata.password !== repeatPassword) {
      toast.error("passwords do not match");
      return;
    }
    try {
      const resp = await axios.post(`${API}/api/auth/register`, userdata);
      toast.success(resp.data.message);
      reset();
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registered Failed");
    }
  };
  if (!openRegister) return null;

  return (
    <>
      {openRegister && (
        <div
          onClick={() => setOpenRegister(false)}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-md rounded-lg p-5"
          >
            <div className="flex items-center justify-between">
              <h1 className=" text-center text-4xl font-bold tracking-wider text-heading md:text-3xl lg:text-4xl mb-3">
                Registration{" "}
              </h1>
              <button
                type="reset"
                onClick={() => {
                  setOpenRegister(false);
                  reset();
                }}
                className=" text-xl font-bold"
              >
                Close
              </button>
            </div>

            <div className="w-full min-h-auto flex items-center">
              <form
                onSubmit={handleSubmit(onsubmit)}
                className="mx-auto w-full flex max-w-md flex-col justify-center gap-4"
              >
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name2">Your Name</Label>
                  </div>
                  <TextInput
                    id="name2"
                    type="text"
                    placeholder="Write your Full Name"
                    required
                    shadow
                    {...register("name")}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email2">Your email</Label>
                  </div>
                  <TextInput
                    id="email2"
                    type="email"
                    placeholder="name@gmail.com"
                    required
                    shadow
                    {...register("email")}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password2">Your password</Label>
                  </div>
                  <TextInput
                    id="password2"
                    type="password"
                    required
                    shadow
                    {...register("password")}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="repeat-password">Repeat password</Label>
                  </div>
                  <TextInput
                    id="repeat-password"
                    type="password"
                    required
                    shadow
                    {...register("repeatPassword")}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="agree" />
                  <Label htmlFor="agree" className="flex">
                    I agree with the&nbsp;
                    <Link
                      to="#"
                      className="text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      terms and conditions
                    </Link>
                  </Label>
                </div>
                <Button type="submit">Register new account</Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;
