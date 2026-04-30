import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

interface Props {
  iniciarSesion: (email: string) => void
}

function Login({ iniciarSesion }: Props) {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [recordarme, setRecordarme] = useState(false)
  const [mensaje, setMensaje] = useState("")

  /* REQUERIMIENTO 2 - Formulario con controles y variables de estado:
     En Login se usan cajas de texto y una casilla de seleccion.
     - email controla el input de correo.
     - password controla el input de contrasena.
     - recordarme controla el checkbox.
     - mensaje muestra el resultado de la validacion.
     Cada control usa value/checked y onChange para mantenerse conectado al estado. */

  const usuarios = [
    { email: "admin@drogueria.com", password: "1234", rol: "admin" },
    { email: "cliente@drogueria.com", password: "1234", rol: "cliente" }
  ]

  // SEGUNDA ENTREGA - useEffect + LocalStorage:
  // Si el usuario marco "recordarme", se precarga el correo al volver.
  useEffect(() => {
    const correoRecordado = localStorage.getItem("farma_recordarme")

    if (correoRecordado) {
      setEmail(correoRecordado)
      setRecordarme(true)
    }
  }, [])

  const manejarLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // SEGUNDA ENTREGA - Evento submit:
    // El formulario valida los datos escritos en cajas de texto controladas.
    const usuario = usuarios.find(
      (item) => item.email === email && item.password === password
    )

    if (!usuario) {
      setMensaje("Usuario o contrasena incorrectos")
      return
    }

    iniciarSesion(email)

    if (recordarme) {
      localStorage.setItem("farma_recordarme", email)
    } else {
      localStorage.removeItem("farma_recordarme")
    }

    navigate(usuario.rol === "admin" ? "/admin" : "/")
  }

  return (
    <main className="formulario-pagina">
      <section className="formulario-card">
        <h1>Iniciar sesion</h1>
        <p>Usuarios de prueba: admin@drogueria.com / cliente@drogueria.com</p>

        <form onSubmit={manejarLogin}>
          <label>
            Email
            {/* REQUERIMIENTO 2 - Caja de texto controlada por email. */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
            />
          </label>

          <label>
            Contrasena
            {/* REQUERIMIENTO 2 - Caja de texto tipo password controlada por password. */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="1234"
            />
          </label>

          <label className="checkbox">
            {/* REQUERIMIENTO 2 - Checkbox controlado por recordarme. */}
            <input
              type="checkbox"
              checked={recordarme}
              onChange={(e) => setRecordarme(e.target.checked)}
            />
            Recordar usuario en este equipo
          </label>

          {mensaje && <p className="error">{mensaje}</p>}

          <button type="submit">Entrar</button>
        </form>

        <Link to="/registro">Crear cuenta nueva</Link>
      </section>
    </main>
  )
}

export default Login
