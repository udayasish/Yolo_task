// app/signup/page.tsx
"use client"; // Mark as a Client Component

import { useForm } from "react-hook-form";
import { useSignupMutation } from "@/store/apiSlice";
import { useRouter } from "next/navigation"; // Updated import
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
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

  useEffect(() => {
    if (isAuthenticated) router.push("/edit-profile");
  }, [isAuthenticated, router]);

  const onSubmit = async (data: SignupFormData) => {
    try {
      // Format the date as a string before sending to the backend
      console.log("Raw data: ", data);

      const formattedData = {
        ...data,
        birthDate: format(new Date(data.birthDate), "yyyy-MM-dd"), // Format as string
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

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                {watch("birthDate") ? format(new Date(watch("birthDate")), "PPP") : "Pick a date"}
                <CalendarIcon className="ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Calendar
                mode="single"
                selected={watch("birthDate") ? new Date(watch("birthDate")) : undefined}
                onSelect={(date) => setValue("birthDate", date ? date.toISOString() : "")}
              />
            </PopoverContent>
          </Popover>

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