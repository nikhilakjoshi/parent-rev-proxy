import { before } from "node:test";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: "/_next/static/:path*",
          destination: "https://child-rev-proxy.vercel.app/_next/static/:path*",
          has: [
            {
              type: "header",
              value: "https://parent-rev-proxy.vercel.app/iframe/root",
              key: "Referer",
            },
          ],
        },
        {
          source: "/iframe/:path*",
          // destination: "http://localhost:3001/iframe/:path*",
          destination: "https://child-rev-proxy.vercel.app/iframe/:path*",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default config;
