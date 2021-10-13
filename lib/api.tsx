export function getStrapiURL(path = "") {
  if (`${process.env.NODE_ENV}` === "production") {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`
  } else {
    return `http://localhost:1337${path}`
  }
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path)
  const response = await fetch(requestUrl)
  const data = await response.json()
  return data
}
