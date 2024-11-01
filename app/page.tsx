import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mt-6 pb-80 lg:mt-16">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-orange-600 sm:text-5xl">
              ICON MEN'S STORE
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Fashion is part of the daily air and it does not quite help that
              it changes all the time. Clothes have always been a marker of the
              era and we are in a revolution. Your fashion makes you been seen
              and heard that way you are. So, celebrate the seasons new and
              exciting fashion in your own way.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src="https://res.cloudinary.com/dnmfgi54z/image/upload/v1692979221/test-raja/w80ajq6ltgpltxyuz9ug.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://res.cloudinary.com/dnmfgi54z/image/upload/v1692725722/test-raja/ur064ddoh7fnrrwevc1u.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://res.cloudinary.com/dnmfgi54z/image/upload/v1692725425/test-raja/bbriew06ouw05if45nbm.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://res.cloudinary.com/dnmfgi54z/image/upload/v1692719657/test-raja/fdnvkvmocz4jcqpzx1b7.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://res.cloudinary.com/dnmfgi54z/image/upload/v1692717275/test-raja/srpsataxjxmqbzaaak2g.webp"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://res.cloudinary.com/dnmfgi54z/image/upload/v1692716535/test-raja/puykuap2r4myvzasq4ky.webp"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://tailwindui.com/plus/img/ecommerce-images/product-page-02-featured-product-shot.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="sign-in"
                className="inline-block rounded-md border border-transparent bg-orange-600 px-8 py-3 text-center font-medium text-white hover:bg-orange-700"
              >
                Shop Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
