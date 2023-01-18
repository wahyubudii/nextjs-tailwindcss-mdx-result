import Link from "next/link";
import React from "react";

export default function Header(): JSX.Element {
  return (
    <div className="h-20 flex items-center justify-between">
      <Link href="/" className="uppercase text-2xl font-bold">
        Logo
      </Link>
      <Link href="#" className="font-bold hover:underline">
        Blog
      </Link>
    </div>
  );
}
