---
title: "Phillip-Maier.com"
description: "My first personal website"
date: "11-1-2020"
author: Phillip Maier
categories:
  - TypeScript
  - React
  - Apollo
  - GraphQL
  - AWS Cloudfront
  - react-grid-layout
  - testing-library/react
  - jest
  - cypress
projectURL: https://phillip-maier.com
bannerPath: /PostPics/FillUpOnPhillip.png
bannerPlaceholderPath: /PostPics/FillUpOnPhillip-Placeholder.png
bannerHeight: 160
bannerWidth: 180
bannerCredit: Phillip Maier
bannerDescription: A picture of the homepage of phillip-maier.com
---

## ❓ Why Did I create [FillUpOnPhillip](https://phillip-maier.com/)

- **I needed to get a very solid grasp of a new library: [react-grid-layout](https://github.com/STRML/react-grid-layout).** When I created [FillUpOnPhillip](https://phillip-maier.com/), which I will now be abbreviating to FUOP because the full name makes me cringe a bit, I was working on a dashboard that required moveable "widgets". After some research I decided react-grid-layout was the best choice, and to gain some experience I built my first personal website!

## 🏗️ How Did I build [FillUpOnPhillip](https://phillip-maier.com/)

- To keep things short i'll simply show you a trimmed [package.json](https://github.com/pmaier983/FillUpOnPhillip/blob/master/package.json)

  ```js
  {
    dependencies: {
      "@apollo/client": "^3.2.5",
      "graphql": "^15.3.0",
      "lodash": "^4.17.19",
      "react": "^17.0.1",
      "react-grid-layout": "^1.0.0",
      "styled-components": "^5.1.1"
    },
    devDependencies: {
      "@testing-library/react": "^10.0.2",
      "fast-check": "^2.1.0",
      "cypress": "^4.4.1",
      "typescript": "^3.8.3"
    }
  }
  ```

## 💡 What Are my takeaways from building [FillUpOnPhillip](https://phillip-maier.com/)

- **Testing is great, but it has diminishing returns.** I hesitate to say this, because I currently work at a place whose only tests are those i've written myself, but its true! In the case of my personal site, that means: "can users click on links to my resume/github/linkedin/etc". But once you've written tests for this core functionality don't prioritize testing for extraneous items.

  Focus on reading documentation, or building a new feature, or just relaxing and regaining some mental health points before you test if that button changes color on hover. As with all things in life, this advice has many exceptions so don't take it as dogma... take it as advice and use the good old [noggin](https://www.merriam-webster.com/dictionary/noggin) if necessary!
