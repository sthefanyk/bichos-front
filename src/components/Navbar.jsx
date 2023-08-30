import Link from "next/link"

const Navbar = () => {
  return (
    <nav>
        <h1>Logo</h1>
        <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">Sobre</Link></li>
            <li><Link href="/login">Entrar</Link></li>
            <li><Link href="/register">Cadastrar-se</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar