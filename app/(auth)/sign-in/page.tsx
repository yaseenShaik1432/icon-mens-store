"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Input from "@/app/components/input-fields/Input";

export default function SignIn() {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const onSignIn = async (e: any) => {
    try {
      e.preventDefault();
      const response = await axios.post("/api/auth/login", data);
      if (response.status === 200) {
        router.push("/products");
        toast.success(response?.data?.message);
        localStorage.setItem("userId", response.data.userId);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSignIn}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e: { target: { value: any } }) => {
                    setData({ ...data, email: e.target.value });
                  }}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    href="forgot-password"
                    className="font-semibold text-orange-600 hover:text-orange-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={data.password}
                  onChange={(e: { target: { value: any } }) => {
                    setData({ ...data, password: e.target.value });
                  }}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Sign in
              </button>
            </div>

            <div className="text-sm text-center">
              <Link
                href="sign-up"
                className="font-semibold text-orange-600 hover:text-orange-500"
              >
                Don't have an account? Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
