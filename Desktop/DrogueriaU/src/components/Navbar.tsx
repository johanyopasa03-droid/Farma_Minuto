import logo from "..//img/Logo.png"
import "../styles/Navbar.css"
function Navbar() {

  return (

    <nav
      style={{
        textDecoration:"none",
        background:"#0a6aa4",
        padding:"15px",
        display:"flex",
        justifyContent:"space-between",
        color:"white"
      }}>
      <img src={logo} width="150px"/>

    <h2 className="titulo">Farmaminuto</h2>
      
      <div className="options">
        <a href="/index">Inicio</a>
        <a href="/login">Login</a>
        <a href="/Registro">Registro</a>
      </div>
    </nav>
  )
}

export default Navbar