import { useEffect, useState } from "react"
import AsistenteCompra from "../components/AsistenteCompra"
import Banner from "../components/Banner"
import Carrito from "../components/Carrito"
import Footer from "../components/Footer"
import ProductoCard from "../components/ProductoCard"
import ProductoDetalle from "../components/ProductoDetalle"
import ZonaFavoritos from "../components/ZonaFavoritos"
import { obtenerProductosDesdeServidor } from "../services/productosService"
import type { CarritoItem } from "../types/CarritoItem"
import type { Producto } from "../types/Producto"

interface Props {
  busqueda: string
  carrito: CarritoItem[]
  agregarAlCarrito: (producto: Producto) => void
  cambiarCantidadCarrito: (productoId: number, cantidad: number) => void
  eliminarDelCarrito: (productoId: number) => void
  vaciarCarrito: () => void
}

function Home({
  busqueda,
  carrito,
  agregarAlCarrito,
  cambiarCantidadCarrito,
  eliminarDelCarrito,
  vaciarCarrito
}: Props) {
  const [productos, setProductos] = useState<Producto[]>([])
  const [categoria, setCategoria] = useState("Todas")
  const [soloDisponibles, setSoloDisponibles] = useState(false)
  const [favoritos, setFavoritos] = useState<Producto[]>([])
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null)
  const [mensaje, setMensaje] = useState("Cargando productos...")

  /* REQUERIMIENTO 2 - Controles de la pantalla Home:
     En esta pagina se usan controles conectados a variables de estado:
     - categoria: controla el menu desplegable/select.
     - soloDisponibles: controla la casilla de seleccion/checkbox.
     - busqueda: viene desde App.tsx y controla el buscador del Navbar.
     Estos controles permiten filtrar productos sin recargar la pagina. */

  // REQUERIMIENTO 7 - Peticion a servidor web:
  // Al cargar Home se llama la funcion obtenerProductosDesdeServidor().
  // Esa funcion usa fetch para consultar una API externa real: https://dummyjson.com.
  useEffect(() => {
    obtenerProductosDesdeServidor()
      .then((datos: Producto[]) => {
        const productosAdmin = localStorage.getItem("farma_productos_admin")
        const productosGuardados: Producto[] = productosAdmin
          ? JSON.parse(productosAdmin)
          : []

        // REQUERIMIENTO 7 - Datos recibidos:
        // "datos" corresponde a la respuesta de la API externa transformada al tipo Producto.
        // Luego se mezcla con productos guardados localmente desde Admin.
        //
        // SEGUNDA ENTREGA - Comunicacion con Admin:
        // Los productos creados en Admin se mezclan con los productos del fetch.
        setProductos([...datos, ...productosGuardados])
        setMensaje("")
      })
      .catch(() => {
        setMensaje("No fue posible cargar los productos")
      })
  }, [])

  // SEGUNDA ENTREGA - LocalStorage:
  // Recupera favoritos guardados para que no se pierdan al actualizar la pagina.
  useEffect(() => {
    const favoritosGuardados = localStorage.getItem("farma_favoritos")

    if (favoritosGuardados) {
      setFavoritos(JSON.parse(favoritosGuardados))
    }
  }, [])

  // SEGUNDA ENTREGA - LocalStorage:
  // Guarda favoritos cada vez que cambia la lista.
  useEffect(() => {
    localStorage.setItem("farma_favoritos", JSON.stringify(favoritos))
  }, [favoritos])

  const categorias = ["Todas", ...new Set(productos.map((producto) => producto.categoria))]

  // SEGUNDA ENTREGA - Filtros:
  // Se filtra por texto del buscador, por categoria y por casilla de seleccion.
  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
    const coincideCategoria = categoria === "Todas" || producto.categoria === categoria
    const coincideDisponible = !soloDisponibles || producto.precio > 0

    return coincideBusqueda && coincideCategoria && coincideDisponible
  })

  const agregarFavorito = (producto: Producto) => {
    const yaExiste = favoritos.some((favorito) => favorito.id === producto.id)

    if (!yaExiste) {
      setFavoritos((favoritosActuales) => [...favoritosActuales, producto])
    }
  }

  const eliminarFavorito = (productoId: number) => {
    setFavoritos((favoritosActuales) =>
      favoritosActuales.filter((producto) => producto.id !== productoId)
    )
  }

  const abrirDetalleProducto = (producto: Producto) => {
    /* FUNCION PRODUCTO EN GRANDE:
       Esta funcion guarda en el estado el producto que el usuario selecciono.
       Al cambiar productoSeleccionado, React muestra el componente ProductoDetalle. */
    setProductoSeleccionado(producto)
  }

  const cerrarDetalleProducto = () => {
    /* FUNCION PRODUCTO EN GRANDE:
       Limpia el producto seleccionado para cerrar la ventana de detalle. */
    setProductoSeleccionado(null)
  }

  return (
    <>
      <Banner />

      <main className="contenedor">
        <AsistenteCompra
          productos={productos}
          agregarAlCarrito={agregarAlCarrito}
          verDetalle={abrirDetalleProducto}
        />

        <section className="barra-tienda">
          <div>
            <span className="etiqueta-seccion">Tienda</span>
            <h2>Catalogo de productos</h2>
            <p>
              Selecciona productos, filtra por categoria y revisa el carrito en el panel derecho.
            </p>
          </div>

          <section className="controles">
            <label>
              Categoria
              {/* REQUERIMIENTO 2 - Menu/select con estado:
                  El usuario elige una categoria y setCategoria actualiza la variable categoria. */}
              <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                {categorias.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="checkbox">
              {/* REQUERIMIENTO 2 - Casilla de seleccion con estado:
                  checked depende de soloDisponibles y onChange actualiza esa variable. */}
              <input
                type="checkbox"
                checked={soloDisponibles}
                onChange={(e) => setSoloDisponibles(e.target.checked)}
              />
              Ver solo disponibles
            </label>
          </section>
        </section>

        <section className="layout-tienda">
          <div className="catalogo">
            {mensaje && <p>{mensaje}</p>}

            <div className="productos-grid">
              {productosFiltrados.map((producto) => (
                <ProductoCard
                  key={producto.id}
                  producto={producto}
                  agregarAlCarrito={agregarAlCarrito}
                  agregarFavorito={agregarFavorito}
                  verDetalle={abrirDetalleProducto}
                />
              ))}
            </div>
          </div>

          <div className="paneles">
            <Carrito
              productosCatalogo={productos}
              productos={carrito}
              agregarProducto={agregarAlCarrito}
              cambiarCantidad={cambiarCantidadCarrito}
              eliminarProducto={eliminarDelCarrito}
              vaciarCarrito={vaciarCarrito}
            />
            <ZonaFavoritos
              productos={productos}
              favoritos={favoritos}
              agregarFavorito={agregarFavorito}
              eliminarFavorito={eliminarFavorito}
            />
          </div>
        </section>
      </main>

      {productoSeleccionado && (
        <ProductoDetalle
          producto={productoSeleccionado}
          agregarAlCarrito={agregarAlCarrito}
          cerrarDetalle={cerrarDetalleProducto}
        />
      )}

      <Footer />
    </>
  )
}

export default Home
