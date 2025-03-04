"use client"; // Mark as a Client Component

import { useForm } from "react-hook-form";
import { useSignupMutation } from "@/store/apiSlice";
import { useRouter } from "next/navigation"; // Updated import
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SignupFormData {
  username: string;
  email: string;
  password: string;
  name: string;
  birthDate: string; // Change to string
  gender: string;
  description?: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>();
  const [signup, { isLoading }] = useSignupMutation();
  const router = useRouter(); // Correct usage
  const isAuthenticated = useSelector((state: RootState) => state.auth.status);
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  useEffect(() => {
    if (isAuthenticated) router.push("/edit-profile");
  }, [isAuthenticated, router]);

  const onSubmit = async (data: SignupFormData) => {
    try {
      // Format the date as a string before sending to the backend
      const formattedData = {
        ...data,
        birthDate: birthDate ? format(birthDate, "yyyy-MM-dd") : "", // Format as string
      };
      await signup(formattedData).unwrap();
      router.push("/edit-profile");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
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
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email",
              },
            })}
            placeholder="Email"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
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

          <Input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium mb-1">Birth Date</label>
            <DatePicker
              selected={birthDate}
              onChange={(date: Date | null) => {
                setBirthDate(date);
                if (date) {
                  setValue("birthDate", date.toISOString());
                }
              }}
              dateFormat="yyyy-MM-dd"
              placeholderText="Pick a date"
              className="w-full p-2 border rounded-md"
            />
            {errors.birthDate && (
              <p className="text-red-500 text-sm">{errors.birthDate.message}</p>
            )}
          </div>

          {/* Gender Select Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <Select
              onValueChange={(value) => setValue("gender", value)}
              defaultValue={watch("gender") || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}