import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Had to put a man on pause</h1>
      <Link href="/blog"><a>Go To Blog</a></Link>
    </div>
  )
}
