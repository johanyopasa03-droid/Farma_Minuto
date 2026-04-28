import "../styles/productos.css"

interface Props {
  nombre: string
  precio: number
  imagen: string
  agregarAlCarrito: () => void
}

function Producto({ nombre, precio, imagen, agregarAlCarrito }: Props) {
  return (
    <div className="producto-card">
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
      <p className="producto-precio">${precio.toLocaleString()}</p>
      <button className="producto-btn" onClick={agregarAlCarrito}>
        🛒 Comprar
      </button>
    </div>
  )
}

export default Producto