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
          source: "/banking/:path*",
          destination: "https://child-rev-proxy.vercel.app/banking/:path*",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default config;
