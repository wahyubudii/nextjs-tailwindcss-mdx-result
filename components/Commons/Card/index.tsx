import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Card({ data, index }: any): JSX.Element {
  return (
    <Link
      href={`/blog/${data.slug}`}
      key={index}
      className="border border-slate-600 rounded overflow-hidden text-white hover:scale-105 transition"
    >
      <div className="flex items-center justify-between">
        <div className="mx-10">
          <h2 className="text-xl font-bold">{data.frontMatter.title}</h2>
          <p className="pt-2 text-[12px]">{data.frontMatter.description}</p>
          <p className="text-xs mt-4">{data.frontMatter.date}</p>
        </div>
        <Image
          src={data.frontMatter.thumbnailUrl}
          alt="blog logo"
          width={250}
          height={100}
          priority
          className="w-auto h-auto"
        />
      </div>
    </Link>
  );
}
