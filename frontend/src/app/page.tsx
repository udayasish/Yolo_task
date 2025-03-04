// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to Auth & Profile Management</h1>
        <p className="mb-6 text-gray-600">
          Manage your profile and authentication seamlessly with our modern system.
        </p>
        <div className="space-y-4">
          <Link href="/login" className="block">
            <Button className="w-full">Login</Button>
          </Link>
          <Link href="/signup" className="block">
            <Button variant="outline" className="w-full">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}