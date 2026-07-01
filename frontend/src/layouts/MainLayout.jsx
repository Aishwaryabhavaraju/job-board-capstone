import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/ui/Footer";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <main
        className="
          min-h-screen
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-8
        "
      >
        <Outlet />
      </main>

      <Footer />
    </>
  );
}