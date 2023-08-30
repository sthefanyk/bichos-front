import Link from "next/link"

const Footer = () => {
  return (
    <footer>
        <h1>Bichos</h1>
        <ul>
            <li><Link href="#">Sobre nós</Link></li>
            <li><Link href="#">Termos de Uso</Link></li>
            <li><Link href="#">Políticas de Privacidade</Link></li>
            <li><Link href="#">Fale Conosco</Link></li>
        </ul>
        <ul>
            <li><Link href="#">Início</Link></li>
            <li><Link href="#">Cadastre-se</Link></li>
            <li><Link href="#">Entrar</Link></li>
        </ul>
        <ul>
            <li><Link href="#">Facebook</Link></li>
            <li><Link href="#">Instragram</Link></li>
            <li><Link href="#">Twetter</Link></li>
            <li><Link href="#">Pinterest</Link></li>
        </ul>
    </footer>
  )
}

export default Footer