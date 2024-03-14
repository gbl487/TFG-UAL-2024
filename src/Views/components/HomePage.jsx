import ALlTarjetas from './AllTarjetas'
import Header from './Header'
import SearchBar from './SearchBar'
import '../styles/index.css'

export default function HomePage() {
  return (
    <section className="layout antialiased">
      <Header />

      <div className="search w-full pt-24 flex items-end bg-white fixed z-10 pb-6">
        <SearchBar />
      </div>

      <main className="body pt-36">
        <ALlTarjetas />
      </main>

      <footer className="footer h-96 bg-slate-300">Footer</footer>
    </section>
  )
}
