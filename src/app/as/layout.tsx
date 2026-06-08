import React from "react";
import { Navbar } from "../(view)/_components/navbar";
import { Footer } from "../(view)/_components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-24 bg-white">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
