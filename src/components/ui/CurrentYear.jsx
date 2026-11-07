"use client";

import { useEffect, useState } from "react";

// বছর শুধু browser-এ বের করা হয়, build-এর সময় নয়
export default function CurrentYear() {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <span>{year}</span>;
}