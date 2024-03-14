import { StaticRouter } from 'react-router-dom/server'
import { PrimeReactProvider } from 'primereact/api'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
export default function Main({ pathname }) {
  return import.meta.env.SSR ? (
    <PrimeReactProvider>
      <StaticRouter location={pathname}>
        <App />
      </StaticRouter>
    </PrimeReactProvider>
  ) : (
    <PrimeReactProvider>
      <Router>
        <App />
      </Router>
    </PrimeReactProvider>
  )
}
