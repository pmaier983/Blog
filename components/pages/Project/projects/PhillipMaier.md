---
title: "PhillipMaier.com"
description: "My Second personal website"
date: "11-4-2020"
author: Phillip Maier
categories:
  - TypeScript
  - React
  - Next.js
  - Vercel
  - SEO
projectURL: https://phillipmaier.com
bannerPath: "/PostPics/PhillipMaier.png"
bannerPlaceholderPath: "/PostPics/PhillipMaier-Placeholder.png"
bannerHeight: 160
bannerWidth: 150
bannerCredit: Phillip Maier
bannerDescription: A Picture of the home page of phillipmaier.com
---

## ❓ Why Did I create [PhillipMaier.com](https://phillipmaier.com/)

- If you took the time to read [this](https://phillipmaier.com/project/FillUpOnPhillip) post you will know I already have a personal website! So its only logical that you would be asking: _"Phillip why do you need **another** personal website?"_. Good question friendly reader. Since I created my first personal website much has changed. I've become fascinated by new technologies, gained new skills, and also been trapped in one place because of COVID. So I thought: why not build a blog with some new tech and then blog about what I learn!

## 🏗️ How Did I build [PhillipMaier.com](https://phillipmaier.com/)

- **[Next.js](https://nextjs.org/docs/getting-started) vs. [Gatsby](https://www.gatsbyjs.com/docs/quick-start/).** This to me was a simple debate. Next.js and Gatsby.js both are great at static site generation. Gatsby though only covers Static Sites, while Next.js also handles server side rendering. So I made the choice that enabled the most flexibility, all things held equal.

  ### A trimmed version of my [package.json](https://github.com/pmaier983/Blog/blob/main/package.json)

```javascript
  {
    dependencies: {
      "gray-matter": "^4.0.2",
      "next": "^10.0.0",
      "prismjs": "^1.22.0",
      "react": "^16.13.1",
      "react-markdown": "^5.0.0",
      "typography": "^0.16.19",
    },
    devDependencies: {
      "prettier": "^2.1.2",
      "styled-components": "^5.2.0",
      "typescript": "^4.0.3"
    },
  }
```

## 💡 What Are my takeaways from building [PhillipMaier.com](https://phillipmaier.com/)

- **I love Next.js and [Vercel](https://vercel.com/dashboard).** The first time I attempted to deploy a site using S3 static site generation, Cloudfront and Route 53, it took me a solid 5 hours. The first time I attempted to deploy a site on Vercel it took me 15 minutes or less. Now this is not an entirely fair comparison, apples to oranges and the such, but in all honesty the gap should not be so large!
