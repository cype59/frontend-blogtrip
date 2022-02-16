import fs from "fs"
import { fetchAPI } from "../lib/api"

const Sitemap = () => {}

export const getServerSideProps = async ({ res }) => {
  const baseUrl = {
    development: "http://localhost:3000",
    production: process.env.NEXT_PUBLIC_WEBSITE_URL,
  }[process.env.NODE_ENV]

  const staticPages = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "article",
        "_app.tsx",
        "_document.tsx",
        "[categoryslug].tsx",
        "sitemap.xml.tsx",
      ].includes(staticPage)
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath}`
    })

  const dynamiqueArticles = await fetchAPI("/articles")
  const dynamiqueCategories = await fetchAPI("/categories")

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `
        })
        .join("")}
      ${dynamiqueArticles
        .map(({ slug, updated_at }) => {
          return `
            <url>
              <loc>${baseUrl}/article/${slug}</loc>
              <lastmod>${updated_at}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `
        })
        .join("")}
        ${dynamiqueCategories
          .map(({ slug, updated_at }) => {
            return `
              <url>
                <loc>${baseUrl}/${slug}</loc>
                <lastmod>${updated_at}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
              </url>
            `
          })
          .join("")}
    </urlset>
  `

  res.setHeader("Content-Type", "text/xml")
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap
