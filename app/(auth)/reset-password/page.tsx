"use client";

import Input from "@/app/components/input-fields/Input";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ResetPassword() {
  const [data, setData] = useState({
    token: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/resetemail", {
        data,
      });
      console.log(
        "🚀 ~ file: page.tsx:16 ~ verifyUserEmail ~ response:",
        response
      );
    } catch (error: any) {}
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setData({ ...data, token: urlToken || "" });
  }, []);

  return (
    <div className="isolate bg-white px-6 py-28 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Enter your new password
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2.5">
              <Input
                type="password"
                value={data.password}
                onChange={(e: { target: { value: any } }) => {
                  setData({ ...data, password: e.target.value });
                }}
                name="password"
                id="password"
                autoComplete="password"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Confirm Password
            </label>
            <div className="mt-2.5">
              <Input
                type="password"
                value={data.confirmPassword}
                onChange={(e: { target: { value: any } }) => {
                  setData({ ...data, confirmPassword: e.target.value });
                }}
                name="confirmPassword"
                id="confirmPassword"
                autoComplete="confirmPassword"
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
