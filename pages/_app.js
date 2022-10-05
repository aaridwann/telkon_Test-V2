import ProviderUser from '../src/Provider/User'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ProviderUser>
      <Component {...pageProps} />
    </ProviderUser>
  )
}

export default MyApp
