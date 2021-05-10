import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Parfait Admin</title>
        <meta name="description" content="Parfait Admin Panel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className='bg-pink-200'>
          Parfait</h1>
      </main>
    </div>
  )
}
