import { getStrapiMedia } from "../lib/media"
import NextImage from "next/image"

interface ImageRatio {
  fullRatio: boolean
}

const MyImage = ({ image, fullRatio }) => {
  const { alternativeText } = image

  const loader = () => {
    return getStrapiMedia(image)
  }

  return fullRatio ? (
    <NextImage
      loader={loader}
      unoptimized={true}
      layout="fill"
      objectFit="cover"
      src={getStrapiMedia(image)}
      alt={alternativeText || ""}
    />
  ) : (
    <NextImage
      loader={loader}
      unoptimized={true}
      layout="responsive"
      width={image.width}
      height={image.height}
      objectFit="contain"
      src={getStrapiMedia(image)}
      alt={alternativeText || ""}
    />
  )
}

export default MyImage
