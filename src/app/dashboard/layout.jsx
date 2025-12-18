"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "@/components/Dashboard/Navbar";
import SideBar from "@/components/Dashboard/Sidebar";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }) {
  const { status } = useSession();

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <div className="h-screen flex flex-col">
      <Toaster/>
      <Navbar />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 p-6 ml-60">{children}</main>
      </div>
    </div>
  );
}
