"use client";

import { CircularLoadingScreenAdvanced } from "@/components/circular-loading-screen-advanced";
import { CustomCursor } from "@/components/custom-cursor";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { TransitionEffect } from "@/components/transition-effect";
import { useEffect, useState } from "react";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) {
      setIsLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem("hasLoaded", "true"); 
  };

  return (
    <>
      <CircularLoadingScreenAdvanced onComplete={handleLoadingComplete} />
      {!isLoading && (
        <>
        <div className="relative z-10">
          <CustomCursor />
          <Navbar />
          <TransitionEffect />
          {children}
          <Footer className="relative z-20"/>
          </div>
        </>
      )}
    </>
  );
}