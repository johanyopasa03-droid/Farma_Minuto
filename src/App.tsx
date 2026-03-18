import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Index from "./pages/index"
import Registro from "./pages/Registro"

function App() {
  const [carrito, setCarrito] = useState(0)

  const agregarAlCarrito = () => {
    setCarrito(carrito + 1)
  }
  const [busqueda, setBusqueda] = useState("")
  return (
    <BrowserRouter>
     <Navbar carrito={carrito} busqueda={busqueda} setBusqueda={setBusqueda}  />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={
        <Home agregarAlCarrito={agregarAlCarrito} busqueda={busqueda}  />} /> 
        <Route path="/index" element={<Index />} />
        <Route path="/Registro" element={<Registro />} />

      </Routes>

    </BrowserRouter>

  )
}

export default App