---
title: "How to Progressively load Images in Next.js!"
description: "You can progressively load images in next.js 10+ with just a few simple steps!"
publishTime: "11-9-2020"
modifiedTime: "11-9-2020"
authors:
  - Phillip Maier
tags:
  - Next.js
  - React
  - Image
bannerPath: /PostPics/Cazenovia_Hay_Bales.png
bannerPlaceholderPath: /PostPics/Cazenovia_Hay_Bales-Placeholder.png
bannerCredit: Unknown
bannerDescription: A painting of Hay Bales with a blue sky in summer
---

_This guide is for Next.js v10.0+_

1. Chose an image you would like to progressively load
2. Pixelate the image using [https://onlinepngtools.com/pixelate-png](https://onlinepngtools.com/pixelate-png)
3. Resize your pixelated image (to be much smaller, 10 by 10px) using [https://onlinepngtools.com/resize-png](https://onlinepngtools.com/resize-png)
4. Place both images somewhere in your public folder and take note of their path
5. Use the following code to create a `ImageWithPlaceholder` component

```js
import React, { useState, useEffect } from "react"
import NextImage from "next/image"

export const ImageWithPlaceholder = ({
  src, // path to final image
  placeholder, // path to pixelated resized image
  ...rest
}) => {
  const [currentSrc, updateSrc] = useState(placeholder)

  // Begin loading the image as soon as the component is rendered
  useEffect(() => {
    const imageToLoad = new Image({
      src,
      onload: () => {
        // When the image is loaded,
        // replace the blurred image with the now loaded full image
        updateSrc(src)
      },
    })
  }, [src])

  return <NextImage src={currentSrc} priority {...rest} />
}
```

6. Simply call the component like this:

```js
const App = () => (
  <ImageWithPlaceholder
    src="./PATH_TO_REAL_IMAGE_IN_PUBLIC_FOLDER"
    placeholder="./PATH_TO_PLACEHOLDER_IN_PUBLIC_FOLDER"
    alt="IMAGE_ALT_TEXT"
  />
)
```

7. All done! 🎉 😊

# How to Progressively load Images in Next.js with TypeScript

If you're using typescript you should use the following component:

```ts
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
  src, // path to final image
  placeholder, // path to pixelated resized image
  ...rest
}) => {
  const [currentSrc, updateSrc] = useState(placeholder)

  // Begin loading the image as soon as the component is rendered
  useEffect(() => {
    const imageToLoad = new Image({
      src,
      onload: () => {
        // When the image is loaded,
        // replace the blurred image with the now loaded full image
        updateSrc(src)
      },
    })
  }, [src])

  return <NextImage src={currentSrc} priority {...rest} />
}
```

If you would prefer the medium post, take a look [here](https://pmaier983.medium.com/how-to-progressively-load-images-in-next-js-js-ts-1e82e74d793b)
