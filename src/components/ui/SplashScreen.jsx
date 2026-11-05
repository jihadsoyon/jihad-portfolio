"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import { site } from "@/data/site";

export default function SplashScreen({ children }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1600);
    const hideTimer = setTimeout(() => setVisible(false), 2100);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      {visible && (
        <div
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-background transition-opacity duration-500 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          <h1 className="text-3xl font-bold text-foreground">{site.name}</h1>
          <p className="text-muted-foreground">{site.designation}</p>
          <Loader className="mt-4" />
        </div>
      )}
      {children}
    </>
  );
}