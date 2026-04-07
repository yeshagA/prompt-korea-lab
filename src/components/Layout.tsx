import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useEffect, useRef, useState } from "react";
import { SidebarProvider } from "@/context/SidebarContext";


const Layout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="min-h-screen flex flex-col">
      <Sidebar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  </SidebarProvider>
);

export default Layout;