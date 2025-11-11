import '../styles/globals.css'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    <div className="dark">
      <Script
        src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
        strategy="lazyOnload"
      />
      <Component {...pageProps} />
    </div>
  )
}

