
import { useState } from "react"
import "../styles/registro.css"
// campos del formulario
interface FormData {
  nombre:          string
  apellido:        string
  email:           string
  telefono:        string
  password:        string
  confirmPassword: string
  ciudad:          string
  departamento:    string
  terminos:        boolean
}

// Los posibles errores por campo (todos opcionales con "?")
interface Errores {
  nombre?:          string
  apellido?:        string
  email?:           string
  telefono?:        string
  password?:        string
  confirmPassword?: string
  ciudad?:          string
  terminos?:        string
}


// ─────────────────────────────────────────────────────────────────────────────
// DATOS ESTÁTICOS
// ─────────────────────────────────────────────────────────────────────────────

// Etiquetas de los 4 pasos del stepper
const PASOS = ["Datos", "Acceso", "Ubicación", "Confirmar"]

// Ciudades disponibles en el select
const CIUDADES = ["Bogotá", "Medellín", "Cali"]

// Localidades por ciudad — Record<string, string[]> = objeto con clave texto y valor lista
const LOCALIDADES: Record<string, string[]> = {
  "Bogotá":   ["Usaquén", "Chapinero", "Suba","Engativa"],
  "Medellín": ["El Poblado", "Laureles", "Envigado"],
  "Cali":     ["San Antonio", "El Peñón", "Granada"],
}

// Colores de la barra de fortaleza según nivel 0–4
const COLORES_FORTALEZA = ["#ccc", "#E24B4A", "#EF9F27", "#639922", "#1D9E75"]


// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

// Calcula la fortaleza de la contraseña. Devuelve nivel (0-4) y etiqueta de texto.
function calcularFortaleza(pw: string): { nivel: number; etiqueta: string } {
  if (!pw) return { nivel: 0, etiqueta: "" }
  let puntos = 0
  if (pw.length >= 8)          puntos++  // longitud mínima
  if (/[A-Z]/.test(pw))        puntos++  // tiene mayúscula
  if (/[0-9]/.test(pw))        puntos++  // tiene número
  if (/[^A-Za-z0-9]/.test(pw)) puntos++  // tiene símbolo especial
  const etiquetas = ["", "Débil", "Regular", "Buena", "Fuerte"]
  return { nivel: puntos, etiqueta: etiquetas[puntos] }
}

// Genera las iniciales del avatar a partir del nombre y apellido
function obtenerIniciales(nombre: string, apellido: string): string {
  const n = nombre.trim()[0] ?? ""
  const a = apellido.trim()[0] ?? ""
  return (n + a).toUpperCase() || "?"
}


// ─────────────────────────────────────────────────────────────────────────────
// VALIDACIONES POR PASO
// ─────────────────────────────────────────────────────────────────────────────

function validarPaso(paso: number, form: FormData): Errores {
  const errores: Errores = {}

  if (paso === 0) {
    if (!form.nombre.trim())   errores.nombre   = "Obligatorio"
    if (!form.apellido.trim()) errores.apellido = "Obligatorio"
    if (!form.email.trim())    errores.email    = "Obligatorio"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errores.email = "Email inválido"
    if (!form.telefono.trim()) errores.telefono = "Obligatorio"
    else if (!/^\d{7,12}$/.test(form.telefono.replace(/\s/g, "")))
      errores.telefono = "Número inválido"
  }

  if (paso === 1) {
    if (!form.password)
      errores.password = "Obligatorio"
    else if (form.password.length < 8)
      errores.password = "Mínimo 8 caracteres"
    else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&.-]).{8,}$/.test(form.password))
      errores.password = "Debe incluir letras, número y símbolo"
    if (!form.confirmPassword)
      errores.confirmPassword = "Obligatorio"
    else if (form.password !== form.confirmPassword)
      errores.confirmPassword = "Las contraseñas no coinciden"
  }

  if (paso === 2) {
    if (!form.ciudad) errores.ciudad = "Selecciona una ciudad"
  }

  if (paso === 3) {
    if (!form.terminos) errores.terminos = "Debes aceptar los términos"
  }

  return errores
}


// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

export default function RegistroCliente() {

  // Estado 1: número del paso actual (0 a 3, y 4 = pantalla de éxito)
  const [paso, setPaso] = useState(0)

  // Estado 2: todos los campos del formulario
  const [form, setForm] = useState<FormData>({
    nombre:          "",
    apellido:        "",
    email:           "",
    telefono:        "",
    password:        "",
    confirmPassword: "",
    ciudad:          "",
    departamento:    "",
    terminos:        false,
  })

  // Estado 3: errores del paso actual
  const [errores, setErrores] = useState<Errores>({})


  // ── Manejador para inputs de texto ────────────────────────────────────────
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    // Limpiamos el error del campo cuando el usuario empieza a corregirlo
    setErrores(prev => ({ ...prev, [name]: undefined }))
  }

  // ── Manejador para los <select> ───────────────────────────────────────────
  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target
    if (name === "ciudad") {
      // Al cambiar ciudad reseteamos el departamento para evitar valores inválidos
      setForm(prev => ({ ...prev, ciudad: value, departamento: "" }))
      setErrores(prev => ({ ...prev, ciudad: undefined }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  // ── Avanzar al siguiente paso ─────────────────────────────────────────────
  function handleSiguiente() {
    const resultado = validarPaso(paso, form)
    setErrores(resultado)
    // Solo avanzamos si no hay errores
    if (Object.keys(resultado).length === 0) {
      setPaso(prev => prev + 1)
    }
  }

  // ── Retroceder al paso anterior ───────────────────────────────────────────
  function handleAtras() {
    setErrores({})
    setPaso(prev => prev - 1)
  }

  // ── Reiniciar todo el formulario ──────────────────────────────────────────
  function handleReiniciar() {
    setPaso(0)
    setErrores({})
    setForm({
      nombre: "", apellido: "", email: "", telefono: "",
      password: "", confirmPassword: "",
      ciudad: "", departamento: "", terminos: false,
    })
  }


  // ── Datos calculados (se recalculan automáticamente con cada render) ───────
  const fortaleza   = calcularFortaleza(form.password)
  const iniciales   = obtenerIniciales(form.nombre, form.apellido)
  const localidades = form.ciudad ? LOCALIDADES[form.ciudad] : []


  // ─────────────────────────────────────────────────────────────────────────
  // JSX
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="rc-pagina">
      <div className="rc-card">

        {/* ── STEPPER ── */}
        {paso < 4 && (
          <div className="rc-stepper">
            {PASOS.map((label, i) => {
              const estado = i < paso ? "done" : i === paso ? "active" : ""
              return (
                <div key={i} className={`rc-step ${estado}`}>
                  <div className={`rc-circulo ${estado}`}>
                    {i < paso
                      // Si el paso ya fue completado, mostramos un check (✓)
                      ? <svg viewBox="0 0 16 16" fill="none" width="11" height="11">
                          <polyline points="2,8 6,12 14,4" stroke="white" strokeWidth="2.5"
                            fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      : i + 1
                    }
                  </div>
                  <span className={`rc-step-label ${estado}`}>{label}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* ── PASO 0: Datos personales ── */}
        {paso === 0 && (
          <div>
            <div className="rc-header">
              <h2>Información personal</h2>
              <p>Paso 1 de 4 — datos del cliente</p>
            </div>

            <div className="rc-row2">
              <div className="rc-campo">
                <label>Nombre</label>
                <input name="nombre" type="text" value={form.nombre}
                  placeholder="Ej: Angie" onChange={handleChange} />
                {errores.nombre && <small className="rc-error">{errores.nombre}</small>}
              </div>
              <div className="rc-campo">
                <label>Apellido</label>
                <input name="apellido" type="text" value={form.apellido}
                  placeholder="Ej: Acevedo" onChange={handleChange} />
                {errores.apellido && <small className="rc-error">{errores.apellido}</small>}
              </div>
            </div>

            <div className="rc-campo">
              <label>Correo electrónico</label>
              <input name="email" type="email" value={form.email}
                placeholder="correo@ejemplo.com" onChange={handleChange} />
              {errores.email && <small className="rc-error">{errores.email}</small>}
            </div>

            <div className="rc-campo">
              <label>Teléfono</label>
              <input name="telefono" type="tel" value={form.telefono}
                placeholder="Ej: 3001234567" onChange={handleChange} />
              {errores.telefono && <small className="rc-error">{errores.telefono}</small>}
            </div>
          </div>
        )}

        {/* ── PASO 1: Contraseña ── */}
        {paso === 1 && (
          <div>
            <div className="rc-header">
              <h2>Crea tu contraseña</h2>
              <p>Paso 2 de 4 — seguridad de la cuenta</p>
            </div>

            <div className="rc-campo">
              <label>
                Contraseña{" "}
                {/* Solo mostramos la etiqueta si ya escribió algo */}
                {fortaleza.etiqueta && (
                  <span className="rc-pw-tag">{fortaleza.etiqueta}</span>
                )}
              </label>
              {/* .rc-pw-wrap permite posicionar el contador sobre el input */}
              <div className="rc-pw-wrap">
                <input name="password" type="password" value={form.password}
                  placeholder="Mínimo 8 caracteres" maxLength={32}
                  onChange={handleChange} />
                <span className="rc-contador">{form.password.length}/32</span>
              </div>
              {/* Barra de fortaleza: ancho y color cambian con el nivel */}
              <div className="rc-barra-fondo">
                <div
                  className="rc-barra-relleno"
                  style={{
                    width: `${(fortaleza.nivel / 4) * 100}%`,
                    backgroundColor: COLORES_FORTALEZA[fortaleza.nivel],
                  }}
                />
              </div>
              {errores.password && <small className="rc-error">{errores.password}</small>}
            </div>

            <div className="rc-campo">
              <label>Confirmar contraseña</label>
              <input name="confirmPassword" type="password" value={form.confirmPassword}
                placeholder="Repite la contraseña" onChange={handleChange} />
              {errores.confirmPassword && (
                <small className="rc-error">{errores.confirmPassword}</small>
              )}
            </div>
          </div>
        )}

        {/* ── PASO 2: Ubicación ── */}
        {paso === 2 && (
          <div>
            <div className="rc-header">
              <h2>¿Desde dónde nos escribes?</h2>
              <p>Paso 3 de 4 — ubicación</p>
            </div>

            <div className="rc-campo">
              <label>Ciudad</label>
              <select name="ciudad" value={form.ciudad} onChange={handleSelect}>
                <option value="">-- Selecciona --</option>
                {CIUDADES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errores.ciudad && <small className="rc-error">{errores.ciudad}</small>}
            </div>

            {/* Este bloque solo aparece si ya hay una ciudad seleccionada */}
            {form.ciudad && (
              <div className="rc-campo">
                <label>Localidad / Barrio</label>
                <select name="departamento" value={form.departamento} onChange={handleSelect}>
                  <option value="">-- Selecciona --</option>
                  {localidades.map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            )}

            <p className="rc-nota">
              Esta información nos ayuda a brindarte un mejor servicio según tu zona.
            </p>
          </div>
        )}

        {/* ── PASO 3: Confirmación ── */}
        {paso === 3 && (
          <div>
            <div className="rc-header">
              <h2>Revisa tus datos</h2>
              <p>Paso 4 de 4 — confirma y acepta</p>
            </div>

            {/* Resumen visual de todos los datos ingresados */}
            <div className="rc-preview">
              <div className="rc-avatar">{iniciales}</div>

              {[
                ["Nombre completo", [form.nombre, form.apellido].filter(Boolean).join(" ")],
                ["Email",           form.email],
                ["Teléfono",        form.telefono],
                ["Contraseña",      form.password ? "•".repeat(Math.min(form.password.length, 10)) : "—"],
                ["Fortaleza",       fortaleza.etiqueta || "—"],
                ["Ciudad",          form.ciudad       || "—"],
                ["Localidad",       form.departamento || "—"],
              ].map(([label, valor]) => (
                <div key={label} className="rc-fila">
                  <span className="rc-fila-k">{label}</span>
                  <span className="rc-fila-v">{valor || "—"}</span>
                </div>
              ))}
            </div>

            <div className="rc-campo">
              <label className="rc-check">
                <input type="checkbox" name="terminos"
                  checked={form.terminos} onChange={handleChange} />
                Acepto los términos y condiciones
              </label>
              {errores.terminos && <small className="rc-error">{errores.terminos}</small>}
            </div>
          </div>
        )}

        {/* ── PASO 4: Pantalla de éxito ── */}
        {paso === 4 && (
          <div className="rc-exito">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="22" fill="#E1F5EE" stroke="#1D9E75" strokeWidth="1"/>
              <polyline points="14,24 21,31 34,17" stroke="#1D9E75" strokeWidth="2.5"
                fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3>¡Bienvenido, {form.nombre || "cliente"}!</h3>
            <p>Tu cuenta ha sido creada correctamente.</p>
            <button className="rc-btn-sec" onClick={handleReiniciar}>
              Registrar otro cliente
            </button>
          </div>
        )}

        {/* ── NAVEGACIÓN (solo visible en pasos 0–3) ── */}
        {paso < 4 && (
          <div className="rc-nav">
            {/* El botón Atrás solo aparece desde el paso 1 */}
            {paso > 0
              ? <button className="rc-btn-sec" onClick={handleAtras}>← Atrás</button>
              : <span />
            }
            <span className="rc-step-count">{paso + 1} / {PASOS.length}</span>
            <button className="rc-btn-pri" onClick={handleSiguiente}>
              {paso === 3 ? "Registrarse →" : "Siguiente →"}
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
