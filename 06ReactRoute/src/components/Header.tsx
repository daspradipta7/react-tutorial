import { Link } from 'react-router'

function Header() {
  return (
    <div>
        <nav style={{display: "flex", justifyContent: "center", gap: "20px"}}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact-us">Contactus</Link>
            <Link to="/github/:username">GitHub</Link>
        </nav>
    </div>
  )
}

export default Header