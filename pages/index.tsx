import Head from "next/head"
import Link from "next/link"

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Had to put a man on pause</h1>
      <Link href="/blog">
        <a href="/blog">Go To Blog</a>
      </Link>
    </div>
  )
}

export default Home
