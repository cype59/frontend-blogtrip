import { fetchAPI } from "../lib/api"

const Sitemap = () => {}

export const getServerSideProps = async ({ res }) => {
  const baseUrl = {
    development: "http://localhost:3000",
    production: process.env.NEXT_PUBLIC_WEBSITE_URL,
  }[process.env.NODE_ENV]

  const dynamiqueArticles = await fetchAPI("/articles")
  const dynamiqueCategories = await fetchAPI("/categories")

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
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
