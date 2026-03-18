import "../styles/login.css"
import promo from "../img/promo.jpg"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mensaje, setMensaje] = useState("")

  const usuarios = [
    { email: "admin@drogueria.com", password: "1234", rol: "admin" },
    { email: "cliente@drogueria.com", password: "1234", rol: "cliente" }
  ]

  const manejarLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const usuario = usuarios.find(
      u => u.email === email && u.password === password
    )

    if (!usuario) {
      setMensaje("Usuario incorrecto")
      return
    }

    navigate("/home")
  }

  return (
    <div className="login-overlay">
      <div className="login-modal">

        <div className="login-left">
          <img src={promo} alt="Promoción farmacia"/>
        </div>

        <div className="login-right">
          <h2>Bienvenido a Farmaminuto</h2>

          {/* 🔥 FORM */}
          <form onSubmit={manejarLogin}>

            <label>Email</label>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* 🔥 MENSAJE */}
            {mensaje && <p style={{color: "red"}}>{mensaje}</p>}

            <button type="submit" className="login-btn">
              Iniciar sesión
            </button>

          </form>

          <button className="register-btn">
            Crear cuenta
          </button>

          <p className="forgot">
            ¿Olvidaste tu contraseña?
          </p>

        </div>
      </div>
    </div>
  )
}