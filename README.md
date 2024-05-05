# Phillip Maier's Blog V4

Tech/Tools I'm interested in using for this one:

- [FAILED][Bun](https://bun.sh/)
  - Along with [Deno](https://deno.com/) this project attempts to bring speed and coherence to the javascript ecosystem. I chose it over Deno due to its faster speed, and the clarity of vision its [founders brings](https://github.com/Jarred-Sumner).
  - It turns out [bun does not play well with turborepo](https://github.com/vercel/turbo/issues/5982). I transitioned over to [pnpm](https://pnpm.io/) instead.
- [Astro](https://astro.build/)
  - Astro follows in the footsteps of Static site generators such as Gatsby in the same way school children sometimes step in a T-rex footprint at a museum. I also considered using bare bones [Vite](https://vitejs.dev/), but Astro has an [abundance of features](https://docs.astro.build/en/concepts/why-astro/) that I would have had to hook up myself if using Vite, and as I have gotten older I tend to reach for the more complete solutions first, only reaching for more minute control when truly needed.
- [Tailwind](https://tailwindcss.com/)
  - For something small and self contained, such as a personal blog, tailwind is the perfect fit. For anything heavier (anything needing a design system or even a component library) I would start reaching for [Stylex](https://github.com/facebook/stylex).
- [PostHog](https://posthog.com/)
  - I needed an alternative to google analytics, and this seemed like the best option!
- [Font - Open Sans](https://fonts.google.com/specimen/Open+Sans)
  - I love [variable fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide) that are also very accessible!

## TODO

- [ ] Add an interactive counter button that increments an "I was here" button, and connects to my db
  - [ ] Blog API
    - [x] Add Logging (with [pino](https://getpino.io/#/docs/web?id=express))
    - [x] Add Rate Limiting
    - [x] Migrate away from planetscale -> supabase
    - [ ] Setup Docker
      - [x] Transition to pnpm.
      - [ ] Write dockerfile
        - [ ] Astro
        - [ ] Express API
      - [ ] Figure out .env
      - [ ] Consider Setting up Docker Compose?
    - [ ] Use Fly.io - hosting
- [ ] Setup a way to auto build & deploy each app/route
- [x] Build a home page based on some Dalle Mocks
- [ ] Create a page that just lists projects
- [ ] Create a page that has a bunch of cool links & descriptions
- [ ] Is it important to separate out dev & non-dev deps... do this and 2x check

Consider Also building the blog using (as an experiment):

- Remix
- Svelte
- Vue
- SolidJS
- HTMX
- Quick 2
