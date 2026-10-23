import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { fileURLToPath } from "url";
import { SEO_PAGES, SITE_URL } from "./src/data/seoMetadata.js";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const routeMetadata = Object.entries(SEO_PAGES)
  .filter(([route]) => route !== "/")
  .map(([route, metadata]) => ({
    ...metadata,
    route,
    file: `${route.slice(1)}-seo.html`,
  }));

function escapeHtml(value) {
  return value.replace(/[&<>\"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
  })[character]);
}

function replaceMeta(html, attribute, key, content) {
  const pattern = new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\\/>`);
  return html.replace(pattern, `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`);
}

function routeSeoHtml() {
  let outputDirectory = path.resolve(projectRoot, "dist");

  return {
    name: "route-seo-html",
    apply: "build",
    configResolved(config) {
      outputDirectory = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const templatePath = path.join(outputDirectory, "index.html");
      if (!fs.existsSync(templatePath)) return;

      const template = fs.readFileSync(templatePath, "utf8");
      for (const page of routeMetadata) {
        const canonical = `${SITE_URL}${page.route}`;
        let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
        html = replaceMeta(html, "name", "description", page.description);
        html = replaceMeta(html, "property", "og:url", canonical);
        html = replaceMeta(html, "property", "og:title", page.title);
        html = replaceMeta(html, "property", "og:description", page.description);
        html = replaceMeta(html, "name", "twitter:url", canonical);
        html = replaceMeta(html, "name", "twitter:title", page.title);
        html = replaceMeta(html, "name", "twitter:description", page.description);
        html = html.replace(
          /<link rel="canonical" href="[^"]*"\s*\/>/,
          `<link rel="canonical" href="${canonical}" />`,
        );
        fs.writeFileSync(path.join(outputDirectory, page.file), html);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), routeSeoHtml()],
  server: {
    fs: {
      strict: false,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(projectRoot, "src"),
    },
  },
});
