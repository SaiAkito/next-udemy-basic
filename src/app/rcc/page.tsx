"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  const router = useRouter();
  return (
    <div>
      クライアント
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <button onClick={() => router.push("about")}>Aboutへ</button>
      <Link href="/">Homeへ</Link>
    </div>
  );
}
