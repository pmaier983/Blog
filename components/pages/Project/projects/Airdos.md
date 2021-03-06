---
title: "Airdos.net"
description: "A social networking site for academics I had been "
publishTime: "11-3-2020"
modifiedTime: "11-3-2020"
authors:
  - Phillip Maier
tags:
  - TypeScript
  - React
  - Apollo
  - REST
  - MySQL
  - lerna
  - serverless
  - AWS Cloudfront
projectURL: https://airdos.net
bannerPath: /PostBackgrounds/Airdos.png
bannerPlaceholderPath: /PostBackgrounds/Airdos-Placeholder.png
bannerHeight: 150
bannerWidth: 200
bannerCredit: Phillip Maier
bannerDescription: A picture of the homepage of Airdos.net
---

## ❓ Why Did I create [Airdos](https://airdos.net/feed)

- I created [Airdos](https://airdos.net/feed) to act as a social media platform for academics. You may be thinking:

  `"why would you build a social media platform Phillip? They are difficult to create and the idea has been mined nearly to its core by companies like Facebook."`

  You my nameless reader are correct ✔️ ! Building a social media site is nearly a cliché for a young dev, and it is rather difficult to do well. But as Theodore Roosevelt once said [“Nothing in the world is worth having or worth doing unless it means effort, pain,[and] difficulty"](https://www.goodreads.com/quotes/312751-nothing-in-the-world-is-worth-having-or-worth-doing). I was draw to the problem because of how difficult it seemed, and I hoped to learn a tremendous amount as I built (and more likely failed to build) my first social media site.

## 🏗️ How Did I build [Airdos](https://airdos.net/feed)

- In the interest of brevity, I will simply post a trimmed version of the [package.json](https://github.com/pmaier983/Airdos/blob/master/packages/frontend-airdos/package.json) from the project itself. Keep in mind, it was a lerna project, so mentally include `{"lerna": "^3.21.0"}`.

### Frontend

```js
{
  dependencies: {
    "apollo-client": "^2.6.9",
    "graphql": "^15.0.0",
    "lodash": "^4.17.19",
    "polished": "^3.6.3",
    "react": "^16.13.1",
    "react-axe": "^3.4.1",
    "react-grid-layout": "^0.18.3",
    "react-hook-form": "^5.6.1",
    "react-router-dom": "^5.1.2",
    "react-window": "^1.8.5",
  },
  devDependencies: {
    "@graphql-codegen/cli": "1.17.6",
    "@testing-library/react": "^10.0.4",
    "cypress": "^4.4.1",
    "husky": "^4.2.5",
    "prettier": "^2.0.5",
    "react-test-renderer": "^16.13.1",
    "styled-components": "^5.1.0",
    "typescript": "^3.8.3",
  },
}
```

### Backend

```js
{
  dependencies: {
    "apollo-server-lambda": "^2.14.1",
    "aws-sdk": "^2.734.0",
    "lodash": "^4.17.20",
  },
  devDependencies: {
    "eslint": "^7.7.0",
    "nodemon": "^2.0.4",
    "serverless": "^1.72.0",
    "typescript": "^3.9.3",
  },
}
```

## 💡 What Are my takeaways from building [Airdos](https://airdos.net/feed)

### General takeaways

- **Plan, plan and plan again, then code**. You know that old adage ["measure twice and cut once"](https://en.wiktionary.org/wiki/measure_twice_and_cut_once), that surprisingly holds some truth when planning a software project. I repeatedly expanded my [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) as I built, leading to a product that was fully built out in some areas, and weirdly lacking in others, without having any obvious core functionality. Moral of the story, build the MVP first, duh 🤦 .

- **When working with others make sure everyone understands their role and gives feedback freely to everyone they interact with**. I was approached with the idea for [Airdos](https://airdos.net/feed) by two friends of mine with no coding experience. Early on we established they would act as product managers and I would be the engineer. For some of you reading this, red flags will be flying in every direction, but I was naive... now I'm slightly more mature and also part of a great facebook group called ["I can handle the business side"](https://www.facebook.com/groups/1401833413216649). As it turned out they didn't know how to be product managers at all, and I was too kind/naive to give them the feedback they needed to become better! Always give feedback (in a kind and constructive manner) !

### Tech takeaways

- **Serverless is great, especially for [POC's](https://en.wikipedia.org/wiki/Proof_of_concept).** I saved a ton of money (for a personal project) by not running an EC2 instance's 24/7 to handle my graphql-dynamoDB api. I payed $0 for my servers. We were able to demo to possible clients, and rapidly make changes all for $0. Not that we needed it in the end, but it can scale! In summary, [aws lambda](https://aws.amazon.com/lambda/) is awesome, and I plan on using it more for my frugal escapades in the future.

- **A11y: its benefits far outweigh its costs.** When I was young I decided to try my hand at finance. I was fascinated by the complexity of financial markets and was lucky enough to land an internship at [MITIMCo](https://mitimco.org/), MIT's [\$18 billion dollar](https://news.mit.edu/2020/financials-endowment-2020) Endowment.

  From day one I discovered what MITIMCo actually does... worship excel. Often I would walk by cubicles with three screen all blindingly white with that characteristic green trim ([#008000](https://www.color-hex.com/color/008000) if you were wondering).

  So I asked myself, why was excel so amazing? Today I can tell you for certain: [A11y](https://developer.mozilla.org/en-US/docs/Web/Accessibility). The ability to quickly and easily tab through excel, combined with amazing fluid usability, this is what made everyone addicted. Making your site easy to flow through without a mouse, and even without looking at your site will help millions, and its just possible (as was the case with excel) it will make your site addictive and indispensable.
