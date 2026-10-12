import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// URL canónica del sitio. Se puede sobreescribir con PUBLIC_SITE_URL.
const site = process.env.PUBLIC_SITE_URL ?? "https://marcoszinga.vercel.app";

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    icon(),
    sitemap({
      filter: (page) => !page.includes("/404"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
