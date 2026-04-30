import type { DragEvent } from "react"
import type { Producto } from "../types/Producto"

interface Props {
  productos: Producto[]
  favoritos: Producto[]
  agregarFavorito: (producto: Producto) => void
  eliminarFavorito: (productoId: number) => void
}

function ZonaFavoritos({
  productos,
  favoritos,
  agregarFavorito,
  eliminarFavorito
}: Props) {
  const permitirSoltar = (evento: DragEvent<HTMLDivElement>) => {
    /* REQUERIMIENTO 12 - Drag and Drop en favoritos:
       Permite que esta zona acepte el producto arrastrado desde ProductoCard. */
    evento.preventDefault()
  }

  const recibirProducto = (evento: DragEvent<HTMLDivElement>) => {
    /* REQUERIMIENTO 12 - Drag and Drop en favoritos:
       Se lee el id enviado desde ProductoCard y se busca el producto completo.
       Luego se agrega a la lista de favoritos. */
    const productoId = Number(evento.dataTransfer.getData("productoId"))
    const productoEncontrado = productos.find((producto) => producto.id === productoId)

    if (productoEncontrado) {
      agregarFavorito(productoEncontrado)
    }
  }

  return (
    <section
      className="zona-favoritos"
      onDragOver={permitirSoltar}
      onDrop={recibirProducto}
    >
      <h2>Favoritos</h2>
      <p>Zona de productos destacados</p>

      <div className="favoritos-lista">
        {favoritos.map((producto) => (
          <button
            className="favorito-chip"
            key={producto.id}
            type="button"
            onClick={() => eliminarFavorito(producto.id)}
            title="Quitar de favoritos"
          >
            {producto.nombre} x
          </button>
        ))}
      </div>
    </section>
  )
}

export default ZonaFavoritos
