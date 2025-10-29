"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Redirecting to login...</h2>
    </div>
  );
}
