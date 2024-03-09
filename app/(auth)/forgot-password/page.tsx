"use client";
import { useState } from "react";
import axios from "axios";
import Input from "@/app/components/input-fields/Input";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const response = await axios.post("/api/users/forgot-password", {
        email,
      });
      console.log(
        "🚀 ~ file: page.tsx:18 ~ handleSubmit ~ response:",
        response
      );
    } catch (error) {}
  };
  return (
    <div className="isolate bg-white px-6 py-28 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Enter your email address
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <Input
                type="email"
                value={email}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                name="email"
                id="email"
                autoComplete="email"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-orange-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
}
