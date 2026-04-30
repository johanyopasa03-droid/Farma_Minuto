import { useState } from "react"

interface FormularioRegistro {
  nombre: string
  email: string
  password: string
  direccion: string
  aceptaTerminos: boolean
}

function Registro() {
  const [formulario, setFormulario] = useState<FormularioRegistro>({
    nombre: "",
    email: "",
    password: "",
    direccion: "",
    aceptaTerminos: false
  })
  const [mensaje, setMensaje] = useState("")

  /* REQUERIMIENTO 2 - Formulario y controles con estado:
     En Registro se agrupan los datos en el estado "formulario".
     Este estado guarda:
     - cajas de texto: nombre, email y password.
     - area de texto: direccion.
     - casilla de seleccion: aceptaTerminos.
     Al cambiar un campo, cambiarTexto o setFormulario actualizan el estado. */

  const cambiarTexto = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setFormulario((datosActuales) => ({
      ...datosActuales,
      [name]: value
    }))
  }

  const registrarUsuario = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formulario.nombre || !formulario.email || !formulario.password) {
      setMensaje("Completa nombre, email y contrasena")
      return
    }

    if (!formulario.aceptaTerminos) {
      setMensaje("Debes aceptar los terminos")
      return
    }

    // SEGUNDA ENTREGA - LocalStorage:
    // Guardamos el usuario registrado para demostrar almacenamiento local.
    localStorage.setItem("farma_usuario_registrado", JSON.stringify(formulario))
    setMensaje("Registro guardado correctamente en LocalStorage")
  }

  return (
    <main className="formulario-pagina">
      <section className="formulario-card">
        <h1>Registro de usuario</h1>

        <form onSubmit={registrarUsuario}>
          <label>
            Nombre
            {/* REQUERIMIENTO 2 - Caja de texto controlada por formulario.nombre. */}
            <input
              name="nombre"
              type="text"
              value={formulario.nombre}
              onChange={cambiarTexto}
            />
          </label>

          <label>
            Email
            {/* REQUERIMIENTO 2 - Caja de texto controlada por formulario.email. */}
            <input
              name="email"
              type="email"
              value={formulario.email}
              onChange={cambiarTexto}
            />
          </label>

          <label>
            Contrasena
            {/* REQUERIMIENTO 2 - Caja de texto password controlada por formulario.password. */}
            <input
              name="password"
              type="password"
              value={formulario.password}
              onChange={cambiarTexto}
            />
          </label>

          <label>
            Direccion
            {/* REQUERIMIENTO 2 - Area de texto controlada por formulario.direccion. */}
            <textarea
              name="direccion"
              value={formulario.direccion}
              onChange={cambiarTexto}
              rows={4}
            />
          </label>

          <label className="checkbox">
            {/* REQUERIMIENTO 2 - Checkbox controlado por formulario.aceptaTerminos. */}
            <input
              type="checkbox"
              checked={formulario.aceptaTerminos}
              onChange={(e) =>
                setFormulario((datosActuales) => ({
                  ...datosActuales,
                  aceptaTerminos: e.target.checked
                }))
              }
            />
            Acepto terminos y condiciones
          </label>

          <button type="submit">Registrarse</button>
        </form>

        {mensaje && <p className="exito">{mensaje}</p>}
      </section>
    </main>
  )
}

export default Registro
