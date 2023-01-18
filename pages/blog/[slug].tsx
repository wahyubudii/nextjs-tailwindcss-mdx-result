import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import mdxPrism from "mdx-prism";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import Image from "next/image";

const components = {
  Image,
};

type PostPageProps = {
  frontMatter: {
    title: string;
    date: string;
    description: string;
    thumbnailUrl: string;
    tags: string | any;
  };
  mdxSource: MDXRemoteSerializeResult;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), "posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".mdx", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params: { slug },
}: any) => {
  const markdownWithMeta = fs.readFileSync(
    path.join(process.cwd(), "posts", `${slug}.mdx`)
  );

  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [require("remark-code-titles")],
      rehypePlugins: [mdxPrism, rehypeSlug, rehypeAutolinkHeadings],
    },
    scope: frontMatter,
  });

  return {
    props: {
      frontMatter,
      mdxSource,
    },
  };
};

export default function BlogDetail({
  frontMatter,
  mdxSource,
}: PostPageProps): JSX.Element {
  return (
    <Layout>
      <div className="lg:mx-24 xl:mx-32 2xl:mx-40">
        <div className="pt-6 flex items-center font-medium text-xs 2xl:text-sm text-slate-500 dark:text-slate-300">
          <Link href="/" className="hover:text-blue-500">
            Home
          </Link>
          <span className="mx-3 after:content-['/']"></span>
          <Link href="/blog" className="hover:text-blue-500">
            Blog
          </Link>
          <span className="mx-3 after:content-['/']"></span>
          <Link href="#" className="text-blue-500 dark:text-blue-400">
            {frontMatter.title}
          </Link>
        </div>
        <div className="pt-8 sm:pt-12 pb-8">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold">
            {frontMatter.title}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
            {frontMatter.date}
          </p>
          <div className="prose dark:prose-dark font-sans max-w-full text-justify text-sm xl:text-lg mt-5">
            <MDXRemote {...mdxSource} components={components} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
