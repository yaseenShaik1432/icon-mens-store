import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section>
        <Navbar />
        <section className="mt-20">{children}</section>
        <Footer />
      </section>
    </>
  );
}
