import '../styles/globals.css'
import 'rc-slider/assets/index.css'
import type { AppProps } from 'next/app'
import { NavComponent } from '../components/nav'
import { PlayerProvider } from '../context/player/provider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlayerProvider>
      <div className="flex h-screen">
        <div className="w-[260px]">
          <NavComponent />
        </div>
        <div className="flex-1 overflow-y-auto pb-[90px]">
          <Component {...pageProps} />
        </div>
      </div>
    </PlayerProvider>
  )
}

export default MyApp
