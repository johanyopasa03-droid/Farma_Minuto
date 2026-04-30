import type { Producto } from "../types/Producto"

interface Props {
  producto: Producto
  agregarAlCarrito: (producto: Producto) => void
  cerrarDetalle: () => void
}

function ProductoDetalle({
  producto,
  agregarAlCarrito,
  cerrarDetalle
}: Props) {
  const caracteristicas = [
    `Categoria: ${producto.categoria}`,
    `Presentacion: ${producto.presentacion || "Unidad disponible en tienda"}`,
    `Laboratorio: ${producto.laboratorio || "Proveedor Farmaminuto"}`,
    "Disponibilidad: Producto disponible para compra"
  ]

  return (
    <div className="detalle-overlay" role="dialog" aria-modal="true">
      {/* FUNCION PRODUCTO EN GRANDE:
          Este componente muestra el producto seleccionado en una ventana amplia.
          Se abre desde Home cuando el usuario hace clic sobre una tarjeta.

          REQUERIMIENTO 3 - Componentes y comunicacion:
          Home envia el producto seleccionado, la funcion agregarAlCarrito y la funcion cerrarDetalle.

          REQUERIMIENTO 4 - Evento generado por componente:
          El boton Comprar desde detalle ejecuta agregarAlCarrito(producto).

          REQUERIMIENTO 9 - Imagenes:
          Se muestra la imagen del producto en tamano grande. */}
      <section className="detalle-producto">
        <button
          className="detalle-cerrar"
          type="button"
          onClick={cerrarDetalle}
          aria-label="Cerrar detalle"
        >
          x
        </button>

        <div className="detalle-imagen">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>

        <div className="detalle-info">
          <span>{producto.categoria}</span>
          <h2>{producto.nombre}</h2>
          <p className="detalle-descripcion">
            {producto.descripcion ||
              "Producto disponible en Farmaminuto para compra rapida y segura."}
          </p>

          <strong className="detalle-precio">
            ${producto.precio.toLocaleString("es-CO")}
          </strong>

          <h3>Caracteristicas</h3>
          <ul>
            {caracteristicas.map((caracteristica) => (
              <li key={caracteristica}>{caracteristica}</li>
            ))}
          </ul>

          <div className="detalle-acciones">
            <button type="button" onClick={() => agregarAlCarrito(producto)}>
              Agregar al carrito
            </button>
            <button
              className="boton-secundario"
              type="button"
              onClick={cerrarDetalle}
            >
              Seguir mirando
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductoDetalle
