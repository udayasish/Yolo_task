"use client"; // Mark as a Client Component

import { useForm } from "react-hook-form";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/store/apiSlice";
import { useRouter } from "next/navigation"; // Updated import
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"; // Import RootState
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

interface ProfileFormData {
  username: string;
  email: string;
  name: string;
  birthDate: string;
  gender: string;
  description?: string;
}

export default function EditProfile() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>();

  // Fetch profile data
  const { data: profile, isLoading: isProfileLoading, error: profileError } = useGetProfileQuery();

  // Update profile mutation
  const [updateProfile, { isLoading: isUpdating, error: updateError }] = useUpdateProfileMutation();

  const router = useRouter(); // Correct usage
  const isAuthenticated = useSelector((state: RootState) => state.auth.status);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  // Prefill form fields with profile data
  useEffect(() => {
    if (profile) {
      setValue("username", profile.username);
      setValue("email", profile.email);
      setValue("name", profile.name);
      setValue("birthDate", profile.birthDate);
      setValue("gender", profile.gender);
      setValue("description", profile.description);
    }
  }, [profile, setValue]);

  // Handle form submission
  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile(data).unwrap();
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  // Show loading state while fetching profile data
  if (isProfileLoading) return <div>Loading...</div>;

  // Log errors if any
  if (profileError || updateError) {
    console.error("Profile error:", profileError || updateError);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>
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
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>

          <Input
            {...register("description")}
            placeholder="Description"
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          <Button
            type="submit"
            disabled={!isDirty || isUpdating}
            className="w-full"
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </div>
    </div>
  );
}