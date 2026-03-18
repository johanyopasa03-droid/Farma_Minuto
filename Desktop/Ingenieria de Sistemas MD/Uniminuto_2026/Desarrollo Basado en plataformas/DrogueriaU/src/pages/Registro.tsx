import { useState } from "react"
import "../styles/registro.css"

interface FormData {
  nombre: string
  email: string
  password: string
  confirmPassword: string
}

interface Errors {
  nombre?: string
  email?: string
  password?: string
  confirmPassword?: string
}

function validate(form: FormData): Errors {

  const errors: Errors = {}

  // Nombre
  if (!form.nombre.trim()) {
    errors.nombre = "El nombre es obligatorio"
  } else if (form.nombre.trim().length < 2) {
    errors.nombre = "Debe tener mínimo 2 caracteres"
  }

  // Email
  if (!form.email.trim()) {
    errors.email = "El email es obligatorio"
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      errors.email = "Formato de email inválido"
    }
  }

  // Password
  if (!form.password) {
    errors.password = "La contraseña es obligatoria"
  } 
  else if (form.password.length < 8) {
    errors.password = "Debe tener mínimo 8 caracteres"
  } 
  else {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&.-]).{8,}$/

    if (!passwordRegex.test(form.password)) {
      errors.password =
        "Debe tener letras, números y un carácter especial"
    }
  }

  // Confirmación
  if (!form.confirmPassword) {
    errors.confirmPassword = "Debes confirmar la contraseña"
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden"
  }

  return errors
}

export default function Registro() {

  const [form, setForm] = useState<FormData>({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [errors, setErrors] = useState<Errors>({})
  const [success, setSuccess] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: value
    }))

    setErrors(prev => ({
      ...prev,
      [name]: undefined
    }))

    setSuccess(false)
  }

  function handleSubmit(e: React.FormEvent) {

    e.preventDefault()

    const validation = validate(form)

    setErrors(validation)

    if (Object.keys(validation).length === 0) {

      setSuccess(true)

      setForm({
        nombre: "",
        email: "",
        password: "",
        confirmPassword: ""
      })

    } else {
      setSuccess(false)
    }
  }

  return (

    <>
    {/*   <Navbar /> */}

      <div className="container">

        <h2>Registro de Usuario</h2>

        <form onSubmit={handleSubmit} noValidate>

          <div className="field">

            <label>Nombre</label>

            <input
              name="nombre"
              type="text"
              value={form.nombre}
              onChange={handleChange}
            />

            {errors.nombre && (
              <small className="error">{errors.nombre}</small>
            )}

          </div>

          <div className="field">

            <label>Email</label>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />

            {errors.email && (
              <small className="error">{errors.email}</small>
            )}

          </div>

          <div className="field">

            <label>Contraseña</label>

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />

            {errors.password && (
              <small className="error">{errors.password}</small>
            )}

          </div>

          <div className="field">

            <label>Confirmar contraseña</label>

            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
            />

            {errors.confirmPassword && (
              <small className="error">
                {errors.confirmPassword}
              </small>
            )}

          </div>

          <button type="submit">
            Registrarse
          </button>

          {success && (
            <div className="success">
              Registro exitoso ✅
            </div>
          )}

        </form>

      </div>

    </>
  )
}