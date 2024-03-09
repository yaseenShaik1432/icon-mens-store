"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import iconmenstore from "../../assets/images/iconmenstore.png";
import "react-toastify/dist/ReactToastify.css";
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { logout } from "@/app/services/auth";
// import { getCookie } from "cookies-next";

const navigation = {
  categories: [
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Best Sellers",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-02.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "All", href: "/all-products" },
            { name: "Shirts", href: "/all-products?category=shirts" },
            { name: "Jeans", href: "/all-products?category=jeans" },
            {
              name: "Sweat Shirts",
              href: "/all-products?category=sweat-shirts",
            },
            { name: "T-Shirts", href: "/all-products?category=t-shirts" },
            { name: "Shorts", href: "/all-products?category=shorts" },
            {
              name: "Formal Pants",
              href: "/all-products?category=formal-pants",
            },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "All", href: "#" },
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "footwear",
          name: "Foot Wear",
          items: [
            { name: "All", href: "#" },
            { name: "Casual Shoes", href: "#" },
            { name: "Formal Shoes", href: "#" },
            { name: "Loafers", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "All", href: "#" },
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "About Us", href: "#" },
    { name: "Contact Us", href: "#" },
  ],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const isAdmin = true;
  const token = true;

  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    const result: any = await logout();
    if (result.status === 200) {
      router.push("/sign-in");
      toast.success(result?.data?.message);
    } else {
      toast.error(result?.response?.data?.error);
    }
  };

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 lg:hidden top-0 mt-10"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-orange-600 text-orange-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <Link
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <Link
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="-m-2 block p-2 text-gray-500"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link
                        href={page.href}
                        onClick={() => setOpen(false)}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    {isAdmin && (
                      <Link
                        href="/admin/all-products"
                        className="-m-2 block p-2 font-medium text-gray-900"
                        onClick={() => setOpen(false)}
                      >
                        Admin
                      </Link>
                    )}
                  </div>
                  {!token && (
                    <div className="flow-root">
                      <Link
                        href="/sign-in"
                        className="-m-2 block p-2 font-medium text-gray-900"
                        onClick={() => setOpen(false)}
                      >
                        Sign in
                      </Link>
                    </div>
                  )}

                  <div className="flow-root">
                    <Link
                      href="/profile"
                      className="-m-2 block p-2 font-medium text-gray-900"
                      onClick={() => setOpen(false)}
                    >
                      My Profile
                    </Link>
                  </div>
                  <div className="flow-root">
                    <button
                      type="button"
                      className="-m-2 block p-2 font-medium text-gray-900"
                      onClick={() => {
                        handleLogout();
                        setOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="fixed top-0 w-full bg-white z-50">
        <p className="flex h-10 items-center justify-center bg-orange-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over Rs. 1000/-
        </p>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <span className="sr-only">Icon Mens Store</span>
                  <Image
                    className="h-12 w-auto"
                    src={iconmenstore}
                    alt="LOGO"
                    width={4500}
                    height={1500}
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-orange-600 text-orange-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "hover:text-orange-600 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                              {category.name === "Men" && (
                                <>
                                  {open ? (
                                    <ChevronDownIcon
                                      className="h-3 w-3 mt-1 ml-1"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <ChevronUpIcon
                                      className="h-3 w-3 mt-1 ml-1"
                                      aria-hidden="true"
                                    />
                                  )}
                                </>
                              )}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel
                              static
                              className="absolute inset-x-0 top-full text-sm text-gray-500"
                            >
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white overflow-y-auto max-h-96">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 py-4">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <Link
                                            href={item.href}
                                            onClick={close}
                                            className="mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </Link>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900"
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <Link
                                                  href={item.href}
                                                  onClick={close}
                                                  className="hover:text-gray-800"
                                                >
                                                  {item.name}
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-orange-600"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {isAdmin && (
                    <>
                      <Link
                        href="/admin/all-products"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Admin
                      </Link>
                      {/* <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />  it is | */}
                    </>
                  )}
                  {!token && (
                    <Link
                      href="/sign-in"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </Link>
                  )}
                </div>

                {/* Search */}
                {/* <div className="flex lg:ml-6">
                  <Link
                    href="#"
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </Link>
                </div> */}
                {/* profile */}
                {token && (
                  <div className="ml-4 flow-root lg:ml-6">
                    <Link
                      href={"/profile"}
                      className="group -m-2 flex items-center p-2"
                    >
                      <UserCircleIcon
                        className="h-7 w-7 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                        title="Profile"
                      />
                      <span className="sr-only">Open user menu</span>
                    </Link>
                  </div>
                )}
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link
                    href="/cart"
                    className="group -m-2 flex items-center p-2"
                  >
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                      title="Cart"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      0
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
                {/* Log out */}
                {token && (
                  <div className="ml-4 flow-root lg:ml-6">
                    <button
                      type="button"
                      onClick={() => {
                        // handleLogout();
                      }}
                      className="group -m-2 flex items-center p-2"
                    >
                      <ArrowLeftOnRectangleIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                        title="Logout"
                      />

                      <span className="sr-only">logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <ToastContainer theme="colored" />
    </div>
  );
}
