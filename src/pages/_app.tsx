import type { AppProps } from 'next/app'
import { ClerkProvider } from '@clerk/nextjs'

import Layout from './layout'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <ClerkProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  )
}

export default MyApp
