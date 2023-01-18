import Card from "@/components/Commons/Card";
import Layout from "@/components/Layout";
import React from "react";
import { GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), "posts"));

  const posts = files.map((filename: any) => {
    const markdownWithMeta = fs.readFileSync(
      path.join(process.cwd(), "posts", filename)
    );
    const { data: frontMatter } = matter(markdownWithMeta);

    return {
      frontMatter,
      slug: filename.split(".")[0],
    };
  });

  return {
    props: {
      posts,
    },
  };
};

export default function Blog({ posts }: any): JSX.Element {
  return (
    <Layout>
      <div className="mt-24">
        <div className="space-y-3 mb-10">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p>Simple blog with tailwind typography and mdx</p>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {posts.map((val: any, index: number) => {
            return <Card data={val} key={index} />;
          })}
        </div>
      </div>
    </Layout>
  );
}
