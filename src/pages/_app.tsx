import 'nprogress/nprogress.css'
import 'rc-slider/assets/index.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import nprogress from 'nprogress'
import Router from 'next/router'
import { NavComponent } from '../components/nav'
import { PlayerProvider } from '../context/player/provider'
import { AuthContextProvider } from '../context/auth/provider'
import Head from 'next/head'

Router.events.on('routeChangeStart', nprogress.start)
Router.events.on('routeChangeComplete', nprogress.done)
Router.events.on('routeChangeError', nprogress.done)

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <div className="flex h-screen">
        <Head>
          <title>电台</title>
        </Head>
        <Toaster />
        <div className="w-[260px]">
          <NavComponent />
        </div>
        <PlayerProvider>
          <AuthContextProvider>
            <div className="flex-1 overflow-y-auto pb-[90px]">
              <Component {...pageProps} />
            </div>
          </AuthContextProvider>
        </PlayerProvider>
      </div>
      
  )
}

export default MyApp
