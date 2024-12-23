import { atom } from "jotai"
import { Home, Book, Folder } from "lucide-react"
import { QueryClient } from "@tanstack/react-query"

import type { ButtonName } from "@repo/backend-core"
import { httpBatchLink } from "@trpc/client"
import { TRPC_URL, trpcReactQuery } from "~/utils/client"

export const SITE_TITLE = "Phillip Maier's Personal Website"
export const SITE_DESCRIPTION =
  "The personal website of Phillip Maier. A place to share my thoughts, projects, and cool links."

export const LINKEDIN_URL =
  "https://www.linkedin.com/in/phillip-maier-3a4161102/"
export const GITHUB_URL = "https://github.com/pmaier983"
export const TWITTER_URL = "https://x.com/pmaier983"

export const queryClientAtom = atom(new QueryClient())

export const trpcQueryClientAtom = atom(
  trpcReactQuery.createClient({
    links: [
      httpBatchLink({
        url: TRPC_URL,
      }),
    ],
  }),
)

export const NAVIGABLE_PAGES: {
  title: string
  href: string
  Icon: typeof Home
}[] = [
  {
    title: "Home",
    href: "/",
    Icon: Home,
  },
  {
    title: "Cool Links",
    href: "/cool-links",
    Icon: Book,
  },
  {
    title: "Projects",
    href: "/projects",
    Icon: Folder,
  },
]

export interface Project {
  title: string
  description: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    title: "React Hook Form",
    description:
      "I was a core contributor to the project. Helping create the most popular form library for react with over 40k github stars and over 6 million npm downloads per day",
    link: "https://react-hook-form.com/",
  },
  {
    title: "Detective ML",
    description: "A experiment in creating an AI based detective game.",
    link: "https://detectiveml.com/",
  },
  {
    title: "SuperCTF",
    description:
      "An IO game with over 100k players. Several 1000 concurrently at its peak. I was the backend muscle for the project.",
    link: "https://critkitchen.com/superctf",
  },
]

export const COOL_LINKS: {
  title: string
  links: string[]
  name: ButtonName
}[] = [
  {
    title: "Is it worth optimizing a workflow?",
    links: ["https://xkcd.com/1205/"],
    name: "is_it_worth_optimizing_workflow",
  },
  {
    title: "Very solid beginners summary of how to think about CSS",
    links: ["https://youtu.be/i1FeOOhNnwU?si=xqRBrM7WSL0ku-Za"],
    name: "css_beginner_summary",
  },
  {
    title: "Falsehoods believed by programmers",
    links: ["https://spaceninja.com/blog/2015/falsehoods-programmers-believe"],
    name: "falsehoods_programmers",
  },
  {
    title: "What GCP region is best for you?",
    links: ["https://www.gcping.com"],
    name: "best_gcp_region",
  },
  {
    title: "A great “How to write a blog” Post",
    links: [
      "https://www.joshwcomeau.com/blog/how-i-built-my-blog-v2/?from=newsletter",
    ],
    name: "how_to_write_blog",
  },
  {
    title: "Possibly good alternative to styled-components",
    links: [
      "https://linaria.dev",
      "https://mui.com/blog/introducing-pigment-css",
    ],
    name: "styled_components_alternative",
  },
  {
    title: "Callback Refs",
    links: ["https://tkdodo.eu/blog/avoiding-use-effect-with-callback-refs"],
    name: "callback_refs",
  },
  {
    title: "Good instructions for Meta interview",
    links: ["https://www.reddit.com/r/cscareerquestions/s/DzTYdSf78K"],
    name: "meta_interview_tips",
  },
  {
    title: "You (hopefully) don't need useEffect",
    links: ["https://react.dev/learn/you-might-not-need-an-effect"],
    name: "no_need_use_effect",
  },
  {
    title:
      "When to open up a link in a new tab or the current one (favor the latter)",
    links: [
      "https://blog.pope.tech/2024/01/02/how-to-make-external-links-accessible",
    ],
    name: "link_opening_guidelines",
  },
  {
    title: "Ok summary of css styling in the SSR age",
    links: ["https://www.joshwcomeau.com/react/css-in-rsc"],
    name: "css_styling_ssr_age",
  },
  {
    title: "Cool alternative to StyleX (from MUI people)",
    links: ["https://github.com/mui/pigment-css"],
    name: "stylex_alternative",
  },
  {
    title: "Docker compose at a production level",
    links: [
      "https://aws.amazon.com/blogs/containers/automated-software-delivery-using-docker-compose-and-amazon-ecs",
    ],
    name: "docker_compose_production",
  },
  {
    title: "The same Problems Solved in every possible programming language",
    links: ["https://rosettacode.org"],
    name: "problems_solved_languages",
  },
  {
    title: "Great article about the two reacts",
    links: ["https://overreacted.io/the-two-reacts"],
    name: "two_reacts_article",
  },
  {
    title: "Another great RSC video",
    links: ["https://youtu.be/MaebEqhZR84?si=uKZAL4mce3P5sUCK"],
    name: "rsc_video",
  },
  {
    title: "Do the boring thing (Innovation token)",
    links: ["https://mcfunley.com/choose-boring-technology"],
    name: "choose_boring_technology",
  },
  {
    title: "Some interesting Animated Icons",
    links: ["https://animatedicons.co"],
    name: "animated_icons",
  },
  {
    title:
      "Great article about the good bad and ugly of React Server Components",
    links: ["https://www.mayank.co/blog/react-server-components"],
    name: "rsc_good_bad_ugly",
  },
  {
    title:
      "Cool background grid visual creator (for website background images)",
    links: [
      "https://x.com/miranodesigns/status/1729896500245807581?s=46&t=AvxOErBZQssdPziieqzO9w",
    ],
    name: "background_grid_creator",
  },
  {
    title: "Great into to CSS & Layout “Modes”",
    links: ["https://www.joshwcomeau.com/css/understanding-layout-algorithms"],
    name: "css_layout_modes",
  },
  {
    title: "JS SEO",
    links: [
      "https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics",
    ],
    name: "javascript_seo",
  },
  {
    title: "Interesting list of human problems in software",
    links: [
      "https://newsletter.getdx.com/p/human-challenges-software-engineering",
      "https://ieeexplore.ieee.org/document/9706331",
    ],
    name: "human_problems_software",
  },
  {
    title: "How to handle favicon's",
    links: [
      "https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs",
    ],
    name: "handle_favicons",
  },
  {
    title: "Different types of color handling in css (hsla vs reba etc)",
    links: ["https://www.joshwcomeau.com/css/color-formats"],
    name: "css_color_handling",
  },
  {
    title: "Twitter methods of assign a type",
    links: [
      "https://twitter.com/mattpocockuk/status/1631249088795533315?s=46&t=AvxOErBZQssdPziieqzO9w",
    ],
    name: "twitter_type_methods",
  },
  {
    title: "Always ask a full question",
    links: ["https://dontasktoask.com"],
    name: "ask_full_question",
  },
  {
    title: "Transform any image into an SVG",
    links: ["https://vectorizer.ai"],
    name: "image_to_svg",
  },
  {
    title: "Don't use handle click",
    links: ["https://tkdodo.eu/blog/on-naming-things#react-event-handlers"],
    name: "dont_use_handle_click",
  },
  {
    title: "Typeface vs Font",
    links: ["https://notadesigner.io/p/how-to-pick-font"],
    name: "typeface_vs_font",
  },
  {
    title: "How to handle SVG in react",
    links: ["https://benadam.me/thoughts/react-svg-sprites"],
    name: "handle_svg_react",
  },
  {
    title: "Why not to use styled-components",
    links: [
      "https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b",
      "https://t.co/nL8nX5VUp",
    ],
    name: "why_not_styled_components",
  },
  {
    title:
      "Google maps that you can query with SQL (Use Chat-GPT to build queries)",
    links: ["https://www.openstreetmap.org/#map=3/38.01/-95.84"],
    name: "google_maps_with_sql",
  },
  {
    title: "A site to help track down web performance issues",
    links: ["https://www.speedcurve.com"],
    name: "track_web_performance",
  },
  {
    title: "Why to use Strict Type Inputs",
    links: [
      "https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate",
    ],
    name: "strict_type_inputs",
  },
  {
    title: "Type Safe URL Routes for React",
    links: ["https://nuqs.47ng.com"],
    name: "type_safe_url_routes",
  },
  {
    title: "More CSS, but Some React",
    links: ["https://www.joshwcomeau.com"],
    name: "more_css_some_react",
  },
  {
    title: "Good General React Opinions",
    links: ["https://kentcdodds.com/blog"],
    name: "general_react_opinions",
  },
  {
    title: "React Query: Main Maintainer's Blog",
    links: ["https://tkdodo.eu/blog"],
    name: "react_query_main_blog",
  },
  {
    title: "React Query: Original Creator's Site",
    links: ["https://tannerlinsley.com"],
    name: "react_query_creator_site",
  },
  {
    title: "Redux Creator's Blog (Dan Abramov)",
    links: ["https://overreacted.io"],
    name: "redux_creator_blog",
  },
  {
    title: "Margin is Bad",
    links: ["https://mxstbr.com/thoughts/margin"],
    name: "margin_is_bad",
  },
  {
    title: "Docs on useEffect",
    links: [
      "https://overreacted.io/a-complete-guide-to-useeffect",
      "https://react.dev/learn/synchronizing-with-effects",
    ],
    name: "docs_use_effect",
  },
  {
    title: "Interesting Reddit List of JavaScript Talks (2023)",
    links: [
      "https://www.reddit.com/r/reactjs/comments/1brbq9q/all_javascript_conference_talks_from_2023_ordered",
    ],
    name: "js_talks_2023",
  },
  {
    title: "Examples of Slow Types and Intro to MySQL",
    links: [
      "https://planetscale.com/learn/courses/mysql-for-developers?autoplay=1",
    ],
    name: "slow_types_intro_mysql",
  },
  {
    title: "Make Typography Consistent/Predictable",
    links: ["https://seek-oss.github.io/capsize"],
    name: "consistent_typography",
  },
  {
    title: "Demystifying INP",
    links: [
      "https://vercel.com/blog/demystifying-inp-new-tools-and-actionable-insights",
    ],
    name: "demystifying_inp",
  },
  {
    title: "Visualization Primitives Library for React",
    links: ["https://airbnb.io/visx"],
    name: "visualization_primitives",
  },
  {
    title: "Cool Modern CMS",
    links: ["https://strapi.io"],
    name: "modern_cms",
  },
  {
    title: "How to Ship at Big Companies",
    links: ["https://www.seangoedecke.com/how-to-ship"],
    name: "shipping_big_companies",
  },
  {
    title: "GitHub CODEOWNERS Docs",
    links: [
      "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners",
    ],
    name: "github_codeowners_docs",
  },
  {
    title: "Detecting Sticky Element Pinning",
    links: [
      "https://css-tricks.com/how-to-detect-when-a-sticky-element-gets-pinned",
      "https://stackoverflow.com/a/57991537",
    ],
    name: "sticky_element_pinning",
  },
  {
    title: "Give Away Your Legos for Scaling Startups",
    links: [
      "https://review.firstround.com/give-away-your-legos-and-other-commandments-for-scaling-startups",
    ],
    name: "give_away_legos",
  },
  {
    title: "Smallest Files",
    links: ["https://github.com/mathiasbynens/small"],
    name: "smallest_files",
  },
  {
    title: "Open Source Icon Library",
    links: ["https://lucide.dev/guide"],
    name: "open_source_icons",
  },
  {
    title: "Production-Grade Next.js & React Example",
    links: ["https://github.com/alan2207/bulletproof-react"],
    name: "nextjs_production_example",
  },
  {
    title: "Fake Data Creation (Tree Shakable)",
    links: ["https://github.com/ngneat/falso"],
    name: "fake_data_creation",
  },
  {
    title: "Method Shorthand Syntax Considered Harmful (TypeScript)",
    links: [
      "https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful",
    ],
    name: "shorthand_syntax_harmful",
  },
  {
    title: "Best Icon Library",
    links: ["https://lucide.dev/guide/packages/lucide-react"],
    name: "best_icon_library",
  },
  {
    title: "Force a Popup to Appear",
    links: ["http://neverssl.com"],
    name: "force_popup",
  },
  {
    title: "Use Deferred Value in React",
    links: [
      "https://www.joshwcomeau.com/react/use-deferred-value/?from=newsletter",
    ],
    name: "use_deferred_value",
  },
  {
    title: "Do You Need GraphQL?",
    links: ["https://mxstbr.com/thoughts/graphql"],
    name: "do_you_need_graphql",
  },
  {
    title: "Solid MetaTags Generator for Sites",
    links: ["https://metatags.io"],
    name: "metatags_generator",
  },
  {
    title: "Generate Favicon's",
    links: ["https://realfavicongenerator.net"],
    name: "generate_favicons",
  },
  {
    title: "React: How to Pass Components as Props",
    links: [
      "https://www.developerway.com/posts/react-component-as-prop-the-right-way",
    ],
    name: "pass_components_as_props",
  },
  {
    title: "Frontend Guidelines",
    links: ["https://github.com/bradfrost/frontend-guidelines-questionnaire"],
    name: "frontend_guidelines",
  },
]