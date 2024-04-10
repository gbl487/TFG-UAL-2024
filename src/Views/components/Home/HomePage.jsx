import Toast from '@components/core/Toast'
import ALlTarjetas from './AllTarjetas'
import Header from './Header/Header'
import SearchBar from './SearchBar'
import './index.css'

export default function HomePage() {
  return (
    <section className="layout antialiased">
      <Header />

      <div className="search w-full pt-24 flex items-end bg-white fixed z-10 pb-6">
        <SearchBar />
      </div>

      <main className="body pt-40 pb-20">
        <ALlTarjetas />
      </main>
      <Toast />

      <footer className="footer w-auto h-96 bg-slate-300"></footer>
    </section>
  )
}
