import Link from "next/link";

export default async function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <h2 className="text-2xl font-bold text-orange-600">Not Found</h2>
        <p className="text-gray-500 text-xl">
          Could not find requested resource
        </p>
        <Link className="text-sm text-blue-500" href="/">
          Return Home
        </Link>
      </div>
    </div>
  );
}
