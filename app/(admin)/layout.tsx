import { ToastContainer } from "react-toastify";
import Sidebar from "../components/common/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      {children}
      <ToastContainer theme="colored" />
    </>
  );
}
