import Link from "next/link";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Head>
        <title>Погода Погода Погода</title>
        <meta name="description" content="Прогноз погоды на Земле" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Прогноз погоды для вас" />
        <meta property="og:description" content="Актуальный прогноз" />
        <meta property="og:image" />
      </Head>
      <header className="header">
        <nav className="nav">
          <Link href="/" className="nav-link">
            Главная
          </Link>
          <Link href="/weather" className="nav-link">
            Поиск
          </Link>
          <Link href="/moscow" className="nav-link">
            Погода в Москве
          </Link>
          <Link href="/rome" className="nav-link">
            Погода в Риме
          </Link>
          <Link href="/london" className="nav-link">
            Погода в Лондоне
          </Link>
        </nav>
      </header>
      <main className="main-content">{children}</main>

      <footer className="footer">Погода От Дааааани</footer>
    </div>
  );
}
