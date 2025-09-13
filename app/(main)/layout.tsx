"use client";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}

export default RootLayout;
