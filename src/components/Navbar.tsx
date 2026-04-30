import { Link } from "react-router-dom"

interface Props {
  busqueda: string
  carritoCantidad: number
  setBusqueda: (valor: string) => void
  usuarioActual: string
  cerrarSesion: () => void
}

function Navbar({
  busqueda,
  carritoCantidad,
  setBusqueda,
  usuarioActual,
  cerrarSesion
}: Props) {
  return (
    <header className="navbar">
      <Link className="marca" to="/">
        Farmaminuto
      </Link>

      {/* REQUERIMIENTO 2 - Caja de texto con variable de estado:
          Este input de busqueda es un control manejado por React.
          Su valor viene del estado "busqueda" creado en App.tsx con useState.
          Cuando el usuario escribe, onChange ejecuta setBusqueda y actualiza el estado. */}
      <input
        className="buscador"
        type="search"
        placeholder="Buscar productos"
        value={busqueda}
        onChange={(evento) => setBusqueda(evento.target.value)}
      />

      <nav className="menu">
        {/* SEGUNDA ENTREGA - React Router:
            Link evita recargar la pagina completa al navegar. */}
        <Link to="/">Inicio</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/registro">Registro</Link>
        <Link to="/login">Login</Link>
      </nav>

      <div className="sesion">
        {/* REQUERIMIENTO 4 - Evento de navegacion:
            Este boton usa un enlace con ancla (#carrito).
            Al hacer clic lleva al usuario directamente a la seccion del carrito. */}
        <a className="contador" href="#carrito">
          Carrito: {carritoCantidad}
        </a>
        {usuarioActual && (
          <button type="button" onClick={cerrarSesion}>
            Salir
          </button>
        )}
      </div>
    </header>
  )
}

export default Navbar
