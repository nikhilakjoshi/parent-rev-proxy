import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Rubik } from "next/font/google";
import clsx from "clsx";
import { useRouter } from "next/router";

const font = Rubik({
  subsets: ["latin-ext"],
});

export default function Proxy() {
  const [loadText, setLoadText] = useState("Loading...");
  const router = useRouter();
  const fetchSamlToken = async () => {
    setLoadText("fetching saml token...");
    const samlTokenPromise = await fetch(
      "https://child-rev-proxy.vercel.app/api/saml",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );
    const { samlToken } = (await samlTokenPromise.json()) as {
      samlToken?: string;
      message?: string;
    };
    if (samlToken)
      router.replace(
        `https://parent-rev-proxy.vercel.app/iframe/root/${samlToken}`,
      );
  };
  useEffect(() => {}, []);
  return (
    <React.Fragment>
      <Head>
        <title>Reverse Proxy</title>
        <meta name="description" content="Reverse Proxy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={clsx("flex min-h-screen flex-col", font.className)}>
        <span className="text-sm text-gray-500">{loadText}</span>
      </main>
    </React.Fragment>
  );
}
