import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { login } from "../api/auth.api";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Login() {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      window.location.href = "/";
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex justify-center mb-4">
          <span className="px-4 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600">
            collabTM
          </span>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mt-1 mb-6">
          Login to manage your tasks
        </p>

        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="space-y-4"
        >
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

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-purple-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
