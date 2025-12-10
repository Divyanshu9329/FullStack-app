import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AdminLayout() {
  return (
    <section className="min-h-screen bg-linear-to-b from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF]">
      {/* Top Navbar */}
      <Navbar />

      {/* Page content */}
      <main className="mt-10 px-6 md:px-20 max-w-7xl mx-auto pb-16">
        <Outlet />
      </main>
    </section>
  );
}

export default AdminLayout;
