import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Admin from "./pages/Admin"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Registro from "./pages/Registro"
import type { CarritoItem } from "./types/CarritoItem"
import type { Producto } from "./types/Producto"

const obtenerCarritoGuardado = (): CarritoItem[] => {
  /* REQUERIMIENTO 13 - LocalStorage:
     Esta funcion lee el carrito guardado antes de que React pinte la pantalla.
     Asi, cuando el usuario recarga la pagina, los productos no se pierden.
     Se usa try/catch para evitar errores si el navegador tiene datos danados. */
  try {
    const carritoGuardado = localStorage.getItem("farma_carrito")
    return carritoGuardado ? JSON.parse(carritoGuardado) : []
  } catch {
    return []
  }
}

const obtenerUsuarioGuardado = () => {
  /* REQUERIMIENTO 13 - LocalStorage:
     Recupera el usuario activo guardado en el navegador. */
  return localStorage.getItem("farma_usuario_actual") || ""
}

function App() {
  // SEGUNDA ENTREGA - useState:
  // Estados principales de la aplicacion. Desde aqui se comunican los componentes.
  const [carrito, setCarrito] = useState<CarritoItem[]>(obtenerCarritoGuardado)
  const [busqueda, setBusqueda] = useState("")
  const [usuarioActual, setUsuarioActual] = useState(obtenerUsuarioGuardado)
  const totalUnidadesCarrito = carrito.reduce(
    (suma, producto) => suma + producto.cantidad,
    0
  )

  // REQUERIMIENTO 13 - LocalStorage:
  // Cada vez que cambia el carrito, se guarda automaticamente en el navegador.
  useEffect(() => {
    localStorage.setItem("farma_carrito", JSON.stringify(carrito))
  }, [carrito])

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito((productosActuales) => {
      const existe = productosActuales.find((item) => item.id === producto.id)

      if (existe) {
        return productosActuales.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      }

      return [...productosActuales, { ...producto, cantidad: 1 }]
    })
  }

  const cambiarCantidadCarrito = (productoId: number, cantidad: number) => {
    if (cantidad < 1) {
      setCarrito((productosActuales) =>
        productosActuales.filter((item) => item.id !== productoId)
      )
      return
    }

    setCarrito((productosActuales) =>
      productosActuales.map((item) =>
        item.id === productoId ? { ...item, cantidad } : item
      )
    )
  }

  const eliminarDelCarrito = (productoId: number) => {
    setCarrito((productosActuales) =>
      productosActuales.filter((item) => item.id !== productoId)
    )
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  const iniciarSesion = (email: string) => {
    setUsuarioActual(email)
    localStorage.setItem("farma_usuario_actual", email)
  }

  const cerrarSesion = () => {
    setUsuarioActual("")
    localStorage.removeItem("farma_usuario_actual")
  }

  return (
    <BrowserRouter>
      <Navbar
        busqueda={busqueda}
        carritoCantidad={totalUnidadesCarrito}
        setBusqueda={setBusqueda}
        usuarioActual={usuarioActual}
        cerrarSesion={cerrarSesion}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              busqueda={busqueda}
              carrito={carrito}
              agregarAlCarrito={agregarAlCarrito}
              cambiarCantidadCarrito={cambiarCantidadCarrito}
              eliminarDelCarrito={eliminarDelCarrito}
              vaciarCarrito={vaciarCarrito}
            />
          }
        />
        <Route
          path="/login"
          element={<Login iniciarSesion={iniciarSesion} />}
        />
        <Route path="/registro" element={<Registro />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
