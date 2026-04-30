import { useEffect, useState } from "react"
import type { Producto } from "../types/Producto"

function Admin() {
  const [productosAdmin, setProductosAdmin] = useState<Producto[]>([])
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    categoria: "Medicamentos",
    precio: "",
    imagen: ""
  })

  /* REQUERIMIENTO 2 - Formulario administrativo con controles:
     En Admin se usa el estado "nuevoProducto" para manejar el formulario.
     Este formulario incluye:
     - caja de texto para nombre.
     - menu/select para categoria.
     - caja numerica para precio.
     - caja de texto tipo URL para imagen.
     - boton para agregar producto.
     Cada control modifica el estado con setNuevoProducto. */

  // SEGUNDA ENTREGA - useEffect:
  // Carga productos agregados desde LocalStorage para simular administracion.
  useEffect(() => {
    const guardados = localStorage.getItem("farma_productos_admin")

    if (guardados) {
      setProductosAdmin(JSON.parse(guardados))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("farma_productos_admin", JSON.stringify(productosAdmin))
  }, [productosAdmin])

  const agregarProducto = (e: React.FormEvent) => {
    e.preventDefault()

    const producto: Producto = {
      id: Date.now(),
      nombre: nuevoProducto.nombre,
      categoria: nuevoProducto.categoria,
      precio: Number(nuevoProducto.precio),
      imagen:
        nuevoProducto.imagen ||
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
    }

    setProductosAdmin((actuales) => [...actuales, producto])
    setNuevoProducto({
      nombre: "",
      categoria: "Medicamentos",
      precio: "",
      imagen: ""
    })
  }

  const eliminarProducto = (productoId: number) => {
    // SEGUNDA ENTREGA - Evento click:
    // El administrador puede quitar productos creados localmente.
    setProductosAdmin((actuales) =>
      actuales.filter((producto) => producto.id !== productoId)
    )
  }

  return (
    <main className="contenedor">
      <div className="admin-layout">
        <section className="formulario-card admin">
          <span className="etiqueta-seccion">Gestion local</span>
          <h1>Panel de administrador</h1>
          <p>
            Agrega productos nuevos. Se guardan en LocalStorage y aparecen en la tienda
            al volver al inicio.
          </p>

          <form onSubmit={agregarProducto}>
            <label>
              Nombre del producto
              {/* REQUERIMIENTO 2 - Caja de texto controlada por nuevoProducto.nombre. */}
              <input
                type="text"
                value={nuevoProducto.nombre}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
                }
                required
              />
            </label>

            <label>
              Categoria
              {/* REQUERIMIENTO 2 - Menu/select controlado por nuevoProducto.categoria. */}
              <select
                value={nuevoProducto.categoria}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })
                }
              >
                <option>Medicamentos</option>
                <option>Vitaminas</option>
                <option>Cuidado personal</option>
                <option>Bebes</option>
              </select>
            </label>

            <label>
              Precio
              {/* REQUERIMIENTO 2 - Caja numerica controlada por nuevoProducto.precio. */}
              <input
                type="number"
                min="1000"
                value={nuevoProducto.precio}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
                }
                required
              />
            </label>

            <label>
              URL de imagen
              {/* REQUERIMIENTO 2 - Caja de texto tipo URL controlada por nuevoProducto.imagen. */}
              <input
                type="url"
                value={nuevoProducto.imagen}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, imagen: e.target.value })
                }
                placeholder="Opcional"
              />
            </label>

            {/* REQUERIMIENTO 2 - Boton del formulario:
                Al hacer clic ejecuta el submit del formulario y usa los estados anteriores. */}
            <button type="submit">Agregar producto</button>
          </form>
        </section>

        <section className="panel admin-listado">
          <div className="panel-encabezado">
            <div>
              <h2>Productos agregados</h2>
              <p>{productosAdmin.length} producto(s) creados en admin</p>
            </div>
          </div>

          <div className="admin-productos">
            {productosAdmin.map((producto) => (
              <article key={producto.id} className="admin-producto">
                <img src={producto.imagen} alt={producto.nombre} />
                <div>
                  <strong>{producto.nombre}</strong>
                  <span>{producto.categoria}</span>
                  <p>${producto.precio.toLocaleString("es-CO")}</p>
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
        </section>
      </div>
    </main>
  )
}

export default Admin
