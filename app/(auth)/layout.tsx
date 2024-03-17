import { ToastContainer } from "react-toastify";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
