"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "@/app/components/input-fields/Input";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phonenumber: 91,
  });
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post("/api/users", data);
      if (response.status === 200) {
        toast.success(response?.data?.message);
        setLoading(false);
        router.push("/sign-in");
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.error);
    }
  };
  return (
    <div className="isolate bg-white px-6 py-10">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-orange-600 uppercase">
          Create your new <br />
          Icon Mens Store account
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Awesome, You are going to join the icon mens store community.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2.5">
              <Input
                type="text"
                name="first-name"
                id="first-name"
                value={data.firstname}
                onChange={(e: { target: { value: any } }) => {
                  setData({ ...data, firstname: e.target.value });
                }}
                autoComplete="given-name"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <Input
                type="text"
                name="last-name"
                value={data.lastname}
                onChange={(e: { target: { value: any } }) => {
                  setData({ ...data, lastname: e.target.value });
                }}
                id="last-name"
                autoComplete="family-name"
              />
            </div>
          </div>

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
                value={data.email}
                onChange={(e: { target: { value: any } }) => {
                  setData({ ...data, email: e.target.value });
                }}
                name="email"
                id="email"
                autoComplete="email"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Phone number
            </label>
            <div className="relative mt-2.5">
              <Input
                type="number"
                name="phone-number"
                id="phone-number"
                value={data.phonenumber}
                onChange={(e: { target: { value: any } }) => {
                  setData({ ...data, phonenumber: parseInt(e.target.value) });
                }}
                autoComplete="tel"
              />
            </div>
          </div>
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
                name="password"
                onChange={(e: { target: { value: any } }) => {
                  setData({ ...data, password: e.target.value });
                }}
                value={data.password}
                id="password"
                autoComplete="password"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            {loading ? (
              <ThreeDots
                height="24"
                width="30"
                radius="9"
                color="white"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            ) : (
              "Sign up"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
