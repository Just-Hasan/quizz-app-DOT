import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";
import { verifyPassword } from "../lib/helper";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const users = JSON.parse(localStorage.getItem("dot_quizz_user"));

  const { data: currentUser, setData: setCurrentUser } = useLocalStorage(
    { username: null, email: null },
    "dot_quizz_current_user"
  );

  useEffect(() => {
    if (currentUser.username && currentUser.email) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  async function onSubmit(data) {
    try {
      const user = users?.find((user) => user.email === data.email);
      if (!user) {
        toast.error("Email is not registered", {
          style: { backgroundColor: "#fa5252", color: "#fff5f5" },
        });
      }
      const isMatch = await verifyPassword(data.password, user.password);

      if (!isMatch) {
        toast.error("Incorrect password", {
          style: { backgroundColor: "#fa5252", color: "#fff5f5" },
        });
      }
      setCurrentUser({ username: user?.username, email: user?.email });
      setTimeout(() => navigate("/home"), 1500);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-[100dvh] grid place-content-center"
    >
      <div className="flex w-[40dvh] flex-col bg-transparent backdrop-blur-md border-[0.5px] border-white justify-center shadow-md items-center gap-y-8 p-8 rounded-xl">
        <h2 className="text-5xl font-semibold text-white my-8">Login</h2>
        <div className="w-full">
          <input
            type="text"
            className="p-6 w-full focus:outline-none text-2xl text-[#192378] bg-[#f4f4f4] border-white border-[0.5px] rounded-full placeholder:text-2xl placeholder:text-[#192378]"
            placeholder="Email"
            {...register("email")}
          />
        </div>
        <div className="w-full">
          <input
            type="password"
            className="p-6 w-full focus:outline-none text-2xl text-[#192378] bg-[#f4f4f4] border-white border-[0.5px] rounded-full placeholder:text-2xl placeholder:text-[#192378]"
            placeholder="Password"
            {...register("password")}
          />
        </div>

        <button className="w-full bg-[#192378] p-6 rounded-full text-2xl shadow-md mt-12 font-bold text-[#f4f4f4]">
          Login
        </button>
        <Link
          to={"/signup"}
          className="text-[#192378] text-lg  font-bold text-center w-full"
        >
          Don&apos;t have an account? <b>Register</b>
        </Link>
      </div>
    </form>
  );
}
