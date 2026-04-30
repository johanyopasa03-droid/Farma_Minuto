import { useState } from "react"
import type { Producto } from "../types/Producto"

interface Props {
  productos: Producto[]
  agregarAlCarrito: (producto: Producto) => void
  verDetalle: (producto: Producto) => void
}

const opcionesSintomas = [
  {
    nombre: "Dolor o malestar",
    palabrasClave: ["Acetaminofen", "Ibuprofeno", "Dolex Forte"]
  },
  {
    nombre: "Tos o gripa",
    palabrasClave: ["Jarabe", "Vitamina C"]
  },
  {
    nombre: "Vitaminas y energia",
    palabrasClave: ["Vitamina C", "Complejo B"]
  },
  {
    nombre: "Cuidado de la piel",
    palabrasClave: ["Protector Solar", "skin", "care"]
  },
  {
    nombre: "Belleza y aseo",
    palabrasClave: [
      "beauty",
      "Cuidado personal",
      "fragrance",
      "perfume",
      "mascara",
      "lipstick",
      "powder",
      "cream"
    ]
  },
  {
    nombre: "Bienestar digestivo",
    palabrasClave: ["Enterogermina"]
  },
  {
    nombre: "Bebes",
    palabrasClave: ["Panales"]
  }
]

function AsistenteCompra({ productos, agregarAlCarrito, verDetalle }: Props) {
  /* REQUERIMIENTO 14 - Valor agregado:
     Este componente es una funcion adicional que no estaba en los requisitos obligatorios.
     Su objetivo es ayudar al usuario a encontrar productos segun una necesidad o sintoma.

     Es independiente porque:
     - Tiene su propio archivo: AsistenteCompra.tsx.
     - Maneja su propio estado "sintomaSeleccionado".
     - Recibe productos y funciones por props desde Home.

     Flujo para explicar al docente:
     1. El usuario elige un sintoma en el menu.
     2. El componente busca productos relacionados.
     3. Muestra recomendaciones.
     4. El usuario puede ver detalle o agregar al carrito. */
  const [sintomaSeleccionado, setSintomaSeleccionado] = useState("")

  const opcionActual = opcionesSintomas.find(
    (opcion) => opcion.nombre === sintomaSeleccionado
  )

  const recomendaciones = opcionActual
    ? productos.filter((producto) =>
        opcionActual.palabrasClave.some((palabra) => {
          /* REQUERIMIENTO 14 - Valor agregado:
             Para la opcion "Belleza y aseo" no buscamos solo por nombre.
             Tambien revisamos categoria y descripcion porque la API externa puede traer
             productos de belleza con nombres variados. */
          const textoProducto = [
            producto.nombre,
            producto.categoria,
            producto.descripcion || ""
          ]
            .join(" ")
            .toLowerCase()

          return textoProducto.includes(palabra.toLowerCase())
        })
      )
    : []

  return (
    <section className="asistente-compra">
      <div className="asistente-header">
        <div>
          <span className="etiqueta-seccion">Valor agregado</span>
          <h2>Asistente de compra por sintoma</h2>
          <p>
            Selecciona una necesidad y Farmaminuto te recomienda productos del catalogo.
          </p>
        </div>

        <label>
          Necesidad del cliente
          {/* REQUERIMIENTO 14 - Valor agregado:
              Este select controla el sintoma elegido por el usuario. */}
          <select
            value={sintomaSeleccionado}
            onChange={(e) => setSintomaSeleccionado(e.target.value)}
          >
            <option value="">Seleccionar sintoma</option>
            {opcionesSintomas.map((opcion) => (
              <option key={opcion.nombre} value={opcion.nombre}>
                {opcion.nombre}
              </option>
            ))}
          </select>
        </label>
      </div>

      {sintomaSeleccionado && (
        <div className="asistente-resultados">
          {recomendaciones.length === 0 ? (
            <p>No hay recomendaciones disponibles para esta seleccion.</p>
          ) : (
            recomendaciones.map((producto) => (
              <article className="asistente-producto" key={producto.id}>
                <img src={producto.imagen} alt={producto.nombre} />
                <div>
                  <strong>{producto.nombre}</strong>
                  <span>{producto.categoria}</span>
                  <p>${producto.precio.toLocaleString("es-CO")}</p>
                </div>
                <div className="asistente-acciones">
                  <button type="button" onClick={() => verDetalle(producto)}>
                    Ver detalle
                  </button>
                  <button
                    className="boton-secundario"
                    type="button"
                    onClick={() => agregarAlCarrito(producto)}
                  >
                    Agregar
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      )}
    </section>
  )
}

export default AsistenteCompra
