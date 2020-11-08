import React, { useState, useEffect } from "react"
import NextImage from "next/image"

// taken directly from next.js repo
const VALID_LOADING_VALUES = ["lazy", "eager", undefined] as const
type LoadingValue = typeof VALID_LOADING_VALUES[number]

type ImageProps = Omit<
  JSX.IntrinsicElements["img"],
  "src" | "srcSet" | "ref" | "width" | "height" | "loading"
> & {
  src: string
  quality?: string
  priority?: boolean
  loading?: LoadingValue
  unoptimized?: boolean
} & {
  width: number
  height: number
  unsized?: false
}

type ImageWithPlaceholderProp = ImageProps & { placeholder: string }

export const ImageWithPlaceholder: React.FC<ImageWithPlaceholderProp> = ({
  src,
  placeholder,
  ...rest
}) => {
  const [currentSrc, updateSrc] = useState(placeholder)

  useEffect(() => {
    // start loading original image
    const imageToLoad = new Image()
    imageToLoad.src = src
    imageToLoad.onload = () => {
      // When image is loaded replace the src and set loading to false
      updateSrc(src)
    }
  }, [src])

  return <NextImage src={currentSrc} priority {...rest} />
}
