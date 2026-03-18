import logo from "..//img/Logo.png"
import "../styles/Navbar.css"


interface Props {
  carrito: number
  busqueda: string
  setBusqueda: (valor: string) => void
}
function Navbar({ carrito, busqueda, setBusqueda }: Props) {
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
      <div className="buscador">
        <input type="search" placeholder="Buscar Productos" value={busqueda} onChange={(e)=> setBusqueda(e.target.value)}/>
      </div>
      <div className="options">
        <a href="/home" style={{color:"white", marginRight:"20px"}}>Inicio</a>
        <a href="/login">Login</a>
        <a href="/Registro">Registro</a>

        <span style={{
          background:"white",
          color:"#0a7cff",
          padding:"5px 10px",
          borderRadius:"20px",
          fontWeight:"bold"
          }}>
            🛒 {carrito}
        </span>
      </div>

      
    </nav>
  )
}

export default Navbar