import Link from "next/link";
import Layout from "../components/Layout";

export default function NotFoundPage() {
  return (
    <Layout>
      <div className="not-found">
        <h1>404-страница не найдена</h1>
        <p>Что-то случилось</p>
        <Link href="/" className="nav-link">
          Вернуться на главную
        </Link>
      </div>
    </Layout>
  );
}
