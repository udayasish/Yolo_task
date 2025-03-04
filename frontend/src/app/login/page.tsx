// app/login/page.tsx
"use client"; // Mark as a Client Component

import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/store/apiSlice";
import { useRouter } from "next/navigation"; // Updated import
import { useSelector, useDispatch } from "react-redux";
import { login } from "@/store/authSlice"; // Import the login action
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


interface LoginFormData {
  username: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [loginMutation, { isLoading }] = useLoginMutation();
  const router = useRouter(); // Correct usage
  const isAuthenticated = useSelector((state: RootState) => state.auth.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) router.push("/edit-profile");
  }, [isAuthenticated, router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Call the login API
      const response = await loginMutation(data).unwrap();
      console.log(response);
      

      // Dispatch the login action to update the Redux store
      dispatch(
        login({
          userData: {
            username: data?.username, // Replace with actual user data from the API response
           
          },
        })
      );

      // Redirect to the edit profile page
      router.push("/edit-profile");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register("username", { required: "Username is required" })}
            placeholder="Username"
            className={errors.username ? "border-red-500" : ""}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}

          <Input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}