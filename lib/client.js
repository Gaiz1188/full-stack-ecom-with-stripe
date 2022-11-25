import sanityClient from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

export const client = sanityClient({
  projectId: "h8s8ll5e",
  dataset: "production",
  apiVersion: "2022-11-21",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)
