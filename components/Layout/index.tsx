import Head from "next/head";
import React from "react";
import Header from "../Commons/Header";

export default function Layout({ children }: any): JSX.Element {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="blog page" />
      </Head>
      <div className="transition duration-500 ease-in-out bg-gray-50 dark:bg-black z-10">
        <div className="min-h-screen flex flex-col">
          <main className="justify-center">
            <div className="container mx-auto dark:text-white">
              <div className="mx-10 sm:mx-20 lg:mx-24 xl:mx-40">
                <Header />
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
