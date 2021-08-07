import { NextSeo } from "next-seo"

/*
  This File is more of a landing page "placeholder". It contains the head
  and the logic to switch between my custom Mobile and Desktop landing page
*/
const HomePage: React.FC = () => (
  <>
    <NextSeo
      title="Phillip Maier"
      description="Hi, I'm Phillip. I'm an engineer who's passionate about open source and helping others!"
      openGraph={{
        type: "website",
        locale: "en_IE",
        url: "https://phillipmaier.com/about",
        title: "Phillip Maier",
        description:
          "Hi, I'm Phillip. I'm an engineer who's passionate about open source and helping others!",
        images: [
          {
            url: "https://s3.us-east-2.amazonaws.com/phillipmaier.com/GreetingOG.png",
            height: 1200,
            width: 630,
            alt: `Picture of a friendly smiling Phillip Maier with the following text to the right: 
            "I'm an engineer who's passionate about open source and helping others!" `,
          },
        ],
      }}
      twitter={{
        handle: "@pmaier983",
        cardType: "summary_large_image",
      }}
    />
    Hello World
  </>
)

export default HomePage
