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
      "https://child-rev-proxy.vercel.app/banking/api/saml",
      {
        method: "POST",
        credentials: "include",
      },
    );
    const { samlToken } = (await samlTokenPromise.json()) as {
      samlToken?: string;
      message?: string;
    };
    return {
      samlToken,
    };
  };
  useEffect(() => {
    fetchSamlToken()
      .then(({ samlToken }) => {
        if (samlToken)
          router
            .replace(`https://parent-rev-proxy.vercel.app/banking/${samlToken}`)
            .then((a) => {
              console.log("success", a);
            })
            .catch((err) => {
              console.error(err);
            });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
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
