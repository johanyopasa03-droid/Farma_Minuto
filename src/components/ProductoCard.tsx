import type { DragEvent } from "react"
import type { Producto } from "../types/Producto"

interface Props {
  producto: Producto
  agregarAlCarrito: (producto: Producto) => void
  agregarFavorito: (producto: Producto) => void
  verDetalle: (producto: Producto) => void
}

function ProductoCard({
  producto,
  agregarAlCarrito,
  agregarFavorito,
  verDetalle
}: Props) {
  const iniciarArrastre = (evento: DragEvent<HTMLDivElement>) => {
    /* REQUERIMIENTO 12 - Drag and Drop:
       Guardamos el id del producto para que otras zonas puedan recibirlo.
       Actualmente se puede soltar en:
       - Carrito.
       - Zona de favoritos. */
    evento.dataTransfer.setData("productoId", String(producto.id))
  }

  return (
    <article
      className="producto-card"
      draggable
      onClick={() => verDetalle(producto)}
      onDragStart={iniciarArrastre}
    >
      {/* FUNCION PRODUCTO EN GRANDE:
          Al hacer clic en la tarjeta se ejecuta verDetalle(producto).
          Esa funcion vive en Home y abre el componente ProductoDetalle. */}
      <button
        className="boton-favorito"
        type="button"
        onClick={(evento) => {
          /* FUNCION FAVORITOS - Boton de corazon:
             Este boton permite agregar el producto a favoritos sin arrastrarlo.
             stopPropagation evita que al presionar el corazon se abra el detalle del producto.

             REQUERIMIENTO 4 - Evento generado por componente:
             ProductoCard genera el evento y Home actualiza la lista de favoritos. */
          evento.stopPropagation()
          agregarFavorito(producto)
        }}
        title="Agregar a favoritos"
      >
        ♥
      </button>

      <img src={producto.imagen} alt={producto.nombre} />
      <div className="producto-info">
        <small>{producto.categoria}</small>
        <h3>{producto.nombre}</h3>
        <p>${producto.precio.toLocaleString("es-CO")}</p>
      </div>

      {/* SEGUNDA ENTREGA - Evento generado por componente:
          Este boton avisa a App/Home que debe agregar el producto al carrito. */}
      <button
        className="boton-comprar"
        type="button"
        onClick={(evento) => {
          evento.stopPropagation()
          agregarAlCarrito(producto)
        }}
      >
        Comprar
      </button>
    </article>
  )
}

export default ProductoCard
