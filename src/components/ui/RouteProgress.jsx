"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function RouteProgress() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  // ভেতরের কোনো link-এ click করলে progress শুরু
  useEffect(() => {
    let safety;

    const onClick = (e) => {
      const a = e.target.closest("a[href]");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href.startsWith("/") || href.startsWith("//")) return;
      if (a.target === "_blank" || href === pathname) return;

      setLoading(true);
      // কোনো কারণে route না বদলালে bar আটকে থাকবে না
      clearTimeout(safety);
      safety = setTimeout(() => setLoading(false), 8000);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clearTimeout(safety);
    };
  }, [pathname]);

  // route বদলে গেলে progress শেষ
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="route-progress"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.15, duration: 0.2 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[3px] overflow-hidden"
        >
          <motion.span
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            className="block h-full w-1/2 bg-gradient-to-r from-transparent via-primary to-fuchsia-500 shadow-[0_0_12px_rgba(129,140,248,0.9)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}