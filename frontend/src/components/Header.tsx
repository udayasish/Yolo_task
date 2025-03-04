// components/Header.tsx
"use client"; // Mark as a Client Component

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/store/apiSlice";
import { Button } from "@/components/ui/button";

export default function Header() {
  const router = useRouter();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        Welcome, {userData?.username || "Guest"}
      </h1>
      {userData && (
        <Button onClick={handleLogout} variant="destructive">
          Logout
        </Button>
      )}
    </header>
  );
}