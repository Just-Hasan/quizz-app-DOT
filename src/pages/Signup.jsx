import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  hashPassword,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../lib/helper";

import { toast } from "sonner";
import useLocalStorage from "../hooks/useLocalStorage";

export default function SignUp() {
  const { data: users, setData: setUsers } = useLocalStorage(
    [],
    "dot_quizz_user"
  );
  const navigate = useNavigate();

  const quiz = {
    questions: [],
    correctAnswer: 0,
    incorrectAnswer: 0,
    status: "loading",
    index: 0,
    secondsRemaining: 0,
    answer: null,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    const { password } = data;
    try {
      const userExists = users.find((user) => user.email === data.email);
      if (userExists) {
        toast.error("Email already exists", {
          style: { backgroundColor: "#fa5252", color: "#fff5f5" },
        });
      } else {
        const hashPass = await hashPassword(password);
        const newUser = {
          ...data,
          profile_picture: "",
          password: hashPass,
          quiz,
        };
        setUsers((user) => [newUser, ...user]);
        toast.success("Sign Up Complete", {
          style: { backgroundColor: "#51cf66", color: "#ebfbee" },
        });
        setTimeout(() => navigate("/login"), 1000);
      }
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
        <h2 className="text-5xl font-semibold text-white my-8">Sign Up</h2>
        <div className="w-full">
          <input
            type="text"
            className="p-6 w-full mb-2 focus:outline-none text-2xl text-[#192378] bg-[#f4f4f4]  border-[0.5px] rounded-full placeholder:text-2xl placeholder:text-[#192378]"
            placeholder="Username"
            {...register("username", { validate: validateUsername })}
          />
          <label htmlFor="email" className="p-6 text-xl text-red-400">
            {errors?.username?.message}
          </label>
        </div>
        <div className="w-full">
          <input
            type="text"
            className="p-6 mb-2 w-full focus:outline-none text-2xl text-[#192378] bg-[#f4f4f4]  border-[0.5px] rounded-full placeholder:text-2xl placeholder:text-[#192378]"
            placeholder="example@gmail.com"
            {...register("email", {
              validate: (email) => validateEmail(email),
            })}
          />
          <label htmlFor="email" className="p-6 text-xl text-red-400">
            {errors?.email?.message}
          </label>
        </div>
        <div className="w-full">
          <input
            type="password"
            className="p-6 w-full mb-2 focus:outline-none text-2xl text-[#192378] bg-[#f4f4f4]  border-[0.5px] rounded-full placeholder:text-2xl placeholder:text-[#192378]"
            placeholder="Password"
            {...register("password", { validate: validatePassword })}
          />
          <label htmlFor="email" className="p-6 pl-4 text-xl text-red-400">
            {errors?.password?.message}
          </label>
        </div>

        <button className="w-full bg-[#192378] p-6 mt-8 rounded-full text-2xl shadow-md font-bold text-[#f4f4f4]">
          Sign Up
        </button>
        <Link
          to={"/login"}
          className="text-[#192378] text-lg  font-bold text-center w-full"
        >
          Already have an <b>Account?</b>
        </Link>
      </div>
    </form>
  );
}
