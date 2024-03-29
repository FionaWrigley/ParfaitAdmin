import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import {useEffect } from 'react'

export default function Home() {

  const router = useRouter();

  useEffect(() => {

  router.push('/login');

  },[]);

  return (
    <div>
      <Head>
        <title>Parfait Admin</title>
        <meta name="description" content="Parfait Admin Panel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     

    </div>
  )
}
