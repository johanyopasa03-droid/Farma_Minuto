import type { DragEvent } from "react"
import type { CarritoItem } from "../types/CarritoItem"
import type { Producto } from "../types/Producto"

interface Props {
  productosCatalogo: Producto[]
  productos: CarritoItem[]
  agregarProducto: (producto: Producto) => void
  cambiarCantidad: (productoId: number, cantidad: number) => void
  eliminarProducto: (productoId: number) => void
  vaciarCarrito: () => void
}

function Carrito({
  productosCatalogo,
  productos,
  agregarProducto,
  cambiarCantidad,
  eliminarProducto,
  vaciarCarrito
}: Props) {
  const total = productos.reduce(
    (suma, producto) => suma + producto.precio * producto.cantidad,
    0
  )
  const totalUnidades = productos.reduce(
    (suma, producto) => suma + producto.cantidad,
    0
  )

  const permitirSoltar = (evento: DragEvent<HTMLElement>) => {
    /* REQUERIMIENTO 12 - Drag and Drop en carrito:
       preventDefault permite que el carrito acepte productos soltados.
       Sin esta linea el navegador no ejecuta correctamente el evento onDrop. */
    evento.preventDefault()
  }

  const recibirProductoEnCarrito = (evento: DragEvent<HTMLElement>) => {
    /* REQUERIMIENTO 12 - Drag and Drop en carrito:
       ProductoCard guarda el id del producto en dataTransfer.
       Aqui leemos ese id, buscamos el producto en el catalogo y lo agregamos al carrito.

       Flujo para explicar:
       1. El usuario arrastra una tarjeta de producto.
       2. ProductoCard envia productoId.
       3. Carrito recibe productoId en onDrop.
       4. Carrito llama agregarProducto(productoEncontrado). */
    evento.preventDefault()
    const productoId = Number(evento.dataTransfer.getData("productoId"))
    const productoEncontrado = productosCatalogo.find(
      (producto) => producto.id === productoId
    )

    if (productoEncontrado) {
      agregarProducto(productoEncontrado)
    }
  }

  const finalizarCompra = () => {
    /* FUNCION FINALIZAR COMPRA:
       Este evento abre la pagina principal de PSE para simular el paso
       hacia una plataforma externa de pagos en linea.

       Para sustentacion:
       - El boton no procesa pagos dentro de la app.
       - Redirige al usuario a una plataforma real de pagos: PSE.
       - Se usa window.open para abrir la pagina en una nueva pestana. */
    window.open("https://www.pse.com.co/persona", "_blank", "noopener,noreferrer")
  }

  return (
    <aside
      id="carrito"
      className="panel carrito-panel"
      onDragOver={permitirSoltar}
      onDrop={recibirProductoEnCarrito}
    >
      {/* SECCION CARRITO:
          El id="carrito" permite que el boton del Navbar vaya directamente
          a esta parte de la pagina usando href="#carrito". */}
      <div className="panel-encabezado">
        <div>
          <h2>Carrito</h2>
          <p>{totalUnidades} unidad(es) seleccionadas</p>
        </div>
        <div className="carrito-total">
          <span>Total</span>
          <strong>${total.toLocaleString("es-CO")}</strong>
        </div>
      </div>

      {productos.length === 0 && (
        <div className="carrito-vacio">
          <strong>Tu carrito esta vacio</strong>
          <p>
            Agrega productos con el boton Comprar o arrastralos hasta este carrito.
          </p>
        </div>
      )}

      <div className="carrito-drop-info">
        Arrastra y suelta productos aqui para agregarlos al carrito.
      </div>

      <div className="carrito-lista">
        {/* SEGUNDA ENTREGA - key en listas:
            El id del producto identifica cada item del carrito. */}
        {productos.map((producto) => (
          <article className="carrito-item" key={producto.id}>
            <img src={producto.imagen} alt={producto.nombre} />

            <div className="carrito-detalle">
              <div>
                <h3>{producto.nombre}</h3>
                <span>${producto.precio.toLocaleString("es-CO")} c/u</span>
              </div>

              <strong>
                ${(producto.precio * producto.cantidad).toLocaleString("es-CO")}
              </strong>
            </div>

            <div className="cantidad-control">
              <button
                type="button"
                onClick={() => cambiarCantidad(producto.id, producto.cantidad - 1)}
              >
                -
              </button>
              <strong>{producto.cantidad}</strong>
              <button
                type="button"
                onClick={() => cambiarCantidad(producto.id, producto.cantidad + 1)}
              >
                +
              </button>
            </div>

            <button
              className="boton-secundario"
              type="button"
              onClick={() => eliminarProducto(producto.id)}
            >
              Eliminar
            </button>
          </article>
        ))}
      </div>

      <div className="carrito-acciones">
        <button
          className="boton-secundario ancho"
          type="button"
          onClick={vaciarCarrito}
          disabled={productos.length === 0}
        >
          Vaciar carrito
        </button>
        <button
          className="ancho"
          type="button"
          disabled={productos.length === 0}
          onClick={finalizarCompra}
        >
          Finalizar compra
        </button>
      </div>
    </aside>
  )
}

export default Carrito
