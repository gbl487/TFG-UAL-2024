import Toast from '@components/core/Toast'
import ALlTarjetas from './AllTarjetas'
import Header from './Header/Header'
import SearchBar from './SearchBar'
import './index.css'
import { setSidebar } from 'src/Controllers/context/sidebar_context'

export default function HomePage() {
  setSidebar({ value: false })
  return (
    <section className="layout antialiased">
      <Header />

      <div className="search w-full pt-24 flex items-end bg-white fixed z-10 pb-6">
        <SearchBar />
      </div>

      <main className="body pt-36">
        <ALlTarjetas />
      </main>
      <Toast />

      <footer className="footer h-96 bg-slate-300">Footer</footer>
    </section>
  )
}
