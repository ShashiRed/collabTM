import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { register as registerApi } from "../api/auth.api";
import { Link, useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      navigate("/");
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Account ✨
        </h2>
        <p className="text-center text-gray-500 mt-1 mb-6">
          Join us to manage your tasks
        </p>

        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="space-y-4"
        >
          <input
            {...register("name")}
            placeholder="Name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.name && (
            <p className="text-rose-500 text-xs -mt-2">
              {errors.name.message}
            </p>
          )}

          <input
            {...register("email")}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition">
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
