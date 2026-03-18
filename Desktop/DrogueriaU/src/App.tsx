import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Index from "./pages/index"
import Registro from "./pages/Registro"

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/index" element={<Index />} />
        <Route path="/Registro" element={<Registro />} />

      </Routes>

    </BrowserRouter>

  )
}

export default App